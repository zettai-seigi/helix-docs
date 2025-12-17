# Installation

## Prerequisites

- Docker & Docker Compose (for container deployment)
- Node.js 20+ (for source deployment)
- pnpm 9.14+ (for source deployment)

## Option 1: Docker Deployment (Recommended)

The fastest way to get Helix running using pre-built container images.

### Quick Start

```bash
# Login to GitLab Container Registry
docker login registry.gitlab.com

# Download the production compose file
curl -O https://gitlab.com/zettai-seigi/helix/-/raw/main/docker-compose.prod.yml

# Start the full stack
docker compose -f docker-compose.prod.yml up -d
```

This starts all 5 MCP servers plus Neo4j and Redis.

### Container Images

All images are available on GitLab Container Registry:

| Server | Image |
|--------|-------|
| Graph | `registry.gitlab.com/zettai-seigi/helix/mcp-graph:latest` |
| Discovery | `registry.gitlab.com/zettai-seigi/helix/mcp-discovery:latest` |
| Derivation | `registry.gitlab.com/zettai-seigi/helix/mcp-derivation:latest` |
| Cascade | `registry.gitlab.com/zettai-seigi/helix/mcp-cascade:latest` |
| Verification | `registry.gitlab.com/zettai-seigi/helix/mcp-verification:latest` |

### Environment Variables

Configure via environment variables or `.env` file:

```bash
# Required for Discovery and Derivation MCPs
ANTHROPIC_API_KEY=your-api-key

# Optional - defaults shown
NEO4J_PASSWORD=helixpassword
```

### Verify Installation

```bash
# Check all containers are running
docker compose -f docker-compose.prod.yml ps

# View logs
docker compose -f docker-compose.prod.yml logs -f

# Access Neo4j Browser
open http://localhost:7474
```

## Option 2: Source Installation

For development or customization.

### Clone and Install

```bash
# Clone the repository
git clone https://gitlab.com/zettai-seigi/helix.git
cd helix

# Install dependencies
pnpm install

# Start infrastructure only (Neo4j + Redis)
docker compose -f docker-compose.dev.yml up -d

# Initialize database schema
pnpm db:init

# Build all packages
pnpm build
```

### Run MCP Servers

```bash
# Run individual servers
pnpm dev:graph        # Graph Core MCP
pnpm dev:discovery    # Discovery MCP
pnpm dev:derivation   # Derivation MCP
pnpm dev:cascade      # Cascade MCP
pnpm dev:verification # Verification MCP

# Or build and run all with Docker
docker compose up -d
```

### Verify Installation

```bash
# Run tests (341 tests)
pnpm test

# Type check
pnpm typecheck

# Check Neo4j connection
curl http://localhost:7474
```

## Docker Compose Files

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Full stack with local builds |
| `docker-compose.dev.yml` | Infrastructure only (Neo4j + Redis) |
| `docker-compose.prod.yml` | Full stack with pre-built images |

## Next Steps

- [Quick Start](quickstart.md) - Create your first persona ecosystem
- [Configuration](configuration.md) - Configure Helix for your needs
