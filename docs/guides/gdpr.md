# GDPR Compliance Guide

How Helix helps with GDPR compliance.

## Automatic GDPR Artifacts

Helix generates GDPR-required documentation:

```typescript
await verification.generate_gdpr_article_30({
  tenant_id: "acme",
  data_controller: "Acme Corp",
  dpo_contact: "dpo@acme.com"
});
```

## Article 30 Records

Generated processing activity records:

```markdown
# Record of Processing Activities

## Assessment Data Processing
- **Purpose**: Candidate evaluation for hiring
- **Legal Basis**: Legitimate interest (Art. 6(1)(f))
- **Data Subjects**: Job candidates
- **Data Categories**: Assessment responses, scores
- **Recipients**: Hiring managers, HR administrators
- **Retention**: 2 years post-assessment
- **Security Measures**: Encryption, access controls
```

## Data Subject Rights

Track data subject requests:

```typescript
// Right to Access
await verification.generate_audit_evidence({
  right: "access",
  data_subject_id: "candidate-123",
  tenant_id: "acme"
});

// Right to Erasure
await verification.generate_audit_evidence({
  right: "erasure",
  data_subject_id: "candidate-123",
  tenant_id: "acme"
});
```

## Consent Management

Consent flows are traced:

```cypher
MATCH (c:Consent)-[:GRANTED_BY]->(ds:DataSubject)
MATCH (c)-[:ENABLES]->(p:Processing)
WHERE ds.id = "candidate-123"
RETURN c, p
```

## Data Flow Mapping

Helix tracks data flows:

```typescript
const flows = await graph.query_graph({
  query: `
    MATCH path = (source)-[:DATA_FLOWS_TO*]->(dest)
    WHERE source.contains_pii = true
    RETURN path
  `,
  tenant_id: "acme"
});
```

## Privacy by Design

Helix enforces privacy by design:

1. **Data Minimization** - Only collect necessary data
2. **Purpose Limitation** - Track data usage purposes
3. **Storage Limitation** - Automated retention policies
4. **Integrity** - Audit trails for all changes
5. **Confidentiality** - Tenant isolation, encryption

## Audit Evidence

Generate compliance evidence:

```typescript
await verification.generate_audit_evidence({
  type: "gdpr_compliance",
  period: { from: "2024-01-01", to: "2024-12-31" },
  include: [
    "processing_records",
    "consent_logs",
    "access_requests",
    "breach_reports"
  ],
  tenant_id: "acme"
});
```
