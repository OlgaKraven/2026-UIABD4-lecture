import {useEffect,useRef,useState} from 'react'
import {Infographic} from '@olgakraven/lecture-engine'
import type {VisualRendererProps} from '@olgakraven/lecture-engine'
import inputs from './visual-inputs.json'
export function LearningVisual({slide,base}:VisualRendererProps){
 const data=(inputs as Record<string,{body:string;steps:{title:string;text:string}[]}>)[slide.id]
 const [step,setStep]=useState(0),[playing,setPlaying]=useState(false)
 const elapsed=useRef(0),state=useRef({step:0,playing:false})
 const params=new URLSearchParams(location.search),audience=params.get('mode')==='audience',printing=params.get('mode')==='print'
 const session=params.get('session'),key=`uiabd4:diagram:${session}:${slide.id}`
 useEffect(()=>{state.current={step,playing}},[step,playing])
 useEffect(()=>{
  if(!playing||audience||printing)return
  let raf=0,last=performance.now()
  const tick=(now:number)=>{elapsed.current+=Math.min(now-last,100);last=now
   if(elapsed.current>=1800){elapsed.current=0;setStep(s=>Math.min(2,s+1));if(state.current.step>=1){setPlaying(false);return}}
   raf=requestAnimationFrame(tick)
  };raf=requestAnimationFrame(tick)
  return()=>cancelAnimationFrame(raf)
 },[playing,audience,printing])
 useEffect(()=>{const pause=()=>{if(document.hidden)setPlaying(false)};document.addEventListener('visibilitychange',pause);return()=>document.removeEventListener('visibilitychange',pause)},[])
 useEffect(()=>{
  if(!session)return
  const channel=new BroadcastChannel(key)
  const receive=(value:unknown)=>{const v=value as {step?:number};if(Number.isInteger(v?.step)&&v.step!>=0&&v.step!<=2)setStep(v.step!)}
  if(audience){try{receive(JSON.parse(localStorage.getItem(key)||'null'))}catch{/* No saved public state. */}}
  channel.onmessage=e=>{if(audience)receive(e.data);else if(e.data?.request)channel.postMessage(state.current)}
  if(audience)channel.postMessage({request:true})
  else {channel.postMessage({step,playing});try{localStorage.setItem(key,JSON.stringify({step,playing}))}catch{/* Channel still works. */}}
  return()=>channel.close()
 },[session,key,audience,step,playing])
 const move=(n:number)=>{setPlaying(false);elapsed.current=0;setStep(Math.max(0,Math.min(2,n)))}
 const visible=printing?2:step
 return <section className="learning-visual" aria-label="Пошаговый разбор" onKeyDown={e=>e.stopPropagation()}>
  <p className="visual-input">{data?.body||'Учебная модель. Исходное состояние показано на схеме.'}</p>
  {visible>=1&&slide.visual&&(slide.visual.type==='decision'?<figure className="infographic"><table><thead><tr><th>Проверка условия</th><th>Следующее действие</th></tr></thead><tbody><tr><td>{slide.visual.question} Да</td><td>{slide.visual.yes}</td></tr><tr><td>{slide.visual.question} Нет</td><td>{slide.visual.no}</td></tr></tbody></table><figcaption>{slide.visual.caption}</figcaption></figure>:slide.visual.type==='beforeAfter'?<figure className="infographic"><table><thead><tr><th>{slide.visual.before.title}</th><th>{slide.visual.after.title}</th></tr></thead><tbody>{slide.visual.before.fields.map((field,i)=><tr key={field.label}><td>{field.label}: {field.value}</td><td>{slide.visual?.type==='beforeAfter'&&slide.visual.after.fields[i]&&`${slide.visual.after.fields[i].label}: ${slide.visual.after.fields[i].value}`}</td></tr>)}</tbody></table><figcaption>{slide.visual.changes.join(' ')} {slide.visual.caption}</figcaption></figure>:<Infographic visual={slide.visual} base={base}/>)}
  {visible===0&&<div className="visual-overview">Определите исходные величины и правило преобразования. Запустите разбор или перейдите к следующему шагу.</div>}
  {visible===2&&data?.steps?.at(-1)?.text!==slide.visual?.caption&&!printing&&<p className="visual-conclusion">{data?.steps?.at(-1)?.text}</p>}
  {!printing&&!audience&&<div className="visual-controls"><button type="button" onClick={()=>move(step-1)} disabled={step===0}>Назад</button><span role="status">Шаг {step} / 2</span><button type="button" onClick={()=>move(step+1)} disabled={step===2}>Далее</button><button type="button" aria-pressed={playing} onClick={()=>{if(step===2)move(0);setPlaying(p=>!p)}}>{playing?'Пауза':step===2?'Повторить':'Показать'}</button></div>}
 </section>
}
