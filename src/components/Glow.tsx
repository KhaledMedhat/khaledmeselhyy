"use client";

import { useEffect, useRef } from "react";

/**
 * Soft off-white light behind the page, so the glass surfaces have something to frost:
 * two glows drift slowly on their own and a third trails the pointer.
 */
export function Glow() {
  const follow = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = follow.current;
    if (!el) return;
    const target = { x: window.innerWidth * 0.7, y: window.innerHeight * 0.3 };
    const pos = { ...target };
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      pos.x += (target.x - pos.x) * 0.06;
      pos.y += (target.y - pos.y) * 0.06;
      el.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="glow" aria-hidden="true">
      <i className="g1" />
      <i className="g2" />
      <i className="g3" ref={follow} />
    </div>
  );
}
