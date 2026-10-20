# Lily Relay — implementation status

This document keeps the interview demonstration honest. It separates working behavior from simulated integrations and production work.

## Working in the interview build

- Persistent browser state for one executable Outcome Contract.
- A workflow-fit scan that maps the CRM, conversation source, delivery system, and collaboration channel before execution.
- Sales commitment extraction into five structured records.
- FDE approve, condition, or reject decisions on every commitment.
- A hard gate that prevents scope commitment until all five decisions exist.
- Product outcome-plan creation with required metrics and denied language.
- Promise-to-scope-to-shipped reconciliation with system actions.
- Evidence import followed by a default-deny claim gate.
- Release of approved proof into three seller-facing asset types.
- Role views for Sales, FDE, and Product.
- An audit trail for every important action.
- A portable JSON export and a copyable executive brief.
- A one-click synthetic presentation mode that completes the entire lifecycle.
- Working detail views for portfolio risks, released proof, talk tracks, battlecards, and clearance tasks.
- Resettable synthetic demonstration data.

## Simulated by design

- Transcript extraction uses a prepared synthetic conversation.
- Salesforce, Gong, Jira/Linear, Slack, product telemetry, and evaluation events are represented by deterministic local actions.
- Atlas Industrial Supply, Meridian Logistics, and Northstar Field Service are fictional accounts.
- The first-30-day figures demonstrate bounded evidence behavior; they are not presented as customer-verified claims in this prototype.

## Required for a production pilot

1. Confirm the current Sales-to-FDE handoff and name one pilot opportunity.
2. Map CRM, call-intelligence, delivery, evaluation, and task-system fields to the connector contracts.
3. Add SSO, role-based access, tenant isolation, encryption, secrets management, retention, and immutable audit storage.
4. Replace deterministic extraction with a versioned extraction service and human review.
5. Add webhook ingestion, retries, idempotency, dead-letter handling, and reconciliation jobs.
6. Test outcome governance with Sales, FDE, Product, Legal, and Security.
7. Measure pilot impact: handoff latency, scope corrections before kickoff, evidence completeness, proof release time, and seller reuse.

## Interview-safe statement

“This is a working product thesis for workflow-aware cross-functional operations. The workflow executes end to end with synthetic data. The connector contracts and AWS reference design show how Relay can adapt to a company's actual systems, decision rights, and handoffs before production rollout.”
