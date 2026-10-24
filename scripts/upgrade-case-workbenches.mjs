import fs from 'node:fs';
import crypto from 'node:crypto';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8')),write=(p,v)=>fs.writeFileSync(p,JSON.stringify(v,null,2)+'\n');
const course=read('public/course.json'),pack=read('public/teacher-notes.json'),cases=read('authoring/cases.json');
for(const c of cases){
 const slide=course.lectures.find(l=>l.id===c.lectureId).slides.find(s=>s.id===c.returnSlide);
 slide.title=c.title;delete slide.body;delete slide.bullets;
 slide.visual={type:'comparison',columns:['Описание задачи','Что делаем'],rows:[[c.context,c.operation]],caption:'Обсудите первое действие. По кнопке откройте рабочую схему и выполните операции с данными.'};
 const note=pack.notes[slide.id],patch={script:`${c.context} ${c.operation} Попросите группу предложить первое действие и объяснить его смысл. Откройте рабочую схему: изменяйте исходные данные, выполняйте предметные операции, сопоставляйте полученный результат. Для аудитории используйте «Окно для группы». Исходный разбор: ${c.solution}`,preparation:'Проверьте исходные значения рабочей модели. Условие и задание находятся на слайде; отдельного вступительного экрана нет. Операции вычисляют результат по текущим входам. Поля не являются проверкой знаний и не требуют ввода объяснения.',questions:'Какую операцию применим? Что изменилось в данных? Какой результат даст другой вход?'};
 for(const [field,value] of Object.entries(patch))if(note[field]!==value){pack.previousNoteHashes??={};const hashes=pack.previousNoteHashes[slide.id]??={};hashes[field]=[...new Set([...(hashes[field]||[]),crypto.createHash('sha256').update(note[field]).digest('hex')])];note[field]=value;}
}
write('public/course.json',course);write('public/teacher-notes.json',pack);
console.log(JSON.stringify({caseConditionsOnSlides:cases.length,workingModels:80}));
