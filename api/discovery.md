# Discovery API

The Discovery MCP provides tools for persona ecosystem discovery.

## Tools

### bootstrap_ecosystem

Initialize an ecosystem from a Founding Intent.

```typescript
const result = await discovery.bootstrap_ecosystem({
  founding_intent: "Build a SaaS platform for psychometric assessments",
  tenant_id: "acme",
  namespace: "psychotest",
  domain_hints: ["assessment", "hr-tech"]
});
```

### discover_personas

Execute the Discovery Triad to find personas.

```typescript
const personas = await discovery.discover_personas({
  ecosystem_id: "eco-123",
  use_cot: true,      // Chain-of-Thought
  use_mad: true,      // Multi-Agent Debate
  use_og_rag: true,   // Ontology-Grounded RAG
  tenant_id: "acme"
});
```

### mad_debate

Run a Multi-Agent Debate session.

```typescript
const debate = await discovery.mad_debate({
  topic: "Should we include a 'Test Administrator' persona?",
  context: { existing_personas: [...] },
  max_rounds: 3,
  tenant_id: "acme"
});
```

### register_persona

Write a validated persona to the graph.

```typescript
await discovery.register_persona({
  uid: "cpe:psychotest/persona/HIRING-MANAGER",
  name: "Hiring Manager",
  description: "Makes hiring decisions based on assessment results",
  goals: ["Identify top candidates", "Reduce time-to-hire"],
  pain_points: ["Too many unqualified applicants"],
  tenant_id: "acme"
});
```
