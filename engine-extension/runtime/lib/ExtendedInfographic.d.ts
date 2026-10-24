import type { Visual } from './model';
export declare const SVG_LINE_HEIGHT = 1.3;
export declare function svgTextLines(text: string, width: number, size: number): string[];
export declare function svgTextHeight(text: string, width: number, size: number): number;
export declare function extendedInfographicHeight(v: Visual): number;
export declare function ExtendedInfographic({ visual: v, marker, base }: {
    visual: Visual;
    marker: string;
    base: string;
}): import("react").JSX.Element | null;
