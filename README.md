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

All copy lives in **`src/content.ts`**. Replace the `[BRACKETED]` values that are left:

- `site`: photo (`portrait`), CV, email, social links
- `projects`: links, and `image` for each screenshot (put files in `public/projects/`)
- `showcase`: Gallery Studio outcome and technologies

**Logo:** `src/components/Logo.tsx` draws the slanted-block K. If you have the exact SVG paths, swap the three `d` values.

## How the grid draws

- `src/components/Guides.tsx`: the 12 faint column lines behind the page, drawn downward on load.
- Every section is a `.grid` of `Cell`s (`src/app/page.tsx`). As a section scrolls into view, each cell draws its top edge left to right and its left edge top to bottom, staggered by the cell's `i`. `x` adds a small **+** where the lines cross.
- Headings slide up from behind their line; the key phrase in the intro gets an underline that draws in.
- Project screenshots sit slightly back in 3D and turn flat on hover (`src/components/Shot.tsx`).
- The line under the nav fills as you scroll.

Colors live as variables at the top of `src/app/globals.css`. All motion stops for visitors who have "reduce motion" turned on.
