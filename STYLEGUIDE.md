# Style Guide — Tom Schoorstra HubSpot Contractor Site

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

## Colour Palette

Defined as CSS custom properties in `src/app/globals.css` and mapped to Tailwind via `@theme inline`.

### Primary colours

| Token | Tailwind class | Hex | Usage |
|-------|---------------|-----|-------|
| `--accent` | `bg-accent` / `text-accent` | `#ff5c35` | HubSpot orange — primary CTA, highlights, active states |
| `--accent-hover` | `hover:bg-accent-hover` | `#e84d28` | Orange hover state |
| `--accent-light` | `bg-accent-light` | `#fff5f2` | Orange tinted backgrounds (CTA sections, active cert cards) |
| `--accent-2` | `bg-accent-2` / `text-accent-2` | `#00a4bd` | Teal — secondary accent, results sections, teal badges |
| `--accent-2-hover` | `hover:bg-accent-2-hover` | `#0091a8` | Teal hover state |
| `--accent-2-light` | `bg-accent-2-light` | `#f0fafb` | Teal tinted backgrounds |
| `--accent-3` | `bg-accent-3` / `text-accent-3` | `#f5c26b` | Gold — use sparingly for tertiary highlights |

### Backgrounds & surfaces

| Token | Tailwind class | Hex | Usage |
|-------|---------------|-----|-------|
| `--bg` | `bg-bg` | `#ffffff` | Page background |
| `--surface` | `bg-surface` | `#ffffff` | Card backgrounds |
| `--surface-2` | `bg-surface-2` | `#f9fafb` | Subtle section backgrounds, zebra striping |
| `--surface-dark` | `bg-surface-dark` | `#0f172a` | Dark sections (not currently used) |

### Text

| Token | Tailwind class | Hex | Usage |
|-------|---------------|-----|-------|
| `--text` | `text-text` | `#0f172a` | Primary text, headings |
| `--text-secondary` | `text-text-secondary` | `#475569` | Body copy, descriptions |
| `--text-muted` | `text-text-muted` | `#64748b` | Labels, metadata, eyebrows |

### Borders

| Token | Tailwind class | Hex | Usage |
|-------|---------------|-----|-------|
| `--border` | `border-border` | `#e5e7eb` | Default borders on cards and dividers |
| `--border-subtle` | `border-border-subtle` | `#f3f4f6` | Very light borders, section separators |

---

## Typography

### Fonts

| Font | Variable | Usage |
|------|----------|-------|
| **Syne** | `--font-syne` → `font-display` class | All headings (H1–H3), large numbers, display text |
| **Geist Sans** | `--font-geist-sans` → `font-sans` | Body copy, UI text, descriptions |
| **Geist Mono** | `--font-geist-mono` → `font-mono` | Code blocks (if used) |

### Using the display font

Always use the `font-display` Tailwind class for headings — never `font-syne` directly:

```tsx
<h1 className="font-display text-5xl font-extrabold">Heading</h1>
```

### Type scale (common patterns)

| Element | Classes |
|---------|---------|
| Hero H1 | `font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl` |
| Page H1 | `font-display text-4xl font-extrabold tracking-tight lg:text-5xl xl:text-6xl` |
| Section H2 | `font-display text-3xl font-bold lg:text-4xl` |
| Subsection H2 | `font-display text-2xl font-bold lg:text-3xl` |
| Card H3 | `font-display text-xl font-bold` or `text-lg font-semibold` |
| Eyebrow label | `text-xs font-semibold uppercase tracking-widest text-accent` |
| Body large | `text-xl leading-relaxed text-text-secondary` |
| Body default | `text-base leading-relaxed text-text-secondary` |
| Body small | `text-sm text-text-secondary` |
| Metadata / label | `text-xs font-medium text-text-muted` |

### Gradient text

```tsx
<span className="text-gradient-orange">text here</span>
```

Produces an orange-to-peach gradient. Use on H1 accents only — not body text.

---

## Spacing & Layout

### Container

Always wrap page content in `<Container>`. Three sizes:

