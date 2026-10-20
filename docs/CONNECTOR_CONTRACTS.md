# Lily Relay — Connector Contracts

The interview prototype contains no live connectors. A production system should integrate through narrow, least-privilege contracts.

## CRM: Salesforce or HubSpot

Read:

- Account and opportunity identity
- Opportunity owner and stage
- Customer problem and current notes
- Existing approved proof references

Controlled writes:

- FDE-validated scope summary
- Current contract health and next action
- Approved proof card and prohibited language

Never write an unreviewed extraction as customer scope.

## Conversation intelligence: Gong

Read:

- Transcript
- Speaker identity
- Source timestamps
- Call and opportunity identifiers

Output:

- Candidate commitments with citations
- Missing discovery questions

Extraction is evidence for review, not approval.

## Engineering work: Jira or Linear

Read:

- Capability and integration status
- Shipped version
- Dependency status
- Named technical owner

Controlled writes:

- FDE-approved integration task
- Evidence instrumentation task
- Scope-drift corrective task

No task is created solely from a model inference; a named user decision is required.

## Messaging: Slack

Output:

- Decision request
- Missing baseline alert
- Scope-drift risk
- Claim awaiting approval

Every notification contains a deep link to the authoritative Outcome Contract. Slack reactions are not authoritative approvals unless explicitly implemented and verified.

## Platform and evaluation evidence

Read:

- Deployed capability version
- Approval and human-review events
- Evaluation results
- Operational counts
- Measurement window
- Trace or evidence identifier

The connector must provide stable provenance. Aggregated numbers without source lineage remain non-marketable.

## Connector requirements

- OAuth or workload identity; no shared static credentials
- Tenant and account binding
- Least-privilege scopes
- Encrypted tokens
- Idempotency keys for writes
- Bounded retries and timeouts
- Replay protection for webhooks
- Freshness and health status
- Complete audit metadata
- Explicit disconnect and retention behavior
