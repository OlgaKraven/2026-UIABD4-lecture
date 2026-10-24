import {useEffect,useRef,useState} from 'react'
import type {VisualRendererProps} from '@olgakraven/lecture-engine'
import inputs from './visual-inputs.json'
import boards from './explanation-boards.json'
import {ScenarioBoard} from './ScenarioBoard'
import type {Board} from './ScenarioBoard'
import {TechnicalText} from './TechnicalText'
export function LearningVisual({slide}:VisualRendererProps){
 const data=(inputs as Record<string,{body:string;steps:{title:string;text:string}[]}>)[slide.id]
 const board=(boards as Record<string,Board>)[slide.id]
 const total=board.items?.length||board.rows?.length||1
 const [step,setStep]=useState(0),state=useRef({step:0,sequence:0})
 const params=new URLSearchParams(location.search),audience=params.get('mode')==='audience',printing=params.get('mode')==='print'
 const session=params.get('session'),key=`uiabd4:diagram:${session}:${slide.id}`
 useEffect(()=>{state.current.step=step},[step])
 useEffect(()=>{
  if(!session)return
  const channel=new BroadcastChannel(key)
  const receive=(value:unknown)=>{const v=value as {step?:number;sequence?:number};if(Number.isInteger(v?.step)&&v.step!>=0&&v.step!<=total&&Number.isInteger(v.sequence)&&v.sequence!>=state.current.sequence){state.current.sequence=v.sequence!;setStep(v.step!)}}
  if(audience){try{receive(JSON.parse(localStorage.getItem(key)||'null'))}catch{/* No saved public state. */}}
  channel.onmessage=e=>{if(audience)receive(e.data);else if(e.data?.request)channel.postMessage(state.current)}
  if(audience)channel.postMessage({request:true})
  else {const value={step,sequence:Date.now()};state.current.sequence=value.sequence;channel.postMessage(value);try{localStorage.setItem(key,JSON.stringify(value))}catch{/* Channel still works. */}}
  return()=>channel.close()
 },[session,key,audience,step,total])
 const visible=printing?total:step
 const selected=board.items?.[visible-1]||board.rows?.[visible-1]
 const focusLabel=typeof selected==='string'?selected:Array.isArray(selected)?String(selected[0]):selected&&typeof selected==='object'&&'label'in selected?String(selected.label):''
 return <section className="learning-visual ig-surface" aria-label="Пошаговый разбор" onKeyDown={e=>e.stopPropagation()}>
  <p className="visual-input"><TechnicalText text={data.body}/></p>
  <ScenarioBoard board={board} focus={!printing&&visible>0?visible-1:undefined}/>
  <p className={`visual-caption ${visible===0&&!printing?'visual-overview':''}`}>{visible===total?<TechnicalText text={data.steps.at(-1)?.text||''}/>:visible===0?'Обзор данных и связей. Начните разбор, чтобы выделить отдельное действие.':<TechnicalText text={`Фокус: ${focusLabel}. Сопоставьте выделенное действие с исходными данными.`}/>}</p>
  {!printing&&!audience&&<div className="visual-controls"><button type="button" onClick={()=>setStep(s=>s-1)} disabled={step===0}>Назад</button><span role="status" aria-live="polite">{step===0?'Обзор':`Шаг ${step} / ${total}`}</span><button className="visual-primary" type="button" onClick={()=>setStep(s=>s+1)} disabled={step===total}>{step===0?'Начать разбор':'Далее'}</button><button type="button" onClick={()=>setStep(0)} disabled={step===0}>Сначала</button></div>}
 </section>
}
