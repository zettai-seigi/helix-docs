# Dashboard Features

The Helix Dashboard provides comprehensive management capabilities for the Cascading Persona Ecosystem.

## Overview Page

The dashboard home page displays ecosystem statistics and quick navigation.

### Statistics Cards

- **Personas** - Total discovered personas in the ecosystem
- **Artifacts** - Total artifacts across all 12 layers
- **Pending Gates** - Human gates awaiting approval
- **Relationships** - Total trace relationships in the graph

### Quick Actions

- Create new ecosystem
- Switch between ecosystems
- Navigate to any section

## Multi-Ecosystem Support

The dashboard supports managing multiple ecosystems (founding intents) simultaneously.

### Ecosystem Selector

Located in the sidebar, the ecosystem selector allows switching between ecosystems:

```
┌─────────────────────────────┐
│  Select Ecosystem        ▼  │
├─────────────────────────────┤
│  ● psychotest              │
│    healthcare              │
│    fintech                 │
│  ──────────────────────────│
│  + Create Ecosystem        │
└─────────────────────────────┘
```

### Creating Ecosystems

1. Click "Create Ecosystem" in the selector
2. Enter namespace (e.g., `psychotest`)
3. Provide the Founding Intent text
4. Click "Create" to initialize

!!! info "Namespace Format"
    Namespaces should be lowercase alphanumeric with hyphens.
    Examples: `psychotest`, `healthcare-app`, `fintech-platform`

### Namespace Context

The selected ecosystem is stored in React context and persists across navigation:

```typescript
import { useNamespace } from '@/contexts/namespace-context';

function MyComponent() {
  const { namespace, setNamespace } = useNamespace();
  // namespace: 'psychotest'
}
```

## Persona Management

View and manage discovered personas from the ecosystem.

### Persona List

| Column | Description |
|--------|-------------|
| Name | Persona name (e.g., "Hiring Manager") |
| Category | `b2b_customer`, `b2c_end_user`, `internal_platform`, etc. |
| Priority | Discovery priority (1 = highest) |
| Access Level | `platform`, `tenant-scoped`, `user-scoped` |
| Status | `active`, `draft`, `deprecated` |

### Persona Detail View

Click any persona to view details:

- **Intent** - What the persona wants to achieve
- **Goals** - List of persona goals
- **Constraints** - Limitations and blockers
- **Vocabulary** - Domain-specific terms
- **Related Artifacts** - Artifacts serving this persona

### Filtering

- Filter by category
- Filter by status
- Search by name

## Artifact Browser

Navigate artifacts across all 12 layers of the cascade.

### Layer Navigation

Tabs for each layer with color coding:

| Layer | Color | Description |
|-------|-------|-------------|
| Persona | Pink | User archetypes |
| Business | Purple | Business capabilities |
| Requirements | Blue | User stories |
| Design | Cyan | Wireframes, flows |
| Architecture | Teal | Components |
| API | Green | Endpoints |
| Data | Lime | Schemas |
| Security | Yellow | RBAC policies |
| Implementation | Orange | Code |
| Testing | Red | Test suites |
| Compliance | Rose | Audit docs |
| Infrastructure | Slate | DevOps |
| Documentation | Gray | Guides |

### Artifact List

Each layer displays artifacts with:

- **Name** - Artifact name
- **Type** - `capability`, `story`, `wireframe`, `component`, etc.
- **Persona Scope** - Which persona this serves
- **Status** - `active`, `draft`, `deprecated`

### Artifact Detail View

Click any artifact to view:

- **Content** - Full artifact content (with syntax highlighting)
- **Metadata** - Layer, type, status, created by
- **Lineage (Upstream)** - Trace back to founding intent
- **Impact (Downstream)** - What depends on this artifact

```
┌─────────────────────────────────────────────────────────────┐
│  Assessment Engine                                           │
│  cpe:psychotest/arc/component/assessment-engine             │
├─────────────────────────────────────────────────────────────┤
│  [Architecture] [component] [active]                        │
├─────────────────────────────────────────────────────────────┤
│  Content                          │  Details                │
│  ─────────────────────────────── │  ──────────────────────│
│  Core component responsible for   │  Persona: CANDIDATE    │
│  assessment delivery, timing,     │  Layer: Architecture   │
│  and scoring...                   │  Type: component       │
│                                   │  Status: active        │
├─────────────────────────────────────────────────────────────┤
│  Lineage (Upstream)               │  Impact (Downstream)   │
│  ─────────────────────────────── │  ──────────────────────│
│  ↑ [des] Candidate Dashboard     │  ↓ [api] Assessments   │
│  ↑ [req] Take Assessment         │  ↓ [dat] Assessment    │
│  ↑ [persona] Candidate           │      Schema            │
└─────────────────────────────────────────────────────────────┘
```

## Gate Approvals

Human gates require manual approval before the cascade can proceed.

### Gate Queue

Displays pending gates with:

- **Gate Number** - #1, #2, #4, or #5
- **Name** - Gate description
- **Status** - `pending`, `approved`, `rejected`, `timeout`
- **Timeout** - Time remaining for approval
- **Artifacts** - Artifacts requiring review

### Gate Actions

- **Approve** - Allow cascade to proceed
- **Reject** - Block cascade with feedback

### Gate Types

| Gate | After | Timeout | Approvers |
|------|-------|---------|-----------|
| #1 | Persona Discovery | 48h | 1 |
| #2 | Cross-Persona Synthesis | 48h | 1 |
| #4 | Architecture Freeze | 24h | 2 |
| #5 | Pre-Deployment | 24h | 2 |

## Traceability Graph

Interactive visualization of the knowledge graph.

### Graph View

D3-powered force-directed graph showing:

- **Nodes** - Personas and artifacts (color-coded by layer)
- **Edges** - Relationships (DERIVES_FROM, IMPLEMENTS, SERVES, etc.)

### Interactions

- **Pan & Zoom** - Mouse drag and scroll
- **Click Node** - View node details
- **Hover** - Highlight connections
- **Filter** - Show/hide layers

### Node Colors

Nodes are colored by layer:

```css
persona:  #fce7f3  /* pink-100 */
biz:      #f3e8ff  /* purple-100 */
req:      #dbeafe  /* blue-100 */
des:      #cffafe  /* cyan-100 */
arc:      #ccfbf1  /* teal-100 */
api:      #dcfce7  /* green-100 */
dat:      #ecfccb  /* lime-100 */
sec:      #fef9c3  /* yellow-100 */
imp:      #ffedd5  /* orange-100 */
tst:      #fee2e2  /* red-100 */
cmp:      #ffe4e6  /* rose-100 */
inf:      #f1f5f9  /* slate-100 */
doc:      #f3f4f6  /* gray-100 */
```

### Statistics Panel

Shows graph metrics:

- Total nodes
- Total edges
- Nodes by layer
- Relationship type distribution

## Search

Full-text search across all artifacts and personas.

### Search Features

- **Instant Results** - Results appear as you type
- **Type Filtering** - Filter by artifact type
- **Layer Filtering** - Filter by layer
- **Highlighting** - Search terms highlighted in results

### Search Syntax

```
# Simple search
assessment

# Search in specific layer
layer:req assessment

# Search by persona
persona:CANDIDATE test

# Search by type
type:story hiring
```

## Settings

Configure dashboard preferences.

### Available Settings

- **Theme** - Light/dark mode toggle
- **Default Ecosystem** - Set startup ecosystem
- **Graph Layout** - Force-directed vs hierarchical
- **Notifications** - Enable/disable alerts
