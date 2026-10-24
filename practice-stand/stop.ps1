param([string]$Root)
. (Join-Path $PSScriptRoot 'common.ps1')
$StudyRoot=Get-StudyRoot $Root; $StudyState=Read-StudyState $StudyRoot
if (!(Test-StudyProcess $StudyRoot $StudyState)) { Write-Host 'Процесс этого стенда не работает.'; exit 0 }
$StudyCheck=Invoke-StudySql $StudyRoot $StudyState 'SELECT @@datadir;' -Admin
if ($StudyCheck.code -ne 0 -or $StudyCheck.output.Replace('\','/').TrimEnd('/',' ',"`r","`n") -ne (Join-Path $StudyRoot 'mysql-data').Replace('\','/')) { throw 'Целевой экземпляр не подтверждён. Остановка отменена.' }
$StudyAdmin=Join-Path $StudyRoot ('mysql/' + $StudySpec.archiveDirectory + '/bin/mysqladmin.exe')
$StudyStop=Invoke-StudyProgram $StudyAdmin @('--no-defaults','--protocol=TCP','--host=127.0.0.1',"--port=$($StudyState.port)",'--user=root','shutdown') '' $StudyState.rootPassword
if ($StudyStop.code -ne 0) { throw 'Штатная остановка не подтверждена.' }
for ($StudyWait=0; $StudyWait -lt 100; $StudyWait++) { if (!(Test-StudyProcess $StudyRoot $StudyState)) { $StudyState.processId=0;Write-StudyJson (Join-Path $StudyRoot 'state.json') $StudyState;Write-Host 'Стенд остановлен. Данные сохранены.';exit 0 };Start-Sleep -Milliseconds 200 }
throw 'Ожидание остановки ещё не завершилось. Данные сохранены; принудительная остановка не выполняется.'
