"use client";

import { useId, useState, type CSSProperties } from "react";
import { isSet, type Project } from "@/content";
import { d } from "./delay";
import { Cell, Grid, external, pad2 } from "./Grid";
import { Arrow } from "./Icons";
import { Lines } from "./Lines";
import { Shot } from "./Shot";

/**
 * A project row. "Details" unfolds a spec sheet beneath it: a strip of cells whose lines
 * draw themselves in as it opens (type and role, numbered highlights, stack, links),
 * and fold away again when closed.
 */
export function ProjectRow({ p, i }: { p: Project; i: number }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const flip = i % 2 === 1;
  const live = isSet(p.href);
  const facts = [
    { k: "Type", v: p.kind },
    { k: "Role", v: p.role },
    { k: "Year", v: p.year },
  ].filter((f): f is { k: string; v: string } => isSet(f.v));
  const stack = (p.stack ?? []).filter(isSet);

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
        <div className="proj-actions rise" style={d(0.45)}>
          <button type="button" className="details-btn" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
            <span>{open ? "Close" : "Details"}</span>
            <i className="plus" aria-hidden="true" />
          </button>
          {live && (
            <a href={p.href} className="go link-u" {...external(p.href)}>
              View project <Arrow />
            </a>
          )}
        </div>
      </div>
    </Cell>
  );
  const visual = (
    <Cell key="v" span={6} i={flip ? 0 : 2} className="vis-cell">
      <div className="visual">{isSet(p.image) ? <Shot image={p.image} alt={`${p.name} screenshot`} /> : <Lines variant={i} />}</div>
    </Cell>
  );

  return (
    <Grid className={`proj ${flip ? "flip" : ""} ${open ? "open" : ""}`}>
      {flip ? [visual, text, num] : [num, text, visual]}
      <div className="details s12" id={id} role="region" aria-label={`${p.name} details`}>
        <div className="details-inner" inert={!open}>
          <div className="spec">
            <div className="spec-cell s3" style={{ "--k": 0 } as CSSProperties}>
              <span className="label">Overview</span>
              <dl>
                {facts.map((f) => (
                  <div key={f.k}>
                    <dt className="label">{f.k}</dt>
                    <dd>{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={`spec-cell ${stack.length > 0 || live ? "s5" : "s9"}`} style={{ "--k": 1 } as CSSProperties}>
              <span className="label">Highlights</span>
              <ol>
                {p.highlights.map((h, k) => (
                  <li key={h} style={{ "--k": k + 1 } as CSSProperties}>
                    <span className="label">{pad2(k + 1)}</span>
                    {h}
                  </li>
                ))}
              </ol>
            </div>
            {(stack.length > 0 || live) && (
              <div className="spec-cell s4" style={{ "--k": 2 } as CSSProperties}>
                <span className="label">{stack.length ? "Stack" : "Links"}</span>
                {stack.length > 0 && (
                  <div className="spec-stack">
                    {stack.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                )}
                {live && (
                  <a href={p.href} className="go link-u" {...external(p.href)}>
                    Open {p.name} <Arrow />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Grid>
  );
}
