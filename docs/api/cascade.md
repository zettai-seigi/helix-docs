# Cascade API

The Cascade MCP (`@helix/mcp-cascade`) provides tools for 12-layer artifact generation, human gate workflows, and tenant policy injection.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CASCADE MCP                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                   Layer Generators                          │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │ │
│  │  │ Business │ │   Req    │ │  Design  │ │   Arc    │       │ │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐                    │ │
│  │  │ Security │ │Compliance│ │   RLS    │                    │ │
│  │  └──────────┘ └──────────┘ └──────────┘                    │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                Gate Workflow Manager                        │ │
│  │  Gate #1 → Gate #2 → Gate #3 → Gate #4 → Gate #5           │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Tools

### generate_artifact

Generate a single artifact with orphan prevention and automatic traceability.

```typescript
await cascade.generate_artifact({
  namespace: "psychotest",
  uid: "cpe:psychotest/imp/handler/HM/results-handler",
  layer: "imp",
  artifact_type: "handler",
  persona_scope: "HM",
  parent_uid: "cpe:psychotest/req/story/HM/view-results",
  content: "// Handler code...",
  metadata: {
    description: "Handles results retrieval for hiring managers"
  }
});
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `namespace` | string | Yes | Project namespace |
| `uid` | string | Yes | Full UID for the artifact |
| `layer` | LayerCode | Yes | Target layer |
| `artifact_type` | string | Yes | Artifact type |
| `persona_scope` | string | Yes | Owning persona or compound scope |
| `parent_uid` | string | Yes | Parent artifact UID (orphan prevention) |
| `content` | string | Yes | Artifact content |
| `metadata` | object | No | Additional metadata |

### generate_layer

Batch generate an entire layer using specialized generators.

```typescript
await cascade.generate_layer({
  namespace: "psychotest",
  layer: "req",
  source_layer: "persona",
  persona_uid: "cpe:psychotest/persona/HIRING-MANAGER"  // Optional
});
```

**Specialized Layer Generators:**

| Layer | Generator | Description |
|-------|-----------|-------------|
| `biz` | `BusinessGenerator` | Goals, capabilities, metrics from personas |
| `req` | `RequirementsGenerator` | Stories, epics, NFRs with Critic Agent |
| `des` | `DesignGenerator` | Wireframes, flows, prototypes |
| `arc` | `ArchitectureGenerator` | Bounded contexts, aggregates, services |
| `sec` | `RLSGenerator` | Row-level security policies |
| `cmp` | `ComplianceOrchestrator` | GDPR, SOC2, audit artifacts |

### inject_tenant_policy

Auto-inject tenant isolation policies into data artifacts.

```typescript
await cascade.inject_tenant_policy({
  namespace: "psychotest",
  artifact_uid: "cpe:psychotest/dat/entity/SYSTEM/assessment",
  policy_type: "rls"
});
```

**Policy Types:**

| Type | Description |
|------|-------------|
| `rls` | PostgreSQL Row-Level Security |
| `column_mask` | Column-level data masking |
| `tenant_filter` | Automatic tenant_id filtering |

### generate_role_based_views

Generate persona-specific UI views for polysemic entities.

```typescript
await cascade.generate_role_based_views({
  namespace: "psychotest",
  entity: "Assessment",
  personas: ["HIRING-MANAGER", "CANDIDATE", "PSYCHOMETRICIAN"]
});

// Generates:
// - HiringManagerAssessmentView (scores, rankings)
// - CandidateAssessmentView (questions, time limits - NO scores)
// - PsychometricianAssessmentView (full data + scoring logic)
```

### generate_persona_docs

Generate tailored documentation for each persona.

```typescript
await cascade.generate_persona_docs({
  namespace: "psychotest",
  persona_uid: "cpe:psychotest/persona/HIRING-MANAGER",
  doc_types: ["quickstart", "api-guide", "troubleshooting"]
});
```

## Human Gates

### Gate Workflow Manager

The Gate Workflow Manager enforces human approval checkpoints throughout the cascade. This implements the **Controlled Velocity** principle - preventing the cascade from running start-to-finish without stakeholder review.

```typescript
import { createGateWorkflowManager } from "@helix/mcp-cascade";

const gateManager = createGateWorkflowManager(graphClient, eventBus);
```

### Gate Definitions

| Gate | Name | Trigger | Blocks | Timeout | Approvers |
|------|------|---------|--------|---------|-----------|
| #1 | Persona Discovery | After discovery | Requirements | 48h | 1 |
| #2 | Cross-Persona Synthesis | After synthesis | Design | 48h | 1 |
| #3 | Design Review | After design | Architecture | 24h | 1 |
| #4 | Architecture Freeze | After architecture | Implementation | 24h | 2 |
| #5 | Pre-Deployment | After testing | Deployment | 24h | 2 |

### request_gate_approval

Request human approval at a gate checkpoint.

```typescript
const request = await cascade.request_gate_approval({
  namespace: "psychotest",
  gate_number: 4,
  artifact_uids: [
    "cpe:psychotest/arc/bounded-context/SYSTEM/assessment-context",
    "cpe:psychotest/arc/service/SYSTEM/scoring-service"
  ],
  message: "Architecture decisions for v1.0 - ready for review",
  timeout_hours: 24,
  required_approvers: 2
});

