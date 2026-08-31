# МДК.07.01 — 4-й курс

Адаптивный сайт-презентация по дисциплине «Управление и автоматизация баз данных». Курс охватывает 10 утверждённых лекционных тем (7 и 8 семестр), каждая тема строится генератором `buildDeck(topic, course)` и содержит ровно 85 экранов: 80 базовых и 5 служебных.

## Возможности

- каталог, поиск и фильтрация по семестру;
- прямые ссылки вида `?topic=[TOPIC_ID]&slide=[1..85]`;
- клавиатурная навигация, полноэкранный режим, светлая и тёмная темы;
- сохранение профиля преподавателя, прогресса и ответов в `localStorage`;
- шесть тематических заданий, отдельное окно результата и ручная самопроверка короткого ответа;
- статический маршрут `/print?topic=[TOPIC_ID]&variant=student|teacher`;
- PDF на 85 страниц для студента и преподавателя;
- локальный Raleway, фирменный логотип, общий DBA-носорог и проверенный QR-код.

## Команды

```bash
npm install
npm run lint
npm run typecheck
npm run test
npm run spellcheck
npm run build
npm run test:e2e
npm run export:pdf
npm run export:pdf -- --topic [TOPIC_ID] --variant student
npm run export:pdf -- --topic [TOPIC_ID] --variant teacher
npm run check:pdf
```

Для CLI-экспорта преподавательских данных можно скопировать `config/teacher-profile.example.json` в `config/teacher-profile.json` и заполнить три поля. Этот файл не предназначен для публикации.

## Адреса

- Репозиторий: https://github.com/OlgaKraven/2026-UIABD4-lecture
- GitHub Pages: https://olgakraven.github.io/2026-UIABD4-lecture/
- Материалы: https://disk.yandex.ru/d/qza1LqHvKUFiNg
- Локальный проект: `C:\Users\gvadoskr\Desktop\2026-2027\2026-UIABD4-lecture`

Источники и ограничения публикации перечислены в [SOURCES.md](SOURCES.md).

