# Naano — B2B LinkedIn Creator Marketplace (clone)

A rebuild of [naano.com](https://naano.com) as a working product: a two-sided
marketplace where B2B brands book vetted LinkedIn/X/YouTube creators at fixed
per-post prices and trace pipeline back to each post.

**Live demo:** https://naano-clone-green.vercel.app

## Stack
- Next.js 16 (App Router, Turbopack) + TypeScript
- Tailwind CSS v4 + custom design tokens (`globals.css`)
- Neon Postgres + Drizzle ORM (migrations in `lib/db/migrations`)
- Server Actions + DB sessions (bcryptjs, SHA-256 session tokens in an
  httpOnly cookie) — no client-side auth state
- Fonts: Inter + Plus Jakarta Sans via `next/font`

## Routes
Marketing: `/`, `/creators`, `/agencies`, `/agency`, `/talent-agency`,
`/pricing`, `/about`, `/blog`, `/blog/[slug]`, `/case-studies/blogseo`,
`/reports`, `/for/[vertical]`, `/selection`, `/free-tools` (+ creator-worth
calculator), `/linkedin-creator-marketplace`, `/privacy`, `/terms`, `/help`,
`/book`, `/not-found`.

Auth: `/login`, `/register` (+ `/saas`, `/influencer`).

Dashboard (role-aware): `/dashboard`, `/marketplace`, `/marketplace/[id]`,
`/campaigns`, `/campaigns/new`, `/campaigns/[id]`, `/payments`,
`/media-kit`, `/settings`.

Agents: `/llms.txt`, `/pricing.md`, `/robots.txt`, `/sitemap.xml`.

## Getting Started
Set `DATABASE_URL` (a Neon Postgres connection string) in `.env.local`, then:

```bash
npm install
npx drizzle-kit push      # apply schema/migrations
npx tsx lib/db/seed.ts    # seed marketplace + demo users
npm run dev
```

Demo accounts (after seeding): `brand@naano.com` and `creator@naano.com`,
both with password `Naano-demo-2026!`.

Build & preview:
```bash
npm run build
npm run start
```

## Agent capture
This project logs every agent session (prompts, responses, decisions) to
`.agent-logs/`, committed interleaved with code. See `CAPTURE-TEST.md`.

## Attribution to the original
Clone/interactive-demo of naano.com for a 24-hour engineering assessment.
Product & brand belong to Naano.