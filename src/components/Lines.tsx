import type { CSSProperties } from "react";

type L = [number, number, number, number];

// Three straight-line compositions, one per project. Each line draws with scroll.
const sets: L[][] = [
  [
    [0, 60, 600, 60], [0, 315, 600, 315], [120, 0, 120, 375], [480, 0, 480, 375],
    [120, 120, 480, 120], [120, 255, 480, 255], [300, 60, 300, 315], [210, 120, 210, 255], [390, 120, 390, 255],
  ],
  [
    [0, 90, 600, 90], [0, 285, 600, 285], [60, 0, 60, 375], [540, 0, 540, 375],
    [60, 187, 540, 187], [240, 90, 240, 285], [360, 90, 360, 285], [150, 90, 150, 187], [450, 187, 450, 285],
  ],
  [
    [0, 40, 600, 40], [0, 335, 600, 335], [200, 0, 200, 375], [400, 0, 400, 375],
    [200, 150, 400, 150], [200, 225, 400, 225], [40, 40, 40, 335], [560, 40, 560, 335], [300, 150, 300, 225],
  ],
];

/** Straight lines crossing into a layout-like composition, with a + at key crossings. */
export function Lines({ variant }: { variant: number }) {
  const lines = sets[variant % sets.length];
  const crosses = [lines[0], lines[1]].flatMap(([, y]) => [lines[2][0], lines[3][0]].map((x) => [x, y]));
  return (
    <svg className="lines" viewBox="0 0 600 375" fill="none" aria-hidden="true">
      {lines.map(([x1, y1, x2, y2], i) => (
        <path
          key={i}
          className="draw"
          pathLength={1}
          d={`M${x1} ${y1}L${x2} ${y2}`}
          stroke="currentColor"
          strokeOpacity={i < 4 ? 0.22 : 0.45}
          style={{ "--o": `${0.04 + i * 0.045}` } as CSSProperties}
        />
      ))}
      {crosses.map(([x, y], i) => (
        <path key={`c${i}`} className="cross" d={`M${x - 7} ${y}H${x + 7}M${x} ${y - 7}V${y + 7}`} stroke="currentColor" style={{ "--o": `${0.35 + i * 0.05}` } as CSSProperties} />
      ))}
    </svg>
  );
}
