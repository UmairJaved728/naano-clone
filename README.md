# Naano — B2B LinkedIn Creator Marketplace

A full-stack product that lets B2B brands book vetted LinkedIn, X, and YouTube creators at fixed per-post prices and trace pipeline revenue back to every published post. Ships as a complete, self-contained application with a production-grade landing page, a role-aware dashboard, a relational data layer, and a full marketing site.

**Live demo:** https://naano-clone-green.vercel.app

---

## What the product does

Naano sits between two audiences — B2B brands looking to run creator-led acquisition, and specialised LinkedIn/X/YouTube creators who publish for those brands. Every part of the product is built around the loop:

**Discover → Book → Publish → Attribute → Pay**

- **Discover**: Brands browse a marketplace of vetted creators, filter by follower count, fit score, price, topics, and networks, and bookmark shortlists.
- **Book**: Brands create a campaign brief (objective, audience, budget, key messages, guidelines, tracking link) and invite creators directly from the marketplace.
- **Publish**: Creators receive the brief, draft content, and publish on LinkedIn, X, or YouTube with UTM-tracked links.
- **Attribute**: A tracking pixel records impressions, clicks, and qualified leads per post, routing them back to the campaign dashboard.
- **Pay**: Brands pay per published post; payments are recorded per creator per campaign with clear pending/paid status.

---

## Landing page and marketing site

The landing page is built to match the live naano.com design pixel-for-pixel, using 27 ref assets downloaded from the live site and a custom drift-audit tooling pipeline that compares computed geometry, typography, and colour against the live DOM at every iteration.

**Above the fold**
- Fixed 63px `#c5ebfd` navigation bar with logo, five links, locale toggle, Sign in and Sign up.
- Hero section with sky-blue background, clouds imagery, eyebrow pill, 77px headline, body copy, primary ink radius-12 CTA, secondary text-link CTA, and a trust line with marquee of 10 B2B brand logos.

**Full page sections (in order)**
- **Testimonial**: Stacked layout — Zmirov logo, blue accent bar, 52px blockquote, founder photo, name and role.
- **Marketplace preview**: Eyebrow pill with accent dot, 74.88px headline, body copy, a stage with atmosphere imagery, browser shell (chrome, URL pill, screenshot), and three signal cards (3,000+ vetted creators, 100 countries, 96% audience-fit match).
- **How it works**: Split header (eyebrow, headline, paragraph) and a five-card grid (Find creators, Build brief, Manage collaboration, Track reach, Pay creators) with step badges and inner product panels.
- **Testimonials ("Real teams. Measurable pipeline.")**: Video testimonial card, BlogSEO case study card with metrics, and a trust logo row of 10 brands.
- **Results**: "THE RESULTS" eyebrow, headline, cloud proof band with 4 stat-pop cards (5M+ impressions, 30K+ leads, 2,000+ creators, 5K+ posts), and a 4-column grid of creator post cards with impressions/clicks/leads.
- **Pricing**: Two white radius-28 cards — Self-serve (€0/month, 4 feature rows, text-link CTA) and Managed campaigns (custom quote, 4 feature rows, ink button CTA).
- **FAQ**: Two-column layout with sticky intro (headline, copy, "Talk to our team" link) and an eight-question accordion with expand/collapse animations.
- **Book CTA**: Gradient band with clouds, eyebrow, headline, white book card (strategy call, 3 items, ink CTA, "Start for free" link).
- **Footer**: Five-column grid (brand blurb, Product, Company + AI agents, Press, Resources with 15 links), legal row with copyright and Trustpilot rating.

**Additional marketing pages (20 static routes)**
- `/creators` — Creator marketplace with follower, fit, price, topic and network filters.
- `/creators/[slug]` — Individual creator profiles.
- `/agencies`, `/agency`, `/talent-agency` — Agency-focused pages.
- `/pricing` — Pricing page with self-serve and managed tiers.
- `/about` — Company page.
- `/blog`, `/blog/[slug]` — Six SEO articles with generateStaticParams.
- `/case-studies/blogseo` — BlogSEO case study.
- `/reports` — Reports & benchmarks.
- `/for/[vertical]` — Eight vertical-specific landing pages (sales-tech, revops, devtools, SaaS, AI, marketing, HR-tech, finance).
- `/linkedin-creator-marketplace` — SEO landing page.
- `/free-tools`, `/free-tools/creator-worth` — Creator worth calculator.
- `/selection` — Creator selection wizard.
- `/book` — Strategy call booking page.
- `/privacy`, `/terms`, `/help` — Legal and support pages.
- `/_not-found` — Custom 404.

---

## Dashboard

A role-aware dashboard served under `/dashboard`, with distinct views for brands and creators. Every dashboard route is protected by an httpOnly session cookie — there is no client-side auth state.

