"use client";

import { useEffect, useRef } from "react";
import { clamp, easeInOut, prefersReducedMotion } from "./motion";

const ROWS = 46;
const COLS = 150;

/**
 * Stacked ridge lines seen in perspective, like a mountain range drawn in contour.
 * Each line draws in from left to right, the terrain drifts slowly, and it rises
 * under the pointer. Lines in front hide the ones behind them.
 */
export function Ridges() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const still = prefersReducedMotion();
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

    const pointer = { x: 0, z: 0.6, on: 0, target: 0 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.z = clamp(((e.clientY - r.top) / r.height - 0.42) / 0.58);
      pointer.target = e.clientY > r.top + r.height * 0.3 && e.clientY < r.bottom ? 1 : 0;
    };
    const onLeave = () => (pointer.target = 0);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);

    const terrain = (x: number, z: number, t: number) => {
      const env = Math.exp(-x * x * 1.6) * (0.35 + 0.65 * Math.sin(z * Math.PI));
      let v =
        Math.sin(x * 3.1 + z * 7.3 + t * 0.5) * 0.5 +
        Math.sin(x * 7.7 - z * 4.1 + t * 0.32) * 0.28 +
        Math.sin(x * 13.3 + z * 11.7 - t * 0.7) * 0.1 +
        Math.sin(z * 5.3 - t * 0.22) * 0.3;
      v = Math.max(0, v + 0.18);
      const dx = x - pointer.x;
      const dz = z - pointer.z;
      const bump = Math.exp(-(dx * dx * 14 + dz * dz * 26)) * 0.85 * pointer.on;
      return v * env + bump;
    };

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    const t0 = performance.now();
    let raf = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      const t = still ? 0 : (now - t0) / 1000;
      pointer.on += (pointer.target - pointer.on) * 0.05;

      ctx.clearRect(0, 0, w, h);
      const horizon = h * 0.44;
      const amp = h * 0.36;

      for (let i = 0; i < ROWS; i++) {
        const z = i / (ROWS - 1); // 0 = far, 1 = near
        const depth = 1 + (1 - z) * 3.4;
        const s = 1 / depth;
        const y0 = horizon + (h * 1.02 - horizon) * ((s - 1 / 4.4) / (1 - 1 / 4.4));
        const half = w * 0.9 * (0.45 + s * 0.75);
        const reveal = still ? 1 : easeInOut(clamp((t - 0.15 - (1 - z) * 0.9) / 1.6));
        const n = Math.max(2, Math.floor(COLS * reveal));

        ctx.beginPath();
        let lastX = 0;
        for (let k = 0; k <= n; k++) {
          const x = -1 + (2 * k) / COLS;
          const sx = w / 2 + x * half;
          const sy = y0 - terrain(x, z, t) * amp * s;
          if (k === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
          lastX = sx;
        }
        // Hide what is behind this line.
        ctx.lineTo(lastX, h + 2);
        ctx.lineTo(w / 2 - half, h + 2);
        ctx.closePath();
        ctx.fillStyle = "#0c0c0e";
        ctx.fill();

        ctx.beginPath();
        for (let k = 0; k <= n; k++) {
          const x = -1 + (2 * k) / COLS;
          const sx = w / 2 + x * half;
          const sy = y0 - terrain(x, z, t) * amp * s;
          if (k === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        const gold = i % 9 === 4;
        ctx.strokeStyle = gold ? `rgba(212,180,131,${0.35 + z * 0.55})` : `rgba(236,232,225,${0.08 + z * 0.5})`;
        ctx.lineWidth = gold ? 1.2 : 1;
        ctx.stroke();
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="ridges" aria-hidden="true" />;
}
