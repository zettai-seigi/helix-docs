# Testing Guide

Comprehensive guide for writing and running tests in Helix.

## Test Framework

Helix uses **Vitest** as the test runner with the following stack:

- **Vitest** - Fast unit test runner
- **@helix/common/testing** - Shared test utilities
- **neo4j-driver** - Real Neo4j for integration tests
- **ioredis** - Real Redis for event tests

## Running Tests

### Basic Commands

```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm test --filter=@helix/common
pnpm test --filter=@helix/mcp-graph
pnpm test --filter=@helix/mcp-discovery

# Watch mode (re-run on changes)
pnpm test:watch

# Run with coverage
pnpm test:coverage

# Run integration tests (requires Neo4j + Redis)
pnpm test:integration

# Run E2E tests
pnpm test:e2e
```

### Filtering Tests

```bash
# Run specific test file
pnpm test --filter=@helix/mcp-graph -- query-graph.test.ts

# Run tests matching pattern
pnpm test --filter=@helix/common -- -t "UID"

# Run only failed tests
pnpm test -- --reporter=verbose --bail
```

---

## Test Structure

### Directory Layout

```
packages/mcp-graph/
├── src/
│   ├── tools/
│   │   ├── query-graph.ts              # Implementation
│   │   ├── query-graph.test.ts         # Unit tests
│   │   └── query-graph.integration.test.ts  # Integration tests
│   └── __tests__/
│       └── e2e/
│           └── graph-workflow.e2e.test.ts   # E2E tests
├── vitest.config.ts
└── package.json
```

### File Naming Conventions

| Pattern | Type | Description |
|---------|------|-------------|
| `*.test.ts` | Unit | Fast, isolated tests |
| `*.integration.test.ts` | Integration | Tests with real Neo4j/Redis |
| `*.e2e.test.ts` | End-to-End | Full workflow tests |

---

## Unit Tests

Unit tests are fast, isolated, and mock external dependencies.

### Basic Unit Test

```typescript
// query-graph.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryGraphTool } from './query-graph';

describe('QueryGraphTool', () => {
  let mockGraphClient: any;
  let tool: QueryGraphTool;

  beforeEach(() => {
    mockGraphClient = {
      readQuery: vi.fn(),
      writeQuery: vi.fn(),
    };
    tool = new QueryGraphTool(mockGraphClient);
  });

  describe('execute', () => {
    it('should execute read query successfully', async () => {
      mockGraphClient.readQuery.mockResolvedValue({
        records: [{ get: (key: string) => 'value' }]
      });

      const result = await tool.execute({
        query: 'MATCH (n) RETURN n',
        tenant_id: 'test-tenant'
      });

      expect(mockGraphClient.readQuery).toHaveBeenCalledWith(
        'MATCH (n) RETURN n',
        { tenantId: 'test-tenant' }
      );
      expect(result.success).toBe(true);
    });

    it('should reject queries without tenant_id', async () => {
      await expect(tool.execute({
        query: 'MATCH (n) RETURN n',
        tenant_id: ''
      })).rejects.toThrow('tenant_id is required');
    });

    it('should handle query errors gracefully', async () => {
      mockGraphClient.readQuery.mockRejectedValue(new Error('Connection failed'));

      await expect(tool.execute({
        query: 'MATCH (n) RETURN n',
        tenant_id: 'test'
      })).rejects.toThrow('Connection failed');
    });
  });
});
```

### Testing Zod Schemas

