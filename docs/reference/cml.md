# Context Mapper Language (CML)

CML is the requirements specification language used by Helix.

## User Stories

```
UserStory <StoryName> {
  As a "<Persona>"
  I want to "<Action>"
  with "<Feature1>", "<Feature2>", "<Feature3>"
  so that "<Benefit>"
  promotes "<Value1>", "<Value2>"
  harms "<Risk>" (mitigated by "<Mitigation>")
}
```

### Example

```
UserStory ViewAssessmentResults {
  As a "Hiring Manager"
  I want to "view candidate assessment results"
  with "score breakdowns", "percentile rankings", "AI recommendations"
  so that "I can make informed hiring decisions quickly"
  promotes "Decision Quality", "Time Efficiency"
  harms "Candidate Privacy" (mitigated by "explicit consent flow")
}
```

## Bounded Contexts

```
BoundedContext <ContextName> {
  type = <CORE|SUPPORTING|GENERIC>

  Aggregate <AggregateName> {
    Entity <EntityName> {
      <field>: <Type>
    }

    ValueObject <VOName> {
      <field>: <Type>
    }
  }
}
```

### Example

```
BoundedContext AssessmentContext {
  type = CORE

  Aggregate Assessment {
    Entity Assessment {
      id: UUID
      title: String
      status: AssessmentStatus
      tenant_id: TenantID
    }

    ValueObject Score {
      raw_score: Integer
      percentile: Float
      interpretation: String
    }
  }
}
```

## Context Maps

```
ContextMap <MapName> {
  contains <Context1>, <Context2>

  <Context1> [<Relationship>] <Context2>
}
```

### Relationship Types

| Type | Description |
|------|-------------|
| `SK` | Shared Kernel |
| `PL` | Published Language |
| `CF` | Conformist |
| `ACL` | Anti-Corruption Layer |
| `OHS` | Open Host Service |
| `U/D` | Upstream/Downstream |

### Example

```
ContextMap PsychoTestMap {
  contains AssessmentContext, ReportingContext, IdentityContext

  AssessmentContext [PL]->[CF] ReportingContext
  IdentityContext [OHS]->[ACL] AssessmentContext
}
```

## Parsing CML

```typescript
import { parseCML } from '@helix/common';

const ast = parseCML(`
  UserStory Login {
    As a "User"
    I want to "log in"
    so that "I can access my account"
  }
`);
```
