# API Documentation (Swagger/Redoc)

Helix provides interactive OpenAPI documentation for REST endpoints.

## Online API Documentation

**[View Interactive API Docs (Redoc)](./redoc.html)**

The Redoc documentation provides:
- Full API reference with request/response examples
- Schema definitions for all models
- Try-it-out functionality

## Local Development

When running the dashboard locally, access Swagger UI at:

```
http://localhost:3001/docs
```

## OpenAPI Specification

Download the OpenAPI spec:
- **YAML**: [openapi-merged.yaml](../generated/openapi-merged.yaml)
- **JSON**: `http://localhost:3001/openapi.json` (when running locally)

## API Overview

### Graph Core Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/graph/query` | Execute Cypher query |
| POST | `/graph/link` | Link artifacts |
| GET | `/graph/lineage/{uid}` | Get artifact lineage |
| GET | `/graph/impact/{uid}` | Get impact analysis |

### Discovery Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/discovery/bootstrap` | Bootstrap ecosystem |
| POST | `/discovery/personas` | Discover personas |
| POST | `/discovery/debate` | Run MAD session |

### Cascade Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/cascade/artifact` | Generate artifact |
| POST | `/cascade/layer` | Generate layer |
| POST | `/cascade/gate` | Request gate approval |

## Authentication

All endpoints require authentication:

```bash
curl -H "Authorization: Bearer $TOKEN" \
     -H "X-Tenant-ID: acme" \
     http://localhost:3000/graph/query
```

## Rate Limiting

Default rate limits:

- 100 requests/minute per tenant
- 1000 requests/hour per tenant
