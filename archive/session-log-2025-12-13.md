# Helix MCP Server Design Session Log

**Date**: 2025-12-13
**Context**: Designing MCP server implementation for Cascading Persona Ecosystem

---

## Session Summary

This session transformed the architectural specification document into a comprehensive, federated MCP server design.

---

## Key Decisions Made

### 1. Architecture: Federated MCP Servers (Option B)

We chose **5 federated MCP servers** over monolithic:

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLAUDE / AI CLIENT                           │
└───────┬──────────┬──────────┬──────────┬──────────┬────────────────┘
        │          │          │          │          │
        ▼          ▼          ▼          ▼          ▼
┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐
│   GRAPH   │ │ DISCOVERY │ │DERIVATION │ │  CASCADE  │ │VERIFICATION│
│   CORE    │ │    MCP    │ │    MCP    │ │    MCP    │ │    MCP    │
└─────┬─────┘ └─────┬─────┘ └─────┬─────┘ └─────┬─────┘ └─────┬─────┘
      │             │             │             │             │
      └─────────────┴─────────────┴──────┬──────┴─────────────┘
                                         │
                              ┌──────────▼──────────┐
                              │   Neo4j + Redis     │
                              └─────────────────────┘
```

**Rationale**:
- Discovery is LLM-heavy, runs once per project
- Verification is continuous, needs to be fast
- Cascade is bursty (nothing, then 1000 artifacts)
- Allows independent scaling and team ownership

### 2. The 5 MCP Servers

| Server | Package | Purpose | Key Tools |
|--------|---------|---------|-----------|
| **Graph Core** | `@helix/mcp-graph` | Source of truth, traceability | `query_graph`, `link_artifacts`, `trace_impact` |
| **Discovery** | `@helix/mcp-discovery` | Persona ecosystem discovery | `bootstrap_ecosystem`, `discover_personas`, `mad_debate` |
| **Derivation** | `@helix/mcp-derivation` | Requirements engineering | `derive_intents`, `submit_requirement`, `synthesize_cross_persona` |
| **Cascade** | `@helix/mcp-cascade` | 12-layer artifact generation | `generate_artifact`, `inject_tenant_policy`, `request_gate_approval` |
| **Verification** | `@helix/mcp-verification` | Drift detection, proofs | `verify_drift`, `prove_security_policy`, `run_fitness_functions` |

### 3. Committee Failure Analysis

We created a "committee" of personas to design the MCP server initially, but they **missed critical elements** because:

1. **No semantic bootstrap** - They weren't grounded in the source document
2. **Invented instead of extracted** - Classic hallucination pattern
3. **Single-agent mental model** - Didn't model multi-agent debate
4. **Missed 5 human gates** - Critical oversight
5. **Ignored DAG topology** - Parallel/sequential execution order matters

This led to **3 versions** of the spec:
- **V1**: Committee design (capability-organized) - OBSOLETE
- **V2**: Partially aligned - OBSOLETE
- **V3**: Faithful extraction from source - CURRENT

### 4. Key Architectural Elements (from V3)

#### Discovery Triad
1. **CoT** (Chain-of-Thought): Recursive Stakeholder Network Interrogation
2. **MAD** (Multi-Agent Debate): 3 specialists + judge
3. **OG-RAG** (Ontology-Grounded RAG): External knowledge (O*NET, GDPR)

#### 5 Human Gates
1. Gate #1: After Persona Discovery
2. Gate #2: After Cross-Persona Synthesis
3. Gate #4: After Architecture (freeze before parallel branch)
4. Gate #5: Pre-deployment

#### Agent Topology
```
Cascade Supervisor (Chief Architect)
├── Persona Discovery Agent
│   ├── Business Analyst Sub-Agent (MAD)
│   ├── UX Researcher Sub-Agent (MAD)
│   ├── Domain Expert Sub-Agent (MAD)
│   └── Judge Sub-Agent (MAD)
├── Intent Derivation Agents (1 per persona)
│   └── Critic Agent (adversarial testing)
├── Cross-Persona Synthesis Agent
├── Layer-Specific Agents (12 total)
└── Verification Agents
```

#### UID Taxonomy (RFC 8141)
```
cpe:{namespace}/{layer}/{artifact_type}/{persona_scope}/{artifact_id}[@version]

