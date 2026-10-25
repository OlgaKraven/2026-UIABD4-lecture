import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {models,initialValues} from '../src/learning/workbenchModels.ts';
import {variants} from '../authoring/case-scenarios.mjs';
import {describeBoard} from './teacher-case-routes.mjs';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const pack=read('public/teacher-notes.json'),cases=read('authoring/cases.json');
let runs=0,steps=0;
const checks=[];
for(const [i,c]of cases.entries()){
 const n=pack.notes[c.returnSlide],m=models[i],route=c.teacherRoute;
 assert.equal(n.answer,c.solution,c.id);
 assert(n.script.includes(c.condition.context)&&n.script.includes(c.condition.task),c.id+': different condition');
 assert(!n.script.includes('Шаг 1.')&&!n.script.includes('Разбор по шагам:'),c.id+': early solution');
 assert(route?.runs.length,c.id+': no reproducible route');
 for(const r of route.runs)for(const s of r.steps){assert(s.action.trim()&&s.expected.trim()&&s.why.trim(),c.id);assert(!/undefined|NaN|Infinity/.test(s.expected),c.id)}
 if(c.model?.type!=='locks'&&m.kind!=='alert'){
  assert.equal(route.runs.length,1+(variants[i]||[]).length);
  for(const [ri,patch]of [{},...(variants[i]||[])].entries()){
   const rr=route.runs[ri];assert.equal(rr.steps.length,m.actions.length);
   for(const [ai,a]of m.actions.entries()){
    assert(rr.steps[ai].action.includes('«'+a.label+'»'),c.id+': unavailable action');
    assert.equal(rr.steps[ai].expected,describeBoard(a.run({...initialValues(m),...patch})));
   }
  }
 }
 for(const r of route.runs){runs++;steps+=r.steps.length}
 checks.push({id:c.id,conditionMatches:true,runs:route.runs.length,steps:route.runs.reduce((n,r)=>n+r.steps.length,0),scriptBeforeAttempt:true,answerMatches:true});
}
const result={cases:cases.length,runs,steps,conditionAndNotes:true,sourceSha256:crypto.createHash('sha256').update(fs.readFileSync('public/course.json')).digest('hex'),checks};
fs.mkdirSync('output',{recursive:true});fs.writeFileSync('output/teacher-contracts.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({cases:cases.length,runs,steps,status:'passed'}));

