# Lily Relay — Data Model

## Principal records

### Organization

Tenant boundary, policies, identity provider, retention, and connector configuration.

### Workflow Profile

The organization's real operating pattern: systems of record, source events, handoffs, decision rights, approval boundaries, terminology, and controlled write destinations. Relay uses this profile to fit coordination to the company rather than forcing a generic process.

### User

Belongs to an organization and has one or more roles: Sales, FDE, Product, Legal, Customer Success, or Administrator.

### Opportunity

External CRM identity, account, owner, stage, vertical, value hypothesis, and active Outcome Contract.

### Outcome Contract

The authoritative reconciliation record. Contains lifecycle state, owners, health, next action, and links to all source evidence.

### Commitment

Exact source statement, speaker, timestamp, normalized promise, type, risk, FDE decision, conditions, and disposition.

### Scope Item

Capability, system dependency, control boundary, owner, target date, shipped state, and source commitment.

### Proof Plan

Positioning hypothesis, alternative displaced, buyer, baseline, metric definitions, owners, sources, and measurement windows.

### Evidence

Source system, metric, value, unit, observation window, lineage, collection timestamp, confidence, and clearance state.

### Claim

Candidate wording, supporting evidence, contradictions, approval decision, approved wording, prohibited wording, and allowed channels.

### Asset

Sales proof card, talk track, battlecard evidence, case-study draft, or analyst briefing block generated from approved claims.

### Audit Event

Actor, role, action, object, previous state, new state, timestamp, reason, and connector request identifier.

## State transitions

Only named commands may advance the contract:

- `capture_commitments`
- `commit_validated_scope`
- `approve_proof_plan`
- `record_shipped_scope`
- `attach_production_evidence`
- `decide_claim`
- `release_market_proof`

Each command is idempotent, authorized by role, recorded in the audit log, and rejected when prerequisites are missing.
