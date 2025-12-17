# Frontend Implementation Guide

This guide covers best practices for implementing frontend code with the Helix Claude Worker, including shadcn/ui integration to prevent UI component hallucination.

## Overview

The Claude Worker implements an "Authoritative Context Supply Chain" pattern for frontend development. This ensures that UI components are always fetched from authoritative sources rather than generated from potentially outdated training data.

```
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND IMPLEMENTATION FLOW                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. TASK DETECTION                                               │
│     ├── Check injected_tools for "shadcn-mcp"                   │
│     └── Scan requirement for UI keywords                        │
│                                                                  │
│  2. PROMPT INJECTION                                             │
│     └── Add FRONTEND_AGENT_SYSTEM_PROMPT                        │
│                                                                  │
│  3. FETCH → ADAPT → INSTALL → TRACE                             │
│     ├── FETCH: Query shadcn MCP for component code              │
│     ├── ADAPT: Customize for specific use case                  │
│     ├── INSTALL: Run shadcn CLI to add component                │
│     └── TRACE: Add //@trace comments linking to requirement     │
│                                                                  │
│  4. E2E VERIFICATION                                             │
│     └── Verify implementation with browser automation           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## The Problem: UI Component Hallucination

LLMs trained on older data may generate UI code with:
- Incorrect prop names or types
- Deprecated component APIs
- Missing required imports
- Outdated styling patterns

**Example of hallucination:**
```tsx
// Wrong - hallucinated API
<Button variant="ghost" size="icon" onClick={handleClick}>
  <Icon name="settings" />  {/* No Icon component in shadcn */}
</Button>

// Correct - from authoritative source
<Button variant="ghost" size="icon" onClick={handleClick}>
  <Settings className="h-4 w-4" />  {/* lucide-react icon */}
</Button>
```

## The Solution: Authoritative Context Supply Chain

The Claude Worker enforces a workflow where component code is **always** fetched from the shadcn/ui registry before being used.

### How It Works

1. **Task Detection**: The executor detects frontend tasks via:
   - `injected_tools` containing `"shadcn-mcp"`
   - Requirement keywords: "ui", "component", "frontend", "page", "view", "form", "button", "card"

2. **Prompt Injection**: When detected, `FRONTEND_AGENT_SYSTEM_PROMPT` is added:
   ```
   CRITICAL FRONTEND IMPLEMENTATION RULES:

   1. **DO NOT** generate UI component code from your internal training data.
   2. **ALWAYS** use the shadcn_lookup tool to retrieve the component source before writing any JSX.
   3. **VERIFY** that requested components exist in the shadcn/ui catalog before implementation.
   4. **INSTALL** components using the shadcn CLI before using them in code.
   5. **TRACE** all implementations back to requirements with //@trace comments.
   ```

3. **FETCH → ADAPT → INSTALL → TRACE Workflow**: Agent must follow this sequence for every UI component.

## Using shadcn/ui Integration

### Configuration

Enable shadcn integration in `helix.config.yaml`:

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
```

### Programmatic Usage

```typescript
import {
  createShadcnIntegration,
  SHADCN_COMPONENTS,
  FRONTEND_AGENT_SYSTEM_PROMPT,
} from "@helix/claude-worker";

const shadcn = createShadcnIntegration({
  projectRoot: "/workspace",
  style: "default",        // or "new-york"
  typescript: true,
  componentsPath: "@/components/ui",
  rsc: true,               // React Server Components
});

// Validate component exists
if (shadcn.isValidComponent("button")) {
  // Install the component
  await shadcn.installComponent("button");

  // Get import statement
  const importStmt = shadcn.getImportStatement("button");
  // Returns: 'import { Button } from "@/components/ui/button"'
}

// Generate traceability query for Neo4j
const cypher = shadcn.generateDependencyQuery(
  "cpe:tenant/imp/class/LoginCard",
  "card"
);
```

### Available Components

