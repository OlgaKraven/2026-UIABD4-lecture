import type { Attempt } from './Assessment';
import type { Profile } from './model';
export type PublicState = {
    assessment?: Record<string, Attempt>;
    pointer?: {
        x: number;
        y: number;
    } | null;
    slideId: string;
    black: boolean;
    animations: boolean;
    replay: number;
    profile: Profile;
    epoch: number;
    sequence: number;
};
export type Message = {
    protocol: 1;
    session: string;
    lecture: string;
    course: string;
    version: string;
    type: 'HELLO' | 'STATE' | 'ACK' | 'END';
    state?: PublicState;
    epoch?: number;
    sequence?: number;
};
type Scope = {
    session: string;
    lecture: string;
    course: string;
    version: string;
    base: string;
};
export declare function validMessage(x: unknown, s: Scope): x is Message;
export declare function newer(a: PublicState, b: PublicState | null): boolean;
export declare function createBus(scope: Scope, onMessage: (m: Message) => void): {
    setPeer: (w: Window | null) => void;
    send: (part: Pick<Message, "type" | "state" | "epoch" | "sequence">) => void;
    close: () => void;
};
export {};
