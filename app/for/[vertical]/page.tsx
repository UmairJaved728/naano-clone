import LandingLayout from "@/components/LandingLayout";
import Link from "next/link";
import { creators } from "@/lib/data";

type Vertical = { label: string; copy: string; cpl: string; keywords: string[] };

export const verticals: Record<string, Vertical> = {
    "sales-tech": {
      label: "Sales tech",
      copy: "Sales leaders and revenue teams are the loudest, most trust-sensitive buyers on LinkedIn. Reach them through creators who already speak their language.",
      cpl: "€12",
      keywords: ["Sales", "AI", "RevOps"],
    },
    revops: {
      label: "RevOps",
      copy: "Revenue operations is the niche where recommendations convert. Niche RevOps creators beat generalist accounts on CTR every quarter we track.",
      cpl: "€15",
      keywords: ["RevOps", "Pricing", "SaaS"],
    },
    devtools: {
      label: "DevTools",
      copy: "Engineers don't buy ads — they buy from peers on X and YouTube. Founder-led and engineering creators move DevTools installs better than anything.",
      cpl: "€9",
      keywords: ["DevTools", "Open-source", "AI"],
    },
    product: {
      label: "Product",
      copy: "Product-led growth starts with people who live the workflow. PLG creators turn your activation loop into a story product managers retweet.",
      cpl: "€14",
      keywords: ["PLG", "Product", "SaaS"],
    },
    "hr-tech": {
      label: "HR tech",
      copy: "People ops and HR leaders trade playbooks daily. Sponsoring creators inside that conversation puts your product where the decisions happen.",
      cpl: "€16",
      keywords: ["HR tech", "People ops", "Future of work"],
    },
    fintech: {
      label: "Fintech",
      copy: "Compliance, trust and workflow are everything in fintech. Creators who cover B2B finance bring an audience that already filters by credibility.",
      cpl: "€22",
      keywords: ["Fintech", "Payments", "GTM"],
    },
    "marketing-ops": {
      label: "Marketing ops",
      copy: "The people who own your ICP's martech stack are on LinkedIn hashing out stack decisions daily. Meet them where they already debate tools.",
      cpl: "€13",
      keywords: ["Marketing", "SEO", "Demand gen"],
    },
    "vertical-saas": {
      label: "Vertical SaaS",
      copy: "Vertical software wins on trust within a community. Choose creators from exactly that industry and make every follower a potential champion.",
      cpl: "€17",
      keywords: ["SaaS", "B2B", "GTM"],
    },
  };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(verticals).map((vertical) => ({ vertical }));
}

export default async function VerticalPage({
  params,
}: {
  params: Promise<{ vertical: string }>;
}) {
  const { vertical } = await params;
  const v = verticals[vertical];

  const matches = creators.filter((c) => c.topics.some((t) => v.keywords.includes(t)));

  return (
    <LandingLayout navLinks="marketing">
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-24">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Creator campaigns for {v.label}
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-5xl font-bold tracking-tight text-ink">
          {v.label} creators your buyers already trust.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{v.copy}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <div className="card px-6 py-4">
            <p className="text-xs text-muted">Avg cost per lead</p>
            <p className="font-display text-3xl font-bold text-ink">{v.cpl}</p>
          </div>
          <div className="card px-6 py-4">
            <p className="text-xs text-muted">Post CTR</p>
            <p className="font-display text-3xl font-bold text-ink">12%</p>
          </div>
          <div className="card px-6 py-4">
            <p className="text-xs text-muted">Campaign ramp</p>
            <p className="font-display text-3xl font-bold text-ink">7 days</p>
          </div>
        </div>

        <h2 className="mt-14 font-display text-2xl font-bold text-ink">
          Featured creators in {v.label}
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {matches.slice(0, 6).map((c) => (
            <Link key={c.id} href={`/creators/${c.slug}`} className="card p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
              <p className="font-semibold text-ink">{c.name}</p>
              <p className="text-xs text-muted">{c.headline}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.topics.slice(0, 3).map((t) => (
                  <span key={t} className="rounded-full bg-canvas px-2 py-0.5 text-[11px] text-muted">{t}</span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">Fit {c.fit}%</span>
                <span className="font-bold text-ink">€{c.price}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/register?role=saas" className="btn-primary px-8 py-3.5 text-[15px] font-semibold">
            Launch a {v.label} campaign
          </Link>
        </div>
      </div>
    </LandingLayout>
  );
}