# Troubleshooting Guide

Common issues and solutions for Helix deployments.

## Quick Diagnostics

### Check System Status

```bash
# Docker status
docker-compose ps
docker-compose logs --tail=50

# Kubernetes status
kubectl get pods -n helix
kubectl describe pod <pod-name> -n helix

# Check connectivity
curl http://localhost:3000/api/health
curl http://localhost:7474  # Neo4j browser
redis-cli -a $REDIS_PASSWORD ping
```

---

## Connection Issues

### Neo4j Connection Refused

**Symptoms**:
```
Error: Connection refused to bolt://localhost:7687
ServiceUnavailable: Unable to connect to Neo4j
```

**Solutions**:

1. **Check if Neo4j is running**:
   ```bash
   docker-compose ps neo4j
   docker-compose logs neo4j --tail=100
   ```

2. **Wait for Neo4j startup** (can take 30-60 seconds):
   ```bash
   docker-compose logs -f neo4j | grep "Started"
   ```

3. **Verify credentials**:
   ```bash
   # Test connection
   cypher-shell -u neo4j -p $NEO4J_PASSWORD "RETURN 1"
   ```

4. **Check network connectivity**:
   ```bash
   # From within Docker network
   docker-compose exec dashboard nc -zv neo4j 7687
   ```

5. **Reset Neo4j** (development only):
   ```bash
   docker-compose down -v
   docker-compose up -d neo4j
   # Wait for healthy status
   docker-compose exec mcp-graph pnpm db:init
   ```

### Redis Connection Failed

**Symptoms**:
```
Error: Redis connection to localhost:6379 failed
ECONNREFUSED 127.0.0.1:6379
```

**Solutions**:

1. **Check Redis status**:
   ```bash
   docker-compose ps redis
   docker-compose logs redis --tail=50
   ```

2. **Test connection**:
   ```bash
   redis-cli -h localhost -p 6379 -a $REDIS_PASSWORD ping
   ```

3. **Check memory**:
   ```bash
   redis-cli -a $REDIS_PASSWORD info memory
   ```

4. **Clear Redis** (if corrupt):
   ```bash
   redis-cli -a $REDIS_PASSWORD FLUSHALL
   ```

### Dashboard Cannot Connect to Neo4j

**Symptoms**:
- Dashboard shows "Connection Error"
- API routes return 500 errors
- Health endpoint shows `neo4j: disconnected`

**Solutions**:

1. **Verify environment variables**:
   ```bash
   docker-compose exec dashboard env | grep NEO4J
   ```

2. **Check Docker networking**:
   ```bash
   # Dashboard should resolve 'neo4j' hostname
   docker-compose exec dashboard nslookup neo4j
   ```

3. **Test from dashboard container**:
   ```bash
   docker-compose exec dashboard node -e "
     const neo4j = require('neo4j-driver');
     const driver = neo4j.driver('bolt://neo4j:7687',
       neo4j.auth.basic('neo4j', process.env.NEO4J_PASSWORD));
     driver.verifyConnectivity().then(() => console.log('OK')).catch(console.error);
   "
   ```

---

## Authentication Issues

### NextAuth Configuration Error

**Symptoms**:
```
Error: NEXTAUTH_SECRET is not set
[next-auth] Error: No secret provided
```

**Solutions**:

1. **Set NEXTAUTH_SECRET**:
   ```bash
   # Generate secret
   openssl rand -base64 32

   # Add to .env
   NEXTAUTH_SECRET=<generated-secret>
   ```

2. **Verify it's set**:
   ```bash
   docker-compose exec dashboard env | grep NEXTAUTH
   ```

### Session Invalid After Restart

**Symptoms**:
- Users logged out after container restart
- "Session expired" errors

**Solutions**:

1. **Use consistent NEXTAUTH_SECRET** - Don't regenerate on each deployment

2. **Check NEXTAUTH_URL matches actual URL**:
   ```bash
   # Should match your actual deployment URL
   NEXTAUTH_URL=https://dashboard.example.com
   ```

