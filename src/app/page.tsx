import type { CSSProperties, ReactNode } from "react";
import { contact, intro, isSet, philosophy, projects, showcase, site, skills } from "@/content";
import { d } from "@/components/delay";
import { Guides } from "@/components/Guides";
import { Intro } from "@/components/Intro";
import { Arrow } from "@/components/Icons";
import { Lines } from "@/components/Lines";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { Scrub } from "@/components/Scrub";
import { Shot } from "@/components/Shot";
import { Stack } from "@/components/Stack";

const external = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {});
const pad2 = (n: number) => String(n).padStart(2, "0");

/**
 * One cell of a section grid. Its top and left edges draw with scroll; `i` sets how far
 * behind the others it starts. `x` puts a + on its top-left corner.
 */
function Cell({ span, i = 0, x, className = "", style, children }: { span: number; i?: number; x?: boolean; className?: string; style?: CSSProperties; children?: ReactNode }) {
  return (
    <div className={`cell s${span} ${className}`} style={{ "--o": Math.min(0.4, i * 0.05).toFixed(2), ...style } as CSSProperties}>
      {x && <i className="x" aria-hidden="true" />}
      {children}
    </div>
  );
}

/** A section grid whose lines follow the scroll. */
function Grid({ className = "", children, id }: { className?: string; children: ReactNode; id?: string }) {
  return (
    <Reveal className={`grid ${className}`} scrub id={id}>
      {children}
    </Reveal>
  );
}

function Head({ n, title, side }: { n: number; title: string; side: ReactNode }) {
  return (
    <Grid className="head">
      <Cell span={8} i={0} x>
        <span className="label" style={{ display: "block", marginBottom: 14 }}>
          {pad2(n)}
        </span>
        <h2 className="mask">
          <span style={d(0.15)}>{title}</span>
        </h2>
      </Cell>
      <Cell span={4} i={2} x>
        <div className="head-side rise" style={d(0.3)}>
          {side}
        </div>
      </Cell>
    </Grid>
  );
}

function Hero() {
  const hasPortrait = isSet(site.portrait);
  return (
    <section className="sec hero" id="top">
      <Grid>
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
        <Cell span={hasPortrait ? 8 : 12} i={2} x className="name">
          <h1>
            <span className="mask">
              <span style={d(0.2)}>{site.name.first}</span>
            </span>
            <span className="mask">
              <span style={d(0.35)}>{site.name.last}</span>
            </span>
          </h1>
        </Cell>
        {hasPortrait && (
          <Cell span={4} i={3} x style={{ padding: 0 }}>
            <div className="portrait">
              <img src={site.portrait} alt={`${site.name.first} ${site.name.last}`} />
            </div>
          </Cell>
        )}
        <Cell span={8} i={4} x>
          <p className="statement rise" style={d(0.5)} id="about">
            {intro.before}
            <span className="u-draw">{intro.underline}</span>
            {intro.after}
          </p>
          <p className="body rise" style={{ ...d(0.65), marginTop: 28 }}>
            {intro.body}
          </p>
        </Cell>
        <Cell span={4} i={5} x>
          <div className="facts">
            {intro.facts.map((f, k) => (
              <div key={f.k} className="fact rise" style={d(0.7 + k * 0.1)}>
                <span className="label">{f.k}</span>
                <b>{f.v}</b>
              </div>
            ))}
          </div>
        </Cell>
      </Grid>
    </section>
  );
}

function Work() {
  return (
    <section className="sec" id="work">
      <Head
        n={1}
        title="Selected work"
        side={
          <>
            <span className="label">Recent projects</span>
            <span className="label">{pad2(projects.length)} in total</span>
          </>
        }
      />
      {projects.map((p, i) => {
        const flip = i % 2 === 1;
        const live = isSet(p.href);
        const num = (
          <Cell key="n" span={1} i={flip ? 2 : 0} className="num-cell">
            <span className="num label">{pad2(i + 1)}</span>
          </Cell>
        );
        const text = (
          <Cell key="t" span={5} i={1} className="txt-cell">
            <div className="proj-text">
              <div>
                <span className="kind label">
                  <span className="m-only">{pad2(i + 1)} · </span>
                  {p.kind}
                </span>
                <h3 className="mask">
                  <span style={d(0.15)}>{p.name}</span>
                </h3>
                <p className="rise" style={d(0.3)}>
                  {p.summary} {p.note && <span className="note">{p.note}.</span>}
                </p>
              </div>
              {live && (
                <a href={p.href} className="go link-u rise" style={d(0.45)} {...external(p.href)}>
                  {p.href.startsWith("#") ? "Read the case study" : "View project"} <Arrow />
                </a>
              )}
            </div>
          </Cell>
        );
        const visual = (
          <Cell key="v" span={6} i={flip ? 0 : 2} className="vis-cell">
            <div className="visual">{isSet(p.image) ? <Shot image={p.image} alt={`${p.name} screenshot`} /> : <Lines variant={i} />}</div>
          </Cell>
        );
        return (
          <Grid key={p.name} className={`proj ${flip ? "flip" : ""}`}>
            {flip ? [visual, text, num] : [num, text, visual]}
          </Grid>
        );
      })}
    </section>
  );
}

