# Advanced Topics

Deep dive into advanced Helix features: formal verification, RBAC, and multi-tenancy.

## Formal Verification with Z3 SMT Solver

Helix uses the Z3 SMT (Satisfiability Modulo Theories) solver for formal verification of security policies and architectural constraints.

### What is SMT Verification?

SMT solvers can mathematically prove that certain properties hold (or find counterexamples). In Helix, we use Z3 to:

- Prove RBAC policies are consistent
- Verify no unauthorized access paths exist
- Detect conflicts in security rules
- Validate architectural constraints

### Z3 Installation

```bash
# macOS
brew install z3

# Ubuntu/Debian
apt-get install z3

# Verify installation
z3 --version
```

### Configuration

```yaml
# helix.config.yaml
verification:
  smt_solver: "z3"
  z3_path: "/usr/local/bin/z3"
  timeout_seconds: 30
  max_proof_depth: 10
```

### Security Policy Proofs

The `cpe/prove_security_policy` tool generates SMT proofs for RBAC policies.

#### Example: Proving Data Access Policy

```typescript
// Input
{
  tool: 'cpe/prove_security_policy',
  input: {
    policy_type: 'data_access',
    tenant_id: 'psychotest',
    assertions: [
      'Candidate cannot access other candidates data',
      'Hiring Manager can only see aggregated scores',
      'Psychometrician has full item bank access'
    ]
  }
}

// Output
{
  proven: true,
  proofs: [
    {
      assertion: 'Candidate cannot access other candidates data',
      result: 'PROVEN',
      z3_output: 'unsat',  // No counterexample found
      explanation: 'User-scoped access level restricts to own data'
    }
  ]
}
```

#### How It Works

1. **Policy Translation**: RBAC policies are translated to SMT-LIB format
2. **Assertion Encoding**: Security assertions become logical formulas
3. **Negation**: Z3 tries to find a counterexample (negation of assertion)
4. **Result**: `unsat` = proven (no counterexample), `sat` = violated (counterexample found)

### SMT-LIB Example

```smt2
; Define sorts
(declare-sort Persona)
(declare-sort Resource)
(declare-sort Action)

; Define predicates
(declare-fun hasRole (Persona String) Bool)
(declare-fun canAccess (Persona Resource Action) Bool)
(declare-fun owns (Persona Resource) Bool)

; Define personas
(declare-const candidate Persona)
(declare-const manager Persona)

; RBAC rules
(assert (forall ((p Persona) (r Resource))
  (=> (and (hasRole p "candidate") (not (owns p r)))
      (not (canAccess p r read)))))

; Check if candidate can access other's data
(assert (not (owns candidate some-resource)))
(assert (hasRole candidate "candidate")
(check-sat)  ; Should be unsat
```

### Architectural Constraint Verification

Verify architectural rules beyond security:

```typescript
{
  tool: 'cpe/prove_security_policy',
  input: {
    policy_type: 'architectural',
    tenant_id: 'psychotest',
    assertions: [
      'All artifacts have upstream lineage',
      'No circular dependencies exist',
      'Implementation layer depends only on API layer'
    ]
  }
}
```

---

## RBAC with Casbin

Helix uses Casbin for Role-Based Access Control (RBAC) with multi-tenant support.

### RBAC Model

```ini
# policies/rbac_model.conf
[request_definition]
r = sub, obj, act, tenant

[policy_definition]
p = sub, obj, act, tenant

[role_definition]
g = _, _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub, r.tenant) && \
    keyMatch2(r.obj, p.obj) && \
    r.act == p.act && \
    (r.tenant == p.tenant || p.tenant == "*")
```

### Policy Definitions

```csv
# policies/default_policies.csv
p, platform_admin, *, *, *
p, tenant_admin, /tenant/:tenant_id/*, *, :tenant_id
p, hiring_manager, /tenant/:tenant_id/candidates/*, read, :tenant_id
p, hiring_manager, /tenant/:tenant_id/assessments/*, read, :tenant_id
p, candidate, /tenant/:tenant_id/assessments/:user_id/*, *, :tenant_id
p, psychometrician, /tenant/:tenant_id/items/*, *, :tenant_id

# Role hierarchy
g, tenant_admin, hiring_manager, :tenant_id
g, platform_admin, tenant_admin, *
```

