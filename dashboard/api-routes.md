# Dashboard API Routes

The dashboard exposes REST API routes for data access. All routes connect to Neo4j via the `@helix/common` graph client.

## Base URL

- **Development**: `http://localhost:3001/api`
- **Production**: `http://localhost:3000/api`

## Authentication

API routes use NextAuth session authentication. Include session cookies with requests.

## Endpoints

### Health Check

```http
GET /api/health
```

Returns service health status.

**Response**:
```json
{
  "status": "healthy",
  "neo4j": "connected",
  "timestamp": "2024-12-14T10:30:00Z"
}
```

---

### Ecosystems

#### List Ecosystems

```http
GET /api/ecosystems
```

Returns all ecosystems for the tenant.

**Response**:
```json
[
  {
    "namespace": "psychotest",
    "foundingIntent": "Build a SaaS platform for psychometric assessments...",
    "status": "active",
    "createdAt": "2024-12-14T10:00:00Z"
  }
]
```

#### Create Ecosystem

```http
POST /api/ecosystems
Content-Type: application/json
```

**Request Body**:
```json
{
  "namespace": "healthcare",
  "foundingIntent": "Build a healthcare management platform..."
}
```

**Response**:
```json
{
  "namespace": "healthcare",
  "foundingIntent": "Build a healthcare management platform...",
  "status": "active",
  "createdAt": "2024-12-14T10:30:00Z"
}
```

---

### Personas

#### List Personas

```http
GET /api/personas?namespace={namespace}
```

Returns all personas for an ecosystem.

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `namespace` | string | Yes | Ecosystem namespace |

**Response**:
```json
[
  {
    "uid": "cpe:psychotest/persona/HIRING-MANAGER",
    "name": "Hiring Manager",
    "category": "b2b_customer",
    "type": "b2b",
    "priority": 1,
    "accessLevel": "tenant-scoped",
    "status": "active",
    "intent": "Review candidate assessment results...",
    "goals": ["Quickly identify top candidates..."],
    "constraints": ["Limited time for deep analysis..."],
    "vocabulary": ["candidate pool", "fit score"],
    "tenantId": "default",
    "createdAt": "2024-12-14T10:00:00Z"
  }
]
```

#### Get Persona

```http
GET /api/personas/{uid}
```

Returns a single persona by UID.

**Path Parameters**:

| Parameter | Type | Description |
|-----------|------|-------------|
| `uid` | string | URL-encoded persona UID |

**Response**: Same as single item from list.

#### Get Persona Artifacts

```http
GET /api/personas/{uid}/artifacts
```

Returns all artifacts serving a persona.

**Response**:
```json
[
  {
    "uid": "cpe:psychotest/req/story/HIRING-MANAGER/view-scores",
    "name": "View Candidate Scores",
    "layer": "req",
    "artifactType": "story",
    "status": "active"
  }
]
```

---

### Artifacts

#### List Artifacts

```http
GET /api/artifacts?namespace={namespace}&layer={layer}
```

Returns artifacts, optionally filtered by layer.

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `namespace` | string | Yes | Ecosystem namespace |
| `layer` | string | No | Filter by layer code |

**Response**:
```json
[
  {
    "uid": "cpe:psychotest/req/story/CANDIDATE/take-assessment",
    "name": "Take Assessment",
    "layer": "req",
    "artifactType": "story",
    "status": "active",
    "content": "As a Candidate, I want to take an assessment...",
    "contentFormat": "markdown",
    "personaScope": "CANDIDATE",
    "tenantId": "default",
    "createdAt": "2024-12-14T10:00:00Z"
  }
]
```

#### Get Artifact

```http
GET /api/artifacts/{uid}
```

Returns a single artifact with full content.

**Response**: Same as single item from list.

#### Get Artifact Lineage

```http
GET /api/artifacts/{uid}/lineage
```

Traces upstream dependencies back to founding intent.

**Response**:
```json
[
  {
    "uid": "cpe:psychotest/des/wireframe/candidate-dashboard",
    "name": "Candidate Dashboard Wireframe",
    "layer": "des",
    "nodeType": "Artifact"
  },
  {
    "uid": "cpe:psychotest/req/story/CANDIDATE/take-assessment",
    "name": "Take Assessment",
    "layer": "req",
    "nodeType": "Artifact"
  },
  {
    "uid": "cpe:psychotest/persona/CANDIDATE",
    "name": "Candidate",
    "layer": "persona",
    "nodeType": "Persona"
  }
]
```

#### Get Artifact Impact

