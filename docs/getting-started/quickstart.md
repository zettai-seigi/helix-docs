# Quick Start

Get Helix running and create your first persona ecosystem in minutes.

## 1. Start Helix

### Using Docker (Recommended)

```bash
# Download and start with pre-built images
curl -O https://gitlab.com/zettai-seigi/helix/-/raw/main/docker-compose.prod.yml
docker compose -f docker-compose.prod.yml up -d
```

### From Source

```bash
git clone https://gitlab.com/zettai-seigi/helix.git
cd helix
pnpm install
docker compose -f docker-compose.dev.yml up -d
pnpm build && pnpm db:init
```

## 2. Verify Services

```bash
# Check all services are running
docker compose ps

# Expected output:
# helix-neo4j          Up (healthy)
# helix-redis          Up (healthy)
# helix-mcp-graph      Up
# helix-mcp-discovery  Up
# helix-mcp-derivation Up
# helix-mcp-cascade    Up
# helix-mcp-verification Up
```

Access Neo4j Browser at `http://localhost:7474` (neo4j/helixpassword).

## 3. Bootstrap an Ecosystem

Use the Discovery MCP to bootstrap from a Founding Intent:

```typescript
// Example: Bootstrap a psychometric testing platform
const result = await discovery.bootstrap_ecosystem({
  founding_intent: "Build a SaaS platform for psychometric assessments",
  tenant_id: "acme-corp",
  domain_hints: ["assessment", "testing", "hr-tech"]
});
```

## 4. Discover Personas

```typescript
const personas = await discovery.discover_personas({
  ecosystem_id: result.ecosystem_id,
  use_mad: true,  // Enable Multi-Agent Debate
  use_og_rag: true  // Enable Ontology-Grounded RAG
});

// Example output:
// - HIRING-MANAGER: Reviews candidate assessments
// - PSYCHOMETRICIAN: Configures test parameters
// - CANDIDATE: Takes assessments
// - TENANT-ADMIN: Manages organization settings
```

## 5. View in Graph

Open Neo4j Browser at `http://localhost:7474` and run:

```cypher
// View all personas
MATCH (p:Persona) RETURN p

// View persona relationships
MATCH (p:Persona)-[r]->(a) RETURN p, r, a
```

## 6. Generate Artifacts

Use Cascade MCP to generate artifacts through the 12 layers:

```typescript
// Generate requirements for a persona
await cascade.generate_layer({
  layer: "req",
  persona_uid: "cpe:app/persona/HIRING-MANAGER",
  tenant_id: "acme-corp"
});
```

## Next Steps

- [Configuration](configuration.md) - Configure Helix for your environment
- [Persona Discovery Guide](../guides/persona-discovery.md) - Deep dive into discovery
- [Architecture Overview](../architecture/overview.md) - Understand the system design
- [API Reference](../api/graph.md) - Explore all available tools
