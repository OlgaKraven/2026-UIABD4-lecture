import {Infographic} from '@olgakraven/lecture-engine'
import type {Course} from '@olgakraven/lecture-engine'
import {LearningVisual} from './LearningVisual'
export function DiagramView({course,base,id}:{course:Course;base:string;id:string}){
 const lecture=course.lectures.find(l=>l.slides.some(s=>s.id===id)),slide=lecture?.slides.find(s=>s.id===id)
 if(!slide)return <main className="case-workshop"><h1>Схема не найдена</h1><a href={base}>К лекциям</a></main>
 const visual=slide.visual||(slide.steps?{type:'process' as const,items:slide.steps,caption:'Последовательность действий в учебном примере.'}:undefined)
 return <main className="diagram-workspace"><header><a href={`${base}?lecture=${lecture!.id}&slide=${id}`}>← К лекции</a><span>{lecture!.semester} семестр</span></header><h1>{slide.title}</h1><section className="diagram-paper">{id.endsWith('-logic')?<LearningVisual slide={slide} base={base} interactive/>:visual?<Infographic visual={visual} base={base}/>:<p>{slide.body}</p>}</section></main>
}
