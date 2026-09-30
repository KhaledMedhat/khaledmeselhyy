"use client";

import { useEffect } from "react";

/**
 * Ties every line on the page to scrolling. Each [data-scrub] element gets a --p value
 * that eases from 0 to 1 as it rises into view and back toward 0 as it leaves through the
 * top, so its lines draw in and pull back in both directions. The page itself gets --page for the
 * column guides. Values are smoothed every frame, so the lines keep gliding after you stop.
 */
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

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
      const atEnd = window.scrollY + vh >= root.scrollHeight - 4;
      document.querySelectorAll<HTMLElement>("[data-scrub]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) return;
        // Draw in as the section rises from the bottom of the screen...
        let enter = clamp01((vh * 0.95 - r.top) / (vh * 0.7));
        // ...but finish once it is fully on screen, or once the page can't scroll any further.
        if (r.top < vh && (r.bottom <= vh || atEnd)) enter = 1;
        // ...and pull back again as it leaves through the top.
        const exit = clamp01((r.bottom - vh * 0.08) / (vh * 0.45));
        // At the very bottom of the page, everything on screen is complete.
        const target = atEnd && r.bottom > 0 ? 1 : Math.min(enter, exit);
        const now = current.get(el) ?? 0;
        const next = now + (target - now) * 0.12;
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
