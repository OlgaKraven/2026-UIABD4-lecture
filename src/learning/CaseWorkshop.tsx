import {useEffect,useRef,useState} from 'react'
import cases from '../../authoring/cases.json'
import demonstrations from './demonstrations.json'
import {ScenarioBoard} from './ScenarioBoard'
export function CaseWorkshop({base,id}:{base:string;id:string}){
 const index=cases.findIndex(c=>c.id===id)
 return index>=0?<Workshop key={id} base={base} index={index}/>:<main className="case-workshop"><h1>Задача не найдена</h1><a href={base}>К каталогу</a></main>
}
function Workshop({base,index}:{base:string;index:number}){
 const item=cases[index],model=demonstrations[index]
 const [step,setStep]=useState(0),[branch,setBranch]=useState(0),[started,setStarted]=useState(false)
 const [theme,setTheme]=useState(()=>document.documentElement.dataset.theme||'light')
 const params=new URLSearchParams(location.search),audience=params.get('audience')==='1'
 const [session]=useState(()=>params.get('session')||crypto.randomUUID())
 const channel=useRef<BroadcastChannel|null>(null),latest=useRef({step,branch,theme,started,sequence:0})
 useEffect(()=>{
  const key=`uiabd4:case-show:${session}:${item.id}`,bus=new BroadcastChannel(key);channel.current=bus
  const receive=(value:unknown)=>{const v=value as typeof latest.current;if(!Number.isInteger(v?.branch)||!model.scenarios[v.branch]||!Number.isInteger(v.step)||!model.scenarios[v.branch].frames[v.step]||!Number.isFinite(v.sequence)||v.sequence<latest.current.sequence)return;latest.current.sequence=v.sequence;setBranch(v.branch);setStep(v.step);setStarted(v.started===true);setTheme(v.theme==='dark'?'dark':'light')}
  bus.onmessage=e=>{if(audience)receive(e.data);else if(e.data?.request)bus.postMessage(latest.current)}
  if(audience){try{receive(JSON.parse(localStorage.getItem(key)||'null'))}catch{/* No earlier public snapshot. */}bus.postMessage({request:true})}
  return()=>{bus.close();channel.current=null}
 },[audience,session,item.id,model])
 useEffect(()=>{if(audience)return;const value={step,branch,theme,started,sequence:Date.now()};latest.current=value;channel.current?.postMessage(value);try{localStorage.setItem(`uiabd4:case-show:${session}:${item.id}`,JSON.stringify(value))}catch{/* Broadcast still works. */}},[step,branch,theme,started,audience,session,item.id])
 const showAudience=()=>{const url=new URL(location.href);url.searchParams.set('session',session);history.replaceState(null,'',url);url.searchParams.set('audience','1');window.open(url,`uiabd4-case-${session}`)}
 const frames=model.scenarios[branch].frames,current=frames[step],last=step===frames.length-1
 const back=`${base}?lecture=${encodeURIComponent(item.lectureId)}&slide=${encodeURIComponent(item.returnSlide)}`
 useEffect(()=>{document.title=`${item.title} · Разбор задачи`},[item.title])
 useEffect(()=>{document.documentElement.dataset.theme=theme},[theme])
 return <main className={`case-workshop case-demo ${started?'demo-started':''}`}>
  <header><a href={back}>← К лекции</a><span>{item.semester} семестр</span>{!audience&&<><button type="button" onClick={showAudience}>Окно для группы ↗</button><button type="button" onClick={()=>setTheme(theme==='dark'?'light':'dark')}>{theme==='dark'?'Светлая тема':'Тёмная тема'}</button></>}</header>
  <p className="case-kicker">Задача для группового разбора</p><h1>{item.title}</h1>
  {!started&&<><div className="demo-brief"><section><h2>Описание задачи</h2><p>{item.context}</p></section><section><h2>Что делаем</h2><p>{item.operation}</p></section></div><section className="demo-launch"><p>Обсудите с группой исходные данные и предложите первое действие. Затем покажите решение по шагам.</p>{!audience&&<button className="solve-button" type="button" onClick={()=>{setStarted(true);setStep(0)}}>Решить задачу</button>}</section></>}
  {started&&<section className="demo-stage" aria-label="Демонстрация решения">
   {model.scenarios.length>1&&(audience?<p>Условия: {model.scenarios[branch].label}</p>:<div className="scenario-picker" role="group" aria-label="Условия задачи"><span>Условия:</span>{model.scenarios.map((s,i)=><button type="button" key={s.label} aria-pressed={branch===i} onClick={()=>{setBranch(i);setStep(0)}}>{s.label}</button>)}</div>)}
   <div className="demo-step-heading"><span>{String(step+1).padStart(2,'0')} / {String(frames.length).padStart(2,'0')}</span><h2>{current.title}</h2></div>
   <ScenarioBoard board={current.board}/>
   <p className="oral-prompt"><strong>Обсудите с группой.</strong> {current.prompt}</p>
   {!audience&&<div className="demo-controls"><button type="button" disabled={step===0} onClick={()=>setStep(s=>s-1)}>← Назад</button><span role="status" aria-live="polite">{current.title}</span>{!last?<button className="solve-button" type="button" onClick={()=>setStep(s=>s+1)}>Следующий шаг →</button>:<button className="solve-button" type="button" onClick={()=>setStep(0)}>Показать сначала</button>}</div>}
  </section>}
  {started&&last&&<section className="demo-explanation"><h2>Разбор и граница вывода</h2><p>{branch===0?item.solution:model.scenarios[branch].conclusion}</p><p>Назовите изменённое условие и объясните, какой шаг решения придётся пересмотреть.</p></section>}
  <p className="case-environment">Учебная модель для показа и устного обсуждения. Команды на этой странице не выполняются на сервере.</p>
  <footer>{started&&!audience&&<button type="button" onClick={()=>{setStarted(false);setStep(0)}}>К условию задачи</button>}<a href={back}>Вернуться к лекции →</a></footer>
 </main>
}
