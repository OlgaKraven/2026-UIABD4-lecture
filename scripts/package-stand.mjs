import {spawnSync} from 'node:child_process';
const result=spawnSync(process.platform==='win32'?'py':'python3',process.platform==='win32'?['-3','-B','scripts/package-stand.py']:['-B','scripts/package-stand.py'],{stdio:'inherit',windowsHide:true});
if(result.error)throw result.error;
process.exitCode=result.status??1;
