"use client";

import { useState } from "react";
import { site } from "@/content";
import { Monogram } from "./Icons";
import { Reveal } from "./Reveal";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Reveal as="header" className="nav" threshold={0}>
      <a href="#top" className="brand" aria-label={`${site.name.first} ${site.name.last}, home`} onClick={close}>
        <Monogram />
        <span className="mono">
          {site.name.first} {site.name.last}
        </span>
      </a>
      <nav id="site-menu" className={`nav-links ${open ? "open" : ""}`} aria-label="Main">
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={close}>
            {l.label}
          </a>
        ))}
        {site.available && (
          <a href="#contact" className="pill mono" onClick={close}>
            <span className="dot pulse" />
            Available for work
          </a>
        )}
      </nav>
      <button
        type="button"
        className="menu-btn"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((o) => !o)}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          {open ? (
            <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.4" />
          ) : (
            <path d="M2 6H16M2 12H16" stroke="currentColor" strokeWidth="1.4" />
          )}
        </svg>
      </button>
    </Reveal>
  );
}
