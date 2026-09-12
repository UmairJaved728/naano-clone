import Link from "next/link";
import Avatar from "@/components/Avatar";

export default function CaseStudy() {
  return (
    <section id="what-people-think" className="bg-canvas py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Case study
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              How BlogSEO turned creator content into product signups
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              BlogSEO briefed SEO &amp; SaaS creators on LinkedIn and X, then
              traced every trial back to the post that drove it — all in Naano.
            </p>
            <Link
              href="/case-studies/blogseo"
              className="btn-primary mt-8 px-6 py-3 text-[15px] font-semibold"
            >
              Read case study
            </Link>
          </div>

          <div className="card p-8">
            <div className="flex items-center gap-4">
              <Avatar name="Vincent Josse" color="from-blue-600 to-indigo-700" size="lg" />
              <div>
                <p className="font-display font-semibold text-ink">Vincent Josse</p>
                <p className="text-sm text-muted">CEO &amp; Founder, BlogSEO</p>
              </div>
            </div>
            <p className="mt-6 text-balance font-display text-xl font-semibold leading-snug text-ink">
              “Naano became one of our fastest acquisition channels. We know
              exactly what every creator brings.”
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
              {[
                ["9", "creators activated"],
                ["2,940", "qualified clicks"],
                ["512", "trials started"],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="font-display text-3xl font-bold text-ink">{v}</p>
                  <p className="mt-1 text-xs text-muted">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}