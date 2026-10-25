import {readFileSync} from 'node:fs'
import {runInNewContext} from 'node:vm'
import {describe,it,expect} from 'vitest'

// Exercise the scorer shipped to the browser, including the runtime preparation patch.
const runtime=readFileSync(new URL('../engine-extension/runtime/lib/SlideView-ejiylWgb.js',import.meta.url),'utf8')
const region=runtime.split('//#region src/engine/scoring.ts')[1].split('//#endregion')[0]
const grade=runInNewContext(region+';Ge')
describe('short answer scoring',()=>{
 const task={type:'short'},flag={type:'short',accepted:['-P'],explanation:''}
 it('distinguishes the MySQL port flag from the password flag',()=>{expect(grade(task,flag,'-P').score).toBe(1);expect(grade(task,flag,'-p').score).toBe(0)})
 it('accepts surrounding whitespace while preserving flag case',()=>{expect(grade(task,flag,'  -P  ').score).toBe(1);expect(grade(task,flag,'  -p  ').score).toBe(0)})
 it('keeps ordinary terminology case insensitive and collapses spaces',()=>{expect(grade(task,{type:'short',accepted:['SHOW GRANTS']},'  show   grants ').score).toBe(1)})
 it('accepts decimal commas and refuses whitespace as a numeric answer',()=>{const key={type:'short',numeric:{value:1.5,tolerance:0}};expect(grade(task,key,' 1,5 ').score).toBe(1);expect(grade(task,key,'   ').status).toBe('unanswered')})
})
