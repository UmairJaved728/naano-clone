import Link from "next/link";
import LandingLayout from "@/components/LandingLayout";
import Avatar from "@/components/Avatar";

export const metadata = {
  title: "Case study: BlogSEO — Naano",
  description:
    "How BlogSEO briefed SEO & SaaS creators on LinkedIn and X, then traced every trial back to the post that drove it.",
};

export default function BlogseoCaseStudy() {
  return (
    <LandingLayout navLinks="home">
      <div className="mx-auto max-w-4xl px-6 pt-12 pb-24">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Case study</p>
        <h1 className="mt-4 text-balance font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          How BlogSEO turned creator content into product signups.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          BlogSEO briefed SEO & SaaS creators on LinkedIn and X, then traced
          every trial back to the post that drove it — all in Naano.
        </p>

        <div className="mt-10 grid grid-cols-3 gap-4">
          {[
            ["9", "creators activated"],
            ["2,940", "qualified clicks"],
            ["512", "trials started"],
          ].map(([v, l]) => (
            <div key={l} className="card p-6 text-center">
              <p className="font-display text-3xl font-bold text-ink sm:text-4xl">{v}</p>
              <p className="mt-1 text-xs text-muted">{l}</p>
            </div>
          ))}
        </div>

        <div className="card mt-8 p-8">
          <div className="flex items-center gap-4">
            <Avatar name="Vincent Josse" color="from-blue-600 to-indigo-700" size="lg" />
            <div>
              <p className="font-display font-semibold text-ink">Vincent Josse</p>
              <p className="text-sm text-muted">CEO & Founder, BlogSEO</p>
            </div>
          </div>
          <blockquote className="mt-6 text-balance font-display text-2xl font-semibold leading-snug text-ink">
            “Naano became one of our fastest acquisition channels. We know
            exactly what every creator brings.”
          </blockquote>
        </div>

        <div className="mt-12 space-y-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">The setup</h2>
            <p className="mt-3 leading-relaxed text-ink/80">
              BlogSEO is a programmatic SEO tool. Their buyers are SEOs, content
              marketers and SaaS founders — a precise B2B audience. Rather than
              buying broad reach, they wanted creators whose audiences were
              already asking “how do I scale SEO content?”
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">The brief</h2>
            <p className="mt-3 leading-relaxed text-ink/80">
              Using the AI brief builder, they generated one consistent brief:
              SEO workflows breakdowns, first-person stories, one measurable
              outcome per post. Nine creators — from a 12K follower sales coach
              to a 34K B2B voice — accepted at fixed per-post prices.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">Attribution</h2>
            <p className="mt-3 leading-relaxed text-ink/80">
              Every post carried a unique tracking link. Naano attributed 2,940
              qualified clicks and 512 trial starts back to individual posts,
              so BlogSEO could double down on the creators and angles that
              actually produced signups — not the ones with the most views.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">Result</h2>
            <p className="mt-3 leading-relaxed text-ink/80">
              Creator content became a repeatable acquisition channel with a
              cost per trial that dropped every campaign — and proof, post by
              post, of exactly where every signup came from.
            </p>
          </div>
        </div>

        <div className="mt-14 text-center">
          <Link href="/register" className="btn-primary px-8 py-3.5 text-[15px] font-semibold">
            Build your own creator channel
          </Link>
        </div>
      </div>
    </LandingLayout>
  );
}