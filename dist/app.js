const examples = {
  quote: {
    input: `Subject: RFQ — contactors for three branches\n\nNeed 24 Siemens contactors compatible with our existing panels. Please quote contract pricing and delivery to Newark, Allentown and Edison. Substitute an equivalent model if the requested SKU is unavailable, but keep gross margin above our regional floor.`,
    accepted: true,
    reason: 'The work combines unstructured demand, company-specific pricing judgment, cross-system action and a measurable commercial outcome.',
    criteria: [
      ['Repeated operational volume', true, 'Inbound RFQs are a recurring queue, not a one-off request.'],
      ['Company-specific judgment', true, 'Compatibility, substitution, contract pricing and margin rules require learned business context.'],
      ['More than one system', true, 'Email, ERP pricing, inventory and CRM records must be reconciled.'],
      ['Permissioned action', true, 'Quote creation and customer response are actions with explicit authority boundaries.'],
      ['Exceptions and change', true, 'Unavailable SKUs, equivalent products and discount exceptions break fixed scripts.'],
      ['Measurable outcome', true, 'Response time, quote accuracy, review rate and conversion can be observed.']
    ],
    copilot: [
      ['Extract requested products', 'Identifies quantity, manufacturer and delivery locations.', 'EMAIL'],
      ['Draft a response', 'Creates text that an employee can complete.', 'DRAFT']
    ],
    lily: [
      ['Resolve the request', 'Maps language to the customer, account and likely product family.', 'INBOX'],
      ['Check compatibility', 'Retrieves technical context and flags ambiguity.', 'KNOWLEDGE'],
      ['Price and source', 'Reconciles contract pricing, margin policy and branch inventory.', 'ERP'],
      ['Control the exception', 'Routes substitutions or below-floor discounts for approval.', 'CONTROL'],
      ['Create and send quote', 'Writes the approved transaction and responds to the customer.', 'ERP + EMAIL'],
      ['Record the outcome', 'Updates CRM and captures corrections for evaluation.', 'CRM']
    ],
    contract: {
      title: 'Respond to qualified distributor RFQs',
      fields: [
        ['Starting event', 'Inbound request received in the shared quote inbox'],
        ['Outcome owned', 'An accurate, policy-compliant quote delivered to the customer'],
        ['Systems required', 'Email · ERP pricing · inventory · CRM'],
        ['Judgment to learn', 'Product equivalence · contract pricing · margin exceptions · branch fulfillment'],
        ['Permitted actions', 'Read account context · check stock · create standard quote · update CRM'],
        ['Human gates', 'Ambiguous compatibility · unapproved substitute · below-floor margin'],
        ['Success measures', 'Median response time · quote accuracy · human-review rate · conversion']
      ],
      window: '30 days'
    }
  },
  routing: {
    input: `Support email: Our refrigerated shipment arrived at the wrong dock and the receiver is refusing it. PO 48711. Carrier says dispatch must reroute, but the customer is asking for an ETA now. Route to the correct owner, preserve the SLA and notify the customer.`,
    accepted: true,
    reason: 'The work requires classifying an ambiguous exception, retrieving shipment context, routing ownership and taking SLA-sensitive action.',
    criteria: [
      ['Repeated operational volume', true, 'Misrouted cases form a recurring operational queue.'],
      ['Company-specific judgment', true, 'Ownership depends on shipment state, issue type, customer and operating policy.'],
      ['More than one system', true, 'Support, transportation and customer records must be reconciled.'],
      ['Permissioned action', true, 'Reassignment and customer notification change the live case.'],
      ['Exceptions and change', true, 'Issue descriptions are inconsistent and routing rules evolve.'],
      ['Measurable outcome', true, 'Routing cycle time, SLA preservation and throughput can be measured.']
    ],
    copilot: [
      ['Summarize the incident', 'Extracts shipment, dock and customer details.', 'EMAIL'],
      ['Suggest a queue', 'Recommends where a person might route it.', 'DRAFT']
    ],
    lily: [
      ['Classify the exception', 'Identifies misroute, refusal risk and urgency.', 'SUPPORT'],
      ['Retrieve shipment context', 'Finds PO, carrier, customer and live shipment state.', 'TMS'],
      ['Determine ownership', 'Applies the current routing and escalation policy.', 'POLICY'],
      ['Reassign the case', 'Moves work to the accountable operator with full context.', 'SUPPORT'],
      ['Notify the customer', 'Sends the approved status and next action.', 'EMAIL'],
      ['Measure resolution', 'Records routing time, touches and SLA result.', 'ANALYTICS']
    ],
    contract: {
      title: 'Resolve misrouted logistics cases',
      fields: [
        ['Starting event', 'Unstructured support case enters the wrong queue'],
        ['Outcome owned', 'Case reaches the accountable operator with SLA and customer context preserved'],
        ['Systems required', 'Support platform · TMS · account records · email'],
        ['Judgment to learn', 'Issue taxonomy · ownership rules · escalation thresholds'],
        ['Permitted actions', 'Read shipment · classify · reassign · send standard status'],
        ['Human gates', 'Financial claim · customer concession · unresolved ownership'],
        ['Success measures', 'Routing cycle time · touches per case · SLA misses · throughput per person']
      ],
      window: '4 weeks'
    }
  },
  copy: {
    input: `Write a friendly follow-up email thanking a prospect for today's product demo and asking whether they want to schedule another conversation next week.`,
    accepted: false,
    reason: 'This is a bounded content-generation task. A general-purpose copilot can complete it without a forward-deployed system.',
    criteria: [
      ['Repeated operational volume', false, 'The example does not establish meaningful operational scale.'],
      ['Company-specific judgment', false, 'Tone and basic context can be supplied in a prompt.'],
      ['More than one system', false, 'No cross-system reconciliation is required.'],
      ['Permissioned action', false, 'Drafting is useful, but the task does not require controlled execution.'],
      ['Exceptions and change', false, 'The workflow is simple and stable.'],
      ['Measurable outcome', false, 'A completion metric is not the same as an operational business outcome.']
    ],
    copilot: [
      ['Draft the email', 'Produces an editable follow-up in seconds.', 'DRAFT'],
      ['Let the seller review', 'The employee sends or revises the message.', 'HUMAN']
    ],
    lily: [],
    contract: null
  }
};