```typescript
// models.test.ts
import { describe, it, expect } from 'vitest';
import { PersonaSchema, ArtifactSchema } from './models';

describe('PersonaSchema', () => {
  it('should validate valid persona', () => {
    const validPersona = {
      uid: 'cpe:test/persona/USER',
      name: 'Test User',
      category: 'b2c_end_user',
      type: 'b2c',
      priority: 1,
      accessLevel: 'user-scoped',
      status: 'active',
      tenantId: 'default'
    };

    const result = PersonaSchema.safeParse(validPersona);
    expect(result.success).toBe(true);
  });

  it('should reject invalid UID format', () => {
    const invalidPersona = {
      uid: 'invalid-uid',  // Missing cpe: prefix
      name: 'Test',
      category: 'b2c_end_user',
      type: 'b2c',
      priority: 1,
      accessLevel: 'user-scoped',
      status: 'active',
      tenantId: 'default'
    };

    const result = PersonaSchema.safeParse(invalidPersona);
    expect(result.success).toBe(false);
  });

  it('should require all mandatory fields', () => {
    const incomplete = {
      uid: 'cpe:test/persona/USER',
      name: 'Test'
      // Missing required fields
    };

    const result = PersonaSchema.safeParse(incomplete);
    expect(result.success).toBe(false);
  });
});
```

### Testing Error Handling

```typescript
// errors.test.ts
import { describe, it, expect } from 'vitest';
import { HelixError, ErrorCode } from './errors';

describe('HelixError', () => {
  it('should create error with code and message', () => {
    const error = new HelixError(
      ErrorCode.INVALID_UID,
      'Invalid UID format',
      { received: 'bad-uid' }
    );

    expect(error.code).toBe(ErrorCode.INVALID_UID);
    expect(error.message).toBe('Invalid UID format');
    expect(error.details).toEqual({ received: 'bad-uid' });
  });

  it('should be instance of Error', () => {
    const error = new HelixError(ErrorCode.ORPHAN_ARTIFACT, 'No parent');
    expect(error).toBeInstanceOf(Error);
  });
});
```

---

## Integration Tests

Integration tests use real Neo4j and Redis instances.

### Setup with Test Utilities

```typescript
// link-artifacts.integration.test.ts
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import {
  setupTestNeo4j,
  clearTestData,
  createTestArtifact,
  createTestPersona,
  generateTestUid
} from '@helix/common/testing';
import { LinkArtifactsTool } from './link-artifacts';

describe('LinkArtifactsTool Integration', () => {
  let graphClient: any;
  let tool: LinkArtifactsTool;
  const tenantId = 'integration-test';

  beforeAll(async () => {
    graphClient = await setupTestNeo4j();
    tool = new LinkArtifactsTool(graphClient);
  });

  afterAll(async () => {
    await graphClient.close();
  });

  beforeEach(async () => {
    await clearTestData(graphClient, tenantId);
  });

  it('should create DERIVES_FROM relationship', async () => {
    // Setup: Create persona and artifact
    const persona = await createTestPersona(graphClient, {
      tenantId,
      name: 'Test User'
    });

    const artifact = await createTestArtifact(graphClient, {
      tenantId,
      layer: 'req',
      name: 'Test Requirement'
    });

    // Execute
    const result = await tool.execute({
      source_uid: artifact.uid,
      target_uid: persona.uid,
      relationship_type: 'DERIVES_FROM',
      tenant_id: tenantId
    });

    // Verify
    expect(result.success).toBe(true);

    const query = `
      MATCH (a:Artifact {uid: $artifactUid})-[r:DERIVES_FROM]->(p:Persona {uid: $personaUid})
      RETURN r
    `;
    const verifyResult = await graphClient.readQuery(query, {
      artifactUid: artifact.uid,
      personaUid: persona.uid
    });

    expect(verifyResult.records.length).toBe(1);
  });

  it('should prevent duplicate relationships', async () => {
    const persona = await createTestPersona(graphClient, { tenantId });
    const artifact = await createTestArtifact(graphClient, { tenantId });

    // Create first relationship
    await tool.execute({
      source_uid: artifact.uid,
      target_uid: persona.uid,
      relationship_type: 'DERIVES_FROM',
      tenant_id: tenantId
    });

    // Attempt duplicate
    const result = await tool.execute({
      source_uid: artifact.uid,
      target_uid: persona.uid,
      relationship_type: 'DERIVES_FROM',
      tenant_id: tenantId
    });

    // Should use MERGE, not create duplicate
    expect(result.success).toBe(true);

    const countQuery = `
      MATCH (a:Artifact {uid: $artifactUid})-[r:DERIVES_FROM]->(p:Persona {uid: $personaUid})
      RETURN count(r) as count
    `;
    const countResult = await graphClient.readQuery(countQuery, {
      artifactUid: artifact.uid,
      personaUid: persona.uid
    });

    expect(countResult.records[0].get('count').toNumber()).toBe(1);
  });
});
```

