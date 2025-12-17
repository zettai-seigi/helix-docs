# Documentation Build Info

This documentation was automatically generated.

## Build Information

| Property | Value |
|----------|-------|
| **Generated At** | 2025-12-16T19:06:17.004Z |
| **Git Commit** | `f986a20` |
| **Git Branch** | `docs/update-api-documentation` |
| **Node Version** | `v25.2.1` |

## Package Versions

| Package | Version |
|---------|---------|
| @helix/common | 0.1.0 |
| @helix/mcp-graph | 0.1.0 |
| @helix/mcp-discovery | 0.1.0 |
| @helix/mcp-derivation | 0.1.0 |
| @helix/mcp-cascade | 0.1.0 |
| @helix/mcp-verification | 0.1.0 |
| @helix/orchestrator | 0.1.0 |
| @helix/claude-worker | 0.1.0 |
| @helix/dashboard | 0.1.0 |

## Generated Files

- `docs/generated/api/` - TypeDoc API documentation (Markdown)
- `docs/generated/openapi-merged.yaml` - OpenAPI 3.0 specification
- `docs/generated/asyncapi-merged.yaml` - AsyncAPI 2.0 specification

## Regenerate Documentation

```bash
# Generate all documentation
pnpm run docs:generate

# Generate only API docs
pnpm run docs:api

# Compile only MDSL
pnpm run compile:mdsl

# Build full MkDocs site
pnpm run docs:build

# Serve documentation locally
pnpm run docs:serve
```
