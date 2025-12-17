# ADR-002: Federated MCP Server Architecture

**Status**: Accepted
**Date**: 2024-12-01
**Decision Makers**: Architecture Team

## Context

Helix implements the Cascading Persona Ecosystem, which requires:
- Persona discovery from founding intents
- Requirements derivation and conflict detection
- 12-layer artifact generation
- Formal verification and drift detection
- Graph storage and traceability

Options considered:
1. **Monolithic Server** - Single MCP server with all functionality
2. **Federated Servers** - Multiple specialized MCP servers
3. **Microservices** - Independent services with REST/gRPC APIs
4. **Plugin Architecture** - Single server with pluggable modules

## Decision

We chose a **federated architecture** with 5 specialized MCP servers:

1. **Graph Core** (`@helix/mcp-graph`) - Source of truth, traceability
2. **Discovery** (`@helix/mcp-discovery`) - Persona ecosystem discovery
3. **Derivation** (`@helix/mcp-derivation`) - Requirements engineering
4. **Cascade** (`@helix/mcp-cascade`) - Artifact generation
5. **Verification** (`@helix/mcp-verification`) - Drift detection, proofs

### Rationale

1. **Separation of Concerns**
   - Each server has a clear, bounded responsibility
   - Easier to understand, test, and maintain
   - Teams can work independently on different servers

2. **MCP Protocol Benefits**
   - Standard protocol for AI integration
   - Tools, resources, and prompts are first-class
   - Works with Claude, other LLM clients

3. **Scalability**
   - Servers can be scaled independently
   - Heavy operations (discovery, cascade) don't block reads
   - Can run multiple instances of busy servers

4. **Fault Isolation**
   - Failure in one server doesn't cascade to others
   - Can restart/upgrade individual servers
   - Graceful degradation possible

5. **Shared State via Neo4j**
   - Single source of truth in graph database
   - No distributed consensus needed
   - Graph MCP controls all writes

## Consequences

### Positive
- Clear separation of responsibilities
- Independent deployment and scaling
- Easier to test individual servers
- Natural fit for AI tool discovery

### Negative
- More complex deployment (5 servers vs 1)
- Network overhead between servers
- Need to manage inter-server communication
- Configuration must be synchronized

### Mitigations
- Docker Compose for local development
- Kubernetes for production orchestration
- Shared config via `helix.config.yaml`
- Event bus for async communication

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     AI Client (Claude)                       │
└─────┬──────────┬──────────┬──────────┬──────────┬──────────┘
      │          │          │          │          │
      ▼          ▼          ▼          ▼          ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌───────────┐
│  Graph  │ │Discovery│ │Derivation│ │ Cascade │ │Verification│
│   MCP   │ │   MCP   │ │   MCP   │ │   MCP   │ │    MCP    │
└────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └─────┬─────┘
     │           │           │           │            │
     └───────────┴───────────┼───────────┴────────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
         ┌────────┐    ┌─────────┐    ┌────────┐
         │ Neo4j  │    │  Redis  │    │ Config │
         │ Graph  │    │ Events  │    │Service │
         └────────┘    └─────────┘    └────────┘
```

## Tool Distribution

| Server | Tool Count | Examples |
|--------|------------|----------|
| Graph | 4 | query_graph, link_artifacts, trace_impact |
| Discovery | 4 | bootstrap_ecosystem, discover_personas, mad_debate |
| Derivation | 5 | derive_intents, detect_conflicts, synthesize |
| Cascade | 7 | generate_artifact, inject_tenant_policy, gates |
| Verification | 8 | verify_drift, prove_security, fitness_functions |

## Alternatives Rejected

### Monolithic Server
- Would become too large and complex
- Single failure point
- Harder to scale specific operations
- Mixing concerns reduces maintainability

### Microservices with REST
- Would require custom integration layer
- No standard tool discovery mechanism
- More boilerplate for each service
- Loses MCP ecosystem benefits

### Plugin Architecture
- Plugins would still run in same process
- No fault isolation
- Complex plugin lifecycle management
- Testing plugins is harder

## Related Decisions

- [ADR-001](./001-neo4j-knowledge-graph.md): Shared Neo4j database
- [ADR-006](./006-redis-event-bus.md): Inter-server communication