// Returns: { request_id: "gate-4-1705312800000", status: "pending", ... }
```

### check_gate_status

Check the status of a gate request.

```typescript
const status = await cascade.check_gate_status({
  namespace: "psychotest",
  gate_request_id: "gate-4-1705312800000"
});

// Returns:
// {
//   status: "pending" | "approved" | "rejected" | "timeout" | "escalated",
//   approvals: [...],
//   rejections: [...],
//   remaining_approvers: 1,
//   timeout_at: "2025-01-15T12:00:00Z"
// }
```

### Gate Events

The Gate Workflow Manager emits events for integration:

| Event | Description |
|-------|-------------|
| `gate.requested` | Gate approval requested |
| `gate.approved` | Gate fully approved |
| `gate.rejected` | Gate rejected |
| `gate.timeout` | Gate timed out |
| `gate.escalated` | Gate escalated to higher authority |

```typescript
eventBus.subscribe("gate.approved", async (event) => {
  const { gate_number, namespace, request_id } = event.data;
  // Trigger next cascade phase
});
```

## Layer Generators

### BusinessGenerator

Generates business layer artifacts from personas.

```typescript
import { generateBusinessArtifacts } from "@helix/mcp-cascade";

const result = await generateBusinessArtifacts(graphClient, llm, "psychotest");
// Generates: goals, capabilities, metrics for each persona
```

**Generated Artifacts:**
- `biz/goal` - Business goals per persona
- `biz/capability` - Required capabilities
- `biz/metric` - Success metrics

### RequirementsGenerator

Generates requirements with integrated Critic Agent for adversarial testing.

```typescript
import { generateRequirementsForPersona } from "@helix/mcp-cascade";

const result = await generateRequirementsForPersona(
  graphClient,
  llm,
  "psychotest",
  "cpe:psychotest/persona/HIRING-MANAGER"
);
```

**Features:**
- Generates stories, epics, NFRs
- Critic Agent challenges each requirement
- Automatic refinement based on critique
- Traceability to parent persona

### DesignGenerator

Generates design artifacts from requirements.

```typescript
import { generateDesignForRequirement } from "@helix/mcp-cascade";

const result = await generateDesignForRequirement(
  graphClient,
  llm,
  "psychotest",
  "cpe:psychotest/req/story/HM/view-results"
);
```

**Generated Artifacts:**
- `des/wireframe` - UI wireframes
- `des/flow` - User flows
- `des/prototype` - Interactive prototypes

### ArchitectureGenerator

Generates architecture from requirements and design.

```typescript
import { generateArchitecture } from "@helix/mcp-cascade";

const result = await generateArchitecture(graphClient, llm, "psychotest");
```

**Generated Artifacts:**
- `arc/bounded-context` - DDD bounded contexts
- `arc/aggregate` - Aggregate roots
- `arc/service` - Service definitions
- `arc/component` - Component specifications

### RLSGenerator

Generates Row-Level Security policies for multi-tenant isolation.

```typescript
import { generateRLSPolicies } from "@helix/mcp-cascade";

const result = await generateRLSPolicies(
  graphClient,
  "psychotest",
  "cpe:psychotest/dat/entity/SYSTEM/assessment"
);
```

**Generated Policies:**
- Tenant isolation (tenant_id filtering)
- Persona-based access control
- Cross-tenant data prevention

### ComplianceOrchestrator

Orchestrates compliance artifact generation.

```typescript
import { ComplianceOrchestrator } from "@helix/mcp-cascade";

const orchestrator = new ComplianceOrchestrator(graphClient, llm, config);
const result = await orchestrator.generateComplianceArtifacts("psychotest", {
  frameworks: ["gdpr", "soc2"],
  dataFlows: true,
  auditTrails: true
});
```

**Generated Artifacts:**
- `cmp/gdpr` - GDPR Article 30 records
- `cmp/soc2` - SOC2 control mappings
- `cmp/audit` - Audit trail configurations

## Integration with CascadeCoordinator

The `CascadeCoordinator` (from `@helix/orchestrator`) automatically triggers cascade phases after gate approvals:

```typescript
import { createCascadeCoordinator } from "@helix/orchestrator";

const coordinator = await createCascadeCoordinator({
  namespace: "psychotest",
  graphClient,
  eventBus
});

// Coordinator listens for gate.approved events and triggers:
// Gate #1 approved → derive_intents for all personas
// Gate #2 approved → generate_layer(design)
// Gate #3 approved → generate_layer(architecture)
// Gate #4 approved → generate_layer(api, dat, sec) in parallel
// Gate #5 approved → emit deployment.ready event
```

## Error Handling

```typescript
import { HelixError, ErrorCode } from "@helix/common";

try {
  await cascade.generate_artifact({ ... });
} catch (error) {
  if (error instanceof HelixError) {
    switch (error.code) {
      case ErrorCode.ORPHAN_ARTIFACT:
        // Parent not found - cannot create artifact
        break;
      case ErrorCode.GATE_NOT_PASSED:
        // Required gate not approved
        break;
      case ErrorCode.LAYER_VIOLATION:
        // Invalid layer derivation
        break;
    }
  }
}
```
