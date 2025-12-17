# Requirements Engineering Guide

This guide covers deriving and managing requirements in Helix.

## Context Mapper Language (CML)

Helix uses CML for requirements specification:

```
UserStory ViewAssessmentResults {
  As a "Hiring Manager"
  I want to "view candidate assessment results"
  with "score breakdowns", "percentile rankings", "recommendations"
  so that "I can make informed hiring decisions"
  promotes "Decision Quality", "Efficiency"
  harms "Candidate Privacy" (mitigated by "consent flow")
}
```

## Deriving Requirements

### From Personas

```typescript
const requirements = await derivation.derive_intents({
  persona_uid: "cpe:psychotest/persona/HIRING-MANAGER",
  context: {
    domain: "psychometric-testing",
    constraints: ["GDPR", "EEOC"]
  },
  tenant_id: "acme"
});
```

### Manual Submission

```typescript
await derivation.submit_requirement({
  cml: `
    UserStory ScheduleAssessment {
      As a "Hiring Manager"
      I want to "schedule assessments for candidates"
      so that "I can evaluate multiple candidates efficiently"
    }
  `,
  persona_uid: "cpe:psychotest/persona/HIRING-MANAGER",
  tenant_id: "acme"
});
```

## Conflict Detection

Automatically detect conflicts:

```typescript
const conflicts = await derivation.detect_conflicts({
  requirement_uids: [
    "cpe:psychotest/req/story/HM/view-all-results",
    "cpe:psychotest/req/story/CANDIDATE/hide-results"
  ],
  tenant_id: "acme"
});

// Output:
// {
//   type: "direct_conflict",
//   description: "HM wants to see results, Candidate wants to hide them",
//   resolution_strategies: ["consent_flow", "anonymization", "time_delay"]
// }
```

## Cross-Persona Synthesis

Create shared data models:

```typescript
const synthesis = await derivation.synthesize_cross_persona({
  entity: "AssessmentResult",
  personas: ["HIRING-MANAGER", "CANDIDATE", "PSYCHOMETRICIAN"],
  tenant_id: "acme"
});

// Creates polysemic model:
// - HiringManagerResultDTO (scores, recommendations)
// - CandidateResultDTO (personal feedback only)
// - PsychometricianResultDTO (full statistical data)
```

## Human Gate #2

After synthesis, request approval:

```typescript
await cascade.request_gate_approval({
  gate_number: 2,
  artifacts: synthesis.artifact_uids,
  summary: "Cross-persona synthesis complete",
  tenant_id: "acme"
});
```
