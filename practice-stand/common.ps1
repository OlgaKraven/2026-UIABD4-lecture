Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$StudySpec = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'stand.json') -Raw -Encoding UTF8 | ConvertFrom-Json
function Get-StudyRoot([string]$Requested) {
    if ($Requested) { return [IO.Path]::GetFullPath($Requested).TrimEnd('\','/') }
    return Join-Path $env:LOCALAPPDATA $StudySpec.folder
}
function Write-StudyJson([string]$Path, $Value) {
    [IO.File]::WriteAllText($Path, ($Value | ConvertTo-Json -Depth 8), [Text.UTF8Encoding]::new($false))
}
function Read-StudyState([string]$Root) {
    $marker = Join-Path $Root 'owner.json'
    $stateFile = Join-Path $Root 'state.json'
    if (!(Test-Path -LiteralPath $marker) -or !(Test-Path -LiteralPath $stateFile)) { throw 'Сначала выполните start.ps1 для этого стенда.' }
    $owner = Get-Content -LiteralPath $marker -Raw -Encoding UTF8 | ConvertFrom-Json
    if ($owner.courseId -ne $StudySpec.courseId -or $owner.root -ne $Root) { throw 'Папка принадлежит другому стенду. Данные не изменены.' }
    return Get-Content -LiteralPath $stateFile -Raw -Encoding UTF8 | ConvertFrom-Json
}
function New-StudyPassword {
    $bytes = New-Object byte[] 24
    $rng = [Security.Cryptography.RandomNumberGenerator]::Create()
    try { $rng.GetBytes($bytes) } finally { $rng.Dispose() }
    return ([BitConverter]::ToString($bytes)).Replace('-','').ToLowerInvariant()
}
function Invoke-StudyProgram([string]$Exe, [string[]]$Arguments, [string]$InputText = '', [string]$Password = '') {
    $info = New-Object Diagnostics.ProcessStartInfo
    $info.FileName = $Exe
    $info.Arguments = ($Arguments | ForEach-Object { '"' + $_.Replace('"','\"') + '"' }) -join ' '
    $info.UseShellExecute = $false; $info.CreateNoWindow = $true
    $info.RedirectStandardInput = $true; $info.RedirectStandardOutput = $true; $info.RedirectStandardError = $true
    if ($info.PSObject.Properties.Name -contains 'StandardInputEncoding') { $info.StandardInputEncoding = [Text.UTF8Encoding]::new($false) }
    $info.StandardOutputEncoding = [Text.UTF8Encoding]::new($false)
    $info.StandardErrorEncoding = [Text.UTF8Encoding]::new($false)
    if ($Password) { $info.EnvironmentVariables['MYSQL_PWD'] = $Password }
    $process = New-Object Diagnostics.Process; $process.StartInfo = $info
    try {
        [void]$process.Start()
        $outTask = $process.StandardOutput.ReadToEndAsync(); $errTask = $process.StandardError.ReadToEndAsync()
        if ($InputText) { $inputBytes=[Text.UTF8Encoding]::new($false).GetBytes($InputText + "`n");$process.StandardInput.BaseStream.Write($inputBytes,0,$inputBytes.Length);$process.StandardInput.BaseStream.Flush() }
        $process.StandardInput.Close(); $process.WaitForExit()
        return @{ code=$process.ExitCode; output=$outTask.GetAwaiter().GetResult(); error=$errTask.GetAwaiter().GetResult() }
    } finally { $process.Dispose() }
}
function Invoke-StudySql([string]$Root, $State, [string]$Sql, [switch]$Admin, [switch]$Expired) {
    $exe = Join-Path $Root ('mysql/' + $StudySpec.archiveDirectory + '/bin/mysql.exe')
    $account = if ($Admin) { 'root' } else { 'student' }
    $password = if ($Admin) { $State.rootPassword } else { $State.studentPassword }
    $arguments = @('--no-defaults','--protocol=TCP','--host=127.0.0.1',"--port=$($State.port)","--user=$account",'--default-character-set=utf8mb4','--batch','--raw','--skip-column-names')
    if ($Expired) { $arguments += '--connect-expired-password'; $password = $State.temporaryPassword }
    return Invoke-StudyProgram $exe $arguments $Sql $password
}
function Test-StudyProcess([string]$Root, $State) {
    if (!$State.processId) { return $false }
    $process = Get-CimInstance Win32_Process -Filter "ProcessId=$($State.processId)" -ErrorAction SilentlyContinue
    if (!$process) { return $false }
    $expected = Join-Path $Root ('mysql/' + $StudySpec.archiveDirectory + '/bin/mysqld.exe')
    $config = (Join-Path $Root 'mysql.ini').Replace('\','/')
    return $process.ExecutablePath -eq $expected -and $process.CommandLine.Replace('\','/').Contains($config)
}
