import type {Course} from '@olgakraven/lecture-engine'
import {LearningVisual} from './LearningVisual'
import {ContentVisual} from './ContentVisual'
import {TechnicalText} from './TechnicalText'
export function DiagramView({course,base,id,onClose}:{course:Course;base:string;id:string;onClose?:()=>void}){
 const lecture=course.lectures.find(l=>l.slides.some(s=>s.id===id)),slide=lecture?.slides.find(s=>s.id===id)
 if(!slide)return <main className="case-workshop"><h1>Схема не найдена</h1><a href={base}>К лекциям</a></main>
 return <main className="diagram-workspace"><header>{!onClose&&<a href={`${base}?lecture=${lecture!.id}&slide=${id}`}>← К лекции</a>}<span>{lecture!.semester} семестр</span></header><h1>{slide.title}</h1><section className="diagram-paper">{id.endsWith('-logic')?<LearningVisual slide={slide} base={base} interactive/>:<>{slide.body&&<p className="diagram-condition"><TechnicalText text={slide.body}/></p>}<ContentVisual slide={slide}/></>}</section></main>
}
