# ADR-006: Redis for Event Bus

**Status**: Accepted
**Date**: 2024-12-01
**Decision Makers**: Architecture Team

## Context

With 5 federated MCP servers, we needed a mechanism for:
- Asynchronous inter-server communication
- Real-time dashboard updates
- Event sourcing for audit trails
- Pub/sub for notifications

Options considered:
1. **Redis Pub/Sub** - In-memory message broker
2. **Apache Kafka** - Distributed streaming platform
3. **RabbitMQ** - Traditional message broker
4. **Neo4j Streaming** - Native graph change events
5. **Direct HTTP Calls** - Synchronous inter-service

## Decision

We chose **Redis Pub/Sub** as the event bus for inter-server communication.

### Rationale

1. **Simplicity**
   - Simple pub/sub API
   - No complex setup or partitioning
   - Familiar to most developers

2. **Performance**
   - In-memory, sub-millisecond latency
   - Sufficient throughput for our scale
   - Low overhead

3. **Dual Purpose**
   - Events pub/sub
   - Session caching (dashboard)
   - Rate limiting (optional)

4. **Infrastructure Reuse**
   - Already need Redis for dashboard sessions
   - Single service to maintain
   - Reduces operational complexity

5. **Real-Time Support**
   - SSE (Server-Sent Events) for dashboard
   - Live gate notifications
   - Immediate drift alerts

### Event Schema

```typescript
interface HelixEvent {
  type: string;           // e.g., "artifact.created"
  tenantId: string;
  payload: unknown;
  metadata: {
    source: string;       // e.g., "mcp-cascade"
    timestamp: string;    // ISO 8601
    correlationId?: string;
  };
}
```

### Event Types

| Event | Publisher | Subscribers |
|-------|-----------|-------------|
| `persona.discovered` | Discovery | Dashboard, Audit |
| `persona.registered` | Discovery | Graph, Dashboard |
| `artifact.created` | Cascade | Graph, Dashboard, Verification |
| `gate.created` | Cascade | Dashboard, Notifications |
| `gate.approved` | Dashboard | Cascade |
| `drift.detected` | Verification | Dashboard, Alerts |

## Consequences

### Positive
- Simple, fast event delivery
- Real-time dashboard updates
- Easy debugging (subscribe to channels)
- Low operational overhead

### Negative
- No message persistence (fire-and-forget)
- No guaranteed delivery
- Single point of failure (mitigated with Sentinel)
- Limited to Redis cluster scale

### Mitigations
- Critical events also written to Neo4j audit log
- Redis Sentinel for high availability
- Retry logic in publishers
- Idempotent subscribers

## Implementation

```typescript
// Publishing events
import { publishEvent } from '@helix/common/events';

await publishEvent({
  type: 'artifact.created',
  tenantId: 'psychotest',
  payload: { uid, name, layer },
  metadata: { source: 'mcp-cascade', timestamp: new Date().toISOString() }
});

// Subscribing to events
import { subscribeToEvents } from '@helix/common/events';

await subscribeToEvents({
  tenantId: 'psychotest',
  patterns: ['artifact.*', 'gate.*'],
  handler: async (event) => {
    console.log(`Received: ${event.type}`);
  }
});
```

## Channel Structure

```
helix:{tenantId}:events          # Tenant-specific events
helix:global:events              # Platform-wide events
helix:{tenantId}:notifications   # User notifications
```

## Alternatives Rejected

### Apache Kafka
- Overkill for our scale
- Complex operational requirements
- Partitioning not needed
- Higher latency for small messages

### RabbitMQ
- More complex setup
- Different paradigm (queues vs pub/sub)
- Separate service to maintain
- Better for work queues, not events

### Neo4j Streaming
- Would couple events to database
- Less flexible for non-graph events
- Enterprise feature (cost)
- Higher latency

## Related Decisions

- [ADR-002](./002-federated-mcp-servers.md): Inter-server communication
- [ADR-010](./010-nextjs-dashboard.md): Real-time dashboard updates