```tsx
<Container>                  // max-w-6xl — default for most pages
<Container size="narrow">    // max-w-4xl — forms, focused content
<Container size="wide">      // max-w-7xl — dashboards, wide layouts
```

Padding: `px-6 lg:px-8` applied automatically.

### Section spacing

| Context | Classes |
|---------|---------|
| Full page section | `py-24 lg:py-32` |
| Smaller section | `py-16 lg:py-20` |
| Page header / hero | `py-20 lg:py-28` |
| Internal section spacing | `space-y-20 lg:space-y-28` |

### Border radius

| Value | Usage |
|-------|-------|
| `rounded-xl` | Buttons, small interactive elements |
| `rounded-2xl` | Cards, most containers |
| `rounded-3xl` | CTA sections, large feature blocks |
| `rounded-full` | Pills, avatar circles, dot indicators |

---

## Components

### Button — `src/components/ui/Button.tsx`

```tsx
<Button href="/contact" variant="primary" size="lg" showArrow>
  Plan a call
</Button>
```

| Prop | Options | Default |
|------|---------|---------|
| `variant` | `primary` / `secondary` / `ghost` | `primary` |
| `size` | `sm` / `md` / `lg` | `md` |
| `showArrow` | boolean | `false` |
| `href` | string | renders as `<Link>` |
| `onClick` | function | renders as `<button>` |

- **primary** — orange fill, white text. Main CTAs.
- **secondary** — white bg, border, dark text. Secondary actions.
- **ghost** — transparent, subtle hover. Tertiary or nav actions.

---

### Badge — `src/components/ui/Badge.tsx`

```tsx
<Badge variant="orange">10-15 hrs/week</Badge>
<Badge variant="teal" size="sm">HubSpot</Badge>
<Badge variant="neutral">Operations Hub</Badge>
```

| Variant | Appearance | Usage |
|---------|-----------|-------|
| `orange` | Light orange bg, orange text | Results / metric highlights |
| `orange-solid` | Solid orange bg, white text | Status indicators |
| `teal` | Light teal bg, teal text | Tech stack tags |
| `neutral` | Light grey bg, muted text | Industry / category labels |

---

### ScrollReveal — `src/components/ui/ScrollReveal.tsx`

Wraps content in a fade+slide-up animation triggered on scroll entry.

```tsx
<ScrollReveal>
  <div>Content fades in on scroll</div>
</ScrollReveal>

// Stagger delay for grids
{items.map((item, i) => (
  <ScrollReveal key={item.id} delay={i * 0.08}>
    <Card />
  </ScrollReveal>
))}
```

- Animates once, fires 80px before viewport entry
- Default: `opacity: 0, y: 24` → `opacity: 1, y: 0` over 0.6s easeOut

---

### AnimatedNumber — `src/components/ui/AnimatedNumber.tsx`

Counts up from 0 when it enters the viewport.

```tsx
<AnimatedNumber value={15} suffix=" hrs/wk" />
<AnimatedNumber value={90} prefix="~" suffix="%" />
```

| Prop | Type | Default |
|------|------|---------|
| `value` | number | required |
| `prefix` | string | `""` |
| `suffix` | string | `""` |
| `duration` | number (seconds) | `1.5` |

---

### Container — `src/components/ui/Container.tsx`

See Layout section above.

---

### Accordion — `src/components/ui/Accordion.tsx`

FAQ sections on service detail pages. Animated with Framer Motion AnimatePresence.

```tsx
<Accordion items={service.faq} />
// items: Array<{ q: string; a: string }>
```

---

### ProcessTimeline — `src/components/sections/ProcessTimeline.tsx`

Numbered vertical timeline for process steps.

```tsx
<ProcessTimeline steps={service.process} />
// steps: Array<{ title: string; description: string }>
```

Orange numbered bubbles (01, 02...) with vertical connector line on desktop. Each step animates in from the left on scroll.

---

### PageHeader — `src/components/sections/PageHeader.tsx`

Standard hero for inner pages.

