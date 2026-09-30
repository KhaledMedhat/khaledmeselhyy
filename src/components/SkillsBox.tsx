"use client";

import { useRef, type CSSProperties } from "react";
import { skills } from "@/content";
import { d } from "./delay";

/**
 * The black skills box as a 3D object: it leans toward the pointer, its skill tiles flip in a
 * wave (hover one to hold it), a strip of more tools slides past, and "& Much More." floats forward.
 */
export function SkillsBox() {
  const box = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !box.current) return;
    const r = box.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    box.current.classList.add("active");
    box.current.style.setProperty("--rx", `${-py * 10}deg`);
    box.current.style.setProperty("--ry", `${px * 14}deg`);
  };
  const onLeave = () => {
    if (!box.current) return;
    box.current.classList.remove("active");
    box.current.style.removeProperty("--rx");
    box.current.style.removeProperty("--ry");
  };

  // The first skill is the headliner and takes a double-width tile.
  const cols = 4;
  let cursor = 0;
  const tiles = skills.core.map((name, i) => {
    const wide = i === 0;
    const col = cursor % cols;
    const row = Math.floor(cursor / cols);
    cursor += wide ? 2 : 1;
    return { name, wide, i, delay: `${(col + row) * 0.4}s` };
  });
  const more = [...skills.more, ...skills.more];

  return (
    <div className="skills-stage" onPointerMove={onMove} onPointerLeave={onLeave}>
      {/* Thick diagonal stripes that run out of the box to the page edge. */}
      <svg className="stripes" viewBox="0 0 400 600" preserveAspectRatio="none" fill="none" aria-hidden="true">
        {[70, 180, 290, 400, 510].map((y, i) => (
          <path key={y} className="draw" style={d(0.4 + i * 0.18)} pathLength={1} d={`M0 ${y}L400 ${y + 150}`} stroke="currentColor" strokeWidth="16" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>

      <div className="box-persp">
        <div ref={box} className="box">
          <svg className="box-grid" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" aria-hidden="true">
            {[25, 50, 75].map((x, i) => (
              <path key={`v${x}`} className="draw slow" style={d(0.2 + i * 0.15)} pathLength={1} d={`M${x} 0V100`} stroke="currentColor" strokeOpacity={0.06} vectorEffect="non-scaling-stroke" />
            ))}
            <path className="draw" style={d(1)} pathLength={1} d="M1.5 5V1.5H5M95 1.5H98.5V5M98.5 95V98.5H95M5 98.5H1.5V95" stroke="currentColor" strokeOpacity={0.5} vectorEffect="non-scaling-stroke" />
          </svg>

          <ul className="tiles" style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {tiles.map((t) => (
              <li key={t.name} className={`tile ${t.wide ? "wide" : ""}`} style={{ "--delay": t.delay } as CSSProperties}>
                <span className="face front">{t.name}</span>
                <span className="face back" aria-hidden="true">
                  <b>{String(t.i + 1).padStart(2, "0")}</b>
                  {t.name}
                </span>
              </li>
            ))}
          </ul>

          <div className="marquee" aria-hidden="true">
            <div>
              {more.map((m, i) => (
                <span key={i}>{m} ✦</span>
              ))}
            </div>
          </div>

          <p className="box-more display rise" style={d(0.6)}>
            &amp; Much
            <br />
            More.
          </p>
          <div className="box-count label rise" style={d(0.8)}>
            {skills.core.length}+ technologies
            <br />
            and counting
          </div>
        </div>
      </div>
    </div>
  );
}