### Access Levels

| Level | Scope | Example Personas |
|-------|-------|------------------|
| `platform` | All tenants | Platform Admin, Psychometrician |
| `tenant-scoped` | Single tenant | Tenant Admin, Hiring Manager |
| `user-scoped` | Own data only | Candidate |

### Enforcing Access Control

```typescript
// In API routes
import { enforce } from '@helix/common/policy';

export async function GET(request: Request) {
  const session = await getSession();
  const tenantId = getTenantId(request);

  // Check permission
  const allowed = await enforce({
    subject: session.user.role,
    object: `/tenant/${tenantId}/candidates`,
    action: 'read',
    tenant: tenantId
  });

  if (!allowed) {
    return new Response('Forbidden', { status: 403 });
  }

  // Proceed with request
}
```

### Tenant Policy Injection

The `cpe/inject_tenant_policy` tool automatically adds tenant isolation:

```typescript
// Input
{
  tool: 'cpe/inject_tenant_policy',
  input: {
    artifact_uid: 'cpe:psychotest/dat/schema/assessment',
    tenant_id: 'psychotest'
  }
}

// Output - Modified schema with RLS
{
  modified_content: `
    -- Row Level Security Policy
    ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;

    CREATE POLICY tenant_isolation ON assessments
      USING (tenant_id = current_setting('app.tenant_id'));

    CREATE POLICY user_own_data ON assessments
      FOR SELECT
      USING (
        tenant_id = current_setting('app.tenant_id')
        AND (
          current_setting('app.role') = 'tenant_admin'
          OR user_id = current_setting('app.user_id')
        )
      );
  `
}
```

### Dynamic Policy Updates

Policies can be updated at runtime:

```typescript
import { addPolicy, removePolicy, reloadPolicies } from '@helix/common/policy';

// Add new policy
await addPolicy({
  subject: 'compliance_officer',
  object: '/tenant/:tenant_id/audit/*',
  action: 'read',
  tenant: ':tenant_id'
});

// Remove policy
await removePolicy({
  subject: 'temp_role',
  object: '/tenant/:tenant_id/*',
  action: '*',
  tenant: ':tenant_id'
});

// Reload from storage
await reloadPolicies();
```

---

## Multi-Tenant Architecture

Helix supports three tenant isolation modes.

### Tenant Modes

#### 1. Pooled Mode (Default)

All tenants share the same database with row-level security.

```yaml
# helix.config.yaml
tenant_modes:
  pooled:
    description: "Shared infrastructure with RLS"
    isolation: "row-level"
    schema_strategy: "shared"
```

**Pros**: Cost-effective, easy to manage
**Cons**: Noisy neighbor risk, shared resources

**Implementation**:
```cypher
// All queries include tenant_id
MATCH (a:Artifact {tenantId: $tenantId})
RETURN a
```

#### 2. Bridge Mode

Separate schemas per tenant, shared database.

```yaml
tenant_modes:
  bridge:
    description: "Separate schemas, shared database"
    isolation: "schema-level"
    schema_strategy: "per-tenant"
```

**Pros**: Better isolation, schema flexibility
**Cons**: More complex migrations

**Implementation**:
```cypher
// Use tenant-specific labels
MATCH (a:Artifact_tenant123)
RETURN a
```

#### 3. Siloed Mode

Completely separate databases per tenant.

```yaml
tenant_modes:
  siloed:
    description: "Dedicated infrastructure per tenant"
    isolation: "database-level"
    schema_strategy: "dedicated"
```

**Pros**: Maximum isolation, compliance-friendly
**Cons**: Higher cost, complex management

**Implementation**:
```typescript
// Route to tenant-specific Neo4j instance
const client = getTenantGraphClient(tenantId);
```

### Tenant Context

Every request must include tenant context:

```typescript
// Middleware extracts tenant from various sources
function getTenantContext(request: Request): TenantContext {
  // From subdomain: tenant123.dashboard.example.com
  const host = request.headers.get('host');
  const subdomain = host?.split('.')[0];

  // From header: X-Tenant-ID
  const headerTenant = request.headers.get('X-Tenant-ID');

  // From JWT claim
  const session = await getSession();
  const jwtTenant = session?.user?.tenantId;

  return {
    tenantId: subdomain || headerTenant || jwtTenant || 'default',
    mode: getTenantMode(tenantId)
  };
}
```

