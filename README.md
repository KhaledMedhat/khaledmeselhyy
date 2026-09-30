# Khaled Meselhy — Portfolio v2

A black-and-white portfolio where lines draw themselves in as you scroll, with a 3D skills box at its centre.

Built with Next.js (App Router), React and TypeScript. No CSS framework, just `src/app/globals.css`.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Make it yours

Every piece of copy lives in **`src/content.ts`**. Your real text from the current site is already in; replace the `[BRACKETED]` values that are left:

| What | Where in `content.ts` |
| --- | --- |
| Photo, CV, email, phone, social links | `site` (put files in `public/`) |
| Project screenshots and links | `projects` (`image`, `href`) |
| Extra tools on the sliding strip | `skills.more` |
| Gallery Studio overview, outcome, tech, screenshots | `showcase` |

**Logo:** `src/components/Logo.tsx` draws the slanted-block K. If you have the exact SVG paths, swap the three `d` values.

## How the effects work

- **Line drawing:** any SVG shape with `className="draw"` and `pathLength={1}` animates its stroke once its `<Reveal>` wrapper scrolls into view. `draw-fill` traces an outline then fills it (the logo); `draw-text` does the same for big type (your name). Stagger with `style={d(0.4)}`.
- **Skills box (3D):** `src/components/SkillsBox.tsx`. The box leans toward the pointer, the skill tiles flip in a wave (hovering one holds it), a strip of tools slides past, and "& Much More." floats forward. The thick diagonal stripes draw out of it to the page edge.
- **3D cards:** your photo and project screenshots follow the mouse; the Gallery Studio screen stack fans out on hover.
- All motion stops for visitors who have "reduce motion" turned on.
