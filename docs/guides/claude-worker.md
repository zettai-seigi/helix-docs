# Claude Worker Guide

This guide covers the Claude Worker package (`@helix/claude-worker`), which implements the Anthropic Harness pattern for long-running code execution tasks.

## Overview

The Claude Worker is the "Micro-Executor" in the Helix Fractal Orchestration Architecture. It:

- Receives task payloads from the Orchestrator via Redis
- Executes features using the Claude Agent SDK
- Tracks progress for context recovery
- Commits code and reports completion

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLAUDE WORKER LIFECYCLE                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. RECEIVE TASK                                                 │
│     └── TaskPayload from Redis channel                          │
│                                                                  │
│  2. INITIALIZE (Anthropic Harness)                              │
│     ├── Generate feature_list.json                              │
│     ├── Create claude-progress.txt                              │
│     ├── Run init.sh (optional)                                  │
│     └── Add E2E setup feature (optional)                        │
│                                                                  │
│  3. CODING LOOP                                                  │
│     ┌─────────────────────────────────────────────────────┐     │
│     │  for each feature:                                  │     │
│     │    ├── Write WORKING:N to progress                  │     │
│     │    ├── Execute with Claude                          │     │
│     │    ├── Retry on failure (up to maxRetries)          │     │
│     │    ├── Git commit (if autoCommit)                   │     │
│     │    └── Write COMPLETED:N to progress                │     │
│     └─────────────────────────────────────────────────────┘     │
│                                                                  │
│  4. COMPLETION                                                   │
│     └── Send CompletionSignal to Redis                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Installation

```bash
pnpm add @helix/claude-worker
```

## Quick Start

```typescript
import {
  createClaudeWorker,
  createClaudeExecutor
} from "@helix/claude-worker";
import { createEventBus } from "@helix/common";

// Initialize event bus
const eventBus = await createEventBus({
  host: "localhost",
  port: 6379,
});

// Create executor
const executor = createClaudeExecutor({
  apiKey: process.env.ANTHROPIC_API_KEY!,
  model: "claude-sonnet-4-20250514",
  maxTurns: 100,
  permissionMode: "acceptEdits",
});

// Create and start worker
const worker = createClaudeWorker(eventBus, executor, {
  tenantId: "my-tenant",
  workDir: "/workspace",
  autoCommit: true,
  maxRetries: 3,
});

await worker.start();
```

## Anthropic Harness Pattern

The worker implements the Anthropic Harness pattern from [Effective Harnesses for Long-Running Agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents).

### Key Insight

> "Claude performed significantly better when we broke tasks into discrete features and tracked progress in files that persist across context windows."

### Progress File

The harness writes progress to `claude-progress.txt`:

```
2024-01-15T10:00:00Z INITIALIZED:0
2024-01-15T10:00:01Z WORKING:0
2024-01-15T10:05:00Z COMPLETED:1
2024-01-15T10:05:01Z WORKING:1
2024-01-15T10:10:00Z COMPLETED:2
```

### Feature List

Tasks are broken into features in `feature_list.json`:

```json
{
  "task_id": "task-12345",
  "features": [
    {
      "category": "functional",
      "description": "Implement user dashboard",
      "steps": [
        "Read requirement from context packet",
        "Design component structure",
        "Implement core functionality",
        "Add //@trace comment with UID",
        "Run unit tests"
      ],
      "passes": false,
      "trace_id": "cpe:tenant/req/story/USER/US-001"
    }
  ],
  "current_index": 0,
  "progress_percent": 0
}
```

### Context Recovery

If the worker crashes or context is exhausted:

```typescript
const harness = createCodingLoopHarness(handler, config);

// Try to resume from previous session
const resumed = await harness.resume(payload);

if (resumed) {
  console.log("Resumed at feature", harness.getState().currentFeatureIndex);
} else {
  // Fresh start
  await harness.initialize(payload);
}

// Continue execution
const result = await harness.run();
```

