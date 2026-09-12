import Link from "next/link";

export default function Pricing() {
  return (
    <section id="pricing" className="bg-canvas py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Pricing
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl text-balance text-center font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Start free. Upgrade when you want your time back.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-center text-lg text-muted">
          Choose whether you want to run creator campaigns in-house or have
          Naano operate them.
        </p>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="card flex flex-col p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Self-serve
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold text-ink">
              Run it yourself.
            </h3>
            <p className="mt-2 text-sm text-muted">
              For teams that want the infrastructure to run creator campaigns
              in-house.
            </p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="font-display text-5xl font-bold text-ink">€0</span>
              <span className="text-muted">/ month</span>
            </div>
            <ul className="mt-8 space-y-3 text-sm text-ink/80">
              {[
                "Creator marketplace access",
                "AI-powered brief creation",
                "Track clicks, companies and pipeline",
                "Automatic creator payouts",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" className="mt-0.5 shrink-0">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/register" className="btn-primary mt-8 w-full py-3 text-[15px] font-semibold">
              Start for free
            </Link>
          </div>

          <div className="relative flex flex-col overflow-hidden rounded-3xl bg-night p-8 text-white">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(70% 60% at 85% 0%, rgba(37,99,235,0.4) 0%, transparent 60%)" }}
            />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                Managed campaigns
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold">Get your time back.</h3>
              <p className="mt-2 text-sm text-white/60">
                For teams that want Naano to operate their creator channel end
                to end.
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold">Custom</span>
                <span className="text-white/50">quote</span>
              </div>
              <ul className="mt-8 space-y-3 text-sm text-white/85">
                {[
                  "Campaign strategy and positioning",
                  "Creator sourcing and coordination",
                  "Brief creation and campaign launch",
                  "Reporting and optimisation",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5" className="mt-0.5 shrink-0">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/book" className="btn-light mt-8 w-full py-3 text-[15px] font-semibold">
                Book a campaign call
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          Campaign spend is separate. No lock-in. Cancel anytime.
        </p>
      </div>
    </section>
  );
}