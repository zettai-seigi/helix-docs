# Verification API

The Verification MCP (`@helix/mcp-verification`) provides tools for drift detection, formal verification, traceability enforcement, and compliance evidence generation.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     VERIFICATION MCP                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                   Verification Engines                      │ │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │ │
│  │  │ Traceability │ │   Orphan     │ │    RBAC      │        │ │
│  │  │    Rules     │ │   Verifier   │ │   Verifier   │        │ │
│  │  └──────────────┘ └──────────────┘ └──────────────┘        │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    Compliance Engines                       │ │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │ │
│  │  │    GDPR      │ │    SOC2      │ │    Audit     │        │ │
│  │  │  Article 30  │ │   Controls   │ │   Evidence   │        │ │
│  │  └──────────────┘ └──────────────┘ └──────────────┘        │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Tools

### verify_traceability

Comprehensive traceability verification implementing the **"No Orphans"** rule.

```typescript
const result = await verification.verify_traceability({
  namespace: "psychotest",
  checks: ["orphans", "gold_plating", "coverage_gaps", "layer_violations"],
  fail_on_critical: true
});
```

**Verification Checks:**

| Check | Description | Severity |
|-------|-------------|----------|
| `orphans` | Artifacts without parent relationships | Error |
| `gold_plating` | Implementation code without requirement linkage | Critical |
| `coverage_gaps` | Requirements without test coverage | Warning |
| `broken_references` | Cross-references to non-existent artifacts | Error |
| `layer_violations` | Dependencies in wrong direction | Critical |
| `trace_comments` | Code missing `//@trace` comments | Warning |
| `lineage` | Cannot trace back to Persona/Founding Intent | Error |
| `cycles` | Circular dependencies in the graph | Critical |

**Check Lineage for Specific Artifact:**

```typescript
const lineage = await verification.verify_traceability({
  namespace: "psychotest",
  artifact_uid: "cpe:psychotest/imp/handler/HM/results-handler",
  checks: ["lineage"]
});

// Returns lineage chain:
// imp/handler → req/story → persona/HIRING-MANAGER → Founding Intent
```

### verify_drift

Compare specification state vs implementation state.

```typescript
const drift = await verification.verify_drift({
  namespace: "psychotest",
  spec_uid: "cpe:psychotest/req/story/HM/view-results",
  impl_uid: "cpe:psychotest/imp/handler/HM/results-handler"
});

// Returns:
// {
//   has_drift: true,
//   drift_type: "spec_ahead" | "impl_ahead" | "diverged",
//   spec_hash: "abc123",
//   impl_hash: "def456",
//   differences: [...]
// }
```

### prove_security_policy

Generate SMT proofs for RBAC policies using Z3.

```typescript
const proof = await verification.prove_security_policy({
  namespace: "psychotest",
  policy_uid: "cpe:psychotest/sec/policy/SYSTEM/results-access",
  properties: [
    "no_unauthorized_access",
    "separation_of_duties",
    "least_privilege"
  ]
});

// Returns:
// {
//   valid: true,
//   proofs: [
//     { property: "no_unauthorized_access", status: "proven", model: null },
//     { property: "separation_of_duties", status: "proven", model: null }
//   ],
//   smt_time_ms: 142
// }
```

**RBAC Properties:**

| Property | Description |
|----------|-------------|
| `no_unauthorized_access` | No path exists for unauthorized access |
| `separation_of_duties` | Conflicting roles cannot be combined |
| `least_privilege` | No excessive permissions granted |
| `tenant_isolation` | Cross-tenant access prevented |

### run_fitness_functions

Run ArchUnit-style fitness functions for architecture compliance.

```typescript
const results = await verification.run_fitness_functions({
  namespace: "psychotest",
  functions: [
    "no_orphan_artifacts",
    "layer_dependency_respected",
    "all_artifacts_have_trace",
    "no_circular_dependencies",
    "tenant_isolation_enforced"
  ]
});

// Returns:
// {
//   passed: ["no_orphan_artifacts", "layer_dependency_respected"],
//   failed: ["all_artifacts_have_trace"],
//   details: {
//     "all_artifacts_have_trace": {
//       violations: ["cpe:ns/imp/handler/USER/legacy-handler"]
//     }
//   }
// }
```

### verify_coverage

Find orphans and coverage gaps across layers.

```typescript
const coverage = await verification.verify_coverage({
  namespace: "psychotest",
  layer: "imp"
});

// Returns:
// {
//   total_artifacts: 42,
//   covered: 38,
//   orphans: ["cpe:ns/imp/module/USER/unused-util"],
//   gaps: [
//     { requirement: "cpe:ns/req/story/HM/export-results", missing: ["imp", "tst"] }
//   ],
//   coverage_percent: 90.5
// }
```

### analyze_impact

Blast radius analysis before making changes.

```typescript
const impact = await verification.analyze_impact({
  namespace: "psychotest",
  artifact_uid: "cpe:psychotest/req/story/HM/view-results",
  change_type: "modify"
});

// Returns:
// {
//   direct_dependents: 3,
//   transitive_dependents: 12,
//   affected_layers: ["des", "arc", "api", "imp", "tst"],
//   affected_personas: ["HIRING-MANAGER"],
//   risk_level: "medium",
//   affected_artifacts: [...]
// }
```

