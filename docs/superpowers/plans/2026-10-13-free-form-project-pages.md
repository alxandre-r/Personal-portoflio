# Free-form Project Pages + FogWar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the fixed project-page skeleton with per-project MDX content (FR + EN), and add the FogWar game project.

**Architecture:** `Project` metadata stays in `lib/data/projects.ts` (cards, filters, header). Each detail page renders a shared `ProjectHeader`, then dynamically imports `content/projects/<slug>.<lang>.mdx`. Global MDX components (`Figure`, `Gallery`, `Video`, `Callout`, `Columns`, `Placeholder`) are registered in `mdx-components.tsx`; one-off components are imported directly by the MDX file that needs them.

**Tech Stack:** Next.js 16.2.1 (App Router, webpack via `@next/mdx`), React 19, TailwindCSS v4, TypeScript.

**Spec:** `docs/superpowers/specs/2026-10-12-free-form-project-pages-design.md`

## Global Constraints

- Read `node_modules/next/dist/docs/01-app/02-guides/mdx.md` before touching MDX config (AGENTS.md: this Next has breaking changes).
- Keep `experimental.globalNotFound: true` in `next.config.ts`.
- FogWar: slug `fogwar`, category `game`, color `cyan`, `personal: true`, `status: 'in-development'`, `featured: false`, links `{ itch: 'https://alexandrenotdev.itch.io/fogwar' }`.
- Filter label `game`: FR "Jeux", EN "Games".
- Media for new content lives in `public/projects/<slug>/`.
- Every page works in FR and EN, light and dark theme, and at phone width (no horizontal page scroll).
- No test suite exists; verification = `npx tsc --noEmit`, `npm run lint`, `npm run build`, manual dev-server check.

## Review Focus

- Wide markdown tables on phone width → table must scroll inside its own wrapper, never the page (`mdx-components.tsx` wraps `table` in `overflow-x-auto`).
- Accent text in light theme → `projectColors[x].text` is a light tint; MDX components use it only for borders/backgrounds/small labels, body text stays `--color-foreground` / `--color-muted-foreground`.
- Missing MDX file for a slug/locale → `npm run build` must fail (static import per route), not render blank. Verified by build in Task 2/3.
- Unknown slug → still 404 (`dynamicParams = false` kept). Verified manually in Task 4.
- Pixel-art captures scaled up → blurry unless `pixelated`; `Figure` exposes `pixelated` and FogWar MDX uses it.

---

## File Structure

| File | Responsibility |
|---|---|
| `next.config.ts` | wrap with `createMDX`, add `pageExtensions` |
| `mdx-components.tsx` | element styling + global component registry |
| `components/mdx/Figure.tsx` | captioned image |
| `components/mdx/Gallery.tsx` | grid of Figures |
| `components/mdx/Video.tsx` | looping muted clip |
| `components/mdx/Callout.tsx` | accent aside |
| `components/mdx/Columns.tsx` | 2-col layout |
| `components/mdx/Placeholder.tsx` | dashed "capture to add" box |
| `components/projects/ProjectHeader.tsx` | shared header above MDX |
| `components/projects/fogwar/VisionRadii.tsx` | SVG diagram |
| `components/projects/fogwar/EconomyLoop.tsx` | SVG diagram |
| `content/projects/*.{fr,en}.mdx` | page bodies (12 files) |
| `lib/data/types.ts`, `lib/data/projects.ts`, `lib/data/localizeProject.ts` | slimmed model |
| `app/[lang]/projects/[slug]/page.tsx` | thin shell |
| `components/projects/ProjectCard.tsx`, `ProjectFilter.tsx`, `components/sections/FeaturedProjects.tsx`, `lib/store/useProjectStore.ts` | consume new fields |
| `dictionaries/fr.json`, `dictionaries/en.json` | trimmed content, new labels |
| Delete: `components/projects/MarketingProjectDetail.tsx` | |

---

### Task 1: MDX infrastructure + toolkit

**Files:**
- Modify: `next.config.ts`, `package.json`
- Create: `mdx-components.tsx`, `components/mdx/{Figure,Gallery,Video,Callout,Columns,Placeholder}.tsx`

