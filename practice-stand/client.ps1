param([string]$Root, [switch]$Admin, [string]$File, [string]$Execute, [string]$User, [string]$Database)
. (Join-Path $PSScriptRoot 'common.ps1')
$StudyRoot = Get-StudyRoot $Root; $StudyState = Read-StudyState $StudyRoot
if (!$Database) { $Database=$StudySpec.database }
if ($Database -notmatch '^[A-Za-z][A-Za-z0-9_]*$') { throw 'Нужно простое имя базы.' }
if (!(Test-StudyProcess $StudyRoot $StudyState)) { throw 'Учебный сервер не запущен. Выполните start.ps1.' }
if ($File -or $Execute) {
    if ($User) { throw 'Параметр -User предназначен для интерактивного входа новой записи с приглашением пароля.' }
    $StudySql = if ($File) { Get-Content -LiteralPath $File -Raw -Encoding UTF8 } else { $Execute }
    $StudySql = "USE $Database;`n" + $StudySql
    $StudyResult = Invoke-StudySql $StudyRoot $StudyState $StudySql -Admin:$Admin
    [Console]::Write($StudyResult.output)
    if ($StudyResult.code -ne 0) { [Console]::Error.Write($StudyResult.error); exit $StudyResult.code }
    exit 0
}
$StudyClient = Join-Path $StudyRoot ('mysql/' + $StudySpec.archiveDirectory + '/bin/mysql.exe')
$StudyAccount = if ($Admin) { 'root' } elseif ($User) { $User } else { 'student' }
$StudyArguments = @('--no-defaults','--protocol=TCP','--host=127.0.0.1',"--port=$($StudyState.port)","--user=$StudyAccount",'--default-character-set=utf8mb4',$Database)
$StudyPreviousPassword = $env:MYSQL_PWD
try {
    if ($User) { Remove-Item Env:MYSQL_PWD -ErrorAction SilentlyContinue; $StudyArguments += '-p' }
    else { $env:MYSQL_PWD = if ($Admin) { $StudyState.rootPassword } else { $StudyState.studentPassword } }
    & $StudyClient @StudyArguments
    exit $LASTEXITCODE
} finally {
    if ($null -eq $StudyPreviousPassword) { Remove-Item Env:MYSQL_PWD -ErrorAction SilentlyContinue } else { $env:MYSQL_PWD=$StudyPreviousPassword }
}
