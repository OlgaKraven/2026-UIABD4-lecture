import fs from 'node:fs';
import crypto from 'node:crypto';
import {models,initialValues} from '../src/learning/workbenchModels.ts';
import {briefs,inputTables} from '../authoring/case-briefs.mjs';
import {variants} from '../authoring/case-scenarios.mjs';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8')),save=(p,v)=>fs.writeFileSync(p,JSON.stringify(v,null,2)+'\n');
const describe=b=>[b.columns?.join(' | '),...(b.rows||[]).map(r=>Array.isArray(r)?r.join(' | '):Object.entries(r).map(([k,v])=>k+'='+v).join(', ')),...(b.items||[])].filter(Boolean).join('; ');
const course=read('public/course.json'),pack=read('public/teacher-notes.json'),cases=read('authoring/cases.json'),questions=read('authoring/questions.json');
for(const l of course.lectures)for(const s of l.slides)if(s.kind==='questions')s.title='Вопросы к аудитории';
if(briefs.length!==80||models.length!==80)throw Error('Неполный набор условий');
for(const lecture of course.lectures)lecture.slides=lecture.slides.filter(s=>!s.id.includes('-case-input-'));
function note(id,value){if(pack.notes[id])for(const field of Object.keys(value))if(pack.notes[id][field]!==value[field]){pack.previousNoteHashes??={};const fields=pack.previousNoteHashes[id]??={};fields[field]=[...new Set([...(fields[field]||[]),crypto.createHash('sha256').update(String(pack.notes[id][field]??'')).digest('hex')])]}pack.notes[id]=value}
for(const [i,item] of cases.entries()){
 const [context,task]=briefs[i],model=models[i],values=initialValues(model),lecture=course.lectures.find(l=>l.id===item.lectureId),passport=lecture.slides.find(s=>s.id===item.returnSlide),kicker=passport.kicker,previousContext=item.context,previousOperation=item.operation;
 const observed=model.kind==='alert'?'При исходных 180 с и пороге 1 с первое нарушение обрывается в 10:02; второй отсчёт начинается в 10:03 и достигает firing в 10:06.':model.actions.map(a=>a.label+': '+describe(a.run(values))).join('\n');
 const repeats=(variants[i]||[]).map((patch,n)=>{for(const [key,value] of Object.entries(patch)){const field=model.fields.find(f=>f.key===key);if(!field||field.choices&&!field.choices.includes(String(value)))throw Error(item.id+': недопустимый сценарий '+key)}const changed={...values,...patch};return 'Сравнение '+(n+1)+' ('+Object.entries(patch).map(([k,v])=>model.fields.find(f=>f.key===k).label+'='+v).join('; ')+'):\n'+model.actions.map(a=>a.label+': '+describe(a.run(changed))).join('\n')});
 item.solution=item.solution.split('\n\nИсходный проход модели:\n')[0]+'\n\nИсходный проход модели:\n'+observed+'\n\n'+repeats.join('\n\n');
 const fields=model.fields.map(f=>[f.label,String(values[f.key])]);
 const inputs=[];
 for(let n=0;n<fields.length;n+=4){
  const slide={id:item.id+'-case-input-'+(n/4+1),kind:'example',kicker,title:item.title,visual:{type:'comparison',columns:['Параметр рабочей схемы','Начальное значение'],rows:fields.slice(n,n+4),caption:'Значения уже заполнены в рабочей схеме по этому условию. Сначала выполните исходный проход; изменение параметра начинает новый проход.'}};
  if(n===0&&context.length>280){delete slide.body;slide.visual.caption='Все значения — из условия задачи на следующем слайде. Они уже заполнены в рабочей схеме.'}
  inputs.push(slide);note(slide.id,{script:context+'\n\nИсходные значения:\n'+fields.slice(n,n+4).map(r=>r.join(': ')).join('\n'),preparation:'До запуска рабочей схемы разберите смысл каждого параметра и его единицу.',questions:'Что обозначает каждое значение и где оно используется?',answer:'Используйте заданный исходный набор; параметры меняются только для следующего сравнения.',notebook:'',estimatedSeconds:45});
 }
 if(inputTables[i]){
  for(const s of inputs)delete pack.notes[s.id];inputs.length=0;
  for(const [ti,t] of inputTables[i].entries()){
   const s={id:item.id+'-case-input-'+(ti+1),kind:'example',kicker,title:item.title,visual:{type:'comparison',...t,rows:t.rows.map(r=>r.map(String))}};inputs.push(s);
   note(s.id,{script:context+'\n\n'+t.rows.map(r=>r.join(' | ')).join('\n'),preparation:'Сначала назовите объект каждой строки, ключи и единицы столбцов.',questions:'Какая строка исходной таблицы участвует в выбранном действии?',answer:item.solution,notebook:'',estimatedSeconds:45});
  }
 }
 passport.visual={type:'comparison',columns:['Ситуация и исходные данные','Что требуется получить'],rows:[[context,task]],caption:`В схеме значения уже заданы. Первое действие: «${model.actions[0]?.label||'Продвинуть на 30 с'}». ${model.kind==='alert'?'Продвигайте часы и фиксируйте состояния.':'Затем выполните следующую предметную операцию.'}`};delete passport.body;delete passport.bullets;
 const previous=pack.notes[passport.id];note(passport.id,{...previous,script:context+'\n\n'+task+'\n\nПоказ: сначала разберите значения на предыдущих слайдах. Откройте «Решить задачу» и выполните указанные в условии проходы. Соберите объяснения группы до показа результата. Разбор: '+item.solution,answer:item.solution,preparation:'Условие, числовые входы и единицы находятся на слайдах. Начальный набор уже заполнен. Выполняйте названные в условии изменения, сохраняя остальные входы; смена параметра сбрасывает зависимые операции. Это действия учебной модели, свободный текст решения не вводится.'});
 item.condition={context,task,inputSlides:inputs.map(s=>s.id),initialValues:values,variants:variants[i]||[]};
 for(const s of lecture.slides)if(s.task&&['single','multiple'].includes(s.task.type)&&s.task.prompt.startsWith(previousContext)){
  let rest=s.task.prompt.slice(previousContext.length).trim();if(rest.startsWith(previousOperation))rest=rest.slice(previousOperation.length).trim();
  s.task.prompt=`По исходному набору задачи «${item.title}», до изменения параметров схемы. ${rest}`;
  note(s.id,{...pack.notes[s.id],script:s.task.prompt,questions:s.task.prompt});
 }
 item.context=context;item.operation=task;
 lecture.slides.splice(lecture.slides.indexOf(passport),0,...inputs);
 const q=questions.find(q=>q.questionId===item.id);q.slideIds=q.slideIds.filter(id=>!id.includes('-case-input-'));q.slideIds.splice(q.slideIds.indexOf(passport.id),0,...inputs.map(s=>s.id));q.evidenceSlideIds=[...new Set([...q.evidenceSlideIds.filter(id=>!id.includes('-case-input-')),...inputs.map(s=>s.id)])];
}
const ids=new Set(course.lectures.flatMap(l=>l.slides.map(s=>s.id)));for(const id of Object.keys(pack.notes))if(!ids.has(id))delete pack.notes[id];
save('public/course.json',course);save('public/teacher-notes.json',pack);save('authoring/cases.json',cases);save('authoring/questions.json',questions);
console.log(JSON.stringify({conditions:80,initialValuesOnSlides:cases.reduce((n,c)=>n+c.condition.inputSlides.length,0),slides:ids.size}));
