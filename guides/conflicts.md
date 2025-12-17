# Conflict Resolution Guide

How to detect and resolve conflicts between personas and requirements.

## Types of Conflicts

### Direct Conflicts

Mutually exclusive requirements:

```
Hiring Manager: "View all candidate scores immediately"
Candidate: "Keep my scores private until I consent"
```

### Resource Conflicts

Competing for limited resources:

```
IT Admin: "Minimize storage costs"
Compliance: "Retain all data for 7 years"
```

### Priority Conflicts

Different importance rankings:

```
Sales: "Launch new features fast"
Security: "Thorough security review first"
```

## Detection

Run conflict detection:

```typescript
const conflicts = await derivation.detect_conflicts({
  scope: "all",  // or specific requirement UIDs
  tenant_id: "acme"
});
```

## Resolution Strategies

### 1. Consent Flow

Add user consent to resolve privacy conflicts:

```typescript
await derivation.resolve_conflict({
  conflict_id: "conflict-123",
  strategy: "consent_flow",
  implementation: {
    consent_type: "explicit",
    revocable: true
  }
});
```

### 2. Role-Based Views

Show different data to different personas:

```typescript
await derivation.resolve_conflict({
  conflict_id: "conflict-456",
  strategy: "role_based_views",
  implementation: {
    views: {
      "HIRING-MANAGER": ["score", "percentile"],
      "CANDIDATE": ["feedback", "improvement_areas"]
    }
  }
});
```

### 3. Time-Based Access

Delay access for certain personas:

```typescript
await derivation.resolve_conflict({
  conflict_id: "conflict-789",
  strategy: "time_delay",
  implementation: {
    delay_for: "CANDIDATE",
    duration: "48h",
    trigger: "assessment_complete"
  }
});
```

### 4. Escalation

Some conflicts require human decision:

```typescript
await derivation.resolve_conflict({
  conflict_id: "conflict-101",
  strategy: "escalate",
  escalate_to: "product-owner"
});
```

## Documenting Resolutions

All resolutions are tracked:

```cypher
MATCH (c:Conflict)-[:RESOLVED_BY]->(r:Resolution)
WHERE c.tenant_id = "acme"
RETURN c, r
```
