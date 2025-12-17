# Monitoring and Observability

Guide for monitoring Helix in production environments.

## Health Endpoints

### Dashboard Health

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

### Neo4j Health

```bash
# Via HTTP
curl http://localhost:7474/db/neo4j/cluster/available

# Via Cypher
CALL dbms.cluster.overview()
```

### Redis Health

```bash
redis-cli -a $REDIS_PASSWORD ping
# Response: PONG

redis-cli -a $REDIS_PASSWORD info replication
```

---

## Metrics Collection

### Prometheus Integration

#### Neo4j Metrics

Neo4j exposes metrics at `/metrics` (Enterprise) or via JMX.

```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'neo4j'
    static_configs:
      - targets: ['neo4j:2004']
    metrics_path: /metrics
```

Key Neo4j metrics:

| Metric | Description |
|--------|-------------|
| `neo4j_bolt_connections_opened_total` | Total Bolt connections |
| `neo4j_bolt_connections_closed_total` | Closed connections |
| `neo4j_transaction_committed_total` | Committed transactions |
| `neo4j_transaction_rollback_total` | Rolled back transactions |
| `neo4j_page_cache_hits_total` | Page cache hits |
| `neo4j_page_cache_page_faults_total` | Page cache misses |

#### Redis Metrics

Use Redis Exporter for Prometheus:

```yaml
# docker-compose.yml addition
redis-exporter:
  image: oliver006/redis_exporter:latest
  environment:
    - REDIS_ADDR=redis://redis:6379
    - REDIS_PASSWORD=${REDIS_PASSWORD}
  ports:
    - "9121:9121"
```

Key Redis metrics:

| Metric | Description |
|--------|-------------|
| `redis_connected_clients` | Connected clients |
| `redis_used_memory_bytes` | Memory usage |
| `redis_commands_processed_total` | Total commands |
| `redis_keyspace_hits_total` | Cache hits |
| `redis_keyspace_misses_total` | Cache misses |

#### Dashboard Metrics

Add custom metrics to Next.js:

```typescript
// src/lib/metrics.ts
import { Counter, Histogram, register } from 'prom-client';

export const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

export const artifactQueries = new Counter({
  name: 'helix_artifact_queries_total',
  help: 'Total artifact queries',
  labelNames: ['layer', 'operation']
});

// Expose metrics endpoint
// /api/metrics/route.ts
export async function GET() {
  return new Response(await register.metrics(), {
    headers: { 'Content-Type': register.contentType }
  });
}
```

### Grafana Dashboards

#### Neo4j Dashboard

```json
{
  "dashboard": {
    "title": "Helix - Neo4j",
    "panels": [
      {
        "title": "Active Connections",
        "type": "stat",
        "targets": [
          {
            "expr": "neo4j_bolt_connections_opened_total - neo4j_bolt_connections_closed_total"
          }
        ]
      },
      {
        "title": "Transaction Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(neo4j_transaction_committed_total[5m])"
          }
        ]
      },
      {
        "title": "Cache Hit Ratio",
        "type": "gauge",
        "targets": [
          {
            "expr": "neo4j_page_cache_hits_total / (neo4j_page_cache_hits_total + neo4j_page_cache_page_faults_total)"
          }
        ]
      }
    ]
  }
}
```

#### Helix Application Dashboard

```json
{
  "dashboard": {
    "title": "Helix - Application",
    "panels": [
      {
        "title": "Artifacts by Layer",
        "type": "piechart",
        "targets": [
          {
            "expr": "helix_artifacts_total",
            "legendFormat": "{{layer}}"
          }
        ]
      },
      {
        "title": "Pending Gates",
        "type": "stat",
        "targets": [
          {
            "expr": "helix_gates_pending"
          }
        ]
      },
      {
        "title": "API Request Duration",
        "type": "heatmap",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))"
          }
        ]
      }
    ]
  }
}
```

---

## Logging

### Log Levels

Configure via `LOG_LEVEL` environment variable:

| Level | Description |
|-------|-------------|
| `error` | Errors only |
| `warn` | Warnings and errors |
| `info` | Standard operation logs |
| `debug` | Detailed debugging |
| `trace` | Very verbose |

### Structured Logging

Helix uses structured JSON logging:

```json
{
  "timestamp": "2024-12-14T10:30:00.000Z",
  "level": "info",
  "service": "mcp-graph",
  "message": "Query executed",
  "metadata": {
    "tool": "cpe/query_graph",
    "tenant_id": "default",
    "duration_ms": 45,
    "result_count": 10
  }
}
```

