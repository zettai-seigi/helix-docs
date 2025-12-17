# Dashboard Components

The dashboard uses a component-based architecture with shadcn/ui primitives and custom components.

## Layout Components

### Sidebar

**Location**: `src/components/layout/sidebar.tsx`

The main navigation sidebar with ecosystem selector.

```tsx
<Sidebar>
  <EcosystemSelector />
  <Navigation>
    <NavItem href="/" icon={Home}>Overview</NavItem>
    <NavItem href="/personas" icon={Users}>Personas</NavItem>
    <NavItem href="/artifacts" icon={FileBox}>Artifacts</NavItem>
    <NavItem href="/gates" icon={ShieldCheck}>Gates</NavItem>
    <NavItem href="/traceability" icon={GitBranch}>Traceability</NavItem>
    <NavItem href="/settings" icon={Settings}>Settings</NavItem>
  </Navigation>
</Sidebar>
```

### Header

**Location**: `src/components/layout/header.tsx`

Page header with title and actions.

```tsx
<Header title="Personas">
  <Button>Create Persona</Button>
</Header>
```

**Props**:

| Prop | Type | Description |
|------|------|-------------|
| `title` | string | Page title |
| `children` | ReactNode | Action buttons |

### EcosystemSelector

**Location**: `src/components/layout/ecosystem-selector.tsx`

Dropdown for switching ecosystems.

```tsx
<EcosystemSelector />
```

Reads/writes to `NamespaceContext`:

```tsx
const { namespace, setNamespace } = useNamespace();
```

### CreateEcosystemDialog

**Location**: `src/components/layout/create-ecosystem-dialog.tsx`

Modal dialog for creating new ecosystems.

```tsx
<CreateEcosystemDialog
  open={open}
  onOpenChange={setOpen}
  onCreated={(namespace) => setNamespace(namespace)}
/>
```

---

## UI Components (shadcn/ui)

Base components from shadcn/ui using Radix primitives.

### Button

```tsx
import { Button } from '@/components/ui/button';

<Button variant="default">Primary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

### Badge

```tsx
import { Badge } from '@/components/ui/badge';

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Error</Badge>
```

### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

<Tabs defaultValue="req">
  <TabsList>
    <TabsTrigger value="req">Requirements</TabsTrigger>
    <TabsTrigger value="des">Design</TabsTrigger>
  </TabsList>
  <TabsContent value="req">Requirements content</TabsContent>
  <TabsContent value="des">Design content</TabsContent>
</Tabs>
```

### Dialog

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    Dialog content
  </DialogContent>
</Dialog>
```

### Select

```tsx
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="opt1">Option 1</SelectItem>
    <SelectItem value="opt2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

---

## Visualization Components

### ForceGraph

**Location**: `src/components/traceability/force-graph.tsx`

Interactive D3 force-directed graph for traceability visualization.

```tsx
import { ForceGraph } from '@/components/traceability/force-graph';

<ForceGraph
  nodes={nodes}
  links={links}
  onNodeClick={(node) => router.push(`/artifacts/${node.id}`)}
/>
```

**Props**:

| Prop | Type | Description |
|------|------|-------------|
| `nodes` | GraphNode[] | Array of nodes |
| `links` | GraphLink[] | Array of edges |
| `onNodeClick` | (node) => void | Node click handler |
| `width` | number | Canvas width |
| `height` | number | Canvas height |

**Types**:

```typescript
interface GraphNode {
  id: string;      // UID
  name: string;    // Display name
  layer: string;   // Layer code
  nodeType: string; // 'Persona' | 'Artifact'
}

interface GraphLink {
  source: string;  // Source node ID
  target: string;  // Target node ID
  type: string;    // Relationship type
}
```

### GraphStats

**Location**: `src/components/traceability/graph-stats.tsx`

Statistics panel for graph metrics.

```tsx
<GraphStats
  nodes={nodes}
  links={links}
/>
```

Displays:
- Total nodes
- Total edges
- Breakdown by layer
- Relationship type counts

---

## Page Components

### PersonaList

**Location**: `src/app/(dashboard)/personas/page.tsx`

Displays list of personas with filtering.

Features:
- Category filter dropdown
- Status filter
- Search input
- Click to view details

### PersonaDetail

**Location**: `src/app/(dashboard)/personas/[uid]/page.tsx`

Single persona view with related artifacts.

Features:
- Persona metadata
- Goals list
- Constraints list
- Vocabulary tags
- Related artifacts table

### ArtifactList

**Location**: `src/app/(dashboard)/artifacts/page.tsx`

Layer-tabbed artifact browser.

Features:
- Tab per layer (color-coded)
- Artifact table per layer
- Click to view details

### ArtifactDetail

**Location**: `src/app/(dashboard)/artifacts/[uid]/page.tsx`

Single artifact view with traceability.

Features:
- Content display (with syntax highlighting)
- Metadata panel
- Lineage (upstream) list
- Impact (downstream) list
- Navigation to related artifacts

### GateQueue

**Location**: `src/app/(dashboard)/gates/page.tsx`

Human gate approval queue.

Features:
- Pending gates list
- Gate details
- Approve/Reject buttons
- Timeout countdown

### TraceabilityGraph

**Location**: `src/app/(dashboard)/traceability/page.tsx`

Full graph visualization page.

Features:
- ForceGraph component
- Layer filter checkboxes
- Node search
- Statistics panel

---

## Context Providers

### NamespaceProvider

**Location**: `src/contexts/namespace-context.tsx`

Manages selected ecosystem across the app.

```tsx
// In providers.tsx
<NamespaceProvider>
  {children}
</NamespaceProvider>

// In components
import { useNamespace } from '@/contexts/namespace-context';

function MyComponent() {
  const { namespace, setNamespace } = useNamespace();

  return (
    <div>Current: {namespace}</div>
  );
}
```

**Context Value**:

```typescript
interface NamespaceContextValue {
  namespace: string | null;
  setNamespace: (namespace: string) => void;
}
```

---

## Utility Functions

### Layer Colors

**Location**: `src/lib/utils.ts`

```typescript
export const LAYER_COLORS: Record<string, string> = {
  persona: 'bg-pink-100 text-pink-800',
  biz: 'bg-purple-100 text-purple-800',
  req: 'bg-blue-100 text-blue-800',
  des: 'bg-cyan-100 text-cyan-800',
  arc: 'bg-teal-100 text-teal-800',
  api: 'bg-green-100 text-green-800',
  dat: 'bg-lime-100 text-lime-800',
  sec: 'bg-yellow-100 text-yellow-800',
  imp: 'bg-orange-100 text-orange-800',
  tst: 'bg-red-100 text-red-800',
  cmp: 'bg-rose-100 text-rose-800',
  inf: 'bg-slate-100 text-slate-800',
  doc: 'bg-gray-100 text-gray-800',
};
```

### Layer Names

```typescript
export const LAYER_NAMES: Record<string, string> = {
  persona: 'Persona',
  biz: 'Business',
  req: 'Requirements',
  des: 'Design',
  arc: 'Architecture',
  api: 'API',
  dat: 'Data',
  sec: 'Security',
  imp: 'Implementation',
  tst: 'Testing',
  cmp: 'Compliance',
  inf: 'Infrastructure',
  doc: 'Documentation',
};
```

### cn (Class Names)

Utility for merging Tailwind classes:

```typescript
import { cn } from '@/lib/utils';

<div className={cn(
  'base-class',
  condition && 'conditional-class',
  LAYER_COLORS[layer]
)} />
```
