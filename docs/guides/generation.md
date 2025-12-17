# Artifact Generation Guide

How to generate artifacts through the 12-layer cascade.

## Generation Flow

```
Requirements (Layer 2)
        ↓
    Design (3)
        ↓
  Architecture (4) ← Gate #4
        ↓
  ┌────┴────┬────┴────┐
  ↓         ↓         ↓
 API      Data    Security
 (5)      (6)       (7)
        ↓
  Implementation (8)
        ↓
    Testing (9)
```

## Single Artifact Generation

```typescript
await cascade.generate_artifact({
  uid: "cpe:psychotest/api/endpoint/HM/get-results",
  layer: "api",
  type: "endpoint",
  parent_uid: "cpe:psychotest/req/story/HM/view-results",
  content: {
    path: "/api/v1/assessments/{id}/results",
    method: "GET",
    responses: { "200": { schema: "ResultDTO" } }
  },
  tenant_id: "acme"
});
```

## Batch Layer Generation

Generate an entire layer:

```typescript
await cascade.generate_layer({
  layer: "api",
  source_layer: "req",
  options: {
    style: "rest",
    version: "v1"
  },
  tenant_id: "acme"
});
```

## Orphan Prevention

Helix prevents orphan artifacts:

```typescript
// This will FAIL - no parent requirement
await cascade.generate_artifact({
  uid: "cpe:psychotest/imp/handler/ORPHAN/handler",
  layer: "imp",
  type: "handler",
  // Missing parent_uid!
  tenant_id: "acme"
});

// Error: ORPHAN_ARTIFACT - Missing parent requirement
```

## UID Injection

Generated code includes trace comments:

```typescript
// @trace cpe:psychotest/imp/handler/HM/results-handler
// @parent cpe:psychotest/req/story/HM/view-results
export class ResultsHandler {
  async getResults(assessmentId: string) {
    // Implementation...
  }
}
```

## Tenant Policy Injection

Auto-inject tenant isolation:

```typescript
await cascade.inject_tenant_policy({
  artifact_uid: "cpe:psychotest/dat/schema/SYSTEM/assessment",
  policy_type: "rls",
  tenant_id: "acme"
});

// Generates:
// CREATE POLICY tenant_isolation ON assessments
// USING (tenant_id = current_setting('app.tenant_id'))
```

## Human Gate #4

Before parallel generation, freeze architecture:

```typescript
await cascade.request_gate_approval({
  gate_number: 4,
  artifacts: architecture_artifacts,
  summary: "Architecture freeze for v1.0",
  tenant_id: "acme"
});
```