---

## Database Issues

### Neo4j Out of Memory

**Symptoms**:
```
OutOfMemoryError: Java heap space
Neo4j kernel panic
```

**Solutions**:

1. **Increase heap memory**:
   ```yaml
   # docker-compose.yml
   environment:
     - NEO4J_dbms_memory_heap_initial__size=2G
     - NEO4J_dbms_memory_heap_max__size=4G
   ```

2. **Increase page cache**:
   ```yaml
   environment:
     - NEO4J_dbms_memory_pagecache_size=2G
   ```

3. **Check query performance** - Large result sets:
   ```cypher
   // Add LIMIT to queries
   MATCH (a:Artifact) RETURN a LIMIT 1000
   ```

### Slow Queries

**Symptoms**:
- Dashboard timeouts
- API requests > 5 seconds
- Neo4j CPU high

**Solutions**:

1. **Check for missing indexes**:
   ```cypher
   // Should show indexes on uid, tenantId
   SHOW INDEXES
   ```

2. **Create missing indexes**:
   ```cypher
   CREATE INDEX artifact_uid IF NOT EXISTS FOR (a:Artifact) ON (a.uid);
   CREATE INDEX artifact_tenant IF NOT EXISTS FOR (a:Artifact) ON (a.tenantId);
   CREATE INDEX persona_uid IF NOT EXISTS FOR (p:Persona) ON (p.uid);
   CREATE INDEX persona_tenant IF NOT EXISTS FOR (p:Persona) ON (p.tenantId);
   ```

3. **Profile slow queries**:
   ```cypher
   PROFILE MATCH (a:Artifact)-[:DERIVES_FROM*1..10]->(p)
   WHERE a.tenantId = 'default'
   RETURN a, p
   ```

4. **Limit traversal depth**:
   ```cypher
   // Instead of unlimited depth
   MATCH (a)-[:DERIVES_FROM*1..5]->(p)  // Limit to 5
   ```

### Data Inconsistency

**Symptoms**:
- Artifacts showing wrong relationships
- Orphaned nodes
- Missing personas

**Solutions**:

1. **Run consistency check**:
   ```cypher
   // Find orphan artifacts (no persona)
   MATCH (a:Artifact)
   WHERE NOT (a)-[:SERVES]->(:Persona)
   RETURN a.uid, a.name
   ```

2. **Find broken relationships**:
   ```cypher
   // Relationships pointing to non-existent nodes
   MATCH (a)-[r]->(b)
   WHERE a IS NULL OR b IS NULL
   RETURN type(r), count(*)
   ```

3. **Re-run demo bootstrap** (development):
   ```bash
   HELIX_CONFIG=./helix.config.yaml npx tsx scripts/demo-bootstrap.ts
   ```

---

## Build Issues

### Cannot Find Module '@helix/common'

**Symptoms**:
```
Error: Cannot find module '@helix/common'
Module not found: Can't resolve '@helix/common'
```

**Solutions**:

1. **Build common package first**:
   ```bash
   pnpm --filter @helix/common run build
   ```

2. **Verify workspace configuration**:
   ```bash
   cat pnpm-workspace.yaml
   # Should include packages/*
   ```

3. **Reinstall dependencies**:
   ```bash
   rm -rf node_modules packages/*/node_modules
   pnpm install
   pnpm build
   ```

### TypeScript Compilation Errors

**Symptoms**:
```
error TS2307: Cannot find module '@/lib/auth'
Type error: Cannot find type definition
```

**Solutions**:

1. **Check tsconfig paths**:
   ```json
   // packages/dashboard/tsconfig.json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./src/*"]
       }
     }
   }
   ```

2. **Clear TypeScript cache**:
   ```bash
   rm -rf packages/*/dist packages/*/.next
   pnpm typecheck
   ```

### Docker Build Fails

**Symptoms**:
```
COPY failed: file not found
npm ERR! Could not resolve dependency
```

**Solutions**:

