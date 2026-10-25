import {describe,it,expect} from 'vitest'
import {models,initialValues} from '../src/learning/workbenchModels'
import {variants} from '../authoring/case-scenarios.mjs'

describe('alternate inputs explicitly assigned to students',()=>{
 it('uses valid fields and choices for every stated repeat',()=>{
  for(const [index,patches]of Object.entries(variants))for(const patch of patches){const model=models[Number(index)];for(const [key,value]of Object.entries(patch)){const field=model.fields.find(f=>f.key===key);expect(field).toBeDefined();expect(typeof value).toBe(typeof field!.value);if(field!.choices)expect(field!.choices).toContain(value)}for(const action of model.actions)expect(JSON.stringify(action.run({...initialValues(model),...patch}))).not.toMatch(/NaN|Infinity|undefined/)}
 })
 it('observes the short event at 25 seconds after changing the interval to 5',()=>{
  const model=models[49],before=model.actions[1].run(initialValues(model)),after=model.actions[1].run({...initialValues(model),dt:5});expect(before.rows).toEqual([['5','0']]);expect(after.rows).toEqual([['12','1']])
 })
 it('uses nearest rank 10 for p=1 and distinguishes a new zero from missing data',()=>{
  const q=models[42];expect(q.actions[1].run({...initialValues(q),p:1}).rows).toEqual([['116','10','900','900']]);const missing=models[53];expect(missing.actions[1].run({...initialValues(missing),b:'0'}).rows).toEqual([['2','1']])
 })
 it('does not authorize rollback when schema compatibility is unconfirmed',()=>{
  const model=models[69],result=model.actions[1].run({...initialValues(model),compatible:'нет'});expect(result.rows).toEqual([['26','откат пока не подтверждён']])
 })
})
