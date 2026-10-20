const commitments=[
 {title:'Complete inbound RFQs',detail:'Email intake through product matching, pricing and quote creation.',type:'SCOPE',read:'Supported with Epicor and inventory access.',recommended:'approve'},
 {title:'Under 30-minute response',detail:'Buyer target; not yet a validated product commitment.',type:'OUTCOME',read:'Treat as measurement target, not guarantee.',recommended:'condition'},
 {title:'Protect regional margin floor',detail:'Substitutions and discounts must preserve pricing authority.',type:'CONTROL',read:'Supported with explicit approval gates.',recommended:'approve'},
 {title:'Go live next month',detail:'Seller stated this as a target pending technical validation.',type:'TIMELINE',read:'Blocked until Epicor API access is confirmed.',recommended:'condition'},
 {title:'Increase conversion',detail:'Commercial implication; no baseline or causal method discussed.',type:'CLAIM',read:'Unsupported at discovery stage.',recommended:'reject'}
];
const diffs=[
 {promised:'Under 30-minute response',scoped:'Measurement target; no guarantee',shipped:'Median processing monitored',action:'Expectation corrected in CRM',status:'ALIGNED'},
 {promised:'All product substitutions',scoped:'Approved equivalents only',shipped:'Low-confidence matches escalate',action:'Customer scope updated',status:'ALIGNED'},
 {promised:'Go live next month',scoped:'Conditional on Epicor API',shipped:'ERP + email live; inventory sync pending',action:'Open dependency task for inventory',status:'RISK'},
 {promised:'Increase conversion',scoped:'Measure only if baseline available',shipped:'No causal conversion study',action:'Block revenue claim',status:'DENY CLAIM'}
];
const claims=[
 {id:'volume',source:'ERP + EMAIL LOGS · 30 DAYS',text:'During its first 30 days, Lily handled more than 6,000 inbound emails and approximately 1,500 quotes.',evidence:'Directly supported by bounded operational counts.'},
 {id:'autonomy',source:'FDE SCOPE + CONTROL TRACE',text:'Lily fully automated the distributor’s quoting operation without human involvement.',evidence:'Contradicted by documented approval gates and review conditions.'},
 {id:'revenue',source:'CRM CONVERSION DATA',text:'Lily increased quote conversion and generated incremental revenue.',evidence:'Conversion baseline and causal comparison are missing.'}
];
const portfolioDetails={
 meridian:{eyebrow:'SIMULATED RISK · OC-0251',title:'Meridian Logistics',summary:'Relay detected a material difference between the sold routing promise and the deployed escalation policy.',content:'LIFECYCLE: SHIPPED\nHEALTH: SCOPE DRIFT\n\nPROMISED\nRoute all inbound carrier exceptions without dispatcher involvement.\n\nSCOPED\nAutomate standard delay and document cases; escalate contractual penalties and ambiguous exceptions.\n\nSHIPPED\nStandard cases are live. Penalty cases currently enter manual review as scoped.\n\nSYSTEM ACTION\nReturn corrected autonomy language to Sales and block “fully autonomous exception handling.”\n\nOWNER\nFDE · Jordan R.\nDUE\nBefore next customer expansion call'},
 northstar:{eyebrow:'SIMULATED PROOF · OC-0238',title:'Northstar Field Service',summary:'A completed Outcome Contract with bounded proof that is ready for seller reuse.',content:'LIFECYCLE: MARKETABLE\nHEALTH: PROOF RELEASED\n\nAPPROVED CLAIM\nAcross the 30-day pilot, Lily identified an approved part or routed the request for review in 87% of evaluated service cases.\n\nEVIDENCE\nEvaluation set: 412 historical service cases\nMeasurement window: 30 days\nHuman-review rate: 23%\n\nUSE WHEN\nA field-service buyer struggles with slow parts identification across fragmented catalogs.\n\nDO NOT CLAIM\nZero-touch parts ordering or guaranteed truck-roll reduction.'}
};
const assetDetails={
 talktrack:{eyebrow:'GENERATED SALES ASSET',title:'Gong talk track',summary:'Approved language for a seller discussing quote operations with an industrial distributor.',content:'PROBLEM\nYour team is losing time moving between a shared inbox, ERP records and inventory data before it can issue a quote.\n\nPOSITIONING\nLily executes the quote workflow across those existing systems while preserving pricing authority and escalation controls.\n\nBOUNDED PROOF\nDuring its first 30 days, Lily handled more than 6,000 inbound emails and approximately 1,500 quotes.\n\nQUALIFICATION QUESTION\nWhich part of the quote cycle creates the largest delay today: intake, product matching, pricing approval or ERP entry?\n\nDO NOT SAY\nFully autonomous quoting or guaranteed conversion increase.'},
 battlecard:{eyebrow:'GENERATED SALES ASSET',title:'Battlecard evidence',summary:'A proof-led contrast against drafting copilots and fixed workflow automation.',content:'CATEGORY CONTRAST\n\nDRAFTING COPILOTS\nHelp a representative compose a response but leave system research and execution to the user.\n\nFIXED AUTOMATION\nHandles predictable rules but breaks when product, pricing or customer context requires judgment.\n\nLILY POSITION\nExecutes work across the existing stack with explicit approval boundaries and evidence trails.\n\nPROOF TO USE\n6,000+ inbound emails and approximately 1,500 quotes in the bounded first-30-day window.\n\nPROOF NOT AVAILABLE\nNo causal conversion or incremental-revenue result.'},
 clearance:{eyebrow:'SIMULATED EXECUTION TASK',title:'Case-study clearance',summary:'The internal proof is usable by Sales; external publication remains default-deny.',content:'TASK: Obtain customer and legal clearance\nSTATUS: READY TO ASSIGN\n\nREVIEW PACKAGE\n• Exact proposed claim and measurement window\n• Source-system references\n• FDE confirmation of approval boundaries\n• Customer name and logo usage decision\n• Legal review of external wording\n\nEXIT CRITERIA\nCustomer approver and Legal both accept the exact language. Until then, the proof remains internal-only.\n\nRECOMMENDED OWNER\nProduct'}
};
const initialState={workflowMapped:false,extracted:false,decisions:{},scoped:false,proof:false,shipped:false,evidence:false,claimDecisions:{},released:false};
const storedState=JSON.parse(localStorage.getItem('lilyRelayState')||'null');
let state={...structuredClone(initialState),...(storedState||{}),workflowMapped:storedState?(storedState.workflowMapped??Boolean(storedState.extracted)):false};
let log=(JSON.parse(localStorage.getItem('lilyRelayLog')||'null')||[
 {time:'09:12',role:'SYSTEM',class:'system',text:'Outcome Contract OC-0247 created from Salesforce opportunity.'},
 {time:'09:13',role:'SALES',class:'sales',text:'Discovery transcript attached from Gong.'}
]).map(entry=>entry.role==='PMM'?{...entry,role:'PRODUCT',class:'pmm'}:entry);
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
function save(){localStorage.setItem('lilyRelayState',JSON.stringify(state));localStorage.setItem('lilyRelayLog',JSON.stringify(log))}
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove('show'),2400)}
function addLog(role,text){const classes={SALES:'sales',FDE:'fde',PRODUCT:'pmm',PMM:'pmm',SYSTEM:'system'};const now=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});log.unshift({time:now,role,class:classes[role],text});save();renderLog()}
function renderLog(){$('#activityLog').innerHTML=log.map(x=>`<div class="activity-item"><time>${x.time}</time><span class="activity-role ${x.class}">${x.role}</span><span>${x.text}</span></div>`).join('')}
function renderCommitments(){
 $('#emptyExtraction').classList.toggle('hidden',state.extracted);$('#commitmentList').classList.toggle('hidden',!state.extracted);
 $('#extractStatus').textContent=state.extracted?'5 FOUND':state.workflowMapped?'READY':'MAP WORKFLOW FIRST';$('#extractStatus').className=`status-pill ${state.extracted||state.workflowMapped?'live':'idle'}`;$('#extractButton').disabled=!state.workflowMapped||state.extracted;
 $('#extractButton').innerHTML=state.extracted?'Commitments extracted <span>✓</span>':state.workflowMapped?'Extract commitments <span>⌁</span>':'Map workflow to continue <span>◇</span>';
 $('#commitmentList').innerHTML=commitments.map((c,i)=>`<div class="commitment"><span>${i+1}</span><div><strong>${c.title}</strong><p>${c.detail}</p></div><em>${c.type}</em></div>`).join('')
}
function renderValidation(){
 $('#fdeLock').classList.toggle('unlocked',state.extracted);
 $('#validationRows').innerHTML=commitments.map((c,i)=>`<div class="validation-row"><div><strong>${c.title}</strong><p>${c.detail}</p></div><div><strong>${c.read}</strong><p>Recommended: ${c.recommended}</p></div><div class="decision-buttons" data-index="${i}">${['approve','condition','reject'].map(d=>`<button class="${state.decisions[i]===d?'selected '+d:''}" data-decision="${d}">${d.toUpperCase()}</button>`).join('')}</div></div>`).join('');
 $$('.decision-buttons button').forEach(btn=>btn.addEventListener('click',()=>{const i=btn.parentElement.dataset.index;state.decisions[i]=btn.dataset.decision;save();renderValidation();renderState()}));
 $('#commitScopeButton').disabled=Object.keys(state.decisions).length<commitments.length||state.scoped;if(state.scoped)$('#commitScopeButton').innerHTML='Scope committed <span>✓</span>'
}
function renderDiffs(){$('#diffRows').innerHTML=diffs.map(d=>`<div class="diff-row"><div><strong>${d.promised}</strong></div><div><p>${d.scoped}</p></div><div><p>${d.shipped}</p></div><div><span class="diff-status ${d.status.includes('RISK')||d.status.includes('DENY')?'risk':''}">${d.status}</span><p>${d.action}</p></div></div>`).join('')}
function renderClaims(){
 $('#claimCards').innerHTML=claims.map(c=>`<article class="claim-card"><span class="claim-source">${c.source}</span><blockquote>“${c.text}”</blockquote><div class="claim-evidence">${c.evidence}</div><div class="claim-actions" data-claim="${c.id}">${['approve','deny','request'].map(d=>`<button class="${state.claimDecisions[c.id]===d?'selected '+d:''}" data-decision="${d}">${d==='request'?'NEED EVIDENCE':d.toUpperCase()}</button>`).join('')}</div></article>`).join('');
 $$('.claim-actions button').forEach(btn=>btn.addEventListener('click',()=>{const id=btn.parentElement.dataset.claim;state.claimDecisions[id]=btn.dataset.decision;save();renderClaims();renderState()}));
 $('#releaseClaimsButton').disabled=Object.keys(state.claimDecisions).length<claims.length||state.released;if(state.released)$('#releaseClaimsButton').innerHTML='Proof released <span>✓</span>'
}
function renderState(){
 $('#fitBadge').textContent=state.workflowMapped?'WORKFLOW MAPPED':'NOT MAPPED';$('#fitBadge').classList.toggle('live',state.workflowMapped);
 $('#fitStatus').textContent=state.workflowMapped?'COORDINATION READY':'AWAITING MAP';$('.fit-map').classList.toggle('mapped',state.workflowMapped);
 $('#workflowMapButton').disabled=state.workflowMapped;$('#workflowMapButton').innerHTML=state.workflowMapped?'Workflow mapped <span>✓</span>':'Map this workflow <span>⌁</span>';
 const unlocked=(id,on)=>$(id).classList.toggle('unlocked',on);unlocked('#proofLock',state.scoped);unlocked('#realityLock',state.proof);unlocked('#claimsLock',state.evidence);unlocked('#distributionLock',state.released);
 $('#createPlanButton').disabled=!state.scoped||state.proof;if(state.proof)$('#createPlanButton').innerHTML='Outcome plan created <span>✓</span>';
 $('#loadDeploymentButton').disabled=!state.proof||state.shipped;if(state.shipped)$('#loadDeploymentButton').textContent='Deployment update loaded ✓';
 $('#importEvidenceButton').disabled=!state.shipped||state.evidence;if(state.evidence)$('#importEvidenceButton').innerHTML='Evidence imported <span>✓</span>';
 $('#evidenceStatus').textContent=state.evidence?'6,000+ emails · ~1,500 quotes · 30-day window':state.shipped?'Deployment live · evidence available':'Not yet imported';
 $('#releaseBadge').textContent=state.released?'RELEASED TO SALES':'NOT RELEASED';$('#releaseBadge').classList.toggle('live',state.released);
 $('#copyBriefButton').disabled=!state.released;$('#exportContractButton').disabled=!state.released;
 $('#fullDemoButton').disabled=state.released;$('#fullDemoButton').innerHTML=state.released?'Demo complete <span>✓</span>':'Run synthetic demo <span>▶</span>';
 const portfolioStage=state.released?'Marketable':state.evidence?'Proven':state.shipped?'Shipped':state.scoped?'Scoped':'Promised';$('#atlasLifecycle').textContent=portfolioStage;
 $('#atlasHealth').textContent=state.released?'Proof released':state.shipped?'Scope risk':state.extracted?'Needs validation':'Awaiting extraction';$('#atlasHealth').className=`health ${state.released?'green':state.shipped?'red':'amber'}`;
 $('#atlasAction').textContent=state.released?'View released proof →':'Open contract →';$('#atlasAction').dataset.target=state.released?'#distribution':'#commitments';
 const reached=[true,state.scoped,state.shipped,state.evidence,state.released],latest=reached.lastIndexOf(true);$$('.stage').forEach((el,i)=>{el.classList.toggle('done',reached[i]&&i<latest);el.classList.toggle('current',i===latest)});
 $('#stagePromised').textContent=state.extracted?'Captured':'In progress';$('#stageScoped').textContent=state.scoped?'Validated':'Locked';$('#stageShipped').textContent=state.shipped?'Reconciled':'Locked';$('#stageProven').textContent=state.evidence?'Evidence loaded':'Locked';$('#stageMarketable').textContent=state.released?'Released':'Locked';
 let next=state.workflowMapped?{title:'Extract sales commitments',detail:'Turn the discovery call into accountable, reviewable promises.',label:'Open commitment inbox',target:'#commitments'}:{title:'Map the operating workflow',detail:'Tell Relay where truth lives so coordination fits the way this team already works.',label:'Map this workflow',target:'#workflow'};
 if(state.extracted&&!state.scoped)next={title:'Validate five commitments',detail:'FDE must approve, condition or reject every promise.',label:'Open FDE validation',target:'#fde'};
 else if(state.scoped&&!state.proof)next={title:'Define the product outcome',detail:'Product must define the hypothesis, baseline and evidence required.',label:'Open outcome plan',target:'#proof'};
 else if(state.proof&&!state.shipped)next={title:'Reconcile deployment reality',detail:'Load the deployment update and resolve scope differences.',label:'Open reality diff',target:'#reality'};
 else if(state.shipped&&!state.evidence)next={title:'Import production evidence',detail:'Bring the bounded 30-day results into the Outcome Contract.',label:'Open evidence import',target:'#reality'};
 else if(state.evidence&&!state.released)next={title:'Decide every market claim',detail:'Approve, deny or request evidence before release.',label:'Open claim gate',target:'#claims'};
 else if(state.released)next={title:'Proof released to Sales',detail:'Approved language is now available in the selling workflow.',label:'View distribution',target:'#distribution'};
 $('#nextActionTitle').textContent=next.title;$('#nextActionDetail').textContent=next.detail;$('#nextActionButton').innerHTML=`${next.label} <span>→</span>`;$('#nextActionButton').dataset.target=next.target;
 $('#healthValue').textContent=state.released?'Market-ready':state.evidence?'Claim decision required':state.shipped?'1 scope risk':state.scoped?'Proof setup required':state.extracted?'FDE validation required':'Awaiting extraction';
 $('#healthDetail').textContent=state.released?'1 approved · 1 denied · 1 held':state.evidence?'3 claims waiting':state.shipped?'Inventory integration pending':state.scoped?'Baseline tasks not created':'5 potential commitments detected';$('#navCommitCount').textContent=state.extracted?'5':'1'
}
function buildOutcomeContract(){
 const createdAt=new Date().toISOString();
 return {
  schemaVersion:'1.0-demo',
  contract:{id:'OC-0247',account:'Atlas Industrial Supply',useCase:'Quote execution',industry:'Industrial distribution',buyer:'VP of Inside Sales',status:'MARKETABLE',createdAt,syntheticDemo:true},
  lifecycle:['PROMISED','SCOPED','SHIPPED','PROVEN','MARKETABLE'],
  workflowProfile:{mapped:state.workflowMapped,commercialSystem:$('#crmSelect').value,conversationSource:$('#conversationSelect').value,deliverySystem:$('#deliverySelect').value,teamCoordination:$('#collaborationSelect').value,principle:'Configure the coordination, not the company'},
  source:{system:$('#conversationSelect').value,kind:'synthetic transcript',opportunitySystem:$('#crmSelect').value,liveConnector:false},
  commitments:commitments.map((item,index)=>({...item,fdeDecision:state.decisions[index]||'undecided'})),
  outcomePlan:{hypothesis:$('#hypothesis').value,alternativeDisplaced:'Manual inbox triage + ERP research + fragmented quote workflow',buyer:'VP of Inside Sales · Industrial Distribution',languageDenied:['Fully autonomous quoting','Guaranteed revenue increase'],metrics:[{name:'Median quote response time',required:true,owner:'Sales Operations'},{name:'Quotes completed',required:true,source:'ERP transaction log'},{name:'Human-review rate',required:true,source:'Product telemetry'},{name:'Quote accuracy',required:true,source:'Evaluation dataset'},{name:'Conversion rate',required:false,owner:'Revenue Operations'}]},
  reconciliation:diffs,
  evidence:{window:'First 30 days',operationalCounts:{inboundEmails:'6,000+',quotes:'approximately 1,500'},limitations:['No causal conversion study','Human approval gates remained in scope'],liveData:false},
  claimRelease:claims.map(item=>({...item,decision:state.claimDecisions[item.id]||'undecided'})),
  distribution:{salesforceProofCard:true,gongTalkTrack:true,battlecardEvidence:true,caseStudyDraft:'pending customer and legal clearance'},
  auditLog:log.map(entry=>({...entry})),
  disclosure:'Independent interview prototype. All account, transcript and workflow data are synthetic; bounded figures are used only as demonstration evidence.'
 };
}
function executiveBrief(){
 return `LILY RELAY — OUTCOME CONTRACT OC-0247\n\nAccount: Atlas Industrial Supply (synthetic demonstration)\nUse case: Industrial distribution quote execution\nStatus: MARKETABLE\n\nWorkflow fit: Relay coordinates the existing CRM, conversation, delivery and collaboration systems without replacing them.\n\nDecision: One bounded operational claim is approved for Sales. The full-autonomy claim is denied, and the revenue claim is held until baseline and causal evidence exist.\n\nApproved language: During its first 30 days, Lily handled more than 6,000 inbound emails and approximately 1,500 quotes.\n\nScope risk: Inventory synchronization remains pending. Timeline language stays conditional on Epicor API access.\n\nWhy this matters: Sales keeps customer intent, FDE retains technical truth, and Product governs measurable outcomes—inside one shared operating contract.\n\nDisclosure: Independent prototype using synthetic workflow data.`;
}
async function copyText(text){
 try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text);return true}}catch{}
 const area=document.createElement('textarea');area.value=text;area.style.position='fixed';area.style.opacity='0';document.body.appendChild(area);area.focus();area.select();const copied=document.execCommand('copy');area.remove();return copied;
}
function openDetail(detail){$('#modalEyebrow').textContent=detail.eyebrow;$('#modalTitle').textContent=detail.title;$('#modalSummary').textContent=detail.summary;$('#modalContent').value=detail.content;$('#modalStatus').textContent='Synthetic data · safe to present';$('#detailModal').showModal()}
function runSyntheticDemo(){
 state={workflowMapped:true,extracted:true,decisions:{0:'approve',1:'condition',2:'approve',3:'condition',4:'reject'},scoped:true,proof:true,shipped:true,evidence:true,claimDecisions:{volume:'approve',autonomy:'deny',revenue:'request'},released:true};
 const now=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
 log=[
  {time:now,role:'SYSTEM',class:'system',text:'Salesforce proof card, Gong talk track and battlecard evidence created.'},
  {time:now,role:'PRODUCT',class:'pmm',text:'One bounded claim released; autonomy claim denied; revenue claim held.'},
  {time:now,role:'PRODUCT',class:'pmm',text:'Three candidate claims routed to the product truth gate.'},
  {time:now,role:'SYSTEM',class:'system',text:'Thirty-day evidence imported: 6,000+ emails and approximately 1,500 quotes.'},
  {time:now,role:'FDE',class:'fde',text:'Deployment reconciled; inventory integration marked pending.'},
  {time:now,role:'PRODUCT',class:'pmm',text:'Outcome plan created with four required metrics and two denied phrases.'},
  {time:now,role:'FDE',class:'fde',text:'Five commitments decided and validated scope committed.'},
  {time:now,role:'SYSTEM',class:'system',text:'Five customer commitments extracted from the synthetic transcript.'},
  {time:now,role:'SYSTEM',class:'system',text:'Workflow mapped across Salesforce, Gong, Jira and Slack.'},
  {time:'09:12',role:'SYSTEM',class:'system',text:'Outcome Contract OC-0247 created from Salesforce opportunity.'},
  {time:'09:13',role:'SALES',class:'sales',text:'Discovery transcript attached from Gong.'}
 ];
 save();render();setRole('product');document.querySelector('#distribution').scrollIntoView({behavior:'smooth'});toast('Synthetic journey completed. Proof is ready to present.');
}
$('#workflowMapButton').addEventListener('click',()=>{state.workflowMapped=true;save();render();addLog('SYSTEM',`Workflow mapped across ${$('#crmSelect').value}, ${$('#conversationSelect').value}, ${$('#deliverySelect').value} and ${$('#collaborationSelect').value}.`);toast('Workflow fit mapped. Relay is ready to coordinate.');});
$('#extractButton').addEventListener('click',()=>{state.extracted=true;save();renderCommitments();renderValidation();renderState();addLog('SYSTEM','Five customer commitments extracted; FDE validation requested.');toast('Outcome Contract created from sales transcript.')});
$('#commitScopeButton').addEventListener('click',()=>{state.scoped=true;save();renderValidation();renderState();addLog('FDE','Validated scope committed. Epicor, inventory and control tasks created.');addLog('SYSTEM','Salesforce scope updated; timeline and outcome language corrected.');toast('Validated scope committed and downstream tasks created.')});
$('#createPlanButton').addEventListener('click',()=>{state.proof=true;save();renderState();addLog('PRODUCT','Outcome plan created with four required metrics and two denied phrases.');addLog('SYSTEM','Baseline requests assigned to Sales Ops and Revenue Ops.');toast('Product outcome plan created. Baseline tasks assigned.')});
$('#loadDeploymentButton').addEventListener('click',()=>{state.shipped=true;save();renderState();addLog('FDE','Deployment update synced. Inventory integration marked pending.');addLog('SYSTEM','Promise-to-reality diff created one dependency task and one claim restriction.');toast('Deployment reality reconciled. One risk detected.')});
$('#importEvidenceButton').addEventListener('click',()=>{state.evidence=true;save();renderState();addLog('SYSTEM','Thirty-day evidence imported: 6,000+ emails and approximately 1,500 quotes.');addLog('PRODUCT','Three candidate claims routed to the product truth gate.');toast('Production evidence imported and claims generated.')});
$('#releaseClaimsButton').addEventListener('click',()=>{state.released=true;save();renderClaims();renderState();addLog('PRODUCT','One bounded claim released; autonomy claim denied; revenue claim held.');addLog('SYSTEM','Salesforce proof card, Gong talk track and battlecard evidence created.');toast('Approved proof released to Sales.')});
$('#copyBriefButton').addEventListener('click',()=>{if(!state.released)return;openDetail({eyebrow:'RELEASED EXECUTIVE BRIEF',title:'Outcome Contract OC-0247',summary:'The exact VP-ready summary generated from the approved synthetic contract.',content:executiveBrief()});addLog('PRODUCT','Executive brief opened from released proof.');});
$('#exportContractButton').addEventListener('click',()=>{if(!state.released)return;addLog('SYSTEM','Portable Outcome Contract JSON exported.');const blob=new Blob([JSON.stringify(buildOutcomeContract(),null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const anchor=document.createElement('a');anchor.href=url;anchor.download='lily-relay-outcome-contract-OC-0247.json';document.body.appendChild(anchor);anchor.click();anchor.remove();URL.revokeObjectURL(url);toast('Outcome Contract JSON downloaded.')});
$('#fullDemoButton').addEventListener('click',runSyntheticDemo);
$('#nextActionButton').addEventListener('click',e=>document.querySelector(e.currentTarget.dataset.target).scrollIntoView({behavior:'smooth'}));
$('#resetDemo').addEventListener('click',()=>{state=structuredClone(initialState);log=[{time:'09:12',role:'SYSTEM',class:'system',text:'Outcome Contract OC-0247 created from Salesforce opportunity.'},{time:'09:13',role:'SALES',class:'sales',text:'Discovery transcript attached from Gong.'}];save();render();toast('Demonstration reset.')});
$$('.copy-asset').forEach(btn=>btn.addEventListener('click',()=>openDetail(assetDetails[btn.dataset.asset])));$$('.nav-item').forEach(link=>link.addEventListener('click',()=>{$$('.nav-item').forEach(x=>x.classList.remove('active'));link.classList.add('active')}));
const roleSections={sales:['#commitments','#distribution'],fde:['#fde','#reality'],product:['#proof','#claims','#distribution']};
function setRole(role){
  $$('.role-switcher button').forEach(button=>button.classList.toggle('active',button.dataset.role===role));
  $$('.workspace-section').forEach(section=>{section.classList.remove('role-focus','role-muted');const relevant=roleSections[role].includes(`#${section.id}`);section.classList.add(relevant?'role-focus':'role-muted')});
  const labels={sales:'Sales view: customer commitments and released proof',fde:'FDE view: technical validation and deployment truth',product:'Product view: outcome design, truth governance and distribution'};
  toast(labels[role]);
}
$$('.role-switcher button').forEach(button=>button.addEventListener('click',()=>setRole(button.dataset.role)));
$$('.portfolio-row button[data-target]').forEach(button=>button.addEventListener('click',()=>document.querySelector(button.dataset.target).scrollIntoView({behavior:'smooth'})));
$$('.inspect-only').forEach(button=>button.addEventListener('click',()=>openDetail(portfolioDetails[button.dataset.account])));
$('#modalCloseButton').addEventListener('click',()=>$('#detailModal').close());
$('#detailModal').addEventListener('click',event=>{if(event.target===$('#detailModal'))$('#detailModal').close()});
$('#modalCopyButton').addEventListener('click',async()=>{const copied=await copyText($('#modalContent').value);if(copied){$('#modalStatus').textContent='Copied to clipboard';toast('Generated text copied.')}else{$('#modalContent').focus();$('#modalContent').select();$('#modalStatus').textContent='Text selected · press Ctrl+C';toast('Clipboard unavailable. Text selected for copying.')}});
function render(){renderCommitments();renderValidation();renderDiffs();renderClaims();renderState();renderLog()}render();