1. **Check .dockerignore**:
   ```bash
   # Ensure dist/ is NOT ignored if needed
   cat .dockerignore
   ```

2. **Build context issues**:
   ```bash
   # Build from repo root
   docker build -f docker/Dockerfile.dashboard .
   ```

3. **Multi-stage build issues**:
   ```bash
   # Build with --no-cache
   docker-compose build --no-cache dashboard
   ```

---

## Runtime Issues

### Dashboard 404 Errors

**Symptoms**:
- Pages return 404
- API routes not found

**Solutions**:

1. **Check if server is running**:
   ```bash
   docker-compose logs dashboard
   ```

2. **Verify Next.js build completed**:
   ```bash
   docker-compose exec dashboard ls -la .next/
   ```

3. **Check for port conflicts**:
   ```bash
   lsof -i :3000
   lsof -i :3001
   ```

4. **Clear Next.js cache**:
   ```bash
   docker-compose exec dashboard rm -rf .next
   docker-compose restart dashboard
   ```

### Lineage/Impact Not Showing

**Symptoms**:
- Artifact detail shows "No upstream dependencies"
- Graph visualization empty

**Solutions**:

1. **Check relationships exist**:
   ```cypher
   MATCH (a:Artifact {uid: $uid})-[r]->(b)
   RETURN type(r), b.uid
   ```

2. **Verify relationship types**:
   ```cypher
   // Lineage uses these relationships
   MATCH (a)-[:DERIVES_FROM|IMPLEMENTS|SERVES]->(b)
   RETURN DISTINCT type(r)
   ```

3. **Re-run relationship creation**:
   ```bash
   # If using demo-bootstrap
   HELIX_CONFIG=./helix.config.yaml npx tsx scripts/demo-bootstrap.ts
   ```

### Gate Approval Not Working

**Symptoms**:
- Approve button doesn't respond
- Gate status doesn't change

**Solutions**:

1. **Check server actions**:
   ```bash
   docker-compose logs dashboard | grep gate
   ```

2. **Verify gate exists**:
   ```cypher
   MATCH (g:Gate {id: $gateId})
   RETURN g
   ```

3. **Check for errors in browser console**:
   ```javascript
   // Open browser DevTools -> Network tab
   // Look for failed requests to /api/gates
   ```

---

## Performance Issues

### High Memory Usage

**Solutions**:

1. **Check container stats**:
   ```bash
   docker stats
   ```

2. **Limit container memory**:
   ```yaml
   deploy:
     resources:
       limits:
         memory: 2G
   ```

3. **For Neo4j**:
   ```yaml
   environment:
     - NEO4J_dbms_memory_heap_max__size=2G
     - NEO4J_dbms_memory_pagecache_size=1G
   ```

### Slow Dashboard Loading

**Solutions**:

1. **Enable caching**:
   ```typescript
   // Use React Query with staleTime
   useQuery({
     queryKey: ['artifacts'],
     staleTime: 30000
   });
   ```

2. **Paginate large lists**:
   ```typescript
   // Add pagination to API routes
   const { page = 1, limit = 50 } = searchParams;
   ```

3. **Optimize Neo4j queries**:
   ```cypher
   // Use LIMIT and SKIP
   MATCH (a:Artifact {tenantId: $tenantId})
   RETURN a
   SKIP $skip LIMIT $limit
   ```

---

## Getting Help

### Collecting Debug Information

```bash
# System info
uname -a
node --version
pnpm --version
docker --version

# Container logs
docker-compose logs > helix-logs.txt 2>&1

# Neo4j status
docker-compose exec neo4j neo4j status

# Configuration
cat helix.config.yaml
env | grep -E "(NEO4J|REDIS|HELIX|NEXTAUTH)"
```

### Useful Commands

```bash
# Restart all services
docker-compose restart

# Rebuild single service
docker-compose up -d --build dashboard

# Enter container shell
docker-compose exec dashboard sh

# View real-time logs
docker-compose logs -f --tail=100

# Check disk usage
docker system df
```
