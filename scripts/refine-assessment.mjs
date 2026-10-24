import fs from 'node:fs';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8')),write=(p,v)=>fs.writeFileSync(p,JSON.stringify(v,null,2)+'\n');
const c=read('public/course.json'),b=read('public/assessment.json'),n=read('public/teacher-notes.json'),cases=read('authoring/cases.json');
const display=value=>value.toLocaleString('ru-RU',{maximumFractionDigits:4});
for(const item of cases){
 const l=c.lectures.find(l=>l.id===item.lectureId),slides=l.slides.filter(s=>s.id.startsWith(item.id+'-'));
 const first=slides.find(s=>s.task?.type==='single'),multi=slides.find(s=>s.task?.type==='multiple');
 const [a,z]=item.checks;
 first.task.prompt=`${item.context} ${item.operation} Укажите: ${a.label.toLowerCase()}.`;
 first.task.options=[{id:'o1',text:display(a.expected)},{id:'o2',text:display(a.expected+2)},{id:'o3',text:display(a.expected===0?1:a.expected/2)},{id:'o4',text:'Из приведённых данных это значение определить нельзя'}];
 b.keys[first.task.id]={type:'single',correct:['o1'],explanation:item.solution,optionExplanations:{o1:`${a.label}: ${display(a.expected)}. ${item.solution}`,o2:'Сопоставьте каждое действие и единицы с условием; это значение не получается из приведённых данных.',o3:'Деление исходного результата на два здесь не обосновано; проверьте число объектов и границы условия.',o4:'В условии указаны данные для этой контрольной точки. Отделите её от более широких выводов.'}};
 multi.task.prompt=`${item.context} Выберите два верных результата для приведённого случая.`;multi.task.choose=2;
 multi.task.options=[{id:'o1',text:`${a.label}: ${display(a.expected)}.`},{id:'o2',text:`${z.label}: ${display(z.expected)}.`},{id:'o3',text:`${a.label}: ${display(a.expected+1)}.`},{id:'o4',text:`${z.label}: ${display(z.expected+1)}.`},{id:'o5',text:'Совпадение двух чисел заменяет проверку хода действий и всех ограничений.'}];
 b.keys[multi.task.id]={type:'multiple',correct:['o1','o2'],explanation:item.solution,optionExplanations:{o1:item.solution,o2:item.solution,o3:`Повторите действие для величины «${a.label}» с указанными в условии данными.`,o4:`Повторите действие для величины «${z.label}» с указанными в условии данными.`,o5:'Числовые контрольные точки подтверждают только часть решения; обоснование и ограничения проверяются отдельно.'}};
 for(const s of slides.filter(s=>s.task)){
  n.notes[s.id].script=`${s.task.prompt} Пауза для самостоятельной попытки. Попросите объяснить ход решения перед раскрытием ответа.`;
  n.notes[s.id].questions=s.task.prompt;
  const key=b.keys[s.task.id];n.notes[s.id].answer=key.type==='matching'?Object.entries(key.pairs).map(([i,o])=>`${s.task.items.find(x=>x.id===i).text} → ${s.task.options.find(x=>x.id===o).text}`).join('\n')+'\n'+key.explanation:key.type==='short'?key.accepted.join(' / ')+'\n'+key.explanation:key.correct.map(id=>s.task.options.find(x=>x.id===id).text).join('\n')+'\n'+key.explanation;
 }
}
for(const l of c.lectures)for(const s of l.slides){
 const note=n.notes[s.id];
 if(s.kind==='title'){note.script=`${l.question} Для ответа будем связывать данные, операции и наблюдаемый результат. После объяснения каждого вопроса предусмотрен самостоятельный случай с новыми условиями.`;note.answer='';}
 if(s.kind==='literature'){note.script=s.readingGroup==='primary'?'Основная литература помогает восстановить определения и разобрать синтаксис СУБД. Выберите источник по рассматриваемой теме; полные описания и ссылки доступны на экране.':'Дополнительная литература предназначена для сопоставления подходов и углубления разобранных примеров. Отличайте общие правила SQL от особенностей MySQL и PostgreSQL.';note.answer='';note.estimatedSeconds=15;}
 if(s.kind==='materials'){note.script='Материалы курса доступны по прямой ссылке и QR-коду. Сохраните контрольные входные данные и результаты своей работы для последующей проверки.';note.answer='';note.estimatedSeconds=15;}
 note.notebook=s.notebook||'';
}
write('public/course.json',c);write('public/assessment.json',b);write('public/teacher-notes.json',n);
console.log('Applied contextual questions and aligned teacher keys.');
