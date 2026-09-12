import Link from "next/link";
import LandingLayout from "@/components/LandingLayout";

export const metadata = {
  title: "LinkedIn creator marketplace — Naano",
  description:
    "The B2B LinkedIn creator marketplace: book vetted LinkedIn creators at fixed per-post prices and trace leads back to each post.",
};

export default function LinkedInCreatorMarketplace() {
  return (
    <LandingLayout navLinks="marketing">
      <div className="mx-auto max-w-4xl px-6 pt-12 pb-24">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Guide</p>
        <h1 className="mt-4 text-balance font-display text-5xl font-bold tracking-tight text-ink">
          The B2B LinkedIn creator marketplace.
        </h1>
        <p className="mt-4 text-lg text-muted">
          Naano is a marketplace where B2B companies book vetted LinkedIn
          creators for sponsored posts at fixed per-post prices set by the
          creators themselves — then trace every lead, pipeline euro and signup
          back to the exact post that drove it.
        </p>

        <div className="mt-12 space-y-8">
          {[
            ["Fixed prices, set by creators", "Every creator publishes a price per post before you book. You pay only when a post goes live — no retainers, no auction-style bidding, no surprises on the invoice."],
            ["Ranked by audience fit, not followers", "Our matching engine scores creators on audience fit, category relevance and engagement quality across LinkedIn, X and YouTube, so you rank creators by who reaches your buyers."],
            ["Attribution on every post", "Naano places a tracking pixel at every stage of the funnel. Each click, qualified lead and euro of pipeline is tied back to the creator and post that produced it."],
            ["Payouts handled for you", "Approve content and pay every creator in one click, securely via Stripe Connect. Contracts, invoices and payouts are handled automatically."],
            ["From micro to mid-size", "The marketplace spans niche voices from ~1,000 followers to established B2B creators with audiences of several hundred thousand — the stats show micro creators convert the strongest per euro."],
          ].map(([t, d], i) => (
            <div key={t} className="flex gap-5">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink font-display text-sm font-bold text-white">
                {i + 1}
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-ink">{t}</h2>
                <p className="mt-2 leading-relaxed text-ink/70">{d}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-3xl border border-line bg-white p-10 text-center">
          <h2 className="font-display text-2xl font-bold text-ink">Launch a LinkedIn creator campaign in days</h2>
          <p className="mt-2 text-sm text-muted">
            Self-Serve is €0/month. Build a brief with AI, book creators, and watch the pipeline come in.
          </p>
          <Link href="/register?role=saas" className="btn-primary mt-6 inline-flex px-8 py-3.5 font-semibold">
            Start free
          </Link>
        </div>
      </div>
    </LandingLayout>
  );
}