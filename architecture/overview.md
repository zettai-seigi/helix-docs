# Architecture Overview

Helix implements the **Cascading Persona Ecosystem (CPE)** architecture - a federated system of MCP servers that transform a single "Founding Intent" into a complete, traceable, multi-tenant software system.

## System Architecture

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
                    ┌────────────────────┼────────────────────┐
                    │                    │                    │
              ┌─────▼─────┐       ┌──────▼──────┐      ┌─────▼─────┐
              │  Neo4j    │       │    Redis    │      │  Config   │
              │  Graph    │       │   Events    │      │  Service  │
              └───────────┘       └─────────────┘      └───────────┘
```

## Core Principles

1. **Single Source of Truth**: All artifacts live in the Knowledge Graph
2. **Full Traceability**: Every artifact traces back to the Founding Intent
3. **No Orphans**: Every artifact must have a parent in the upstream layer
4. **Human Gates**: Mandatory approval points for critical decisions
5. **Multi-Tenant**: Complete tenant isolation at every layer

## The 5 MCP Servers

| Server | Purpose |
|--------|---------|
| **Graph Core** | Source of truth, traceability queries |
| **Discovery** | Persona ecosystem discovery |
| **Derivation** | Requirements engineering, conflict detection |
| **Cascade** | 12-layer artifact generation |
| **Verification** | Drift detection, formal verification |

See [Federated MCP Servers](mcp-servers.md) for details.
