# Claude MCP Integration Guide

This guide explains how to connect Claude Code and Claude Desktop to Helix MCP servers, ensuring proper UID validation and artifact traceability across all 12 layers.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                     CLAUDE CODE / CLAUDE DESKTOP                     │
│                                                                      │
│  Uses MCP tools to:                                                  │
│  - Query Knowledge Graph (helix-graph)                               │
│  - Discover Personas (helix-discovery)                               │
│  - Derive Requirements (helix-derivation)                            │
│  - Generate Artifacts (helix-cascade)                                │
│  - Verify Compliance (helix-verification)                            │
└───────┬──────────┬──────────┬──────────┬──────────┬─────────────────┘
        │          │          │          │          │
        ▼          ▼          ▼          ▼          ▼
┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐
│   GRAPH   │ │ DISCOVERY │ │DERIVATION │ │  CASCADE  │ │VERIFICATION│
│   MCP     │ │    MCP    │ │    MCP    │ │    MCP    │ │    MCP    │
│           │ │           │ │           │ │           │ │           │
│ query     │ │ bootstrap │ │ derive    │ │ generate  │ │ verify    │
│ link      │ │ discover  │ │ submit    │ │ inject    │ │ prove     │
│ trace     │ │ mad_debate│ │ detect    │ │ gate      │ │ fitness   │
│ lineage   │ │ register  │ │ synthesize│ │ docs      │ │ coverage  │
└─────┬─────┘ └─────┬─────┘ └─────┬─────┘ └─────┬─────┘ └─────┬─────┘
      │             │             │             │             │
      └─────────────┴─────────────┴──────┬──────┴─────────────┘
                                         │
                    ┌────────────────────┼────────────────────┐
                    │                    │                    │
              ┌─────▼─────┐       ┌──────▼──────┐      ┌─────▼─────┐
              │  Neo4j    │       │    Redis    │      │  Config   │
              │  Graph    │       │   Events    │      │  Service  │
              └───────────┘       └─────────────┘      └───────────┘
```

## Quick Setup

### 1. Run the Setup Script

```bash
# Full setup (recommended for first time)
./scripts/setup-mcp.sh

# Or run individual steps
./scripts/setup-mcp.sh prereq   # Check prerequisites
./scripts/setup-mcp.sh build    # Build packages
./scripts/setup-mcp.sh infra    # Start Neo4j + Redis
./scripts/setup-mcp.sh config   # Generate Claude configs
./scripts/setup-mcp.sh test     # Test MCP servers
```

### 2. Set Environment Variables

```bash
export ANTHROPIC_API_KEY=your-api-key
export NEO4J_PASSWORD=helixpassword  # Default for development
```

### 3. Restart Claude

- **Claude Desktop**: Quit and restart the application
- **Claude Code CLI**: Start in the Helix directory: `cd helix && claude`

## MCP Configuration Files

### Claude Desktop (`~/Library/Application Support/Claude/claude_desktop_config.json`)

The setup script generates this automatically. Manual configuration:

```json
{
  "mcpServers": {
    "helix-graph": {
      "command": "node",
      "args": ["/path/to/helix/packages/mcp-graph/dist/server.js"],
      "env": {
        "NEO4J_URI": "bolt://localhost:7687",
        "NEO4J_USER": "neo4j",
        "NEO4J_PASSWORD": "helixpassword",
        "REDIS_HOST": "localhost",
        "REDIS_PORT": "6379",
        "HELIX_CONFIG": "/path/to/helix/helix.config.yaml"
      }
    }
    // ... other servers
  }
}
```

### Claude Code CLI (`.mcp.json` in project root)

The setup script creates this in the Helix directory.

## UID Taxonomy (RFC 8141)

All artifacts in Helix follow a strict UID format that ensures traceability:

```
cpe:{namespace}/{layer}/{artifact_type}/{persona_scope}/{artifact_id}[@version]
```

### Components

| Component | Description | Example |
|-----------|-------------|---------|
| `cpe:` | Fixed prefix (Cascading Persona Ecosystem) | `cpe:` |
| `namespace` | Project identifier (lowercase, alphanumeric + hyphens) | `psychotest`, `taskflow` |
| `layer` | Layer code (see table below) | `req`, `imp`, `tst` |
| `artifact_type` | Type within the layer | `story`, `class`, `unit` |
| `persona_scope` | Optional persona context (UPPERCASE) | `HIRING-MANAGER` |
| `artifact_id` | Unique identifier | `HM-REQ-001` |
| `@version` | Optional semantic version | `@1.0.0` |

### Layer Codes

| Code | Layer | # | Valid Artifact Types |
|------|-------|---|---------------------|
| `persona` | Persona | 0 | persona |
| `biz` | Business | 1 | goal, capability, metric |
| `req` | Requirements | 2 | story, epic, feature, nfr |
| `des` | Design | 3 | wireframe, mockup, prototype, flow |
| `arc` | Architecture | 4 | bounded-context, aggregate, service, component |
| `api` | API | 5 | endpoint, schema, contract |
| `dat` | Data | 6 | entity, migration, index, view |
| `sec` | Security | 7 | policy, role, permission, rls |
| `imp` | Implementation | 8 | module, class, function, handler |
| `tst` | Testing | 9 | unit, integration, e2e, contract |
| `cmp` | Compliance | 10 | audit, gdpr, soc2, hipaa |
| `inf` | Infrastructure | 11 | terraform, helm, dockerfile, pipeline |
| `doc` | Documentation | 12 | readme, api-doc, runbook, adr |

### UID Examples

```
cpe:psychotest/persona/TENANT-ADMIN
cpe:psychotest/req/story/HIRING-MANAGER/HM-REQ-001
cpe:psychotest/arc/service/SYSTEM/auth-service
cpe:psychotest/imp/class/USER/user-profile@1.0.0
cpe:psychotest/tst/unit/SYSTEM/auth-tests
```

## Traceability Flow

Every artifact must trace back to the Founding Intent through parent relationships:

```
Founding Intent
     │
     ▼
