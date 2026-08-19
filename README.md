# Millwright VR Showcase

A Next.js 14 single-page product showcase for the (fictional) **Millwright Vision Pro** VR headset.
Apple-inspired aesthetic, scroll-triggered animations, parallax, 3D-tilt cards, mouse-follow halo, and a
small backend of API routes for the contact form and product catalog. Designed to deploy straight to Vercel.

## Tech stack

- **Next.js 14** (App Router) with **React 18**
- **TypeScript** strict mode
- **Tailwind CSS 3** for styling
- **Framer Motion 11** for scroll-triggered animations, parallax, 3D tilt
- **Vitest** for unit / route tests

## Getting started

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:3000`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Run the built app |
| `npm run lint` | ESLint (`next lint`) |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |
| `npm test` | Vitest one-shot run |

## Project layout

```
app/
  api/              # Next.js Route Handlers (contact, products, health)
  components/       # Hero, Features, Specs, Gallery, Contact, Footer, MouseFollow
  lib/              # Server-side validation + rate limiter
  layout.tsx        # Root layout + metadata
  page.tsx          # Composes all sections
test/               # Vitest suites (validation + API routes)
.github/workflows/  # GitHub Actions CI
```

## API endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/api/contact` | Validates and accepts a contact form submission. Rate-limited per IP (5 burst, 1/sec refill). Honeypot field silently rejected. |
| `GET` | `/api/products` | Returns a stub catalog of VR headset products as JSON. |
| `GET` | `/api/health` | Liveness probe — returns `{ status: 'ok', time }`. Useful for CI/CD smoke tests. |

### `/api/contact` payload

```jsonc
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "message": "I would love a private demo.",
  "website": "" // honeypot — leave blank
}
```

Validation rules (enforced server-side in `app/lib/validation.ts`):

- `name`: 2–120 chars after trim
- `email`: matches a basic RFC-shaped regex, ≤254 chars
- `message`: 10–5000 chars after trim
- `website`: must be empty; non-empty returns a silent 200 to bots

## Environment variables

Copy `.env.example` to `.env.local` for development. **Never commit real values.**

| Variable | Purpose |
| --- | --- |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | When set, `/api/contact` would forward to SMTP. When unset (default in dev), submissions are logged to stdout. |
| `CONTACT_TO` | Destination address for forwarded contact submissions. |

## Accessibility

- Semantic landmarks (`<main>`, `<section>`, `<header>`, `<footer>`)
- `prefers-reduced-motion` is respected globally (CSS) and by every Framer Motion component
- Mouse-follow halo is hidden on `(pointer: coarse)` / `(hover: none)` devices
- Form fields are properly labeled; honeypot is hidden from assistive tech
- Focus-visible ring on interactive elements

## Performance

- All product imagery is inline SVG → no network round-trips, no CLS
- Animations run on `transform` / `opacity` only (composited, GPU-friendly)
- Framer Motion's `useReducedMotion` short-circuits all animations when requested
- `next/image` ready (no external hosts configured by default)

## Deployment

This project is Vercel-ready by default. From the repo root:

```bash
npm i -g vercel
vercel          # interactive first deploy — picks up framework settings
vercel --prod   # promote to production
```

`vercel.json` adds baseline security headers. CI on `main` (see `.github/workflows/ci.yml`)
runs lint, type-check, test, and build on every push and PR.

## CI / CD

GitHub Actions runs on every push and PR to `main`:

1. Install (`npm ci`)
2. Lint (`npm run lint`)
3. Type-check (`npm run typecheck`)
4. Test (`npm test`)
5. Build (`npm run build`)

To enable auto-deploy, add a Vercel project and reference it from a deploy job in `.github/workflows/ci.yml`.

## License

Internal demo. No license granted.