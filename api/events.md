# Events API

Helix uses Redis pub/sub for event-driven communication between MCP servers.

## Event Types

| Event | Description |
|-------|-------------|
| `artifact.created` | New artifact created |
| `artifact.updated` | Artifact modified |
| `artifact.deleted` | Artifact removed |
| `persona.discovered` | New persona found |
| `persona.registered` | Persona written to graph |
| `gate.requested` | Gate approval requested |
| `gate.approved` | Gate approved |
| `gate.rejected` | Gate rejected |
| `conflict.detected` | Requirement conflict found |
| `drift.detected` | Spec/impl drift found |

## Event Structure

```typescript
interface Event {
  type: string;
  payload: {
    uid?: string;
    tenant_id: string;
    timestamp: string;
    actor?: string;
    metadata?: Record<string, unknown>;
  };
}
```

## Subscribing to Events

```typescript
import { createEventBus } from '@helix/common';

const bus = await createEventBus(config);

bus.subscribe('artifact.created', async (event) => {
  console.log(`New artifact: ${event.payload.uid}`);
});

bus.subscribe('gate.approved', async (event) => {
  console.log(`Gate ${event.payload.gate_number} approved`);
});
```

## Publishing Events

```typescript
await bus.publish({
  type: 'artifact.created',
  payload: {
    uid: 'cpe:app/req/story/USER/login',
    tenant_id: 'acme',
    timestamp: new Date().toISOString()
  }
});
```

## Tenant Isolation

Events are scoped by tenant:

```typescript
// Only receives events for 'acme' tenant
bus.subscribe('artifact.*', handler, { tenant_id: 'acme' });
```
