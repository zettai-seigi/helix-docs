# Orchestration Architecture

This document describes the integration of the Claude Agent SDK in the Helix ecosystem for automated task orchestration.

## Overview

The orchestration system implements a **Fractal Orchestration Architecture** that separates concerns between:

- **Macro-Manager (Orchestrator)**: High-level task planning, context curation, and dispatch
- **Micro-Executor (Claude Worker)**: Long-running code execution using Claude Agent SDK

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           FRACTAL ORCHESTRATION                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                        ORCHESTRATOR (Macro)                          │   │
│  │                                                                       │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │   │
│  │  │   Context   │  │    Task     │  │    Gate     │  │   Event     │  │   │
│  │  │   Curator   │  │  Dispatch   │  │  Manager    │  │   Handler   │  │   │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  │   │
│  │         │                │                │                │         │   │
│  └─────────┼────────────────┼────────────────┼────────────────┼─────────┘   │
│            │                │                │                │             │
│            ▼                ▼                ▼                ▼             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         Redis Event Bus                              │    │
│  │    tasks:{tenant}:dispatch  │  tasks:{tenant}:completion  │  gates   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│            │                                        ▲                       │
│            ▼                                        │                       │
│  ┌──────────────────────────────────────────────────┴───────────────────┐   │
│  │                      CLAUDE WORKERS (Micro)                           │   │
│  │                                                                       │   │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │   │
│  │  │                    Coding Loop Harness                          │ │   │
│  │  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐            │ │   │
│  │  │  │ Feature │  │ Feature │  │ Feature │  │  ...    │            │ │   │
│  │  │  │    1    │──│    2    │──│    3    │──│         │            │ │   │
│  │  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘            │ │   │
│  │  └─────────────────────────────────────────────────────────────────┘ │   │
│  │                                                                       │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                   │   │
│  │  │   Claude    │  │  Progress   │  │   Git       │                   │   │
│  │  │   Executor  │  │  Tracker    │  │   Commits   │                   │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                   │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Package Structure

### @helix/orchestrator

The orchestrator package handles high-level task management:

```
packages/orchestrator/
├── src/
│   ├── orchestrator.ts       # Main orchestration logic
│   ├── context/
│   │   └── curator.ts        # Context packet curation
│   ├── interfaces/
│   │   └── contracts.ts      # Zod schemas, types, constants
│   └── temporal/
│       ├── workflows.ts      # Temporal durable workflows
│       └── activities.ts     # Workflow activities
```

### @helix/claude-worker

The worker package handles code execution:

```
packages/claude-worker/
├── src/
│   ├── worker.ts             # Redis task listener
│   ├── executor.ts           # Claude SDK integration
│   ├── index.ts              # Package exports
│   ├── harness/
│   │   ├── coding-loop.ts    # Anthropic Harness pattern
│   │   ├── initializer.ts    # Environment setup
│   │   └── e2e-verification.ts # Browser automation testing
│   └── shadcn/
│       ├── index.ts          # Module exports
│       └── integration.ts    # shadcn/ui MCP integration
```

## Key Concepts

### Context Curation

The Context Curator prevents "context poisoning" by building bounded context packets:

```typescript
const curator = createContextCurator(graphClient);

const { packet, tools, excluded, estimatedTokens } = await curator.curateForTask(
  "tenant-id",
  ["cpe:tenant/req/story/USER/US-001"],
  "USER",
  "imp",      // target layer
  "frontend"  // domain (optional)
);
```

**What gets curated:**
- Requirements from the graph (filtered by persona scope)
- Related design specs
- API contracts
- Layer-specific constraints
- Domain-specific tool injections

**What gets excluded:**
- PII data
- Billing schemas
- Auth secrets
- Cross-persona sensitive data

### Tool Injection

Tools are automatically injected based on layer and domain:

