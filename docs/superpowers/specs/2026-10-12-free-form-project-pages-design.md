# Free-form project pages + FogWar — Design

Date: 2026-10-12

## Goal

Project detail pages are currently rendered from a fixed skeleton (`context / problem / solution / result`, plus an optional features grid + gallery for Sandy). That makes it impossible to explain a specific thing (a mechanism, a diagram, a screenshot with a caption) where it matters. Replace the skeleton with free-form, per-project content, written around each project's own focus points, and add a new personal project: **FogWar**, a 2D pixel-art RTS / survival game.

Success: each project page reads as its own story, with media and diagrams placed inline; adding a section, image or one-off interactive component to one project requires no change to shared code; FR and EN both work; the build prerenders every page.

## Decisions

- **Authoring format: hybrid MDX.** One MDX file per project per locale. A small set of global MDX components is available everywhere; a project can also import its own one-off components (diagrams, interactive bits).
- **Shared header stays** (badges, title, tagline, links, stack chips) so pages stay recognizable as the same site. Everything below it is owned by the MDX file.
- **Missing screenshots** are represented by a visible `<Placeholder>` box. The user adds real captures later.
- **FogWar** is personal, in development, **not featured** on the home page, and links to https://alexandrenotdev.itch.io/fogwar.

## 1. Data model (`lib/data/types.ts`, `lib/data/projects.ts`)

`Project` keeps only what cards, lists, filters, metadata and the shared header need:

```ts
export type ProjectCategory = 'web' | 'fullstack' | 'tool' | 'mobile' | 'game'
export type ProjectStatus = 'production' | 'in-development' | 'delivered'

export interface ProjectLinks {
  demo?: string
  itch?: string
  github?: string
}

export interface Project {
  slug: string
  title: string
  shortDescription: string
  tagline?: string
  techStack: string[]
  category: ProjectCategory
  colorKey: ProjectColor
  featured: boolean
  personal: boolean
  status: ProjectStatus
  cover?: string        // was `image`
  links?: ProjectLinks  // replaces demoUrl / githubUrl
}
```

Removed: `context`, `problem`, `solution`, `result`, `features`, `screenshots`, `ProjectFeature`, `image`, `demoUrl`, `githubUrl`.

All `slug === 'sandy'` checks (ProjectCard, detail page, FeaturedProjects) become `project.personal`. Status is shown as a badge text from the dictionary.

`localizeProject` overlays only `shortDescription` and `tagline`. Dictionary `projects.content[slug]` is trimmed to those two keys.

## 2. Content files

```
content/projects/
  sandy.fr.mdx      sandy.en.mdx
  tempo.fr.mdx      tempo.en.mdx
  bolero.fr.mdx     bolero.en.mdx
  swing.fr.mdx      swing.en.mdx
  espace-client-weinmann.fr.mdx  espace-client-weinmann.en.mdx
  fogwar.fr.mdx     fogwar.en.mdx
```

Media lives in `public/projects/<slug>/`.

## 3. Rendering

- Install `@next/mdx @mdx-js/loader @mdx-js/react @types/mdx`; wrap `next.config.ts` with `createMDX()` and add `md`/`mdx` to `pageExtensions` (per `node_modules/next/dist/docs/01-app/02-guides/mdx.md`). Keep `experimental.globalNotFound`.
- `mdx-components.tsx` at the repo root (required by App Router) styles the standard elements (h2, h3, p, ul/ol, li, a, strong, blockquote, code, pre, table, hr, img) using the site's CSS variables, and registers the global components below.
- `app/[lang]/projects/[slug]/page.tsx` becomes a thin shell:
  1. back link
  2. `ProjectHeader` (new server component, `components/projects/ProjectHeader.tsx`): color bar, badges (personal, status, category), title, tagline, short description, link buttons (demo → "Use the application", itch → "Play on itch.io", github → "GitHub"), tech-stack chips, optional cover image.
  3. `const { default: Content } = await import(\`@/content/projects/${slug}.${lang}.mdx\`)` rendered inside a wrapper `<article>` that sets `--project-accent`, `--project-accent-soft`, `--project-accent-border` from `projectColors[project.colorKey]`.
  4. "All projects" footer nav.
  `generateStaticParams` and `dynamicParams = false` stay; `generateMetadata` is unchanged (title + localized `shortDescription`).
