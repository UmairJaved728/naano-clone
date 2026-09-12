"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import { Header } from "@/components/dashboard/ui";
import { defaultCampaigns, getCreator, formatEuro, formatCompact } from "@/lib/data";
import { getStoredCampaigns, updateStoredCampaign } from "@/lib/campaignStore";
import { CAMPAIGN_STATE_META } from "@/lib/types";
import type { CampaignStatus } from "@/lib/types";

type MergedCampaign = {
  id: string;
  name: string;
  status: CampaignStatus;
  objective: string;
  budget: number;
  startDate: string;
  endDate: string;
  keywords: string[];
  trackingLink: string;
  creators: { creatorId: string; state: string }[];
  metrics?: {
    impressions: number;
    clicks: number;
    leads: number;
    pipeline: number;
    cost: number;
  };
};

const playlist: string[] = ["invited", "draft", "scheduled", "live", "approved"];

export default function CampaignDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [campaign, setCampaign] = useState<MergedCampaign | null>(null);

  useEffect(() => {
    const stored = getStoredCampaigns().find((c) => c.id === id);
    if (stored) {
      const merged = stored as unknown as MergedCampaign;
      setCampaign(merged);
      if (merged.status === "briefing" && merged.creators.some((x) => x.state === "draft")) {
        broadcast({ ...merged, status: "live", metrics: defaultMetrics });
      }
      return;
    }
    const def = defaultCampaigns.find((c) => c.id === id);
    if (def) setCampaign(def as unknown as MergedCampaign);
  }, [id]);

  const defaultMetrics = {
    impressions: 152000,
    clicks: 2940,
    leads: 512,
    pipeline: 48200,
    cost: 2450,
  };

  const broadcast = (next: MergedCampaign) => {
    setCampaign(next);
    updateStoredCampaign(id, next);
  };

  const advance = (creatorId: string) => {
    if (!campaign) return;
    const creators = campaign.creators.map((x) => {
      if (x.creatorId !== creatorId) return x;
      const idx = playlist.indexOf(x.state);
      const next = playlist[Math.min(idx + 1, playlist.length - 1)];
      if (next === "draft") {
        broadcast({ ...campaign, creators, status: "live", metrics: defaultMetrics });
      }
      return { ...x, state: next };
    });
    broadcast({ ...campaign, creators });
  };

  if (!campaign) {
    return <div className="grid min-h-64 place-items-center text-sm text-muted">Loading campaign…</div>;
  }

  const liveCreators = campaign.creators.filter((x) => x.state === "live");
  const m = campaign.metrics;

  return (
    <div>
      <Header
        title={campaign.name}
        subtitle={`${campaign.creators.length} creators · ${formatEuro(campaign.budget)} budget · started ${campaign.startDate}`}
        actions={
          <Link href="/dashboard/campaigns" className="btn-light px-5 py-2.5 text-sm font-medium">
            All campaigns
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {campaign.status !== "draft" && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                ["Impressions", m ? formatCompact(m.impressions) : "—"],
                ["Clicks", m ? formatCompact(m.clicks) : "—"],
                ["Leads", m ? String(m.leads) : "—"],
                ["Pipeline", m ? formatEuro(m.pipeline) : "—"],
              ].map(([l, v]) => (
                <div key={l} className="card p-4">
                  <p className="text-xs text-muted">{l}</p>
                  <p className="mt-1 font-display text-2xl font-bold text-ink">{v}</p>
                </div>
              ))}
            </div>
          )}

          <div className="card p-8">
            <h2 className="font-display text-lg font-bold text-ink">Brief</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">{campaign.objective}</p>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div>
                <p className="text-xs font-medium text-muted">Dates</p>
                <p className="mt-1 text-sm font-medium text-ink">
                  {campaign.startDate} → {campaign.endDate}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted">Keywords</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {campaign.keywords.map((k) => (
                    <span key={k} className="rounded-full border border-line px-2 py-0.5 text-xs text-ink/70">{k}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted">Tracking link</p>
                <code className="mt-1 block truncate rounded-lg bg-canvas px-2 py-1 text-[11px] text-muted">
                  {campaign.trackingLink || "—"}
                </code>
              </div>
            </div>
          </div>

          <div className="card p-8">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-ink">Creator pipeline</h2>
              <button
                onClick={() => {
                  const c = getCreator(campaign.creators[0]?.creatorId ?? "c1");
                  // no-op guard
                  void c;
                }}
                className="hidden"
              />
            </div>
            <p className="mt-1 text-sm text-muted">
              Invite → draft → scheduled → live → paid. Click a state chip to advance the workflow.
            </p>
            <div className="mt-5 space-y-4">
              {campaign.creators.map(({ creatorId, state }) => {
                const c = getCreator(creatorId);
                if (!c) return null;
                const meta = CAMPAIGN_STATE_META[state as keyof typeof CAMPAIGN_STATE_META];
                const idx = playlist.indexOf(state);
                const isLast = idx === playlist.length - 1;
                return (
                  <div key={creatorId} className="flex flex-wrap items-center gap-4 rounded-2xl border border-line px-5 py-4">
                    <Avatar name={c.name} color={c.color} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">{c.name}</p>
                      <p className="truncate text-xs text-muted">{c.headline} · {formatEuro(c.price)}/post</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${meta.className}`}>
                        {meta.label}
                      </span>
                      {!isLast && (
                        <button
                          onClick={() => advance(creatorId)}
                          className="btn-light px-3 py-1.5 text-xs"
                          title="Advance state"
                        >
                          {state === "invited" ? "Send brief" : state === "draft" ? "Approve draft" : state === "scheduled" ? "Mark live" : state === "live" ? "Pay & approve" : "Next"}
                        </button>
                      )}
                      {isLast && (
                        <span className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white">
                          Paid ✓
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
              {campaign.creators.length === 0 && (
                <p className="rounded-xl bg-canvas p-6 text-center text-sm text-muted">
                  No creators yet.{" "}
                  <Link href="/dashboard/marketplace" className="font-semibold text-accent hover:underline">
                    Add some from the marketplace
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="font-display text-lg font-bold text-ink">Campaign health</h2>
            <div className="mt-4 space-y-4">
              {[
                ["Creators live", liveCreators.length, campaign.creators.length],
                ["Budget deployed", Math.min(1, (liveCreators.length * 500) / campaign.budget), 1],
              ].map(([label, val, denom]) => {
                const pct = typeof val === "number" && typeof denom === "number" ? Math.round((val / denom) * 100) : 0;
                return (
                  <div key={label as string}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted">{label}</span>
                      <span className="font-semibold text-ink">{pct}%</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-canvas">
                      <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-display text-lg font-bold text-ink">Payments</h2>
            <p className="mt-1 text-xs text-muted">Handled by Naano via Stripe Connect.</p>
            <div className="mt-4 space-y-3">
              {campaign.creators.filter((x) => x.state === "approved").length > 0 ? (
                campaign.creators
                  .filter((x) => x.state === "approved")
                  .map(({ creatorId }) => {
                    const c = getCreator(creatorId)!;
                    return (
                      <div key={creatorId} className="flex items-center justify-between text-sm">
                        <span className="text-ink/80">{c.name}</span>
                        <span className="font-semibold text-ink">{formatEuro(c.price)}</span>
                      </div>
                    );
                  })
              ) : (
                <p className="rounded-xl bg-canvas p-4 text-sm text-muted">
                  Payouts appear here once you approve live content for creators.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}