| Layer | Domain | Tools Injected |
|-------|--------|----------------|
| imp | frontend | shadcn-mcp, puppeteer-mcp |
| imp | backend | db-migration-mcp, api-test-mcp |
| tst | * | vitest-mcp, playwright-mcp |
| sec | * | semgrep-mcp, trivy-mcp |
| * | * | helix-graph, helix-cascade |

### Anthropic Harness Pattern

The Claude Worker implements the "Anthropic Harness" pattern for long-running tasks:

```
┌─────────────────────────────────────────────────────────────────┐
│                        HARNESS LIFECYCLE                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. INITIALIZE                                                   │
│     ├── Convert TaskPayload → FeatureList                       │
│     ├── Write feature_list.json                                 │
│     ├── Write claude-progress.txt (INITIALIZED:0)               │
│     └── Run init.sh (if present)                                │
│                                                                  │
│  2. CODING LOOP                                                  │
│     ┌─────────────────────────────────────────────────────┐     │
│     │  for each feature in feature_list:                  │     │
│     │    ├── Write progress (WORKING:N)                   │     │
│     │    ├── Execute feature with Claude                  │     │
│     │    ├── Retry on failure (up to maxRetries)          │     │
│     │    ├── Track artifacts created                      │     │
│     │    ├── Git commit (if autoCommit)                   │     │
│     │    └── Write progress (COMPLETED:N or FAILED:N)     │     │
│     └─────────────────────────────────────────────────────┘     │
│                                                                  │
│  3. RESUME (after context exhaustion)                            │
│     ├── Read claude-progress.txt                                │
│     ├── Read feature_list.json                                  │
│     ├── Restore state at last checkpoint                        │
│     └── Continue from where we left off                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Progress File Format:**
```
2024-01-15T10:00:00Z INITIALIZED:0
2024-01-15T10:00:01Z WORKING:0
2024-01-15T10:05:00Z COMPLETED:1
2024-01-15T10:05:01Z WORKING:1
2024-01-15T10:10:00Z COMPLETED:2
```

**Feature List Format:**
```json
{
  "task_id": "task-12345",
  "features": [
    {
      "category": "functional",
      "description": "Implement user dashboard",
      "steps": ["Read requirement", "Design component", "Implement", "Test"],
      "passes": true,
      "trace_id": "cpe:tenant/req/story/USER/US-001"
    }
  ],
  "current_index": 1,
  "progress_percent": 50
}
```

### Task Lifecycle

```
┌──────────┐    ┌──────────────────┐    ┌────────────┐    ┌───────────┐
│ PENDING  │───▶│ CONTEXT_CURATING │───▶│ DISPATCHED │───▶│ EXECUTING │
└──────────┘    └──────────────────┘    └────────────┘    └─────┬─────┘
                                                               │
                       ┌───────────────────────────────────────┘
                       │
                       ▼
             ┌──────────────────┐
             │   GATE_WAITING   │ (if gate required)
             └────────┬─────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
  ┌───────────┐ ┌───────────┐ ┌───────────┐
  │ COMPLETED │ │  PARTIAL  │ │  FAILED   │
  └───────────┘ └───────────┘ └───────────┘
```

### Human Gates

The orchestrator enforces human approval gates:

| Gate | Trigger | Purpose |
|------|---------|---------|
| Gate #1 | After persona discovery | Validate persona roster |
| Gate #2 | After cross-persona synthesis | Validate conflict resolutions |
| Gate #3 | After design layer | Approve UX/UI direction |
| Gate #4 | After architecture layer | Freeze before implementation |
| Gate #5 | Pre-deployment | Final verification |

```typescript
// When a task needs gate approval
await orchestrator.handleCompletion({
  task_id: "task-123",
  status: "BLOCKED",
  artifacts_created: [],
  blocked_reason: "Waiting for Gate #4 approval",
  pending_gate_id: "gate-4-1705312800000"
});

