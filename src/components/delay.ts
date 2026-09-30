import type { CSSProperties } from "react";

/** Stagger helper: style={d(0.4)} delays a .draw or .rise by 0.4s. */
export const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;