┌─────────────┐
│  Ecosystem  │  cpe:taskflow/ecosystem/main
└──────┬──────┘
       │ derives-from
       ▼
┌─────────────┐
│   Persona   │  cpe:taskflow/persona/PROJECT-MANAGER
└──────┬──────┘
       │ derives-from
       ▼
┌─────────────┐
│ User Story  │  cpe:taskflow/req/story/PROJECT-MANAGER/PM-001
└──────┬──────┘
       │ derives-from
       ▼
┌─────────────┐
│   Design    │  cpe:taskflow/des/wireframe/PROJECT-MANAGER/dashboard-wire
└──────┬──────┘
       │ derives-from
       ▼
┌─────────────┐
│   API Spec  │  cpe:taskflow/api/endpoint/PROJECT-MANAGER/get-tasks
└──────┬──────┘
       │ implements
       ▼
┌─────────────┐
│    Code     │  cpe:taskflow/imp/handler/PROJECT-MANAGER/tasks-handler
└──────┬──────┘
       │ tests
       ▼
┌─────────────┐
│    Tests    │  cpe:taskflow/tst/unit/PROJECT-MANAGER/tasks-handler-test
└─────────────┘
```

### Relationship Types

| Type | Direction | Purpose |
|------|-----------|---------|
| `derives-from` | Child → Parent | Cascade lineage (vertical) |
| `implements` | Code → Requirement | Verification link |
| `tests` | Test → Code | Coverage tracking |
| `documents` | Doc → Artifact | Knowledge capture |
| `conflicts-with` | Bidirectional | Conflict detection |
| `shares-with` | Artifact → Personas | Cross-persona ownership |
| `depends-on` | Dependent → Dependency | Technical dependencies |
| `versioned-from` | New → Previous | Audit lineage |

## Using MCP Tools

### 1. Query the Knowledge Graph

```typescript
// Use cpe/query_graph to run Cypher queries
{
  "tool": "cpe/query_graph",
  "arguments": {
    "cypher": "MATCH (p:Persona {tenantId: 'default'}) RETURN p.name, p.category",
    "tenant_id": "default"
  }
}
```

### 2. Trace Artifact Lineage

```typescript
// Use cpe/get_lineage to trace back to Founding Intent
{
  "tool": "cpe/get_lineage",
  "arguments": {
    "uid": "cpe:taskflow/imp/handler/PM/tasks-handler",
    "tenant_id": "default"
  }
}
```

### 3. Analyze Impact

```typescript
// Use cpe/trace_impact to find downstream dependencies
{
  "tool": "cpe/trace_impact",
  "arguments": {
    "uid": "cpe:taskflow/req/story/PM/PM-001",
    "tenant_id": "default",
    "max_depth": 5
  }
}
```

### 4. Generate Artifacts with Traceability

```typescript
// Use cpe/generate_artifact to create traced artifacts
{
  "tool": "cpe/generate_artifact",
  "arguments": {
    "name": "TaskHandler",
    "layer": "imp",
    "artifact_type": "handler",
    "persona_scope": "PROJECT-MANAGER",
    "parent_uid": "cpe:taskflow/api/endpoint/PM/get-tasks",
    "namespace": "taskflow",
    "tenant_id": "default"
  }
}
```

## Code Injection Rules

All generated code MUST include trace comments:

```typescript
//@trace cpe:taskflow/imp/handler/PM/tasks-handler

