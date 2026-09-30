import { intro, philosophy, projects, showcase, site, skills } from "@/content";
import type { Project } from "@/content";
import { d } from "@/components/delay";
import { Arrow } from "@/components/Icons";
import { Logo } from "@/components/Logo";
import { Nav } from "@/components/Nav";
import { PortraitCard } from "@/components/PortraitCard";
import { Reveal } from "@/components/Reveal";
import { SkillsBox } from "@/components/SkillsBox";
import { Sketch } from "@/components/Sketch";
import { TiltCard } from "@/components/TiltCard";
import type { CSSProperties } from "react";

const external = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {});

/** The two-line name, traced letter by letter and then filled. */
function Name({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <svg className={className} viewBox="0 10 1160 368" role="img" aria-label={`${site.name.first} ${site.name.last}`}>
      <text className="draw-text" style={d(delay)} x="0" y="160">
        {site.name.first.toUpperCase()}’
      </text>
      <text className="draw-text" style={d(delay + 0.35)} x="0" y="370">
        {site.name.last.toUpperCase()}
      </text>
    </svg>
  );
}

/** Thin vertical guide lines down both gutters. */
function Rails({ dark = false }: { dark?: boolean }) {
  const stroke = dark ? "var(--white)" : "var(--ink)";
  return (
    <div className="rails" aria-hidden="true">
      {[0, 1].map((i) => (
        <svg key={i} viewBox="0 0 2 100" preserveAspectRatio="none" fill="none">
          <path className="draw slow" style={d(0.1 + i * 0.2)} pathLength={1} d="M1 0V100" stroke={stroke} strokeOpacity={0.14} vectorEffect="non-scaling-stroke" />
        </svg>
      ))}
    </div>
  );
}

/** A black label block whose frame draws around it. */
function TagBlock({ children, id }: { children: string; id?: string }) {
  return (
    <Reveal className="sec-head" id={id}>
      <h2 className="tag-block display" style={{ margin: 0 }}>
        {children}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path className="draw" pathLength={1} d="M0 0H100V100H0Z" stroke="var(--ink)" vectorEffect="non-scaling-stroke" />
        </svg>
      </h2>
    </Reveal>
  );
}

function Hero() {
  return (
    <div className="dark" id="about">
      <Reveal as="section" id="top" className="hero" threshold={0}>
        <svg className="hero-lines" viewBox="0 0 1440 900" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path className="draw slow" style={d(0.1)} pathLength={1} d="M0 140H1440" stroke="currentColor" strokeOpacity={0.1} vectorEffect="non-scaling-stroke" />
          <path className="draw slow" style={d(0.3)} pathLength={1} d="M905 64V900" stroke="currentColor" strokeOpacity={0.1} vectorEffect="non-scaling-stroke" />
          <path className="draw slow" style={d(0.5)} pathLength={1} d="M1180 900L1440 160" stroke="currentColor" strokeOpacity={0.08} vectorEffect="non-scaling-stroke" />
          <path className="draw slow" style={d(0.7)} pathLength={1} d="M1260 900L1440 390" stroke="currentColor" strokeOpacity={0.08} vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="hero-copy">
          <div className="label rise" style={d(0.2)}>
            {site.role} — {site.location}
          </div>
          <h1 style={{ margin: 0 }}>
            <Name className="name-svg" delay={0.3} />
          </h1>
        </div>
        <div className="portrait-wrap rise" style={d(0.4)}>
          <PortraitCard />
        </div>
      </Reveal>
      <Reveal as="section" className="intro">
        <div>
          <p className="lead rise">{intro.lead}</p>
          <p className="body rise" style={d(0.15)}>
            {intro.body}
          </p>
        </div>
        <Logo className="big-logo" delay={0.3} />
      </Reveal>
    </div>
  );
}

