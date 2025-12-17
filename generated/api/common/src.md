[**Helix API Documentation v0.1.0**](../README.md)

***

[Helix API Documentation](../README.md) / common/src

# common/src

## Enumerations

### ErrorCode

Defined in: [packages/common/src/errors/index.ts:6](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L6)

Helix Error Codes
Centralized error handling for all MCP servers

#### Enumeration Members

##### AUTHORITY\_VIOLATION

> **AUTHORITY\_VIOLATION**: `"AUTHORITY_VIOLATION"`

Defined in: [packages/common/src/errors/index.ts:24](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L24)

##### CML\_PARSE\_ERROR

> **CML\_PARSE\_ERROR**: `"CML_PARSE_ERROR"`

Defined in: [packages/common/src/errors/index.ts:32](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L32)

##### CONFIG\_LOAD\_ERROR

> **CONFIG\_LOAD\_ERROR**: `"CONFIG_LOAD_ERROR"`

Defined in: [packages/common/src/errors/index.ts:47](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L47)

##### CYCLE\_DETECTED

> **CYCLE\_DETECTED**: `"CYCLE_DETECTED"`

Defined in: [packages/common/src/errors/index.ts:15](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L15)

##### DISCOVERY\_FAILED

> **DISCOVERY\_FAILED**: `"DISCOVERY_FAILED"`

Defined in: [packages/common/src/errors/index.ts:35](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L35)

##### DRIFT\_DETECTED

> **DRIFT\_DETECTED**: `"DRIFT_DETECTED"`

Defined in: [packages/common/src/errors/index.ts:40](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L40)

##### FITNESS\_FAILED

> **FITNESS\_FAILED**: `"FITNESS_FAILED"`

Defined in: [packages/common/src/errors/index.ts:42](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L42)

##### GATE\_NOT\_PASSED

> **GATE\_NOT\_PASSED**: `"GATE_NOT_PASSED"`

Defined in: [packages/common/src/errors/index.ts:19](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L19)

##### GATE\_REJECTED

> **GATE\_REJECTED**: `"GATE_REJECTED"`

Defined in: [packages/common/src/errors/index.ts:21](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L21)

##### GATE\_TIMEOUT

> **GATE\_TIMEOUT**: `"GATE_TIMEOUT"`

Defined in: [packages/common/src/errors/index.ts:20](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L20)

##### INTERNAL\_ERROR

> **INTERNAL\_ERROR**: `"INTERNAL_ERROR"`

Defined in: [packages/common/src/errors/index.ts:50](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L50)

##### INVALID\_RELATIONSHIP

> **INVALID\_RELATIONSHIP**: `"INVALID_RELATIONSHIP"`

Defined in: [packages/common/src/errors/index.ts:16](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L16)

##### INVALID\_UID

> **INVALID\_UID**: `"INVALID_UID"`

Defined in: [packages/common/src/errors/index.ts:8](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L8)

##### LAYER\_VIOLATION

> **LAYER\_VIOLATION**: `"LAYER_VIOLATION"`

Defined in: [packages/common/src/errors/index.ts:14](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L14)

##### MAD\_NO\_CONSENSUS

> **MAD\_NO\_CONSENSUS**: `"MAD_NO_CONSENSUS"`

Defined in: [packages/common/src/errors/index.ts:36](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L36)

##### NEO4J\_CONNECTION\_ERROR

> **NEO4J\_CONNECTION\_ERROR**: `"NEO4J_CONNECTION_ERROR"`

Defined in: [packages/common/src/errors/index.ts:45](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L45)

##### NOT\_IMPLEMENTED

> **NOT\_IMPLEMENTED**: `"NOT_IMPLEMENTED"`

Defined in: [packages/common/src/errors/index.ts:51](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L51)

##### ONTOLOGY\_NOT\_FOUND

> **ONTOLOGY\_NOT\_FOUND**: `"ONTOLOGY_NOT_FOUND"`

Defined in: [packages/common/src/errors/index.ts:37](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L37)

##### ORPHAN\_ARTIFACT

> **ORPHAN\_ARTIFACT**: `"ORPHAN_ARTIFACT"`

Defined in: [packages/common/src/errors/index.ts:13](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L13)

##### REDIS\_CONNECTION\_ERROR

> **REDIS\_CONNECTION\_ERROR**: `"REDIS_CONNECTION_ERROR"`

Defined in: [packages/common/src/errors/index.ts:46](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L46)

##### SCHEMA\_MISMATCH

> **SCHEMA\_MISMATCH**: `"SCHEMA_MISMATCH"`

Defined in: [packages/common/src/errors/index.ts:31](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L31)

##### SMT\_PROOF\_FAILED

> **SMT\_PROOF\_FAILED**: `"SMT_PROOF_FAILED"`

Defined in: [packages/common/src/errors/index.ts:41](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L41)

##### TENANT\_VIOLATION

> **TENANT\_VIOLATION**: `"TENANT_VIOLATION"`

Defined in: [packages/common/src/errors/index.ts:25](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L25)

##### TIMEOUT

> **TIMEOUT**: `"TIMEOUT"`

Defined in: [packages/common/src/errors/index.ts:52](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L52)

##### UID\_ALREADY\_EXISTS

> **UID\_ALREADY\_EXISTS**: `"UID_ALREADY_EXISTS"`

Defined in: [packages/common/src/errors/index.ts:10](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L10)

##### UID\_NOT\_FOUND

> **UID\_NOT\_FOUND**: `"UID_NOT_FOUND"`

Defined in: [packages/common/src/errors/index.ts:9](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L9)

##### UNAUTHORIZED

> **UNAUTHORIZED**: `"UNAUTHORIZED"`

Defined in: [packages/common/src/errors/index.ts:26](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L26)

##### VALIDATION\_ERROR

> **VALIDATION\_ERROR**: `"VALIDATION_ERROR"`

Defined in: [packages/common/src/errors/index.ts:29](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L29)

##### VALIDATION\_FAILED

> **VALIDATION\_FAILED**: `"VALIDATION_FAILED"`

Defined in: [packages/common/src/errors/index.ts:30](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L30)

## Classes

### HelixError

Defined in: [packages/common/src/errors/index.ts:63](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L63)

Base Helix Error class
All errors in the system should extend or use this class

#### Extends

- `Error`

#### Constructors

##### Constructor

