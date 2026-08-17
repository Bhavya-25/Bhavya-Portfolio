# QA Discovery — Phase 0

Auto-generated understanding of the application. Regenerate this by re-reading
the sources listed below when the app changes significantly — most of it is
derived from files the QA suite already imports at runtime (`qa/utils/routes.ts`),
so route/content drift mostly self-heals without editing this file.

## Stack

| | |
|---|---|
| Framework | Next.js 16.3.0 (App Router, Turbopack) |
| UI library | React 19.2.8 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Animation | GSAP + `@gsap/react`, Three.js / `@react-three/fiber` |
| Package manager | npm (`package-lock.json` present) |
| Node | v24.13.1 (local dev machine) |
| Dev server | `npm run dev` → Turbopack, default port **3000** |
| Build | `npm run build` |
| Start (prod) | `npm run start` |
| Lint | `npm run lint` (ESLint 9, flat config, `eslint-config-next`) |
| Existing test framework | **None** prior to this QA setup |
| Auth | **None** — no login, no protected routes, no user accounts |

## Route inventory

Static:
`/`, `/about`, `/services`, `/projects`, `/blog`, `/resources`, `/resume`, `/contact`

Dynamic (params sourced live from `src/data/*.ts` — counts will drift as content
is added, which is why the QA route module imports these files directly instead
of hardcoding slugs):
- `/services/[slug]` — 20 entries (`src/data/services.ts`)
- `/projects/[slug]` — 5 entries (`src/data/projects.ts`)
- `/resources/[slug]` — 7 entries (`src/data/resources.ts`, filtered to
  `resourcePages` — 3 of the 10 resource entries point out to other real pages
  via an explicit `href` instead of owning a `/resources/[slug]` page, and are
  correctly excluded)

API routes:
- `POST /api/contact` — multipart form-data, rate-limited (in-memory, 5 req/10min
  per IP), honeypot + timing bot-trap, sends mail via Nodemailer/Gmail
- `POST /api/newsletter` — JSON body, same mailer

No sitemap crawling needed for discovery — `src/app/sitemap.ts` already
encodes the full canonical route list from the same data files, so
`qa/utils/routes.ts` reuses that logic directly rather than re-deriving it.

## Forms

| Form | Location | Fields |
|---|---|---|
| Contact | `/contact`, `src/components/contact/contact-form.tsx` | name*, email*, phone, company, website, projectType, timeline, budget, servicesRequired (multi-select), message*, attachment (file, ≤8MB), preferredContact, consent* |
| Newsletter | Global footer, `src/components/footer/newsletter-cta.tsx` | email* |

Both have client-side validation, a hidden honeypot field, and a
`startedAt`-based timing check server-side. Neither can complete a **real**
email send in this environment — `GMAIL_USER` / `GMAIL_APP_PASSWORD` are not
set locally, so the API routes correctly return a friendly 500
("isn't configured yet") rather than crash. QA treats that specific graceful
failure as expected/PASS, not a bug — it's the documented fallback behavior,
not a defect. Full mail-delivery testing would need those two env vars.

## Environment variables

| Var | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No (defaults to `http://localhost:3000`) | Canonical URL in metadata/sitemap |
| `GMAIL_USER` | No (mail send degrades gracefully) | Contact/newsletter mail sender |
| `GMAIL_APP_PASSWORD` | No (same) | Contact/newsletter mail auth |

No secrets are required to run the QA suite. None are printed or stored by it.

## Navigation structure

Single source of truth: `src/data/navigation.ts` (`mainNavigation`) — feeds
the desktop header, the mobile slide-in panel, and the footer nav. Services
and Resources render as mega menus (hover-intent on desktop, portal-based
full-screen panel on mobile).

## Interactive surfaces discovered

- Desktop mega menu (Services, Resources) + mobile nav panel (hamburger→X,
  focus trap, ESC/click-outside close)
- Theme toggle (light/dark, `next-themes`)
- FAQ accordion — desktop split-panel nav, mobile true accordion
  (`src/components/sections/faq.tsx`, reused on Home and `/contact`)
- Testimonial carousel on `/projects` (prev/next, progress dots, swipe)
- Project category filter chips on `/projects` (client-side filter)
- Scroll-driven pinned sections (Home "Selected Work", "What I Build") — GSAP
  ScrollTrigger, deliberately built to avoid the white-screen pin bug fixed
  earlier this project; QA should watch for regressions here specifically.
- Contact form: multi-select service chips, file upload with client-side
  size/type validation, radio group

## Safety notes for QA

- No destructive actions exist anywhere in the app (no delete/purchase/cancel
  flows) — there is nothing in Phase 6's DANGEROUS bucket to avoid.
- The two POST forms are rate-limited server-side (5 requests / 10 min / IP).
  QA form tests must stay well under that per test run, and must never fire
  in a tight loop against the real endpoint.
- All personal contact details rendered on the site (email, LinkedIn, Upwork)
  are real. QA must never actually submit a form in a way that emails the
  site owner during automated runs beyond what's needed to prove the pipeline
  works — synthetic/obviously-test data only, never sent as real correspondence.
