import LandingLayout from "@/components/LandingLayout";
import Avatar from "@/components/Avatar";
import Link from "next/link";
import { creators, formatEuro } from "@/lib/data";

export default async function CreatorProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = creators.find((x) => x.slug === slug);
  if (!c) return <LandingLayout>Said creator not found.</LandingLayout>;

  const post = c.posts[0];

  return (
    <LandingLayout navLinks="marketing" navVariant="light">
      <div className="mx-auto max-w-4xl px-6 pt-10 pb-24">
        <Link href="/creators" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
          ← All creators
        </Link>

        <div className="card mt-6 p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <Avatar name={c.name} color={c.color} size="lg" />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-3xl font-bold text-ink">{c.name}</h1>
                <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
                  Fit {c.fit}%
                </span>
              </div>
              <p className="text-muted">{c.headline}</p>
              <p className="mt-3 text-sm text-ink/70">{c.bio}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.networks.map((n) => (
                  <span key={n} className="rounded-full bg-canvas px-3 py-1 text-xs font-medium">{n}</span>
                ))}
                {c.topics.map((t) => (
                  <span key={t} className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              [new Intl.NumberFormat("en").format(c.follows), "followers"],
              [`${c.rating}★`, "rating"],
              [post.impressions.toLocaleString(), "avg impressions"],
              [formatEuro(c.price), "per post"],
            ].map(([v, l]) => (
              <div key={l as string} className="rounded-2xl bg-canvas p-4 text-center">
                <p className="font-display text-2xl font-bold text-ink">{v}</p>
                <p className="text-xs text-muted">{l}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/register?role=saas" className="btn-primary px-6 py-3 text-[15px] font-semibold">
              Book {c.firstName} — {formatEuro(c.price)}
            </Link>
            <Link href="/creators" className="btn-light px-6 py-3 text-[15px] font-semibold">
              Keep browsing
            </Link>
          </div>
        </div>

        <div className="card mt-6 p-8">
          <h2 className="font-display text-xl font-bold text-ink">Latest post</h2>
          <div className="mt-5 rounded-2xl border border-line p-5">
            <p className="text-sm font-medium text-ink/80">{post.title}</p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {[
                [post.impressions, "Impressions"],
                [post.clicks, "Clicks"],
                [post.leads, "Leads"],
              ].map(([v, l]) => (
                <div key={l as string} className="rounded-xl bg-canvas py-3">
                  <p className="font-display text-xl font-bold text-ink">{new Intl.NumberFormat("en").format(v as number)}</p>
                  <p className="text-[11px] text-muted">{l}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted">
              For <span className="font-semibold text-ink">{post.brand}</span>
            </p>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}