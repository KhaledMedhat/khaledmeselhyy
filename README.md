# Khaled Meselhy — Portfolio v2

A portfolio drawn in lines. Ridge lines rise in 3D in the hero, one thread draws itself down the whole page as you scroll, and every project, diagram and rule sketches itself in.

Built with Next.js (App Router), React and TypeScript. No animation or CSS libraries: canvas for the moving line fields, SVG for everything that draws.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Make it yours

All copy lives in **`src/content.ts`**. Replace the `[BRACKETED]` values that are left: email, social links, CV, project links, and the Gallery Studio outcome and technologies.

**Logo:** `src/components/Logo.tsx` draws the slanted-block K. If you have the exact SVG paths, swap the three `d` values.

## The lines

| Effect | Where |
| --- | --- |
| 3D ridge lines in the hero: draw in, drift, rise under the pointer | `src/components/Ridges.tsx` |
| The thread through the page, drawn by scroll; knots light up as it passes | `src/components/Thread.tsx` (knots are any `data-thread` element) |
| Rotating 3D network of skills with pulses along the lines; hover a skill to light its node | `src/components/Network.tsx`, `Skills.tsx` |
| Project line illustrations that draw in and redraw on hover | `src/components/LineArt.tsx` |
| Gallery Studio diagram with leader lines to its callouts | `CaseStudy` in `src/app/page.tsx` |
| Lines converging on the contact section | `Contact` in `src/app/page.tsx` |
| Scroll progress line under the nav | `src/components/Nav.tsx` |

Any SVG shape with `className="draw"` and `pathLength={1}` draws itself once its `<Reveal>` wrapper scrolls into view; stagger with `style={d(0.4)}`. `draw-text` traces letter outlines, then fills (your name), and `draw-fill` does the same for shapes (the logo).

All motion stops for visitors who have "reduce motion" turned on.
