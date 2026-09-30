import { d } from "./delay";

/**
 * The K mark, built from three slanted blocks: an italic stem, an arm rising to the
 * upper right and a leg dropping to the lower right, with thin gaps between them.
 * Outlines draw in first, then the blocks fill solid.
 */
export function Logo({ className, delay = 0, title }: { className?: string; delay?: number; title?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <path className="draw-fill" style={d(delay)} pathLength={1} d="M4 98L30 2H52L26 98Z" />
      <path className="draw-fill" style={d(delay + 0.2)} pathLength={1} d="M40 50L76 2H100L59 50Z" />
      <path className="draw-fill" style={d(delay + 0.4)} pathLength={1} d="M42 58H62L80 98H56Z" />
    </svg>
  );
}