### Running Integration Tests

```bash
# Start test infrastructure
docker-compose -f docker-compose.dev.yml up -d

# Wait for Neo4j
sleep 30

# Run integration tests
pnpm test:integration

# Or run specific package
pnpm test --filter=@helix/mcp-graph -- integration
```

---

## Test Utilities

### Available Utilities from @helix/common/testing

```typescript
import {
  // Neo4j utilities
  setupTestNeo4j,
  clearTestData,
  initTestSchema,

  // Redis utilities
  setupTestRedis,
  clearTestRedis,

  // Factory functions
  createTestPersona,
  createTestArtifact,
  createTestGate,
  createTestRelationship,

  // Generators
  generateTestUid,
  generateTestTenantId,

  // Test contexts
  withTestContext,
  describeWithNeo4j,
  describeWithInfrastructure
} from '@helix/common/testing';
```

### Factory Functions

```typescript
// Create test persona with defaults
const persona = await createTestPersona(graphClient, {
  tenantId: 'test',
  // Optional overrides
  name: 'Custom Name',
  category: 'b2b_customer',
  priority: 1
});

// Create test artifact
const artifact = await createTestArtifact(graphClient, {
  tenantId: 'test',
  layer: 'req',
  artifactType: 'story',
  personaScope: 'USER'
});

// Create relationship
await createTestRelationship(graphClient, {
  sourceUid: artifact.uid,
  targetUid: persona.uid,
  type: 'DERIVES_FROM'
});
```

### Test Context Wrapper

```typescript
// Automatically handles setup and cleanup
describeWithNeo4j('MyTool', (getClient) => {
  it('should work with Neo4j', async () => {
    const client = getClient();
    // Test code here
  });
});

// With both Neo4j and Redis
describeWithInfrastructure('MyTool', (getClient, getRedis) => {
  it('should work with both', async () => {
    const neo4j = getClient();
    const redis = getRedis();
    // Test code here
  });
});
```

---

## Mocking

### Mocking Modules

```typescript
import { vi } from 'vitest';

// Mock entire module
vi.mock('@helix/common', () => ({
  createGraphClient: vi.fn().mockReturnValue({
    readQuery: vi.fn(),
    writeQuery: vi.fn(),
    close: vi.fn()
  }),
  loadConfig: vi.fn().mockReturnValue({
    graph: { uri: 'bolt://test:7687' }
  })
}));

// Mock specific functions
vi.mock('./helpers', async () => {
  const actual = await vi.importActual('./helpers');
  return {
    ...actual,
    validateUid: vi.fn().mockReturnValue(true)
  };
});
```

### Mocking Graph Client

```typescript
const createMockGraphClient = () => ({
  readQuery: vi.fn().mockResolvedValue({ records: [] }),
  writeQuery: vi.fn().mockResolvedValue({ records: [] }),
  verifyConnectivity: vi.fn().mockResolvedValue(true),
  close: vi.fn()
});

describe('MyTool', () => {
  it('should handle empty results', async () => {
    const mockClient = createMockGraphClient();
    const tool = new MyTool(mockClient);

    const result = await tool.execute({ tenant_id: 'test' });

    expect(result.data).toEqual([]);
    expect(mockClient.readQuery).toHaveBeenCalled();
  });
});
```

