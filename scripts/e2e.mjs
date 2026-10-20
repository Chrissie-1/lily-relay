import assert from 'node:assert/strict';

const port=process.env.LILY_RELAY_CDP_PORT||'9223';
const pages=await fetch(`http://127.0.0.1:${port}/json`).then(response=>response.json());
const page=pages.find(candidate=>candidate.type==='page'&&candidate.url.includes('127.0.0.1:4173'));
assert.ok(page,'Lily Relay browser page was not found');

const socket=new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve,reject)=>{socket.addEventListener('open',resolve,{once:true});socket.addEventListener('error',reject,{once:true})});
let commandId=0;
const pending=new Map();
socket.addEventListener('message',event=>{const message=JSON.parse(event.data);if(message.id&&pending.has(message.id)){const {resolve,reject}=pending.get(message.id);pending.delete(message.id);message.error?reject(new Error(message.error.message)):resolve(message.result)}});
function command(method,params={}){return new Promise((resolve,reject)=>{const id=++commandId;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}))})}
async function evaluate(expression){const result=await command('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(result.exceptionDetails)throw new Error(result.exceptionDetails.text);return result.result.value}
async function click(selector){const clicked=await evaluate(`(()=>{const element=document.querySelector(${JSON.stringify(selector)});if(!element)return false;element.click();return true})()`);assert.equal(clicked,true,`Could not click ${selector}`)}

await command('Runtime.enable');
await click('#resetDemo');
await click('#workflowMapButton');
await click('#extractButton');
for(const [index,decision] of ['approve','condition','approve','condition','reject'].entries()){
  await click(`.decision-buttons[data-index="${index}"] button[data-decision="${decision}"]`);
}
await click('#commitScopeButton');
await click('#createPlanButton');
await click('#loadDeploymentButton');
await click('#importEvidenceButton');
for(const [claim,decision] of [['volume','approve'],['autonomy','deny'],['revenue','request']]){
  await click(`.claim-actions[data-claim="${claim}"] button[data-decision="${decision}"]`);
}
await click('#releaseClaimsButton');

const result=await evaluate(`({
  state:JSON.parse(localStorage.getItem('lilyRelayState')),
  log:JSON.parse(localStorage.getItem('lilyRelayLog')),
  releaseBadge:document.querySelector('#releaseBadge').textContent,
  exportDisabled:document.querySelector('#exportContractButton').disabled,
  lifecycle:[...document.querySelectorAll('.stage')].map(element=>element.className)
})`);
assert.equal(result.state.released,true);
assert.equal(result.state.workflowMapped,true);
assert.equal(result.releaseBadge,'RELEASED TO SALES');
assert.equal(result.exportDisabled,false);
assert.equal(Object.keys(result.state.decisions).length,5);
assert.equal(Object.keys(result.state.claimDecisions).length,3);
assert.ok(result.log.length>=13);
assert.ok(result.lifecycle.every(className=>className.includes('done')||className.includes('current')));

await click('.copy-asset[data-asset="talktrack"]');
const modal=await evaluate(`({open:document.querySelector('#detailModal').open,title:document.querySelector('#modalTitle').textContent,content:document.querySelector('#modalContent').value})`);
assert.equal(modal.open,true);
assert.equal(modal.title,'Gong talk track');
assert.ok(modal.content.includes('BOUNDED PROOF'));
await click('#modalCloseButton');

await click('#resetDemo');
await click('#fullDemoButton');
const oneClick=await evaluate(`({state:JSON.parse(localStorage.getItem('lilyRelayState')),stage:document.querySelector('#atlasLifecycle').textContent,health:document.querySelector('#atlasHealth').textContent})`);
assert.equal(oneClick.state.released,true);
assert.equal(oneClick.stage,'Marketable');
assert.equal(oneClick.health,'Proof released');

if(process.env.LILY_RELAY_CLOSE_BROWSER==='1'){
  await command('Browser.close').catch(()=>{});
}else{
  socket.close();
}
console.log('Lily Relay end-to-end browser workflow passed.');
