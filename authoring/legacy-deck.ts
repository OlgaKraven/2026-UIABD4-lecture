import type { CourseConfig, LectureTopic, Slide, TestTask } from '../types'

const mainLiterature = [
  {
    label:
      'Волк, В. К. Базы данных : учебник / В. К. Волк, В. Ю. Осеев, О. С. Черепанов. — Москва, Вологда : Инфра-Инженерия, 2025. — 544 с. — ISBN 978-5-9729-2594-0. — Текст : электронный // Образовательная платформа IPR СМАРТ : [сайт].',
    url: 'https://www.iprbookshop.ru/books/154413/details',
  },
  {
    label:
      'Маркин, А. В. Программирование баз данных на SQL и PL/pgSQL. В 2 частях. Ч. 1 : учебник / А. В. Маркин. — Москва : Ай Пи Ар Медиа, 2026. — 443 с. — ISBN 978-5-4497-5154-6 (ч. 1), 978-5-4497-5153-9. — Текст : электронный // Образовательная платформа IPR СМАРТ : [сайт].',
    url: 'https://www.iprbookshop.ru/books/158904/details',
  },
  {
    label:
      'Маркин, А. В. Программирование баз данных на SQL и PL/pgSQL. В 2 частях. Ч. 2 : учебник / А. В. Маркин. — Москва : Ай Пи Ар Медиа, 2026. — 497 с. — ISBN 978-5-4497-5155-3 (ч. 2), 978-5-4497-5153-9. — Текст : электронный // Образовательная платформа IPR СМАРТ : [сайт].',
    url: 'https://www.iprbookshop.ru/books/158905/details',
  },
]

const additionalLiterature = [
  {
    label:
      'Кузьменко, И. П. Базы данных и SQL : учебник / И. П. Кузьменко. — Ставрополь : АГРУС, 2024. — 128 с. — Текст : электронный // Образовательная платформа IPR СМАРТ : [сайт].',
    url: 'https://www.iprbookshop.ru/books/148263/details',
  },
  {
    label:
      'Евстифеева, Н. А. Теоретические основы баз данных и практическое применение языка SQL c примерами запросов на языке SQL/PSM для СУБД MySQL : учебник / Н. А. Евстифеева. — Москва : Издательский Дом МИСиС, 2025. — 248 с. — ISBN 978-5-907833-53-1. — Текст : электронный // Образовательная платформа IPR СМАРТ : [сайт].',
    url: 'https://www.iprbookshop.ru/books/163292/details',
  },
]

const clean = (value: string) => value.replace(/\s+/g, ' ').trim()

