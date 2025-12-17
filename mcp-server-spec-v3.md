# Helix MCP Server Specification v3

## Faithful Implementation of the Cascading Persona Ecosystem

This specification is a comprehensive extraction from the source architecture document, implementing the MCP server as the "Nervous System" that operationalizes the Document-as-Code paradigm.

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Agent Topology](#2-agent-topology)
3. [Workflow & Human Gates](#3-workflow--human-gates)
4. [Resources](#4-resources)
5. [Tools by Phase](#5-tools-by-phase)
6. [Prompts: Agent SOPs](#6-prompts-agent-sops)
7. [Server Enforcement Layer](#7-server-enforcement-layer)
8. [Data Models](#8-data-models)
9. [Configuration](#9-configuration)

---

## 1. Design Philosophy

### 1.1 The Paradigm Shift

| Traditional AI | Document-as-Code (This Architecture) |
|----------------|--------------------------------------|
| Single-user, single-task | Multi-persona ecosystem |
| Implicit stakeholder model | Explicit persona discovery |
| Dev team simulation | Product stakeholder simulation |
| Black box code | Glass box traceability |
| Probabilistic prompting | Ontological grounding |
| Code generation only | 12-layer artifact cascade |

### 1.2 Core Principles

1. **Documentation is Living Code** - Artifacts are executable specifications, not passive text
2. **Intent-Based Compilation** - Founding Intent compiles through intermediate languages to code
3. **Map Equals Territory** - Documentation and implementation remain in perfect sync
4. **Ecosystem Completeness** - Discover ALL stakeholders before generating ANY code
5. **Total Traceability** - Every artifact traces back to Founding Intent via Knowledge Graph
6. **Self-Healing Automation** - Detect drift, auto-regenerate affected artifacts

### 1.3 The MCP as "Nervous System"

The MCP server connects AI agents to:
- **Traceability Knowledge Graph** (Neo4j) - The source of truth
- **12-Layer Artifact Cascade** - The generation pipeline
- **SaaS Domain Ontology (SDO)** - The semantic grounding
- **Human Approval Gates** - The governance checkpoints

**Analogy**: A Digital General Contractor where:
- **Resources** = Blueprints (The Graph)
- **Prompts** = Job Descriptions (Agent SOPs with methodology)
- **Tools** = Permits and Material Orders
- **Server** = Permit Office (Enforcement + Gates)

---

## 2. Agent Topology

### 2.1 The Virtual Software Company

The MCP orchestrates a hierarchy of AI agents modeled after a high-performing software development organization.

```
┌─────────────────────────────────────────────────────────────────┐
│                    CASCADE SUPERVISOR                            │
│                   (Chief Architect Agent)                        │
│         Manages DAG workflow, dispatches to sub-teams            │
└─────────────────────────┬───────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│   PHASE 1     │ │   PHASE 2     │ │   PHASE 3     │
│   Discovery   │ │   Derivation  │ │   Cascade     │
└───────┬───────┘ └───────┬───────┘ └───────┬───────┘
        │                 │                 │
        ▼                 ▼                 ▼
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ Persona       │ │ Intent        │ │ Layer Agents  │
│ Discovery     │ │ Derivation    │ │ (12 total)    │
│ Agent         │ │ Agents        │ │               │
│               │ │ (1 per        │ │ + Synthesis   │
│ + MAD Panel:  │ │  persona)     │ │   Agent       │
│ - Business    │ │               │ │               │
│   Analyst     │ │ + Critic      │ │ + Verification│
│ - UX Research │ │   Agent       │ │   Agents      │
│ - Domain      │ │               │ │               │
│   Expert      │ │               │ │               │
│ - Judge       │ │               │ │               │
└───────────────┘ └───────────────┘ └───────────────┘
```

### 2.2 Agent Registry

```typescript
interface AgentRegistry {
  // Orchestration
  cascade_supervisor: CascadeSupervisorAgent;

  // Phase 1: Discovery
  persona_discovery: PersonaDiscoveryAgent;
  mad_business_analyst: MADBusinessAnalystAgent;
  mad_ux_researcher: MADUXResearcherAgent;
  mad_domain_expert: MADDomainExpertAgent;
  mad_judge: MADJudgeAgent;

  // Phase 2: Derivation
  intent_derivation: IntentDerivationAgent[];  // One per persona
  critic: CriticAgent;  // Adversarial requirement testing

  // Phase 2.5: Synthesis
  cross_persona_synthesis: CrossPersonaSynthesisAgent;

  // Phase 3: Layer Generation
  business_agent: BusinessAgent;           // Layer 1
  requirements_agent: RequirementsAgent;   // Layer 2
  design_agent: DesignAgent;               // Layer 3
  architecture_agent: ArchitectureAgent;   // Layer 4
  api_agent: APIAgent;                     // Layer 5
  data_agent: DataAgent;                   // Layer 6
  security_agent: SecurityAgent;           // Layer 7
  implementation_agent: ImplementationAgent; // Layer 8
  testing_agent: TestingAgent;             // Layer 9
  compliance_agent: ComplianceAgent;       // Layer 10
  infrastructure_agent: InfrastructureAgent; // Layer 11
  documentation_agent: DocumentationAgent; // Layer 12

  // Verification
  drift_detection: DriftDetectionAgent;
  fitness_function: FitnessFunctionAgent;
  formal_verification: FormalVerificationAgent;
  llm_judge: LLMAsJudgeAgent;
}
```

### 2.3 Context Engineering (Google ADK Pattern)

Agents receive curated "working context" relevant only to their specific layer. This prevents "context distraction" and hallucination.

```typescript
const AGENT_CONTEXT_FILTER: Record<AgentRole, LayerAccess> = {
  // Frontend agents see UI + API, shielded from DB
  "frontend-team": {
    sees: ["design", "api"],
    shielded: ["data", "security", "infrastructure"]
  },

  // Backend agents see API + Data + Security
  "backend-team": {
    sees: ["api", "data", "security", "architecture"],
    shielded: ["design", "infrastructure"]
  },

  // Database team sees Data + Architecture
  "database-team": {
    sees: ["data", "architecture"],
    shielded: ["design", "api", "implementation"]
  },

  // Security agent sees Security + Data + Architecture
  "security-agent": {
    sees: ["security", "data", "architecture", "requirements"],
    shielded: ["design", "implementation"]
  },

  // Compliance agent sees Compliance + Business + Requirements
  "compliance-agent": {
    sees: ["compliance", "business", "requirements", "security"],
    shielded: ["implementation", "infrastructure"]
  }
};
```

---

## 3. Workflow & Human Gates

### 3.1 The Cascade Workflow DAG

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         FOUNDING INTENT                                  │
│                "Create a psychometric SaaS platform"                     │
└─────────────────────────────┬───────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      SEMANTIC BOOTSTRAP                                  │
│            Parse intent against SaaS Domain Ontology (SDO)               │
│            Infer: Multi-tenancy, Tenant Admin, Audit Trails              │
└─────────────────────────────┬───────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                   PHASE 1: PERSONA DISCOVERY                             │
│                                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                   │
│  │ Chain-of-    │  │ Multi-Agent  │  │ Ontology-    │                   │
│  │ Thought      │──▶│ Debate      │──▶│ Grounded    │                   │
│  │ Decomposition│  │ (MAD)        │  │ RAG          │                   │
│  └──────────────┘  └──────────────┘  └──────────────┘                   │
│                           │                                              │
│            Generates: Persona Graph (JSON-LD)                            │
│            F1 improvement: 0.726 → 0.841                                 │
└─────────────────────────────┬───────────────────────────────────────────┘
                              │
                              ▼
              ╔═══════════════════════════════════╗
              ║     🚧 HUMAN GATE #1 🚧           ║
              ║   Validate Persona Roster         ║
              ║   "Is DPO needed? Is DevOps?"     ║
              ╚═══════════════════════════════════╝
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│              PHASE 2: INTENT DERIVATION (Parallel)                       │
│                                                                          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │
│  │ Agent for   │ │ Agent for   │ │ Agent for   │ │ Agent for   │        │
│  │ SaaS Admin  │ │ Tenant Admin│ │ Candidate   │ │ DPO         │ ...    │
│  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘ └──────┬──────┘        │
│         │               │               │               │               │
│         └───────────────┴───────┬───────┴───────────────┘               │
│                                 │                                        │
│                    ┌────────────▼────────────┐                          │
│                    │      CRITIC AGENT       │                          │
│                    │  Adversarial Requirement│                          │
│                    │  Testing against SDO    │                          │
│                    └─────────────────────────┘                          │
│                                                                          │
│  Output: CML User Stories, Conflict Reports                              │
└─────────────────────────────┬───────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│            PHASE 2.5: CROSS-PERSONA SYNTHESIS                            │
│                                                                          │
│  Identify shared entities (e.g., "Assessment")                           │
│  Apply merge strategies (union, intersection)                            │
│  Create unified artifacts with persona-specific views                    │
│  Resolve conflicts: DPO retention vs Candidate deletion                  │
└─────────────────────────────┬───────────────────────────────────────────┘
                              │
                              ▼
              ╔═══════════════════════════════════╗
              ║     🚧 HUMAN GATE #2 🚧           ║
              ║   Validate Synthesized Intents    ║
              ║   Review conflict resolutions     ║
              ╚═══════════════════════════════════╝
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                 PHASE 3: ARTIFACT CASCADE                                │
│                                                                          │
│  SEQUENTIAL DEFINITION (Layers 1-4):                                     │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐              │
│  │ Business │──▶│ Require- │──▶│ Design   │──▶│ Architec-│              │
│  │ (Layer 1)│   │ ments(2) │   │ (Layer 3)│   │ ture (4) │              │
│  └──────────┘   └──────────┘   └──────────┘   └────┬─────┘              │
│                                                     │                    │
│              ╔══════════════════════════════════════╧════╗              │
│              ║         🚧 HUMAN GATE #4 🚧               ║              │
│              ║        Freeze Architecture                 ║              │
│              ╚══════════════════════════════════════╤════╝              │
│                                                     │                    │
│  PARALLEL BRANCH (Layers 5, 6, 7):                  │                    │
│                    ┌────────────────────────────────┼──────┐             │
│                    │                                │      │             │
│                    ▼                                ▼      ▼             │
│              ┌──────────┐                    ┌──────────┐ ┌──────────┐  │
│              │   API    │                    │   Data   │ │ Security │  │
│              │ (Layer 5)│                    │ (Layer 6)│ │ (Layer 7)│  │
│              └────┬─────┘                    └────┬─────┘ └────┬─────┘  │
│                   │                               │            │        │
│                   └───────────────┬───────────────┴────────────┘        │
│                                   │                                      │
│  CONVERGENCE (Layer 8):           ▼                                      │
│                          ┌──────────────────┐                            │
│                          │  Implementation  │                            │
│                          │    (Layer 8)     │                            │
│                          │  Frontend Team   │                            │
│                          │  Backend Team    │                            │
│                          │  Database Team   │                            │
│                          └────────┬─────────┘                            │
│                                   │                                      │
│  POST-CODE PARALLEL (Layers 9-12):│                                      │
│         ┌─────────────┬───────────┼───────────┬─────────────┐           │
│         ▼             ▼           ▼           ▼             ▼           │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│   │ Testing  │ │Compliance│ │ Infra-   │ │ Document-│ │          │     │
│   │ (Layer 9)│ │(Layer 10)│ │structure │ │ ation    │ │          │     │
│   │          │ │          │ │(Layer 11)│ │(Layer 12)│ │          │     │
│   └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘     │
└─────────────────────────────┬───────────────────────────────────────────┘
                              │
                              ▼
              ╔═══════════════════════════════════╗
              ║     🚧 HUMAN GATE #5 🚧           ║
              ║   Pre-Deployment Review           ║
              ║   Final verification sign-off     ║
              ╚═══════════════════════════════════╝
```

### 3.2 Human Approval Gates

```typescript
interface HumanGate {
  gate_id: "gate_1" | "gate_2" | "gate_4" | "gate_5";
  phase: string;
  validation_checklist: string[];
  blocking: boolean;
  timeout_hours?: number;
}

const HUMAN_GATES: HumanGate[] = [
  {
    gate_id: "gate_1",
    phase: "After Persona Discovery",
    validation_checklist: [
      "Are all direct beneficiaries identified?",
      "Are silent stakeholders (DPO, DevOps) included?",
      "Is the persona categorization correct (Internal/B2B/B2C)?",
      "Are data sovereignty requirements captured?",
      "Is the persona graph complete for this domain?"
    ],
    blocking: true
  },
  {
    gate_id: "gate_2",
    phase: "After Cross-Persona Synthesis",
    validation_checklist: [
      "Are conflict resolutions appropriate?",
      "Is the Shared Kernel correctly defined?",
      "Are persona-specific views properly separated?",
      "Are NFRs captured for all personas?",
      "Is terminology consistent with domain vocabulary?"
    ],
    blocking: true
  },
  {
    gate_id: "gate_4",
    phase: "After Architecture Definition",
    validation_checklist: [
      "Are Bounded Contexts correctly partitioned?",
      "Is the isolation model (Silo/Pool/Bridge) appropriate?",
      "Are ADRs documented with rationale?",
      "Is the C4 diagram accurate?",
      "Are cross-cutting concerns addressed?"
    ],
    blocking: true
  },
  {
    gate_id: "gate_5",
    phase: "Pre-Deployment",
    validation_checklist: [
      "Do all tests pass?",
      "Is compliance evidence complete?",
      "Are all UIDs properly linked in graph?",
      "Is documentation persona-specific?",
      "Are security policies verified (SMT proofs)?"
    ],
    blocking: true
  }
];
```

---

## 4. Resources

Resources expose the "Source of Truth" using the **RFC 8141-compliant UID taxonomy**.

### 4.1 Ontology Resources

```
cpe://ontology/sdo
```
**Purpose**: Read-access to the SaaS Domain Ontology (OWL/RDF)
**Contains**:
- Mandatory constraints (e.g., "SaaS implies Tenant Admin")
- Domain patterns (Psychometric, Healthcare, EdTech, Marketplace)
- Semantic relationships and controlled vocabulary
- OSLC (Open Services for Lifecycle Collaboration) vocabularies

**Used By**: All agents during Semantic Bootstrap phase

```
cpe://ontology/sdo/patterns/{pattern_id}
```
**Purpose**: Domain-specific pattern libraries
**Examples**:
- `cpe://ontology/sdo/patterns/saas` - SaaS platform archetype
- `cpe://ontology/sdo/patterns/psychometric` - Assessment platform requirements
- `cpe://ontology/sdo/patterns/healthcare` - HIPAA-compliant structures

```
cpe://ontology/external/onet
```
**Purpose**: O*NET Occupational Information Network integration
**Used By**: MAD Domain Expert Agent for role validation

```
cpe://ontology/external/regulations/{framework}
```
**Purpose**: Regulatory role definitions
**Examples**:
- `cpe://ontology/external/regulations/gdpr` - GDPR-mandated roles (DPO)
- `cpe://ontology/external/regulations/hipaa` - HIPAA roles
- `cpe://ontology/external/regulations/sox` - SOX compliance roles

### 4.2 Persona Graph Resources

```
cpe://graph/personas
```
**Purpose**: The live Persona Ecosystem (JSON-LD)
**Content**: All discovered stakeholders including "silent" roles
**Includes**: Coverage rationale explaining WHY each persona exists

```json
{
  "@context": "https://schema.org/",
  "personas": [
    {
      "@id": "cpe:psychotest/persona/TENANT-ADMIN",
      "@type": "Persona",
      "name": "Tenant Administrator",
      "category": "b2b_customer",
      "type": "internal",
      "priority": 1,
      "accessLevel": "tenant-scoped",
      "dataSovereignty": {
        "retention": "7years",
        "jurisdiction": "EU",
        "rightToErasure": false
      },
      "intent": "Seamless Integration and Security",
      "constraints": ["Cannot access other tenant data"],
      "vocabulary": ["Tenant", "Subscription", "Integration"],
      "accessibilityProfile": null,
      "coverageRationale": "B2B SaaS requires tenant-level administration for subscription management, user provisioning, and integration configuration",
      "discoverySource": "SDO:SaaS-Pattern + MAD:BusinessAnalyst",
      "relationships": [
        { "type": "manages", "target": "cpe:psychotest/persona/HIRING-MANAGER" },
        { "type": "reports-to", "target": "cpe:psychotest/persona/SAAS-ADMIN" }
      ]
    }
  ],
  "discovery_metadata": {
    "founding_intent": "Create a psychometric SaaS platform",
    "discovery_method": "CoT + MAD + OG-RAG",
    "f1_score": 0.841,
    "gate_1_approved": true,
    "approved_by": "human@example.com",
    "approved_at": "2025-01-15T10:30:00Z"
  }
}
```

```
cpe://graph/personas/{persona_uid}
```
**Purpose**: Single persona with full context
**Returns**: Persona node + all connected intents, stories, permissions, downstream artifacts

```
cpe://graph/personas/categories/{category}
```
**Purpose**: Filter personas by category
**Categories**: `internal_platform`, `b2b_customer`, `b2c_end_user`, `external_stakeholder`

### 4.3 Traceability Resources (Index-Free Adjacency)

```
cpe://graph/traceability/{uid}
```
**Purpose**: Dynamic resource enabling instant impact analysis
**Key Innovation**: Returns not just content, but **graph edges**

**Example Request**: `cpe://graph/traceability/cpe:psychotest/req/story/HIRING-MANAGER/HM-REQ-001`

```json
{
  "uid": "cpe:psychotest/req/story/HIRING-MANAGER/HM-REQ-001",
  "content": "As a Hiring Manager, I want to view candidate results so that I can make informed hiring decisions",
  "layer": 2,
  "artifact_type": "user_story",
  "cml_source": "UserStory ViewResults { As a \"HiringManager\" I want to \"view\" a \"CandidateResult\" ... }",
  "status": "active",
  "version": "1.0.0",
  "edges": {
    "DERIVES_FROM": ["cpe:psychotest/persona/HIRING-MANAGER"],
    "IMPLEMENTS": [
      "cpe:psychotest/impl/api/GET-results-endpoint",
      "cpe:psychotest/impl/ui/results-dashboard-component"
    ],
    "TESTS": [
      "cpe:psychotest/test/integration/view-results-test",
      "cpe:psychotest/test/e2e/hiring-manager-flow"
    ],
    "CONFLICTS_WITH": [],
    "SHARES_WITH": ["cpe:psychotest/persona/HIRING-MANAGER"],
    "DEPENDS_ON": ["cpe:psychotest/context/AssessmentContext"]
  },
  "impact_radius": {
    "direct": 4,
    "transitive": 18
  },
  "validation": {
    "critic_approved": true,
    "sdo_compliant": true,
    "authority_check": "PASSED"
  },
  "audit": {
    "created_by": "intent-derivation-agent:HIRING-MANAGER",
    "created_at": "2025-01-15T11:00:00Z",
    "last_modified_by": "cross-persona-synthesis-agent",
    "last_modified_at": "2025-01-15T12:30:00Z"
  }
}
```

### 4.4 Layer-Specific Resources (Context Engineering)

```
cpe://artifacts/layer/{layer_id}
```
**Purpose**: Expose specific cascade layers to Context Engineering
**Key Innovation**: Agents receive only their "working context"

| Layer ID | Layer # | Content Exposed | Shielded From |
|----------|---------|-----------------|---------------|
| `business` | 1 | Goals, OKRs, Fitness Functions | All technical layers |
| `requirements` | 2 | User Stories, Epics, NFRs, Acceptance Criteria | Implementation details |
| `design` | 3 | Wireframes, User Flows, Role-Based Views | Database schemas |
| `architecture` | 4 | ADRs, C4 Diagrams, Bounded Contexts, Context Maps | Raw code |
| `api` | 5 | OpenAPI/MDSL Contracts, GraphQL schemas | Internal implementation |
| `data` | 6 | Entity definitions, ERDs, Migrations, Seed data | Application code |
| `security` | 7 | RBAC policies, Threat Models (STRIDE), RLS rules | Business logic |
| `implementation` | 8 | Source code, ORM entities, DTOs | Infrastructure configs |
| `testing` | 9 | Test cases, Scenario simulations, Pact contracts | Production data |
| `compliance` | 10 | GDPR maps, Audit logs, SOC2 controls, Article 30 records | Technical details |
| `infrastructure` | 11 | Terraform/Helm/Pulumi, CI/CD pipelines | Application code |
| `documentation` | 12 | User guides (persona-specific), API refs, Runbooks | Source code |

### 4.5 Conflict & Synthesis Resources

```
cpe://synthesis/conflicts
```
**Purpose**: View all detected conflicts between personas
**Content**: Conflict reports with resolution recommendations

```json
{
  "conflicts": [
    {
      "conflict_id": "CONFLICT-001",
      "type": "resource_contention",
      "personas_involved": [
        "cpe:psychotest/persona/DPO",
        "cpe:psychotest/persona/CANDIDATE"
      ],
      "description": "DPO requires 7-year data retention for audit trails; Candidate requires immediate deletion (Right to be Forgotten)",
      "affected_entity": "PersonalData",
      "recommendations": [
        {
          "strategy": "separate",
          "description": "Separate audit logs from personal data; audit logs retain anonymized references",
          "priority": "recommended"
        },
        {
          "strategy": "prioritize",
          "description": "Compliance (DPO) overrides user preference for audit-critical data",
          "priority": "alternative"
        }
      ],
      "resolution_status": "pending_gate_2",
      "resolution_decision": null
    }
  ]
}
```

```
cpe://synthesis/shared-kernel
```
**Purpose**: View unified entities created by Cross-Persona Synthesis
**Content**: Polysemic entity definitions with persona-specific views

```json
{
  "shared_kernel": [
    {
      "entity": "Assessment",
      "unified_definition": {
        "uid": "cpe:psychotest/data/entity/Assessment",
        "core_attributes": ["id", "title", "created_at", "tenant_id"],
        "description": "A psychometric evaluation instrument"
      },
      "persona_views": {
        "PSYCHOMETRICIAN": {
          "dto": "AssessmentFullDTO",
          "visible_attributes": ["*", "scoring_logic", "item_bank", "validity_evidence"],
          "permissions": ["CREATE", "READ", "UPDATE", "DELETE", "MANAGE"]
        },
        "CANDIDATE": {
          "dto": "CandidateAssessmentDTO",
          "visible_attributes": ["id", "title", "questions", "time_limit"],
          "hidden_attributes": ["scoring_logic", "correct_answers"],
          "permissions": ["READ", "SUBMIT"]
        },
        "HIRING_MANAGER": {
          "dto": "ManagerAssessmentResultDTO",
          "visible_attributes": ["id", "title", "aggregate_scores", "recommendations"],
          "hidden_attributes": ["individual_responses", "scoring_logic"],
          "permissions": ["READ"]
        },
        "DPO": {
          "dto": "AuditAssessmentDTO",
          "visible_attributes": ["*", "audit_trail", "data_processing_records"],
          "permissions": ["READ", "AUDIT", "DELETE"]
        }
      },
      "unified_api_endpoints": [
        {
          "endpoint": "/api/assessments/{id}",
          "annotation": "Used by Psychometrician to manage; Candidate to take; Manager to review results; DPO to audit"
        }
      ]
    }
  ]
}
```

### 4.6 Verification Resources

```
cpe://verification/drift
```
**Purpose**: Current drift detection status
**Content**: Discrepancies between spec-state and implementation-state

```
cpe://verification/coverage
```
**Purpose**: Traceability coverage gaps
**Content**: Requirements without tests, code without requirements ("orphans")

```
cpe://verification/proofs
```
**Purpose**: Formal verification results
**Content**: SMT proof status for RBAC and security policies

### 4.7 Audit Resources

```
cpe://audit/{tenant_id}?from={timestamp}&to={timestamp}
```
**Purpose**: Generation audit trail (the "Glass Box")
**Content**: Which agent made what change, when, and which requirement triggered it

```json
{
  "audit_entries": [
    {
      "audit_id": "AUDIT-12345",
      "timestamp": "2025-01-15T14:30:00Z",
      "agent": "implementation-agent:backend-team",
      "action": "GENERATE",
      "artifact_uid": "cpe:psychotest/impl/api/results-endpoint",
      "triggered_by": "cpe:psychotest/req/story/HIRING-MANAGER/HM-REQ-001",
      "rationale": "Generated API endpoint to satisfy HM-REQ-001: View candidate results",
      "commit_sha": "abc123def",
      "commit_message": "feat(api): add GET /results endpoint for HM-REQ-001\n\n//@trace HM-REQ-001"
    }
  ]
}
```

---

## 5. Tools by Phase

### 5.1 Semantic Bootstrap Tools

```typescript
tool: "cpe/bootstrap_ecosystem"
description: "The 'Big Bang' tool - initiates the entire cascade from founding intent"
input: {
  founding_intent: string,       // e.g., "Create a psychometric SaaS platform"
  domain_hints?: string[],       // Optional: ["HR-tech", "B2B", "multi-tenant"]
}
behavior:
  1. Parse founding_intent against SaaS Domain Ontology (SDO)
  2. Extract implicit constraints:
     - "SaaS" → Multi-tenancy required
     - "SaaS" → Tenant Admin persona mandatory
     - "Psychometric" → Validity Evidence required
     - "Psychometric" → Psychometrician persona mandatory
  3. Load relevant Domain Pattern Libraries
  4. Initialize empty Knowledge Graph with ontology-derived seed constraints
  5. Create session for subsequent operations
output: {
  session_id: string,
  ontology_constraints: Constraint[],
  inferred_patterns: string[],         // e.g., ["saas-platform", "psychometric-assessment"]
  mandatory_personas: string[],        // Ontology-mandated personas
  mandatory_artifacts: string[],       // Ontology-mandated artifacts
  controlled_vocabulary: Term[],       // Domain terminology
  next_phase: "persona_discovery"
}
validation:
  - Intent must be parseable against at least one SDO pattern
  - Throws "UNKNOWN_DOMAIN" if no patterns match
```

### 5.2 Phase 1: Discovery Tools

#### 5.2.1 The Discovery Triad

```typescript
tool: "cpe/discover_personas"
description: "Execute the Discovery Triad: CoT + MAD + OG-RAG"
input: {
  session_id: string,
  discovery_config?: {
    enable_mad: boolean,           // Default: true
    enable_og_rag: boolean,        // Default: true
    external_sources: string[],    // e.g., ["onet", "gdpr", "hipaa"]
    thoroughness: "quick" | "standard" | "exhaustive"
  }
}
behavior:
  Step 1: Chain-of-Thought Domain Decomposition
    Execute Recursive Stakeholder Network Interrogation:
    Q1: "Who directly uses assessment tools?" → Direct Beneficiaries
    Q2: "Who purchases/subscribes?" → Indirect Beneficiaries
    Q3: "Who creates/manages content?" → Content/Management
    Q4: "Who ensures compliance?" → Governance
    Q5: "Who maintains the platform?" → Operations

    Generate initial persona candidates with coverage_rationale

  Step 2: Multi-Agent Debate (MAD)
    Spawn 3 specialist sub-agents:
    - Business Analyst Agent: Identifies buyer personas, economic stakeholders
    - UX Researcher Agent: Identifies end-users, usability needs
    - Domain Expert Agent: Validates against O*NET, industry patterns

    Debate rounds until consensus or timeout
    Judge Agent consolidates findings

  Step 3: Ontology-Grounded RAG (OG-RAG)
    Retrieve from external knowledge bases:
    - O*NET: Standard occupational roles
    - GDPR/HIPAA: Regulatory-mandated roles
    - Industry Patterns: Domain-specific archetypes

    Validate and augment persona list

output: {
  personas: PersonaNode[],
  relationships: PersonaRelationship[],
  discovery_metadata: {
    method: "CoT + MAD + OG-RAG",
    f1_score_estimate: number,       // Target: 0.841
    recall_improvement: string,      // e.g., "+55% from OG-RAG"
    mad_debate_rounds: number,
    external_sources_used: string[]
  },
  coverage_analysis: {
    direct_beneficiaries: string[],
    indirect_beneficiaries: string[],
    operational_support: string[],
    governance_compliance: string[],
    silent_stakeholders_found: string[]
  },
  status: "pending_gate_1",
  next_action: "await_human_gate_1"
}
```

```typescript
tool: "cpe/mad_debate"
description: "Execute Multi-Agent Debate for persona refinement"
input: {
  session_id: string,
  initial_candidates: PersonaCandidate[],
  debate_config: {
    max_rounds: number,           // Default: 3
    consensus_threshold: number,  // Default: 0.8
  }
}
behavior:
  For each round:
    1. Business Analyst Agent proposes buyer personas
    2. UX Researcher Agent proposes end-user personas
    3. Domain Expert Agent validates against patterns
    4. Each agent critiques others' proposals
    5. Judge Agent scores consensus

  Terminate when:
    - Consensus threshold reached, OR
    - Max rounds exhausted

output: {
  final_candidates: PersonaCandidate[],
  debate_transcript: DebateRound[],
  consensus_score: number,
  judge_rationale: string
}
```

```typescript
tool: "cpe/register_persona"
description: "Write validated persona to graph"
input: {
  session_id: string,
  persona_definition: {
    "@type": "Persona",
    "name": string,
    "category": "internal_platform" | "b2b_customer" | "b2c_end_user" | "external_stakeholder",
    "type": "internal" | "b2b" | "b2c" | "compliance" | "operational",
    "accessLevel": "platform" | "tenant-scoped" | "user-scoped",
    "intent": string,
    "constraints": string[],
    "vocabulary": string[],
    "dataSovereignty": {
      "retention": string,
      "jurisdiction": string,
      "rightToErasure": boolean
    },
    "accessibilityProfile"?: string,  // e.g., "WCAG 2.1 AA"
    "coverageRationale": string       // WHY this persona is needed
  }
}
validation:
  - Schema conforms to Persona-as-Code specification
  - accessLevel valid for persona category
  - dataSovereignty complete for compliance personas
  - coverageRationale is non-empty
  - vocabulary terms exist in controlled vocabulary OR flagged for review
output: {
  uid: string,                        // Assigned UID following taxonomy
  status: "draft",
  validation_result: ValidationResult,
  graph_node_id: string
}
```

#### 5.2.2 Gate Tools

```typescript
tool: "cpe/request_gate_approval"
description: "Request human approval at a workflow gate"
input: {
  session_id: string,
  gate_id: "gate_1" | "gate_2" | "gate_4" | "gate_5",
  artifacts_for_review: string[],     // UIDs of artifacts to review
  summary: string,
  checklist_responses?: Record<string, boolean>
}
output: {
  gate_request_id: string,
  status: "pending_human_review",
  reviewer_url: string,               // Link for human reviewer
  timeout_at: string                  // ISO timestamp
}
```

```typescript
tool: "cpe/check_gate_status"
description: "Check if a human gate has been approved"
input: {
  gate_request_id: string
}
output: {
  status: "pending" | "approved" | "rejected" | "timeout",
  approved_by?: string,
  approved_at?: string,
  rejection_reason?: string,
  feedback?: string
}
```

### 5.3 Phase 2: Intent Derivation Tools

```typescript
tool: "cpe/derive_intents"
description: "Generate mini-PRD for a specific persona"
input: {
  session_id: string,
  persona_uid: string,
  derivation_config?: {
    include_nfrs: boolean,           // Non-functional requirements
    include_acceptance_criteria: boolean,
    cross_reference_existing: boolean
  }
}
behavior:
  1. Load persona JSON-LD definition
  2. Execute "Recursive Stakeholder Network Interrogation" persona-specific:
     - "What defines success for this persona?"
     - "What are their specific pain points?"
     - "What jobs must they get done?"
  3. Generate structured outputs:
     - Goals & Jobs-to-be-Done
     - Pain Points
     - Success Metrics
     - User Stories (in CML format)
     - Acceptance Criteria
     - NFRs
  4. Tag cross-persona dependencies
output: {
  persona_uid: string,
  mini_prd: {
    goals: Goal[],
    pain_points: PainPoint[],
    success_metrics: Metric[],
    user_stories: CMLUserStory[],
    acceptance_criteria: AcceptanceCriterion[],
    nfrs: NonFunctionalRequirement[]
  },
  cross_persona_tags: CrossPersonaTag[],
  status: "pending_critic_validation"
}
```

```typescript
tool: "cpe/submit_requirement"
description: "Submit requirement with semantic validation and adversarial testing"
input: {
  session_id: string,
  persona_uid: string,
  requirement: {
    uid?: string,                     // Proposed UID (auto-generated if not provided)
    cml_content: string,              // Context Mapper Language definition
    /*
     * Example CML:
     * UserStory ConfigureAssessment {
     *     As a "Psychometrician"
     *     I want to "configure" a "Cognitive Ability Test"
     *     with "Item Bank Selection", "Time Constraints", "Scoring Algorithms"
     *     so that "I can measure candidate problem-solving skills accurately"
     *     promotes "Validity"
     *     harms "Test Anxiety"
     * }
     */
  }
}
behavior:
  1. Parse CML into structured format
  2. Validate UID follows RFC 8141 grammar
  3. Execute Semantic Validation:
     - Check actor (persona) has authority for requested capability
     - Validate against SaaS Domain Ontology constraints
     - Check terminology matches controlled vocabulary
  4. Invoke Critic Agent for Adversarial Requirement Testing:
     - Challenge: "Is this persona authorized for this action?"
     - Challenge: "Does this violate any domain constraints?"
     - Challenge: "Is this a hallucinated feature?"
  5. Create requirement node with DERIVES_FROM edge to persona
validation:
  - UID conforms to taxonomy
  - Actor has authority (checked against SDO)
  - Terminology in controlled vocabulary
  - No domain constraint violations
output: {
  uid: string,
  status: "draft" | "rejected",
  semantic_validation: {
    passed: boolean,
    authority_check: {
      actor: string,
      requested_capability: string,
      authorized: boolean,
      authority_source: string        // e.g., "SDO:Psychometric-Integrity"
    },
    vocabulary_check: {
      unknown_terms: string[],
      suggestions: Record<string, string>
    },
    constraint_violations: Violation[]
  },
  critic_assessment: {
    challenges_passed: number,
    challenges_failed: number,
    rejection_reasons: string[]
  }
}
```

```typescript
tool: "cpe/detect_conflicts"
description: "Pairwise comparison to detect cross-persona conflicts"
input: {
  session_id: string,
  requirement_uids?: string[]        // Specific requirements, or all if not provided
}
behavior:
  1. For each pair of requirements from different personas:
     - Compute semantic similarity score
     - Check for resource contention
     - Check for contradictory constraints
  2. Generate Conflict Reports with recommendations
output: {
  conflicts: Conflict[],
  /*
   * Each conflict includes:
   * - type: "semantic_overlap" | "resource_contention" | "constraint_contradiction"
   * - personas_involved: string[]
   * - requirements_involved: string[]
   * - severity: "low" | "medium" | "high" | "blocking"
   * - recommendations: Resolution[]
   *   - strategy: "merge" | "prioritize" | "separate" | "escalate"
   *   - description: string
   */
  summary: {
    total_conflicts: number,
    blocking_conflicts: number,
    auto_resolvable: number
  }
}
```

### 5.4 Phase 2.5: Synthesis Tools

```typescript
tool: "cpe/synthesize_cross_persona"
description: "Merge overlapping requirements into Shared Kernel using Polysemic Modeling"
input: {
  session_id: string,
  entity_candidates: string[],        // Entity names to analyze
  conflict_resolutions?: Record<string, Resolution>  // Pre-decided resolutions
}
behavior:
  1. Identify shared entities across personas
  2. For each shared entity:
     - Determine core attributes (shared by all)
     - Determine persona-specific views
     - Determine permission boundaries per persona
  3. Apply merge strategies:
     - Union: Combine all attributes
     - Intersection: Only shared attributes
     - Delegate: Escalate to human
  4. Apply Conflict Resolution Hierarchy:
     a. Compliance personas override business personas
     b. Data sovereignty trumps convenience
     c. Security-by-default for ambiguous cases
  5. Generate unified artifacts with view mappings
output: {
  shared_kernel: SharedKernelEntity[],
  /*
   * Each entity includes:
   * - entity_name: string
   * - unified_definition: EntitySchema
   * - persona_views: Record<string, ViewDefinition>
   * - unified_api_annotations: string[]
   */
  resolution_log: ResolutionDecision[],
  status: "pending_gate_2"
}
```

```typescript
tool: "cpe/suggest_bounded_contexts"
description: "Apply Service Cutter algorithms to suggest architectural boundaries"
input: {
  session_id: string,
  cml_stories: string[]               // CML user story UIDs
}
behavior:
  1. Parse CML stories to extract:
     - Actors
     - Actions
     - Entities
     - Data flows
  2. Apply Service Cutter coupling criteria:
     - Semantic proximity (do stories reference same data?)
     - Change frequency (do they change together?)
     - Security boundaries (different trust levels?)
     - Scaling needs (different load patterns?)
  3. Cluster into suggested Bounded Contexts
output: {
  suggested_contexts: BoundedContext[],
  /*
   * Each context includes:
   * - name: string (e.g., "AssessmentContext", "ScoringContext")
   * - included_stories: string[]
   * - coupling_rationale: string
   * - suggested_team: string (e.g., "Assessment Team")
   */
  coupling_matrix: CouplingScore[][],
  warnings: string[]                  // e.g., "High coupling between X and Y"
}
```

### 5.5 Phase 3: Cascade Tools

#### 5.5.1 Layer Generation Tools

```typescript
tool: "cpe/generate_artifact"
description: "Primary builder tool with orphan prevention and UID injection"
input: {
  session_id: string,
  layer: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  artifact_type: string,              // Layer-specific type
  content: string | object,
  parent_uid: string,                 // REQUIRED - enforces "No Orphans"
  metadata?: {
    generator_agent: string,
    confidence: number
  }
}
validation:
  1. parent_uid exists in graph
  2. parent_uid is from valid upstream layer (per DAG)
  3. Layer dependencies satisfied:
     - Layer 1 (Business): Root level, no parent required except session
     - Layer 2 (Requirements): Parent must be Layer 1 or Persona
     - Layer 3 (Design): Parent must be Layer 2
     - Layer 4 (Architecture): Parent must be Layer 2 or 3
     - Layer 5 (API): Parent must be Layer 4
     - Layer 6 (Data): Parent must be Layer 4 or 5
     - Layer 7 (Security): Parent must be Layer 4
     - Layer 8 (Implementation): Parent must be Layer 2, 5, 6, or 7
     - Layer 9 (Testing): Parent must be Layer 8
     - Layer 10 (Compliance): Parent must be Layer 1 or 7
     - Layer 11 (Infrastructure): Parent must be Layer 4
     - Layer 12 (Documentation): Parent can be any layer
behavior:
  1. Validate parent relationship
  2. Assign UID following taxonomy:
     cpe:{project}/{layer_code}/{artifact_type}/{parent_scope}/{artifact_id}
  3. Inject UID into artifact content:
     - Code: Add comment `//@trace {UID}`
     - Documentation: Add frontmatter `trace: {UID}`
     - Config: Add metadata field
  4. Create IMPLEMENTS edge to parent
  5. Update parent's IMPLEMENTED_BY edges
error:
  - "ORPHAN_ARTIFACT": No valid parent_uid provided
  - "LAYER_VIOLATION": Parent not from valid upstream layer
  - "GATE_NOT_PASSED": Required gate not approved
output: {
  uid: string,
  layer: number,
  trace_links: TraceLink[],
  uid_injection_locations: string[],  // Where UID was embedded
  status: "draft"
}
```

```typescript
tool: "cpe/generate_role_based_views"
description: "Generate persona-specific UI views from shared design"
input: {
  session_id: string,
  base_design_uid: string,
  personas: string[]
}
behavior:
  For each persona:
    1. Determine visible elements based on accessLevel
    2. Determine hidden elements based on constraints
    3. Apply accessibilityProfile if present
    4. Generate persona-specific wireframe/component
output: {
  views: Record<string, DesignArtifact>,
  /*
   * e.g., {
   *   "CANDIDATE": { wireframe: "...", hidden: ["scoring_section"] },
   *   "HIRING_MANAGER": { wireframe: "...", visible: ["aggregate_results"] }
   * }
   */
  shared_components: string[]
}
```

```typescript
tool: "cpe/inject_tenant_policy"
description: "Auto-inject RLS and tenant isolation into data artifacts"
input: {
  session_id: string,
  artifact_uid: string,               // Database schema artifact
  isolation_model: "pooled" | "bridge" | "siloed",
  tenant_column?: string              // Default: "tenant_id"
}
behavior:
  For "pooled" model:
    1. Inject tenant_id column into all tables
    2. Generate PostgreSQL RLS policies:
       CREATE POLICY tenant_isolation ON {table}
         USING (tenant_id = current_setting('app.tenant_id')::uuid);
    3. Generate middleware tenant context injection:
       authorize(user, action, tenantId) pattern

  For "bridge" model:
    1. Generate schema-per-tenant configuration
    2. Generate connection routing middleware
    3. Generate schema provisioning scripts

  For "siloed" model:
    1. Generate IaC for database-per-tenant
    2. Generate connection factory with tenant routing
    3. Generate tenant provisioning workflows
output: {
  modified_artifact_uid: string,
  generated_policies: {
    rls_statements?: string[],
    middleware_code?: string,
    iac_resources?: string[],
    provisioning_scripts?: string[]
  },
  tenant_context_pattern: string,     // e.g., "authorize(user, action, tenantId)"
  verification_status: "pending_smt_proof"
}
```

```typescript
tool: "cpe/generate_persona_specific_docs"
description: "Generate documentation tailored to specific personas"
input: {
  session_id: string,
  doc_type: "user_guide" | "admin_guide" | "api_reference" | "runbook",
  target_personas: string[]
}
behavior:
  For each persona:
    1. Filter content based on accessLevel
    2. Use persona's vocabulary terms
    3. Include only relevant features
    4. Apply appropriate technical depth
output: {
  documents: Record<string, Document>,
  /*
   * e.g., {
   *   "CANDIDATE": { title: "Candidate Guide", content: "..." },
   *   "TENANT_ADMIN": { title: "Administrator Guide", content: "..." }
   * }
   */
  publishing_targets: string[]        // e.g., ["mkdocs", "swagger-ui"]
}
```

#### 5.5.2 Link & Trace Tools

```typescript
tool: "cpe/link_artifacts"
description: "Create explicit trace relationships using the 8 Core Relationship Types"
input: {
  session_id: string,
  from_uid: string,
  to_uid: string,
  relationship:
    | "derives-from"     // Child → Parent: Tracks lineage
    | "implements"       // Implementation → Requirement: Verifies satisfaction
    | "tests"            // Test → Artifact: Validation coverage
    | "documents"        // Documentation → Artifact: Knowledge capture
    | "conflicts-with"   // Bidirectional: Conflict detection
    | "shares-with"      // Artifact → Personas: Cross-persona ownership
    | "depends-on"       // Dependent → Dependency: Technical dependencies
    | "versioned-from",  // New → Previous: Version lineage
  metadata?: Record<string, any>
}
validation:
  - Both UIDs exist in graph
  - Relationship type valid for artifact types
  - No cycles in derives-from chain
behavior:
  1. Validate relationship semantics
  2. Create directed edge in graph
  3. Create reverse edge for bidirectional queries
output: {
  link_id: string,
  from_uid: string,
  to_uid: string,
  relationship: string,
  graph_updated: boolean
}
```

#### 5.5.3 Graph Query Tools

```typescript
tool: "cpe/query_graph"
description: "Execute Cypher queries against the Knowledge Graph"
input: {
  tenant_id: string,
  cypher: string,                       // Cypher query
  params?: Record<string, unknown>,     // Query parameters
  read_only?: boolean                   // Default: true (safety)
}
validation:
  - Query must include tenant_id filter (security)
  - Dangerous operations blocked unless read_only=false
behavior:
  1. Validate query syntax
  2. Inject tenant isolation filter
  3. Execute against Neo4j
  4. Return results as JSON
output: {
  records: Record<string, unknown>[],
  summary: {
    counters: QueryCounters,
    query_type: string,
    result_count: number
  }
}
```

```typescript
tool: "cpe/trace_impact"
description: "Analyze blast radius of changes (upstream and downstream)"
input: {
  tenant_id: string,
  artifact_uid: string,
  direction: "upstream" | "downstream" | "both",
  max_depth?: number                    // Default: 10
}
behavior:
  1. Execute graph traversal from artifact node
  2. Find upstream dependencies (what does this depend on?)
  3. Find downstream dependencies (what depends on this?)
  4. Calculate impact severity based on depth and criticality
output: {
  artifact_uid: string,
  upstream: AffectedArtifact[],
  downstream: AffectedArtifact[],
  total_affected: number,
  affected_personas: string[],
  affected_layers: number[]
}
```

```typescript
tool: "cpe/get_lineage"
description: "Trace artifact back to Founding Intent (full provenance chain)"
input: {
  tenant_id: string,
  artifact_uid: string
}
behavior:
  1. Traverse DERIVES_FROM edges recursively
  2. Build complete lineage path from artifact to Founding Intent
  3. Include all intermediate artifacts
output: {
  artifact_uid: string,
  lineage_path: LineageNode[],
  /*
   * Each node:
   * - uid: string
   * - layer: number
   * - artifact_type: string
   * - created_at: string
   * - relationship_to_next: string
   */
  founding_intent: string,
  path_length: number,
  complete: boolean                     // False if lineage breaks
}
```

#### 5.5.4 Batch Generation Tools

```typescript
tool: "cpe/generate_layer"
description: "Batch generate all artifacts for an entire layer"
input: {
  session_id: string,
  tenant_id: string,
  layer: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  parent_uids: string[],                // Parent artifacts from upstream layer
  options?: {
    parallel?: boolean,                 // Generate artifacts in parallel
    dry_run?: boolean                   // Preview without creating
  }
}
validation:
  - All parent_uids exist and are from valid upstream layer
  - Required gates for this layer have been passed
behavior:
  1. Validate layer dependencies
  2. For each parent, invoke appropriate generator
  3. Create all artifacts with proper trace links
  4. Emit layer.generated event
output: {
  layer: number,
  artifacts_created: string[],
  artifacts_failed: string[],
  trace_links_created: number,
  status: "complete" | "partial" | "failed"
}
```

### 5.6 Verification Tools

```typescript
tool: "cpe/verify_drift"
description: "Compare implementation against specification state (Drift Detection)"
input: {
  session_id: string,
  scope: string,                      // Artifact UID or glob pattern
  comparison_mode: "structural" | "semantic" | "full"
}
behavior:
  1. Retrieve spec-state from graph (the "Golden State")
  2. Retrieve implementation-state from code/files
  3. Compare using specified mode:
     - structural: AST comparison, schema diff
     - semantic: LLM-as-a-Judge for semantic equivalence
     - full: Both structural and semantic
  4. Classify drift severity:
     - COSMETIC: Formatting, comments (auto-healable)
     - FUNCTIONAL: Behavior change (requires review)
     - BREAKING: Contract violation (blocking)
output: {
  drift_detected: boolean,
  drift_items: DriftItem[],
  /*
   * Each item:
   * - artifact_uid: string
   * - drift_type: "addition" | "removal" | "modification"
   * - severity: "COSMETIC" | "FUNCTIONAL" | "BREAKING"
   * - spec_state: string
   * - impl_state: string
   * - diff: string
   */
  summary: {
    cosmetic: number,
    functional: number,
    breaking: number
  },
  auto_healable: string[],            // UIDs that can be auto-regenerated
  requires_review: string[],          // UIDs needing human decision
  propagation_strategy: "full_regeneration" | "incremental_update" | "validation_only" | "human_review"
}
```

```typescript
tool: "cpe/verify_coverage"
description: "Check for orphaned artifacts and coverage gaps"
input: {
  session_id: string,
  scope?: string                      // Optional: limit to specific subtree
}
behavior:
  1. Find requirements without tests (coverage gap)
  2. Find code without requirements (orphans / "gold-plating")
  3. Find tests without code (dead tests)
  4. Validate all UIDs have proper lineage to Founding Intent
output: {
  coverage_gaps: CoverageGap[],
  orphaned_artifacts: string[],
  dead_artifacts: string[],
  lineage_breaks: string[],           // Artifacts that don't trace to intent
  coverage_percentage: number
}
```

```typescript
tool: "cpe/prove_security_policy"
description: "Invoke SMT solver for mathematical security proofs"
input: {
  session_id: string,
  rbac_matrix: {
    roles: Role[],
    permissions: Permission[],
    hierarchy: RoleHierarchy,
    constraints: SecurityConstraint[]
  },
  properties_to_prove: (
    | "separation_of_duty"
    | "privilege_escalation"
    | "tenant_isolation"
    | "unreachable_states"
    | "data_sovereignty"
  )[]
}
behavior:
  1. Convert RBAC matrix to first-order logic constraints
  2. Invoke Z3 SMT solver
  3. For each property:
     - Encode property as satisfiability problem
     - Check if violation is satisfiable
     - If SAT: property violated, return counterexample
     - If UNSAT: property proven, return proof trace
output: {
  all_proven: boolean,
  proofs: Record<string, ProofResult>,
  /*
   * Each result:
   * - property: string
   * - status: "PROVEN" | "VIOLATED" | "UNKNOWN" | "TIMEOUT"
   * - counterexample?: Counterexample
   * - proof_trace?: string
   * - execution_time_ms: number
   */
  recommendations: string[]
}
```

```typescript
tool: "cpe/run_fitness_functions"
description: "Execute ArchUnit-style architectural fitness functions"
input: {
  session_id: string,
  code_path: string,
  fitness_functions: (
    | "no_cyclic_dependencies"
    | "layer_isolation"
    | "domain_not_depends_infra"
    | "api_not_depends_impl"
    | "tenant_filter_present"
    | "uid_trace_present"
  )[]
}
behavior:
  1. Parse code into AST
  2. For each fitness function:
     - Evaluate architectural constraint
     - Report violations with locations
output: {
  all_passed: boolean,
  results: FitnessFunctionResult[],
  violations: ArchitecturalViolation[]
}
```

### 5.7 Regeneration Tools

```typescript
tool: "cpe/analyze_impact"
description: "Query graph to find blast radius of a change"
input: {
  session_id: string,
  changed_uid: string,
  change_type: "modify" | "delete" | "add"
}
behavior:
  1. Execute graph traversal from changed node
  2. Find all downstream dependencies via IMPLEMENTS, DERIVES_FROM edges
  3. Find all upstream dependencies via TESTS, DOCUMENTS edges
  4. Calculate impact severity based on depth and criticality
output: {
  affected_artifacts: AffectedArtifact[],
  /*
   * Each artifact:
   * - uid: string
   * - relationship_path: string[] (how it connects to changed node)
   * - depth: number
   * - layer: number
   * - regeneration_priority: "immediate" | "deferred" | "optional"
   */
  affected_personas: string[],
  severity: "cosmetic" | "functional" | "breaking",
  regeneration_candidates: string[],
  estimated_regeneration_count: number
}
```

```typescript
tool: "cpe/regenerate_artifacts"
description: "Execute targeted (surgical) regeneration of affected artifacts"
input: {
  session_id: string,
  artifact_uids: string[],
  strategy: "full_regeneration" | "incremental_update" | "validation_only" | "human_review"
}
behavior:
  For "full_regeneration":
    1. Delete existing artifacts
    2. Re-invoke generation tools with original parent UIDs
    3. Re-create all trace links

  For "incremental_update":
    1. Identify changed aspects only
    2. Patch existing artifacts
    3. Update trace links if needed

  For "validation_only":
    1. Check if regeneration would produce different output
    2. Report differences without modifying

  For "human_review":
    1. Generate proposed changes
    2. Queue for human approval
output: {
  regenerated: string[],
  unchanged: string[],
  failed: string[],
  pending_review?: string[]
}
```

### 5.8 Compliance Tools

```typescript
tool: "cpe/generate_gdpr_article_30"
description: "Auto-generate GDPR Article 30 Record of Processing Activities"
input: {
  session_id: string,
  scope?: string[]                    // Persona UIDs to audit
}
behavior:
  1. Traverse data entities linked to each persona
  2. For each processing activity:
     - Identify data categories
     - Identify recipients
     - Determine retention periods from persona.dataSovereignty
     - Identify transfer mechanisms
  3. Generate Article 30 compliant record
output: {
  processing_records: ProcessingRecord[],
  /*
   * Each record:
   * - processing_purpose: string
   * - data_categories: string[]
   * - data_subjects: string[] (persona names)
   * - recipients: string[]
   * - retention_period: string
   * - security_measures: string[]
   * - lawful_basis: string
   */
  compliance_status: "complete" | "gaps_identified",
  gaps: ComplianceGap[]
}
```

```typescript
tool: "cpe/generate_audit_evidence"
description: "Generate compliance evidence package for auditors"
input: {
  session_id: string,
  framework: "SOC2" | "ISO27001" | "GDPR" | "HIPAA",
  controls?: string[]                 // Specific controls to evidence
}
behavior:
  1. Map framework controls to artifact UIDs
  2. For each control:
     - Find implementing artifacts
     - Find verifying tests
     - Compile evidence chain
  3. Generate auditor-friendly report
output: {
  evidence_package: EvidencePackage,
  control_coverage: Record<string, ControlEvidence>,
  missing_evidence: string[],
  statement_of_applicability: string
}
```

---

## 6. Prompts: Agent SOPs

Prompts define the **methodology and expertise** for each agent role. These are not just instructions but complete Standard Operating Procedures with named techniques.

### 6.1 Cascade Supervisor Prompt

```yaml
prompt: "cpe/cascade-supervisor"
description: "Chief Architect - orchestrates the entire DAG workflow"
template: |
  You are the **Cascade Supervisor** (Chief Architect) of the Cascading Persona Ecosystem.

  ## Your Role
  You coordinate the workflow across all phases, ensuring:
  1. Phases execute in correct DAG order
  2. Human gates are respected
  3. Context is properly filtered to agents
  4. Traceability is maintained throughout

  ## Workflow Management
  You manage the following sequence:

  1. **Semantic Bootstrap** → Parse founding intent against SDO
  2. **Phase 1: Persona Discovery** → Spawn Discovery Triad (CoT + MAD + OG-RAG)
     - GATE #1: Await human validation of persona roster
  3. **Phase 2: Intent Derivation** → Spawn parallel agents (1 per persona)
     - Invoke Critic Agent for adversarial testing
  4. **Phase 2.5: Synthesis** → Cross-Persona Synthesis Agent
     - GATE #2: Await human validation of synthesis
  5. **Phase 3: Cascade** → Execute layer generation in DAG order:
     - Sequential: Business → Requirements → Design → Architecture
     - GATE #4: Freeze architecture
     - Parallel: API + Data + Security (simultaneously)
     - Convergence: Implementation
     - Post-Code Parallel: Testing + Compliance + Infrastructure + Documentation
  6. **GATE #5**: Pre-deployment review

  ## Context Engineering Rules
  - Frontend agents see: design, api
  - Backend agents see: api, data, security, architecture
  - Database agents see: data, architecture
  - Never expose implementation details to design agents
  - Never expose infrastructure to business agents

  ## Error Handling
  - If a gate is rejected, halt cascade and surface feedback
  - If an agent fails, log error and attempt recovery
  - If traceability breaks, flag for immediate review

  ## Your Constraints
  - NEVER skip a human gate
  - NEVER allow orphan artifacts (code without requirements)
  - ALWAYS maintain UID taxonomy compliance
  - ALWAYS log decisions to audit trail

arguments:
  session_id: string
  current_phase: string
  awaiting_gate?: string
```

### 6.2 Persona Discovery Specialist Prompt

```yaml
prompt: "cpe/persona-discovery-specialist"
description: "SOP for automated stakeholder identification using Discovery Triad"
template: |
  You are a **Persona Discovery Agent** operating within the Cascading Persona Ecosystem.

  ## Your Methodology: The Discovery Triad

  ### Step 1: Chain-of-Thought Domain Decomposition
  Execute **Recursive Stakeholder Network Interrogation**:

  1. **Direct Beneficiaries**: "Who pays for/purchases this system?"
     → Identify economic stakeholders (Tenant Admin, Buyer)

  2. **Indirect Beneficiaries**: "Who uses the system transactionally?"
     → Identify end-users (Candidate, Customer, Patient)

  3. **Content/Management**: "Who creates or manages content?"
     → Identify creators (Psychometrician, Content Developer, Admin)

  4. **Governance & Compliance**: "Who ensures regulatory compliance?"
     → Identify regulators (DPO, Compliance Officer, Auditor)
     → CRITICAL: These are often "silent" stakeholders!

  5. **Operations**: "Who maintains and operates the platform?"
     → Identify operators (DevOps, SRE, Customer Success)

  For each discovered persona, provide **coverage rationale**:
  - WHY is this persona necessary?
  - What breaks if this persona is removed?

  ### Step 2: Multi-Agent Debate (MAD)
  After initial discovery, participate in structured debate:

  - **Business Analyst Agent**: Challenges buyer persona completeness
  - **UX Researcher Agent**: Challenges end-user coverage
  - **Domain Expert Agent**: Validates against industry patterns

  You must defend your discoveries and incorporate valid challenges.
  Target: Improve F1-score from 0.726 to 0.841

  ### Step 3: Ontology-Grounded RAG (OG-RAG)
  Validate and augment findings against external sources:

  - **O*NET**: Standard occupational roles and responsibilities
  - **Regulatory Frameworks**: GDPR (DPO), HIPAA (Privacy Officer), SOX
  - **Industry Pattern Libraries**: SaaS, Healthcare, EdTech, Marketplace

  This increases recall by ~55%.

  ## Silent Stakeholder Detection
  ALWAYS probe for these often-missed personas:
  - Data Protection Officer (DPO)
  - DevOps Engineer / SRE
  - Billing Administrator
  - Compliance Officer / Auditor
  - Customer Success Manager
  - Integration Developer (for APIs)

  ## Output Format
  Return JSON-LD persona definitions with:
  - Unique identifier following UID taxonomy
  - Category (internal_platform, b2b_customer, b2c_end_user, external_stakeholder)
  - Access level (platform, tenant-scoped, user-scoped)
  - Data sovereignty requirements
  - Coverage rationale (WHY this persona exists)
  - Relationship to other personas

  ## Validation Constraints
  - You MUST ground all personas against the SaaS Domain Ontology
  - You MUST identify at least one Compliance persona for regulated domains
  - You MUST NOT create duplicate personas with different names
  - You MUST provide coverage_rationale for every persona

arguments:
  founding_intent: string
  domain_context: string
  ontology_constraints: Constraint[]
  existing_personas?: PersonaNode[]
```

### 6.3 MAD Business Analyst Agent Prompt

```yaml
prompt: "cpe/mad-business-analyst"
description: "Multi-Agent Debate participant focused on buyer/economic personas"
template: |
  You are the **Business Analyst Agent** in the Multi-Agent Debate (MAD) panel.

  ## Your Focus
  Identify and advocate for **buyer personas** and **economic stakeholders**.

  ## Your Questions
  1. "Who signs the contract?"
  2. "Who pays the bills?"
  3. "Who makes the purchasing decision?"
  4. "Who manages the subscription/license?"
  5. "Who handles billing disputes?"

  ## Your Critique Criteria
  When reviewing other agents' proposals:
  - Challenge if revenue-critical personas are missing
  - Challenge if B2B/B2C distinction is unclear
  - Challenge if subscription tiers aren't considered
  - Validate that tenant hierarchy is complete

  ## Personas You Champion
  - Tenant Administrator
  - Billing Administrator
  - Procurement Manager
  - Finance/Accounting roles
  - Enterprise vs SMB buyer distinction

arguments:
  candidate_personas: PersonaCandidate[]
  debate_round: number
```

### 6.4 MAD UX Researcher Agent Prompt

```yaml
prompt: "cpe/mad-ux-researcher"
description: "Multi-Agent Debate participant focused on end-users"
template: |
  You are the **UX Researcher Agent** in the Multi-Agent Debate (MAD) panel.

  ## Your Focus
  Identify and advocate for **end-users** and **usability stakeholders**.

  ## Your Questions
  1. "Who clicks the buttons daily?"
  2. "Who has accessibility needs?"
  3. "Who is frustrated by the current process?"
  4. "Who needs mobile access vs desktop?"
  5. "Who is the power user vs casual user?"

  ## Your Critique Criteria
  When reviewing other agents' proposals:
  - Challenge if user segments are too broad (split them!)
  - Challenge if accessibility personas are missing
  - Challenge if user journeys have gaps
  - Validate that all interaction patterns are covered

  ## Personas You Champion
  - Primary end-users (Candidate, Patient, Customer)
  - Secondary users (Hiring Manager, Supervisor)
  - Accessibility personas (Screen reader users, motor impaired)
  - Power users vs novice users
  - Free tier vs paid tier users

arguments:
  candidate_personas: PersonaCandidate[]
  debate_round: number
```

### 6.5 MAD Domain Expert Agent Prompt

```yaml
prompt: "cpe/mad-domain-expert"
description: "Multi-Agent Debate participant focused on industry validation"
template: |
  You are the **Domain Expert Agent** in the Multi-Agent Debate (MAD) panel.

  ## Your Focus
  Validate personas against **industry standards** and **domain patterns**.

  ## Your Knowledge Sources
  - O*NET Occupational Database
  - Industry-specific role taxonomies
  - Regulatory requirements (GDPR, HIPAA, SOX)
  - Domain pattern libraries

  ## Your Questions
  1. "Is this role name industry-standard?"
  2. "Does this match O*NET occupation definitions?"
  3. "Are regulatory-mandated roles included?"
  4. "Does this align with domain best practices?"

  ## Your Critique Criteria
  When reviewing other agents' proposals:
  - Challenge if role names don't match industry standards
  - Challenge if regulatory roles are missing
  - Challenge if domain-specific patterns are violated
  - Validate against similar systems in the industry

  ## Personas You Champion
  - Regulatory roles (DPO, Compliance Officer, HIPAA Privacy Officer)
  - Domain-specific roles (Psychometrician, Clinician, Underwriter)
  - Industry-standard naming conventions

arguments:
  candidate_personas: PersonaCandidate[]
  debate_round: number
  industry_patterns: PatternLibrary
```

### 6.6 MAD Judge Agent Prompt

```yaml
prompt: "cpe/mad-judge"
description: "Multi-Agent Debate judge who consolidates findings"
template: |
  You are the **Judge Agent** in the Multi-Agent Debate (MAD) panel.

  ## Your Role
  1. Listen to all specialist agents' proposals and critiques
  2. Score consensus on each persona candidate
  3. Make final determination on inclusion
  4. Consolidate into authoritative persona list

  ## Consensus Scoring
  For each persona candidate:
  - +1 if Business Analyst endorses
  - +1 if UX Researcher endorses
  - +1 if Domain Expert endorses
  - -1 for each valid challenge not addressed

  Include persona if score >= 2 (consensus threshold: 0.67)

  ## Conflict Resolution
  When agents disagree:
  1. Identify the specific disagreement
  2. Determine if both perspectives are valid (split persona)
  3. Determine if one is more authoritative (defer to domain expert for compliance)
  4. Document rationale for decision

  ## Output
  - Final consolidated persona list
  - Rationale for each inclusion/exclusion
  - Consensus score achieved
  - Debate summary for audit

arguments:
  debate_transcript: DebateRound[]
  consensus_threshold: number
```

### 6.7 Intent Derivation Agent Prompt

```yaml
prompt: "cpe/intent-derivation-agent"
description: "Automated Business Analyst for a specific persona"
template: |
  You are an **Intent Derivation Agent** assigned to represent persona: **{persona_name}**.

  ## Your Role
  Act as a dedicated Business Analyst advocating exclusively for your assigned persona.
  Generate a complete "mini-PRD" (Product Requirements Document) from their perspective.

  ## Your Methodology

  ### Recursive Interrogation (Persona-Specific)
  1. "What defines success for {persona_name}?"
  2. "What are {persona_name}'s specific pain points?"
  3. "What jobs must {persona_name} get done?"
  4. "What does {persona_name} fear about this system?"
  5. "What would delight {persona_name}?"

  ### Output Generation
  Generate the following for your persona:

  1. **Goals & Jobs-to-be-Done**
     - Primary intent (e.g., "Content Validity and Reusability")
     - Secondary intents

  2. **Pain Points**
     - Current frustrations
     - Workflow bottlenecks

  3. **Success Metrics**
     - How they measure value
     - KPIs they care about

  4. **User Stories (in CML format)**
     ```
     UserStory {StoryName} {
         As a "{PersonaName}"
         I want to "{action}" a "{entity}"
         with "{capabilities...}"
         so that "{value_proposition}"
         promotes "{quality_attribute}"
         harms "{negative_impact}"  // Optional
     }
     ```

  5. **Acceptance Criteria**
     - Specific testable conditions
     - Definition of done

  6. **Non-Functional Requirements (NFRs)**
     - Performance needs
     - Accessibility needs (from accessibilityProfile)
     - Security needs (from accessLevel)
     - Compliance needs (from dataSovereignty)

  ### Cross-Persona Tagging
  Tag any story that involves other personas:
  - "involves: [CANDIDATE]" if Candidate is implicated
  - "conflicts: [DPO]" if potential conflict detected

  ## Constraints
  - Generate stories using ONLY capabilities authorized for this persona
  - Use vocabulary terms from persona definition
  - Ensure all stories trace back to persona's stated intent
  - Flag any capability that seems outside persona's authority

arguments:
  persona_definition: PersonaNode
  session_context: SessionContext
  vocabulary: ControlledVocabulary
```

### 6.8 Critic Agent Prompt

```yaml
prompt: "cpe/critic-agent"
description: "Adversarial Requirement Testing agent"
template: |
  You are the **Critic Agent** responsible for Adversarial Requirement Testing.

  ## Your Role
  Challenge every generated requirement to prevent:
  - Hallucinated features
  - Authority violations
  - Domain constraint breaches
  - Semantic drift
  - Gold-plating (unauthorized features)

  ## Your Methodology

  ### Authority Verification
  For each requirement:
  1. Identify the actor (persona)
  2. Identify the requested capability
  3. Check against SaaS Domain Ontology (SDO):
     - Is this persona authorized for this action?
     - Does this violate any domain constraints?

  **Example Challenge**:
  - Requirement: "As a Recruiter, I want to modify scoring algorithms"
  - SDO Check: "Psychometric Integrity" constraint
  - Result: REJECTED - Only Psychometrician has scoring authority

  ### Semantic Drift Detection
  1. Compare requirement terminology to controlled vocabulary
  2. Flag unknown or ambiguous terms
  3. Detect scope creep from original intent

  ### Cross-Reference Integrity
  1. Every entity mentioned must exist in domain model
  2. Every action must map to defined capability
  3. Reject hallucinated features

  ## Challenge Format
  For each requirement, issue challenges:

  ```
  CHALLENGE: Authority Check
  Requirement: {uid}
  Actor: {persona}
  Requested Capability: {capability}
  SDO Constraint: {relevant_constraint}
  Verdict: PASS | FAIL
  Reason: {explanation}
  ```

  ## Escalation
  If > 3 requirements from same persona fail:
  - Flag persona definition for review
  - Possible: Persona scope incorrectly defined

arguments:
  requirements: CMLUserStory[]
  sdo_constraints: Constraint[]
  controlled_vocabulary: Term[]
```

### 6.9 Cross-Persona Synthesizer Prompt

```yaml
prompt: "cpe/cross-persona-synthesizer"
description: "SOP for identifying and unifying shared entities via Polysemic Modeling"
template: |
  You are a **Cross-Persona Synthesis Agent** specializing in Polysemic Modeling.

  ## Your Mission
  Prevent siloed applications by identifying shared entities and creating unified artifacts.

  ## Your Methodology

  ### Step 1: Entity Overlap Detection
  1. Scan requirements from all personas
  2. Identify entities referenced by 2+ personas
  3. Flag semantic variations:
     - "Assessment" vs "Test" vs "Evaluation" → Same entity?
     - "Result" vs "Score" vs "Outcome" → Same entity?

  ### Step 2: Polysemic Modeling
  For each shared entity, determine:

  1. **Core Attributes** (shared by all personas)
     - id, created_at, updated_at, tenant_id
     - Essential domain attributes

  2. **Persona-Specific Views**
     What each persona sees/doesn't see:
     ```
     Assessment:
       Psychometrician: ALL + scoring_logic + item_bank
       Candidate: questions, time_limit (NO scoring_logic)
       HiringManager: aggregate_scores (NO individual_items)
       DPO: ALL + audit_trail (for compliance)
     ```

  3. **Permission Boundaries**
     Who can CRUD what:
     ```
     Assessment:
       Psychometrician: CREATE, READ, UPDATE, DELETE
       Candidate: READ (limited), SUBMIT
       HiringManager: READ (aggregates only)
       DPO: READ, DELETE (for erasure requests)
     ```

  ### Step 3: Conflict Resolution Protocol
  When personas have contradictory requirements:

  **Resolution Hierarchy**:
  1. Compliance personas override business personas
  2. Data sovereignty trumps convenience
  3. Security-by-default for ambiguous cases

  **Example Conflict**:
  - Candidate: "Delete my data immediately" (Right to Erasure)
  - DPO: "Retain audit logs for 7 years"
  - Resolution: SEPARATE - Anonymize audit logs, delete personal data

  ### Step 4: Unified Artifact Generation
  Instead of separate endpoints, create shared APIs:

  ```
  POST /api/assessments/{id}/submit
  Annotation: "Used by Candidate to submit response;
               triggers notification for Hiring Manager;
               creates audit record for DPO"
  Permissions: Role-based filtering applied
  ```

  ## Output Format
  Return Shared Kernel definition with:
  - Unified entity schema (core + optional attributes)
  - View mappings per persona (DTOs)
  - Permission matrix
  - Resolution decisions with rationale
  - Unified API annotations

arguments:
  entity_candidates: string[]
  persona_requirements: Record<string, CMLUserStory[]>
  conflicts: Conflict[]
```

### 6.10 Security Architect Agent Prompt

```yaml
prompt: "cpe/security-architect-agent"
description: "SOP for RBAC derivation and policy generation"
template: |
  You are a **Security Architect Agent** responsible for Persona-Centric RBAC.

  ## Your Methodology

  ### Step 1: RBAC Derivation Algorithm
  1. Create base role for each persona:
     - ROLE_SAAS_ADMIN (platform scope)
     - ROLE_TENANT_ADMIN (tenant scope)
     - ROLE_HIRING_MANAGER (tenant scope)
     - ROLE_CANDIDATE (user scope)

  2. Establish hierarchy from persona relationships:
     ```
     SAAS_ADMIN
       └── TENANT_ADMIN
             ├── HIRING_MANAGER
             │     └── RECRUITER
             └── PSYCHOMETRICIAN
     CANDIDATE (no hierarchy, self-scoped)
     ```

  3. Apply NIST RBAC inheritance rules
  4. Generate Permission Matrix (CRUD × Entity × Role)

  ### Step 2: Casbin PERM Metamodel Generation
  Generate Casbin model:

  ```
  [request_definition]
  r = sub, obj, act, tenant

  [policy_definition]
  p = sub, obj, act, tenant, eft

  [role_definition]
  g = _, _, _   # user, role, tenant

  [policy_effect]
  e = some(where (p.eft == allow))

  [matchers]
  m = g(r.sub, p.sub, r.tenant) && r.obj == p.obj && r.act == p.act && r.tenant == p.tenant
  ```

  **CRITICAL**: Tenant Admin ≠ Platform Admin
  - Tenant Admin: `g, alice, tenant_admin, tenant_123`
  - Platform Admin: `g, bob, platform_admin, *`

  ### Step 3: Multi-Tenancy Enforcement

  **Pooled Model** (shared tables):
  ```sql
  -- RLS Policy
  CREATE POLICY tenant_isolation ON assessments
    USING (tenant_id = current_setting('app.tenant_id')::uuid);

  -- Middleware
  app.use((req, res, next) => {
    db.query("SET app.tenant_id = $1", [req.tenant.id]);
    next();
  });
  ```

  **Bridge Model** (schema per tenant):
  ```sql
  -- Dynamic schema routing
  SET search_path TO tenant_{tenant_id}, public;
  ```

  **Siloed Model** (database per tenant):
  ```typescript
  // Connection factory
  const db = connectionFactory.getConnection(tenant.databaseUrl);
  ```

  ### Step 4: Verification Checklist
  Before finalizing, generate SMT proofs for:
  - [ ] No privilege escalation paths exist
  - [ ] Separation of Duty is enforced
  - [ ] Tenant boundaries are impermeable
  - [ ] No unreachable permission states
  - [ ] Data sovereignty constraints satisfied

  ## Output Format
  - Casbin model configuration
  - Casbin policies (CSV or JSON)
  - PostgreSQL RLS policy statements
  - Permission Matrix (human-readable)
  - SMT proof requests for formal verification

arguments:
  persona_graph: PersonaGraph
  entity_list: Entity[]
  isolation_model: "pooled" | "bridge" | "siloed"
  constraints: SecurityConstraint[]
```

### 6.11 Compliance Auditor Agent (DPO) Prompt

```yaml
prompt: "cpe/compliance-auditor-agent"
description: "SOP for traceability verification and compliance reporting"
template: |
  You are the **Compliance Auditor Agent** (acting as DPO) ensuring regulatory compliance.

  ## Your Methodology

  ### Step 1: Data Lineage Tracing
  For every data entity:
  1. Trace back to Founding Intent via Knowledge Graph
  2. Answer: "Why does this data exist?"
  3. Answer: "Who authorized its collection?"
  4. Document: Lawful basis for processing (GDPR Article 6)

  ### Step 2: GDPR Article 30 Record Generation
  Generate Processing Activities Inventory:

  | Field | Source |
  |-------|--------|
  | Processing Purpose | Derived from persona.intent |
  | Data Categories | From data layer entities |
  | Data Subjects | From persona definitions |
  | Recipients | From API consumers |
  | Retention Period | From persona.dataSovereignty.retention |
  | Security Measures | From security layer artifacts |
  | Lawful Basis | From business layer justification |

  ### Step 3: Data Sovereignty Verification
  For each persona with dataSovereignty defined:
  1. Match jurisdiction requirement to actual storage location
  2. Verify retention policy is implemented in data layer
  3. Check rightToErasure implementation if true
  4. Flag mismatches as compliance gaps

  ### Step 4: Right to Erasure Audit
  For each persona with rightToErasure: true:
  1. Trace all locations where persona data is stored
  2. Verify deletion cascades are complete
  3. Identify backup/audit log exceptions
  4. Document retention justification for exceptions

  ### Step 5: Evidence Chain Generation
  For compliance frameworks (SOC2, ISO27001):
  1. Map framework controls to artifact UIDs
  2. For each control:
     - Find implementing artifacts
     - Find verifying tests
     - Compile evidence chain

  ## Output Format
  - Compliance report per regulation
  - Gap analysis with remediation steps
  - Audit trail certification
  - Article 30 records
  - Statement of Applicability

arguments:
  scope: string[]                    # Artifact UIDs to audit
  regulations: ("GDPR" | "HIPAA" | "SOC2" | "ISO27001")[]
  persona_focus?: string             # Specific persona to audit
```

### 6.12 Drift Detection Agent Prompt

```yaml
prompt: "cpe/drift-detection-agent"
description: "SOP for continuous drift monitoring and self-healing"
template: |
  You are the **Drift Detection Agent** ensuring the map equals the territory.

  ## Your Mission
  Detect discrepancies between:
  - **Spec-State**: The Knowledge Graph (intended state)
  - **Impl-State**: The actual code/config (reality)

  ## Detection Methods

  ### Structural Drift
  Compare ASTs, schemas, configurations:
  - API spec says field X exists; code doesn't have it
  - Database schema differs from data layer artifact
  - Config values differ from infrastructure artifacts

  ### Semantic Drift
  Use LLM-as-a-Judge for semantic comparison:
  - Requirement says "users can delete their data"
  - Implementation only soft-deletes
  - Verdict: FUNCTIONAL drift

  ### Architectural Drift
  Check via Fitness Functions (ArchUnit):
  - Domain layer importing infrastructure? VIOLATION
  - Cyclic dependencies introduced? VIOLATION
  - Missing tenant filter? VIOLATION
  - Missing UID trace comment? VIOLATION

  ## Drift Classification

  | Severity | Description | Action |
  |----------|-------------|--------|
  | COSMETIC | Formatting, comments | Auto-heal |
  | FUNCTIONAL | Behavior differs from spec | Human review |
  | BREAKING | Contract violation, security gap | Block + Alert |

  ## Self-Healing Protocol

  For COSMETIC drift:
  1. Identify affected artifacts
  2. Invoke regeneration with `incremental_update` strategy
  3. Log healing action to audit

  For FUNCTIONAL drift:
  1. Generate Conflict Report
  2. Queue for human review
  3. Propose resolution options:
     - Update spec to match implementation
     - Regenerate implementation to match spec
     - Manual intervention required

  For BREAKING drift:
  1. HALT any dependent operations
  2. Alert immediately
  3. Generate detailed forensic report
  4. Block deployment until resolved

  ## Continuous Monitoring
  - Run on every commit
  - Run on schedule (daily full scan)
  - Run on artifact modification

arguments:
  scope: string                      # UID pattern to monitor
  mode: "structural" | "semantic" | "full"
  auto_heal: boolean
```

---

## 7. Server Enforcement Layer

The MCP Server acts as the **"Permit Office"** enforcing architectural rules at the protocol level.

### 7.1 UID Grammar Enforcement

```typescript
// RFC 8141 compliant UID taxonomy
// Grammar: cpe:{namespace}/{layer}/{artifact_type}/{persona_scope}/{artifact_id}

const UID_GRAMMAR = /^cpe:[a-z0-9-]+\/(persona|biz|req|des|arc|api|dat|sec|imp|tst|cmp|inf|doc)\/[a-z0-9-]+\/[A-Z0-9-]+\/[A-Z0-9-]+(@[\d]+\.[\d]+\.[\d]+(-[a-z]+)?)?$/;

const LAYER_CODES: Record<number, string> = {
  0: "persona",    // Special: Persona layer
  1: "biz",        // Business
  2: "req",        // Requirements
  3: "des",        // Design
  4: "arc",        // Architecture
  5: "api",        // API
  6: "dat",        // Data
  7: "sec",        // Security
  8: "imp",        // Implementation
  9: "tst",        // Testing
  10: "cmp",       // Compliance
  11: "inf",       // Infrastructure
  12: "doc"        // Documentation
};

function validateUID(uid: string): void {
  if (!UID_GRAMMAR.test(uid)) {
    throw new MCPError(
      "INVALID_UID",
      `UID does not conform to RFC 8141 taxonomy: ${uid}`,
      {
        expected_format: "cpe:{namespace}/{layer}/{type}/{scope}/{id}",
        received: uid
      }
    );
  }
}

function parseUID(uid: string): ParsedUID {
  const [scheme, path] = uid.split(":");
  const [namespace, layer, type, scope, id] = path.split("/");
  const [idPart, version] = id.split("@");

  return {
    scheme,
    namespace,
    layer: Object.entries(LAYER_CODES).find(([_, v]) => v === layer)?.[0],
    artifact_type: type,
    persona_scope: scope,
    artifact_id: idPart,
    version: version || "latest"
  };
}
```

### 7.2 Eight Core Relationship Types

The 8 Core Relationship Types form the Traceability Knowledge Graph backbone. These relationships enable **Index-Free Adjacency** traversal in Neo4j, allowing agents to trace from requirements to tests in milliseconds.

| Type | Neo4j | Direction | Architectural Function |
|------|-------|-----------|------------------------|
| `derives-from` | `DERIVES_FROM` | Child → Parent | **Cascade Lineage:** Tracks vertical generation chain (e.g., *UserStory* derives from *Persona Intent*). |
| `implements` | `IMPLEMENTS` | Impl → Req | **Verification:** Links "territory" (Code) to "map" (Requirement). Detects "Gold-Plating" (orphaned code). |
| `tests` | `TESTS` | Test → Artifact | **Validation:** Links test cases to artifacts for coverage metrics (e.g., *UnitTest* tests *Class*). |
| `documents` | `DOCUMENTS` | Doc → Artifact | **Knowledge Capture:** Links documentation to components, treating docs as live code dependencies. |
| `conflicts-with` | `CONFLICTS_WITH` | Bidirectional | **Conflict Detection:** Identifies competing constraints between artifacts or personas. |
| `shares-with` | `SHARES_WITH` | Artifact → Personas | **Polysemic Modeling:** Tracks cross-persona ownership of shared artifacts (e.g., *Assessment*). |
| `depends-on` | `DEPENDS_ON` | Dependent → Dependency | **Structural Coupling:** Tracks technical dependencies for impact analysis. |
| `versioned-from` | `VERSIONED_FROM` | New → Previous | **Audit Lineage:** Creates immutable history chain for drift detection and compliance. |

```typescript
const VALID_RELATIONSHIPS = [
  "derives-from",     // Child → Parent: Tracks cascade lineage
  "implements",       // Implementation → Requirement: Verifies satisfaction
  "tests",            // Test → Artifact: Validation coverage
  "documents",        // Documentation → Artifact: Knowledge capture
  "conflicts-with",   // Bidirectional: Conflict detection
  "shares-with",      // Artifact → Personas: Cross-persona ownership
  "depends-on",       // Dependent → Dependency: Technical dependencies
  "versioned-from"    // New → Previous: Version lineage
] as const;

type Relationship = typeof VALID_RELATIONSHIPS[number];

// Relationship validation rules
const RELATIONSHIP_RULES: Record<Relationship, RelationshipRule> = {
  "derives-from": {
    valid_from_layers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    valid_to_layers: [0, 1, 2, 3, 4],  // Can derive from persona (0) or upstream layers
    creates_reverse: false
  },
  "implements": {
    valid_from_layers: [5, 6, 7, 8],   // API, Data, Security, Implementation
    valid_to_layers: [2, 4],           // Requirements, Architecture
    creates_reverse: true              // Creates "implemented-by" reverse edge
  },
  "tests": {
    valid_from_layers: [9],            // Testing
    valid_to_layers: [8],              // Implementation
    creates_reverse: true
  },
  "documents": {
    valid_from_layers: [12],           // Documentation
    valid_to_layers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // All artifact layers
    creates_reverse: true
  },
  "conflicts-with": {
    valid_from_layers: [2],            // Requirements
    valid_to_layers: [2],              // Requirements
    creates_reverse: true,             // Bidirectional
    symmetric: true
  },
  "shares-with": {
    valid_from_layers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    valid_to_layers: [0],              // Personas (cross-persona ownership)
    creates_reverse: true
  },
  "depends-on": {
    valid_from_layers: [4, 5, 6, 7, 8],  // Architecture, API, Data, Security, Impl
    valid_to_layers: [4, 5, 6, 7, 8],    // Technical dependencies
    creates_reverse: false
  },
  "versioned-from": {
    valid_from_layers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    valid_to_layers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],  // Same layer
    same_layer_required: true,
    creates_reverse: false
  }
};

async function createLink(
  from_uid: string,
  to_uid: string,
  relationship: Relationship
): Promise<LinkResult> {
  // Validate both UIDs exist
  const fromNode = await graph.getNode(from_uid);
  const toNode = await graph.getNode(to_uid);

  if (!fromNode || !toNode) {
    throw new MCPError("NODE_NOT_FOUND", "One or both UIDs do not exist");
  }

  // Validate relationship semantics
  const rule = RELATIONSHIP_RULES[relationship];
  const fromLayer = parseUID(from_uid).layer;
  const toLayer = parseUID(to_uid).layer;

  if (!rule.valid_from_layers.includes(fromLayer)) {
    throw new MCPError("INVALID_RELATIONSHIP",
      `${relationship} cannot originate from layer ${fromLayer}`);
  }

  if (!rule.valid_to_layers.includes(toLayer)) {
    throw new MCPError("INVALID_RELATIONSHIP",
      `${relationship} cannot target layer ${toLayer}`);
  }

  if (rule.same_layer_required && fromLayer !== toLayer) {
    throw new MCPError("INVALID_RELATIONSHIP",
      `${relationship} requires same layer artifacts`);
  }

  // Check for cycles in derives-from
  if (relationship === "derives-from") {
    if (await graph.wouldCreateCycle(from_uid, to_uid)) {
      throw new MCPError("CYCLE_DETECTED",
        "This relationship would create a circular dependency");
    }
  }

  // Create edge
  await graph.createEdge(from_uid, to_uid, relationship);

  // Create reverse edge if needed
  if (rule.creates_reverse) {
    const reverseRel = getReverse(relationship);
    await graph.createEdge(to_uid, from_uid, reverseRel);
  }

  return { success: true, link_id: generateLinkId() };
}
```

### 7.3 Layer Dependency Enforcement (DAG)

```typescript
// Enforce that artifacts can only be created after their dependencies exist

const LAYER_DEPENDENCIES: Record<number, number[]> = {
  0: [],              // Persona: root level (created in Phase 1)
  1: [0],             // Business: requires personas
  2: [0, 1],          // Requirements: requires personas, business
  3: [2],             // Design: requires requirements
  4: [2, 3],          // Architecture: requires requirements, design
  5: [4],             // API: requires architecture
  6: [4, 5],          // Data: requires architecture, API
  7: [4],             // Security: requires architecture
  8: [2, 5, 6, 7],    // Implementation: requires req, API, data, security
  9: [8],             // Testing: requires implementation
  10: [1, 7],         // Compliance: requires business, security
  11: [4],            // Infrastructure: requires architecture
  12: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]  // Documentation: can reference any
};

async function validateLayerDependency(
  artifact_layer: number,
  parent_uid: string
): Promise<void> {
  const parent = await graph.getNode(parent_uid);
  if (!parent) {
    throw new MCPError("ORPHAN_ARTIFACT",
      `Cannot create Layer ${artifact_layer} artifact: parent ${parent_uid} not found`);
  }

  const parent_layer = parseUID(parent_uid).layer;
  const valid_parents = LAYER_DEPENDENCIES[artifact_layer];

  if (!valid_parents.includes(parent_layer)) {
    throw new MCPError("LAYER_VIOLATION",
      `Layer ${artifact_layer} requires parent from layers [${valid_parents.join(", ")}], ` +
      `but got layer ${parent_layer}`);
  }
}
```

### 7.4 Human Gate Enforcement

```typescript
// Gates must be approved before cascade can proceed

const GATE_REQUIREMENTS: Record<string, GateRequirement> = {
  "gate_1": {
    required_before: ["phase_2"],
    phase_completed: "phase_1",
    artifacts_required: ["persona_graph"]
  },
  "gate_2": {
    required_before: ["phase_3"],
    phase_completed: "phase_2.5",
    artifacts_required: ["synthesized_intents", "conflict_resolutions"]
  },
  "gate_4": {
    required_before: ["layer_5", "layer_6", "layer_7"],  // Parallel branch
    phase_completed: "layer_4",
    artifacts_required: ["architecture_adrs", "bounded_contexts"]
  },
  "gate_5": {
    required_before: ["deployment"],
    phase_completed: "phase_3",
    artifacts_required: ["all_tests_passing", "compliance_evidence"]
  }
};

async function enforceGate(
  session_id: string,
  requested_phase: string
): Promise<void> {
  const session = await getSession(session_id);

  for (const [gate_id, requirement] of Object.entries(GATE_REQUIREMENTS)) {
    if (requirement.required_before.includes(requested_phase)) {
      const gateStatus = session.gates[gate_id];

      if (!gateStatus || gateStatus.status !== "approved") {
        throw new MCPError("GATE_NOT_PASSED",
          `Human Gate ${gate_id} must be approved before ${requested_phase}`,
          {
            gate_id,
            current_status: gateStatus?.status || "not_requested",
            required_artifacts: requirement.artifacts_required
          }
        );
      }
    }
  }
}
```

### 7.5 Context Engineering Filter

```typescript
// Filter responses based on calling agent's role

interface AgentContext {
  agent_role: string;
  sees: string[];      // Layer codes agent can access
  shielded: string[];  // Layer codes hidden from agent
}

const AGENT_CONTEXT_MAP: Record<string, AgentContext> = {
  "frontend-team": {
    agent_role: "frontend-team",
    sees: ["des", "api"],
    shielded: ["dat", "sec", "inf", "cmp"]
  },
  "backend-team": {
    agent_role: "backend-team",
    sees: ["api", "dat", "sec", "arc"],
    shielded: ["des", "inf"]
  },
  "database-team": {
    agent_role: "database-team",
    sees: ["dat", "arc"],
    shielded: ["des", "api", "imp"]
  },
  "security-agent": {
    agent_role: "security-agent",
    sees: ["sec", "dat", "arc", "req"],
    shielded: ["des", "imp"]
  },
  "compliance-agent": {
    agent_role: "compliance-agent",
    sees: ["cmp", "biz", "req", "sec"],
    shielded: ["imp", "inf"]
  },
  "infrastructure-agent": {
    agent_role: "infrastructure-agent",
    sees: ["inf", "arc", "sec"],
    shielded: ["des", "req", "imp"]
  }
};

function filterForAgent(
  agent_role: string,
  artifacts: Artifact[]
): Artifact[] {
  const context = AGENT_CONTEXT_MAP[agent_role];

  if (!context) {
    // Unknown agent gets no filtering (supervisor level)
    return artifacts;
  }

  return artifacts.filter(artifact => {
    const layer_code = parseUID(artifact.uid).layer;
    return context.sees.includes(LAYER_CODES[layer_code]);
  });
}
```

### 7.6 UID Injection Enforcement

```typescript
// Ensure all generated artifacts have UIDs embedded

interface UIDInjection {
  artifact_type: string;
  injection_pattern: string;
  required: boolean;
}

const UID_INJECTION_PATTERNS: Record<string, UIDInjection> = {
  "code": {
    artifact_type: "code",
    injection_pattern: "//@trace {UID}",
    required: true
  },
  "markdown": {
    artifact_type: "markdown",
    injection_pattern: "---\ntrace: {UID}\n---",
    required: true
  },
  "yaml": {
    artifact_type: "yaml",
    injection_pattern: "# trace: {UID}",
    required: true
  },
  "json": {
    artifact_type: "json",
    injection_pattern: '"_trace": "{UID}"',
    required: true
  },
  "sql": {
    artifact_type: "sql",
    injection_pattern: "-- @trace {UID}",
    required: true
  }
};

function injectUID(content: string, uid: string, artifact_type: string): string {
  const pattern = UID_INJECTION_PATTERNS[artifact_type];
  if (!pattern) {
    throw new MCPError("UNKNOWN_ARTIFACT_TYPE",
      `Cannot inject UID into unknown artifact type: ${artifact_type}`);
  }

  const injection = pattern.injection_pattern.replace("{UID}", uid);

  // Inject at appropriate location based on type
  switch (artifact_type) {
    case "code":
      return `${injection}\n${content}`;
    case "markdown":
      return `${injection}\n${content}`;
    case "yaml":
      return `${injection}\n${content}`;
    case "json":
      // Inject as first property
      return content.replace(/^\{/, `{\n  ${injection},`);
    case "sql":
      return `${injection}\n${content}`;
    default:
      return content;
  }
}

function validateUIDPresent(content: string, uid: string): boolean {
  return content.includes(uid);
}
```

### 7.7 Audit Logging

```typescript
// Log all operations to the audit trail

interface AuditEntry {
  audit_id: string;
  timestamp: string;
  session_id: string;
  agent: string;
  action: "CREATE" | "UPDATE" | "DELETE" | "LINK" | "VERIFY" | "APPROVE" | "REJECT";
  artifact_uid?: string;
  triggered_by?: string;     // Parent requirement UID
  rationale: string;
  details: Record<string, any>;
  commit_sha?: string;
}

async function logAudit(entry: Omit<AuditEntry, "audit_id" | "timestamp">): Promise<string> {
  const audit_id = generateAuditId();
  const timestamp = new Date().toISOString();

  const fullEntry: AuditEntry = {
    audit_id,
    timestamp,
    ...entry
  };

  // Store in graph as audit node
  await graph.createNode({
    type: "AuditEntry",
    ...fullEntry
  });

  // Link to artifact if present
  if (entry.artifact_uid) {
    await graph.createEdge(audit_id, entry.artifact_uid, "audits");
  }

  // Link to triggering requirement if present
  if (entry.triggered_by) {
    await graph.createEdge(audit_id, entry.triggered_by, "triggered-by");
  }

  return audit_id;
}
```

---

## 8. Data Models

### 8.1 Persona Node

```typescript
interface PersonaNode {
  // Identity
  uid: string;                        // e.g., "cpe:psychotest/persona/TENANT-ADMIN"
  name: string;

  // Classification
  category: "internal_platform" | "b2b_customer" | "b2c_end_user" | "external_stakeholder";
  type: "internal" | "b2b" | "b2c" | "compliance" | "operational";
  priority: number;                   // For conflict resolution

  // Authorization
  accessLevel: "platform" | "tenant-scoped" | "user-scoped";

  // Status
  status: "draft" | "active" | "deprecated";
  version: string;

  // Derived
  intent: string;                     // Primary goal
  goals: string[];
  constraints: string[];
  vocabulary: string[];               // Domain terms this persona uses

  // Accessibility
  accessibilityProfile?: string;      // e.g., "WCAG 2.1 AA"

  // Compliance
  dataSovereignty: {
    retention: string;                // e.g., "7years"
    jurisdiction: string;             // e.g., "EU"
    rightToErasure: boolean;
  };

  // Discovery metadata
  coverageRationale: string;          // WHY this persona exists
  discoverySource: string;            // e.g., "SDO:SaaS-Pattern + MAD:BusinessAnalyst"

  // Relationships
  relationships: PersonaRelationship[];

  // Tenant
  tenant_id?: string;                 // If tenant-scoped
}

interface PersonaRelationship {
  type: "manages" | "reports-to" | "collaborates-with" | "serves";
  target: string;                     // Target persona UID
}
```

### 8.2 Artifact Node

```typescript
interface Artifact {
  // Identity
  uid: string;                        // e.g., "cpe:psychotest/req/story/HIRING-MANAGER/HM-REQ-001"

  // Classification
  layer: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  artifact_type: string;              // Layer-specific type

  // Content
  content: any;                       // The actual artifact content
  content_format: "cml" | "json" | "yaml" | "code" | "markdown" | "sql";

  // Status
  status: "draft" | "active" | "stale" | "deprecated";
  version: string;

  // Ownership
  persona_scope: string;              // Which persona this serves
  tenant_id?: string;

  // Authorship
  created_by: string;                 // Agent or human UID
  created_at: string;
  last_modified_by: string;
  last_modified_at: string;

  // Traceability
  trace_links: TraceLink[];
  parent_uid: string;                 // Immediate parent (for orphan detection)

  // Validation
  validation_status: {
    critic_approved?: boolean;
    sdo_compliant?: boolean;
    authority_check?: "PASSED" | "FAILED";
    smt_verified?: boolean;
  };
}
```

### 8.3 Trace Link

```typescript
interface TraceLink {
  link_id: string;
  from_uid: string;
  to_uid: string;
  relationship:
    | "derives-from"     // Child → Parent: Tracks cascade lineage
    | "implements"       // Implementation → Requirement: Verifies satisfaction
    | "tests"            // Test → Artifact: Validation coverage
    | "documents"        // Documentation → Artifact: Knowledge capture
    | "conflicts-with"   // Bidirectional: Conflict detection
    | "shares-with"      // Artifact → Personas: Cross-persona ownership
    | "depends-on"       // Dependent → Dependency: Technical dependencies
    | "versioned-from";  // New → Previous: Version lineage
  created_at: string;
  created_by: string;
  metadata?: Record<string, any>;
}
```

### 8.4 Session

```typescript
interface Session {
  session_id: string;
  founding_intent: string;

  // Ontology grounding
  ontology_constraints: Constraint[];
  inferred_patterns: string[];
  controlled_vocabulary: Term[];

  // Current state
  current_phase: string;

  // Gate status
  gates: Record<string, GateStatus>;

  // Discovery metadata
  discovery_metadata?: {
    method: string;
    f1_score: number;
    mad_rounds: number;
  };

  // Timestamps
  created_at: string;
  last_activity: string;
}

interface GateStatus {
  gate_id: string;
  status: "not_requested" | "pending" | "approved" | "rejected";
  requested_at?: string;
  decided_at?: string;
  decided_by?: string;
  feedback?: string;
}
```

### 8.5 Conflict

```typescript
interface Conflict {
  conflict_id: string;
  type: "semantic_overlap" | "resource_contention" | "constraint_contradiction";
  severity: "low" | "medium" | "high" | "blocking";

  // Involved parties
  personas_involved: string[];
  requirements_involved: string[];

  // Details
  description: string;
  affected_entity?: string;

  // Recommendations
  recommendations: Resolution[];

  // Status
  resolution_status: "unresolved" | "pending_gate_2" | "resolved";
  resolution_decision?: Resolution;
  resolved_by?: string;
  resolved_at?: string;
}

interface Resolution {
  strategy: "merge" | "prioritize" | "separate" | "escalate";
  description: string;
  priority: "recommended" | "alternative";
  rationale?: string;
}
```

### 8.6 CML User Story

```typescript
interface CMLUserStory {
  uid: string;
  persona_uid: string;

  // CML Structure
  story_name: string;
  actor: string;
  action: string;
  entity: string;
  capabilities: string[];
  value_proposition: string;
  promotes?: string;                  // Quality attribute promoted
  harms?: string;                     // Negative impact (optional)

  // Raw CML
  cml_source: string;

  // Cross-persona
  involves?: string[];                // Other personas involved
  conflicts_with?: string[];          // Conflicting requirements

  // Validation
  validation: {
    critic_approved: boolean;
    authority_check: AuthorityCheckResult;
    vocabulary_check: VocabularyCheckResult;
  };

  // Derived
  acceptance_criteria: AcceptanceCriterion[];
  nfrs: NonFunctionalRequirement[];
}
```

---

## 9. Configuration

```yaml
# cpe-mcp-config.yaml
# Cascading Persona Ecosystem MCP Server Configuration

server:
  name: "cascading-persona-ecosystem"
  version: "3.0.0"
  uid_prefix: "cpe"

# Graph Database
graph:
  type: "neo4j"                       # neo4j | sqlite
  uri: "bolt://localhost:7687"
  database: "persona-ecosystem"
  # For SQLite:
  # sqlite_path: "./helix.db"

# SaaS Domain Ontology
ontology:
  sdo_path: "./ontologies/saas-domain-ontology.owl"
  ddd_contexts_path: "./contexts/"
  pattern_libraries:
    - "./patterns/saas-platform.yaml"
    - "./patterns/psychometric.yaml"
    - "./patterns/healthcare.yaml"
    - "./patterns/marketplace.yaml"

# External Knowledge Sources (OG-RAG)
external_sources:
  onet:
    enabled: true
    endpoint: "https://services.onetcenter.org/ws/"
  gdpr:
    enabled: true
    roles_file: "./regulations/gdpr-roles.yaml"
  hipaa:
    enabled: false
    roles_file: "./regulations/hipaa-roles.yaml"

# Policy Engine
policy:
  engine: "casbin"                    # casbin | opa
  model_path: "./policies/rbac_model.conf"
  default_policies: "./policies/default_policies.csv"

# Formal Verification
verification:
  smt_solver: "z3"
  z3_timeout_ms: 30000
  proof_cache: true
  fitness_functions:
    - "no_cyclic_dependencies"
    - "layer_isolation"
    - "tenant_filter_present"
    - "uid_trace_present"

# Multi-Agent Debate (MAD)
mad:
  enabled: true
  max_rounds: 3
  consensus_threshold: 0.67
  agents:
    - "business_analyst"
    - "ux_researcher"
    - "domain_expert"
  judge: "mad_judge"

# Human Gates
gates:
  gate_1:
    enabled: true
    timeout_hours: 48
    notification_channel: "slack"     # slack | email | webhook
  gate_2:
    enabled: true
    timeout_hours: 48
  gate_4:
    enabled: true
    timeout_hours: 24
  gate_5:
    enabled: true
    timeout_hours: 24

# Context Engineering
context_engineering:
  enabled: true
  agent_roles:
    - "frontend-team"
    - "backend-team"
    - "database-team"
    - "security-agent"
    - "compliance-agent"
    - "infrastructure-agent"

# Drift Detection
drift_detection:
  enabled: true
  schedule: "0 0 * * *"               # Daily at midnight
  auto_heal_cosmetic: true
  alert_on_functional: true
  block_on_breaking: true

# Regeneration
regeneration:
  default_strategy: "incremental_update"
  strategies:
    - "full_regeneration"
    - "incremental_update"
    - "validation_only"
    - "human_review"

# Audit
audit:
  enabled: true
  retention_days: 2555                # 7 years for compliance
  include_content: true
  vcs_integration:
    enabled: true
    commit_message_template: |
      {action}({layer}): {description}

      //@trace {uid}
      Triggered by: {parent_uid}
      Agent: {agent}

# Server Enforcement
enforcement:
  uid_validation: "strict"            # strict | warn | disabled
  orphan_prevention: true
  relationship_integrity: true
  gate_enforcement: true
  layer_dependency_check: true
```

---

## Summary: Alignment with Source Document

| Source Requirement | V3 Implementation |
|--------------------|-------------------|
| Founding Intent as trigger | `cpe/bootstrap_ecosystem` tool with semantic bootstrap |
| Discovery Triad (CoT + MAD + OG-RAG) | Full implementation with specialist agents |
| 5 Human Gates | `cpe/request_gate_approval` + server enforcement |
| 12-Layer Artifact Cascade | Layer-specific generation with DAG enforcement |
| Cross-Persona Synthesis | Polysemic modeling with conflict resolution |
| Context Mapper Language (CML) | Structured input for requirements |
| Adversarial Requirement Testing | Critic Agent with SDO validation |
| 8 Core Relationship Types | Server-enforced with semantic validation |
| UID Taxonomy (RFC 8141) | Grammar enforcement + injection patterns |
| Context Engineering (Google ADK) | Agent role-based filtering |
| Formal Verification (SMT/Z3) | `cpe/prove_security_policy` tool |
| Drift Detection + Self-Healing | Continuous monitoring with auto-regeneration |
| Multi-Tenancy (Pooled/Bridge/Siloed) | `cpe/inject_tenant_policy` tool |
| GDPR Article 30 | `cpe/generate_gdpr_article_30` tool |
| Persona-Specific Documentation | `cpe/generate_persona_specific_docs` tool |
| Full Audit Capability | Complete audit logging to graph |
| Coverage Rationale | Required field in persona definition |
| Service Cutter Integration | `cpe/suggest_bounded_contexts` tool |
| UID Injection in Code | `//@trace {UID}` pattern enforcement |
| Cascade Supervisor | Chief Architect agent orchestrating DAG |
