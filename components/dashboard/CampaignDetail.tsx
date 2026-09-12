"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import { Header } from "@/components/dashboard/ui";
import { formatEuro, formatCompact } from "@/lib/data";
import { CAMPAIGN_STATE_META } from "@/lib/types";
import { updateCampaignCreatorState } from "@/lib/actions";
import type { CampaignDto } from "@/lib/dto";

const playlist: string[] = ["invited", "draft", "scheduled", "live", "approved"];

export type CreatorDealDto = {
  id: string;
  campaignCreatorId: string;
  name: string;
  objective: string;
  brief: string;
  keyMessages: string[];
  guidelines: string;
  trackingLink: string | null;
  myState: string;
  myPercent: number;
  myShare: number;
  budget: number;
  status: string;
  createdAt: string;
};

export default function CampaignDetail({
  view,
  campaign,
  deal,
}: {
  view: "brand" | "creator";
  campaign?: CampaignDto;
  deal?: CreatorDealDto;
}) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const advance = (campaignId: string, creatorId: string, state: string) => {
    startTransition(async () => {
      await updateCampaignCreatorState(campaignId, creatorId, state as "invited" | "draft" | "scheduled" | "live" | "approved");
      router.refresh();
    });
  };

  if (view === "creator" && deal) {
    const chipState = CAMPAIGN_STATE_META[deal.myState as keyof typeof CAMPAIGN_STATE_META] ?? {
      label: "New",
      className: "bg-blue-50 text-blue-700 border-blue-200",
    };
    return (
      <div className="mx-auto max-w-3xl">
        <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
          &larr; Opportunities
        </Link>

        <Header
          title={deal.name}
          subtitle={`Branded content partnership · created ${deal.createdAt.slice(0, 10)}`}
        />

        <div className="card p-8">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-ink">Your brief</h2>
            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${chipState.className}`}>
              {chipState.label}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink/80">{deal.objective}</p>

          <div className="mt-6 rounded-2xl border border-line bg-canvas p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Creative direction</p>
            <p className="mt-1.5 text-sm text-ink/80">{deal.brief}</p>
          </div>

          <div className="mt-4 rounded-2xl border border-line bg-canvas p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Key messages</p>
            <ul className="mt-2 space-y-2">
              {deal.keyMessages.map((m, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink/80">
                  <span className="mt-0.5 font-semibold text-accent">{i + 1}</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 rounded-2xl border border-line bg-canvas p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Guidelines</p>
            <p className="mt-1.5 whitespace-pre-line text-sm text-ink/80">{deal.guidelines}</p>
          </div>

          <div className="mt-4 rounded-2xl border border-line bg-canvas p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Tracking link</p>
            <code className="mt-2 block truncate rounded-lg bg-night px-3 py-2 text-xs text-emerald-300">
              {deal.trackingLink ?? "—"}
            </code>
          </div>

          <div className="mt-6 flex items-center justify-between rounded-2xl bg-ink px-5 py-4 text-white">
            <div>
              <p className="text-xs text-white/70">Your fee</p>
              <p className="font-display text-2xl font-bold">{formatEuro(deal.myShare)}</p>
            </div>
            {deal.myState === "invited" && (
              <div className="flex gap-2">
                <button
                  onClick={() => advance(deal.id, deal.campaignCreatorId, "draft")}
                  disabled={pending}
                  className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink disabled:opacity-60"
                >
                  Accept brief
                </button>
                <button
                  onClick={() => advance(deal.id, deal.campaignCreatorId, "declined")}
                  disabled={pending}
                  className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60"
                >
                  Decline
                </button>
              </div>
            )}
            {deal.myState === "draft" && (
              <button
                onClick={() => advance(deal.id, deal.campaignCreatorId, "live")}
                disabled={pending}
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink disabled:opacity-60"
              >
                Submit draft for review
              </button>
            )}
            {deal.myState === "live" && (
              <p className="text-sm text-white/80">Live — awaiting brand review</p>
            )}
            {deal.myState === "approved" && (
              <p className="text-sm font-semibold text-emerald-300">Paid out ✓</p>
            )}
            {deal.myState === "declined" && <p className="text-sm text-white/70">Request declined</p>}
          </div>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return <div className="grid min-h-64 place-items-center text-sm text-muted">Loading campaign…</div>;
  }

  const c = campaign;
  const liveCreators = c.creators.filter((x) => x.state === "live");
  const impressions = c.posts.reduce((s, p) => s + p.impressions, 0);
  const clicks = c.posts.reduce((s, p) => s + p.clicks, 0);
  const leads = c.posts.reduce((s, p) => s + p.leads, 0);
  const pipeline = leads > 0 ? leads * 94 : impressions * 0.004;
  const deployed = c.creators.filter((x) => x.state === "live" || x.state === "approved")
    .reduce((s, x) => s + (x.price || 0), 0);

  return (
    <div>
      <Header
        title={c.name}
        subtitle={`${c.creators.length} creators · ${formatEuro(c.budget)} budget · created ${c.createdAt.slice(0, 10)}`}
        actions={
          <Link href="/dashboard/campaigns" className="btn-light px-5 py-2.5 text-sm font-medium">
            All campaigns
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {c.status !== "draft" && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                ["Impressions", formatCompact(impressions)],
                ["Clicks", formatCompact(clicks)],
                ["Leads", String(leads)],
                ["Pipeline", formatEuro(pipeline)],
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
            <p className="mt-3 text-sm leading-relaxed text-ink/80">{c.objective}</p>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div>
                <p className="text-xs font-medium text-muted">Audience</p>
                <p className="mt-1 text-sm font-medium text-ink">{c.audience}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted">Topic</p>
                <p className="mt-1 flex flex-wrap gap-1.5">
                  <span className="rounded-full border border-line px-2 py-0.5 text-xs text-ink/70">{c.topic}</span>
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted">Tracking link</p>
                <code className="mt-1 block truncate rounded-lg bg-canvas px-2 py-1 text-[11px] text-muted">
                  {c.trackingLink ?? "—"}
                </code>
              </div>
            </div>
          </div>

          <div className="card p-8">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-ink">Creator pipeline</h2>
            </div>
            <p className="mt-1 text-sm text-muted">
              Invite → draft → scheduled → live → paid. Click a state chip to advance the workflow.
            </p>
            <div className="mt-5 space-y-4">
              {c.creators.map(({ id, creatorId, creatorName, color, state, price }) => {
                const meta = CAMPAIGN_STATE_META[state as keyof typeof CAMPAIGN_STATE_META];
                const idx = playlist.indexOf(state);
                const isLast = idx === playlist.length - 1;
                return (
                  <div key={creatorId} className="flex flex-wrap items-center gap-4 rounded-2xl border border-line px-5 py-4">
                    <Avatar name={creatorName} color={color} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">{creatorName}</p>
                      <p className="truncate text-xs text-muted">{formatEuro(price)}/post</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${meta.className}`}>
                        {meta.label}
                      </span>
                      {!isLast && (
                        <button
                          onClick={() => advance(c.id, id, playlist[idx + 1])}
                          disabled={pending}
                          className="btn-light px-3 py-1.5 text-xs disabled:opacity-60"
                          title="Advance state"
                        >
                          {state === "invited" ? "Send brief" : state === "draft" ? "Approve draft" : state === "scheduled" ? "Mark live" : "Pay & approve"}
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
              {c.creators.length === 0 && (
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
                ["Creators live", liveCreators.length, c.creators.length],
                ["Budget deployed", Math.min(1, deployed / Math.max(1, c.budget)), 1],
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
              {c.creators.filter((x) => x.state === "approved").length > 0 ? (
                c.creators
                  .filter((x) => x.state === "approved")
                  .map(({ creatorId, creatorName, price }) => (
                    <div key={creatorId} className="flex items-center justify-between text-sm">
                      <span className="text-ink/80">{creatorName}</span>
                      <span className="font-semibold text-ink">{formatEuro(price)}</span>
                    </div>
                  ))
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