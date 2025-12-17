# Layer Reference

Complete reference for all 12 layers in the Helix cascade.

## Layer 0: Persona

**Code**: `persona`

Stakeholder definitions discovered from the Founding Intent.

**Artifact Types**:
- `persona` - Persona definition

**Example UID**: `cpe:app/persona/HIRING-MANAGER`

---

## Layer 1: Business

**Code**: `biz`

Business rules, policies, and constraints.

**Artifact Types**:
- `rule` - Business rule
- `policy` - Business policy
- `constraint` - Business constraint

**Example UID**: `cpe:app/biz/rule/SYSTEM/data-retention`

---

## Layer 2: Requirements

**Code**: `req`

User stories and acceptance criteria.

**Artifact Types**:
- `story` - User story
- `epic` - Epic
- `acceptance` - Acceptance criteria
- `nfr` - Non-functional requirement

**Example UID**: `cpe:app/req/story/HIRING-MANAGER/view-results`

---

## Layer 3: Design

**Code**: `des`

UX/UI designs and wireframes.

**Artifact Types**:
- `wireframe` - Wireframe
- `mockup` - High-fidelity mockup
- `flow` - User flow
- `prototype` - Interactive prototype

**Example UID**: `cpe:app/des/wireframe/HIRING-MANAGER/results-view`

---

## Layer 4: Architecture

**Code**: `arc`

System architecture and decisions.

**Artifact Types**:
- `adr` - Architecture Decision Record
- `diagram` - Architecture diagram
- `component` - Component specification
- `interface` - Interface definition

**Example UID**: `cpe:app/arc/adr/SYSTEM/ADR-001`

---

## Layer 5: API

**Code**: `api`

API specifications and contracts.

**Artifact Types**:
- `endpoint` - REST endpoint
- `schema` - Data schema
- `event` - Event definition
- `graphql` - GraphQL type

**Example UID**: `cpe:app/api/endpoint/SYSTEM/get-results`

---

## Layer 6: Data

**Code**: `dat`

Database schemas and migrations.

**Artifact Types**:
- `schema` - Database schema
- `migration` - Database migration
- `erd` - Entity-relationship diagram
- `index` - Index definition

**Example UID**: `cpe:app/dat/schema/SYSTEM/assessments`

---

## Layer 7: Security

**Code**: `sec`

Security policies and configurations.

**Artifact Types**:
- `rbac` - RBAC policy
- `rls` - Row-level security
- `threat` - Threat model
- `audit` - Audit configuration

**Example UID**: `cpe:app/sec/rbac/SYSTEM/results-access`

---

## Layer 8: Implementation

**Code**: `imp`

Source code.

**Artifact Types**:
- `module` - Module/package
- `class` - Class
- `function` - Function
- `handler` - Request handler
- `component` - UI component

**Example UID**: `cpe:app/imp/handler/HM/results-handler`

---

## Layer 9: Testing

**Code**: `tst`

Test cases and fixtures.

**Artifact Types**:
- `unit` - Unit test
- `integration` - Integration test
- `e2e` - End-to-end test
- `fixture` - Test fixture

**Example UID**: `cpe:app/tst/unit/HM/results-handler.test`

---

## Layer 10: Compliance

**Code**: `cmp`

Audit artifacts and compliance documentation.

**Artifact Types**:
- `gdpr` - GDPR artifact
- `audit` - Audit log
- `certification` - Certification document
- `evidence` - Compliance evidence

**Example UID**: `cpe:app/cmp/gdpr/SYSTEM/article-30`

---

## Layer 11: Infrastructure

**Code**: `inf`

Infrastructure as Code.

**Artifact Types**:
- `terraform` - Terraform config
- `kubernetes` - K8s manifest
- `docker` - Dockerfile
- `helm` - Helm chart

**Example UID**: `cpe:app/inf/kubernetes/SYSTEM/deployment`

---

## Layer 12: Documentation

**Code**: `doc`

User and developer documentation.

**Artifact Types**:
- `guide` - User guide
- `api` - API documentation
- `readme` - README file
- `changelog` - Changelog

**Example UID**: `cpe:app/doc/guide/HIRING-MANAGER/user-guide`
