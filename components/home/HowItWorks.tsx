import Avatar from "@/components/Avatar";
import { creators } from "@/lib/data";

export default function HowItWorks() {
  const c1 = creators[0];
  const c3 = creators[2];
  const c2 = creators[1];

  return (
    <section id="how-it-works" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          One platform, from brief to results
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Run creator campaigns from one place.
        </h2>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Find the right voices, launch faster, and connect every post to
          measurable business results.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* 01 */}
          <div className="card p-7">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-semibold text-muted">01</span>
              <span className="chip">Find creators your buyers trust</span>
            </div>
            <h3 className="mt-6 font-display text-xl font-semibold text-ink">
              Match by audience fit
            </h3>
            <p className="mt-2 text-sm text-muted">
              Rank creators by who actually reaches your buyers — not follower
              count alone.
            </p>
            <div className="mt-6 space-y-3">
              {[c1, c2, creators[4]].map((c) => (
                <div key={c.id} className="flex items-center gap-3">
                  <Avatar name={c.name} color={c.color} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{c.firstName}</p>
                  </div>
                  <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
                    Fit {c.fit}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 02 */}
          <div className="card p-7">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-semibold text-muted">02</span>
              <span className="chip">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
                AI
              </span>
            </div>
            <h3 className="mt-6 font-display text-xl font-semibold text-ink">
              Build a campaign brief in minutes
            </h3>
            <p className="mt-2 text-sm text-muted">
              Objectives, key messages and creator guidelines — generated from
              your product in one prompt.
            </p>
            <div className="mt-6 space-y-2 rounded-2xl border border-line bg-canvas p-4">
              {["Objectives & key messages", "Creator guidelines", "Tracking links ready"].map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm text-ink/80">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" className="shrink-0">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* 03 */}
          <div className="card p-7">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-semibold text-muted">03</span>
              <span className="chip">Manage every collaboration</span>
            </div>
            <h3 className="mt-6 font-display text-xl font-semibold text-ink">
              One inbox for all creators
            </h3>
            <p className="mt-2 text-sm text-muted">
              Approve content, schedule posts and track delivery in a single
              pipeline.
            </p>
            <div className="mt-6 space-y-2">
              {[
                { c: creators[5], badge: "Draft ready", cls: "bg-amber-50 text-amber-700" },
                { c: creators[6], badge: "Scheduled", cls: "bg-indigo-50 text-indigo-700" },
                { c: creators[1], badge: "Live", cls: "bg-emerald-50 text-emerald-700" },
              ].map(({ c, badge, cls }) => (
                <div key={c.id} className="flex items-center gap-3 rounded-xl border border-line px-3 py-2">
                  <Avatar name={c.name} color={c.color} size="sm" />
                  <p className="min-w-0 flex-1 truncate text-sm font-medium text-ink">{c.firstName}</p>
                  <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${cls}`}>{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 04 */}
          <div className="card p-7">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-semibold text-muted">04</span>
              <span className="chip">Track reach, clicks, and leads</span>
            </div>
            <h3 className="mt-6 font-display text-xl font-semibold text-ink">
              Attribution you can trust
            </h3>
            <p className="mt-2 text-sm text-muted">
              Every click, lead and euro of pipeline traced back to the exact
              creator and post.
            </p>
            <div className="mt-6 rounded-2xl border border-line bg-canvas p-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-muted">Attributed pipeline</p>
                  <p className="font-display text-3xl font-bold text-ink">€48.2K</p>
                </div>
                <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
                  +24%
                </span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {[
                  ["124K", "views"],
                  ["418", "leads"],
                  ["€1.24K", "spent"],
                ].map(([v, l]) => (
                  <div key={l} className="rounded-xl bg-white py-2">
                    <p className="text-sm font-bold text-ink">{v}</p>
                    <p className="text-[11px] text-muted">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 05 */}
          <div className="card p-7">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-semibold text-muted">05</span>
              <span className="chip">Pay creators without the admin</span>
            </div>
            <h3 className="mt-6 font-display text-xl font-semibold text-ink">
              Automated payouts
            </h3>
            <p className="mt-2 text-sm text-muted">
              Approve content and pay every creator in one click, securely via
              Stripe Connect.
            </p>
            <div className="mt-6 rounded-2xl border border-line bg-canvas p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted">Payment scheduled</p>
                  <p className="text-sm font-medium text-ink">Creator payout · €1,240</p>
                </div>
                <span className="chip text-emerald-700">Handled by Naano</span>
              </div>
              <div className="mt-3 flex gap-2 text-xs">
                {["Contract", "Invoice", "Payout"].map((t) => (
                  <span key={t} className="rounded-full border border-line bg-white px-2.5 py-1 text-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* pull section */}
          <div className="relative overflow-hidden rounded-3xl bg-night p-7 text-white">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(60% 60% at 80% 10%, rgba(37,99,235,0.35) 0%, transparent 60%)" }}
            />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                Creator first
              </p>
              <h3 className="mt-4 text-balance font-display text-2xl font-bold leading-tight">
                Built for both sides of the marketplace.
              </h3>
              <p className="mt-3 text-sm text-white/60">
                Creators set their price, review briefs, publish and get paid
                within 24 hours. Companies run the whole operation from one
                dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}