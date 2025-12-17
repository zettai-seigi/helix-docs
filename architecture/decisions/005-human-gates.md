# ADR-005: Human Gates for Oversight

**Status**: Accepted
**Date**: 2024-12-01
**Decision Makers**: Architecture Team

## Context

AI-driven artifact generation raises concerns about:
- Accuracy and appropriateness of generated content
- Human oversight in critical decisions
- Compliance with governance requirements
- Preventing runaway automation

We needed a mechanism to ensure humans remain in control of key decisions while not blocking the benefits of automation.

Options considered:
1. **No Gates** - Fully automated end-to-end
2. **Approval on Every Artifact** - Gate each creation
3. **Strategic Gates** - Gates at critical junctures
4. **Probabilistic Review** - Random sampling

## Decision

We implemented **5 mandatory human gates** at strategic points in the cascade:

| Gate | After | Purpose |
|------|-------|---------|
| Gate #1 | Persona Discovery | Validate persona roster is complete |
| Gate #2 | Cross-Persona Synthesis | Approve conflict resolutions |
| Gate #3 | Reserved | Future use |
| Gate #4 | Architecture | Freeze before parallel branch |
| Gate #5 | Pre-Deployment | Final verification |

### Rationale

1. **Strategic Placement**
   - Gates at highest-impact decision points
   - Early gates prevent downstream rework
   - Late gates ensure final quality

2. **Not Too Many**
   - 5 gates balances oversight with velocity
   - Each gate has clear purpose
   - Avoids "approval fatigue"

3. **Configurable**
   - Gates can be enabled/disabled per environment
   - Timeout and escalation configurable
   - Multiple approvers supported

4. **Audit Trail**
   - All gate decisions recorded
   - Who approved, when, with what comments
   - Supports compliance requirements

### Gate Details

#### Gate #1: Persona Discovery Review

**Trigger**: After `cpe/discover_personas` completes
**Question**: "Is the persona roster complete and accurate?"
**Artifacts**: All discovered personas
**Risk if Skipped**: Missing stakeholders, incomplete requirements

#### Gate #2: Cross-Persona Synthesis

**Trigger**: After `cpe/synthesize_cross_persona` completes
**Question**: "Are conflict resolutions appropriate?"
**Artifacts**: Conflict reports, shared kernel definitions
**Risk if Skipped**: Unresolved conflicts leak into implementation

#### Gate #4: Architecture Freeze

**Trigger**: After architecture layer complete
**Question**: "Is the architecture sound for parallel development?"
**Artifacts**: Architecture diagrams, ADRs, component definitions
**Risk if Skipped**: Teams diverge on different assumptions

#### Gate #5: Pre-Deployment

**Trigger**: Before deployment artifacts execute
**Question**: "Is the system ready for production?"
**Artifacts**: All layers, verification reports, compliance checks
**Risk if Skipped**: Deploying incomplete or buggy system

## Consequences

### Positive
- Human oversight at critical points
- Prevents AI-generated errors from propagating
- Supports regulatory compliance
- Clear accountability for decisions

### Negative
- Introduces delays in cascade
- Requires available approvers
- Can bottleneck if not staffed
- May feel bureaucratic for small changes

### Mitigations
- Configurable timeouts with escalation
- Multiple approvers per gate
- Can disable gates in development
- Slack/email notifications for pending gates

## Implementation

```yaml
# helix.config.yaml
gates:
  gate_1:
    name: "Persona Discovery Review"
    enabled: true
    timeout_hours: 48
    required_approvers: 1
    notify: [email, slack]
    auto_approve_after: null

  gate_2:
    name: "Cross-Persona Synthesis"
    enabled: true
    timeout_hours: 48
    required_approvers: 1

  gate_4:
    name: "Architecture Freeze"
    enabled: true
    timeout_hours: 24
    required_approvers: 2  # Critical decision
    escalation:
      after_hours: 12
      escalate_to: ["platform_admin"]

  gate_5:
    name: "Pre-Deployment"
    enabled: true
    timeout_hours: 24
    required_approvers: 2
```

## Workflow

```
          ┌─────────────┐
          │   pending   │
          └──────┬──────┘
                 │
     ┌───────────┼───────────┐
     │           │           │
     ▼           ▼           ▼
┌─────────┐ ┌─────────┐ ┌─────────┐
│approved │ │rejected │ │ timeout │
└────┬────┘ └────┬────┘ └────┬────┘
     │           │           │
     ▼           ▼           ▼
  Continue    Rollback   Escalate
```

## Related Decisions

- [ADR-004](./004-12-layer-cascade.md): Gates between cascade layers
- [ADR-010](./010-nextjs-dashboard.md): Gate approval UI
