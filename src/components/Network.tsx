"use client";

import { useEffect, useRef } from "react";
import { clamp, cssVar, easeInOut, prefersReducedMotion } from "./motion";

type P = { x: number; y: number; z: number; label?: string; li?: number };

/**
 * A slowly turning sphere of points joined by lines. The named points are the skills;
 * light pulses travel along the lines, and hovering a skill in the list lights its node.
 */
export function Network({ labels, active }: { labels: string[]; active: number | null }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef<number | null>(active);
  activeRef.current = active;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const still = prefersReducedMotion();
    const font = cssVar("--font-sans", "system-ui");

    // Fibonacci sphere, skills spread evenly among the unnamed points.
    const total = 64;
    const pts: P[] = [];
    for (let i = 0; i < total; i++) {
      const y = 1 - (i / (total - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = i * Math.PI * (3 - Math.sqrt(5));
      pts.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r });
    }
    const step = total / labels.length;
    labels.forEach((l, i) => {
      const p = pts[Math.floor(i * step + step / 2)];
      p.label = l;
      p.li = i;
    });

    // Join each point to its three nearest neighbours.
    const edges: { a: number; b: number; delay: number }[] = [];
    const seen = new Set<string>();
    pts.forEach((p, i) => {
      pts
        .map((q, j) => ({ j, d: (p.x - q.x) ** 2 + (p.y - q.y) ** 2 + (p.z - q.z) ** 2 }))
        .filter((o) => o.j !== i)
        .sort((m, n) => m.d - n.d)
        .slice(0, 3)
        .forEach(({ j }) => {
          const key = i < j ? `${i}-${j}` : `${j}-${i}`;
          if (seen.has(key)) return;
          seen.add(key);
          edges.push({ a: i, b: j, delay: (1 - p.y) * 0.6 + Math.random() * 0.5 });
        });
    });

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let tilt = 0;
    let tiltTarget = 0;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      tiltTarget = ((e.clientY - r.top) / r.height - 0.5) * 0.6;
    };
    canvas.addEventListener("pointermove", onMove);

    let start: number | null = null;
    let visible = false;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && start === null) start = performance.now();
    }, { threshold: 0.2 });
    io.observe(canvas);

    const pulses: { e: number; s: number; v: number }[] = [];
    let rot = 0.4;
    let last = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!visible || document.hidden || start === null) return;
      const t = still ? 99 : (now - start) / 1000;
      if (!still) rot += dt * 0.18;
      tilt += (tiltTarget - tilt) * 0.05;

      const R = Math.min(w, h) * (w < 520 ? 0.3 : 0.36);
      const cx = w / 2 - (w < 520 ? w * 0.06 : 0);
      const cy = h / 2;
      const ax = -0.32 + tilt;
      const cosY = Math.cos(rot), sinY = Math.sin(rot), cosX = Math.cos(ax), sinX = Math.sin(ax);
      const proj = pts.map((p) => {
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;
        const f = 3.2 / (3.2 - z2);
        return { sx: cx + x1 * R * f, sy: cy - y2 * R * f, depth: (z2 + 1) / 2, f };
      });

      ctx.clearRect(0, 0, w, h);
      const act = activeRef.current;
      const activeIdx = act === null ? -1 : pts.findIndex((p) => p.li === act);

      // Lines
      edges.forEach((e, i) => {
        const pa = proj[e.a];
        const pb = proj[e.b];
        const k = easeInOut(clamp((t - e.delay) / 1.1));
        if (k <= 0) return;
        const lit = e.a === activeIdx || e.b === activeIdx;
        const d = (pa.depth + pb.depth) / 2;
        ctx.strokeStyle = lit ? `rgba(212,180,131,${0.5 + d * 0.5})` : `rgba(236,232,225,${0.04 + d * 0.26})`;
        ctx.lineWidth = lit ? 1.4 : 1;
        ctx.beginPath();
        ctx.moveTo(pa.sx, pa.sy);
        ctx.lineTo(pa.sx + (pb.sx - pa.sx) * k, pa.sy + (pb.sy - pa.sy) * k);
        ctx.stroke();
        void i;
      });

      // Pulses travelling along lines
      if (!still && t > 2 && Math.random() < 0.08 && pulses.length < 14) {
        pulses.push({ e: Math.floor(Math.random() * edges.length), s: 0, v: 0.6 + Math.random() * 0.8 });
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.s += dt * p.v;
        if (p.s > 1) {
          pulses.splice(i, 1);
          continue;
        }
        const e = edges[p.e];
        const pa = proj[e.a];
        const pb = proj[e.b];
        const s0 = Math.max(0, p.s - 0.25);
        const d = (pa.depth + pb.depth) / 2;
        ctx.strokeStyle = `rgba(212,180,131,${0.3 + d * 0.7})`;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(pa.sx + (pb.sx - pa.sx) * s0, pa.sy + (pb.sy - pa.sy) * s0);
        ctx.lineTo(pa.sx + (pb.sx - pa.sx) * p.s, pa.sy + (pb.sy - pa.sy) * p.s);
        ctx.stroke();
      }

      // Points and labels, far to near
      const order = proj.map((p, i) => i).sort((a, b) => proj[a].depth - proj[b].depth);
      const appear = clamp((t - 0.8) / 1.2);
      for (const i of order) {
        const p = proj[i];
        const pt = pts[i];
        const lit = i === activeIdx;
        const alpha = (0.15 + p.depth * 0.85) * appear;
        ctx.fillStyle = lit ? "#d4b483" : `rgba(236,232,225,${alpha})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, pt.label ? (lit ? 4.5 : 2.6) : 1.3, 0, Math.PI * 2);
        ctx.fill();
        if (pt.label) {
          const size = Math.round(11 + p.depth * 6);
          ctx.font = `${lit ? 600 : 500} ${size}px ${font}`;
          ctx.fillStyle = lit ? "#d4b483" : `rgba(236,232,225,${(0.1 + p.depth * 0.9) * appear})`;
          ctx.fillText(pt.label, p.sx + 9, p.sy + 4);
          if (lit) {
            ctx.strokeStyle = "rgba(212,180,131,0.6)";
            ctx.beginPath();
            ctx.arc(p.sx, p.sy, 11, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
    };
  }, [labels]);

  return <canvas ref={ref} aria-hidden="true" />;
}
