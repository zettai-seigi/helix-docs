# External MCP Server Configuration

This document describes how to configure external MCP servers for use with the Helix Claude Worker.

## Overview

The Claude Worker can integrate with external MCP servers for specialized tasks. These are third-party tools that provide capabilities beyond the core Helix MCP servers.

| Server | Purpose | Auto-Injected For |
|--------|---------|-------------------|
| shadcn MCP | UI component lookup | Frontend implementation, Design |
| Puppeteer MCP | Browser automation | Frontend implementation, Testing |
| Playwright MCP | Cross-browser testing | Testing |

## Configuration

### helix.config.yaml

External MCP servers are configured in `helix.config.yaml`:

```yaml
external_mcp_servers:
  shadcn:
    enabled: true
    command: "npx"
    args: ["@anthropic-ai/shadcn-mcp@latest"]
    auto_inject_for:
      - layer: "imp"
        domain: "frontend"
      - layer: "des"

  puppeteer:
    enabled: true
    command: "npx"
    args: ["@anthropic-ai/puppeteer-mcp@latest"]
    auto_inject_for:
      - layer: "imp"
        domain: "frontend"
      - layer: "tst"

  playwright:
    enabled: false
    command: "npx"
    args: ["@playwright/mcp@latest"]
    auto_inject_for:
      - layer: "tst"
```

### Claude Desktop Configuration

Add to `claude_desktop_config.json`:

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

## shadcn/ui MCP

### Purpose

The shadcn MCP provides authoritative UI component code from the shadcn/ui registry. This implements the "Authoritative Context Supply Chain" pattern from Anthropic's effective harness research.

**Problem it solves**: LLMs can hallucinate incorrect component APIs, props, or usage patterns when generating UI code from training data.

**Solution**: Force the agent to always query the MCP for component code before writing JSX.

### How It Works

1. **Task Detection**: The executor detects frontend tasks via:
   - `injected_tools` containing `"shadcn-mcp"`
   - Requirement keywords: "ui", "component", "frontend", "page", "view", "form", "button", "card"

2. **Prompt Injection**: When detected, `FRONTEND_AGENT_SYSTEM_PROMPT` is added to the system prompt:
   ```
   1. **DO NOT** generate UI component code from your internal training data.
   2. **ALWAYS** use the shadcn_lookup tool to retrieve the component source before writing any JSX.
   3. **VERIFY** that requested components exist in the shadcn/ui catalog before implementation.
   4. **INSTALL** components using the shadcn CLI before using them in code.
   ```

3. **FETCH → ADAPT → INSTALL → TRACE Workflow**:
   - FETCH: Query shadcn MCP for component code
   - ADAPT: Customize for the specific use case
   - INSTALL: Run `npx shadcn@latest add <component>`
   - TRACE: Add `//@trace` comments linking to requirements

### Available Tools

| Tool | Description |
|------|-------------|
| `shadcn_lookup` | Retrieves component source code and usage examples |
| `shadcn_install` | Installs components via CLI |
| `shadcn_check` | Verifies component availability |

### Supported Components

47 components are supported:

**Layout**: accordion, aspect-ratio, card, collapsible, resizable, scroll-area, separator, sheet, tabs

**Forms**: button, checkbox, form, input, label, radio-group, select, slider, switch, textarea, toggle, toggle-group

**Data Display**: avatar, badge, calendar, data-table, hover-card, progress, skeleton, table, tooltip

**Feedback**: alert, alert-dialog, dialog, drawer, popover, sonner, toast

**Navigation**: breadcrumb, command, context-menu, dropdown-menu, menubar, navigation-menu, pagination

**Other**: carousel, chart, input-otp, sidebar

### Programmatic Usage

```typescript
import { createShadcnIntegration } from "@helix/claude-worker";

const shadcn = createShadcnIntegration({
  projectRoot: "/path/to/project",
  style: "default", // or "new-york"
  typescript: true,
  componentsPath: "@/components/ui",
  rsc: true,
});

// Validate component
if (shadcn.isValidComponent("button")) {
  await shadcn.installComponent("button");
}

// Generate import statement
const importStmt = shadcn.getImportStatement("card");
// 'import { Card } from "@/components/ui/card"'

// Generate Neo4j traceability query
const cypher = shadcn.generateDependencyQuery(
  "cpe:tenant/imp/class/LoginCard",
  "card"
);
```

## Puppeteer MCP

### Purpose

Enables browser automation for E2E verification. Based on Anthropic's finding that Claude performs "significantly better when provided browser automation tools and explicitly prompted to test as a human user would."

