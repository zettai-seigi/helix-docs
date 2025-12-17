[**Helix API Documentation v0.1.0**](../README.md)

***

[Helix API Documentation](../README.md) / orchestrator/src

# orchestrator/src

@helix/orchestrator

Helix Orchestrator - Macro-orchestrator for context engineering
and task dispatch using Claude Agent SDK.

Architecture Role: "Manager" in Manager-Worker pattern
- Curates context from Neo4j
- Dispatches tasks to Claude SDK workers
- Monitors gates and aggregates results

## Classes

### CascadeCoordinator

Defined in: [packages/orchestrator/src/cascade/cascade-coordinator.ts:43](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/cascade/cascade-coordinator.ts#L43)

#### Constructors

##### Constructor

> **new CascadeCoordinator**(`config`): [`CascadeCoordinator`](#cascadecoordinator)

Defined in: [packages/orchestrator/src/cascade/cascade-coordinator.ts:50](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/cascade/cascade-coordinator.ts#L50)

###### Parameters

###### config

[`CascadeCoordinatorConfig`](#cascadecoordinatorconfig)

###### Returns

[`CascadeCoordinator`](#cascadecoordinator)

#### Methods

##### start()

> **start**(): `Promise`\<`void`\>

Defined in: [packages/orchestrator/src/cascade/cascade-coordinator.ts:61](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/cascade/cascade-coordinator.ts#L61)

Start listening for gate approval events

###### Returns

`Promise`\<`void`\>

##### stop()

> **stop**(): `Promise`\<`void`\>

Defined in: [packages/orchestrator/src/cascade/cascade-coordinator.ts:89](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/cascade/cascade-coordinator.ts#L89)

Stop listening for events

###### Returns

`Promise`\<`void`\>

***

### ContextCurationAgent

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:424](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L424)

Context Curation Agent - Builds bounded context packets

#### Extends

- `ClaudeAgent`

#### Constructors

##### Constructor

> **new ContextCurationAgent**(`config`): [`ContextCurationAgent`](#contextcurationagent)

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:425](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L425)

###### Parameters

###### config

[`AgentConfig`](#agentconfig)

###### Returns

[`ContextCurationAgent`](#contextcurationagent)

###### Overrides

`ClaudeAgent.constructor`

#### Methods

##### curate()

> **curate**(`requirements`, `personaScope`, `targetLayer`): `Promise`\<\{ `apiContracts`: `string`[]; `constraints`: `string`[]; `designSpecs`: `string`[]; `excludedContext`: `string`[]; `injectedTools`: `string`[]; `requirements`: `string`[]; \}\>

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:432](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L432)

Curate context for a task

###### Parameters

###### requirements

`string`[]

###### personaScope

`string`

###### targetLayer

`string`

###### Returns

`Promise`\<\{ `apiContracts`: `string`[]; `constraints`: `string`[]; `designSpecs`: `string`[]; `excludedContext`: `string`[]; `injectedTools`: `string`[]; `requirements`: `string`[]; \}\>

##### execute()

> **execute**(`prompt`): `Promise`\<[`AgentResult`](#agentresult)\>

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:200](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L200)

Execute a query with this agent

###### Parameters

###### prompt

`string`

###### Returns

`Promise`\<[`AgentResult`](#agentresult)\>

###### Inherited from

`ClaudeAgent.execute`

***

### ContextCurator

Defined in: [packages/orchestrator/src/context/curator.ts:58](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/context/curator.ts#L58)

#### Constructors

##### Constructor

> **new ContextCurator**(`graphClient`, `config`): [`ContextCurator`](#contextcurator)

Defined in: [packages/orchestrator/src/context/curator.ts:62](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/context/curator.ts#L62)

###### Parameters

###### graphClient

`GraphClient`

###### config

`Partial`\<[`CuratorConfig`](#curatorconfig)\> = `{}`

###### Returns

[`ContextCurator`](#contextcurator)

#### Methods

##### curateForTask()

> **curateForTask**(`namespace`, `requirementUids`, `personaScope`, `targetLayer`, `domain?`): `Promise`\<[`CuratedContext`](#curatedcontext)\>

Defined in: [packages/orchestrator/src/context/curator.ts:70](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/context/curator.ts#L70)

Curate context for a task payload

###### Parameters

###### namespace

`string`

###### requirementUids

`string`[]

###### personaScope

`string`

###### targetLayer

`string`

###### domain?

`string`

###### Returns

`Promise`\<[`CuratedContext`](#curatedcontext)\>

***

### FractalOrchestrationProtocol

Defined in: [packages/orchestrator/src/protocol/fractal-orchestration.ts:212](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/fractal-orchestration.ts#L212)

Implements the Fractal Orchestration pattern

#### Constructors

##### Constructor

> **new FractalOrchestrationProtocol**(`graphClient`, `eventBus`, `namespace`): [`FractalOrchestrationProtocol`](#fractalorchestrationprotocol)

Defined in: [packages/orchestrator/src/protocol/fractal-orchestration.ts:217](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/fractal-orchestration.ts#L217)

###### Parameters

###### graphClient

`GraphClient`

###### eventBus

`EventBus`

###### namespace

`string`

###### Returns

[`FractalOrchestrationProtocol`](#fractalorchestrationprotocol)

#### Methods

##### createWorkOrder()

> **createWorkOrder**(`parentUid`, `targetLayer`, `artifactType`, `task`, `options`): `Promise`\<\{ `inputContext`: \{ `excludedContexts?`: `string`[]; `parentUid`: `string`; `personaConstraints`: `string`[]; `relatedUids?`: `string`[]; `requiredMcpTools`: `string`[]; \}; `metadata`: \{ `foundingIntent`: `string`; `namespace`: `string`; `personaScope`: `string`; `priority`: `"low"` \| `"high"` \| `"critical"` \| `"normal"`; `timeoutSeconds`: `number`; \}; `outputRequirement`: \{ `artifactType`: `string`; `layer`: `string`; `mustTraceTo`: `string`; `requiredRelationships?`: (`"tests"` \| `"derives-from"` \| `"implements"` \| `"documents"` \| `"conflicts-with"` \| `"shares-with"` \| `"depends-on"` \| `"versioned-from"`)[]; \}; `task`: `string`; `workOrderId`: `string`; \}\>

Defined in: [packages/orchestrator/src/protocol/fractal-orchestration.ts:323](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/fractal-orchestration.ts#L323)

Create a work order for a Claude Worker

###### Parameters

###### parentUid

`string`

###### targetLayer

`string`

###### artifactType

`string`

###### task

`string`

###### options

###### mcpTools?

`string`[]

###### personaConstraints?

`string`[]

###### priority?

`"low"` \| `"high"` \| `"critical"` \| `"normal"`

###### Returns

`Promise`\<\{ `inputContext`: \{ `excludedContexts?`: `string`[]; `parentUid`: `string`; `personaConstraints`: `string`[]; `relatedUids?`: `string`[]; `requiredMcpTools`: `string`[]; \}; `metadata`: \{ `foundingIntent`: `string`; `namespace`: `string`; `personaScope`: `string`; `priority`: `"low"` \| `"high"` \| `"critical"` \| `"normal"`; `timeoutSeconds`: `number`; \}; `outputRequirement`: \{ `artifactType`: `string`; `layer`: `string`; `mustTraceTo`: `string`; `requiredRelationships?`: (`"tests"` \| `"derives-from"` \| `"implements"` \| `"documents"` \| `"conflicts-with"` \| `"shares-with"` \| `"depends-on"` \| `"versioned-from"`)[]; \}; `task`: `string`; `workOrderId`: `string`; \}\>

##### generateWorkerPrompt()

> **generateWorkerPrompt**(`workOrder`): `string`

Defined in: [packages/orchestrator/src/protocol/fractal-orchestration.ts:834](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/fractal-orchestration.ts#L834)

Generate the system prompt for Claude Worker with handshake instructions

###### Parameters

###### workOrder

###### inputContext

\{ `excludedContexts?`: `string`[]; `parentUid`: `string`; `personaConstraints`: `string`[]; `relatedUids?`: `string`[]; `requiredMcpTools`: `string`[]; \} = `...`

Input context - the bounded scope

###### inputContext.excludedContexts?

`string`[] = `...`

Excluded contexts (prevent context poisoning)

###### inputContext.parentUid

`string` = `...`

Parent UID - the anchor for traceability

###### inputContext.personaConstraints

`string`[] = `...`

Persona-specific constraints (e.g., WCAG requirements)

###### inputContext.relatedUids?

`string`[] = `...`

Related UIDs for cross-referencing

###### inputContext.requiredMcpTools

`string`[] = `...`

Required MCP tools for this task

###### metadata

\{ `foundingIntent`: `string`; `namespace`: `string`; `personaScope`: `string`; `priority`: `"low"` \| `"high"` \| `"critical"` \| `"normal"`; `timeoutSeconds`: `number`; \} = `...`

Metadata

###### metadata.foundingIntent

`string` = `...`

###### metadata.namespace

`string` = `...`

###### metadata.personaScope

`string` = `...`

###### metadata.priority

`"low"` \| `"high"` \| `"critical"` \| `"normal"` = `...`

###### metadata.timeoutSeconds

`number` = `...`

###### outputRequirement

\{ `artifactType`: `string`; `layer`: `string`; `mustTraceTo`: `string`; `requiredRelationships?`: (`"tests"` \| `"derives-from"` \| `"implements"` \| `"documents"` \| `"conflicts-with"` \| `"shares-with"` \| `"depends-on"` \| `"versioned-from"`)[]; \} = `...`

Output requirement - what the worker must produce

###### outputRequirement.artifactType

`string` = `...`

Expected artifact type

###### outputRequirement.layer

`string` = `...`

Target layer for the artifact

###### outputRequirement.mustTraceTo

`string` = `...`

Must trace back to this UID

###### outputRequirement.requiredRelationships?

(`"tests"` \| `"derives-from"` \| `"implements"` \| `"documents"` \| `"conflicts-with"` \| `"shares-with"` \| `"depends-on"` \| `"versioned-from"`)[] = `...`

Required relationships to create

###### task

`string` = `...`

Task description

###### workOrderId

`string` = `...`

Unique work order ID

###### Returns

`string`

##### mintChildUid()

> **mintChildUid**(`parentUid`, `targetLayer`, `artifactType`, `idSuffix?`): `string`

Defined in: [packages/orchestrator/src/protocol/fractal-orchestration.ts:262](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/fractal-orchestration.ts#L262)

Mint a new child UID based on parent

###### Parameters

###### parentUid

`string`

###### targetLayer

`string`

###### artifactType

`string`

###### idSuffix?

`string`

###### Returns

`string`

##### parseUid()

> **parseUid**(`uid`): [`ParsedUid`](#parseduid)

Defined in: [packages/orchestrator/src/protocol/fractal-orchestration.ts:234](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/fractal-orchestration.ts#L234)

Parse a UID into its components

###### Parameters

###### uid

`string`

###### Returns

[`ParsedUid`](#parseduid)

##### processHandshakeResponse()

> **processHandshakeResponse**(`response`): `Promise`\<\{ `errors`: `string`[]; `verified`: `boolean`; `warnings`: `string`[]; \}\>

Defined in: [packages/orchestrator/src/protocol/fractal-orchestration.ts:570](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/fractal-orchestration.ts#L570)

Process a handshake response from Claude Worker

###### Parameters

###### response

###### artifacts

`object`[] = `...`

Artifacts created/modified

###### error?

`string` = `...`

Error if failed

###### execution?

\{ `durationMs`: `number`; `model`: `string`; `tokenUsage?`: \{ `input`: `number`; `output`: `number`; \}; \} = `...`

Execution metadata

###### execution.durationMs

`number` = `...`

Duration in milliseconds

###### execution.model

`string` = `...`

Model used

###### execution.tokenUsage?

\{ `input`: `number`; `output`: `number`; \} = `...`

Token usage

###### execution.tokenUsage.input

`number` = `...`

###### execution.tokenUsage.output

`number` = `...`

###### gitCommitHash?

`string` = `...`

Git commit hash for immutable audit log

###### mintedUid

`string` = `...`

Minted child UID

###### parentUid

`string` = `...`

Parent UID that was traced to

###### relationship

`"tests"` \| `"derives-from"` \| `"implements"` \| `"documents"` \| `"conflicts-with"` \| `"shares-with"` \| `"depends-on"` \| `"versioned-from"` = `...`

Relationship created

###### status

`"FAILED"` \| `"PARTIAL"` \| `"BLOCKED"` \| `"SUCCESS"` = `...`

Status

###### verification

\{ `e2eResults?`: \{ `failed`: `number`; `passed`: `number`; `skipped`: `number`; \}; `lintPass?`: `boolean`; `screenshotUrl?`: `string`; `testsPass?`: `boolean`; `traceVerified`: `boolean`; \} = `...`

Verification evidence

###### verification.e2eResults?

\{ `failed`: `number`; `passed`: `number`; `skipped`: `number`; \} = `...`

E2E test results

###### verification.e2eResults.failed

`number` = `...`

###### verification.e2eResults.passed

`number` = `...`

###### verification.e2eResults.skipped

`number` = `...`

###### verification.lintPass?

`boolean` = `...`

Lint/type checks pass

###### verification.screenshotUrl?

`string` = `...`

Screenshot URL from Puppeteer E2E verification (if UI layer)

###### verification.testsPass?

`boolean` = `...`

Unit/integration tests pass

###### verification.traceVerified

`boolean` = `...`

Trace verification confirmed

###### workOrderId

`string` = `...`

Work order ID being responded to

###### Returns

`Promise`\<\{ `errors`: `string`[]; `verified`: `boolean`; `warnings`: `string`[]; \}\>

##### validateTrace()

> **validateTrace**(`childUid`, `parentUid`): `boolean`

Defined in: [packages/orchestrator/src/protocol/fractal-orchestration.ts:288](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/fractal-orchestration.ts#L288)

Validate that a child UID correctly traces to parent

###### Parameters

###### childUid

`string`

###### parentUid

`string`

###### Returns

`boolean`

***

### OrchestrationAgent

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:319](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L319)

Orchestration Agent - Manages task execution and gate enforcement

#### Extends

- `ClaudeAgent`

#### Constructors

##### Constructor

> **new OrchestrationAgent**(`config`): [`OrchestrationAgent`](#orchestrationagent)

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:320](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L320)

###### Parameters

###### config

[`AgentConfig`](#agentconfig)

###### Returns

[`OrchestrationAgent`](#orchestrationagent)

###### Overrides

`ClaudeAgent.constructor`

#### Methods

##### checkGate()

> **checkGate**(`gateId`): `Promise`\<\{ `approvedBy?`: `string`; `passed`: `boolean`; `status`: `string`; \}\>

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:401](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L401)

Check gate status

###### Parameters

###### gateId

`string`

###### Returns

`Promise`\<\{ `approvedBy?`: `string`; `passed`: `boolean`; `status`: `string`; \}\>

##### dispatchTask()

> **dispatchTask**(`payload`): `Promise`\<\{ `error?`: `string`; `eventId?`: `string`; `success`: `boolean`; \}\>

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:378](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L378)

Dispatch a single task to a Claude worker

###### Parameters

###### payload

###### context_packet

\{ `api_contracts?`: `string`[]; `constraints?`: `string`[]; `design_specs?`: `string`[]; `requirements`: `string`[]; \} = `ContextPacketSchema`

Curated context for the agent

###### context_packet.api_contracts?

`string`[] = `...`

API contract UIDs or paths

###### context_packet.constraints?

`string`[] = `...`

Explicit constraints the agent must follow

###### context_packet.design_specs?

`string`[] = `...`

Design specification UIDs

###### context_packet.requirements

`string`[] = `...`

Requirement UIDs to implement

###### excluded_context?

`string`[] = `...`

Context explicitly excluded (prevents context poisoning)

###### founding_intent

`string` = `...`

High-level intent for the task

###### injected_tools?

`string`[] = `...`

MCP tools to inject for this task

###### namespace

`string` = `...`

Namespace (BUILD-TIME project identifier)

###### persona_scope

`string` = `...`

Persona scope for this task

###### target_layer

`string` = `...`

Layer being implemented

###### task_id

`string` = `...`

Unique task identifier

###### timeout_seconds

`number` = `...`

Maximum execution time in seconds

###### Returns

`Promise`\<\{ `error?`: `string`; `eventId?`: `string`; `success`: `boolean`; \}\>

##### execute()

> **execute**(`prompt`): `Promise`\<[`AgentResult`](#agentresult)\>

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:200](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L200)

Execute a query with this agent

###### Parameters

###### prompt

`string`

###### Returns

`Promise`\<[`AgentResult`](#agentresult)\>

###### Inherited from

`ClaudeAgent.execute`

##### orchestrate()

> **orchestrate**(`plan`): `Promise`\<\{ `blockedByGate`: `string` \| `null`; `completed`: `string`[]; `dispatched`: `string`[]; `failed`: `object`[]; `status`: `"completed"` \| `"failed"` \| `"blocked"` \| `"partial"`; \}\>

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:329](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L329)

Execute a plan, dispatching tasks and handling gates

###### Parameters

###### plan

[`PlanningResult`](#planningresult)

###### Returns

`Promise`\<\{ `blockedByGate`: `string` \| `null`; `completed`: `string`[]; `dispatched`: `string`[]; `failed`: `object`[]; `status`: `"completed"` \| `"failed"` \| `"blocked"` \| `"partial"`; \}\>

***

### Orchestrator

Defined in: [packages/orchestrator/src/orchestrator.ts:107](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/orchestrator.ts#L107)

#### Constructors

##### Constructor

> **new Orchestrator**(`graphClient`, `eventBus`, `config`): [`Orchestrator`](#orchestrator)

Defined in: [packages/orchestrator/src/orchestrator.ts:114](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/orchestrator.ts#L114)

###### Parameters

###### graphClient

`GraphClient`

###### eventBus

`EventBus`

###### config

`Partial`\<[`OrchestratorConfig`](#orchestratorconfig)\> & `object`

###### Returns

[`Orchestrator`](#orchestrator)

#### Methods

##### getStats()

> **getStats**(): [`OrchestratorStats`](#orchestratorstats)

Defined in: [packages/orchestrator/src/orchestrator.ts:306](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/orchestrator.ts#L306)

Get current orchestrator stats

###### Returns

[`OrchestratorStats`](#orchestratorstats)

##### handleCompletion()

> **handleCompletion**(`signal`): `Promise`\<`void`\>

Defined in: [packages/orchestrator/src/orchestrator.ts:269](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/orchestrator.ts#L269)

Handle completion signal from Claude SDK

###### Parameters

###### signal

###### artifacts_created

`string`[] = `...`

Files created during implementation

###### artifacts_modified?

`string`[] = `...`

Files modified during implementation

###### blocked_reason?

`string` = `...`

Blocking reason if BLOCKED

###### dependencies?

`string`[] = `...`

Dependencies added

###### error?

`string` = `...`

Error message if failed

###### execution_time_seconds?

`number` = `...`

Execution time in seconds

###### git_commit?

`string` = `...`

Git commit SHA

###### pending_gate_id?

`string` = `...`

Gate ID if waiting for approval

###### status

`"COMPLETED"` \| `"FAILED"` \| `"PARTIAL"` \| `"BLOCKED"` = `...`

Completion status

###### task_id

`string` = `...`

Task ID that was completed

###### verification_evidence?

\{ `integration_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `screenshot?`: `string`; `static_analysis?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `unit_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; \} = `...`

Verification evidence

###### verification_evidence.integration_tests?

`"FAILED"` \| `"PASSED"` \| `"SKIPPED"` = `...`

Integration test status

###### verification_evidence.screenshot?

`string` = `...`

Screenshot URL for visual verification

###### verification_evidence.static_analysis?

`"FAILED"` \| `"PASSED"` \| `"SKIPPED"` = `...`

Lint/typecheck status

###### verification_evidence.unit_tests?

`"FAILED"` \| `"PASSED"` \| `"SKIPPED"` = `...`

Unit test status

###### Returns

`Promise`\<`void`\>

##### planAndDispatch()

> **planAndDispatch**(`requirementUids`, `personaScope`, `foundingIntent`): `Promise`\<[`TaskDispatchResult`](#taskdispatchresult)[]\>

Defined in: [packages/orchestrator/src/orchestrator.ts:136](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/orchestrator.ts#L136)

Plan and dispatch tasks for a set of requirements

###### Parameters

###### requirementUids

`string`[]

###### personaScope

`string`

###### foundingIntent

`string`

###### Returns

`Promise`\<[`TaskDispatchResult`](#taskdispatchresult)[]\>

***

### PlanningAgent

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:276](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L276)

Planning Agent - Analyzes requirements and creates execution plans

#### Extends

- `ClaudeAgent`

#### Constructors

##### Constructor

> **new PlanningAgent**(`config`): [`PlanningAgent`](#planningagent)

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:277](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L277)

###### Parameters

###### config

[`AgentConfig`](#agentconfig)

###### Returns

[`PlanningAgent`](#planningagent)

###### Overrides

`ClaudeAgent.constructor`

#### Methods

##### execute()

> **execute**(`prompt`): `Promise`\<[`AgentResult`](#agentresult)\>

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:200](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L200)

Execute a query with this agent

###### Parameters

###### prompt

`string`

###### Returns

`Promise`\<[`AgentResult`](#agentresult)\>

###### Inherited from

`ClaudeAgent.execute`

##### plan()

> **plan**(`requirements`, `personaScope`, `intent`): `Promise`\<[`PlanningResult`](#planningresult)\>

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:284](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L284)

Create an execution plan for the given requirements

###### Parameters

###### requirements

`string`[]

###### personaScope

`string`

###### intent

`string`

###### Returns

`Promise`\<[`PlanningResult`](#planningresult)\>

***

### PostTaskVerifier

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:87](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L87)

Verifies task completion against the Fractal Orchestration Protocol

#### Constructors

##### Constructor

> **new PostTaskVerifier**(`graphClient`, `eventBus`, `config`): [`PostTaskVerifier`](#posttaskverifier)

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:93](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L93)

###### Parameters

###### graphClient

`GraphClient`

###### eventBus

`EventBus`

###### config

[`VerificationConfig`](#verificationconfig)

###### Returns

[`PostTaskVerifier`](#posttaskverifier)

#### Methods

##### verify()

> **verify**(`workOrder`, `response`): `Promise`\<[`VerificationResult`](#verificationresult)\>

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:111](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L111)

Verify a handshake response from Claude Worker

###### Parameters

###### workOrder

###### inputContext

\{ `excludedContexts?`: `string`[]; `parentUid`: `string`; `personaConstraints`: `string`[]; `relatedUids?`: `string`[]; `requiredMcpTools`: `string`[]; \} = `...`

Input context - the bounded scope

###### inputContext.excludedContexts?

`string`[] = `...`

Excluded contexts (prevent context poisoning)

###### inputContext.parentUid

`string` = `...`

Parent UID - the anchor for traceability

###### inputContext.personaConstraints

`string`[] = `...`

Persona-specific constraints (e.g., WCAG requirements)

###### inputContext.relatedUids?

`string`[] = `...`

Related UIDs for cross-referencing

###### inputContext.requiredMcpTools

`string`[] = `...`

Required MCP tools for this task

###### metadata

\{ `foundingIntent`: `string`; `namespace`: `string`; `personaScope`: `string`; `priority`: `"low"` \| `"high"` \| `"critical"` \| `"normal"`; `timeoutSeconds`: `number`; \} = `...`

Metadata

###### metadata.foundingIntent

`string` = `...`

###### metadata.namespace

`string` = `...`

###### metadata.personaScope

`string` = `...`

###### metadata.priority

`"low"` \| `"high"` \| `"critical"` \| `"normal"` = `...`

###### metadata.timeoutSeconds

`number` = `...`

###### outputRequirement

\{ `artifactType`: `string`; `layer`: `string`; `mustTraceTo`: `string`; `requiredRelationships?`: (`"tests"` \| `"derives-from"` \| `"implements"` \| `"documents"` \| `"conflicts-with"` \| `"shares-with"` \| `"depends-on"` \| `"versioned-from"`)[]; \} = `...`

Output requirement - what the worker must produce

###### outputRequirement.artifactType

`string` = `...`

Expected artifact type

###### outputRequirement.layer

`string` = `...`

Target layer for the artifact

###### outputRequirement.mustTraceTo

`string` = `...`

Must trace back to this UID

###### outputRequirement.requiredRelationships?

(`"tests"` \| `"derives-from"` \| `"implements"` \| `"documents"` \| `"conflicts-with"` \| `"shares-with"` \| `"depends-on"` \| `"versioned-from"`)[] = `...`

Required relationships to create

###### task

`string` = `...`

Task description

###### workOrderId

`string` = `...`

Unique work order ID

###### response

###### artifacts

`object`[] = `...`

Artifacts created/modified

###### error?

`string` = `...`

Error if failed

###### execution?

\{ `durationMs`: `number`; `model`: `string`; `tokenUsage?`: \{ `input`: `number`; `output`: `number`; \}; \} = `...`

Execution metadata

###### execution.durationMs

`number` = `...`

Duration in milliseconds

###### execution.model

`string` = `...`

Model used

###### execution.tokenUsage?

\{ `input`: `number`; `output`: `number`; \} = `...`

Token usage

###### execution.tokenUsage.input

`number` = `...`

###### execution.tokenUsage.output

`number` = `...`

###### gitCommitHash?

`string` = `...`

Git commit hash for immutable audit log

###### mintedUid

`string` = `...`

Minted child UID

###### parentUid

`string` = `...`

Parent UID that was traced to

###### relationship

`"tests"` \| `"derives-from"` \| `"implements"` \| `"documents"` \| `"conflicts-with"` \| `"shares-with"` \| `"depends-on"` \| `"versioned-from"` = `...`

Relationship created

###### status

`"FAILED"` \| `"PARTIAL"` \| `"BLOCKED"` \| `"SUCCESS"` = `...`

Status

###### verification

\{ `e2eResults?`: \{ `failed`: `number`; `passed`: `number`; `skipped`: `number`; \}; `lintPass?`: `boolean`; `screenshotUrl?`: `string`; `testsPass?`: `boolean`; `traceVerified`: `boolean`; \} = `...`

Verification evidence

###### verification.e2eResults?

\{ `failed`: `number`; `passed`: `number`; `skipped`: `number`; \} = `...`

E2E test results

###### verification.e2eResults.failed

`number` = `...`

###### verification.e2eResults.passed

`number` = `...`

###### verification.e2eResults.skipped

`number` = `...`

###### verification.lintPass?

`boolean` = `...`

Lint/type checks pass

###### verification.screenshotUrl?

`string` = `...`

Screenshot URL from Puppeteer E2E verification (if UI layer)

###### verification.testsPass?

`boolean` = `...`

Unit/integration tests pass

###### verification.traceVerified

`boolean` = `...`

Trace verification confirmed

###### workOrderId

`string` = `...`

Work order ID being responded to

###### Returns

`Promise`\<[`VerificationResult`](#verificationresult)\>

## Interfaces

### AgentConfig

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:18](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L18)

#### Properties

##### apiKey?

> `optional` **apiKey**: `string`

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:20](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L20)

Anthropic API key

##### eventBus

> **eventBus**: `EventBus`

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:26](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L26)

Event bus for Redis communication

##### graphClient

> **graphClient**: `GraphClient`

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:24](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L24)

Graph client for Neo4j queries

##### maxTurns?

> `optional` **maxTurns**: `number`

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:32](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L32)

Maximum turns per query

##### model?

> `optional` **model**: `string`

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:22](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L22)

Model to use (default: claude-sonnet-4-20250514)

##### namespace

> **namespace**: `string`

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:28](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L28)

Tenant ID

##### workDir?

> `optional` **workDir**: `string`

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:30](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L30)

Working directory

***

### AgentResult

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:42](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L42)

#### Properties

##### data

> **data**: `unknown`

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:44](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L44)

##### error?

> `optional` **error**: `string`

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:45](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L45)

##### sessionId?

> `optional` **sessionId**: `string`

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:46](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L46)

##### success

> **success**: `boolean`

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:43](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L43)

***

### CascadeCoordinatorConfig

Defined in: [packages/orchestrator/src/cascade/cascade-coordinator.ts:31](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/cascade/cascade-coordinator.ts#L31)

#### Properties

##### eventBus

> **eventBus**: `EventBus`

Defined in: [packages/orchestrator/src/cascade/cascade-coordinator.ts:34](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/cascade/cascade-coordinator.ts#L34)

##### graphClient

> **graphClient**: `GraphClient`

Defined in: [packages/orchestrator/src/cascade/cascade-coordinator.ts:33](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/cascade/cascade-coordinator.ts#L33)

##### mcpClient?

> `optional` **mcpClient**: [`MCPClientInterface`](#mcpclientinterface)

Defined in: [packages/orchestrator/src/cascade/cascade-coordinator.ts:35](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/cascade/cascade-coordinator.ts#L35)

##### namespace

> **namespace**: `string`

Defined in: [packages/orchestrator/src/cascade/cascade-coordinator.ts:32](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/cascade/cascade-coordinator.ts#L32)

***

### CuratedContext

Defined in: [packages/orchestrator/src/context/curator.ts:32](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/context/curator.ts#L32)

#### Properties

##### estimatedTokens

> **estimatedTokens**: `number`

Defined in: [packages/orchestrator/src/context/curator.ts:40](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/context/curator.ts#L40)

Token estimate for the context

##### excluded

> **excluded**: `string`[]

Defined in: [packages/orchestrator/src/context/curator.ts:38](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/context/curator.ts#L38)

Excluded contexts (for audit)

##### packet

> **packet**: `object`

Defined in: [packages/orchestrator/src/context/curator.ts:34](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/context/curator.ts#L34)

The context packet to send

###### api\_contracts?

> `optional` **api\_contracts**: `string`[]

API contract UIDs or paths

###### constraints?

> `optional` **constraints**: `string`[]

Explicit constraints the agent must follow

###### design\_specs?

> `optional` **design\_specs**: `string`[]

Design specification UIDs

###### requirements

> **requirements**: `string`[]

Requirement UIDs to implement

##### tools

> **tools**: `string`[]

Defined in: [packages/orchestrator/src/context/curator.ts:36](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/context/curator.ts#L36)

Tools to inject

***

### CuratorConfig

Defined in: [packages/orchestrator/src/context/curator.ts:21](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/context/curator.ts#L21)

#### Properties

##### includeRelated

> **includeRelated**: `boolean`

Defined in: [packages/orchestrator/src/context/curator.ts:25](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/context/curator.ts#L25)

Whether to include related artifacts (dependencies)

##### maxArtifacts

> **maxArtifacts**: `number`

Defined in: [packages/orchestrator/src/context/curator.ts:23](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/context/curator.ts#L23)

Maximum artifacts to include in context

##### relationshipDepth

> **relationshipDepth**: `number`

Defined in: [packages/orchestrator/src/context/curator.ts:27](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/context/curator.ts#L27)

Depth of relationship traversal

##### toolRules

> **toolRules**: `object`[]

Defined in: [packages/orchestrator/src/context/curator.ts:29](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/context/curator.ts#L29)

Tool injection rules

###### condition

> **condition**: `object`

Condition to match

###### condition.domain?

> `optional` **domain**: `string`

###### condition.layer?

> `optional` **layer**: `string`

###### condition.persona?

> `optional` **persona**: `string`

###### exclude\_tools?

> `optional` **exclude\_tools**: `string`[]

Tools to exclude when condition matches

###### tools

> **tools**: `string`[]

Tools to inject when condition matches

***

### GateApprovalEvent

Defined in: [packages/orchestrator/src/cascade/cascade-coordinator.ts:20](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/cascade/cascade-coordinator.ts#L20)

#### Properties

##### namespace

> **namespace**: `string`

Defined in: [packages/orchestrator/src/cascade/cascade-coordinator.ts:22](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/cascade/cascade-coordinator.ts#L22)

##### payload

> **payload**: `object`

Defined in: [packages/orchestrator/src/cascade/cascade-coordinator.ts:23](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/cascade/cascade-coordinator.ts#L23)

###### approvals?

> `optional` **approvals**: `object`[]

###### conditions?

> `optional` **conditions**: `string`[]

###### gateNumber

> **gateNumber**: `number`

###### gateRequestId

> **gateRequestId**: `string`

##### type

> **type**: `string`

Defined in: [packages/orchestrator/src/cascade/cascade-coordinator.ts:21](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/cascade/cascade-coordinator.ts#L21)

***

### MCPClientInterface

Defined in: [packages/orchestrator/src/cascade/cascade-coordinator.ts:39](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/cascade/cascade-coordinator.ts#L39)

#### Methods

##### callTool()

> **callTool**(`name`, `args`): `Promise`\<`unknown`\>

Defined in: [packages/orchestrator/src/cascade/cascade-coordinator.ts:40](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/cascade/cascade-coordinator.ts#L40)

###### Parameters

###### name

`string`

###### args

`Record`\<`string`, `unknown`\>

###### Returns

`Promise`\<`unknown`\>

***

### OrchestratorConfig

Defined in: [packages/orchestrator/src/orchestrator.ts:30](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/orchestrator.ts#L30)

#### Properties

##### defaultTimeoutSeconds

> **defaultTimeoutSeconds**: `number`

Defined in: [packages/orchestrator/src/orchestrator.ts:40](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/orchestrator.ts#L40)

Default timeout for tasks in seconds

##### googleApiKey?

> `optional` **googleApiKey**: `string`

Defined in: [packages/orchestrator/src/orchestrator.ts:36](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/orchestrator.ts#L36)

Google API key for Gemini

##### maxConcurrentTasks

> **maxConcurrentTasks**: `number`

Defined in: [packages/orchestrator/src/orchestrator.ts:38](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/orchestrator.ts#L38)

Maximum concurrent tasks

##### namespace

> **namespace**: `string`

Defined in: [packages/orchestrator/src/orchestrator.ts:32](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/orchestrator.ts#L32)

Tenant ID for multi-tenant isolation

##### temporalAddress?

> `optional` **temporalAddress**: `string`

Defined in: [packages/orchestrator/src/orchestrator.ts:34](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/orchestrator.ts#L34)

Temporal server address

##### useTemporalDurability

> **useTemporalDurability**: `boolean`

Defined in: [packages/orchestrator/src/orchestrator.ts:42](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/orchestrator.ts#L42)

Whether to use Temporal for durability

***

### OrchestratorStats

Defined in: [packages/orchestrator/src/orchestrator.ts:51](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/orchestrator.ts#L51)

#### Properties

##### averageExecutionTime

> **averageExecutionTime**: `number`

Defined in: [packages/orchestrator/src/orchestrator.ts:56](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/orchestrator.ts#L56)

##### completedTasks

> **completedTasks**: `number`

Defined in: [packages/orchestrator/src/orchestrator.ts:54](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/orchestrator.ts#L54)

##### executingTasks

> **executingTasks**: `number`

Defined in: [packages/orchestrator/src/orchestrator.ts:53](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/orchestrator.ts#L53)

##### failedTasks

> **failedTasks**: `number`

Defined in: [packages/orchestrator/src/orchestrator.ts:55](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/orchestrator.ts#L55)

##### pendingTasks

> **pendingTasks**: `number`

Defined in: [packages/orchestrator/src/orchestrator.ts:52](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/orchestrator.ts#L52)

***

### ParsedUid

Defined in: [packages/orchestrator/src/protocol/fractal-orchestration.ts:34](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/fractal-orchestration.ts#L34)

#### Properties

##### id

> **id**: `string`

Defined in: [packages/orchestrator/src/protocol/fractal-orchestration.ts:40](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/fractal-orchestration.ts#L40)

##### layer

> **layer**: `string`

Defined in: [packages/orchestrator/src/protocol/fractal-orchestration.ts:37](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/fractal-orchestration.ts#L37)

##### namespace

> **namespace**: `string`

Defined in: [packages/orchestrator/src/protocol/fractal-orchestration.ts:36](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/fractal-orchestration.ts#L36)

##### personaScope

> **personaScope**: `string`

Defined in: [packages/orchestrator/src/protocol/fractal-orchestration.ts:39](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/fractal-orchestration.ts#L39)

##### scheme

> **scheme**: `"cpe"`

Defined in: [packages/orchestrator/src/protocol/fractal-orchestration.ts:35](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/fractal-orchestration.ts#L35)

##### type

> **type**: `string`

Defined in: [packages/orchestrator/src/protocol/fractal-orchestration.ts:38](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/fractal-orchestration.ts#L38)

##### version?

> `optional` **version**: `string`

Defined in: [packages/orchestrator/src/protocol/fractal-orchestration.ts:41](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/fractal-orchestration.ts#L41)

***

### PlanningResult

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:35](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L35)

#### Properties

##### estimatedTime

> **estimatedTime**: `number`

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:39](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L39)

##### gatesRequired

> **gatesRequired**: `string`[]

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:38](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L38)

##### layerOrder

> **layerOrder**: `string`[]

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:37](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L37)

##### tasks

> **tasks**: `object`[]

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:36](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L36)

###### context\_packet

> **context\_packet**: `object` = `ContextPacketSchema`

Curated context for the agent

###### context\_packet.api\_contracts?

> `optional` **api\_contracts**: `string`[]

API contract UIDs or paths

###### context\_packet.constraints?

> `optional` **constraints**: `string`[]

Explicit constraints the agent must follow

###### context\_packet.design\_specs?

> `optional` **design\_specs**: `string`[]

Design specification UIDs

###### context\_packet.requirements

> **requirements**: `string`[]

Requirement UIDs to implement

###### excluded\_context?

> `optional` **excluded\_context**: `string`[]

Context explicitly excluded (prevents context poisoning)

###### founding\_intent

> **founding\_intent**: `string`

High-level intent for the task

###### injected\_tools?

> `optional` **injected\_tools**: `string`[]

MCP tools to inject for this task

###### namespace

> **namespace**: `string`

Namespace (BUILD-TIME project identifier)

###### persona\_scope

> **persona\_scope**: `string`

Persona scope for this task

###### target\_layer

> **target\_layer**: `string`

Layer being implemented

###### task\_id

> **task\_id**: `string`

Unique task identifier

###### timeout\_seconds

> **timeout\_seconds**: `number`

Maximum execution time in seconds

***

### TaskDispatchResult

Defined in: [packages/orchestrator/src/orchestrator.ts:45](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/orchestrator.ts#L45)

#### Properties

##### reason?

> `optional` **reason**: `string`

Defined in: [packages/orchestrator/src/orchestrator.ts:48](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/orchestrator.ts#L48)

##### status

> **status**: `"rejected"` \| `"dispatched"` \| `"queued"`

Defined in: [packages/orchestrator/src/orchestrator.ts:47](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/orchestrator.ts#L47)

##### taskId

> **taskId**: `string`

Defined in: [packages/orchestrator/src/orchestrator.ts:46](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/orchestrator.ts#L46)

***

### VerificationAction

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:56](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L56)

#### Properties

##### completed

> **completed**: `boolean`

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:62](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L62)

Completed

##### description

> **description**: `string`

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:60](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L60)

Action description

##### result?

> `optional` **result**: `string`

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:64](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L64)

Result

##### type

> **type**: `"alert"` \| `"reject"` \| `"auto_fix"` \| `"manual_review"`

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:58](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L58)

Action type

***

### VerificationCheck

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:43](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L43)

#### Properties

##### description

> **description**: `string`

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:47](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L47)

Check description

##### details?

> `optional` **details**: `string`

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:51](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L51)

Details

##### name

> **name**: `string`

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:45](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L45)

Check name

##### passed

> **passed**: `boolean`

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:49](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L49)

Pass/fail

##### severity?

> `optional` **severity**: `"warning"` \| `"info"` \| `"critical"`

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:53](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L53)

Severity if failed

***

### VerificationConfig

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:67](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L67)

#### Properties

##### alertOnWarnings

> **alertOnWarnings**: `boolean`

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:75](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L75)

Alert on warnings

##### autoFix

> **autoFix**: `boolean`

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:73](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L73)

Auto-fix minor issues

##### minScore

> **minScore**: `number`

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:77](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L77)

Required minimum score to proceed

##### namespace

> **namespace**: `string`

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:69](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L69)

Namespace (BUILD-TIME project identifier)

##### strictMode

> **strictMode**: `boolean`

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:71](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L71)

Strict mode - reject on any failure

***

### VerificationResult

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:26](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L26)

#### Properties

##### actions

> **actions**: [`VerificationAction`](#verificationaction)[]

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:36](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L36)

Actions taken

##### canProceed

> **canProceed**: `boolean`

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:40](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L40)

Can proceed to next step

##### checks

> **checks**: [`VerificationCheck`](#verificationcheck)[]

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:34](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L34)

Checks performed

##### mintedUid

> **mintedUid**: `string`

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:32](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L32)

Minted UID from worker

##### score

> **score**: `number`

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:38](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L38)

Score (0-100)

##### status

> **status**: `"PARTIAL"` \| `"REJECTED"` \| `"VERIFIED"`

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:28](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L28)

Overall verification status

##### workOrderId

> **workOrderId**: `string`

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:30](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L30)

Work order ID

## Type Aliases

### CompletionSignal

> **CompletionSignal** = `z.infer`\<*typeof* [`CompletionSignalSchema`](#completionsignalschema)\>

Defined in: [packages/orchestrator/src/interfaces/contracts.ts:151](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/interfaces/contracts.ts#L151)

***

### ContextPacket

> **ContextPacket** = `z.infer`\<*typeof* [`ContextPacketSchema`](#contextpacketschema)\>

Defined in: [packages/orchestrator/src/interfaces/contracts.ts:35](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/interfaces/contracts.ts#L35)

***

### FeatureItem

> **FeatureItem** = `z.infer`\<*typeof* [`FeatureItemSchema`](#featureitemschema)\>

Defined in: [packages/orchestrator/src/interfaces/contracts.ts:85](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/interfaces/contracts.ts#L85)

***

### FeatureList

> **FeatureList** = `z.infer`\<*typeof* [`FeatureListSchema`](#featurelistschema)\>

Defined in: [packages/orchestrator/src/interfaces/contracts.ts:101](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/interfaces/contracts.ts#L101)

***

### HandshakeResponse

> **HandshakeResponse** = `z.infer`\<*typeof* [`HandshakeResponseSchema`](#handshakeresponseschema)\>

Defined in: [packages/orchestrator/src/protocol/fractal-orchestration.ts:203](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/fractal-orchestration.ts#L203)

***

### TaskPayload

> **TaskPayload** = `z.infer`\<*typeof* [`TaskPayloadSchema`](#taskpayloadschema)\>

Defined in: [packages/orchestrator/src/interfaces/contracts.ts:61](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/interfaces/contracts.ts#L61)

***

### TaskRecord

> **TaskRecord** = `z.infer`\<*typeof* [`TaskRecordSchema`](#taskrecordschema)\>

Defined in: [packages/orchestrator/src/interfaces/contracts.ts:198](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/interfaces/contracts.ts#L198)

***

### TaskState

> **TaskState** = `z.infer`\<*typeof* [`TaskStateSchema`](#taskstateschema)\>

Defined in: [packages/orchestrator/src/interfaces/contracts.ts:172](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/interfaces/contracts.ts#L172)

***

### ToolInjectionRule

> **ToolInjectionRule** = `z.infer`\<*typeof* [`ToolInjectionRuleSchema`](#toolinjectionruleschema)\>

Defined in: [packages/orchestrator/src/interfaces/contracts.ts:220](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/interfaces/contracts.ts#L220)

***

### VerificationEvidence

> **VerificationEvidence** = `z.infer`\<*typeof* [`VerificationEvidenceSchema`](#verificationevidenceschema)\>

Defined in: [packages/orchestrator/src/interfaces/contracts.ts:121](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/interfaces/contracts.ts#L121)

***

### WorkOrder

> **WorkOrder** = `z.infer`\<*typeof* [`WorkOrderSchema`](#workorderschema)\>

Defined in: [packages/orchestrator/src/protocol/fractal-orchestration.ts:123](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/fractal-orchestration.ts#L123)

## Variables

### BACKEND\_SYSTEM\_PROMPT

> `const` **BACKEND\_SYSTEM\_PROMPT**: "You are the Backend Implementation Agent.\n\nCONSTRAINTS:\n1. ALWAYS include tenant\_id in all database queries (RLS).\n2. Follow the API contract exactly as specified in OpenAPI.\n3. Include //@trace \{UID\} comments in all generated code.\n4. Do not expose internal implementation details in error messages.\n\nWORKFLOW:\n1. Read the API contract from the context packet\n2. Implement the endpoint following the spec\n3. Add Row-Level Security middleware\n4. Write unit tests\n5. Git commit with conventional commit message"

Defined in: [packages/orchestrator/src/interfaces/contracts.ts:277](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/interfaces/contracts.ts#L277)

System prompt for Claude SDK when implementing backend

***

### cancelSignal

> `const` **cancelSignal**: `SignalDefinition`\<\[\], `"cancel"`\>

Defined in: [packages/orchestrator/src/temporal/workflows.ts:56](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/temporal/workflows.ts#L56)

Signal to cancel the workflow

***

### CompletionSignalSchema

> `const` **CompletionSignalSchema**: `ZodObject`\<\{ `artifacts_created`: `ZodArray`\<`ZodString`, `"many"`\>; `artifacts_modified`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; `blocked_reason`: `ZodOptional`\<`ZodString`\>; `dependencies`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; `error`: `ZodOptional`\<`ZodString`\>; `execution_time_seconds`: `ZodOptional`\<`ZodNumber`\>; `git_commit`: `ZodOptional`\<`ZodString`\>; `pending_gate_id`: `ZodOptional`\<`ZodString`\>; `status`: `ZodEnum`\<\[`"COMPLETED"`, `"FAILED"`, `"PARTIAL"`, `"BLOCKED"`\]\>; `task_id`: `ZodString`; `verification_evidence`: `ZodOptional`\<`ZodObject`\<\{ `integration_tests`: `ZodOptional`\<`ZodEnum`\<\[`"PASSED"`, `"FAILED"`, `"SKIPPED"`\]\>\>; `screenshot`: `ZodOptional`\<`ZodString`\>; `static_analysis`: `ZodOptional`\<`ZodEnum`\<\[`"PASSED"`, `"FAILED"`, `"SKIPPED"`\]\>\>; `unit_tests`: `ZodOptional`\<`ZodEnum`\<\[`"PASSED"`, `"FAILED"`, `"SKIPPED"`\]\>\>; \}, `"strip"`, `ZodTypeAny`, \{ `integration_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `screenshot?`: `string`; `static_analysis?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `unit_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; \}, \{ `integration_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `screenshot?`: `string`; `static_analysis?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `unit_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; \}\>\>; \}, `"strip"`, `ZodTypeAny`, \{ `artifacts_created`: `string`[]; `artifacts_modified?`: `string`[]; `blocked_reason?`: `string`; `dependencies?`: `string`[]; `error?`: `string`; `execution_time_seconds?`: `number`; `git_commit?`: `string`; `pending_gate_id?`: `string`; `status`: `"COMPLETED"` \| `"FAILED"` \| `"PARTIAL"` \| `"BLOCKED"`; `task_id`: `string`; `verification_evidence?`: \{ `integration_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `screenshot?`: `string`; `static_analysis?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `unit_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; \}; \}, \{ `artifacts_created`: `string`[]; `artifacts_modified?`: `string`[]; `blocked_reason?`: `string`; `dependencies?`: `string`[]; `error?`: `string`; `execution_time_seconds?`: `number`; `git_commit?`: `string`; `pending_gate_id?`: `string`; `status`: `"COMPLETED"` \| `"FAILED"` \| `"PARTIAL"` \| `"BLOCKED"`; `task_id`: `string`; `verification_evidence?`: \{ `integration_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `screenshot?`: `string`; `static_analysis?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `unit_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; \}; \}\>

Defined in: [packages/orchestrator/src/interfaces/contracts.ts:126](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/interfaces/contracts.ts#L126)

Completion signal sent from Claude Worker back to Orchestrator

***

### ContextPacketSchema

> `const` **ContextPacketSchema**: `ZodObject`\<\{ `api_contracts`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; `constraints`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; `design_specs`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; `requirements`: `ZodArray`\<`ZodString`, `"many"`\>; \}, `"strip"`, `ZodTypeAny`, \{ `api_contracts?`: `string`[]; `constraints?`: `string`[]; `design_specs?`: `string`[]; `requirements`: `string`[]; \}, \{ `api_contracts?`: `string`[]; `constraints?`: `string`[]; `design_specs?`: `string`[]; `requirements`: `string`[]; \}\>

Defined in: [packages/orchestrator/src/interfaces/contracts.ts:24](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/interfaces/contracts.ts#L24)

The context packet sent from Orchestrator to Claude Worker when dispatching a task.
This creates a "bounded context" to prevent hallucination.

***

### DEFAULT\_TOOL\_INJECTION\_RULES

> `const` **DEFAULT\_TOOL\_INJECTION\_RULES**: [`ToolInjectionRule`](#toolinjectionrule)[]

Defined in: [packages/orchestrator/src/interfaces/contracts.ts:225](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/interfaces/contracts.ts#L225)

Default tool injection rules

***

### FeatureItemSchema

> `const` **FeatureItemSchema**: `ZodObject`\<\{ `category`: `ZodEnum`\<\[`"functional"`, `"ui"`, `"api"`, `"data"`, `"security"`, `"test"`\]\>; `description`: `ZodString`; `error`: `ZodOptional`\<`ZodString`\>; `passes`: `ZodDefault`\<`ZodBoolean`\>; `steps`: `ZodArray`\<`ZodString`, `"many"`\>; `trace_id`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `category`: `"functional"` \| `"ui"` \| `"api"` \| `"data"` \| `"security"` \| `"test"`; `description`: `string`; `error?`: `string`; `passes`: `boolean`; `steps`: `string`[]; `trace_id`: `string`; \}, \{ `category`: `"functional"` \| `"ui"` \| `"api"` \| `"data"` \| `"security"` \| `"test"`; `description`: `string`; `error?`: `string`; `passes?`: `boolean`; `steps`: `string`[]; `trace_id`: `string`; \}\>

Defined in: [packages/orchestrator/src/interfaces/contracts.ts:70](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/interfaces/contracts.ts#L70)

Individual feature item in the Claude SDK coding loop

***

### FeatureListSchema

> `const` **FeatureListSchema**: `ZodObject`\<\{ `current_index`: `ZodDefault`\<`ZodNumber`\>; `features`: `ZodArray`\<`ZodObject`\<\{ `category`: `ZodEnum`\<\[`"functional"`, `"ui"`, `"api"`, `"data"`, `"security"`, `"test"`\]\>; `description`: `ZodString`; `error`: `ZodOptional`\<`ZodString`\>; `passes`: `ZodDefault`\<`ZodBoolean`\>; `steps`: `ZodArray`\<`ZodString`, `"many"`\>; `trace_id`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `category`: `"functional"` \| `"ui"` \| `"api"` \| `"data"` \| `"security"` \| `"test"`; `description`: `string`; `error?`: `string`; `passes`: `boolean`; `steps`: `string`[]; `trace_id`: `string`; \}, \{ `category`: `"functional"` \| `"ui"` \| `"api"` \| `"data"` \| `"security"` \| `"test"`; `description`: `string`; `error?`: `string`; `passes?`: `boolean`; `steps`: `string`[]; `trace_id`: `string`; \}\>, `"many"`\>; `progress_percent`: `ZodDefault`\<`ZodNumber`\>; `task_id`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `current_index`: `number`; `features`: `object`[]; `progress_percent`: `number`; `task_id`: `string`; \}, \{ `current_index?`: `number`; `features`: `object`[]; `progress_percent?`: `number`; `task_id`: `string`; \}\>

Defined in: [packages/orchestrator/src/interfaces/contracts.ts:90](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/interfaces/contracts.ts#L90)

Full feature list for a task

***

### FRONTEND\_SYSTEM\_PROMPT

> `const` **FRONTEND\_SYSTEM\_PROMPT**: "You are the Frontend Implementation Agent.\n\nCONSTRAINTS:\n1. DO NOT generate UI component code from your internal training data.\n2. ALWAYS use the \`shadcn\_lookup\` tool to retrieve the component source.\n3. Cross-reference component properties against the Persona's accessibility requirements.\n4. Follow the design specifications exactly - do not improvise.\n\nWORKFLOW:\n1. Read the requirement from the context packet\n2. Use shadcn\_lookup to fetch component code\n3. Adapt the code to match the user story\n4. Run \`npx shadcn@latest add \<component\>\` if needed\n5. Write the file with //@trace \{UID\} comment\n6. Run tests and take screenshot for verification\n7. Git commit with conventional commit message"

Defined in: [packages/orchestrator/src/interfaces/contracts.ts:257](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/interfaces/contracts.ts#L257)

System prompt for Claude SDK when implementing frontend

***

### gateApprovedSignal

> `const` **gateApprovedSignal**: `SignalDefinition`\<\[`string`\], `string`\>

Defined in: [packages/orchestrator/src/temporal/workflows.ts:59](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/temporal/workflows.ts#L59)

Signal when a gate is approved

***

### HandshakeResponseSchema

> `const` **HandshakeResponseSchema**: `ZodObject`\<\{ `artifacts`: `ZodArray`\<`ZodObject`\<\{ `checksum`: `ZodOptional`\<`ZodString`\>; `filePath`: `ZodString`; `loc`: `ZodOptional`\<`ZodNumber`\>; `traceUid`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `checksum?`: `string`; `filePath`: `string`; `loc?`: `number`; `traceUid`: `string`; \}, \{ `checksum?`: `string`; `filePath`: `string`; `loc?`: `number`; `traceUid`: `string`; \}\>, `"many"`\>; `error`: `ZodOptional`\<`ZodString`\>; `execution`: `ZodOptional`\<`ZodObject`\<\{ `durationMs`: `ZodNumber`; `model`: `ZodString`; `tokenUsage`: `ZodOptional`\<`ZodObject`\<\{ `input`: `ZodNumber`; `output`: `ZodNumber`; \}, `"strip"`, `ZodTypeAny`, \{ `input`: `number`; `output`: `number`; \}, \{ `input`: `number`; `output`: `number`; \}\>\>; \}, `"strip"`, `ZodTypeAny`, \{ `durationMs`: `number`; `model`: `string`; `tokenUsage?`: \{ `input`: `number`; `output`: `number`; \}; \}, \{ `durationMs`: `number`; `model`: `string`; `tokenUsage?`: \{ `input`: `number`; `output`: `number`; \}; \}\>\>; `gitCommitHash`: `ZodOptional`\<`ZodString`\>; `mintedUid`: `ZodString`; `parentUid`: `ZodString`; `relationship`: `ZodEnum`\<\[`"derives-from"`, `"implements"`, `"tests"`, `"documents"`, `"conflicts-with"`, `"shares-with"`, `"depends-on"`, `"versioned-from"`\]\>; `status`: `ZodEnum`\<\[`"SUCCESS"`, `"PARTIAL"`, `"FAILED"`, `"BLOCKED"`\]\>; `verification`: `ZodObject`\<\{ `e2eResults`: `ZodOptional`\<`ZodObject`\<\{ `failed`: `ZodNumber`; `passed`: `ZodNumber`; `skipped`: `ZodNumber`; \}, `"strip"`, `ZodTypeAny`, \{ `failed`: `number`; `passed`: `number`; `skipped`: `number`; \}, \{ `failed`: `number`; `passed`: `number`; `skipped`: `number`; \}\>\>; `lintPass`: `ZodOptional`\<`ZodBoolean`\>; `screenshotUrl`: `ZodOptional`\<`ZodString`\>; `testsPass`: `ZodOptional`\<`ZodBoolean`\>; `traceVerified`: `ZodBoolean`; \}, `"strip"`, `ZodTypeAny`, \{ `e2eResults?`: \{ `failed`: `number`; `passed`: `number`; `skipped`: `number`; \}; `lintPass?`: `boolean`; `screenshotUrl?`: `string`; `testsPass?`: `boolean`; `traceVerified`: `boolean`; \}, \{ `e2eResults?`: \{ `failed`: `number`; `passed`: `number`; `skipped`: `number`; \}; `lintPass?`: `boolean`; `screenshotUrl?`: `string`; `testsPass?`: `boolean`; `traceVerified`: `boolean`; \}\>; `workOrderId`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `artifacts`: `object`[]; `error?`: `string`; `execution?`: \{ `durationMs`: `number`; `model`: `string`; `tokenUsage?`: \{ `input`: `number`; `output`: `number`; \}; \}; `gitCommitHash?`: `string`; `mintedUid`: `string`; `parentUid`: `string`; `relationship`: `"tests"` \| `"derives-from"` \| `"implements"` \| `"documents"` \| `"conflicts-with"` \| `"shares-with"` \| `"depends-on"` \| `"versioned-from"`; `status`: `"FAILED"` \| `"PARTIAL"` \| `"BLOCKED"` \| `"SUCCESS"`; `verification`: \{ `e2eResults?`: \{ `failed`: `number`; `passed`: `number`; `skipped`: `number`; \}; `lintPass?`: `boolean`; `screenshotUrl?`: `string`; `testsPass?`: `boolean`; `traceVerified`: `boolean`; \}; `workOrderId`: `string`; \}, \{ `artifacts`: `object`[]; `error?`: `string`; `execution?`: \{ `durationMs`: `number`; `model`: `string`; `tokenUsage?`: \{ `input`: `number`; `output`: `number`; \}; \}; `gitCommitHash?`: `string`; `mintedUid`: `string`; `parentUid`: `string`; `relationship`: `"tests"` \| `"derives-from"` \| `"implements"` \| `"documents"` \| `"conflicts-with"` \| `"shares-with"` \| `"depends-on"` \| `"versioned-from"`; `status`: `"FAILED"` \| `"PARTIAL"` \| `"BLOCKED"` \| `"SUCCESS"`; `verification`: \{ `e2eResults?`: \{ `failed`: `number`; `passed`: `number`; `skipped`: `number`; \}; `lintPass?`: `boolean`; `screenshotUrl?`: `string`; `testsPass?`: `boolean`; `traceVerified`: `boolean`; \}; `workOrderId`: `string`; \}\>

Defined in: [packages/orchestrator/src/protocol/fractal-orchestration.ts:131](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/fractal-orchestration.ts#L131)

The "Handshake Response" from Worker to Manager

IMPORTANT: The Worker must return structured evidence, not just text.
This ensures immutable audit trails and verifiable traceability.

***

### LAYER\_ORDER

> `const` **LAYER\_ORDER**: `Record`\<`string`, `number`\>

Defined in: [packages/orchestrator/src/protocol/fractal-orchestration.ts:47](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/fractal-orchestration.ts#L47)

Layer hierarchy for cascade ordering

***

### progressQuery

> `const` **progressQuery**: `QueryDefinition`\<`number`, \[\], `string`\>

Defined in: [packages/orchestrator/src/temporal/workflows.ts:68](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/temporal/workflows.ts#L68)

Query current progress

***

### progressSignal

> `const` **progressSignal**: `SignalDefinition`\<\[`number`\], `string`\>

Defined in: [packages/orchestrator/src/temporal/workflows.ts:62](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/temporal/workflows.ts#L62)

Signal when Claude worker sends progress

***

### stateQuery

> `const` **stateQuery**: `QueryDefinition`\<`"COMPLETED"` \| `"FAILED"` \| `"EXECUTING"` \| `"PENDING"` \| `"CONTEXT_CURATING"` \| `"DISPATCHED"` \| `"GATE_WAITING"` \| `"VERIFYING"` \| `"CANCELLED"`, \[\], `string`\>

Defined in: [packages/orchestrator/src/temporal/workflows.ts:65](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/temporal/workflows.ts#L65)

Query current workflow state

***

### TaskPayloadSchema

> `const` **TaskPayloadSchema**: `ZodObject`\<\{ `context_packet`: `ZodObject`\<\{ `api_contracts`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; `constraints`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; `design_specs`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; `requirements`: `ZodArray`\<`ZodString`, `"many"`\>; \}, `"strip"`, `ZodTypeAny`, \{ `api_contracts?`: `string`[]; `constraints?`: `string`[]; `design_specs?`: `string`[]; `requirements`: `string`[]; \}, \{ `api_contracts?`: `string`[]; `constraints?`: `string`[]; `design_specs?`: `string`[]; `requirements`: `string`[]; \}\>; `excluded_context`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; `founding_intent`: `ZodString`; `injected_tools`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; `namespace`: `ZodString`; `persona_scope`: `ZodString`; `target_layer`: `ZodString`; `task_id`: `ZodString`; `timeout_seconds`: `ZodDefault`\<`ZodOptional`\<`ZodNumber`\>\>; \}, `"strip"`, `ZodTypeAny`, \{ `context_packet`: \{ `api_contracts?`: `string`[]; `constraints?`: `string`[]; `design_specs?`: `string`[]; `requirements`: `string`[]; \}; `excluded_context?`: `string`[]; `founding_intent`: `string`; `injected_tools?`: `string`[]; `namespace`: `string`; `persona_scope`: `string`; `target_layer`: `string`; `task_id`: `string`; `timeout_seconds`: `number`; \}, \{ `context_packet`: \{ `api_contracts?`: `string`[]; `constraints?`: `string`[]; `design_specs?`: `string`[]; `requirements`: `string`[]; \}; `excluded_context?`: `string`[]; `founding_intent`: `string`; `injected_tools?`: `string`[]; `namespace`: `string`; `persona_scope`: `string`; `target_layer`: `string`; `task_id`: `string`; `timeout_seconds?`: `number`; \}\>

Defined in: [packages/orchestrator/src/interfaces/contracts.ts:40](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/interfaces/contracts.ts#L40)

Full task payload dispatched from Orchestrator to Claude Worker

***

### TaskRecordSchema

> `const` **TaskRecordSchema**: `ZodObject`\<\{ `completion`: `ZodOptional`\<`ZodObject`\<\{ `artifacts_created`: `ZodArray`\<`ZodString`, `"many"`\>; `artifacts_modified`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; `blocked_reason`: `ZodOptional`\<`ZodString`\>; `dependencies`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; `error`: `ZodOptional`\<`ZodString`\>; `execution_time_seconds`: `ZodOptional`\<`ZodNumber`\>; `git_commit`: `ZodOptional`\<`ZodString`\>; `pending_gate_id`: `ZodOptional`\<`ZodString`\>; `status`: `ZodEnum`\<\[`"COMPLETED"`, `"FAILED"`, `"PARTIAL"`, `"BLOCKED"`\]\>; `task_id`: `ZodString`; `verification_evidence`: `ZodOptional`\<`ZodObject`\<\{ `integration_tests`: `ZodOptional`\<`ZodEnum`\<\[..., ..., ...\]\>\>; `screenshot`: `ZodOptional`\<`ZodString`\>; `static_analysis`: `ZodOptional`\<`ZodEnum`\<\[..., ..., ...\]\>\>; `unit_tests`: `ZodOptional`\<`ZodEnum`\<\[..., ..., ...\]\>\>; \}, `"strip"`, `ZodTypeAny`, \{ `integration_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `screenshot?`: `string`; `static_analysis?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `unit_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; \}, \{ `integration_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `screenshot?`: `string`; `static_analysis?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `unit_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; \}\>\>; \}, `"strip"`, `ZodTypeAny`, \{ `artifacts_created`: `string`[]; `artifacts_modified?`: `string`[]; `blocked_reason?`: `string`; `dependencies?`: `string`[]; `error?`: `string`; `execution_time_seconds?`: `number`; `git_commit?`: `string`; `pending_gate_id?`: `string`; `status`: `"COMPLETED"` \| `"FAILED"` \| `"PARTIAL"` \| `"BLOCKED"`; `task_id`: `string`; `verification_evidence?`: \{ `integration_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `screenshot?`: `string`; `static_analysis?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `unit_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; \}; \}, \{ `artifacts_created`: `string`[]; `artifacts_modified?`: `string`[]; `blocked_reason?`: `string`; `dependencies?`: `string`[]; `error?`: `string`; `execution_time_seconds?`: `number`; `git_commit?`: `string`; `pending_gate_id?`: `string`; `status`: `"COMPLETED"` \| `"FAILED"` \| `"PARTIAL"` \| `"BLOCKED"`; `task_id`: `string`; `verification_evidence?`: \{ `integration_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `screenshot?`: `string`; `static_analysis?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `unit_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; \}; \}\>\>; `created_at`: `ZodDate`; `id`: `ZodString`; `payload`: `ZodObject`\<\{ `context_packet`: `ZodObject`\<\{ `api_contracts`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; `constraints`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; `design_specs`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; `requirements`: `ZodArray`\<`ZodString`, `"many"`\>; \}, `"strip"`, `ZodTypeAny`, \{ `api_contracts?`: `string`[]; `constraints?`: `string`[]; `design_specs?`: `string`[]; `requirements`: `string`[]; \}, \{ `api_contracts?`: `string`[]; `constraints?`: `string`[]; `design_specs?`: `string`[]; `requirements`: `string`[]; \}\>; `excluded_context`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; `founding_intent`: `ZodString`; `injected_tools`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; `namespace`: `ZodString`; `persona_scope`: `ZodString`; `target_layer`: `ZodString`; `task_id`: `ZodString`; `timeout_seconds`: `ZodDefault`\<`ZodOptional`\<`ZodNumber`\>\>; \}, `"strip"`, `ZodTypeAny`, \{ `context_packet`: \{ `api_contracts?`: `string`[]; `constraints?`: `string`[]; `design_specs?`: `string`[]; `requirements`: `string`[]; \}; `excluded_context?`: `string`[]; `founding_intent`: `string`; `injected_tools?`: `string`[]; `namespace`: `string`; `persona_scope`: `string`; `target_layer`: `string`; `task_id`: `string`; `timeout_seconds`: `number`; \}, \{ `context_packet`: \{ `api_contracts?`: `string`[]; `constraints?`: `string`[]; `design_specs?`: `string`[]; `requirements`: `string`[]; \}; `excluded_context?`: `string`[]; `founding_intent`: `string`; `injected_tools?`: `string`[]; `namespace`: `string`; `persona_scope`: `string`; `target_layer`: `string`; `task_id`: `string`; `timeout_seconds?`: `number`; \}\>; `state`: `ZodEnum`\<\[`"PENDING"`, `"CONTEXT_CURATING"`, `"DISPATCHED"`, `"EXECUTING"`, `"GATE_WAITING"`, `"VERIFYING"`, `"COMPLETED"`, `"FAILED"`, `"CANCELLED"`\]\>; `state_history`: `ZodArray`\<`ZodObject`\<\{ `reason`: `ZodOptional`\<`ZodString`\>; `state`: `ZodEnum`\<\[`"PENDING"`, `"CONTEXT_CURATING"`, `"DISPATCHED"`, `"EXECUTING"`, `"GATE_WAITING"`, `"VERIFYING"`, `"COMPLETED"`, `"FAILED"`, `"CANCELLED"`\]\>; `timestamp`: `ZodDate`; \}, `"strip"`, `ZodTypeAny`, \{ `reason?`: `string`; `state`: `"COMPLETED"` \| `"FAILED"` \| `"EXECUTING"` \| `"PENDING"` \| `"CONTEXT_CURATING"` \| `"DISPATCHED"` \| `"GATE_WAITING"` \| `"VERIFYING"` \| `"CANCELLED"`; `timestamp`: `Date`; \}, \{ `reason?`: `string`; `state`: `"COMPLETED"` \| `"FAILED"` \| `"EXECUTING"` \| `"PENDING"` \| `"CONTEXT_CURATING"` \| `"DISPATCHED"` \| `"GATE_WAITING"` \| `"VERIFYING"` \| `"CANCELLED"`; `timestamp`: `Date`; \}\>, `"many"`\>; `updated_at`: `ZodDate`; \}, `"strip"`, `ZodTypeAny`, \{ `completion?`: \{ `artifacts_created`: `string`[]; `artifacts_modified?`: `string`[]; `blocked_reason?`: `string`; `dependencies?`: `string`[]; `error?`: `string`; `execution_time_seconds?`: `number`; `git_commit?`: `string`; `pending_gate_id?`: `string`; `status`: `"COMPLETED"` \| `"FAILED"` \| `"PARTIAL"` \| `"BLOCKED"`; `task_id`: `string`; `verification_evidence?`: \{ `integration_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `screenshot?`: `string`; `static_analysis?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `unit_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; \}; \}; `created_at`: `Date`; `id`: `string`; `payload`: \{ `context_packet`: \{ `api_contracts?`: `string`[]; `constraints?`: `string`[]; `design_specs?`: `string`[]; `requirements`: `string`[]; \}; `excluded_context?`: `string`[]; `founding_intent`: `string`; `injected_tools?`: `string`[]; `namespace`: `string`; `persona_scope`: `string`; `target_layer`: `string`; `task_id`: `string`; `timeout_seconds`: `number`; \}; `state`: `"COMPLETED"` \| `"FAILED"` \| `"EXECUTING"` \| `"PENDING"` \| `"CONTEXT_CURATING"` \| `"DISPATCHED"` \| `"GATE_WAITING"` \| `"VERIFYING"` \| `"CANCELLED"`; `state_history`: `object`[]; `updated_at`: `Date`; \}, \{ `completion?`: \{ `artifacts_created`: `string`[]; `artifacts_modified?`: `string`[]; `blocked_reason?`: `string`; `dependencies?`: `string`[]; `error?`: `string`; `execution_time_seconds?`: `number`; `git_commit?`: `string`; `pending_gate_id?`: `string`; `status`: `"COMPLETED"` \| `"FAILED"` \| `"PARTIAL"` \| `"BLOCKED"`; `task_id`: `string`; `verification_evidence?`: \{ `integration_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `screenshot?`: `string`; `static_analysis?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `unit_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; \}; \}; `created_at`: `Date`; `id`: `string`; `payload`: \{ `context_packet`: \{ `api_contracts?`: `string`[]; `constraints?`: `string`[]; `design_specs?`: `string`[]; `requirements`: `string`[]; \}; `excluded_context?`: `string`[]; `founding_intent`: `string`; `injected_tools?`: `string`[]; `namespace`: `string`; `persona_scope`: `string`; `target_layer`: `string`; `task_id`: `string`; `timeout_seconds?`: `number`; \}; `state`: `"COMPLETED"` \| `"FAILED"` \| `"EXECUTING"` \| `"PENDING"` \| `"CONTEXT_CURATING"` \| `"DISPATCHED"` \| `"GATE_WAITING"` \| `"VERIFYING"` \| `"CANCELLED"`; `state_history`: `object`[]; `updated_at`: `Date`; \}\>

Defined in: [packages/orchestrator/src/interfaces/contracts.ts:177](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/interfaces/contracts.ts#L177)

Full task record in Orchestrator

***

### TaskStateSchema

> `const` **TaskStateSchema**: `ZodEnum`\<\[`"PENDING"`, `"CONTEXT_CURATING"`, `"DISPATCHED"`, `"EXECUTING"`, `"GATE_WAITING"`, `"VERIFYING"`, `"COMPLETED"`, `"FAILED"`, `"CANCELLED"`\]\>

Defined in: [packages/orchestrator/src/interfaces/contracts.ts:160](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/interfaces/contracts.ts#L160)

Task states in the Helix Orchestrator

***

### ToolInjectionRuleSchema

> `const` **ToolInjectionRuleSchema**: `ZodObject`\<\{ `condition`: `ZodObject`\<\{ `domain`: `ZodOptional`\<`ZodString`\>; `layer`: `ZodOptional`\<`ZodString`\>; `persona`: `ZodOptional`\<`ZodString`\>; \}, `"strip"`, `ZodTypeAny`, \{ `domain?`: `string`; `layer?`: `string`; `persona?`: `string`; \}, \{ `domain?`: `string`; `layer?`: `string`; `persona?`: `string`; \}\>; `exclude_tools`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; `tools`: `ZodArray`\<`ZodString`, `"many"`\>; \}, `"strip"`, `ZodTypeAny`, \{ `condition`: \{ `domain?`: `string`; `layer?`: `string`; `persona?`: `string`; \}; `exclude_tools?`: `string`[]; `tools`: `string`[]; \}, \{ `condition`: \{ `domain?`: `string`; `layer?`: `string`; `persona?`: `string`; \}; `exclude_tools?`: `string`[]; `tools`: `string`[]; \}\>

Defined in: [packages/orchestrator/src/interfaces/contracts.ts:207](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/interfaces/contracts.ts#L207)

Rules for injecting MCP tools based on task context

***

### UidSchema

> `const` **UidSchema**: `ZodString`

Defined in: [packages/orchestrator/src/protocol/fractal-orchestration.ts:29](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/fractal-orchestration.ts#L29)

UID Taxonomy: cpe:{namespace}/{layer}/{type}/{persona_scope}/{id}[@version]

***

### VerificationEvidenceSchema

> `const` **VerificationEvidenceSchema**: `ZodObject`\<\{ `integration_tests`: `ZodOptional`\<`ZodEnum`\<\[`"PASSED"`, `"FAILED"`, `"SKIPPED"`\]\>\>; `screenshot`: `ZodOptional`\<`ZodString`\>; `static_analysis`: `ZodOptional`\<`ZodEnum`\<\[`"PASSED"`, `"FAILED"`, `"SKIPPED"`\]\>\>; `unit_tests`: `ZodOptional`\<`ZodEnum`\<\[`"PASSED"`, `"FAILED"`, `"SKIPPED"`\]\>\>; \}, `"strip"`, `ZodTypeAny`, \{ `integration_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `screenshot?`: `string`; `static_analysis?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `unit_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; \}, \{ `integration_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `screenshot?`: `string`; `static_analysis?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `unit_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; \}\>

Defined in: [packages/orchestrator/src/interfaces/contracts.ts:110](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/interfaces/contracts.ts#L110)

Verification evidence from Claude Worker

***

### WorkOrderSchema

> `const` **WorkOrderSchema**: `ZodObject`\<\{ `inputContext`: `ZodObject`\<\{ `excludedContexts`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; `parentUid`: `ZodString`; `personaConstraints`: `ZodArray`\<`ZodString`, `"many"`\>; `relatedUids`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; `requiredMcpTools`: `ZodArray`\<`ZodString`, `"many"`\>; \}, `"strip"`, `ZodTypeAny`, \{ `excludedContexts?`: `string`[]; `parentUid`: `string`; `personaConstraints`: `string`[]; `relatedUids?`: `string`[]; `requiredMcpTools`: `string`[]; \}, \{ `excludedContexts?`: `string`[]; `parentUid`: `string`; `personaConstraints`: `string`[]; `relatedUids?`: `string`[]; `requiredMcpTools`: `string`[]; \}\>; `metadata`: `ZodObject`\<\{ `foundingIntent`: `ZodString`; `namespace`: `ZodString`; `personaScope`: `ZodString`; `priority`: `ZodDefault`\<`ZodEnum`\<\[`"low"`, `"normal"`, `"high"`, `"critical"`\]\>\>; `timeoutSeconds`: `ZodDefault`\<`ZodNumber`\>; \}, `"strip"`, `ZodTypeAny`, \{ `foundingIntent`: `string`; `namespace`: `string`; `personaScope`: `string`; `priority`: `"low"` \| `"high"` \| `"critical"` \| `"normal"`; `timeoutSeconds`: `number`; \}, \{ `foundingIntent`: `string`; `namespace`: `string`; `personaScope`: `string`; `priority?`: `"low"` \| `"high"` \| `"critical"` \| `"normal"`; `timeoutSeconds?`: `number`; \}\>; `outputRequirement`: `ZodObject`\<\{ `artifactType`: `ZodString`; `layer`: `ZodString`; `mustTraceTo`: `ZodString`; `requiredRelationships`: `ZodOptional`\<`ZodArray`\<`ZodEnum`\<\[`"derives-from"`, `"implements"`, `"tests"`, `"documents"`, `"conflicts-with"`, `"shares-with"`, `"depends-on"`, `"versioned-from"`\]\>, `"many"`\>\>; \}, `"strip"`, `ZodTypeAny`, \{ `artifactType`: `string`; `layer`: `string`; `mustTraceTo`: `string`; `requiredRelationships?`: (`"tests"` \| `"derives-from"` \| `"implements"` \| `"documents"` \| `"conflicts-with"` \| `"shares-with"` \| `"depends-on"` \| `"versioned-from"`)[]; \}, \{ `artifactType`: `string`; `layer`: `string`; `mustTraceTo`: `string`; `requiredRelationships?`: (`"tests"` \| `"derives-from"` \| `"implements"` \| `"documents"` \| `"conflicts-with"` \| `"shares-with"` \| `"depends-on"` \| `"versioned-from"`)[]; \}\>; `task`: `ZodString`; `workOrderId`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `inputContext`: \{ `excludedContexts?`: `string`[]; `parentUid`: `string`; `personaConstraints`: `string`[]; `relatedUids?`: `string`[]; `requiredMcpTools`: `string`[]; \}; `metadata`: \{ `foundingIntent`: `string`; `namespace`: `string`; `personaScope`: `string`; `priority`: `"low"` \| `"high"` \| `"critical"` \| `"normal"`; `timeoutSeconds`: `number`; \}; `outputRequirement`: \{ `artifactType`: `string`; `layer`: `string`; `mustTraceTo`: `string`; `requiredRelationships?`: (`"tests"` \| `"derives-from"` \| `"implements"` \| `"documents"` \| `"conflicts-with"` \| `"shares-with"` \| `"depends-on"` \| `"versioned-from"`)[]; \}; `task`: `string`; `workOrderId`: `string`; \}, \{ `inputContext`: \{ `excludedContexts?`: `string`[]; `parentUid`: `string`; `personaConstraints`: `string`[]; `relatedUids?`: `string`[]; `requiredMcpTools`: `string`[]; \}; `metadata`: \{ `foundingIntent`: `string`; `namespace`: `string`; `personaScope`: `string`; `priority?`: `"low"` \| `"high"` \| `"critical"` \| `"normal"`; `timeoutSeconds?`: `number`; \}; `outputRequirement`: \{ `artifactType`: `string`; `layer`: `string`; `mustTraceTo`: `string`; `requiredRelationships?`: (`"tests"` \| `"derives-from"` \| `"implements"` \| `"documents"` \| `"conflicts-with"` \| `"shares-with"` \| `"depends-on"` \| `"versioned-from"`)[]; \}; `task`: `string`; `workOrderId`: `string`; \}\>

Defined in: [packages/orchestrator/src/protocol/fractal-orchestration.ts:71](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/fractal-orchestration.ts#L71)

The "Work Order" sent from Manager to Worker
Implements the Context Packet pattern

## Functions

### checkGateStatus()

> **checkGateStatus**(`gateId`): `Promise`\<`"PENDING"` \| `"APPROVED"` \| `"REJECTED"`\>

Defined in: [packages/orchestrator/src/temporal/activities.ts:240](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/temporal/activities.ts#L240)

Check gate approval status

#### Parameters

##### gateId

`string`

#### Returns

`Promise`\<`"PENDING"` \| `"APPROVED"` \| `"REJECTED"`\>

***

### createCascadeCoordinator()

> **createCascadeCoordinator**(`config`): `Promise`\<[`CascadeCoordinator`](#cascadecoordinator)\>

Defined in: [packages/orchestrator/src/cascade/cascade-coordinator.ts:508](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/cascade/cascade-coordinator.ts#L508)

Factory function to create and start a CascadeCoordinator

#### Parameters

##### config

[`CascadeCoordinatorConfig`](#cascadecoordinatorconfig)

#### Returns

`Promise`\<[`CascadeCoordinator`](#cascadecoordinator)\>

***

### createContextCurationAgent()

> **createContextCurationAgent**(`config`): [`ContextCurationAgent`](#contextcurationagent)

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:511](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L511)

Create a Context Curation Agent instance

#### Parameters

##### config

[`AgentConfig`](#agentconfig)

#### Returns

[`ContextCurationAgent`](#contextcurationagent)

***

### createContextCurator()

> **createContextCurator**(`graphClient`, `config?`): [`ContextCurator`](#contextcurator)

Defined in: [packages/orchestrator/src/context/curator.ts:370](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/context/curator.ts#L370)

Create a context curator instance

#### Parameters

##### graphClient

`GraphClient`

##### config?

`Partial`\<[`CuratorConfig`](#curatorconfig)\>

#### Returns

[`ContextCurator`](#contextcurator)

***

### createFractalOrchestrationProtocol()

> **createFractalOrchestrationProtocol**(`graphClient`, `eventBus`, `namespace`): [`FractalOrchestrationProtocol`](#fractalorchestrationprotocol)

Defined in: [packages/orchestrator/src/protocol/fractal-orchestration.ts:933](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/fractal-orchestration.ts#L933)

Create a Fractal Orchestration Protocol instance

#### Parameters

##### graphClient

`GraphClient`

##### eventBus

`EventBus`

##### namespace

`string`

#### Returns

[`FractalOrchestrationProtocol`](#fractalorchestrationprotocol)

***

### createMasterOrchestrator()

> **createMasterOrchestrator**(`config`): `object`

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:518](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L518)

Create a master orchestrator that coordinates all agents

#### Parameters

##### config

[`AgentConfig`](#agentconfig)

#### Returns

##### contextAgent

> **contextAgent**: [`ContextCurationAgent`](#contextcurationagent)

##### execute()

> **execute**: (`requirements`, `personaScope`, `intent`) => `Promise`\<\{ `dispatched`: `string`[]; `plan`: [`PlanningResult`](#planningresult); `status`: `"completed"` \| `"failed"` \| `"blocked"` \| `"partial"`; \}\>

Execute a full orchestration cycle

###### Parameters

###### requirements

`string`[]

###### personaScope

`string`

###### intent

`string`

###### Returns

`Promise`\<\{ `dispatched`: `string`[]; `plan`: [`PlanningResult`](#planningresult); `status`: `"completed"` \| `"failed"` \| `"blocked"` \| `"partial"`; \}\>

##### orchestrationAgent

> **orchestrationAgent**: [`OrchestrationAgent`](#orchestrationagent)

##### planningAgent

> **planningAgent**: [`PlanningAgent`](#planningagent)

***

### createOrchestrationAgent()

> **createOrchestrationAgent**(`config`): [`OrchestrationAgent`](#orchestrationagent)

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:504](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L504)

Create an Orchestration Agent instance

#### Parameters

##### config

[`AgentConfig`](#agentconfig)

#### Returns

[`OrchestrationAgent`](#orchestrationagent)

***

### createOrchestrator()

> **createOrchestrator**(`graphClient`, `eventBus`, `config`): [`Orchestrator`](#orchestrator)

Defined in: [packages/orchestrator/src/orchestrator.ts:552](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/orchestrator.ts#L552)

Create an orchestrator instance

#### Parameters

##### graphClient

`GraphClient`

##### eventBus

`EventBus`

##### config

`Partial`\<[`OrchestratorConfig`](#orchestratorconfig)\> & `object`

#### Returns

[`Orchestrator`](#orchestrator)

***

### createPlanningAgent()

> **createPlanningAgent**(`config`): [`PlanningAgent`](#planningagent)

Defined in: [packages/orchestrator/src/agents/agent-factory.ts:497](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/agents/agent-factory.ts#L497)

Create a Planning Agent instance

#### Parameters

##### config

[`AgentConfig`](#agentconfig)

#### Returns

[`PlanningAgent`](#planningagent)

***

### createPostTaskVerifier()

> **createPostTaskVerifier**(`graphClient`, `eventBus`, `config`): [`PostTaskVerifier`](#posttaskverifier)

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:634](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L634)

Create a post-task verifier

#### Parameters

##### graphClient

`GraphClient`

##### eventBus

`EventBus`

##### config

[`VerificationConfig`](#verificationconfig)

#### Returns

[`PostTaskVerifier`](#posttaskverifier)

***

### curateContext()

> **curateContext**(`payload`): `Promise`\<\{ `context_packet`: \{ `api_contracts?`: `string`[]; `constraints?`: `string`[]; `design_specs?`: `string`[]; `requirements`: `string`[]; \}; `excluded_context?`: `string`[]; `founding_intent`: `string`; `injected_tools?`: `string`[]; `namespace`: `string`; `persona_scope`: `string`; `target_layer`: `string`; `task_id`: `string`; `timeout_seconds`: `number`; \}\>

Defined in: [packages/orchestrator/src/temporal/activities.ts:43](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/temporal/activities.ts#L43)

Curate context for a task by querying Neo4j

#### Parameters

##### payload

###### context_packet

\{ `api_contracts?`: `string`[]; `constraints?`: `string`[]; `design_specs?`: `string`[]; `requirements`: `string`[]; \} = `ContextPacketSchema`

Curated context for the agent

###### context_packet.api_contracts?

`string`[] = `...`

API contract UIDs or paths

###### context_packet.constraints?

`string`[] = `...`

Explicit constraints the agent must follow

###### context_packet.design_specs?

`string`[] = `...`

Design specification UIDs

###### context_packet.requirements

`string`[] = `...`

Requirement UIDs to implement

###### excluded_context?

`string`[] = `...`

Context explicitly excluded (prevents context poisoning)

###### founding_intent

`string` = `...`

High-level intent for the task

###### injected_tools?

`string`[] = `...`

MCP tools to inject for this task

###### namespace

`string` = `...`

Namespace (BUILD-TIME project identifier)

###### persona_scope

`string` = `...`

Persona scope for this task

###### target_layer

`string` = `...`

Layer being implemented

###### task_id

`string` = `...`

Unique task identifier

###### timeout_seconds

`number` = `...`

Maximum execution time in seconds

#### Returns

`Promise`\<\{ `context_packet`: \{ `api_contracts?`: `string`[]; `constraints?`: `string`[]; `design_specs?`: `string`[]; `requirements`: `string`[]; \}; `excluded_context?`: `string`[]; `founding_intent`: `string`; `injected_tools?`: `string`[]; `namespace`: `string`; `persona_scope`: `string`; `target_layer`: `string`; `task_id`: `string`; `timeout_seconds`: `number`; \}\>

***

### dispatchToClaudeWorker()

> **dispatchToClaudeWorker**(`payload`): `Promise`\<`string`\>

Defined in: [packages/orchestrator/src/temporal/activities.ts:63](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/temporal/activities.ts#L63)

Dispatch task to Claude SDK worker via Redis

#### Parameters

##### payload

###### context_packet

\{ `api_contracts?`: `string`[]; `constraints?`: `string`[]; `design_specs?`: `string`[]; `requirements`: `string`[]; \} = `ContextPacketSchema`

Curated context for the agent

###### context_packet.api_contracts?

`string`[] = `...`

API contract UIDs or paths

###### context_packet.constraints?

`string`[] = `...`

Explicit constraints the agent must follow

###### context_packet.design_specs?

`string`[] = `...`

Design specification UIDs

###### context_packet.requirements

`string`[] = `...`

Requirement UIDs to implement

###### excluded_context?

`string`[] = `...`

Context explicitly excluded (prevents context poisoning)

###### founding_intent

`string` = `...`

High-level intent for the task

###### injected_tools?

`string`[] = `...`

MCP tools to inject for this task

###### namespace

`string` = `...`

Namespace (BUILD-TIME project identifier)

###### persona_scope

`string` = `...`

Persona scope for this task

###### target_layer

`string` = `...`

Layer being implemented

###### task_id

`string` = `...`

Unique task identifier

###### timeout_seconds

`number` = `...`

Maximum execution time in seconds

#### Returns

`Promise`\<`string`\>

***

### executeTaskWorkflow()

> **executeTaskWorkflow**(`payload`): `Promise`\<\{ `artifacts_created`: `string`[]; `artifacts_modified?`: `string`[]; `blocked_reason?`: `string`; `dependencies?`: `string`[]; `error?`: `string`; `execution_time_seconds?`: `number`; `git_commit?`: `string`; `pending_gate_id?`: `string`; `status`: `"COMPLETED"` \| `"FAILED"` \| `"PARTIAL"` \| `"BLOCKED"`; `task_id`: `string`; `verification_evidence?`: \{ `integration_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `screenshot?`: `string`; `static_analysis?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `unit_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; \}; \}\>

Defined in: [packages/orchestrator/src/temporal/workflows.ts:83](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/temporal/workflows.ts#L83)

Main workflow that orchestrates task execution.

Flow:
1. Curate context
2. Dispatch to Claude worker
3. Wait for completion (with gate handling)
4. Sync results to Neo4j

#### Parameters

##### payload

###### context_packet

\{ `api_contracts?`: `string`[]; `constraints?`: `string`[]; `design_specs?`: `string`[]; `requirements`: `string`[]; \} = `ContextPacketSchema`

Curated context for the agent

###### context_packet.api_contracts?

`string`[] = `...`

API contract UIDs or paths

###### context_packet.constraints?

`string`[] = `...`

Explicit constraints the agent must follow

###### context_packet.design_specs?

`string`[] = `...`

Design specification UIDs

###### context_packet.requirements

`string`[] = `...`

Requirement UIDs to implement

###### excluded_context?

`string`[] = `...`

Context explicitly excluded (prevents context poisoning)

###### founding_intent

`string` = `...`

High-level intent for the task

###### injected_tools?

`string`[] = `...`

MCP tools to inject for this task

###### namespace

`string` = `...`

Namespace (BUILD-TIME project identifier)

###### persona_scope

`string` = `...`

Persona scope for this task

###### target_layer

`string` = `...`

Layer being implemented

###### task_id

`string` = `...`

Unique task identifier

###### timeout_seconds

`number` = `...`

Maximum execution time in seconds

#### Returns

`Promise`\<\{ `artifacts_created`: `string`[]; `artifacts_modified?`: `string`[]; `blocked_reason?`: `string`; `dependencies?`: `string`[]; `error?`: `string`; `execution_time_seconds?`: `number`; `git_commit?`: `string`; `pending_gate_id?`: `string`; `status`: `"COMPLETED"` \| `"FAILED"` \| `"PARTIAL"` \| `"BLOCKED"`; `task_id`: `string`; `verification_evidence?`: \{ `integration_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `screenshot?`: `string`; `static_analysis?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `unit_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; \}; \}\>

***

### generateLayerWorkflow()

> **generateLayerWorkflow**(`namespace`, `layer`, `requirementUids`, `personaScope`): `Promise`\<`object`[]\>

Defined in: [packages/orchestrator/src/temporal/workflows.ts:232](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/temporal/workflows.ts#L232)

Workflow to generate an entire layer in parallel.

#### Parameters

##### namespace

`string`

##### layer

`string`

##### requirementUids

`string`[]

##### personaScope

`string`

#### Returns

`Promise`\<`object`[]\>

***

### initializeActivities()

> **initializeActivities**(`graph`, `events`, `contextCurator`): `void`

Defined in: [packages/orchestrator/src/temporal/activities.ts:26](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/temporal/activities.ts#L26)

Initialize activities with dependencies

#### Parameters

##### graph

`GraphClient`

##### events

`EventBus`

##### contextCurator

[`ContextCurator`](#contextcurator)

#### Returns

`void`

***

### notifyFailure()

> **notifyFailure**(`taskId`, `error`): `Promise`\<`void`\>

Defined in: [packages/orchestrator/src/temporal/activities.ts:262](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/temporal/activities.ts#L262)

Notify about task failure

#### Parameters

##### taskId

`string`

##### error

`string`

#### Returns

`Promise`\<`void`\>

***

### pollForCompletion()

> **pollForCompletion**(`executionId`): `Promise`\<\{ `artifacts_created`: `string`[]; `artifacts_modified?`: `string`[]; `blocked_reason?`: `string`; `dependencies?`: `string`[]; `error?`: `string`; `execution_time_seconds?`: `number`; `git_commit?`: `string`; `pending_gate_id?`: `string`; `status`: `"COMPLETED"` \| `"FAILED"` \| `"PARTIAL"` \| `"BLOCKED"`; `task_id`: `string`; `verification_evidence?`: \{ `integration_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `screenshot?`: `string`; `static_analysis?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `unit_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; \}; \} \| `null`\>

Defined in: [packages/orchestrator/src/temporal/activities.ts:98](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/temporal/activities.ts#L98)

Poll for task completion

#### Parameters

##### executionId

`string`

#### Returns

`Promise`\<\{ `artifacts_created`: `string`[]; `artifacts_modified?`: `string`[]; `blocked_reason?`: `string`; `dependencies?`: `string`[]; `error?`: `string`; `execution_time_seconds?`: `number`; `git_commit?`: `string`; `pending_gate_id?`: `string`; `status`: `"COMPLETED"` \| `"FAILED"` \| `"PARTIAL"` \| `"BLOCKED"`; `task_id`: `string`; `verification_evidence?`: \{ `integration_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `screenshot?`: `string`; `static_analysis?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `unit_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; \}; \} \| `null`\>

***

### requestGateApproval()

> **requestGateApproval**(`gateNumber`, `namespace`): `Promise`\<`string`\>

Defined in: [packages/orchestrator/src/temporal/activities.ts:204](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/temporal/activities.ts#L204)

Request human gate approval

#### Parameters

##### gateNumber

`number`

##### namespace

`string`

#### Returns

`Promise`\<`string`\>

***

### syncToNeo4j()

> **syncToNeo4j**(`payload`, `signal`): `Promise`\<`void`\>

Defined in: [packages/orchestrator/src/temporal/activities.ts:132](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/temporal/activities.ts#L132)

Sync completed artifacts to Neo4j

#### Parameters

##### payload

###### context_packet

\{ `api_contracts?`: `string`[]; `constraints?`: `string`[]; `design_specs?`: `string`[]; `requirements`: `string`[]; \} = `ContextPacketSchema`

Curated context for the agent

###### context_packet.api_contracts?

`string`[] = `...`

API contract UIDs or paths

###### context_packet.constraints?

`string`[] = `...`

Explicit constraints the agent must follow

###### context_packet.design_specs?

`string`[] = `...`

Design specification UIDs

###### context_packet.requirements

`string`[] = `...`

Requirement UIDs to implement

###### excluded_context?

`string`[] = `...`

Context explicitly excluded (prevents context poisoning)

###### founding_intent

`string` = `...`

High-level intent for the task

###### injected_tools?

`string`[] = `...`

MCP tools to inject for this task

###### namespace

`string` = `...`

Namespace (BUILD-TIME project identifier)

###### persona_scope

`string` = `...`

Persona scope for this task

###### target_layer

`string` = `...`

Layer being implemented

###### task_id

`string` = `...`

Unique task identifier

###### timeout_seconds

`number` = `...`

Maximum execution time in seconds

##### signal

###### artifacts_created

`string`[] = `...`

Files created during implementation

###### artifacts_modified?

`string`[] = `...`

Files modified during implementation

###### blocked_reason?

`string` = `...`

Blocking reason if BLOCKED

###### dependencies?

`string`[] = `...`

Dependencies added

###### error?

`string` = `...`

Error message if failed

###### execution_time_seconds?

`number` = `...`

Execution time in seconds

###### git_commit?

`string` = `...`

Git commit SHA

###### pending_gate_id?

`string` = `...`

Gate ID if waiting for approval

###### status

`"COMPLETED"` \| `"FAILED"` \| `"PARTIAL"` \| `"BLOCKED"` = `...`

Completion status

###### task_id

`string` = `...`

Task ID that was completed

###### verification_evidence?

\{ `integration_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `screenshot?`: `string`; `static_analysis?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `unit_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; \} = `...`

Verification evidence

###### verification_evidence.integration_tests?

`"FAILED"` \| `"PASSED"` \| `"SKIPPED"` = `...`

Integration test status

###### verification_evidence.screenshot?

`string` = `...`

Screenshot URL for visual verification

###### verification_evidence.static_analysis?

`"FAILED"` \| `"PASSED"` \| `"SKIPPED"` = `...`

Lint/typecheck status

###### verification_evidence.unit_tests?

`"FAILED"` \| `"PASSED"` \| `"SKIPPED"` = `...`

Unit test status

#### Returns

`Promise`\<`void`\>

***

### verifyTaskCompletion()

> **verifyTaskCompletion**(`verifier`, `workOrder`, `response`): `Promise`\<\{ `accepted`: `boolean`; `nextSteps`: `string`[]; `result`: [`VerificationResult`](#verificationresult); \}\>

Defined in: [packages/orchestrator/src/protocol/post-task-verification.ts:649](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/orchestrator/src/protocol/post-task-verification.ts#L649)

Hook to integrate post-task verification into the orchestrator

#### Parameters

##### verifier

[`PostTaskVerifier`](#posttaskverifier)

##### workOrder

###### inputContext

\{ `excludedContexts?`: `string`[]; `parentUid`: `string`; `personaConstraints`: `string`[]; `relatedUids?`: `string`[]; `requiredMcpTools`: `string`[]; \} = `...`

Input context - the bounded scope

###### inputContext.excludedContexts?

`string`[] = `...`

Excluded contexts (prevent context poisoning)

###### inputContext.parentUid

`string` = `...`

Parent UID - the anchor for traceability

###### inputContext.personaConstraints

`string`[] = `...`

Persona-specific constraints (e.g., WCAG requirements)

###### inputContext.relatedUids?

`string`[] = `...`

Related UIDs for cross-referencing

###### inputContext.requiredMcpTools

`string`[] = `...`

Required MCP tools for this task

###### metadata

\{ `foundingIntent`: `string`; `namespace`: `string`; `personaScope`: `string`; `priority`: `"low"` \| `"high"` \| `"critical"` \| `"normal"`; `timeoutSeconds`: `number`; \} = `...`

Metadata

###### metadata.foundingIntent

`string` = `...`

###### metadata.namespace

`string` = `...`

###### metadata.personaScope

`string` = `...`

###### metadata.priority

`"low"` \| `"high"` \| `"critical"` \| `"normal"` = `...`

###### metadata.timeoutSeconds

`number` = `...`

###### outputRequirement

\{ `artifactType`: `string`; `layer`: `string`; `mustTraceTo`: `string`; `requiredRelationships?`: (`"tests"` \| `"derives-from"` \| `"implements"` \| `"documents"` \| `"conflicts-with"` \| `"shares-with"` \| `"depends-on"` \| `"versioned-from"`)[]; \} = `...`

Output requirement - what the worker must produce

###### outputRequirement.artifactType

`string` = `...`

Expected artifact type

###### outputRequirement.layer

`string` = `...`

Target layer for the artifact

###### outputRequirement.mustTraceTo

`string` = `...`

Must trace back to this UID

###### outputRequirement.requiredRelationships?

(`"tests"` \| `"derives-from"` \| `"implements"` \| `"documents"` \| `"conflicts-with"` \| `"shares-with"` \| `"depends-on"` \| `"versioned-from"`)[] = `...`

Required relationships to create

###### task

`string` = `...`

Task description

###### workOrderId

`string` = `...`

Unique work order ID

##### response

###### artifacts

`object`[] = `...`

Artifacts created/modified

###### error?

`string` = `...`

Error if failed

###### execution?

\{ `durationMs`: `number`; `model`: `string`; `tokenUsage?`: \{ `input`: `number`; `output`: `number`; \}; \} = `...`

Execution metadata

###### execution.durationMs

`number` = `...`

Duration in milliseconds

###### execution.model

`string` = `...`

Model used

###### execution.tokenUsage?

\{ `input`: `number`; `output`: `number`; \} = `...`

Token usage

###### execution.tokenUsage.input

`number` = `...`

###### execution.tokenUsage.output

`number` = `...`

###### gitCommitHash?

`string` = `...`

Git commit hash for immutable audit log

###### mintedUid

`string` = `...`

Minted child UID

###### parentUid

`string` = `...`

Parent UID that was traced to

###### relationship

`"tests"` \| `"derives-from"` \| `"implements"` \| `"documents"` \| `"conflicts-with"` \| `"shares-with"` \| `"depends-on"` \| `"versioned-from"` = `...`

Relationship created

###### status

`"FAILED"` \| `"PARTIAL"` \| `"BLOCKED"` \| `"SUCCESS"` = `...`

Status

###### verification

\{ `e2eResults?`: \{ `failed`: `number`; `passed`: `number`; `skipped`: `number`; \}; `lintPass?`: `boolean`; `screenshotUrl?`: `string`; `testsPass?`: `boolean`; `traceVerified`: `boolean`; \} = `...`

Verification evidence

###### verification.e2eResults?

\{ `failed`: `number`; `passed`: `number`; `skipped`: `number`; \} = `...`

E2E test results

###### verification.e2eResults.failed

`number` = `...`

###### verification.e2eResults.passed

`number` = `...`

###### verification.e2eResults.skipped

`number` = `...`

###### verification.lintPass?

`boolean` = `...`

Lint/type checks pass

###### verification.screenshotUrl?

`string` = `...`

Screenshot URL from Puppeteer E2E verification (if UI layer)

###### verification.testsPass?

`boolean` = `...`

Unit/integration tests pass

###### verification.traceVerified

`boolean` = `...`

Trace verification confirmed

###### workOrderId

`string` = `...`

Work order ID being responded to

#### Returns

`Promise`\<\{ `accepted`: `boolean`; `nextSteps`: `string`[]; `result`: [`VerificationResult`](#verificationresult); \}\>

## References

### AdkOrchestrator

Renames and re-exports [Orchestrator](#orchestrator)
