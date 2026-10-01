# Khaled Meselhy — Portfolio v2

A two-color portfolio built on a visible layout grid that draws itself. Near-black `#171717`, off-white `#f0ede6`, and straight lines only.

Built with Next.js (App Router), React and TypeScript, set in Geist and Geist Mono. No animation or CSS libraries.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Make it yours

All copy lives in **`src/content.ts`**. Anything still in `[BRACKETS]` is simply left off the page until you fill it in:

- `site`: photo (`portrait`), CV, email, social links
- `projects`: links, `image` for each screenshot (put files in `public/projects/`), and the Details panel: `role`, `year`, `stack` and `highlights`
- `skills.layers`: the layers and tools in the stack diagram (positions and connectors live in `src/components/Stack.tsx`)

**Logo:** `src/components/Logo.tsx` draws the K from three slanted blocks.

## Intro

`src/components/Intro.tsx` plays on load:
1. Guide lines draw across the screen and frame the K, while a counter runs from 000 to 100.
2. The K's outline traces with a bold off-white edge; it turns in 3D as a dark block, with a fainter back edge showing its depth (no fill, no shading).
3. The camera dives into the stem as the edges fade into the dark.
4. A single line draws across the middle and pulls back, and the page's lines start drawing.

Click or press any key to skip it. Visitors with "reduce motion" turned on skip it automatically.

## How the lines move

- The page starts with no lines. When the intro hands over (`src/components/ready.ts`), every line on screen draws in at a steady, visible speed (a full section takes about two seconds), and text and reveals wait for the same moment. Lines keep drawing at that speed as sections scroll into view.

- `src/components/Scrub.tsx` ties every line to scrolling. Each section gets a progress value that eases from 0 to 1 as it enters the screen, so lines draw in as a section rises into view, pull back as it leaves through the top, and everything on screen completes at the bottom of the page. Every border on the site, including the skill boxes and buttons, is drawn this way.
- `src/components/Guides.tsx`: 12 faint column lines behind the page that grow with your scroll.
- Every section is a `.grid` of `Cell`s (`src/app/page.tsx`); each cell's top and left edges draw from that progress, staggered by the cell's `i`. `x` adds a **+** that turns into place where lines cross.
- Each project has a **Details** toggle (`src/components/ProjectRow.tsx`). It unfolds a spec sheet under the project (overview, numbered highlights, stack and link) whose lines draw in as it opens and fold away when closed. Empty fields are left out.
- Projects alternate sides. With no screenshot, a project shows a straight-line composition (`src/components/Lines.tsx`); with one, the screenshot sits slightly back in 3D and turns flat on hover (`src/components/Shot.tsx`).
- Skills are a stack diagram (`src/components/Stack.tsx`): languages → frontend → backend → data, joined by right-angled connectors that draw with scroll and then carry a steady flow of dashes. Hover a skill to trace its connections.

Colors live as variables at the top of `src/app/globals.css`. Visitors with "reduce motion" turned on see every line fully drawn and still.