export class TaskHandler {
  //@trace cpe:taskflow/imp/function/PM/get-tasks
  async getTasks(userId: string): Promise<Task[]> {
    // Implementation...
  }
}
```

## Context Curation

The Orchestrator uses the Context Curator to build bounded context packets:

```typescript
// What Claude receives when implementing a task
{
  "packet": {
    "requirements": ["cpe:taskflow/req/story/PM/PM-001"],
    "design_specs": ["cpe:taskflow/des/wireframe/PM/dashboard"],
    "api_contracts": ["cpe:taskflow/api/endpoint/PM/get-tasks"],
    "constraints": [
      "Include //@trace {UID} comments in all generated code",
      "Follow existing code style and patterns",
      "Do not modify files outside the task scope"
    ]
  },
  "tools": ["helix-graph", "helix-cascade"],
  "excluded": ["PII_Data", "Billing_Schema", "Auth_Secrets"]
}
```

## Human Gates

5 mandatory human approval gates:

| Gate | After Phase | Purpose |
|------|-------------|---------|
| #1 | Persona Discovery | Validate persona roster |
| #2 | Cross-Persona Synthesis | Validate conflict resolutions |
| #3 | Architecture | Freeze before parallel branch |
| #4 | Pre-deployment | Final verification |
| #5 | Production | Go/No-go decision |

Check gate status:

```typescript
{
  "tool": "cpe/check_gate_status",
  "arguments": {
    "gate_number": 1,
    "tenant_id": "default"
  }
}
```

## Troubleshooting

### MCP Server Not Connecting

```bash
# Test server directly
echo '{"jsonrpc":"2.0","method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{}},"id":1}' | \
  node ./packages/mcp-graph/dist/server.js

# Check Neo4j connection
curl -s http://localhost:7474

# Check Redis connection
redis-cli ping
```

### UID Validation Errors

```typescript
// Invalid: lowercase persona scope
cpe:taskflow/req/story/project-manager/PM-001  // ❌

// Valid: UPPERCASE persona scope
cpe:taskflow/req/story/PROJECT-MANAGER/PM-001  // ✓

// Invalid: wrong artifact type for layer
cpe:taskflow/req/class/PM/PM-001  // ❌ (class is for imp layer)

// Valid: correct artifact type
cpe:taskflow/req/story/PM/PM-001  // ✓
```

### Orphan Artifact Errors

Every artifact (except Ecosystem and Persona) must have a parent:

```typescript
// This will fail - no parent specified
{
  "tool": "cpe/generate_artifact",
  "arguments": {
    "name": "Orphan",
    "layer": "imp",
    "artifact_type": "class"
    // Missing parent_uid!
  }
}

// This will succeed
{
  "tool": "cpe/generate_artifact",
  "arguments": {
    "name": "TaskHandler",
    "layer": "imp",
    "artifact_type": "class",
    "parent_uid": "cpe:taskflow/api/endpoint/PM/get-tasks"  // ✓
  }
}
```

## Next Steps

1. [Quickstart Guide](../getting-started/quickstart.md) - Bootstrap your first ecosystem
2. [Persona Discovery Guide](./persona-discovery.md) - Learn the Discovery Triad
3. [Requirements Guide](./requirements.md) - Write CML requirements
4. [Generation Guide](./generation.md) - Generate artifacts across layers
5. [Verification Guide](./verification.md) - Ensure compliance and coverage
