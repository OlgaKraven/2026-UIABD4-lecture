import {describe,it,expect} from 'vitest'
import type {Course,TeacherPack} from '@olgakraven/lecture-engine'
import courseData from '../public/course.json'
import noteData from '../public/teacher-notes.json'
import {prepareTeacherSession} from '../src/teacherNotes'
const course=courseData as unknown as Course
const digest=async(text:string)=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text)))].map(n=>n.toString(16).padStart(2,'0')).join('')
describe('bibliography note migration',()=>{
 it('merges personal notes from removed slides, skips old automatic text, and keeps subsequent edits',async()=>{
  const pack=structuredClone(noteData),target=Object.values(pack.slideAliases)[0],old=Object.keys(pack.slideAliases).filter(id=>pack.slideAliases[id as keyof typeof pack.slideAliases]===target)
  const automatic='Старый автоматический сценарий',personal='Мой вопрос группе про этот источник'
  const hashes=pack.previousNoteHashes as Record<string,Record<string,string[]>>
  hashes[old[1]]={script:[await digest(automatic)]}
  const saved:Record<string,unknown>={[old[0]]:{...pack.notes[target as keyof typeof pack.notes],script:personal},[old[1]]:{...pack.notes[target as keyof typeof pack.notes],script:automatic}}
  const storage={getItem:()=>JSON.stringify(saved)}
  const session=await prepareTeacherSession(course,'/',pack as TeacherPack,storage)
  expect(session.notes[target].script).toContain(personal)
  expect(session.notes[target].script).not.toContain(automatic)
  expect(session.resolve()[target].script).toContain(personal)
  saved[target]={...session.notes[target],script:'Новая правка во время занятия'}
  expect(session.resolve()[target].script).toBe('Новая правка во время занятия')
  const reloaded=await prepareTeacherSession(course,'/',pack as TeacherPack,storage)
  expect(reloaded.notes[target].script.match(new RegExp(personal,'g'))).toHaveLength(1)
 })
})