### Cross-Tenant Operations

Platform admins can operate across tenants:

```typescript
// Only platform-level access
if (session.user.accessLevel !== 'platform') {
  throw new Error('Cross-tenant access denied');
}

// Query all tenants
const allPersonas = await graphClient.readQuery(`
  MATCH (p:Persona)
  RETURN p.tenantId as tenant, collect(p) as personas
`);
```

### Tenant Provisioning

Creating a new tenant:

```typescript
import { provisionTenant } from '@helix/common/tenant';

await provisionTenant({
  tenantId: 'new-customer',
  name: 'New Customer Inc',
  mode: 'pooled',
  config: {
    features: ['discovery', 'cascade', 'verification'],
    limits: {
      maxPersonas: 50,
      maxArtifacts: 1000
    }
  }
});
```

---

## Human Gates Deep Dive

Human gates ensure human oversight at critical points.

### Gate Configuration

```yaml
# helix.config.yaml
gates:
  gate_1:
    name: "Persona Discovery Review"
    enabled: true
    timeout_hours: 48
    required_approvers: 1
    notify:
      - email
      - slack
    auto_approve_after: null  # Never auto-approve

  gate_2:
    name: "Cross-Persona Synthesis"
    enabled: true
    timeout_hours: 48
    required_approvers: 1

  gate_4:
    name: "Architecture Freeze"
    enabled: true
    timeout_hours: 24
    required_approvers: 2  # Requires 2 approvers

  gate_5:
    name: "Pre-Deployment"
    enabled: true
    timeout_hours: 24
    required_approvers: 2
    escalation:
      after_hours: 12
      escalate_to: ["platform_admin"]
```

### Gate Workflow

```
                    ┌─────────────┐
                    │   pending   │
                    └──────┬──────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │  approved   │ │  rejected   │ │   timeout   │
    └─────────────┘ └─────────────┘ └─────────────┘
```

### Programmatic Gate Management

```typescript
import {
  createGate,
  approveGate,
  rejectGate,
  checkGateStatus
} from '@helix/common/gates';

// Create gate (done by cascade MCP)
const gate = await createGate({
  gateNumber: 1,
  name: 'Persona Discovery Review',
  tenantId: 'psychotest',
  artifactUids: ['cpe:psychotest/persona/HIRING-MANAGER'],
  timeoutHours: 48
});

// Check status
const status = await checkGateStatus(gate.id);
// { status: 'pending', timeRemaining: '47h 30m' }

// Approve
await approveGate(gate.id, {
  approvedBy: 'admin@example.com',
  comment: 'Personas look complete'
});

// Or reject
await rejectGate(gate.id, {
  rejectedBy: 'admin@example.com',
  reason: 'Missing compliance officer persona'
});
```

### Gate Notifications

```typescript
// Configure notifications in helix.config.yaml
gates:
  gate_1:
    notify:
      email:
        recipients: ["team@example.com"]
        template: "gate-pending"
      slack:
        channel: "#helix-gates"
        mention: ["@architects"]
      webhook:
        url: "https://hooks.example.com/gate"
```

---

## Context Mapper Language (CML) Advanced

Beyond basic requirements, CML supports complex modeling.

### Polysemic Entities

Define single entities with persona-specific views:

```cml
SharedEntity Assessment {
  core {
    id: UUID
    title: String
    tenant_id: UUID
    created_at: DateTime
  }

  // Psychometrician sees everything
  view Psychometrician {
    include core.*
    add scoring_logic: JSON
    add item_bank_id: UUID
    add validation_status: Enum
  }

  // Candidate sees limited view
  view Candidate {
    include core.id, core.title
    add questions: Question[]
    add time_limit: Duration
    exclude scoring_logic  // Never expose
  }

  // Manager sees aggregates
  view HiringManager {
    include core.id, core.title
    add candidate_count: Int
    add average_score: Float
    exclude item_bank_id
  }
}
```

### Bounded Contexts

Define service boundaries:

