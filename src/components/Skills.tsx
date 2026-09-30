"use client";

import { useState } from "react";
import { skills } from "@/content";
import { Network } from "./Network";

export function SkillsNet() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="skills-grid">
      <div>
        <h2 className="serif rise">{skills.heading}</h2>
        <p className="aside rise" style={{ "--d": "0.15s" } as React.CSSProperties}>
          {skills.aside}
        </p>
        <ul className="skill-list rise" style={{ "--d": "0.3s" } as React.CSSProperties} onPointerLeave={() => setActive(null)}>
          {skills.list.map((s, i) => (
            <li key={s}>
              <button type="button" onPointerEnter={() => setActive(i)} onFocus={() => setActive(i)} onBlur={() => setActive(null)}>
                {s}
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="net">
        <Network labels={skills.list} active={active} />
      </div>
    </div>
  );
}
