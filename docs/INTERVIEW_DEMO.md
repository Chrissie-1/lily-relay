# Lily Relay — 30-Minute VP Interview Plan

## Objective

Demonstrate operational product judgment, not the amount of interface code. The argument is that complex B2B work needs a workflow-aware coordination layer connecting Sales, FDE, Product, and production evidence.

## 0:00–2:00 — Opening

Say:

> I identified a structural problem in complex B2B operations: the promise is made in Sales, interpreted by FDE, changed during delivery, and reconstructed by Product after results appear. Every tool stores part of that truth, but none coordinates the full chain. Lily Relay learns the company's existing workflow and turns it into one shared operating contract.

Clarify:

- Independent, company-agnostic product concept
- Synthetic data and simulated integrations
- Functional decision workflow

## 2:00–5:00 — Workflow fit and product model

Map the CRM, conversation source, delivery system, and collaboration channel. Emphasize: “Configure the coordination, not the company.” Then show the control room and explain:

`PROMISED → SCOPED → SHIPPED → PROVEN → MARKETABLE`

Point to the three role views and Outcome Contract.

## 5:00–12:00 — Live workflow

1. Extract five commitments from the synthetic call.
2. Switch to FDE view.
3. Approve the supported workflow.
4. Condition the response-time target and launch date.
5. Reject the unsupported conversion promise.
6. Commit validated scope and show created actions.

Do not click slowly through every explanation. Narrate the decision boundary.

## 12:00–17:00 — Proof and reconciliation

1. Switch to Product view.
2. Show the positioning hypothesis and prohibited language.
3. Create the proof plan.
4. Load deployment reality.
5. Show the inventory dependency and blocked revenue claim.
6. Import the bounded 30-day evidence.

Key point:

> Product defines the evidence required before launch—not after launch when the team is trying to reconstruct a success story.

## 17:00–21:00 — Claim gate and execution

1. Approve the bounded volume claim.
2. Deny the autonomy claim.
3. Request evidence for the revenue claim.
4. Release approved proof.
5. Show the generated Salesforce proof card, talk track, battlecard evidence, and audit log.

## 21:00–24:00 — AWS architecture

Explain:

- Cognito for identity and roles
- Aurora PostgreSQL for relational truth and RLS
- Step Functions for human-gated transitions
- EventBridge and SQS for connector reliability
- Bedrock for extraction and drafting only
- KMS, Secrets Manager, CloudWatch, and CloudTrail for control

Emphasize that AI proposes; authorized humans advance state.

## 24:00–27:00 — Business value

- Fewer unsupported promises
- Less FDE rework
- Baselines captured before deployment
- Faster conversion of delivered outcomes into credible, reusable proof
- Consistent seller language
- Auditable claim governance

## 27:00–30:00 — Discussion

Ask:

> Where does the greatest context loss happen today: Sales to FDE, deployment to proof, or proof back to Sales?

This turns the prototype into a strategic conversation instead of a feature presentation.

## Expected objections

### “Couldn’t Salesforce or Jira do this?”

They store deals and tasks. Lily Relay owns the reconciliation object and the controlled transition between commercial promise, technical reality, evidence, and market language.

### “Why involve Product before deployment?”

Without an agreed baseline and measurement method, successful work may never become defensible proof.

### “Is the AI making approval decisions?”

No. AI extracts and drafts. Sales, FDE, Product, Legal, and the customer retain explicit decision authority.

### “Why not build all connectors immediately?”

The interview prototype proves the operating model first. Production connectors should be added from actual internal demand with least-privilege scopes and verified write contracts.
