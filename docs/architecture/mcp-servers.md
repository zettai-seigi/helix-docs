# Federated MCP Servers

Helix consists of 5 federated MCP servers that share a common Knowledge Graph.

## Graph Core MCP

**Purpose**: Source of truth, traceability queries, resource exposure

**Tools**:

- `cpe/query_graph` - Execute Cypher queries
- `cpe/link_artifacts` - Create trace relationships
- `cpe/trace_impact` - Analyze blast radius
- `cpe/get_lineage` - Trace to Founding Intent

**Resources**:

- `cpe://graph/personas` - Persona ecosystem
- `cpe://graph/traceability/{uid}` - Artifact with edges
- `cpe://artifacts/layer/{layer_id}` - Layer artifacts

## Discovery MCP

**Purpose**: Persona ecosystem discovery from Founding Intent

**Tools**:

- `cpe/bootstrap_ecosystem` - Initialize from intent
- `cpe/discover_personas` - Execute Discovery Triad
- `cpe/mad_debate` - Multi-Agent Debate
- `cpe/register_persona` - Write persona to graph

## Derivation MCP

**Purpose**: Requirements engineering, conflict detection

**Tools**:

- `cpe/derive_intents` - Generate mini-PRD
- `cpe/submit_requirement` - Submit CML requirement
- `cpe/detect_conflicts` - Pairwise conflict detection
- `cpe/synthesize_cross_persona` - Shared kernel creation

## Cascade MCP

**Purpose**: 12-layer artifact generation

**Tools**:

- `cpe/generate_artifact` - Create with orphan prevention
- `cpe/inject_tenant_policy` - Auto-inject RLS
- `cpe/generate_layer` - Batch generate layer
- `cpe/request_gate_approval` - Human gate workflow

## Verification MCP

**Purpose**: Drift detection, formal verification

**Tools**:

- `cpe/verify_drift` - Compare spec vs impl
- `cpe/prove_security_policy` - SMT proofs for RBAC
- `cpe/run_fitness_functions` - ArchUnit-style checks
- `cpe/regenerate_artifacts` - Targeted regeneration

## Claude Worker

**Purpose**: Long-running code execution using Claude Agent SDK

The Claude Worker is a separate package (`@helix/claude-worker`) that handles code implementation tasks. It implements the "Anthropic Harness" pattern for surviving context exhaustion.

**Components**:

- **CodingLoopHarness** - Feature-by-feature execution with progress tracking
- **Initializer** - Environment setup and feature list generation
- **E2EVerification** - Browser automation testing
- **ClaudeExecutor** - Claude Agent SDK integration

**Integrations**:

- **shadcn/ui MCP** - UI component lookup to prevent hallucination
- **Puppeteer MCP** - Browser automation for E2E testing

See [Orchestration Guide](../guides/orchestration.md) for details.

## External MCP Servers

Third-party MCP servers for specialized tasks:

| Server | Purpose | Layer |
|--------|---------|-------|
| **shadcn MCP** | UI component lookup | imp (frontend), des |
| **Puppeteer MCP** | Browser automation | imp (frontend), tst |
| **Playwright MCP** | Cross-browser testing | tst |

**Tool Mapping**:

| External Server | Claude SDK Pattern |
|-----------------|-------------------|
| `shadcn-mcp` | `mcp__shadcn__*` |
| `puppeteer-mcp` | `mcp__puppeteer__*` |
| `playwright-mcp` | `mcp__playwright__*` |

See [External MCP Servers](../external-mcp-servers.md) for configuration.
