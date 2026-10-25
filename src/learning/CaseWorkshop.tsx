import {ProjectionChoiceScope} from './projectionChoiceScope'
import {useEffect,useRef,useState} from 'react'
import cases from '../../authoring/cases.json'
import {models,initialValues} from './workbenchModels'
import {OperationWorkbench} from './OperationWorkbench'
import type {WorkState} from './OperationWorkbench'
import './workbench.css'
type Props={base:string;id:string;onClose?:()=>void;readOnly?:boolean;sessionId?:string}
export function CaseWorkshop({base,id,onClose,readOnly,sessionId}:Props){
 const index=cases.findIndex(c=>c.id===id)
 return index>=0&&models[index]?<Workshop key={id} base={base} index={index} onClose={onClose} readOnly={readOnly} sessionId={sessionId}/>:<main className="case-workshop"><h1>Задача не найдена</h1><a href={base}>К каталогу</a></main>
}
function Workshop({base,index,onClose,readOnly,sessionId}:Omit<Props,'id'>&{index:number}){
 const item=cases[index],model=models[index],params=new URLSearchParams(location.search),audience=readOnly===true
 const [session]=useState(()=>sessionId||params.get('session')||crypto.randomUUID())
 const [state,setState]=useState<WorkState>(()=>({values:initialValues(model),phase:0,time:0,events:[],theme:document.documentElement.dataset.theme||'light'}))
 const [canUndo,setCanUndo]=useState(false)
 const undoStack=useRef<WorkState[]>([]),bus=useRef<BroadcastChannel|null>(null),latest=useRef({...state,sequence:0})
 const change=(next:WorkState)=>{undoStack.current.push(structuredClone(state));if(undoStack.current.length>200)undoStack.current.shift();setCanUndo(true);setState(next)}
 const undo=()=>{const previous=undoStack.current.pop();if(previous)setState(previous);setCanUndo(undoStack.current.length>0)}
 useEffect(()=>{
  const key=`uiabd4:workbench:${session}:${item.id}`,channel=new BroadcastChannel(key);bus.current=channel
  const receive=(value:unknown)=>{const v=value as typeof latest.current;if(!v||!Number.isFinite(v.sequence)||v.sequence<latest.current.sequence||!Number.isInteger(v.phase)||v.phase<0||v.phase>model.actions.length||!Number.isInteger(v.time)||v.time<0||v.time>3600||v.time%30!==0||!Array.isArray(v.events)||v.events.length>1000)return
   if(model.fields.some(f=>typeof v.values?.[f.key]!==typeof f.value||(typeof f.value==='number'&&!Number.isFinite(v.values[f.key]))||(f.choices&&!f.choices.includes(String(v.values[f.key])))))return
   if(v.events.some(e=>!Number.isInteger(e.time)||e.time<0||e.time>v.time||e.time%30!==0||!Number.isFinite(e.value)))return
   latest.current=v;setState({values:v.values,phase:v.phase,time:v.time,events:v.events,theme:v.theme==='dark'?'dark':'light'})
  }
  channel.onmessage=e=>{if(audience)receive(e.data);else if(e.data?.request)channel.postMessage(latest.current)}
  if(audience){try{receive(JSON.parse(localStorage.getItem(key)||'null'))}catch{/* No public snapshot. */}channel.postMessage({request:true})}
  return()=>{channel.close();bus.current=null}
 },[audience,session,item.id,model])
 useEffect(()=>{document.documentElement.dataset.theme=state.theme;if(audience)return;const value={...state,sequence:Math.max(Date.now(),latest.current.sequence+1)};latest.current=value;bus.current?.postMessage(value);try{localStorage.setItem(`uiabd4:workbench:${session}:${item.id}`,JSON.stringify(value))}catch{/* Broadcast still works. */}},[state,audience,session,item.id])
 useEffect(()=>{const previous=document.title;document.title=`${item.title} · Рабочая схема`;return()=>{document.title=previous}},[item.title])
 const back=`${base}?lecture=${item.lectureId}&slide=${item.returnSlide}`
 const toggleTheme=()=>{const theme=state.theme==='dark'?'light':'dark';setState({...state,theme});try{localStorage.setItem(`lecture:${base}:uiabd4:theme`,JSON.stringify(theme))}catch{/* Theme still changes for this view. */}window.dispatchEvent(new Event('course-theme'))}
 return <main className="case-workshop case-demo"><header>{!onClose&&<a href={back}>← К условию на слайде</a>}<span>{item.semester} семестр</span>{!audience&&<button onClick={toggleTheme}>{state.theme==='dark'?'Светлая тема':'Тёмная тема'}</button>}</header><h1>{item.title}</h1><ProjectionChoiceScope value={item.id}><OperationWorkbench model={model} state={state} onChange={change} onUndo={undo} canUndo={canUndo} audience={audience}/></ProjectionChoiceScope>{!onClose&&<footer><a href={back}>Вернуться к условию на слайде →</a></footer>}</main>
}