```cml
BoundedContext AssessmentDelivery {
  domainVisionStatement "Handle candidate-facing assessment experience"

  implementationTechnology "Next.js, Node.js"

  Aggregate Assessment {
    Entity AssessmentSession
    Entity Response
    ValueObject Timer
  }

  // Upstream dependency
  uses AssessmentDesign.ItemBank
}

BoundedContext AssessmentDesign {
  domainVisionStatement "Psychometrician tools for test design"

  Aggregate ItemBank {
    Entity Item
    Entity Blueprint
    ValueObject ScoringRule
  }

  // Exposed to downstream
  exposes ItemBank to AssessmentDelivery
}
```

### Conflict Resolution

```cml
Conflict SchedulingConflict {
  between HiringManager.SetDeadlines, Candidate.RequestExtension

  resolution {
    strategy: "Policy"
    owner: TenantAdmin
    rule: "Extensions require manager approval if within 48h of deadline"
  }

  generates {
    Story: "Manager approves extension requests"
    Policy: "Extension approval workflow"
  }
}
```

---

## Event-Driven Architecture

Helix uses Redis for event-driven communication.

### Event Types

| Event | Publisher | Description |
|-------|-----------|-------------|
| `persona.discovered` | Discovery | New persona found |
| `persona.registered` | Discovery | Persona saved to graph |
| `artifact.created` | Cascade | New artifact generated |
| `artifact.updated` | Cascade | Artifact modified |
| `gate.created` | Cascade | Gate pending approval |
| `gate.approved` | Dashboard | Gate approved |
| `gate.rejected` | Dashboard | Gate rejected |
| `drift.detected` | Verification | Spec/impl mismatch |

### Publishing Events

```typescript
import { publishEvent } from '@helix/common/events';

await publishEvent({
  type: 'artifact.created',
  tenantId: 'psychotest',
  payload: {
    uid: 'cpe:psychotest/req/story/USER/login',
    name: 'User Login',
    layer: 'req'
  },
  metadata: {
    source: 'mcp-cascade',
    timestamp: new Date().toISOString()
  }
});
```

### Subscribing to Events

```typescript
import { subscribeToEvents } from '@helix/common/events';

const unsubscribe = await subscribeToEvents({
  tenantId: 'psychotest',
  patterns: ['artifact.*', 'gate.*'],
  handler: async (event) => {
    console.log(`Received: ${event.type}`, event.payload);

    if (event.type === 'gate.approved') {
      // Trigger cascade continuation
      await continueCascade(event.payload.gateId);
    }
  }
});

// Cleanup
process.on('SIGTERM', () => unsubscribe());
```

### Event Sourcing Pattern

For audit trails:

```typescript
// All mutations publish events
await graphClient.writeQuery(createArtifactQuery, params);
await publishEvent({
  type: 'artifact.created',
  tenantId,
  payload: artifact
});

// Reconstruct state from events
const events = await getEventHistory(tenantId, 'artifact.*');
const currentState = events.reduce(applyEvent, initialState);
```

---

## Custom Fitness Functions

Fitness functions are automated architectural tests that run continuously to ensure the system stays healthy. Helix provides built-in fitness functions and allows you to create custom ones.

### What Are Fitness Functions?

Inspired by ArchUnit, fitness functions are executable architectural constraints. They:

- **Verify structural rules**: Package dependencies, layer violations
- **Check quality metrics**: Coupling, cohesion, complexity
- **Enforce conventions**: Naming, documentation, patterns
- **Detect drift**: Implementation vs. specification

### Built-in Fitness Functions

Helix includes these default fitness functions:

| Function | Description | Threshold |
|----------|-------------|-----------|
| `orphan-detection` | Artifacts without upstream lineage | 0 orphans |
| `layer-dependency` | Upstream-only dependencies | No violations |
| `uid-conformance` | UID RFC 8141 compliance | 100% |
| `trace-coverage` | Artifacts with trace comments | > 95% |
| `gate-completion` | All required gates passed | 100% |
| `tenant-isolation` | Queries include tenant_id | 100% |

### Creating Custom Fitness Functions

#### Basic Structure