> **new HelixError**(`code`, `message`, `context`): [`HelixError`](#helixerror)

Defined in: [packages/common/src/errors/index.ts:68](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L68)

###### Parameters

###### code

[`ErrorCode`](#errorcode)

###### message

`string`

###### context

[`ErrorContext`](#errorcontext) = `{}`

###### Returns

[`HelixError`](#helixerror)

###### Overrides

`Error.constructor`

#### Properties

##### code

> `readonly` **code**: [`ErrorCode`](#errorcode)

Defined in: [packages/common/src/errors/index.ts:64](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L64)

##### context

> `readonly` **context**: [`ErrorContext`](#errorcontext)

Defined in: [packages/common/src/errors/index.ts:65](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L65)

##### timestamp

> `readonly` **timestamp**: `Date`

Defined in: [packages/common/src/errors/index.ts:66](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L66)

#### Methods

##### toJSON()

> **toJSON**(): `object`

Defined in: [packages/common/src/errors/index.ts:79](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L79)

###### Returns

`object`

##### isHelixError()

> `static` **isHelixError**(`error`): `error is HelixError`

Defined in: [packages/common/src/errors/index.ts:89](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L89)

###### Parameters

###### error

`unknown`

###### Returns

`error is HelixError`

## Interfaces

### ErrorContext

Defined in: [packages/common/src/errors/index.ts:55](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L55)

@helix/common

Shared utilities, models, and clients for Helix MCP servers

#### Indexable

\[`key`: `string`\]: `unknown`

***

### EventBus

Defined in: [packages/common/src/events/index.ts:19](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/events/index.ts#L19)

#### Methods

##### close()

> **close**(): `Promise`\<`void`\>

Defined in: [packages/common/src/events/index.ts:38](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/events/index.ts#L38)

Close the event bus connections

###### Returns

`Promise`\<`void`\>

##### ping()

> **ping**(): `Promise`\<`boolean`\>

Defined in: [packages/common/src/events/index.ts:43](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/events/index.ts#L43)

Check connection health

###### Returns

`Promise`\<`boolean`\>

##### publish()

> **publish**(`channel`, `event`): `Promise`\<`string`\>

Defined in: [packages/common/src/events/index.ts:23](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/events/index.ts#L23)

Publish an event to a channel

###### Parameters

###### channel

`string`

###### event

`Omit`\<[`Event`](#event), `"id"` \| `"timestamp"`\>

###### Returns

`Promise`\<`string`\>

##### subscribe()

> **subscribe**(`channel`, `handler`): `Promise`\<`void`\>

Defined in: [packages/common/src/events/index.ts:28](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/events/index.ts#L28)

Subscribe to events on a channel

###### Parameters

###### channel

`string`

###### handler

[`EventHandler`](#eventhandler)

###### Returns

`Promise`\<`void`\>

##### unsubscribe()

> **unsubscribe**(`channel`): `Promise`\<`void`\>

Defined in: [packages/common/src/events/index.ts:33](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/events/index.ts#L33)

Unsubscribe from a channel

###### Parameters

###### channel

`string`

###### Returns

`Promise`\<`void`\>

***

### EventBusOptions

Defined in: [packages/common/src/events/index.ts:46](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/events/index.ts#L46)

#### Properties

##### keyPrefix?

> `optional` **keyPrefix**: `string`

Defined in: [packages/common/src/events/index.ts:50](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/events/index.ts#L50)

Prefix for all Redis keys

##### retryAttempts?

> `optional` **retryAttempts**: `number`

Defined in: [packages/common/src/events/index.ts:55](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/events/index.ts#L55)

Retry attempts for failed operations

##### retryDelayMs?

> `optional` **retryDelayMs**: `number`

Defined in: [packages/common/src/events/index.ts:60](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/events/index.ts#L60)

Retry delay in milliseconds

***

### EventCollector

Defined in: [packages/common/src/testing/redis-test-utils.ts:20](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/redis-test-utils.ts#L20)

#### Properties

##### clear()

> **clear**: () => `void`

Defined in: [packages/common/src/testing/redis-test-utils.ts:23](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/redis-test-utils.ts#L23)

###### Returns

`void`

##### events

> **events**: `object`[]

Defined in: [packages/common/src/testing/redis-test-utils.ts:21](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/redis-test-utils.ts#L21)

###### causationId?

> `optional` **causationId**: `string`

###### correlationId?

> `optional` **correlationId**: `string`

###### id

> **id**: `string`

###### namespace

> **namespace**: `string`

###### payload?

> `optional` **payload**: `unknown`

###### timestamp

> **timestamp**: `Date`

###### type

> **type**: `string`

##### handler

> **handler**: [`EventHandler`](#eventhandler)

Defined in: [packages/common/src/testing/redis-test-utils.ts:22](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/redis-test-utils.ts#L22)

##### waitForEvents()

> **waitForEvents**: (`count`, `timeoutMs?`) => `Promise`\<`object`[]\>

Defined in: [packages/common/src/testing/redis-test-utils.ts:24](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/redis-test-utils.ts#L24)

###### Parameters

###### count

`number`

###### timeoutMs?

`number`

###### Returns

`Promise`\<`object`[]\>

***

### GenerateUIDOptions

Defined in: [packages/common/src/uid/index.ts:465](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L465)

Options for generating a UID (Gold Standard)

#### Properties

##### artifactId

> **artifactId**: `string`

Defined in: [packages/common/src/uid/index.ts:479](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L479)

##### artifactType

> **artifactType**: `string`

Defined in: [packages/common/src/uid/index.ts:468](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L468)

##### compoundScopes?

> `optional` **compoundScopes**: `string`[]

Defined in: [packages/common/src/uid/index.ts:478](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L478)

Compound scopes for polysemic artifacts (Gold Standard)
Example: ["SAAS-ADMIN", "CANDIDATE"] → generates scope "SAAS-ADMIN+CANDIDATE"

##### derivesFrom?

> `optional` **derivesFrom**: `string`

Defined in: [packages/common/src/uid/index.ts:490](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L490)

Shorthand for queryParams.derives (Gold Standard)
Specifies explicit parent derivation

##### layer

> **layer**: `"api"` \| `"imp"` \| `"tst"` \| `"dat"` \| `"sec"` \| `"des"` \| `"persona"` \| `"biz"` \| `"req"` \| `"arc"` \| `"cmp"` \| `"inf"` \| `"doc"`

Defined in: [packages/common/src/uid/index.ts:467](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L467)

##### namespace

> **namespace**: `string`

Defined in: [packages/common/src/uid/index.ts:466](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L466)

##### personaScope?

> `optional` **personaScope**: `string`

Defined in: [packages/common/src/uid/index.ts:473](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L473)

Single persona scope (e.g., "SAAS-ADMIN")
For compound scopes, use compoundScopes array instead

##### queryParams?

> `optional` **queryParams**: `Record`\<`string`, `string`\>

Defined in: [packages/common/src/uid/index.ts:485](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L485)

Query parameters for explicit lineage (Gold Standard)
Example: { derives: "PARENT-ID" } → appends ?derives=PARENT-ID

##### version?

> `optional` **version**: `string`

Defined in: [packages/common/src/uid/index.ts:480](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L480)

***

### GraphClient

Defined in: [packages/common/src/graph/index.ts:20](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/graph/index.ts#L20)

#### Properties

##### driver

> **driver**: `Driver`

Defined in: [packages/common/src/graph/index.ts:21](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/graph/index.ts#L21)

#### Methods

##### close()

> **close**(): `Promise`\<`void`\>

Defined in: [packages/common/src/graph/index.ts:34](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/graph/index.ts#L34)

###### Returns

`Promise`\<`void`\>

##### query()

> **query**\<`T`\>(`cypher`, `params?`): `Promise`\<`QueryResult`\<`T`\>\>

Defined in: [packages/common/src/graph/index.ts:22](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/graph/index.ts#L22)

###### Type Parameters

###### T

`T` *extends* `RecordShape` = `RecordShape`

###### Parameters

###### cypher

`string`

###### params?

`Record`\<`string`, `unknown`\>

###### Returns

`Promise`\<`QueryResult`\<`T`\>\>

##### readQuery()

> **readQuery**\<`T`\>(`cypher`, `params?`): `Promise`\<`QueryResult`\<`T`\>\>

Defined in: [packages/common/src/graph/index.ts:26](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/graph/index.ts#L26)

###### Type Parameters

###### T

`T` *extends* `RecordShape` = `RecordShape`

###### Parameters

###### cypher

`string`

###### params?

`Record`\<`string`, `unknown`\>

###### Returns

`Promise`\<`QueryResult`\<`T`\>\>

##### verifyConnectivity()

> **verifyConnectivity**(): `Promise`\<`void`\>

Defined in: [packages/common/src/graph/index.ts:35](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/graph/index.ts#L35)

###### Returns

`Promise`\<`void`\>

##### writeQuery()

> **writeQuery**\<`T`\>(`cypher`, `params?`): `Promise`\<`QueryResult`\<`T`\>\>

Defined in: [packages/common/src/graph/index.ts:30](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/graph/index.ts#L30)

###### Type Parameters

###### T

`T` *extends* `RecordShape` = `RecordShape`

###### Parameters

###### cypher

`string`

###### params?

`Record`\<`string`, `unknown`\>

###### Returns

`Promise`\<`QueryResult`\<`T`\>\>

***

### HealthServerOptions

Defined in: [packages/common/src/health/http-health-server.ts:22](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/health/http-health-server.ts#L22)

#### Properties

##### checkNeo4j()

> **checkNeo4j**: () => `Promise`\<`boolean`\>

Defined in: [packages/common/src/health/http-health-server.ts:26](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/health/http-health-server.ts#L26)

###### Returns

`Promise`\<`boolean`\>

##### checkRedis()

> **checkRedis**: () => `Promise`\<`boolean`\>

Defined in: [packages/common/src/health/http-health-server.ts:27](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/health/http-health-server.ts#L27)

###### Returns

`Promise`\<`boolean`\>

##### port

> **port**: `number`

Defined in: [packages/common/src/health/http-health-server.ts:23](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/health/http-health-server.ts#L23)

##### serviceName

> **serviceName**: `string`

Defined in: [packages/common/src/health/http-health-server.ts:24](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/health/http-health-server.ts#L24)

##### version

> **version**: `string`

Defined in: [packages/common/src/health/http-health-server.ts:25](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/health/http-health-server.ts#L25)

***

### HealthStatus

Defined in: [packages/common/src/health/http-health-server.ts:10](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/health/http-health-server.ts#L10)

#### Properties

##### connections

> **connections**: `object`

Defined in: [packages/common/src/health/http-health-server.ts:14](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/health/http-health-server.ts#L14)

###### neo4j

> **neo4j**: `boolean`

###### redis

> **redis**: `boolean`

##### service

> **service**: `string`

Defined in: [packages/common/src/health/http-health-server.ts:12](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/health/http-health-server.ts#L12)

##### status

> **status**: `"healthy"` \| `"unhealthy"`

Defined in: [packages/common/src/health/http-health-server.ts:11](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/health/http-health-server.ts#L11)

##### timestamp

> **timestamp**: `string`

Defined in: [packages/common/src/health/http-health-server.ts:19](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/health/http-health-server.ts#L19)

##### uptime

> **uptime**: `number`

Defined in: [packages/common/src/health/http-health-server.ts:18](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/health/http-health-server.ts#L18)

##### version

> **version**: `string`

Defined in: [packages/common/src/health/http-health-server.ts:13](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/health/http-health-server.ts#L13)

***

### LLMClient

Defined in: [packages/common/src/llm/index.ts:19](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/llm/index.ts#L19)

#### Methods

##### complete()

> **complete**(`prompt`, `systemPrompt?`): `Promise`\<`string`\>

Defined in: [packages/common/src/llm/index.ts:20](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/llm/index.ts#L20)

###### Parameters

###### prompt

`string`

###### systemPrompt?

`string`

###### Returns

`Promise`\<`string`\>

##### completeWithSchema()

> **completeWithSchema**\<`T`\>(`prompt`, `systemPrompt`, `schema`): `Promise`\<`T`\>

Defined in: [packages/common/src/llm/index.ts:21](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/llm/index.ts#L21)

###### Type Parameters

###### T

`T`

###### Parameters

###### prompt

`string`

###### systemPrompt

`string`

###### schema

###### description

`string`

###### name

`string`

###### Returns

`Promise`\<`T`\>

***

### LLMConfig

Defined in: [packages/common/src/llm/index.ts:13](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/llm/index.ts#L13)

#### Properties

##### maxTokens

> **maxTokens**: `number`

Defined in: [packages/common/src/llm/index.ts:15](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/llm/index.ts#L15)

##### model

> **model**: `string`

Defined in: [packages/common/src/llm/index.ts:14](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/llm/index.ts#L14)

##### temperature

> **temperature**: `number`

Defined in: [packages/common/src/llm/index.ts:16](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/llm/index.ts#L16)

***

### McpHttpServerOptions

Defined in: [packages/common/src/health/mcp-http-server.ts:20](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/health/mcp-http-server.ts#L20)

#### Properties

##### checkNeo4j()

> **checkNeo4j**: () => `Promise`\<`boolean`\>

Defined in: [packages/common/src/health/mcp-http-server.ts:24](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/health/mcp-http-server.ts#L24)

###### Returns

`Promise`\<`boolean`\>

##### checkRedis()

> **checkRedis**: () => `Promise`\<`boolean`\>

Defined in: [packages/common/src/health/mcp-http-server.ts:25](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/health/mcp-http-server.ts#L25)

###### Returns

`Promise`\<`boolean`\>

##### port

> **port**: `number`

Defined in: [packages/common/src/health/mcp-http-server.ts:21](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/health/mcp-http-server.ts#L21)

##### serviceName

> **serviceName**: `string`

Defined in: [packages/common/src/health/mcp-http-server.ts:22](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/health/mcp-http-server.ts#L22)

##### version

> **version**: `string`

Defined in: [packages/common/src/health/mcp-http-server.ts:23](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/health/mcp-http-server.ts#L23)

***

### McpHttpServerResult

Defined in: [packages/common/src/health/mcp-http-server.ts:28](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/health/mcp-http-server.ts#L28)

#### Properties

##### connectMcpServer()

> **connectMcpServer**: (`mcpServer`) => `Promise`\<`void`\>

Defined in: [packages/common/src/health/mcp-http-server.ts:34](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/health/mcp-http-server.ts#L34)

Connect an MCP server instance to this HTTP server.
Call this after creating your MCP server to enable HTTP transport.

###### Parameters

###### mcpServer

`Server`

###### Returns

`Promise`\<`void`\>

##### httpServer

> **httpServer**: `Server`

Defined in: [packages/common/src/health/mcp-http-server.ts:29](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/health/mcp-http-server.ts#L29)

***

### Neo4jTestContext

Defined in: [packages/common/src/testing/neo4j-test-utils.ts:14](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/neo4j-test-utils.ts#L14)

#### Properties

##### cleanup()

> **cleanup**: () => `Promise`\<`void`\>

Defined in: [packages/common/src/testing/neo4j-test-utils.ts:16](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/neo4j-test-utils.ts#L16)

###### Returns

`Promise`\<`void`\>

##### client

> **client**: [`GraphClient`](#graphclient)

Defined in: [packages/common/src/testing/neo4j-test-utils.ts:15](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/neo4j-test-utils.ts#L15)

***

### ParsedUID

Defined in: [packages/common/src/uid/index.ts:154](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L154)

Parsed UID structure

#### Properties

##### artifactId

> **artifactId**: `string`

Defined in: [packages/common/src/uid/index.ts:175](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L175)

Unique artifact identifier

##### artifactType

> **artifactType**: `string`

Defined in: [packages/common/src/uid/index.ts:164](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L164)

Artifact type within the layer

##### compoundScopes?

> `optional` **compoundScopes**: `string`[]

Defined in: [packages/common/src/uid/index.ts:173](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L173)

Compound scopes for polysemic artifacts (Gold Standard)
When an artifact is shared across multiple personas, this array
contains all persona scopes (e.g., ["SAAS-ADMIN", "CANDIDATE"])
Parsed from personaScope with "+" delimiter

##### derivesFrom?

> `optional` **derivesFrom**: `string`

Defined in: [packages/common/src/uid/index.ts:187](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L187)

Explicit parent derivation from query params (Gold Standard)
Extracted from ?derives=PARENT_ID query parameter

##### layer

> **layer**: `"api"` \| `"imp"` \| `"tst"` \| `"dat"` \| `"sec"` \| `"des"` \| `"persona"` \| `"biz"` \| `"req"` \| `"arc"` \| `"cmp"` \| `"inf"` \| `"doc"`

Defined in: [packages/common/src/uid/index.ts:160](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L160)

Layer code

##### layerNumber

> **layerNumber**: `number`

Defined in: [packages/common/src/uid/index.ts:162](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L162)

Layer number (0-12)

##### namespace

> **namespace**: `string`

Defined in: [packages/common/src/uid/index.ts:158](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L158)

Namespace (project identifier)

##### personaScope?

> `optional` **personaScope**: `string`

Defined in: [packages/common/src/uid/index.ts:166](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L166)

Persona scope (optional, used for persona-specific artifacts)

##### queryParams?

> `optional` **queryParams**: `Record`\<`string`, `string`\>

Defined in: [packages/common/src/uid/index.ts:182](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L182)

Query parameters for explicit lineage (Gold Standard)
Example: ?derives=PARENT-ID specifies parent artifact

##### raw

> **raw**: `string`

Defined in: [packages/common/src/uid/index.ts:156](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L156)

Full original UID string

##### version?

> `optional` **version**: `string`

Defined in: [packages/common/src/uid/index.ts:177](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L177)

Semantic version (optional)

***

### RedisTestContext

Defined in: [packages/common/src/testing/redis-test-utils.ts:15](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/redis-test-utils.ts#L15)

#### Properties

##### cleanup()

> **cleanup**: () => `Promise`\<`void`\>

Defined in: [packages/common/src/testing/redis-test-utils.ts:17](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/redis-test-utils.ts#L17)

###### Returns

`Promise`\<`void`\>

##### eventBus

> **eventBus**: [`EventBus`](#eventbus)

Defined in: [packages/common/src/testing/redis-test-utils.ts:16](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/redis-test-utils.ts#L16)

## Type Aliases

### Artifact

> **Artifact** = `z.infer`\<*typeof* [`ArtifactSchema`](#artifactschema)\>

Defined in: [packages/common/src/models/index.ts:219](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L219)

***

### ArtifactStatus

> **ArtifactStatus** = `z.infer`\<*typeof* [`ArtifactStatus`](#artifactstatus-1)\>

Defined in: [packages/common/src/models/index.ts:41](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L41)

***

### AuditLog

> **AuditLog** = `z.infer`\<*typeof* [`AuditLogSchema`](#auditlogschema)\>

Defined in: [packages/common/src/models/index.ts:428](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L428)

***

### BoundedContext

> **BoundedContext** = `z.infer`\<*typeof* [`BoundedContextSchema`](#boundedcontextschema)\>

Defined in: [packages/common/src/models/index.ts:354](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L354)

***

### Conflict

> **Conflict** = `z.infer`\<*typeof* [`ConflictSchema`](#conflictschema)\>

Defined in: [packages/common/src/models/index.ts:383](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L383)

***

### DriftRecord

> **DriftRecord** = `z.infer`\<*typeof* [`DriftRecordSchema`](#driftrecordschema)\>

Defined in: [packages/common/src/models/index.ts:402](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L402)

***

### EnforcementConfig

> **EnforcementConfig** = `z.infer`\<*typeof* `EnforcementConfigSchema`\>

Defined in: [packages/common/src/config/index.ts:165](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/config/index.ts#L165)

***

### Event

> **Event** = `z.infer`\<*typeof* [`EventSchema`](#eventschema)\>

Defined in: [packages/common/src/models/index.ts:526](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L526)

***

### EventHandler()

> **EventHandler** = (`event`) => `Promise`\<`void`\>

Defined in: [packages/common/src/events/index.ts:17](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/events/index.ts#L17)

#### Parameters

##### event

[`Event`](#event)

#### Returns

`Promise`\<`void`\>

***

### EventsConfig

> **EventsConfig** = `z.infer`\<*typeof* `EventsConfigSchema`\>

Defined in: [packages/common/src/config/index.ts:162](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/config/index.ts#L162)

***

### FitnessFunctionResult

> **FitnessFunctionResult** = `z.infer`\<*typeof* [`FitnessFunctionResultSchema`](#fitnessfunctionresultschema)\>

Defined in: [packages/common/src/models/index.ts:511](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L511)

***

### Gate

> **Gate** = `z.infer`\<*typeof* [`GateSchema`](#gateschema)\>

Defined in: [packages/common/src/models/index.ts:260](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L260)

***

### GatesConfig

> **GatesConfig** = `z.infer`\<*typeof* `GatesConfigSchema`\>

Defined in: [packages/common/src/config/index.ts:164](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/config/index.ts#L164)

***

### GateStatus

> **GateStatus** = `z.infer`\<*typeof* [`GateStatus`](#gatestatus-1)\>

Defined in: [packages/common/src/models/index.ts:30](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L30)

***

### GraphConfig

> **GraphConfig** = `z.infer`\<*typeof* `GraphConfigSchema`\>

Defined in: [packages/common/src/config/index.ts:161](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/config/index.ts#L161)

***

### HelixConfig

> **HelixConfig** = `z.infer`\<*typeof* `HelixConfigSchema`\>

Defined in: [packages/common/src/config/index.ts:159](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/config/index.ts#L159)

***

### LayerCode

> **LayerCode** = keyof *typeof* [`LAYER_CODES`](#layer_codes)

Defined in: [packages/common/src/uid/index.ts:37](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L37)

***

### MADAgentResponse

> **MADAgentResponse** = `z.infer`\<*typeof* [`MADAgentResponseSchema`](#madagentresponseschema)\>

Defined in: [packages/common/src/models/index.ts:443](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L443)

***

### MADConfig

> **MADConfig** = `z.infer`\<*typeof* `MADConfigSchema`\>

Defined in: [packages/common/src/config/index.ts:163](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/config/index.ts#L163)

***

### MADSession

> **MADSession** = `z.infer`\<*typeof* [`MADSessionSchema`](#madsessionschema)\>

Defined in: [packages/common/src/models/index.ts:461](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L461)

***

### Persona

> **Persona** = `z.infer`\<*typeof* [`PersonaSchema`](#personaschema)\>

Defined in: [packages/common/src/models/index.ts:150](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L150)

***

### RBACPolicy

> **RBACPolicy** = `z.infer`\<*typeof* [`RBACPolicySchema`](#rbacpolicyschema)\>

Defined in: [packages/common/src/models/index.ts:477](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L477)

***

### Relationship

> **Relationship** = `z.infer`\<*typeof* [`RelationshipSchema`](#relationshipschema)\>

Defined in: [packages/common/src/models/index.ts:234](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L234)

***

### RelationshipType

> **RelationshipType** = `z.infer`\<*typeof* [`RelationshipType`](#relationshiptype-1)\>

Defined in: [packages/common/src/models/index.ts:18](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L18)

***

### Requirement

> **Requirement** = `z.infer`\<*typeof* [`RequirementSchema`](#requirementschema)\>

Defined in: [packages/common/src/models/index.ts:333](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L333)

***

### RLSPolicy

> **RLSPolicy** = `z.infer`\<*typeof* [`RLSPolicySchema`](#rlspolicyschema)\>

Defined in: [packages/common/src/models/index.ts:489](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L489)

***

### ServerConfig

> **ServerConfig** = `z.infer`\<*typeof* `ServerConfigSchema`\>

Defined in: [packages/common/src/config/index.ts:160](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/config/index.ts#L160)

***

### TenantMode

> **TenantMode** = `z.infer`\<*typeof* [`TenantMode`](#tenantmode-1)\>

Defined in: [packages/common/src/models/index.ts:38](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L38)

## Variables

### ARTIFACT\_TYPES

> `const` **ARTIFACT\_TYPES**: `Record`\<[`LayerCode`](#layercode), readonly `string`[]\>

Defined in: [packages/common/src/uid/index.ts:58](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L58)

Artifact types by layer

***

### ArtifactSchema

> `const` **ArtifactSchema**: `ZodObject`\<\{ `artifactType`: `ZodString`; `content`: `ZodUnknown`; `contentFormat`: `ZodEnum`\<\[`"cml"`, `"json"`, `"yaml"`, `"code"`, `"markdown"`, `"sql"`\]\>; `createdAt`: `ZodString`; `createdBy`: `ZodString`; `description`: `ZodOptional`\<`ZodString`\>; `lastModifiedAt`: `ZodString`; `lastModifiedBy`: `ZodString`; `layer`: `ZodEnum`\<\[`"api"` \| `"imp"` \| `"tst"` \| `"dat"` \| `"sec"` \| `"des"` \| `"persona"` \| `"biz"` \| `"req"` \| `"arc"` \| `"cmp"` \| `"inf"` \| `"doc"`, ...("api" \| "imp" \| "tst" \| "dat" \| "sec" \| "des" \| "persona" \| "biz" \| "req" \| "arc" \| "cmp" \| "inf" \| "doc")\[\]\]\>; `metadata`: `ZodOptional`\<`ZodRecord`\<`ZodString`, `ZodUnknown`\>\>; `name`: `ZodOptional`\<`ZodString`\>; `namespace`: `ZodOptional`\<`ZodString`\>; `parentUid`: `ZodString`; `personaScope`: `ZodString`; `status`: `ZodEnum`\<\[`"draft"`, `"active"`, `"stale"`, `"deprecated"`\]\>; `traceLinks`: `ZodArray`\<`ZodObject`\<\{ `metadata`: `ZodOptional`\<`ZodRecord`\<`ZodString`, `ZodUnknown`\>\>; `relationship`: `ZodEnum`\<\[`"derives-from"`, `"implements"`, `"tests"`, `"documents"`, `"conflicts-with"`, `"shares-with"`, `"depends-on"`, `"versioned-from"`\]\>; `targetUid`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `metadata?`: `Record`\<`string`, `unknown`\>; `relationship`: `"tests"` \| `"derives-from"` \| `"implements"` \| `"documents"` \| `"conflicts-with"` \| `"shares-with"` \| `"depends-on"` \| `"versioned-from"`; `targetUid`: `string`; \}, \{ `metadata?`: `Record`\<`string`, `unknown`\>; `relationship`: `"tests"` \| `"derives-from"` \| `"implements"` \| `"documents"` \| `"conflicts-with"` \| `"shares-with"` \| `"depends-on"` \| `"versioned-from"`; `targetUid`: `string`; \}\>, `"many"`\>; `uid`: `ZodString`; `validationStatus`: `ZodObject`\<\{ `authorityCheck`: `ZodOptional`\<`ZodEnum`\<\[`"PASSED"`, `"FAILED"`\]\>\>; `criticApproved`: `ZodOptional`\<`ZodBoolean`\>; `sdoCompliant`: `ZodOptional`\<`ZodBoolean`\>; `smtVerified`: `ZodOptional`\<`ZodBoolean`\>; \}, `"strip"`, `ZodTypeAny`, \{ `authorityCheck?`: `"FAILED"` \| `"PASSED"`; `criticApproved?`: `boolean`; `sdoCompliant?`: `boolean`; `smtVerified?`: `boolean`; \}, \{ `authorityCheck?`: `"FAILED"` \| `"PASSED"`; `criticApproved?`: `boolean`; `sdoCompliant?`: `boolean`; `smtVerified?`: `boolean`; \}\>; `version`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `artifactType`: `string`; `content?`: `unknown`; `contentFormat`: `"yaml"` \| `"code"` \| `"cml"` \| `"json"` \| `"markdown"` \| `"sql"`; `createdAt`: `string`; `createdBy`: `string`; `description?`: `string`; `lastModifiedAt`: `string`; `lastModifiedBy`: `string`; `layer`: `"api"` \| `"imp"` \| `"tst"` \| `"dat"` \| `"sec"` \| `"des"` \| `"persona"` \| `"biz"` \| `"req"` \| `"arc"` \| `"cmp"` \| `"inf"` \| `"doc"`; `metadata?`: `Record`\<`string`, `unknown`\>; `name?`: `string`; `namespace?`: `string`; `parentUid`: `string`; `personaScope`: `string`; `status`: `"deprecated"` \| `"draft"` \| `"active"` \| `"stale"`; `traceLinks`: `object`[]; `uid`: `string`; `validationStatus`: \{ `authorityCheck?`: `"FAILED"` \| `"PASSED"`; `criticApproved?`: `boolean`; `sdoCompliant?`: `boolean`; `smtVerified?`: `boolean`; \}; `version`: `string`; \}, \{ `artifactType`: `string`; `content?`: `unknown`; `contentFormat`: `"yaml"` \| `"code"` \| `"cml"` \| `"json"` \| `"markdown"` \| `"sql"`; `createdAt`: `string`; `createdBy`: `string`; `description?`: `string`; `lastModifiedAt`: `string`; `lastModifiedBy`: `string`; `layer`: `"api"` \| `"imp"` \| `"tst"` \| `"dat"` \| `"sec"` \| `"des"` \| `"persona"` \| `"biz"` \| `"req"` \| `"arc"` \| `"cmp"` \| `"inf"` \| `"doc"`; `metadata?`: `Record`\<`string`, `unknown`\>; `name?`: `string`; `namespace?`: `string`; `parentUid`: `string`; `personaScope`: `string`; `status`: `"deprecated"` \| `"draft"` \| `"active"` \| `"stale"`; `traceLinks`: `object`[]; `uid`: `string`; `validationStatus`: \{ `authorityCheck?`: `"FAILED"` \| `"PASSED"`; `criticApproved?`: `boolean`; `sdoCompliant?`: `boolean`; `smtVerified?`: `boolean`; \}; `version`: `string`; \}\>

Defined in: [packages/common/src/models/index.ts:181](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L181)

***

### ArtifactStatus

> `const` **ArtifactStatus**: `ZodEnum`\<\[`"draft"`, `"active"`, `"stale"`, `"deprecated"`\]\>

Defined in: [packages/common/src/models/index.ts:41](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L41)

***

### AuditLogSchema

> `const` **AuditLogSchema**: `ZodObject`\<\{ `action`: `ZodEnum`\<\[`"create"`, `"update"`, `"delete"`, `"link"`, `"unlink"`, `"approve"`, `"reject"`, `"regenerate"`\]\>; `changes`: `ZodOptional`\<`ZodRecord`\<`ZodString`, `ZodUnknown`\>\>; `entityType`: `ZodString`; `entityUid`: `ZodString`; `id`: `ZodString`; `metadata`: `ZodOptional`\<`ZodRecord`\<`ZodString`, `ZodUnknown`\>\>; `namespace`: `ZodString`; `timestamp`: `ZodDate`; `userId`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `action`: `"link"` \| `"create"` \| `"update"` \| `"delete"` \| `"unlink"` \| `"approve"` \| `"reject"` \| `"regenerate"`; `changes?`: `Record`\<`string`, `unknown`\>; `entityType`: `string`; `entityUid`: `string`; `id`: `string`; `metadata?`: `Record`\<`string`, `unknown`\>; `namespace`: `string`; `timestamp`: `Date`; `userId`: `string`; \}, \{ `action`: `"link"` \| `"create"` \| `"update"` \| `"delete"` \| `"unlink"` \| `"approve"` \| `"reject"` \| `"regenerate"`; `changes?`: `Record`\<`string`, `unknown`\>; `entityType`: `string`; `entityUid`: `string`; `id`: `string`; `metadata?`: `Record`\<`string`, `unknown`\>; `namespace`: `string`; `timestamp`: `Date`; `userId`: `string`; \}\>

Defined in: [packages/common/src/models/index.ts:408](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L408)

***

### AuditSchema

> `const` **AuditSchema**: `ZodObject`\<\{ `createdBy`: `ZodString`; `updatedBy`: `ZodString`; `version`: `ZodNumber`; \}, `"strip"`, `ZodTypeAny`, \{ `createdBy`: `string`; `updatedBy`: `string`; `version`: `number`; \}, \{ `createdBy`: `string`; `updatedBy`: `string`; `version`: `number`; \}\>

Defined in: [packages/common/src/models/index.ts:58](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L58)

***

### BACKWARD\_TRACEABILITY\_RULES

> `const` **BACKWARD\_TRACEABILITY\_RULES**: `Record`\<[`LayerCode`](#layercode), [`LayerCode`](#layercode)[]\>

Defined in: [packages/common/src/uid/index.ts:85](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L85)

Backward Traceability Rules

Defines which parent layers each layer can derive from.
This enforces the "No Orphans" rule and ensures proper cascade lineage.

For example:
- `api` can only derive from `arc` (architecture)
- `tst` can derive from `imp` (implementation) or `req` (requirement)
- `imp` can derive from `api`, `dat`, or `sec`

***

### BoundedContextSchema

> `const` **BoundedContextSchema**: `ZodObject`\<\{ `aggregates`: `ZodArray`\<`ZodString`, `"many"`\>; `createdAt`: `ZodDate`; `createdBy`: `ZodString`; `description`: `ZodString`; `domain`: `ZodString`; `downstreamContexts`: `ZodArray`\<`ZodString`, `"many"`\>; `metadata`: `ZodOptional`\<`ZodRecord`\<`ZodString`, `ZodUnknown`\>\>; `name`: `ZodString`; `namespace`: `ZodString`; `sharedKernel`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; `type`: `ZodEnum`\<\[`"core"`, `"supporting"`, `"generic"`\]\>; `uid`: `ZodString`; `updatedAt`: `ZodDate`; `updatedBy`: `ZodString`; `upstreamContexts`: `ZodArray`\<`ZodString`, `"many"`\>; `version`: `ZodNumber`; \}, `"strip"`, `ZodTypeAny`, \{ `aggregates`: `string`[]; `createdAt`: `Date`; `createdBy`: `string`; `description`: `string`; `domain`: `string`; `downstreamContexts`: `string`[]; `metadata?`: `Record`\<`string`, `unknown`\>; `name`: `string`; `namespace`: `string`; `sharedKernel?`: `string`[]; `type`: `"generic"` \| `"core"` \| `"supporting"`; `uid`: `string`; `updatedAt`: `Date`; `updatedBy`: `string`; `upstreamContexts`: `string`[]; `version`: `number`; \}, \{ `aggregates`: `string`[]; `createdAt`: `Date`; `createdBy`: `string`; `description`: `string`; `domain`: `string`; `downstreamContexts`: `string`[]; `metadata?`: `Record`\<`string`, `unknown`\>; `name`: `string`; `namespace`: `string`; `sharedKernel?`: `string`[]; `type`: `"generic"` \| `"core"` \| `"supporting"`; `uid`: `string`; `updatedAt`: `Date`; `updatedBy`: `string`; `upstreamContexts`: `string`[]; `version`: `number`; \}\>

Defined in: [packages/common/src/models/index.ts:339](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L339)

***

### ConflictSchema

> `const` **ConflictSchema**: `ZodObject`\<\{ `conflictType`: `ZodEnum`\<\[`"resource-contention"`, `"semantic-contradiction"`, `"temporal-conflict"`, `"priority-conflict"`\]\>; `createdAt`: `ZodDate`; `description`: `ZodString`; `id`: `ZodString`; `namespace`: `ZodString`; `requirement1Uid`: `ZodString`; `requirement2Uid`: `ZodString`; `resolution`: `ZodOptional`\<`ZodObject`\<\{ `notes`: `ZodOptional`\<`ZodString`\>; `resolvedAt`: `ZodOptional`\<`ZodDate`\>; `resolvedBy`: `ZodOptional`\<`ZodString`\>; `strategy`: `ZodEnum`\<\[`"merge"`, `"prioritize"`, `"defer"`, `"manual"`\]\>; \}, `"strip"`, `ZodTypeAny`, \{ `notes?`: `string`; `resolvedAt?`: `Date`; `resolvedBy?`: `string`; `strategy`: `"manual"` \| `"merge"` \| `"prioritize"` \| `"defer"`; \}, \{ `notes?`: `string`; `resolvedAt?`: `Date`; `resolvedBy?`: `string`; `strategy`: `"manual"` \| `"merge"` \| `"prioritize"` \| `"defer"`; \}\>\>; `severity`: `ZodEnum`\<\[`"low"`, `"medium"`, `"high"`, `"critical"`\]\>; `updatedAt`: `ZodDate`; \}, `"strip"`, `ZodTypeAny`, \{ `conflictType`: `"resource-contention"` \| `"semantic-contradiction"` \| `"temporal-conflict"` \| `"priority-conflict"`; `createdAt`: `Date`; `description`: `string`; `id`: `string`; `namespace`: `string`; `requirement1Uid`: `string`; `requirement2Uid`: `string`; `resolution?`: \{ `notes?`: `string`; `resolvedAt?`: `Date`; `resolvedBy?`: `string`; `strategy`: `"manual"` \| `"merge"` \| `"prioritize"` \| `"defer"`; \}; `severity`: `"low"` \| `"medium"` \| `"high"` \| `"critical"`; `updatedAt`: `Date`; \}, \{ `conflictType`: `"resource-contention"` \| `"semantic-contradiction"` \| `"temporal-conflict"` \| `"priority-conflict"`; `createdAt`: `Date`; `description`: `string`; `id`: `string`; `namespace`: `string`; `requirement1Uid`: `string`; `requirement2Uid`: `string`; `resolution?`: \{ `notes?`: `string`; `resolvedAt?`: `Date`; `resolvedBy?`: `string`; `strategy`: `"manual"` \| `"merge"` \| `"prioritize"` \| `"defer"`; \}; `severity`: `"low"` \| `"medium"` \| `"high"` \| `"critical"`; `updatedAt`: `Date`; \}\>

Defined in: [packages/common/src/models/index.ts:360](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L360)

***

### DEFAULT\_LLM\_CONFIG

> `const` **DEFAULT\_LLM\_CONFIG**: [`LLMConfig`](#llmconfig)

Defined in: [packages/common/src/llm/index.ts:28](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/llm/index.ts#L28)

***

### DriftRecordSchema

> `const` **DriftRecordSchema**: `ZodObject`\<\{ `artifactUid`: `ZodString`; `autoHealed`: `ZodDefault`\<`ZodBoolean`\>; `description`: `ZodString`; `detectedAt`: `ZodDate`; `driftType`: `ZodEnum`\<\[`"content"`, `"structure"`, `"relationship"`, `"missing"`\]\>; `id`: `ZodString`; `implHash`: `ZodString`; `namespace`: `ZodString`; `resolvedAt`: `ZodOptional`\<`ZodDate`\>; `severity`: `ZodEnum`\<\[`"info"`, `"warning"`, `"error"`, `"critical"`\]\>; `specHash`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `artifactUid`: `string`; `autoHealed`: `boolean`; `description`: `string`; `detectedAt`: `Date`; `driftType`: `"content"` \| `"missing"` \| `"relationship"` \| `"structure"`; `id`: `string`; `implHash`: `string`; `namespace`: `string`; `resolvedAt?`: `Date`; `severity`: `"error"` \| `"warning"` \| `"info"` \| `"critical"`; `specHash`: `string`; \}, \{ `artifactUid`: `string`; `autoHealed?`: `boolean`; `description`: `string`; `detectedAt`: `Date`; `driftType`: `"content"` \| `"missing"` \| `"relationship"` \| `"structure"`; `id`: `string`; `implHash`: `string`; `namespace`: `string`; `resolvedAt?`: `Date`; `severity`: `"error"` \| `"warning"` \| `"info"` \| `"critical"`; `specHash`: `string`; \}\>

Defined in: [packages/common/src/models/index.ts:389](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L389)

***

### Errors

> `const` **Errors**: `object`

Defined in: [packages/common/src/errors/index.ts:97](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/errors/index.ts#L97)

Factory functions for common errors

#### Type Declaration

##### authorityViolation()

> **authorityViolation**(`persona`, `action`, `resource`): [`HelixError`](#helixerror)

###### Parameters

###### persona

`string`

###### action

`string`

###### resource

`string`

###### Returns

[`HelixError`](#helixerror)

##### configLoadError()

> **configLoadError**(`path`, `reason`): [`HelixError`](#helixerror)

###### Parameters

###### path

`string`

###### reason

`string`

###### Returns

[`HelixError`](#helixerror)

##### cycleDetected()

> **cycleDetected**(`path`): [`HelixError`](#helixerror)

###### Parameters

###### path

`string`[]

###### Returns

[`HelixError`](#helixerror)

##### driftDetected()

> **driftDetected**(`uid`, `specState`, `implState`): [`HelixError`](#helixerror)

###### Parameters

###### uid

`string`

###### specState

`string`

###### implState

`string`

###### Returns

[`HelixError`](#helixerror)

##### gateNotPassed()

> **gateNotPassed**(`gateId`, `reason?`): [`HelixError`](#helixerror)

###### Parameters

###### gateId

`string`

###### reason?

`string`

###### Returns

[`HelixError`](#helixerror)

##### internal()

> **internal**(`message`, `context`): [`HelixError`](#helixerror)

###### Parameters

###### message

`string`

###### context

[`ErrorContext`](#errorcontext) = `{}`

###### Returns

[`HelixError`](#helixerror)

##### invalidUid()

> **invalidUid**(`uid`, `_reason?`): [`HelixError`](#helixerror)

###### Parameters

###### uid

`string`

###### \_reason?

`string`

###### Returns

[`HelixError`](#helixerror)

##### layerViolation()

> **layerViolation**(`fromLayer`, `toLayer`, `relationship`): [`HelixError`](#helixerror)

###### Parameters

###### fromLayer

`string`

###### toLayer

`string`

###### relationship

`string`

###### Returns

[`HelixError`](#helixerror)

##### neo4jConnectionError()

> **neo4jConnectionError**(`uri`, `originalError?`): [`HelixError`](#helixerror)

###### Parameters

###### uri

`string`

###### originalError?

`Error`

###### Returns

[`HelixError`](#helixerror)

##### orphanArtifact()

> **orphanArtifact**(`uid`, `layer`): [`HelixError`](#helixerror)

###### Parameters

###### uid

`string`

###### layer

`string`

###### Returns

[`HelixError`](#helixerror)

##### redisConnectionError()

> **redisConnectionError**(`host`, `port`, `originalError?`): [`HelixError`](#helixerror)

###### Parameters

###### host

`string`

###### port

`number`

###### originalError?

`Error`

###### Returns

[`HelixError`](#helixerror)

##### tenantViolation()

> **tenantViolation**(`tenantId`, `resourceTenantId`): [`HelixError`](#helixerror)

###### Parameters

###### tenantId

`string`

###### resourceTenantId

`string`

###### Returns

[`HelixError`](#helixerror)

##### uidNotFound()

> **uidNotFound**(`uid`): [`HelixError`](#helixerror)

###### Parameters

###### uid

`string`

###### Returns

[`HelixError`](#helixerror)

##### validationFailed()

> **validationFailed**(`field`, `reason`): [`HelixError`](#helixerror)

###### Parameters

###### field

`string`

###### reason

`string`

###### Returns

[`HelixError`](#helixerror)

***

### EventSchema

> `const` **EventSchema**: `ZodObject`\<\{ `causationId`: `ZodOptional`\<`ZodString`\>; `correlationId`: `ZodOptional`\<`ZodString`\>; `id`: `ZodString`; `namespace`: `ZodString`; `payload`: `ZodUnknown`; `timestamp`: `ZodDate`; `type`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `causationId?`: `string`; `correlationId?`: `string`; `id`: `string`; `namespace`: `string`; `payload?`: `unknown`; `timestamp`: `Date`; `type`: `string`; \}, \{ `causationId?`: `string`; `correlationId?`: `string`; `id`: `string`; `namespace`: `string`; `payload?`: `unknown`; `timestamp`: `Date`; `type`: `string`; \}\>

Defined in: [packages/common/src/models/index.ts:517](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L517)

***

### EventTypes

> `const` **EventTypes**: `object`

Defined in: [packages/common/src/models/index.ts:529](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L529)

#### Type Declaration

##### ARTIFACT\_CREATED

> `readonly` **ARTIFACT\_CREATED**: `"artifact.created"` = `"artifact.created"`

##### ARTIFACT\_DEPRECATED

> `readonly` **ARTIFACT\_DEPRECATED**: `"artifact.deprecated"` = `"artifact.deprecated"`

##### ARTIFACT\_LINKED

> `readonly` **ARTIFACT\_LINKED**: `"artifact.linked"` = `"artifact.linked"`

##### ARTIFACT\_REGENERATED

> `readonly` **ARTIFACT\_REGENERATED**: `"artifact.regenerated"` = `"artifact.regenerated"`

##### ARTIFACT\_UPDATED

> `readonly` **ARTIFACT\_UPDATED**: `"artifact.updated"` = `"artifact.updated"`

##### CONFLICT\_DETECTED

> `readonly` **CONFLICT\_DETECTED**: `"conflict.detected"` = `"conflict.detected"`

##### DRIFT\_DETECTED

> `readonly` **DRIFT\_DETECTED**: `"drift.detected"` = `"drift.detected"`

##### DRIFT\_RESOLVED

> `readonly` **DRIFT\_RESOLVED**: `"drift.resolved"` = `"drift.resolved"`

##### ECOSYSTEM\_BOOTSTRAPPED

> `readonly` **ECOSYSTEM\_BOOTSTRAPPED**: `"ecosystem.bootstrapped"` = `"ecosystem.bootstrapped"`

##### FITNESS\_FAILED

> `readonly` **FITNESS\_FAILED**: `"fitness.failed"` = `"fitness.failed"`

##### FITNESS\_PASSED

> `readonly` **FITNESS\_PASSED**: `"fitness.passed"` = `"fitness.passed"`

##### GATE\_APPROVED

> `readonly` **GATE\_APPROVED**: `"gate.approved"` = `"gate.approved"`

##### GATE\_REJECTED

> `readonly` **GATE\_REJECTED**: `"gate.rejected"` = `"gate.rejected"`

##### GATE\_REQUESTED

> `readonly` **GATE\_REQUESTED**: `"gate.requested"` = `"gate.requested"`

##### GATE\_TIMEOUT

> `readonly` **GATE\_TIMEOUT**: `"gate.timeout"` = `"gate.timeout"`

##### LAYER\_GENERATED

> `readonly` **LAYER\_GENERATED**: `"layer.generated"` = `"layer.generated"`

##### LAYER\_GENERATION\_COMPLETE

> `readonly` **LAYER\_GENERATION\_COMPLETE**: `"layer.generation_complete"` = `"layer.generation_complete"`

##### LAYER\_GENERATION\_STARTED

> `readonly` **LAYER\_GENERATION\_STARTED**: `"layer.generation_started"` = `"layer.generation_started"`

##### MAD\_CONSENSUS

> `readonly` **MAD\_CONSENSUS**: `"mad.consensus"` = `"mad.consensus"`

##### MAD\_ROUND\_COMPLETE

> `readonly` **MAD\_ROUND\_COMPLETE**: `"mad.round_complete"` = `"mad.round_complete"`

##### MAD\_STARTED

> `readonly` **MAD\_STARTED**: `"mad.started"` = `"mad.started"`

##### PERSONA\_DISCOVERED

> `readonly` **PERSONA\_DISCOVERED**: `"persona.discovered"` = `"persona.discovered"`

##### PERSONA\_REGISTERED

> `readonly` **PERSONA\_REGISTERED**: `"persona.registered"` = `"persona.registered"`

##### PERSONA\_UPDATED

> `readonly` **PERSONA\_UPDATED**: `"persona.updated"` = `"persona.updated"`

##### SECURITY\_PROOF\_COMPLETED

> `readonly` **SECURITY\_PROOF\_COMPLETED**: `"security.proof.completed"` = `"security.proof.completed"`

##### SHAREDKERNEL\_CREATED

> `readonly` **SHAREDKERNEL\_CREATED**: `"sharedkernel.created"` = `"sharedkernel.created"`

##### TRACEABILITY\_VIOLATION

> `readonly` **TRACEABILITY\_VIOLATION**: `"traceability.violation"` = `"traceability.violation"`

##### VERIFICATION\_COMPLETED

> `readonly` **VERIFICATION\_COMPLETED**: `"verification.completed"` = `"verification.completed"`

***

### ~~extractTenantFromNamespace()~~

> `const` **extractTenantFromNamespace**: (`namespace`) => `string` = `validateNamespace`

Defined in: [packages/common/src/uid/index.ts:930](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L930)

Validate a namespace string.

The namespace is the BUILD-TIME project identifier used in:
- UID generation (cpe:{namespace}/...)
- Ecosystem node identification
- Artifact graph scoping

This is DISTINCT from runtime tenant_id used for SaaS data isolation.

#### Parameters

##### namespace

`string`

The namespace string

#### Returns

`string`

The validated namespace

#### Throws

HelixError if namespace format is invalid

#### Deprecated

Use validateNamespace instead

***

### ~~extractTenantFromUid()~~

> `const` **extractTenantFromUid**: (`uid`) => `string` = `extractNamespaceFromUid`

Defined in: [packages/common/src/uid/index.ts:928](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L928)

Extract namespace from a UID string.

The namespace is the BUILD-TIME project identifier in the Artifact Graph.
This is DISTINCT from runtime tenant_id used for SaaS data isolation.

#### Parameters

##### uid

`string`

The UID string (e.g., "cpe:ulap/persona/CONTENT-CREATOR")

#### Returns

`string`

The namespace (e.g., "ulap")

#### Throws

HelixError if UID format is invalid

#### Deprecated

Use extractNamespaceFromUid instead

***

### FitnessFunctionResultSchema

> `const` **FitnessFunctionResultSchema**: `ZodObject`\<\{ `executedAt`: `ZodDate`; `executionTimeMs`: `ZodNumber`; `functionName`: `ZodString`; `id`: `ZodString`; `namespace`: `ZodString`; `passed`: `ZodBoolean`; `score`: `ZodOptional`\<`ZodNumber`\>; `violations`: `ZodArray`\<`ZodObject`\<\{ `artifactUid`: `ZodString`; `message`: `ZodString`; `severity`: `ZodEnum`\<\[`"info"`, `"warning"`, `"error"`\]\>; \}, `"strip"`, `ZodTypeAny`, \{ `artifactUid`: `string`; `message`: `string`; `severity`: `"error"` \| `"warning"` \| `"info"`; \}, \{ `artifactUid`: `string`; `message`: `string`; `severity`: `"error"` \| `"warning"` \| `"info"`; \}\>, `"many"`\>; \}, `"strip"`, `ZodTypeAny`, \{ `executedAt`: `Date`; `executionTimeMs`: `number`; `functionName`: `string`; `id`: `string`; `namespace`: `string`; `passed`: `boolean`; `score?`: `number`; `violations`: `object`[]; \}, \{ `executedAt`: `Date`; `executionTimeMs`: `number`; `functionName`: `string`; `id`: `string`; `namespace`: `string`; `passed`: `boolean`; `score?`: `number`; `violations`: `object`[]; \}\>

Defined in: [packages/common/src/models/index.ts:495](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L495)

***

### FORWARD\_TRACEABILITY\_RULES

> `const` **FORWARD\_TRACEABILITY\_RULES**: `Partial`\<`Record`\<[`LayerCode`](#layercode), `object`[]\>\>

Defined in: [packages/common/src/uid/index.ts:107](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L107)

Forward Traceability Rules

Defines what relationships should link TO each layer (for coverage checks).
Used for gap analysis - e.g., every requirement should have tests.

***

### GateSchema

> `const` **GateSchema**: `ZodObject`\<\{ `approvers`: `ZodArray`\<`ZodObject`\<\{ `approvedAt`: `ZodDate`; `comment`: `ZodOptional`\<`ZodString`\>; `userId`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `approvedAt`: `Date`; `comment?`: `string`; `userId`: `string`; \}, \{ `approvedAt`: `Date`; `comment?`: `string`; `userId`: `string`; \}\>, `"many"`\>; `artifactUids`: `ZodArray`\<`ZodString`, `"many"`\>; `createdAt`: `ZodDate`; `description`: `ZodString`; `gateNumber`: `ZodNumber`; `id`: `ZodString`; `metadata`: `ZodOptional`\<`ZodRecord`\<`ZodString`, `ZodUnknown`\>\>; `name`: `ZodString`; `namespace`: `ZodString`; `requiredApprovers`: `ZodNumber`; `status`: `ZodEnum`\<\[`"pending"`, `"approved"`, `"rejected"`, `"timeout"`\]\>; `timeoutAt`: `ZodOptional`\<`ZodDate`\>; `updatedAt`: `ZodDate`; \}, `"strip"`, `ZodTypeAny`, \{ `approvers`: `object`[]; `artifactUids`: `string`[]; `createdAt`: `Date`; `description`: `string`; `gateNumber`: `number`; `id`: `string`; `metadata?`: `Record`\<`string`, `unknown`\>; `name`: `string`; `namespace`: `string`; `requiredApprovers`: `number`; `status`: `"pending"` \| `"approved"` \| `"rejected"` \| `"timeout"`; `timeoutAt?`: `Date`; `updatedAt`: `Date`; \}, \{ `approvers`: `object`[]; `artifactUids`: `string`[]; `createdAt`: `Date`; `description`: `string`; `gateNumber`: `number`; `id`: `string`; `metadata?`: `Record`\<`string`, `unknown`\>; `name`: `string`; `namespace`: `string`; `requiredApprovers`: `number`; `status`: `"pending"` \| `"approved"` \| `"rejected"` \| `"timeout"`; `timeoutAt?`: `Date`; `updatedAt`: `Date`; \}\>

Defined in: [packages/common/src/models/index.ts:240](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L240)

***

### GateStatus

> `const` **GateStatus**: `ZodEnum`\<\[`"pending"`, `"approved"`, `"rejected"`, `"timeout"`\]\>

Defined in: [packages/common/src/models/index.ts:30](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L30)

***

### LAYER\_CODES

> `const` **LAYER\_CODES**: `object`

Defined in: [packages/common/src/uid/index.ts:21](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L21)

Layer codes and their numeric values

#### Type Declaration

##### api

> `readonly` **api**: `5` = `5`

##### arc

> `readonly` **arc**: `4` = `4`

##### biz

> `readonly` **biz**: `1` = `1`

##### cmp

> `readonly` **cmp**: `10` = `10`

##### dat

> `readonly` **dat**: `6` = `6`

##### des

> `readonly` **des**: `3` = `3`

##### doc

> `readonly` **doc**: `12` = `12`

##### imp

> `readonly` **imp**: `8` = `8`

##### inf

> `readonly` **inf**: `11` = `11`

##### persona

> `readonly` **persona**: `0` = `0`

##### req

> `readonly` **req**: `2` = `2`

##### sec

> `readonly` **sec**: `7` = `7`

##### tst

> `readonly` **tst**: `9` = `9`

***

### LAYER\_NAMES

> `const` **LAYER\_NAMES**: `Record`\<[`LayerCode`](#layercode), `string`\>

Defined in: [packages/common/src/uid/index.ts:39](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L39)

***

### MADAgentResponseSchema

> `const` **MADAgentResponseSchema**: `ZodObject`\<\{ `agentType`: `ZodEnum`\<\[`"business_analyst"`, `"ux_researcher"`, `"domain_expert"`, `"judge"`\]\>; `argument`: `ZodString`; `confidence`: `ZodNumber`; `proposedPersonas`: `ZodOptional`\<`ZodArray`\<`ZodObject`\<\{ `accessibilityProfile`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `accessLevel`: `ZodOptional`\<`ZodEnum`\<\[`"platform"`, `"tenant-scoped"`, `"user-scoped"`\]\>\>; `category`: `ZodOptional`\<`ZodEnum`\<\[`"internal_platform"`, `"b2b_customer"`, `"b2c_end_user"`, `"external_stakeholder"`\]\>\>; `constraints`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; `coverageRationale`: `ZodOptional`\<`ZodString`\>; `dataSovereignty`: `ZodOptional`\<`ZodObject`\<\{ `jurisdiction`: `ZodString`; `retention`: `ZodString`; `rightToErasure`: `ZodBoolean`; \}, `"strip"`, `ZodTypeAny`, \{ `jurisdiction`: `string`; `retention`: `string`; `rightToErasure`: `boolean`; \}, \{ `jurisdiction`: `string`; `retention`: `string`; `rightToErasure`: `boolean`; \}\>\>; `discoverySource`: `ZodOptional`\<`ZodString`\>; `goals`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; `intent`: `ZodOptional`\<`ZodString`\>; `metadata`: `ZodOptional`\<`ZodOptional`\<`ZodRecord`\<`ZodString`, `ZodUnknown`\>\>\>; `name`: `ZodOptional`\<`ZodString`\>; `namespace`: `ZodOptional`\<`ZodOptional`\<`ZodString`\>\>; `priority`: `ZodOptional`\<`ZodNumber`\>; `relationships`: `ZodOptional`\<`ZodArray`\<`ZodObject`\<\{ `target`: `ZodString`; `type`: `ZodEnum`\<...\>; \}, `"strip"`, `ZodTypeAny`, \{ `target`: `string`; `type`: ... \| ... \| ... \| ...; \}, \{ `target`: `string`; `type`: ... \| ... \| ... \| ...; \}\>, `"many"`\>\>; `status`: `ZodOptional`\<`ZodEnum`\<\[`"draft"`, `"active"`, `"deprecated"`\]\>\>; `type`: `ZodOptional`\<`ZodEnum`\<\[`"internal"`, `"b2b"`, `"b2c"`, `"compliance"`, `"operational"`\]\>\>; `uid`: `ZodOptional`\<`ZodString`\>; `version`: `ZodOptional`\<`ZodString`\>; `vocabulary`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; \}, `"strip"`, `ZodTypeAny`, \{ `accessibilityProfile?`: `string`; `accessLevel?`: `"platform"` \| `"tenant-scoped"` \| `"user-scoped"`; `category?`: `"internal_platform"` \| `"b2b_customer"` \| `"b2c_end_user"` \| `"external_stakeholder"`; `constraints?`: `string`[]; `coverageRationale?`: `string`; `dataSovereignty?`: \{ `jurisdiction`: `string`; `retention`: `string`; `rightToErasure`: `boolean`; \}; `discoverySource?`: `string`; `goals?`: `string`[]; `intent?`: `string`; `metadata?`: `Record`\<`string`, `unknown`\>; `name?`: `string`; `namespace?`: `string`; `priority?`: `number`; `relationships?`: `object`[]; `status?`: `"deprecated"` \| `"draft"` \| `"active"`; `type?`: `"internal"` \| `"b2b"` \| `"b2c"` \| `"compliance"` \| `"operational"`; `uid?`: `string`; `version?`: `string`; `vocabulary?`: `string`[]; \}, \{ `accessibilityProfile?`: `string`; `accessLevel?`: `"platform"` \| `"tenant-scoped"` \| `"user-scoped"`; `category?`: `"internal_platform"` \| `"b2b_customer"` \| `"b2c_end_user"` \| `"external_stakeholder"`; `constraints?`: `string`[]; `coverageRationale?`: `string`; `dataSovereignty?`: \{ `jurisdiction`: `string`; `retention`: `string`; `rightToErasure`: `boolean`; \}; `discoverySource?`: `string`; `goals?`: `string`[]; `intent?`: `string`; `metadata?`: `Record`\<`string`, `unknown`\>; `name?`: `string`; `namespace?`: `string`; `priority?`: `number`; `relationships?`: `object`[]; `status?`: `"deprecated"` \| `"draft"` \| `"active"`; `type?`: `"internal"` \| `"b2b"` \| `"b2c"` \| `"compliance"` \| `"operational"`; `uid?`: `string`; `version?`: `string`; `vocabulary?`: `string`[]; \}\>, `"many"`\>\>; `round`: `ZodNumber`; `supportingEvidence`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; `timestamp`: `ZodDate`; \}, `"strip"`, `ZodTypeAny`, \{ `agentType`: `"business_analyst"` \| `"ux_researcher"` \| `"domain_expert"` \| `"judge"`; `argument`: `string`; `confidence`: `number`; `proposedPersonas?`: `object`[]; `round`: `number`; `supportingEvidence?`: `string`[]; `timestamp`: `Date`; \}, \{ `agentType`: `"business_analyst"` \| `"ux_researcher"` \| `"domain_expert"` \| `"judge"`; `argument`: `string`; `confidence`: `number`; `proposedPersonas?`: `object`[]; `round`: `number`; `supportingEvidence?`: `string`[]; `timestamp`: `Date`; \}\>

Defined in: [packages/common/src/models/index.ts:434](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L434)

***

### MADSessionSchema

> `const` **MADSessionSchema**: `ZodObject`\<\{ `consensusReached`: `ZodBoolean`; `createdAt`: `ZodDate`; `finalPersonas`: `ZodArray`\<`ZodString`, `"many"`\>; `foundingIntent`: `ZodString`; `id`: `ZodString`; `metadata`: `ZodOptional`\<`ZodRecord`\<`ZodString`, `ZodUnknown`\>\>; `namespace`: `ZodString`; `rounds`: `ZodArray`\<`ZodObject`\<\{ `judgeVerdict`: `ZodOptional`\<`ZodString`\>; `responses`: `ZodArray`\<`ZodObject`\<\{ `agentType`: `ZodEnum`\<\[`"business_analyst"`, `"ux_researcher"`, `"domain_expert"`, `"judge"`\]\>; `argument`: `ZodString`; `confidence`: `ZodNumber`; `proposedPersonas`: `ZodOptional`\<`ZodArray`\<`ZodObject`\<..., ..., ..., ..., ...\>, `"many"`\>\>; `round`: `ZodNumber`; `supportingEvidence`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; `timestamp`: `ZodDate`; \}, `"strip"`, `ZodTypeAny`, \{ `agentType`: `"business_analyst"` \| `"ux_researcher"` \| `"domain_expert"` \| `"judge"`; `argument`: `string`; `confidence`: `number`; `proposedPersonas?`: `object`[]; `round`: `number`; `supportingEvidence?`: `string`[]; `timestamp`: `Date`; \}, \{ `agentType`: `"business_analyst"` \| `"ux_researcher"` \| `"domain_expert"` \| `"judge"`; `argument`: `string`; `confidence`: `number`; `proposedPersonas?`: `object`[]; `round`: `number`; `supportingEvidence?`: `string`[]; `timestamp`: `Date`; \}\>, `"many"`\>; `roundNumber`: `ZodNumber`; \}, `"strip"`, `ZodTypeAny`, \{ `judgeVerdict?`: `string`; `responses`: `object`[]; `roundNumber`: `number`; \}, \{ `judgeVerdict?`: `string`; `responses`: `object`[]; `roundNumber`: `number`; \}\>, `"many"`\>; `updatedAt`: `ZodDate`; \}, `"strip"`, `ZodTypeAny`, \{ `consensusReached`: `boolean`; `createdAt`: `Date`; `finalPersonas`: `string`[]; `foundingIntent`: `string`; `id`: `string`; `metadata?`: `Record`\<`string`, `unknown`\>; `namespace`: `string`; `rounds`: `object`[]; `updatedAt`: `Date`; \}, \{ `consensusReached`: `boolean`; `createdAt`: `Date`; `finalPersonas`: `string`[]; `foundingIntent`: `string`; `id`: `string`; `metadata?`: `Record`\<`string`, `unknown`\>; `namespace`: `string`; `rounds`: `object`[]; `updatedAt`: `Date`; \}\>

Defined in: [packages/common/src/models/index.ts:445](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L445)

***

### OptionalUIDSchema

> `const` **OptionalUIDSchema**: `ZodOptional`\<`ZodEffects`\<`ZodString`, `string`, `string`\>\>

Defined in: [packages/common/src/uid/index.ts:214](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L214)

Optional UID schema - validates if present

***

### PersonaSchema

> `const` **PersonaSchema**: `ZodObject`\<\{ `accessibilityProfile`: `ZodOptional`\<`ZodString`\>; `accessLevel`: `ZodEnum`\<\[`"platform"`, `"tenant-scoped"`, `"user-scoped"`\]\>; `category`: `ZodEnum`\<\[`"internal_platform"`, `"b2b_customer"`, `"b2c_end_user"`, `"external_stakeholder"`\]\>; `constraints`: `ZodArray`\<`ZodString`, `"many"`\>; `coverageRationale`: `ZodString`; `dataSovereignty`: `ZodObject`\<\{ `jurisdiction`: `ZodString`; `retention`: `ZodString`; `rightToErasure`: `ZodBoolean`; \}, `"strip"`, `ZodTypeAny`, \{ `jurisdiction`: `string`; `retention`: `string`; `rightToErasure`: `boolean`; \}, \{ `jurisdiction`: `string`; `retention`: `string`; `rightToErasure`: `boolean`; \}\>; `discoverySource`: `ZodString`; `goals`: `ZodArray`\<`ZodString`, `"many"`\>; `intent`: `ZodString`; `metadata`: `ZodOptional`\<`ZodRecord`\<`ZodString`, `ZodUnknown`\>\>; `name`: `ZodString`; `namespace`: `ZodOptional`\<`ZodString`\>; `priority`: `ZodNumber`; `relationships`: `ZodArray`\<`ZodObject`\<\{ `target`: `ZodString`; `type`: `ZodEnum`\<\[`"manages"`, `"reports-to"`, `"collaborates-with"`, `"serves"`\]\>; \}, `"strip"`, `ZodTypeAny`, \{ `target`: `string`; `type`: `"manages"` \| `"reports-to"` \| `"collaborates-with"` \| `"serves"`; \}, \{ `target`: `string`; `type`: `"manages"` \| `"reports-to"` \| `"collaborates-with"` \| `"serves"`; \}\>, `"many"`\>; `status`: `ZodEnum`\<\[`"draft"`, `"active"`, `"deprecated"`\]\>; `type`: `ZodEnum`\<\[`"internal"`, `"b2b"`, `"b2c"`, `"compliance"`, `"operational"`\]\>; `uid`: `ZodString`; `version`: `ZodString`; `vocabulary`: `ZodArray`\<`ZodString`, `"many"`\>; \}, `"strip"`, `ZodTypeAny`, \{ `accessibilityProfile?`: `string`; `accessLevel`: `"platform"` \| `"tenant-scoped"` \| `"user-scoped"`; `category`: `"internal_platform"` \| `"b2b_customer"` \| `"b2c_end_user"` \| `"external_stakeholder"`; `constraints`: `string`[]; `coverageRationale`: `string`; `dataSovereignty`: \{ `jurisdiction`: `string`; `retention`: `string`; `rightToErasure`: `boolean`; \}; `discoverySource`: `string`; `goals`: `string`[]; `intent`: `string`; `metadata?`: `Record`\<`string`, `unknown`\>; `name`: `string`; `namespace?`: `string`; `priority`: `number`; `relationships`: `object`[]; `status`: `"deprecated"` \| `"draft"` \| `"active"`; `type`: `"internal"` \| `"b2b"` \| `"b2c"` \| `"compliance"` \| `"operational"`; `uid`: `string`; `version`: `string`; `vocabulary`: `string`[]; \}, \{ `accessibilityProfile?`: `string`; `accessLevel`: `"platform"` \| `"tenant-scoped"` \| `"user-scoped"`; `category`: `"internal_platform"` \| `"b2b_customer"` \| `"b2c_end_user"` \| `"external_stakeholder"`; `constraints`: `string`[]; `coverageRationale`: `string`; `dataSovereignty`: \{ `jurisdiction`: `string`; `retention`: `string`; `rightToErasure`: `boolean`; \}; `discoverySource`: `string`; `goals`: `string`[]; `intent`: `string`; `metadata?`: `Record`\<`string`, `unknown`\>; `name`: `string`; `namespace?`: `string`; `priority`: `number`; `relationships`: `object`[]; `status`: `"deprecated"` \| `"draft"` \| `"active"`; `type`: `"internal"` \| `"b2b"` \| `"b2c"` \| `"compliance"` \| `"operational"`; `uid`: `string`; `version`: `string`; `vocabulary`: `string`[]; \}\>

Defined in: [packages/common/src/models/index.ts:108](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L108)

***

### PromptTemplates

> `const` **PromptTemplates**: `object`

Defined in: [packages/common/src/llm/index.ts:110](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/llm/index.ts#L110)

#### Type Declaration

##### conflictDetection

> **conflictDetection**: `string`

System prompt for conflict detection

##### madJudge

> **madJudge**: `string`

System prompt for MAD (Multi-Agent Debate) judge

##### personaDiscovery

> **personaDiscovery**: `string`

System prompt for persona discovery

##### requirementsDerivation

> **requirementsDerivation**: `string`

System prompt for requirements derivation

***

### RBACPolicySchema

> `const` **RBACPolicySchema**: `ZodObject`\<\{ `action`: `ZodEnum`\<\[`"read"`, `"write"`, `"delete"`, `"admin"`\]\>; `conditions`: `ZodOptional`\<`ZodRecord`\<`ZodString`, `ZodUnknown`\>\>; `createdAt`: `ZodDate`; `effect`: `ZodEnum`\<\[`"allow"`, `"deny"`\]\>; `id`: `ZodString`; `namespace`: `ZodString`; `personaUid`: `ZodString`; `resource`: `ZodString`; `updatedAt`: `ZodDate`; \}, `"strip"`, `ZodTypeAny`, \{ `action`: `"delete"` \| `"read"` \| `"write"` \| `"admin"`; `conditions?`: `Record`\<`string`, `unknown`\>; `createdAt`: `Date`; `effect`: `"allow"` \| `"deny"`; `id`: `string`; `namespace`: `string`; `personaUid`: `string`; `resource`: `string`; `updatedAt`: `Date`; \}, \{ `action`: `"delete"` \| `"read"` \| `"write"` \| `"admin"`; `conditions?`: `Record`\<`string`, `unknown`\>; `createdAt`: `Date`; `effect`: `"allow"` \| `"deny"`; `id`: `string`; `namespace`: `string`; `personaUid`: `string`; `resource`: `string`; `updatedAt`: `Date`; \}\>

Defined in: [packages/common/src/models/index.ts:467](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L467)

***

### RelationshipSchema

> `const` **RelationshipSchema**: `ZodObject`\<\{ `createdAt`: `ZodDate`; `id`: `ZodString`; `namespace`: `ZodString`; `properties`: `ZodOptional`\<`ZodRecord`\<`ZodString`, `ZodUnknown`\>\>; `sourceUid`: `ZodString`; `targetUid`: `ZodString`; `type`: `ZodEnum`\<\[`"derives-from"`, `"implements"`, `"tests"`, `"documents"`, `"conflicts-with"`, `"shares-with"`, `"depends-on"`, `"versioned-from"`\]\>; `updatedAt`: `ZodDate`; \}, `"strip"`, `ZodTypeAny`, \{ `createdAt`: `Date`; `id`: `string`; `namespace`: `string`; `properties?`: `Record`\<`string`, `unknown`\>; `sourceUid`: `string`; `targetUid`: `string`; `type`: `"tests"` \| `"derives-from"` \| `"implements"` \| `"documents"` \| `"conflicts-with"` \| `"shares-with"` \| `"depends-on"` \| `"versioned-from"`; `updatedAt`: `Date`; \}, \{ `createdAt`: `Date`; `id`: `string`; `namespace`: `string`; `properties?`: `Record`\<`string`, `unknown`\>; `sourceUid`: `string`; `targetUid`: `string`; `type`: `"tests"` \| `"derives-from"` \| `"implements"` \| `"documents"` \| `"conflicts-with"` \| `"shares-with"` \| `"depends-on"` \| `"versioned-from"`; `updatedAt`: `Date`; \}\>

Defined in: [packages/common/src/models/index.ts:225](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L225)

***

### RelationshipType

> `const` **RelationshipType**: `ZodEnum`\<\[`"derives-from"`, `"implements"`, `"tests"`, `"documents"`, `"conflicts-with"`, `"shares-with"`, `"depends-on"`, `"versioned-from"`\]\>

Defined in: [packages/common/src/models/index.ts:18](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L18)

The 8 Core Relationship Types that form the Traceability Knowledge Graph backbone.
These are the official relationships defined in the architecture specification.

***

### RequirementSchema

> `const` **RequirementSchema**: `ZodObject`\<\{ `acceptanceCriteria`: `ZodArray`\<`ZodObject`\<\{ `description`: `ZodString`; `id`: `ZodString`; `testable`: `ZodBoolean`; \}, `"strip"`, `ZodTypeAny`, \{ `description`: `string`; `id`: `string`; `testable`: `boolean`; \}, \{ `description`: `string`; `id`: `string`; `testable`: `boolean`; \}\>, `"many"`\>; `action`: `ZodString`; `actor`: `ZodString`; `capabilities`: `ZodArray`\<`ZodString`, `"many"`\>; `cmlSource`: `ZodString`; `conflictsWith`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; `entity`: `ZodString`; `harms`: `ZodOptional`\<`ZodString`\>; `involves`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; `metadata`: `ZodOptional`\<`ZodRecord`\<`ZodString`, `ZodUnknown`\>\>; `namespace`: `ZodOptional`\<`ZodString`\>; `nfrs`: `ZodArray`\<`ZodObject`\<\{ `description`: `ZodString`; `metric`: `ZodOptional`\<`ZodString`\>; `threshold`: `ZodOptional`\<`ZodString`\>; `type`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `description`: `string`; `metric?`: `string`; `threshold?`: `string`; `type`: `string`; \}, \{ `description`: `string`; `metric?`: `string`; `threshold?`: `string`; `type`: `string`; \}\>, `"many"`\>; `personaUid`: `ZodString`; `priority`: `ZodOptional`\<`ZodEnum`\<\[`"must"`, `"should"`, `"could"`, `"wont"`\]\>\>; `promotes`: `ZodOptional`\<`ZodString`\>; `storyName`: `ZodString`; `uid`: `ZodString`; `validation`: `ZodObject`\<\{ `authorityCheck`: `ZodObject`\<\{ `passed`: `ZodBoolean`; `reason`: `ZodOptional`\<`ZodString`\>; \}, `"strip"`, `ZodTypeAny`, \{ `passed`: `boolean`; `reason?`: `string`; \}, \{ `passed`: `boolean`; `reason?`: `string`; \}\>; `criticApproved`: `ZodBoolean`; `vocabularyCheck`: `ZodObject`\<\{ `unknownTerms`: `ZodOptional`\<`ZodArray`\<`ZodString`, `"many"`\>\>; `valid`: `ZodBoolean`; \}, `"strip"`, `ZodTypeAny`, \{ `unknownTerms?`: `string`[]; `valid`: `boolean`; \}, \{ `unknownTerms?`: `string`[]; `valid`: `boolean`; \}\>; \}, `"strip"`, `ZodTypeAny`, \{ `authorityCheck`: \{ `passed`: `boolean`; `reason?`: `string`; \}; `criticApproved`: `boolean`; `vocabularyCheck`: \{ `unknownTerms?`: `string`[]; `valid`: `boolean`; \}; \}, \{ `authorityCheck`: \{ `passed`: `boolean`; `reason?`: `string`; \}; `criticApproved`: `boolean`; `vocabularyCheck`: \{ `unknownTerms?`: `string`[]; `valid`: `boolean`; \}; \}\>; `valueProposition`: `ZodString`; \}, `"strip"`, `ZodTypeAny`, \{ `acceptanceCriteria`: `object`[]; `action`: `string`; `actor`: `string`; `capabilities`: `string`[]; `cmlSource`: `string`; `conflictsWith?`: `string`[]; `entity`: `string`; `harms?`: `string`; `involves?`: `string`[]; `metadata?`: `Record`\<`string`, `unknown`\>; `namespace?`: `string`; `nfrs`: `object`[]; `personaUid`: `string`; `priority?`: `"must"` \| `"should"` \| `"could"` \| `"wont"`; `promotes?`: `string`; `storyName`: `string`; `uid`: `string`; `validation`: \{ `authorityCheck`: \{ `passed`: `boolean`; `reason?`: `string`; \}; `criticApproved`: `boolean`; `vocabularyCheck`: \{ `unknownTerms?`: `string`[]; `valid`: `boolean`; \}; \}; `valueProposition`: `string`; \}, \{ `acceptanceCriteria`: `object`[]; `action`: `string`; `actor`: `string`; `capabilities`: `string`[]; `cmlSource`: `string`; `conflictsWith?`: `string`[]; `entity`: `string`; `harms?`: `string`; `involves?`: `string`[]; `metadata?`: `Record`\<`string`, `unknown`\>; `namespace?`: `string`; `nfrs`: `object`[]; `personaUid`: `string`; `priority?`: `"must"` \| `"should"` \| `"could"` \| `"wont"`; `promotes?`: `string`; `storyName`: `string`; `uid`: `string`; `validation`: \{ `authorityCheck`: \{ `passed`: `boolean`; `reason?`: `string`; \}; `criticApproved`: `boolean`; `vocabularyCheck`: \{ `unknownTerms?`: `string`[]; `valid`: `boolean`; \}; \}; `valueProposition`: `string`; \}\>

Defined in: [packages/common/src/models/index.ts:300](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L300)

***

### RLSPolicySchema

> `const` **RLSPolicySchema**: `ZodObject`\<\{ `command`: `ZodEnum`\<\[`"SELECT"`, `"INSERT"`, `"UPDATE"`, `"DELETE"`, `"ALL"`\]\>; `createdAt`: `ZodDate`; `derivedFromPersona`: `ZodOptional`\<`ZodString`\>; `expression`: `ZodString`; `id`: `ZodString`; `namespace`: `ZodString`; `policyName`: `ZodString`; `tableName`: `ZodString`; `updatedAt`: `ZodDate`; \}, `"strip"`, `ZodTypeAny`, \{ `command`: `"SELECT"` \| `"INSERT"` \| `"UPDATE"` \| `"DELETE"` \| `"ALL"`; `createdAt`: `Date`; `derivedFromPersona?`: `string`; `expression`: `string`; `id`: `string`; `namespace`: `string`; `policyName`: `string`; `tableName`: `string`; `updatedAt`: `Date`; \}, \{ `command`: `"SELECT"` \| `"INSERT"` \| `"UPDATE"` \| `"DELETE"` \| `"ALL"`; `createdAt`: `Date`; `derivedFromPersona?`: `string`; `expression`: `string`; `id`: `string`; `namespace`: `string`; `policyName`: `string`; `tableName`: `string`; `updatedAt`: `Date`; \}\>

Defined in: [packages/common/src/models/index.ts:479](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L479)

***

### SCHEMA\_QUERIES

> `const` **SCHEMA\_QUERIES**: `object`

Defined in: [packages/common/src/graph/index.ts:123](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/graph/index.ts#L123)

#### Type Declaration

##### constraints

> **constraints**: `string`[]

##### fullTextIndexes

> **fullTextIndexes**: `string`[]

##### indexes

> **indexes**: `string`[]

***

### TenantMode

> `const` **TenantMode**: `ZodEnum`\<\[`"pooled"`, `"bridge"`, `"siloed"`\]\>

Defined in: [packages/common/src/models/index.ts:38](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L38)

***

### TEST\_ARTIFACTS

> `const` **TEST\_ARTIFACTS**: `object`

Defined in: [packages/common/src/testing/test-fixtures.ts:212](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/test-fixtures.ts#L212)

Sample artifact fixtures by layer

#### Type Declaration

##### architecture

> **architecture**: `object`

###### architecture.assessmentService

> **assessmentService**: `object`

###### architecture.assessmentService.description

> **description**: `string` = `"Core service for assessment management"`

###### architecture.assessmentService.layer

> **layer**: `string` = `"arc"`

###### architecture.assessmentService.name

> **name**: `string` = `"Assessment Service"`

###### architecture.assessmentService.uid

> **uid**: `string` = `"cpe:test/arc/service/assessment-service"`

##### business

> **business**: `object`

###### business.assessmentCapability

> **assessmentCapability**: `object`

###### business.assessmentCapability.description

> **description**: `string` = `"Capability to create and manage assessments"`

###### business.assessmentCapability.layer

> **layer**: `string` = `"biz"`

###### business.assessmentCapability.name

> **name**: `string` = `"Assessment Capability"`

###### business.assessmentCapability.uid

> **uid**: `string` = `"cpe:test/biz/capability/HIRING-MANAGER/assessment-capability"`

##### implementation

> **implementation**: `object`

###### implementation.assessmentController

> **assessmentController**: `object`

###### implementation.assessmentController.description

> **description**: `string` = `"REST API controller for assessments"`

###### implementation.assessmentController.layer

> **layer**: `string` = `"imp"`

###### implementation.assessmentController.name

> **name**: `string` = `"Assessment Controller"`

###### implementation.assessmentController.uid

> **uid**: `string` = `"cpe:test/imp/api/assessment-controller"`

##### requirements

> **requirements**: `object`

###### requirements.createAssessment

> **createAssessment**: `object`

###### requirements.createAssessment.description

> **description**: `string` = `"As a hiring manager, I want to create assessments"`

###### requirements.createAssessment.layer

> **layer**: `string` = `"req"`

###### requirements.createAssessment.name

> **name**: `string` = `"Create Assessment User Story"`

###### requirements.createAssessment.uid

> **uid**: `string` = `"cpe:test/req/story/HIRING-MANAGER/create-assessment"`

###### requirements.takeAssessment

> **takeAssessment**: `object`

###### requirements.takeAssessment.description

> **description**: `string` = `"As a candidate, I want to take assessments"`

###### requirements.takeAssessment.layer

> **layer**: `string` = `"req"`

###### requirements.takeAssessment.name

> **name**: `string` = `"Take Assessment User Story"`

###### requirements.takeAssessment.uid

> **uid**: `string` = `"cpe:test/req/story/CANDIDATE/take-assessment"`

***

### TEST\_GATES

> `const` **TEST\_GATES**: `object`

Defined in: [packages/common/src/testing/test-fixtures.ts:256](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/test-fixtures.ts#L256)

Sample gate fixtures

#### Type Declaration

##### gate1

> **gate1**: `object`

###### gate1.gateNumber

> **gateNumber**: `number` = `1`

###### gate1.id

> **id**: `string` = `"test-gate-1"`

###### gate1.status

> **status**: `string` = `"pending"`

##### gate1Approved

> **gate1Approved**: `object`

###### gate1Approved.approvedBy

> **approvedBy**: `string` = `"test-approver@example.com"`

###### gate1Approved.gateNumber

> **gateNumber**: `number` = `1`

###### gate1Approved.id

> **id**: `string` = `"test-gate-1-approved"`

###### gate1Approved.status

> **status**: `string` = `"approved"`

##### gate2

> **gate2**: `object`

###### gate2.gateNumber

> **gateNumber**: `number` = `2`

###### gate2.id

> **id**: `string` = `"test-gate-2"`

###### gate2.status

> **status**: `string` = `"pending"`

***

### TEST\_PERSONAS

> `const` **TEST\_PERSONAS**: `object`

Defined in: [packages/common/src/testing/test-fixtures.ts:182](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/test-fixtures.ts#L182)

Sample persona fixtures

#### Type Declaration

##### candidate

> **candidate**: `object`

###### candidate.intent

> **intent**: `string` = `"Complete assessments and receive fair evaluation"`

###### candidate.name

> **name**: `string` = `"Candidate"`

###### candidate.priority

> **priority**: `number` = `2`

###### candidate.uid

> **uid**: `string` = `"cpe:test/persona/CANDIDATE"`

##### hiringManager

> **hiringManager**: `object`

###### hiringManager.intent

> **intent**: `string` = `"Efficiently screen and select candidates for open positions"`

###### hiringManager.name

> **name**: `string` = `"Hiring Manager"`

###### hiringManager.priority

> **priority**: `number` = `1`

###### hiringManager.uid

> **uid**: `string` = `"cpe:test/persona/HIRING-MANAGER"`

##### psychometrician

> **psychometrician**: `object`

###### psychometrician.intent

> **intent**: `string` = `"Design and validate assessment instruments"`

###### psychometrician.name

> **name**: `string` = `"Psychometrician"`

###### psychometrician.priority

> **priority**: `number` = `3`

###### psychometrician.uid

> **uid**: `string` = `"cpe:test/persona/PSYCHOMETRICIAN"`

##### tenantAdmin

> **tenantAdmin**: `object`

###### tenantAdmin.intent

> **intent**: `string` = `"Manage tenant configuration and users"`

###### tenantAdmin.name

> **name**: `string` = `"Tenant Administrator"`

###### tenantAdmin.priority

> **priority**: `number` = `4`

###### tenantAdmin.uid

> **uid**: `string` = `"cpe:test/persona/TENANT-ADMIN"`

***

### TEST\_TENANTS

> `const` **TEST\_TENANTS**: `object`

Defined in: [packages/common/src/testing/test-fixtures.ts:173](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/test-fixtures.ts#L173)

Sample tenant IDs for testing

#### Type Declaration

##### isolated

> **isolated**: `string` = `"test-tenant-isolated"`

##### primary

> **primary**: `string` = `"test-tenant-primary"`

##### secondary

> **secondary**: `string` = `"test-tenant-secondary"`

***

### TimestampsSchema

> `const` **TimestampsSchema**: `ZodObject`\<\{ `createdAt`: `ZodDate`; `updatedAt`: `ZodDate`; \}, `"strip"`, `ZodTypeAny`, \{ `createdAt`: `Date`; `updatedAt`: `Date`; \}, \{ `createdAt`: `Date`; `updatedAt`: `Date`; \}\>

Defined in: [packages/common/src/models/index.ts:53](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/models/index.ts#L53)

***

### UIDArraySchema

> `const` **UIDArraySchema**: `ZodArray`\<`ZodEffects`\<`ZodString`, `string`, `string`\>, `"many"`\>

Defined in: [packages/common/src/uid/index.ts:209](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L209)

Zod schema for validating arrays of UIDs
Each element is validated using UIDSchema

***

### UIDSchema

> `const` **UIDSchema**: `ZodEffects`\<`ZodString`, `string`, `string`\>

Defined in: [packages/common/src/uid/index.ts:193](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L193)

Zod schema for UID validation

## Functions

### artifactExists()

> **artifactExists**(`client`, `tenantId`, `uid`): `Promise`\<`boolean`\>

Defined in: [packages/common/src/testing/neo4j-test-utils.ts:250](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/neo4j-test-utils.ts#L250)

Check if an artifact exists in the graph

#### Parameters

##### client

[`GraphClient`](#graphclient)

##### tenantId

`string`

##### uid

`string`

#### Returns

`Promise`\<`boolean`\>

***

### canReference()

> **canReference**(`sourceLayer`, `targetLayer`): `boolean`

Defined in: [packages/common/src/uid/index.ts:653](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L653)

Check if source layer can reference target layer

#### Parameters

##### sourceLayer

Source layer code

`"api"` | `"imp"` | `"tst"` | `"dat"` | `"sec"` | `"des"` | `"persona"` | `"biz"` | `"req"` | `"arc"` | `"cmp"` | `"inf"` | `"doc"`

##### targetLayer

Target layer code

`"api"` | `"imp"` | `"tst"` | `"dat"` | `"sec"` | `"des"` | `"persona"` | `"biz"` | `"req"` | `"arc"` | `"cmp"` | `"inf"` | `"doc"`

#### Returns

`boolean`

true if valid reference direction

***

### clearConfigCache()

> **clearConfigCache**(): `void`

Defined in: [packages/common/src/config/index.ts:260](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/config/index.ts#L260)

Clear cached configuration (useful for testing)

#### Returns

`void`

***

### clearTestData()

> **clearTestData**(`client`, `tenantId?`): `Promise`\<`void`\>

Defined in: [packages/common/src/testing/neo4j-test-utils.ts:71](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/neo4j-test-utils.ts#L71)

Clear all test data from Neo4j

#### Parameters

##### client

[`GraphClient`](#graphclient)

GraphClient instance

##### tenantId?

`string`

Optional tenant ID to scope cleanup

#### Returns

`Promise`\<`void`\>

***

### computeContentHash()

> **computeContentHash**(`content`): `string`

Defined in: [packages/common/src/hash/index.ts:20](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/hash/index.ts#L20)

Compute a SHA-256 hash of content for drift detection

Normalizes content before hashing:
- Strings: Collapses whitespace and trims
- Objects: Sorts keys for deterministic hashing

#### Parameters

##### content

String or object content to hash

`string` | `object`

#### Returns

`string`

16-character hex hash

***

### createArtifactCreatedEvent()

> **createArtifactCreatedEvent**(`namespace`, `artifactUid`, `layer`): `Omit`\<[`Event`](#event), `"id"` \| `"timestamp"`\>

Defined in: [packages/common/src/testing/redis-test-utils.ts:223](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/redis-test-utils.ts#L223)

Create a test artifact.created event

#### Parameters

##### namespace

`string`

BUILD-TIME project identifier

##### artifactUid

`string`

##### layer

`string`

#### Returns

`Omit`\<[`Event`](#event), `"id"` \| `"timestamp"`\>

***

### createArtifactWithOrphanCheck()

> **createArtifactWithOrphanCheck**(`artifact`, `parentUid?`): `object`

Defined in: [packages/common/src/graph/index.ts:284](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/graph/index.ts#L284)

Build a query to create an artifact with orphan check

#### Parameters

##### artifact

`Record`\<`string`, `unknown`\>

##### parentUid?

`string`

#### Returns

`object`

##### cypher

> **cypher**: `string`

##### params

> **params**: `Record`\<`string`, `unknown`\>

***

### createEventBus()

> **createEventBus**(`config`, `options`): [`EventBus`](#eventbus)

Defined in: [packages/common/src/events/index.ts:74](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/events/index.ts#L74)

Create a Redis-based event bus

#### Parameters

##### config

Events configuration

###### db

`number` = `...`

###### host

`string` = `...`

###### key_prefix

`string` = `...`

###### password?

`string` = `...`

###### port

`number` = `...`

###### type

`"redis"` = `...`

##### options

[`EventBusOptions`](#eventbusoptions) = `{}`

Additional options

#### Returns

[`EventBus`](#eventbus)

EventBus instance

***

### createEventCollector()

> **createEventCollector**(): [`EventCollector`](#eventcollector)

Defined in: [packages/common/src/testing/redis-test-utils.ts:99](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/redis-test-utils.ts#L99)

Create an event collector for capturing events in tests

#### Returns

[`EventCollector`](#eventcollector)

EventCollector with captured events and utilities

***

### createGateApprovedEvent()

> **createGateApprovedEvent**(`namespace`, `gateId`, `gateNumber`, `approvedBy`): `Omit`\<[`Event`](#event), `"id"` \| `"timestamp"`\>

Defined in: [packages/common/src/testing/redis-test-utils.ts:239](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/redis-test-utils.ts#L239)

Create a test gate.approved event

#### Parameters

##### namespace

`string`

BUILD-TIME project identifier

##### gateId

`string`

##### gateNumber

`number`

##### approvedBy

`string`

#### Returns

`Omit`\<[`Event`](#event), `"id"` \| `"timestamp"`\>

***

### createGraphClient()

> **createGraphClient**(`config`): [`GraphClient`](#graphclient)

Defined in: [packages/common/src/graph/index.ts:48](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/graph/index.ts#L48)

Create a Neo4j graph client

#### Parameters

##### config

Graph configuration

###### connection_acquisition_timeout_ms

`number` = `...`

###### database

`string` = `...`

###### max_connection_pool_size

`number` = `...`

###### password

`string` = `...`

###### type

`"neo4j"` = `...`

###### uri

`string` = `...`

###### username

`string` = `...`

#### Returns

[`GraphClient`](#graphclient)

GraphClient instance

***

### createLLMClient()

> **createLLMClient**(`config`): [`LLMClient`](#llmclient)

Defined in: [packages/common/src/llm/index.ts:54](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/llm/index.ts#L54)

Create an LLM client for AI operations

#### Parameters

##### config

`Partial`\<[`LLMConfig`](#llmconfig)\> = `{}`

#### Returns

[`LLMClient`](#llmclient)

***

### createMcpHttpServer()

> **createMcpHttpServer**(`options`): [`McpHttpServerResult`](#mcphttpserverresult)

Defined in: [packages/common/src/health/mcp-http-server.ts:40](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/health/mcp-http-server.ts#L40)

Create an HTTP server that handles both health checks and MCP protocol

#### Parameters

##### options

[`McpHttpServerOptions`](#mcphttpserveroptions)

#### Returns

[`McpHttpServerResult`](#mcphttpserverresult)

***

### createPersonaDiscoveredEvent()

> **createPersonaDiscoveredEvent**(`namespace`, `personaUid`, `personaName`): `Omit`\<[`Event`](#event), `"id"` \| `"timestamp"`\>

Defined in: [packages/common/src/testing/redis-test-utils.ts:257](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/redis-test-utils.ts#L257)

Create a test persona.discovered event

#### Parameters

##### namespace

`string`

BUILD-TIME project identifier

##### personaUid

`string`

##### personaName

`string`

#### Returns

`Omit`\<[`Event`](#event), `"id"` \| `"timestamp"`\>

***

### createTestArtifact()

> **createTestArtifact**(`client`, `tenantId`, `data`): `Promise`\<`void`\>

Defined in: [packages/common/src/testing/neo4j-test-utils.ts:140](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/neo4j-test-utils.ts#L140)

Create a test artifact in the graph

#### Parameters

##### client

[`GraphClient`](#graphclient)

##### tenantId

`string`

##### data

###### description?

`string`

###### layer

`string`

###### name

`string`

###### parentRelationship?

`string`

###### parentUid?

`string`

###### status?

`string`

###### uid

`string`

#### Returns

`Promise`\<`void`\>

***

### createTestConfig()

> **createTestConfig**(`overrides`): `object`

Defined in: [packages/common/src/testing/test-fixtures.ts:16](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/test-fixtures.ts#L16)

Create a minimal test configuration

#### Parameters

##### overrides

`Partial`\<[`HelixConfig`](#helixconfig)\> = `{}`

#### Returns

`object`

##### discovery

> **discovery**: `object` = `DiscoveryConfigSchema`

###### discovery.cot

> **cot**: `object`

###### discovery.cot.max\_iterations

> **max\_iterations**: `number`

###### discovery.cot.stakeholder\_depth

> **stakeholder\_depth**: `number`

###### discovery.og\_rag

> **og\_rag**: `object`

###### discovery.og\_rag.embedding\_model

> **embedding\_model**: `string`

###### discovery.og\_rag.enabled

> **enabled**: `boolean`

###### discovery.og\_rag.external\_sources

> **external\_sources**: `string`[]

##### enforcement

> **enforcement**: `object` = `EnforcementConfigSchema`

###### enforcement.audit\_logging

> **audit\_logging**: `boolean`

###### enforcement.gate\_enforcement

> **gate\_enforcement**: `boolean`

###### enforcement.orphan\_prevention

> **orphan\_prevention**: `boolean`

###### enforcement.tenant\_isolation

> **tenant\_isolation**: `boolean`

###### enforcement.uid\_validation

> **uid\_validation**: `"strict"` \| `"lenient"`

##### events

> **events**: `object` = `EventsConfigSchema`

###### events.db

> **db**: `number`

###### events.host

> **host**: `string`

###### events.key\_prefix

> **key\_prefix**: `string`

###### events.password?

> `optional` **password**: `string`

###### events.port

> **port**: `number`

###### events.type

> **type**: `"redis"`

##### fitness\_functions

> **fitness\_functions**: `object`[]

##### gates

> **gates**: `object` = `GatesConfigSchema`

###### gates.gate\_1

> **gate\_1**: `object` = `GateConfigSchema`

###### gates.gate\_1.description

> **description**: `string`

###### gates.gate\_1.enabled

> **enabled**: `boolean`

###### gates.gate\_1.name

> **name**: `string`

###### gates.gate\_1.required\_approvers

> **required\_approvers**: `number`

###### gates.gate\_1.timeout\_hours

> **timeout\_hours**: `number`

###### gates.gate\_2

> **gate\_2**: `object` = `GateConfigSchema`

###### gates.gate\_2.description

> **description**: `string`

###### gates.gate\_2.enabled

> **enabled**: `boolean`

###### gates.gate\_2.name

> **name**: `string`

###### gates.gate\_2.required\_approvers

> **required\_approvers**: `number`

###### gates.gate\_2.timeout\_hours

> **timeout\_hours**: `number`

###### gates.gate\_4

> **gate\_4**: `object` = `GateConfigSchema`

###### gates.gate\_4.description

> **description**: `string`

###### gates.gate\_4.enabled

> **enabled**: `boolean`

###### gates.gate\_4.name

> **name**: `string`

###### gates.gate\_4.required\_approvers

> **required\_approvers**: `number`

###### gates.gate\_4.timeout\_hours

> **timeout\_hours**: `number`

###### gates.gate\_5

> **gate\_5**: `object` = `GateConfigSchema`

###### gates.gate\_5.description

> **description**: `string`

###### gates.gate\_5.enabled

> **enabled**: `boolean`

###### gates.gate\_5.name

> **name**: `string`

###### gates.gate\_5.required\_approvers

> **required\_approvers**: `number`

###### gates.gate\_5.timeout\_hours

> **timeout\_hours**: `number`

##### graph

> **graph**: `object` = `GraphConfigSchema`

###### graph.connection\_acquisition\_timeout\_ms

> **connection\_acquisition\_timeout\_ms**: `number`

###### graph.database

> **database**: `string`

###### graph.max\_connection\_pool\_size

> **max\_connection\_pool\_size**: `number`

###### graph.password

> **password**: `string`

###### graph.type

> **type**: `"neo4j"`

###### graph.uri

> **uri**: `string`

###### graph.username

> **username**: `string`

##### layers

> **layers**: `object`[]

##### mad

> **mad**: `object` = `MADConfigSchema`

###### mad.agents

> **agents**: `object`

###### mad.agents.business\_analyst

> **business\_analyst**: `object` = `MADAgentConfigSchema`

###### mad.agents.business\_analyst.model

> **model**: `string`

###### mad.agents.business\_analyst.temperature

> **temperature**: `number`

###### mad.agents.domain\_expert

> **domain\_expert**: `object` = `MADAgentConfigSchema`

###### mad.agents.domain\_expert.model

> **model**: `string`

###### mad.agents.domain\_expert.temperature

> **temperature**: `number`

###### mad.agents.judge

> **judge**: `object` = `MADAgentConfigSchema`

###### mad.agents.judge.model

> **model**: `string`

###### mad.agents.judge.temperature

> **temperature**: `number`

###### mad.agents.ux\_researcher

> **ux\_researcher**: `object` = `MADAgentConfigSchema`

###### mad.agents.ux\_researcher.model

> **model**: `string`

###### mad.agents.ux\_researcher.temperature

> **temperature**: `number`

###### mad.consensus\_threshold

> **consensus\_threshold**: `number`

###### mad.enabled

> **enabled**: `boolean`

###### mad.max\_rounds

> **max\_rounds**: `number`

##### ontology

> **ontology**: `object` = `OntologyConfigSchema`

###### ontology.pattern\_paths

> **pattern\_paths**: `string`[]

###### ontology.sdo\_path

> **sdo\_path**: `string`

##### policy

> **policy**: `object` = `PolicyConfigSchema`

###### policy.auto\_load

> **auto\_load**: `boolean`

###### policy.engine

> **engine**: `"casbin"`

###### policy.model\_path

> **model\_path**: `string`

###### policy.policy\_path

> **policy\_path**: `string`

##### relationships

> **relationships**: `object`[]

##### server

> **server**: `object` = `ServerConfigSchema`

###### server.log\_level

> **log\_level**: `"error"` \| `"info"` \| `"debug"` \| `"warn"`

###### server.uid\_prefix

> **uid\_prefix**: `string`

##### tenant\_modes

> **tenant\_modes**: `object`[]

##### verification

> **verification**: `object` = `VerificationConfigSchema`

###### verification.max\_depth

> **max\_depth**: `number`

###### verification.smt\_solver

> **smt\_solver**: `"z3"`

###### verification.timeout\_ms

> **timeout\_ms**: `number`

###### verification.z3\_path

> **z3\_path**: `string`

***

### createTestEvent()

> **createTestEvent**(`type`, `namespace`, `payload`): `Omit`\<[`Event`](#event), `"id"` \| `"timestamp"`\>

Defined in: [packages/common/src/testing/redis-test-utils.ts:207](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/redis-test-utils.ts#L207)

Create a mock event for testing

#### Parameters

##### type

`string`

##### namespace

`string`

BUILD-TIME project identifier

##### payload

`unknown` = `{}`

#### Returns

`Omit`\<[`Event`](#event), `"id"` \| `"timestamp"`\>

***

### createTestGate()

> **createTestGate**(`client`, `tenantId`, `data`): `Promise`\<`void`\>

Defined in: [packages/common/src/testing/neo4j-test-utils.ts:210](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/neo4j-test-utils.ts#L210)

Create a test gate in the graph

#### Parameters

##### client

[`GraphClient`](#graphclient)

##### tenantId

`string`

##### data

###### approvedBy?

`string`

###### gateNumber

`number`

###### id

`string`

###### status?

`string`

#### Returns

`Promise`\<`void`\>

***

### createTestPersona()

> **createTestPersona**(`client`, `tenantId`, `data`): `Promise`\<`void`\>

Defined in: [packages/common/src/testing/neo4j-test-utils.ts:101](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/neo4j-test-utils.ts#L101)

Create a test persona in the graph

#### Parameters

##### client

[`GraphClient`](#graphclient)

##### tenantId

`string`

##### data

###### intent

`string`

###### name

`string`

###### priority?

`number`

###### status?

`string`

###### uid

`string`

#### Returns

`Promise`\<`void`\>

***

### createTypedPublisher()

> **createTypedPublisher**\<`T`\>(`eventBus`, `namespace`): `object`

Defined in: [packages/common/src/events/index.ts:246](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/events/index.ts#L246)

Helper to create typed event publishers

#### Type Parameters

##### T

`T` *extends* `string`

#### Parameters

##### eventBus

[`EventBus`](#eventbus)

The event bus instance

##### namespace

`string`

BUILD-TIME project identifier

#### Returns

`object`

##### emit()

> **emit**(`eventType`, `payload`, `correlationId?`, `causationId?`): `Promise`\<`string`\>

###### Parameters

###### eventType

`T`

###### payload

`unknown`

###### correlationId?

`string`

###### causationId?

`string`

###### Returns

`Promise`\<`string`\>

***

### createTypedSubscriber()

> **createTypedSubscriber**\<`T`\>(`eventBus`, `namespace`): `object`

Defined in: [packages/common/src/events/index.ts:274](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/events/index.ts#L274)

Helper to create typed event subscribers

#### Type Parameters

##### T

`T` *extends* `string`

#### Parameters

##### eventBus

[`EventBus`](#eventbus)

The event bus instance

##### namespace

`string`

BUILD-TIME project identifier

#### Returns

`object`

##### on()

> **on**(`eventType`, `handler`): `Promise`\<`void`\>

###### Parameters

###### eventType

`T`

###### handler

(`payload`, `event`) => `Promise`\<`void`\>

###### Returns

`Promise`\<`void`\>

***

### describeWithInfrastructure()

> **describeWithInfrastructure**(`name`, `fn`, `neo4jAvailable`, `redisAvailable`): `void`

Defined in: [packages/common/src/testing/test-fixtures.ts:347](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/test-fixtures.ts#L347)

Skip test if both Neo4j and Redis are not available

#### Parameters

##### name

`string`

##### fn

() => `void`

##### neo4jAvailable

`boolean`

##### redisAvailable

`boolean`

#### Returns

`void`

***

### describeWithNeo4j()

> **describeWithNeo4j**(`name`, `fn`, `available`): `void`

Defined in: [packages/common/src/testing/test-fixtures.ts:317](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/test-fixtures.ts#L317)

Skip test if Neo4j is not available

#### Parameters

##### name

`string`

##### fn

() => `void`

##### available

`boolean`

#### Returns

`void`

***

### describeWithRedis()

> **describeWithRedis**(`name`, `fn`, `available`): `void`

Defined in: [packages/common/src/testing/test-fixtures.ts:332](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/test-fixtures.ts#L332)

Skip test if Redis is not available

#### Parameters

##### name

`string`

##### fn

() => `void`

##### available

`boolean`

#### Returns

`void`

***

### detectCycle()

> **detectCycle**(`uid`, `namespace`): `object`

Defined in: [packages/common/src/graph/index.ts:344](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/graph/index.ts#L344)

Build a query to detect cycles

#### Parameters

##### uid

`string`

##### namespace

`string`

#### Returns

`object`

##### cypher

> **cypher**: `string`

##### params

> **params**: `Record`\<`string`, `unknown`\>

***

### extractJSON()

> **extractJSON**\<`T`\>(`response`, `options`): `T` \| `null`

Defined in: [packages/common/src/llm/index.ts:200](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/llm/index.ts#L200)

Extract structured data from LLM response

#### Type Parameters

##### T

`T`

#### Parameters

##### response

`string`

The raw LLM response string

##### options

Optional configuration

###### debug?

`boolean`

If true, logs extraction attempts to stderr

###### fieldName?

`string`

Expected field name to validate (e.g., "personas")

#### Returns

`T` \| `null`

***

### extractNamespaceFromUid()

> **extractNamespaceFromUid**(`uid`): `string`

Defined in: [packages/common/src/uid/index.ts:691](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L691)

Extract namespace from a UID string.

The namespace is the BUILD-TIME project identifier in the Artifact Graph.
This is DISTINCT from runtime tenant_id used for SaaS data isolation.

#### Parameters

##### uid

`string`

The UID string (e.g., "cpe:ulap/persona/CONTENT-CREATOR")

#### Returns

`string`

The namespace (e.g., "ulap")

#### Throws

HelixError if UID format is invalid

***

### findAllPersonas()

> **findAllPersonas**(`namespace`): `object`

Defined in: [packages/common/src/graph/index.ts:234](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/graph/index.ts#L234)

Build a query to find all personas for a namespace

#### Parameters

##### namespace

`string`

#### Returns

`object`

##### cypher

> **cypher**: `string`

##### params

> **params**: `Record`\<`string`, `unknown`\>

***

### findArtifactByUid()

> **findArtifactByUid**(`uid`, `namespace`): `object`

Defined in: [packages/common/src/graph/index.ts:182](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/graph/index.ts#L182)

Build a query to find an artifact by UID

#### Parameters

##### uid

`string`

##### namespace

`string`

#### Returns

`object`

##### cypher

> **cypher**: `string`

##### params

> **params**: `Record`\<`string`, `unknown`\>

***

### findArtifactsByLayer()

> **findArtifactsByLayer**(`layer`, `namespace`, `status?`): `object`

Defined in: [packages/common/src/graph/index.ts:198](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/graph/index.ts#L198)

Build a query to find all artifacts in a layer

#### Parameters

##### layer

`string`

##### namespace

`string`

##### status?

`string`

#### Returns

`object`

##### cypher

> **cypher**: `string`

##### params

> **params**: `Record`\<`string`, `unknown`\>

***

### findOrphans()

> **findOrphans**(`namespace`, `layer`): `object`

Defined in: [packages/common/src/graph/index.ts:362](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/graph/index.ts#L362)

Build a query to find orphan artifacts

#### Parameters

##### namespace

`string`

##### layer

`string`

#### Returns

`object`

##### cypher

> **cypher**: `string`

##### params

> **params**: `Record`\<`string`, `unknown`\>

***

### findPersonaByUid()

> **findPersonaByUid**(`uid`, `namespace`): `object`

Defined in: [packages/common/src/graph/index.ts:218](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/graph/index.ts#L218)

Build a query to find persona by UID

#### Parameters

##### uid

`string`

##### namespace

`string`

#### Returns

`object`

##### cypher

> **cypher**: `string`

##### params

> **params**: `Record`\<`string`, `unknown`\>

***

### generateTestTenantId()

> **generateTestTenantId**(): `string`

Defined in: [packages/common/src/testing/neo4j-test-utils.ts:90](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/neo4j-test-utils.ts#L90)

Generate a unique test tenant ID

#### Returns

`string`

***

### generateTestUid()

> **generateTestUid**(`layer`, `type`, `scope`, `id`, `namespace`): `string`

Defined in: [packages/common/src/testing/test-fixtures.ts:282](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/test-fixtures.ts#L282)

Generate a test UID

#### Parameters

##### layer

`string`

##### type

`string`

##### scope

`string`

##### id

`string`

##### namespace

`string` = `"test"`

#### Returns

`string`

***

### generateUID()

> **generateUID**(`options`): `string`

Defined in: [packages/common/src/uid/index.ts:516](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L516)

Generate a UID string from components (Gold Standard)

#### Parameters

##### options

[`GenerateUIDOptions`](#generateuidoptions)

UID components including Gold Standard extensions

#### Returns

`string`

Generated UID string

#### Throws

HelixError if components are invalid

***

### generateUniqueTestUid()

> **generateUniqueTestUid**(`layer`, `type`, `scope`): `string`

Defined in: [packages/common/src/testing/test-fixtures.ts:295](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/test-fixtures.ts#L295)

Generate a unique test UID with timestamp

#### Parameters

##### layer

`string`

##### type

`string`

##### scope

`string`

#### Returns

`string`

***

### getEventChannel()

> **getEventChannel**(`eventType`, `namespace?`): `string`

Defined in: [packages/common/src/events/index.ts:219](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/events/index.ts#L219)

Create a channel name for a specific event type

#### Parameters

##### eventType

`string`

The event type

##### namespace?

`string`

BUILD-TIME project identifier (optional)

#### Returns

`string`

***

### getNamespaceEventPattern()

> **getNamespaceEventPattern**(`namespace`): `string`

Defined in: [packages/common/src/events/index.ts:230](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/events/index.ts#L230)

Create a wildcard channel pattern for all events of a namespace

#### Parameters

##### namespace

`string`

BUILD-TIME project identifier

#### Returns

`string`

***

### getParentLayer()

> **getParentLayer**(`layer`): `"api"` \| `"imp"` \| `"tst"` \| `"dat"` \| `"sec"` \| `"des"` \| `"persona"` \| `"biz"` \| `"req"` \| `"arc"` \| `"cmp"` \| `"inf"` \| `"doc"` \| `null`

Defined in: [packages/common/src/uid/index.ts:668](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L668)

Get the parent layer for a given layer

#### Parameters

##### layer

Current layer code

`"api"` | `"imp"` | `"tst"` | `"dat"` | `"sec"` | `"des"` | `"persona"` | `"biz"` | `"req"` | `"arc"` | `"cmp"` | `"inf"` | `"doc"`

#### Returns

`"api"` \| `"imp"` \| `"tst"` \| `"dat"` \| `"sec"` \| `"des"` \| `"persona"` \| `"biz"` \| `"req"` \| `"arc"` \| `"cmp"` \| `"inf"` \| `"doc"` \| `null`

Parent layer code or null if no parent

***

### getRelationshipCount()

> **getRelationshipCount**(`client`, `tenantId`, `sourceUid`, `targetUid`, `relationshipType?`): `Promise`\<`number`\>

Defined in: [packages/common/src/testing/neo4j-test-utils.ts:288](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/neo4j-test-utils.ts#L288)

Get relationship count between two nodes

#### Parameters

##### client

[`GraphClient`](#graphclient)

##### tenantId

`string`

##### sourceUid

`string`

##### targetUid

`string`

##### relationshipType?

`string`

#### Returns

`Promise`\<`number`\>

***

### getScopes()

> **getScopes**(`uid`): `string`[]

Defined in: [packages/common/src/uid/index.ts:753](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L753)

Get individual scopes from a UID (Gold Standard)

For polysemic artifacts with compound scopes (ADMIN+USER), returns all scopes.
For single-scope artifacts, returns array with one element.
For artifacts without scope, returns empty array.

#### Parameters

##### uid

`string`

The UID string to analyze

#### Returns

`string`[]

Array of persona scope strings

***

### getServerConfig()

> **getServerConfig**(`serverName`): `Partial`\<[`HelixConfig`](#helixconfig)\>

Defined in: [packages/common/src/config/index.ts:267](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/config/index.ts#L267)

Get configuration for a specific MCP server

#### Parameters

##### serverName

`string`

#### Returns

`Partial`\<[`HelixConfig`](#helixconfig)\>

***

### ~~getTenantEventPattern()~~

> **getTenantEventPattern**(`tenantId`): `string`

Defined in: [packages/common/src/events/index.ts:237](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/events/index.ts#L237)

#### Parameters

##### tenantId

`string`

#### Returns

`string`

#### Deprecated

Use getNamespaceEventPattern instead

***

### getTestNeo4jConfig()

> **getTestNeo4jConfig**(): `object`

Defined in: [packages/common/src/testing/neo4j-test-utils.ts:26](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/neo4j-test-utils.ts#L26)

Get Neo4j test configuration from environment or defaults

#### Returns

`object`

##### connection\_acquisition\_timeout\_ms

> **connection\_acquisition\_timeout\_ms**: `number`

##### database

> **database**: `string`

##### max\_connection\_pool\_size

> **max\_connection\_pool\_size**: `number`

##### password

> **password**: `string`

##### type

> **type**: `"neo4j"`

##### uri

> **uri**: `string`

##### username

> **username**: `string`

***

### getTestRedisConfig()

> **getTestRedisConfig**(): `object`

Defined in: [packages/common/src/testing/redis-test-utils.ts:34](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/redis-test-utils.ts#L34)

Get Redis test configuration from environment or defaults

#### Returns

`object`

##### db

> **db**: `number`

##### host

> **host**: `string`

##### key\_prefix

> **key\_prefix**: `string`

##### password?

> `optional` **password**: `string`

##### port

> **port**: `number`

##### type

> **type**: `"redis"`

***

### getTraceComment()

> **getTraceComment**(`uid`): `string`

Defined in: [packages/common/src/uid/index.ts:641](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L641)

Extract the trace comment for code injection

#### Parameters

##### uid

`string`

The UID to trace

#### Returns

`string`

Trace comment string

***

### hasCompoundScopes()

> **hasCompoundScopes**(`uid`): `boolean`

Defined in: [packages/common/src/uid/index.ts:738](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L738)

Check if a UID has compound scopes (polysemic artifact)

#### Parameters

##### uid

`string`

The UID string to check

#### Returns

`boolean`

true if the UID has multiple persona scopes

***

### hashArtifactContent()

> **hashArtifactContent**(`content`): `string`

Defined in: [packages/common/src/hash/index.ts:46](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/hash/index.ts#L46)

Compute hash for artifact content (convenience wrapper)

#### Parameters

##### content

`string`

JSON stringified content or raw string

#### Returns

`string`

Hash string

***

### hashesMatch()

> **hashesMatch**(`hash1`, `hash2`): `boolean`

Defined in: [packages/common/src/hash/index.ts:35](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/hash/index.ts#L35)

Compare two content hashes

#### Parameters

##### hash1

First hash

`string` | `null` | `undefined`

##### hash2

Second hash

`string` | `null` | `undefined`

#### Returns

`boolean`

true if hashes match

***

### initializeSchema()

> **initializeSchema**(`client`): `Promise`\<`void`\>

Defined in: [packages/common/src/graph/index.ts:158](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/graph/index.ts#L158)

Initialize the graph schema

#### Parameters

##### client

[`GraphClient`](#graphclient)

GraphClient instance

#### Returns

`Promise`\<`void`\>

***

### isDeprecated()

> **isDeprecated**(`uid`): `boolean`

Defined in: [packages/common/src/uid/index.ts:851](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L851)

Check if a UID is marked as deprecated (Gold Standard)

#### Parameters

##### uid

`string`

The UID to check

#### Returns

`boolean`

true if the UID has deprecated=true query param

***

### isNeo4jAvailable()

> **isNeo4jAvailable**(): `Promise`\<`boolean`\>

Defined in: [packages/common/src/testing/neo4j-test-utils.ts:310](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/neo4j-test-utils.ts#L310)

Check Neo4j connectivity without throwing

#### Returns

`Promise`\<`boolean`\>

***

### isOwnedByPersona()

> **isOwnedByPersona**(`uid`, `personaScope`): `boolean`

Defined in: [packages/common/src/uid/index.ts:776](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L776)

Check if an artifact is owned by a specific persona (Gold Standard)

For compound scopes, checks if the persona is one of the owners.

#### Parameters

##### uid

`string`

The UID string to check

##### personaScope

`string`

The persona scope to check ownership for

#### Returns

`boolean`

true if the artifact is owned by (or shared with) the persona

***

### isRedisAvailable()

> **isRedisAvailable**(): `Promise`\<`boolean`\>

Defined in: [packages/common/src/testing/redis-test-utils.ts:78](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/redis-test-utils.ts#L78)

Check Redis connectivity without throwing

#### Returns

`Promise`\<`boolean`\>

***

### isSameArtifact()

> **isSameArtifact**(`uid1`, `uid2`): `boolean`

Defined in: [packages/common/src/uid/index.ts:917](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L917)

Compare two UIDs ignoring version and query params (Gold Standard)

Useful for checking if two UIDs refer to the same logical artifact
regardless of version or metadata.

#### Parameters

##### uid1

`string`

First UID

##### uid2

`string`

Second UID

#### Returns

`boolean`

true if the base UIDs match

***

### isValidUID()

> **isValidUID**(`uid`): `boolean`

Defined in: [packages/common/src/uid/index.ts:453](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L453)

Check if a UID string is valid without throwing

#### Parameters

##### uid

`string`

The UID string to check

#### Returns

`boolean`

true if valid, false otherwise

***

### linkArtifacts()

> **linkArtifacts**(`sourceUid`, `targetUid`, `relationshipType`, `namespace`, `properties?`): `object`

Defined in: [packages/common/src/graph/index.ts:317](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/graph/index.ts#L317)

Build a query to link two artifacts

#### Parameters

##### sourceUid

`string`

##### targetUid

`string`

##### relationshipType

`string`

##### namespace

`string`

##### properties?

`Record`\<`string`, `unknown`\>

#### Returns

`object`

##### cypher

> **cypher**: `string`

##### params

> **params**: `Record`\<`string`, `unknown`\>

***

### loadConfig()

> **loadConfig**(`configPath?`): `object`

Defined in: [packages/common/src/config/index.ts:209](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/config/index.ts#L209)

Load configuration from file

#### Parameters

##### configPath?

`string`

Path to helix.config.yaml (optional, uses HELIX_CONFIG env var or default)

#### Returns

`object`

Parsed and validated configuration

##### discovery

> **discovery**: `object` = `DiscoveryConfigSchema`

###### discovery.cot

> **cot**: `object`

###### discovery.cot.max\_iterations

> **max\_iterations**: `number`

###### discovery.cot.stakeholder\_depth

> **stakeholder\_depth**: `number`

###### discovery.og\_rag

> **og\_rag**: `object`

###### discovery.og\_rag.embedding\_model

> **embedding\_model**: `string`

###### discovery.og\_rag.enabled

> **enabled**: `boolean`

###### discovery.og\_rag.external\_sources

> **external\_sources**: `string`[]

##### enforcement

> **enforcement**: `object` = `EnforcementConfigSchema`

###### enforcement.audit\_logging

> **audit\_logging**: `boolean`

###### enforcement.gate\_enforcement

> **gate\_enforcement**: `boolean`

###### enforcement.orphan\_prevention

> **orphan\_prevention**: `boolean`

###### enforcement.tenant\_isolation

> **tenant\_isolation**: `boolean`

###### enforcement.uid\_validation

> **uid\_validation**: `"strict"` \| `"lenient"`

##### events

> **events**: `object` = `EventsConfigSchema`

###### events.db

> **db**: `number`

###### events.host

> **host**: `string`

###### events.key\_prefix

> **key\_prefix**: `string`

###### events.password?

> `optional` **password**: `string`

###### events.port

> **port**: `number`

###### events.type

> **type**: `"redis"`

##### fitness\_functions

> **fitness\_functions**: `object`[]

##### gates

> **gates**: `object` = `GatesConfigSchema`

###### gates.gate\_1

> **gate\_1**: `object` = `GateConfigSchema`

###### gates.gate\_1.description

> **description**: `string`

###### gates.gate\_1.enabled

> **enabled**: `boolean`

###### gates.gate\_1.name

> **name**: `string`

###### gates.gate\_1.required\_approvers

> **required\_approvers**: `number`

###### gates.gate\_1.timeout\_hours

> **timeout\_hours**: `number`

###### gates.gate\_2

> **gate\_2**: `object` = `GateConfigSchema`

###### gates.gate\_2.description

> **description**: `string`

###### gates.gate\_2.enabled

> **enabled**: `boolean`

###### gates.gate\_2.name

> **name**: `string`

###### gates.gate\_2.required\_approvers

> **required\_approvers**: `number`

###### gates.gate\_2.timeout\_hours

> **timeout\_hours**: `number`

###### gates.gate\_4

> **gate\_4**: `object` = `GateConfigSchema`

###### gates.gate\_4.description

> **description**: `string`

###### gates.gate\_4.enabled

> **enabled**: `boolean`

###### gates.gate\_4.name

> **name**: `string`

###### gates.gate\_4.required\_approvers

> **required\_approvers**: `number`

###### gates.gate\_4.timeout\_hours

> **timeout\_hours**: `number`

###### gates.gate\_5

> **gate\_5**: `object` = `GateConfigSchema`

###### gates.gate\_5.description

> **description**: `string`

###### gates.gate\_5.enabled

> **enabled**: `boolean`

###### gates.gate\_5.name

> **name**: `string`

###### gates.gate\_5.required\_approvers

> **required\_approvers**: `number`

###### gates.gate\_5.timeout\_hours

> **timeout\_hours**: `number`

##### graph

> **graph**: `object` = `GraphConfigSchema`

###### graph.connection\_acquisition\_timeout\_ms

> **connection\_acquisition\_timeout\_ms**: `number`

###### graph.database

> **database**: `string`

###### graph.max\_connection\_pool\_size

> **max\_connection\_pool\_size**: `number`

###### graph.password

> **password**: `string`

###### graph.type

> **type**: `"neo4j"`

###### graph.uri

> **uri**: `string`

###### graph.username

> **username**: `string`

##### layers

> **layers**: `object`[]

##### mad

> **mad**: `object` = `MADConfigSchema`

###### mad.agents

> **agents**: `object`

###### mad.agents.business\_analyst

> **business\_analyst**: `object` = `MADAgentConfigSchema`

###### mad.agents.business\_analyst.model

> **model**: `string`

###### mad.agents.business\_analyst.temperature

> **temperature**: `number`

###### mad.agents.domain\_expert

> **domain\_expert**: `object` = `MADAgentConfigSchema`

###### mad.agents.domain\_expert.model

> **model**: `string`

###### mad.agents.domain\_expert.temperature

> **temperature**: `number`

###### mad.agents.judge

> **judge**: `object` = `MADAgentConfigSchema`

###### mad.agents.judge.model

> **model**: `string`

###### mad.agents.judge.temperature

> **temperature**: `number`

###### mad.agents.ux\_researcher

> **ux\_researcher**: `object` = `MADAgentConfigSchema`

###### mad.agents.ux\_researcher.model

> **model**: `string`

###### mad.agents.ux\_researcher.temperature

> **temperature**: `number`

###### mad.consensus\_threshold

> **consensus\_threshold**: `number`

###### mad.enabled

> **enabled**: `boolean`

###### mad.max\_rounds

> **max\_rounds**: `number`

##### ontology

> **ontology**: `object` = `OntologyConfigSchema`

###### ontology.pattern\_paths

> **pattern\_paths**: `string`[]

###### ontology.sdo\_path

> **sdo\_path**: `string`

##### policy

> **policy**: `object` = `PolicyConfigSchema`

###### policy.auto\_load

> **auto\_load**: `boolean`

###### policy.engine

> **engine**: `"casbin"`

###### policy.model\_path

> **model\_path**: `string`

###### policy.policy\_path

> **policy\_path**: `string`

##### relationships

> **relationships**: `object`[]

##### server

> **server**: `object` = `ServerConfigSchema`

###### server.log\_level

> **log\_level**: `"error"` \| `"info"` \| `"debug"` \| `"warn"`

###### server.uid\_prefix

> **uid\_prefix**: `string`

##### tenant\_modes

> **tenant\_modes**: `object`[]

##### verification

> **verification**: `object` = `VerificationConfigSchema`

###### verification.max\_depth

> **max\_depth**: `number`

###### verification.smt\_solver

> **smt\_solver**: `"z3"`

###### verification.timeout\_ms

> **timeout\_ms**: `number`

###### verification.z3\_path

> **z3\_path**: `string`

#### Throws

HelixError if config cannot be loaded or validated

***

### markDeprecated()

> **markDeprecated**(`uid`): `string`

Defined in: [packages/common/src/uid/index.ts:825](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L825)

Create a deprecated version of a UID (Gold Standard)

Appends ?deprecated=true to mark the UID as deprecated.
Used for persona evolution when old personas are superseded.

#### Parameters

##### uid

`string`

The UID to deprecate

#### Returns

`string`

UID with deprecated query parameter

***

### parseAndValidateUIDs()

> **parseAndValidateUIDs**(`uids`): `object`

Defined in: [packages/common/src/uid/index.ts:273](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L273)

Validate and parse multiple UIDs, extracting common namespace

#### Parameters

##### uids

`string`[]

Array of UIDs to validate

#### Returns

`object`

Parsed UIDs and common namespace

##### namespace

> **namespace**: `string`

##### parsed

> **parsed**: [`ParsedUID`](#parseduid)[]

#### Throws

HelixError if validation fails

***

### parseUID()

> **parseUID**(`uid`): [`ParsedUID`](#parseduid)

Defined in: [packages/common/src/uid/index.ts:344](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L344)

Parse a UID string into its components

#### Parameters

##### uid

`string`

The UID string to parse

#### Returns

[`ParsedUID`](#parseduid)

Parsed UID object

#### Throws

HelixError if UID is invalid

***

### personaExists()

> **personaExists**(`client`, `tenantId`, `uid`): `Promise`\<`boolean`\>

Defined in: [packages/common/src/testing/neo4j-test-utils.ts:269](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/neo4j-test-utils.ts#L269)

Check if a persona exists in the graph

#### Parameters

##### client

[`GraphClient`](#graphclient)

##### tenantId

`string`

##### uid

`string`

#### Returns

`Promise`\<`boolean`\>

***

### publishAndWait()

> **publishAndWait**(`eventBus`, `channel`, `eventType`, `payload`, `namespace`): `Promise`\<`string`\>

Defined in: [packages/common/src/testing/redis-test-utils.ts:180](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/redis-test-utils.ts#L180)

Publish a test event and wait for acknowledgment

#### Parameters

##### eventBus

[`EventBus`](#eventbus)

##### channel

`string`

##### eventType

`string`

##### payload

`unknown`

##### namespace

`string`

BUILD-TIME project identifier

#### Returns

`Promise`\<`string`\>

***

### setupTestNeo4j()

> **setupTestNeo4j**(): `Promise`\<[`Neo4jTestContext`](#neo4jtestcontext)\>

Defined in: [packages/common/src/testing/neo4j-test-utils.ts:47](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/neo4j-test-utils.ts#L47)

Create a Neo4j client for integration testing

#### Returns

`Promise`\<[`Neo4jTestContext`](#neo4jtestcontext)\>

Neo4j test context with client and cleanup function

***

### setupTestRedis()

> **setupTestRedis**(): `Promise`\<[`RedisTestContext`](#redistestcontext)\>

Defined in: [packages/common/src/testing/redis-test-utils.ts:57](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/redis-test-utils.ts#L57)

Create a Redis event bus for integration testing

#### Returns

`Promise`\<[`RedisTestContext`](#redistestcontext)\>

Redis test context with event bus and cleanup function

***

### startHealthServer()

> **startHealthServer**(`options`): `Server`

Defined in: [packages/common/src/health/http-health-server.ts:33](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/health/http-health-server.ts#L33)

Create and start an HTTP health server

#### Parameters

##### options

[`HealthServerOptions`](#healthserveroptions)

#### Returns

`Server`

***

### stripQueryParams()

> **stripQueryParams**(`uid`): `string`

Defined in: [packages/common/src/uid/index.ts:890](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L890)

Strip all query parameters from a UID (Gold Standard)

Returns the canonical base UID without any query parameters.

#### Parameters

##### uid

`string`

The UID with potential query params

#### Returns

`string`

Clean UID without query parameters

***

### traceImpact()

> **traceImpact**(`uid`, `namespace`, `maxDepth`): `object`

Defined in: [packages/common/src/graph/index.ts:268](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/graph/index.ts#L268)

Build a query to find impact (downstream artifacts)

#### Parameters

##### uid

`string`

##### namespace

`string`

##### maxDepth

`number` = `10`

#### Returns

`object`

##### cypher

> **cypher**: `string`

##### params

> **params**: `Record`\<`string`, `unknown`\>

***

### traceLineage()

> **traceLineage**(`uid`, `namespace`): `object`

Defined in: [packages/common/src/graph/index.ts:251](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/graph/index.ts#L251)

Build a query to trace artifact lineage back to founding intent

#### Parameters

##### uid

`string`

##### namespace

`string`

#### Returns

`object`

##### cypher

> **cypher**: `string`

##### params

> **params**: `Record`\<`string`, `unknown`\>

***

### validateLayerDerivation()

> **validateLayerDerivation**(`childLayer`, `parentLayer`): `object`

Defined in: [packages/common/src/uid/index.ts:125](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L125)

Validate if an artifact can derive from a parent layer

#### Parameters

##### childLayer

The layer being created

`"api"` | `"imp"` | `"tst"` | `"dat"` | `"sec"` | `"des"` | `"persona"` | `"biz"` | `"req"` | `"arc"` | `"cmp"` | `"inf"` | `"doc"`

##### parentLayer

The layer of the parent artifact

`"api"` | `"imp"` | `"tst"` | `"dat"` | `"sec"` | `"des"` | `"persona"` | `"biz"` | `"req"` | `"arc"` | `"cmp"` | `"inf"` | `"doc"`

#### Returns

`object`

Object with valid flag and error message if invalid

##### error?

> `optional` **error**: `string`

##### valid

> **valid**: `boolean`

***

### validateNamespace()

> **validateNamespace**(`namespace`): `string`

Defined in: [packages/common/src/uid/index.ts:710](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L710)

Validate a namespace string.

The namespace is the BUILD-TIME project identifier used in:
- UID generation (cpe:{namespace}/...)
- Ecosystem node identification
- Artifact graph scoping

This is DISTINCT from runtime tenant_id used for SaaS data isolation.

#### Parameters

##### namespace

`string`

The namespace string

#### Returns

`string`

The validated namespace

#### Throws

HelixError if namespace format is invalid

***

### validateSameNamespace()

> **validateSameNamespace**(`uids`): `object`

Defined in: [packages/common/src/uid/index.ts:233](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L233)

Validate that all UIDs in an array belong to the same namespace

#### Parameters

##### uids

`string`[]

Array of UIDs to validate

#### Returns

`object`

Object with valid flag and namespace if valid, or error message

##### error?

> `optional` **error**: `string`

##### namespace?

> `optional` **namespace**: `string`

##### valid

> **valid**: `boolean`

***

### validateUID()

> **validateUID**(`uid`): `boolean`

Defined in: [packages/common/src/uid/index.ts:442](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L442)

Validate a UID string

#### Parameters

##### uid

`string`

The UID string to validate

#### Returns

`boolean`

true if valid

#### Throws

HelixError if invalid

***

### waitForEvent()

> **waitForEvent**(`eventBus`, `channel`, `eventType`, `timeoutMs`): `Promise`\<\{ `causationId?`: `string`; `correlationId?`: `string`; `id`: `string`; `namespace`: `string`; `payload?`: `unknown`; `timestamp`: `Date`; `type`: `string`; \}\>

Defined in: [packages/common/src/testing/redis-test-utils.ts:153](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/testing/redis-test-utils.ts#L153)

Wait for a specific event type to be received

#### Parameters

##### eventBus

[`EventBus`](#eventbus)

EventBus instance

##### channel

`string`

Channel to subscribe to

##### eventType

`string`

Expected event type

##### timeoutMs

`number` = `5000`

Timeout in milliseconds

#### Returns

`Promise`\<\{ `causationId?`: `string`; `correlationId?`: `string`; `id`: `string`; `namespace`: `string`; `payload?`: `unknown`; `timestamp`: `Date`; `type`: `string`; \}\>

***

### withDerivation()

> **withDerivation**(`uid`, `parentId`): `string`

Defined in: [packages/common/src/uid/index.ts:863](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L863)

Add explicit derivation to a UID (Gold Standard)

#### Parameters

##### uid

`string`

The UID to modify

##### parentId

`string`

The parent artifact ID to derive from

#### Returns

`string`

UID with ?derives=parentId query parameter

***

### withRetry()

> **withRetry**\<`T`\>(`fn`, `maxRetries`, `baseDelayMs`): `Promise`\<`T`\>

Defined in: [packages/common/src/llm/index.ts:267](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/llm/index.ts#L267)

Retry LLM call with exponential backoff

#### Type Parameters

##### T

`T`

#### Parameters

##### fn

() => `Promise`\<`T`\>

##### maxRetries

`number` = `3`

##### baseDelayMs

`number` = `1000`

#### Returns

`Promise`\<`T`\>

***

### withVersion()

> **withVersion**(`uid`, `version`): `string`

Defined in: [packages/common/src/uid/index.ts:788](https://gitlab.com/edwin.rene/helix/-/blob/f986a20744abb2ca3c6db31abf215d9db2807720/packages/common/src/uid/index.ts#L788)

Create a versioned UID from an existing UID (Gold Standard)

#### Parameters

##### uid

`string`

The original UID

##### version

`string`

The version to append (semver format)

#### Returns

`string`

New UID with version
