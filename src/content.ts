// Everything you need to personalise lives in this file.
// Values in [BRACKETS] are placeholders to replace.

export const site = {
  name: { first: "Khaled", last: "Meselhy" },
  role: "Full Stack Web Developer",
  location: "Cairo, Egypt",
  title: "Khaled Meselhy — Full Stack Web Developer",
  description:
    "Khaled Meselhy is a Full Stack Web Developer in Cairo, Egypt, building with React, Next.js, Node.js, MongoDB and PostgreSQL.",
  /** Put your photo in /public (e.g. /public/khaled.jpg) and set its path here. */
  portrait: undefined as string | undefined,
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
  before: "Hey, I'm Khaled — a curious Full Stack Web Developer who loves ",
  underline: "turning ideas into real, working products.",
  after: "",
  body: "With 3+ years of experience, I've been coding with React, Next.js, Node.js, MongoDB and PostgreSQL, building everything from sleek frontends to reliable backends.",
  facts: [
    { k: "Experience", v: "3+ years" },
    { k: "Based in", v: "Cairo, Egypt" },
    { k: "Focus", v: "Full stack web" },
  ],
};

export type Project = {
  name: string;
  summary: string;
  href: string;
  /** Screenshot in /public, e.g. "/projects/gallery-studio.jpg". Without it a drawn wireframe shows. */
  image?: string;
  note?: string;
};

export const projects: Project[] = [
  {
    name: "Gallery Studio",
    summary:
      "A modern web application that connects creators and audiences through visual storytelling — showcasing and interacting with posts and comments, similar to Instagram.",
    href: "#showcase",
  },
  {
    name: "Audiophile",
    summary:
      "A simple e-commerce web application for high-end audio equipment. Browse and purchase gear from a wide range of brands and models.",
    href: "[AUDIOPHILE URL]",
    note: "Frontend Mentor Challenge",
  },
  {
    name: "Personal Portfolio",
    summary:
      "A modern portfolio website designed to connect work with opportunity, showcasing a client's work, skills and personality in a professional yet visually appealing way.",
    href: "[PORTFOLIO URL]",
  },
];

export const showcase = {
  project: "Gallery Studio",
  headline: "Bringing creators and audiences together through real-time visual posts.",
  // Feature cells, taken from how the project is described.
  features: [
    { title: "Visual storytelling", text: "Creators share their work as image-led posts." },
    { title: "Comments", text: "Audiences respond and start conversations under every post." },
    { title: "Real-time", text: "New posts and reactions arrive as they happen." },
    { title: "Creators & audiences", text: "One place for the people who make and the people who watch." },
  ],
  outcome: "[Paste the Gallery Studio outcome paragraph from your current site here.]",
  technologies: ["[Tech]", "[Tech]", "[Tech]", "[Tech]", "[Tech]", "[Tech]"],
  href: "[GALLERY STUDIO URL]",
};

export const skills = {
  heading: "When I'm not coding, I'm exploring new tech and experimenting with side projects.",
  aside: "Or actually gaming. My goal? Keep learning, keep improving, and keep building things that make an impact.",
  list: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "NestJS", "Tailwind CSS", "HTML", "CSS", "MongoDB", "PostgreSQL"],
};

export const philosophy = {
  text: "What drives me is creating apps that don't just work but also feel great to use.",
  more: "I care about clean code, performance, and smooth experiences — the kind of details that make people enjoy coming back.",
};
