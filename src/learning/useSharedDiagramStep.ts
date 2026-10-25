import {useCallback,useEffect,useRef,useState} from 'react'
import type {SetStateAction} from 'react'

type State={step:number;sequence:number}
export function useSharedDiagramStep(id:string,total:number,enabled:boolean){
 const params=new URLSearchParams(location.search),readOnly=params.get('mode')==='audience',session=params.get('session')||'study'
 const key=`lecture:diagram:${location.pathname}:${session}:${id}`
 const valid=useCallback((v:State)=>v&&Number.isInteger(v.step)&&v.step>=0&&v.step<=total&&Number.isFinite(v.sequence),[total])
 const read=()=>{try{const saved=JSON.parse(localStorage.getItem(key)||'null');if(enabled&&valid(saved))return saved}catch{/* Start at the overview. */}return {step:0,sequence:0}}
 const [step,setStep]=useState(()=>read().step),latest=useRef<State>(read()),bus=useRef<BroadcastChannel|null>(null)
 useEffect(()=>{
  if(!enabled)return
  const channel=new BroadcastChannel(key);bus.current=channel
  const receive=(state:State)=>{if(valid(state)&&state.sequence>latest.current.sequence){latest.current=state;setStep(state.step)}}
  channel.onmessage=e=>{if(e.data?.request){if(!readOnly)channel.postMessage(latest.current)}else receive(e.data)}
  channel.postMessage({request:true})
  return()=>{channel.close();bus.current=null}
 },[key,total,enabled,readOnly,valid])
 const change=useCallback((update:SetStateAction<number>)=>{
  if(readOnly||!enabled)return
  const next=typeof update==='function'?update(latest.current.step):update
  if(!Number.isInteger(next)||next<0||next>total)return
  const state={step:next,sequence:Math.max(Date.now(),latest.current.sequence+1)};latest.current=state;setStep(next)
  bus.current?.postMessage(state);try{localStorage.setItem(key,JSON.stringify(state))}catch{/* Live channel remains available. */}
 },[enabled,readOnly,total,key])
 return [step,change] as const
}
