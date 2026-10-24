import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const destination=process.argv[2];
if(!destination)throw Error('Specify the local teaching documents directory.');
const bytes=fs.readFileSync('public/course.json'),course=JSON.parse(bytes),pack=JSON.parse(fs.readFileSync('public/teacher-notes.json','utf8'));
const cases=JSON.parse(fs.readFileSync('authoring/cases.json','utf8'));
fs.mkdirSync(destination,{recursive:true});
const sha=crypto.createHash('sha256').update(bytes).digest('hex');
const write=(file,text)=>fs.writeFileSync(path.join(destination,file),text);
for(const [li,lecture] of course.lectures.entries()){
 const prefix=`${String(li+1).padStart(2,'0')} — ${lecture.title}`;
 let teacher=`# ${lecture.title}\n\n${course.discipline} · ${lecture.semester} семестр\n\n`,presenter=teacher;
 const alignment={schemaVersion:1,courseId:course.id,contentVersion:course.contentVersion,sourceKind:'local',sourceSha256:sha,lectureIds:[lecture.id],documents:{teacher:prefix+'.teacher.md',presenter:prefix+'.presenter.md'},slides:[]};
 for(const [i,slide] of lecture.slides.entries()){
  const note=pack.notes[slide.id];if(!note?.script?.trim())throw Error('Missing script: '+slide.id);
  const anchor=`screen-${String(i+1).padStart(3,'0')}`;
  teacher+=`<a id="${anchor}"></a>\n### ${i+1}. ${slide.title}\n\n${note.script.replace(/\nПоказ:[^\n]+/g,'')}\n\n`;
  const references=(slide.references||[]).map(r=>`- ${r.citation}${r.url?` [Открыть источник](${r.url})`:''}`).join('\n');
  if(references)teacher+=references+'\n\n';
  if(slide.kind==='materials')teacher+=`[Материалы курса](${course.materialsUrl})\n\n`;
  if(slide.notebook)teacher+=`**Запишите:** ${slide.notebook}\n\n`;
  if(slide.task)teacher+=`**Разбор после попытки.** ${note.answer}\n\n`;
  const item=cases.find(item=>item.returnSlide===slide.id);
  if(item)teacher+=`**Задача для группового разбора.** ${item.context} ${item.operation}\n\n**Показ:** кнопка «Решить задачу» открывает рабочую схему на этом слайде. Сначала соберите устные объяснения, затем выполните предложенные операции, измените исходные параметры и сравните результат. В штатном режиме показа окно аудитории следует за действиями преподавателя.\n\n**Разбор.** ${item.solution}\n\n`;
  presenter+=`<a id="${anchor}"></a>\n## ${i+1}. ${slide.title}\n\n${note.script}\n\n`;
  if(references)presenter+=references+'\n\n';
  if(slide.kind==='materials')presenter+=`[Материалы курса](${course.materialsUrl})\n\n`;
  if(note.preparation)presenter+=`**До показа:** ${note.preparation}\n\n`;
  if(note.notebook)presenter+=`**Запишите:** ${note.notebook}\n\n`;
  if(note.questions)presenter+=`**Вопрос группе:** ${note.questions}\n\n`;
  if(note.answer)presenter+=`**Ответ и разбор:** ${note.answer}\n\n`;
  if(lecture.slides[i+1])presenter+=`**Далее:** ${lecture.slides[i+1].title}.\n\n`;
  alignment.slides.push({lectureId:lecture.id,slideId:slide.id,displayNumber:i+1,title:slide.title,anchors:{teacher:anchor,presenter:anchor}});
 }
 write(prefix+'.teacher.md',teacher);write(prefix+'.presenter.md',presenter);write(prefix+'.alignment.json',JSON.stringify(alignment,null,2)+'\n');
 for(const type of ['teacher','presenter'])for(const row of alignment.slides)if(!fs.readFileSync(path.join(destination,alignment.documents[type]),'utf8').includes(`<a id="${row.anchors[type]}"></a>`))throw Error('Missing anchor');
}
write('teacher-pack.json',JSON.stringify(pack,null,2)+'\n');
console.log(JSON.stringify({lectures:course.lectures.length,documents:course.lectures.length*2,alignedSlides:course.lectures.reduce((n,l)=>n+l.slides.length,0),sourceSha256:sha,destination}));
