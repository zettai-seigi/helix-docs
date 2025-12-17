# Contributing

Guide to contributing to the Helix project.

## Getting Started

1. Fork the repository
2. Clone your fork
3. Install dependencies: `pnpm install`
4. Start infrastructure: `docker-compose -f docker-compose.dev.yml up -d`
5. Run tests: `pnpm test`

## Development Workflow

### Branch Naming

```
feature/description
fix/description
docs/description
refactor/description
```

### Commit Messages

Follow conventional commits:

```
feat(discovery): add MAD debate rounds configuration
fix(graph): prevent cycle detection false positives
docs(cascade): document layer generator interfaces
test(verification): add SMT proof integration tests
```

### Pull Requests

1. Create a feature branch
2. Make your changes
3. Run tests: `pnpm test`
4. Run typecheck: `pnpm typecheck`
5. Submit PR with description

## Code Style

- TypeScript with strict mode
- Prettier for formatting
- ESLint for linting

```bash
# Format code
pnpm format

# Lint code
pnpm lint
pnpm lint:fix
```

## Testing

```bash
# Run all tests
pnpm test

# Run specific package tests
pnpm test --filter=@helix/mcp-graph

# Run with coverage
pnpm test:coverage

# Run integration tests
pnpm test:integration
```

## Project Structure

```
helix/
├── packages/
│   ├── common/          # Shared utilities
│   ├── mcp-graph/       # Graph Core MCP
│   ├── mcp-discovery/   # Discovery MCP
│   ├── mcp-derivation/  # Derivation MCP
│   ├── mcp-cascade/     # Cascade MCP
│   └── mcp-verification/ # Verification MCP
├── docs/                # Documentation
├── docker/              # Dockerfiles
└── ontologies/          # Domain ontologies
```

## Adding a New Tool

1. Create tool file in `packages/mcp-{name}/src/tools/`
2. Add Zod schemas for input/output
3. Register in `server.ts`
4. Add tests
5. Document in `/docs/api/`
