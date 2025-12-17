# ADR-007: Casbin for RBAC

**Status**: Accepted
**Date**: 2024-12-01
**Decision Makers**: Architecture Team

## Context

Helix requires fine-grained access control for:
- Multi-tenant data isolation
- Persona-based permissions (Candidate vs Hiring Manager)
- Platform vs tenant-scoped operations
- API route protection

Options considered:
1. **Casbin** - Policy-based access control library
2. **CASL** - Isomorphic JavaScript authorization
3. **Custom Implementation** - Roll our own RBAC
4. **OPA (Open Policy Agent)** - Policy engine with Rego

## Decision

We chose **Casbin** as the RBAC engine with a custom model supporting multi-tenancy.

### Rationale

1. **Flexible Policy Model**
   - Supports RBAC, ABAC, and custom models
   - Model defined declaratively
   - Policies stored separately from code

2. **Multi-Tenant Support**
   - Tenant ID as fourth element in request
   - Wildcard matching for platform admins
   - Per-tenant policy customization

3. **Node.js Native**
   - TypeScript support
   - Active maintenance
   - Low overhead

4. **Adapter Ecosystem**
   - File, database, Redis adapters
   - Can store policies in Neo4j
   - Easy policy management

5. **Declarative Policies**
   - Policies in CSV format
   - Easy to audit and review
   - Non-developers can understand

### RBAC Model

```ini
# policies/rbac_model.conf
[request_definition]
r = sub, obj, act, tenant

[policy_definition]
p = sub, obj, act, tenant

[role_definition]
g = _, _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub, r.tenant) && \
    keyMatch2(r.obj, p.obj) && \
    r.act == p.act && \
    (r.tenant == p.tenant || p.tenant == "*")
```

### Policy Definitions

```csv
# Platform admin can do anything
p, platform_admin, *, *, *

# Tenant admin can manage their tenant
p, tenant_admin, /tenant/:tenant_id/*, *, :tenant_id

# Hiring manager reads candidates/assessments
p, hiring_manager, /tenant/:tenant_id/candidates/*, read, :tenant_id
p, hiring_manager, /tenant/:tenant_id/assessments/*, read, :tenant_id

# Candidate accesses own data only
p, candidate, /tenant/:tenant_id/assessments/:user_id/*, *, :tenant_id

# Role hierarchy
g, tenant_admin, hiring_manager, :tenant_id
g, platform_admin, tenant_admin, *
```

## Consequences

### Positive
- Declarative, auditable policies
- Tenant isolation built-in
- Role hierarchy support
- Efficient policy evaluation

### Negative
- Learning curve for Casbin model language
- Another dependency to maintain
- Policy synchronization across servers
- Debugging complex policies can be tricky

### Mitigations
- Comprehensive policy documentation
- Unit tests for policy decisions
- Policy visualization in dashboard
- Centralized policy storage

## Implementation

```typescript
// packages/common/src/policy/enforcer.ts
import { newEnforcer, Enforcer } from 'casbin';

let enforcer: Enforcer;

export async function initEnforcer() {
  enforcer = await newEnforcer(
    './policies/rbac_model.conf',
    './policies/default_policies.csv'
  );
}

export async function enforce(
  subject: string,
  object: string,
  action: string,
  tenant: string
): Promise<boolean> {
  return enforcer.enforce(subject, object, action, tenant);
}

// Usage in API route
export async function GET(request: Request) {
  const session = await getSession();
  const allowed = await enforce(
    session.user.role,
    `/tenant/${tenantId}/candidates`,
    'read',
    tenantId
  );

  if (!allowed) {
    return new Response('Forbidden', { status: 403 });
  }
  // ...
}
```

## Access Levels

| Level | Description | Examples |
|-------|-------------|----------|
| `platform` | All tenants | Platform Admin |
| `tenant-scoped` | Single tenant | Tenant Admin, Hiring Manager |
| `user-scoped` | Own data only | Candidate |

## Z3 Integration

Casbin policies can be verified with Z3:

```typescript
// Prove no unauthorized cross-tenant access
await proveSecurityPolicy({
  policy_type: 'tenant_isolation',
  assertions: [
    'tenant_admin of tenant A cannot access tenant B data',
    'candidate can only access their own assessments'
  ]
});
```

## Related Decisions

- [ADR-008](./008-multi-tenant-isolation.md): Tenant isolation modes
- [ADR-009](./009-z3-smt-verification.md): Policy verification with Z3
