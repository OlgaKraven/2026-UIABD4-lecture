import type { CSSProperties } from 'react';
export declare function usePanelLayout(key: string): {
    grid: import("react").RefObject<HTMLDivElement | null>;
    separator: (index: number) => import("react").JSX.Element;
    reset: () => void;
    style: CSSProperties;
};
