import Link from "next/link";
import { creators } from "@/lib/data";

export default function CreatorsResults() {
  return (
    <section className="relative overflow-hidden bg-canvas py-24">
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {[
            ["2,000+", "creators paid out"],
            ["€500", "average per deal"],
            ["5K+", "posts published"],
            ["24h", "payout turnaround"],
          ].map(([v, l]) => (
            <div key={l}>
              <p className="font-display text-5xl font-semibold tracking-tight text-ink">{v}</p>
              <p className="mt-2 text-sm text-ink-soft">{l}</p>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              What creators publish with Naano.
            </h3>
            <div className="flex flex-wrap gap-2">
              {["B2B SaaS", "Fintech", "DevTools", "E-commerce", "HR tech"].map((s) => (
                <button
                  key={s}
                  className="rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium text-ink/70 transition hover:border-ink/40"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[creators[0], creators[1], creators[2], creators[3]].map((c) => {
              const post = c.posts[0];
              return (
                <div
                  key={c.id}
                  className="flex flex-col rounded-3xl border border-line bg-white p-6 transition-colors hover:border-ink/30"
                >
                  <p className="text-sm font-semibold text-ink">{c.name}</p>
                  <p className="mt-0.5 text-xs text-ink-soft">{c.headline}</p>
                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-ink/70">
                    {post.title}
                  </p>
                  <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                    {[
                      [post.impressions, "Impr."],
                      [post.clicks, "Clicks"],
                      [post.leads, "Leads"],
                    ].map(([v, l]) => (
                      <div key={l as string} className="rounded-xl bg-surface-2 py-2">
                        <p className="text-sm font-semibold text-ink">
                          {new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 0 }).format(v as number)}
                        </p>
                        <p className="text-[10px] text-ink-soft">{l}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-ink-soft">
                    For <span className="font-medium text-ink">{post.brand}</span>
                  </p>
                  <Link
                    href={post.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent hover:text-accent-strong"
                  >
                    View post →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}