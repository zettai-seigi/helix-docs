# Verification & Drift Guide

How to verify artifacts and detect drift.

## Drift Detection

Compare specification vs implementation:

```typescript
const drift = await verification.verify_drift({
  spec_uid: "cpe:psychotest/req/story/HM/view-results",
  impl_uid: "cpe:psychotest/imp/handler/HM/results-handler",
  tenant_id: "acme"
});

// Output:
// {
//   has_drift: true,
//   drift_type: "missing_feature",
//   details: "Spec requires 'percentile_ranking', impl missing"
// }
```

## Fitness Functions

Run architectural fitness functions:

```typescript
const results = await verification.run_fitness_functions({
  functions: [
    "no_orphan_artifacts",
    "layer_dependency_respected",
    "all_artifacts_have_trace",
    "no_cycles_in_graph",
    "tenant_isolation_enforced"
  ],
  tenant_id: "acme"
});

// Output:
// {
//   passed: ["no_orphan_artifacts", "layer_dependency_respected"],
//   failed: [{
//     function: "all_artifacts_have_trace",
//     violations: ["cpe:psychotest/imp/util/helper"]
//   }]
// }
```

## Coverage Analysis

Find gaps in implementation:

```typescript
const coverage = await verification.analyze_coverage({
  from_layer: "req",
  to_layer: "imp",
  tenant_id: "acme"
});

// Output:
// {
//   total_requirements: 45,
//   implemented: 42,
//   coverage_percent: 93.3,
//   gaps: [
//     "cpe:psychotest/req/story/HM/export-results",
//     "cpe:psychotest/req/story/ADMIN/bulk-import"
//   ]
// }
```

## Security Policy Proofs

Generate SMT proofs for RBAC:

```typescript
const proof = await verification.prove_security_policy({
  policy_uid: "cpe:psychotest/sec/rbac/SYSTEM/results-access",
  properties: [
    "no_unauthorized_access",
    "tenant_isolation",
    "least_privilege"
  ],
  tenant_id: "acme"
});

// Output:
// {
//   valid: true,
//   proofs: {
//     "no_unauthorized_access": "∀u,r: access(u,r) → authorized(u,r)",
//     "tenant_isolation": "∀u,r: access(u,r) → tenant(u) = tenant(r)"
//   }
// }
```

## Regeneration

Fix drifted artifacts:

```typescript
await verification.regenerate_artifacts({
  artifact_uids: ["cpe:psychotest/imp/handler/HM/results-handler"],
  reason: "Drift detected - missing percentile_ranking",
  preserve_customizations: true,
  tenant_id: "acme"
});
```

## Continuous Verification

Set up automated verification:

```yaml
# In CI/CD pipeline
verification:
  on_commit:
    - no_orphan_artifacts
    - layer_dependency_respected
  nightly:
    - full_drift_check
    - coverage_analysis
  weekly:
    - security_policy_proofs
```