**Interfaces:**
- Produces: global MDX tags `Figure({src, alt, caption?, width, height, pixelated?})`, `Gallery({children})`, `Video({src, caption?, poster?})`, `Callout({title?, children})`, `Columns({children})`, `Placeholder({label, ratio?})`. CSS vars consumed: `--project-accent`, `--project-accent-text`, `--project-accent-soft`, `--project-accent-border`.

- [ ] **Step 1: Install deps**

Run: `npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx`

- [ ] **Step 2: Config**

```ts
// next.config.ts
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    // (existing globalNotFound comment kept verbatim)
    globalNotFound: true,
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
```

- [ ] **Step 3: Components** — each a server component, styled with Tailwind + the CSS vars above. `Figure` uses `next/image` with explicit `width`/`height`, `className="w-full h-auto"`, `style={{ imageRendering: pixelated ? 'pixelated' : undefined }}`, border `var(--project-accent-border)`, caption muted xs. `Video` renders `<video autoPlay muted loop playsInline>`. `Placeholder` renders a dashed-border box with `aspect-ratio: ratio ?? '16 / 9'`, a camera icon and the label. `Callout` = left accent border + `--project-accent-soft` bg. `Columns` = `grid sm:grid-cols-2 gap-6`. `Gallery` = `grid sm:grid-cols-2 gap-4`.

- [ ] **Step 4: `mdx-components.tsx`** — map `h2, h3, p, ul, ol, li, a, strong, blockquote, code, pre, hr, table, thead, th, td` to styled elements (h2: `text-2xl font-bold mt-14 mb-4`, p: `leading-relaxed text-[var(--color-muted-foreground)] mb-4`, `table` wrapped in `<div className="overflow-x-auto my-6">`, links external → `target=_blank`), spread the six components, export `useMDXComponents()`.

- [ ] **Step 5: Verify** — `npx tsc --noEmit` and `npm run lint` pass.

- [ ] **Step 6: Commit** `feat: add MDX support and project-page component toolkit`

---

### Task 2: Data model, page shell, migrate the 5 existing projects

**Files:**
- Modify: `lib/data/types.ts`, `lib/data/projects.ts`, `lib/data/localizeProject.ts`, `app/[lang]/projects/[slug]/page.tsx`, `components/projects/ProjectCard.tsx`, `components/projects/ProjectFilter.tsx`, `lib/store/useProjectStore.ts`, `components/sections/FeaturedProjects.tsx`, `dictionaries/{fr,en}.json`
- Create: `components/projects/ProjectHeader.tsx`, `content/projects/{sandy,tempo,bolero,swing,espace-client-weinmann}.{fr,en}.mdx`
- Delete: `components/projects/MarketingProjectDetail.tsx`

**Interfaces:**
- Consumes: Task 1 MDX tags.
- Produces: `Project` per spec §1 (`personal`, `status`, `cover`, `links`, category incl. `'game'`); `ProjectHeader({ project, lang, t, categoryLabels })`; dictionary keys `projects.filters.game`, `projects.detail.status.{production,in_development,delivered}`, `projects.detail.play_itch`, `projects.detail.personal_badge` ("Projet personnel"/"Personal project").