### How It Works

1. **Verification Modes**:
   - **HTTP Fallback** (default): Uses `curl` for basic page load verification
   - **Puppeteer Mode**: Full browser automation when MCP is available

2. **Verification Checks**:
   - Server response (page loads)
   - Page title matching
   - Required selectors present
   - Required text present
   - Forbidden selectors absent (error states)
   - Console error count

3. **Instruction Generation**: When Puppeteer is available, the E2EVerification class generates step-by-step commands for Claude to execute.

### Enabling Puppeteer

1. Start the Puppeteer MCP server (via Claude Desktop config or standalone)

2. Update configuration:

```yaml
# helix.config.yaml
claude_worker:
  e2e:
    puppeteer_available: true
```

Or programmatically:

```typescript
const harness = createCodingLoopHarness(handler, {
  puppeteerAvailable: true,
});
```

### Available Tools

| Tool | Description |
|------|-------------|
| `puppeteer_navigate` | Navigate to a URL |
| `puppeteer_screenshot` | Capture page screenshot |
| `puppeteer_click` | Click an element |
| `puppeteer_fill` | Fill form fields |
| `puppeteer_evaluate` | Execute JavaScript |

### Verification Presets

```typescript
import { VERIFICATION_PRESETS } from "@helix/claude-worker";

// Pre-configured verification options:
VERIFICATION_PRESETS.homepage    // body, main, header selectors
VERIFICATION_PRESETS.loginPage   // Login form elements
VERIFICATION_PRESETS.dashboard   // Dashboard layout
VERIFICATION_PRESETS.form        // Form elements
VERIFICATION_PRESETS.apiEndpoint // JSON response
```

### Programmatic Usage

```typescript
import { createE2EVerification } from "@helix/claude-worker";

const e2e = createE2EVerification({
  baseUrl: "http://localhost:3000",
  puppeteerAvailable: true,
});

// Verify a page
const result = await e2e.verifyPage("/dashboard", {
  expectedTitle: "Dashboard",
  requiredSelectors: ["nav", "main"],
  requiredText: ["Welcome"],
  forbiddenSelectors: [".error"],
});

// Generate Puppeteer commands for Claude
const instructions = e2e.generatePuppeteerInstructions("/dashboard", {
  requiredSelectors: ["nav"],
});
```

## Tool Injection Rules

The Orchestrator automatically injects tools based on task context:

```typescript
// From contracts.ts
const DEFAULT_TOOL_INJECTION_RULES = [
  // Frontend implementation gets shadcn + puppeteer
  {
    condition: { layer: "imp", domain: "frontend" },
    tools: ["shadcn-mcp", "puppeteer-mcp"],
    exclude_tools: ["db-migration-mcp"],
  },
  // Testing layer gets test runners
  {
    condition: { layer: "tst" },
    tools: ["vitest-mcp", "playwright-mcp", "puppeteer-mcp"],
  },
  // Security layer gets security scanners
  {
    condition: { layer: "sec" },
    tools: ["semgrep-mcp", "trivy-mcp"],
  },
];
```

## MCP Tool Mapping

When tools are injected, they're mapped to Claude Agent SDK patterns:

| Injected Tool | SDK Pattern |
|--------------|-------------|
| `shadcn-mcp` | `mcp__shadcn__*` |
| `puppeteer-mcp` | `mcp__puppeteer__*` |
| `playwright-mcp` | `mcp__playwright__*` |
| `helix-graph` | `mcp__helix-graph__*` |
| `helix-cascade` | `mcp__helix-cascade__*` |
| `vitest-mcp` | `mcp__vitest__*` |

## Troubleshooting

### shadcn MCP Not Working

1. Verify the MCP is running:
   ```bash
   npx @anthropic-ai/shadcn-mcp@latest
   ```

2. Check `SHADCN_PROJECT_ROOT` environment variable is set

3. Ensure `components.json` exists in project root:
   ```bash
   npx shadcn@latest init
   ```

### Puppeteer MCP Not Working

1. Verify the MCP is running:
   ```bash
   npx @anthropic-ai/puppeteer-mcp@latest
   ```

2. Check `puppeteerAvailable: true` in config

3. Ensure dev server is running at configured `baseUrl`

### E2E Verification Timeout

Increase timeout in config:

```yaml
claude_worker:
  e2e:
    page_timeout_ms: 60000  # 60 seconds
```

## References

- [Anthropic: Effective Harnesses for Long-Running Agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [MCP Protocol Specification](https://modelcontextprotocol.io)
