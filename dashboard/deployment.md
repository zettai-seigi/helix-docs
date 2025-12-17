# Dashboard Deployment

Guide for deploying the Helix Dashboard in various environments.

## Prerequisites

- Node.js 18+ (for building)
- Neo4j 5.x database
- Redis (optional, for real-time events)

## Environment Configuration

### Required Variables

```bash
# Neo4j Connection
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=your-secure-password

# NextAuth
NEXTAUTH_SECRET=your-32-char-random-string
NEXTAUTH_URL=http://localhost:3001
```

### Optional Variables

```bash
# Redis (for real-time events)
REDIS_HOST=localhost
REDIS_PORT=6379

# Logging
LOG_LEVEL=info

# Feature Flags
ENABLE_SEARCH=true
ENABLE_GRAPH_VISUALIZATION=true
```

### Generating NEXTAUTH_SECRET

```bash
# Using openssl
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## Development Deployment

### Local Development

```bash
# Install dependencies
pnpm install

# Start infrastructure (Neo4j + Redis)
docker-compose -f docker-compose.dev.yml up -d

# Initialize database
pnpm db:init

# Start dashboard in development mode
pnpm dev:dashboard

# Dashboard available at http://localhost:3001
```

### Hot Reloading

Development mode includes:
- Fast Refresh for React components
- API route hot reloading
- Tailwind CSS JIT compilation

---

## Production Deployment

### Building for Production

```bash
# Build all packages (including common)
pnpm build

# Or build just dashboard
pnpm --filter @helix/dashboard run build

# Output in packages/dashboard/.next/
```

### Starting Production Server

```bash
# Set environment variables
export NEO4J_URI=bolt://production-neo4j:7687
export NEO4J_PASSWORD=secure-password
export NEXTAUTH_SECRET=production-secret
export NEXTAUTH_URL=https://dashboard.example.com

# Start server
pnpm --filter @helix/dashboard run start

# Default port: 3000
```

### Custom Port

```bash
# Via environment variable
PORT=8080 pnpm --filter @helix/dashboard run start

# Or in package.json
"start": "next start -p 8080"
```

---

## Docker Deployment

### Using Docker Compose (Recommended)

The full stack includes dashboard alongside MCP servers:

```yaml
# docker-compose.yml
services:
  dashboard:
    build:
      context: .
      dockerfile: docker/Dockerfile.dashboard
    container_name: helix-dashboard
    ports:
      - "3000:3000"
    environment:
      - NEO4J_URI=bolt://neo4j:7687
      - NEO4J_USER=neo4j
      - NEO4J_PASSWORD=helixpassword
      - REDIS_HOST=redis
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=http://localhost:3000
    depends_on:
      neo4j:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - helix-network
```

```bash
# Start full stack
docker-compose up -d

# Start only dashboard + infrastructure
docker-compose up -d neo4j redis dashboard

# View logs
docker-compose logs -f dashboard
```

### Dockerfile

**Location**: `docker/Dockerfile.dashboard`

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/common/package.json ./packages/common/
COPY packages/dashboard/package.json ./packages/dashboard/
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/common/node_modules ./packages/common/node_modules
COPY --from=deps /app/packages/dashboard/node_modules ./packages/dashboard/node_modules
COPY . .
RUN corepack enable pnpm && \
    pnpm --filter @helix/common run build && \
    pnpm --filter @helix/dashboard run build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/packages/dashboard/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/packages/dashboard/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/packages/dashboard/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
```

### Building Docker Image

```bash
# Build image
docker build -f docker/Dockerfile.dashboard -t helix-dashboard .

# Run container
docker run -d \
  --name helix-dashboard \
  -p 3000:3000 \
  -e NEO4J_URI=bolt://host.docker.internal:7687 \
  -e NEO4J_PASSWORD=password \
  -e NEXTAUTH_SECRET=secret \
  helix-dashboard
```

---

## Kubernetes Deployment

### Deployment Manifest

