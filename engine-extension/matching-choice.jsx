import {useEffect,useLayoutEffect,useCallback,useId,useRef,useState} from 'react';
import {createPortal} from 'react-dom';

// The answer stays in the assessment provider. This channel shares only the
// open list and highlighted option, which native select popups cannot project.
export function CourseMatchingChoice({task,item,options,value,disabled,readOnly,onChange}) {
 const session=new URLSearchParams(location.search).get('session');
 const channelKey=session?`lecture:matching:${session}:${task.id}:${item.id}`:null;
 const [ui,setUI]=useState({open:false,active:0}),[position,setPosition]=useState(null);
 const trigger=useRef(null),popup=useRef(null),bus=useRef(null),revision=useRef(0),latest=useRef(ui),optionRefs=useRef([]);
 const id='matching-'+useId().replace(/[^a-zA-Z0-9_-]/g,'');
 useLayoutEffect(()=>{latest.current=ui},[ui]);
 const current=options.find(o=>o.id===value),expanded=ui.open&&(!disabled||readOnly);
 const update=useCallback(next=>setUI(previous=>previous.open===next.open&&previous.active===next.active?previous:next),[]);
 const emit=useCallback(next=>{
  if(!channelKey)return;
  const state={...next,sequence:Math.max(Date.now(),revision.current+1)};revision.current=state.sequence;
  bus.current?.postMessage(state);
  try{localStorage.setItem(channelKey,JSON.stringify(state))}catch{/* Live channel remains available. */}
 },[channelKey]);
 useEffect(()=>{
  if(!channelKey)return;
  let channel;try{channel=new BroadcastChannel(channelKey);bus.current=channel}catch{/* Storage events are an alternative. */}
  const receive=state=>{
   if(!state||typeof state.open!=='boolean'||!Number.isInteger(state.active)||state.active<0||state.active>=options.length||!Number.isFinite(state.sequence)||state.sequence<=revision.current)return;
   revision.current=state.sequence;update({open:state.open,active:state.active});
  };
  if(channel)channel.onmessage=e=>{if(readOnly)receive(e.data);else if(e.data?.request)emit(latest.current)};
  const storage=e=>{if(readOnly&&e.key===channelKey){try{receive(JSON.parse(e.newValue))}catch{/* Ignore an unrelated or incomplete snapshot. */}}};
  window.addEventListener('storage',storage);
  if(readOnly){try{receive(JSON.parse(localStorage.getItem(channelKey)||'null'))}catch{/* No saved list state. */}channel?.postMessage({request:true})}
  return()=>{if(!readOnly)emit({open:false,active:latest.current.active});window.removeEventListener('storage',storage);channel?.close();bus.current=null};
 },[channelKey,readOnly,options.length,emit,update]);
 useEffect(()=>{if(!readOnly)emit(ui)},[ui,readOnly,emit]);
 useEffect(()=>{if(disabled&&!readOnly)update({...latest.current,open:false})},[disabled,readOnly,update]);
 useEffect(()=>{
  if(!expanded||readOnly)return;
  const outside=e=>{if(!trigger.current?.contains(e.target)&&!popup.current?.contains(e.target))update({...latest.current,open:false})};
  const focus=e=>{if(!trigger.current?.contains(e.target)&&!popup.current?.contains(e.target))update({...latest.current,open:false})};
  document.addEventListener('pointerdown',outside,true);document.addEventListener('focusin',focus);
  return()=>{document.removeEventListener('pointerdown',outside,true);document.removeEventListener('focusin',focus)};
 },[expanded,readOnly,update]);
 useLayoutEffect(()=>{
  if(!expanded)return;
  const place=()=>{
   if(!trigger.current)return;
   const r=trigger.current.getBoundingClientRect(),width=Math.min(Math.max(r.width,360),720,innerWidth-24),below=innerHeight-r.bottom-16,above=r.top-16,up=below<200&&above>below,maxHeight=Math.max(120,Math.min(520,up?above:below));
   const next={left:Math.max(12,Math.min(r.left,innerWidth-width-12)),width,maxHeight,...(up?{bottom:innerHeight-r.top+6}:{top:r.bottom+6})};
   setPosition(old=>JSON.stringify(old)===JSON.stringify(next)?old:next);
  };
  trigger.current?.scrollIntoView({block:'nearest'});place();window.addEventListener('resize',place);window.addEventListener('scroll',place,true);
  return()=>{window.removeEventListener('resize',place);window.removeEventListener('scroll',place,true)};
 },[expanded]);
 useLayoutEffect(()=>{if(expanded)optionRefs.current[ui.active]?.scrollIntoView({block:'nearest'})},[expanded,ui.active,position]);
 const open=()=>update({open:true,active:Math.max(0,options.findIndex(o=>o.id===value))});
 const choose=index=>{if(readOnly||disabled||!options[index])return;onChange(options[index].id);update({open:false,active:index});trigger.current?.focus()};
 const keys=e=>{
  e.stopPropagation();if(readOnly||disabled)return;
  if(e.key==='Tab'){update({...ui,open:false});return}
  if(e.key==='Escape'){e.preventDefault();update({...ui,open:false});return}
  if(['Enter',' '].includes(e.key)){e.preventDefault();if(expanded)choose(ui.active);else open();return}
  if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){
   e.preventDefault();let active=ui.active;
   if(!expanded)active=Math.max(0,options.findIndex(o=>o.id===value));
   else if(e.key==='ArrowDown')active=(active+1)%options.length;
   else if(e.key==='ArrowUp')active=(active+options.length-1)%options.length;
   if(e.key==='Home')active=0;if(e.key==='End')active=options.length-1;
   update({open:true,active});
  }
 };
 const attributes={className:'matching-combobox',role:'combobox','aria-label':`Соответствие: ${item.text}`,'aria-expanded':expanded,'aria-haspopup':'listbox','aria-controls':expanded?id:undefined,'aria-activedescendant':expanded?`${id}-${ui.active}`:undefined,'aria-readonly':readOnly||undefined,onKeyDown:keys};
 const content=<><span className="matching-value">{current?.text||'Выберите соответствие'}</span><span aria-hidden="true" className="matching-caret">⌄</span></>;
 return <div className="matching-control">
  {readOnly?<div {...attributes} ref={trigger} aria-disabled="true">{content}</div>:<button {...attributes} ref={trigger} type="button" disabled={disabled} onClick={()=>expanded?update({...ui,open:false}):open()}>{content}</button>}
  {expanded&&position&&createPortal(<div className="matching-popup" ref={popup} style={position} data-audience={readOnly} onKeyDown={keys}>
   <div className="matching-popup-heading">{item.text}</div>
   <div id={id} role="listbox" aria-label={`Варианты соответствия: ${item.text}`} className="matching-option-list">
    {options.map((option,index)=><div key={option.id} id={`${id}-${index}`} ref={node=>{optionRefs.current[index]=node}} role="option" aria-selected={option.id===value} data-active={ui.active===index} className="matching-option" {...(!readOnly?{onPointerEnter:()=>update({open:true,active:index}),onPointerDown:e=>e.preventDefault(),onClick:()=>choose(index)}:{})}><span>{option.text}</span>{option.id===value&&<span aria-hidden="true">✓</span>}</div>)}
   </div>
  </div>,document.body)}
 </div>;
}
