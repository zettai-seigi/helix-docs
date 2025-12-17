# ADR-008: Multi-Tenant Isolation Modes

**Status**: Accepted
**Date**: 2024-12-01
**Decision Makers**: Architecture Team

## Context

Helix is designed as a multi-tenant platform. Different customers have different isolation requirements based on:
- Regulatory compliance (HIPAA, GDPR)
- Data sensitivity
- Performance requirements
- Budget constraints

We needed to support varying levels of tenant isolation without requiring a complete redesign for each mode.

Options considered:
1. **Single Mode** - One isolation strategy for all
2. **Multiple Modes** - Pooled, Bridge, Siloed options
3. **Fully Custom** - Per-tenant configuration

## Decision

We implemented **three tenant isolation modes** that can be selected per tenant:

### Mode 1: Pooled (Default)

All tenants share infrastructure with Row-Level Security (RLS).

```yaml
tenant_modes:
  pooled:
    description: "Shared infrastructure with RLS"
    isolation: "row-level"
    schema_strategy: "shared"
```

**Implementation**:
```cypher
// All queries include tenant_id filter
MATCH (a:Artifact {tenantId: $tenantId})
RETURN a
```

**Pros**: Cost-effective, simple operations
**Cons**: Noisy neighbor risk, shared resources

### Mode 2: Bridge

Separate logical schemas per tenant, shared database.

```yaml
tenant_modes:
  bridge:
    description: "Separate schemas, shared database"
    isolation: "schema-level"
    schema_strategy: "per-tenant"
```

**Implementation**:
```cypher
// Use tenant-specific labels
MATCH (a:Artifact_tenant123)
RETURN a
```

**Pros**: Better isolation, schema flexibility
**Cons**: Complex migrations, label management

### Mode 3: Siloed

Dedicated database instances per tenant.

```yaml
tenant_modes:
  siloed:
    description: "Dedicated infrastructure"
    isolation: "database-level"
    schema_strategy: "dedicated"
```

**Implementation**:
```typescript
// Route to tenant-specific Neo4j
const client = getTenantGraphClient(tenantId);
// Connects to tenant123.neo4j.internal:7687
```

**Pros**: Maximum isolation, compliance-friendly
**Cons**: Higher cost, operational complexity

### Rationale

1. **Flexibility**
   - Match isolation to customer requirements
   - Upgrade path from pooled to siloed
   - Mix modes in same deployment

2. **Compliance**
   - Siloed mode for regulated industries
   - Audit-friendly separation
   - Data residency support

3. **Cost Optimization**
   - Pooled for small/dev tenants
   - Siloed for enterprise
   - Bridge as middle ground

## Consequences

### Positive
- Serves diverse customer needs
- Clear upgrade path
- Compliance flexibility
- Cost optimization possible

### Negative
- Increased complexity
- Different code paths per mode
- Testing burden (3 modes)
- Operations complexity

### Mitigations
- Abstract tenant context in `@helix/common`
- Comprehensive test suite per mode
- Clear documentation per mode
- Automated tenant provisioning

## Implementation

```typescript
// packages/common/src/tenant/context.ts
export interface TenantContext {
  tenantId: string;
  mode: 'pooled' | 'bridge' | 'siloed';
  namespace?: string;  // For bridge mode
  connectionConfig?: ConnectionConfig;  // For siloed mode
}

export function getTenantContext(request: Request): TenantContext {
  // Extract from subdomain, header, or JWT
  const tenantId = extractTenantId(request);
  const config = getTenantConfig(tenantId);

  return {
    tenantId,
    mode: config.mode,
    namespace: config.mode === 'bridge' ? `tenant_${tenantId}` : undefined,
    connectionConfig: config.mode === 'siloed' ? config.connection : undefined
  };
}

// Graph client adapts to mode
export function getGraphClient(context: TenantContext): GraphClient {
  switch (context.mode) {
    case 'pooled':
      return sharedClient.withTenantFilter(context.tenantId);
    case 'bridge':
      return sharedClient.withNamespace(context.namespace);
    case 'siloed':
      return createDedicatedClient(context.connectionConfig);
  }
}
```

## Tenant Provisioning

```typescript
await provisionTenant({
  tenantId: 'new-customer',
  mode: 'siloed',
  config: {
    neo4j: {
      uri: 'bolt://new-customer.neo4j.internal:7687',
      database: 'neo4j'
    },
    redis: {
      host: 'new-customer.redis.internal'
    }
  }
});
```

## Mode Selection Criteria

| Criteria | Pooled | Bridge | Siloed |
|----------|--------|--------|--------|
| Cost | $ | $$ | $$$ |
| Isolation | Low | Medium | High |
| Performance Predictability | Low | Medium | High |
| Compliance (HIPAA, etc.) | No | Maybe | Yes |
| Data Residency | Shared | Shared | Dedicated |
| Customization | Low | Medium | High |

## Related Decisions

- [ADR-007](./007-casbin-rbac.md): RBAC with tenant context
- [ADR-001](./001-neo4j-knowledge-graph.md): Graph queries per mode