```yaml
# k8s/dashboard-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: helix-dashboard
  labels:
    app: helix-dashboard
spec:
  replicas: 2
  selector:
    matchLabels:
      app: helix-dashboard
  template:
    metadata:
      labels:
        app: helix-dashboard
    spec:
      containers:
        - name: dashboard
          image: helix-dashboard:latest
          ports:
            - containerPort: 3000
          env:
            - name: NEO4J_URI
              valueFrom:
                secretKeyRef:
                  name: helix-secrets
                  key: neo4j-uri
            - name: NEO4J_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: helix-secrets
                  key: neo4j-password
            - name: NEXTAUTH_SECRET
              valueFrom:
                secretKeyRef:
                  name: helix-secrets
                  key: nextauth-secret
            - name: NEXTAUTH_URL
              value: "https://dashboard.example.com"
          resources:
            requests:
              memory: "256Mi"
              cpu: "100m"
            limits:
              memory: "512Mi"
              cpu: "500m"
          readinessProbe:
            httpGet:
              path: /api/health
              port: 3000
            initialDelaySeconds: 10
            periodSeconds: 5
          livenessProbe:
            httpGet:
              path: /api/health
              port: 3000
            initialDelaySeconds: 15
            periodSeconds: 10
```

### Service Manifest

```yaml
# k8s/dashboard-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: helix-dashboard
spec:
  selector:
    app: helix-dashboard
  ports:
    - port: 80
      targetPort: 3000
  type: ClusterIP
```

### Ingress (with TLS)

```yaml
# k8s/dashboard-ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: helix-dashboard
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
    - hosts:
        - dashboard.example.com
      secretName: dashboard-tls
  rules:
    - host: dashboard.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: helix-dashboard
                port:
                  number: 80
```

---

## Vercel Deployment

### Configuration

```json
// vercel.json
{
  "buildCommand": "pnpm --filter @helix/common run build && pnpm --filter @helix/dashboard run build",
  "outputDirectory": "packages/dashboard/.next",
  "framework": "nextjs",
  "env": {
    "NEO4J_URI": "@neo4j-uri",
    "NEO4J_USER": "@neo4j-user",
    "NEO4J_PASSWORD": "@neo4j-password",
    "NEXTAUTH_SECRET": "@nextauth-secret"
  }
}
```

### Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

!!! warning "Neo4j Connection"
    Vercel functions require Neo4j to be accessible from the internet.
    Use Neo4j Aura or ensure your Neo4j instance has public access.

---

## Health Checks

### Health Endpoint

```bash
curl http://localhost:3000/api/health
```

**Response**:
```json
{
  "status": "healthy",
  "neo4j": "connected",
  "timestamp": "2024-12-14T10:30:00Z"
}
```

### Docker Health Check

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

---

## Performance Optimization

### Next.js Caching

Enable ISR (Incremental Static Regeneration) for static content:

```typescript
// In API routes
export const revalidate = 60; // Revalidate every 60 seconds
```

### Neo4j Connection Pooling

The dashboard uses connection pooling via `@helix/common`:

```typescript
// Automatic connection pooling
const client = createGraphClient(config.graph);
```

### CDN Configuration

For static assets, configure CDN headers:

```typescript
// next.config.mjs
export default {
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

---

## Troubleshooting

### Common Issues

**Neo4j Connection Refused**
```
Error: Connection refused to bolt://localhost:7687
```

- Verify Neo4j is running: `docker-compose ps`
- Check Neo4j logs: `docker-compose logs neo4j`
- Verify credentials in environment variables

**NextAuth Configuration Error**
```
Error: NEXTAUTH_SECRET is not set
```

- Set `NEXTAUTH_SECRET` environment variable
- Ensure it's at least 32 characters

**Build Failures**
```
Error: Cannot find module '@helix/common'
```

- Build common package first: `pnpm --filter @helix/common run build`
- Verify workspace configuration in `pnpm-workspace.yaml`

### Logs

```bash
# Docker logs
docker-compose logs -f dashboard

# Kubernetes logs
kubectl logs -f deployment/helix-dashboard

# Local development (stdout)
pnpm dev:dashboard
```
