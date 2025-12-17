# Derivation API

The Derivation MCP (`@helix/mcp-derivation`) provides tools for requirements engineering, conflict detection, and cross-persona synthesis with polysemic modeling.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      DERIVATION MCP                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                   Requirements Engine                       │ │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │ │
│  │  │    Intent    │ │    CML       │ │   Conflict   │        │ │
│  │  │   Deriver    │ │   Parser     │ │   Detector   │        │ │
│  │  └──────────────┘ └──────────────┘ └──────────────┘        │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │               Cross-Persona Synthesizer                     │ │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │ │
│  │  │  Polysemic   │ │   Shared     │ │   Conflict   │        │ │
│  │  │   Modeling   │ │   Kernel     │ │  Resolution  │        │ │
│  │  └──────────────┘ └──────────────┘ └──────────────┘        │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Tools

### derive_intents

Generate a mini-PRD for a persona and optionally auto-submit requirements to the graph.

```typescript
const prd = await derivation.derive_intents({
  namespace: "psychotest",
  persona_uid: "cpe:psychotest/persona/HIRING-MANAGER",
  max_intents: 20,
  include_nfrs: true,
  auto_submit: true
});

// Returns:
// {
//   persona: "HIRING-MANAGER",
//   intents: [
//     { type: "story", title: "View Results", description: "...", priority: "high" },
//     { type: "nfr", title: "Results Load Time", description: "< 2s", priority: "medium" }
//   ],
//   submitted_uids: ["cpe:ns/req/story/HM/view-results", ...]
// }
```

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `namespace` | string | required | Project namespace |
| `persona_uid` | string | required | Persona UID to derive intents for |
| `max_intents` | number | 20 | Maximum intents to derive |
| `include_nfrs` | boolean | true | Include non-functional requirements |
| `auto_submit` | boolean | true | Automatically persist to graph |

When `auto_submit: true` (default), each derived intent is:
1. Created as an Artifact node in the graph
2. Linked to the parent persona via `DERIVES_FROM` relationship
3. Events are emitted for each created artifact

### submit_requirement

Submit a requirement in Context Mapper Language (CML) format.

```typescript
await derivation.submit_requirement({
  namespace: "psychotest",
  cml: `
    UserStory ViewResults {
      As a "Hiring Manager"
      I want to "view assessment results"
      with "filtering", "sorting", "export"
      so that "I can make informed hiring decisions"
      promotes "Efficiency"
      harms "Information Overload"
    }
  `,
  persona_uid: "cpe:psychotest/persona/HIRING-MANAGER"
});
```

**CML Format:**

```
UserStory <StoryId> {
  As a "<Persona>"
  I want to "<Action>" a "<Object>"
  with "<Feature1>", "<Feature2>", ...
  so that "<BusinessValue>"
  promotes "<PositiveQuality>"
  harms "<NegativeQuality>"
}
```

### detect_conflicts

Detect conflicts between requirements from different personas.

```typescript
const conflicts = await derivation.detect_conflicts({
  namespace: "psychotest",
  requirement_uids: [
    "cpe:psychotest/req/story/HM/view-results",
    "cpe:psychotest/req/story/CANDIDATE/hide-results"
  ]
});

// Returns:
// {
//   conflicts: [
//     {
//       type: "data_visibility",
//       persona_a: "HIRING-MANAGER",
//       persona_b: "CANDIDATE",
//       requirement_a: "cpe:ns/req/story/HM/view-results",
//       requirement_b: "cpe:ns/req/story/CANDIDATE/hide-results",
//       description: "HM wants to see results, Candidate wants results hidden",
//       severity: "high",
//       suggested_resolution: "polysemic_view"
//     }
//   ],
//   total_checked: 2,
//   conflict_count: 1
// }
```

**Conflict Types:**

| Type | Description |
|------|-------------|
| `data_visibility` | Conflicting access to same data |
| `action_collision` | Same action, different outcomes |
| `temporal_conflict` | Timing/sequence disagreement |
| `resource_contention` | Competing for same resource |
| `business_rule` | Conflicting business logic |

### synthesize_cross_persona

Create shared kernels and polysemic components for cross-persona concerns.

```typescript
const synthesis = await derivation.synthesize_cross_persona({
  namespace: "psychotest",
  persona_uids: [
    "cpe:psychotest/persona/HIRING-MANAGER",
    "cpe:psychotest/persona/CANDIDATE",
    "cpe:psychotest/persona/PSYCHOMETRICIAN"
  ],
  concern: "assessment-results",
  generate_polysemic_views: true
});

// Returns:
// {
//   polysemic_entity: {
//     name: "Assessment",
//     shared_kernel_fields: ["id", "title", "created_at"],
//     persona_views: [
//       {
//         persona: "HIRING-MANAGER",
//         visible_fields: ["id", "title", "scores", "ranking"],
//         editable_fields: [],
//         actions: ["view", "export", "compare"]
//       },
//       {
//         persona: "CANDIDATE",
//         visible_fields: ["id", "title", "time_remaining"],
//         editable_fields: ["answers"],
//         actions: ["take", "submit"]
//       },
//       {
//         persona: "PSYCHOMETRICIAN",
//         visible_fields: ["*"],  // All fields
//         editable_fields: ["scoring_algorithm", "item_bank"],
//         actions: ["configure", "analyze", "validate"]
//       }
//     ]
//   },
//   conflicts_resolved: 2,
//   shared_kernel_uid: "cpe:ns/arc/aggregate/SYSTEM/assessment"
// }
```

### suggest_bounded_contexts

