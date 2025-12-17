# ADR-003: UID Taxonomy (RFC 8141)

**Status**: Accepted
**Date**: 2024-12-01
**Decision Makers**: Architecture Team

## Context

Helix requires unique, persistent identifiers for:
- Personas across ecosystems
- Artifacts across all 12 layers
- Relationships and audit entries
- Cross-system traceability

Requirements:
- Globally unique across tenants and namespaces
- Human-readable and debuggable
- Encode meaningful metadata (layer, type, scope)
- Stable over time (no random UUIDs)

Options considered:
1. **UUIDs (v4)** - Random 128-bit identifiers
2. **URNs (RFC 8141)** - Structured namespaced identifiers
3. **URLs** - Web-addressable identifiers
4. **Custom Format** - Domain-specific scheme

## Decision

We chose **URN-style identifiers** conforming to RFC 8141 with a custom `cpe` (Cascading Persona Ecosystem) namespace:

```
cpe:{namespace}/{layer}/{artifact_type}/{persona_scope}/{artifact_id}[@version]
```

### Components

| Component | Description | Example |
|-----------|-------------|---------|
| `cpe` | Namespace identifier (fixed) | `cpe` |
| `namespace` | Tenant/ecosystem identifier | `psychotest` |
| `layer` | 12-layer code | `req`, `imp`, `tst` |
| `artifact_type` | Type within layer | `story`, `api`, `unit-test` |
| `persona_scope` | Related persona | `HIRING-MANAGER` |
| `artifact_id` | Unique within scope | `HM-REQ-001` |
| `@version` | Optional version | `@1.0.0` |

### Examples

```
cpe:psychotest/persona/TENANT-ADMIN
cpe:psychotest/req/story/HIRING-MANAGER/HM-REQ-001
cpe:psychotest/imp/api/results-endpoint@1.0.0
cpe:psychotest/tst/e2e/CANDIDATE/assessment-flow
```

### Rationale

1. **Self-Documenting**
   - UID encodes layer, type, and scope
   - Easy to understand at a glance
   - Logs and traces are human-readable

2. **Hierarchical Structure**
   - Natural grouping by namespace, layer, persona
   - Efficient glob-style queries
   - Clear ownership boundaries

3. **RFC Compliance**
   - Based on established standard
   - Parseable with standard libraries
   - No custom encoding required

4. **Traceability**
   - UIDs appear in generated code as comments
   - Easy to trace artifact back to requirement
   - Grep-able across codebase

## Layer Codes

| Code | Layer | Number |
|------|-------|--------|
| `persona` | Persona | 0 |
| `biz` | Business | 1 |
| `req` | Requirements | 2 |
| `des` | Design | 3 |
| `arc` | Architecture | 4 |
| `api` | API | 5 |
| `dat` | Data | 6 |
| `sec` | Security | 7 |
| `imp` | Implementation | 8 |
| `tst` | Testing | 9 |
| `cmp` | Compliance | 10 |
| `inf` | Infrastructure | 11 |
| `doc` | Documentation | 12 |

## Consequences

### Positive
- Meaningful, readable identifiers
- Layer and scope immediately visible
- Efficient filtering and grouping
- Works as both ID and documentation

### Negative
- Longer than UUIDs
- Requires parsing for components
- Namespace collisions possible (mitigated by tenant isolation)
- Refactoring persona names requires UID updates

### Mitigations
- Provide UID parser in `@helix/common`
- Validate UIDs at creation time
- Index on full UID for fast lookups
- Support UID aliasing for renames

## Validation

```typescript
// packages/common/src/uid/validator.ts
const UID_PATTERN = /^cpe:([a-z0-9-]+)\/([a-z]+)\/([a-z-]+)(?:\/([A-Z0-9-]+))?(?:\/([a-zA-Z0-9-]+))?(?:@(\d+\.\d+\.\d+))?$/;

export function validateUID(uid: string): ValidationResult {
  const match = uid.match(UID_PATTERN);
  if (!match) {
    return { valid: false, error: 'Invalid UID format' };
  }

  const [_, namespace, layer, type, scope, id, version] = match;

  if (!LAYER_CODES.includes(layer)) {
    return { valid: false, error: `Invalid layer code: ${layer}` };
  }

  return { valid: true, components: { namespace, layer, type, scope, id, version } };
}
```

## Related Decisions

- [ADR-004](./004-12-layer-cascade.md): Layer codes in UID
- [ADR-001](./001-neo4j-knowledge-graph.md): UID as primary key in Neo4j
