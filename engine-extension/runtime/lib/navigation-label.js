export function outlineLabel(slide) {
 if (slide.kind !== 'section') return slide.title;
 const number=slide.kicker.match(/вопрос\s+(\d+)/iu)?.[1]||slide.id.match(/-q(\d+)-/i)?.[1];
 return number?`Вопрос ${Number(number)}. ${slide.title}`:slide.title;
}
