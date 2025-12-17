# Discovery Triad

The Discovery Triad is Helix's approach to comprehensive persona discovery.

## Three Techniques

### 1. Chain-of-Thought (CoT)

Recursive Stakeholder Network Interrogation:

1. Start with obvious stakeholders
2. Ask "Who else is affected?"
3. Ask "Who provides input?"
4. Ask "Who consumes output?"
5. Repeat until network stabilizes

### 2. Multi-Agent Debate (MAD)

Three specialist agents debate persona definitions:

| Agent | Role |
|-------|------|
| **Business Analyst** | Business value, ROI |
| **UX Researcher** | User needs, journeys |
| **Domain Expert** | Industry patterns |

A **Judge** agent synthesizes the debate into consensus.

```yaml
mad:
  enabled: true
  max_rounds: 3
  consensus_threshold: 0.67
```

### 3. Ontology-Grounded RAG (OG-RAG)

External knowledge enrichment:

- **O*NET** - Occupation database
- **GDPR Roles** - Data protection roles
- **Industry Taxonomies** - Domain-specific roles

## Discovery Flow

```
Founding Intent
      ↓
   ┌──┴──┐
   ↓     ↓
  CoT   OG-RAG
   ↓     ↓
   └──┬──┘
      ↓
    MAD Debate
      ↓
   Consensus
      ↓
  Human Gate #1
      ↓
Registered Personas
```

## Configuration

```yaml
discovery:
  cot:
    max_depth: 5
    min_confidence: 0.7
  mad:
    enabled: true
    max_rounds: 3
  og_rag:
    sources:
      - onet
      - gdpr_roles
```
