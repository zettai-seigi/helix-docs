# Human Gates

Human Gates are mandatory approval points in the Helix workflow.

## The 5 Gates

| Gate | When | Purpose |
|------|------|---------|
| **Gate #1** | After Persona Discovery | Validate persona roster |
| **Gate #2** | After Cross-Persona Synthesis | Validate conflict resolutions |
| **Gate #3** | After Design | Approve UX/UI direction |
| **Gate #4** | After Architecture | Freeze before parallel branch |
| **Gate #5** | Pre-deployment | Final verification |

## Gate Workflow

```
Artifacts Generated
        ↓
  Gate Created
        ↓
  Notification Sent
        ↓
  Human Review
        ↓
   ┌────┴────┐
   ↓         ↓
Approved   Rejected
   ↓         ↓
Continue   Feedback
             ↓
          Rework
             ↓
         Re-submit
```

## Configuration

```yaml
gates:
  gate_1:
    enabled: true
    timeout_hours: 48
    approvers: ["product-owner"]
  gate_2:
    enabled: true
    timeout_hours: 48
  gate_3:
    enabled: true
    timeout_hours: 24
    approvers: ["ux-lead", "product-owner"]
  gate_4:
    enabled: true
    timeout_hours: 24
    approvers: ["tech-lead", "architect"]
  gate_5:
    enabled: true
    timeout_hours: 24
```

## Automated Cascade Progression

When using the `CascadeCoordinator`, gate approvals automatically trigger the next phase:

| Gate Approved | Automatic Action |
|---------------|------------------|
| Gate #1 | `derive_intents` for all personas → `detect_conflicts` |
| Gate #2 | `generate_layer` (design) |
| Gate #3 | `generate_layer` (architecture) |
| Gate #4 | `generate_layer` (api, dat, sec) in parallel |
| Gate #5 | Emit `deployment.ready` event |

Start the coordinator:

```bash
TENANT_ID=myproject pnpm --filter @helix/orchestrator run start:coordinator
```

## Using Gates

Request approval:

```typescript
await cascade.request_gate_approval({
  gate_number: 4,
  artifacts: ["cpe:app/arc/adr/SYSTEM/ADR-001"],
  summary: "Architecture freeze for v1.0",
  tenant_id: "acme"
});
```

Check status:

```typescript
const status = await cascade.check_gate_status({
  gate_number: 4,
  tenant_id: "acme"
});
```
