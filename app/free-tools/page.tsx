import Link from "next/link";
import LandingLayout from "@/components/LandingLayout";

export const metadata = {
  title: "Free tools — Naano",
  description:
    "Free calculators for B2B creator marketing: creator worth, engagement rate, delivery odds and budget planning.",
};

export default function FreeToolsPage() {
  const tools = [
    {
      title: "Creator worth calculator",
      desc: "Estimate the revenue a B2B creator is likely to drive, based on audience size, CTR and conversion.",
      href: "/free-tools/creator-worth",
      emoji: "📈",
    },
    {
      title: "Engagement rate checker",
      desc: "Compare a creator's engagement to B2B benchmarks before you book.",
      href: "/free-tools/engagement-rate",
      emoji: "💬",
    },
    {
      title: "Post delivery odds",
      desc: "How likely is a creator to actually publish on time? Rate data from real campaigns.",
      href: "/free-tools/delivery-odds",
      emoji: "📅",
    },
    {
      title: "Budget planner",
      desc: "Plan a creator campaign budget: how many posts, at what price, for the pipeline you need.",
      href: "/free-tools/budget-planner",
      emoji: "💰",
    },
  ];

  return (
    <LandingLayout navLinks="marketing">
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-24">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Free tools</p>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight text-ink">
          Calculators for creator-led growth.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Quick estimates from real Naano campaign data. No signup, no email required.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="card group flex flex-col justify-between p-7 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <span className="text-3xl">{t.emoji}</span>
                <h2 className="mt-4 font-display text-xl font-semibold text-ink group-hover:text-accent transition-colors">
                  {t.title}
                </h2>
                <p className="mt-2 text-sm text-muted">{t.desc}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                Open tool <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </LandingLayout>
  );
}