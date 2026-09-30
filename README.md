# Khaled Meselhy — Portfolio v2

A dark, editorial portfolio with a real-time 3D wireframe globe (Three.js) and gold lines that draw themselves in as you scroll.

Built with Next.js (App Router), React, TypeScript and `@react-three/fiber`. No CSS framework, just `src/app/globals.css`.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Make it yours

Every piece of copy lives in **`src/content.ts`**. Replace each `[BRACKETED]` value:

| What | Where in `content.ts` |
| --- | --- |
| Tagline, email, city coordinates, social links | `site` |
| Toolkit strip | `stack` |
| Projects (first one is the large featured card) | `projects` |
| About paragraph and the two stats | `about` |
| Jobs on the timeline | `experience` |

**Project screenshots:** drop an image in `public/projects/` and set `image: "/projects/your-file.jpg"` on that project. Without an image, the card shows an animated line sketch (`sketch: "chart" | "orbit" | "layout"`).

**Accent color:** change `--accent` in `src/app/globals.css`, and `ACCENT` in `src/components/Globe.tsx` for the globe.

## How the effects work

- **Line drawing:** any SVG shape with `className="draw"` and `pathLength={1}` animates its stroke once its `<Reveal>` wrapper scrolls into view. Stagger with `style={d(0.4)}`.
- **3D globe:** `src/components/Globe.tsx`. Rings draw in with `setDrawRange`, then the sphere spins and leans toward the pointer.
- **Tilted screens:** `src/components/TiltCard.tsx` follows the mouse in 3D.
- All motion stops for visitors who have "reduce motion" turned on.
