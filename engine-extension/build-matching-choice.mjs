import fs from 'node:fs';
import ts from 'typescript';
const source=fs.readFileSync(new URL('./matching-choice.jsx',import.meta.url),'utf8');
const result=ts.transpileModule(source,{fileName:'matching-choice.jsx',reportDiagnostics:true,compilerOptions:{jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2023,module:ts.ModuleKind.ESNext}});
const errors=result.diagnostics.filter(d=>d.category===ts.DiagnosticCategory.Error);
if(errors.length)throw Error(errors.map(d=>ts.flattenDiagnosticMessageText(d.messageText,'\n')).join('\n'));
fs.writeFileSync(new URL('./runtime/lib/matching-choice.js',import.meta.url),result.outputText);