### Mocking Anthropic Client

```typescript
const createMockLLMClient = () => ({
  messages: {
    create: vi.fn().mockResolvedValue({
      content: [{ type: 'text', text: 'Mock response' }]
    })
  }
});

describe('DiscoverPersonasTool', () => {
  it('should call LLM with correct prompt', async () => {
    const mockLLM = createMockLLMClient();
    const tool = new DiscoverPersonasTool(mockGraphClient, mockLLM);

    await tool.execute({
      founding_intent: 'Build a test app',
      tenant_id: 'test'
    });

    expect(mockLLM.messages.create).toHaveBeenCalledWith(
      expect.objectContaining({
        model: expect.any(String),
        messages: expect.arrayContaining([
          expect.objectContaining({ role: 'user' })
        ])
      })
    );
  });
});
```

---

## Test Coverage

### Coverage Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.test.ts',
        '**/*.integration.test.ts',
        '**/testing/**'
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80
      }
    }
  }
});
```

### Running Coverage

```bash
# Generate coverage report
pnpm test:coverage

# View HTML report
open coverage/index.html
```

### Coverage Targets

| Package | Target | Current |
|---------|--------|---------|
| @helix/common | 80% | 85% |
| @helix/mcp-graph | 80% | 82% |
| @helix/mcp-discovery | 75% | 78% |
| @helix/mcp-derivation | 75% | 76% |
| @helix/mcp-cascade | 80% | 81% |
| @helix/mcp-verification | 80% | 83% |

---

## Best Practices

### Test Organization

```typescript
describe('ToolName', () => {
  // Group by method/function
  describe('execute', () => {
    // Happy path first
    it('should succeed with valid input', async () => {});

    // Edge cases
    it('should handle empty results', async () => {});
    it('should handle large datasets', async () => {});

    // Error cases
    it('should throw on invalid input', async () => {});
    it('should handle connection errors', async () => {});
  });

  describe('validate', () => {
    it('should accept valid UID', () => {});
    it('should reject malformed UID', () => {});
  });
});
```

### Naming Conventions

```typescript
// Use descriptive names
it('should create DERIVES_FROM relationship between artifact and persona', async () => {});

// Not vague names
it('should work', async () => {});  // Bad
it('test relationship', async () => {});  // Bad
```

### Assertions

```typescript
// Be specific
expect(result.records.length).toBe(5);
expect(result.records[0].get('name')).toBe('Test Persona');

// Not vague
expect(result).toBeTruthy();  // Too vague
expect(result.records.length).toBeGreaterThan(0);  // Better but still vague
```

### Cleanup

```typescript
afterEach(async () => {
  // Always clean up test data
  await clearTestData(graphClient, tenantId);
  vi.clearAllMocks();
});

afterAll(async () => {
  // Close connections
  await graphClient.close();
  await redis.quit();
});
```

---

## End-to-End (E2E) Tests

E2E tests verify complete workflows from founding intent to artifact generation.

### E2E Test Structure

```
packages/mcp-graph/
└── src/
    └── __tests__/
        └── e2e/
            ├── discovery-workflow.e2e.test.ts
            ├── cascade-workflow.e2e.test.ts
            └── verification-workflow.e2e.test.ts
```

### E2E Test Setup

```typescript
// e2e/setup.ts
import { setupTestNeo4j, setupTestRedis, clearAllTestData } from '@helix/common/testing';
import { createMCPClient } from './helpers';

export async function setupE2EEnvironment() {
  const neo4j = await setupTestNeo4j();
  const redis = await setupTestRedis();

  // Initialize schema
  await neo4j.writeQuery(`
    CREATE CONSTRAINT artifact_uid IF NOT EXISTS
    FOR (a:Artifact) REQUIRE a.uid IS UNIQUE
  `);

  return { neo4j, redis };
}

