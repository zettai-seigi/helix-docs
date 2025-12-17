# UID Taxonomy

Helix uses RFC 8141-compliant URN format for all artifact identifiers, extended with **Gold Standard** enhancements for compound scopes, explicit lineage, and deprecation tracking.

## Format

```
cpe:{namespace}/{layer}/{artifact_type}/{persona_scope}/{artifact_id}[@version][?query]
```

## Components

| Component | Description | Example |
|-----------|-------------|---------|
| `cpe` | Fixed prefix (Cascading Persona Ecosystem) | `cpe` |
| `namespace` | Project/tenant namespace | `psychotest` |
| `layer` | Layer code (see below) | `req` |
| `artifact_type` | Type within layer | `story` |
| `persona_scope` | Owning persona, compound, or SYSTEM | `HIRING-MANAGER` |
| `artifact_id` | Unique identifier | `HM-REQ-001` |
| `@version` | Optional semantic version | `@1.0.0` |
| `?query` | Optional query parameters | `?derives=PARENT-ID` |

## Gold Standard Extensions

### Compound Scopes

Use `+` delimiter for polysemic artifacts shared across personas:

```
cpe:psychotest/des/wireframe/ADMIN+USER/shared-dashboard
cpe:psychotest/arc/service/HIRING-MANAGER+CANDIDATE/assessment-service
```

### Query Parameters

| Parameter | Purpose | Example |
|-----------|---------|---------|
| `?derives=ID` | Explicit lineage to parent | `cpe:ns/req/story/USER/US-001?derives=EPIC-001` |
| `?deprecated=true` | Mark artifact as deprecated | `cpe:ns/api/endpoint/SYSTEM/v1-users?deprecated=true` |

### Semantic Versioning

Append `@version` for immutable versioning:

```
cpe:psychotest/api/schema/SYSTEM/user@1.0.0
cpe:psychotest/api/schema/SYSTEM/user@2.0.0-beta
```

## Layer Codes

| Code | Layer | # |
|------|-------|---|
| `persona` | Persona | 0 |
| `biz` | Business | 1 |
| `req` | Requirements | 2 |
| `des` | Design | 3 |
| `arc` | Architecture | 4 |
| `api` | API | 5 |
| `dat` | Data | 6 |
| `sec` | Security | 7 |
| `imp` | Implementation | 8 |
| `tst` | Testing | 9 |
| `cmp` | Compliance | 10 |
| `inf` | Infrastructure | 11 |
| `doc` | Documentation | 12 |

## Artifact Types by Layer

| Layer | Valid Types |
|-------|-------------|
| `persona` | persona |
| `biz` | goal, capability, metric |
| `req` | story, epic, feature, nfr |
| `des` | wireframe, mockup, prototype, flow |
| `arc` | bounded-context, aggregate, service, component |
| `api` | endpoint, schema, contract |
| `dat` | entity, migration, index, view |
| `sec` | policy, role, permission, rls |
| `imp` | module, class, function, handler |
| `tst` | unit, integration, e2e, contract |
| `cmp` | audit, gdpr, soc2, hipaa |
| `inf` | terraform, helm, dockerfile, pipeline |
| `doc` | readme, api-doc, runbook, adr |

## Examples

```
# Basic UIDs
cpe:psychotest/persona/HIRING-MANAGER
cpe:psychotest/req/story/HIRING-MANAGER/HM-REQ-001
cpe:psychotest/api/endpoint/SYSTEM/get-results@1.0.0

# Compound scopes (polysemic artifacts)
cpe:psychotest/des/wireframe/ADMIN+USER/shared-dashboard
cpe:psychotest/arc/aggregate/HIRING-MANAGER+CANDIDATE/assessment

# Explicit lineage
cpe:psychotest/req/story/USER/US-001?derives=EPIC-001

# Deprecated artifact
cpe:psychotest/api/endpoint/SYSTEM/v1-users?deprecated=true

# Full example with version and query
cpe:psychotest/api/schema/SYSTEM/user@2.0.0?derives=user@1.0.0
```

## Validation Utilities