const makeTests = (topic: LectureTopic): TestTask[] => {
  const [q1, q2, q3, q4, q5, q6] = topic.questions
  return [
    {
      id: `${topic.id}-single`,
      mode: 'single',
      prompt: `Какое действие администратора лучше всего соответствует вопросу «${q1.title}»?`,
      options: [q1.action, q1.pitfall, 'Одновременно изменить все доступные параметры', 'Не фиксировать исходное состояние'],
      correctIndexes: [0],
      correctAnswer: q1.action,
      explanation: `Действие связано с наблюдаемым признаком: ${q1.focus}`,
      hint: 'Ищите вариант, который можно проверить и воспроизвести.',
      criteria: 'Выбран проверяемый административный шаг, а не догадка или неконтролируемое изменение.',
    },
    {
      id: `${topic.id}-multiple`,
      mode: 'multiple',
      prompt: `Какие два шага создают доказательную основу для решения по вопросу «${q2.title}»?`,
      options: ['Зафиксировать исходные условия и время проверки', q2.action, q2.pitfall, 'Удалить диагностические записи'],
      correctIndexes: [0, 1],
      correctAnswer: `Зафиксировать исходные условия; ${q2.action}`,
      explanation: 'Сначала нужен воспроизводимый контекст, затем — целевое действие и повторная проверка.',
      hint: 'Выберите шаги, после которых результат можно сравнить с исходным состоянием.',
      criteria: 'Отмечены оба правильных пункта и не отмечены действия, уничтожающие доказательства.',
    },
    {
      id: `${topic.id}-boolean`,
      mode: 'boolean',
      prompt: `Верно ли утверждение: «${q3.pitfall}» — допустимая штатная стратегия администратора?`,
      options: ['Верно', 'Неверно'],
      correctIndexes: [1],
      correctAnswer: 'Неверно',
      explanation: `Это типичная ошибка. Корректная опора: ${q3.focus}`,
      hint: 'Сопоставьте утверждение с принципом контролируемого изменения.',
      criteria: 'Ответ «Неверно» выбран и объяснён через риск или потерю проверяемости.',
    },
    {
      id: `${topic.id}-matching`,
      mode: 'matching',
      prompt: `Выберите корректную пару «признак → действие» для вопроса «${q4.title}».`,
      options: [
        `${q4.focus} → ${q4.action}`,
        `${q4.focus} → ${q4.pitfall}`,
        `${q4.pitfall} → игнорировать результат`,
        'Любой признак → немедленно переустановить сервер',
      ],
      correctIndexes: [0],
      correctAnswer: `${q4.focus} → ${q4.action}`,
      explanation: 'Корректная пара связывает наблюдение с минимальным проверяемым вмешательством.',
      hint: 'Причина и действие должны относиться к одному уровню системы.',
      criteria: 'Выбрана пара без скачка от симптома к необоснованному радикальному действию.',
    },
    {
      id: `${topic.id}-order`,
      mode: 'order',
      prompt: `Восстановите порядок работы с вопросом «${q5.title}».`,
      options: ['1. Зафиксировать симптом', '2. Собрать подтверждающие данные', `3. ${q5.action}`, '4. Повторить измерение и записать результат'],
      correctIndexes: [0, 1, 2, 3],
      correctAnswer: `1 → 2 → 3 → 4; на третьем шаге: ${q5.action}`,
      explanation: 'Порядок сохраняет исходные доказательства и отделяет вмешательство от проверки.',
      hint: 'Измерение до изменения должно предшествовать повторному измерению.',
      criteria: 'Все четыре шага расположены от фиксации симптома к контрольной проверке.',
    },
    {
      id: `${topic.id}-short`,
      mode: 'short',
      prompt: `Коротко объясните, как вопрос «${q6.title}» влияет на работу учебной информационной системы ДЭ.`,
      correctAnswer: q6.focus,
      explanation: `Ориентир для самопроверки: ${q6.action}`,
      hint: 'Назовите наблюдаемый признак, административное действие и способ проверки.',
      criteria: 'В ответе есть три элемента: признак, действие, проверяемый результат. Автоматическая проверка свободного текста не выполняется.',
    },
  ]
}

