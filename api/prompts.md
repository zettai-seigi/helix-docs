# MCP Prompt Templates

Helix MCP servers provide prompt templates that guide AI models in performing complex tasks. These templates are exposed via the MCP protocol's `prompts/list` and `prompts/get` methods.

## Overview

Prompt templates serve several purposes:
- **Structured Guidance**: Provide consistent prompts for common operations
- **Context Injection**: Include relevant data from the knowledge graph
- **Best Practices**: Embed domain expertise into prompts
- **Reproducibility**: Ensure consistent outputs across invocations

## Prompt Discovery

### Listing Available Prompts

```typescript
// MCP request
{
  jsonrpc: "2.0",
  method: "prompts/list",
  id: 1
}

// Response
{
  prompts: [
    {
      name: "discover-personas",
      description: "Guide persona discovery from a founding intent",
      arguments: [
        { name: "founding_intent", required: true, description: "The business intent to analyze" },
        { name: "domain", required: false, description: "Business domain (e.g., healthcare, fintech)" }
      ]
    },
    {
      name: "derive-requirements",
      description: "Generate requirements for a persona",
      arguments: [
        { name: "persona_uid", required: true, description: "UID of the persona" }
      ]
    }
  ]
}
```

### Getting a Prompt

```typescript
// MCP request
{
  jsonrpc: "2.0",
  method: "prompts/get",
  params: {
    name: "discover-personas",
    arguments: {
      founding_intent: "Build a psychometric assessment platform for hiring",
      domain: "HR Tech"
    }
  },
  id: 2
}

// Response
{
  messages: [
    {
      role: "user",
      content: {
        type: "text",
        text: "Analyze the following founding intent and identify all stakeholder personas..."
      }
    }
  ]
}
```

---

## Discovery MCP Prompts

### `discover-personas`

Guides the Discovery Triad process for persona identification.

**Arguments**:
| Name | Required | Description |
|------|----------|-------------|
| `founding_intent` | Yes | Business intent to analyze |
| `domain` | No | Business domain for context |
| `tenant_id` | Yes | Tenant identifier |

**Template**:
```markdown
## Persona Discovery Task

Analyze the following founding intent and identify all stakeholder personas who will interact with or be affected by this system.

### Founding Intent
{founding_intent}

### Domain Context
{domain}

### Instructions
1. Identify PRIMARY stakeholders (direct users)
2. Identify SECONDARY stakeholders (indirect beneficiaries)
3. Identify REGULATORY stakeholders (compliance, oversight)
4. For each persona, determine:
   - Role name and description
   - Key responsibilities
   - Primary goals and pain points
   - Required access level (platform/tenant-scoped/user-scoped)
   - Authority level (creator/editor/viewer)

### Output Format
Return personas in JSON format:
```json
{
  "personas": [
    {
      "name": "PERSONA-NAME",
      "description": "...",
      "responsibilities": ["..."],
      "goals": ["..."],
      "painPoints": ["..."],
      "accessLevel": "tenant-scoped",
      "authority": "editor"
    }
  ]
}
```
```

### `mad-debate`

Structures a Multi-Agent Debate for persona refinement.

**Arguments**:
| Name | Required | Description |
|------|----------|-------------|
| `proposed_personas` | Yes | Initial persona list |
| `domain` | Yes | Business domain |
| `round` | No | Current debate round (1-3) |

**Template**:
```markdown
## Multi-Agent Debate: Persona Validation

You are participating in a structured debate about the proposed persona roster.

### Current Round: {round}/3

### Proposed Personas
{proposed_personas}

### Your Role: {agent_role}
{role_instructions}

### Debate Instructions
1. Analyze the proposed personas from your perspective
2. Identify gaps, overlaps, or misclassifications
3. Propose additions or removals with justification
4. Respond to other agents' arguments

### Expected Output
{
  "critique": "Your analysis...",
  "recommendations": [
    { "action": "add|remove|modify", "persona": "...", "reason": "..." }
  ],
  "confidence": 0.0-1.0
}
```

---

## Derivation MCP Prompts

### `derive-requirements`

Guides requirement generation for a specific persona.

**Arguments**:
| Name | Required | Description |
|------|----------|-------------|
| `persona_uid` | Yes | UID of the target persona |
| `context` | No | Additional context from graph |

**Template**:
```markdown
## Requirements Derivation

Generate user stories and acceptance criteria for the following persona.

### Persona
{persona_details}

### Related Artifacts
{related_artifacts}

### Instructions
1. Identify key workflows for this persona
2. Write user stories in CML format
3. Include acceptance criteria
4. Consider non-functional requirements
5. Link to upstream artifacts

### CML Format
```cml
UserStory {StoryName} {
  As a "{persona_name}"
  I want to "{action}"
  with "{features}"
  so that "{value}"
  promotes "{quality_attribute}"
  harms "{tradeoff}" (optional)
}
```

### Output Requirements
- Minimum 5 user stories per workflow
- Each story must have acceptance criteria
- Stories must be traceable to persona goals
```

### `detect-conflicts`

Analyzes requirements for conflicts between personas.

**Arguments**:
| Name | Required | Description |
|------|----------|-------------|
| `requirement_uids` | Yes | UIDs of requirements to analyze |
| `tenant_id` | Yes | Tenant identifier |

