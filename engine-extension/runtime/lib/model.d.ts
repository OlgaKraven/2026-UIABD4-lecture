export declare const TEMPLATE_VERSION = "0.1.0";
export type Profile = {
    fullName: string;
    position: string;
    department: string;
};
export type Option = {
    id: string;
    text: string;
};
export type Visual = {
    type: 'process' | 'timeline';
    items: {
        title: string;
        text: string;
    }[];
    caption: string;
} | {
    type: 'tree';
    root: string;
    branches: {
        title: string;
        items: string[];
    }[];
    caption: string;
} | {
    type: 'network';
    nodes: {
        id: string;
        title: string;
        text: string;
    }[];
    edges: {
        from: string;
        to: string;
        label: string;
    }[];
    caption: string;
} | {
    type: 'bars';
    items: {
        label: string;
        value: number;
    }[];
    max: number;
    unit: string;
    threshold?: number;
    caption: string;
} | {
    type: 'decision';
    question: string;
    yes: string;
    no: string;
    start: string;
    caption: string;
} | {
    type: 'cycle';
    items: {
        title: string;
        text: string;
    }[];
    caption: string;
} | {
    type: 'comparison' | 'matrix';
    columns: string[];
    rows: string[][];
    caption: string;
} | {
    type: 'beforeAfter';
    before: {
        title: string;
        fields: {
            label: string;
            value: string;
        }[];
    };
    after: {
        title: string;
        fields: {
            label: string;
            value: string;
        }[];
    };
    changes: string[];
    caption: string;
} | {
    type: 'conceptMap';
    center: string;
    items: {
        title: string;
        example: string;
        relation: string;
    }[];
    caption: string;
} | {
    type: 'states';
    states: string[];
    cancelFrom: number[];
    caption: string;
} | {
    type: 'cause';
    cause: string;
    effect: string;
    solution: string;
    caption: string;
} | {
    type: 'callouts';
    image: string;
    alt: string;
    items: {
        x: number;
        y: number;
        title: string;
        text: string;
    }[];
    caption: string;
} | {
    type: 'codeParts';
    parts: {
        code: string;
        label: string;
        explanation: string;
    }[];
    caption: string;
};
export type Task = {
    id: string;
    type: 'single' | 'multiple' | 'short' | 'matching';
    prompt: string;
    choose?: number;
    options?: Option[];
    items?: Option[];
};
export type Reading = {
    citation: string;
    url?: string;
};
export type Slide = {
    id: string;
    kind: 'title' | 'theory' | 'notebook' | 'process' | 'comparison' | 'example' | 'warning' | 'test' | 'summary' | 'literature' | 'materials' | 'section' | 'questions' | 'agenda';
    readingGroup?: 'primary' | 'additional';
    references?: Reading[];
    title: string;
    kicker: string;
    body?: string;
    notebook?: string;
    bullets?: string[];
    visual?: Visual;
    steps?: {
        title: string;
        text: string;
    }[];
    columns?: string[];
    rows?: string[][];
    task?: Task;
    source?: string;
    supplement?: {
        label: string;
        href: string;
    };
};
export type Lecture = {
    id: string;
    title: string;
    sourceTitle: string;
    semester: number;
    question: string;
    slides: Slide[];
};
export type Course = {
    slideAliases?: Record<string,string>;
    schemaVersion: 1;
    contentVersion: string;
    id: string;
    code: string;
    discipline: string;
    year: string;
    heroTitle: string;
    heroAccent: string;
    slogan: string;
    mascot: string;
    mascotAlt: string;
    logo: string;
    ornament: string;
    font: string;
    materialsUrl: string;
    topicArrow?: string;
    literature?: {
        primary: Reading[];
        additional: Reading[];
    };
    assessment?: {
        mode: 'autonomous';
        url: string;
    };
    demo: boolean;
    semesters: number[];
    lectures: Lecture[];
};
export type Note = {
    script: string;
    preparation: string;
    notebook: string;
    questions: string;
    answer: string;
    estimatedSeconds: number;
};
export type TeacherPack = {
    schemaVersion: 1;
    courseId: string;
    contentVersion: string;
    notes: Record<string, Note>;
};
export declare const emptyNote: () => Note;
export declare function safeUrl(value: string): string;
export declare function assetUrl(path: string, base: string): string;
export declare function supplementUrl(value: string, base: string): string;
export declare function validateCourse(value: unknown): asserts value is Course;