### Log Aggregation

#### Fluentd Configuration

```yaml
# fluent.conf
<source>
  @type forward
  port 24224
</source>

<filter helix.**>
  @type parser
  key_name log
  <parse>
    @type json
  </parse>
</filter>

<match helix.**>
  @type elasticsearch
  host elasticsearch
  port 9200
  index_name helix-logs
  type_name _doc
</match>
```

#### Docker Logging

```yaml
# docker-compose.yml
services:
  dashboard:
    logging:
      driver: fluentd
      options:
        fluentd-address: localhost:24224
        tag: helix.dashboard
```

### Log Queries (Elasticsearch/Kibana)

```json
// Find all errors in last hour
{
  "query": {
    "bool": {
      "must": [
        { "match": { "level": "error" } },
        { "range": { "timestamp": { "gte": "now-1h" } } }
      ]
    }
  }
}

// Find slow queries (>1s)
{
  "query": {
    "bool": {
      "must": [
        { "match": { "service": "mcp-graph" } },
        { "range": { "metadata.duration_ms": { "gte": 1000 } } }
      ]
    }
  }
}
```

---

## Alerting

### Alert Rules (Prometheus)

```yaml
# alerts.yml
groups:
  - name: helix
    rules:
      - alert: Neo4jDown
        expr: up{job="neo4j"} == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Neo4j is down"

      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High error rate detected"

      - alert: PendingGateTooLong
        expr: helix_gate_pending_duration_hours > 24
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "Gate pending for over 24 hours"

      - alert: Neo4jConnectionPoolExhausted
        expr: neo4j_bolt_connections_opened_total - neo4j_bolt_connections_closed_total > 90
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Neo4j connection pool near exhaustion"

      - alert: RedisMemoryHigh
        expr: redis_used_memory_bytes / redis_maxmemory > 0.9
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "Redis memory usage above 90%"
```

### Notification Channels

Configure AlertManager for notifications:

```yaml
# alertmanager.yml
route:
  receiver: 'slack-notifications'
  group_by: ['alertname', 'severity']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h

receivers:
  - name: 'slack-notifications'
    slack_configs:
      - api_url: 'https://hooks.slack.com/services/XXX'
        channel: '#helix-alerts'
        send_resolved: true
        title: '{{ .Status | toUpper }}: {{ .CommonLabels.alertname }}'
        text: '{{ .CommonAnnotations.summary }}'
```

---

## Tracing

### OpenTelemetry Integration

```typescript
// src/lib/tracing.ts
import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://jaeger:4318/v1/traces',
  }),
  serviceName: 'helix-dashboard',
});

sdk.start();
```

### Trace Example

```typescript
import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer('helix-dashboard');

export async function getArtifacts(namespace: string) {
  const span = tracer.startSpan('getArtifacts');
  span.setAttribute('namespace', namespace);

  try {
    const result = await graphClient.readQuery(/* ... */);
    span.setAttribute('result_count', result.records.length);
    return result;
  } catch (error) {
    span.recordException(error);
    throw error;
  } finally {
    span.end();
  }
}
```

---

## Performance Monitoring

### Key Performance Indicators

| KPI | Target | Alert Threshold |
|-----|--------|-----------------|
| Dashboard response time (p95) | < 500ms | > 2s |
| Neo4j query time (p95) | < 100ms | > 1s |
| Gate approval time | < 24h | > 48h |
| Error rate | < 0.1% | > 1% |
| Cache hit ratio | > 90% | < 70% |

### Neo4j Query Analysis

```cypher
// Find slow queries
CALL dbms.listQueries()
YIELD queryId, username, query, elapsedTimeMillis
WHERE elapsedTimeMillis > 1000
RETURN queryId, username, query, elapsedTimeMillis
ORDER BY elapsedTimeMillis DESC;

// Query plan analysis
EXPLAIN MATCH (a:Artifact {tenantId: $tenantId})
RETURN a;

// Profile query
PROFILE MATCH (a:Artifact)-[:DERIVES_FROM*1..5]->(p:Persona)
WHERE a.tenantId = $tenantId
RETURN a, p;
```

### Dashboard Performance

```typescript
// Use React Query for caching
const { data, isLoading } = useQuery({
  queryKey: ['artifacts', namespace],
  queryFn: () => fetchArtifacts(namespace),
  staleTime: 30000, // 30 seconds
  cacheTime: 300000, // 5 minutes
});
```
