`# Style Guide — Tom Schoorstra HubSpot Contractor Site

Complete reference for design decisions, components, and conventions used in this codebase. Keep this document updated when making structural changes.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion |
| Forms | Formspree (`NEXT_PUBLIC_FORMSPREE_ENDPOINT`) |
| Fonts | Google Fonts via `next/font/google` |

---


## Art direction: the network map

The site is drawn like a transit map. Tom's work is connecting systems, so the visual language is lines, stops and interchanges.

- Each expertise area owns one **line colour**. Anything belonging to that area (service page, related case study, proof link) inherits it.
- A **bullet** (coloured disc with the area's icon) names a line. Its tail runs in from the left edge of the screen.
- An **interchange** (ink-outlined station with several coloured lines running into it) marks a case study that touches more than one area. The lines come from `relatedServices`.
- A **journey** is a vertical line with ring-shaped stops. Detail pages use it for the narrative, the blog index and certifications use it for chronology.
- The **bundle** (all six lines side by side) closes the page in the footer and opens the mobile menu.

Lines are decoration that encodes real relationships. Never add a line, stop or label that the content does not back up.

---

## Colour

Defined in `src/app/globals.css` and mapped to Tailwind via `@theme inline`.

| Token | Tailwind | Hex | Usage |
|-------|----------|-----|-------|
| `--ink` | `text-ink`, `bg-ink`, `border-ink` | `#17163f` | Text, rules, station outlines. Deep indigo, used instead of black |
| `--ink-2` | `text-ink-2` | `#3b3a66` | Body text |
| `--ink-3` | `text-ink-3` | `#5f5e88` | Meta text (dates, eyebrows) |
| `--paper` | `bg-paper` | `#ffffff` | Page background |
| `--paper-2` | `bg-paper-2` | `#f1f2f9` | Tinted sections and panels |
| `--rule` | `border-rule` | `#d5d7e8` | Hairlines between rows |
| `--night` | `bg-night` | `#17163f` | Home hero, case study headers, footer, mobile menu |
| `--on-night-2` | `text-on-night-2` | `#d2d2ec` | Secondary text on night |

### Line colours

| Line | Token | Hex | Area (`data-line` value) |
|------|-------|-----|--------------------------|
| Orange | `--line-orange` | `#ff5c35` | `custom-objects` (also the primary accent, HubSpot orange) |
| Blue | `--line-blue` | `#5b8dff` | `integrations` |
| Green | `--line-green` | `#1db877` | `consultancy` |
| Pink | `--line-pink` | `#f0489f` | `custom-app-cards` |
| Yellow | `--line-yellow` | `#ffc531` | `automation` |
| Cyan | `--line-cyan` | `#22c3e6` | `pipeline-optimization` |

Set `data-line="<service slug>"` on any element and `--line` (Tailwind: `bg-line`, `border-line`) resolves to that area's colour for everything inside it. Case studies map to their main area in `src/lib/lines.ts`.

All six colours pass AA with ink text on top, so a header can be flooded with its line colour (`bg-line text-ink`, plus the `on-flood` class so link underlines switch to ink). Never put white text on a line colour.

The legacy names (`accent`, `accent-text`, `accent-action`, `surface-2`, `text-secondary`, `border`, ...) still exist as aliases. Use `accent-text` (`#b83a1b`) for orange text on paper, such as form errors.

---

## Typography

| Role | Font | CSS variable | Usage |
|------|------|--------------|-------|
| Display | Sofia Sans Extra Condensed | `--font-sofia-xc` | All headings, navigation in the mobile menu |
| Body | Sofia Sans | `--font-sofia` | Everything else |

Sofia Sans was designed for a city transport identity, which is why it fits. Headings are set in sentence case, weight 800, with tight leading. Do not use uppercase tracked labels.

