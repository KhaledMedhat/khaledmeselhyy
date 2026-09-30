"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";

/** A screen floating in 3D. Rests at a tilt, follows the pointer, and settles flat-ish on hover. */
export function TiltCard({
  rest = { x: 4, y: 12 },
  height,
  chrome = false,
  caption,
  children,
}: {
  rest?: { x: number; y: number };
  height: number;
  chrome?: boolean;
  caption?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const set = (x: number, y: number, gx = 50, gy = 50) => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `${x}deg`);
    el.style.setProperty("--ry", `${y}deg`);
    el.style.setProperty("--gx", `${gx}%`);
    el.style.setProperty("--gy", `${gy}%`);
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ref.current?.classList.add("active");
    set((0.5 - py) * 6, (px - 0.5) * 8, px * 100, py * 100);
  };

  const onLeave = () => {
    ref.current?.classList.remove("active");
    set(rest.x, rest.y);
  };

  return (
    <div className="tilt-stage" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div ref={ref} className="tilt" style={{ height, "--rx": `${rest.x}deg`, "--ry": `${rest.y}deg` } as CSSProperties}>
        {chrome && (
          <div className="chrome" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        )}
        <div style={{ height: chrome ? height - 40 : height }}>{children}</div>
        <div className="glare" />
        {caption && <div className="caption mono">{caption}</div>}
      </div>
    </div>
  );
}
