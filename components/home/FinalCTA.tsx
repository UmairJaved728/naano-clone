import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="bg-canvas pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-night p-10 text-white sm:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(55% 55% at 90% 0%, rgba(22,82,240,0.45) 0%, transparent 60%), radial-gradient(40% 40% at 10% 100%, rgba(22,82,240,0.25) 0%, transparent 60%)",
            }}
          />
          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                Ready to launch?
              </p>
              <h2 className="mt-4 text-balance font-display text-[clamp(30px,4vw,44px)] font-semibold leading-[1.1] tracking-[-0.03em]">
                Your next creator campaign starts here.
              </h2>
              <p className="mt-5 max-w-md text-white/60">
                Get a clear creator strategy, campaign format and estimated
                budget for your next launch.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/book" className="btn-light px-7 py-3.5 text-[15px] font-semibold">
                  Book a campaign call
                </Link>
                <Link
                  href="/register"
                  className="btn border border-white/20 bg-white/5 px-7 py-3.5 text-[15px] font-medium text-white backdrop-blur transition hover:bg-white/10"
                >
                  Prefer to start yourself? Start for free →
                </Link>
              </div>
            </div>
            <div className="card !border-0 !rounded-2xl bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300">
                  CAMPAIGN STRATEGY CALL
                </div>
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold text-white">
                30-minute working session
              </h3>
              <p className="mt-2 text-sm text-white/60">
                Leave with a concrete plan for your next creator campaign.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-white/85">
                {["Creator strategy", "Campaign format", "Budget recommendation"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}