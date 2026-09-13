# Session log — 2026-09-13 (home rebuild to match live naano.com LP)

## Goal
Make the clone landing homepage structurally + image-identical to live naano.com (user's complaint: "totally different" navbar + background vs original.png/clone.png). Only visual parity matters.

## What was done
1. Decoded the ref home from live DOM (REF_tree.txt, REF_KEYS.json, REF_COPY.json, REF_DEEP.json in the temp audit dir) — full-structural: full-width #c5ebfd nav, image-driven hero (clouds PNG), testimonials, marketplace stage + 3 signal cards, 5-card journey, results proof band, pricing, faq, book CTA, 5-col footer.
2. Downloaded all 27 ref assets (`/lp/*`) into public/lp/ — 0 failures (fetch-assets.mjs).
3. Rebuilt home:
   - Nav: new `skin="lp"` variant (fixed h63 bar, image logo 123x26, 5 links, EN + Sign in/Sign up).
   - Hero: sky bg + clouds img, eyebrow pill, 77px h1, radius-12 ink primary, marquee w/ PNG logos + "CASE STUDY".
   - Testimonial: stacked zmirov logo / blue bar / 52px quote / photo / name.
   - Marketplace: eyebrow pill, 74.88px h2, stage br43.2 + browser shell + screenshot, 3 signals (3,000+ vetted / 100 countries / 96% match).
   - HowItWorks: split header + 5 step cards (ref copy).
   - CaseStudy → "Real teams. Measurable pipeline." (video + case cards + logos).
   - Results: "THE RESULTS" + clouds proof band + 4 stat cards + 4 creator cards.
   - Pricing, FAQ, FinalCTA (book card), Footer (5-col grid) → ref copy/layout.
   - page.tsx: `<Nav links="home" skin="lp" />`.
4. Closure: wrote scripts/audit-clone.mjs (clone vs REF_KEYS drift). Iterated until above-the-fold metrics matched (nav/hero/testimonial/marketplace stage+screenshot all tight). Remaining diffs are cosmetic Inter-vs-Inter-LP line-heights or below-fold deviations.
5. Build green, lint clean on touched files (0 errors).

## Files touched (this session)
- app/page.tsx, components/Nav.tsx, components/LogoMarquee.tsx, components/Footer.tsx
- components/home/{Hero,Testimonial,Marketplace,HowItWorks,CaseStudy,Results,Pricing,FAQ,FinalCTA}.tsx
- scripts/{audit-chip-clone.mjs →} audit-clone.mjs (+ ref audit/fetch scripts committed earlier this session)
- public/lp/ (27 ref assets)

## Verification used
- npm run build (green), eslint on touched files (clean)
- audit-clone.mjs vs REF_KEYS.json (temp: C:\Users\umair\AppData\Local\Temp\opencode\naano-audit\)

## To do next
- Deploy to vercel, smoke home/creators/pricing, push.
- Rotate the Neon password (was printed in chat earlier).
- Optional: tightness pass on below-fold sections (pricing card 654 vs 674, faq item heights).