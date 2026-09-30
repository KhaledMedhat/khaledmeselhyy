import { intro, philosophy, projects, showcase, site } from "@/content";
import { d } from "@/components/delay";
import { Arrow } from "@/components/Icons";
import { LineArt } from "@/components/LineArt";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { Ridges } from "@/components/Ridges";
import { SkillsNet } from "@/components/Skills";
import { Thread } from "@/components/Thread";

const external = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {});
const hair = { stroke: "currentColor", strokeOpacity: 0.16 } as const;

/** A knot the page thread passes through. */
const Knot = () => <span className="knot" data-thread="" aria-hidden="true" />;

/** A horizontal rule that draws itself. */
function Rule({ className = "rule", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <svg className={className} viewBox="0 0 100 2" preserveAspectRatio="none" fill="none" aria-hidden="true">
      <path className="draw slow" style={d(delay)} pathLength={1} d="M0 1H100" {...hair} />
    </svg>
  );
}

function SectionHead({ n, title, id }: { n: string; title: string; id?: string }) {
  return (
    <Reveal className="sec-head" id={id}>
      <Knot />
      <span className="label">
        <span className="num">{n}</span> — {title}
      </span>
      <Rule delay={0.2} />
    </Reveal>
  );
}

function Hero() {
  return (
    <Reveal as="section" id="top" className="hero" threshold={0}>
      <Ridges />
      <div className="hero-copy">
        <div className="hero-kicker label rise" style={d(0.1)}>
          <svg viewBox="0 0 64 2" fill="none" aria-hidden="true">
            <path className="draw" style={d(0.2)} pathLength={1} d="M0 1H64" stroke="currentColor" />
          </svg>
          {site.role} · {site.location}
        </div>
        <h1 style={{ margin: 0 }}>
          <svg className="name-svg" viewBox="0 0 980 400" role="img" aria-label={`${site.name.first} ${site.name.last}`}>
            <text className="draw-text" style={d(0.3)} x="0" y="170">
              {site.name.first}
            </text>
            <text className="draw-text it" style={{ ...d(0.7), color: "var(--accent)" }} x="120" y="360">
              {site.name.last}
            </text>
          </svg>
        </h1>
      </div>
      <div className="hero-foot label">
        <span className="status rise" style={d(1.4)}>
          <i /> Open to new work
        </span>
        <span className="knot-wrap">
          <Knot />
        </span>
        <span className="scroll-hint rise" style={d(1.6)}>
          Scroll — follow the line
        </span>
      </div>
    </Reveal>
  );
}

