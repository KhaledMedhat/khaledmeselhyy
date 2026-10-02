"use client";

import { useEffect, useRef, useState } from "react";
import { K_PATHS, K_VIEWBOX } from "./Logo";
import { markReady } from "./ready";

// The K's two halves (same shapes as the header logo).
const BLOCKS = K_PATHS;


const DEPTH = 28;

// Timeline, in ms from when the intro starts.
const T = { collapse: 2750, ready: 3250, done: 3800 };

/**
 * Opening sequence: guide lines draw across the screen and frame the K, its outline traces,
 * and it turns in 3D as a dark block edged in off-white, front and back. The camera dives into
 * the stem as the edges fade into the dark, a single line draws across the middle and pulls
 * back, and the page's grid starts drawing where it was.
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
          {/* Depth: tightly stacked dark copies form the body of the block (same color as the background) */}
          {Array.from({ length: DEPTH }, (_, i) => (
            <svg key={i} className="intro-layer" viewBox={K_VIEWBOX} style={{ "--z": `${-(i + 1) * 0.8}px` } as React.CSSProperties}>
              {BLOCKS.map((d) => (
                <path key={d} d={d} />
              ))}
            </svg>
          ))}
          {/* The back edge, a fainter outline that shows the thickness as the K turns */}
          <svg className="intro-face intro-back" viewBox={K_VIEWBOX} fill="none" style={{ "--z": `${-DEPTH * 0.8}px` } as React.CSSProperties}>
            {BLOCKS.map((d, i) => (
              <path key={d} d={d} pathLength={1} style={{ animationDelay: `${0.9 + i * 0.25}s, 2.25s` }} />
            ))}
          </svg>
          {/* The front edge: an outline only, no fill */}
          <svg className="intro-face" viewBox={K_VIEWBOX} fill="none">
            {BLOCKS.map((d, i) => (
              <path key={d} d={d} pathLength={1} style={{ animationDelay: `${0.5 + i * 0.25}s, 2.3s` }} />
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

      {/* The line that draws across the middle and pulls back into the page */}
      <div className="intro-flash" />
    </div>
  );
}
