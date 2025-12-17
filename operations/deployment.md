# Production Deployment Guide

Complete guide for deploying Helix in production environments.

## Deployment Architecture

```
                                    ┌─────────────────┐
                                    │  Load Balancer  │
                                    │   (nginx/ALB)   │
                                    └────────┬────────┘
                                             │
              ┌──────────────────────────────┼──────────────────────────────┐
              │                              │                              │
              ▼                              ▼                              ▼
    ┌─────────────────┐          ┌─────────────────┐          ┌─────────────────┐
    │   Dashboard     │          │   Dashboard     │          │   Dashboard     │
    │   (replica 1)   │          │   (replica 2)   │          │   (replica N)   │
    └────────┬────────┘          └────────┬────────┘          └────────┬────────┘
             │                            │                            │
             └────────────────────────────┼────────────────────────────┘
                                          │
              ┌───────────────────────────┼───────────────────────────┐
              │                           │                           │
              ▼                           ▼                           ▼
    ┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
    │     Neo4j       │         │     Redis       │         │   MCP Servers   │
    │    (cluster)    │         │   (sentinel)    │         │   (5 services)  │
    └─────────────────┘         └─────────────────┘         └─────────────────┘
```

## Prerequisites

- Docker 24+ and Docker Compose 2.20+
- Kubernetes 1.28+ (for K8s deployment)
- Neo4j 5.x (Enterprise for clustering)
- Redis 7.x
- 4GB RAM minimum per MCP server
- 8GB RAM for Neo4j
- SSD storage recommended

## Environment Configuration

### Required Environment Variables

```bash
# Neo4j
NEO4J_URI=bolt://neo4j-cluster:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=<secure-password>

# Redis
REDIS_HOST=redis-sentinel
REDIS_PORT=26379
REDIS_PASSWORD=<secure-password>

# Authentication
NEXTAUTH_SECRET=<32-char-random-string>
NEXTAUTH_URL=https://dashboard.example.com

# Anthropic (for Discovery/Derivation)
ANTHROPIC_API_KEY=<api-key>

# Logging
LOG_LEVEL=info
NODE_ENV=production

# Helix Config
HELIX_CONFIG=/app/helix.config.yaml
```

### Production Configuration File

```yaml
# helix.config.yaml (production)
server:
  uid_prefix: "cpe"
  log_level: "info"

graph:
  type: "neo4j"
  uri: "${NEO4J_URI}"
  user: "${NEO4J_USER}"
  password: "${NEO4J_PASSWORD}"
  max_connection_pool_size: 100
  connection_timeout: 30000

events:
  type: "redis"
  host: "${REDIS_HOST}"
  port: ${REDIS_PORT}
  password: "${REDIS_PASSWORD}"
  tls: true

enforcement:
  uid_validation: "strict"
  orphan_prevention: true
  gate_enforcement: true

gates:
  gate_1: { enabled: true, timeout_hours: 48 }
  gate_2: { enabled: true, timeout_hours: 48 }
  gate_4: { enabled: true, timeout_hours: 24 }
  gate_5: { enabled: true, timeout_hours: 24 }
```

---

## Docker Compose Deployment