47 components are supported in the shadcn/ui catalog:

**Layout**
- accordion, aspect-ratio, card, collapsible, resizable, scroll-area, separator, sheet, tabs

**Forms**
- button, checkbox, form, input, label, radio-group, select, slider, switch, textarea, toggle, toggle-group

**Data Display**
- avatar, badge, calendar, data-table, hover-card, progress, skeleton, table, tooltip

**Feedback**
- alert, alert-dialog, dialog, drawer, popover, sonner, toast

**Navigation**
- breadcrumb, command, context-menu, dropdown-menu, menubar, navigation-menu, pagination

**Other**
- carousel, chart, input-otp, sidebar

### Component Validation

Always validate before using:

```typescript
import { SHADCN_COMPONENTS } from "@helix/claude-worker";

// Check if component exists
const isValid = SHADCN_COMPONENTS.includes("button");

// List all available components
console.log(SHADCN_COMPONENTS);
```

## FETCH → ADAPT → INSTALL → TRACE Workflow

### Step 1: FETCH

Query the shadcn MCP to get authoritative component code:

```typescript
// Using MCP tool
const componentCode = await mcp__shadcn__lookup({ component: "button" });
```

The MCP returns:
- Full component source code
- Props interface
- Usage examples
- Dependencies (lucide-react icons, etc.)

### Step 2: ADAPT

Customize the component for your specific use case:

```tsx
// Fetched from shadcn MCP
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// Adapted for login form
//@trace cpe:tenant/req/story/USER/US-001
export function LoginButton({ isLoading, ...props }) {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Signing in...
        </>
      ) : (
        "Sign In"
      )}
    </Button>
  );
}
```

### Step 3: INSTALL

Install the component using the shadcn CLI:

```bash
npx shadcn@latest add button
```

Or programmatically:

```typescript
await shadcn.installComponent("button");
```

### Step 4: TRACE

Add traceability comments linking to requirements:

```tsx
//@trace cpe:tenant/req/story/USER/US-001
export function LoginForm() {
  return (
    <Card>
      {/* Card fetched from shadcn MCP */}
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginButton />
      </CardContent>
    </Card>
  );
}
```

## E2E Verification for Frontend

### HTTP Fallback Mode

When Puppeteer MCP is not available, use HTTP verification:

```typescript
import { createE2EVerification } from "@helix/claude-worker";

const e2e = createE2EVerification({
  baseUrl: "http://localhost:3000",
  puppeteerAvailable: false,
});

// Verify page loads
const result = await e2e.verifyPage("/login", {
  expectedTitle: "Login",
  requiredText: ["Sign In", "Password"],
});
```

### Puppeteer Mode

For full browser automation:

```typescript
const e2e = createE2EVerification({
  baseUrl: "http://localhost:3000",
  puppeteerAvailable: true,
  captureScreenshots: true,
  screenshotDir: ".helix/screenshots",
});

// Comprehensive verification
const result = await e2e.verifyPage("/login", {
  expectedTitle: "Login",
  requiredSelectors: [
    "form",
    "input[type='email']",
    "input[type='password']",
    "button[type='submit']",
  ],
  forbiddenSelectors: [".error", ".error-message"],
  requiredText: ["Sign In"],
});
```

### Verification Presets

Use built-in presets for common pages:

```typescript
import { VERIFICATION_PRESETS } from "@helix/claude-worker";

// Homepage verification
await e2e.verifyPage("/", VERIFICATION_PRESETS.homepage);

// Login page verification
await e2e.verifyPage("/login", VERIFICATION_PRESETS.loginPage);

// Dashboard verification
await e2e.verifyPage("/dashboard", VERIFICATION_PRESETS.dashboard);

// Form page verification
await e2e.verifyPage("/settings", VERIFICATION_PRESETS.form);
```

### Puppeteer Instructions

Generate step-by-step Puppeteer commands:

```typescript
const instructions = e2e.generatePuppeteerInstructions("/dashboard", {
  requiredSelectors: ["nav", "main", ".user-profile"],
  requiredText: ["Welcome"],
});

// Returns:
// 1. puppeteer_navigate({ url: "http://localhost:3000/dashboard" })
// 2. puppeteer_evaluate({ script: "document.readyState" })
// 3. puppeteer_evaluate({ script: "document.querySelector('nav') !== null" })
// 4. puppeteer_evaluate({ script: "document.querySelector('main') !== null" })
// 5. puppeteer_evaluate({ script: "document.body.innerText.includes('Welcome')" })
```

## Tool Injection Rules

The Orchestrator automatically injects tools based on task context:

```typescript
// Frontend implementation gets shadcn + puppeteer
{
  condition: { layer: "imp", domain: "frontend" },
  tools: ["shadcn-mcp", "puppeteer-mcp"],
  exclude_tools: ["db-migration-mcp"],
}

// Design layer gets shadcn for mockups
{
  condition: { layer: "des" },
  tools: ["shadcn-mcp"],
}

// Testing layer gets browser automation
{
  condition: { layer: "tst" },
  tools: ["puppeteer-mcp", "playwright-mcp"],
}
```

## Best Practices

### 1. Always FETCH Before Write

```typescript
// BAD - Writing from training data
export function Card({ children }) {
  return <div className="rounded-lg border bg-card">{children}</div>;
}

// GOOD - Fetch then adapt
const cardCode = await mcp__shadcn__lookup({ component: "card" });
// Then adapt the fetched code
```

### 2. Use Type-Safe Props

```tsx
// Import types from shadcn components
import { Button, ButtonProps } from "@/components/ui/button";

interface LoginButtonProps extends ButtonProps {
  isLoading?: boolean;
}

export function LoginButton({ isLoading, ...props }: LoginButtonProps) {
  // Implementation
}
```

### 3. Trace Everything

```tsx
//@trace cpe:tenant/req/story/USER/US-001
//@trace cpe:tenant/des/wireframe/LOGIN-PAGE
export function LoginPage() {
  // ...
}
```

### 4. Verify After Implementation

```typescript
// After implementing a feature
const harness = createCodingLoopHarness(handler, {
  runE2EBeforeFeature: true,  // Verify before moving to next feature
});
```

### 5. Capture Screenshots

```typescript
const e2e = createE2EVerification({
  captureScreenshots: true,
  screenshotDir: ".helix/screenshots",
});

// Screenshots are saved with timestamps for debugging
```

## Traceability in Neo4j

Link frontend implementations to requirements:

```typescript
// Generate Cypher for component dependency
const cypher = shadcn.generateDependencyQuery(
  "cpe:tenant/imp/class/LoginCard",
  "card"
);

// Creates relationship:
// (imp:Artifact {uid: "cpe:tenant/imp/class/LoginCard"})
//   -[:USES_COMPONENT]->
// (comp:UIComponent {name: "card", source: "shadcn/ui"})
```

## Troubleshooting

### Component Not Found

```typescript
if (!shadcn.isValidComponent("my-component")) {
  console.log("Available components:", SHADCN_COMPONENTS);
  // Use closest match or composite pattern
}
```

### shadcn MCP Not Working

1. Verify the MCP is running:
   ```bash
   npx @anthropic-ai/shadcn-mcp@latest
   ```

2. Check `SHADCN_PROJECT_ROOT` environment variable

3. Ensure `components.json` exists:
   ```bash
   npx shadcn@latest init
   ```

### E2E Verification Timeout

Increase timeout:

```yaml
claude_worker:
  e2e:
    page_timeout_ms: 60000
```

### Styling Issues

Ensure Tailwind is configured:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  // ...
};
```

## References

- [Anthropic: Effective Harnesses for Long-Running Agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Claude Worker Guide](./claude-worker.md)
- [External MCP Servers](../external-mcp-servers.md)
