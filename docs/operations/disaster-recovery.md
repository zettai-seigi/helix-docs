# Disaster Recovery Guide

Procedures for backup, recovery, and business continuity.

## Recovery Objectives

| Metric | Target | Description |
|--------|--------|-------------|
| **RPO** (Recovery Point Objective) | 1 hour | Maximum data loss acceptable |
| **RTO** (Recovery Time Objective) | 4 hours | Maximum downtime acceptable |
| **MTTR** (Mean Time to Recovery) | 2 hours | Average recovery time |

## Backup Strategy

### Backup Schedule

| Component | Frequency | Retention | Type |
|-----------|-----------|-----------|------|
| Neo4j | Hourly | 7 days | Incremental |
| Neo4j | Daily | 30 days | Full |
| Neo4j | Weekly | 1 year | Full (offsite) |
| Redis | Hourly | 24 hours | RDB snapshot |
| Configuration | On change | 90 days | Git + S3 |
| Secrets | On change | 90 days | Vault snapshots |

### Neo4j Backup

#### Online Backup (Enterprise)

```bash
#!/bin/bash
# scripts/backup-neo4j.sh

BACKUP_DIR="/backups/neo4j"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_PATH="${BACKUP_DIR}/neo4j_${TIMESTAMP}"

# Create backup directory
mkdir -p "${BACKUP_DIR}"

# Online backup (Enterprise only)
neo4j-admin backup \
  --database=neo4j \
  --backup-dir="${BACKUP_PATH}" \
  --include-metadata=all

# Compress
tar -czf "${BACKUP_PATH}.tar.gz" -C "${BACKUP_DIR}" "neo4j_${TIMESTAMP}"
rm -rf "${BACKUP_PATH}"

# Upload to S3
aws s3 cp "${BACKUP_PATH}.tar.gz" "s3://helix-backups/neo4j/"

# Cleanup old local backups (keep 7 days)
find "${BACKUP_DIR}" -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: ${BACKUP_PATH}.tar.gz"
```

#### Dump Backup (Community)

```bash
#!/bin/bash
# scripts/backup-neo4j-dump.sh

BACKUP_DIR="/backups/neo4j"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
DUMP_FILE="${BACKUP_DIR}/neo4j_${TIMESTAMP}.dump"

# Stop database for consistent dump
docker-compose stop neo4j

# Create dump
docker-compose run --rm neo4j \
  neo4j-admin dump \
  --database=neo4j \
  --to=/data/backup.dump

# Copy out of container
docker cp helix-neo4j:/data/backup.dump "${DUMP_FILE}"

# Restart database
docker-compose start neo4j

# Compress and upload
gzip "${DUMP_FILE}"
aws s3 cp "${DUMP_FILE}.gz" "s3://helix-backups/neo4j/"

echo "Dump completed: ${DUMP_FILE}.gz"
```

#### Docker Volume Backup

```bash
#!/bin/bash
# scripts/backup-neo4j-volume.sh

BACKUP_DIR="/backups/neo4j"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Stop Neo4j
docker-compose stop neo4j

# Backup volume
docker run --rm \
  -v helix_neo4j_data:/source:ro \
  -v ${BACKUP_DIR}:/backup \
  alpine tar -czf /backup/neo4j_data_${TIMESTAMP}.tar.gz -C /source .

# Restart Neo4j
docker-compose start neo4j

# Upload to S3
aws s3 cp "${BACKUP_DIR}/neo4j_data_${TIMESTAMP}.tar.gz" "s3://helix-backups/neo4j/"
```

### Redis Backup

```bash
#!/bin/bash
# scripts/backup-redis.sh

BACKUP_DIR="/backups/redis"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Trigger RDB save
docker exec helix-redis redis-cli -a "${REDIS_PASSWORD}" BGSAVE

# Wait for save to complete
sleep 5

# Copy RDB file
docker cp helix-redis:/data/dump.rdb "${BACKUP_DIR}/redis_${TIMESTAMP}.rdb"

# Compress and upload
gzip "${BACKUP_DIR}/redis_${TIMESTAMP}.rdb"
aws s3 cp "${BACKUP_DIR}/redis_${TIMESTAMP}.rdb.gz" "s3://helix-backups/redis/"

echo "Redis backup completed"
```

### Configuration Backup