### Production Compose File

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  neo4j:
    image: neo4j:5.25-enterprise
    container_name: helix-neo4j
    ports:
      - "7687:7687"
      - "7474:7474"
    environment:
      - NEO4J_AUTH=${NEO4J_USER}/${NEO4J_PASSWORD}
      - NEO4J_ACCEPT_LICENSE_AGREEMENT=yes
      - NEO4J_dbms_memory_heap_initial__size=2G
      - NEO4J_dbms_memory_heap_max__size=4G
      - NEO4J_dbms_memory_pagecache_size=2G
      - NEO4J_PLUGINS=["apoc"]
    volumes:
      - neo4j_data:/data
      - neo4j_logs:/logs
      - neo4j_import:/import
    healthcheck:
      test: ["CMD", "neo4j", "status"]
      interval: 30s
      timeout: 10s
      retries: 5
    deploy:
      resources:
        limits:
          memory: 8G
        reservations:
          memory: 4G
    networks:
      - helix-network

  redis:
    image: redis:7-alpine
    container_name: helix-redis
    command: >
      redis-server
      --appendonly yes
      --requirepass ${REDIS_PASSWORD}
      --maxmemory 1gb
      --maxmemory-policy allkeys-lru
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "-a", "${REDIS_PASSWORD}", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
    deploy:
      resources:
        limits:
          memory: 2G
    networks:
      - helix-network

  dashboard:
    build:
      context: .
      dockerfile: docker/Dockerfile.dashboard
    container_name: helix-dashboard
    ports:
      - "3000:3000"
    environment:
      - NEO4J_URI=bolt://neo4j:7687
      - NEO4J_USER=${NEO4J_USER}
      - NEO4J_PASSWORD=${NEO4J_PASSWORD}
      - REDIS_HOST=redis
      - REDIS_PASSWORD=${REDIS_PASSWORD}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
      - NODE_ENV=production
    depends_on:
      neo4j:
        condition: service_healthy
      redis:
        condition: service_healthy
    deploy:
      replicas: 2
      resources:
        limits:
          memory: 1G
    networks:
      - helix-network

  mcp-graph:
    build:
      context: .
      dockerfile: docker/Dockerfile.graph
    container_name: helix-mcp-graph
    environment:
      - NEO4J_URI=bolt://neo4j:7687
      - NEO4J_USER=${NEO4J_USER}
      - NEO4J_PASSWORD=${NEO4J_PASSWORD}
      - HELIX_CONFIG=/app/helix.config.yaml
    depends_on:
      neo4j:
        condition: service_healthy
    deploy:
      resources:
        limits:
          memory: 2G
    networks:
      - helix-network

  mcp-discovery:
    build:
      context: .
      dockerfile: docker/Dockerfile.discovery
    container_name: helix-mcp-discovery
    environment:
      - NEO4J_URI=bolt://neo4j:7687
      - NEO4J_USER=${NEO4J_USER}
      - NEO4J_PASSWORD=${NEO4J_PASSWORD}
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - HELIX_CONFIG=/app/helix.config.yaml
    depends_on:
      - mcp-graph
    deploy:
      resources:
        limits:
          memory: 4G
    networks:
      - helix-network

  mcp-derivation:
    build:
      context: .
      dockerfile: docker/Dockerfile.derivation
    container_name: helix-mcp-derivation
    environment:
      - NEO4J_URI=bolt://neo4j:7687
      - NEO4J_USER=${NEO4J_USER}
      - NEO4J_PASSWORD=${NEO4J_PASSWORD}
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - HELIX_CONFIG=/app/helix.config.yaml
    depends_on:
      - mcp-graph
    deploy:
      resources:
        limits:
          memory: 4G
    networks:
      - helix-network

  mcp-cascade:
    build:
      context: .
      dockerfile: docker/Dockerfile.cascade
    container_name: helix-mcp-cascade
    environment:
      - NEO4J_URI=bolt://neo4j:7687
      - NEO4J_USER=${NEO4J_USER}
      - NEO4J_PASSWORD=${NEO4J_PASSWORD}
      - HELIX_CONFIG=/app/helix.config.yaml
    depends_on:
      - mcp-graph
    deploy:
      resources:
        limits:
          memory: 2G
    networks:
      - helix-network

  mcp-verification:
    build:
      context: .
      dockerfile: docker/Dockerfile.verification
    container_name: helix-mcp-verification
    environment:
      - NEO4J_URI=bolt://neo4j:7687
      - NEO4J_USER=${NEO4J_USER}
      - NEO4J_PASSWORD=${NEO4J_PASSWORD}
      - Z3_PATH=/usr/bin/z3
      - HELIX_CONFIG=/app/helix.config.yaml
    depends_on:
      - mcp-graph
    deploy:
      resources:
        limits:
          memory: 2G
    networks:
      - helix-network

volumes:
  neo4j_data:
  neo4j_logs:
  neo4j_import:
  redis_data:

networks:
  helix-network:
    driver: bridge
```

### Deployment Commands

```bash
# Create .env file
cat > .env << EOF
NEO4J_USER=neo4j
NEO4J_PASSWORD=<secure-password>
REDIS_PASSWORD=<secure-password>
NEXTAUTH_SECRET=$(openssl rand -base64 32)
NEXTAUTH_URL=https://dashboard.example.com
ANTHROPIC_API_KEY=<api-key>
EOF

# Deploy
docker-compose -f docker-compose.prod.yml up -d

# Initialize database
docker-compose exec mcp-graph pnpm db:init

# Check status
docker-compose ps
docker-compose logs -f
```

---

## Kubernetes Deployment

### Namespace and Secrets

```yaml
# k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: helix
---
# k8s/secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: helix-secrets
  namespace: helix
type: Opaque
stringData:
  neo4j-uri: "bolt://neo4j:7687"
  neo4j-user: "neo4j"
  neo4j-password: "<secure-password>"
  redis-password: "<secure-password>"
  nextauth-secret: "<32-char-secret>"
  anthropic-api-key: "<api-key>"
```

### Neo4j StatefulSet

```yaml
# k8s/neo4j.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: neo4j
  namespace: helix