Get Service Cutter-inspired suggestions for bounded contexts.

```typescript
const contexts = await derivation.suggest_bounded_contexts({
  namespace: "psychotest",
  requirements: [
    "cpe:psychotest/req/story/HM/view-results",
    "cpe:psychotest/req/story/HM/schedule-assessment",
    "cpe:psychotest/req/story/PSYCH/configure-test"
  ]
});

// Returns:
// {
//   suggested_contexts: [
//     {
//       name: "Assessment Context",
//       requirements: ["view-results", "schedule-assessment"],
//       coupling_score: 0.85
//     },
//     {
//       name: "Test Configuration Context",
//       requirements: ["configure-test"],
//       coupling_score: 0.72
//     }
//   ],
//   coupling_criteria: ["semantic", "temporal", "identity"]
// }
```

## Cross-Persona Synthesizer

The `CrossPersonaSynthesizer` implements **polysemic modeling** - creating single components that adapt to different persona contexts.

### Key Principle: Single Component, Multiple Views

```typescript
import { CrossPersonaSynthesizer } from "@helix/mcp-derivation";

const synthesizer = new CrossPersonaSynthesizer(graphClient, llm);
```

### Polysemic Entity

A single data entity with persona-specific views:

```typescript
interface PolysemicEntity {
  entityUid: string;
  entityName: string;
  allFields: EntityField[];
  sharedWithPersonas: string[];
  personaViews: PersonaView[];
  sharedKernelFields: string[];
  conflicts: PersonaConflict[];
}
```

### Persona View

What each persona sees of a shared entity:

```typescript
interface PersonaView {
  personaUid: string;
  personaName: string;
  visibleFields: string[];
  editableFields: string[];
  availableActions: string[];
  uiCustomizations: {
    showAdvancedControls: boolean;
    aggregateData: boolean;
    showAuditTrail: boolean;
    labelOverrides: Record<string, string>;
  };
}
```

### Conflict Resolution

When personas have conflicting needs:

```typescript
interface PersonaConflict {
  type: "field_visibility" | "action_collision" | "data_aggregation" | "label_mismatch";
  personas: string[];
  description: string;
  resolution: {
    type: "persona_filter" | "role_prop" | "separate_endpoint" | "conditional_render";
    implementation: string;
    codeSnippet?: string;
  };
}
```

### Generate Polysemic Components

```typescript
const result = await synthesizer.synthesizeEntity(
  "psychotest",
  "Assessment",
  ["HIRING-MANAGER", "CANDIDATE", "PSYCHOMETRICIAN"]
);

// Generates instructions for Claude Worker to create:
// 1. Shared Assessment entity with all fields
// 2. PersonaContext provider component
// 3. AssessmentView component that adapts to persona
// 4. Persona-specific DTOs for API responses
```

### Example: Polysemic Assessment View

```typescript
// Generated component adapts based on persona context
function AssessmentView({ assessment, persona }: Props) {
  const view = usePersonaView(assessment, persona);

  return (
    <div>
      {view.visibleFields.map(field => (
        <Field
          key={field}
          value={assessment[field]}
          editable={view.editableFields.includes(field)}
          label={view.labelOverrides[field] || field}
        />
      ))}
      {view.availableActions.map(action => (
        <ActionButton key={action} action={action} />
      ))}
    </div>
  );
}

// Usage:
// <AssessmentView assessment={data} persona="HIRING-MANAGER" />
// Shows: scores, ranking, export button
//
// <AssessmentView assessment={data} persona="CANDIDATE" />
// Shows: questions, timer, submit button (NO scores!)
```

## Critic Agent

Requirements are validated by an adversarial **Critic Agent** that challenges each requirement:

```typescript
// Internal to derive_intents
const critic = new CriticAgent(llm);

for (const intent of derivedIntents) {
  const critique = await critic.challenge(intent);

  if (critique.issues.length > 0) {
    // Refine the requirement based on critique
    intent = await refineRequirement(intent, critique);
  }
}
```

**Critique Categories:**

| Category | Example Challenge |
|----------|-------------------|
| `ambiguity` | "What does 'fast' mean? Define specific metrics" |
| `completeness` | "Missing error handling scenario" |
| `consistency` | "Conflicts with requirement X" |
| `testability` | "How would you verify this?" |
| `security` | "What about unauthorized access?" |

## Events

The Derivation MCP emits events for integration:

| Event | Description |
|-------|-------------|
| `requirement.created` | New requirement submitted |
| `requirement.refined` | Requirement updated after critique |
| `conflict.detected` | Conflict found between requirements |
| `conflict.resolved` | Conflict resolution applied |
| `synthesis.completed` | Cross-persona synthesis done |

## Error Handling

```typescript
import { HelixError, ErrorCode } from "@helix/common";

try {
  await derivation.submit_requirement({ ... });
} catch (error) {
  if (error instanceof HelixError) {
    switch (error.code) {
      case ErrorCode.CML_PARSE_ERROR:
        // Invalid CML syntax
        break;
      case ErrorCode.ORPHAN_ARTIFACT:
        // Parent persona not found
        break;
      case ErrorCode.VALIDATION_FAILED:
        // Requirement validation failed
        break;
    }
  }
}
```

## Integration with Gates

After derivation, **Gate #2 (Cross-Persona Synthesis)** is triggered:

```typescript
// After synthesize_cross_persona completes:
await cascade.request_gate_approval({
  namespace: "psychotest",
  gate_number: 2,
  artifact_uids: [synthesisResult.shared_kernel_uid],
  message: "Cross-persona synthesis complete - please review conflict resolutions"
});
```
