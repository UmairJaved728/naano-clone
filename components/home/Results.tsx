import Link from "next/link";
import { creators } from "@/lib/data";

export default function Results() {
  const showcase = [creators[0], creators[1], creators[2], creators[3]];

  return (
    <section className="relative overflow-hidden bg-night py-24 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 15% 0%, rgba(37,99,235,0.22) 0%, transparent 60%), radial-gradient(45% 45% at 90% 90%, rgba(30,64,175,0.18) 0%, transparent 62%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
          The results
        </p>
        <h2 className="mt-4 max-w-xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
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
              <p className="font-display text-5xl font-bold text-white">{v}</p>
              <p className="mt-2 text-sm text-white/50">{l}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {showcase.map((c) => {
            const post = c.posts[0];
            return (
              <div
                key={c.id}
                className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-colors hover:border-white/20"
              >
                <p className="text-sm font-semibold text-white">{c.name}</p>
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
                      <p className="text-sm font-bold text-white">
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
    </section>
  );
}