```typescript
// packages/mcp-verification/src/fitness/custom/my-function.ts
import { FitnessFunction, FitnessResult } from '@helix/common/fitness';
import { GraphClient } from '@helix/common/graph';

export const myCustomFunction: FitnessFunction = {
  name: 'my-custom-check',
  description: 'Verifies my custom architectural rule',
  category: 'architecture',
  threshold: 0,  // Maximum violations allowed

  async execute(context: FitnessFunctionContext): Promise<FitnessResult> {
    const { graphClient, tenantId, config } = context;

    // Run verification query
    const violations = await graphClient.readQuery(`
      MATCH (a:Artifact {tenantId: $tenantId})
      WHERE NOT (a)-[:DERIVES_FROM]->()
        AND a.layer <> 'persona'
      RETURN a.uid as uid, a.name as name
    `, { tenantId });

    return {
      name: this.name,
      passed: violations.length <= this.threshold,
      violations: violations.map(v => ({
        uid: v.uid,
        message: `Artifact ${v.name} has no upstream derivation`,
        severity: 'error'
      })),
      metrics: {
        total_checked: await getTotalArtifacts(graphClient, tenantId),
        violations_found: violations.length
      }
    };
  }
};
```

#### Registering Custom Functions

```typescript
// packages/mcp-verification/src/fitness/registry.ts
import { FitnessFunctionRegistry } from '@helix/common/fitness';
import { myCustomFunction } from './custom/my-function';
import { anotherFunction } from './custom/another-function';

export const registry = new FitnessFunctionRegistry();

// Register built-in functions
registry.register(orphanDetection);
registry.register(layerDependency);
registry.register(uidConformance);

// Register custom functions
registry.register(myCustomFunction);
registry.register(anotherFunction);
```

### Fitness Function Categories

#### 1. Structural Functions

Check graph structure and relationships:

```typescript
export const noCircularDependencies: FitnessFunction = {
  name: 'no-circular-dependencies',
  category: 'structural',
  threshold: 0,

  async execute({ graphClient, tenantId }) {
    // Detect cycles using APOC
    const cycles = await graphClient.readQuery(`
      CALL apoc.path.expandConfig(
        (a:Artifact {tenantId: $tenantId}),
        {
          relationshipFilter: "DERIVES_FROM>|IMPLEMENTS>",
          uniqueness: "NODE_PATH",
          minLevel: 2
        }
      ) YIELD path
      WHERE startNode(path) = last(nodes(path))
      RETURN [n IN nodes(path) | n.uid] as cycle
    `, { tenantId });

    return {
      name: this.name,
      passed: cycles.length === 0,
      violations: cycles.map(c => ({
        uid: c.cycle[0],
        message: `Circular dependency detected: ${c.cycle.join(' -> ')}`,
        severity: 'error'
      }))
    };
  }
};
```

#### 2. Convention Functions

Enforce naming and documentation standards:

