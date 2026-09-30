import type { Project } from "@/content";
import { d } from "./delay";

const faint = { stroke: "var(--text)", strokeWidth: 1 } as const;

/** Line-drawn stand-ins for project screenshots. They draw in when the card scrolls into view. */
export function Sketch({ kind }: { kind: Project["sketch"] }) {
  if (kind === "chart")
    return (
      <svg viewBox="0 0 800 480" preserveAspectRatio="none" fill="none" aria-hidden="true" style={{ color: "var(--accent)" }}>
        <path className="draw" style={d(0.2)} pathLength={1} d="M48 64H360M48 100H280" {...faint} strokeOpacity={0.5} />
        <path className="draw" style={d(0.5)} pathLength={1} d="M48 150H752V420H48Z" {...faint} strokeOpacity={0.18} />
        <path className="draw" style={d(0.8)} pathLength={1} d="M72 390L180 330L260 350L380 250L470 280L580 190L728 170" stroke="currentColor" strokeWidth="1.5" />
        <path className="draw" style={d(1.1)} pathLength={1} d="M72 400L180 370L260 380L380 320L470 340L580 290L728 280" {...faint} strokeOpacity={0.3} />
        <path className="draw" style={d(1.4)} pathLength={1} d="M560 60H752V110H560Z" stroke="currentColor" strokeOpacity={0.6} strokeWidth="1" />
      </svg>
    );
  if (kind === "orbit")
    return (
      <svg viewBox="0 0 600 380" preserveAspectRatio="none" fill="none" aria-hidden="true" style={{ color: "var(--accent)" }}>
        <circle className="draw" style={d(0.5)} pathLength={1} cx="300" cy="190" r="120" stroke="currentColor" strokeWidth="1.2" />
        <ellipse className="draw" style={d(0.8)} pathLength={1} cx="300" cy="190" rx="120" ry="40" {...faint} strokeOpacity={0.3} />
        <ellipse className="draw" style={d(1.1)} pathLength={1} cx="300" cy="190" rx="40" ry="120" {...faint} strokeOpacity={0.3} />
        <path className="draw" style={d(1.4)} pathLength={1} d="M40 340H560" {...faint} strokeOpacity={0.15} />
      </svg>
    );
  return (
    <svg viewBox="0 0 600 380" preserveAspectRatio="none" fill="none" aria-hidden="true" style={{ color: "var(--accent)" }}>
      <path className="draw" style={d(0.5)} pathLength={1} d="M60 60H260V320H60Z" {...faint} strokeOpacity={0.25} />
      <path className="draw" style={d(0.8)} pathLength={1} d="M300 60H540V170H300Z" stroke="currentColor" strokeWidth="1.2" />
      <path className="draw" style={d(1.1)} pathLength={1} d="M300 210H540V320H300Z" {...faint} strokeOpacity={0.25} />
      <path className="draw" style={d(1.4)} pathLength={1} d="M84 100H220M84 130H190M84 160H230" {...faint} strokeOpacity={0.4} />
    </svg>
  );
}