- Deleted: `components/projects/MarketingProjectDetail.tsx`, the 4-card story layout, the Sandy emoji fallback block, and dictionary keys `detail.sections`, `detail.features_title`, `detail.gallery_title`, `detail.gallery_alt`, `detail.story_title`.

## 4. MDX toolkit (`components/mdx/`)

Global (registered in `mdx-components.tsx`, usable without import):

| Component | Props | Purpose |
|---|---|---|
| `Figure` | `src, alt, caption?, width, height, pixelated?` | Image with border in project accent + caption. `pixelated` sets `image-rendering: pixelated` for game captures. |
| `Gallery` | `children` (Figures) | Responsive 2–3 column grid. |
| `Video` | `src, caption?, poster?` | Autoplay, muted, loop, playsInline; for gameplay clips. |
| `Callout` | `title?, children` | Accent-tinted aside for "the interesting bit". |
| `Columns` | `children` | Two columns on ≥ sm, stacked on mobile. |
| `Placeholder` | `label, ratio?` | Dashed box with a label describing the capture to add. |

All accent colors read `var(--project-accent*)`, so components inherit each project's color. All must work in light and dark themes and at phone width.

Per-project (imported explicitly in that project's MDX):

- `components/projects/fogwar/VisionRadii.tsx`: SVG of concentric vision radii (Town Hall 8, Villager 5, Torch 6, Watchtower 10 tiles) on a tile grid, labelled.
- `components/projects/fogwar/EconomyLoop.tsx`: SVG loop Wood → Houses/Farms → Food → Villagers → Wood, with Food → Market → Gold → Research branch.

## 5. Page content (focus points)

Drafted by Claude from existing project text and FogWar's GDD/CLAUDE.md; the user rewrites as they see fit. Every page is free-form; these are the focus points, not a template.

- **FogWar**: vision as a resource (rules, sources/radii, smooth edge, `VisionRadii`); night & weather eat your vision (stacked multipliers table, night × fog = ×0.24; video placeholder); procedural map (multi-layer Perlin, spawn exclusion zone; screenshot placeholder); economy loop & waves (`EconomyLoop`); how I build it (Unity 6 / URP, ScriptableObject data, NavMesh AI, spec → plan → implement workflow). Category `game`, color `cyan`, `personal: true`, `status: 'in-development'`, `featured: false`, links `{ itch }`, stack: Unity 6, C#, URP, NavMesh, ScriptableObjects.
- **Sandy**: household sharing with per-member visibility, analytics dashboard, document vault, no-flash dark mode. Uses existing `/sandy.png` (cover) + placeholders. `status: 'production'`.
- **Tempo**: role-based validation workflow, Silae absence sync via Python, monthly day-rate employees. `status: 'production'`.
- **Boléro**: DayPilot resource scheduler with drag & drop, Excel migration, Nginx/PM2 deployment. `status: 'production'`.
- **Swing**: mobile-first from field observation, ERP integration via Python micro-services, flaky-connection handling (retry, local cache). `status: 'production'`.
- **Espace Client Weinmann**: data collection from connected paint booths, real-time dashboards, multi-tenant access rights, how Tempo/Boléro/Swing fit in the suite. `status: 'delivered'`.

Weinmann pages: text + `Placeholder`s for now.

## 6. Filters, cards, dictionaries

- `ProjectFilter` / `useProjectStore` gain `'game'`; dictionaries gain `filters.game` (FR "Jeux", EN "Games").
- Dictionaries gain `detail.status.{production, in-development, delivered}`, `detail.play_itch`, and keep `detail.personal_badge` reworded to just "Personal project" / "Projet personnel" (status is now its own badge).
- `ProjectCard`: CTA uses `cta_personal` only when `personal && links?.demo`; otherwise `cta_default`.
- `FeaturedProjects`: `project.image` → `project.cover`; Sandy hero detection via `personal && featured`.

## 7. Verification

No test suite exists. Verify with:

- `npm run lint` passes.
- `npm run build` passes and prerenders 12 project routes (6 slugs × 2 locales); a missing MDX file fails the build.
- Dev server: each page checked in FR/EN, light/dark, and at phone width; FogWar appears under the "Games" filter and not on the home page.

## Out of scope

- Real screenshots/videos (user supplies later).
- An interactive fog-of-war demo (possible later via the per-project component mechanism).
