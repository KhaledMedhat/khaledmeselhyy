"use client";

import { useEffect, useRef, useState } from "react";
import { markReady } from "./ready";

// The K's three blocks (same shapes as Logo.tsx).
const BLOCKS = ["M4 98L30 2H52L26 98Z", "M40 50L76 2H100L59 50Z", "M42 58H62L80 98H56Z"];
const DEPTH = 18;

// Timeline, in ms from when the intro starts.
const T = { collapse: 2750, ready: 3200, done: 3700 };

/**
 * Opening sequence: guide lines draw across the screen and frame the K, its outline traces,
 * the blocks fill and gain depth as the mark turns in 3D, then the camera dives into the stem
 * until the screen is off-white. That white collapses into a single line, the line shrinks
 * away, and the page's grid starts drawing where it was.
 */
export function Intro() {
  const [phase, setPhase] = useState<"idle" | "play" | "gone">("idle");
  const count = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("gone");
      markReady();
      return;
    }
    window.scrollTo(0, 0);
    root.style.overflow = "hidden";
    setPhase("play");

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 2500);
      if (count.current) count.current.textContent = String(Math.round(t * 100)).padStart(3, "0");
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      root.style.overflow = "";
      markReady();
    };
    const timers = [window.setTimeout(finish, T.ready), window.setTimeout(() => setPhase("gone"), T.done)];

    // Click or any key skips straight to the page.
    const skip = () => {
      timers.forEach(clearTimeout);
      finish();
      setPhase("gone");
    };
    window.addEventListener("pointerdown", skip, { once: true });
    window.addEventListener("keydown", skip, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      root.style.overflow = "";
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div className={`intro ${phase === "play" ? "play" : ""}`} aria-hidden="true" style={{ "--collapse": `${T.collapse}ms` } as React.CSSProperties}>
      {/* Guide lines across the whole screen, crossing at the mark */}
      <i className="ig h" />
      <i className="ig h2" />
      <i className="ig v" />
      <i className="ig v2" />

      <div className="intro-stage">
        <div className="intro-mark">
          {/* Extruded depth: stacked copies behind the face */}
          {Array.from({ length: DEPTH }, (_, i) => (
            <svg key={i} className="intro-layer" viewBox="0 0 100 100" style={{ "--z": `${-(i + 1) * 1.6}px`, "--shade": `${62 - i * 2.8}%` } as React.CSSProperties}>
              {BLOCKS.map((d) => (
                <path key={d} d={d} />
              ))}
            </svg>
          ))}
          <svg className="intro-face" viewBox="0 0 100 100" fill="none">
            {BLOCKS.map((d, i) => (
              <path key={d} d={d} pathLength={1} style={{ animationDelay: `${0.5 + i * 0.15}s, ${1.15 + i * 0.1}s` }} />
            ))}
          </svg>
        </div>
        {/* Frame around the mark */}
        <svg className="intro-frame" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
          <path pathLength={1} d="M0 0H100V100H0Z" />
        </svg>
      </div>

      <div className="intro-meta">
        <span>Khaled Meselhy — Portfolio</span>
        <span ref={count}>000</span>
      </div>

      {/* The off-white the camera lands in, which collapses into a line */}
      <div className="intro-flash" />
    </div>
  );
}
