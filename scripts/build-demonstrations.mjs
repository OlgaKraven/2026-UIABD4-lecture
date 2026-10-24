import fs from 'node:fs';
import crypto from 'node:crypto';
import {boards,branches} from '../authoring/demonstrations.mjs';
import {explanationBoards} from '../authoring/explanation-boards.mjs';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8')),write=(p,v)=>fs.writeFileSync(p,JSON.stringify(v,null,2)+'\n');
const cases=read('authoring/cases.json'),course=read('public/course.json'),pack=read('public/teacher-notes.json');
const inputs=read('src/learning/visual-inputs.json');
if(boards.length!==cases.length)throw Error('Every task needs an authored demonstration');
const models=cases.map((c,i)=>({id:c.id,scenarios:(branches[i]||[{label:'Условие задачи',frames:boards[i]}]).map((s,j)=>({...s,conclusion:j===0?c.solution:i===4?'После замены NULL нулём COUNT(amount)=5, SUM=30 и AVG=30/5=6. Это изменение смысла исходных данных.':i===39?'При весах 0,8/0,2 A=4,4, B=3,4: предпочтение изменилось из-за весов. Обязательные ограничения по-прежнему проверяются раньше баллов.':s.frames.at(-1).board.rows?.map(r=>r.join(': ')).join('; ')||c.solution}))}));
write('src/learning/demonstrations.json',models);
if(explanationBoards.length!==80)throw Error('Every worked example needs its own board');
write('src/learning/explanation-boards.json',Object.fromEntries(cases.map((c,i)=>[c.id+'-logic',explanationBoards[i]])));
for(const [i,c] of cases.entries()){
 const slide=course.lectures.find(l=>l.id===c.lectureId).slides.find(s=>s.id===c.id+'-logic'),b=explanationBoards[i],caption=inputs[slide.id].steps.at(-1).text;
 slide.visual=b.kind==='table'?{type:'comparison',columns:b.columns,rows:b.rows,caption}:b.kind==='bars'?{type:'bars',items:b.rows,max:b.max,unit:b.unit,caption}:b.kind==='timeline'?{type:'comparison',columns:['Интервал / точки',`Время, ${b.unit}`,'Состояние'],rows:b.rows.map(r=>[r.label,r.points?r.points.join(', '):`${r.start}–${r.end}`,r.state]),caption}:{type:'process',items:b.items.map((text,j)=>({title:`Действие ${j+1}`,text})),caption};
}
pack.previousNoteHashes??={};
for(const c of cases){
 const l=course.lectures.find(l=>l.id===c.lectureId),s=l.slides.find(s=>s.id===c.returnSlide),n=pack.notes[s.id];
 for(const f of ['script','preparation','notebook','questions','answer'])if(n[f]){const h=crypto.createHash('SHA256').update(n[f]).digest('hex');(pack.previousNoteHashes[s.id]??={})[f]=[...new Set([...(pack.previousNoteHashes[s.id][f]||[]),h])];}
 s.title='Решите задачу вместе';s.body='Описание задачи. '+c.context;
 s.bullets=['Что делаем. '+c.operation,'Обсудите действия с группой и покажите решение по шагам.'];s.supplement.label='Решить задачу';
 n.script=`Предложите группе задачу: ${c.context} Что делаем: ${c.operation} Попросите устно назвать первое действие. Откройте «Решить задачу» и показывайте следующий шаг только после обсуждения. Сопоставляйте строки, единицы и состояния на схеме. ${c.solution}`;
 n.preparation='Откройте демонстрацию и проверьте начальное состояние. Если доступны разные условия, покажите каждое с начала. Студенты отвечают устно; ввод текста и выбор тестового ответа не используются.';
 n.questions='Какое действие выполняем следующим? Какие данные изменились? Что осталось неизвестным? Как проверить вывод?';
}
for(const [id,note] of Object.entries(pack.notes))for(const field of ['script','preparation','notebook','questions','answer']){
 const before=note[field];let after=before.replaceAll('самостоятельный случай','случай для группового разбора').replaceAll('самостоятельного случая','случая для группового разбора');
 if(id.endsWith('-title')&&field==='preparation')after=after.split(' Официальный тематический план')[0];
 if(id.endsWith('-exam')&&field==='preparation')after='Подготовьте исходные данные и контрольный пример по теме. Согласуйте с группой критерии результата; полный разбор следует после необходимых понятий.';
 if(id.endsWith('-exam')&&field==='script')after=after.replace(/ Это связь с заданиями .*? Время ДЭ не приравниваем ко времени объяснения лекции\./,'');
 if(after!==before){(pack.previousNoteHashes[id]??={})[field]=[...new Set([...(pack.previousNoteHashes[id]?.[field]||[]),crypto.createHash('sha256').update(before).digest('hex')])];note[field]=after;}
}
write('public/course.json',course);write('public/teacher-notes.json',pack);
console.log(JSON.stringify({demonstrations:models.length,scenarios:models.reduce((n,m)=>n+m.scenarios.length,0)}));
