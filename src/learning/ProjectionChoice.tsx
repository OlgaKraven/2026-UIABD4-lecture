import {useContext,useEffect,useRef,useState} from 'react'
import {CourseMatchingChoice} from '../../engine-extension/runtime/lib/matching-choice.js'
import {ProjectionChoiceScope} from './projectionChoiceScope'

// Scenario choices use the same projected list as matching questions.
export function ProjectionChoice({label,value,options,readOnly,onChange}:{label:string;value:string;options:string[];readOnly:boolean;onChange:(value:string)=>void}){
 const session=new URLSearchParams(location.search).get('session'),id=useContext(ProjectionChoiceScope)
 const key=`lecture:choice:${session}:${id}:${label}`,[mirrored,setMirrored]=useState(value),latest=useRef({value,sequence:0})
 useEffect(()=>{
  if(!session)return;const channel=new BroadcastChannel(key)
  const send=()=>{const state={value,sequence:Math.max(Date.now(),latest.current.sequence+1)};latest.current=state;channel.postMessage(state);try{localStorage.setItem(key,JSON.stringify(state))}catch{/* Live channel remains available. */}}
  const receive=(state:{value:string;sequence:number})=>{if(state&&options.includes(state.value)&&state.sequence>latest.current.sequence){latest.current=state;setMirrored(state.value)}}
  channel.onmessage=e=>{if(readOnly)receive(e.data);else if(e.data?.request)send()}
  if(readOnly){try{receive(JSON.parse(localStorage.getItem(key)||'null'))}catch{/* No saved choice. */}channel.postMessage({request:true})}else send()
  return()=>channel.close()
 },[key,session,value,readOnly,options])
 return <CourseMatchingChoice task={{id:id+':'+label}} item={{id:label,text:label}} label={label} options={options.map(x=>({id:x,text:x}))} value={readOnly&&session?mirrored:value} readOnly={readOnly} disabled={false} onChange={onChange}/>
}