- [ ] **Step 1: Types + data** — apply spec §1 types. In `projects.ts`, remove story/features fields; set Sandy `personal: true, status: 'production', cover: '/sandy.png', links: { demo }`; Tempo/Boléro/Swing `personal: false, status: 'production'`; Espace Client `status: 'delivered'`. Map status `'in-development'` → dictionary key `in_development` with a `statusKey` record in `ProjectHeader`.
- [ ] **Step 2: `localizeProject`** — overlay only `shortDescription` and `tagline`.
- [ ] **Step 3: Dictionaries** — trim each `projects.content[slug]` to `shortDescription` (+ `tagline` for Sandy); remove `detail.sections`, `features_title`, `gallery_title`, `gallery_alt`, `story_title`; add new keys above. Keep fr/en key sets identical (Dictionary type comes from fr.json).
- [ ] **Step 4: `ProjectHeader`** — color bar, badges (personal pulse badge, status badge, category badge), h1, tagline (accent text), short description, link buttons (demo/itch/github), stack chips, optional cover via `next/image` 16:9.
- [ ] **Step 5: Page shell** — back link → `ProjectHeader` → `<article style={accent vars}>` containing `const { default: Content } = await import(\`@/content/projects/${slug}.${lang}.mdx\`)` → footer nav. Keep `generateStaticParams`, `dynamicParams = false`, `generateMetadata`.
- [ ] **Step 6: Consumers** — `ProjectCard`: `isPersonal = project.personal`, CTA personal only when `project.personal && project.links?.demo`. `FeaturedProjects`: hero = `projects.find(p => p.personal)`, others = rest, `image` → `cover`. Filter/store gain `'game'`.
- [ ] **Step 7: Content** — write 10 MDX files, free-form around spec §5 focus points; Weinmann pages use `Placeholder` for future captures; Sandy uses `Figure` with `/sandy.png` only if not used as cover (it is the cover → placeholders for dashboard/sharing captures).
- [ ] **Step 8: Delete** `MarketingProjectDetail.tsx`; `grep -rn "MarketingProjectDetail\|\.context\|demoUrl\|githubUrl\|\.image\b\|=== 'sandy'"` returns nothing in app/components/lib.
- [ ] **Step 9: Verify** — `npx tsc --noEmit`, `npm run lint`, `npm run build` (10 project routes prerendered).
- [ ] **Step 10: Commit** `feat: free-form MDX project pages, drop fixed template`

---

### Task 3: FogWar

**Files:**
- Modify: `lib/data/projects.ts`, `dictionaries/{fr,en}.json`
- Create: `components/projects/fogwar/VisionRadii.tsx`, `components/projects/fogwar/EconomyLoop.tsx`, `content/projects/fogwar.{fr,en}.mdx`, `public/projects/fogwar/.gitkeep`

**Interfaces:**
- Consumes: Task 1 tags, Task 2 `Project` type.
- Produces: `VisionRadii({ labels: { townHall, villager, torch, watchtower, tiles } })`, `EconomyLoop({ labels: { wood, houses, farms, food, villagers, market, gold, research } })` — labels passed from MDX so the SVG stays locale-free.

- [ ] **Step 1: Data** — add FogWar entry (Global Constraints values), stack `['Unity 6', 'C#', 'URP', 'NavMesh', 'ScriptableObjects']`; dictionary `content.fogwar.{shortDescription, tagline}` FR+EN.
- [ ] **Step 2: Diagrams** — `VisionRadii`: SVG tile grid with 4 concentric circles at radii 5/6/8/10 tiles, smoothstep-like gradient edge, labels, uses `currentColor` + `var(--project-accent)` so it works in both themes; scales to container width. `EconomyLoop`: SVG nodes + arrows for Wood → Houses/Farms → Food → Villagers → Wood, Food → Market → Gold → Research.
- [ ] **Step 3: Content** — FR + EN MDX: vision as a resource (+ `VisionRadii`, fog texture = 1 pixel per tile, bilinear, recomputed every 0.3 s from `IVisionSource`s); night & weather (multiplier table, night × fog = ×0.24, fog peak around 5 am, `Video`-slot `Placeholder`); procedural map (multi-layer Perlin, thresholds for S/M/L trees, exclusion zone around spawn, `Placeholder`); economy & waves (`EconomyLoop`, 3 + (N−1)×3 enemies, spawn out of sight); how I build it (Unity 6/URP, ScriptableObjects, NavMesh, spec → plan → implement). Itch.io link inline.
- [ ] **Step 4: Verify** — tsc, lint, build (12 project routes). FogWar not in `featuredProjects`.
- [ ] **Step 5: Commit** `feat: add FogWar project page`

---

### Task 4: Manual verification

- [ ] `npm run dev`; visit `/fr/projects`, `/en/projects` → "Jeux"/"Games" filter shows FogWar only.
- [ ] Each of 6 projects × 2 locales renders; light + dark; 375px width has no horizontal scroll (tables scroll internally).
- [ ] `/fr/projects/nope` → 404. Home page has no FogWar.
- [ ] Fix anything found, re-run build, commit.