```bash
#!/bin/bash
# scripts/backup-config.sh

BACKUP_DIR="/backups/config"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Backup config files
tar -czf "${BACKUP_DIR}/config_${TIMESTAMP}.tar.gz" \
  helix.config.yaml \
  docker-compose.yml \
  docker-compose.prod.yml \
  policies/ \
  ontologies/

# Upload to S3
aws s3 cp "${BACKUP_DIR}/config_${TIMESTAMP}.tar.gz" "s3://helix-backups/config/"
```

### Automated Backup Cron

```cron
# /etc/cron.d/helix-backups

# Neo4j hourly incremental
0 * * * * root /opt/helix/scripts/backup-neo4j.sh >> /var/log/helix-backup.log 2>&1

# Neo4j daily full
0 2 * * * root /opt/helix/scripts/backup-neo4j-full.sh >> /var/log/helix-backup.log 2>&1

# Redis hourly
30 * * * * root /opt/helix/scripts/backup-redis.sh >> /var/log/helix-backup.log 2>&1

# Config on change (via inotify or git hook)
```

---

## Recovery Procedures

### Scenario 1: Neo4j Data Corruption

**Symptoms**:
- Database errors in logs
- Queries returning inconsistent data
- Neo4j failing to start

**Recovery Steps**:

```bash
# 1. Stop all services
docker-compose down

# 2. Download latest backup from S3
aws s3 cp s3://helix-backups/neo4j/latest.tar.gz /tmp/

# 3. Extract backup
tar -xzf /tmp/latest.tar.gz -C /tmp/neo4j-restore

# 4. Remove corrupted data
docker volume rm helix_neo4j_data

# 5. Restore from backup
docker-compose run --rm neo4j \
  neo4j-admin load \
  --database=neo4j \
  --from=/tmp/neo4j-restore/backup.dump \
  --force

# 6. Start services
docker-compose up -d

# 7. Verify data integrity
docker exec helix-neo4j cypher-shell \
  -u neo4j -p "${NEO4J_PASSWORD}" \
  "MATCH (n) RETURN labels(n), count(n)"
```

### Scenario 2: Complete Infrastructure Loss

**Symptoms**:
- All services unavailable
- Server/cluster failure
- Data center outage

**Recovery Steps**:

```bash
# 1. Provision new infrastructure
terraform apply -target=module.helix_infrastructure

# 2. Deploy Helix stack
kubectl apply -f k8s/

# 3. Restore Neo4j from offsite backup
aws s3 cp s3://helix-backups-offsite/neo4j/latest.dump.gz /tmp/
gunzip /tmp/latest.dump.gz
kubectl cp /tmp/latest.dump helix/neo4j-0:/tmp/
kubectl exec -n helix neo4j-0 -- neo4j-admin load \
  --database=neo4j --from=/tmp/latest.dump --force

# 4. Restore Redis (if needed)
aws s3 cp s3://helix-backups-offsite/redis/latest.rdb.gz /tmp/
gunzip /tmp/latest.rdb.gz
kubectl cp /tmp/latest.rdb helix/redis-0:/data/dump.rdb
kubectl rollout restart statefulset/redis -n helix

# 5. Restore secrets
vault operator unseal
vault read secret/data/helix > /tmp/secrets.json
kubectl create secret generic helix-secrets --from-file=/tmp/secrets.json -n helix

# 6. Verify all services
kubectl get pods -n helix
curl https://dashboard.example.com/api/health

# 7. Run verification
kubectl exec -n helix deployment/mcp-verification -- \
  node dist/tools/verify-coverage.js
```

### Scenario 3: Accidental Data Deletion

**Symptoms**:
- Missing personas or artifacts
- Broken traceability links
- User reports missing data

**Recovery Steps**:

```bash
# 1. Identify what was deleted (from audit log)
docker exec helix-neo4j cypher-shell \
  -u neo4j -p "${NEO4J_PASSWORD}" \
  "MATCH (l:AuditLog {action: 'delete'})
   WHERE l.timestamp > datetime() - duration('PT1H')
   RETURN l"

# 2. Point-in-time recovery (if available)
# Restore to a backup just before deletion

# 3. Selective restore from backup
# Extract specific nodes from backup dump

# 4. Re-run cascade for affected artifacts
# (if derivation data is intact)
```

### Scenario 4: Security Breach

**Symptoms**:
- Unauthorized access detected
- Data exfiltration suspected
- Malicious modifications found

**Recovery Steps**:

```bash
# 1. Immediate containment
# - Revoke all API keys
# - Block external access
# - Isolate affected systems

# 2. Assess damage
# - Review audit logs
# - Check for modifications
# - Identify compromised data

# 3. Restore from last known good backup
# (before breach timeline)

# 4. Reset all credentials
./scripts/rotate-all-secrets.sh

# 5. Re-provision infrastructure
terraform destroy && terraform apply

# 6. Restore data
./scripts/restore-neo4j.sh /backups/pre-breach.dump

# 7. Security review
# - Patch vulnerabilities
# - Update firewall rules
# - Enable additional monitoring
```

---

## Failover Procedures

### Neo4j Cluster Failover

```bash
# Check cluster status
docker exec helix-neo4j cypher-shell \
  "CALL dbms.cluster.overview()"

# Force leader election (if needed)
docker exec helix-neo4j cypher-shell \
  "CALL dbms.cluster.routing.getRoutingTable()"

# Add new follower
docker-compose scale neo4j=3
```

### Redis Sentinel Failover

```bash
# Check sentinel status
redis-cli -p 26379 SENTINEL masters

# Force failover
redis-cli -p 26379 SENTINEL failover helix-master

# Check new master
redis-cli -p 26379 SENTINEL get-master-addr-by-name helix-master
```

### Dashboard Blue-Green Deployment

```bash
# Deploy to green environment
kubectl apply -f k8s/dashboard-green.yaml

# Test green deployment
curl https://dashboard-green.example.com/api/health

# Switch traffic
kubectl patch ingress helix-ingress -p '
  {"spec":{"rules":[{"host":"dashboard.example.com",
   "http":{"paths":[{"backend":{"serviceName":"dashboard-green"}}]}}]}}'

# Verify
curl https://dashboard.example.com/api/health

# Cleanup old blue deployment
kubectl delete -f k8s/dashboard-blue.yaml
```

---

## Testing Disaster Recovery

### DR Test Schedule

| Test Type | Frequency | Duration |
|-----------|-----------|----------|
| Backup verification | Weekly | 1 hour |
| Single component restore | Monthly | 2 hours |
| Full DR drill | Quarterly | 8 hours |
| Chaos engineering | Ongoing | N/A |

### Backup Verification Test

```bash
#!/bin/bash
# scripts/verify-backup.sh

# Download latest backup
aws s3 cp s3://helix-backups/neo4j/latest.dump.gz /tmp/test-restore/

# Start isolated Neo4j instance
docker run -d --name neo4j-test \
  -e NEO4J_AUTH=neo4j/testpassword \
  -v /tmp/test-restore:/data \
  neo4j:5.25

# Restore backup
docker exec neo4j-test neo4j-admin load \
  --database=neo4j --from=/data/latest.dump --force

# Verify data
docker exec neo4j-test cypher-shell \
  -u neo4j -p testpassword \
  "MATCH (n) RETURN labels(n), count(n)"

# Run integrity checks
docker exec neo4j-test cypher-shell \
  -u neo4j -p testpassword \
  "CALL db.constraints()"

# Cleanup
docker rm -f neo4j-test
rm -rf /tmp/test-restore

echo "Backup verification complete"
```

### Full DR Drill Checklist

- [ ] Notify stakeholders of planned test
- [ ] Document current state (node counts, relationships)
- [ ] Simulate failure (stop primary systems)
- [ ] Execute recovery procedures
- [ ] Measure RTO (time to restore service)
- [ ] Verify data integrity (compare to pre-drill state)
- [ ] Calculate RPO (data loss since last backup)
- [ ] Document issues encountered
- [ ] Update runbooks based on findings
- [ ] Report results to management

---

## Capacity Planning

### Growth Projections

| Metric | Current | 6 months | 1 year |
|--------|---------|----------|--------|
| Personas | 50 | 200 | 500 |
| Artifacts | 1,000 | 10,000 | 50,000 |
| Relationships | 5,000 | 50,000 | 250,000 |
| Daily queries | 10,000 | 100,000 | 500,000 |
| Storage (Neo4j) | 1 GB | 10 GB | 50 GB |
| Storage (Backups) | 10 GB | 100 GB | 500 GB |

### Scaling Triggers

| Metric | Warning | Critical | Action |
|--------|---------|----------|--------|
| CPU usage | 70% | 85% | Add replicas |
| Memory usage | 75% | 90% | Increase limits |
| Disk usage | 70% | 85% | Expand storage |
| Query latency (p95) | 500ms | 1s | Optimize/scale |
| Error rate | 0.5% | 1% | Investigate |
