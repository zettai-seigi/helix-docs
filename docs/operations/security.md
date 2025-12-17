# Security Hardening Guide

Production security checklist and best practices for Helix deployments.

## Security Checklist

### Infrastructure Security

- [ ] **Network Isolation**
  - [ ] Neo4j not exposed to public internet
  - [ ] Redis not exposed to public internet
  - [ ] MCP servers in private subnet
  - [ ] Dashboard behind reverse proxy/WAF

- [ ] **TLS/SSL**
  - [ ] HTTPS enabled for dashboard
  - [ ] TLS for Neo4j Bolt connections
  - [ ] TLS for Redis connections
  - [ ] Valid certificates (not self-signed in production)

- [ ] **Firewall Rules**
  - [ ] Only required ports open
  - [ ] Egress filtering enabled
  - [ ] Network policies in Kubernetes

### Authentication & Authorization

- [ ] **Credentials**
  - [ ] Strong Neo4j password (20+ chars, mixed case, numbers, symbols)
  - [ ] Strong Redis password
  - [ ] NEXTAUTH_SECRET is 32+ random characters
  - [ ] All default passwords changed

- [ ] **Access Control**
  - [ ] RBAC policies reviewed and tested
  - [ ] Principle of least privilege applied
  - [ ] Service accounts have minimal permissions
  - [ ] API keys rotated regularly

- [ ] **Session Management**
  - [ ] Session timeout configured
  - [ ] Secure cookie flags set
  - [ ] CSRF protection enabled

### Data Protection

- [ ] **Encryption**
  - [ ] Data encrypted at rest (Neo4j, Redis)
  - [ ] Backups encrypted
  - [ ] Secrets in encrypted secret manager

- [ ] **Tenant Isolation**
  - [ ] Row-level security enforced
  - [ ] Tenant ID validated on all queries
  - [ ] Cross-tenant access audited

- [ ] **Audit Logging**
  - [ ] All mutations logged
  - [ ] Authentication events logged
  - [ ] Logs shipped to SIEM
  - [ ] Log retention policy defined

---

## Network Security

### Recommended Architecture

```
                    ┌──────────────────────────────────────┐
                    │            Public Internet           │
                    └─────────────────┬────────────────────┘
                                      │
                              ┌───────▼───────┐
                              │   WAF / CDN   │
                              │  (Cloudflare) │
                              └───────┬───────┘
                                      │
                              ┌───────▼───────┐
                              │ Load Balancer │
                              │   (nginx)     │
                              └───────┬───────┘
                                      │
        ┌─────────────────────────────┼─────────────────────────────┐
        │                     DMZ / Public Subnet                    │
        │  ┌─────────────────────────────────────────────────────┐  │
        │  │                    Dashboard                         │  │
        │  │               (Next.js on port 3000)                 │  │
        │  └─────────────────────────┬───────────────────────────┘  │
        └─────────────────────────────┼─────────────────────────────┘
                                      │
        ┌─────────────────────────────┼─────────────────────────────┐
        │                    Private Subnet                          │
        │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
        │  │  Graph   │  │Discovery │  │Derivation│  │ Cascade  │  │
        │  │   MCP    │  │   MCP    │  │   MCP    │  │   MCP    │  │
        │  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  │
        │       └──────────────┴──────────────┴──────────────┘       │
        │                             │                              │
        │  ┌──────────────────────────┴───────────────────────────┐ │
        │  │                    Data Subnet                        │ │
        │  │  ┌─────────────┐              ┌─────────────┐         │ │
        │  │  │    Neo4j    │              │    Redis    │         │ │
        │  │  │  (bolt:7687)│              │  (:6379)    │         │ │
        │  │  └─────────────┘              └─────────────┘         │ │
        │  └───────────────────────────────────────────────────────┘ │
        └────────────────────────────────────────────────────────────┘
```

### Firewall Rules

```yaml
# Ingress rules
- name: allow-https
  port: 443
  source: 0.0.0.0/0
  destination: load-balancer

- name: allow-dashboard
  port: 3000
  source: load-balancer
  destination: dashboard-subnet

- name: allow-neo4j
  port: 7687
  source: private-subnet
  destination: data-subnet

- name: allow-redis
  port: 6379
  source: private-subnet
  destination: data-subnet

# Deny all other traffic
- name: deny-all
  action: deny
  source: 0.0.0.0/0
```

### Kubernetes Network Policies

