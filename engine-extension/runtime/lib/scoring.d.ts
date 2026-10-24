import type { Task } from './model';
export type Answer = string | string[] | Record<string, string>;
export type Key = {
    type: Task['type'];
    correct?: string[];
    accepted?: string[];
    numeric?: {
        value: number;
        tolerance: number;
    };
    pairs?: Record<string, string>;
    explanation: string;
    optionExplanations?: Record<string, string>;
};
export type Result = {
    status: 'correct' | 'incorrect' | 'unanswered';
    score: number;
    explanation: string;
    solution: string;
};
export declare const normalize: (s: string) => string;
export declare function evaluate(task: Task, key: Key, answer: Answer): Result;
export declare function shuffle<T>(list: T[], seed: number): T[];
