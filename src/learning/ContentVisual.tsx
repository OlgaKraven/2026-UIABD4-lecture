import type {Slide} from '@olgakraven/lecture-engine'
import {ScenarioBoard} from './ScenarioBoard'
import {TechnicalText} from './TechnicalText'
export function ContentVisual({slide}:{slide:Slide}){
 const visual=slide.visual
 return <section className="course-visual ig-surface" aria-label="Разбор примера">
  {visual?.type==='codeParts'?<><div className="visual-code-parts">{visual.parts.map((part,i)=><div className="visual-code-part" key={i}><h3>{part.label}</h3><pre><code>{part.code}</code></pre><p><TechnicalText text={part.explanation}/></p></div>)}</div><p className="visual-caption"><TechnicalText text={visual.caption}/></p></>
  :visual&&(visual.type==='comparison'||visual.type==='matrix')?<><ScenarioBoard board={{kind:'table',columns:visual.columns,rows:visual.rows}}/>{visual.caption&&<p className="visual-caption"><TechnicalText text={visual.caption}/></p>}</>
  :<>{(slide.steps||((visual?.type==='process'||visual?.type==='timeline')?visual.items:[])).map((step,i)=><div className="visual-explanation" key={i}><h3>{step.title}</h3><p><TechnicalText text={step.text}/></p></div>)}</>}
 </section>
}
