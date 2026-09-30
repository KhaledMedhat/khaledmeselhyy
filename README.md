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
- `projects`: links, and `image` for each screenshot (put files in `public/projects/`)
- `showcase`: Gallery Studio outcome, technologies and link
- `skills.layers`: the layers and tools in the stack diagram (positions and connectors live in `src/components/Stack.tsx`)

**Logo:** `src/components/Logo.tsx` draws the K from three slanted blocks.

## How the lines move

- `src/components/Scrub.tsx` ties every line to scrolling. Each section gets a progress value that eases from 0 to 1 as it enters the screen, so lines draw in as you scroll down and pull back as you scroll up.
- `src/components/Guides.tsx`: 12 faint column lines behind the page that grow with your scroll.
- Every section is a `.grid` of `Cell`s (`src/app/page.tsx`); each cell's top and left edges draw from that progress, staggered by the cell's `i`. `x` adds a **+** that turns into place where lines cross.
- Projects alternate sides. With no screenshot, a project shows a straight-line composition (`src/components/Lines.tsx`); with one, the screenshot sits slightly back in 3D and turns flat on hover (`src/components/Shot.tsx`).
- Skills are a stack diagram (`src/components/Stack.tsx`): languages → frontend → backend → data, joined by right-angled connectors that draw with scroll and then carry a steady flow of dashes. Hover a skill to trace its connections.

Colors live as variables at the top of `src/app/globals.css`. Visitors with "reduce motion" turned on see every line fully drawn and still.
