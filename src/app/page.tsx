import { about, experience, projects, site, stack } from "@/content";
import { GlobeMount } from "@/components/GlobeMount";
import { Arrow } from "@/components/Icons";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { d } from "@/components/delay";
import { Sketch } from "@/components/Sketch";
import { TiltCard } from "@/components/TiltCard";
import type { Project } from "@/content";
import { Fragment } from "react";

function Screen({ project, height, rest, chrome }: { project: Project; height: number; rest: { x: number; y: number }; chrome?: boolean }) {
  return (
    <TiltCard height={height} rest={rest} chrome={chrome} caption={project.image ? undefined : "[PROJECT SCREENSHOT]"}>
      {project.image ? <img src={project.image} alt={`${project.name} screenshot`} /> : <Sketch kind={project.sketch} />}
    </TiltCard>
  );
}

function Hero() {
  return (
    <Reveal as="section" id="top" className="hero" threshold={0}>
      <svg className="hero-lines" viewBox="0 0 1440 880" preserveAspectRatio="none" fill="none" aria-hidden="true">
        {[0.35, 0.22, 0.14, 0.08].map((o, i) => (
          <path
            key={i}
            className="draw slow"
            style={d(0.2 + i * 0.3)}
            pathLength={1}
            d={`M-20 ${610 + i * 40} C ${220 + i * 20} ${520 + i * 40}, ${380 + i * 20} ${700 + i * 40}, ${640 + i * 20} ${600 + i * 40} S ${1040 + i * 20} ${380 + i * 40}, 1460 ${470 + i * 40}`}
            stroke="currentColor"
            strokeOpacity={o}
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <path className="draw" style={d(1.4)} pathLength={1} d="M80 150H520" stroke="var(--text)" strokeOpacity={0.18} vectorEffect="non-scaling-stroke" />
        <path className="draw" style={d(1.8)} pathLength={1} d="M1360 820V560" stroke="var(--text)" strokeOpacity={0.18} vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="floor-wrap" aria-hidden="true">
        <div className="floor" />
      </div>

      <div className="hero-inner">
        <div className="hero-copy">
          <div className="label muted rise" style={d(0.2)}>
            {site.kicker}
          </div>
          <h1 className="serif rise" style={d(0.4)}>
            {site.name.first}
            <br />
            <span className="italic accent">{site.name.last}</span>
          </h1>
          <svg className="swash" viewBox="0 0 520 28" fill="none" aria-hidden="true">
            <path className="draw" style={d(1.1)} pathLength={1} d="M4 20C120 4 260 4 516 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <p className="rise" style={d(1.1)}>
            {site.tagline}
          </p>
          <div className="cta-row rise" style={d(1.4)}>
            <a href="#work" className="btn btn-solid">
              View selected work <Arrow />
            </a>
            <a href="#contact" className="btn btn-ghost">
              Get in touch
            </a>
          </div>
        </div>
        <div className="globe">
          <GlobeMount />
          <div className="coords mono">
            {site.location.coords.map((c) => (
              <div key={c}>{c}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="scroll-cue mono">
        <svg width="14" height="40" viewBox="0 0 14 40" fill="none" aria-hidden="true" style={{ color: "var(--accent)" }}>
          <path className="draw" style={d(2.2)} pathLength={1} d="M7 0V38M2 32L7 38L12 32" stroke="currentColor" strokeWidth="1" />
        </svg>
        Scroll to explore
      </div>
    </Reveal>
  );
}

function Strip() {
  return (
    <section className="strip serif" aria-label="Toolkit">
      <span className="label mono">Toolkit</span>
      {stack.map((s, i) => (
        <Fragment key={i}>
          {i > 0 && <span className="star" aria-hidden="true">✦</span>}
          <span className={i % 2 ? "italic" : ""}>{s}</span>
        </Fragment>
      ))}
    </section>
  );
}

function ProjectMeta({ p, index, feature }: { p: Project; index: number; feature?: boolean }) {
  const code = `P—${String(index + 1).padStart(2, "0")}`;
  return feature ? (
    <div className="project">
      <div className="mono muted" style={{ fontSize: 13 }}>
        {code} · {p.year}
      </div>
      <h3 className="serif">{p.name}</h3>
      <p>{p.summary}</p>
      <div className="tags">
        {p.tech.map((t, i) => (
          <span key={i} className="tag mono">
            {t}
          </span>
        ))}
      </div>
      <a href={p.href} className="link">
        Read case study <Arrow />
      </a>
    </div>
  ) : (
    <>
      <div className="project-row">
        <h3 className="serif">
          <a href={p.href}>{p.name}</a>
        </h3>
        <span className="mono muted" style={{ fontSize: 13 }}>
          {code} · {p.year}
        </span>
      </div>
      <p>{p.summary}</p>
    </>
  );
}

function Work() {
  const [featured, ...rest] = projects;
  return (
    <section id="work" className="section">
      <Reveal className="section-head">
        <div>
          <div className="label accent rise">01 — Selected work</div>
          <h2 className="serif rise" style={d(0.15)}>
            Things I&apos;ve <span className="italic">built</span>
          </h2>
        </div>
        <p className="rise" style={d(0.3)}>
          A few projects where the details mattered. Move over a frame to turn it in space.
        </p>
      </Reveal>

      {featured && (
        <Reveal as="article" className="feature">
          <Screen project={featured} height={520} rest={{ x: 4, y: 12 }} chrome />
          <ProjectMeta p={featured} index={0} feature />
        </Reveal>
      )}

      <div className="pair">
        {rest.map((p, i) => (
          <Reveal as="article" key={i} className="project">
            <Screen project={p} height={380} rest={{ x: 5, y: i % 2 ? 10 : -10 }} />
            <ProjectMeta p={p} index={i + 1} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about">
      <Reveal className="about-copy">
        <div className="label accent rise">02 — About</div>
        <p className="serif rise" style={d(0.15)}>
          {about.lead} <span className="italic muted">{about.body}</span>
        </p>
        <div className="stats rise" style={d(0.3)}>
          {about.stats.map((s) => (
            <div key={s.label}>
              <span className="serif">{s.value}</span>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal id="experience" className="timeline">
        <div className="label accent">03 — Experience</div>
        <svg className="rail" viewBox="0 0 12 100" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path className="draw slow" pathLength={1} d="M6 0V100" stroke="currentColor" strokeOpacity={0.6} vectorEffect="non-scaling-stroke" />
        </svg>
        {experience.map((j, i) => (
          <div key={i} className="job rise" style={d(0.3 + i * 0.25)}>
            <span className="mono muted" style={{ fontSize: 13 }}>
              {j.period}
            </span>
            <h3 className="serif">
              {j.role} <span className="italic muted">at</span> {j.company}
            </h3>
            <p>{j.summary}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

function Contact() {
  const external = (href: string) => href.startsWith("http");
  return (
    <Reveal as="section" id="contact" className="contact">
      <svg className="contact-rings" viewBox="0 0 1440 700" fill="none" aria-hidden="true">
        <ellipse className="draw slow" style={d(0.1)} pathLength={1} cx="720" cy="330" rx="560" ry="200" stroke="currentColor" strokeOpacity={0.18} />
        <ellipse className="draw slow" style={d(0.6)} pathLength={1} cx="720" cy="330" rx="440" ry="150" stroke="var(--text)" strokeOpacity={0.08} />
        <ellipse className="draw slow" style={d(1.1)} pathLength={1} cx="720" cy="330" rx="660" ry="250" stroke="var(--text)" strokeOpacity={0.06} />
      </svg>
      <div className="label accent rise" style={{ position: "relative" }}>
        04 — Contact
      </div>
      <h2 className="serif rise" style={d(0.2)}>
        Let&apos;s build
        <br />
        <span className="italic accent">something</span> quiet
        <br />
        &amp; remarkable.
      </h2>
      <a href={`mailto:${site.email}`} className="mail rise" style={d(0.4)}>
        {site.email}
        <svg viewBox="0 0 320 12" fill="none" aria-hidden="true">
          <path className="draw" style={d(1.2)} pathLength={1} d="M2 8C90 2 220 2 318 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </a>
      <footer className="footer mono">
        <span>
          © {new Date().getFullYear()} {site.name.first} {site.name.last}
        </span>
        <nav aria-label="Social">
          {site.socials.map((s) => (
            <a key={s.label} href={s.href} {...(external(s.href) ? { target: "_blank", rel: "noreferrer" } : {})}>
              {s.label}
            </a>
          ))}
        </nav>
        <a href="#top">Back to top ↑</a>
      </footer>
    </Reveal>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Strip />
        <Work />
        <About />
        <Contact />
      </main>
    </>
  );
}