function ProjectRow({ p, i }: { p: Project; i: number }) {
  const portrait = p.shape === "portrait";
  return (
    <Reveal as="article" className={`proj ${i % 2 ? "flip" : ""}`}>
      <svg className="proj-rule" viewBox="0 0 100 2" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path className="draw slow" pathLength={1} d="M0 1H100" stroke="currentColor" strokeOpacity={0.18} vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="proj-num label">
        Project <b className="mono">{String(i + 1).padStart(2, "0")}</b>
      </div>
      <div className="proj-body">
        <div className={portrait ? "shot-portrait" : ""}>
          <TiltCard height={portrait ? 540 : 360} rest={{ x: 4, y: i % 2 ? -10 : 10 }} caption={p.image ? undefined : "[SCREENSHOT]"}>
            {p.image ? <img src={p.image} alt={`${p.name} screenshot`} /> : <Sketch kind={p.sketch} />}
          </TiltCard>
        </div>
        <div className="proj-text">
          <h3 className="display rise" style={d(0.2)}>
            {p.name}
          </h3>
          <p className="rise" style={d(0.35)}>
            {p.summary}
          </p>
          <a href={p.href} className="proj-link rise" style={d(0.5)} {...external(p.href)}>
            {p.href.startsWith("#") ? "See the case study" : "Visit project"} <Arrow />
          </a>
        </div>
      </div>
    </Reveal>
  );
}

function Projects() {
  return (
    <section className="sec" id="projects">
      <Rails />
      <TagBlock>Projects</TagBlock>
      {projects.map((p, i) => (
        <ProjectRow key={p.name} p={p} i={i} />
      ))}
      <Reveal className="quote" style={{ padding: "clamp(40px, 6vw, 88px) 0 0" }}>
        <p className="rise">{philosophy}</p>
      </Reveal>
    </section>
  );
}

function Skills() {
  return (
    <section className="sec" id="skills" style={{ paddingTop: 0 }}>
      <Rails />
      <TagBlock>Skills</TagBlock>
      <Reveal className="skills-intro">
        <h2 className="rise">{skills.heading}</h2>
        <p className="rise" style={d(0.2)}>
          {skills.aside}
        </p>
      </Reveal>
      <Reveal threshold={0.25}>
        <SkillsBox />
      </Reveal>
    </section>
  );
}

function Showcase() {
  const layers = [0, 1, 2];
  return (
    <section className="sec" id="showcase">
      <Rails />
      <Reveal className="show-bar display">
        <span>{showcase.project} Showcase</span>
      </Reveal>
      <Reveal className="show-top">
        <h2 className="rise">{showcase.headline}</h2>
        <p className="rise" style={d(0.2)}>
          {showcase.body}
        </p>
      </Reveal>
      <Reveal className="deck-stage">
        <div className="deck">
          {layers.map((i) => (
            <div key={i} className="layer" style={{ "--z": `${i * 70}px` } as CSSProperties}>
              {showcase.screens[i] ? (
                <img src={showcase.screens[i]} alt={`${showcase.project} screen ${i + 1}`} />
              ) : (
                <>
                  <Sketch kind={i === 0 ? "grid" : i === 1 ? "detail" : "grid"} />
                  <span className="caption mono">[SCREEN {String(i + 1).padStart(2, "0")}]</span>
                </>
              )}
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal className="show-bottom">
        <div className="rise">
          <h3 className="display">Outcome</h3>
          <p>{showcase.outcome}</p>
        </div>
        <div className="rise" style={d(0.2)}>
          <h3 className="display">Technologies</h3>
          <div className="chips">
            {showcase.technologies.map((t, i) => (
              <span key={i} className="chip mono">
                {t}
              </span>
            ))}
          </div>
          <a href={showcase.href} className="proj-link" style={{ marginTop: 16 }} {...external(showcase.href)}>
            Visit {showcase.project} <Arrow />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <Reveal as="section" className="footer dark" id="contact" threshold={0.1}>
      <div className="footer-top">
        <div className="col">
          <span>
            © {new Date().getFullYear()} {site.name.first} {site.name.last}. All rights reserved.
          </span>
          <span className="muted">{site.location}</span>
          <div className="socials">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} className="link-u" {...external(s.href)}>
                {s.label}
              </a>
            ))}
          </div>
          <div className="contact-row mono">
            <a href={`mailto:${site.email}`} className="link-u">
              Email
            </a>
            <a href={`tel:${site.phone}`} className="link-u">
              Phone
            </a>
          </div>
        </div>
        <nav aria-label="Footer">
          {["About", "Skills", "Projects", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="link-u">
              {l}
            </a>
          ))}
        </nav>
      </div>
      <Name className="wordmark" delay={0.2} />
    </Reveal>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <div className="paper">
          <Projects />
          <Skills />
          <Showcase />
        </div>
      </main>
      <Footer />
    </>
  );
}
