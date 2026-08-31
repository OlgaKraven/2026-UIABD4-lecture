export type TeacherProfile = {
  fullName: string
  position: string
  organizationUnit: string
}

export type CourseConfig = {
  id: 'uiabd3' | 'uiabd4'
  course: number
  semesters: number[]
  semesterThemes: Record<number, string>
  materialsUrl: string
  repository: string
  pagesUrl: string
  basePath: string
  primaryDbms: 'MySQL'
  comparisonDbms?: 'PostgreSQL'
  realisticCase: string
  competencies: Record<number, string[]>
}

export type TopicQuestion = {
  title: string
  focus: string
  action: string
  pitfall: string
}

export type LectureTopic = {
  id: string
  courseId: CourseConfig['id']
  semester: number
  sourceTitle: string
  displayTitle: string
  sourceIds: string[]
  examTaskIds: string[]
  examAlignment: 'прямая подготовка' | 'поддерживающая подготовка'
  examProduct: string
  examTimebox: string
  examPractice: string
  examChecklist: string[]
  objective: string
  caseBrief: string
  diagnostic: string
  adminArtifact: string
  nextStep: string
  codeLabel: string
  codeSample: string
  questions: TopicQuestion[]
}

export type SourceRecord = {
  id: string
  title: string
  type: 'plan' | 'curriculum' | 'assessment' | 'book' | 'documentation' | 'materials' | 'brand'
  purpose: string
  location: string
  version: string
  checkedAt: string
  official: boolean
  publication: string
  usedIn: string[]
}

export type TestMode = 'single' | 'multiple' | 'boolean' | 'matching' | 'order' | 'short'

export type TestTask = {
  id: string
  mode: TestMode
  prompt: string
  options?: string[]
  correctAnswer: string
  correctIndexes?: number[]
  explanation: string
  hint: string
  criteria: string
}

export type SlideKind =
  | 'title'
  | 'service'
  | 'intro'
  | 'divider'
  | 'concept'
  | 'example'
  | 'decision'
  | 'warning'
  | 'check'
  | 'practice'
  | 'test'
  | 'summary'
  | 'questions'

export type Slide = {
  number: number
  kind: SlideKind
  title: string
  kicker: string
  body?: string
  bullets?: string[]
  code?: string
  codeLabel?: string
  links?: { label: string; url: string }[]
  sourceIds: string[]
  questionNumber?: number
  test?: TestTask
}

export type TestAnswers = Record<string, string | number[]>
