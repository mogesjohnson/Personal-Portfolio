# Moges Johnson — Portfolio

A personal portfolio for Moges Johnson, built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4.

## Redesign 2.1

The site uses a dark editorial opening, a responsive systems illustration, and a project switcher with animated SVG diagrams. Each project has expandable case notes covering its problem, approach, and design decision. The experience section, current focus, technical toolkit, and contact routes are presented as a single narrative.

Interaction and motion are built with React, CSS, and SVG. The project switcher supports arrow keys, Home, and End. The command menu opens with `Ctrl+K` or `Cmd+K`. Motion respects `prefers-reduced-motion`.

The contact section links directly to email and scheduling. There is no backend contact form or simulated message submission.

## Run locally

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verify

```bash
npm run lint
npm run build
```

## Content

Project, experience, education, and contact information live in [`src/data/portfolio.ts`](src/data/portfolio.ts). The current page is composed in [`src/components/RedesignExperience.tsx`](src/components/RedesignExperience.tsx), with its visual system in [`src/app/globals.css`](src/app/globals.css).
