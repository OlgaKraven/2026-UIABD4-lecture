import fs from 'node:fs';
import assert from 'node:assert/strict';
import {examples} from '../authoring/examples.mjs';
import {variations} from '../authoring/variations.mjs';
const cases=JSON.parse(fs.readFileSync('authoring/cases.json','utf8'));
const course=JSON.parse(fs.readFileSync('public/course.json','utf8'));
const baseline=JSON.parse(fs.readFileSync('authoring/review/baseline.json','utf8'));
const notes=JSON.parse(fs.readFileSync('public/teacher-notes.json','utf8'));
const inputs=JSON.parse(fs.readFileSync('src/learning/visual-inputs.json','utf8'));
const mean=a=>a.reduce((s,v)=>s+v,0)/a.length;
const median=a=>[...a].sort((a,b)=>a-b)[Math.floor(a.length/2)];
// Independently derive the checkpoints from the stated datasets and rules.
const calculated=[
 [[2,120+80],[2,2/5*100],[3,4],[3,2],[3,(0+12+18)/3],[12000/2000,48/16],[median([9,10,11,12,58]),mean([9,10,11,12,58])],[2,40+60+100]],
 [[7*20+2*15,7*20+2*15+50],[2*3,40+60+10+20+30],[7.25*6,6],[12*1.5,12*1.5*20],[80+120,2],[25+25+40+40,25+40],[8*45,8*70],[7*18,7*21]],
 [[1,2],[2+1,0],[2,4],[3,2],[2,2],[1,0],[3,2],[4/6*100,2]],
 [[median([80,100,90]),median([80,100,90])/median([40,45,50])],[5000/500,32/8],[4*6,5],[50000/250,200],[20/10000*100,9000/10000*100],[2,2],[median([6,8,10])/median([3,4,5]),100/25],[1,120/30]],
 [[30*4/60,30*4/60*80],[1,900/200],[32*16,3*1024+2*1024+32*16],[24-6-4-2,24-6-4-2-10],[800*2,1000/2],[5*8,5*8/200*1000],[300*1.2,300*1.2+40+100],[5*.4+2*.6,3*.4+5*.6]],
 [[Math.max(40,500,60),1],[(2180-2000)/90,35],[mean([20,20,20,20,20,20,20,20,100,900]),100],[60+15,60+15+20+5],[6/2,6-2],[82-70,(82-70)/240],[60-25,70-60],[2147483648/1024**3,60/20]],
 [[27,1],[5,0],[12-3,(12-3)/12*100],[750/1000,.75/.5],[4*3*2,4*3*2*500],[1,2],[2*86400/15,240*2*86400/15],[400/1000,500/1000]],
 [[1.6/.8,100],[(30-18)/2,18/6],[90/300*100,90/15],[2,3],[6,120],[160/200*100,40/200*100],[2,1],[15-10,17-15]],
 [[200-100,200/50],[3*60,5*60],[(12-3)/3,3/3],[120/2400*100,120/3],[60,60],[30-4,4],[2,2],[15-8,3]],
 [[2,10+20+30+40],[3307,5433],[2,2],[1,3],[4000000000-2147483647,0],[1,2],[18,.018*1000],[1,1]]
].flat();
assert.equal(cases.length,80);assert.equal(new Set(cases.map(c=>c.id)).size,80);
for(const [index,item] of cases.entries()){
 assert(item.context.trim()&&item.operation.trim()&&item.solution.trim(),item.id+': insufficient task');
 for(const [i,check] of item.checks.entries())assert(Math.abs(check.expected-calculated[index][i])<1e-7,item.id+': wrong checkpoint '+i);
 const lecture=course.lectures.find(l=>l.id===item.lectureId),passport=lecture?.slides.find(s=>s.id===item.returnSlide);
 assert(passport?.supplement?.href.includes(item.id),item.id+': broken return/launch');
 assert(lecture.slides.findIndex(s=>s.id===item.returnSlide)+1===lecture.slides.findIndex(s=>s.id===item.id+'-T01-slide'),item.id+': passport placement');
 assert.equal(notes.notes[passport.id].answer,item.solution);
}
for(const old of baseline.slides){
 const l=course.lectures.find(l=>l.id===old.id);const oldIds=new Set(old.slideIds);assert.deepEqual(l.slides.filter(s=>oldIds.has(s.id)).map(s=>s.id),old.slideIds.filter(id=>!course.slideAliases?.[id]));
 for(const s of l.slides){assert(!s.source,'Service source returned: '+s.id);assert(notes.notes[s.id]?.script.trim());}
}
for(const [li,l] of course.lectures.entries())for(let qi=0;qi<8;qi++){
 const id=`${l.id}-q${String(qi+1).padStart(2,'0')}`,e=examples[li][qi];
 assert.equal(inputs[id+'-logic'].body,'Учебные данные. '+e.input);
 assert.equal(l.slides.find(s=>s.id===id+'-example').body,'Учебные данные. '+variations[li][qi].input);
 assert.notEqual(variations[li][qi].input,cases[li*8+qi].context);
}
const slides=course.lectures.flatMap(l=>l.slides);
const demos=JSON.parse(fs.readFileSync('src/learning/demonstrations.json','utf8'));
const diagrams=JSON.parse(fs.readFileSync('src/learning/explanation-boards.json','utf8'));
assert.deepEqual(demos.map(m=>m.id),cases.map(c=>c.id));assert.equal(Object.keys(diagrams).length,80);
for(const l of course.lectures){
 for(const group of ['primary','additional']){
  const bibliography=l.slides.filter(s=>s.readingGroup===group);assert.equal(bibliography.length,1);assert.equal(bibliography[0].references.length,3);
  assert.equal(new Set(bibliography[0].references.map(r=>r.url)).size,3);
 }
}
for(const demo of demos)for(const scenario of demo.scenarios){
 assert(scenario.conclusion.trim());assert.equal(scenario.frames.length,3);
 for(const frame of scenario.frames){
  const b=frame.board;assert(frame.title.trim()&&frame.prompt.trim());assert(['table','bars','chain','timeline'].includes(b.kind));
  if(b.kind==='table')for(const row of b.rows)assert.equal(row.length,b.columns.length);
  if(b.kind==='bars'){assert(b.unit&&b.max>0);for(const r of b.rows)assert(r.value>=0&&r.value<=b.max);}
  if(b.kind==='timeline'){assert(b.unit&&b.max>0);for(const r of b.rows)assert(r.start>=0&&r.start<=r.end&&r.end<=b.max);}
 }
}
assert.equal(demos[4].scenarios[0].frames[2].board.items.at(-1),'AVG = 30 / 3 = 10');
assert.equal(demos[4].scenarios[1].frames[2].board.items.at(-1),'AVG = 30 / 5 = 6');
assert.equal(Object.keys(notes.notes).length,slides.length);
for(const [from,to] of Object.entries(course.slideAliases||{})){assert(!slides.some(s=>s.id===from));assert(slides.some(s=>s.id===to));}
console.log(JSON.stringify({cases:80,scenarios:demos.reduce((n,d)=>n+d.scenarios.length,0),explanationDiagrams:80,independentCheckpoints:160,retainedOriginalSlides:baseline.slides.reduce((n,l)=>n+l.slideIds.filter(id=>!course.slideAliases?.[id]).length,0),notes:slides.length,status:'passed'}));
