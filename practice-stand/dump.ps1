param([Parameter(Mandatory=$true)][string]$Database, [Parameter(Mandatory=$true)][string]$OutFile, [string]$Root)
. (Join-Path $PSScriptRoot 'common.ps1')
$StudyRoot=Get-StudyRoot $Root; $StudyState=Read-StudyState $StudyRoot
if (!(Test-StudyProcess $StudyRoot $StudyState)) { throw 'Учебный сервер не запущен.' }
if ($Database -notmatch '^[A-Za-z][A-Za-z0-9_]*$') { throw 'Нужно простое имя учебной базы.' }
$StudyOutput=[IO.Path]::GetFullPath($OutFile)
if (Test-Path -LiteralPath $StudyOutput) { throw 'Файл результата уже существует. Выберите новое имя; файл не перезаписывается.' }
$StudyDump=Join-Path $StudyRoot ('mysql/' + $StudySpec.archiveDirectory + '/bin/mysqldump.exe')
$StudyResult=Invoke-StudyProgram $StudyDump @('--no-defaults','--protocol=TCP','--host=127.0.0.1',"--port=$($StudyState.port)",'--user=root','--single-transaction','--no-tablespaces','--set-gtid-purged=OFF',"--result-file=$StudyOutput",$Database) '' $StudyState.rootPassword
if ($StudyResult.code -ne 0) { throw 'Создание копии не завершено. Файл результата не считается проверенной копией.' }
Write-Host 'SQL-копия создана. Восстановление и контроль выполняются в отдельной учебной базе.'