// After gate approval (via Redis event)
// tasks:tenant:gate-approved → { gate_id: "gate-4-...", approved_by: "admin" }
```

### CascadeCoordinator

The `CascadeCoordinator` automates workflow progression after gate approvals:

```typescript
import { createCascadeCoordinator } from "@helix/orchestrator";

const coordinator = await createCascadeCoordinator({
  tenantId: "my-tenant",
  namespace: "my-namespace",
  graphClient,
  eventBus,
});

// Coordinator now listens for gate.approved events
// and automatically triggers the next cascade phase
```

**Gate → Action Mapping:**

| Gate Approved | Automatic Action |
|---------------|------------------|
| Gate #1 (Persona Discovery) | `derive_intents` for all personas → `detect_conflicts` |
| Gate #2 (Cross-Persona Synthesis) | `generate_layer` (design) |
| Gate #3 (Design Review) | `generate_layer` (architecture) |
| Gate #4 (Architecture Freeze) | `generate_layer` (api, dat, sec) parallel |
| Gate #5 (Pre-Deployment) | Emit `deployment.ready` event |

**Running as standalone:**

```bash
TENANT_ID=myproject pnpm --filter @helix/orchestrator run start:coordinator
```

## Configuration

### Orchestrator Configuration

```typescript
const orchestrator = createOrchestrator(graphClient, eventBus, {
  tenantId: "my-tenant",
  maxConcurrentTasks: 5,           // Max parallel claude workers
  defaultTimeoutSeconds: 3600,      // 1 hour default
  useTemporalDurability: true,      // Enable Temporal workflows
});
```

### Worker Configuration

```typescript
const worker = createClaudeWorker(
  eventBus,
  createClaudeExecutor({
    apiKey: process.env.ANTHROPIC_API_KEY,
    model: "claude-sonnet-4-20250514",
    maxTurns: 100,
    permissionMode: "acceptEdits",
  }),
  {
    workDir: "/workspace",
    autoCommit: true,
    maxRetries: 3,
  }
);
```

### Environment Variables

```bash
# Orchestrator
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=password
REDIS_HOST=localhost
REDIS_PORT=6379
TENANT_ID=my-tenant
TEMPORAL_ADDRESS=localhost:7233

# Claude Worker
ANTHROPIC_API_KEY=sk-ant-...
WORKER_ID=worker-1
WORK_DIR=/workspace
```

## Docker Deployment

### Docker Compose Services

```yaml
services:
  # Temporal for durable workflows
  temporal:
    image: temporalio/auto-setup:latest
    ports:
      - "7233:7233"

  # Orchestrator
  orchestrator:
    build:
      dockerfile: docker/Dockerfile.orchestrator
    environment:
      - NEO4J_URI=bolt://neo4j:7687
      - REDIS_HOST=redis
      - TEMPORAL_ADDRESS=temporal:7233

  # Claude Workers (scalable)
  claude-worker:
    build:
      dockerfile: docker/Dockerfile.claude-worker
    environment:
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - REDIS_HOST=redis
    deploy:
      replicas: 3  # Scale based on workload
