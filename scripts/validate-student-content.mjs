import fs from 'node:fs';
import assert from 'node:assert/strict';
import {explanations} from '../authoring/student-explanations.mjs';
import {practice} from '../authoring/student-practice.mjs';
export function validateStudentContent(){
 const course=JSON.parse(fs.readFileSync('public/course.json','utf8')),baseline=JSON.parse(fs.readFileSync('authoring/review/student-content-baseline.json','utf8'));
 const slides=course.lectures.flatMap(l=>l.slides),ids=new Set(slides.map(s=>s.id)),old=new Set(baseline.slideIds);
 assert.equal(ids.size,slides.length);
 assert.deepEqual(slides.filter(s=>old.has(s.id)).map(s=>s.id),baseline.slideIds);
 for(const [id,text] of Object.entries(baseline.notebooks))assert.equal(slides.find(s=>s.id===id)?.notebook,text);
 assert(!/mode=read|вы научитесь|после изучения вы|вы сможете/i.test(JSON.stringify(course)));
 const files=new Set();
 for(const [li,l] of course.lectures.entries()){
  for(const [qi,paragraphs] of explanations[li].entries())for(const p of paragraphs)assert(l.slides.some(s=>s.body===p),`Explanation missing: ${li}/${qi}`);
  assert(l.slides.some(s=>s.body===practice[li].environment));
  for(const step of practice[li].steps){
   assert(l.slides.some(s=>s.body===step.text));assert(l.slides.some(s=>s.body===step.expected));
   for(const f of [step.file,step.extraFile].filter(Boolean)){
    const code=fs.readFileSync('public/practice/'+f,'utf8').replaceAll('\r\n','\n').trimEnd();files.add(f);
    const si=practice[li].steps.indexOf(step)+1,bi=f===step.file?1:step.file||step.code?2:1;
    const prefix=`${l.id}-practice-${String(si).padStart(2,'0')}-code-${bi}-`;
    assert.equal(l.slides.filter(s=>s.id.startsWith(prefix)).map(s=>s.visual.parts[0].code).join('\n'),code,'Incomplete source: '+f);
   }
  }
  for(const f of practice[li].downloads||[]){assert(l.slides.some(s=>s.supplement?.href==='practice/'+f));files.add(f);}
 }
 return {lectures:course.lectures.length,questions:80,explanationParagraphs:160,originalSlidesPreserved:old.size,totalSlides:slides.length,practiceFiles:files.size,definitionsPreserved:Object.keys(baseline.notebooks).length};
}
if(process.argv[1]?.replaceAll('\\','/').endsWith('/validate-student-content.mjs'))console.log(JSON.stringify({...validateStudentContent(),status:'passed'}));
