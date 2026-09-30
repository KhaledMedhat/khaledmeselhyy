// Everything you need to personalise lives in this file.
// Values in [BRACKETS] are placeholders: until you replace them, the site simply leaves them out.

export const isSet = (v?: string | null): v is string => !!v && !v.trim().startsWith("[");

export const site = {
  name: { first: "Khaled", last: "Meselhy" },
  role: "Full-Stack Developer",
  location: "Cairo, Egypt",
  title: "Khaled Meselhy — Full-Stack Developer",
  description:
    "Khaled Meselhy is a full-stack developer in Cairo, Egypt, building web applications with React, Next.js, Node.js, MongoDB and PostgreSQL.",
  /** Put your photo in /public (e.g. /public/khaled.jpg) and set its path here. */
  portrait: "[/khaled.jpg]",
  /** Put your CV in /public (e.g. /public/khaled-meselhy-cv.pdf) and set its path here. */
  cv: "[CV URL]",
  email: "[YOUR EMAIL]",
  socials: [
    { label: "GitHub", href: "https://github.com/KhaledMedhat" },
    { label: "LinkedIn", href: "[LINKEDIN URL]" },
    { label: "X", href: "[X URL]" },
    { label: "Instagram", href: "[INSTAGRAM URL]" },
  ],
};

export const intro = {
  // The middle part gets an underline that draws in.
  before: "I'm Khaled, a full-stack developer who turns ideas into ",
  underline: "reliable, well-crafted web products.",
  after: "",
  body: "For more than three years I've built applications with React, Next.js, Node.js, MongoDB and PostgreSQL — owning the work end to end, from polished interfaces to the APIs and data models behind them.",
  facts: [
    { k: "Experience", v: "3+ years" },
    { k: "Based in", v: "Cairo, Egypt" },
    { k: "Focus", v: "Full-stack web applications" },
  ],
};

export type Project = {
  name: string;
  kind: string;
  summary: string;
  href: string;
  /** Screenshot in /public, e.g. "/projects/gallery-studio.jpg". */
  image?: string;
  note?: string;
};

export const projects: Project[] = [
  {
    name: "Gallery Studio",
    kind: "Social platform",
    summary:
      "A social platform where creators publish visual work and audiences respond through posts and comments — an Instagram-style experience built from the ground up.",
    href: "#showcase",
  },
  {
    name: "Audiophile",
    kind: "E-commerce",
    summary:
      "An online store for premium audio equipment, letting customers browse and purchase products across a wide range of brands and models.",
    href: "[AUDIOPHILE URL]",
    note: "Frontend Mentor challenge",
  },
  {
    name: "Personal Portfolio",
    kind: "Client website",
    summary:
      "A portfolio site built for a client to present their work, skills and personality — professional in structure, distinctive in feel.",
    href: "[PORTFOLIO URL]",
  },
];

export const showcase = {
  project: "Gallery Studio",
  headline: "Bringing creators and audiences together through real-time visual posts.",
  summary:
    "Gallery Studio gives creators a single place to publish their work and gives audiences a direct way to engage with it. Posts, comments and reactions come together in one focused, visual feed.",
  features: [
    { title: "Visual storytelling", text: "Image-led posts that put the creator's work first." },
    { title: "Conversation", text: "Comments that turn every post into a discussion." },
    { title: "Real-time", text: "New posts and reactions appear as they happen." },
    { title: "Community", text: "One platform connecting the people who make with the people who follow." },
  ],
  outcome: "[Paste the Gallery Studio outcome paragraph from your current site here.]",
  technologies: ["[Tech]", "[Tech]", "[Tech]"],
  href: "[GALLERY STUDIO URL]",
};

export const skills = {
  heading: "The stack I build with",
  aside: "Always learning — exploring new technologies and building side projects to keep sharpening the craft.",
  /** The layers of the stack diagram, top to bottom. */
  layers: [
    { name: "Languages", items: ["JavaScript", "TypeScript", "HTML", "CSS"] },
    { name: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
    { name: "Backend", items: ["Node.js", "NestJS"] },
    { name: "Data", items: ["MongoDB", "PostgreSQL"] },
  ],
};

export const philosophy = {
  text: "I build applications that don't just work — they feel right to use.",
  more: "Clean code, strong performance and smooth interactions: the details that make people come back.",
};

export const contact = {
  heading: ["Let's work", "together."],
  note: "Open to new opportunities and collaborations.",
};
