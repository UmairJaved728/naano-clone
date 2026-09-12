import Link from "next/link";
import { Metadata } from "next";
import LandingLayout from "@/components/LandingLayout";

export const metadata: Metadata = {
  title: "Naano pricing — start free, pay per post",
  description:
    "Self-Serve is €0/month with marketplace access, AI briefs and attribution. Managed campaigns add a Naano team operating your channel for a custom quote.",
};

export default function PricingPage() {
  const selfServe = [
    "Creator marketplace access",
    "AI-powered brief creation",
    "Track clicks, companies and pipeline",
    "Automatic creator payouts",
  ];
  const managed = [
    "Campaign strategy and positioning",
    "Creator sourcing and coordination",
    "Brief creation and campaign launch",
    "Reporting and optimisation",
  ];
  const both = [
    "3,000+ vetted B2B creators",
    "Attribution in one click per post",
    "Per-post pricing set by creators",
    "Month-to-month, no lock-in",
    "Payment via Stripe Connect",
  ];

  return (
    <LandingLayout>
      <div className="bg-canvas">
        <section className="mx-auto max-w-6xl px-6 pt-14">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-xs font-medium text-ink/70">
              Pricing
            </p>
            <h1 className="mx-auto mt-6 max-w-2xl text-balance font-display text-5xl font-bold tracking-tight text-ink sm:text-6xl">
              Start free. Pay per post when the results show up.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
              Every creator campaign runs at a fixed price per published post —
              usually between €20 and €1,500. No retainer, no CPC, no surprises.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="card flex flex-col p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">Self-serve</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-ink">Run it yourself.</h2>
              <p className="mt-2 text-sm text-muted">
                The full platform for teams running creator campaigns in-house.
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold text-ink">€0</span>
                <span className="text-muted">/ month</span>
              </div>
              <ul className="mt-8 space-y-3 text-sm text-ink/80">
                {selfServe.map((f) => (
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
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">Managed campaigns</p>
                <h2 className="mt-3 font-display text-2xl font-bold">Get your time back.</h2>
                <p className="mt-2 text-sm text-white/60">
                  Naano operates your creator channel end to end — strategy,
                  sourcing, briefs, reporting.
                </p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-bold">€700</span>
                  <span className="text-white/50">/ month</span>
                </div>
                <ul className="mt-8 space-y-3 text-sm text-white/85">
                  {managed.map((f) => (
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

          <div className="mx-auto mt-8 max-w-4xl text-center text-sm text-muted">
            Campaign spend is separate. Both plans bill via Stripe Connect. No
            lock-in, cancel anytime.
          </div>

          <div className="mx-auto mt-14 max-w-4xl rounded-3xl border border-line bg-white p-8">
            <h3 className="text-center font-display text-xl font-bold text-ink">
              Both plans include
            </h3>
            <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {both.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-ink/80">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}