spec:
  serviceName: neo4j
  replicas: 1
  selector:
    matchLabels:
      app: neo4j
  template:
    metadata:
      labels:
        app: neo4j
    spec:
      containers:
        - name: neo4j
          image: neo4j:5.25-enterprise
          ports:
            - containerPort: 7687
            - containerPort: 7474
          env:
            - name: NEO4J_AUTH
              valueFrom:
                secretKeyRef:
                  name: helix-secrets
                  key: neo4j-password
            - name: NEO4J_ACCEPT_LICENSE_AGREEMENT
              value: "yes"
            - name: NEO4J_dbms_memory_heap_initial__size
              value: "2G"
            - name: NEO4J_dbms_memory_heap_max__size
              value: "4G"
          resources:
            requests:
              memory: "4Gi"
              cpu: "1000m"
            limits:
              memory: "8Gi"
              cpu: "2000m"
          volumeMounts:
            - name: data
              mountPath: /data
          readinessProbe:
            exec:
              command: ["neo4j", "status"]
            initialDelaySeconds: 30
            periodSeconds: 10
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 100Gi
---
apiVersion: v1
kind: Service
metadata:
  name: neo4j
  namespace: helix
spec:
  selector:
    app: neo4j
  ports:
    - name: bolt
      port: 7687
    - name: http
      port: 7474
```

### Dashboard Deployment

```yaml
# k8s/dashboard.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: dashboard
  namespace: helix
spec:
  replicas: 3
  selector:
    matchLabels:
      app: dashboard
  template:
    metadata:
      labels:
        app: dashboard
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
          livenessProbe:
            httpGet:
              path: /api/health
              port: 3000
            initialDelaySeconds: 15
---
apiVersion: v1
kind: Service
metadata:
  name: dashboard
  namespace: helix
spec:
  selector:
    app: dashboard
  ports:
    - port: 80
      targetPort: 3000
```

### Ingress with TLS

```yaml
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: helix-ingress
  namespace: helix
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/proxy-body-size: "50m"
spec:
  ingressClassName: nginx
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
                name: dashboard
                port:
                  number: 80
```

### Deploy to Kubernetes

```bash
# Apply configurations
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/secrets.yaml
kubectl apply -f k8s/neo4j.yaml
kubectl apply -f k8s/redis.yaml
kubectl apply -f k8s/dashboard.yaml
kubectl apply -f k8s/mcp-servers.yaml
kubectl apply -f k8s/ingress.yaml

# Check status
kubectl get pods -n helix
kubectl get svc -n helix

# Initialize database
kubectl exec -n helix deployment/mcp-graph -- pnpm db:init
```

---

## Scaling Guidelines

### Horizontal Scaling

| Component | Scalable | Notes |
|-----------|----------|-------|
| Dashboard | Yes | Stateless, scale behind load balancer |
| MCP Graph | Limited | Single writer to Neo4j |
| MCP Discovery | Yes | Stateless, CPU-intensive |
| MCP Derivation | Yes | Stateless, CPU-intensive |
| MCP Cascade | Yes | Stateless |
| MCP Verification | Yes | Stateless, may need Z3 |
| Neo4j | Cluster | Enterprise license required |
| Redis | Sentinel | For HA |

### Resource Recommendations

| Component | Min RAM | Recommended RAM | CPU |
|-----------|---------|-----------------|-----|
| Dashboard | 256MB | 512MB | 0.5 core |
| MCP Graph | 1GB | 2GB | 1 core |
| MCP Discovery | 2GB | 4GB | 2 cores |
| MCP Derivation | 2GB | 4GB | 2 cores |
| MCP Cascade | 1GB | 2GB | 1 core |
| MCP Verification | 1GB | 2GB | 1 core |
| Neo4j | 4GB | 8GB | 2 cores |
| Redis | 512MB | 1GB | 0.5 core |

---

## Backup and Recovery

### Neo4j Backup

```bash
# Online backup (Enterprise)
neo4j-admin backup --database=neo4j --to=/backups/neo4j-$(date +%Y%m%d)

# Docker backup
docker exec helix-neo4j neo4j-admin dump --database=neo4j --to=/data/backup.dump
docker cp helix-neo4j:/data/backup.dump ./backups/

# Kubernetes backup
kubectl exec -n helix neo4j-0 -- neo4j-admin dump --database=neo4j --to=/data/backup.dump
kubectl cp helix/neo4j-0:/data/backup.dump ./backups/
```

### Redis Backup

```bash
# Trigger RDB snapshot
docker exec helix-redis redis-cli -a $REDIS_PASSWORD BGSAVE

# Copy RDB file
docker cp helix-redis:/data/dump.rdb ./backups/
```

### Restore Procedures

```bash
# Restore Neo4j
docker exec helix-neo4j neo4j-admin load --database=neo4j --from=/data/backup.dump --force

# Restore Redis
docker cp ./backups/dump.rdb helix-redis:/data/
docker restart helix-redis
```

---

## Security Checklist

- [ ] Use TLS for all external connections
- [ ] Set strong passwords for Neo4j and Redis
- [ ] Configure NEXTAUTH_SECRET with 32+ character random string
- [ ] Enable Neo4j authentication
- [ ] Use Redis AUTH
- [ ] Configure network policies in Kubernetes
- [ ] Enable audit logging
- [ ] Regularly rotate secrets
- [ ] Keep images updated
- [ ] Use non-root containers
- [ ] Implement rate limiting on dashboard
