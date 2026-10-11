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
const initialState={extracted:false,decisions:{},scoped:false,proof:false,shipped:false,evidence:false,claimDecisions:{},released:false};
let state=JSON.parse(localStorage.getItem('lilyRelayState')||'null')||structuredClone(initialState);
let log=JSON.parse(localStorage.getItem('lilyRelayLog')||'null')||[
 {time:'09:12',role:'SYSTEM',class:'system',text:'Outcome Contract OC-0247 created from Salesforce opportunity.'},
 {time:'09:13',role:'SALES',class:'sales',text:'Discovery transcript attached from Gong.'}
];
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
function save(){localStorage.setItem('lilyRelayState',JSON.stringify(state));localStorage.setItem('lilyRelayLog',JSON.stringify(log))}
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove('show'),2400)}
function addLog(role,text){const classes={SALES:'sales',FDE:'fde',PMM:'pmm',SYSTEM:'system'};const now=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});log.unshift({time:now,role,class:classes[role],text});save();renderLog()}
function renderLog(){$('#activityLog').innerHTML=log.map(x=>`<div class="activity-item"><time>${x.time}</time><span class="activity-role ${x.class}">${x.role}</span><span>${x.text}</span></div>`).join('')}
function renderCommitments(){
 $('#emptyExtraction').classList.toggle('hidden',state.extracted);$('#commitmentList').classList.toggle('hidden',!state.extracted);
 $('#extractStatus').textContent=state.extracted?'5 FOUND':'NOT RUN';$('#extractStatus').className=`status-pill ${state.extracted?'live':'idle'}`;$('#extractButton').disabled=state.extracted;
 $('#extractButton').innerHTML=state.extracted?'Commitments extracted <span>✓</span>':'Extract commitments <span>⌁</span>';
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
 const unlocked=(id,on)=>$(id).classList.toggle('unlocked',on);unlocked('#proofLock',state.scoped);unlocked('#realityLock',state.proof);unlocked('#claimsLock',state.evidence);unlocked('#distributionLock',state.released);
 $('#createPlanButton').disabled=!state.scoped||state.proof;if(state.proof)$('#createPlanButton').innerHTML='Proof plan created <span>✓</span>';
 $('#loadDeploymentButton').disabled=!state.proof||state.shipped;if(state.shipped)$('#loadDeploymentButton').textContent='Deployment update loaded ✓';
 $('#importEvidenceButton').disabled=!state.shipped||state.evidence;if(state.evidence)$('#importEvidenceButton').innerHTML='Evidence imported <span>✓</span>';
 $('#evidenceStatus').textContent=state.evidence?'6,000+ emails · ~1,500 quotes · 30-day window':state.shipped?'Deployment live · evidence available':'Not yet imported';
 $('#releaseBadge').textContent=state.released?'RELEASED TO SALES':'NOT RELEASED';$('#releaseBadge').classList.toggle('live',state.released);
 const reached=[true,state.scoped,state.shipped,state.evidence,state.released],latest=reached.lastIndexOf(true);$$('.stage').forEach((el,i)=>{el.classList.toggle('done',reached[i]&&i<latest);el.classList.toggle('current',i===latest)});
 $('#stagePromised').textContent=state.extracted?'Captured':'In progress';$('#stageScoped').textContent=state.scoped?'Validated':'Locked';$('#stageShipped').textContent=state.shipped?'Reconciled':'Locked';$('#stageProven').textContent=state.evidence?'Evidence loaded':'Locked';$('#stageMarketable').textContent=state.released?'Released':'Locked';
 let next={title:'Extract sales commitments',detail:'Turn the discovery call into accountable, reviewable promises.',label:'Open commitment inbox',target:'#commitments'};
 if(state.extracted&&!state.scoped)next={title:'Validate five commitments',detail:'FDE must approve, condition or reject every promise.',label:'Open FDE validation',target:'#fde'};
 else if(state.scoped&&!state.proof)next={title:'Instrument the proof plan',detail:'PMM must define the hypothesis, baseline and evidence required.',label:'Open proof plan',target:'#proof'};
 else if(state.proof&&!state.shipped)next={title:'Reconcile deployment reality',detail:'Load the deployment update and resolve scope differences.',label:'Open reality diff',target:'#reality'};
 else if(state.shipped&&!state.evidence)next={title:'Import production evidence',detail:'Bring the bounded 30-day results into the Outcome Contract.',label:'Open evidence import',target:'#reality'};
 else if(state.evidence&&!state.released)next={title:'Decide every market claim',detail:'Approve, deny or request evidence before release.',label:'Open claim gate',target:'#claims'};
 else if(state.released)next={title:'Proof released to Sales',detail:'Approved language is now available in the selling workflow.',label:'View distribution',target:'#distribution'};
 $('#nextActionTitle').textContent=next.title;$('#nextActionDetail').textContent=next.detail;$('#nextActionButton').innerHTML=`${next.label} <span>→</span>`;$('#nextActionButton').dataset.target=next.target;
 $('#healthValue').textContent=state.released?'Market-ready':state.evidence?'Claim decision required':state.shipped?'1 scope risk':state.scoped?'Proof setup required':state.extracted?'FDE validation required':'Awaiting extraction';
 $('#healthDetail').textContent=state.released?'1 approved · 1 denied · 1 held':state.evidence?'3 claims waiting':state.shipped?'Inventory integration pending':state.scoped?'Baseline tasks not created':'5 potential commitments detected';$('#navCommitCount').textContent=state.extracted?'5':'1'
}
$('#extractButton').addEventListener('click',()=>{state.extracted=true;save();renderCommitments();renderValidation();renderState();addLog('SYSTEM','Five customer commitments extracted; FDE validation requested.');toast('Outcome Contract created from sales transcript.')});
$('#commitScopeButton').addEventListener('click',()=>{state.scoped=true;save();renderValidation();renderState();addLog('FDE','Validated scope committed. Epicor, inventory and control tasks created.');addLog('SYSTEM','Salesforce scope updated; timeline and outcome language corrected.');toast('Validated scope committed and downstream tasks created.')});
$('#createPlanButton').addEventListener('click',()=>{state.proof=true;save();renderState();addLog('PMM','Proof plan created with four required metrics and two denied phrases.');addLog('SYSTEM','Baseline requests assigned to Sales Ops and Revenue Ops.');toast('Proof plan created. Baseline tasks assigned.')});
$('#loadDeploymentButton').addEventListener('click',()=>{state.shipped=true;save();renderState();addLog('FDE','Deployment update synced. Inventory integration marked pending.');addLog('SYSTEM','Promise-to-reality diff created one dependency task and one claim restriction.');toast('Deployment reality reconciled. One risk detected.')});
$('#importEvidenceButton').addEventListener('click',()=>{state.evidence=true;save();renderState();addLog('SYSTEM','Thirty-day evidence imported: 6,000+ emails and approximately 1,500 quotes.');addLog('PMM','Three candidate claims routed to release gate.');toast('Production evidence imported and claims generated.')});
$('#releaseClaimsButton').addEventListener('click',()=>{state.released=true;save();renderClaims();renderState();addLog('PMM','One bounded claim released; autonomy claim denied; revenue claim held.');addLog('SYSTEM','Salesforce proof card, Gong talk track and battlecard evidence created.');toast('Approved proof released to Sales.')});
$('#nextActionButton').addEventListener('click',e=>document.querySelector(e.currentTarget.dataset.target).scrollIntoView({behavior:'smooth'}));
$('#resetDemo').addEventListener('click',()=>{state=structuredClone(initialState);log=[{time:'09:12',role:'SYSTEM',class:'system',text:'Outcome Contract OC-0247 created from Salesforce opportunity.'},{time:'09:13',role:'SALES',class:'sales',text:'Discovery transcript attached from Gong.'}];save();render();toast('Demonstration reset.')});
$$('.copy-asset').forEach(btn=>btn.addEventListener('click',()=>toast(btn.textContent==='Open task'?'Case-study clearance task opened.':'Asset copied to clipboard.')));$$('.nav-item').forEach(link=>link.addEventListener('click',()=>{$$('.nav-item').forEach(x=>x.classList.remove('active'));link.classList.add('active')}));
function render(){renderCommitments();renderValidation();renderDiffs();renderClaims();renderState();renderLog()}render();