| Class | Size | Used for |
|-------|------|----------|
| `t-mega` | `clamp(3.75rem, 1.4rem + 7.4vw, 7.5rem)` | Home, About and Contact h1 |
| `t-h1` | `clamp(3.25rem, 1.9rem + 5.6vw, 6.5rem)` | Other page titles |
| `t-h2` | `clamp(2.5rem, 1.7rem + 2.8vw, 4rem)` | Section headings, journey stops |
| `t-h3` | `clamp(1.875rem, 1.55rem + 1.2vw, 2.5rem)` | Row titles |
| `t-h4` | `1.5rem` | Small headings inside panels |

Body text is 17px. Lead paragraphs use `text-xl` or `text-2xl`. Long-form articles use `.prose-blog` (19px, 1.7 line height, 40rem measure).

Text links use the `tlink` class: bold, with a 2px underline in the line colour that fills in on hover. Override the underline colour with `style={{ "--ul": "var(--line)" }}`.

---

## Layout

- `Container` (`src/components/ui/Container.tsx`): `default` 78rem, `narrow` 56rem (articles), `wide` 88rem.
- Overview pages are lists of full-width rows separated by hairlines, opened by a 2px ink rule. No card grids.
- Detail pages put each section in a two-column stop: heading left, body right, on a journey rail.
- Section padding: `py-14 lg:py-20` to `py-16 lg:py-24`.
- Corners are square. Only pills, bullets and stations are round.

---

## Primitives

| Primitive | Where | Notes |
|-----------|-------|-------|
| `LineBullet` | `src/components/ui/LineBullet.tsx` | Coloured disc with a `ContentIcon`. `tail` draws the line in from the screen edge. Wrap rows in `overflow-x-clip` |
| `.interchange` | `globals.css` | Station with several lines. See `src/app/case-studies/page.tsx` |
| `.journey`, `.ring-stop`, `JourneyTrack` | `globals.css`, `src/components/ui/JourneyTrack.tsx` | Vertical route. `JourneyTrack` fills on scroll. `journey--static` gives a solid line. Put `ring-stop` on the element that marks a stop |
| `.track` | `globals.css` | Horizontal stretch of line with a train that travels it on hover (`WorkTile`) |
| `.bundle` | `globals.css` | All lines side by side: `<div class="bundle">{allLines.map(l => <i data-line={l} />)}</div>` |
| `RowArrow` | `src/components/ui/RowArrow.tsx` | Round arrow at the end of a link row |
| `Button` | `src/components/ui/Button.tsx` | Pill. `primary` is orange with ink text and turns yellow on hover. `secondary` is an ink outline. Analytics props are unchanged |
| `Badge` | `src/components/ui/Badge.tsx` | Outlined pill with a line-coloured dot |
| `Reveal` | `src/components/ui/Reveal.tsx` | Sets `data-reveal="pending"` only when JavaScript confirms the element starts off screen |
| `HeroMap` | `src/components/sections/HeroMap.tsx` | Home hero diagram. Decorative SVG, the portrait keeps its alt text |
| `ArchitectureDiagram` | `src/components/sections/ArchitectureDiagram.tsx` | Account tree. A bus with drops on wide screens, a vertical bus with stubs on narrow ones |

Primitives live in `@layer components`, so Tailwind utilities can override them.

Interaction states hang off Tailwind's `group` class: put `group` on the link, and bullets, tails, arrows, trains and rings inside it respond to hover and keyboard focus.

`SoftContentCard`, `Card` and the `dot-grid` helper remain for the design-preview pages and the error page. Do not use them on public pages.

---

## Motion

- One orchestrated moment: the home hero. Lines draw outward from the portrait, stations pop in, the text rises. It is pure CSS (`.hero-map`, `.hero-rise`).
- Hover and focus feedback on rows: the tail thickens, the bullet grows, the arrow fills and moves.
- Scroll: the journey rail fills as the reader moves down a detail page, and the article page shows a reading progress line.
- Tokens: `--dur-fast` 160ms, `--dur-base` 320ms, `--dur-slow` 700ms, `--ease-out`, `--ease-in-out`.

