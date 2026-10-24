import fs from 'node:fs';
import crypto from 'node:crypto';
import {examples} from '../authoring/examples.mjs';
import {caseRows} from '../authoring/cases.mjs';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const write=(p,v)=>fs.writeFileSync(p,JSON.stringify(v,null,2)+'\n');
const c=read('public/course.json'),notes=read('public/teacher-notes.json');
if(c.contentVersion==='uiabd4-2026.10.24')throw Error('Редакция уже применена; редактируйте course.json и teacher-notes.json непосредственно.');
write('authoring/review/baseline.json',{sourceSha256:crypto.createHash('sha256').update(fs.readFileSync('public/course.json')).digest('hex'),slides:c.lectures.map(l=>({id:l.id,slideIds:l.slides.map(s=>s.id)}))});
notes.previousNoteHashes=Object.fromEntries(Object.entries(notes.notes).map(([id,n])=>[id,Object.fromEntries(Object.entries(n).map(([field,v])=>[field,[crypto.createHash('sha256').update(String(v)).digest('hex')]]))]));
c.contentVersion=notes.contentVersion='uiabd4-2026.10.24';
c.code='МДК.07.01'; c.logo='brand/synergy-wordmark.jpg'; c.mascot='brand/mascot/uiabd-administrator.png'; c.mascotAlt='Носорог администрирует базу данных и исследует показатели сервера';
const bank=read('public/assessment.json');bank.contentVersion=c.contentVersion;
const questions=read('authoring/questions.json');
const cases=[];
for(const [li,l] of c.lectures.entries()){
 const extra=new Map();
 for(let qi=0;qi<8;qi++){
  const qid=`${l.id}-q${String(qi+1).padStart(2,'0')}`,e=examples[li][qi],row=caseRows[li][qi];
  const get=suffix=>l.slides.find(s=>s.id===qid+'-'+suffix);
  const section=get('section'),concept=get('concept'),logic=get('logic'),contrast=get('contrast'),warning=get('warning'),notebook=get('notebook');
  concept.body=`${e.term.charAt(0).toUpperCase()+e.term.slice(1)} — ${e.definition.charAt(0).toLowerCase()+e.definition.slice(1)}`;
  concept.bullets=[section.body];
  notebook.notebook=concept.body;notebook.body=e.result;delete notebook.bullets;
  // Native diagrams retain the actual data and technical meaning of this question.
  if(li===0&&qi===2){logic.visual={type:'comparison',columns:['Заказ','Позиции','Вклад в INNER JOIN'],rows:[['101','A, B','101/A; 101/B'],['102','C','102/C']],caption:'ON orders.id=items.order_id: три строки. Без ON: 2×3=6 пар.'};}
  else if(li===0&&qi===4){logic.visual={type:'comparison',columns:['Значения','COUNT(*)','COUNT(amount)','SUM','AVG'],rows:[['10, NULL, 20','3','2','30','15']],caption:'AVG делит сумму на число известных значений; NULL не равен нулю.'};}
  else if(li===0&&qi===3){logic.visual={type:'comparison',columns:['Филиал','Исходные суммы','SUM'],rows:[['1','100, 200','300'],['2','50','50']],caption:'GROUP BY branch_id. Общая сумма 350 сохраняется.'};}
  else if(li===1&&qi===1){logic.visual={type:'network',nodes:[{id:'m',title:'Материалы',text:'2 строки → один итог'},{id:'o',title:'Заказ',text:'1 строка на заказ'},{id:'p',title:'Операции',text:'3 строки → один итог'}],edges:[{from:'m',to:'o',label:'SUM по order_id'},{from:'p',to:'o',label:'SUM по order_id'}],caption:'Сначала агрегируем независимые дочерние наборы. Прямой JOIN даёт 2×3=6 комбинаций.'};}
  else if(li===1&&qi===3){logic.visual={type:'comparison',columns:['Величина','Действие','Результат'],rows:[['Выпуск × норма','10 шт. × 2 кг/шт.','20 кг'],['Масса × цена','20 кг × 30 руб./кг','600 руб.']],caption:'Единицы сокращаются: шт. → кг → руб. Норму повторно не применяем.'};}
  else if(li===2&&qi===4){logic.visual={type:'decision',start:'INSERT: количество 2 или −1',question:'Количество > 0?',yes:'BEFORE пройден → INSERT → AFTER: аудит',no:'Ошибка BEFORE → успешной строки и аудита нет',caption:'MySQL 8.4, учебные таблицы InnoDB. Ветвь определяется значением входа.'};}
  else if(li===2&&qi===5){logic.visual={type:'beforeAfter',before:{title:'Незавершённая транзакция',fields:[{label:'Первый UPDATE',value:'выполнен'},{label:'Второй оператор',value:'ошибка'}]},after:{title:'Явный ROLLBACK',fields:[{label:'Статус заказа',value:'исходный'},{label:'Изменения транзакции',value:'отменены'}]},changes:['Ошибка оператора и откат всей транзакции имеют разные границы.'],caption:'Условие: транзакционные таблицы InnoDB; класс ошибки проверяется отдельно.'};}
  else if(li===3&&[0,6].includes(qi)){logic.visual={type:'bars',items:qi===0?[{label:'До, медиана',value:110},{label:'После, медиана',value:55}]:[{label:'INSERT до',value:4},{label:'INSERT после',value:8}],max:qi===0?120:10,unit:'мс',caption:qi===0?'Учебные измерения на одинаковых данных: 110/55=2 раза.':'Цена записи растёт: медиана 4→8 мс. Профиль нагрузки определяет компромисс.'};}
  else if(li===4&&qi===5){logic.visual={type:'comparison',columns:['Объём','Канал','Идеальная передача'],rows:[['2 МБ = 16 Мбит','100 Мбит/с','0,16 с = 160 мс']],caption:'Десятичные единицы. Обработка, протокол и конкуренция в нижнюю оценку не входят.'};}
  else if(li===5&&qi===0){logic.visual={type:'bars',items:[{label:'10:00',value:50},{label:'10:05',value:400},{label:'10:10',value:60}],max:450,unit:'мс',threshold:200,caption:'Равные интервалы по 5 минут. Последний снимок не исключает предыдущий всплеск.'};}
  else if(li===5&&qi===1){logic.visual={type:'comparison',columns:['Вид показателя','Наблюдение','Интерпретация'],rows:[['Gauge','20','Текущие соединения'],['Counter','1000 → 1120 за 60 с','Прирост 120; скорость 2/с']],caption:'Накопленный счётчик, текущий уровень и скорость имеют разные единицы.'};}
  else if(li===6&&qi===4){logic.visual={type:'bars',items:[{label:'Сервер × среда',value:6},{label:'Ещё request_id',value:6000}],max:6000,unit:'рядов',caption:'3×2=6; добавление 1000 независимых ID: 6000. Общая линейная шкала.'};}
  else if(li===6&&[0,2,7].includes(qi)){logic.visual={type:'network',nodes:[{id:'db',title:'MySQL',text:'исходное состояние'},{id:'e',title:'Экспортёр',text:'HTTP endpoint'},{id:'s',title:'Сборщик',text:'опрос / хранение'},{id:'v',title:'Панель',text:'запрос ряда'}],edges:[{from:'db',to:'e',label:'читает состояние'},{from:'s',to:'e',label:'pull: запрос'},{from:'s',to:'v',label:'данные ряда'}],caption:'Стрелки подписаны по смыслу. Неуспешный опрос не равен доказанной остановке MySQL.'};}
  else if(li===7&&qi===3){logic.visual={type:'comparison',columns:['Свободно, ГБ','Состояние','Основание'],rows:[['9','Тревога','9 < 10: включение'],['11','Тревога','11 ≤ 12: снятия нет'],['9','Тревога','состояние сохраняется'],['13','Норма','13 > 12: снятие']],caption:'Гистерезис: разные пороги включения и восстановления. Начальное состояние — норма.'};}
  else if(li===7&&qi===7){logic.visual={type:'comparison',columns:['Время','Событие','Длительность от начала'],rows:[['10:00','Нарушение','0 мин'],['10:03','Тревога','3 мин'],['10:04','Доставка','4 мин']],caption:'Вычисление правила и доставка уведомления проверяются раздельно.'};}
  else if(li===8&&qi===6){logic.visual={type:'decision',start:'Импорт копии в отдельную базу',question:'Данные, связи и контрольный запрос совпали?',yes:'Разрешена следующая проверка переключения',no:'Сохранить исходную систему; исследовать различия',caption:'Количество и SUM необходимы, но не заменяют проверку целостности.'};}
  else if(li===9&&qi===2){logic.visual={type:'comparison',columns:['Уровень','PostgreSQL','MySQL'],rows:[['База','training','sales / audit'],['Схема','sales / audit внутри training','синоним базы'],['Таблица','sales.orders','sales.orders']],caption:'Одинаковые написания не доказывают одинаковую иерархию пространств имён.'};}
  else if(li===9&&qi===7){logic.visual={type:'decision',start:'Кандидат на выбор СУБД',question:'Все обязательные требования выполняются?',yes:'Сравнить цену, сопровождение и измерения',no:'Исключить независимо от взвешенного балла',caption:'В этом примере обязательное расширение PostgreSQL ограничивает выбор.'};}
  else {logic.visual={type:'comparison',columns:['Наблюдение','Преобразование / проверка'],rows:[[e.input,e.solution]],caption:e.result};}
  contrast.title='Граница вывода';contrast.visual={type:'comparison',columns:['Что установлено','Что ещё проверять'],rows:[[e.result,concept.bullets[0]]],caption:'Вывод относится к показанным данным и условиям.'};
  warning.title='Ошибка в этой задаче';warning.body=warning.body?.replace(/^Ошибка:\s*/,'');warning.bullets=[e.result];
  const passport={id:qid+'-case',kind:'theory',kicker:`Вопрос ${qi+1} · самостоятельная работа`,title:'Исследуйте новый случай',body:'Учебный случай. '+row.context,bullets:[row.operation,'Запишите прогноз, выполните проверяемые действия и обоснуйте вывод. Разбор открывается после попытки.'],supplement:{label:'Интерактивная схема',href:`?mode=case&case=${qid}`}};
  extra.set(qid+'-T01-slide',passport);
  const question=questions.find(q=>q.questionId===qid);question.slideIds.splice(question.slideIds.indexOf(qid+'-T01-slide'),0,passport.id);
  cases.push({id:qid,revision:1,lectureId:l.id,semester:l.semester,title:section.title,returnSlide:passport.id,...row});
  for(const suffix of ['section','concept','logic','example','contrast','warning','notebook']){
   const slide=get(suffix);const n=notes.notes[slide.id];
   n.script=suffix==='section'?`${section.body} Исследуем, какое наблюдение позволяет сделать вывод и какие данные для него ещё нужны.`:
    suffix==='concept'?`${concept.body} ${section.body} Это различие понадобится для разбора: ${e.input}`:
    suffix==='logic'?`${e.input}\n${e.solution}\n${e.result}\nПоказ: сопоставьте исходные значения и результат на схеме. Шаги переключают учебные состояния, а не запускают сервер БД.`:
    suffix==='example'?`${e.input} ${e.solution} ${e.result} Проверьте вывод по величинам и условиям, а не по внешнему виду результата.`:
    suffix==='contrast'?`${e.result} Это граница доказанного на этих данных. ${row.context} Предложите способ проверки нового случая; разбор будет доступен в отдельной активности.`:
    suffix==='warning'?`${slide.body} ${e.solution} Ошибка проявляется при сопоставлении с исходными данными: ${e.result}`:
    `${concept.body} Запишите определение с существенными признаками. ${e.result}`;
   n.notebook=slide.notebook||'';n.preparation='Сверить данные текущего примера и открыть соответствующий самостоятельный случай.';n.questions=suffix==='notebook'?`Какое условие существенно для понятия «${e.term}»?`:`Чем подтверждается вывод: «${e.result}»?`;n.answer=e.solution+' '+e.result;
   n.estimatedSeconds=Math.max(25,Math.round(n.script.split(/\s+/).length/2+15));
  }
  notes.notes[passport.id]={script:`Условие самостоятельной работы: ${row.context} ${row.operation} Сначала запишите прогноз. Откройте активность кнопкой «Интерактивная схема» и вернитесь к этому слайду после проверки. Не раскрывайте разбор до попытки.`,preparation:'Открывается отдельная вкладка с учебной моделью; команды реальной СУБД в браузере не исполняются.',notebook:'',questions:'Какие результаты вы получили и какими данными их обосновали?',answer:row.solution,estimatedSeconds:180};
 }
 l.slides=l.slides.flatMap(s=>extra.has(s.id)?[extra.get(s.id),s]:[s]);
 for(const s of l.slides){
  delete s.source;
  if(s.kind==='title'){s.body=c.discipline;s.kicker='Лекция';}
  if(s.task){const n=notes.notes[s.id];n.script=`Прочитайте условие: ${s.task.prompt} Дайте время на самостоятельную попытку. Сначала попросите обоснование, затем покажите разбор отдельной командой.`;n.notebook='';n.preparation='Ответы и объяснение открываются после попытки.';}
 }
}
write('authoring/cases.json',cases);write('public/course.json',c);write('public/teacher-notes.json',notes);write('public/assessment.json',bank);write('authoring/questions.json',questions);
let readme='';for(const semester of c.semesters){readme+=`## ${semester} семестр\n\n`;for(const l of c.lectures.filter(l=>l.semester===semester))readme+=`- [${l.title}](https://olgakraven.github.io/2026-UIABD4-lecture/?lecture=${l.id})\n`;readme+='\n';}fs.writeFileSync('README.md',readme);
console.log('Updated',c.lectures.length,'lectures;',cases.length,'independent cases.');