function Case() {
  const tech = showcase.technologies.filter(isSet);
  const hasOutcome = isSet(showcase.outcome);
  return (
    <section className="sec case" id="showcase">
      <Head
        n={2}
        title={showcase.project}
        side={
          <>
            <span className="label">Case study</span>
            <span className="label">{projects.find((p) => p.name === showcase.project)?.kind}</span>
          </>
        }
      />
      <Grid>
        <Cell span={7} i={0}>
          <h3 className="rise">{showcase.headline}</h3>
        </Cell>
        <Cell span={5} i={1}>
          <p className="body rise" style={d(0.15)}>
            {showcase.summary}
          </p>
        </Cell>
        {showcase.features.map((f, k) => (
          <Cell key={f.title} span={3} i={2 + k} x className="m6">
            <div className="feature rise" style={d(0.25 + k * 0.1)}>
              <span className="label">{pad2(k + 1)}</span>
              <b>{f.title}</b>
              <span>{f.text}</span>
            </div>
          </Cell>
        ))}
        {(hasOutcome || tech.length > 0 || isSet(showcase.href)) && (
          <>
            <Cell span={hasOutcome ? 7 : 12} i={6}>
              {hasOutcome ? (
                <>
                  <span className="label">Outcome</span>
                  <p className="body rise" style={{ ...d(0.4), marginTop: 16 }}>
                    {showcase.outcome}
                  </p>
                </>
              ) : (
                <CaseLinks tech={tech} />
              )}
            </Cell>
            {hasOutcome && (
              <Cell span={5} i={7}>
                <CaseLinks tech={tech} />
              </Cell>
            )}
          </>
        )}
      </Grid>
    </section>
  );
}

function CaseLinks({ tech }: { tech: string[] }) {
  return (
    <>
      {tech.length > 0 && (
        <>
          <span className="label">Technologies</span>
          <div className="chips">
            {tech.map((t) => (
              <span key={t} className="chip mono">
                {t}
              </span>
            ))}
          </div>
        </>
      )}
      {isSet(showcase.href) && (
        <a href={showcase.href} className="go link-u" {...external(showcase.href)}>
          Visit {showcase.project} <Arrow />
        </a>
      )}
    </>
  );
}

function Skills() {
  return (
    <section className="sec" id="skills">
      <Head n={3} title="Skills" side={<p className="skills-aside">{skills.aside}</p>} />
      <Grid>
        <Cell span={12} i={0}>
          <h3 className="statement rise" style={{ marginBottom: "clamp(24px, 3vw, 48px)" }}>
            {skills.heading}
          </h3>
          <Stack />
        </Cell>
      </Grid>
    </section>
  );
}

function Quote() {
  return (
    <section className="sec quote">
      <Grid>
        <Cell span={8} i={0} x>
          <p className="rise">{philosophy.text}</p>
        </Cell>
        <Cell span={4} i={1} x>
          <p className="more rise" style={d(0.2)}>
            {philosophy.more}
          </p>
        </Cell>
      </Grid>
    </section>
  );
}

function Contact() {
  const socials = site.socials.filter((s) => isSet(s.href));
  const hasEmail = isSet(site.email);
  return (
    <section className="sec contact" id="contact" style={{ marginBottom: 0 }}>
      <Grid>
        <Cell span={8} i={0} x>
          <span className="label" style={{ display: "block", marginBottom: 14 }}>
            04
          </span>
          <h2>
            {contact.heading.map((line, k) => (
              <span key={line} className="mask">
                <span style={d(0.15 + k * 0.15)}>{line}</span>
              </span>
            ))}
          </h2>
          <p className="body rise" style={{ ...d(0.4), marginTop: 24 }}>
            {contact.note}
          </p>
        </Cell>
        <Cell span={4} i={1} x>
          <nav className="links rise" style={d(0.4)} aria-label="Social">
            {socials.map((s) => (
              <a key={s.label} href={s.href} className="link-u" {...external(s.href)}>
                {s.label}
              </a>
            ))}
            {isSet(site.cv) && (
              <a href={site.cv} className="link-u" download>
                Download CV
              </a>
            )}
          </nav>
        </Cell>
        <Cell span={12} i={2} x className="mail-cell">
          <a href={hasEmail ? `mailto:${site.email}` : "#contact"} className="mail">
            <span>{hasEmail ? site.email : "Send me an email"}</span>
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
      </Grid>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Intro />
      <Scrub />
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
