import Avatar from "@/components/Avatar";

export default function Monetize() {
  return (
    <section className="bg-canvas py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Monetize your content
            </p>
            <h2 className="mt-4 text-balance font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Your audience is already valuable to B2B brands.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Every time you post, a brand brief can show up in your inbox. Skip
              the DMs from agencies, drop the outreach, and let a fair price per
              post come to you.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                ["Centralized opportunities", "All collaboration requests land in one dashboard, matched to your topics."],
                ["Payments built-in", "Prices are set up front. Approve the post, receive the payout."],
                ["Track performance", "See the impressions, clicks and leads your posts actually bring."],
                ["Easy delivery", "Publish from LinkedIn, X or YouTube — no extra tools to learn."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-4">
                  <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{t}</p>
                    <p className="mt-0.5 text-sm text-muted">{d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="card max-w-sm p-6 shadow-xl shadow-black/[0.06]">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Media kit</p>
                <span className="chip">Public</span>
              </div>
              <div className="flex items-center gap-3">
                <Avatar name="Sofia Nguyen" color="from-emerald-400 to-teal-600" size="lg" />
                <div>
                  <p className="font-display font-semibold text-ink">Sofia Nguyen</p>
                  <p className="text-xs text-muted">HR tech · People ops · 9K followers</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-4 gap-2 text-center">
                {[
                  ["9K", "followers"],
                  ["12%", "engagement"],
                  ["4.9", "rating"],
                  ["€350", "post"],
                ].map(([v, l]) => (
                  <div key={l} className="rounded-xl bg-canvas py-3">
                    <p className="font-display text-base font-bold text-ink">{v}</p>
                    <p className="text-[10px] text-muted">{l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card absolute -right-2 -bottom-10 max-w-[15rem] p-5 shadow-xl shadow-black/[0.06] sm:right-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Payment received
              </p>
              <p className="mt-1 font-display text-3xl font-bold text-ink">€5,000</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-emerald-700">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Instant SEPA payout
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}