export async function teardownE2EEnvironment(env: E2EEnvironment) {
  await clearAllTestData(env.neo4j, 'e2e-test');
  await env.neo4j.close();
  await env.redis.quit();
}
```

### Discovery Workflow E2E Test

```typescript
// e2e/discovery-workflow.e2e.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { setupE2EEnvironment, teardownE2EEnvironment } from './setup';

describe('Discovery Workflow E2E', () => {
  let env: E2EEnvironment;
  const tenantId = 'e2e-test';
  const namespace = 'e2e-psychotest';

  beforeAll(async () => {
    env = await setupE2EEnvironment();
  });

  afterAll(async () => {
    await teardownE2EEnvironment(env);
  });

  it('should complete full discovery workflow', async () => {
    // Step 1: Bootstrap ecosystem
    const bootstrapResult = await env.discoveryMCP.call('cpe/bootstrap_ecosystem', {
      founding_intent: `Build a SaaS platform for psychometric assessments
        that enables HR departments to evaluate candidates.`,
      namespace,
      tenant_id: tenantId
    });

    expect(bootstrapResult.success).toBe(true);
    expect(bootstrapResult.ecosystem.namespace).toBe(namespace);

    // Step 2: Discover personas
    const discoverResult = await env.discoveryMCP.call('cpe/discover_personas', {
      namespace,
      tenant_id: tenantId,
      discovery_mode: 'quick'
    });

    expect(discoverResult.success).toBe(true);
    expect(discoverResult.personas.length).toBeGreaterThan(0);

    // Verify at least core personas discovered
    const personaNames = discoverResult.personas.map(p => p.name);
    expect(personaNames).toContain('Hiring Manager');
    expect(personaNames).toContain('Candidate');

    // Step 3: Register personas
    for (const persona of discoverResult.personas) {
      const registerResult = await env.discoveryMCP.call('cpe/register_persona', {
        namespace,
        tenant_id: tenantId,
        ...persona
      });

      expect(registerResult.success).toBe(true);
      expect(registerResult.persona.uid).toMatch(/^cpe:/);
    }

    // Step 4: Verify in graph
    const graphResult = await env.graphMCP.call('cpe/query_graph', {
      query: `
        MATCH (p:Persona {tenantId: $tenantId})
        WHERE p.uid STARTS WITH 'cpe:${namespace}'
        RETURN p
      `,
      tenant_id: tenantId
    });

    expect(graphResult.records.length).toBe(discoverResult.personas.length);
  });

  it('should handle MAD debate for controversial personas', async () => {
    const madResult = await env.discoveryMCP.call('cpe/mad_debate', {
      topic: 'Should we include a Compliance Officer persona for a psychometric platform?',
      context: 'GDPR compliance, data protection, HR regulations',
      tenant_id: tenantId
    });

    expect(madResult.success).toBe(true);
    expect(madResult.debate.rounds.length).toBeGreaterThan(0);
    expect(madResult.debate.verdict).toBeDefined();
    expect(['include', 'exclude', 'conditional']).toContain(madResult.debate.verdict.decision);
  });
});
```

### Cascade Workflow E2E Test

```typescript
// e2e/cascade-workflow.e2e.test.ts
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { setupE2EEnvironment, teardownE2EEnvironment, seedTestData } from './setup';

