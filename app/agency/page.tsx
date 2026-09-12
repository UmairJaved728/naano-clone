import Link from "next/link";
import { Metadata } from "next";
import LandingLayout from "@/components/LandingLayout";

export const metadata: Metadata = {
  title: "Naano for brand agencies",
  description:
    "Run influencer campaigns for your brand clients with a dedicated workspace per client, budgets, tracking and white-label reporting.",
};

export default function BrandAgencyPage() {
  return (
    <LandingLayout>
      <div className="bg-canvas">
        <section className="mx-auto max-w-6xl px-6 pt-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                Brand agency
              </p>
              <h1 className="mt-5 font-display text-5xl font-bold tracking-tight text-ink">
                Run influencer campaigns for every client.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                Give each of your clients its own workspace — its own creator
                shortlist, budget, approvals and reporting. No more mixing
                clients in one inbox.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  ["Per-client workspaces", "Separate budgets, creators and campaigns for each account."],
                  ["Creator matchmaking", "Find niche B2B voices ranked by audience fit for your client's buyers."],
                  ["White-label reporting", "Share pipeline, clicks and leads under your own brand."],
                  ["Auto payouts", "Creators are paid when you approve content — you never chase an invoice."],
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
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link href="/register" className="btn-primary px-7 py-3 text-[15px] font-semibold">
                  Set up a brand workspace
                </Link>
                <Link href="/book" className="btn-light px-7 py-3 text-[15px] font-semibold">
                  Book a call
                </Link>
              </div>
            </div>

            <div className="card p-7 shadow-xl shadow-black/[0.05]">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div>
                  <p className="font-semibold text-ink">Acme SaaS — Q3</p>
                  <p className="text-xs text-muted">Workspace · €24K budget</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  On track
                </span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4">
                {[
                  ["8", "creators live"],
                  ["€8.4K", "deployed"],
                  ["2.1K", "clicks"],
                  ["€31K", "pipeline"],
                ].map(([v, l]) => (
                  <div key={l} className="rounded-2xl bg-canvas p-4">
                    <p className="font-display text-2xl font-bold text-ink">{v}</p>
                    <p className="text-xs text-muted">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}