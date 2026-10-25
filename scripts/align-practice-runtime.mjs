import fs from 'node:fs';
import assert from 'node:assert/strict';
import {practice} from '../authoring/student-practice.mjs';
const course=JSON.parse(fs.readFileSync('public/course.json','utf8'));
const before=new Set(course.lectures.flatMap(l=>l.slides.map(s=>s.id)));
for(const [li,l]of course.lectures.entries()){
 const p=practice[li];
 for(const suffix of ['-exam','-practice-environment']){
  const s=l.slides.find(s=>s.id===l.id+suffix);assert(s,l.id+suffix);s.body=p.environment;
 }
 for(const [i,step]of p.steps.entries()){
  const prefix=l.id+'-practice-'+String(i+1).padStart(2,'0');
  const action=l.slides.find(s=>s.id===prefix+'-action'),check=l.slides.find(s=>s.id===prefix+'-check');
  assert(action&&check,prefix);action.body=step.text;check.body=step.expected;
 }
 const short=l.slides.find(s=>s.id===l.id+'-code');
 short.body='Пример использует набор из практики этой лекции. Сохраните указанное соединение и исходное состояние.';
 short.visual.caption='Подготовка набора — по ссылке к практике; временные таблицы остаются в своём соединении.';
}
const procedure=course.lectures[2].slides.find(s=>s.id.endsWith('-code'));
procedure.body='Перед повторным вызовом завершите учебные транзакции. Файл sql/03-reset.sql возвращает два заказа и аудит к исходному состоянию упражнения.';
procedure.visual.parts[0].code='SOURCE sql/03-reset.sql;\nSTART TRANSACTION;\nCALL close_paid_order(1);\nSELECT status FROM procedure_orders WHERE id=1;\nROLLBACK;\nSELECT status FROM procedure_orders WHERE id=1;';
procedure.visual.parts[0].explanation='После подготовки: paid и пустой аудит. Внутри вызова: closed. После ROLLBACK: paid и пустой аудит.';
procedure.visual.caption='03-procedure.sql создаёт определения один раз; 03-reset.sql готовит повтор опыта, не создавая их заново.';
procedure.supplement={label:'Скачать 03-reset.sql',href:'practice/03-reset.sql'};
const monitoring=course.lectures[6];
// Setup must precede PromQL, even though the two blocks were assigned to different questions.
const block=(n)=>monitoring.slides.filter(s=>s.id.startsWith(monitoring.id+'-practice-'+n+'-'));
const setup=block('02'),queries=block('03');
if(monitoring.slides.indexOf(setup[0])>monitoring.slides.indexOf(queries[0])){
 const first=monitoring.slides.indexOf(queries[0]),second=monitoring.slides.indexOf(setup[0]);
 const middle=monitoring.slides.slice(first+queries.length,second),a=queries[0].kicker,b=setup[0].kicker;
 for(const s of setup)s.kicker=a;for(const s of queries)s.kicker=b;
 monitoring.slides.splice(first,second+setup.length-first,...setup,...middle,...queries);
}
for(const s of monitoring.slides)if(s.id.includes('-practice-03-code-'))s.visual.parts[0].label='PromQL · интерфейс Prometheus';
for(const s of course.lectures[9].slides)if(s.id.includes('-practice-02-code-'))s.visual.parts[0].label='SQL · обе СУБД';
const after=new Set(course.lectures.flatMap(l=>l.slides.map(s=>s.id)));
assert.deepEqual(after,before);
fs.writeFileSync('public/course.json',JSON.stringify(course,null,2)+'\n');
console.log(JSON.stringify({practiceSourcesAligned:practice.length,monitoringSetupBeforeQueries:true,slideIdsPreserved:after.size}));