**Brand dashboard**
- `/dashboard` — Overview with active campaigns, total spend, total impressions, total clicks, and total leads. Campaign cards show status badges (live, briefing, draft), creator counts, and key metrics.
- `/dashboard/marketplace` — Full marketplace browser with search by name/bio/topics, follower range slider, price range slider, fit slider, network checkboxes (LinkedIn, X, YouTube), topic checkboxes (AI, SaaS, Sales, Marketing, etc.), and a creator grid with fit scores, prices, and bookmark toggles.
- `/dashboard/marketplace/[id]` — Individual creator detail with bio, topics, network icons, follower counts, latest post with impressions/clicks/leads, and a "Book creator" action.
- `/dashboard/campaigns` — Campaign list with status filter tabs (All, Live, Briefing, Draft).
- `/dashboard/campaigns/new` — Campaign creation form: name, objective, audience, budget, topic, tracking link, brief, key messages (add/remove), and guidelines.
- `/dashboard/campaigns/[id]` — Campaign detail with full brief, tracking link, invited creators with state badges (Invited, Draft, Scheduled, Live, Approved, Declined), and an "Invite creator" action from the marketplace.
- `/dashboard/payments` — Payment history grouped by campaign with creator names, amounts, and paid/pending status badges.
- `/dashboard/settings` — Profile settings with name, email, company, headline, bio, and theme toggle.

**Creator dashboard**
- `/dashboard/media-kit` — Media kit with follower count, topic tags, networks, pricing, rating, and a pre-built preview card.
- `/dashboard/settings` — Profile settings.

---

## Creator marketplace

Ten B2B creators spanning AI, SaaS, Sales, RevOps, PLG, DevTools, HR-tech, Content, Marketing, and Founders. Each creator has:

| Field | Description |
|---|---|
| `slug` | URL-safe identifier |
| `name`, `firstName` | Full and first name |
| `headline` | Role · vertical · follower count |
| `bio` | One-line summary |
| `follows` | Follower count (9K–98K) |
| `fit` | Audience-fit score (76–92%) |
| `price` | Per-post price in EUR (€350–€3,000) |
| `rating` | Quality rating (4.6–4.9) |
| `networks` | LinkedIn, X, YouTube |
| `topics` | 3–4 relevant topics each |
| `countries` | Location and region |
| `color` | Gradient for avatar rendering |
| `latestPost` | Title, impressions, clicks, leads, brand, URL |

Creators span six countries (France, UK, UAE, Portugal, Singapore, Germany) and four global regions.

---

## Data layer

**Schema** (`lib/db/schema.ts`): Eight tables with full relational integrity:

- `users` — Brand and creator accounts with bcrypt password hashes, roles, company, headline, bio, price, topics, and avatar gradients.
- `creators` — Marketplace creator profiles with slug, name, headline, bio, networks, topics, followers, fit, price, rating, and embedded latest-post data.
- `campaigns` — Brand campaigns with name, objective, audience, budget, topic, status, tracking link, brief, key messages array, and guidelines.
- `campaign_creators` — Join table with state machine (invited → draft → scheduled → live → approved/declined), percent allocation, and timestamped lifecycle.
- `posts` — Published posts with title, impressions, clicks, leads, brand, and published-at timestamp.
- `bookmarks` — User–creator bookmark pairs with composite primary key.
- `payments` — Campaign-level payments with creator, brand, amount, and paid/pending status.
- `sessions` — SHA-256 session token hashes with user reference and expiry.

All tables use UUID primary keys, `ON DELETE CASCADE` foreign keys, and timezone-aware timestamps.

---

## Auth and security

- **Password hashing**: bcryptjs with automatic salt generation.
- **Session management**: Server-side SHA-256 token stored in `sessions` table, issued as an httpOnly, secure, SameSite=Lax cookie. No JWTs, no client-side auth state.
- **Server Actions**: All mutations run through Next.js Server Actions with direct Neon Postgres queries — no exposed API routes for authenticated operations.
- **Middleware protection**: Dashboard routes require a valid session; unauthenticated users are redirected to `/login`.

---

## Infrastructure

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + custom design tokens |
| Database | Neon Postgres (serverless) |
| ORM | Drizzle ORM with migrations |
| Auth | bcryptjs + SHA-256 httpOnly sessions |
| Fonts | Inter + Plus Jakarta Sans via `next/font` |
| Deployment | Vercel (production alias) |
| Static generation | 47 pre-rendered routes via `generateStaticParams` |

---

## Project structure

