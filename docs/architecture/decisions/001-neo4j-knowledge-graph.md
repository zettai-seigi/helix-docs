# ADR-001: Neo4j for Knowledge Graph

**Status**: Accepted
**Date**: 2024-12-01
**Decision Makers**: Architecture Team

## Context

Helix requires a database to store:
- Personas with relationships to artifacts
- Artifacts across 12 layers with traceability links
- Complex queries for lineage, impact analysis, and conflict detection
- Multi-tenant data with row-level isolation

Options considered:
1. **PostgreSQL** - Relational database with JSON support
2. **Neo4j** - Native graph database
3. **Amazon Neptune** - Managed graph database
4. **MongoDB** - Document database with graph queries
5. **ArangoDB** - Multi-model database

## Decision

We chose **Neo4j** as the primary data store for the Helix Knowledge Graph.

### Rationale

1. **Native Graph Model**
   - Artifacts and relationships are naturally graph-shaped
   - Traceability queries are graph traversals
   - No impedance mismatch between domain and storage model

2. **Cypher Query Language**
   - Expressive pattern matching for complex queries
   - Built-in path finding algorithms
   - Variable-length relationships for lineage queries

   ```cypher
   // Find all artifacts derived from a persona
   MATCH (p:Persona {uid: $uid})-[:DERIVES_FROM*]->(a:Artifact)
   RETURN a
   ```

3. **Performance**
   - Index-free adjacency for O(1) relationship traversal
   - Sub-millisecond queries for typical graph depths
   - Scales to millions of nodes

4. **APOC Library**
   - Rich set of procedures for advanced operations
   - Path expansion, graph algorithms, data integration
   - Reduces custom code requirements

5. **Community & Enterprise Options**
   - Free Community Edition for development
   - Enterprise features (clustering, causal consistency) available
   - Active community and commercial support

## Consequences

### Positive
- Natural mapping of domain model to database
- Efficient traceability and impact queries
- Flexible schema evolution (add properties/labels without migrations)
- Built-in visualization in Neo4j Browser

### Negative
- Different query language (Cypher) requires learning curve
- Less mature ecosystem compared to PostgreSQL
- Enterprise features require paid license
- Not as widely deployed (fewer managed service options)

### Mitigations
- Use `@helix/common` to abstract database access
- Document common Cypher patterns
- Consider PostgreSQL for analytics/reporting (CQRS pattern)

## Alternatives Rejected

### PostgreSQL
- Would require complex recursive CTEs for graph queries
- JSON columns for flexible attributes but poor query performance
- Better for tabular data, not graph structures

### Amazon Neptune
- Vendor lock-in to AWS
- Higher cost than self-hosted Neo4j
- Less rich query language (limited SPARQL/Gremlin)

### MongoDB
- Graph queries via $graphLookup are limited
- No native path finding or graph algorithms
- Document model doesn't fit well

## Related Decisions

- [ADR-006](./006-redis-event-bus.md): Redis for events (not Neo4j streaming)
- [ADR-008](./008-multi-tenant-isolation.md): Tenant isolation via labels
