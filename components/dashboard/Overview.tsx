import Link from "next/link";
import Avatar from "@/components/Avatar";
import { Header, StatCard, StatusBadge } from "@/components/dashboard/ui";
import { formatEuro, formatCompact } from "@/lib/data";
import { CAMPAIGN_STATE_META } from "@/lib/types";
import type { CampaignDto } from "@/lib/dto";

export default function Overview({
  campaigns,
  pipeline,
  stats,
}: {
  campaigns: CampaignDto[];
  pipeline: { creatorName: string; slug: string; color: string; state: string }[];
  stats: { campaigns: number; activeCampaigns: number; impressions: number; clicks: number; leads: number; pipeline: number };
}) {
  const statusCls = (status: string) =>
    status === "live"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : status === "draft"
        ? "bg-slate-100 text-slate-600 border-slate-200"
        : "bg-blue-50 text-blue-700 border-blue-200";

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
        <StatCard label="Attributed pipeline" value={formatEuro(stats.pipeline)} delta="+24%" />
        <StatCard label="Leads" value={String(stats.leads)} delta="+12%" />
        <StatCard label="Qualified clicks" value={formatCompact(stats.clicks)} />
        <StatCard label="Impressions" value={formatCompact(stats.impressions)} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-bold text-ink">Active campaigns</h2>
              <p className="text-xs text-muted">Overview of everything in flight</p>
            </div>
            <Link href="/dashboard/campaigns" className="text-sm font-medium text-accent hover:underline">
              View all &rarr;
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {campaigns.length === 0 && (
              <p className="rounded-2xl border border-dashed border-line p-8 text-center text-sm text-muted">
                No campaigns yet.{" "}
                <Link href="/dashboard/campaigns/new" className="font-semibold text-accent hover:underline">
                  Launch your first one
                </Link>
              </p>
            )}
            {campaigns.map((c) => (
              <Link
                key={c.id}
                href={`/dashboard/campaigns/${c.id}`}
                className="flex items-center justify-between rounded-2xl border border-line px-4 py-3 transition-colors hover:border-ink/30"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className={`grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white ${
                    c.status === "live" ? "from-emerald-500 to-teal-600" : c.status === "draft" ? "from-zinc-400 to-zinc-500" : "from-blue-500 to-indigo-600"
                  }`}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 11l18-6v14L3 13v-2z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-ink">{c.name}</p>
                    <p className="text-xs text-muted">
                      {c.creators.length} creators &middot; {formatEuro(c.budget)} budget
                    </p>
                  </div>
                </div>
                <StatusBadge label={c.status} className={statusCls(c.status)} />
              </Link>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-display text-lg font-bold text-ink">Creators pipeline</h2>
          <p className="text-xs text-muted">Content status across current campaign</p>
          <div className="mt-5 space-y-3">
            {pipeline.length === 0 && (
              <p className="text-sm text-muted">No creators in flight yet.</p>
            )}
            {pipeline.map((c) => (
              <div key={`${c.slug}-${c.state}`} className="flex items-center gap-3">
                <Avatar name={c.creatorName} color={c.color} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{c.creatorName}</p>
                </div>
                <StatusBadge label={CAMPAIGN_STATE_META[c.state as keyof typeof CAMPAIGN_STATE_META]?.label ?? c.state} className={CAMPAIGN_STATE_META[c.state as keyof typeof CAMPAIGN_STATE_META]?.className ?? "bg-canvas text-muted border-line"} />
              </div>
            ))}
          </div>
          <Link href="/dashboard/marketplace" className="btn-light mt-6 w-full py-2.5 text-sm">
            Browse marketplace
          </Link>
        </div>
      </div>
    </div>
  );
}