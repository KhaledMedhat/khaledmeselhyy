"use client";

import { useRef } from "react";
import { site } from "@/content";
import { d } from "./delay";
import { Download } from "./Icons";

/** Your photo as a card floating in 3D, with crop marks drawn around it. */
export function PortraitCard() {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 16}deg`);
    ref.current.style.setProperty("--rx", `${-((e.clientY - r.top) / r.height - 0.5) * 10}deg`);
  };
  const onLeave = () => {
    ref.current?.style.removeProperty("--ry");
    ref.current?.style.removeProperty("--rx");
  };

  return (
    <div className="portrait-stage" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div ref={ref} className="portrait">
        {site.portrait ? (
          <img src={site.portrait} alt={`${site.name.first} ${site.name.last}`} />
        ) : (
          <div className="ph label">[Your photo]</div>
        )}
        <svg className="crop" viewBox="0 0 100 125" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path className="draw" style={d(0.9)} pathLength={1} d="M0 12V0H12M88 0H100V12M100 113V125H88M12 125H0V113" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
        <a href={site.cv} className="cv-btn" download aria-label="Download CV">
          <Download />
        </a>
      </div>
    </div>
  );
}