let selected = 'quote';
const input = document.getElementById('workflowInput');
const results = document.getElementById('results');
const presets = [...document.querySelectorAll('.preset')];

function setExample(key) {
  selected = key;
  input.value = examples[key].input;
  presets.forEach(button => button.classList.toggle('active', button.dataset.example === key));
  results.classList.add('hidden');
}

presets.forEach(button => button.addEventListener('click', () => setExample(button.dataset.example)));

function stepMarkup(step, index) {
  return `<div class="step"><span class="step-index">${String(index + 1).padStart(2, '0')}</span><div><strong>${step[0]}</strong><p>${step[1]}</p></div><span class="system-chip">${step[2]}</span></div>`;
}

function inferExample() {
  const value = input.value.toLowerCase();
  if (value.includes('follow-up') || value.includes('write') || value.includes('thank')) return 'copy';
  if (value.includes('shipment') || value.includes('route') || value.includes('support')) return 'routing';
  return 'quote';
}

function runTest() {
  selected = inferExample();
  presets.forEach(button => button.classList.toggle('active', button.dataset.example === selected));
  const data = examples[selected];
  const passed = data.criteria.filter(item => item[1]).length;
  const band = document.querySelector('.decision-band');
  band.classList.toggle('denied', !data.accepted);
  document.getElementById('decisionTitle').textContent = data.accepted ? 'Accept the work.' : 'Do not deploy Lily.';
  document.getElementById('scoreValue').textContent = `${passed}/6`;
  document.getElementById('decisionReason').textContent = data.reason;
  document.getElementById('criteriaGrid').innerHTML = data.criteria.map((item, index) => `
    <article class="criterion">
      <span class="criterion-status ${item[1] ? 'pass' : 'fail'}">${String(index + 1).padStart(2, '0')} / ${item[1] ? 'PASS' : 'FAIL'}</span>
      <h3>${item[0]}</h3><p>${item[2]}</p>
    </article>`).join('');
  document.getElementById('copilotSteps').innerHTML = data.copilot.map(stepMarkup).join('');
  document.getElementById('lilySteps').innerHTML = data.lily.map(stepMarkup).join('');
  document.getElementById('executionSection').style.display = data.accepted ? '' : 'none';
  document.getElementById('contractSection').style.display = data.accepted ? '' : 'none';
  if (data.contract) {
    document.getElementById('contractTitle').textContent = data.contract.title;
    document.getElementById('contractFields').innerHTML = data.contract.fields.map(field => `<dt>${field[0]}</dt><dd>${field[1]}</dd>`).join('');
    document.getElementById('proofWindow').textContent = data.contract.window;
  }
  results.classList.remove('hidden');
  results.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.getElementById('runTest').addEventListener('click', runTest);
document.getElementById('copyContract').addEventListener('click', async () => {
  const data = examples[selected];
  if (!data.contract) return;
  const text = `LILY WORK CONTRACT\n${data.contract.title}\n\n${data.contract.fields.map(f => `${f[0]}: ${f[1]}`).join('\n')}\nProof window: ${data.contract.window}`;
  try {
    await navigator.clipboard.writeText(text);
    document.getElementById('copyStatus').textContent = 'Copied to clipboard.';
  } catch {
    document.getElementById('copyStatus').textContent = 'Select the contract text to copy.';
  }
});

setExample('quote');