describe('Cascade Workflow E2E', () => {
  let env: E2EEnvironment;
  const tenantId = 'e2e-cascade-test';
  const namespace = 'e2e-cascade';

  beforeAll(async () => {
    env = await setupE2EEnvironment();
    // Seed with personas (prerequisite)
    await seedTestData(env.neo4j, {
      tenantId,
      namespace,
      personas: ['HIRING-MANAGER', 'CANDIDATE', 'PSYCHOMETRICIAN']
    });
  });

  afterAll(async () => {
    await teardownE2EEnvironment(env);
  });

  it('should generate artifacts through all layers', async () => {
    const layers = ['biz', 'req', 'des', 'arc', 'api', 'dat'];
    const artifacts: Record<string, any[]> = {};

    for (const layer of layers) {
      // Generate layer
      const result = await env.cascadeMCP.call('cpe/generate_layer', {
        namespace,
        layer,
        tenant_id: tenantId
      });

      expect(result.success).toBe(true);
      artifacts[layer] = result.artifacts;

      // Verify artifacts have parent relationships
      for (const artifact of result.artifacts) {
        const lineage = await env.graphMCP.call('cpe/get_lineage', {
          artifact_uid: artifact.uid,
          tenant_id: tenantId
        });

        expect(lineage.path.length).toBeGreaterThan(0);
      }
    }

    // Verify complete traceability
    const impArtifact = artifacts['api'][0];
    const lineage = await env.graphMCP.call('cpe/get_lineage', {
      artifact_uid: impArtifact.uid,
      tenant_id: tenantId
    });

    // Should trace back through: api -> arc -> des -> req -> biz -> persona
    expect(lineage.path.length).toBeGreaterThanOrEqual(5);
  });

  it('should enforce human gates', async () => {
    // Request gate approval
    const gateResult = await env.cascadeMCP.call('cpe/request_gate_approval', {
      gate_number: 4,
      name: 'Architecture Freeze',
      artifact_uids: ['cpe:e2e-cascade/arc/component/test'],
      tenant_id: tenantId
    });

    expect(gateResult.success).toBe(true);
    expect(gateResult.gate.status).toBe('pending');

    // Try to generate next layer (should be blocked)
    const blockedResult = await env.cascadeMCP.call('cpe/generate_layer', {
      namespace,
      layer: 'api',
      tenant_id: tenantId
    });

    expect(blockedResult.success).toBe(false);
    expect(blockedResult.error.code).toBe('GATE_NOT_PASSED');

    // Approve gate
    await env.neo4j.writeQuery(`
      MATCH (g:Gate {id: $gateId})
      SET g.status = 'approved', g.approvedAt = datetime()
    `, { gateId: gateResult.gate.id });

    // Now generation should succeed
    const unlockedResult = await env.cascadeMCP.call('cpe/generate_layer', {
      namespace,
      layer: 'api',
      tenant_id: tenantId
    });

    expect(unlockedResult.success).toBe(true);
  });

  it('should prevent orphan artifacts', async () => {
    // Try to create artifact without parent
    const orphanResult = await env.cascadeMCP.call('cpe/generate_artifact', {
      namespace,
      layer: 'imp',
      artifact_type: 'module',
      name: 'Orphan Module',
      content: 'This should fail',
      parent_uid: 'cpe:nonexistent/api/endpoint/fake',  // Invalid parent
      tenant_id: tenantId
    });

    expect(orphanResult.success).toBe(false);
    expect(orphanResult.error.code).toBe('ORPHAN_ARTIFACT');
  });
});
```

### Verification Workflow E2E Test

```typescript
// e2e/verification-workflow.e2e.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { setupE2EEnvironment, teardownE2EEnvironment, seedCompleteEcosystem } from './setup';

