[**Helix API Documentation v0.1.0**](../README.md)

***

[Helix API Documentation](../README.md) / claude-worker/src

# claude-worker/src

@helix/claude-worker

Claude Agent SDK worker for Helix - Micro-executor for
long-running code tasks.

Implements the complete "Anthropic Harness" pattern:
- Initializer: Sets up environment (init.sh, feature_list.json)
- Coding Loop: Feature-by-feature implementation with progress tracking
- E2E Verification: Browser automation testing with Puppeteer MCP
- Context Recovery: Survives context exhaustion via progress files

## See

https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

## Classes

### ClaudeWorker

Defined in: [packages/claude-worker/src/worker.ts:53](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/worker.ts#L53)

#### Constructors

##### Constructor

> **new ClaudeWorker**(`graphClient`, `eventBus`, `executor`, `config`): [`ClaudeWorker`](#claudeworker)

Defined in: [packages/claude-worker/src/worker.ts:61](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/worker.ts#L61)

###### Parameters

###### graphClient

`GraphClient`

###### eventBus

`EventBus`

###### executor

[`ClaudeExecutor`](#claudeexecutor)

###### config

`WorkerConfig`

###### Returns

[`ClaudeWorker`](#claudeworker)

#### Methods

##### start()

> **start**(): `Promise`\<`void`\>

Defined in: [packages/claude-worker/src/worker.ts:76](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/worker.ts#L76)

Start the worker

###### Returns

`Promise`\<`void`\>

##### stop()

> **stop**(): `Promise`\<`void`\>

Defined in: [packages/claude-worker/src/worker.ts:101](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/worker.ts#L101)

Stop the worker gracefully

###### Returns

`Promise`\<`void`\>

***

### CodingLoopHarness

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:114](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L114)

#### Constructors

##### Constructor

> **new CodingLoopHarness**(`featureHandler`, `config`): [`CodingLoopHarness`](#codingloopharness)

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:121](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L121)

###### Parameters

###### featureHandler

[`FeatureHandler`](#featurehandler)

###### config

`Partial`\<[`HarnessConfig`](#harnessconfig)\> = `{}`

###### Returns

[`CodingLoopHarness`](#codingloopharness)

#### Methods

##### getE2EInstructions()

> **getE2EInstructions**(`path`, `options?`): `string`

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:403](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L403)

Get E2E verification instructions for a page

###### Parameters

###### path

`string`

###### options?

[`PageVerificationOptions`](#pageverificationoptions)

###### Returns

`string`

##### getStartupContext()

> **getStartupContext**(): `string` \| `null`

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:395](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L395)

Get startup context for the coding agent

###### Returns

`string` \| `null`

##### getState()

> **getState**(): [`HarnessState`](#harnessstate) \| `null`

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:410](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L410)

Get current state (for external monitoring)

###### Returns

[`HarnessState`](#harnessstate) \| `null`

##### initialize()

> **initialize**(`payload`): `Promise`\<`void`\>

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:148](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L148)

Initialize the harness for a new task
This is the "Initializer Agent" phase from the Anthropic pattern

###### Parameters

###### payload

###### context_packet

\{ `api_contracts?`: `string`[]; `constraints?`: `string`[]; `design_specs?`: `string`[]; `requirements`: `string`[]; \}

###### context_packet.api_contracts?

`string`[]

###### context_packet.constraints?

`string`[]

###### context_packet.design_specs?

`string`[]

###### context_packet.requirements

`string`[]

###### excluded_context?

`string`[]

###### founding_intent

`string`

###### injected_tools?

`string`[]

###### namespace

`string`

###### persona_scope

`string`

###### target_layer

`string`

###### task_id

`string`

###### timeout_seconds

`number`

###### Returns

`Promise`\<`void`\>

##### resume()

> **resume**(`payload`): `Promise`\<`boolean`\>

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:183](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L183)

Resume from a previous run (context window recovery)
Implements the "Startup Sequence" from the Anthropic pattern

###### Parameters

###### payload

###### context_packet

\{ `api_contracts?`: `string`[]; `constraints?`: `string`[]; `design_specs?`: `string`[]; `requirements`: `string`[]; \}

###### context_packet.api_contracts?

`string`[]

###### context_packet.constraints?

`string`[]

###### context_packet.design_specs?

`string`[]

###### context_packet.requirements

`string`[]

###### excluded_context?

`string`[]

###### founding_intent

`string`

###### injected_tools?

`string`[]

###### namespace

`string`

###### persona_scope

`string`

###### target_layer

`string`

###### task_id

`string`

###### timeout_seconds

`number`

###### Returns

`Promise`\<`boolean`\>

##### run()

> **run**(): `Promise`\<\{ `artifacts_created`: `string`[]; `artifacts_modified?`: `string`[]; `blocked_reason?`: `string`; `dependencies?`: `string`[]; `error?`: `string`; `execution_time_seconds?`: `number`; `git_commit?`: `string`; `pending_gate_id?`: `string`; `status`: `"COMPLETED"` \| `"FAILED"` \| `"PARTIAL"` \| `"BLOCKED"`; `task_id`: `string`; `verification_evidence?`: \{ `integration_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `screenshot?`: `string`; `static_analysis?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `unit_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; \}; \}\>

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:256](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L256)

Run the main coding loop
This is the "Coding Agent" phase from the Anthropic pattern

###### Returns

`Promise`\<\{ `artifacts_created`: `string`[]; `artifacts_modified?`: `string`[]; `blocked_reason?`: `string`; `dependencies?`: `string`[]; `error?`: `string`; `execution_time_seconds?`: `number`; `git_commit?`: `string`; `pending_gate_id?`: `string`; `status`: `"COMPLETED"` \| `"FAILED"` \| `"PARTIAL"` \| `"BLOCKED"`; `task_id`: `string`; `verification_evidence?`: \{ `integration_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `screenshot?`: `string`; `static_analysis?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; `unit_tests?`: `"FAILED"` \| `"PASSED"` \| `"SKIPPED"`; \}; \}\>

***

### E2EVerification

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:81](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L81)

#### Constructors

##### Constructor

> **new E2EVerification**(`config`): [`E2EVerification`](#e2everification)

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:84](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L84)

###### Parameters

###### config

`Partial`\<[`E2EConfig`](#e2econfig)\> = `{}`

###### Returns

[`E2EVerification`](#e2everification)

#### Methods

##### generatePuppeteerInstructions()

> **generatePuppeteerInstructions**(`path`, `options`): `string`

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:218](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L218)

Generate Puppeteer verification commands for Claude
These are prompts that tell Claude how to use Puppeteer MCP

###### Parameters

###### path

`string`

###### options

[`PageVerificationOptions`](#pageverificationoptions) = `{}`

###### Returns

`string`

##### runVerificationSuite()

> **runVerificationSuite**(`suite`): `Promise`\<\{ `results`: [`VerificationResult`](#verificationresult)[]; `success`: `boolean`; `summary`: \{ `failed`: `number`; `passed`: `number`; `total`: `number`; \}; \}\>

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:177](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L177)

Run a suite of E2E verifications

###### Parameters

###### suite

`object`[]

###### Returns

`Promise`\<\{ `results`: [`VerificationResult`](#verificationresult)[]; `success`: `boolean`; `summary`: \{ `failed`: `number`; `passed`: `number`; `total`: `number`; \}; \}\>

##### verifyDevServer()

> **verifyDevServer**(): `Promise`\<[`VerificationResult`](#verificationresult)\>

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:91](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L91)

Verify that the dev server is running and responding

###### Returns

`Promise`\<[`VerificationResult`](#verificationresult)\>

##### verifyPage()

> **verifyPage**(`path`, `options`): `Promise`\<[`VerificationResult`](#verificationresult)\>

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:125](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L125)

Verify a specific page loads correctly

###### Parameters

###### path

`string`

###### options

[`PageVerificationOptions`](#pageverificationoptions) = `{}`

###### Returns

`Promise`\<[`VerificationResult`](#verificationresult)\>

***

### Initializer

Defined in: [packages/claude-worker/src/harness/initializer.ts:265](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L265)

#### Constructors

##### Constructor

> **new Initializer**(`config`): [`Initializer`](#initializer)

Defined in: [packages/claude-worker/src/harness/initializer.ts:268](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L268)

###### Parameters

###### config

`Partial`\<[`InitializerConfig`](#initializerconfig)\> = `{}`

###### Returns

[`Initializer`](#initializer)

#### Methods

##### gatherContext()

> **gatherContext**(): `Promise`\<[`EnvironmentContext`](#environmentcontext)\>

Defined in: [packages/claude-worker/src/harness/initializer.ts:334](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L334)

Gather environment context for session startup
This implements the startup sequence from the Anthropic article:
1. "Run pwd to see the directory you're working in"
2. Read git logs and progress files
3. Understand recent work

###### Returns

`Promise`\<[`EnvironmentContext`](#environmentcontext)\>

##### generateStartupPrompt()

> **generateStartupPrompt**(`context`): `string`

Defined in: [packages/claude-worker/src/harness/initializer.ts:434](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L434)

Generate startup prompt for the coding agent
This provides the agent with full context from previous sessions

###### Parameters

###### context

[`EnvironmentContext`](#environmentcontext)

###### Returns

`string`

##### initialize()

> **initialize**(`payload`): `Promise`\<[`InitializerResult`](#initializerresult)\>

Defined in: [packages/claude-worker/src/harness/initializer.ts:275](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L275)

Initialize the environment for a new task

###### Parameters

###### payload

###### context_packet

\{ `api_contracts?`: `string`[]; `constraints?`: `string`[]; `design_specs?`: `string`[]; `requirements`: `string`[]; \}

###### context_packet.api_contracts?

`string`[]

###### context_packet.constraints?

`string`[]

###### context_packet.design_specs?

`string`[]

###### context_packet.requirements

`string`[]

###### excluded_context?

`string`[]

###### founding_intent

`string`

###### injected_tools?

`string`[]

###### namespace

`string`

###### persona_scope

`string`

###### target_layer

`string`

###### task_id

`string`

###### timeout_seconds

`number`

###### Returns

`Promise`\<[`InitializerResult`](#initializerresult)\>

***

### ShadcnIntegration

Defined in: [packages/claude-worker/src/shadcn/integration.ts:295](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L295)

shadcn/ui MCP Integration

Provides methods for component lookup, installation, and verification

#### Constructors

##### Constructor

> **new ShadcnIntegration**(`config`): [`ShadcnIntegration`](#shadcnintegration)

Defined in: [packages/claude-worker/src/shadcn/integration.ts:298](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L298)

###### Parameters

###### config

`Partial`\<[`ShadcnConfig`](#shadcnconfig)\> = `{}`

###### Returns

[`ShadcnIntegration`](#shadcnintegration)

#### Methods

##### generateDependencyQuery()

> **generateDependencyQuery**(`implementationUid`, `componentName`, `version`): `string`

Defined in: [packages/claude-worker/src/shadcn/integration.ts:440](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L440)

Generate Cypher query to create DEPENDS_ON relationship in Neo4j

###### Parameters

###### implementationUid

`string`

###### componentName

`string`

###### version

`string` = `"latest"`

###### Returns

`string`

##### getImportStatement()

> **getImportStatement**(`componentName`): `string`

Defined in: [packages/claude-worker/src/shadcn/integration.ts:459](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L459)

Get the import statement for a component

###### Parameters

###### componentName

`string`

###### Returns

`string`

##### getImportStatements()

> **getImportStatements**(`componentNames`): `string`

Defined in: [packages/claude-worker/src/shadcn/integration.ts:471](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L471)

Get multiple import statements

###### Parameters

###### componentNames

`string`[]

###### Returns

`string`

##### getRegistryUrl()

> **getRegistryUrl**(`componentName`, `style?`): `string`

Defined in: [packages/claude-worker/src/shadcn/integration.ts:312](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L312)

Get the registry URL for a component

###### Parameters

###### componentName

`string`

###### style?

`"default"` | `"new-york"`

###### Returns

`string`

##### initialize()

> **initialize**(): `Promise`\<\{ `error?`: `string`; `success`: `boolean`; \}\>

Defined in: [packages/claude-worker/src/shadcn/integration.ts:420](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L420)

Initialize shadcn/ui in the project

###### Returns

`Promise`\<\{ `error?`: `string`; `success`: `boolean`; \}\>

##### installComponent()

> **installComponent**(`componentName`, `overwrite`): `Promise`\<[`ComponentInstallResult`](#componentinstallresult)\>

Defined in: [packages/claude-worker/src/shadcn/integration.ts:320](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L320)

Install a shadcn component via CLI

###### Parameters

###### componentName

`string`

###### overwrite

`boolean` = `false`

###### Returns

`Promise`\<[`ComponentInstallResult`](#componentinstallresult)\>

##### installComponents()

> **installComponents**(`componentNames`): `Promise`\<[`ComponentInstallResult`](#componentinstallresult)\>

Defined in: [packages/claude-worker/src/shadcn/integration.ts:361](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L361)

Install multiple components at once

###### Parameters

###### componentNames

`string`[]

###### Returns

`Promise`\<[`ComponentInstallResult`](#componentinstallresult)\>

##### isInitialized()

> **isInitialized**(): `boolean`

Defined in: [packages/claude-worker/src/shadcn/integration.ts:405](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L405)

Check if shadcn/ui is initialized in the project

###### Returns

`boolean`

##### isValidComponent()

> **isValidComponent**(`name`): name is "form" \| "accordion" \| "aspect-ratio" \| "card" \| "collapsible" \| "resizable" \| "scroll-area" \| "separator" \| "sheet" \| "tabs" \| "button" \| "checkbox" \| "input" \| "label" \| "radio-group" \| "select" \| "slider" \| "switch" \| "textarea" \| "toggle" \| "toggle-group" \| "avatar" \| "badge" \| "calendar" \| "data-table" \| "hover-card" \| "progress" \| "skeleton" \| "table" \| "tooltip" \| "alert" \| "alert-dialog" \| "dialog" \| "drawer" \| "popover" \| "sonner" \| "toast" \| "breadcrumb" \| "command" \| "context-menu" \| "dropdown-menu" \| "menubar" \| "navigation-menu" \| "pagination" \| "carousel" \| "chart" \| "input-otp" \| "sidebar"

Defined in: [packages/claude-worker/src/shadcn/integration.ts:305](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L305)

Check if a component exists in the shadcn catalog

###### Parameters

###### name

`string`

###### Returns

name is "form" \| "accordion" \| "aspect-ratio" \| "card" \| "collapsible" \| "resizable" \| "scroll-area" \| "separator" \| "sheet" \| "tabs" \| "button" \| "checkbox" \| "input" \| "label" \| "radio-group" \| "select" \| "slider" \| "switch" \| "textarea" \| "toggle" \| "toggle-group" \| "avatar" \| "badge" \| "calendar" \| "data-table" \| "hover-card" \| "progress" \| "skeleton" \| "table" \| "tooltip" \| "alert" \| "alert-dialog" \| "dialog" \| "drawer" \| "popover" \| "sonner" \| "toast" \| "breadcrumb" \| "command" \| "context-menu" \| "dropdown-menu" \| "menubar" \| "navigation-menu" \| "pagination" \| "carousel" \| "chart" \| "input-otp" \| "sidebar"

## Interfaces

### ClaudeExecutor

Defined in: [packages/claude-worker/src/executor.ts:45](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/executor.ts#L45)

#### Methods

##### executeFeature()

> **executeFeature**(`feature`, `state`, `config`, `payload`): `Promise`\<[`ExecutionResult`](#executionresult)\>

Defined in: [packages/claude-worker/src/executor.ts:46](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/executor.ts#L46)

###### Parameters

###### feature

###### category

`"functional"` \| `"ui"` \| `"api"` \| `"data"` \| `"security"` \| `"test"`

###### description

`string`

###### error?

`string`

###### passes

`boolean`

###### steps

`string`[]

###### trace_id

`string`

###### state

[`HarnessState`](#harnessstate)

###### config

[`HarnessConfig`](#harnessconfig)

###### payload

###### context_packet

\{ `api_contracts?`: `string`[]; `constraints?`: `string`[]; `design_specs?`: `string`[]; `requirements`: `string`[]; \}

###### context_packet.api_contracts?

`string`[]

###### context_packet.constraints?

`string`[]

###### context_packet.design_specs?

`string`[]

###### context_packet.requirements

`string`[]

###### excluded_context?

`string`[]

###### founding_intent

`string`

###### injected_tools?

`string`[]

###### namespace

`string`

###### persona_scope

`string`

###### target_layer

`string`

###### task_id

`string`

###### timeout_seconds

`number`

###### Returns

`Promise`\<[`ExecutionResult`](#executionresult)\>

***

### ComponentInstallResult

Defined in: [packages/claude-worker/src/shadcn/integration.ts:41](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L41)

#### Properties

##### error?

> `optional` **error**: `string`

Defined in: [packages/claude-worker/src/shadcn/integration.ts:44](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L44)

##### installedComponents

> **installedComponents**: `string`[]

Defined in: [packages/claude-worker/src/shadcn/integration.ts:43](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L43)

##### success

> **success**: `boolean`

Defined in: [packages/claude-worker/src/shadcn/integration.ts:42](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L42)

***

### E2EConfig

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:21](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L21)

#### Properties

##### baseUrl

> **baseUrl**: `string`

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:23](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L23)

Base URL for the application

##### captureScreenshots

> **captureScreenshots**: `boolean`

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:27](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L27)

Whether to capture screenshots

##### pageTimeout

> **pageTimeout**: `number`

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:25](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L25)

Timeout for page loads in ms

##### puppeteerAvailable

> **puppeteerAvailable**: `boolean`

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:31](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L31)

Whether Puppeteer MCP is available

##### screenshotDir

> **screenshotDir**: `string`

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:29](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L29)

Directory for screenshots

***

### EnvironmentContext

Defined in: [packages/claude-worker/src/harness/initializer.ts:55](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L55)

#### Properties

##### cwd

> **cwd**: `string`

Defined in: [packages/claude-worker/src/harness/initializer.ts:57](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L57)

Current working directory

##### featureSummary

> **featureSummary**: `object`

Defined in: [packages/claude-worker/src/harness/initializer.ts:65](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L65)

Feature list summary

###### completed

> **completed**: `number`

###### failed

> **failed**: `number`

###### pending

> **pending**: `number`

###### total

> **total**: `number`

##### gitBranch?

> `optional` **gitBranch**: `string`

Defined in: [packages/claude-worker/src/harness/initializer.ts:59](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L59)

Git branch name

##### lastSessionTime?

> `optional` **lastSessionTime**: `string`

Defined in: [packages/claude-worker/src/harness/initializer.ts:72](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L72)

Last session timestamp

##### modifiedFiles

> **modifiedFiles**: `string`[]

Defined in: [packages/claude-worker/src/harness/initializer.ts:74](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L74)

Files modified since last session

##### progressNotes

> **progressNotes**: `string`[]

Defined in: [packages/claude-worker/src/harness/initializer.ts:63](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L63)

Progress file contents

##### recentCommits

> **recentCommits**: `string`[]

Defined in: [packages/claude-worker/src/harness/initializer.ts:61](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L61)

Recent git commits

***

### ExecutionResult

Defined in: [packages/claude-worker/src/executor.ts:38](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/executor.ts#L38)

#### Properties

##### error?

> `optional` **error**: `string`

Defined in: [packages/claude-worker/src/executor.ts:41](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/executor.ts#L41)

##### files

> **files**: `string`[]

Defined in: [packages/claude-worker/src/executor.ts:40](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/executor.ts#L40)

##### sessionId?

> `optional` **sessionId**: `string`

Defined in: [packages/claude-worker/src/executor.ts:42](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/executor.ts#L42)

##### success

> **success**: `boolean`

Defined in: [packages/claude-worker/src/executor.ts:39](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/executor.ts#L39)

***

### ExecutorConfig

Defined in: [packages/claude-worker/src/executor.ts:25](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/executor.ts#L25)

#### Properties

##### apiKey

> **apiKey**: `string`

Defined in: [packages/claude-worker/src/executor.ts:27](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/executor.ts#L27)

Anthropic API key

##### maxTurns?

> `optional` **maxTurns**: `number`

Defined in: [packages/claude-worker/src/executor.ts:31](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/executor.ts#L31)

Maximum turns per feature

##### model

> **model**: `string`

Defined in: [packages/claude-worker/src/executor.ts:29](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/executor.ts#L29)

Model to use

##### permissionMode?

> `optional` **permissionMode**: `"default"` \| `"acceptEdits"` \| `"bypassPermissions"`

Defined in: [packages/claude-worker/src/executor.ts:33](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/executor.ts#L33)

Permission mode

##### useMock?

> `optional` **useMock**: `boolean`

Defined in: [packages/claude-worker/src/executor.ts:35](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/executor.ts#L35)

Use mock implementation (for testing)

***

### HarnessConfig

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:33](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L33)

#### Properties

##### addE2ESetupFeature

> **addE2ESetupFeature**: `boolean`

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:49](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L49)

Whether to add E2E setup feature to feature list

##### autoCommit

> **autoCommit**: `boolean`

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:43](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L43)

Whether to commit after each feature

##### baseUrl

> **baseUrl**: `string`

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:55](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L55)

Base URL for E2E verification

##### checkDevServer

> **checkDevServer**: `boolean`

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:53](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L53)

Whether to check/start dev server before running

##### featureListFile

> **featureListFile**: `string`

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:39](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L39)

Path to feature list file

##### initScript

> **initScript**: `string`

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:41](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L41)

Path to init script

##### maxRetries

> **maxRetries**: `number`

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:45](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L45)

Maximum retries per feature

##### progressFile

> **progressFile**: `string`

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:37](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L37)

Path to progress file

##### puppeteerAvailable

> **puppeteerAvailable**: `boolean`

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:57](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L57)

Whether Puppeteer MCP is available

##### runE2EBeforeFeature

> **runE2EBeforeFeature**: `boolean`

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:47](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L47)

Whether to run E2E verification before each feature

##### runInitScript

> **runInitScript**: `boolean`

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:51](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L51)

Whether to run init script during initialization

##### workDir

> **workDir**: `string`

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:35](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L35)

Working directory for the task

***

### HarnessState

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:60](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L60)

#### Properties

##### artifactsCreated

> **artifactsCreated**: `string`[]

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:66](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L66)

Files created during execution

##### artifactsModified

> **artifactsModified**: `string`[]

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:68](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L68)

Files modified during execution

##### commits

> **commits**: `string`[]

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:70](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L70)

Git commits made

##### context?

> `optional` **context**: [`EnvironmentContext`](#environmentcontext)

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:76](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L76)

Environment context from startup

##### currentIndex

> **currentIndex**: `number`

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:72](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L72)

Current feature index

##### e2eResults?

> `optional` **e2eResults**: [`VerificationResult`](#verificationresult)[]

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:78](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L78)

E2E verification results

##### features

> **features**: `object`

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:64](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L64)

Feature list being worked on

###### current\_index

> **current\_index**: `number`

###### features

> **features**: `object`[]

###### progress\_percent

> **progress\_percent**: `number`

###### task\_id

> **task\_id**: `string`

##### payload

> **payload**: `object`

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:62](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L62)

Task payload

###### context\_packet

> **context\_packet**: `object`

###### context\_packet.api\_contracts?

> `optional` **api\_contracts**: `string`[]

###### context\_packet.constraints?

> `optional` **constraints**: `string`[]

###### context\_packet.design\_specs?

> `optional` **design\_specs**: `string`[]

###### context\_packet.requirements

> **requirements**: `string`[]

###### excluded\_context?

> `optional` **excluded\_context**: `string`[]

###### founding\_intent

> **founding\_intent**: `string`

###### injected\_tools?

> `optional` **injected\_tools**: `string`[]

###### namespace

> **namespace**: `string`

###### persona\_scope

> **persona\_scope**: `string`

###### target\_layer

> **target\_layer**: `string`

###### task\_id

> **task\_id**: `string`

###### timeout\_seconds

> **timeout\_seconds**: `number`

##### startTime

> **startTime**: `Date`

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:74](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L74)

Start time

***

### InitializerConfig

Defined in: [packages/claude-worker/src/harness/initializer.ts:23](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L23)

#### Properties

##### addE2ESetupFeature

> **addE2ESetupFeature**: `boolean`

Defined in: [packages/claude-worker/src/harness/initializer.ts:35](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L35)

Whether to add E2E setup feature to feature list

##### createGitBaseline

> **createGitBaseline**: `boolean`

Defined in: [packages/claude-worker/src/harness/initializer.ts:33](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L33)

Whether to create initial git commit

##### devServerCommand?

> `optional` **devServerCommand**: `string`

Defined in: [packages/claude-worker/src/harness/initializer.ts:41](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L41)

Custom dev server command

##### devServerPort?

> `optional` **devServerPort**: `number`

Defined in: [packages/claude-worker/src/harness/initializer.ts:43](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L43)

Port for dev server

##### featureListFile

> **featureListFile**: `string`

Defined in: [packages/claude-worker/src/harness/initializer.ts:29](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L29)

Path to feature list file

##### initScript

> **initScript**: `string`

Defined in: [packages/claude-worker/src/harness/initializer.ts:31](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L31)

Path to init script

##### progressFile

> **progressFile**: `string`

Defined in: [packages/claude-worker/src/harness/initializer.ts:27](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L27)

Path to progress file

##### projectType?

> `optional` **projectType**: `"nextjs"` \| `"react"` \| `"node"` \| `"python"` \| `"generic"`

Defined in: [packages/claude-worker/src/harness/initializer.ts:39](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L39)

Project type for init.sh generation

##### runInitScript

> **runInitScript**: `boolean`

Defined in: [packages/claude-worker/src/harness/initializer.ts:37](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L37)

Whether to run init script after initialization

##### workDir

> **workDir**: `string`

Defined in: [packages/claude-worker/src/harness/initializer.ts:25](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L25)

Working directory for the project

***

### InitializerResult

Defined in: [packages/claude-worker/src/harness/initializer.ts:46](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L46)

#### Properties

##### baselineCommit?

> `optional` **baselineCommit**: `string`

Defined in: [packages/claude-worker/src/harness/initializer.ts:51](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L51)

##### error?

> `optional` **error**: `string`

Defined in: [packages/claude-worker/src/harness/initializer.ts:52](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L52)

##### featureListPath

> **featureListPath**: `string`

Defined in: [packages/claude-worker/src/harness/initializer.ts:48](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L48)

##### initScriptPath

> **initScriptPath**: `string`

Defined in: [packages/claude-worker/src/harness/initializer.ts:50](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L50)

##### progressFilePath

> **progressFilePath**: `string`

Defined in: [packages/claude-worker/src/harness/initializer.ts:49](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L49)

##### success

> **success**: `boolean`

Defined in: [packages/claude-worker/src/harness/initializer.ts:47](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L47)

***

### PageVerificationOptions

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:50](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L50)

#### Properties

##### customCheck?

> `optional` **customCheck**: `string`

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:62](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L62)

Custom verification function name

##### expectedTitle?

> `optional` **expectedTitle**: `string`

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:52](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L52)

Expected page title (substring match)

##### forbiddenSelectors?

> `optional` **forbiddenSelectors**: `string`[]

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:58](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L58)

Selectors that must NOT exist (error states)

##### maxConsoleErrors?

> `optional` **maxConsoleErrors**: `number`

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:60](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L60)

Maximum allowed console errors

##### requiredSelectors?

> `optional` **requiredSelectors**: `string`[]

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:54](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L54)

CSS selectors that must exist

##### requiredText?

> `optional` **requiredText**: `string`[]

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:56](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L56)

Text that must be present

***

### ShadcnComponent

Defined in: [packages/claude-worker/src/shadcn/integration.ts:22](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L22)

#### Properties

##### dependencies

> **dependencies**: `string`[]

Defined in: [packages/claude-worker/src/shadcn/integration.ts:28](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L28)

Component dependencies

##### name

> **name**: `string`

Defined in: [packages/claude-worker/src/shadcn/integration.ts:24](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L24)

Component name (e.g., 'button', 'card')

##### registryUrl

> **registryUrl**: `string`

Defined in: [packages/claude-worker/src/shadcn/integration.ts:30](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L30)

Registry URL for the component

##### style

> **style**: `"default"` \| `"new-york"`

Defined in: [packages/claude-worker/src/shadcn/integration.ts:26](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L26)

Component style variant

***

### ShadcnConfig

Defined in: [packages/claude-worker/src/shadcn/integration.ts:47](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L47)

#### Properties

##### componentsPath

> **componentsPath**: `string`

Defined in: [packages/claude-worker/src/shadcn/integration.ts:55](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L55)

Base path for components

##### projectRoot

> **projectRoot**: `string`

Defined in: [packages/claude-worker/src/shadcn/integration.ts:51](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L51)

Project root directory

##### rsc

> **rsc**: `boolean`

Defined in: [packages/claude-worker/src/shadcn/integration.ts:57](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L57)

Whether to enable RSC (React Server Components)

##### style

> **style**: `"default"` \| `"new-york"`

Defined in: [packages/claude-worker/src/shadcn/integration.ts:49](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L49)

shadcn/ui style variant

##### tailwindConfig?

> `optional` **tailwindConfig**: `string`

Defined in: [packages/claude-worker/src/shadcn/integration.ts:59](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L59)

Tailwind CSS config path

##### typescript

> **typescript**: `boolean`

Defined in: [packages/claude-worker/src/shadcn/integration.ts:53](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L53)

Whether to use TypeScript

***

### ShadcnLookupResult

Defined in: [packages/claude-worker/src/shadcn/integration.ts:33](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L33)

#### Properties

##### component?

> `optional` **component**: [`ShadcnComponent`](#shadcncomponent)

Defined in: [packages/claude-worker/src/shadcn/integration.ts:35](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L35)

##### error?

> `optional` **error**: `string`

Defined in: [packages/claude-worker/src/shadcn/integration.ts:38](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L38)

##### sourceCode?

> `optional` **sourceCode**: `string`

Defined in: [packages/claude-worker/src/shadcn/integration.ts:36](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L36)

##### success

> **success**: `boolean`

Defined in: [packages/claude-worker/src/shadcn/integration.ts:34](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L34)

##### usageExample?

> `optional` **usageExample**: `string`

Defined in: [packages/claude-worker/src/shadcn/integration.ts:37](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L37)

***

### VerificationCheck

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:43](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L43)

#### Properties

##### duration?

> `optional` **duration**: `number`

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:47](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L47)

##### message

> **message**: `string`

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:46](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L46)

##### name

> **name**: `string`

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:44](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L44)

##### passed

> **passed**: `boolean`

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:45](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L45)

***

### VerificationResult

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:34](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L34)

#### Properties

##### checks

> **checks**: [`VerificationCheck`](#verificationcheck)[]

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:37](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L37)

##### consoleErrors?

> `optional` **consoleErrors**: `string`[]

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:39](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L39)

##### error?

> `optional` **error**: `string`

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:40](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L40)

##### screenshots?

> `optional` **screenshots**: `string`[]

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:38](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L38)

##### success

> **success**: `boolean`

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:35](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L35)

##### url

> **url**: `string`

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:36](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L36)

## Type Aliases

### FeatureHandler()

> **FeatureHandler** = (`feature`, `state`, `config`) => `Promise`\<\{ `error?`: `string`; `files`: `string`[]; `success`: `boolean`; \}\>

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:81](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L81)

#### Parameters

##### feature

`FeatureItem`

##### state

[`HarnessState`](#harnessstate)

##### config

[`HarnessConfig`](#harnessconfig)

#### Returns

`Promise`\<\{ `error?`: `string`; `files`: `string`[]; `success`: `boolean`; \}\>

***

### ShadcnComponentName

> **ShadcnComponentName** = *typeof* [`SHADCN_COMPONENTS`](#shadcn_components)\[`number`\]

Defined in: [packages/claude-worker/src/shadcn/integration.ts:127](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L127)

## Variables

### DEFAULT\_SHADCN\_CONFIG

> `const` **DEFAULT\_SHADCN\_CONFIG**: [`ShadcnConfig`](#shadcnconfig)

Defined in: [packages/claude-worker/src/shadcn/integration.ts:132](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L132)

Default shadcn configuration

***

### DESIGN\_AGENT\_SHADCN\_CONSTRAINT

> `const` **DESIGN\_AGENT\_SHADCN\_CONSTRAINT**: `string`

Defined in: [packages/claude-worker/src/shadcn/integration.ts:188](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L188)

Design Agent constraint prompt
Injected during Design Layer (Layer 3) to ensure feasibility

***

### FRONTEND\_AGENT\_SYSTEM\_PROMPT

> `const` **FRONTEND\_AGENT\_SYSTEM\_PROMPT**: `string`

Defined in: [packages/claude-worker/src/shadcn/integration.ts:148](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L148)

System constraint prompt for Frontend Implementation Agent
Injected by Orchestrator when task.layer == 'implementation' and task.domain == 'frontend'

***

### PUPPETEER\_TOOL\_DEFINITION

> `const` **PUPPETEER\_TOOL\_DEFINITION**: `object`

Defined in: [packages/claude-worker/src/executor.ts:454](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/executor.ts#L454)

Puppeteer verification tool definition

#### Type Declaration

##### description

> **description**: `string` = `"Takes a screenshot of a rendered component for visual verification."`

##### input\_schema

> **input\_schema**: `object`

###### input\_schema.properties

> **properties**: `object`

###### input\_schema.properties.output\_path

> **output\_path**: `object`

###### input\_schema.properties.output\_path.description

> **description**: `string` = `"Path to save screenshot"`

###### input\_schema.properties.output\_path.type

> **type**: `string` = `"string"`

###### input\_schema.properties.selector

> **selector**: `object`

###### input\_schema.properties.selector.description

> **description**: `string` = `"CSS selector to capture (optional, captures full page if not specified)"`

###### input\_schema.properties.selector.type

> **type**: `string` = `"string"`

###### input\_schema.properties.url

> **url**: `object`

###### input\_schema.properties.url.description

> **description**: `string` = `"URL to screenshot (e.g., http://localhost:3000/component)"`

###### input\_schema.properties.url.type

> **type**: `string` = `"string"`

###### input\_schema.required

> **required**: `string`[]

###### input\_schema.type

> **type**: `"object"`

##### name

> **name**: `string` = `"puppeteer_screenshot"`

***

### SHADCN\_CHECK\_TOOL

> `const` **SHADCN\_CHECK\_TOOL**: `object`

Defined in: [packages/claude-worker/src/shadcn/integration.ts:270](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L270)

Component availability check tool

#### Type Declaration

##### description

> **description**: `string`

##### input\_schema

> **input\_schema**: `object`

###### input\_schema.properties

> **properties**: `object`

###### input\_schema.properties.component\_name

> **component\_name**: `object`

###### input\_schema.properties.component\_name.description

> **description**: `string` = `"Component name to check"`

###### input\_schema.properties.component\_name.type

> **type**: `string` = `"string"`

###### input\_schema.required

> **required**: `string`[]

###### input\_schema.type

> **type**: `"object"`

##### name

> **name**: `string` = `"shadcn_check"`

***

### SHADCN\_COMPONENTS

> `const` **SHADCN\_COMPONENTS**: readonly \[`"accordion"`, `"aspect-ratio"`, `"card"`, `"collapsible"`, `"resizable"`, `"scroll-area"`, `"separator"`, `"sheet"`, `"tabs"`, `"button"`, `"checkbox"`, `"form"`, `"input"`, `"label"`, `"radio-group"`, `"select"`, `"slider"`, `"switch"`, `"textarea"`, `"toggle"`, `"toggle-group"`, `"avatar"`, `"badge"`, `"calendar"`, `"data-table"`, `"hover-card"`, `"progress"`, `"skeleton"`, `"table"`, `"tooltip"`, `"alert"`, `"alert-dialog"`, `"dialog"`, `"drawer"`, `"popover"`, `"sonner"`, `"toast"`, `"breadcrumb"`, `"command"`, `"context-menu"`, `"dropdown-menu"`, `"menubar"`, `"navigation-menu"`, `"pagination"`, `"carousel"`, `"chart"`, `"input-otp"`, `"sidebar"`\]

Defined in: [packages/claude-worker/src/shadcn/integration.ts:70](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L70)

Available shadcn/ui components
This list is used for validation before MCP lookup

***

### SHADCN\_INSTALL\_TOOL

> `const` **SHADCN\_INSTALL\_TOOL**: `object`

Defined in: [packages/claude-worker/src/shadcn/integration.ts:244](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L244)

Component installation tool definition

#### Type Declaration

##### description

> **description**: `string`

##### input\_schema

> **input\_schema**: `object`

###### input\_schema.properties

> **properties**: `object`

###### input\_schema.properties.component\_name

> **component\_name**: `object`

###### input\_schema.properties.component\_name.description

> **description**: `string` = `"Component to install"`

###### input\_schema.properties.component\_name.enum

> **enum**: readonly \[`"accordion"`, `"aspect-ratio"`, `"card"`, `"collapsible"`, `"resizable"`, `"scroll-area"`, `"separator"`, `"sheet"`, `"tabs"`, `"button"`, `"checkbox"`, `"form"`, `"input"`, `"label"`, `"radio-group"`, `"select"`, `"slider"`, `"switch"`, `"textarea"`, `"toggle"`, `"toggle-group"`, `"avatar"`, `"badge"`, `"calendar"`, `"data-table"`, `"hover-card"`, `"progress"`, `"skeleton"`, `"table"`, `"tooltip"`, `"alert"`, `"alert-dialog"`, `"dialog"`, `"drawer"`, `"popover"`, `"sonner"`, `"toast"`, `"breadcrumb"`, `"command"`, `"context-menu"`, `"dropdown-menu"`, `"menubar"`, `"navigation-menu"`, `"pagination"`, `"carousel"`, `"chart"`, `"input-otp"`, `"sidebar"`\] = `SHADCN_COMPONENTS`

###### input\_schema.properties.component\_name.type

> **type**: `string` = `"string"`

###### input\_schema.properties.overwrite

> **overwrite**: `object`

###### input\_schema.properties.overwrite.description

> **description**: `string` = `"Overwrite existing component files"`

###### input\_schema.properties.overwrite.type

> **type**: `string` = `"boolean"`

###### input\_schema.required

> **required**: `string`[]

###### input\_schema.type

> **type**: `"object"`

##### name

> **name**: `string` = `"shadcn_install"`

***

### SHADCN\_LOOKUP\_TOOL

> `const` **SHADCN\_LOOKUP\_TOOL**: `object`

Defined in: [packages/claude-worker/src/shadcn/integration.ts:209](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L209)

Enhanced shadcn lookup tool definition for Claude SDK

#### Type Declaration

##### description

> **description**: `string`

##### input\_schema

> **input\_schema**: `object`

###### input\_schema.properties

> **properties**: `object`

###### input\_schema.properties.component\_name

> **component\_name**: `object`

###### input\_schema.properties.component\_name.description

> **description**: `string` = `"Component name (e.g., 'button', 'card', 'sheet', 'dialog')"`

###### input\_schema.properties.component\_name.enum

> **enum**: readonly \[`"accordion"`, `"aspect-ratio"`, `"card"`, `"collapsible"`, `"resizable"`, `"scroll-area"`, `"separator"`, `"sheet"`, `"tabs"`, `"button"`, `"checkbox"`, `"form"`, `"input"`, `"label"`, `"radio-group"`, `"select"`, `"slider"`, `"switch"`, `"textarea"`, `"toggle"`, `"toggle-group"`, `"avatar"`, `"badge"`, `"calendar"`, `"data-table"`, `"hover-card"`, `"progress"`, `"skeleton"`, `"table"`, `"tooltip"`, `"alert"`, `"alert-dialog"`, `"dialog"`, `"drawer"`, `"popover"`, `"sonner"`, `"toast"`, `"breadcrumb"`, `"command"`, `"context-menu"`, `"dropdown-menu"`, `"menubar"`, `"navigation-menu"`, `"pagination"`, `"carousel"`, `"chart"`, `"input-otp"`, `"sidebar"`\] = `SHADCN_COMPONENTS`

###### input\_schema.properties.component\_name.type

> **type**: `string` = `"string"`

###### input\_schema.properties.include\_dependencies

> **include\_dependencies**: `object`

###### input\_schema.properties.include\_dependencies.description

> **description**: `string` = `"Whether to include component dependencies in response"`

###### input\_schema.properties.include\_dependencies.type

> **type**: `string` = `"boolean"`

###### input\_schema.properties.style

> **style**: `object`

###### input\_schema.properties.style.description

> **description**: `string` = `"Style variant (default: 'default')"`

###### input\_schema.properties.style.enum

> **enum**: `string`[]

###### input\_schema.properties.style.type

> **type**: `string` = `"string"`

###### input\_schema.required

> **required**: `string`[]

###### input\_schema.type

> **type**: `"object"`

##### name

> **name**: `string` = `"shadcn_lookup"`

***

### SHADCN\_MCP\_CONFIG

> `const` **SHADCN\_MCP\_CONFIG**: `object`

Defined in: [packages/claude-worker/src/shadcn/integration.ts:494](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L494)

MCP server configuration for shadcn

#### Type Declaration

##### args

> **args**: `string`[]

##### command

> **command**: `string` = `"npx"`

##### env

> **env**: `object` = `{}`

***

### SHADCN\_TOOL\_DEFINITION

> `const` **SHADCN\_TOOL\_DEFINITION**: `object`

Defined in: [packages/claude-worker/src/executor.ts:431](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/executor.ts#L431)

Shadcn MCP tool definition for Claude SDK

#### Type Declaration

##### description

> **description**: `string` = `"Retrieves the official code and usage examples for a UI component. Use this BEFORE writing any JSX."`

##### input\_schema

> **input\_schema**: `object`

###### input\_schema.properties

> **properties**: `object`

###### input\_schema.properties.component\_name

> **component\_name**: `object`

###### input\_schema.properties.component\_name.description

> **description**: `string` = `"e.g., 'button', 'card', 'sheet'"`

###### input\_schema.properties.component\_name.type

> **type**: `string` = `"string"`

###### input\_schema.properties.style

> **style**: `object`

###### input\_schema.properties.style.enum

> **enum**: `string`[]

###### input\_schema.properties.style.type

> **type**: `string` = `"string"`

###### input\_schema.required

> **required**: `string`[]

###### input\_schema.type

> **type**: `"object"`

##### name

> **name**: `string` = `"shadcn_lookup"`

***

### VERIFICATION\_PRESETS

> `const` **VERIFICATION\_PRESETS**: `object`

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:488](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L488)

Common verification presets for different page types

#### Type Declaration

##### apiEndpoint

> **apiEndpoint**: `object`

###### apiEndpoint.forbiddenSelectors

> **forbiddenSelectors**: `never`[] = `[]`

###### apiEndpoint.requiredText

> **requiredText**: `string`[]

##### dashboard

> **dashboard**: `object`

###### dashboard.forbiddenSelectors

> **forbiddenSelectors**: `string`[]

###### dashboard.maxConsoleErrors

> **maxConsoleErrors**: `number` = `0`

###### dashboard.requiredSelectors

> **requiredSelectors**: `string`[]

##### form

> **form**: `object`

###### form.forbiddenSelectors

> **forbiddenSelectors**: `string`[]

###### form.requiredSelectors

> **requiredSelectors**: `string`[]

##### homepage

> **homepage**: `object`

###### homepage.expectedTitle

> **expectedTitle**: `undefined` = `undefined`

###### homepage.forbiddenSelectors

> **forbiddenSelectors**: `string`[]

###### homepage.maxConsoleErrors

> **maxConsoleErrors**: `number` = `0`

###### homepage.requiredSelectors

> **requiredSelectors**: `string`[]

##### loginPage

> **loginPage**: `object`

###### loginPage.forbiddenSelectors

> **forbiddenSelectors**: `string`[]

###### loginPage.requiredSelectors

> **requiredSelectors**: `string`[]

###### loginPage.requiredText

> **requiredText**: `string`[]

## Functions

### buildShadcnMcpConfig()

> **buildShadcnMcpConfig**(`projectRoot`): `object`

Defined in: [packages/claude-worker/src/shadcn/integration.ts:505](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L505)

Build MCP server config with custom project root

#### Parameters

##### projectRoot

`string`

#### Returns

`object`

##### args

> **args**: `string`[]

##### command

> **command**: `string`

##### env

> **env**: `Record`\<`string`, `string`\>

***

### createClaudeExecutor()

> **createClaudeExecutor**(`config`): [`ClaudeExecutor`](#claudeexecutor)

Defined in: [packages/claude-worker/src/executor.ts:75](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/executor.ts#L75)

Create a Claude executor instance using the real Claude Agent SDK

#### Parameters

##### config

[`ExecutorConfig`](#executorconfig)

#### Returns

[`ClaudeExecutor`](#claudeexecutor)

***

### createCodingLoopHarness()

> **createCodingLoopHarness**(`featureHandler`, `config?`): [`CodingLoopHarness`](#codingloopharness)

Defined in: [packages/claude-worker/src/harness/coding-loop.ts:613](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/coding-loop.ts#L613)

Create a coding loop harness instance

#### Parameters

##### featureHandler

[`FeatureHandler`](#featurehandler)

##### config?

`Partial`\<[`HarnessConfig`](#harnessconfig)\>

#### Returns

[`CodingLoopHarness`](#codingloopharness)

***

### createE2EVerification()

> **createE2EVerification**(`config?`): [`E2EVerification`](#e2everification)

Defined in: [packages/claude-worker/src/harness/e2e-verification.ts:481](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/e2e-verification.ts#L481)

Create an E2E verification instance

#### Parameters

##### config?

`Partial`\<[`E2EConfig`](#e2econfig)\>

#### Returns

[`E2EVerification`](#e2everification)

***

### createInitializer()

> **createInitializer**(`config?`): [`Initializer`](#initializer)

Defined in: [packages/claude-worker/src/harness/initializer.ts:786](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/harness/initializer.ts#L786)

Create an initializer instance

#### Parameters

##### config?

`Partial`\<[`InitializerConfig`](#initializerconfig)\>

#### Returns

[`Initializer`](#initializer)

***

### createShadcnIntegration()

> **createShadcnIntegration**(`config?`): [`ShadcnIntegration`](#shadcnintegration)

Defined in: [packages/claude-worker/src/shadcn/integration.ts:483](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/claude-worker/src/shadcn/integration.ts#L483)

Create a shadcn integration instance

#### Parameters

##### config?

`Partial`\<[`ShadcnConfig`](#shadcnconfig)\>

#### Returns

[`ShadcnIntegration`](#shadcnintegration)
