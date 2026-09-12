"use client";

import Link from "next/link";
import Avatar from "@/components/Avatar";
import { Header, StatCard, StatusBadge } from "@/components/dashboard/ui";
import { defaultCampaigns, creators, formatEuro, formatCompact } from "@/lib/data";
import { CAMPAIGN_STATE_META } from "@/lib/types";

export default function Overview() {
  const liveCampaign = defaultCampaigns.find((c) => c.status === "live");
  const m = liveCampaign?.metrics;
  const creatorSide = [
    { creatorId: "c4", state: "draft" as const },
    { creatorId: "c1", state: "live" as const },
    { creatorId: "c6", state: "approved" as const },
    { creatorId: "c2", state: "declined" as const },
  ];

  const recent = [...creatorSide].sort((a, b) => a.state.localeCompare(b.state));

  return (
    <div>
      <Header
        title="Overview"
        subtitle="Where your creator channel stands right now."
        actions={
          <Link href="/dashboard/campaigns/new" className="btn-primary px-5 py-2.5 text-[15px] font-semibold">
            New campaign
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Attributed pipeline" value={m ? formatEuro(m.pipeline) : "€48.2K"} delta="+24%" />
        <StatCard label="Leads" value={m ? String(m.leads) : "418"} delta="+12%" />
        <StatCard label="Qualified clicks" value={m ? formatCompact(m.clicks) : "2.9K"} />
        <StatCard label="Impressions" value={m ? formatCompact(m.impressions) : "124K"} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-bold text-ink">Active campaigns</h2>
              <p className="text-xs text-muted">Overview of everything in flight</p>
            </div>
            <Link href="/dashboard/campaigns" className="text-sm font-medium text-accent hover:underline">
              View all →
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {defaultCampaigns.map((c) => (
              <Link
                key={c.id}
                href={`/dashboard/campaigns/${c.id}`}
                className="flex items-center justify-between rounded-2xl border border-line px-4 py-3 transition-colors hover:border-ink/30"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className={`grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white ${
                    c.status === "live" ? "from-emerald-500 to-teal-600" : c.status === "briefing" ? "from-blue-500 to-indigo-600" : "from-zinc-400 to-zinc-500"
                  }`}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 11l18-6v14L3 13v-2z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-ink">{c.name}</p>
                    <p className="text-xs text-muted">
                      {c.creators.length} creators · {formatEuro(c.budget)} budget
                    </p>
                  </div>
                </div>
                <StatusBadge
                  label={c.status}
                  className={
                    c.status === "live"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : c.status === "briefing"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                  }
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-display text-lg font-bold text-ink">Creators pipeline</h2>
          <p className="text-xs text-muted">Content status across current campaign</p>
          <div className="mt-5 space-y-3">
            {recent.map(({ creatorId, state }) => {
              const c = creators.find((x) => x.id === creatorId)!;
              const meta = CAMPAIGN_STATE_META[state];
              return (
                <div key={creatorId} className="flex items-center gap-3">
                  <Avatar name={c.name} color={c.color} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{c.name}</p>
                  </div>
                  <StatusBadge label={meta.label} className={meta.className} />
                </div>
              );
            })}
          </div>
          <Link href="/dashboard/marketplace" className="btn-light mt-6 w-full py-2.5 text-sm">
            Browse marketplace
          </Link>
        </div>
      </div>
    </div>
  );
}