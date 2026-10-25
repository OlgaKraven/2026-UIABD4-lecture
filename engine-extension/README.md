# Локальный runtime лекционного сайта

Рабочий runtime в `runtime/` подключён локальной зависимостью. Основа — закреплённый `vendor/olgakraven-lecture-engine-0.1.1-okfks.10-visuals.2.tgz`. После `npm ci` скрипт `scripts/prepare-runtime.py` разворачивает архив и применяет местные изменения. Версия рабочего runtime — `0.1.1-uiabd4.1`. Результат хранится в Git; общий шаблон не меняется.

`navigation-label.js` формирует подписи тематических разделов. `matching-choice.jsx` и `matching-choice.css` задают список соответствий; `build-matching-choice.mjs` компилирует JSX в обычный JS при подготовке runtime. Состояние ответа использует существующий assessment provider; раскрытие и подсветка синхронизируются отдельно через BroadcastChannel и storage.

Пакет `vendor/olgakraven-lecture-engine-0.2.1-uiabd.1.tgz` используется для содержательной валидации; `integration.patch` сохраняет происхождение его расширения. Учебное содержание курса находится в `authoring/` и `src/learning/` этого проекта.
