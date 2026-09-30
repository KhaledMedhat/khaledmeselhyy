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
  phone: "[YOUR PHONE]",
  socials: [
    { label: "GitHub", href: "https://github.com/KhaledMedhat" },
    { label: "LinkedIn", href: "[LINKEDIN URL]" },
    { label: "X", href: "[X URL]" },
    { label: "Instagram", href: "[INSTAGRAM URL]" },
  ],
};

export const intro = {
  lead: "Hey, I'm Khaled Meselhy, a curious Full Stack Web Developer who loves turning ideas into real, working products. With 3+ years of experience,",
  body: "I've been coding with React, Next.js, Node.js, MongoDB and PostgreSQL, building everything from sleek frontends to reliable backends.",
};

export type Project = {
  name: string;
  summary: string;
  href: string;
  /** Screenshot in /public, e.g. "/projects/gallery-studio.jpg". Without it a line sketch is drawn. */
  image?: string;
  shape: "portrait" | "landscape";
  sketch: "phone" | "shop" | "portfolio";
};

export const projects: Project[] = [
  {
    name: "Gallery Studio",
    summary:
      "GalleryStudio is a modern web application that connects creators and audiences through visual storytelling, showcasing and interacting with posts and comments similar to Instagram.",
    href: "#showcase",
    shape: "portrait",
    sketch: "phone",
  },
  {
    name: "Audiophile",
    summary:
      "Audiophile is a simple e-commerce web application for high-end audio equipment. It allows users to browse and purchase audio equipment from a wide range of brands and models (Frontend Mentor Challenge).",
    href: "[AUDIOPHILE URL]",
    shape: "landscape",
    sketch: "shop",
  },
  {
    name: "Personal Portfolio",
    summary:
      "A modern portfolio website designed to connect work with opportunity and showcase a client's work, skills, and personality in a professional yet visually appealing way.",
    href: "[PORTFOLIO URL]",
    shape: "landscape",
    sketch: "portfolio",
  },
];

export const philosophy =
  "What drives me is creating apps that don't just work but also feel great to use. I care about clean code, performance, and smooth experiences — the kind of details that make people enjoy coming back.";

export const skills = {
  heading: "When I'm not coding, I'm usually exploring new tech, experimenting with side projects",
  aside: "or actually gaming when I'm not working. My goal? Keep learning, keep improving, and keep building things that make an impact.",
  /** The big names that spin in the 3D box. */
  core: ["JavaScript", "TypeScript", "Next.js", "React", "Node.js", "NestJS", "Tailwind CSS", "HTML", "CSS", "MongoDB", "PostgreSQL"],
  /** Smaller names on the inner ring. Add the rest of your toolbox here. */
  more: ["[Tool]", "[Tool]", "[Tool]", "[Tool]", "[Tool]", "[Tool]", "[Tool]", "[Tool]", "[Tool]", "[Tool]", "[Tool]", "[Tool]"],
};

export const showcase = {
  project: "Gallery Studio",
  headline: "Bringing creators and audiences together through real-time visual posts.",
  body: "[Paste the Gallery Studio overview paragraph from your current site here.]",
  outcome: "[Paste the Gallery Studio outcome paragraph from your current site here.]",
  technologies: ["[Tech]", "[Tech]", "[Tech]", "[Tech]", "[Tech]", "[Tech]", "[Tech]", "[Tech]"],
  /** Up to three screenshots in /public. Without them, drawn placeholders show. */
  screens: [] as string[],
  href: "[GALLERY STUDIO URL]",
};
