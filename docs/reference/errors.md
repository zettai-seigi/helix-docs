# Error Codes & Error Handling

Comprehensive reference for Helix error codes, error handling patterns, and recovery strategies.

## Error Format

All Helix errors follow a consistent format:

```typescript
interface HelixError {
  code: ErrorCode;        // Machine-readable error code
  message: string;        // Human-readable description
  context?: {             // Additional context for debugging
    [key: string]: unknown;
  };
  recoverable: boolean;   // Whether the error can be automatically recovered
  retryable: boolean;     // Whether retrying might succeed
  httpStatus?: number;    // Corresponding HTTP status code
}
```

**Example**:
```typescript
{
  code: "INVALID_UID",
  message: "UID does not conform to RFC 8141 taxonomy",
  context: {
    received: "invalid-uid",
    expected: "cpe:{ns}/{layer}/{type}/{scope}/{id}"
  },
  recoverable: false,
  retryable: false,
  httpStatus: 400
}
```

---

## Error Code Reference

### UID Errors (1xx)

| Code | HTTP | Retryable | Description | Recovery |
|------|------|-----------|-------------|----------|
| `INVALID_UID` | 400 | No | UID format violation | Fix UID format |
| `UID_NOT_FOUND` | 404 | No | Referenced UID doesn't exist | Create missing artifact |
| `DUPLICATE_UID` | 409 | No | UID already exists | Use different ID |
| `UID_PARSE_ERROR` | 400 | No | Unable to parse UID components | Check UID syntax |

### Graph Errors (2xx)

| Code | HTTP | Retryable | Description | Recovery |
|------|------|-----------|-------------|----------|
| `ORPHAN_ARTIFACT` | 400 | No | Missing parent requirement | Create parent first |
| `CYCLE_DETECTED` | 400 | No | Circular dependency found | Review relationships |
| `LAYER_VIOLATION` | 400 | No | Invalid layer reference | Check layer order |
| `INVALID_RELATIONSHIP` | 400 | No | Invalid relationship type | Use valid relationship |
| `GRAPH_CONNECTION_ERROR` | 503 | Yes | Neo4j connection failed | Retry with backoff |
| `GRAPH_QUERY_ERROR` | 500 | Maybe | Cypher query failed | Check query syntax |
| `GRAPH_TIMEOUT` | 504 | Yes | Query timed out | Retry or optimize query |

### Gate Errors (3xx)

| Code | HTTP | Retryable | Description | Recovery |
|------|------|-----------|-------------|----------|
| `GATE_NOT_PASSED` | 403 | Yes | Required gate not approved | Wait for approval |
| `GATE_TIMEOUT` | 408 | No | Gate approval timed out | Re-request approval |
| `GATE_REJECTED` | 403 | No | Gate was rejected | Address feedback |
| `GATE_NOT_FOUND` | 404 | No | Gate doesn't exist | Check gate ID |
| `GATE_ALREADY_RESOLVED` | 409 | No | Gate already approved/rejected | Use resolved state |

### Authority Errors (4xx)

| Code | HTTP | Retryable | Description | Recovery |
|------|------|-----------|-------------|----------|
| `AUTHORITY_VIOLATION` | 403 | No | Persona not authorized | Request access |
| `TENANT_MISMATCH` | 403 | No | Cross-tenant access denied | Use correct tenant |
| `INSUFFICIENT_PERMISSIONS` | 403 | No | Missing required permissions | Request permissions |
| `SESSION_EXPIRED` | 401 | Yes | Authentication expired | Re-authenticate |
| `INVALID_TOKEN` | 401 | No | Invalid auth token | Get new token |

### Validation Errors (5xx)

| Code | HTTP | Retryable | Description | Recovery |
|------|------|-----------|-------------|----------|
| `INVALID_CML` | 400 | No | CML syntax error | Fix CML syntax |
| `MISSING_REQUIRED_FIELD` | 400 | No | Required field not provided | Add required field |
| `INVALID_LAYER_CODE` | 400 | No | Unknown layer code | Use valid layer |
| `INVALID_ARTIFACT_TYPE` | 400 | No | Unknown artifact type | Use valid type |
| `SCHEMA_VALIDATION_FAILED` | 400 | No | Input doesn't match schema | Fix input format |
| `CONSTRAINT_VIOLATION` | 400 | No | Business rule violated | Fix constraint |

### Discovery Errors (6xx)

| Code | HTTP | Retryable | Description | Recovery |
|------|------|-----------|-------------|----------|
| `DISCOVERY_FAILED` | 500 | Yes | Persona discovery failed | Retry |
| `MAD_CONSENSUS_FAILED` | 500 | Yes | Debate didn't reach consensus | Increase rounds |
| `ONTOLOGY_LOAD_ERROR` | 500 | No | Failed to load SDO | Check ontology path |
| `FOUNDING_INTENT_EMPTY` | 400 | No | Empty founding intent | Provide intent |