Example: cpe:psychotest/req/story/HIRING-MANAGER/HM-REQ-001@1.0.0
```

#### 8 Core Relationship Types
- derives-from, implements, tests, documents
- conflicts-with, shares-with, depends-on, versioned-from

---

## Files Created

| File | Description | Lines |
|------|-------------|-------|
| `CLAUDE.md` | Comprehensive guide for Claude Code | ~600 |
| `docs/architecture.md` | Source architecture document (moved) | ~5000 |
| `docs/mcp-server-spec-v3.md` | Full MCP specification | ~2500 |
| `docs/session-log-2025-12-13.md` | This file | - |

**Deleted**: `mcp-server-spec.md` (V1), `mcp-server-spec-v2.md` (V2)

---

## Repository Structure (Planned)

```
helix/
├── CLAUDE.md
├── docs/
│   ├── architecture.md
│   ├── mcp-server-spec-v3.md
│   └── session-log-2025-12-13.md
├── packages/
│   ├── common/                  # Shared: graph client, models, UID utils
│   ├── mcp-graph/              # Graph Core MCP
│   ├── mcp-discovery/          # Discovery MCP
│   ├── mcp-derivation/         # Derivation MCP
│   ├── mcp-cascade/            # Cascade MCP
│   └── mcp-verification/       # Verification MCP
├── ontologies/
│   ├── saas-domain-ontology.owl
│   └── patterns/
├── policies/
│   ├── rbac_model.conf
│   └── default_policies.csv
├── docker/
├── docker-compose.yml
├── docker-compose.dev.yml
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── helix.config.yaml
```

---

## Technology Stack Decided

| Component | Technology |
|-----------|------------|
| Package Manager | pnpm (workspaces) |
| Language | TypeScript (strict) |
| Test Framework | vitest |
| Graph Database | Neo4j |
| Event Bus | Redis |
| SMT Solver | Z3 |
| Policy Engine | Casbin |
| Schema Validation | Zod |

---

## MCP Server Capabilities Summary

### 1. Ecosystem Discovery
- Parse "Create a psychometric SaaS platform" → 12+ personas
- Multi-Agent Debate for validation (F1: 0.726 → 0.841)
- External knowledge retrieval (+55% recall)

### 2. Requirements Engineering
- CML (Context Mapper Language) input
- Adversarial requirement testing
- Conflict detection and resolution
- Polysemic modeling (shared entities, persona-specific views)

### 3. Artifact Generation & Traceability
- 12-layer cascade with DAG ordering
- Orphan prevention (no code without requirements)
- UID injection in all artifacts (`//@trace HM-REQ-001`)
- Impact analysis in milliseconds

### 4. Security & Multi-Tenancy
- RBAC derivation from persona graph
- Tenant isolation (pooled/bridge/siloed)
- SMT proofs for security policies
- Row-Level Security auto-injection

### 5. Governance & Compliance
- 5 human approval gates
- Drift detection (spec vs impl)
- Self-healing regeneration
- GDPR Article 30 auto-generation
- Full audit trail

---

## Next Steps (Not Started)

1. **Initialize project structure**
   - Create `package.json`, `pnpm-workspace.yaml`, `tsconfig.base.json`

2. **Create `@helix/common` package**
   - Graph client (Neo4j)
   - TypeScript models (Zod schemas)
   - UID parsing/validation/generation
   - Event bus abstraction
   - Configuration loading

3. **Implement `@helix/mcp-graph` first**
   - Foundation for all other MCPs
   - Tools: `query_graph`, `link_artifacts`, `trace_impact`
   - Resources: personas, artifacts, traceability

4. **Then other MCPs in order**
   - Discovery → Derivation → Cascade → Verification

---

## Important Links

- Source document: `docs/architecture.md`
- V3 Spec: `docs/mcp-server-spec-v3.md`
- Claude guide: `CLAUDE.md`

---

## Resume Instructions

When resuming this project:

1. Read `CLAUDE.md` first - contains full project context
2. Read `docs/mcp-server-spec-v3.md` for detailed tool/resource specs
3. Read this session log for design decisions and rationale
4. Start implementation with `@helix/common` package

Key command to start:
```bash
# After creating project structure
pnpm install
docker-compose -f docker-compose.dev.yml up -d
pnpm run db:init
```

---

## Questions Answered This Session

1. **"How to change this into MCP server?"** → Created committee, then V3 spec
2. **"Why did committee miss so bad?"** → No semantic bootstrap, invented vs extracted
3. **"One MCP or multiple?"** → Federated (5 MCPs) for scaling/ownership
4. **"What are capabilities?"** → 5 domains: Discovery, Requirements, Generation, Security, Governance