```typescript
export const artifactNamingConvention: FitnessFunction = {
  name: 'artifact-naming-convention',
  category: 'convention',
  threshold: 0,

  async execute({ graphClient, tenantId }) {
    // Check naming patterns per layer
    const patterns = {
      'req': /^[A-Z]+-REQ-\d+$/,  // HM-REQ-001
      'api': /^[a-z-]+$/,         // results-endpoint
      'tst': /^[A-Z]+-TST-\d+$/   // HM-TST-001
    };

    const artifacts = await graphClient.readQuery(`
      MATCH (a:Artifact {tenantId: $tenantId})
      WHERE a.layer IN ['req', 'api', 'tst']
      RETURN a.uid, a.layer, a.artifactId
    `, { tenantId });

    const violations = artifacts.filter(a => {
      const pattern = patterns[a.layer];
      return pattern && !pattern.test(a.artifactId);
    });

    return {
      name: this.name,
      passed: violations.length === 0,
      violations: violations.map(v => ({
        uid: v.uid,
        message: `Artifact ID "${v.artifactId}" doesn't match ${v.layer} pattern`,
        severity: 'warning'
      }))
    };
  }
};
```

#### 3. Security Functions

Verify security constraints:

```typescript
export const tenantIsolationCheck: FitnessFunction = {
  name: 'tenant-isolation',
  category: 'security',
  threshold: 0,

  async execute({ graphClient, tenantId }) {
    // Find cross-tenant relationships
    const crossTenant = await graphClient.readQuery(`
      MATCH (a:Artifact {tenantId: $tenantId})-[r]->(b:Artifact)
      WHERE b.tenantId <> $tenantId
      RETURN a.uid as source, b.uid as target, type(r) as relType
    `, { tenantId });

    return {
      name: this.name,
      passed: crossTenant.length === 0,
      violations: crossTenant.map(ct => ({
        uid: ct.source,
        message: `Cross-tenant relationship to ${ct.target}`,
        severity: 'critical'
      }))
    };
  }
};
```

#### 4. Coverage Functions

Track documentation and testing coverage:

```typescript
export const testCoverageByPersona: FitnessFunction = {
  name: 'test-coverage-by-persona',
  category: 'coverage',
  threshold: 80,  // 80% minimum coverage

  async execute({ graphClient, tenantId }) {
    const coverage = await graphClient.readQuery(`
      MATCH (p:Persona {tenantId: $tenantId})
      OPTIONAL MATCH (p)<-[:SERVES]-(req:Artifact {layer: 'req'})
      OPTIONAL MATCH (req)<-[:TESTS]-(test:Artifact {layer: 'tst'})
      WITH p, count(DISTINCT req) as requirements,
           count(DISTINCT test) as tests
      RETURN p.uid as persona,
             requirements,
             tests,
             CASE WHEN requirements > 0
                  THEN toFloat(tests) / requirements * 100
                  ELSE 100.0 END as coverage
    `, { tenantId });

    const belowThreshold = coverage.filter(c => c.coverage < this.threshold);

    return {
      name: this.name,
      passed: belowThreshold.length === 0,
      violations: belowThreshold.map(c => ({
        uid: c.persona,
        message: `Test coverage ${c.coverage.toFixed(1)}% below ${this.threshold}%`,
        severity: 'warning'
      })),
      metrics: Object.fromEntries(
        coverage.map(c => [c.persona, c.coverage])
      )
    };
  }
};
```

### Running Fitness Functions

#### Via MCP Tool

```typescript
// Using cpe/run_fitness_functions tool
{
  tool: 'cpe/run_fitness_functions',
  input: {
    tenant_id: 'psychotest',
    functions: ['all'],  // or specific names
    fail_on_violation: true
  }
}

// Response
{
  overall_passed: false,
  results: [
    {
      name: 'orphan-detection',
      passed: true,
      violations: []
    },
    {
      name: 'test-coverage-by-persona',
      passed: false,
      violations: [
        {
          uid: 'cpe:psychotest/persona/CANDIDATE',
          message: 'Test coverage 65.0% below 80%'
        }
      ]
    }
  ],
  summary: {
    total: 6,
    passed: 5,
    failed: 1
  }
}
```

#### Programmatic Execution

```typescript
import { runFitnessFunctions } from '@helix/common/fitness';
import { registry } from './fitness/registry';

// Run all functions
const results = await runFitnessFunctions({
  registry,
  graphClient,
  tenantId: 'psychotest',
  functions: ['all']
});

// Run specific functions
const securityResults = await runFitnessFunctions({
  registry,
  graphClient,
  tenantId: 'psychotest',
  functions: ['tenant-isolation', 'rbac-compliance']
});
```

### Continuous Fitness Monitoring

#### Scheduled Checks

```yaml
# helix.config.yaml
fitness:
  schedule: "0 */6 * * *"  # Every 6 hours
  functions:
    - name: orphan-detection
      threshold: 0
    - name: test-coverage-by-persona
      threshold: 80
    - name: tenant-isolation
      threshold: 0
  notifications:
    on_failure:
      - slack: "#helix-alerts"
      - email: "architects@example.com"
```

#### CI/CD Integration

```yaml
# .gitlab-ci.yml
fitness-functions:
  stage: test
  script:
    - |
      HELIX_CONFIG=./helix.config.yaml npx tsx scripts/run-fitness.ts \
        --tenant-id=$TENANT_ID \
        --fail-on-violation
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
```

### Dashboard Integration

Fitness function results appear in the dashboard:

```typescript
// packages/dashboard/src/app/api/fitness/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tenantId = searchParams.get('tenant_id');

  const results = await runFitnessFunctions({
    registry,
    graphClient,
    tenantId,
    functions: ['all']
  });

  return Response.json({
    timestamp: new Date().toISOString(),
    tenant_id: tenantId,
    results,
    overall_health: calculateHealthScore(results)
  });
}
```

---

## Extending CML Parser

The Context Mapper Language parser can be extended with custom constructs.

### Parser Architecture

```
CML Source → Lexer → Parser → AST → Transformer → Graph Nodes
```

### Adding Custom Constructs

```typescript
// packages/mcp-derivation/src/cml/extensions/custom-construct.ts
import { CMLConstruct, CMLParser } from '@helix/common/cml';

