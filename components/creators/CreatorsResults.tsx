import Link from "next/link";
import { creators } from "@/lib/data";

export default function CreatorsResults() {
  return (
    <section className="relative overflow-hidden bg-night py-24 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 40% at 20% 0%, rgba(37,99,235,0.2) 0%, transparent 60%), radial-gradient(40% 40% at 90% 90%, rgba(30,64,175,0.16) 0%, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {[
            ["2,000+", "creators paid out"],
            ["€500", "average per deal"],
            ["5K+", "posts published"],
            ["24h", "payout turnaround"],
          ].map(([v, l]) => (
            <div key={l}>
              <p className="font-display text-5xl font-bold">{v}</p>
              <p className="mt-2 text-sm text-white/50">{l}</p>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h3 className="font-display text-2xl font-semibold sm:text-3xl">
              What creators publish with Naano.
            </h3>
            <div className="flex flex-wrap gap-2">
              {["B2B SaaS", "Fintech", "DevTools", "E-commerce", "HR tech"].map((s) => (
                <button
                  key={s}
                  className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70 transition hover:bg-white/10"
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
                  className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-colors hover:border-white/20"
                >
                  <p className="text-sm font-semibold">{c.name}</p>
                  <p className="mt-0.5 text-xs text-white/50">{c.headline}</p>
                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-white/70">
                    {post.title}
                  </p>
                  <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                    {[
                      [post.impressions, "Impr."],
                      [post.clicks, "Clicks"],
                      [post.leads, "Leads"],
                    ].map(([v, l]) => (
                      <div key={l as string} className="rounded-xl bg-white/5 py-2">
                        <p className="text-sm font-bold">
                          {new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 0 }).format(v as number)}
                        </p>
                        <p className="text-[10px] text-white/45">{l}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-white/50">
                    For <span className="font-medium text-white/80">{post.brand}</span>
                  </p>
                  <Link
                    href={post.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300"
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