```http
GET /api/artifacts/{uid}/impact
```

Traces downstream dependencies (what depends on this artifact).

**Response**:
```json
[
  {
    "uid": "cpe:psychotest/api/endpoint/assessments",
    "name": "Assessments API",
    "layer": "api",
    "nodeType": "Artifact"
  },
  {
    "uid": "cpe:psychotest/dat/schema/assessment",
    "name": "Assessment Schema",
    "layer": "dat",
    "nodeType": "Artifact"
  }
]
```

---

### Gates

#### List Gates

```http
GET /api/gates?namespace={namespace}&status={status}
```

Returns human gates for an ecosystem.

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `namespace` | string | Yes | Ecosystem namespace |
| `status` | string | No | Filter: `pending`, `approved`, `rejected` |

**Response**:
```json
[
  {
    "id": "gate-demo-001",
    "gateNumber": 1,
    "name": "Persona Discovery Review",
    "description": "Review discovered personas before proceeding",
    "status": "pending",
    "artifactUids": ["cpe:psychotest/persona/HIRING-MANAGER"],
    "tenantId": "default",
    "createdAt": "2024-12-14T10:00:00Z",
    "timeoutAt": "2024-12-16T10:00:00Z"
  }
]
```

#### Approve Gate

```http
POST /api/gates/{id}/approve
```

Approves a pending gate.

**Response**:
```json
{
  "id": "gate-demo-001",
  "status": "approved",
  "approvedAt": "2024-12-14T10:30:00Z",
  "approvedBy": "user@example.com"
}
```

#### Reject Gate

```http
POST /api/gates/{id}/reject
Content-Type: application/json
```

**Request Body**:
```json
{
  "reason": "Personas need refinement"
}
```

**Response**:
```json
{
  "id": "gate-demo-001",
  "status": "rejected",
  "rejectedAt": "2024-12-14T10:30:00Z",
  "rejectedBy": "user@example.com",
  "rejectionReason": "Personas need refinement"
}
```

---

### Traceability

#### Get Graph Data

```http
GET /api/traceability/graph?namespace={namespace}
```

Returns full graph data for visualization.

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `namespace` | string | Yes | Ecosystem namespace |

**Response**:
```json
{
  "nodes": [
    {
      "id": "cpe:psychotest/persona/CANDIDATE",
      "name": "Candidate",
      "layer": "persona",
      "nodeType": "Persona"
    },
    {
      "id": "cpe:psychotest/req/story/CANDIDATE/take-assessment",
      "name": "Take Assessment",
      "layer": "req",
      "nodeType": "Artifact"
    }
  ],
  "links": [
    {
      "source": "cpe:psychotest/req/story/CANDIDATE/take-assessment",
      "target": "cpe:psychotest/persona/CANDIDATE",
      "type": "DERIVES_FROM"
    }
  ]
}
```

---

### Search

#### Search Artifacts

```http
GET /api/search?q={query}&namespace={namespace}
```

Full-text search across artifacts and personas.

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | Yes | Search query |
| `namespace` | string | Yes | Ecosystem namespace |
| `layer` | string | No | Filter by layer |
| `type` | string | No | Filter by artifact type |

**Response**:
```json
{
  "results": [
    {
      "uid": "cpe:psychotest/req/story/CANDIDATE/take-assessment",
      "name": "Take Assessment",
      "layer": "req",
      "artifactType": "story",
      "snippet": "As a **Candidate**, I want to take an **assessment**...",
      "score": 0.95
    }
  ],
  "total": 1,
  "query": "assessment"
}
```

---

### Statistics

#### Get Stats

```http
GET /api/stats?namespace={namespace}
```

Returns ecosystem statistics.

**Query Parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `namespace` | string | Yes | Ecosystem namespace |

**Response**:
```json
{
  "personas": 5,
  "artifacts": 10,
  "pendingGates": 1,
  "relationships": 22,
  "artifactsByLayer": {
    "biz": 2,
    "req": 3,
    "des": 1,
    "arc": 1,
    "api": 1,
    "dat": 1,
    "sec": 1
  }
}
```

---

## Error Responses

All endpoints return errors in a consistent format:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Not authenticated |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |

### Common Error Codes

| Code | Description |
|------|-------------|
| `INVALID_NAMESPACE` | Namespace parameter missing or invalid |
| `INVALID_UID` | UID format doesn't match RFC 8141 |
| `NOT_FOUND` | Resource not found in graph |
| `GRAPH_ERROR` | Neo4j query failed |
