import type { Project } from "@/content";
import { d } from "./delay";

const line = { stroke: "var(--white)", strokeWidth: 1, vectorEffect: "non-scaling-stroke" } as const;

/** Line-drawn stand-ins for screenshots, in white on black. They draw in when scrolled into view. */
export function Sketch({ kind }: { kind: Project["sketch"] | "grid" | "detail" }) {
  if (kind === "phone")
    return (
      <svg viewBox="0 0 300 560" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path className="draw" style={d(0.2)} pathLength={1} d="M24 40H180M24 64H150M24 88H200" {...line} strokeOpacity={0.8} />
        <path className="draw" style={d(0.5)} pathLength={1} d="M24 130H276V330H24Z" {...line} strokeOpacity={0.35} />
        <path className="draw" style={d(0.8)} pathLength={1} d="M24 330L110 230L170 290L220 250L276 300" {...line} strokeOpacity={0.6} />
        <path className="draw" style={d(1.1)} pathLength={1} d="M90 400H210V430H90Z" {...line} strokeOpacity={0.7} />
        <path className="draw" style={d(1.3)} pathLength={1} d="M24 480H86M110 480H172M196 480H258M24 506H70M110 506H156M196 506H242" {...line} strokeOpacity={0.35} />
      </svg>
    );
  if (kind === "shop")
    return (
      <svg viewBox="0 0 640 360" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path className="draw" style={d(0.2)} pathLength={1} d="M0 44H640" {...line} strokeOpacity={0.2} />
        <circle className="draw" style={d(0.5)} pathLength={1} cx="320" cy="140" r="64" {...line} strokeOpacity={0.8} />
        <circle className="draw" style={d(0.7)} pathLength={1} cx="320" cy="140" r="34" {...line} strokeOpacity={0.4} />
        <path className="draw" style={d(1)} pathLength={1} d="M150 250H250V320H150ZM270 250H370V320H270ZM390 250H490V320H390Z" {...line} strokeOpacity={0.4} />
      </svg>
    );
  if (kind === "portfolio")
    return (
      <svg viewBox="0 0 640 360" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path className="draw" style={d(0.2)} pathLength={1} d="M200 50H440" {...line} strokeOpacity={0.7} />
        <path className="draw" style={d(0.5)} pathLength={1} d="M250 90H390V270H250Z" {...line} strokeOpacity={0.6} />
        <path className="draw" style={d(0.8)} pathLength={1} d="M270 140C290 120 350 120 370 140M280 200C300 225 340 225 360 200" {...line} strokeOpacity={0.5} />
        <circle className="draw" style={d(1)} pathLength={1} cx="150" cy="230" r="36" {...line} strokeOpacity={0.6} />
        <path className="draw" style={d(1.2)} pathLength={1} d="M220 320H420" {...line} strokeOpacity={0.3} />
      </svg>
    );
  if (kind === "grid")
    return (
      <svg viewBox="0 0 640 400" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path className="draw" style={d(0.2)} pathLength={1} d="M40 60H300M40 90H240M40 120H270" {...line} strokeOpacity={0.7} />
        <path className="draw" style={d(0.5)} pathLength={1} d="M40 170H200V340H40ZM240 170H400V340H240ZM440 170H600V340H440Z" {...line} strokeOpacity={0.35} />
      </svg>
    );
  return (
    <svg viewBox="0 0 640 400" preserveAspectRatio="none" fill="none" aria-hidden="true">
      <path className="draw" style={d(0.2)} pathLength={1} d="M40 40H360V360H40Z" {...line} strokeOpacity={0.35} />
      <path className="draw" style={d(0.5)} pathLength={1} d="M400 60H600M400 90H560M400 150H600V210H400Z" {...line} strokeOpacity={0.6} />
      <path className="draw" style={d(0.8)} pathLength={1} d="M400 260H600M400 290H540M400 320H580" {...line} strokeOpacity={0.3} />
    </svg>
  );
}