**Template**:
```markdown
## Conflict Detection Analysis

Analyze the following requirements for potential conflicts.

### Requirements
{requirements_content}

### Conflict Types to Identify
1. **Resource Conflicts**: Same resource, different expectations
2. **Priority Conflicts**: Conflicting urgency/importance
3. **Data Conflicts**: Same data, different access needs
4. **Workflow Conflicts**: Incompatible process flows
5. **Security Conflicts**: Access vs. restriction tensions

### Output Format
{
  "conflicts": [
    {
      "type": "resource|priority|data|workflow|security",
      "requirement_a": "uid",
      "requirement_b": "uid",
      "description": "...",
      "severity": "critical|high|medium|low",
      "suggested_resolution": "..."
    }
  ]
}
```

---

## Cascade MCP Prompts

### `generate-artifact`

Guides artifact generation for a specific layer.

**Arguments**:
| Name | Required | Description |
|------|----------|-------------|
| `layer` | Yes | Target layer code |
| `parent_uid` | Yes | Parent artifact UID |
| `artifact_type` | Yes | Type of artifact to generate |

**Template**:
```markdown
## Artifact Generation: {layer_name}

Generate a {artifact_type} artifact for layer {layer}.

### Parent Artifact
{parent_content}

### Layer Requirements
{layer_requirements}

### Generation Rules
1. Must derive from parent artifact
2. Must conform to layer schema
3. Must include UID trace comment
4. Must respect persona scope
5. Must follow naming conventions

### Output Format
Include trace comment in generated content:
```
//@trace {generated_uid}
```

Ensure content follows layer-specific format.
```

### `inject-tenant-policy`

Guides tenant isolation injection into data artifacts.

**Arguments**:
| Name | Required | Description |
|------|----------|-------------|
| `artifact_uid` | Yes | Data artifact to modify |
| `tenant_mode` | Yes | Isolation mode (pooled/bridge/siloed) |

**Template**:
```markdown
## Tenant Policy Injection

Add tenant isolation to the following data artifact.

### Original Artifact
{artifact_content}

### Tenant Mode: {tenant_mode}

### Injection Rules
- Add `tenant_id` column/property to all entities
- Add Row-Level Security policies
- Add tenant validation constraints
- Ensure indexes include tenant_id

### Expected Changes
1. Column additions
2. RLS policy definitions
3. Index modifications
4. Constraint updates
```

---

## Verification MCP Prompts

### `analyze-drift`

Guides drift analysis between specification and implementation.

**Arguments**:
| Name | Required | Description |
|------|----------|-------------|
| `spec_uid` | Yes | Specification artifact UID |
| `impl_uid` | Yes | Implementation artifact UID |

**Template**:
```markdown
## Drift Analysis

Compare specification and implementation for drift.

### Specification
{spec_content}

### Implementation
{impl_content}

### Analysis Criteria
1. **Functional Drift**: Missing or extra functionality
2. **Structural Drift**: Different architecture/patterns
3. **Data Drift**: Schema mismatches
4. **Security Drift**: Missing security controls
5. **Performance Drift**: Deviation from NFRs

### Output Format
{
  "drift_detected": true/false,
  "drift_items": [
    {
      "type": "functional|structural|data|security|performance",
      "spec_element": "...",
      "impl_element": "...",
      "severity": "critical|high|medium|low",
      "suggested_fix": "..."
    }
  ],
  "drift_score": 0-100
}
```

---

## Using Prompts Programmatically

### Getting Prompts in Tools

```typescript
// In MCP tool implementation
import { getPrompt } from '@helix/common/prompts';

export async function discoverPersonas(input: DiscoverPersonasInput) {
  // Get the prompt template
  const prompt = await getPrompt('discover-personas', {
    founding_intent: input.founding_intent,
    domain: input.domain,
    tenant_id: input.tenant_id
  });

  // Use prompt with AI model
  const response = await claude.messages.create({
    model: 'claude-3-sonnet-20240229',
    messages: prompt.messages,
    max_tokens: 4096
  });

  // Process response
  return parsePersonaResponse(response);
}
```

### Registering Custom Prompts

```typescript
// packages/mcp-discovery/src/prompts/index.ts
import { PromptRegistry } from '@helix/common/prompts';

export const prompts = new PromptRegistry();

prompts.register({
  name: 'custom-analysis',
  description: 'Custom analysis prompt',
  arguments: [
    { name: 'target', required: true, description: 'Analysis target' }
  ],
  template: async (args) => ({
    messages: [
      {
        role: 'user',
        content: `Analyze the following: ${args.target}`
      }
    ]
  })
});
```

---

## Best Practices

### Prompt Design

1. **Be Specific**: Include exact output format expectations
2. **Provide Context**: Inject relevant graph data
3. **Set Boundaries**: Define what should NOT be included
4. **Include Examples**: Show expected output format
5. **Chain Prompts**: Use outputs as inputs to subsequent prompts

### Output Parsing

1. **Structured Output**: Request JSON when possible
2. **Validation**: Validate against Zod schemas
3. **Error Handling**: Handle malformed responses gracefully
4. **Retry Logic**: Retry with clarification on parse failures

### Security

1. **Input Sanitization**: Sanitize user-provided arguments
2. **Tenant Isolation**: Always include tenant context
3. **No Secrets**: Never include secrets in prompts
4. **Audit Logging**: Log prompt usage for compliance
