param([string]$Root, [int]$Port = 0, [string]$ArchivePath)
. (Join-Path $PSScriptRoot 'common.ps1')
$StudyRoot = Get-StudyRoot $Root
if ($Port -lt 0 -or $Port -gt 65535) { throw 'Порт должен быть в диапазоне 1…65535.' }
$StudyStateFile = Join-Path $StudyRoot 'state.json'
if (Test-Path -LiteralPath (Join-Path $StudyRoot 'owner.json')) {
    $StudyState = Read-StudyState $StudyRoot
    if ($Port -and $Port -ne $StudyState.port) { throw 'Для существующего стенда сохраняется его порт. Для другого экземпляра выберите новую папку -Root.' }
} else {
    if ((Test-Path -LiteralPath $StudyRoot) -and @(Get-ChildItem -LiteralPath $StudyRoot -Force).Count) { throw 'Выбранная папка не пуста и не принадлежит стенду. Ничего не изменено.' }
    [void](New-Item -ItemType Directory -Path $StudyRoot -Force)
    Write-StudyJson (Join-Path $StudyRoot 'owner.json') @{ courseId=$StudySpec.courseId; root=$StudyRoot }
    $StudyState = [pscustomobject]@{ port=$(if ($Port) { $Port } else { $StudySpec.port }); rootPassword=(New-StudyPassword); studentPassword=(New-StudyPassword); temporaryPassword=''; initialized=$false; ready=$false; processId=0 }
    Write-StudyJson $StudyStateFile $StudyState
}
if (Test-StudyProcess $StudyRoot $StudyState) {
    $StudyCheck = Invoke-StudySql $StudyRoot $StudyState 'SELECT @@datadir;' -Admin
    if ($StudyCheck.code -eq 0 -and $StudyCheck.output.Replace('\','/').TrimEnd('/',' ',"`r","`n") -eq (Join-Path $StudyRoot 'mysql-data').Replace('\','/')) {
        Write-Host "Стенд уже работает: 127.0.0.1:$($StudyState.port), база $($StudySpec.database)."; exit 0
    }
    throw 'Процесс найден, но его состояние не подтверждено. Данные сохранены.'
}
$StudyProbe = New-Object Net.Sockets.TcpClient
try { $StudyProbe.Connect('127.0.0.1',$StudyState.port); throw 'Выбранный порт занят. Используйте другую новую папку и -Port.' } catch [Net.Sockets.SocketException] { } finally { $StudyProbe.Dispose() }
$StudyServerRoot = Join-Path $StudyRoot ('mysql/' + $StudySpec.archiveDirectory)
$StudyServer = Join-Path $StudyServerRoot 'bin/mysqld.exe'
if (!(Test-Path -LiteralPath $StudyServer)) {
    if (!$ArchivePath) {
        $StudyDownload = Join-Path $StudyRoot 'download'; [void](New-Item -ItemType Directory -Path $StudyDownload -Force)
        $ArchivePath = Join-Path $StudyDownload ($StudySpec.archiveDirectory + '.zip')
        if (!(Test-Path -LiteralPath $ArchivePath)) {
            Write-Host "Загрузка официального MySQL $($StudySpec.version) для Windows x64…"
            Invoke-WebRequest -Uri $StudySpec.url -OutFile $ArchivePath -UseBasicParsing
        }
    }
    if ((Get-FileHash -LiteralPath $ArchivePath -Algorithm SHA256).Hash -ne $StudySpec.sha256) { throw 'Контрольная сумма архива не совпала. Распаковка и запуск отменены.' }
    Expand-Archive -LiteralPath $ArchivePath -DestinationPath (Join-Path $StudyRoot 'mysql') -Force
}
$StudyData = Join-Path $StudyRoot 'mysql-data'
if (!$StudyState.initialized) {
    if ((Test-Path -LiteralPath $StudyData) -and @(Get-ChildItem -LiteralPath $StudyData -Force).Count) { throw 'Каталог данных не пуст. Повторная инициализация не выполняется.' }
    $StudyInit = Invoke-StudyProgram $StudyServer @('--no-defaults','--initialize','--console',"--basedir=$StudyServerRoot","--datadir=$StudyData")
    if ($StudyInit.code -ne 0) { throw 'Инициализация не завершилась. Рабочие данные других экземпляров не изменены.' }
    $StudyPasswordMatch = [regex]::Match($StudyInit.error,'A temporary password is generated for root@localhost: (.+)')
    if (!$StudyPasswordMatch.Success) { throw 'Не удалось получить начальный пароль из диагностики инициализации.' }
    $StudyState.temporaryPassword = $StudyPasswordMatch.Groups[1].Value.Trim(); $StudyState.initialized = $true
    Write-StudyJson $StudyStateFile $StudyState
}
$StudyConfig = @"
[mysqld]
basedir="$($StudyServerRoot.Replace('\','/'))"
datadir="$($StudyData.Replace('\','/'))"
port=$($StudyState.port)
bind-address=127.0.0.1
mysqlx=0
skip-log-bin
innodb-buffer-pool-size=128M
log-error="$((Join-Path $StudyRoot 'mysql.err').Replace('\','/'))"
"@
$StudyConfigPath = Join-Path $StudyRoot 'mysql.ini'
[IO.File]::WriteAllText($StudyConfigPath,$StudyConfig,[Text.UTF8Encoding]::new($false))
$StudyProcess = Start-Process -FilePath $StudyServer -ArgumentList ('--defaults-file="' + $StudyConfigPath.Replace('\','/') + '"') -PassThru -WindowStyle Hidden -RedirectStandardOutput (Join-Path $StudyRoot 'console.out') -RedirectStandardError (Join-Path $StudyRoot 'console.err')
$StudyState.processId = $StudyProcess.Id; Write-StudyJson $StudyStateFile $StudyState
$StudyReady = $false
for ($StudyAttempt=0; $StudyAttempt -lt 100; $StudyAttempt++) {
    $StudyTcp = New-Object Net.Sockets.TcpClient
    try { $StudyTcp.Connect('127.0.0.1',$StudyState.port); $StudyReady=$true; break } catch [Net.Sockets.SocketException] { Start-Sleep -Milliseconds 200 } finally { $StudyTcp.Dispose() }
}
if (!$StudyReady) { throw 'Сервер не подтвердил TCP-запуск. Проверьте mysql.err в папке стенда; данные сохранены.' }
if (!$StudyState.ready) {
    $StudyRootSql = "ALTER USER USER() IDENTIFIED BY '$($StudyState.rootPassword)';"
    $StudyAuth = Invoke-StudySql $StudyRoot $StudyState $StudyRootSql -Admin
    if ($StudyAuth.code -ne 0 -and $StudyState.temporaryPassword) { $StudyAuth = Invoke-StudySql $StudyRoot $StudyState $StudyRootSql -Admin -Expired }
    if ($StudyAuth.code -ne 0) { throw 'Не завершена настройка административной записи. Пароли не выводятся; состояние сохранено.' }
    $StudySql = "CREATE DATABASE IF NOT EXISTS $($StudySpec.database) CHARACTER SET utf8mb4; CREATE USER IF NOT EXISTS 'student'@'localhost' IDENTIFIED BY '$($StudyState.studentPassword)'; CREATE USER IF NOT EXISTS 'student'@'127.0.0.1' IDENTIFIED BY '$($StudyState.studentPassword)'; GRANT ALL PRIVILEGES ON $($StudySpec.database).* TO 'student'@'localhost', 'student'@'127.0.0.1';"
    $StudySetup = Invoke-StudySql $StudyRoot $StudyState $StudySql -Admin
    if ($StudySetup.code -ne 0) { throw 'Не завершено создание учебной базы и пользователя. Состояние сохранено.' }
    $StudyState.ready=$true; $StudyState.temporaryPassword=''; Write-StudyJson $StudyStateFile $StudyState
}
$StudySmoke = Invoke-StudySql $StudyRoot $StudyState "USE $($StudySpec.database); SELECT VERSION(), CURRENT_USER(), DATABASE();"
if ($StudySmoke.code -ne 0) { throw 'Контрольный вход student не прошёл. Проверьте журнал стенда.' }
Write-Host "Готово: MySQL $($StudySpec.version), 127.0.0.1:$($StudyState.port), пользователь student, база $($StudySpec.database)."
Write-Host 'Откройте клиент командой .\client.ps1. Секреты созданы локально и в консоль не выводятся.'