describe('Verification Workflow E2E', () => {
  let env: E2EEnvironment;
  const tenantId = 'e2e-verification-test';
  const namespace = 'e2e-verify';

  beforeAll(async () => {
    env = await setupE2EEnvironment();
    // Seed complete ecosystem for verification
    await seedCompleteEcosystem(env.neo4j, { tenantId, namespace });
  });

  afterAll(async () => {
    await teardownE2EEnvironment(env);
  });

  it('should detect drift between spec and implementation', async () => {
    // Introduce drift by modifying artifact without updating spec
    await env.neo4j.writeQuery(`
      MATCH (a:Artifact {layer: 'imp', tenantId: $tenantId})
      SET a.content = a.content + '\\n// Modified without spec update'
      RETURN a LIMIT 1
    `, { tenantId });

    // Run drift detection
    const driftResult = await env.verificationMCP.call('cpe/verify_drift', {
      namespace,
      layer: 'imp',
      tenant_id: tenantId
    });

    expect(driftResult.success).toBe(true);
    expect(driftResult.drifts.length).toBeGreaterThan(0);
    expect(driftResult.drifts[0].type).toBe('mismatch');
  });

  it('should run fitness functions and report violations', async () => {
    // Create orphan code (violates fitness function)
    await env.neo4j.writeQuery(`
      CREATE (a:Artifact {
        uid: 'cpe:${namespace}/imp/module/orphan-code',
        name: 'Orphan Code',
        layer: 'imp',
        tenantId: $tenantId
      })
    `, { tenantId });

    // Run fitness functions
    const fitnessResult = await env.verificationMCP.call('cpe/run_fitness_functions', {
      namespace,
      functions: ['no_orphan_code', 'all_requirements_tested', 'persona_coverage'],
      tenant_id: tenantId
    });

    expect(fitnessResult.success).toBe(true);
    expect(fitnessResult.results.no_orphan_code.passed).toBe(false);
    expect(fitnessResult.results.no_orphan_code.violations.length).toBeGreaterThan(0);
  });

  it('should verify complete coverage', async () => {
    const coverageResult = await env.verificationMCP.call('cpe/verify_coverage', {
      namespace,
      tenant_id: tenantId
    });

    expect(coverageResult.success).toBe(true);
    expect(coverageResult.coverage.personas).toBeDefined();
    expect(coverageResult.coverage.layers).toBeDefined();

    // Check all personas have requirements
    for (const persona of coverageResult.coverage.personas) {
      expect(persona.requirementCount).toBeGreaterThan(0);
    }
  });

  it('should generate GDPR Article 30 documentation', async () => {
    const gdprResult = await env.verificationMCP.call('cpe/generate_gdpr_article_30', {
      namespace,
      tenant_id: tenantId
    });

    expect(gdprResult.success).toBe(true);
    expect(gdprResult.document).toBeDefined();
    expect(gdprResult.document.processingActivities.length).toBeGreaterThan(0);
    expect(gdprResult.document.dataSubjects.length).toBeGreaterThan(0);
  });
});
```

### Running E2E Tests

```bash
# Start test infrastructure
docker-compose -f docker-compose.dev.yml up -d

# Wait for services
sleep 30

# Run E2E tests
pnpm test:e2e

# Run specific E2E suite
pnpm test:e2e -- discovery-workflow

# Run with verbose output
pnpm test:e2e -- --reporter=verbose
```

### E2E Test Configuration

```typescript
// vitest.config.e2e.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.e2e.test.ts'],
    testTimeout: 60000,  // 1 minute per test
    hookTimeout: 30000,  // 30 seconds for setup/teardown
    pool: 'forks',  // Isolate tests
    poolOptions: {
      forks: {
        singleFork: true  // Run sequentially for E2E
      }
    },
    env: {
      NEO4J_URI: 'bolt://localhost:7687',
      NEO4J_PASSWORD: 'testpassword',
      REDIS_HOST: 'localhost'
    }
  }
});
```

---

## Performance Testing

### Load Testing with k6

```javascript
// tests/load/graph-queries.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 10 },   // Ramp up
    { duration: '3m', target: 50 },   // Sustained load
    { duration: '1m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% under 500ms
    http_req_failed: ['rate<0.01'],    // <1% errors
  },
};

export default function () {
  const response = http.get('http://localhost:3000/api/artifacts?namespace=test');

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}
```

### Running Load Tests

```bash
# Install k6
brew install k6

# Run load test
k6 run tests/load/graph-queries.js

# Run with custom options
k6 run --vus 100 --duration 5m tests/load/graph-queries.js
```

### Neo4j Query Benchmarks

```typescript
// tests/benchmarks/neo4j-queries.bench.ts
import { bench, describe } from 'vitest';
import { setupTestNeo4j } from '@helix/common/testing';

