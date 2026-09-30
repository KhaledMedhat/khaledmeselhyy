"use client";

import { useEffect } from "react";

/**
 * Ties every line on the page to scrolling. Each [data-scrub] element gets a --p value
 * that eases from 0 (just below the viewport) to 1 (well inside it), so its lines draw in
 * as you scroll down and pull back as you scroll up. The page itself gets --page for the
 * column guides. Values are smoothed every frame, so the lines keep gliding after you stop.
 */
export function Scrub() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.add("scrub-off");
      return;
    }
    const current = new WeakMap<Element, number>();
    let page = 0;
    let raf = 0;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-scrub]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) return;
        const target = Math.min(1, Math.max(0, (vh * 0.95 - r.top) / (vh * 0.7)));
        const now = current.get(el) ?? 0;
        const next = now + (target - now) * 0.09;
        if (Math.abs(next - now) > 0.0005) {
          current.set(el, next);
          el.style.setProperty("--p", next.toFixed(4));
        }
      });
      const max = root.scrollHeight;
      const pageTarget = max > 0 ? Math.min(1, (window.scrollY + vh) / max) : 1;
      const nextPage = page + (pageTarget - page) * 0.08;
      if (Math.abs(nextPage - page) > 0.0005) {
        page = nextPage;
        root.style.setProperty("--page", page.toFixed(4));
      }
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
}
