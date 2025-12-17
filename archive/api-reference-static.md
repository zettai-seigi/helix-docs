# Helix MCP API Reference

Complete API documentation for all Helix MCP server tools.

---

## Table of Contents

1. [Overview](#overview)
2. [Graph Core (mcp-graph)](#graph-core-mcp-graph)
3. [Discovery (mcp-discovery)](#discovery-mcp-discovery)
4. [Derivation (mcp-derivation)](#derivation-mcp-derivation)
5. [Cascade (mcp-cascade)](#cascade-mcp-cascade)
6. [Verification (mcp-verification)](#verification-mcp-verification)
7. [Common Types](#common-types)
8. [Error Codes](#error-codes)

---

## Overview

Helix exposes tools through 5 federated MCP servers. All tools follow the naming convention `cpe/{action}_{noun}` and return JSON responses.

### Authentication

All tools require a `tenant_id` parameter for multi-tenant isolation. Queries are automatically scoped to the specified tenant.

### Response Format

All tools return responses in this format:

```json
{
  "success": true,
  "message": "Operation completed",
  // ... tool-specific data
}
```

On error:

```json
{
  "success": false,
  "error": "Error message"
}
```

---

## Graph Core (mcp-graph)

The Graph Core server is the source of truth for the Knowledge Graph.

### cpe/query_graph

Execute Cypher queries against the Knowledge Graph.

**Input:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `cypher` | string | Yes | - | The Cypher query to execute |
| `params` | object | No | `{}` | Query parameters |
| `tenant_id` | string | Yes | - | Tenant ID for scoping |
| `read_only` | boolean | No | `true` | Use read-only transaction |

**Example:**

```json
{
  "cypher": "MATCH (p:Persona {tenantId: $tenantId}) RETURN p",
  "tenant_id": "tenant-123"
}
```

**Response:**

```json
{
  "success": true,
  "recordCount": 5,
  "records": [
    { "p": { "uid": "cpe:myproject/persona/ADMIN", "name": "ADMIN" } }
  ]
}
```

---

### cpe/link_artifacts

Create trace relationships between artifacts.

**Input:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `source_uid` | string | Yes | UID of the source artifact |
| `target_uid` | string | Yes | UID of the target artifact |
| `relationship_type` | string | Yes | Type of relationship (see below) |
| `tenant_id` | string | Yes | Tenant ID |
| `properties` | object | No | Additional relationship properties |

**Relationship Types (8 Core Types - Traceability Schema):**

| Type | Neo4j | Direction | Architectural Function |
|------|-------|-----------|------------------------|
| `derives-from` | `DERIVES_FROM` | Child → Parent | **Cascade Lineage:** Tracks vertical generation chain (e.g., *UserStory* derives from *Persona Intent*). |
| `implements` | `IMPLEMENTS` | Impl → Req | **Verification:** Links "territory" (Code) to "map" (Requirement). Detects "Gold-Plating" (orphaned code). |
| `tests` | `TESTS` | Test → Artifact | **Validation:** Links test cases to artifacts for coverage metrics (e.g., *UnitTest* tests *Class*). |
| `documents` | `DOCUMENTS` | Doc → Artifact | **Knowledge Capture:** Links documentation to components, treating docs as live code dependencies. |
| `conflicts-with` | `CONFLICTS_WITH` | Bidirectional | **Conflict Detection:** Identifies competing constraints between artifacts or personas. |
| `shares-with` | `SHARES_WITH` | Artifact → Personas | **Polysemic Modeling:** Tracks cross-persona ownership of shared artifacts (e.g., *Assessment*). |
| `depends-on` | `DEPENDS_ON` | Dependent → Dependency | **Structural Coupling:** Tracks technical dependencies for impact analysis. |
| `versioned-from` | `VERSIONED_FROM` | New → Previous | **Audit Lineage:** Creates immutable history chain for drift detection and compliance.

**Example:**

```json
{
  "source_uid": "cpe:myproject/req/story/ADMIN/REQ-001",
  "target_uid": "cpe:myproject/persona/ADMIN",
  "relationship_type": "derives-from",
  "tenant_id": "tenant-123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Created derives-from relationship from cpe:myproject/req/story/ADMIN/REQ-001 to cpe:myproject/persona/ADMIN",
  "relationship": {
    "source": "cpe:myproject/req/story/ADMIN/REQ-001",
    "target": "cpe:myproject/persona/ADMIN",
    "type": "derives-from"
  }
}
```

---

### cpe/trace_impact

Analyze the blast radius of changes to an artifact.

**Input:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `uid` | string | Yes | - | UID of artifact to analyze |
| `tenant_id` | string | Yes | - | Tenant ID |
| `max_depth` | number | No | `10` | Maximum traversal depth (1-20) |
| `include_tests` | boolean | No | `true` | Include test artifacts |
| `group_by_layer` | boolean | No | `true` | Group results by layer |

**Example:**

```json
{
  "uid": "cpe:myproject/req/story/ADMIN/REQ-001",
  "tenant_id": "tenant-123",
  "max_depth": 5
}
```

**Response:**

```json
{
  "success": true,
  "source": { "uid": "cpe:myproject/req/story/ADMIN/REQ-001", "layer": "req" },
  "impact": {
    "totalAffected": 12,
    "criticalPathCount": 3,
    "maxDistance": 4
  },
  "criticalPaths": [
    { "uid": "cpe:myproject/imp/handler/ADMIN/auth-handler", "layer": "imp", "name": "AuthHandler" }
  ],
  "byLayer": {
    "imp": [...],
    "tst": [...]
  }
}
```

---

### cpe/get_lineage

Trace an artifact's lineage back to the Founding Intent.

**Input:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `uid` | string | Yes | - | UID of artifact to trace |
| `tenant_id` | string | Yes | - | Tenant ID |
| `include_content` | boolean | No | `false` | Include artifact content |

**Example:**

```json
{
  "uid": "cpe:myproject/imp/handler/ADMIN/auth-handler",
  "tenant_id": "tenant-123"
}
```

**Response:**

```json
{
  "success": true,
  "artifact": {
    "uid": "cpe:myproject/imp/handler/ADMIN/auth-handler",
    "layer": "imp",
    "layerName": "Implementation"
  },
  "lineage": {
    "depth": 4,
    "hasValidRoot": true,
    "root": { "uid": "cpe:myproject/persona/ADMIN", "layer": "persona", "name": "ADMIN" }
  },
  "chain": [
    { "uid": "cpe:myproject/persona/ADMIN", "layer": "Persona (persona)", "name": "ADMIN" },
    { "uid": "cpe:myproject/req/story/ADMIN/REQ-001", "layer": "Requirements (req)", "name": "LoginStory" },
    { "uid": "cpe:myproject/api/endpoint/ADMIN/auth-endpoint", "layer": "API (api)", "name": "AuthEndpoint" },
    { "uid": "cpe:myproject/imp/handler/ADMIN/auth-handler", "layer": "Implementation (imp)", "name": "AuthHandler" }
  ]
}
```

---

### MCP Resources (mcp-graph)

The Graph Core server exposes the following MCP resources for reading graph data:

#### cpe://graph/personas

List all personas in the ecosystem.

**URI:** `cpe://graph/personas`

**Response:** JSON array of all Persona nodes with their properties.

---

#### cpe://graph/traceability/{uid}

Get an artifact with all its graph edges (relationships).

**URI Template:** `cpe://graph/traceability/{uid}`

**Parameters:**
- `uid` - The artifact UID to retrieve

**Response:** Artifact node with incoming and outgoing relationships.

---

#### cpe://artifacts/layer/{layer_id}

Get all artifacts in a specific layer.

**URI Template:** `cpe://artifacts/layer/{layer_id}`

**Parameters:**
- `layer_id` - Layer code (e.g., `req`, `imp`, `tst`)

**Response:** JSON array of artifacts in the specified layer.

---

#### cpe://audit/{tenant_id}

Get the audit trail for a tenant.

**URI Template:** `cpe://audit/{tenant_id}`

**Parameters:**
- `tenant_id` - The tenant ID

**Response:** Audit log entries for the tenant.

---

## Discovery (mcp-discovery)

The Discovery server handles persona ecosystem discovery from the Founding Intent.

### cpe/bootstrap_ecosystem

Initialize the ecosystem from a founding intent (the "Big Bang" tool).

**Input:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `founding_intent` | string | Yes | The founding intent statement |
| `domain_hints` | string[] | No | Domain hints to guide discovery |
| `tenant_id` | string | Yes | Tenant ID for the ecosystem |
| `namespace` | string | Yes | Namespace for UIDs (e.g., "psychotest") |

**Example:**

```json
{
  "founding_intent": "Create a psychometric SaaS platform for enterprise hiring",
  "domain_hints": ["HR-tech", "B2B", "multi-tenant"],
  "tenant_id": "tenant-123",
  "namespace": "psychotest"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Ecosystem bootstrap completed",
  "ecosystem": {
    "tenantId": "tenant-123",
    "namespace": "psychotest",
    "foundingIntent": "Create a psychometric SaaS platform...",
    "intentUid": "cpe:psychotest/biz/goal/SYSTEM/founding-intent"
  },
  "domainAnalysis": {
    "domain": "HR Technology - Psychometric Assessment",
    "subDomains": ["Assessment Management", "Candidate Experience", "Analytics"],
    "coreCapabilities": ["Create assessments", "Administer tests", "Generate reports"],
    "suggestedBoundedContexts": ["AssessmentContext", "CandidateContext", "ReportingContext"],
    "complianceRequirements": ["GDPR", "SOC2"],
    "tenantModel": "pooled",
    "initialPersonaHints": [
      { "name": "PSYCHOMETRICIAN", "role": "Assessment designer", "category": "primary" }
    ]
  },
  "nextSteps": [
    "Run cpe/discover_personas with tenant_id=\"tenant-123\" to identify stakeholders"
  ]
}
```

---

### cpe/discover_personas

Execute the Discovery Triad (CoT + MAD + OG-RAG) to identify personas.

**Input:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `tenant_id` | string | Yes | - | Tenant ID |
| `use_mad` | boolean | No | `true` | Use Multi-Agent Debate |
| `use_og_rag` | boolean | No | `true` | Use Ontology-Grounded RAG |
| `max_personas` | number | No | `20` | Maximum personas (1-50) |

**Discovery Triad:**

1. **CoT (Chain-of-Thought)**: Recursive stakeholder network interrogation
2. **MAD (Multi-Agent Debate)**: Business Analyst, UX Researcher, Domain Expert, Judge
3. **OG-RAG (Ontology-Grounded RAG)**: O*NET, GDPR roles, domain ontologies

**Example:**

```json
{
  "tenant_id": "tenant-123",
  "use_mad": true,
  "use_og_rag": true,
  "max_personas": 15
}
```

**Response:**

```json
{
  "success": true,
  "message": "Persona discovery completed",
  "discovery": {
    "tenantId": "tenant-123",
    "namespace": "psychotest",
    "foundingIntent": "Create a psychometric SaaS platform...",
    "methods": { "cot": true, "mad": true, "ogRag": true }
  },
  "personas": [
    {
      "name": "HIRING-MANAGER",
      "category": "b2b_customer",
      "type": "b2b",
      "priority": 2,
      "accessLevel": "tenant-scoped",
      "intent": "Efficiently evaluate candidates using assessment results",
      "goals": ["View candidate scores", "Compare candidates", "Make hiring decisions"],
      "constraints": ["Cannot access other tenant data", "Limited to assigned assessments"],
      "vocabulary": ["Candidate", "Assessment", "Score", "Hire"],
      "dataSovereignty": { "retention": "3years", "jurisdiction": "US", "rightToErasure": true },
      "coverageRationale": "Primary decision maker consuming assessment outputs",
      "discoverySource": "CoT + OG-RAG:O*NET",
      "confidence": 0.92
    }
  ],
  "summary": {
    "total": 8,
    "byCategory": { "internalPlatform": 1, "b2bCustomer": 4, "b2cEndUser": 2, "externalStakeholder": 1 }
  },
  "gate": {
    "id": "gate-1-tenant-123-1234567890",
    "number": 1,
    "name": "Persona Discovery Review",
    "status": "pending"
  },
  "nextSteps": [
    "Review each persona for completeness and accuracy",
    "Use cpe/register_persona to add approved personas",
    "Approve Gate #1 to proceed to requirements derivation"
  ]
}
```

---

### cpe/register_persona

Register a validated persona in the Knowledge Graph.

**Input:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenant_id` | string | Yes | Tenant ID |
| `namespace` | string | Yes | Namespace for UIDs |
| `name` | string | Yes | Persona name (UPPERCASE-HYPHENATED) |
| `role` | string | Yes | Role description |
| `description` | string | Yes | Detailed description |
| `goals` | string[] | Yes | Persona goals |
| `pain_points` | string[] | Yes | Pain points |
| `permissions` | string[] | No | Permissions |
| `data_access` | string[] | No | Data access requirements |
| `frequency` | string | Yes | Usage frequency: daily/weekly/monthly/occasionally |
| `is_primary` | boolean | No | Is primary persona (default: false) |

**Example:**

```json
{
  "tenant_id": "tenant-123",
  "namespace": "psychotest",
  "name": "HIRING-MANAGER",
  "role": "HR Professional making hiring decisions",
  "description": "Enterprise hiring manager who uses assessment results to evaluate candidates",
  "goals": ["View candidate scores", "Compare candidates", "Make informed hiring decisions"],
  "pain_points": ["Too many candidates to review", "Inconsistent evaluation criteria"],
  "permissions": ["view_results", "compare_candidates"],
  "data_access": ["candidate_scores", "assessment_reports"],
  "frequency": "daily",
  "is_primary": true
}
```

**Response:**

```json
{
  "success": true,
  "message": "Persona registered successfully",
  "persona": {
    "uid": "cpe:psychotest/persona/HIRING-MANAGER",
    "name": "HIRING-MANAGER",
    "role": "HR Professional making hiring decisions",
    "tenantId": "tenant-123"
  }
}
```

---

### cpe/mad_debate

Execute Multi-Agent Debate for persona refinement.

**Input:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `tenant_id` | string | Yes | - | Tenant ID |
| `persona_candidates` | object[] | Yes | - | Initial persona candidates |
| `max_rounds` | number | No | `3` | Maximum debate rounds |
| `consensus_threshold` | number | No | `0.67` | Consensus threshold (0-1) |

**Example:**

```json
{
  "tenant_id": "tenant-123",
  "persona_candidates": [
    { "name": "HIRING-MANAGER", "role": "Makes hiring decisions" }
  ],
  "max_rounds": 3
}
```

---

## Derivation (mcp-derivation)

The Derivation server handles requirements engineering and conflict detection.

### cpe/derive_intents

Generate a mini-PRD for a specific persona.

**Input:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `persona_uid` | string | Yes | - | UID of the persona |
| `tenant_id` | string | Yes | - | Tenant ID |
| `max_intents` | number | No | `10` | Maximum intents to derive |
| `include_nfrs` | boolean | No | `true` | Include non-functional requirements |

**Example:**

```json
{
  "persona_uid": "cpe:psychotest/persona/HIRING-MANAGER",
  "tenant_id": "tenant-123",
  "max_intents": 10,
  "include_nfrs": true
}
```

**Response:**

```json
{
  "success": true,
  "personaUid": "cpe:psychotest/persona/HIRING-MANAGER",
  "intents": [
    {
      "name": "ViewAssessmentResults",
      "type": "user-story",
      "cml": "UserStory ViewAssessmentResults {\n  As a \"Hiring Manager\"\n  I want to \"view assessment results\"\n  so that \"I can evaluate candidates\"\n}",
      "priority": "must",
      "derivedFrom": "goal",
      "acceptanceCriteria": ["Results displayed in table", "Can filter by date"]
    }
  ],
  "summary": {
    "total": 5,
    "byPriority": { "must": 2, "should": 2, "could": 1 },
    "fromGoals": 3,
    "fromConstraints": 2
  }
}
```

---

### cpe/submit_requirement

Submit a CML requirement with semantic validation.

**Input:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenant_id` | string | Yes | Tenant ID |
| `persona_uid` | string | Yes | UID of the owning persona |
| `cml_content` | string | Yes | Context Mapper Language definition |
| `priority` | string | No | MoSCoW priority: must/should/could/wont |

**CML Format:**

```
UserStory StoryName {
    As a "Actor"
    I want to "action" a "entity"
    with "capability1", "capability2"
    so that "value proposition"
    promotes "quality attribute"
    harms "negative impact"
}
```

**Example:**

```json
{
  "tenant_id": "tenant-123",
  "persona_uid": "cpe:psychotest/persona/HIRING-MANAGER",
  "cml_content": "UserStory ViewResults {\n  As a \"Hiring Manager\"\n  I want to \"view\" a \"Assessment Result\"\n  with \"filtering\", \"sorting\"\n  so that \"I can compare candidates efficiently\"\n  promotes \"Usability\"\n}",
  "priority": "must"
}
```

**Response:**

```json
{
  "success": true,
  "requirement": {
    "uid": "cpe:psychotest/req/story/HIRING-MANAGER/ViewResults",
    "status": "draft"
  },
  "validation": {
    "passed": true,
    "authorityCheck": { "passed": true, "actor": "Hiring Manager", "authorized": true },
    "vocabularyCheck": { "valid": true, "unknownTerms": [] }
  },
  "criticAssessment": {
    "challengesPassed": 3,
    "challengesFailed": 0
  }
}
```

---

### cpe/detect_conflicts

Detect conflicts between requirements.

**Input:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `tenant_id` | string | Yes | - | Tenant ID |
| `requirement_uids` | string[] | No | - | Specific UIDs to check (optional, checks all if not provided) |
| `include_resolved` | boolean | No | `false` | Include already resolved conflicts |

**Example:**

```json
{
  "tenant_id": "tenant-123"
}
```

**Response:**

```json
{
  "success": true,
  "conflicts": [
    {
      "id": "CONFLICT-001",
      "type": "resource_contention",
      "severity": "high",
      "personasInvolved": ["cpe:psychotest/persona/DPO", "cpe:psychotest/persona/CANDIDATE"],
      "requirementsInvolved": ["cpe:psychotest/req/story/DPO/data-retention", "cpe:psychotest/req/story/CANDIDATE/delete-data"],
      "description": "DPO requires 7-year retention; Candidate requires immediate deletion",
      "recommendations": [
        { "strategy": "separate", "description": "Separate audit logs from personal data", "priority": "recommended" }
      ]
    }
  ],
  "summary": {
    "total": 3,
    "bySeverity": { "high": 1, "medium": 2 }
  }
}
```

---

### cpe/synthesize_cross_persona

Create unified entities with persona-specific views (Polysemic Modeling).

**Input:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenant_id` | string | Yes | Tenant ID |
| `entity_name` | string | Yes | Name of entity to synthesize |
| `persona_uids` | string[] | Yes | Personas that use this entity |

**Example:**

```json
{
  "tenant_id": "tenant-123",
  "entity_name": "Assessment",
  "persona_uids": [
    "cpe:psychotest/persona/PSYCHOMETRICIAN",
    "cpe:psychotest/persona/CANDIDATE",
    "cpe:psychotest/persona/HIRING-MANAGER"
  ]
}
```

**Response:**

```json
{
  "success": true,
  "sharedKernel": {
    "entity": "Assessment",
    "coreAttributes": ["id", "title", "created_at", "tenant_id"],
    "personaViews": {
      "PSYCHOMETRICIAN": {
        "dto": "AssessmentFullDTO",
        "visibleAttributes": ["*", "scoring_logic", "item_bank"],
        "permissions": ["CREATE", "READ", "UPDATE", "DELETE"]
      },
      "CANDIDATE": {
        "dto": "CandidateAssessmentDTO",
        "visibleAttributes": ["id", "title", "questions", "time_limit"],
        "hiddenAttributes": ["scoring_logic", "correct_answers"],
        "permissions": ["READ", "SUBMIT"]
      },
      "HIRING-MANAGER": {
        "dto": "ManagerAssessmentResultDTO",
        "visibleAttributes": ["id", "title", "aggregate_scores"],
        "hiddenAttributes": ["individual_responses", "scoring_logic"],
        "permissions": ["READ"]
      }
    }
  }
}
```

---

### cpe/suggest_bounded_contexts

Suggest bounded contexts using Service Cutter principles.

**Input:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenant_id` | string | Yes | Tenant ID |
| `coupling_criteria` | string[] | No | Coupling criteria to consider |

**Example:**

```json
{
  "tenant_id": "tenant-123"
}
```

---

## Cascade (mcp-cascade)

The Cascade server handles 12-layer artifact generation.

### cpe/generate_artifact

Generate an artifact with orphan prevention.

**Input:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenant_id` | string | Yes | Tenant ID |
| `parent_uid` | string | Yes | UID of parent artifact |
| `layer` | string | Yes | Target layer code |
| `artifact_type` | string | Yes | Artifact type for the layer |
| `name` | string | Yes | Artifact name |
| `content` | object | Yes | Artifact content |

**Layer Codes and Artifact Types:**

| Layer | Code | Valid Artifact Types |
|-------|------|---------------------|
| Persona | `persona` | persona |
| Business | `biz` | goal, capability, metric |
| Requirements | `req` | story, epic, feature, nfr |
| Design | `des` | wireframe, mockup, prototype, flow |
| Architecture | `arc` | bounded-context, aggregate, service, component |
| API | `api` | endpoint, schema, contract |
| Data | `dat` | entity, migration, index, view |
| Security | `sec` | policy, role, permission, rls |
| Implementation | `imp` | module, class, function, handler |
| Testing | `tst` | unit, integration, e2e, contract |
| Compliance | `cmp` | audit, gdpr, soc2, hipaa |
| Infrastructure | `inf` | terraform, helm, dockerfile, pipeline |
| Documentation | `doc` | readme, api-doc, runbook, adr |

**Example:**

```json
{
  "tenant_id": "tenant-123",
  "parent_uid": "cpe:psychotest/req/story/ADMIN/REQ-001",
  "layer": "api",
  "artifact_type": "endpoint",
  "name": "GetUserEndpoint",
  "content": {
    "method": "GET",
    "path": "/api/users/{id}",
    "responses": { "200": "User object" }
  }
}
```

**Response:**

```json
{
  "success": true,
  "artifact": {
    "uid": "cpe:psychotest/api/endpoint/ADMIN/GetUserEndpoint",
    "layer": "api",
    "artifactType": "endpoint",
    "parentUid": "cpe:psychotest/req/story/ADMIN/REQ-001"
  }
}
```

---

### cpe/generate_layer

Batch generate an entire layer.

**Input:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenant_id` | string | Yes | Tenant ID |
| `layer` | string | Yes | Layer code to generate |
| `parent_layer` | string | Yes | Source layer for derivation |

**Example:**

```json
{
  "tenant_id": "tenant-123",
  "layer": "api",
  "parent_layer": "req"
}
```

---

### cpe/inject_tenant_policy

Auto-inject RLS and tenant isolation policies.

**Input:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenant_id` | string | Yes | Tenant ID |
| `tenant_mode` | string | Yes | Tenant mode: pooled/bridge/siloed |
| `entity_uid` | string | Yes | Entity UID to inject policy for |

**Example:**

```json
{
  "tenant_id": "tenant-123",
  "tenant_mode": "pooled",
  "entity_uid": "cpe:psychotest/dat/entity/SYSTEM/Assessment"
}
```

---

### cpe/request_gate_approval

Request human approval at a workflow gate.

**Input:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenant_id` | string | Yes | Tenant ID |
| `gate_number` | number | Yes | Gate number (1, 2, 4, or 5) |
| `artifact_uids` | string[] | Yes | UIDs of artifacts for review |
| `summary` | string | Yes | Summary for reviewers |

**Gates:**

| Gate | After Phase | Purpose |
|------|-------------|---------|
| 1 | Persona Discovery | Validate persona roster |
| 2 | Cross-Persona Synthesis | Validate conflict resolutions |
| 4 | Architecture | Freeze before parallel branch |
| 5 | Pre-deployment | Final verification |

**Example:**

```json
{
  "tenant_id": "tenant-123",
  "gate_number": 1,
  "artifact_uids": ["cpe:psychotest/persona/HIRING-MANAGER"],
  "summary": "Review discovered personas"
}
```

---

### cpe/check_gate_status

Check if a human gate has been approved.

**Input:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenant_id` | string | Yes | Tenant ID |
| `gate_id` | string | Yes | Gate request ID |

**Example:**

```json
{
  "tenant_id": "tenant-123",
  "gate_id": "gate-1-tenant-123-1234567890"
}
```

**Response:**

```json
{
  "success": true,
  "gate": {
    "id": "gate-1-tenant-123-1234567890",
    "status": "approved",
    "approvedBy": "user@example.com",
    "approvedAt": "2025-01-15T10:30:00Z"
  }
}
```

---

### cpe/generate_role_based_views

Generate persona-specific UI views.

**Input:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenant_id` | string | Yes | Tenant ID |
| `entity_uid` | string | Yes | Entity to generate views for |
| `persona_uids` | string[] | Yes | Target personas |

---

### cpe/generate_persona_specific_docs

Generate tailored documentation for personas.

**Input:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenant_id` | string | Yes | Tenant ID |
| `persona_uid` | string | Yes | Target persona |
| `doc_type` | string | Yes | Documentation type: user-guide/api-ref/runbook |

---

## Verification (mcp-verification)

The Verification server handles drift detection and formal verification.

### cpe/verify_drift

Compare spec-state vs implementation-state.

**Input:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `tenant_id` | string | Yes | - | Tenant ID |
| `artifact_uid` | string | No | - | Specific artifact (optional, checks all if not provided) |
| `auto_heal` | boolean | No | `false` | Automatically fix cosmetic drift |

**Example:**

```json
{
  "tenant_id": "tenant-123",
  "auto_heal": false
}
```

**Response:**

```json
{
  "success": true,
  "driftAnalysis": {
    "totalChecked": 50,
    "driftDetected": 2,
    "drifts": [
      {
        "artifactUid": "cpe:psychotest/imp/handler/ADMIN/auth-handler",
        "type": "content",
        "severity": "warning",
        "description": "Implementation differs from specification",
        "specHash": "abc123",
        "implHash": "def456"
      }
    ]
  }
}
```

---

### cpe/prove_security_policy

Execute SMT proofs for RBAC policies.

**Input:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenant_id` | string | Yes | Tenant ID |
| `policy_type` | string | Yes | Policy type: rbac/rls/tenant-isolation |
| `persona_uid` | string | No | Specific persona to verify |

**Example:**

```json
{
  "tenant_id": "tenant-123",
  "policy_type": "rbac"
}
```

**Response:**

```json
{
  "success": true,
  "verification": {
    "policyType": "rbac",
    "proofsAttempted": 15,
    "proofsPassed": 15,
    "proofsFailed": 0,
    "results": [
      {
        "persona": "HIRING-MANAGER",
        "resource": "assessment_results",
        "action": "read",
        "verdict": "PROVED",
        "reason": "Permission granted via role assignment"
      }
    ]
  }
}
```

---

### cpe/run_fitness_functions

Execute ArchUnit-style fitness function checks.

**Input:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenant_id` | string | Yes | Tenant ID |
| `functions` | string[] | No | Specific functions to run (optional, runs all if not provided) |

**Built-in Fitness Functions:**

- `no_cyclic_dependencies` - No circular dependencies in graph
- `layer_isolation` - Correct layer ordering enforced
- `tenant_filter_present` - All queries scoped by tenant
- `uid_trace_present` - All code has `//@trace` comments
- `no_orphans` - All artifacts have parent

**Example:**

```json
{
  "tenant_id": "tenant-123",
  "functions": ["no_cyclic_dependencies", "no_orphans"]
}
```

**Response:**

```json
{
  "success": true,
  "results": [
    {
      "function": "no_cyclic_dependencies",
      "passed": true,
      "score": 1.0,
      "violations": []
    },
    {
      "function": "no_orphans",
      "passed": false,
      "score": 0.95,
      "violations": [
        {
          "artifactUid": "cpe:psychotest/imp/handler/ADMIN/orphan",
          "message": "No parent artifact found",
          "severity": "error"
        }
      ]
    }
  ],
  "summary": {
    "total": 2,
    "passed": 1,
    "failed": 1
  }
}
```

---

### cpe/verify_coverage

Find orphans and coverage gaps.

**Input:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenant_id` | string | Yes | Tenant ID |
| `layer` | string | No | Specific layer to check |

---

### cpe/regenerate_artifacts

Trigger targeted regeneration of artifacts.

**Input:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenant_id` | string | Yes | Tenant ID |
| `artifact_uids` | string[] | Yes | UIDs to regenerate |
| `strategy` | string | Yes | Strategy: full/incremental/validation-only |

---

### cpe/generate_gdpr_article_30

Generate GDPR Article 30 records of processing activities.

**Input:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenant_id` | string | Yes | Tenant ID |
| `data_controller` | string | Yes | Data controller name |
| `dpo_contact` | string | Yes | DPO contact information |

---

### cpe/generate_audit_evidence

Generate compliance audit evidence.

**Input:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenant_id` | string | Yes | Tenant ID |
| `framework` | string | Yes | Framework: gdpr/soc2/hipaa |
| `from_date` | string | No | Start date (ISO format) |
| `to_date` | string | No | End date (ISO format) |

---

### cpe/analyze_impact

Analyze impact of changes across the ecosystem.

**Input:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenant_id` | string | Yes | Tenant ID |
| `change_type` | string | Yes | Type of change |
| `affected_uids` | string[] | Yes | UIDs being changed |

---

## Common Types

### UID Format

All artifacts use RFC 8141-compliant UIDs:

```
cpe:{namespace}/{layer}/{artifact_type}/{persona_scope}/{artifact_id}[@version]
```

**Examples:**
- `cpe:psychotest/persona/HIRING-MANAGER`
- `cpe:psychotest/req/story/HIRING-MANAGER/HM-REQ-001`
- `cpe:psychotest/imp/handler/ADMIN/auth-handler@1.0.0`

### Persona Categories

| Category | Description |
|----------|-------------|
| `internal_platform` | Platform administrators, DevOps |
| `b2b_customer` | Business customers (tenant admins, managers) |
| `b2c_end_user` | End users (candidates, consumers) |
| `external_stakeholder` | Compliance (DPO), auditors |

### Persona Types

| Type | Description |
|------|-------------|
| `internal` | Internal employees |
| `b2b` | Business customers |
| `b2c` | Consumer users |
| `compliance` | Regulatory roles (DPO) |
| `operational` | Support, operations |

### Access Levels

| Level | Description |
|-------|-------------|
| `platform` | Full platform access |
| `tenant-scoped` | Access within tenant only |
| `user-scoped` | Access to own data only |

---

## Error Codes

| Code | Description |
|------|-------------|
| `INVALID_UID` | UID format violation |
| `UID_NOT_FOUND` | Artifact not found |
| `UID_ALREADY_EXISTS` | Duplicate UID |
| `ORPHAN_ARTIFACT` | Missing parent requirement |
| `LAYER_VIOLATION` | DAG dependency broken |
| `CYCLE_DETECTED` | Circular dependency |
| `INVALID_RELATIONSHIP` | Invalid relationship type |
| `GATE_NOT_PASSED` | Human gate not approved |
| `GATE_TIMEOUT` | Gate approval timed out |
| `GATE_REJECTED` | Gate was rejected |
| `AUTHORITY_VIOLATION` | Persona not authorized |
| `TENANT_VIOLATION` | Cross-tenant access |
| `VALIDATION_FAILED` | Schema validation failed |
| `CML_PARSE_ERROR` | CML parsing failed |
| `DISCOVERY_FAILED` | Persona discovery failed |
| `MAD_NO_CONSENSUS` | MAD did not reach consensus |
| `DRIFT_DETECTED` | Spec/impl drift detected |
| `SMT_PROOF_FAILED` | Z3 verification failed |
| `FITNESS_FAILED` | Fitness function failed |
| `NEO4J_CONNECTION_ERROR` | Database connection failed |
| `REDIS_CONNECTION_ERROR` | Event bus connection failed |
| `CONFIG_LOAD_ERROR` | Configuration file error |
