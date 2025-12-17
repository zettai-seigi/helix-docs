# ADR-010: Next.js for Dashboard

**Status**: Accepted
**Date**: 2024-12-14
**Decision Makers**: Architecture Team

## Context

Helix needed an admin dashboard for:
- Managing multiple ecosystems (tenants)
- Viewing and managing personas
- Browsing artifacts across 12 layers
- Approving human gates
- Visualizing traceability graphs
- Real-time updates on system events

Options considered:
1. **Next.js** - Full-stack React framework
2. **Remix** - Full-stack React framework
3. **SvelteKit** - Svelte-based framework
4. **Vue/Nuxt** - Vue.js ecosystem
5. **Plain React SPA** - Client-side only

## Decision

We chose **Next.js 14** with App Router for the Helix dashboard.

### Rationale

1. **Full-Stack Capabilities**
   - API routes for Neo4j queries
   - Server components for initial data
   - Client components for interactivity
   - No separate backend needed

2. **React Ecosystem**
   - Vast component library ecosystem
   - shadcn/ui for consistent design
   - TanStack Query for data fetching
   - D3/react-force-graph for visualization

3. **App Router Benefits**
   - Server Components (reduced client JS)
   - Streaming SSR
   - Layouts and nested routes
   - Built-in loading/error states

4. **Authentication**
   - NextAuth.js integration
   - Session management
   - Multiple auth providers
   - API route protection

5. **Production Ready**
   - Vercel deployment optimization
   - Docker deployment support
   - Edge runtime option
   - Built-in caching

### Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 14 (App Router) |
| UI | React 18 + shadcn/ui |
| Styling | Tailwind CSS |
| State | TanStack Query + Context |
| Auth | NextAuth.js |
| Graph | D3 + react-force-graph-2d |
| Icons | Lucide React |

### Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                         Browser                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                    Next.js App                          │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │  │
│  │  │ Personas │  │Artifacts │  │  Gates   │  │ Graph  │ │  │
│  │  │   Page   │  │   Page   │  │   Page   │  │ Viewer │ │  │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───┬────┘ │  │
│  │       │             │             │            │       │  │
│  │       └─────────────┴──────┬──────┴────────────┘       │  │
│  │                            │                           │  │
│  │                  ┌─────────▼─────────┐                 │  │
│  │                  │   API Routes      │                 │  │
│  │                  │ /api/personas     │                 │  │
│  │                  │ /api/artifacts    │                 │  │
│  │                  │ /api/gates        │                 │  │
│  │                  └─────────┬─────────┘                 │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────────────┼────────────────────────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
              ┌─────▼─────┐  ┌─────▼─────┐  ┌─────▼─────┐
              │   Neo4j   │  │   Redis   │  │  NextAuth │
              │   Graph   │  │  Events   │  │  Session  │
              └───────────┘  └───────────┘  └───────────┘
```

## Consequences

### Positive
- Modern React patterns (Server Components)
- Integrated API layer (no CORS)
- Type safety with TypeScript
- Rich visualization capabilities
- SSR for initial load performance

### Negative
- React learning curve for non-React teams
- Bundle size can grow
- Need to manage server/client boundary
- Vercel-optimized (less optimal on other hosts)

### Mitigations
- Component documentation
- Strict code splitting
- "use client" only where needed
- Docker deployment tested

## Key Features

### Multi-Ecosystem Support
```typescript
// contexts/namespace-context.tsx
export function NamespaceProvider({ children }) {
  const [namespace, setNamespace] = useState('default');
  return (
    <NamespaceContext.Provider value={{ namespace, setNamespace }}>
      {children}
    </NamespaceContext.Provider>
  );
}
```

### Real-Time Updates
```typescript
// hooks/use-events.ts
export function useHelixEvents(patterns: string[]) {
  useEffect(() => {
    const eventSource = new EventSource('/api/events?patterns=' + patterns.join(','));
    eventSource.onmessage = (event) => {
      // Invalidate queries, update UI
    };
    return () => eventSource.close();
  }, [patterns]);
}
```

### Graph Visualization
```typescript
// components/traceability/graph-viewer.tsx
import ForceGraph2D from 'react-force-graph-2d';

export function GraphViewer({ data }) {
  return (
    <ForceGraph2D
      graphData={data}
      nodeLabel="name"
      nodeColor={node => LAYER_COLORS[node.layer]}
      linkDirectionalArrowLength={4}
    />
  );
}
```

## Deployment Options

1. **Development**: `pnpm dev` on port 3001
2. **Docker**: `docker/Dockerfile.dashboard`
3. **Kubernetes**: Deployment manifests in `k8s/`
4. **Vercel**: Zero-config deployment

## Related Decisions

- [ADR-006](./006-redis-event-bus.md): SSE for real-time events
- [ADR-005](./005-human-gates.md): Gate approval UI
- [ADR-001](./001-neo4j-knowledge-graph.md): API queries to Neo4j