```

### Scaling Workers

```bash
# Scale claude workers
docker-compose up -d --scale claude-worker=5
```

## API Reference

### TaskPayload

```typescript
interface TaskPayload {
  task_id: string;
  persona_scope: string;           // e.g., "USER", "ADMIN"
  founding_intent: string;         // Human-readable intent
  context_packet: {
    requirements: string[];        // CPE UIDs
    design_specs?: string[];
    api_contracts?: string[];
    constraints?: string[];
  };
  target_layer: string;            // e.g., "imp", "tst", "api"
  tenant_id: string;
  timeout_seconds?: number;        // Default: 3600
  excluded_context?: string[];     // UIDs to exclude
  injected_tools?: string[];       // MCP tools to enable
}
```

### CompletionSignal

```typescript
interface CompletionSignal {
  task_id: string;
  status: "COMPLETED" | "PARTIAL" | "FAILED" | "BLOCKED";
  artifacts_created: string[];     // File paths
  artifacts_modified?: string[];
  verification_evidence?: {
    unit_tests?: "PASSED" | "FAILED";
    lint?: "PASSED" | "FAILED";
    type_check?: "PASSED" | "FAILED";
  };
  git_commit?: string;             // Commit SHA
  error?: string;
  blocked_reason?: string;
  pending_gate_id?: string;
  execution_time_seconds?: number;
}
```

### FeatureItem

```typescript
interface FeatureItem {
  category: "functional" | "ui" | "api" | "data" | "security" | "test";
  description: string;
  steps: string[];
  passes: boolean;
  trace_id: string;                // CPE UID
  error?: string;
}
```

## Integration with Helix MCPs

The orchestration system works alongside existing MCP servers:

```
┌─────────────────────────────────────────────────────────────────────┐
│                           ORCHESTRATOR                               │
│                                                                      │
│  Uses:                                                               │
│  ├── helix-graph MCP    → Query requirements, trace lineage         │
│  ├── helix-cascade MCP  → Generate artifacts, request gates         │
│  └── helix-discovery    → (indirectly via persona context)          │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         CLAUDE WORKERS                               │
│                                                                      │
│  Tools Available:                                                    │
│  ├── Base: Read, Write, Edit, Glob, Grep, Bash                      │
│  ├── helix-graph MCP    → mcp__helix-graph__*                       │
│  ├── helix-cascade MCP  → mcp__helix-cascade__*                     │
│  ├── shadcn-mcp         → mcp__shadcn__* (frontend)                 │
│  └── vitest-mcp         → mcp__vitest__* (testing)                  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

## Example Workflow

```typescript
// 1. Create orchestrator
const orchestrator = createOrchestrator(graphClient, eventBus, {
  tenantId: "acme",
});

// 2. Plan and dispatch tasks
const results = await orchestrator.planAndDispatch(
  ["cpe:acme/req/story/USER/US-001", "cpe:acme/req/story/USER/US-002"],
  "USER",
  "Implement user dashboard with analytics"
);

// Results: [
//   { taskId: "task-abc", status: "dispatched", layer: "imp" },
//   { taskId: "task-def", status: "queued", layer: "tst" }
// ]

// 3. Claude workers pick up tasks from Redis
// Worker executes features, commits code, reports completion

// 4. Handle completions
await orchestrator.handleCompletion({
  task_id: "task-abc",
  status: "COMPLETED",
  artifacts_created: ["src/components/Dashboard.tsx"],
  git_commit: "abc123",
  execution_time_seconds: 180,
});

// 5. Check stats
const stats = orchestrator.getStats();
// { pendingTasks: 1, executingTasks: 0, completedTasks: 1, ... }
```

## Troubleshooting

### Worker Not Picking Up Tasks

```bash
# Check Redis connection
redis-cli ping

# Check task channel
redis-cli subscribe "tasks:tenant:dispatch"

# Check worker logs
docker logs helix-claude-worker-1
```

### Context Too Large

If tasks fail due to context limits:

1. Check token estimation in curator
2. Reduce `maxArtifacts` in curator config
3. Add more items to `excluded_context`

### Gate Approval Stuck

```bash
# Check pending gates
redis-cli keys "gates:*:pending"

# Manually approve (for testing)
redis-cli publish "gates:tenant:approved" '{"gate_id":"gate-4-123","approved_by":"admin"}'
```

### Temporal Workflow Issues

```bash
# Check Temporal UI
open http://localhost:8080

# List workflows
tctl workflow list

# Describe specific workflow
tctl workflow describe -w <workflow-id>
```

## Related Documentation

- [Claude Worker Guide](./claude-worker.md) - Detailed Claude Worker documentation
- [Frontend Implementation](./frontend-implementation.md) - shadcn/ui and E2E verification
- [External MCP Servers](../external-mcp-servers.md) - MCP server configuration
