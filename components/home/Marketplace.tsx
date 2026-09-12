import Link from "next/link";
import Avatar from "@/components/Avatar";
import { creators } from "@/lib/data";

export default function Marketplace() {
  const top = [...creators].sort((a, b) => b.fit - a.fit).slice(0, 3);
  return (
    <section id="marketplace" className="bg-canvas py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          The Naano creator marketplace
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Work with all the best creators.
        </h2>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Find the right B2B voices, compare their audience fit, and book every
          collaboration from one place.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="card overflow-hidden">
              <div className="flex items-center gap-2 border-b border-line px-5 py-3">
                <span className="size-2.5 rounded-full bg-rose-400" />
                <span className="size-2.5 rounded-full bg-amber-400" />
                <span className="size-2.5 rounded-full bg-emerald-400" />
                <span className="ml-3 rounded-md bg-black/5 px-2 py-0.5 text-xs text-muted">
                  naano.co/marketplace
                </span>
              </div>
              <div className="space-y-3 p-5">
                {[...creators].sort((a, b) => b.fit - a.fit).slice(0, 4).map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-4 rounded-2xl border border-line px-4 py-3"
                  >
                    <Avatar name={c.name} color={c.color} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">{c.name}</p>
                      <p className="truncate text-xs text-muted">{c.headline}</p>
                    </div>
                    <div className="hidden sm:block">
                      <div className="flex flex-col items-end">
                        <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
                          Fit {c.fit}%
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-ink">
                        {new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(c.price)}
                      </p>
                      <p className="text-xs text-muted">/ post</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-8 lg:col-span-2">
            <div>
              <p className="font-display text-5xl font-bold text-ink">3,000+</p>
              <p className="mt-1 text-muted">vetted creators, specialist B2B voices, ready to collaborate.</p>
            </div>
            <div>
              <p className="font-display text-5xl font-bold text-ink">100</p>
              <p className="mt-1 text-muted">countries. Local expertise with genuinely global reach.</p>
            </div>
            <div className="rounded-3xl border border-line bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Matched to your buyers
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex -space-x-3">
                  {top.map((c) => (
                    <Avatar key={c.id} name={c.name} color={c.color} className="ring-2 ring-white" />
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-ink">AI & SaaS creator</p>
                  <p className="font-medium text-emerald-700">96%</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted">
                Audience fit comes before follower count. We score every creator
                across audience, category relevance and engagement quality.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/register"
            className="btn-primary px-7 py-3 text-[15px] font-semibold"
          >
            Explore the marketplace
          </Link>
        </div>
      </div>
    </section>
  );
}