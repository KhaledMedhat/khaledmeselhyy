import type { CSSProperties, ReactNode } from "react";
import { intro, philosophy, projects, showcase, site, skills } from "@/content";
import { d } from "@/components/delay";
import { Guides } from "@/components/Guides";
import { Arrow } from "@/components/Icons";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { Shot } from "@/components/Shot";

const external = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {});
const pad2 = (n: number) => String(n).padStart(2, "0");

/** One cell of a section grid. `i` staggers when its borders draw; `x` puts a + on its top-left corner. */
function Cell({ span, i = 0, x, className = "", style, children }: { span: number; i?: number; x?: boolean; className?: string; style?: CSSProperties; children?: ReactNode }) {
  return (
    <div className={`cell s${span} ${className}`} style={{ ...d(i * 0.09), ...style }}>
      {x && <i className="x" aria-hidden="true" />}
      {children}
    </div>
  );
}

/** A section title row: big title on the left, a note on the right. */
function Head({ n, title, side }: { n: number; title: string; side: ReactNode }) {
  return (
    <Reveal className="grid head">
      <Cell span={8} i={0} x>
        <span className="label" style={{ display: "block", marginBottom: 14 }}>
          {pad2(n)}
        </span>
        <h2 className="mask">
          <span style={d(0.25)}>{title}</span>
        </h2>
      </Cell>
      <Cell span={4} i={1} x>
        <div className="head-side label rise" style={d(0.4)}>
          {side}
        </div>
      </Cell>
    </Reveal>
  );
}

function Hero() {
  return (
    <section className="sec hero" id="top">
      <Reveal className="grid" threshold={0}>
        <Cell span={8} i={0} x>
          <span className="label">{site.role}</span>
        </Cell>
        <Cell span={4} i={1} x>
          <div className="row-between label">
            <span>{site.location}</span>
            <span>
              <i className="dot" aria-hidden="true" />
              Available
            </span>
          </div>
        </Cell>
        <Cell span={12} i={2} x className="name">
          <h1>
            <span className="mask">
              <span style={d(0.3)}>{site.name.first}</span>
            </span>
            <span className="mask">
              <span style={d(0.45)}>{site.name.last}</span>
            </span>
          </h1>
        </Cell>
        <Cell span={8} i={3} x>
          <p className="statement rise" style={d(0.6)} id="about">
            {intro.before}
            <span className="u-draw">{intro.underline}</span>
            {intro.after}
          </p>
        </Cell>
        <Cell span={4} i={4} x style={{ gridRow: "span 2", padding: 0 }}>
          <div className="portrait">
            {site.portrait ? (
              <img src={site.portrait} alt={`${site.name.first} ${site.name.last}`} />
            ) : (
              <>
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" aria-hidden="true">
                  <path className="draw" style={d(0.8)} pathLength={1} d="M0 0L100 100M100 0L0 100" stroke="currentColor" strokeOpacity={0.08} />
                </svg>
                <span className="label">[Your photo]</span>
              </>
            )}
          </div>
        </Cell>
        <Cell span={8} i={5}>
          <p className="body rise" style={d(0.75)}>
            {intro.body}
          </p>
        </Cell>
        {intro.facts.map((f, k) => (
          <Cell key={f.k} span={4} i={6 + k} x>
            <div className="fact rise" style={d(0.8 + k * 0.1)}>
              <span className="label">{f.k}</span>
              <b>{f.v}</b>
            </div>
          </Cell>
        ))}
      </Reveal>
    </section>
  );
}

function Work() {
  return (
    <section className="sec" id="work">
      <Head n={1} title="Selected work" side={<><span>Recent projects</span><span>{pad2(projects.length)} total</span></>} />
      {projects.map((p, i) => (
        <Reveal key={p.name} className="grid proj">
          <Cell span={1} i={0}>
            <span className="num label">{pad2(i + 1)}</span>
          </Cell>
          <Cell span={5} i={1}>
            <div className="proj-text">
              <div>
                <h3 className="mask">
                  <span style={d(0.2)}>{p.name}</span>
                </h3>
                <p className="rise" style={d(0.35)}>
                  {p.summary} {p.note && <span className="note">({p.note})</span>}
                </p>
              </div>
              <a href={p.href} className="go link-u rise" style={d(0.5)} {...external(p.href)}>
                {p.href.startsWith("#") ? "Read the case study" : "Visit project"} <Arrow />
              </a>
            </div>
          </Cell>
          <Cell span={6} i={2}>
            <Shot image={p.image} alt={`${p.name} screenshot`} />
          </Cell>
        </Reveal>
      ))}
    </section>
  );
}

