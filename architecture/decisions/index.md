# Architecture Decision Records

This directory contains Architecture Decision Records (ADRs) for the Helix project. ADRs document significant architectural decisions, their context, and consequences.

## ADR Format

Each ADR follows this structure:

- **Title**: Short noun phrase (e.g., "Neo4j for Knowledge Graph")
- **Status**: Proposed | Accepted | Deprecated | Superseded
- **Context**: What is the issue that we're seeing that is motivating this decision?
- **Decision**: What is the change that we're proposing/doing?
- **Consequences**: What becomes easier or more difficult?

## Index

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| [ADR-001](./001-neo4j-knowledge-graph.md) | Neo4j for Knowledge Graph | Accepted | 2024-12-01 |
| [ADR-002](./002-federated-mcp-servers.md) | Federated MCP Server Architecture | Accepted | 2024-12-01 |
| [ADR-003](./003-uid-taxonomy.md) | UID Taxonomy (RFC 8141) | Accepted | 2024-12-01 |
| [ADR-004](./004-12-layer-cascade.md) | 12-Layer Cascade Model | Accepted | 2024-12-01 |
| [ADR-005](./005-human-gates.md) | Human Gates for Oversight | Accepted | 2024-12-01 |
| [ADR-006](./006-redis-event-bus.md) | Redis for Event Bus | Accepted | 2024-12-01 |
| [ADR-007](./007-casbin-rbac.md) | Casbin for RBAC | Accepted | 2024-12-01 |
| [ADR-008](./008-multi-tenant-isolation.md) | Multi-Tenant Isolation Modes | Accepted | 2024-12-01 |
| [ADR-009](./009-z3-smt-verification.md) | Z3 SMT for Formal Verification | Accepted | 2024-12-01 |
| [ADR-010](./010-nextjs-dashboard.md) | Next.js for Dashboard | Accepted | 2024-12-14 |

## Creating New ADRs

To propose a new architectural decision:

1. Copy the template: `cp template.md NNN-short-title.md`
2. Fill in all sections
3. Submit as merge request
4. Update this index after acceptance

## Lifecycle

```
Proposed → Accepted → [Deprecated | Superseded]
              ↑
              └── May go back to Proposed if significant objections
```

Superseded ADRs should link to the new ADR that replaces them.
