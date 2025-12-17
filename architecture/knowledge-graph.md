# Knowledge Graph

The Knowledge Graph is the central source of truth for all Helix artifacts.

## Graph Database

Helix uses **Neo4j** as its graph database, storing:

- Personas and their relationships
- Artifacts across all 12 layers
- Traceability links
- Audit logs

## Node Types

### Persona
```cypher
(:Persona {
  uid: "cpe:psychotest/persona/HIRING-MANAGER",
  name: "Hiring Manager",
  description: "...",
  goals: ["..."],
  pain_points: ["..."],
  tenant_id: "acme"
})
```

### Artifact
```cypher
(:Artifact {
  uid: "cpe:psychotest/req/story/HIRING-MANAGER/HM-REQ-001",
  layer: "req",
  type: "story",
  content: "...",
  status: "active",
  tenant_id: "acme"
})
```

## Relationship Types

| Relationship | Description |
|--------------|-------------|
| `DERIVES_FROM` | Requirement → Persona |
| `IMPLEMENTS` | Code → Requirement |
| `TESTS` | Test → Code |
| `VERIFIES` | Verification → Requirement |
| `CONFLICTS_WITH` | Requirement ↔ Requirement |
| `SERVES` | Artifact → Persona |
| `BELONGS_TO` | Artifact → BoundedContext |
| `DEPRECATES` | NewArtifact → OldArtifact |

## Querying

Use the Graph Core MCP to query:

```typescript
const result = await graph.query_graph({
  query: `
    MATCH (p:Persona)-[:DERIVES_FROM]-(r:Artifact)
    WHERE p.tenant_id = $tenant_id
    RETURN p, r
  `,
  params: { tenant_id: "acme" }
});
```