## Initializer Module

The Initializer handles environment setup:

```typescript
import { createInitializer } from "@helix/claude-worker";

const initializer = createInitializer({
  workDir: "/workspace",
  progressFile: "claude-progress.txt",
  featureListFile: "feature_list.json",
  runInitScript: true,       // Run init.sh if present
  addE2ESetupFeature: true,  // Add dev server verification step
});

// Initialize for a new task
const result = await initializer.initialize(payload);

// Gather environment context for resume
const context = await initializer.gatherEnvironmentContext();
```

### Init Script

If `runInitScript: true` and an `init.sh` exists in the work directory, it will be executed during initialization. Use this for:

- Installing dependencies
- Setting up environment
- Starting dev servers
- Database migrations

### E2E Setup Feature

If `addE2ESetupFeature: true`, a verification step is added as the first feature to ensure the dev environment is working before implementation begins.

## E2E Verification

Following Anthropic's recommendation to test "as a human user would":

```typescript
import {
  createE2EVerification,
  VERIFICATION_PRESETS
} from "@helix/claude-worker";

const e2e = createE2EVerification({
  baseUrl: "http://localhost:3000",
  puppeteerAvailable: false,
  captureScreenshots: true,
  screenshotDir: ".helix/screenshots",
});

// Verify dev server
const serverResult = await e2e.verifyDevServer();

// Verify a page
const pageResult = await e2e.verifyPage("/dashboard", {
  expectedTitle: "Dashboard",
  requiredSelectors: ["nav", "main"],
  forbiddenSelectors: [".error"],
  requiredText: ["Welcome"],
});

// Run verification suite
const suiteResult = await e2e.runVerificationSuite([
  { path: "/", options: VERIFICATION_PRESETS.homepage },
  { path: "/login", options: VERIFICATION_PRESETS.loginPage },
]);
```

### Verification Modes

| Mode | Description |
|------|-------------|
| HTTP Fallback | Uses `curl` for basic verification (default) |
| Puppeteer MCP | Full browser automation when available |

### Enabling Puppeteer

1. Add Puppeteer MCP to Claude Desktop config
2. Set `puppeteerAvailable: true` in worker config
3. E2E verification will use full browser automation

### Puppeteer Instructions

When Puppeteer MCP is available, generate instructions for Claude:

```typescript
const instructions = e2e.generatePuppeteerInstructions("/dashboard", {
  requiredSelectors: ["nav", "main"],
  requiredText: ["Welcome"],
});

// Returns step-by-step Puppeteer MCP commands:
// 1. puppeteer_navigate({ url: "http://localhost:3000/dashboard" })
// 2. puppeteer_evaluate({ script: "document.readyState" })
// 3. puppeteer_evaluate({ script: "document.querySelector('nav') !== null" })
// ...
```

## shadcn/ui Integration

Built-in integration with shadcn/ui to prevent UI component hallucination:

```typescript
import {
  createShadcnIntegration,
  SHADCN_COMPONENTS,
  FRONTEND_AGENT_SYSTEM_PROMPT,
} from "@helix/claude-worker";

const shadcn = createShadcnIntegration({
  projectRoot: "/workspace",
  style: "default",
  typescript: true,
  componentsPath: "@/components/ui",
  rsc: true,
});

// Validate component
if (shadcn.isValidComponent("button")) {
  await shadcn.installComponent("button");
}

// Generate import
const importStmt = shadcn.getImportStatement("card");
// 'import { Card } from "@/components/ui/card"'

// Neo4j traceability
const cypher = shadcn.generateDependencyQuery(
  "cpe:tenant/imp/class/LoginCard",
  "card"
);
```

### How It Works

1. **Auto-Detection**: Frontend tasks are detected via `injected_tools` or requirement keywords
2. **Prompt Injection**: `FRONTEND_AGENT_SYSTEM_PROMPT` is automatically added
3. **FETCH Before Write**: Agent must query shadcn MCP before writing JSX
4. **Component Validation**: Names are validated against the 47-component catalog

