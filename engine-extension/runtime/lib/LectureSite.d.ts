import type { ReactNode } from 'react';
import type { Course, Lecture, Profile, Note } from './model';
export type CatalogProps = {
    course: Course;
    base: string;
    profile: Profile;
    materials: string;
    theme: 'light' | 'dark';
    onThemeChange: (theme: 'light' | 'dark') => void;
    storagePrefix: string;
    invalidLecture: boolean;
    onOpenLecture: (lecture: Lecture) => void;
    onPrint: (scope: string) => void;
    onProfileChange: (profile: Profile) => void;
    onMaterialsChange: (url: string) => void;
};
export declare function LectureSite({ course, base, teacherNotes, resolveTeacherNotes, renderCatalog }: {
    course: Course;
    base?: string;
    teacherNotes?: Record<string, Note>;
    resolveTeacherNotes?: () => Record<string, Note>;
    renderCatalog?: (props: CatalogProps) => ReactNode;
}): import("react").JSX.Element;
