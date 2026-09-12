import Link from "next/link";
import LandingLayout from "@/components/LandingLayout";

export const metadata = {
  title: "Reports & benchmarks — Naano",
  description:
    "First-party data on B2B creator pricing, CTR and CPL from campaigns run on Naano.",
};

const benchmarks = [
  {
    v: "€18",
    l: "Average cost per lead (CPL)",
    d: "Across 312 campaigns on Naano. Down from €31 quarter over quarter as creator graphs compound.",
  },
  {
    v: "12%",
    l: "Average post click-through rate",
    d: "Sponsored B2B posts outperform organic by 2.1x when the brief matches audience fit.",
  },
  {
    v: "€320",
    l: "Median price per LinkedIn post",
    d: "Across 300+ bookings. Micro creators (<20K) averaged 0.85% CTR vs 0.41% for 50K+.",
  },
  {
    v: "0.85%",
    l: "Micro creator CTR (<20K followers)",
    d: "Niche voices outperform macro on click-through in every vertical we track.",
  },
];

export default function ReportsPage() {
  return (
    <LandingLayout navLinks="home">
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-24">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Reports & benchmarks
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-5xl font-bold tracking-tight text-ink">
          First-party data on B2B creator marketing.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Aggregated, anonymised metrics from campaigns run on Naano. No panels,
          no estimates — real bookings.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benchmarks.map((b) => (
            <div key={b.l} className="card p-6">
              <p className="font-display text-5xl font-bold text-ink">{b.v}</p>
              <p className="mt-3 font-semibold text-ink">{b.l}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{b.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Link href="/benchmarks/q2-2026" className="group card flex flex-col justify-between p-8 transition-all hover:-translate-y-1 hover:shadow-lg">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">Full report</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-ink group-hover:text-accent transition-colors">
                Q2 2026 Creator Benchmark
              </h2>
              <p className="mt-2 text-sm text-muted">
                Pricing bands, CTR by vertical, CPL vs LinkedIn Ads, and the 5 factors
                that predict post performance.
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-2 font-semibold text-ink">
              Read the report <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>

          <Link href="/blog/b2b-influencer-marketing-cost" className="group card flex flex-col justify-between p-8 transition-all hover:-translate-y-1 hover:shadow-lg">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Data article</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-ink group-hover:text-accent transition-colors">
                B2B influencer marketing cost in 2026
              </h2>
              <p className="mt-2 text-sm text-muted">
                What micro and mid-size B2B creators actually charge per post,
                from 300+ real bookings.
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-2 font-semibold text-ink">
              Read article <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </div>
      </div>
    </LandingLayout>
  );
}