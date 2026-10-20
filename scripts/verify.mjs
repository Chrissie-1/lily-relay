import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const html=readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');
const js=readFileSync(new URL('../dist/app.js',import.meta.url),'utf8');

for(const id of ['control','workflow','workflowMapButton','portfolio','commitments','fde','proof','reality','claims','distribution','connectors','fullDemoButton','copyBriefButton','exportContractButton','detailModal']){
  assert.match(html,new RegExp(`id=["']${id}["']`),`Missing UI contract: ${id}`);
}
for(const stage of ['PROMISED','SCOPED','SHIPPED','PROVEN','MARKETABLE']){
  assert.match(html+js,new RegExp(stage),`Missing lifecycle stage: ${stage}`);
}
for(const connector of ['Salesforce / HubSpot','Gong','Jira / Linear','Product telemetry / Evaluations','Slack','AWS control plane']){
  assert.ok(html.includes(connector),`Missing connector contract: ${connector}`);
}
for(const behavior of ['workflowMapped','buildOutcomeContract','executiveBrief','runSyntheticDemo','openDetail','releaseClaimsButton','structuredClone(initialState)']){
  assert.ok(js.includes(behavior),`Missing executable behavior: ${behavior}`);
}

console.log('Lily Relay static verification passed.');
