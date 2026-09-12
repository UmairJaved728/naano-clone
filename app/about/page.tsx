import Link from "next/link";
import { Metadata } from "next";
import LandingLayout from "@/components/LandingLayout";
import Avatar from "@/components/Avatar";

export const metadata: Metadata = {
  title: "About Naano — the B2B LinkedIn creator marketplace",
  description:
    "Naano is the B2B LinkedIn creator marketplace founded in Paris in 2025. Meet the team and the numbers behind 2,000+ creators and 5M+ impressions.",
};

const founders = [
  {
    name: "Thomas Marcelle",
    role: "CEO & Co-founder",
    bio: "Ex-emerging talent scout who saw micro-influencers get paid months late. Started Naano to make B2B creator deals instant and accountable.",
    color: "from-blue-600 to-indigo-600",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Justine Namour",
    role: "CTO & Co-founder",
    bio: "Software engineer turned builder. Leads the matching engine and the attribution stack that ties every post back to pipeline.",
    color: "from-fuchsia-500 to-purple-600",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Alexis Jarre",
    role: "CMO & Co-founder",
    bio: "Growth operator who spent years creating B2B content for scale-ups. Owns the marketplace side — the creators are his people.",
    color: "from-emerald-500 to-teal-600",
    linkedin: "https://www.linkedin.com/",
  },
];

export default function AboutPage() {
  return (
    <LandingLayout>
      <div className="bg-canvas">
        <section className="mx-auto max-w-6xl px-6 pt-14">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">About Naano</p>
            <h1 className="mt-5 font-display text-5xl font-bold tracking-tight text-ink sm:text-6xl">
              The marketplace where B2B brands meet creators.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Founded in Paris in 2025, Naano exists because B2B buying is built
              on trust — and trust lives in the people your buyers already
              follow. We built the rails for that trust: fixed prices, clean
              contracts, honest attribution and payouts creators can set a watch by.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-3xl font-bold text-ink">The team</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {founders.map((f) => (
              <div key={f.name} className="card p-8">
                <div className="flex items-center justify-between">
                  <Avatar name={f.name} color={f.color} size="lg" />
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${f.name} on LinkedIn`}
                    className="grid size-9 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-black/5"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45z" />
                    </svg>
                  </a>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-ink">{f.name}</h3>
                <p className="text-sm font-medium text-accent">{f.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.bio}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="card relative overflow-hidden bg-night p-10 text-white">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(60% 60% at 90% 0%, rgba(37,99,235,0.35) 0%, transparent 60%)" }}
            />
            <div className="relative">
              <h2 className="font-display text-3xl font-bold">Naano at a glance</h2>
              <div className="mt-8 grid grid-cols-2 gap-8 lg:grid-cols-4">
                {[
                  ["2025", "founded in Paris"],
                  ["3,000+", "vetted creators"],
                  ["5M+", "impressions generated"],
                  ["30K+", "leads attributed"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <p className="font-display text-4xl font-bold">{v}</p>
                    <p className="mt-1 text-sm text-white/50">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-line bg-white p-8">
              <h3 className="font-display text-xl font-bold text-ink">For brands</h3>
              <ul className="mt-5 space-y-3 text-sm text-ink/80">
                {[
                  "Fixed-price creator campaigns, from brief to payout",
                  "Attribution that ties every lead to a post",
                  "Creators matched to audience fit, not follower count",
                  "Start free, upgrade for a done-for-you channel",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1652f0" strokeWidth="2.5" className="mt-0.5 shrink-0">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-line bg-white p-8">
              <h3 className="font-display text-xl font-bold text-ink">For creators</h3>
              <ul className="mt-5 space-y-3 text-sm text-ink/80">
                {[
                  "Set your own price per post",
                  "Accept or decline any brief in one click",
                  "Payouts within 24 hours of approval",
                  "Bring your own direct deals too",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5" className="mt-0.5 shrink-0">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/register" className="btn-primary px-8 py-3.5 text-[15px] font-semibold">
              Join the marketplace
            </Link>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}