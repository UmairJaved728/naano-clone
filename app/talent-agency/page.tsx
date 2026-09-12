import Link from "next/link";
import { Metadata } from "next";
import LandingLayout from "@/components/LandingLayout";

export const metadata: Metadata = {
  title: "Naano for talent agencies",
  description:
    "Manage your creator roster with CSV import, central rate control and automatic payouts — no creator logins needed.",
};

export default function TalentAgencyPage() {
  return (
    <LandingLayout>
      <div className="bg-canvas">
        <section className="mx-auto max-w-6xl px-6 pt-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-600">
                Creator agency
              </p>
              <h1 className="mt-5 font-display text-5xl font-bold tracking-tight text-ink">
                Manage your whole roster, centrally.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                Import your creators from a CSV, fix their rates in one place,
                negotiate briefs for them and let Naano run the payouts. Your
                creators never need to log in.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  ["One-click roster import", "Drag in a CSV of your creators, profiles build themselves."],
                  ["Central rate control", "Set a floor or a fixed rate per post across your whole roster."],
                  ["Book on their behalf", "Receive briefs, negotiate and accept as the manager."],
                  ["Automatic payouts", "Payments split to each creator the moment content is approved."],
                ].map(([t, d]) => (
                  <li key={t} className="flex gap-4">
                    <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-violet-500/10 text-violet-600">
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
                  Start with your roster
                </Link>
                <Link href="/book" className="btn-light px-7 py-3 text-[15px] font-semibold">
                  Book a call
                </Link>
              </div>
            </div>

            <div className="card p-7 shadow-xl shadow-black/[0.05]">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div>
                  <p className="font-semibold text-ink">Roster · 24 creators</p>
                  <p className="text-xs text-muted">Avg rate €520 / post</p>
                </div>
                <button className="btn-light px-3 py-1.5 text-xs">Import CSV</button>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  ["Sofia Nguyen", "€350", "4 deals"],
                  ["Thomas Higadère", "€850", "7 deals"],
                  ["Raphaël Dubois", "€600", "3 deals"],
                  ["Lucas Weber", "€900", "5 deals"],
                ].map(([n, r, d]) => (
                  <div key={n} className="flex items-center justify-between rounded-xl border border-line px-3 py-2.5">
                    <div className="flex items-center gap-3">
                      <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-slate-500 to-slate-700 text-xs font-semibold text-white">
                        {n.split(" ").map((p) => p[0]).join("")}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-ink">{n}</p>
                        <p className="text-xs text-muted">{d}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-ink">{r}</span>
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