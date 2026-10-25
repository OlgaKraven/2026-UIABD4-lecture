import fs from 'node:fs';
import assert from 'node:assert/strict';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const c=read('public/course.json'),p=read('public/teacher-notes.json'),keys=read('public/assessment.json').keys,code=read('authoring/teacher-code-guides.json');
let diagrams=0,codes=0,matching=0;
for(const [li,l]of c.lectures.entries()){
 const guide=(await import('../authoring/teacher-guides/'+String(li+1).padStart(2,'0')+'.mjs')).default;
 assert.equal(guide.length,8,l.id);
 for(const s of l.slides){
  const n=p.notes[s.id];assert(n?.script?.trim(),s.id);assert.equal(n.notebook,s.notebook||'',s.id+': notebook changed');
  assert(!n.script.includes('Показ: прочитайте условие, проследите действие'),s.id+': old placeholder');
  const q=s.id.match(/-q(\d{2})-/),qi=q?Number(q[1])-1:null;
  if(s.id.endsWith('-logic')){assert(n.script.includes(guide[qi][0]),s.id+': missing mechanism');assert(n.script.includes('Развернуть схему'),s.id);diagrams++;}
  if(s.id.endsWith('-contrast')||s.id.endsWith('-changed-result'))assert(n.script.includes(guide[qi][1]),s.id+': missing condition reasoning');
  if(s.id.endsWith('-section')&&qi>0)assert(n.script.includes(guide[qi-1][2]),s.id+': missing topic bridge');
  if(s.kind==='summary')assert(n.script.includes(guide[7][2]),s.id+': missing lecture bridge');
  if(s.visual?.type==='codeParts'){assert.equal(n.script,code[s.id],s.id+': missing code guide');codes++;}
  if(s.task){
   const t=s.task,k=keys[t.id];assert(k,t.id);
   if(t.type==='matching'){for(const [a,b]of Object.entries(k.pairs))assert(n.answer.includes(t.items.find(i=>i.id===a).text+' → '+t.options.find(o=>o.id===b).text),t.id+': missing pair');matching++;}
   if(t.type==='short')for(const a of k.accepted)assert(n.answer.includes(a),t.id);
   if(t.type==='single'||t.type==='multiple')for(const id of k.correct)assert(n.answer.includes(t.options.find(o=>o.id===id).text),t.id);
  }
 }
}
assert.equal(codes,Object.keys(code).length);
const result={lectures:c.lectures.length,slides:c.lectures.reduce((n,l)=>n+l.slides.length,0),diagramExplanations:diagrams,codeExplanations:codes,completeMatchingAnswers:matching,notebooksPreserved:true,status:'passed'};
fs.writeFileSync('output/teacher-full-contracts.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));

