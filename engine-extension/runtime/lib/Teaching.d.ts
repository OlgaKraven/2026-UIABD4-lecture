import type { Course, Lecture, Note, Profile } from './model';
type Props = {
    teacherNotes?: Record<string, Note>;
    resolveTeacherNotes?: () => Record<string, Note>;
    course: Course;
    lecture: Lecture;
    base: string;
    profile: Profile;
    mode: 'presenter' | 'audience';
    session: string;
    initialSlide: string;
    onExit: (slideId: string) => void;
};
export default function Teaching(props: Props): import("react").JSX.Element;
export {};
