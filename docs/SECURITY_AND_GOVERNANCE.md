# Lily Relay — Security and Governance

## Governing principle

Model output is a proposal. Human decisions and source-system evidence are authoritative.

## Role boundaries

- Sales may capture and clarify commitments but cannot validate feasibility.
- FDE may validate technical truth but cannot authorize market claims.
- Product may approve outcome wording but cannot override contradictory shipped evidence.
- Legal and customer clearance are required for external publication when applicable.
- Administrators manage access but cannot silently alter prior audit events.

## Default-deny rules

- Missing source citation blocks commitment review.
- Missing technical decision blocks scope.
- Missing baseline plan blocks proof readiness.
- Missing measurement window blocks claim generation.
- Contradictory evidence blocks claim approval.
- Missing customer/legal clearance blocks external publication.
- Stale or unhealthy connectors mark evidence non-current.

## Data minimization

- Store structured excerpts and source references where possible.
- Avoid copying complete customer calls into unnecessary systems.
- Redact secrets, credentials, personal data, and protected fields before model use.
- Configure retention by evidence class.
- Keep interview demonstration data synthetic.

## Audit requirements

Record:

- Who acted
- Which role authorized the action
- What changed
- Previous and new values
- Source evidence
- Decision reason
- Timestamp
- Connector response ID
- Model and prompt version when AI contributed

## Claim classes

- **Verified:** direct, source-linked production evidence
- **Customer reported:** supplied by customer but not independently derived
- **Estimated:** calculated from visible customer assumptions
- **Hypothesis:** not yet measured
- **Denied:** contradicted or insufficiently supported

Only verified or appropriately qualified customer-reported claims may enter approved sales enablement.