```yaml
# k8s/network-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: helix-network-policy
  namespace: helix
spec:
  podSelector: {}
  policyTypes:
    - Ingress
    - Egress
  ingress:
    # Allow dashboard from ingress controller
    - from:
        - namespaceSelector:
            matchLabels:
              name: ingress-nginx
      ports:
        - port: 3000
    # Allow internal communication
    - from:
        - podSelector: {}
  egress:
    # Allow Neo4j
    - to:
        - podSelector:
            matchLabels:
              app: neo4j
      ports:
        - port: 7687
    # Allow Redis
    - to:
        - podSelector:
            matchLabels:
              app: redis
      ports:
        - port: 6379
    # Allow DNS
    - to:
        - namespaceSelector: {}
      ports:
        - port: 53
          protocol: UDP
```

---

## Secrets Management

### Environment Variables (NOT Recommended for Production)

```bash
# Only for development
export NEO4J_PASSWORD=dev-password
export NEXTAUTH_SECRET=dev-secret
```

### Docker Secrets

```yaml
# docker-compose.prod.yml
services:
  dashboard:
    secrets:
      - neo4j_password
      - nextauth_secret
    environment:
      - NEO4J_PASSWORD_FILE=/run/secrets/neo4j_password
      - NEXTAUTH_SECRET_FILE=/run/secrets/nextauth_secret

secrets:
  neo4j_password:
    external: true
  nextauth_secret:
    external: true
```

### Kubernetes Secrets

```yaml
# Use sealed-secrets or external-secrets
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: helix-secrets
  namespace: helix
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: aws-secrets-manager
    kind: ClusterSecretStore
  target:
    name: helix-secrets
  data:
    - secretKey: neo4j-password
      remoteRef:
        key: helix/neo4j
        property: password
    - secretKey: nextauth-secret
      remoteRef:
        key: helix/nextauth
        property: secret
```

### HashiCorp Vault Integration

```typescript
// src/lib/secrets.ts
import Vault from 'node-vault';

const vault = Vault({
  endpoint: process.env.VAULT_ADDR,
  token: process.env.VAULT_TOKEN
});

export async function getSecret(path: string): Promise<string> {
  const result = await vault.read(`secret/data/helix/${path}`);
  return result.data.data.value;
}

// Usage
const neo4jPassword = await getSecret('neo4j/password');
```

### Secret Rotation

```bash
#!/bin/bash
# scripts/rotate-secrets.sh

# Generate new Neo4j password
NEW_NEO4J_PASSWORD=$(openssl rand -base64 32)

# Update Neo4j
docker exec helix-neo4j cypher-shell \
  -u neo4j -p "$OLD_NEO4J_PASSWORD" \
  "ALTER CURRENT USER SET PASSWORD FROM '$OLD_NEO4J_PASSWORD' TO '$NEW_NEO4J_PASSWORD'"

# Update secret store
aws secretsmanager update-secret \
  --secret-id helix/neo4j \
  --secret-string "{\"password\":\"$NEW_NEO4J_PASSWORD\"}"

# Rolling restart of services
kubectl rollout restart deployment -n helix
```

---

## Authentication Security

### NextAuth Configuration

```typescript
// src/lib/auth.ts
import NextAuth from 'next-auth';

export const authOptions = {
  // Use secure cookies in production
  useSecureCookies: process.env.NODE_ENV === 'production',

  cookies: {
    sessionToken: {
      name: '__Secure-next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
        maxAge: 60 * 60 * 24 // 24 hours
      }
    }
  },

  // Session configuration
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24, // 24 hours
  },

  // JWT configuration
  jwt: {
    maxAge: 60 * 60 * 24,
  },

  // Callbacks
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.tenantId = user.tenantId;
        token.role = user.role;
        token.accessLevel = user.accessLevel;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.tenantId = token.tenantId;
      session.user.role = token.role;
      session.user.accessLevel = token.accessLevel;
      return session;
    }
  }
};
```

### CSRF Protection

```typescript
// Already included in NextAuth, but verify:
// - SameSite cookies enabled
// - CSRF token validated on mutations
// - Origin header checked

// Additional protection for API routes
export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  const allowedOrigins = [process.env.NEXTAUTH_URL];

  if (!allowedOrigins.includes(origin)) {
    return new Response('Forbidden', { status: 403 });
  }

  // Process request
}
```

### Rate Limiting

```typescript
// src/middleware.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 requests per minute
});

export async function middleware(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1';
  const { success, limit, reset, remaining } = await ratelimit.limit(ip);

  if (!success) {
    return new Response('Too Many Requests', {
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
```

---

## Neo4j Security

### Authentication

```yaml
# neo4j.conf
dbms.security.auth_enabled=true
dbms.security.auth_minimum_password_length=20
dbms.security.auth_lock_time=5s
dbms.security.auth_max_failed_attempts=3
```

### Role-Based Access

