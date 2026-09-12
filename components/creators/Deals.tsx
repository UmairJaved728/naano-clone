export default function Deals() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div className="card relative max-w-md p-7 shadow-xl shadow-black/[0.05]">
            <div className="flex items-center gap-2 pb-4">
              <span className="size-2.5 rounded-full bg-rose-400" />
              <span className="size-2.5 rounded-full bg-amber-400" />
              <span className="size-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                  L
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">Leadbay</p>
                  <p className="text-xs text-muted">sent a collaboration request</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                €650 / post
              </span>
            </div>
            <div className="mt-5 rounded-2xl border border-line bg-canvas p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Brief</p>
              <p className="mt-2 text-sm text-ink/80">
                “Show our AI prospecting workflow in action. Focus on how you
                removed manual research from your pipeline.”
              </p>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button className="btn-blue py-2.5">Accept</button>
              <button className="btn-light py-2.5">Decline</button>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Bring your own deals
            </p>
            <h2 className="mt-4 text-balance font-display text-[clamp(32px,5vw,50px)] font-semibold leading-[1.05] tracking-[-0.035em] text-ink">
              Collaboration requests, in one inbox.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Brands find you through Naano. When a brief matches — the price,
              topics and posting window — you accept, publish and get paid.
              Say no to anything that is not your audience, it takes one click.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                ["No more unpaid posts", "Every sponsored collaboration has a price set before you commit."],
                ["Your topics, your rules", "Briefs are screened against your media kit, not sent blindly."],
                ["One-click approvals", "Accept, publish, done. Payout arrives within 24 hours."],
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
        </div>
      </div>
    </section>
  );
}