export const customConstruct: CMLConstruct = {
  name: 'QualityAttribute',
  pattern: /QualityAttribute\s+(\w+)\s*\{([^}]+)\}/g,

  parse(match: RegExpMatchArray): QualityAttributeNode {
    const [_, name, body] = match;
    return {
      type: 'QualityAttribute',
      name,
      properties: parseProperties(body),
      generates: ['nfr']  // Generates Non-Functional Requirement
    };
  },

  transform(node: QualityAttributeNode, context: TransformContext) {
    return {
      artifactType: 'nfr',
      uid: `cpe:${context.namespace}/req/nfr/${node.name}`,
      content: generateNFRContent(node),
      relationships: [
        { type: 'DERIVED_FROM', target: context.parentUid }
      ]
    };
  }
};

// Register extension
CMLParser.registerConstruct(customConstruct);
```

### Custom CML Example

```cml
// Using custom QualityAttribute construct
QualityAttribute ResponseTime {
  metric: "p99 latency"
  target: "<200ms"
  measurement: "New Relic APM"
  priority: "high"

  affects Assessment.Submit, Results.Display
}

// Generates:
// cpe:{ns}/req/nfr/ResponseTime with relationships to affected operations
```

---

## Custom Artifact Generators

Extend cascade generation for new artifact types.

### Generator Interface

```typescript
// packages/mcp-cascade/src/generators/base.ts
export interface ArtifactGenerator {
  layer: LayerCode;
  artifactTypes: string[];

  generate(context: GeneratorContext): Promise<GeneratedArtifact>;
  validate(artifact: GeneratedArtifact): ValidationResult;
}

export interface GeneratorContext {
  namespace: string;
  tenantId: string;
  parentUid: string;
  parentContent: string;
  personaScope?: string;
  config: GeneratorConfig;
}
```

### Creating a Custom Generator

```typescript
// packages/mcp-cascade/src/generators/custom/compliance-report.ts
import { ArtifactGenerator, GeneratorContext } from '../base';

export const complianceReportGenerator: ArtifactGenerator = {
  layer: 'cmp',
  artifactTypes: ['gdpr-report', 'soc2-report', 'hipaa-report'],

  async generate(context: GeneratorContext) {
    const { namespace, tenantId, parentUid, personaScope } = context;

    // Gather all compliance-relevant artifacts
    const artifacts = await gatherComplianceArtifacts(tenantId);

    // Generate report content
    const report = await generateComplianceReport({
      standard: context.config.standard,  // 'gdpr', 'soc2', 'hipaa'
      artifacts,
      assessmentDate: new Date()
    });

    return {
      uid: `cpe:${namespace}/cmp/${context.config.standard}-report/${personaScope}`,
      name: `${context.config.standard.toUpperCase()} Compliance Report`,
      layer: 'cmp',
      content: report.markdown,
      metadata: {
        complianceScore: report.score,
        gaps: report.gaps,
        recommendations: report.recommendations
      },
      relationships: [
        { type: 'DERIVES_FROM', target: parentUid },
        ...report.referencedArtifacts.map(uid => ({
          type: 'VERIFIES', target: uid
        }))
      ]
    };
  },

  validate(artifact) {
    const requiredSections = ['overview', 'controls', 'evidence', 'gaps'];
    const missingSections = requiredSections.filter(
      s => !artifact.content.includes(`## ${s}`)
    );

    return {
      valid: missingSections.length === 0,
      errors: missingSections.map(s => `Missing section: ${s}`)
    };
  }
};

// Register generator
GeneratorRegistry.register(complianceReportGenerator);
```

### Generator Configuration

```yaml
# helix.config.yaml
cascade:
  generators:
    compliance-report:
      enabled: true
      standards:
        - gdpr
        - soc2
      auto_generate: false  # Requires manual trigger
      templates:
        gdpr: ./templates/gdpr-report.md
        soc2: ./templates/soc2-report.md
```
