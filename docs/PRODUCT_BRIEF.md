# Lily Relay — Product Brief

## Product thesis

Complex B2B companies do not only sell finished software. The real outcome is shaped during discovery, validated by FDE, changed during implementation, measured by Product, and reused by Sales. Existing CRMs, call recorders, delivery trackers, product systems, and collaboration tools each contain part of that truth. None owns the complete chain.

Lily Relay is the workflow-aware coordination layer that keeps what is **sold, scoped, shipped, proven, and reused** consistent—without forcing teams to replace the tools or operating model they already trust.

## Users and decision rights

| User | Owns | Cannot unilaterally decide |
|---|---|---|
| Sales | Customer problem, commercial context, commitments, relationship | Technical feasibility or approved market claims |
| FDE | Feasibility, integrations, controls, shipped scope, technical evidence | Customer positioning or market language |
| Product | Outcome definition, proof requirements, product truth, release language | Technical feasibility or customer authorization |

## Core object: Outcome Contract

An Outcome Contract contains:

- Customer problem and desired outcome
- Source-linked seller commitments
- Required systems and dependencies
- FDE decisions and conditions
- Human approval boundaries
- Measurement plan and baseline owners
- Shipped scope and exceptions
- Production evidence and measurement window
- Candidate, approved, denied, and held claims
- Distributed sales assets
- Immutable audit events

## Lifecycle

1. **Promised** — Sales commitments are extracted but not assumed true.
2. **Scoped** — FDE approves, conditions, or rejects each commitment.
3. **Shipped** — Deployed behavior is reconciled with the scoped promise.
4. **Proven** — Bounded evidence is attached to the original commitment.
5. **Marketable** — Product releases exact language and prohibited language to Sales.

## Default-deny gates

- No commitment becomes scope without an FDE decision.
- No deployment is proof-ready without a measurement owner and baseline plan.
- No production metric becomes a claim without a source and measurement window.
- No claim becomes marketable without technical validation and Product approval.
- Customer and legal clearance remain separate required states for external publication.

## MVP scope

- Opportunity portfolio and health
- Transcript-to-commitment extraction
- FDE decision queue
- Product outcome plan
- Promise-to-reality diff
- Evidence import
- Claim release gate
- Sales proof-card generation
- Audit trail
- Workflow-fit mapping across existing systems and handoffs
- Role views for Sales, FDE, and Product
- Simulated connector contracts

## Explicit non-goals

- Replacing Salesforce, HubSpot, Gong, Jira, Linear, Slack, or product telemetry
- Automatically approving technical feasibility
- Automatically publishing customer claims
- Estimating revenue without customer-provided assumptions
- Using real customer data in the interview prototype
- Presenting the concept as an adopted customer system before validation

## Success measures

- Time from discovery call to reviewed commitments
- Percentage of commitments with explicit FDE decisions
- Percentage of pilots with baseline evidence before launch
- Number of scope changes returned to Sales before customer surprise
- Percentage of published claims with complete provenance
- Time from proven outcome to seller-ready enablement
- Reuse of approved proof across relevant opportunities
