import fs from 'node:fs';
import crypto from 'node:crypto';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8')),save=(p,v)=>fs.writeFileSync(p,JSON.stringify(v,null,2)+'\n');
const course=read('public/course.json'),pack=read('public/teacher-notes.json'),keys=read('public/assessment.json').keys;
const third=course.lectures.length===7,codeGuides=read('authoring/teacher-code-guides.json');
let lessons,examples,variants,explanations,practice;
if(third){lessons=await Promise.all(course.lectures.map((_,i)=>import('../authoring/lectures/'+String(i+1).padStart(2,'0')+'.mjs').then(m=>m.default)));practice=(await import('../authoring/practice.mjs')).practice;}
else {lessons=(await import('../authoring/student-lessons.mjs')).lessons;examples=(await import('../authoring/examples.mjs')).examples;variants=(await import('../authoring/variations.mjs')).variations;explanations=(await import('../authoring/student-explanations.mjs')).explanations;practice=(await import('../authoring/student-practice.mjs')).practice;}
const guides=await Promise.all(course.lectures.map((_,i)=>import('../authoring/teacher-guides/'+String(i+1).padStart(2,'0')+'.mjs').then(m=>m.default)));
const openings=third?[
'Несколько клиентов работают с общими заявками. Различим ответственность формы, серверное правило и состояние соединения, чтобы проверять фактический результат операции и точно указывать проверенный экземпляр.',
'От файлов дистрибутива перейдём к состоянию отдельного экземпляра. Разделим инициализацию, обычный запуск, службу и приёмку: они отвечают на разные вопросы и не заменяют друг друга.',
'Одинаковое сообщение «не подключается» может возникнуть до достижения сервера, при проверке записи или при запросе к объекту. Построим путь подключения и найдём границу, подтверждённую наблюдением.',
'Успешный вход ещё не означает право на любую таблицу. Получим разрешения из конкретных функций пользователя, проверим область и операцию, затем сопоставим назначения с реальными положительными и отрицательными попытками.',
'Логическое имя таблицы, серверный каталог и свободный том относятся к разным уровням. Свяжем их, проверим размер значений и структур и получим оценку объёма без двойного счёта.',
'Два корректных по отдельности действия могут конфликтовать за общую строку. Различим собственное изменение, фиксацию, ожидание и цикл, затем проверим последствия вмешательства и сохранность результата.',
'Журнал помогает объяснить отказ только при правильном выборе источника и сохранённом контексте. Свяжем сообщение, время, предмет изменения и контрольный повтор, чтобы отделить гипотезу от подтверждённой причины.'
]:[
'Проследим путь от исходных строк к результату SELECT. Различим отбор, соединение и группировку, затем независимо проверим правильность результата и стоимость его получения.',
'Денежный итог зависит не только от умножения. Сначала определим объект строки и кратность соединений, затем единицы, норму, неизвестные цены и независимые контрольные проверки.',
'Повторяющееся действие переносится на сервер вместе с контрактом, а не только с текстом SQL. Проследим явный CALL, событие триггера и границы ошибок и отката.',
'Оптимизация начинается с воспроизводимого опыта и правильного запроса. Затем оценим доступ по индексу, селективность и цену обслуживания, не принимая ускорение изменённого результата.',
'Ресурсы выбираются под заданный профиль нагрузки и цель задержки. Разложим бюджет на процессор, память, диск и канал, сохраняя единицы и обязательные ограничения.',
'Один успешный снимок не описывает всё поведение сервера. Различим типы показателей, окно, распределение и объект измерения, чтобы подготовить однозначные паспорта метрик.',
'Метрика проходит от источника через экспортёр и опрос до хранилища. Сохраним на этом пути единицы, идентичность ряда и смысл пропуска; затем оценим частоту и объём хранения.',
'Панель нужна для решения дежурного. Свяжем вопрос с формой графика, временным окном, состоянием правила и доставкой уведомления, сохраняя доступность обозначений.',
'При инциденте симптом ещё не является причиной. Сопоставим ряды, ожидания и журналы, выберем обоснованную стабилизацию и проверим восстановление исходной функции.',
'Сравнение платформ начнём с одинаковой задачи и данных. Разделим переносимый результат и особенности схем, прав, типов и команд, затем применим обязательные ограничения проекта.'
];
const environmentSpeech=[
'Временные таблицы принадлежат текущему соединению. Закрытие клиента удаляет этот набор, а повторный CREATE в том же сеансе сталкивается с уже существующим объектом. Поэтому полный файл запускается один раз в новом сеансе, после чего исследуются его SELECT без переноса значений из схем.',
'Здесь заранее различены отсутствие категории затрат и неизвестная цена существующей позиции. В первом случае категория может давать ноль по условию, во втором итог неполон. Эти два состояния нужно сохранить при чтении результата SQL, а не исправлять одинаковым COALESCE.',
'Определения процедур и триггеров создают постоянные объекты. Подготовка выполняется в новой пустой учебной базе с нужными правами; последующие START TRANSACTION охватывают испытания данных, а не служат отменой всех ранее созданных определений.',
'Генератор задаёт один фиксированный набор, на котором сравниваются запрос, план и результат до и после индекса. Сеанс и временные объекты сохраняются между этими частями. Методика прогрева и серии измерений фиксируется до сравнения, а не выбирается по самому удачному времени.',
'В этой практике вычисляются оценки по заданным величинам, а не меняется конфигурация чужого сервера. Каждую исходную величину сначала связываем с объектом и единицей. Отдельно указываем среднее, пик и допущение о последовательности либо параллелизме.',
'Снимки реального status имеют собственные значения и время, поэтому не обязаны повторять условные числа схемы. Для прироста сохраняются два снимка одного counter и интервал, а для gauge — конкретный момент и объект наблюдения.',
'Здесь Python-экспортёр генерирует учебные данные, Prometheus опрашивает endpoint и хранит образцы, а интерфейс выполняет PromQL. Это три разные роли. Терминалы запуска остаются открыты; успешный опрос и наличие нужной метрики проверяются отдельно.',
'Для ускоренной практики выбран gauge соединений и правило >25 в течение 20 с. В объясняющей схеме далее будет другой сценарий: delay >1 с в течение трёх минут. Оба иллюстрируют непрерывное подтверждение, но их величины и расписания нельзя смешивать.',
'Исходная база, файл копии и восстановленная цель — три разных объекта. Цель выбирается новой, до импорта проверяется DATABASE(). Импорт и контроль выполняются именно там; рабочая исходная база не используется вместо проверочной цели.',
'Сначала нужны два отдельных учебных подключения и подтверждённые текущие базы. Общая transfer_orders временная в каждом своём сеансе. Платформенные файлы ролей и JSON выполняются в соответствующей СУБД; готовый MySQL-комплект не выдаётся за установленный PostgreSQL.'
];
const roadmaps=third?[
'Сначала разделим клиентскую проверку и серверную гарантию. Затем проследим сеанс и ответ операции, определим административную ответственность и закончим проверкой нужного экземпляра и воспроизводимым протоколом.',
'Выбор пакета ведёт к разделению программ, данных и конфигурации. После этого разберём службу, запуск и инициализацию как разные операции; приёмка и откат замыкают проверку установки.',
'Порядок вопросов повторяет путь подключения: адрес, порт и транспорт, затем удалённая сеть и параметры клиента. После достижения сервера различаем вход, объектные права и повтор исходной попытки.',
'От полной идентичности пользователя перейдём к созданию записи. Далее последовательно зададим область базы, таблицу и операцию, проверим отзыв перекрывающихся разрешений и сопоставим итоговый профиль с задачей.',
'Сначала закрепим логическое имя объекта, затем его структуры и серверное размещение. Кодировка и сравнение уточнят свойства значений; оценка объёма и свободного тома соединят их с ресурсным бюджетом.',
'От сохранения и отмены одной транзакции перейдём к конфликту двух. Ожидание на графе и общей шкале времени подготовит разбор цикла; затем отделим симптом, административное вмешательство и проверку результата.',
'Источник журнала выбирается до чтения сообщения. Поля, уровни и общая шкала времени позволят построить гипотезу; настройки вывода, контрольное исправление и повтор функции дадут основание её подтвердить.'
]:[
'Сначала разберём, какие строки отбираются и какие пары строит JOIN. Группировка и агрегаты определят смысл итога. Затем рост данных и повторные замеры покажут стоимость, которую принимают только после проверки эквивалентности.',
'Порядок расчёта начинается с детализации и связей. Затем согласуем количество, цену и норму, сохраним неизвестные значения и закончим агрегацией, диапазоном правдоподобия и воспроизводимой карточкой.',
'Контракт действия нужен до выбора процедуры или триггера. После входных проверок проследим событие, порядок побочных изменений и откат. Затем ограничим скрытые зависимости и проверим отрицательные и повторные вызовы.',
'Сначала получим сопоставимые измерения и исправим логику запроса. После этого рассмотрим структуру индекса, долю совпадений и ведущий префикс; решение завершится оценкой обслуживания и повторной проверкой результата.',
'Профиль нагрузки задаёт исходные требования. Далее распределим ресурсы между вычислениями, памятью, IO и передачей, добавим обоснованный запас и сравним только варианты, выполнившие обязательные ограничения.',
'От ряда во времени перейдём к типам соединений, задержкам и распределению. Затем разделим объём, свободный том и события ошибок; базовая линия и паспорт зададут контекст интерпретации.',
'Сначала проследим источник и расписание опросов. Затем разделим успех scrape и наличие ряда, согласуем имя, единицу и метки, проверим пробелы и стоимость хранения. Завершим контрактами замены компонентов.',
'Вопрос дежурного определит вид графика и окно времени. После этого разделим гистерезис и непрерывное подтверждение, выстроим порядок панели и проверим доступность обозначений и доставку уведомления.',
'Начнём с разных симптомов: соединения, длительность, место и ошибки. Их сопоставление создаёт гипотезы, после чего выбираются стабилизация, проверяемое восстановление и критерии закрытия.',
'Сначала выровняем задачу и стенды, затем сравним пространства имён, права и типы. Общий SQL отделим от платформенных и клиентских команд; наблюдения и обязательные требования станут основанием выбора.'
];
const digest=v=>crypto.createHash('sha256').update(String(v??'')).digest('hex');
const normalize=s=>String(s??'').replaceAll('\\\\du','\\du').replaceAll('\\\\i ','\\i ');
function update(id,patch){
 const old=pack.notes[id];if(!old)throw Error('Missing note '+id);
 for(const [field,value]of Object.entries(patch))if(old[field]!==value){pack.previousNoteHashes??={};const h=pack.previousNoteHashes[id]??={};h[field]=[...new Set([...(h[field]||[]),digest(old[field])])];}
 pack.notes[id]={...old,...patch};
}
const estimate=(speech,pause=0)=>Math.max(15,Math.ceil(speech.split(/\s+/u).filter(Boolean).length/2)+pause);
const review=[];
for(const [li,l]of course.lectures.entries()){
 const lesson=lessons[li],guide=guides[li];if(guide.length!==8)throw Error('Missing guide '+l.id);
 const units=Array.from({length:8},(_,qi)=>third?{
  definition:lesson.units[qi].definition,paragraphs:lesson.units[qi].paragraphs,input:lesson.units[qi].input,result:lesson.units[qi].result,changed:lesson.units[qi].changed,changedResult:lesson.units[qi].changedResult,question:lesson.units[qi].test.prompt,answer:lesson.units[qi].test.explanation
 }:{
  definition:l.slides.find(s=>s.id===l.id+'-q'+String(qi+1).padStart(2,'0')+'-notebook').notebook,paragraphs:explanations[li][qi],input:examples[li][qi].input,result:examples[li][qi].result,changed:variants[li][qi].input,changedResult:variants[li][qi].result,question:'Как из исходных данных получается вывод этого примера?',answer:examples[li][qi].solution
 });
 for(const [si,s]of l.slides.entries()){
  const old=pack.notes[s.id],match=s.id.match(/-q(\d{2})-/),qi=match?Number(match[1])-1:null,u=qi===null?null:units[qi],g=qi===null?null:guide[qi];
  const role=s.id.slice(l.id.length+1);let script,answer='',questions='',preparation='',category;
  if(role.includes('-case')){
   review.push({lectureId:l.id,slideId:s.id,displayNumber:si+1,category:'case-reviewed-previous-pass',speechSha256:digest(old.script),answerSha256:digest(old.answer)});continue;
  }
  if(s.task){
   const t=s.task,k=keys[t.id];if(!k)throw Error('Missing key '+t.id);
   script=t.prompt+'\n\nПауза: дайте группе сформулировать ответ и основание, затем выполните проверку. Разбор откройте после попытки.';
   if(t.type==='single'||t.type==='multiple')answer='Ожидаемый выбор:\n'+k.correct.map(id=>t.options.find(o=>o.id===id)?.text||(()=>{throw Error(t.id+': option')})()).join('\n');
   else if(t.type==='short')answer='Допустимые формы ответа: '+k.accepted.join('; ')+'.';
   else if(t.type==='matching')answer='Полное соответствие:\n'+Object.entries(k.pairs).map(([a,b])=>t.items.find(x=>x.id===a).text+' → '+t.options.find(x=>x.id===b).text).join('\n');
   answer+='\n\n'+k.explanation;
   if(role.includes('T04-'))answer+='\n\nИтог вопроса: '+u.result;
   questions=t.prompt;category='assessment';
  } else if(s.visual?.type==='codeParts'){
   script=codeGuides[s.id];if(!script)throw Error('Missing code explanation '+s.id);
   preparation=third?'Откройте комплект тестового стенда именно 3 курса. SQL выполняется в mysql, команды ОС — в PowerShell; ручная установка и готовый стенд являются разными вариантами.':practice[li].environment;
   questions='Какой объект и какое состояние проверяет этот фрагмент? Что подтверждает его наблюдаемый результат?';category='code';
  } else if(u){
   const suffix=role.replace(/^q\d{2}-/,'');
   if(suffix==='section'){script=qi?guide[qi-1][2]:'Начнём с конкретного вопроса этой темы. '+u.input;category='section';}
   else if(suffix==='concept'){script=u.definition+'\n\n'+u.paragraphs[0];if(normalize(u.paragraphs[0]).startsWith(normalize(u.definition)))script=u.paragraphs[0];answer=u.answer;questions=u.question;category='concept';}
   else if(suffix==='explanation'||suffix==='explanation-2'){script=u.paragraphs[1];answer=u.answer;category='mechanism';}
   else if(suffix==='logic'){
    script=u.input+'\n\n'+g[0]+'\n\nПоказ: начните с обзора; «Начать разбор» и «Далее» выделяют элементы уже показанной схемы. Все данные остаются видимыми. «Сначала» возвращает обзор; «Развернуть схему» открывает модальное окно и сохраняет шаг. Это выделение для объяснения, а не исполнение команд на сервере.';
    questions='Какие данные и связи объясняют полученный результат?';answer=u.result+'\n\n'+g[1];preparation='Перед началом верните обзор схемы. Читайте шкалу, единицы и направление связей, не приписывая выделению физическое исполнение процесса.';category='diagram';
   } else if(suffix==='changed'||suffix==='example'){
    script=u.changed+'\n\nПауза: назовите изменившееся условие и предложите, что теперь можно утверждать. Затем перейдите к разбору следующего экрана.';answer=u.changedResult+'\n\n'+g[1];questions='Какое прежнее основание вывода изменилось?';category='changed-condition';
   } else if(suffix==='changed-result'||suffix==='contrast'){
    script=(suffix==='contrast'?'Слева сопоставляется вывод исходного примера, справа — изменённого. ':'')+u.changedResult+'\n\n'+g[1];answer=u.changedResult;category='comparison';
   } else if(suffix==='warning'){
    script='Ошибка, которую здесь проверяем: '+s.body+'\n\n'+u.answer+' '+u.result+'\n\n'+g[1];answer=u.result;questions='Какое наблюдение опровергает этот ошибочный способ рассуждения?';category='error-analysis';
   } else if(suffix==='notebook'){
    script='Запишем: '+old.notebook+'\n\nВ разобранном опыте это различие проявляется так: '+u.result;answer=u.result;questions=u.question;category='definition';
   } else if(suffix.includes('practice')){
    const pm=s.id.match(/-practice-(\d+)/),p=practice[li][Number(pm[1])-1];
    if(suffix.endsWith('-check')){script=s.body;answer=s.body;questions='Какое из наблюдений подтверждает цель этой проверки?';category='practice-check';}
    else if(suffix.endsWith('-file')){script=s.body+'\n\nПродолжения ниже составляют один файл: граница экрана не является границей SQL-оператора. Сначала связываем весь файл с подготовленным сеансом и базой.';category='practice-file';}
    else {script=s.body;answer=p.expected;questions='Что нужно сохранить в исходном состоянии и какое наблюдение завершит этот опыт?';category='practice-action';}
    preparation='До занятия подготовьте указанный комплект и нужные сеансы. Различайте готовый стенд и отдельный ручной вариант.'+(p.file?' Подготовьте полный файл sql/'+p.file+'.':'');
   } else throw Error('Unhandled question slide '+s.id);
  } else if(s.kind==='title'){script=openings[li];category='opening';}
  else if(s.kind==='literature'){
   script=s.title.startsWith('Основная')?'Основные источники нужны для определений и развёрнутого чтения по теме. Ссылки на экране позволяют открыть издание; к конкретному материалу возвращаемся при подготовке и уточнении вопроса. Порядок практических действий и данные примеров задаёт эта лекция.':'Дополнительные источники дополняют учебник конкретными механизмами и особенностями платформы. Команду и её условия сверяют по документации используемой СУБД и версии; близкое название в другой платформе не гарантирует тот же смысл.';
   category='reading';
  } else if(s.kind==='materials'){script='Материалы доступны по ссылке и QR-коду на экране. Комплект практики этой лекции содержит исходные файлы для её собственного набора. Сначала согласуем среду и исходное состояние; затем сопоставим реальные наблюдения с объясняющими примерами.';category='materials';}
  else if(role==='agenda'){
   script=roadmaps[li]+'\n\nПосле каждого вопроса отдельный кейс меняет данные, а четыре проверки возвращают к основаниям решения.';
   if(!third)script+='\n\nБлок практики в начале задаёт наблюдения для дальнейшего объяснения: готовый файл выполняется в указанной среде, а его результат затем разбирается по вопросам темы.';
   category='roadmap';
  } else if(role==='context'){script=(lesson.context||lesson.intro)+'\n\nПервое различие для проверки: '+units[0].definition;category='context';}
  else if(role==='prerequisites'){script=lesson.prerequisites+'\n\nЭти понятия используются в примерах далее: названия соединения, объекта, значения и результата должны сохранять один смысл на протяжении опыта.';category='prerequisites';}
  else if(s.kind==='summary'){
   script='Сопоставим установленные результаты. '+[units[0].result,units[3].result,units[7].result].join(' ')+'\n\n'+guide[7][2];category='synthesis';
  } else if(s.kind==='questions'){
   script=(s.body||'Вернёмся к главным основаниям лекции.')+'\n\n'+(s.bullets||[]).join('\n')+'\n\nПауза: сначала соберите рассуждения группы, затем сверьте их с примерами и контрпримерами.';
   questions=[s.body,...(s.bullets||[])].filter(Boolean).join('\n');
   answer=third?[0,4,7].map(q=>units[q].question+'\n'+units[q].answer+'\n'+guide[q][1]).join('\n\n'):'Основания ответа:\n'+units.map((u,q)=>String(q+1)+'. '+u.result).join('\n')+'\n\nПеренос требует заново проверить входные данные, ограничения, окно и среду. '+guide[7][2];
   category='audience-discussion';
  } else if(role==='exam'||role==='practice-environment'){
   script=role==='exam'?s.body+'\n\nЭтот набор относится к реальной практике лекции. Его числа и имена не заменяют данные теоретических схем и самостоятельных кейсов.':environmentSpeech[li];
   preparation=practice[li].environment;category='practice-context';
  } else if(role.startsWith('practice-')){
   const stepMatch=role.match(/^practice-(\d+)-/),step=stepMatch?practice[li].steps[Number(stepMatch[1])-1]:null;
   if(role.includes('-file-')){script=s.body+'\n\nСохранённый полный файл нужен до запуска соответствующего этапа; отдельный фрагмент на экране служит для объяснения.';category='practice-file';}
   else if(role.includes('-source-')){script=s.body+'\n\nSOURCE относится к клиенту mysql; метакоманда чтения psql выполняется только в psql. Границы продолжений на слайдах не разрывают определения и запросы.';category='practice-file';}
   else if(role.endsWith('-check')){script=s.body;answer=s.body;questions='Какой результат проверен и что он ещё не подтверждает?';category='practice-check';}
   else if(role.endsWith('-action')){script=s.body;answer=step?.expected||'';questions='Какое исходное состояние нужно сохранить и чем подтвердить завершение этого действия?';category='practice-action';}
   else throw Error('Unhandled practice slide '+s.id);
   preparation=practice[li].environment;
  } else throw Error('Unhandled slide '+s.id);
  if(!script?.trim())throw Error('Empty speech '+s.id);
  const speech=normalize(script),patch={script:speech,answer:normalize(answer),questions:normalize(questions),preparation:normalize(preparation),estimatedSeconds:estimate(speech,s.task?25:s.kind==='notebook'?20:s.kind==='questions'?60:category==='diagram'?25:0)};
  update(s.id,patch);
  review.push({lectureId:l.id,slideId:s.id,displayNumber:si+1,category,speechSha256:digest(speech),changed:old.script!==speech,nextSlideId:l.slides[si+1]?.id||null});
 }
}
const expectedCodeIds=course.lectures.flatMap(l=>l.slides.filter(s=>s.visual?.type==='codeParts').map(s=>s.id));
if(Object.keys(codeGuides).length!==expectedCodeIds.length||expectedCodeIds.some(id=>!codeGuides[id]))throw Error('Code guide coverage differs');
save('public/teacher-notes.json',pack);save('authoring/previous-teacher-note-hashes.json',pack.previousNoteHashes);
fs.mkdirSync('output',{recursive:true});save('output/teacher-full-review.json',review);
console.log(JSON.stringify({lectures:course.lectures.length,slides:review.length,diagrams:review.filter(r=>r.category==='diagram').length,codeSlides:expectedCodeIds.length,changedSpeeches:review.filter(r=>r.changed).length,status:'passed'}));


