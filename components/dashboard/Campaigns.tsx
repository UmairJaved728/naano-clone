"use client";

import Link from "next/link";
import { Header, StatusBadge } from "@/components/dashboard/ui";
import { defaultCampaigns, formatEuro, formatCompact } from "@/lib/data";
import { CAMPAIGN_STATE_META } from "@/lib/types";

export default function Campaigns() {
  return (
    <div>
      <Header
        title="Campaigns"
        subtitle="Everything from brief to live — and the pipeline each one brings."
        actions={
          <Link href="/dashboard/campaigns/new" className="btn-primary px-5 py-2.5 text-[15px] font-semibold">
            New campaign
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {defaultCampaigns.map((c) => {
          const statusCls =
            c.status === "live"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : c.status === "briefing"
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : "bg-slate-100 text-slate-600 border-slate-200";
          return (
            <Link
              key={c.id}
              href={`/dashboard/campaigns/${c.id}`}
              className="card group flex flex-col p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.05]"
            >
              <div className="flex items-center justify-between">
                <StatusBadge label={c.status} className={statusCls} />
                {c.metrics && (
                  <span className="text-xs font-semibold text-emerald-700">
                    {formatEuro(c.metrics.pipeline)} pipeline
                  </span>
                )}
              </div>
              <h2 className="mt-4 font-display text-xl font-bold text-ink group-hover:text-accent transition-colors">
                {c.name}
              </h2>
              <p className="mt-1 line-clamp-2 text-sm text-muted">{c.objective}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {c.keywords.map((k) => (
                  <span key={k} className="rounded-full border border-line px-2.5 py-0.5 text-[11px] font-medium text-muted">
                    {k}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-xs text-muted">
                <span>{c.creators.length} creators</span>
                <span>
                  {c.metrics ? `${formatCompact(c.metrics.impressions)} impressions` : `${formatEuro(c.budget)} budget`}
                </span>
              </div>
            </Link>
          );
        })}

        <Link
          href="/dashboard/campaigns/new"
          className="flex min-h-56 flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-line bg-white/60 p-6 text-center transition-colors hover:border-ink/40"
        >
          <span className="grid size-12 place-items-center rounded-full bg-ink text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
          <div>
            <p className="font-display font-semibold text-ink">Start a new campaign</p>
            <p className="mt-1 text-sm text-muted">Brief in minutes with the AI builder</p>
          </div>
        </Link>
      </div>
    </div>
  );
}