```typescript
import {
  // Core parsing and validation
  parseUID,           // Parse UID into components (throws on invalid)
  validateUID,        // Validate and return true (throws on invalid)
  isValidUID,         // Check validity without throwing

  // Zod schemas for tool inputs
  UIDSchema,          // Single UID validation schema
  UIDArraySchema,     // Array of UIDs validation schema

  // Gold Standard helpers
  hasCompoundScopes,   // Check if UID has polysemic scopes (ADMIN+USER)
  getScopes,           // Get all persona scopes from UID
  isOwnedByPersona,    // Check if artifact belongs to persona
  withVersion,         // Add semantic version to UID
  withDerivation,      // Add explicit derivation query param
  markDeprecated,      // Mark UID as deprecated
  isDeprecated,        // Check if UID is deprecated
  stripQueryParams,    // Remove query params from UID
  isSameArtifact,      // Compare UIDs ignoring version/query

  // Namespace utilities
  validateNamespace,        // Validate namespace format
  extractNamespaceFromUid,  // Extract namespace from UID
  validateSameNamespace,    // Check all UIDs share same namespace

  // Layer validation
  validateLayerDerivation,  // Check if child can derive from parent layer
  canReference,             // Check if source can reference target layer
} from '@helix/common';
```

### Basic Validation

```typescript
// Validate
const isValid = isValidUID("cpe:psychotest/req/story/HM/HM-REQ-001");

// Parse
const parsed = parseUID("cpe:psychotest/req/story/HM/HM-REQ-001");
// {
//   namespace: "psychotest",
//   layer: "req",
//   artifactType: "story",
//   personaScope: "HM",
//   artifactId: "HM-REQ-001",
//   version: undefined,
//   queryParams: {}
// }
```

### Gold Standard Helpers

```typescript
// Compound scopes
const uid = "cpe:ns/des/wireframe/ADMIN+USER/dashboard";
hasCompoundScopes(uid);  // true
getScopes(uid);          // ["ADMIN", "USER"]
isOwnedByPersona(uid, "ADMIN");  // true
isOwnedByPersona(uid, "USER");   // true

// Versioning
withVersion("cpe:ns/api/schema/SYSTEM/user", "2.0.0");
// "cpe:ns/api/schema/SYSTEM/user@2.0.0"

// Derivation
withDerivation("cpe:ns/req/story/USER/US-001", "EPIC-001");
// "cpe:ns/req/story/USER/US-001?derives=EPIC-001"

// Deprecation
markDeprecated("cpe:ns/api/endpoint/SYSTEM/v1-users");
// "cpe:ns/api/endpoint/SYSTEM/v1-users?deprecated=true"
isDeprecated("cpe:ns/api/endpoint/SYSTEM/v1-users?deprecated=true");  // true

// Comparison (ignores version/query)
isSameArtifact(
  "cpe:ns/api/schema/SYSTEM/user@1.0.0",
  "cpe:ns/api/schema/SYSTEM/user@2.0.0"
);  // true
```

### Layer Derivation Rules

```typescript
// Check if child layer can derive from parent
validateLayerDerivation("req", "persona");  // true (req derives from persona)
validateLayerDerivation("imp", "req");      // true (imp derives from req)
validateLayerDerivation("persona", "imp");  // false (persona cannot derive from imp)

// Check reference permissions
canReference("imp", "api");   // true (implementation can reference API)
canReference("biz", "imp");   // false (business cannot reference implementation)
```

## Backward Traceability Rules

Every artifact must derive from a valid parent layer:

| Layer | Can Derive From |
|-------|-----------------|
| `biz` | `persona` |
| `req` | `persona`, `biz` |
| `des` | `req` |
| `arc` | `req`, `des` |
| `api` | `arc` |
| `dat` | `arc`, `api` |
| `sec` | `arc`, `api`, `dat` |
| `imp` | `api`, `dat`, `sec` |
| `tst` | `req`, `imp` |
| `cmp` | `sec`, `tst` |
| `inf` | `arc`, `imp` |
| `doc` | Any layer |
