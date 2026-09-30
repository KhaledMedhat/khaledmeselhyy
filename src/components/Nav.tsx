"use client";

import { useState } from "react";
import { site } from "@/content";
import { Download } from "./Icons";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Reveal as="header" className="nav" threshold={0}>
      <a href="#top" className="nav-logo" aria-label={`${site.name.first} ${site.name.last}, home`} onClick={close}>
        <Logo className="nav-mark" delay={0.2} />
      </a>
      <nav id="site-menu" className={`nav-links ${open ? "open" : ""}`} aria-label="Main">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="link-u" onClick={close}>
            {l.label}
          </a>
        ))}
      </nav>
      <a href={site.cv} className="nav-cv mono" download>
        Download CV <Download size={14} />
      </a>
      <button
        type="button"
        className="menu-btn"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((o) => !o)}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          {open ? <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.4" /> : <path d="M2 6H16M2 12H16" stroke="currentColor" strokeWidth="1.4" />}
        </svg>
      </button>
    </Reveal>
  );
}
