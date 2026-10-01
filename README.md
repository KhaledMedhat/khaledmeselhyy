# Khaled Meselhy — Portfolio

The personal portfolio of **Khaled Meselhy**, a full-stack developer in Cairo, Egypt.

It is built around one idea: a page drawn in lines. The layout is a visible 12-column grid whose lines draw themselves in as you scroll, in two colors only, near-black `#171717` and off-white `#f0ede6`.

## Highlights

- **3D logo intro.** Guide lines frame the K, its outline traces, and it turns in 3D as an outlined block before the camera dives into it and hands over to the page.
- **Lines tied to scrolling.** Every grid edge, rule and border draws in as a section enters the screen and pulls back as it leaves, at a steady, visible speed.
- **Selected work.** Projects alternate sides. Each one has a **Details** panel that unfolds a spec sheet (overview, highlights, stack, link) whose lines draw as it opens.
- **Stack diagram.** Languages → frontend → backend → data. Hover or tap a skill and its connectors draw out to the skills it links to.
- **Libraries & tools.** A filterable index of the libraries I use, with their logos.
- **Accessible by default.** Keyboard-friendly controls, and everything appears fully drawn and still for visitors who prefer reduced motion.

## Tech

- [Next.js](https://nextjs.org) (App Router), React and TypeScript
- Plain CSS: no UI or animation libraries
- [Geist](https://vercel.com/font) and Geist Mono
- Library logos from [Simple Icons](https://simpleicons.org) (CC0)

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # TypeScript check
```

## Editing content

All text lives in [`src/content.ts`](src/content.ts). Anything still written in `[BRACKETS]` is treated as a placeholder and left off the page until it is filled in.

| What | Where in `content.ts` |
| --- | --- |
| Name, role, location, photo, CV, email, social links | `site` |
| Intro statement and facts | `intro` |
| Projects, screenshots and Details panels (`role`, `year`, `stack`, `highlights`) | `projects` |
| Stack diagram layers | `skills.layers` |
| Libraries & tools grid | `libraries` |
| Closing quote and contact heading | `philosophy`, `contact` |

Put images and files in `public/` (for example `public/projects/gallery-studio.jpg`) and reference them by path.

## Project structure

```
src/
  app/
    layout.tsx       fonts and metadata
    page.tsx         page sections
    globals.css      colors, grid and all animation
    icon.svg         favicon
  components/
    Intro.tsx        3D logo intro
    Scrub.tsx        ties every line to scroll position
    Grid.tsx         the drawn grid cells every section is built from
    ProjectRow.tsx   project rows and their Details panels
    Stack.tsx        stack diagram and its connectors
    Libraries.tsx    libraries & tools grid
    Logo.tsx         the K mark
  content.ts         all copy and data
```

## Tuning the motion

- Drawing speed: `DRAW_SPEED` and `GUIDE_SPEED` in `src/components/Scrub.tsx`.
- Intro timing: `T` in `src/components/Intro.tsx` and the `.intro` rules in `globals.css`.
- Skill connections: `LINKS` in `src/components/Stack.tsx`.
- Colors: the variables at the top of `src/app/globals.css`.

## License

© Khaled Meselhy. All rights reserved. Library logos are trademarks of their respective owners and are used here only to show the tools I work with.
