import fs from 'node:fs';
import crypto from 'node:crypto';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const write=(p,v)=>fs.writeFileSync(p,JSON.stringify(v,null,2)+'\n');
const c=read('public/course.json'),pack=read('public/teacher-notes.json'),legacy=read('public/legacy-links.json');
pack.previousNoteHashes??={};
for(const [id,note] of Object.entries(pack.notes)){
 const hashes=pack.previousNoteHashes[id]??={};
 for(const [field,value] of Object.entries(note)){
  const hash=crypto.createHash('sha256').update(String(value)).digest('hex');
  hashes[field]=[...new Set([...(hashes[field]||[]),hash])];
 }
}
const aliases={...c.slideAliases};
for(const lecture of c.lectures){
 const remove=new Set();
 for(const group of ['primary','additional']){
  const slides=lecture.slides.filter(s=>s.kind==='literature'&&s.readingGroup===group);
  if(!slides.length)throw Error('Missing literature group: '+lecture.id);
  const keeper=slides[0],refs=slides.flatMap(s=>s.references||[]);
  keeper.references=[...new Map(refs.map(r=>[r.url||r.citation,r])).values()];
  if(group==='additional')keeper.references.sort((a,b)=>Number(!a.url?.includes('iprbookshop.ru'))-Number(!b.url?.includes('iprbookshop.ru')));
  keeper.title=group==='primary'?'Основная литература':'Дополнительная литература';
  keeper.kicker='Литература';
  for(const merged of slides.slice(1)){aliases[merged.id]=keeper.id;remove.add(merged.id);delete pack.notes[merged.id];}
  pack.notes[keeper.id]={script:group==='primary'?'Основные источники собраны на одном слайде. Первый учебник задаёт общие понятия баз данных, две части книги по SQL и PL/pgSQL помогают сопоставить запросы и серверное программирование. Выберите нужный источник по теме и откройте ссылку или отсканируйте его QR-код.':'Дополнительные учебники и документация помогают проверить детали текущей темы. Сопоставляйте примеры с используемой СУБД и её версией; ссылки и отдельные QR-коды доступны рядом с каждым источником.',preparation:'Проверить доступ к нужному источнику перед занятием.',notebook:'',questions:'Какой источник нужен для уточнения текущего вопроса?',answer:'',estimatedSeconds:30};
 }
 lecture.slides=lecture.slides.filter(s=>!remove.has(s.id));
 if(lecture.slides.filter(s=>s.kind==='literature').length!==2)throw Error('Expected two grouped bibliography slides');
}
c.slideAliases=aliases;pack.slideAliases=aliases;
for(const item of c.curriculum||[])item.slideIds=[...new Set(item.slideIds.map(id=>aliases[id]||id))];
for(const links of Object.values(legacy))for(const [number,id] of Object.entries(links))if(aliases[id])links[number]=aliases[id];
write('public/course.json',c);write('public/teacher-notes.json',pack);write('public/legacy-links.json',legacy);
write('authoring/review/literature-merge.json',{reason:'Объединение основной и дополнительной литературы по запросу пользователя.',aliases});
console.log(JSON.stringify({literatureSlides:c.lectures.reduce((n,l)=>n+l.slides.filter(s=>s.kind==='literature').length,0),slides:c.lectures.reduce((n,l)=>n+l.slides.length,0),redirectedIds:Object.keys(aliases).length}));
