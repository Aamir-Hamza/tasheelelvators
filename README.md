# Tasheel Elevators

Premium Next.js 15 website for **Tasheel Elevators** — elevator manufacturing, installation, modernization, and AMC services across Oman and the GCC.

## Tech stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion + GSAP-ready structure
- Three.js / React Three Fiber (hero elevator scene)
- Lenis smooth scroll
- next-themes (dark / light)
- React Hook Form + Zod
- Lucide icons + Radix UI primitives

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Environment variables

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL |
| `NEXT_PUBLIC_GA_ID` | Google Analytics measurement ID |
| `CONTACT_EMAIL_TO` | Inbox for contact / quote forms |
| `RESEND_API_KEY` | Optional email provider key |
| `NEXT_PUBLIC_WHATSAPP` | WhatsApp number for CTAs |
| `NEXT_PUBLIC_GOOGLE_MAPS_EMBED` | Google Maps embed URL |

Wire email sending inside `src/app/api/contact/route.ts` and `src/app/api/quote/route.ts` (Resend / SendGrid / Nodemailer).

## Pages

- `/` — Homepage (3D hero, services, products, projects, process, FAQ)
- `/about` — Mission, vision, values, timeline, CEO message
- `/products` + `/products/[slug]` — Product catalog
- `/services` + `/services/[slug]` — Service detail
- `/projects` + `/projects/[slug]` — Portfolio + case studies
- `/quote` — Quote calculator + request form
- `/contact` — Contact form, map, emergency number
- `/faq` `/blog` `/safety` `/careers` `/downloads`
- `/privacy` `/terms`

## SEO

- Dynamic metadata + Open Graph
- `sitemap.ts` / `robots.ts`
- Organization JSON-LD

## Deploy to Vercel

1. Push this repository to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

Or from CLI:

```bash
npx vercel
```

## Project structure

```
src/
  app/           # Routes, API, SEO
  components/    # UI, layout, home sections, forms
  lib/           # Utils, constants, content data
```

## Notes

- Replace placeholder phone / WhatsApp / map embed in `src/lib/constants.ts`
- Add real product photography under `public/images/`
- Brochure links currently point to `/brochures/*.pdf` placeholders
- Theme defaults to dark for a premium industrial look; users can toggle light mode
