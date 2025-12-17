# Dashboard Overview

The Helix Dashboard is a Next.js 14 admin interface for managing and visualizing the Cascading Persona Ecosystem. It provides a unified view of personas, artifacts, traceability graphs, and human approval gates.

## Features

- **Multi-Ecosystem Support** - Manage multiple founding intents and ecosystems
- **Persona Management** - View and manage discovered personas
- **Artifact Browser** - Navigate artifacts across all 12 layers
- **Traceability Graph** - Interactive D3-powered graph visualization
- **Gate Approvals** - Review and approve human gates
- **Full-Text Search** - Search across all artifacts and personas

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Next.js 14 App Router                    │
├─────────────────────────────────────────────────────────────┤
│  Pages (Client Components)     │  API Routes (Server)       │
│  ├── /                         │  ├── /api/artifacts        │
│  ├── /personas                 │  ├── /api/personas         │
│  ├── /artifacts                │  ├── /api/gates            │
│  ├── /gates                    │  ├── /api/traceability     │
│  ├── /traceability             │  ├── /api/ecosystems       │
│  └── /settings                 │  └── /api/search           │
├─────────────────────────────────────────────────────────────┤
│                    Shared Components                         │
│  ├── Layout (Sidebar, Header, EcosystemSelector)            │
│  ├── UI (Radix primitives, shadcn/ui)                       │
│  └── Visualization (D3, react-force-graph)                  │
├─────────────────────────────────────────────────────────────┤
│                    Context Providers                         │
│  ├── SessionProvider (NextAuth)                             │
│  ├── QueryClientProvider (TanStack Query)                   │
│  └── NamespaceProvider (Ecosystem selection)                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │     Neo4j       │
                    │  Knowledge Graph │
                    └─────────────────┘
```

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm 8+
- Neo4j 5.x running (via Docker or standalone)
- Redis (optional, for real-time events)

### Running the Dashboard

=== "Development"

    ```bash
    # From repository root
    pnpm install
    pnpm dev:dashboard

    # Dashboard available at http://localhost:3001
    ```

=== "Production"

    ```bash
    # Build the dashboard
    pnpm --filter @helix/dashboard run build

    # Start production server
    pnpm --filter @helix/dashboard run start
    ```

=== "Docker"

    ```bash
    # Build and run with Docker Compose
    docker-compose up dashboard

    # Dashboard available at http://localhost:3000
    ```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEO4J_URI` | Neo4j connection URI | `bolt://localhost:7687` |
| `NEO4J_USER` | Neo4j username | `neo4j` |
| `NEO4J_PASSWORD` | Neo4j password | `helixpassword` |
| `NEXTAUTH_SECRET` | NextAuth encryption key | (required) |
| `NEXTAUTH_URL` | Base URL for NextAuth | `http://localhost:3001` |

## Package Dependencies

```json
{
  "dependencies": {
    "@helix/common": "workspace:*",
    "next": "^14.2.0",
    "react": "^18.3.0",
    "next-auth": "^4.24.0",
    "@tanstack/react-query": "^5.62.0",
    "@radix-ui/react-*": "Various Radix primitives",
    "d3": "^7.9.0",
    "react-force-graph-2d": "^1.25.0",
    "lucide-react": "^0.407.0",
    "tailwindcss": "^3.4.0"
  }
}
```

## Directory Structure

```
packages/dashboard/
├── src/
│   ├── app/
│   │   ├── (dashboard)/          # Protected routes
│   │   │   ├── page.tsx          # Home/Overview
│   │   │   ├── artifacts/        # Artifact browser
│   │   │   ├── personas/         # Persona management
│   │   │   ├── gates/            # Gate approvals
│   │   │   ├── traceability/     # Graph visualization
│   │   │   └── settings/         # Settings
│   │   ├── api/                  # API routes
│   │   ├── login/                # Login page
│   │   └── layout.tsx            # Root layout
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── layout/               # Layout components
│   │   └── traceability/         # Graph components
│   ├── contexts/
│   │   └── namespace-context.tsx # Ecosystem context
│   └── lib/
│       ├── auth.ts               # NextAuth config
│       ├── graph-client.ts       # Neo4j queries
│       └── utils.ts              # Utilities
├── public/                       # Static assets
├── next.config.mjs               # Next.js config
├── tailwind.config.ts            # Tailwind config
└── package.json
```