```tsx
<PageHeader
  eyebrow="Services"
  title="Building HubSpot that works for your team"
  subtitle="Five focused services..."
  primaryCta={{ label: "Talk about your project", href: "/contact" }}
  secondaryCta={{ label: "See case studies", href: "/case-studies" }}
/>
```

Includes dot grid background and orange glow blob automatically.

---

### CTASection — `src/components/sections/CTASection.tsx`

Bottom-of-page CTA block. Used on every page.

```tsx
<CTASection
  title="Ready to get started?"
  description="Tell me what you're working on..."
  cta={{ label: "Talk about your project", href: "/contact" }}
  secondaryCta={{ label: "See case studies", href: "/case-studies" }}
/>
```

---

### StatBar — `src/components/sections/StatBar.tsx`

Row of animated metric stats.

```tsx
<StatBar
  background="teal"
  stats={[
    { value: 15, suffix: " hrs/wk", label: "Saved per project" },
    { value: 50, suffix: "%", label: "Faster reporting" },
  ]}
/>
```

| `background` | Appearance |
|---|---|
| `teal` | Teal bg, white text |
| `orange` | Orange bg, white text |
| `light` | Light grey bg, orange numbers |

---

## Background Utilities

### Dot grid

```tsx
<div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
```

Subtle 24px repeating dot pattern. Used on page headers and homepage hero. Typical opacity: 40–50%.

### Orange glow blob

```tsx
<div className="absolute -top-24 -right-24 h-[400px] w-[400px] rounded-full bg-accent/6 blur-[80px] pointer-events-none" />
```

Soft radial glow. Used top-right on most page headers. Teal variant: `bg-accent-2/6`.

### Gradient mesh

```tsx
<div className="gradient-mesh" />
```

Combined orange + teal radial gradient background utility class.

---

## Card Patterns

### Interactive card (hover lift)

```tsx
<div className="rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:border-accent/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_-8px_rgb(0_0_0/0.10)]">
```

### Static card (no hover)

```tsx
<div className="rounded-2xl border border-border bg-surface-2 p-6">
```

### CTA / accent card

```tsx
<div className="rounded-3xl bg-accent-light border-2 border-accent/15 px-8 py-14">
```

---

## Animations (Framer Motion)

### Rules

- Always use string eases: `ease: "easeOut"` — never raw arrays (TypeScript error)
- Use `<ScrollReveal>` for scroll animations instead of writing inline Framer Motion
- Use `<AnimatedNumber>` for all metric counters

### Common patterns

```tsx
// Standard scroll reveal
initial={{ opacity: 0, y: 24 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: "easeOut" }}

// Timeline slide from left
initial={{ opacity: 0, x: -16 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.5, ease: "easeOut" }}

// Stagger container + item
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

// Floating loop (hero stat cards)
animate={{ y: [0, -7, 0] }}
transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
```

### Stagger delays

- 3-column grids: `delay={i * 0.08}`
- 2-column grids: `delay={i * 0.1}`

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

## Page Structure Convention

Every inner page follows this order:

1. `<header>` / `<PageHeader>` with H1
2. Main `<section>` with content
3. `<CTASection>` at the bottom — always

### Eyebrow + heading pattern

Every major section uses this pattern:

```tsx
<p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
  Eyebrow label
</p>
<h2 className="font-display text-3xl font-bold text-text lg:text-4xl">
  Section heading
</h2>
```

---

## Do's and Don'ts

| Do | Don't |
|----|-------|
| Use `font-display` for all headings | Use `font-syne` directly in className |
| Use `text-text-secondary` for body copy | Use raw Tailwind greys like `text-gray-500` |
| Use `<Container>` for all page content | Use raw `max-w-*` + `mx-auto` directly |
| Use `<ScrollReveal>` for scroll animations | Write Framer Motion inline unnecessarily |
| Use string eases: `"easeOut"` | Use array eases like `[0.4, 0, 0.2, 1]` |
| Keep content in `/src/content/` files | Hardcode content in page components |
| Use `rounded-2xl` or `rounded-3xl` for cards | Mix arbitrary border radius values |
| Add `pointer-events-none` to decorative elements | Leave decorative divs blocking clicks |
