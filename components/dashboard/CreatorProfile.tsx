"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import { formatEuro, formatCompact } from "@/lib/data";
import type { CampaignDto, MarketplaceCreatorDto } from "@/lib/dto";

export default function CreatorProfile({
  creator,
  availableCampaigns,
}: {
  creator: MarketplaceCreatorDto | null;
  availableCampaigns: CampaignDto[];
}) {
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    if (added || booked) {
      const t = setTimeout(() => router.push("/dashboard/campaigns/new"), 900);
      return () => clearTimeout(t);
    }
  }, [added, booked, router]);

  if (!creator) {
    return (
      <div className="rounded-3xl border border-dashed border-line bg-white p-12 text-center">
        <p className="font-display text-lg font-semibold text-ink">Creator not found</p>
        <Link href="/dashboard/marketplace" className="mt-3 inline-block text-sm text-accent hover:underline">
          &larr; Back to marketplace
        </Link>
      </div>
    );
  }

  const c = creator;
  const addToNewCampaign = (bookNow = false) => {
    sessionStorage.setItem("naano_prefill_creator", c.id);
    if (bookNow) setBooked(true);
    else setAdded(true);
  };

  const post = c.latestPost;

  return (
    <div className="max-w-4xl">
      <Link href="/dashboard/marketplace" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
        &larr; Marketplace
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
            <p className="mt-1 text-[11px] text-muted">Fixed price — you pay on publish</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            [formatCompact(c.follows), "followers"],
            [`${c.rating} / 10`, "creator rating"],
            [new Intl.NumberFormat("en").format(post.impressions), "avg impressions"],
            [String(post.clicks), "avg clicks / post"],
          ].map(([v, l]) => (
            <div key={l} className="rounded-2xl bg-canvas p-4 text-center">
              <p className="font-display text-2xl font-bold text-ink">{v}</p>
              <p className="text-xs text-muted">{l}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:flex">
          <button onClick={() => addToNewCampaign(false)} className="btn-primary px-6 py-3 text-[15px] font-semibold">
            + Add to a campaign
          </button>
          <button onClick={() => addToNewCampaign(true)} className="btn-light px-6 py-3 text-[15px] font-semibold">
            {booked ? "Added ✓" : `Book at ${formatEuro(c.price)}`}
          </button>
        </div>
      </div>

      {(added || booked) && (
        <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          Creator selected. Building your campaign… taking you to the brief.
        </div>
      )}

      <div className="card mt-6 p-8">
        <h2 className="font-display text-xl font-bold text-ink">Latest performance</h2>
        <div className="mt-5 space-y-4">
          <div className="rounded-2xl border border-line p-5">
            <p className="text-sm font-medium leading-relaxed text-ink/80">{post.title}</p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {[
                [post.impressions, "Impressions"],
                [post.clicks, "Clicks"],
                [post.leads, "Leads"],
              ].map(([v, l]) => (
                <div key={l} className="rounded-xl bg-canvas py-3">
                  <p className="font-display text-xl font-bold text-ink">{new Intl.NumberFormat("en").format(Number(v))}</p>
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

      <div className="mt-6 rounded-3xl border border-line bg-white p-8">
        <h2 className="font-display text-xl font-bold text-ink">Available campaigns to join</h2>
        <div className="mt-4 space-y-3">
          {availableCampaigns.filter((c) => c.status !== "draft").map((c) => (
            <div key={c.id} className="flex items-center justify-between rounded-2xl border border-line px-4 py-3">
              <div>
                <p className="font-semibold text-ink">{c.name}</p>
                <p className="text-xs text-muted">{c.topic}</p>
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