function About() {
  return (
    <section className="sec" id="about">
      <SectionHead n="01" title="About" />
      <Reveal>
        <p className="statement serif rise">
          {intro.before}
          <span className="u-draw italic">
            {intro.underline}
          </span>
          {intro.after}
        </p>
      </Reveal>
      <Reveal className="about-grid">
        <p className="rise">{intro.body}</p>
        <ul className="facts">
          {intro.facts.map((f, i) => (
            <li key={f.k} className="rise" style={d(0.15 * i)}>
              <span className="k mono">{f.k}</span>
              <span>{f.v}</span>
              <svg viewBox="0 0 100 2" preserveAspectRatio="none" fill="none" aria-hidden="true">
                <path className="draw" style={d(0.2 + 0.15 * i)} pathLength={1} d="M0 1H100" {...hair} />
              </svg>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

function Work() {
  return (
    <section className="sec" id="work">
      <SectionHead n="02" title="Selected work" />
      <div className="rows">
        {projects.map((p, i) => (
          <Reveal as="article" key={p.name} className="row">
            <span className="guide l" aria-hidden="true" />
            <span className="guide r" aria-hidden="true" />
            <span className="row-num label">P—{String(i + 1).padStart(2, "0")}</span>
            <div className="row-text">
              <h3 className="serif rise">
                <a href={p.href} {...external(p.href)}>
                  {p.name}
                </a>
              </h3>
              <p className="rise" style={d(0.15)}>
                {p.summary} {p.note && <span className="note">({p.note})</span>}
              </p>
              <span className="go rise" style={d(0.3)}>
                {p.href.startsWith("#") ? "Read the case study" : "Visit project"} <Arrow />
              </span>
            </div>
            <div className="art">
              <LineArt kind={p.art} />
            </div>
            <Rule />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// Diagram geometry (viewBox 1000 × 620): where each callout's leader line starts on the phone and ends at its label.
const leaders = [
  { from: [432, 150], elbow: [330, 150], to: [250, 104], pos: { left: "0%", top: "11%" } },
  { from: [440, 430], elbow: [330, 430], to: [250, 400], pos: { left: "0%", top: "59%" } },
  { from: [568, 210], elbow: [670, 210], to: [750, 160], pos: { left: "76%", top: "20%" } },
  { from: [560, 480], elbow: [670, 480], to: [750, 452], pos: { left: "76%", top: "67%" } },
];

function CaseStudy() {
  return (
    <section className="sec" id="showcase">
      <SectionHead n="03" title={`${showcase.project} — case study`} />
      <Reveal className="case-top">
        <h2 className="serif rise">{showcase.headline}</h2>
        <p className="rise" style={d(0.2)}>
          {projects[0].summary}
        </p>
      </Reveal>
      <Reveal className="diagram" threshold={0.3}>
        <svg viewBox="0 0 1000 620" fill="none" aria-hidden="true">
          {/* dimension lines */}
          <path className="draw" style={d(0)} pathLength={1} d="M420 14H580M420 8V20M580 8V20" {...hair} strokeOpacity={0.3} />
          <path className="draw" style={d(0.1)} pathLength={1} d="M612 40V580M606 40H618M606 580H618" {...hair} strokeOpacity={0.3} />
          {/* phone */}
          <path className="draw slow" style={d(0.2)} pathLength={1} d="M444 40H556Q580 40 580 64V556Q580 580 556 580H444Q420 580 420 556V64Q420 40 444 40Z" stroke="currentColor" strokeWidth="1.4" />
          <path className="draw fast" style={d(0.8)} pathLength={1} d="M482 56H518" {...hair} strokeOpacity={0.5} />
          {/* feed */}
          <path className="draw" style={d(0.9)} pathLength={1} d="M436 90H564V210H436Z" {...hair} strokeOpacity={0.45} />
          <path className="draw" style={d(1)} pathLength={1} d="M436 190L470 150L498 176L520 158L564 196" stroke="currentColor" strokeOpacity={0.8} />
          <path className="draw" style={d(1.1)} pathLength={1} d="M436 228H530M436 244H500" {...hair} strokeOpacity={0.45} />
          <path className="draw" style={d(1.2)} pathLength={1} d="M436 272H564V392H436Z" {...hair} strokeOpacity={0.45} />
          <circle className="draw" style={d(1.3)} pathLength={1} cx="500" cy="332" r="30" {...hair} strokeOpacity={0.6} />
          <path className="draw" style={d(1.4)} pathLength={1} d="M440 418C440 412 448 410 451 416C454 410 462 412 462 418C462 426 451 432 451 432C451 432 440 426 440 418Z" stroke="var(--accent)" />
          <path className="draw" style={d(1.5)} pathLength={1} d="M476 412H502V428H484L478 434V428H476Z" {...hair} strokeOpacity={0.7} />
          <path className="draw" style={d(1.6)} pathLength={1} d="M436 460H564M436 476H540M436 492H556" {...hair} strokeOpacity={0.35} />
          <path className="draw" style={d(1.7)} pathLength={1} d="M436 540H564" {...hair} strokeOpacity={0.35} />
          {/* leaders */}
          {leaders.map((l, i) => (
            <g key={i}>
              <circle className="draw fast" style={d(1.8 + i * 0.2)} pathLength={1} cx={l.from[0]} cy={l.from[1]} r="5" stroke="var(--accent)" />
              <path
                className="draw"
                style={d(1.9 + i * 0.2)}
                pathLength={1}
                d={`M${l.from[0]} ${l.from[1]}L${l.elbow[0]} ${l.elbow[1]}L${l.to[0]} ${l.to[1]}`}
                stroke="var(--accent)"
                strokeOpacity={0.8}
               
              />
            </g>
          ))}
        </svg>
        {showcase.features.map((f, i) => (
          <div key={f.title} className={`callout rise ${i > 1 ? "right" : ""}`} style={{ ...leaders[i].pos, ...d(2.2 + i * 0.2) }}>
            <span className="label">{String(i + 1).padStart(2, "0")}</span>
            <b>{f.title}</b>
            <span>{f.text}</span>
          </div>
        ))}
      </Reveal>
      <ul className="callouts-list">
        {showcase.features.map((f) => (
          <li key={f.title}>
            <b>{f.title}</b>
            <span>{f.text}</span>
          </li>
        ))}
      </ul>
      <Reveal className="case-bottom">
        <div className="rise">
          <h3 className="label accent">Outcome</h3>
          <p>{showcase.outcome}</p>
        </div>
        <div className="rise" style={d(0.2)}>
          <h3 className="label accent">Technologies</h3>
          <div className="chips">
            {showcase.technologies.map((t, i) => (
              <span key={i} className="chip mono">
                {t}
              </span>
            ))}
          </div>
          <a href={showcase.href} className="go-link" {...external(showcase.href)}>
            Visit {showcase.project} <Arrow />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function Skills() {
  return (
    <section className="sec" id="skills">
      <SectionHead n="04" title="Skills" />
      <Reveal>
        <SkillsNet />
      </Reveal>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="sec">
      <Reveal className="quote">
        <svg className="marks" viewBox="0 0 88 64" fill="none" aria-hidden="true">
          <path className="draw" pathLength={1} d="M34 6C16 12 6 26 6 42C6 52 12 58 20 58C28 58 34 52 34 44C34 36 28 31 20 31C16 31 13 32 11 34" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path className="draw" style={d(0.3)} pathLength={1} d="M80 6C62 12 52 26 52 42C52 52 58 58 66 58C74 58 80 52 80 44C80 36 74 31 66 31C62 31 59 32 57 34" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <p className="serif rise">
          {philosophy.text.split(" but ")[0]} <span className="italic accent">but {philosophy.text.split(" but ")[1]}</span>
        </p>
        <p className="more rise" style={d(0.2)}>
          {philosophy.more}
        </p>
      </Reveal>
    </section>
  );
}

function Contact() {
  const rays = Array.from({ length: 44 }, (_, i) => {
    const a = (i / 44) * Math.PI * 2 + 0.03;
    const c = Math.cos(a);
    const s = Math.sin(a);
    return { d: `M${720 + c * 1100} ${450 + s * 700}L${720 + c * 420} ${450 + s * 250}`, delay: (i % 11) * 0.08 + Math.floor(i / 11) * 0.05, gold: i % 11 === 3 };
  });
  return (
    <Reveal as="section" className="contact" id="contact" threshold={0.2}>
      <svg className="converge" viewBox="0 0 1440 900" fill="none" aria-hidden="true">
        {rays.map((r, i) => (
          <path
            key={i}
            className="draw slow"
            style={d(r.delay)}
            pathLength={1}
            d={r.d}
            stroke={r.gold ? "var(--accent)" : "currentColor"}
            strokeOpacity={r.gold ? 0.7 : 0.12}
           
          />
        ))}
        <ellipse className="draw slow" style={d(0.8)} pathLength={1} cx="720" cy="450" rx="420" ry="250" stroke="currentColor" strokeOpacity={0.14} />
      </svg>
      <div className="sec-head">
        <span className="label">
          <span className="num">05</span> — Contact
        </span>
        <Rule delay={0.2} />
      </div>
      <div className="contact-center">
        <Knot />
        <h2 className="serif rise" style={d(0.4)}>
          Let&apos;s build something
          <br />
          <span className="italic accent">people come back to.</span>
        </h2>
        <a href={`mailto:${site.email}`} className="mail link-u rise" style={d(0.6)}>
          {site.email}
        </a>
        <nav className="socials rise" style={d(0.8)} aria-label="Social">
          {site.socials.map((s) => (
            <a key={s.label} href={s.href} className="link-u" {...external(s.href)}>
              {s.label}
            </a>
          ))}
          <a href={site.cv} className="link-u" download>
            Download CV
          </a>
        </nav>
      </div>
      <footer className="foot mono">
        <Rule className="" />
        <span>
          © {new Date().getFullYear()} {site.name.first} {site.name.last}
        </span>
        <span>{site.location}</span>
        <a href="#top" className="link-u">
          Back to top ↑
        </a>
      </footer>
    </Reveal>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Thread />
        <Hero />
        <About />
        <Work />
        <CaseStudy />
        <Skills />
        <Philosophy />
        <Contact />
      </main>
    </>
  );
}
