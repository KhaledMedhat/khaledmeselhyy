import type { ReactNode } from "react";
import { contact, intro, isSet, philosophy, projects, site, skills } from "@/content";
import { d } from "@/components/delay";
import { Cell, Grid, external, pad2 } from "@/components/Grid";
import { Guides } from "@/components/Guides";
import { Intro } from "@/components/Intro";
import { Arrow } from "@/components/Icons";
import { Nav } from "@/components/Nav";
import { Scrub } from "@/components/Scrub";
import { ProjectRow } from "@/components/ProjectRow";
import { Stack } from "@/components/Stack";

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
      {projects.map((p, i) => (
        <ProjectRow key={p.name} p={p} i={i} />
      ))}
    </section>
  );
}

function Skills() {
  return (
    <section className="sec" id="skills">
      <Head n={2} title="Skills" side={<p className="skills-aside">{skills.aside}</p>} />
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
            03
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
        <Skills />
        <Quote />
        <Contact />
      </main>
    </>
  );
}