See [Frontend Implementation Guide](frontend-implementation.md) for details.

## Configuration

### Harness Configuration

```typescript
interface HarnessConfig {
  workDir: string;                    // Working directory
  progressFile: string;               // Progress file name
  featureListFile: string;            // Feature list file name
  autoCommit: boolean;                // Auto-commit after features
  maxRetries: number;                 // Max retries per feature
  runE2EBeforeFeature: boolean;       // Run E2E before each feature
  addE2ESetupFeature: boolean;        // Add E2E setup step
  runInitScript: boolean;             // Run init.sh
  checkDevServer: boolean;            // Check dev server is running
  baseUrl: string;                    // Base URL for E2E
  puppeteerAvailable: boolean;        // Puppeteer MCP available
}
```

### Executor Configuration

```typescript
interface ExecutorConfig {
  apiKey: string;                     // Anthropic API key
  model: string;                      // Model to use
  maxTurns?: number;                  // Max turns per feature
  permissionMode?: string;            // Permission mode
  useMock?: boolean;                  // Use mock for testing
}
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Anthropic API key |
| `WORKER_ID` | Unique worker identifier |
| `WORK_DIR` | Working directory |
| `HELIX_USE_MOCK_EXECUTOR` | Enable mock executor |

## Feature Categories

Features are categorized based on the target layer:

| Layer | Category | Steps |
|-------|----------|-------|
| `imp` | functional | Read → Design → Implement → Trace → Test |
| `tst` | test | Read impl → Happy path → Edge cases → Errors → Coverage |
| `api` | api | Read spec → Route → Validation → Response → Auth → Test |
| `dat` | data | Schema → Migrations → Models → Queries |
| `sec` | security | Audit → Fixes → Validation → Penetration |

## Git Integration

When `autoCommit` is enabled:

1. Stage all changes (`git add -A`)
2. Create commit with trace information:
   ```
   feat: implement cpe:tenant/req/story/USER/US-001

   User can view dashboard

   //@trace cpe:tenant/req/story/USER/US-001
   ```
3. Record commit SHA for completion signal

## Completion Signals

The harness generates completion signals:

```typescript
// All features passed
{ status: "COMPLETED", artifacts_created: [...], git_commit: "abc123" }

// Some features passed
{ status: "PARTIAL", error: "feature1: ...\nfeature2: ..." }

// All features failed
{ status: "FAILED", error: "..." }

// Blocked by gate
{ status: "BLOCKED", blocked_reason: "...", pending_gate_id: "..." }
```

## Error Handling

The harness implements retry logic:

```typescript
const harness = createCodingLoopHarness(handler, {
  maxRetries: 3,  // Retry failed features up to 3 times
});
```

If a feature fails after all retries:
- `feature.passes` is set to `false`
- `feature.error` contains the error message
- Harness continues to next feature
- Final status will be "PARTIAL" or "FAILED"

## Docker Deployment

```dockerfile
FROM node:20-alpine

WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm build

ENV NODE_ENV=production
CMD ["node", "packages/claude-worker/dist/worker.js"]
```

Scale workers with Docker Compose:

```yaml
claude-worker:
  build:
    dockerfile: docker/Dockerfile.claude-worker
  environment:
    - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
    - REDIS_HOST=redis
  deploy:
    replicas: 5
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

### Context Exhaustion

If tasks fail due to context limits:

1. Break requirements into smaller features
2. Reduce complexity per feature
3. Use more specific context packets

### E2E Verification Timeout

Increase timeout:

```typescript
const e2e = createE2EVerification({
  pageTimeout: 60000,  // 60 seconds
});
```

### shadcn Component Not Found

Verify component exists:

```typescript
if (!shadcn.isValidComponent("my-component")) {
  console.log("Available:", SHADCN_COMPONENTS);
}
```

## API Reference

See the [package README](../../packages/claude-worker/README.md) for complete API documentation.
