// Everything you need to personalise lives in this file.
// Replace every value in [BRACKETS] with your own details.

export const site = {
  name: { first: "Khaled", last: "Meselhy" },
  title: "Khaled Meselhy — Software Engineer",
  description: "[A one-sentence description of you for search engines and link previews.]",
  kicker: "Portfolio — Vol. 02 / 2026",
  tagline: "Software engineer crafting interfaces with depth — [ONE LINE ON WHAT YOU BUILD AND FOR WHOM].",
  available: true,
  location: { label: "[YOUR CITY]", coords: ["30.04° N", "31.23° E"] },
  email: "[YOUR EMAIL]",
  socials: [
    { label: "GitHub", href: "https://github.com/KhaledMedhat" },
    { label: "LinkedIn", href: "[LINKEDIN URL]" },
    { label: "Resume", href: "[RESUME URL]" },
  ],
};

export const stack: string[] = ["[Stack 01]", "[Stack 02]", "[Stack 03]", "[Stack 04]", "[Stack 05]", "[Stack 06]"];

export type Project = {
  name: string;
  year: string;
  summary: string;
  tech: string[];
  href: string;
  /** Optional screenshot in /public, e.g. "/projects/one.jpg". Without it a line sketch is drawn. */
  image?: string;
  sketch: "chart" | "orbit" | "layout";
};

export const projects: Project[] = [
  {
    name: "[Project Name]",
    year: "[YEAR]",
    summary: "[Two lines: the problem, what you built, and the result it had.]",
    tech: ["[Tech]", "[Tech]", "[Tech]"],
    href: "#",
    sketch: "chart",
  },
  {
    name: "[Project Name]",
    year: "[YEAR]",
    summary: "[One line on what it is and your role in it.]",
    tech: ["[Tech]", "[Tech]"],
    href: "#",
    sketch: "orbit",
  },
  {
    name: "[Project Name]",
    year: "[YEAR]",
    summary: "[One line on what it is and your role in it.]",
    tech: ["[Tech]", "[Tech]"],
    href: "#",
    sketch: "layout",
  },
];

export const about = {
  lead: "I'm Khaled —",
  body: "[a two-sentence introduction: what you build, who you build it for, and what you care about in the craft.]",
  stats: [
    { value: "[N]+", label: "Years building" },
    { value: "[N]", label: "Projects shipped" },
  ],
};

export const experience = [
  { period: "[YEAR] — Present", role: "[Role]", company: "[Company]", summary: "[What you own there and one outcome you're proud of.]" },
  { period: "[YEAR] — [YEAR]", role: "[Role]", company: "[Company]", summary: "[What you owned and one outcome.]" },
  { period: "[YEAR] — [YEAR]", role: "[Role]", company: "[Company]", summary: "[What you owned and one outcome.]" },
];
