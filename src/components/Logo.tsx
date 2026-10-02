import { d } from "./delay";

/**
 * The K mark: two mirrored curved halves. Each is a bowl that sweeps from the stem out to a
 * point, with a rounded notch where the stem meets the arm (top) or the leg (bottom).
 * Outlines draw in first, then the halves fill solid.
 */
export const K_VIEWBOX = "0 0 160 129";
export const K_PATHS = [
  "M1 1H55V45Q55 51 61 47L104 1H159A102 57 0 0 1 57 58A56 57 0 0 1 1 1Z",
  "M1 128H55V84Q55 78 61 82L101 128H159A102 57 0 0 0 57 71A56 57 0 0 0 1 128Z",
];

export function Logo({ className, delay = 0, title }: { className?: string; delay?: number; title?: string }) {
  return (
    <svg className={className} viewBox={K_VIEWBOX} fill="none" role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      {K_PATHS.map((p, i) => (
        <path key={p} className="draw-fill" style={d(delay + i * 0.25)} pathLength={1} d={p} />
      ))}
    </svg>
  );
}