### regenerate_artifacts

Targeted regeneration of drifted artifacts.

```typescript
await verification.regenerate_artifacts({
  namespace: "psychotest",
  artifact_uids: ["cpe:psychotest/imp/handler/HM/results-handler"],
  reason: "Spec updated - requirement refined",
  preserve_customizations: true
});
```

### generate_gdpr_article_30

Generate GDPR Article 30 Records of Processing Activities.

```typescript
const records = await verification.generate_gdpr_article_30({
  namespace: "psychotest",
  controller_name: "Acme Corp",
  dpo_contact: "dpo@acme.com",
  output_format: "json"
});

// Generates comprehensive Article 30 records including:
// - Processing activities per persona
// - Data categories and legal basis
// - Retention periods
// - Data flows and transfers
// - Security measures
```

### generate_audit_evidence

Generate compliance evidence packages.

```typescript
const evidence = await verification.generate_audit_evidence({
  namespace: "psychotest",
  framework: "soc2",
  controls: ["CC6.1", "CC6.2", "CC6.3"],
  output_format: "pdf"
});

// Generates:
// - Control mapping documentation
// - Traceability evidence
// - Test coverage reports
// - Change audit trails
```

## Core Components

### TraceabilityRules

Engine for running traceability checks.

```typescript
import { runTraceabilityChecks, getArtifactLineage } from "@helix/mcp-verification";

// Run all checks
const violations = await runTraceabilityChecks(graphClient, "psychotest");

// Get lineage for specific artifact
const lineage = await getArtifactLineage(
  graphClient,
  "cpe:psychotest/imp/handler/HM/results-handler"
);
// Returns: [imp/handler, req/story, persona/HM, Founding Intent]
```

**Violation Types:**

```typescript
type ViolationType =
  | "orphan"           // No parent relationship
  | "gold_plating"     // Unauthorized implementation
  | "coverage_gap"     // Missing test coverage
  | "broken_reference" // Invalid cross-reference
  | "layer_violation"  // Wrong dependency direction
  | "missing_trace"    // No //@trace comment
  | "incomplete_lineage" // Cannot reach Founding Intent
  | "cycle";           // Circular dependency
```

### OrphanVerifier

Specialized verifier for orphan detection.

```typescript
import { OrphanVerifier } from "@helix/mcp-verification";

const verifier = new OrphanVerifier(graphClient);
const orphans = await verifier.findOrphans("psychotest", {
  layers: ["imp", "tst"],
  includePartialOrphans: true
});
```

### RBACVerifier

SMT-based RBAC verification using Z3.

```typescript
import { RBACVerifier } from "@helix/mcp-verification";

const verifier = new RBACVerifier(graphClient, {
  z3Path: "/usr/local/bin/z3",
  timeoutMs: 30000
});

const result = await verifier.provePolicy(
  "cpe:psychotest/sec/policy/SYSTEM/results-access",
  ["no_unauthorized_access", "tenant_isolation"]
);
```

## Fitness Functions

Built-in fitness functions for continuous compliance:

| Function | Description |
|----------|-------------|
| `no_orphan_artifacts` | All artifacts have parent links |
| `layer_dependency_respected` | No upstream dependencies from downstream |
| `all_artifacts_have_trace` | All code has `//@trace` comments |
| `no_circular_dependencies` | No cycles in the graph |
| `tenant_isolation_enforced` | All queries scoped by tenant_id |
| `persona_scope_valid` | All artifacts have valid persona scope |
| `version_immutability` | Versioned artifacts are immutable |
| `gate_compliance` | All required gates passed |

**Custom Fitness Functions:**

```typescript
import { registerFitnessFunction } from "@helix/mcp-verification";

registerFitnessFunction({
  name: "custom_naming_convention",
  description: "All artifact IDs follow naming convention",
  check: async (graphClient, namespace) => {
    const artifacts = await graphClient.readQuery(
      `MATCH (a:Artifact {namespace: $namespace}) RETURN a.uid as uid`,
      { namespace }
    );

    const violations = artifacts.records.filter(r => {
      const uid = r.get("uid");
      return !uid.match(/^cpe:[a-z]+\/[a-z]+\/[a-z-]+\/[A-Z-]+\/[A-Z0-9-]+$/);
    });

    return {
      passed: violations.length === 0,
      violations: violations.map(v => v.get("uid"))
    };
  }
});
```

## Error Handling

```typescript
import { HelixError, ErrorCode } from "@helix/common";

try {
  await verification.verify_traceability({ ... });
} catch (error) {
  if (error instanceof HelixError) {
    switch (error.code) {
      case ErrorCode.DRIFT_DETECTED:
        // Specification and implementation have diverged
        break;
      case ErrorCode.SMT_PROOF_FAILED:
        // Z3 could not prove the property
        break;
      case ErrorCode.FITNESS_FAILED:
        // Fitness function check failed
        break;
      case ErrorCode.CYCLE_DETECTED:
        // Circular dependency found
        break;
    }
  }
}
```

## Integration with Gates

Verification is automatically triggered at gate checkpoints:

```typescript
// Gate #5 (Pre-Deployment) automatically runs:
// - verify_traceability (all checks)
// - run_fitness_functions (all functions)
// - prove_security_policy (tenant_isolation)

// If any critical violations, gate is blocked
```
