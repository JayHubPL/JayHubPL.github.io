# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server at http://localhost:5173
npm run build    # type-check (tsc -b) then Vite production build → dist/
npm run preview  # serve the dist/ build locally
```

There are no tests or linter configured yet.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs `npm run build` and deploys `dist/` to GitHub Pages at **https://JayHubPL.github.io**. The repo must have Pages → Source set to **GitHub Actions** in settings.

To update the displayed CV, copy the latest build from the sibling repo: `cp ../cv/cv.pdf public/cv.pdf`.

## Architecture

This is a single-page portfolio with no routing. `src/App.tsx` composes the page as a vertical stack of section components rendered inside `<main>`.

### Data layer

All content (jobs, projects, skills, education, certificates, contact) lives in **`src/data.ts`** as plain exported arrays/objects. To change any displayed text, edit only that file — no component changes needed.

### Component patterns

**`Section`** is the shared shell for every content section: it provides the `id` anchor, `max-w-5xl` container, uniform vertical padding, and the yellow `section-heading` title with a gradient rule. Every section component except `Hero` uses it.

**`FadeIn`** wraps any content in a Framer Motion `motion.div` that triggers a fade + slide-up once the element enters the viewport (`useInView`, fires once). Pass `delay` (seconds) to stagger sibling items.

Section components (`Experience`, `Projects`, `Skills`, `Education`, `Contact`) are purely presentational: they import data from `src/data.ts`, map over it, and render tiles.

### Styling

Tailwind CSS v4 — configuration is **CSS-only** (no `tailwind.config.ts`). Custom theme tokens are declared in the `@theme` block at the top of `src/index.css`:

| Token | Value | Tailwind class |
|---|---|---|
| `--color-accent` | `#ffde59` | `text-accent`, `bg-accent`, `border-accent` |
| `--color-accent-soft` | `#ffe58b` | `text-accent-soft` … |
| `--color-bg` | `#070707` | `bg-bg` |
| `--color-text` | `#e8e8e8` | `text-text` |
| `--color-muted` | `#777777` | `text-muted` |

Reusable component classes (`.tile`, `.tag`, `.section-heading`, `.btn-primary`, `.btn-outline`) are defined in `@layer components` in the same file. Prefer these over ad-hoc Tailwind utilities for anything that should share the glass-tile aesthetic.

The Framer Motion cubic-bezier ease `[0.21, 0.47, 0.32, 0.98]` must be typed as `[number, number, number, number]` — assign it to a named const with that explicit tuple type before passing it to a `Variants` object (TypeScript rejects a plain array literal).
