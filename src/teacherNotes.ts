import type { Course, Note, TeacherPack } from '@olgakraven/lecture-engine'

// Previously auto-loaded fields should not conceal additions published within
// the same content version. Compare exact fingerprints; preserve manual edits.
export async function prepareUpdatedTeacherNotes(course: Course, base: string, value: unknown, storage: Pick<Storage,'getItem'>) {
  const prepared=prepareTeacherNotes(course,base,value,storage)
  const pack=value as TeacherPack & {previousContentVersion?:string;slideAliases?:Record<string,string>;previousNoteHashes?:Record<string,Partial<Record<keyof Note,string[]>>>}
  if(!pack.previousNoteHashes)return prepared
  const fields=['script','preparation','notebook','questions','answer','estimatedSeconds'] as const
  await Promise.all(Object.entries(pack.previousNoteHashes).map(async([id,hashes])=>{
    if(!prepared[id])return
    // Clone before changing: never mutate the publication or the stored object.
    const note={...prepared[id]}
    await Promise.all(fields.map(async field=>{
      if(!Array.isArray(hashes[field]))return
      const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(String(note[field])))
      const hash=[...new Uint8Array(digest)].map(n=>n.toString(16).padStart(2,'0')).join('')
      if(hashes[field].includes(hash)) {
        if(field==='estimatedSeconds')note.estimatedSeconds=pack.notes[id].estimatedSeconds
        else note[field]=pack.notes[id][field]
      }
    }))
    prepared[id]=note
  }))
  // Keep personal notes from a book's old slide on the combined bibliography.
  let saved:Record<string,Partial<Note>>={}
  try{saved=JSON.parse(storage.getItem(`lecture:${base}:${course.id}:private:${course.contentVersion}`)||(pack.previousContentVersion?storage.getItem(`lecture:${base}:${course.id}:private:${pack.previousContentVersion}`):null)||'{}')}catch{/* Original storage stays untouched. */}
  for(const [oldId,target] of Object.entries(pack.slideAliases||{})){
    if(!prepared[target])continue
    for(const field of ['script','preparation','notebook','questions','answer'] as const){
      const text=saved[oldId]?.[field];if(typeof text!=='string'||!text.trim())continue
      const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text))
      const hash=[...new Uint8Array(digest)].map(n=>n.toString(16).padStart(2,'0')).join('')
      if(pack.previousNoteHashes[oldId]?.[field]?.includes(hash)||prepared[target][field].includes(text))continue
      prepared[target]={...prepared[target],[field]:[prepared[target][field],text].filter(Boolean).join('\n\n')}
    }
  }
  return prepared
}

export function prepareTeacherNotes(course: Course, base: string, value: unknown, storage: Pick<Storage, 'getItem'>) {
  const pack = value as TeacherPack
  if (!pack || pack.schemaVersion !== 1 || pack.courseId !== course.id || pack.contentVersion !== course.contentVersion || !pack.notes || typeof pack.notes !== 'object') {
    throw new Error('Заметки относятся к другому курсу или версии')
  }
  const ids = new Set(course.lectures.flatMap(lecture => lecture.slides.map(slide => slide.id)))
  const fields = ['script', 'preparation', 'notebook', 'questions', 'answer'] as const
  const validNote = (note: unknown): note is Note => !!note && typeof note === 'object'
    && fields.every(field => typeof (note as Note)[field] === 'string')
    && Number.isFinite((note as Note).estimatedSeconds) && (note as Note).estimatedSeconds >= 0
  if (Object.keys(pack.notes).length !== ids.size || Object.entries(pack.notes).some(([id, note]) => !ids.has(id) || !validNote(note))) {
    throw new Error('Неполный или повреждённый комплект заметок')
  }
  // Storage contract of the pinned lecture-engine version. Preserve local edits.
  const key = `lecture:${base}:${course.id}:private:${course.contentVersion}`
  let saved: Record<string, Note> = {}
  try {
    const previous=(value as TeacherPack & {previousContentVersion?:string}).previousContentVersion
    const raw = storage.getItem(key) || (previous ? storage.getItem(`lecture:${base}:${course.id}:private:${previous}`) : null)
    if (raw) {
      const parsed: unknown = JSON.parse(raw)
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Повреждены сохранённые заметки')
      saved = Object.fromEntries(Object.entries(parsed).filter(([id, note]) => ids.has(id) && validNote(note)).map(([id, note]) => {
        // Empty local sections must not hide the published script or other sections.
        const local = note as Note
        const merged = { ...pack.notes[id], estimatedSeconds: local.estimatedSeconds }
        for (const field of fields) if (local[field].trim()) merged[field] = local[field]
        return [id, merged]
      }))
    }
  } catch {
    // Storage may be unavailable or contain an old malformed record. Published
    // notes still render from memory; never destroy the user's saved data here.
  }
  return { ...pack.notes, ...saved }
}

// Remember exact automatic values recognised during the initial async refresh.
// A synchronous re-entry reads the latest personal edits without allowing those
// older automatic fields to mask the publication again. Storage stays untouched.
export async function prepareTeacherSession(course: Course, base: string, value: unknown, storage: Pick<Storage, 'getItem'>) {
  const before = prepareTeacherNotes(course, base, value, storage)
  const notes = await prepareUpdatedTeacherNotes(course, base, value, storage)
  const fields = ['script', 'preparation', 'notebook', 'questions', 'answer', 'estimatedSeconds'] as const
  const replacements = Object.entries(notes).flatMap(([id, note]) => fields
    .filter(field => before[id][field] !== note[field])
    .map(field => ({ id, field, previous: before[id][field] })))
  return { notes, resolve: () => {
    const current = prepareTeacherNotes(course, base, value, storage)
    for (const { id, field, previous } of replacements) if (current[id][field] === previous) {
      const refreshed = { ...current[id] }
      if (field === 'estimatedSeconds') refreshed.estimatedSeconds = notes[id].estimatedSeconds
      else refreshed[field] = notes[id][field]
      current[id] = refreshed
    }
    return current
  } }
}
