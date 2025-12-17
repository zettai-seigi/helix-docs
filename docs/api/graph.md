# Graph Core API

The Graph Core MCP provides tools for querying and managing the Knowledge Graph.

## Tools

### query_graph

Execute Cypher queries against the Knowledge Graph.

```typescript
const result = await graph.query_graph({
  query: "MATCH (p:Persona) WHERE p.tenant_id = $tenant RETURN p",
  params: { tenant: "acme" },
  tenant_id: "acme"
});
```

### link_artifacts

Create trace relationships between artifacts.

```typescript
await graph.link_artifacts({
  source_uid: "cpe:app/imp/handler/USER/auth-handler",
  target_uid: "cpe:app/req/story/USER/login-story",
  relationship_type: "implements",
  tenant_id: "acme"
});
```

### trace_impact

Analyze the blast radius of changes to an artifact.

```typescript
const impact = await graph.trace_impact({
  artifact_uid: "cpe:app/req/story/USER/login-story",
  depth: 3,
  tenant_id: "acme"
});
// Returns all downstream artifacts affected
```

### get_lineage

Trace an artifact back to its Founding Intent.

```typescript
const lineage = await graph.get_lineage({
  artifact_uid: "cpe:app/imp/handler/USER/auth-handler",
  tenant_id: "acme"
});
// Returns: Implementation → Requirement → Persona → Founding Intent
```

## Resources

| URI | Description |
|-----|-------------|
| `cpe://graph/personas` | All personas |
| `cpe://graph/traceability/{uid}` | Artifact with edges |
| `cpe://artifacts/layer/{layer}` | Artifacts by layer |
| `cpe://audit/{tenant_id}` | Audit trail |
