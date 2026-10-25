import {useEffect} from 'react'

type Position={scope:string;selector:string;index:number;x:number;y:number;anchor?:{tag:string;text:string;offset:number};open?:boolean}
type Snapshot={sequence:number;positions:Position[]}
const normalized=(e:Element)=>e.textContent?.replace(/\s+/g,' ').trim()||''

// Share public viewport state independently of the presenter's private panels.
export function useProjectionViewport(courseId:string,base:string){
 useEffect(()=>{
  let channel:BroadcastChannel|undefined,key='',readOnly=false,revision=0,positions:Position[]=[],scheduled=0
  const scopeFor=(e:Element)=>{
   const modal=e.closest<HTMLElement>('.lecture-tool-modal');if(modal)return {root:modal,scope:'tool:'+modal.dataset.toolId}
   const frame=e.closest<HTMLElement>('.slide-frame');if(frame&&frame.closest('.audience-slide,.presenter-preview>.mini-stage'))return {root:frame,scope:'slide:'+frame.dataset.slideId}
   const popup=e.closest<HTMLElement>('.matching-popup');if(popup)return {root:popup,scope:'matching:'+normalized(popup.querySelector('.matching-popup-heading')!)}
   return null
  }
  const locate=(scope:string)=>scope.startsWith('tool:')?document.querySelector<HTMLElement>('.lecture-tool-modal[data-tool-id="'+CSS.escape(scope.slice(5))+'"]'):scope.startsWith('slide:')?document.querySelector<HTMLElement>('.audience-slide .slide-frame[data-slide-id="'+CSS.escape(scope.slice(6))+'"]'):[...document.querySelectorAll<HTMLElement>('.matching-popup')].find(e=>normalized(e.querySelector('.matching-popup-heading')!)===scope.slice(9))
  const apply=()=>{
   if(!readOnly)return
   for(const p of positions){const root=locate(p.scope);if(!root)continue
    const target=p.selector===':root'?root:root.querySelectorAll<HTMLElement>(p.selector)[p.index];if(!target)continue
    if(p.open!==undefined){if(target instanceof HTMLDetailsElement&&target.open!==p.open)target.open=p.open;continue}
    let top=p.y*Math.max(0,target.scrollHeight-target.clientHeight)
    if(p.anchor&&p.y>0&&p.y<.995){const anchor=[...target.querySelectorAll(p.anchor.tag)].find(e=>normalized(e)===p.anchor!.text);if(anchor)top=target.scrollTop+anchor.getBoundingClientRect().top-target.getBoundingClientRect().top-p.anchor.offset*target.clientWidth}
    const left=p.x*Math.max(0,target.scrollWidth-target.clientWidth)
    if(Math.abs(target.scrollTop-top)>1||Math.abs(target.scrollLeft-left)>1)target.scrollTo({top,left,behavior:'instant'})
   }
  }
  const connect=()=>{
   const params=new URLSearchParams(location.search),session=params.get('session'),mode=params.get('mode');if(!session||!['presenter','audience'].includes(mode||''))return false
   const next=`lecture:${base}:${courseId}:viewport:${session}`;if(next===key)return true
   channel?.close();key=next;readOnly=mode==='audience';revision=0;positions=[];channel=new BroadcastChannel(key)
   const receive=(value:Snapshot)=>{if(!value||!Number.isFinite(value.sequence)||value.sequence<=revision||!Array.isArray(value.positions))return;revision=value.sequence;positions=value.positions;apply()}
   channel.onmessage=e=>{if(readOnly)receive(e.data);else if(e.data?.request)channel?.postMessage({sequence:++revision,positions})}
   if(readOnly){try{receive(JSON.parse(localStorage.getItem(key)||'null'))}catch{/* No saved viewport. */}channel.postMessage({request:true})}
   return true
  }
  const share=(target:HTMLElement,details=false)=>{
   if(!connect()||readOnly)return;const scope=scopeFor(target);if(!scope)return
   const selector=target===scope.root?':root':target.tagName.toLowerCase()+[...target.classList].map(c=>'.'+CSS.escape(c)).join(''),index=selector===':root'?0:[...scope.root.querySelectorAll(selector)].indexOf(target)
   const p:Position={scope:scope.scope,selector,index,x:target.scrollLeft/Math.max(1,target.scrollWidth-target.clientWidth),y:target.scrollTop/Math.max(1,target.scrollHeight-target.clientHeight)}
   if(details&&target instanceof HTMLDetailsElement)p.open=target.open
   else{const top=target.getBoundingClientRect().top,anchor=[...target.querySelectorAll('h1,h2,h3,tr,p')].find(e=>{const r=e.getBoundingClientRect();return r.top>=top+60&&r.top<top+target.clientHeight&&r.height>0&&!e.closest('.workbench-input-help,.workbench-actions')});if(anchor)p.anchor={tag:anchor.tagName.toLowerCase(),text:normalized(anchor),offset:(anchor.getBoundingClientRect().top-top)/target.clientWidth}}
   positions=positions.filter(x=>!(x.scope===p.scope&&x.selector===p.selector&&x.index===p.index&&('open'in x)===('open'in p)));positions.push(p);positions=positions.slice(-80)
   const snapshot={sequence:Math.max(Date.now(),revision+1),positions};revision=snapshot.sequence;channel?.postMessage(snapshot);try{localStorage.setItem(key,JSON.stringify(snapshot))}catch{/* Live channel remains available. */}
  }
  const scroll=(e:Event)=>{if(e.target instanceof HTMLElement)share(e.target)}
  const toggle=(e:Event)=>{if(e.target instanceof HTMLDetailsElement)share(e.target,true)}
  const observer=new MutationObserver(()=>{if(!connect())return;if(readOnly){cancelAnimationFrame(scheduled);scheduled=requestAnimationFrame(apply)}else document.querySelectorAll<HTMLElement>('.lecture-tool-modal details').forEach(e=>{const scope=scopeFor(e);if(scope&&!positions.some(p=>p.scope===scope.scope&&p.open===(e as HTMLDetailsElement).open))share(e,true)})})
  connect();observer.observe(document.body,{childList:true,subtree:true});document.addEventListener('scroll',scroll,true);document.addEventListener('toggle',toggle,true)
  return()=>{observer.disconnect();channel?.close();cancelAnimationFrame(scheduled);document.removeEventListener('scroll',scroll,true);document.removeEventListener('toggle',toggle,true)}
 },[courseId,base])
}
