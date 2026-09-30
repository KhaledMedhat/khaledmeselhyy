import type { Project } from "@/content";
import { d } from "./delay";

const s = { stroke: "currentColor", strokeWidth: 1.2, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const faint = { ...s, strokeOpacity: 0.35 } as const;
const gold = { ...s, stroke: "var(--accent)" } as const;

/** Line illustrations of each project. They draw in on scroll and redraw on hover. */
export function LineArt({ kind }: { kind: Project["art"] }) {
  if (kind === "gallery")
    return (
      <svg viewBox="0 0 400 250" fill="none" aria-hidden="true">
        {/* phone */}
        <path className="draw" style={d(0)} pathLength={1} d="M150 12H250Q262 12 262 24V226Q262 238 250 238H150Q138 238 138 226V24Q138 12 150 12Z" {...s} />
        <path className="draw fast" style={d(0.4)} pathLength={1} d="M186 22H214" {...faint} />
        {/* post grid */}
        <path className="draw" style={d(0.5)} pathLength={1} d="M148 50H252V150H148Z" {...faint} />
        <path className="draw" style={d(0.7)} pathLength={1} d="M148 130L180 98L205 120L222 104L252 132" {...s} />
        <circle className="draw" style={d(0.8)} pathLength={1} cx="226" cy="74" r="9" {...faint} />
        {/* heart + comment */}
        <path className="draw" style={d(1)} pathLength={1} d="M160 172C160 166 168 164 171 170C174 164 182 166 182 172C182 180 171 186 171 186C171 186 160 180 160 172Z" {...gold} />
        <path className="draw" style={d(1.1)} pathLength={1} d="M196 166H222V182H204L198 188V182H196Z" {...s} />
        <path className="draw" style={d(1.2)} pathLength={1} d="M150 204H240M150 216H214" {...faint} />
        {/* posts floating out */}
        <path className="draw" style={d(1.3)} pathLength={1} d="M40 60H108V128H40Z" {...faint} />
        <path className="draw" style={d(1.45)} pathLength={1} d="M292 110H360V178H292Z" {...faint} />
        <path className="draw" style={d(1.6)} pathLength={1} d="M108 94H138M262 144H292" {...gold} strokeDasharray="1" />
      </svg>
    );
  if (kind === "audio")
    return (
      <svg viewBox="0 0 400 250" fill="none" aria-hidden="true">
        {/* headband */}
        <path className="draw" style={d(0)} pathLength={1} d="M120 150C120 60 160 30 200 30C240 30 280 60 280 150" {...s} />
        <path className="draw" style={d(0.2)} pathLength={1} d="M132 150C132 72 166 44 200 44C234 44 268 72 268 150" {...faint} />
        {/* cups */}
        <path className="draw" style={d(0.5)} pathLength={1} d="M104 140H140Q148 140 148 148V206Q148 214 140 214H104Q96 214 96 206V148Q96 140 104 140Z" {...s} />
        <path className="draw" style={d(0.6)} pathLength={1} d="M260 140H296Q304 140 304 148V206Q304 214 296 214H260Q252 214 252 206V148Q252 140 260 140Z" {...s} />
        <path className="draw" style={d(0.8)} pathLength={1} d="M110 158V196M290 158V196" {...faint} />
        {/* sound */}
        <path className="draw" style={d(1)} pathLength={1} d="M70 160C60 170 60 186 70 196M52 148C34 166 34 190 52 208" {...gold} />
        <path className="draw" style={d(1.15)} pathLength={1} d="M330 160C340 170 340 186 330 196M348 148C366 166 366 190 348 208" {...gold} />
        <path className="draw slow" style={d(1.2)} pathLength={1} d="M20 236H380" {...faint} />
      </svg>
    );
  return (
    <svg viewBox="0 0 400 250" fill="none" aria-hidden="true">
      {/* browser */}
      <path className="draw" style={d(0)} pathLength={1} d="M40 20H360V230H40Z" {...s} />
      <path className="draw fast" style={d(0.3)} pathLength={1} d="M40 44H360" {...faint} />
      <circle className="draw fast" style={d(0.4)} pathLength={1} cx="54" cy="32" r="3" {...faint} />
      <circle className="draw fast" style={d(0.45)} pathLength={1} cx="66" cy="32" r="3" {...faint} />
      {/* portrait */}
      <circle className="draw" style={d(0.6)} pathLength={1} cx="200" cy="120" r="46" {...s} />
      <path className="draw" style={d(0.8)} pathLength={1} d="M184 110H192M208 110H216M188 136C196 142 204 142 212 136" {...faint} />
      <path className="draw" style={d(0.9)} pathLength={1} d="M176 88C186 76 214 76 224 88" {...faint} />
      <path className="draw" style={d(1)} pathLength={1} d="M120 190H280" {...gold} />
      <path className="draw" style={d(1.1)} pathLength={1} d="M150 206H250" {...faint} />
      <circle className="draw" style={d(1.2)} pathLength={1} cx="90" cy="120" r="22" {...faint} />
      <path className="draw" style={d(1.3)} pathLength={1} d="M300 100H330M300 112H322M300 124H330" {...faint} />
      {/* cursor */}
      <path className="draw fast" style={d(1.5)} pathLength={1} d="M262 150L262 172L268 166L274 178L278 176L272 164L280 164Z" {...s} />
    </svg>
  );
}
