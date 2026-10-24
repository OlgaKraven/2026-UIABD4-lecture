import type { ReactNode } from 'react';
import type { Slide } from './model';
export type VisualRendererProps = {
    slide: Slide;
    base: string;
    interactive: boolean;
};
type VisualRenderer = (props: VisualRendererProps) => ReactNode | undefined;
export declare const VisualRendererContext: import("react").Context<VisualRenderer | undefined>;
/** Return undefined to retain the engine's visual/steps; null explicitly leaves the slot empty. */
export declare function VisualRendererProvider({ render, children }: {
    render: VisualRenderer;
    children: ReactNode;
}): import("react").JSX.Element;
export {};
