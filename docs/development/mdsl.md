# MDSL Contracts

Model-Driven Service Language contracts in Helix.

## What is MDSL?

MDSL (Microservice Domain-Specific Language) is used to define service contracts in Helix, specifying:

- API endpoints
- Data schemas
- Service operations
- Integration points

## Contract Structure

```mdsl
API description HelixGraphAPI

data type ArtifactDTO {
  "uid": ID,
  "layer": LayerCode,
  "type": ArtifactType,
  "content": D<string>,
  "tenant_id": TenantID
}

endpoint type GraphEndpoint
  exposes
    operation queryGraph
      expecting payload QueryRequest
      delivering payload QueryResponse

    operation linkArtifacts
      expecting payload LinkRequest
      delivering payload LinkResponse
```

## Compiling MDSL

```bash
# Compile MDSL to TypeScript
pnpm run compile:mdsl

# Or directly
npx ts-node scripts/compile-mdsl.ts
```

## Generated Artifacts

MDSL compilation generates:

1. **TypeScript types** - Interface definitions
2. **Zod schemas** - Runtime validation
3. **OpenAPI specs** - API documentation
4. **Test stubs** - Test fixtures

## Directory Structure

```
packages/mcp-graph/
├── contracts/
│   ├── graph.mdsl         # MDSL contract
│   └── generated/
│       ├── types.ts       # Generated types
│       ├── schemas.ts     # Generated Zod schemas
│       └── openapi.yaml   # Generated OpenAPI
```

## Writing Contracts

### Data Types

```mdsl
data type PersonaDTO {
  "uid": ID,
  "name": D<string>,
  "description": D<string>,
  "goals": D<string>*,
  "pain_points": D<string>*
}
```

### Operations

```mdsl
operation discoverPersonas
  expecting payload {
    "ecosystem_id": ID,
    "use_mad": D<boolean>?,
    "tenant_id": TenantID
  }
  delivering payload {
    "personas": PersonaDTO*,
    "confidence": D<float>
  }
```

### Events

```mdsl
event type ArtifactCreated {
  "uid": ID,
  "layer": LayerCode,
  "tenant_id": TenantID,
  "timestamp": D<datetime>
}
```

## Integration with MCP

Generated types are used in MCP tool definitions:

```typescript
import { QueryRequest, QueryResponse } from './generated/types';

const queryGraphTool: MCPTool<QueryRequest, QueryResponse> = {
  name: 'cpe/query_graph',
  description: 'Execute Cypher query',
  inputSchema: QueryRequestSchema,
  handler: async (input) => { ... }
};
```
