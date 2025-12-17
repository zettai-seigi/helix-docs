# ADR-004: 12-Layer Cascade Model

**Status**: Accepted
**Date**: 2024-12-01
**Decision Makers**: Architecture Team

## Context

Helix transforms a founding intent into a complete software system. We needed a structured model to:
- Ensure all aspects of a system are addressed
- Maintain traceability from intent to implementation
- Prevent orphan artifacts (code without requirements)
- Support parallel team workflows

Options considered:
1. **Flat Structure** - All artifacts at same level
2. **3-Tier** - Requirements → Design → Implementation
3. **12-Layer Cascade** - Comprehensive layered model
4. **Domain-Driven** - Bounded contexts as primary organization

## Decision

We adopted a **12-layer cascade model** where artifacts flow from high-level intent down to concrete implementation, with each layer deriving from the one above.

### The 12 Layers

| # | Layer | Code | Description |
|---|-------|------|-------------|
| 0 | Persona | `persona` | Stakeholder archetypes |
| 1 | Business | `biz` | Business rules, policies |
| 2 | Requirements | `req` | User stories, acceptance criteria |
| 3 | Design | `des` | UI/UX mockups, flows |
| 4 | Architecture | `arc` | System components, decisions |
| 5 | API | `api` | Interface contracts |
| 6 | Data | `dat` | Schemas, migrations |
| 7 | Security | `sec` | RBAC policies, encryption |
| 8 | Implementation | `imp` | Source code |
| 9 | Testing | `tst` | Test cases, specs |
| 10 | Compliance | `cmp` | Audit reports, certifications |
| 11 | Infrastructure | `inf` | IaC, deployment configs |
| 12 | Documentation | `doc` | User guides, API docs |

### Cascade Rules

1. **Downstream Derivation**: Each layer derives from the one above
   ```
   Persona → Business → Requirements → ... → Documentation
   ```

2. **No Orphans**: Artifacts MUST have upstream parents
   ```
   ✅ Implementation → API → Architecture → Requirements → Persona
   ❌ Implementation (orphan - no requirement)
   ```

3. **DAG Structure**: Dependencies form a Directed Acyclic Graph
   - Cycles are detected and rejected
   - Cross-layer links allowed (Testing → Requirements)

### Rationale

1. **Complete Coverage**
   - Ensures no aspect of software development is missed
   - Personas guarantee user-centricity
   - Compliance and documentation are first-class

2. **Traceability**
   - Every line of code traces to a requirement
   - Every requirement traces to a persona
   - Audit trail from intent to implementation

3. **Parallel Work**
   - After Gate #4 (Architecture), layers 5-12 can proceed in parallel
   - Different teams can own different layers
   - Clear handoff points

4. **Quality Gates**
   - Human gates at key transitions
   - Prevents rushing past important reviews
   - Enforces design-first culture

## Consequences

### Positive
- Comprehensive artifact coverage
- Clear traceability chain
- Supports compliance requirements
- Enables parallel development post-architecture

### Negative
- More upfront structure required
- Can feel heavy for small projects
- Layer boundaries need judgment
- Some artifacts span layers naturally

### Mitigations
- Gates can be disabled for lightweight projects
- Cross-layer relationships allowed
- Layer templates accelerate artifact creation
- Fitness functions catch violations automatically

## Layer Dependencies

```
                    ┌─────────┐
                    │ Persona │ (0)
                    └────┬────┘
                         │
                    ┌────▼────┐
                    │Business │ (1)
                    └────┬────┘
                         │
                    ┌────▼────┐
                    │  Req    │ (2)
                    └────┬────┘
                         │
                    ┌────▼────┐
                    │ Design  │ (3)
                    └────┬────┘
                         │
                    ┌────▼────┐  ← Gate #4
                    │  Arch   │ (4)
                    └────┬────┘
        ┌────────────────┼────────────────┐
        │                │                │
   ┌────▼────┐     ┌─────▼────┐    ┌─────▼────┐
   │   API   │     │   Data   │    │ Security │ (5-7)
   └────┬────┘     └────┬─────┘    └────┬─────┘
        │               │               │
   ┌────▼────┐          │               │
   │  Impl   │←─────────┴───────────────┘ (8)
   └────┬────┘
        │
   ┌────▼────┐
   │ Testing │ (9)
   └────┬────┘
        │
   ┌────▼────────▼────────▼────┐
   │ Compliance │ Infra │ Docs │ (10-12)
   └───────────────────────────┘
```

## Related Decisions

- [ADR-003](./003-uid-taxonomy.md): Layer codes in UID
- [ADR-005](./005-human-gates.md): Gates between layers
- [ADR-002](./002-federated-mcp-servers.md): Cascade MCP handles generation
