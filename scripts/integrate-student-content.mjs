import fs from 'node:fs';
import crypto from 'node:crypto';
import {explanations} from '../authoring/student-explanations.mjs';
import {lessons} from '../authoring/student-lessons.mjs';
import {practice} from '../authoring/student-practice.mjs';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const write=(p,v)=>fs.writeFileSync(p,JSON.stringify(v,null,2)+'\n');
const course=read('public/course.json'),pack=read('public/teacher-notes.json'),questions=read('authoring/questions.json');
const generated=s=>s.id.includes('-explanation-')||s.id.includes('-practice-')||s.id.endsWith('-prerequisites');
const digest=v=>crypto.createHash('sha256').update(v).digest('hex');
function note(s,answer=''){
 const script=[s.body,...(s.bullets||[]),...(s.visual?.parts||[]).map(p=>p.code+'\n'+p.explanation)].filter(Boolean).join('\n\n');
 const next={script:script+'\nПоказ: прочитайте условие, проследите действие и сопоставьте результат с данными на слайде.',preparation:'Использовать исходные данные и условия на слайдах этой лекции.',questions:'Какое условие изменит результат и как это проверить?',answer,notebook:s.notebook||'',estimatedSeconds:Math.max(30,Math.ceil(script.length/9))};
 if(pack.notes[s.id])for(const key of Object.keys(next))if(typeof next[key]==='string'&&pack.notes[s.id][key]!==next[key]){
  pack.previousNoteHashes??={};const fields=pack.previousNoteHashes[s.id]??={};fields[key]=[...new Set([...(fields[key]||[]),digest(String(pack.notes[s.id][key]||''))])];
 }
 pack.notes[s.id]=next;
}
function codePages(code){
 // Keep source lines intact: a continued statement may span adjacent slides.
 const lines=code.replaceAll('\r\n','\n').trimEnd().split('\n'),pages=[];let page=[],cost=0;
 for(const line of lines){const size=Math.max(1,Math.ceil(line.length/76));if(cost+size>7&&page.length){pages.push(page.join('\n'));page=[];cost=0;}page.push(line);cost+=size;}
 if(page.length)pages.push(page.join('\n'));return pages;
}
for(const [li,lecture] of course.lectures.entries()){
 lecture.slides=lecture.slides.filter(s=>!generated(s));
 const meta=lessons[li],lab=practice[li];
 for(const s of lecture.slides)if(s.supplement?.href.includes('mode=read'))delete s.supplement;
 const context=lecture.slides.find(s=>s.id===lecture.id+'-context');context.body=meta.intro;delete context.bullets;note(context);
 const prerequisite={id:lecture.id+'-prerequisites',kind:'theory',kicker:'Исходные понятия',title:'Опора для разбора',body:meta.prerequisites};note(prerequisite);
 lecture.slides.splice(lecture.slides.indexOf(context)+1,0,prerequisite);
 const applied=lecture.slides.find(s=>s.id===lecture.id+'-exam');applied.title='Задача лекции';applied.body=lab.title+'. '+lab.steps[0].text;delete applied.bullets;note(applied);
 for(let qi=0;qi<8;qi++){
  const qid=`${lecture.id}-q${String(qi+1).padStart(2,'0')}`,concept=lecture.slides.find(s=>s.id===qid+'-concept'),paragraphs=explanations[li][qi];
  concept.body=paragraphs[0];delete concept.bullets;note(concept,paragraphs.join(' '));
  const continuation={id:qid+'-explanation-2',kind:'theory',kicker:`Вопрос ${qi+1} · продолжение`,title:concept.title,body:paragraphs[1]};note(continuation,paragraphs.join(' '));
  lecture.slides.splice(lecture.slides.indexOf(concept)+1,0,continuation);
  const q=questions.find(q=>q.questionId===qid);q.slideIds=q.slideIds.filter(id=>!id.includes('-explanation-'));q.slideIds.splice(q.slideIds.indexOf(concept.id)+1,0,continuation.id);q.evidenceSlideIds=[...new Set([...q.evidenceSlideIds,continuation.id])];
 }
 const code=lecture.slides.find(s=>s.id===lecture.id+'-code');code.body='Пример использует учебные данные практики далее в этой лекции.';code.visual.caption='Исходные данные и порядок выполнения — на следующих слайдах.';code.supplement={label:'К исходным данным',href:`?lecture=${lecture.id}&slide=${lecture.id}-practice-environment`};note(code,lab.steps.at(-1).expected);
 const practiceSlides=[];
 function append(s,answer){practiceSlides.push(s);note(s,answer);}
 append({id:lecture.id+'-practice-environment',kind:'theory',kicker:'Практика',title:lab.title,body:lab.environment});
 if(lab.downloads)for(const [fi,file] of lab.downloads.entries())append({id:lecture.id+'-practice-file-'+(fi+1),kind:'theory',kicker:'Практика · подготовка',title:'Файлы для локального запуска',body:`Сохраните ${file} в общую рабочую папку. ${file.endsWith('.py')?'Это источник синтетических метрик; он не подключается к базе данных.':'Файл используется в командах практики на следующих слайдах.'}`,supplement:{label:'Скачать '+file,href:'practice/'+file}});
 for(const [si,step] of lab.steps.entries()){
  const id=lecture.id+'-practice-'+String(si+1).padStart(2,'0');
  append({id:id+'-action',kind:'theory',kicker:`Практика · шаг ${si+1}`,title:step.title,body:step.text});
  const blocks=[];
  if(step.file)blocks.push({code:fs.readFileSync('public/practice/'+step.file,'utf8'),file:step.file,label:'SQL · MySQL',command:`В клиенте mysql: SOURCE ${step.file};`+(step.file==='10-common.sql'?` В клиенте psql: \\i ${step.file}`:'')});
  else if(step.code)blocks.push({code:step.code,label:'Команды',command:'Выполните команды в указанной среде.'});
  if(step.extraFile)blocks.push({code:fs.readFileSync('public/practice/'+step.extraFile,'utf8'),file:step.extraFile,label:'SQL · PostgreSQL',command:`В клиенте psql: \\i ${step.extraFile}`});
  for(const [bi,block] of blocks.entries()){
   const pages=codePages(block.code);
   if(block.file)append({id:id+`-source-${bi+1}`,kind:'theory',kicker:`Практика · шаг ${si+1}`,title:'Запуск учебного файла',body:`Сохраните ${block.file} в рабочую папку клиента. ${block.command} На следующих слайдах приведён полный код файла; продолжения составляют одну программу.`,supplement:{label:'Скачать '+block.file,href:'practice/'+block.file}});
   for(const [pi,part] of pages.entries())append({id:id+`-code-${bi+1}-${pi+1}`,kind:'example',kicker:`Практика · шаг ${si+1}`,title:`Команды шага ${si+1}${pages.length>1?` · ${pi+1}/${pages.length}`:''}`,visual:{type:'codeParts',parts:[{label:block.label,code:part,explanation:pages.length>1?'Выполняйте файл целиком, включая продолжения.':block.command}],caption:'После выполнения проверьте ожидаемый результат шага.'}});
  }
  append({id:id+'-check',kind:'example',kicker:`Практика · проверка ${si+1}`,title:'Ожидаемый результат',body:step.expected},step.expected);
 }
 const summary=lecture.slides.find(s=>s.id===lecture.id+'-summary');summary.body=meta.bridge;delete summary.bullets;note(summary,lab.steps.at(-1).expected);
 lecture.slides.splice(lecture.slides.indexOf(summary),0,...practiceSlides);
}
const ids=new Set(course.lectures.flatMap(l=>l.slides.map(s=>s.id)));
for(const id of Object.keys(pack.notes))if(!ids.has(id))delete pack.notes[id];
write('public/course.json',course);write('public/teacher-notes.json',pack);write('authoring/questions.json',questions);
console.log(JSON.stringify({lectures:course.lectures.length,slides:ids.size,explanations:80,sourceSha256:digest(fs.readFileSync('public/course.json'))}));
