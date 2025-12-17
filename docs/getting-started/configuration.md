# Configuration

## Configuration File

Helix uses `helix.config.yaml` for configuration:

```yaml
server:
  uid_prefix: "cpe"

graph:
  type: "neo4j"
  uri: "bolt://localhost:7687"
  username: "neo4j"
  password: "helixpassword"

events:
  type: "redis"
  host: "localhost"
  port: 6379

mad:
  enabled: true
  max_rounds: 3
  consensus_threshold: 0.67

gates:
  gate_1: { enabled: true, timeout_hours: 48 }
  gate_2: { enabled: true, timeout_hours: 48 }
  gate_4: { enabled: true, timeout_hours: 24 }
  gate_5: { enabled: true, timeout_hours: 24 }

enforcement:
  uid_validation: "strict"
  orphan_prevention: true
  gate_enforcement: true
```

## External MCP Servers

Configure third-party MCP servers for specialized tasks:

```yaml
external_mcp_servers:
  # shadcn/ui MCP - UI component lookup and installation
  shadcn:
    enabled: true
    command: "npx"
    args: ["@anthropic-ai/shadcn-mcp@latest"]
    description: "Provides authoritative shadcn/ui component code"
    auto_inject_for:
      - layer: "imp"
        domain: "frontend"
      - layer: "des"

  # Puppeteer MCP - Browser automation for E2E verification
  puppeteer:
    enabled: true
    command: "npx"
    args: ["@anthropic-ai/puppeteer-mcp@latest"]
    description: "Browser automation for testing UI"
    auto_inject_for:
      - layer: "imp"
        domain: "frontend"
      - layer: "tst"

  # Playwright MCP - Alternative browser automation
  playwright:
    enabled: false
    command: "npx"
    args: ["@playwright/mcp@latest"]
    description: "Cross-browser testing automation"
    auto_inject_for:
      - layer: "tst"
```

See [External MCP Servers](../external-mcp-servers.md) for detailed configuration.

## Claude Worker Configuration

Configure the Claude Worker harness and E2E verification:

```yaml
claude_worker:
  # E2E verification settings
  e2e:
    enabled: true
    base_url: "http://localhost:3000"
    puppeteer_available: false  # Set true when Puppeteer MCP is running
    capture_screenshots: true
    screenshot_dir: ".helix/screenshots"
    page_timeout_ms: 30000

  # Harness settings
  harness:
    progress_file: "claude-progress.txt"
    feature_list_file: "feature_list.json"
    auto_commit: true
    max_retries: 3
    run_e2e_before_feature: true
    add_e2e_setup_feature: true
    run_init_script: true
    check_dev_server: true
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `HELIX_CONFIG` | Path to config file | `./helix.config.yaml` |
| `NEO4J_URI` | Neo4j connection URI | `bolt://localhost:7687` |
| `NEO4J_PASSWORD` | Neo4j password | - |
| `REDIS_HOST` | Redis host | `localhost` |
| `ANTHROPIC_API_KEY` | API key for LLM features | - |
| `WORKER_ID` | Unique worker identifier | Auto-generated |
| `WORK_DIR` | Working directory for Claude Worker | `process.cwd()` |

## Claude Desktop Integration

Add to your `claude_desktop_config.json`:

### Helix MCP Servers

```json
{
  "mcpServers": {
    "helix-graph": {
      "command": "node",
      "args": ["./packages/mcp-graph/dist/server.js"],
      "env": {
        "NEO4J_URI": "bolt://localhost:7687",
        "HELIX_CONFIG": "./helix.config.yaml"
      }
    },
    "helix-discovery": {
      "command": "node",
      "args": ["./packages/mcp-discovery/dist/server.js"],
      "env": {
        "NEO4J_URI": "bolt://localhost:7687",
        "ANTHROPIC_API_KEY": "${ANTHROPIC_API_KEY}"
      }
    },
    "helix-cascade": {
      "command": "node",
      "args": ["./packages/mcp-cascade/dist/server.js"],
      "env": {
        "NEO4J_URI": "bolt://localhost:7687"
      }
    }
  }
}
```

### External MCP Servers (Optional)

For frontend implementation and E2E verification:

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["@anthropic-ai/shadcn-mcp@latest"],
      "env": {
        "SHADCN_PROJECT_ROOT": "/path/to/project"
      }
    },
    "puppeteer": {
      "command": "npx",
      "args": ["@anthropic-ai/puppeteer-mcp@latest"]
    }
  }
}
```

**shadcn MCP**: Provides authoritative UI component code from the shadcn/ui registry. Prevents hallucinating component APIs.

**Puppeteer MCP**: Enables browser automation for E2E verification. Test UI implementations as a human user would.
