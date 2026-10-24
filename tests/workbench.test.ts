import {describe,it,expect} from 'vitest'
import {models,initialValues,alertTrace} from '../src/learning/workbenchModels'
const output=(index:number,action:number,patch:Record<string,number|string>={})=>models[index].actions[action].run({...initialValues(models[index]),...patch}).rows
describe('operations on case data',()=>{
 it('has one executable model per case and valid baseline outputs',()=>{
  expect(models).toHaveLength(80)
  expect(models[32].fields[0].key).toBe('users')
  expect(models[48].fields[0].key).toBe('connections')
  expect(models[60].kind).toBe('alert')
  for(const model of models){expect(new Set(model.fields.map(f=>f.label)).size).toBe(model.fields.length);for(const a of model.actions){const b=a.run(initialValues(model));expect(b.kind).toMatch(/table|timeline/);expect(JSON.stringify(b)).not.toMatch(/undefined|NaN|Infinity/)}}
 })
 it('filters and sums the selected status instead of revealing a constant',()=>{
  expect(output(0,0,{status:'paid'})).toEqual([['12','200']])
  expect(output(0,1,{status:'new',a:130})).toEqual([['2','210']])
 })
 it('rebuilds JOIN pairs when the link or join operation changes',()=>{
  expect(output(2,1)).toHaveLength(3)
  expect(output(2,1,{join:'LEFT'})).toHaveLength(4)
  expect(output(2,1,{link:'22'})).toHaveLength(4)
  expect(output(2,1,{join:'CROSS'})).toHaveLength(12)
 })
 it('keeps NULL and zero distinct in AVG',()=>{
  expect(output(4,1)).toEqual([['5','3','30','10']])
  expect(output(4,1,{nulls:'заменить нулём'})).toEqual([['5','5','30','6']])
 })
 it('applies the selected transaction boundary',()=>{
  expect(output(17,3)).toEqual([['ROLLBACK','0']])
  expect(output(17,3,{finish:'COMMIT',outer:5})).toEqual([['COMMIT','6']])
 })
 it('changes the preference when criterion weights change',()=>{
  expect(output(39,1)?.[0]).toEqual(['3,2','4,2','B'])
  expect(output(39,1,{w:0.8})?.[0]).toEqual(['4,4','3,4','A'])
 })
 it('resets pending at normalisation and calculates the next firing',()=>{
  const values=initialValues(models[60])
  expect(alertTrace(values,120).at(-1)?.state).toBe('normal')
  expect(alertTrace(values,180).at(-1)).toMatchObject({state:'pending',elapsed:0})
  expect(alertTrace(values,330).at(-1)?.state).toBe('pending')
  expect(alertTrace(values,360).at(-1)?.state).toBe('firing')
  const events=[{time:330,value:0.5},{time:360,value:1.2}]
  expect(alertTrace(values,360,events).at(-1)).toMatchObject({state:'pending',elapsed:0})
  expect(alertTrace(values,540,events).at(-1)?.state).toBe('firing')
  expect(alertTrace(values,360,[{time:360,value:0.5},{time:360,value:1.2}]).at(-1)).toMatchObject({state:'pending',elapsed:0})
  expect(alertTrace({...values,for:60},60).at(-1)?.state).toBe('firing')
 })
})
