import type { Course, Lecture, Profile, Slide } from './model';
export declare function SlideView({ course, lecture, slide, profile, base, number, interactive }: {
    course: Course;
    lecture: Lecture;
    slide: Slide;
    profile: Profile;
    base: string;
    number: number;
    interactive?: boolean;
}): import("react").JSX.Element;
