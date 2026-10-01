"use client";

import { useMemo, useState } from "react";
import { skills } from "@/content";

// Diagram geometry in a 1200 × 640 box: four layers, four columns.
const W = 1200;
const H = 640;
const COLS = [330, 560, 790, 1020];
const ROWS = [80, 240, 400, 560];
const CW = 190;
const CH = 56;
const HALF_W = CW / 2;
const HALF_H = CH / 2;

// Where each skill sits: [column, layer].
const place: Record<string, [number, number]> = {
  JavaScript: [0, 0], TypeScript: [1, 0], HTML: [2, 0], CSS: [3, 0],
  React: [0, 1], "Next.js": [1, 1], "Tailwind CSS": [3, 1],
  "Node.js": [1, 2], NestJS: [2, 2],
  MongoDB: [1, 3], PostgreSQL: [2, 3],
};

// What connects to what (from → to).
const LINKS: [string, string][] = [
  ["JavaScript", "React"], ["JavaScript", "Next.js"], ["JavaScript", "Node.js"],
  ["TypeScript", "React"], ["TypeScript", "Next.js"], ["TypeScript", "Node.js"], ["TypeScript", "NestJS"],
  ["HTML", "React"], ["HTML", "Next.js"],
  ["CSS", "Tailwind CSS"],
  ["Tailwind CSS", "HTML"], ["Tailwind CSS", "React"], ["Tailwind CSS", "Next.js"],
  ["Next.js", "MongoDB"], ["Next.js", "PostgreSQL"],
  ["Node.js", "MongoDB"], ["Node.js", "PostgreSQL"],
  ["NestJS", "MongoDB"], ["NestJS", "PostgreSQL"],
];

type Pt = [number, number];
type Side = "top" | "bottom";

/**
 * Route every link with straight, right-angled segments. Each link leaves and enters a box
 * through its own port, so lines sharing a box spread out instead of overlapping, and links
 * that skip a layer travel down the gaps between columns instead of crossing other boxes.
 */
function route() {
  const ports = new Map<string, number>(); // `${skill}:${side}` → count used so far
  const totals = new Map<string, number>();
  const use = (skill: string, side: Side) => totals.set(`${skill}:${side}`, (totals.get(`${skill}:${side}`) ?? 0) + 1);

  const plans = LINKS.map(([a, b]) => {
    const [, ra] = place[a];
    const [, rb] = place[b];
    // Downward links leave from the bottom and enter from the top; upward ones the reverse;
    // links within a layer leave and enter from the bottom.
    const out: Side = rb < ra ? "top" : "bottom";
    const inn: Side = rb > ra ? "top" : "bottom";
    use(a, out);
    use(b, inn);
    return { a, b, out, inn };
  });

  const port = (skill: string, side: Side) => {
    const key = `${skill}:${side}`;
    const n = totals.get(key) ?? 1;
    const k = ports.get(key) ?? 0;
    ports.set(key, k + 1);
    const [c, r] = place[skill];
    const x = COLS[c] + (k - (n - 1) / 2) * Math.min(26, (CW - 40) / Math.max(1, n - 1));
    const y = ROWS[r] + (side === "top" ? -HALF_H : HALF_H);
    return [x, y] as Pt;
  };

  return plans.map(({ a, b, out, inn }, i) => {
    const s = port(a, out);
    const e = port(b, inn);
    const [ca, ra] = place[a];
    const [cb, rb] = place[b];
    const lane = ((i % 5) - 2) * 6; // small offset so parallel runs don't sit on top of each other
    let pts: Pt[];
    const above = Math.abs(rb - ra) === 1 && Math.abs(s[0] - COLS[cb]) < HALF_W - 12;
    if (above) {
      // The source sits right over (or under) its target: one straight drop.
      pts = [s, [s[0], e[1]]];
      e[0] = s[0];
    } else if (rb === ra) {
      // Same layer: dip below the boxes and come back up.
      const y = ROWS[ra] + HALF_H + 26 + lane;
      pts = [s, [s[0], y], [e[0], y], e];
    } else if (rb < ra) {
      // Upward: rise into the channel above, cross, rise into the target.
      const y = ROWS[ra] - 80 + lane;
      pts = [s, [s[0], y], [e[0], y], e];
    } else if (rb === ra + 1) {
      const y = ROWS[ra] + 80 + lane;
      pts = [s, [s[0], y], [e[0], y], e];
    } else {
      // Skips a layer: drop into the channel, run along the gap beside the target column, then in.
      const gap = (cb <= ca ? COLS[cb] - HALF_W - 20 : COLS[cb] - HALF_W - 20) + lane;
      const y1 = ROWS[ra] + 80 + lane;
      const y2 = ROWS[rb] - 80 + lane;
      pts = [s, [s[0], y1], [gap, y1], [gap, y2], [e[0], y2], e];
    }
    return { a, b, d: pts.map(([x, y], k) => `${k ? "L" : "M"}${x} ${y}`).join(""), end: e };
  });
}

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/**
 * The skills as a stack diagram. Only the boxes are shown until you hover (or tap) a skill:
 * then its connectors draw out to everything it feeds or depends on, carrying a flow of dashes,
 * and pull back again when you move away.
 */
export function Stack() {
  const [active, setActive] = useState<string | null>(null);
  const links = useMemo(route, []);
  const linked = (name: string) => active !== null && links.some((l) => (l.a === active && l.b === name) || (l.b === active && l.a === name));

  return (
    <div className="stack" onPointerLeave={() => setActive(null)}>
      <svg className="stack-lines" viewBox={`0 0 ${W} ${H}`} fill="none" aria-hidden="true">
        {[160, 320, 480].map((y, i) => (
          <path key={y} className="draw" pathLength={1} d={`M0 ${y}H${W}`} stroke="currentColor" strokeOpacity={0.12} style={{ "--o": `${0.05 + i * 0.08}` } as React.CSSProperties} />
        ))}
        {links.map((l) => {
          const on = active !== null && (l.a === active || l.b === active);
          return (
            <g key={`${l.a}-${l.b}`} className={`conn ${on ? "on" : ""}`}>
              <path className="conn-line" pathLength={1} d={l.d} stroke="currentColor" />
              <path className="flow" d={l.d} stroke="currentColor" />
              <rect className="conn-end" x={l.end[0] - 3} y={l.end[1] - 3} width="6" height="6" fill="currentColor" />
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
              return (
                <li key={name} style={{ left: pct(COLS[c] - HALF_W, W), width: pct(CW, W), height: pct(CH, 160) }}>
                  <button
                    type="button"
                    className={`chip-node ${linked(name) ? "lit" : ""} ${active === name ? "focus" : ""}`}
                    aria-pressed={active === name}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setActive(name)}
                    onClick={() => setActive((a) => (a === name ? null : name))}
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
      <p className="stack-hint label">Hover or tap a skill to trace its connections</p>
    </div>
  );
}
