import fs from 'node:fs';
import {variations} from '../authoring/variations.mjs';
import {examples} from '../authoring/examples.mjs';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8')),write=(p,v)=>fs.writeFileSync(p,JSON.stringify(v,null,2)+'\n');
const c=read('public/course.json'),n=read('public/teacher-notes.json'),inputs={};
for(const [li,l] of c.lectures.entries())for(let qi=0;qi<8;qi++){
 const id=`${l.id}-q${String(qi+1).padStart(2,'0')}`,v=variations[li][qi],e=examples[li][qi];
 if(!v?.input||!v.result)throw Error('Missing variation '+id);
 const s=l.slides.find(s=>s.id===id+'-example'),contrast=l.slides.find(s=>s.id===id+'-contrast');
 s.title='Изменённое условие';s.body='Учебные данные. '+v.input;s.steps=[{title:'Разбор изменения',text:v.result}];
 contrast.title='Как условие меняет вывод';contrast.visual={type:'comparison',columns:['Первоначальные условия','Изменённые условия'],rows:[[e.result,v.result]],caption:'Сопоставьте существенное изменение входа или ограничения. Вывод следует из соответствующего условия.'};
 n.notes[s.id].script=`${v.input} ${v.result} Сопоставьте новое условие с уже разобранным механизмом; именно это изменение обосновывает новый вывод.`;
 n.notes[s.id].questions='Какое условие изменилось и почему прежний вывод нельзя переносить без проверки?';n.notes[s.id].answer=v.result;
 n.notes[contrast.id].script=`В исходном случае установлено: ${e.result} После изменения условия: ${v.result} Выводы относятся к разным условиям. Обозначьте, какое свидетельство отличает эти случаи.`;
 n.notes[contrast.id].questions='Как отличить эти два случая по данным, а не по общему названию темы?';n.notes[contrast.id].answer=v.result;
 inputs[id+'-logic']={body:'Учебные данные. '+e.input,steps:[{title:'Решение',text:e.solution},{title:'Результат и интерпретация',text:e.result}]};
}
write('public/course.json',c);write('public/teacher-notes.json',n);write('src/learning/visual-inputs.json',inputs);
console.log('Replaced repeated worked examples with 80 changed conditions.');