```
├── app/
│   ├── page.tsx                    # Landing page (Nav + 9 sections + Footer)
│   ├── login/, register/           # Auth flows (role selection, SaaS/influencer)
│   ├── dashboard/                  # Role-aware dashboard (brand + creator)
│   │   ├── marketplace/            # Marketplace browser + [id] detail
│   │   ├── campaigns/              # Campaign list + new + [id] detail
│   │   ├── payments/               # Payment history
│   │   ├── media-kit/              # Creator media kit
│   │   └── settings/               # Profile settings
│   ├── blog/, blog/[slug]/         # Blog with generateStaticParams
│   ├── for/[vertical]/             # Vertical-specific landing pages
│   ├── pricing/, about/, help/     # Marketing pages
│   ├── creators/, agencies/        # Marketplace + agency pages
│   ├── book/, reports/, selection/ # Booking, reports, selection wizard
│   ├── free-tools/                 # Creator worth calculator
│   └── actions/                    # Server Actions (auth, campaign, payment)
├── components/
│   ├── Nav.tsx                     # Dual-skin navbar (pill + LP full-width)
│   ├── Footer.tsx                  # 5-column footer with cloud gradient
│   ├── Logo.tsx, Avatar.tsx        # Reusable UI primitives
│   ├── LogoMarquee.tsx             # Infinite marquee (text, images, labels)
│   ├── home/                       # 9 landing page sections
│   ├── creators/                   # Marketplace + hero + CTA components
│   └── dashboard/                  # Dashboard widgets (campaigns, marketplace, media-kit, etc.)
├── lib/
│   ├── data.ts                     # 10 creators + 3 campaigns + format helpers
│   ├── actions.ts                  # Campaign + payment Server Actions
│   ├── db/
│   │   ├── schema.ts               # Drizzle schema (8 tables)
│   │   ├── index.ts                # Neon connection
│   │   ├── seed.ts                 # Database seeder
│   │   └── migrations/             # Drizzle migration files
│   └── types.ts                    # Shared TypeScript types
├── public/lp/                      # 27 landing page assets (logos, images, avatars)
├── scripts/
│   ├── audit-keys.mjs              # Ref DOM geometry extractor
│   ├── audit-clone.mjs             # Clone vs ref drift report
│   ├── audit-copy.mjs              # Ref copy extractor
│   ├── audit-deep.mjs              # Deep style comparison
│   ├── probe-hero.mjs              # Hero CTA size validator
│   └── fetch-assets.mjs            # Asset downloader
└── .agent-logs/                    # Session logs (prompts, decisions, actions)
```

---

## Key features in detail

### Dual-skin navigation
The `Nav` component renders two distinct skins via a `skin` prop — `pill` (floating rounded bar for inner pages) and `lp` (full-width fixed bar for the landing page). Both skins include a mobile hamburger menu with animated open/close, link lists, and CTA buttons.

### Infinite logo marquee
`LogoMarquee` renders a seamless infinite-scroll track supporting three item types: text labels, image logos (with opacity fade), and leading labels (e.g., "CASE STUDY"). The track duplicates its contents and uses CSS animation for continuous horizontal movement with a horizontal fade mask.

### Campaign state machine
Each creator in a campaign follows a strict lifecycle: `invited → draft → scheduled → live → approved` (or `declined`). State transitions are timestamped, allowing brands to track exactly when creators were invited, when drafts were submitted, and when posts went live.

### Post attribution
Every published post carries `impressions`, `clicks`, and `leads` — all surfaced at the campaign level as aggregated metrics. Campaigns also show total pipeline and cost, enabling ROI calculation per campaign and per creator.

### Drift-audit tooling
A suite of Puppeteer-based audit scripts (`audit-keys.mjs`, `audit-clone.mjs`, `audit-copy.mjs`, `probe-hero.mjs`) extracts computed geometry, typography, colour, and copy from both the live naano.com DOM and the running clone, producing JSON diff reports that drive iterative parity improvements. The tooling captured exact metrics (nav height, font sizes, border radii, padding, gradient colours) for every section of the landing page and compared them against the clone at 1440×1000 viewport.

### Static + dynamic rendering
The 47 routes split cleanly: marketing pages and blog posts are statically pre-rendered at build time via `generateStaticParams`; dashboard routes are server-rendered on demand. This gives instant page loads on the marketing site while keeping the dashboard always up to date.

### Fully seeded marketplace
The database seeder populates 10 B2B creators across 6 countries, 3 demo campaigns (live, briefing, draft) with tracked creators, and 6 demo posts with impressions/clicks/leads — ready for immediate interaction after `npx tsx lib/db/seed.ts`.

---

## Getting started

Set `DATABASE_URL` (a Neon Postgres connection string) in `.env.local`, then:

```bash
npm install
npx drizzle-kit push      # apply schema to Neon
npx tsx lib/db/seed.ts    # seed creators, campaigns, posts
npm run dev               # start on http://localhost:3100
```

**Demo accounts** (after seeding):

| Email | Role | Password |
|---|---|---|
| `brand@naano.com` | Brand | `Naano-demo-2026!` |
| `creator@naano.com` | Creator | `Naano-demo-2026!` |

**Build and preview:**

```bash
npm run build
npm start
```

**Deploy to Vercel:**

```bash
vercel --prod
```

---

## Agent session logs

Every development session is logged to `.agent-logs/` with timestamps, prompts, decisions, and actions — committed alongside the code for full traceability.
