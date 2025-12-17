# ADR-009: Z3 SMT for Formal Verification

**Status**: Accepted
**Date**: 2024-12-01
**Decision Makers**: Architecture Team

## Context

AI-generated artifacts (RBAC policies, API contracts, schemas) need verification beyond traditional testing. We needed to:
- Prove security policies have no loopholes
- Verify architectural constraints mathematically
- Detect subtle conflicts in requirements
- Provide formal guarantees for compliance

Options considered:
1. **Z3 SMT Solver** - Microsoft's theorem prover
2. **Coq** - Interactive theorem prover
3. **TLA+** - Specification language
4. **Property-Based Testing** - QuickCheck-style testing
5. **No Formal Verification** - Rely on testing alone

## Decision

We integrated **Z3 SMT Solver** for formal verification of security policies and architectural constraints.

### Rationale

1. **Automatic Proofs**
   - Z3 finds proofs automatically (no manual proof writing)
   - Produces counterexamples when properties don't hold
   - Fast for typical policy sizes

2. **Well-Suited Domain**
   - RBAC policies map naturally to SMT formulas
   - Constraint satisfaction is Z3's strength
   - Can model access control as logical predicates

3. **Industry Adoption**
   - Used by AWS, Microsoft, others for security
   - Active development and support
   - Good documentation and bindings

4. **Counterexample Generation**
   - When a policy has a flaw, Z3 shows the attack
   - Concrete examples aid debugging
   - More actionable than "test failed"

### What We Verify

| Property | Description | Example |
|----------|-------------|---------|
| No Unauthorized Access | Role can't access protected resources | Candidate can't see other candidates |
| Tenant Isolation | Cross-tenant access impossible | Tenant A can't see Tenant B data |
| Role Hierarchy | Permissions flow correctly | Admin inherits Manager permissions |
| No Conflicts | Policies don't contradict | No explicit allow AND deny on same resource |

### Implementation

```typescript
// packages/mcp-verification/src/smt/policy-verifier.ts
import { Context, Solver } from 'z3-solver';

export async function verifyPolicy(assertions: string[]): Promise<VerificationResult> {
  const { Context } = await init();
  const ctx = new Context('main');
  const solver = new ctx.Solver();

  // Define sorts
  const Persona = ctx.DeclareSort('Persona');
  const Resource = ctx.DeclareSort('Resource');
  const Action = ctx.DeclareSort('Action');

  // Define predicates
  const hasRole = ctx.Function.declare('hasRole', Persona, ctx.String.sort(), ctx.Bool.sort());
  const canAccess = ctx.Function.declare('canAccess', Persona, Resource, Action, ctx.Bool.sort());
  const owns = ctx.Function.declare('owns', Persona, Resource, ctx.Bool.sort());

  // Encode RBAC rules from Casbin
  // ... (rule encoding)

  // Try to find counterexample to assertion
  const negatedAssertion = ctx.Not(encodeAssertion(assertions[0]));
  solver.add(negatedAssertion);

  const result = await solver.check();

  if (result === 'unsat') {
    return { proven: true, explanation: 'No counterexample found' };
  } else {
    const model = solver.model();
    return {
      proven: false,
      counterexample: extractCounterexample(model)
    };
  }
}
```

### Tool Integration

```typescript
// Using cpe/prove_security_policy tool
{
  tool: 'cpe/prove_security_policy',
  input: {
    policy_type: 'data_access',
    tenant_id: 'psychotest',
    assertions: [
      'Candidate cannot access other candidates data',
      'Hiring Manager can only see aggregated scores'
    ]
  }
}

// Response
{
  proven: true,
  proofs: [
    {
      assertion: 'Candidate cannot access other candidates data',
      result: 'PROVEN',
      z3_output: 'unsat',
      explanation: 'User-scoped access restricts to own data'
    }
  ]
}
```

## Consequences

### Positive
- Mathematical guarantees on security properties
- Catches subtle policy bugs testing might miss
- Counterexamples help debugging
- Supports compliance requirements

### Negative
- Z3 has a learning curve
- Encoding complex domains is non-trivial
- Can be slow for very large policies
- Native binary dependency

### Mitigations
- Abstract Z3 behind simple API
- Pre-built encodings for common patterns
- Cache verification results
- Run verification async/in background

## Configuration

```yaml
# helix.config.yaml
verification:
  smt_solver: "z3"
  z3_path: "/usr/local/bin/z3"
  timeout_seconds: 30
  max_proof_depth: 10
  cache_proofs: true
```

## Installation

```bash
# macOS
brew install z3

# Ubuntu
apt-get install z3

# Verify
z3 --version
```

## Alternatives Rejected

### Coq
- Requires manual proof writing
- Very steep learning curve
- Overkill for policy verification

### TLA+
- Better for distributed systems
- Less suited for access control
- Model checking vs. theorem proving

### Property-Based Testing
- Only probabilistic coverage
- No guarantees, just high confidence
- Can't prove absence of bugs

## Related Decisions

- [ADR-007](./007-casbin-rbac.md): Casbin policies verified with Z3
- [ADR-002](./002-federated-mcp-servers.md): Verification MCP hosts Z3