```cypher
// Create roles
CREATE ROLE helix_reader;
CREATE ROLE helix_writer;
CREATE ROLE helix_admin;

// Grant permissions
GRANT READ {*} ON GRAPH * TO helix_reader;
GRANT WRITE {*} ON GRAPH * TO helix_writer;
GRANT ALL ON GRAPH * TO helix_admin;

// Create users
CREATE USER app_reader SET PASSWORD 'reader-password' CHANGE NOT REQUIRED;
CREATE USER app_writer SET PASSWORD 'writer-password' CHANGE NOT REQUIRED;

// Assign roles
GRANT ROLE helix_reader TO app_reader;
GRANT ROLE helix_writer TO app_writer;
```

### Query Allowlisting

```typescript
// Only allow specific query patterns
const ALLOWED_QUERIES = [
  /^MATCH \(p:Persona \{tenantId: \$tenantId\}\)/,
  /^MATCH \(a:Artifact \{tenantId: \$tenantId\}\)/,
  /^MERGE \(a:Artifact/,
];

export function validateQuery(query: string): boolean {
  return ALLOWED_QUERIES.some(pattern => pattern.test(query));
}
```

### Encryption at Rest

```yaml
# neo4j.conf (Enterprise)
dbms.security.encryption.keys.default.name=helix-key
dbms.security.encryption.at_rest.enabled=true
```

---

## Audit Logging

### What to Log

| Event | Priority | Details |
|-------|----------|---------|
| Authentication success/failure | High | User, IP, timestamp |
| Authorization denied | High | User, resource, action |
| Data mutations | High | User, entity, before/after |
| Gate approvals/rejections | High | User, gate, decision |
| Configuration changes | High | User, setting, value |
| Admin actions | High | User, action, target |

### Log Format

```json
{
  "timestamp": "2024-12-14T10:30:00.000Z",
  "level": "audit",
  "event": "artifact.created",
  "actor": {
    "userId": "user-123",
    "email": "admin@example.com",
    "role": "tenant_admin",
    "ip": "192.168.1.100"
  },
  "resource": {
    "type": "Artifact",
    "uid": "cpe:psychotest/req/story/USER/login",
    "tenantId": "psychotest"
  },
  "action": "create",
  "result": "success",
  "metadata": {
    "requestId": "req-abc-123",
    "userAgent": "Mozilla/5.0..."
  }
}
```

### Implementation

```typescript
// src/lib/audit.ts
import { createLogger } from '@helix/common';

const auditLogger = createLogger('audit');

export async function auditLog(event: AuditEvent) {
  // Log to file/stdout
  auditLogger.info(event);

  // Store in Neo4j for querying
  await graphClient.writeQuery(`
    CREATE (l:AuditLog {
      timestamp: datetime(),
      event: $event,
      actorId: $actorId,
      resourceUid: $resourceUid,
      action: $action,
      result: $result,
      tenantId: $tenantId
    })
  `, event);

  // Send to SIEM (optional)
  if (process.env.SIEM_ENDPOINT) {
    await fetch(process.env.SIEM_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(event)
    });
  }
}
```

---

## Vulnerability Management

### Dependency Scanning

```bash
# Run npm audit
pnpm audit

# Use Snyk for deeper analysis
npx snyk test

# Dependabot configuration (.github/dependabot.yml)
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

### Container Scanning

```yaml
# .gitlab-ci.yml
container_scanning:
  stage: security
  image: docker:stable
  services:
    - docker:dind
  script:
    - docker pull registry.gitlab.com/security-products/container-scanning
    - docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
        registry.gitlab.com/security-products/container-scanning \
        /analyzer run
  artifacts:
    reports:
      container_scanning: gl-container-scanning-report.json
```

### SAST (Static Analysis)

```yaml
# .gitlab-ci.yml
sast:
  stage: security
  image: returntocorp/semgrep
  script:
    - semgrep --config auto --json --output semgrep-report.json .
  artifacts:
    reports:
      sast: semgrep-report.json
```

---

## Incident Response

### Security Incident Runbook

1. **Detection**
   - Monitor alerts from SIEM
   - Review audit logs for anomalies
   - Check for unauthorized access attempts

2. **Containment**
   - Isolate affected systems
   - Revoke compromised credentials
   - Block malicious IPs

3. **Eradication**
   - Remove malicious artifacts
   - Patch vulnerabilities
   - Update security rules

4. **Recovery**
   - Restore from clean backups
   - Verify system integrity
   - Re-enable services

5. **Post-Incident**
   - Document timeline
   - Identify root cause
   - Update security controls
   - Notify affected parties (if required)

### Emergency Contacts

```yaml
# Store securely, not in repo
security_contacts:
  - name: "Security Team"
    email: "security@example.com"
    phone: "+1-xxx-xxx-xxxx"
  - name: "On-Call Engineer"
    pagerduty: "helix-oncall"
```