describe('Neo4j Query Benchmarks', async () => {
  const client = await setupTestNeo4j();

  bench('simple node query', async () => {
    await client.readQuery('MATCH (n:Persona) RETURN n LIMIT 10');
  });

  bench('relationship traversal (depth 3)', async () => {
    await client.readQuery(`
      MATCH (a:Artifact)-[:DERIVES_FROM*1..3]->(p:Persona)
      RETURN a, p LIMIT 100
    `);
  });

  bench('full lineage trace', async () => {
    await client.readQuery(`
      MATCH path = (a:Artifact)-[:DERIVES_FROM|IMPLEMENTS*]->(p:Persona)
      WHERE a.uid = 'cpe:test/imp/module/login'
      RETURN path
    `);
  });
});
```

---

## Test Data Management

### Test Fixtures

```typescript
// testing/fixtures/personas.ts
export const testPersonas = [
  {
    name: 'Hiring Manager',
    category: 'b2b_customer',
    type: 'b2b',
    priority: 1,
    accessLevel: 'tenant-scoped',
    intent: 'Review candidate assessments',
    goals: ['Identify top candidates', 'Compare benchmarks'],
    constraints: ['Limited time'],
    vocabulary: ['candidate pool', 'fit score']
  },
  {
    name: 'Candidate',
    category: 'b2c_end_user',
    type: 'b2c',
    priority: 2,
    accessLevel: 'user-scoped',
    intent: 'Complete assessments',
    goals: ['Take tests', 'Get feedback'],
    constraints: ['Test anxiety'],
    vocabulary: ['test', 'results']
  }
];

// testing/fixtures/artifacts.ts
export const testArtifacts = {
  req: [
    {
      name: 'View Candidate Scores',
      artifactType: 'story',
      personaScope: 'HIRING-MANAGER',
      content: 'As a Hiring Manager, I want to view scores...'
    }
  ],
  des: [
    {
      name: 'Candidate Dashboard Wireframe',
      artifactType: 'wireframe',
      personaScope: 'CANDIDATE',
      content: 'Wireframe for candidate dashboard...'
    }
  ]
};
```

### Seeding Test Data

```typescript
// testing/seed.ts
import { testPersonas } from './fixtures/personas';
import { testArtifacts } from './fixtures/artifacts';

export async function seedTestEcosystem(
  client: GraphClient,
  options: { tenantId: string; namespace: string }
) {
  const { tenantId, namespace } = options;

  // Create ecosystem
  await client.writeQuery(`
    MERGE (e:Ecosystem {tenantId: $tenantId, namespace: $namespace})
    SET e.foundingIntent = 'Test ecosystem',
        e.status = 'active'
  `, { tenantId, namespace });

  // Create personas
  for (const persona of testPersonas) {
    const uid = `cpe:${namespace}/persona/${persona.name.toUpperCase().replace(' ', '-')}`;
    await client.writeQuery(`
      CREATE (p:Persona $props)
    `, {
      props: { ...persona, uid, tenantId }
    });
  }

  // Create artifacts with relationships
  for (const [layer, artifacts] of Object.entries(testArtifacts)) {
    for (const artifact of artifacts) {
      const uid = `cpe:${namespace}/${layer}/${artifact.artifactType}/${artifact.personaScope}/${artifact.name.toLowerCase().replace(/ /g, '-')}`;
      await client.writeQuery(`
        CREATE (a:Artifact $props)
        WITH a
        MATCH (p:Persona {tenantId: $tenantId})
        WHERE p.uid ENDS WITH $personaScope
        CREATE (a)-[:SERVES]->(p)
      `, {
        props: { ...artifact, uid, layer, tenantId },
        tenantId,
        personaScope: artifact.personaScope
      });
    }
  }

  return { tenantId, namespace };
}
```
