# 12-Layer Cascade

The Helix cascade generates artifacts through 12 layers, each building on the previous.

## Layer Overview

| # | Code | Layer | Description |
|---|------|-------|-------------|
| 0 | `persona` | Persona | Stakeholder definitions |
| 1 | `biz` | Business | Business rules, policies |
| 2 | `req` | Requirements | User stories, acceptance criteria |
| 3 | `des` | Design | UX/UI designs, wireframes |
| 4 | `arc` | Architecture | System architecture, ADRs |
| 5 | `api` | API | OpenAPI specs, contracts |
| 6 | `dat` | Data | Schemas, ERDs, migrations |
| 7 | `sec` | Security | RBAC policies, threat models |
| 8 | `imp` | Implementation | Source code |
| 9 | `tst` | Testing | Test cases, fixtures |
| 10 | `cmp` | Compliance | Audit artifacts, GDPR |
| 11 | `inf` | Infrastructure | IaC, Kubernetes manifests |
| 12 | `doc` | Documentation | User guides, API docs |

## Layer Dependencies

```
Persona (0)
    ↓
Business (1)
    ↓
Requirements (2)
    ↓
Design (3)
    ↓
Architecture (4) ← Human Gate #4
    ↓
┌───┴───┬───────┬───────┐
↓       ↓       ↓       ↓
API    Data   Security  ...
(5)    (6)    (7)
    ↓
Implementation (8)
    ↓
Testing (9)
    ↓
Compliance (10)
    ↓
Infrastructure (11)
    ↓
Documentation (12)
```

## UID Taxonomy

All artifacts follow the UID format:

```
cpe:{namespace}/{layer}/{artifact_type}/{persona_scope}/{artifact_id}[@version]
```

Example: `cpe:psychotest/req/story/HIRING-MANAGER/HM-REQ-001`
