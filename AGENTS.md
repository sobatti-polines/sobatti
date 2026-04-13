# AGENTS.md — SobatTi Landing

## Project Overview

Next.js 16 landing page for **SobatTi** — IT mentoring & project coaching. Follows the **Coinbase design system** (see `DESIGN.md`).

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS v4 · Framer Motion · Lucide React

---

## Commands

```bash
npm run dev     # Start dev server (localhost:3000)
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

**No test framework is configured.** If tests are needed, add Vitest or Jest and document here.

---

## Code Style

### Imports
- Use `@/*` path alias for project imports (e.g., `@/components/Hero`)
- Group imports: Next.js built-ins → third-party → local (`@/`)
- Use named imports for React hooks/types; default exports for components

### Formatting
- 2-space indentation, no semicolons (per existing codebase)
- Double quotes for strings/JSX attributes
- Trailing commas in multi-line structures
- Self-closing tags for empty JSX elements

### TypeScript
- `strict: true` — no `any` unless absolutely necessary
- Use `interface` for object types, `type` for unions/intersections
- Type all component props explicitly; use `Readonly<>` where appropriate
- `React.ReactNode` for children prop

### Naming Conventions
- **Components:** PascalCase default exports (e.g., `Hero.tsx`, `export default function Hero()`)
- **Files:** PascalCase for components (`Hero.tsx`), camelCase for utilities
- **CSS classes:** Tailwind utility classes + custom classes in `globals.css` using kebab-case or BEM-style

### Components
- All components are **client components** (`"use client"`) when using framer-motion
- Keep components focused and single-purpose
- Use framer-motion `motion.*` elements for animations with `initial`/`animate`/`transition`

### Error Handling
- Use Next.js error boundaries (`error.tsx`) for route-level errors
- Graceful fallbacks for missing data
- No console.error in production code

---

## Design System

See `DESIGN.md` for full Coinbase design spec. Key points:

- **Primary color:** `#0052ff` (Coinbase Blue)
- **Buttons:** 56px border-radius pills (use `.btn-*` classes from `globals.css`)
- **Typography:** Inter (body/sans) + Outfit (display) via CSS variables
- **Sections:** Alternate white (`#ffffff`) and dark (`#0a0b0d`) backgrounds
- **Spacing:** `.section-padding` utility (120px desktop / 80px mobile)

---

## Architecture

```
app/
  layout.tsx      — Root layout with fonts + metadata
  page.tsx        — Home page (assembles all sections)
  globals.css     — Design tokens, button system, utilities
components/
  Hero.tsx, About.tsx, Services.tsx, ... — Section components
```

Each section component is a self-contained `<section>` with its own animations and styling.


