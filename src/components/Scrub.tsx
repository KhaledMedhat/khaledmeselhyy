"use client";

import { useEffect } from "react";
import { isReady } from "./ready";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
/** Section progress per second: about two seconds for a full section to draw. */
const DRAW_SPEED = 0.5;
/** How fast the column lines grow, in pixels per second. */
const GUIDE_SPEED = 700;

/**
 * Ties every line on the page to scrolling. Each [data-scrub] element gets a --p value
 * that rises from 0 to 1 as it comes into view and falls back toward 0 as it leaves through
 * the top, so its lines draw in and pull back in both directions. The page itself gets --page
 * for the column guides. Progress moves at a fixed speed, so you always see lines being drawn.
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
    let last = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = last ? Math.min(0.1, (now - last) / 1000) : 0;
      last = now;
      // Before the intro hands over, the page has no lines at all.
      const ready = isReady();
      const vh = window.innerHeight;
      const atEnd = window.scrollY + vh >= root.scrollHeight - 4;
      const step = dt * DRAW_SPEED;

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
        const target = !ready ? 0 : atEnd && r.bottom > 0 ? 1 : Math.min(enter, exit);
        const cur = current.get(el) ?? 0;
        // Move toward the target at a steady speed (pulling back is a little quicker).
        const next = !ready ? 0 : cur + Math.max(-step * 1.5, Math.min(step, target - cur));
        if (next !== cur || !current.has(el)) {
          current.set(el, next);
          el.style.setProperty("--p", next.toFixed(4));
        }
      });

      // The column lines grow down the page at a steady pace in pixels.
      const max = root.scrollHeight;
      const pageTarget = !ready ? 0 : max > 0 ? Math.min(1, (window.scrollY + vh) / max) : 1;
      const pageStep = max > 0 ? (dt * GUIDE_SPEED) / max : 1;
      const nextPage = !ready ? 0 : page + Math.max(-pageStep * 2, Math.min(pageStep, pageTarget - page));
      if (nextPage !== page) {
        page = nextPage;
        root.style.setProperty("--page", page.toFixed(4));
      }
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
}
