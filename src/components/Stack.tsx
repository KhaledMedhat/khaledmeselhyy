"use client";

import { useState, type CSSProperties } from "react";
import { skills } from "@/content";

// Diagram geometry in a 1200 × 640 box: four layers, four columns.
const W = 1200;
const H = 640;
const COLS = [330, 560, 790, 1020];
const ROWS = [80, 240, 400, 560];
const CW = 190;
const CH = 56;

// Where each skill sits: [column, layer].
const place: Record<string, [number, number]> = {
  JavaScript: [0, 0], TypeScript: [1, 0], HTML: [2, 0], CSS: [3, 0],
  React: [0, 1], "Next.js": [1, 1], "Tailwind CSS": [3, 1],
  "Node.js": [1, 2], NestJS: [2, 2],
  MongoDB: [1, 3], PostgreSQL: [2, 3],
};

// Straight, right-angled connections between skills.
const links: { a: string; b: string; pts: [number, number][] }[] = [
  { a: "JavaScript", b: "React", pts: [[330, 108], [330, 212]] },
  { a: "TypeScript", b: "Next.js", pts: [[560, 108], [560, 212]] },
  { a: "HTML", b: "Next.js", pts: [[790, 108], [790, 160], [620, 160], [620, 212]] },
  { a: "CSS", b: "Tailwind CSS", pts: [[1020, 108], [1020, 212]] },
  { a: "React", b: "Next.js", pts: [[425, 240], [465, 240]] },
  { a: "React", b: "Node.js", pts: [[330, 268], [330, 400], [465, 400]] },
  { a: "Next.js", b: "Node.js", pts: [[560, 268], [560, 372]] },
  { a: "Node.js", b: "NestJS", pts: [[655, 400], [695, 400]] },
  { a: "Node.js", b: "MongoDB", pts: [[560, 428], [560, 532]] },
  { a: "NestJS", b: "PostgreSQL", pts: [[790, 428], [790, 532]] },
];

const pathOf = (pts: [number, number][]) => pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join("");
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/**
 * The skills as a stack diagram: languages feed the frontend, the frontend talks to the
 * backend, the backend to the data layer. Connectors draw with scroll, then carry a steady
 * flow of dashes. Hover a skill to trace its connections.
 */
export function Stack() {
  const [active, setActive] = useState<string | null>(null);
  const linked = (name: string) => links.some((l) => (l.a === active && l.b === name) || (l.b === active && l.a === name));

  return (
    <div className="stack" onPointerLeave={() => setActive(null)}>
      <svg className="stack-lines" viewBox={`0 0 ${W} ${H}`} fill="none" aria-hidden="true">
        {[160, 320, 480].map((y, i) => (
          <path key={y} className="draw" pathLength={1} d={`M0 ${y}H${W}`} stroke="currentColor" strokeOpacity={0.12} style={{ "--o": `${0.05 + i * 0.08}` } as CSSProperties} />
        ))}
        {links.map((l, i) => {
          const on = active !== null && (l.a === active || l.b === active);
          const d = pathOf(l.pts);
          return (
            <g key={i} className={on ? "on" : ""}>
              <path className="draw link" pathLength={1} d={d} stroke="currentColor" style={{ "--o": `${0.12 + i * 0.03}` } as CSSProperties} />
              <path className="flow" d={d} stroke="currentColor" />
            </g>
          );
        })}
      </svg>

      {skills.layers.map((layer, li) => (
        <div key={layer.name} className="layer" style={{ top: pct(ROWS[li] - 80, H), height: pct(160, H) }}>
          <span className="label layer-name">
            {String(li + 1).padStart(2, "0")} {layer.name}
          </span>
          <ul>
            {layer.items.map((name) => {
              const [c] = place[name] ?? [0, li];
              const lit = active === name || (active !== null && linked(name));
              return (
                <li key={name} style={{ left: pct(COLS[c] - CW / 2, W), width: pct(CW, W), height: pct(CH, 160) }}>
                  <button
                    type="button"
                    className={`chip-node ${lit ? "lit" : ""} ${active === name ? "focus" : ""}`}
                    onPointerEnter={() => setActive(name)}
                    onFocus={() => setActive(name)}
                    onBlur={() => setActive(null)}
                  >
                    {name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
