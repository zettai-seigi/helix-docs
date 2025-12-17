# Persona Discovery Guide

This guide walks through the complete persona discovery process.

## Overview

Persona discovery transforms a Founding Intent into a comprehensive stakeholder map using the Discovery Triad.

## Step 1: Bootstrap the Ecosystem

Start with your Founding Intent:

```typescript
const ecosystem = await discovery.bootstrap_ecosystem({
  founding_intent: `
    Build a SaaS platform for psychometric assessments that helps
    organizations make better hiring decisions through validated
    cognitive and personality tests.
  `,
  tenant_id: "acme",
  namespace: "psychotest",
  domain_hints: ["hr-tech", "assessment", "talent-acquisition"]
});
```

## Step 2: Run Discovery Triad

Execute all three discovery techniques:

```typescript
const result = await discovery.discover_personas({
  ecosystem_id: ecosystem.id,
  use_cot: true,
  use_mad: true,
  use_og_rag: true,
  tenant_id: "acme"
});
```

### Chain-of-Thought Output

```
Primary Stakeholders:
├── Hiring Manager (decision maker)
├── Candidate (test taker)
└── HR Administrator (process owner)

Secondary Stakeholders:
├── Psychometrician (test designer)
├── IT Administrator (system admin)
└── Compliance Officer (regulatory)

Tertiary Stakeholders:
├── Executive (reporting consumer)
└── External Auditor (compliance)
```

### MAD Debate

The agents debate each persona:

```
Business Analyst: "The Hiring Manager is our primary value driver..."
UX Researcher: "But Candidates have the highest interaction frequency..."
Domain Expert: "In psychometric platforms, the Psychometrician is critical..."
Judge: "Consensus: Both Hiring Manager and Psychometrician are Tier 1..."
```

## Step 3: Human Gate #1

Review and approve the persona roster:

```typescript
await cascade.request_gate_approval({
  gate_number: 1,
  artifacts: result.persona_uids,
  summary: "Initial persona roster for psychometric platform",
  tenant_id: "acme"
});
```

## Step 4: Register Approved Personas

After approval, personas are automatically registered to the graph.

## Best Practices

1. **Start broad** - Don't filter too early
2. **Include edge cases** - Auditors, administrators
3. **Consider anti-personas** - Who should NOT use the system
4. **Validate with stakeholders** - Use Gate #1 effectively
