# Lily Relay — AWS Reference Architecture

This is a production reference design, not the architecture of the static interview prototype.

## Services

| Concern | AWS service | Purpose |
|---|---|---|
| Web application | Amplify Hosting or S3 + CloudFront | Private responsive interface |
| Identity | Amazon Cognito | User authentication and role claims |
| API | API Gateway + AWS Lambda | Typed commands and read models |
| Workflow | AWS Step Functions | Human-gated Outcome Contract transitions |
| Events | Amazon EventBridge | Connector and lifecycle events |
| Queues | Amazon SQS + dead-letter queues | Reliable connector work and retries |
| AI extraction | Amazon Bedrock | Transcript extraction and candidate claim generation |
| Transactional data | Amazon Aurora PostgreSQL | Outcome Contracts, decisions, evidence, and audit relationships |
| Evidence artifacts | Amazon S3 | Source documents and immutable evidence packages |
| Secrets | AWS Secrets Manager | Connector credentials and rotation |
| Encryption | AWS KMS | Tenant and connector encryption keys |
| Observability | CloudWatch + X-Ray | Metrics, traces, alarms, and workflow failures |
| Audit | CloudTrail plus append-only application events | Administrative and business-action history |

## Command flow

```text
User or connector
  → API Gateway
  → authorizing Lambda
  → validate role + contract version + prerequisites
  → Step Functions human-gated workflow
  → Aurora transaction
  → EventBridge domain event
  → connector-specific SQS queue
  → least-privilege connector Lambda
  → external system
  → audit event + observable result
```

## AI safety boundary

Bedrock may:

- Extract candidate commitments
- Suggest missing questions
- Normalize customer language
- Draft candidate claims
- Explain detected differences

Bedrock may not:

- Approve technical feasibility
- Advance lifecycle state
- Release a market claim
- Publish externally
- Change a CRM record without a validated command

Model output is stored with source citations, model identifier, prompt version, timestamp, and reviewer decision.

## Reliability controls

- Optimistic versioning prevents lost decisions.
- Idempotency keys prevent duplicate connector writes.
- SQS dead-letter queues retain failed actions.
- Step Functions records human approvals and timeouts.
- Connector health and evidence freshness affect contract health.
- Every external write returns a source-system identifier.
- A failed connector action never becomes a successful audit event.

## Tenant isolation

- Organization ID required on every business record
- Cognito claims mapped to organization membership
- PostgreSQL row-level security
- Per-tenant connector credential binding
- Tenant-scoped S3 prefixes and KMS context
- No cross-tenant AI retrieval

## Production path

1. Build authenticated single-tenant pilot.
2. Verify one CRM, one conversation source, and one engineering tracker.
3. Add Aurora RLS and connector secret rotation.
4. Run threat model and penetration test.
5. Complete two-tenant isolation verification.
6. Add customer/legal approval workflow.
7. Expand connectors only from proven internal demand.
