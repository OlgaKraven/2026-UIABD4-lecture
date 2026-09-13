Расширение общего движка для этого проекта

Основа: dd0a0dc09e10916e3c07157677f7a1769396a110 репозитория 2026-lecture-shablone.
Примените integration.patch к этой версии. Установите версию package.json 0.2.1-uiabd.1 и files: ["lib"], выполните npm ci, npm run build:engine, npm pack. Исходный репозиторий шаблона не изменялся.
Дополнительный необязательный prop LectureSite: bundledTeacherNotes — относительный путь к TeacherPack. Его загружает только Presenter, проверяя курс и версию и сохраняя приоритет локальных правок. У Audience нет загрузки сценария.
