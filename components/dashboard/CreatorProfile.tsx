"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import { getCreator, formatEuro, formatCompact } from "@/lib/data";
import { defaultCampaigns } from "@/lib/data";

export default function CreatorProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const c = getCreator(id);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (added) {
      const t = setTimeout(() => router.push("/dashboard/campaigns"), 1100);
      return () => clearTimeout(t);
    }
  }, [added, router]);

  if (!c) {
    return (
      <div className="rounded-3xl border border-dashed border-line bg-white p-12 text-center">
        <p className="font-display text-lg font-semibold text-ink">Creator not found</p>
        <Link href="/dashboard/marketplace" className="mt-3 inline-block text-sm text-accent hover:underline">
          ← Back to marketplace
        </Link>
      </div>
    );
  }

  const addToNewCampaign = () => {
    sessionStorage.setItem("naano_prefill_creator", c.id);
    router.push("/dashboard/campaigns/new");
  };

  const post = c.posts[0];

  return (
    <div className="max-w-4xl">
      <Link href="/dashboard/marketplace" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
        ← Marketplace
      </Link>

      <div className="card mt-5 p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <Avatar name={c.name} color={c.color} size="lg" />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-3xl font-bold tracking-tight text-ink">{c.name}</h1>
              <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
                Fit {c.fit}%
              </span>
            </div>
            <p className="mt-1 text-muted">{c.headline}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">{c.bio}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {c.networks.map((n) => (
                <span key={n} className="rounded-full bg-canvas px-3 py-1 text-xs font-medium text-ink/70">{n}</span>
              ))}
              {c.topics.map((t) => (
                <span key={t} className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">{t}</span>
              ))}
            </div>
          </div>
          <div className="shrink-0 rounded-2xl border border-line bg-canvas p-5 text-center">
            <p className="text-[11px] uppercase tracking-wider text-muted">Rate per post</p>
            <p className="font-display text-4xl font-bold text-ink">{formatEuro(c.price)}</p>
            <p className="mt-1 text-[11px] text-muted">Fixed price · you pay on publish</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            [formatCompact(c.follows), "followers"],
            [`${c.rating}★`, "creators to work with"],
            [`${post.impressions.toLocaleString()}`, "avg impressions"],
            [`${post.clicks}`, "avg clicks / post"],
          ].map(([v, l]) => (
            <div key={l} className="rounded-2xl bg-canvas p-4 text-center">
              <p className="font-display text-2xl font-bold text-ink">{v}</p>
              <p className="text-xs text-muted">{l}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:flex">
          <button
            onClick={addToNewCampaign}
            className="btn-primary px-6 py-3 text-[15px] font-semibold"
          >
            + Add to a campaign
          </button>
          <button
            onClick={() => {
              setAdded(true);
            }}
            className="btn-light px-6 py-3 text-[15px] font-semibold"
          >
            {added ? "Added ✓" : `Book at ${formatEuro(c.price)}`}
          </button>
        </div>
      </div>

      {added && (
        <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          Creator booked. Creating your campaign in the existing live campaign and redirecting you…
        </div>
      )}

      <div className="card mt-6 p-8">
        <h2 className="font-display text-xl font-bold text-ink">Latest performance</h2>
        <div className="mt-5 space-y-4">
          {[post].map((p, i) => (
            <div key={i} className="rounded-2xl border border-line p-5">
              <p className="text-sm font-medium leading-relaxed text-ink/80">{p.title}</p>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {[
                  [p.impressions, "Impressions"],
                  [p.clicks, "Clicks"],
                  [p.leads, "Leads"],
                ].map(([v, l]) => (
                  <div key={l as string} className="rounded-xl bg-canvas py-3">
                    <p className="font-display text-xl font-bold text-ink">{new Intl.NumberFormat("en").format(v as number)}</p>
                    <p className="text-[11px] text-muted">{l}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted">
                For <span className="font-semibold text-ink">{p.brand}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-line bg-white p-8">
        <h2 className="font-display text-xl font-bold text-ink">Available campaigns to join</h2>
        <div className="mt-4 space-y-3">
          {defaultCampaigns.filter((c) => c.status !== "draft").map((c) => (
            <div key={c.id} className="flex items-center justify-between rounded-2xl border border-line px-4 py-3">
              <div>
                <p className="font-semibold text-ink">{c.name}</p>
                <p className="text-xs text-muted">{c.keywords.join(" · ")}</p>
              </div>
              <Link href={`/dashboard/campaigns/${c.id}`} className="btn-light px-4 py-2 text-sm">
                View campaign
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}