import Link from "next/link";
import { creators } from "@/lib/data";

export default function Results() {
  const showcase = [creators[0], creators[1], creators[2], creators[3]];

  return (
    <section className="relative overflow-hidden bg-canvas py-24">
      <div className="relative mx-auto max-w-6xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          The results
        </p>
        <h2 className="mt-4 max-w-xl font-display text-[clamp(32px,4.5vw,50px)] font-semibold leading-[1.05] tracking-[-0.035em] text-ink">
          Proven across thousands of campaigns.
        </h2>

        <div className="mt-14 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {[
            ["5M+", "Impressions generated"],
            ["30K+", "Leads generated"],
            ["2,000+", "Creators on Naano"],
            ["5K+", "Posts published"],
          ].map(([v, l]) => (
            <div key={l}>
              <p className="font-display text-5xl font-semibold tracking-tight text-ink">{v}</p>
              <p className="mt-2 text-sm text-ink-soft">{l}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {showcase.map((c) => {
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
    </section>
  );
}