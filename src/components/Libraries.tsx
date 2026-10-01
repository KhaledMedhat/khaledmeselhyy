"use client";

import { useState, type CSSProperties } from "react";
import {
  siClerk,
  siDocker,
  siDrizzle,
  siFirebase,
  siFramer,
  siGit,
  siGsap,
  siJsonwebtokens,
  siPrisma,
  siReactquery,
  siRedux,
  siResend,
  siShadcnui,
  siSocketdotio,
  siStorybook,
  siStripe,
  siTrpc,
} from "simple-icons";
import { libraries } from "@/content";
import { pad2 } from "./Grid";

// Brand logos from Simple Icons (CC0), drawn in the site's off-white.
const ICONS: Record<string, string> = {
  Redux: siRedux.path,
  "React Query": siReactquery.path,
  tRPC: siTrpc.path,
  Prisma: siPrisma.path,
  Drizzle: siDrizzle.path,
  Clerk: siClerk.path,
  JWT: siJsonwebtokens.path,
  "shadcn/ui": siShadcnui.path,
  GSAP: siGsap.path,
  "Framer Motion": siFramer.path,
  Stripe: siStripe.path,
  Resend: siResend.path,
  "Socket.IO": siSocketdotio.path,
  Firebase: siFirebase.path,
  Docker: siDocker.path,
  Git: siGit.path,
  Storybook: siStorybook.path,
};

/** NextAuth.js has no Simple Icons logo, so it gets a plain shield-and-keyhole mark in the same style. */
function ShieldMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 1.5 3 5v6.5c0 5.4 3.8 9.7 9 11 5.2-1.3 9-5.6 9-11V5l-9-3.5Zm0 6a2.5 2.5 0 0 1 1.25 4.66V16h-2.5v-3.84A2.5 2.5 0 0 1 12 7.5Z" />
    </svg>
  );
}

type Group = (typeof libraries.groups)[number];

/**
 * Libraries as an index sheet: a grid of cells whose lines draw with scroll, each with the
 * library's logo, name and role. The filter row dims everything outside the chosen group.
 */
export function Libraries() {
  const [group, setGroup] = useState<Group | null>(null);

  return (
    <div className="libs">
      <div className="libs-filter" role="group" aria-label="Filter libraries">
        {[null, ...libraries.groups].map((g) => (
          <button key={g ?? "all"} type="button" className={`libs-tab ${group === g ? "on" : ""}`} aria-pressed={group === g} onClick={() => setGroup(g)}>
            {g ?? "All"}
            <span className="label">{pad2(g ? libraries.items.filter((l) => l.group === g).length : libraries.items.length)}</span>
          </button>
        ))}
      </div>
      <ul className="libs-grid">
        {libraries.items.map((lib, i) => {
          const dim = group !== null && lib.group !== group;
          return (
            <li key={lib.name} className={`lib ${dim ? "dim" : ""}`} style={{ "--o": (0.05 + (i % 6) * 0.04 + Math.floor(i / 6) * 0.08).toFixed(2) } as CSSProperties}>
              <span className="lib-top label">
                <span>{pad2(i + 1)}</span>
                <span>{lib.role}</span>
              </span>
              <span className="lib-logo">
                {ICONS[lib.name] ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d={ICONS[lib.name]} />
                  </svg>
                ) : (
                  <ShieldMark />
                )}
              </span>
              <span className="lib-name">{lib.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
