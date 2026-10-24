import {lazy,Suspense,useCallback,useEffect,useRef,useState} from 'react'
import {createPortal} from 'react-dom'
import type {ReactNode} from 'react'
import type {Course} from '@olgakraven/lecture-engine'
import './lecture-tools.css'
const Diagram=lazy(()=>import('./DiagramView').then(m=>({default:m.DiagramView})))
const Workshop=lazy(()=>import('./CaseWorkshop').then(m=>({default:m.CaseWorkshop})))
type Tool={kind:'diagram'|'case';id:string;session:string|null;sequence:number}
export function LectureTools({course,base,children}:{course:Course;base:string;children:ReactNode}){
 const [tool,setTool]=useState<Tool|null>(null),dialog=useRef<HTMLDialogElement>(null),opener=useRef<HTMLElement|null>(null),channel=useRef<BroadcastChannel|null>(null),revision=useRef(0)
 const params=new URLSearchParams(location.search),audience=params.get('mode')==='audience',session=tool?.session||params.get('session'),key=`lecture:${base}:${course.id}:tool:${session}`
 const valid=useCallback((kind:string,id:string)=>course.lectures.some(l=>l.slides.some(s=>s.id===(kind==='case'?id+'-case':id))),[course])
 useEffect(()=>{
  const open=(event:Event)=>{const e=event as CustomEvent<{kind:string;id:string;opener:HTMLElement}>;if(!e.detail||!['diagram','case'].includes(e.detail.kind)||!valid(e.detail.kind,e.detail.id))return;opener.current=e.detail.opener;setTool({kind:e.detail.kind as Tool['kind'],id:e.detail.id,session:new URLSearchParams(location.search).get('session'),sequence:Date.now()})}
  document.addEventListener('lecture-tool',open);return()=>document.removeEventListener('lecture-tool',open)
 },[valid])
 useEffect(()=>{
  if(!session)return
  const bus=new BroadcastChannel(key);channel.current=bus
  const receive=(value:unknown)=>{const v=value as Tool;if(!v||!Number.isFinite(v.sequence)||v.sequence<=revision.current)return;revision.current=v.sequence;if(!v.id){dialog.current?.close();setTool(null)}else if(['diagram','case'].includes(v.kind)&&valid(v.kind,v.id))setTool(v)}
  bus.onmessage=e=>{if(audience)receive(e.data);else if(e.data?.request&&tool)bus.postMessage(tool)}
  if(audience){try{receive(JSON.parse(localStorage.getItem(key)||'null'))}catch{/* No saved tool state. */}bus.postMessage({request:true})}
  else if(tool){bus.postMessage(tool);try{localStorage.setItem(key,JSON.stringify(tool))}catch{/* Live channel remains available. */}}
  return()=>{bus.close();channel.current=null}
 },[session,key,audience,tool,valid])
 useEffect(()=>{if(tool&&dialog.current&&!dialog.current.open)dialog.current.showModal()},[tool])
 const close=()=>dialog.current?.close()
 const closed=()=>{if(!audience){const value={kind:null,id:'',sequence:Date.now()};channel.current?.postMessage(value);try{localStorage.setItem(key,JSON.stringify(value))}catch{/* The slide remains available. */}}setTool(null);opener.current?.focus()}
 return <>{children}{tool&&createPortal(<dialog className="lecture-tool-modal" ref={dialog} aria-label={tool.kind==='diagram'?'Развёрнутая схема':'Практическая задача'} onClose={closed} onCancel={e=>{e.preventDefault();if(!audience)close()}} onKeyDown={e=>e.stopPropagation()} onClick={e=>{const r=e.currentTarget.getBoundingClientRect();if(!audience&&e.target===e.currentTarget&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))close()}}><div className="lecture-tool-toolbar"><span>{tool.kind==='diagram'?'Схема':'Рабочая схема'}</span>{!audience&&<button type="button" onClick={close}>Закрыть ×</button>}</div><Suspense fallback={<p role="status">Открываем схему…</p>}>{tool.kind==='diagram'?<Diagram course={course} base={base} id={tool.id} onClose={close}/>:<Workshop base={base} id={tool.id} onClose={close} readOnly={audience} sessionId={session||undefined}/>}</Suspense></dialog>,document.body)}</>
}
