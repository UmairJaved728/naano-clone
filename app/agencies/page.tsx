import Link from "next/link";
import { Metadata } from "next";
import LandingLayout from "@/components/LandingLayout";

export const metadata: Metadata = {
  title: "Naano for agencies: manage brands or creator rosters",
  description:
    "Launch a white-label workspace for your brand clients or manage your creator roster with automatic rate control and payouts.",
};

export default function AgenciesPage() {
  return (
    <LandingLayout>
      <div className="bg-canvas">
        <section className="mx-auto max-w-6xl px-6 pt-12">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-xs font-medium text-ink/70">
              Built for agencies
            </p>
            <h1 className="mx-auto mt-6 max-w-3xl text-balance font-display text-5xl font-bold tracking-tight text-ink sm:text-6xl">
              One platform for your agency&apos;s creator business.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
              Run influencer campaigns for your brand clients, or manage a roster
              of creators — without the spreadsheets and the follow-up emails.
            </p>
          </div>
        </section>

        <section id="choose" className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Link
              href="/agency"
              className="group card flex flex-col p-8 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.06]"
            >
              <span className="inline-flex w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                Brand agency
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold text-ink">
                I manage campaigns for companies
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                A dedicated workspace per client with its own budget, creators,
                campaigns and reporting. Approve content, track pipeline and
                bill everything in one place.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-ink/80">
                {[
                  "One workspace per client",
                  "Budgets and campaign management",
                  "White-label client reporting",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" className="shrink-0">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <span className="mt-8 inline-flex items-center gap-2 font-semibold text-ink transition-colors group-hover:text-accent">
                Set up a brand workspace
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>

            <Link
              href="/talent-agency"
              className="group relative card flex flex-col overflow-hidden p-8 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.06]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1.5"
                style={{ background: "linear-gradient(90deg, #2563eb, #7c3aed)" }}
              />
              <span className="inline-flex w-fit rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-600">
                Creator agency
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold text-ink">
                I represent and manage creators
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Import your roster in one CSV. Set every rate centrally, negotiate
                briefs on their behalf and let payouts run without asking your
                creators for a single login.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-ink/80">
                {[
                  "CSV roster import",
                  "Central rate management",
                  "No creator logins needed",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5" className="shrink-0">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <span className="mt-8 inline-flex items-center gap-2 font-semibold text-ink transition-colors group-hover:text-violet-600">
                Manage a creator roster
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </div>

          <div className="mt-10 text-center">
            <Link href="/book" className="btn-primary px-7 py-3 text-[15px] font-semibold">
              Book a 30-minute agency call
            </Link>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}