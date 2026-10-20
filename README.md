# Lily Relay

Lily Relay is a workflow-aware coordination layer for Sales, Forward-Deployed Engineering (FDE), and Product. It learns how a company already works across its CRM, conversations, delivery tools, and collaboration channels, then coordinates the handoffs through a shared **Outcome Contract**.

It does not replace the systems teams already use. It turns the decisions scattered across them into one accountable operating path.

The contract controls one lifecycle:

`PROMISED → SCOPED → SHIPPED → PROVEN → MARKETABLE`

## What the prototype proves

- A sales transcript can become reviewable commitments.
- FDE must approve, condition, or reject every commitment before scope is committed.
- Product defines the outcome and proof plan before deployment.
- Shipped reality is compared with the promise and creates corrective actions.
- Production evidence generates candidate claims.
- Claims are blocked by default until explicitly decided.
- Approved proof returns to Sales as usable enablement.

## Demonstration boundary

- All account and transcript data is synthetic.
- Public case-study figures are clearly bounded evidence, not prototype-generated outcomes.
- Connector behavior is simulated; no external credentials or customer data are used.
- This is an independent product prototype, not a representation of any company's adopted internal system.

## Run locally

Serve the `dist` directory with any static HTTP server. For example:

```powershell
python -m http.server 4173 --directory .\dist
```

Open `http://127.0.0.1:4173/`.

## Repository map

- `dist/` — working application
- `docs/PRODUCT_BRIEF.md` — product definition and scope
- `docs/POSITIONING.md` — category, audience, and unique value proposition
- `docs/AWS_ARCHITECTURE.md` — production reference architecture
- `docs/DATA_MODEL.md` — core records and transitions
- `docs/CONNECTOR_CONTRACTS.md` — integration boundaries
- `docs/SECURITY_AND_GOVERNANCE.md` — default-deny controls
- `docs/INTERVIEW_DEMO.md` — 30-minute VP interview flow
- `docs/BUILD_STATUS.md` — working, simulated, and production-required boundaries
- `scripts/verify.mjs` — dependency-free static contract verification
- `scripts/e2e.mjs` — Chrome DevTools end-to-end workflow check

## Current status

Interview-grade prototype. The complete synthetic workflow is browser-tested, including workflow mapping, cross-functional decision gates, reconciliation, and proof release. Run `node scripts/verify.mjs` before presenting. Production implementation would require identity, durable storage, live connector verification, customer-data governance, and customer-specific workflow contracts.