Rules:

1. Text never starts invisible. Entrance animations on text only move it, so the page reads correctly even if no animation frame runs.
2. Everything respects `prefers-reduced-motion` (CSS media query plus `useReducedMotion` in client components).
3. Nothing is hover-only. Hover adds emphasis, never information.
4. Keep animation in small client components. Pages stay server components.

Focus is a two-tone ring (ink outline, white halo) defined once in `globals.css`, so it shows on paper, night and colour floods. Do not add per-component focus rings.

---

## Content Architecture

### File locations

| Content | File |
|---------|------|
| Services | `src/content/services.ts` |
| Case studies | `src/content/caseStudies.ts` |
| Certifications | `src/app/about/page.tsx` — `certifications` array |

### Adding a new service

1. Add entry to `services` array in `src/content/services.ts`
2. Required fields: `slug`, `title`, `shortDescription`, `outcomes`, `deliverables`, `process`, `faq`
3. Optional: `relatedCaseStudy` (case study slug) for cross-linking
4. No new page file needed — fully dynamic

### Adding a new case study

1. Add entry to `caseStudies` array in `src/content/caseStudies.ts`
2. Required fields: `slug`, `title`, `industry`, `companySize`, `summary`, `challenge`, `approach`, `solution`, `results`, `stack`, `relatedServices`
3. `relatedServices`: array of service slugs — use `[]` if none

### Adding a certification

In `src/app/about/page.tsx`, add to the `certifications` array:

```ts
{ name: "HubSpot Marketing Hub", issuer: "HubSpot Academy", year: "2025", active: true }
```

`active: true` = orange highlight + "Active" pill. `active: false` = neutral grey.

---

## SEO & Metadata

### Schema markup (JSON-LD)

- `layout.tsx` — `Person` schema, sitewide
- `services/[slug]/page.tsx` — `Service` + `FAQPage` schema per service page
- Domain URL placeholder: `https://tomschoorstra.com` — update in both files when live domain is confirmed

### Open Graph

- Global fallback in `layout.tsx` metadata export
- OG image: currently `/about-photo.jpeg` — replace with a dedicated 1200×630 banner
- All pages override `openGraph.title` and `openGraph.url`

### Meta description guidelines

- Length: 140–160 characters
- Include the primary keyword for the page
- End with a differentiator: "No agency overhead" / "Let's talk"

### Sitemap

Not yet added. Implement via `src/app/sitemap.ts` (Next.js built-in feature).

---


---

## Page structure

| Page type | Header | Body |
|-----------|--------|------|
| Home | Night hero with `HeroMap` | Work tiles, area rows with bullets, closing statement |
| Overview (expertise, case studies) | White, `t-h1` left, intro right | Link rows with bullets or interchanges |
| Service detail | Flooded in the line colour | Journey with three stops |
| Case study detail | Night, closed by the bundle of related lines | Journey with narrative stops, previous and next |
| Blog index | White | Chronological journey |
| Article | White, narrow, meta bar | `.prose-blog` |
| About | Tinted hero with portrait and tool ornaments | Sections, toolkit list, certifications journey |
| Contact | White, `t-mega` | Form panel |

Heading order: one `h1` per page, `h2` for sections and row titles, `h3` below that.

---

## Do's and don'ts

- Do keep all copy in the content files and page components verbatim. Presentation changes must not change wording.
- Do give every new expertise area a line colour in `globals.css` (`[data-line="<slug>"]`) and add it to `allLines`.
- Do mark decorative lines, bullets and stations with `aria-hidden="true"`.
- Don't use rounded card grids, gradient washes, drop shadows or uppercase eyebrow labels.
- Don't put white text on a line colour, or a line colour as text on paper.
- Don't add diagram labels, numbers or stops that are not in the content.
