import type { ReactNode } from 'react';
import type { Course, Lecture, Task } from './model';
import type { Answer, Result } from './scoring';
export type Attempt = {
    draft: Answer;
    submitted?: Answer;
    result?: Result;
    seed: number;
    attempts: number;
    reveal?: boolean;
};
export declare function AssessmentProvider({ course, base, children, snapshot, readonly }: {
    course: Course;
    base: string;
    children: ReactNode;
    snapshot?: Record<string, Attempt>;
    readonly?: boolean;
}): import("react").JSX.Element;
export declare function TaskView({ task: t }: {
    task: Task;
}): import("react").JSX.Element;
export declare function AssessmentResults({ lecture, onGo }: {
    lecture: Lecture;
    onGo: (index: number) => void;
}): import("react").JSX.Element;
export declare function AssessmentSync({ task, onChange }: {
    task?: Task;
    onChange: (value: Record<string, Attempt>) => void;
}): null;
