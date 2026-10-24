import {createRoot} from 'react-dom/client'
import {LectureSite,validateCourse,VisualRendererProvider} from '@olgakraven/lecture-engine'
import '@olgakraven/lecture-engine/style.css'
import {CourseCatalog} from './CourseCatalog'
import {prepareTeacherSession} from './teacherNotes'
import {LearningVisual} from './learning/LearningVisual'
import {installPresentation} from './presentation'
import './presentation-design.css'
import './learning/learning.css'
const root=createRoot(document.getElementById('root')!)
async function load(){
 root.render(<p role="status">Загружаем курс…</p>)
 try {
  const response=await fetch(`${import.meta.env.BASE_URL}course.json`,{cache:'no-cache',signal:AbortSignal.timeout(15000)})
  if(!response.ok) throw Error(`Не удалось загрузить курс: ${response.status}`)
  const course=await response.json();validateCourse(course)
  const url=new URL(location.href),topic=url.searchParams.get('topic')
  if(topic&&!url.searchParams.has('lecture')){
   const links=await fetch(`${import.meta.env.BASE_URL}legacy-links.json`).then(r=>r.json())
   url.searchParams.delete('topic');url.searchParams.set('lecture',topic)
   url.searchParams.set('slide',links[topic]?.[url.searchParams.get('slide')||'1']||'')
   history.replaceState(null,'',url)
  }
  document.title=`${course.code} · ${course.discipline}`
  const base=import.meta.env.BASE_URL,mode=url.searchParams.get('mode')
  try{document.documentElement.dataset.theme=JSON.parse(localStorage.getItem(`lecture:${base}:${course.id}:theme`)||'"light"')}catch{/* Use the default theme if storage is unavailable. */}
  if(mode==='case'){const {CaseWorkshop}=await import('./learning/CaseWorkshop');root.render(<CaseWorkshop base={base} id={url.searchParams.get('case')||''}/>);return}
  if(mode==='diagram'){const {DiagramView}=await import('./learning/DiagramView');root.render(<DiagramView course={course} base={base} id={url.searchParams.get('slide')||''}/>);return}
  let teacherSession:Awaited<ReturnType<typeof prepareTeacherSession>>|undefined
  if(mode!=='audience'&&mode!=='print'){
   const response=await fetch(`${base}teacher-notes.json`,{cache:'no-cache',signal:AbortSignal.timeout(15000)})
   if(!response.ok)throw Error('Не удалось получить сценарий преподавателя')
   teacherSession=await prepareTeacherSession(course,base,await response.json(),{getItem:k=>localStorage.getItem(k)})
  }
  installPresentation(course,base)
  root.render(<VisualRendererProvider render={props=>props.slide.id.endsWith('-logic')?<LearningVisual key={props.slide.id} {...props}/>:undefined}>
   <LectureSite course={course} base={base} teacherNotes={teacherSession?.notes} resolveTeacherNotes={teacherSession?.resolve} renderCatalog={props=><CourseCatalog {...props}/>}/>
  </VisualRendererProvider>)
 }catch(error){root.render(<main><h1>Курс не загрузился</h1><p role="alert">{String(error)}</p><button onClick={()=>void load()}>Повторить</button></main>)}
}
void load()