export const buildDeck = (topic: LectureTopic, course: CourseConfig): Slide[] => {
  const sourceIds = Array.from(new Set(['plan-pm07', ...topic.sourceIds]))
  const slides: Omit<Slide, 'number'>[] = [
    {
      kind: 'title',
      kicker: `МДК.07.01 · ${course.course} курс · ${topic.semester} семестр`,
      title: topic.displayTitle,
      body: course.realisticCase,
      bullets: course.competencies[topic.semester],
      sourceIds: ['plan-pm07', 'de-kim-2027', 'uiabd-rhino', 'synergy-logo'],
    },
    {
      kind: 'service',
      kicker: `КОД 09.02.07-5-2027 · ${topic.examAlignment}`,
      title: 'Связь темы с демонстрационным экзаменом',
      body: `${course.semesterThemes[topic.semester]}. Связь с заданиями: ${topic.examTaskIds.join(', ')}.`,
      bullets: [`Экзаменационный продукт: ${topic.examProduct}.`, `Ориентир времени: ${topic.examTimebox}.`, `Компетенции семестра: ${course.competencies[topic.semester].join(', ')}.`],
      sourceIds: ['plan-pm07', 'de-kim-2027', 'de-student-guide-2027'],
    },
    {
      kind: 'service',
      kicker: 'Учебная навигация',
      title: 'Основная литература',
      bullets: mainLiterature.map((item) => item.label),
      links: mainLiterature.map((item) => ({ label: 'Открыть источник', url: item.url })),
      sourceIds: ['book-volk-2025', 'book-markin-part1-2026', 'book-markin-part2-2026'],
    },
    {
      kind: 'service',
      kicker: 'Учебная навигация',
      title: 'Дополнительная литература',
      bullets: additionalLiterature.map((item) => item.label),
      links: additionalLiterature.map((item) => ({ label: 'Открыть источник', url: item.url })),
      sourceIds: ['book-kuzmenko-2024', 'book-evstifeeva-2025'],
    },
    {
      kind: 'service',
      kicker: 'Материалы к занятиям',
      title: 'Просканируй меня',
      body: 'QR-код ведёт в папку материалов соответствующего курса. Ссылка продублирована для клавиатуры, печати и случаев, когда камера недоступна.',
      links: [{ label: course.materialsUrl, url: course.materialsUrl }],
      sourceIds: [course.id === 'uiabd3' ? 'uiabd3-materials' : 'uiabd4-materials', 'synergy-logo'],
    },
    {
      kind: 'intro',
      kicker: 'Введение',
      title: 'Зачем администратору эта тема',
      body: topic.caseBrief,
      bullets: ['Сначала читаем условие и фиксируем требуемый продукт.', 'Затем выполняем минимальный проверяемый шаг.', 'В конце сохраняем результат в требуемом формате и проверяем по чек-листу ДЭ.'],
      sourceIds,
    },
    {
      kind: 'intro',
      kicker: 'Цель занятия',
      title: topic.objective,
      body: `Результат занятия выражается в административном артефакте: ${topic.adminArtifact}.`,
      sourceIds,
    },
    {
      kind: 'example',
      kicker: 'Сквозной кейс ДЭ 2027',
      title: `Задания ${topic.examTaskIds.join(', ')}: тренировка по формату КОД`,
      body: topic.examPractice,
      bullets: topic.examChecklist.map((item) => `Проверка: ${item}.`),
      sourceIds,
    },
    {
      kind: 'intro',
      kicker: 'Карта темы',
      title: 'Восемь вопросов занятия',
      bullets: topic.questions.map((question, index) => `${index + 1}. ${question.title}`),
      sourceIds,
    },
    {
      kind: 'concept',
      kicker: topic.codeLabel,
      title: 'Рабочая модель и безопасный пример',
      body: 'Команда или фрагмент приведены как учебный ориентир. Перед выполнением сверяйте версию СУБД, среду и права учётной записи.',
      code: topic.codeSample,
      codeLabel: topic.codeLabel,
      sourceIds,
    },
    {
      kind: 'intro',
      kicker: 'Результаты обучения',
      title: 'После занятия ты сможешь',
      bullets: [
        `объяснить предмет темы «${topic.displayTitle}» на уровне администратора сервера;`,
        'связать наблюдаемый признак с проверяемым действием;',
        `подготовить и проверить артефакт: ${topic.adminArtifact};`,
        `соотнести результат с продуктом ДЭ: ${topic.examProduct}.`,
      ],
      sourceIds,
    },
    {
      kind: 'check',
      kicker: 'Входная диагностика',
      title: topic.diagnostic,
      body: 'Сформулируй ответ до объяснения. В конце темы сравни первоначальный ход мысли с итоговой памяткой.',
      sourceIds,
    },
  ]

  topic.questions.forEach((question, index) => {
    const questionNumber = index + 1
    slides.push(
      {
        kind: 'divider',
        kicker: `ВОПРОС ${questionNumber}`,
        title: question.title,
        body: question.focus,
        sourceIds,
        questionNumber,
      },
      {
        kind: 'concept',
        kicker: `Вопрос ${questionNumber} · определение`,
        title: `Что означает «${question.title}»`,
        body: clean(question.focus),
        bullets: ['Граница рассмотрения — работа сервера, а не проектирование модели данных.', 'Утверждение проверяется наблюдением, командой или журналом.', 'Версия и среда выполнения фиксируются вместе с результатом.'],
        sourceIds,
        questionNumber,
      },
      {
        kind: 'concept',
        kicker: `Вопрос ${questionNumber} · принцип`,
        title: 'Правило контролируемого изменения',
        body: clean(question.action),
        bullets: ['Одна проверяемая гипотеза — одно изменение.', 'Исходное состояние сохраняется до вмешательства.', 'Критерий успеха задаётся заранее.'],
        sourceIds,
        questionNumber,
      },
      {
        kind: 'example',
        kicker: `Вопрос ${questionNumber} · пример`,
        title: 'Как это проявляется в учебном кейсе',
        body: `В серверной базе сети сервисных центров рассматриваем признак: ${clean(question.focus)}`,
        bullets: [`Условие: ${topic.caseBrief}`, `Ожидаемое действие: ${clean(question.action)}`, 'Проверка: сравнить результат с зафиксированным исходным состоянием.'],
        sourceIds,
        questionNumber,
      },
      {
        kind: 'decision',
        kicker: `Вопрос ${questionNumber} · решение`,
        title: 'Административное решение',
        body: clean(question.action),
        bullets: [`Артефакт: ${topic.adminArtifact}.`, 'Ответственный записывает время, среду, команду и фактический результат.', 'Изменение принимается только после контрольной проверки.'],
        sourceIds,
        questionNumber,
      },
      {
        kind: 'warning',
        kicker: `Вопрос ${questionNumber} · ошибка`,
        title: 'Что часто делают неправильно',
        body: clean(question.pitfall),
        bullets: ['Последствие: причина и эффект изменения смешиваются.', 'Риск: доказательства теряются, а проблема может повториться.', 'Исправление: вернуться к исходным данным и выполнить один проверяемый шаг.'],
        sourceIds,
        questionNumber,
      },
      {
        kind: 'check',
        kicker: `Вопрос ${questionNumber} · проверка`,
        title: 'Критерий понимания',
        body: `Объясни связь «признак → действие → проверка» для вопроса «${question.title}».`,
        bullets: [`Признак: ${clean(question.focus)}`, `Действие: ${clean(question.action)}`, 'Качество ответа: нет скачка от симптома к необоснованному радикальному действию.'],
        sourceIds,
        questionNumber,
      },
    )
  })

  topic.questions.forEach((question, index) => {
    slides.push({
      kind: 'practice',
      kicker: `Практический блок · шаг ${index + 1} из 8`,
      title: question.title,
      body: `Условие учебной задачи: ${topic.caseBrief}`,
      bullets: [
        `Выполни: ${clean(question.action)}`,
        `Ожидаемый результат: наблюдаемый признак «${clean(question.focus)}» можно подтвердить или опровергнуть.`,
        `Критерий ДЭ: ${topic.examChecklist[index % topic.examChecklist.length]}.`,
        'Способ проверки: повторить измерение, сохранить команду и фактический вывод в составе экзаменационного артефакта.',
        `Типичная ошибка: ${clean(question.pitfall)}`,
      ],
      code: index === 0 ? topic.codeSample : undefined,
      codeLabel: index === 0 ? topic.codeLabel : undefined,
      sourceIds,
      questionNumber: index + 1,
    })
  })

  makeTests(topic).forEach((test, index) => {
    slides.push({
      kind: 'test',
      kicker: `Подготовка к ДЭ · итоговое задание ${index + 1} из 6 · ${test.mode}`,
      title: 'Проверь решение',
      body: test.prompt,
      sourceIds,
      test,
    })
  })

  slides.push(
    {
      kind: 'summary',
      kicker: 'Итоговая памятка · КОД 09.02.07-5-2027',
      title: `Готовность к заданиям ${topic.examTaskIds.join(', ')}`,
      body: `${topic.examAlignment}. Экзаменационный продукт: ${topic.examProduct}.`,
      bullets: [...topic.examChecklist.map((item) => `□ ${item}`), `□ результат сохранён в требуемом формате; ориентир: ${topic.examTimebox}`],
      sourceIds,
    },
    {
      kind: 'summary',
      kicker: 'Результат и следующий шаг',
      title: topic.adminArtifact,
      body: `Следующий шаг: ${topic.nextStep}`,
      bullets: [`Сопоставь артефакт с продуктом ДЭ: ${topic.examProduct}.`, 'Сохрани исходные данные, команды, фактический результат и контрольную проверку.', 'Для раздаточного материала используй student PDF; для проверки — teacher PDF.'],
      sourceIds,
    },
    {
      kind: 'questions',
      kicker: 'Финал занятия',
      title: 'Вопросы от аудитории',
      body: 'Сформулируй вопрос через наблюдаемый признак, условия воспроизведения и ожидаемый результат.',
      bullets: ['Что осталось непонятно?', 'Какой пример стоит разобрать ещё раз?', 'Как проверить решение на учебном сервере?'],
      sourceIds: ['plan-pm07', 'uiabd-rhino', 'synergy-logo'],
    },
  )

  const numbered = slides.map((slide, index) => ({ ...slide, number: index + 1 }))
  if (numbered.length !== 85) {
    throw new Error(`Deck invariant failed for ${topic.id}: expected 85 slides, got ${numbered.length}`)
  }
  return numbered
}

export const countServiceSlides = (slides: Slide[]) =>
  slides.filter((slide) => [2, 3, 4, 5, 85].includes(slide.number)).length