function Case() {
  return (
    <section className="sec case" id="showcase">
      <Head n={2} title={showcase.project} side={<><span>Case study</span><span>{projects[0].name === showcase.project ? "P—01" : ""}</span></>} />
      <Reveal className="grid">
        <Cell span={7} i={0}>
          <h3 className="rise">{showcase.headline}</h3>
        </Cell>
        <Cell span={5} i={1}>
          <p className="body rise" style={d(0.15)}>
            {projects[0].summary}
          </p>
        </Cell>
        {showcase.features.map((f, k) => (
          <Cell key={f.title} span={3} i={2 + k} x className="m6">
            <div className="feature rise" style={d(0.3 + k * 0.1)}>
              <span className="label">{pad2(k + 1)}</span>
              <b>{f.title}</b>
              <span>{f.text}</span>
            </div>
          </Cell>
        ))}
        <Cell span={7} i={6}>
          <span className="label">Outcome</span>
          <p className="body rise" style={{ ...d(0.5), marginTop: 16 }}>
            {showcase.outcome}
          </p>
        </Cell>
        <Cell span={5} i={7}>
          <span className="label">Technologies</span>
          <div className="chips rise" style={d(0.6)}>
            {showcase.technologies.map((t, k) => (
              <span key={k} className="chip mono">
                {t}
              </span>
            ))}
          </div>
          <a href={showcase.href} className="go link-u" {...external(showcase.href)}>
            Visit {showcase.project} <Arrow />
          </a>
        </Cell>
      </Reveal>
    </section>
  );
}

function Skills() {
  const cells = [...skills.list, "& more"];
  return (
    <section className="sec" id="skills">
      <Head n={3} title="Skills" side={<span>{skills.aside}</span>} />
      <Reveal className="grid">
        <Cell span={12} i={0}>
          <h3 className="statement rise" style={{ maxWidth: 980 }}>
            {skills.heading}
          </h3>
        </Cell>
        {cells.map((s, k) => (
          <Cell key={s} span={3} i={1 + k} x className="skill m6">
            <span className="label">{k < skills.list.length ? pad2(k + 1) : "+"}</span>
            <b>{s}</b>
          </Cell>
        ))}
      </Reveal>
    </section>
  );
}

function Quote() {
  return (
    <section className="sec quote">
      <Reveal className="grid">
        <Cell span={8} i={0} x>
          <p className="rise">{philosophy.text}</p>
        </Cell>
        <Cell span={4} i={1} x>
          <p className="more rise" style={d(0.2)}>
            {philosophy.more}
          </p>
        </Cell>
      </Reveal>
    </section>
  );
}

function Contact() {
  return (
    <section className="sec contact" id="contact" style={{ marginBottom: 0 }}>
      <Reveal className="grid">
        <Cell span={8} i={0} x>
          <span className="label" style={{ display: "block", marginBottom: 14 }}>
            04
          </span>
          <h2>
            <span className="mask">
              <span style={d(0.2)}>Let&apos;s work</span>
            </span>
            <span className="mask">
              <span style={d(0.35)}>together.</span>
            </span>
          </h2>
        </Cell>
        <Cell span={4} i={1} x>
          <nav className="links rise" style={d(0.4)} aria-label="Social">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} className="link-u" {...external(s.href)}>
                {s.label}
              </a>
            ))}
            <a href={site.cv} className="link-u" download>
              Download CV
            </a>
          </nav>
        </Cell>
        <Cell span={12} i={2} x className="mail-cell">
          <a href={`mailto:${site.email}`} className="mail">
            <span>{site.email}</span>
            <Arrow />
          </a>
        </Cell>
        <Cell span={4} i={3} className="foot label">
          © {new Date().getFullYear()} {site.name.first} {site.name.last}
        </Cell>
        <Cell span={4} i={4} className="foot label">
          {site.location}
        </Cell>
        <Cell span={4} i={5} className="foot label">
          <a href="#top" className="link-u">
            Back to top ↑
          </a>
        </Cell>
      </Reveal>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Guides />
        <Hero />
        <Work />
        <Case />
        <Skills />
        <Quote />
        <Contact />
      </main>
    </>
  );
}
