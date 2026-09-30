"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "./motion";

/**
 * One continuous line that runs through every [data-thread] knot on the page and draws
 * itself as you scroll. Knots light up as the line reaches them.
 */
export function Thread() {
  const svg = useRef<SVGSVGElement>(null);
  const live = useRef<SVGPathElement>(null);
  const [geo, setGeo] = useState({ d: "", w: 0, h: 0 });
  const sampleRef = useRef<() => void>(() => {});

  useEffect(() => {
    const host = svg.current?.parentElement;
    if (!host) return;

    let knots: HTMLElement[] = [];
    let ys: number[] = [];
    const measure = () => {
      const hr = host.getBoundingClientRect();
      knots = Array.from(host.querySelectorAll<HTMLElement>("[data-thread]"));
      const pts = knots.map((k) => {
        const r = k.getBoundingClientRect();
        return { x: r.left - hr.left + r.width / 2, y: r.top - hr.top + r.height / 2 };
      });
      ys = pts.map((p) => p.y);
      if (pts.length < 2) return;
      let d = `M${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        const dy = b.y - a.y;
        // A soft S between knots, with a slight swing outward so it never runs straight.
        const swing = (i % 2 ? 1 : -1) * Math.min(48, host.clientWidth * 0.035);
        d += ` C${a.x + swing} ${a.y + dy * 0.45} ${b.x - swing} ${b.y - dy * 0.45} ${b.x} ${b.y}`;
      }
      setGeo({ d, w: host.clientWidth, h: host.scrollHeight });
    };

    let samples: { len: number; y: number }[] = [];
    let total = 0;
    const sample = () => {
      const p = live.current;
      if (!p || !p.getAttribute("d")) return;
      total = p.getTotalLength();
      samples = [];
      for (let i = 0; i <= 400; i++) {
        const len = (total * i) / 400;
        samples.push({ len, y: p.getPointAtLength(len).y });
      }
      p.style.strokeDasharray = `${total}`;
      update();
    };

    const update = () => {
      const p = live.current;
      if (!p || !samples.length) return;
      const hostTop = host.getBoundingClientRect().top + window.scrollY;
      const target = prefersReducedMotion() ? Infinity : window.scrollY + window.innerHeight * 0.62 - hostTop;
      let len = 0;
      for (const s of samples) {
        if (s.y <= target) len = s.len;
      }
      p.style.strokeDashoffset = `${total - len}`;
      knots.forEach((k, i) => k.classList.toggle("lit", ys[i] <= target));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    document.fonts?.ready.then(measure);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    sampleRef.current = sample;
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (geo.d) sampleRef.current();
  }, [geo]);

  return (
    <svg ref={svg} className="thread" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w || 1} ${geo.h || 1}`} fill="none" aria-hidden="true">
      <path d={geo.d} stroke="rgba(236,232,225,0.08)" strokeWidth="1" strokeDasharray="2 6" />
      <path ref={live} d={geo.d} stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