### Cascade Errors (7xx)

| Code | HTTP | Retryable | Description | Recovery |
|------|------|-----------|-------------|----------|
| `GENERATION_FAILED` | 500 | Yes | Artifact generation failed | Retry |
| `TEMPLATE_NOT_FOUND` | 404 | No | Generator template missing | Add template |
| `GENERATOR_ERROR` | 500 | Yes | Layer generator error | Check generator |
| `DEPENDENCY_MISSING` | 400 | No | Required upstream missing | Generate upstream first |

### Verification Errors (8xx)

| Code | HTTP | Retryable | Description | Recovery |
|------|------|-----------|-------------|----------|
| `DRIFT_DETECTED` | 409 | No | Spec/impl mismatch | Regenerate or update |
| `PROOF_FAILED` | 500 | No | Z3 proof failed | Review assertions |
| `PROOF_TIMEOUT` | 504 | Yes | Z3 solver timed out | Simplify proof |
| `FITNESS_VIOLATION` | 400 | No | Fitness function failed | Fix violations |
| `COVERAGE_GAP` | 400 | No | Insufficient coverage | Add missing artifacts |

### System Errors (9xx)

| Code | HTTP | Retryable | Description | Recovery |
|------|------|-----------|-------------|----------|
| `INTERNAL_ERROR` | 500 | Yes | Unexpected internal error | Retry or report |
| `SERVICE_UNAVAILABLE` | 503 | Yes | Service temporarily down | Retry with backoff |
| `CONFIGURATION_ERROR` | 500 | No | Invalid configuration | Fix config |
| `DEPENDENCY_ERROR` | 503 | Yes | External dependency failed | Retry |

---

## Error Handling Patterns

### Basic Error Handling

```typescript
import { HelixError, ErrorCode, isHelixError } from '@helix/common';

try {
  await cascade.generate_artifact({ ... });
} catch (error) {
  if (isHelixError(error)) {
    switch (error.code) {
      case ErrorCode.ORPHAN_ARTIFACT:
        // Handle missing parent - create parent first
        await createParentArtifact(error.context.requiredParent);
        break;

      case ErrorCode.GATE_NOT_PASSED:
        // Handle gate - wait or notify
        console.log(`Waiting for gate: ${error.context.gateId}`);
        break;

      case ErrorCode.TENANT_MISMATCH:
        // Handle tenant error - can't recover
        throw new Error('Cross-tenant access denied');

      default:
        // Log and re-throw unknown errors
        console.error('Unhandled Helix error:', error);
        throw error;
    }
  } else {
    // Non-Helix error
    throw error;
  }
}
```

### Retry with Exponential Backoff

```typescript
import { withRetry, isRetryable } from '@helix/common/errors';

// Automatic retry for retryable errors
const result = await withRetry(
  () => graphClient.query(cypher),
  {
    maxRetries: 3,
    initialDelayMs: 100,
    maxDelayMs: 5000,
    backoffMultiplier: 2,
    shouldRetry: (error) => isRetryable(error)
  }
);

// Manual retry implementation
async function retryableOperation<T>(
  operation: () => Promise<T>,
  maxRetries = 3
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;

      if (!isHelixError(error) || !error.retryable) {
        throw error;
      }

      const delay = Math.min(100 * Math.pow(2, attempt), 5000);
      await sleep(delay);
    }
  }

  throw lastError;
}
```

### Circuit Breaker Pattern

```typescript
import { CircuitBreaker } from '@helix/common/errors';

const graphBreaker = new CircuitBreaker({
  name: 'neo4j',
  failureThreshold: 5,
  resetTimeoutMs: 30000,
  halfOpenRequests: 3
});

async function safeGraphQuery(cypher: string) {
  return graphBreaker.execute(async () => {
    return graphClient.query(cypher);
  });
}

// Monitor circuit state
graphBreaker.on('open', () => {
  console.warn('Neo4j circuit breaker opened');
  alertOps('Neo4j connection issues detected');
});

graphBreaker.on('close', () => {
  console.info('Neo4j circuit breaker closed');
});
```

### Error Recovery Strategies

```typescript
import { ErrorRecovery, RecoveryStrategy } from '@helix/common/errors';

const recovery = new ErrorRecovery();

// Register recovery strategies
recovery.register(ErrorCode.ORPHAN_ARTIFACT, async (error, context) => {
  // Try to create the missing parent
  const parentUid = error.context.requiredParent;
  const parentLayer = extractLayer(parentUid);

  // Generate parent artifact
  await cascade.generate_artifact({
    uid: parentUid,
    layer: parentLayer,
    tenant_id: context.tenantId
  });

  return RecoveryStrategy.RETRY;
});

recovery.register(ErrorCode.GATE_NOT_PASSED, async (error, context) => {
  // Notify and wait
  await notifyPendingGate(error.context.gateId);
  return RecoveryStrategy.WAIT;
});

recovery.register(ErrorCode.GRAPH_CONNECTION_ERROR, async () => {
  // Just retry with backoff
  return RecoveryStrategy.RETRY_WITH_BACKOFF;
});

// Use recovery in operations
async function resilientOperation() {
  return recovery.execute(
    () => cascade.generate_artifact({ ... }),
    { tenantId: 'psychotest' }
  );
}
```

