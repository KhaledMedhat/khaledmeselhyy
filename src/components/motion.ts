export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const easeInOut = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

/** Resolve a CSS custom property (e.g. a next/font family) for use on a canvas. */
export const cssVar = (name: string, fallback: string) =>
  (typeof window !== "undefined" && getComputedStyle(document.documentElement).getPropertyValue(name).trim()) || fallback;
