import fs from 'node:fs';
import crypto from 'node:crypto';

export function describeBoard(board) {
 if(board.kind==='table')return (board.rows||[]).map(row=>row.map((v,i)=>(board.columns?.[i]||'Значение')+' = '+v).join('; ')).join('\n')||'Таблица без строк.';
 if(board.kind==='chain')return (board.items||[]).map((v,i)=>(i+1)+'. '+v).join(' → ');
 if(board.kind==='bars')return (board.rows||[]).map(r=>r.label+' = '+r.value+' '+(board.unit||'')).join('; ');
 if(board.kind==='timeline')return (board.rows||[]).map(r=>r.label+': '+(r.points?'точки '+r.points.join(', '):r.start+'–'+r.end)+' '+board.unit+'; '+r.state).join('\n');
 return (board.items||[]).join(' → ');
}
const hash=s=>crypto.createHash('sha256').update(String(s??'')).digest('hex');
function replaceNote(pack,id,patch) {
 const old=pack.notes[id];if(!old)throw Error('Нет заметки '+id);
 for(const [field,value]of Object.entries(patch))if(old[field]!==value){
  pack.previousNoteHashes??={};const h=pack.previousNoteHashes[id]??={};
  h[field]=[...new Set([...(h[field]||[]),hash(old[field])])];
 }
 pack.notes[id]={...old,...patch};
}
const showRun=run=>run.name+'\n'+run.setup+'\n\n'+run.steps.map((s,i)=>'Шаг '+(i+1)+'. '+s.action+'\nНа экране: '+s.expected+'\nОбъяснение: '+s.why).join('\n\n')+(run.conclusion?'\n\n'+run.conclusion:'');
export function finalizeTeacherCases({pack,cases,models,initialValues,variants,lockRoute,alertRoute}) {
 for(const [i,item]of cases.entries()){
  const model=models[i],initial=initialValues(model),rationale=item.rationale??item.solution.split('\n\nИсходный проход')[0].split('\n\nРазбор по шагам:')[0];
  item.rationale=rationale;
  let runs;
  if(item.model?.type==='locks')runs=lockRoute(item,i);
  else if(model.kind==='alert')runs=alertRoute(model);
  else runs=[{},...(variants[i]||[])].map((patch,ri)=>{
   for(const [k,v]of Object.entries(patch)){const f=model.fields.find(f=>f.key===k);if(!f||f.choices&&!f.choices.includes(String(v)))throw Error(item.id+': недопустимый вход '+k)}
   const values={...initial,...patch};
   return {name:ri?'Сравнение '+ri:'Исходный проход',
    setup:'Нажмите «Вернуть исходные данные».'+(ri?' Установите '+Object.entries(patch).map(([k,v])=>'«'+model.fields.find(f=>f.key===k).label+'» = '+v).join('; ')+'. Остальные параметры оставьте исходными.':' Сверьте поля: '+model.fields.map(f=>f.label+' = '+values[f.key]).join('; ')+'.'),
    steps:model.actions.map(a=>({action:'Нажмите «'+a.label+'».',expected:describeBoard(a.run(values)),why:a.explain})),
    conclusion:ri?'Сопоставьте итог с исходным проходом и объясните влияние изменённых входов.':'Зафиксируйте результат до изменения параметров.'};
  });
  item.teacherRoute={runs};
  const route=runs.map(showRun).join('\n\n');
  item.solution=rationale+'\n\nРазбор по шагам:\n'+route+'\n\nПроверка при расхождении: остановитесь на первом несовпавшем шаге. Сверьте исходные поля и, для транзакций, выбранные сеанс и PK, собственные и зафиксированные значения, ожидание и журнал. Ошибка/отказ, прямо указанные в разборе, являются ожидаемым результатом. Если состояние отличается, нажмите «Вернуть исходные данные» и повторите этот проход с первого шага; не продолжайте расчёт из другого состояния.\n\nЗавершение показа: сопоставьте полученный итог с требованием на слайде. Закройте рабочую схему и вернитесь к вопросам к аудитории. Перед новой демонстрацией верните исходные данные.';
  replaceNote(pack,item.returnSlide,{
   script:item.context+'\n\n'+item.operation+'\n\nПауза: попросите группу назвать первое действие и ожидаемое наблюдение. До ответа не открывайте готовый разбор.\n\nПоказ: кнопка «Решить задачу» открывает рабочую схему в модальном окне. Начните с исходного состояния; выполняйте маршрут из вкладки «Ответы» по одному действию, каждый раз сверяя результат. Для сравнения верните исходные данные. После обсуждения закройте схему и перейдите к вопросам к аудитории.',
   preparation:'Прочитайте исходные данные на предыдущих слайдах. Это учебная модель: кнопки меняют её состояние, команды на сервере не исполняются. Подробный маршрут и контрольные наблюдения находятся в поле ответа. В режиме показа действия выполняет преподаватель; аудитория видит синхронизированную схему.',
   questions:'Какой результат ожидается после первого действия и чем его можно подтвердить? '+(item.condition?.result||'Обоснуйте итог по данным условия.'),
   answer:item.solution
  });
  for(const id of item.condition?.inputSlides||[])replaceNote(pack,id,{
   answer:'Это исходный снимок, а не полученный результат. Сверьте значения и единицы со слайдом. Полный маршрут находится в ответе к следующему слайду с условием задачи.',
   preparation:'Назовите смысл параметров, единицы и уже выполненные операции. До самостоятельного ответа группы не переходите к пошаговому решению.'
  });
 }
 // Preserve the hashes of the last published notes, even when a builder regenerated the pack first.
 try {
  const baseline=JSON.parse(fs.readFileSync('authoring/previous-teacher-note-hashes.json','utf8'));
  for(const [id,n]of Object.entries(baseline))if(pack.notes[id])for(const [field,hashes]of Object.entries(n)){
   pack.previousNoteHashes??={};const h=pack.previousNoteHashes[id]??={};h[field]=[...new Set([...(h[field]||[]),...hashes])];
  }
 } catch(e){if(e.code!=='ENOENT')throw e}
}