---

## MCP Error Handling

### Tool Error Responses

MCP tools return errors in a standard format:

```typescript
// Error response from MCP tool
{
  content: [{
    type: 'text',
    text: JSON.stringify({
      success: false,
      error: {
        code: 'ORPHAN_ARTIFACT',
        message: 'Cannot create artifact without parent',
        context: {
          uid: 'cpe:psychotest/imp/api/endpoint',
          requiredParent: 'cpe:psychotest/arc/component/endpoint'
        }
      }
    })
  }],
  isError: true
}
```

### Handling Tool Errors

```typescript
// In AI client code
const response = await client.callTool({
  name: 'cpe/generate_artifact',
  arguments: { ... }
});

if (response.isError) {
  const errorData = JSON.parse(response.content[0].text);

  // Present error to user or handle automatically
  if (errorData.error.code === 'GATE_NOT_PASSED') {
    return `Waiting for human approval of gate ${errorData.error.context.gateId}`;
  }

  throw new Error(errorData.error.message);
}
```

### Resource Error Handling

```typescript
// Reading a resource that might not exist
const resource = await client.readResource({
  uri: 'cpe://graph/artifacts/cpe:psychotest/req/story/missing'
});

// Check for error in resource content
if (resource.contents[0].text.includes('"error"')) {
  const errorData = JSON.parse(resource.contents[0].text);
  if (errorData.error.code === 'UID_NOT_FOUND') {
    // Handle missing artifact
  }
}
```

---

## Custom Error Creation

### Defining Custom Errors

```typescript
import { HelixError, ErrorCode } from '@helix/common';

// Throwing a built-in error
throw new HelixError(
  ErrorCode.INVALID_UID,
  'UID does not conform to taxonomy',
  {
    received: uid,
    expected: 'cpe:{ns}/{layer}/{type}/{scope}/{id}'
  }
);

// Creating error with recovery hint
throw new HelixError(
  ErrorCode.ORPHAN_ARTIFACT,
  'Cannot create artifact without parent',
  {
    uid: artifactUid,
    requiredParent: parentUid,
    recoveryHint: 'Generate parent artifact first'
  }
);
```

### Error Utilities

```typescript
import {
  HelixError,
  ErrorCode,
  isHelixError,
  isRetryable,
  getHttpStatus,
  createValidationError
} from '@helix/common/errors';

// Type guard
if (isHelixError(error)) {
  console.log(error.code);  // TypeScript knows this is ErrorCode
}

// Check if retryable
if (isRetryable(error)) {
  await sleep(1000);
  return retry();
}

// Get HTTP status for API responses
const status = getHttpStatus(error);  // 400, 404, 500, etc.

// Create validation errors easily
throw createValidationError('name', 'Name is required');
// Creates: { code: 'MISSING_REQUIRED_FIELD', ... }
```

---

## Logging Errors

### Structured Error Logging

```typescript
import { createLogger } from '@helix/common/logging';

const logger = createLogger('mcp-cascade');

try {
  await generateArtifact(input);
} catch (error) {
  if (isHelixError(error)) {
    logger.error('Artifact generation failed', {
      errorCode: error.code,
      errorMessage: error.message,
      context: error.context,
      tenantId: input.tenant_id,
      artifactUid: input.uid,
      stack: error.stack
    });
  } else {
    logger.error('Unexpected error', {
      error: String(error),
      stack: (error as Error).stack
    });
  }

  throw error;
}
```

### Error Metrics

```typescript
import { metrics } from '@helix/common/metrics';

// Track error occurrences
metrics.counter('helix_errors_total', {
  code: error.code,
  server: 'mcp-cascade',
  tenant: tenantId
}).inc();

// Track error rates
metrics.histogram('helix_error_rate', {
  server: 'mcp-cascade'
}).observe(errorRate);
```

---

## Best Practices

### Do's

1. **Always include context**: Provide enough information to debug
2. **Use appropriate error codes**: Don't use generic errors
3. **Set retryable correctly**: Help callers know if retry makes sense
4. **Log errors**: Include correlation IDs for tracing
5. **Handle errors at the right level**: Don't catch too early

### Don'ts

1. **Don't swallow errors**: Always log or re-throw
2. **Don't expose internal details**: Sanitize error messages for clients
3. **Don't retry non-retryable errors**: Respect the retryable flag
4. **Don't ignore error context**: It contains valuable debugging info
5. **Don't use string matching**: Use error codes for reliable handling
