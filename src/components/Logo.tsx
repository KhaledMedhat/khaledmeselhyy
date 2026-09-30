import { d } from "./delay";

/**
 * The slanted-block "K" mark: three parallelogram blocks, the first notched so the
 * negative space reads as a K. Outlines draw in first, then the blocks fill solid.
 * Swap the polygons for your exact logo paths if you have them.
 */
export function Logo({ className, delay = 0, title }: { className?: string; delay?: number; title?: string }) {
  return (
    <svg className={className} viewBox="0 0 124 66" fill="none" role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <path className="draw-fill" style={d(delay)} pathLength={1} d="M1 65L23 1H47L33 41L41 65Z" />
      <path className="draw-fill" style={d(delay + 0.2)} pathLength={1} d="M45 65L67 1H89L67 65Z" />
      <path className="draw-fill" style={d(delay + 0.4)} pathLength={1} d="M79 65L101 1H123L101 65Z" />
    </svg>
  );
}
