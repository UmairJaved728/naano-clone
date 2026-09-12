"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Link from "next/link";
import { Header } from "@/components/dashboard/ui";
import { formatEuro } from "@/lib/data";
import { updateCampaignCreatorState } from "@/lib/actions";
import type { SessionUserDto, CreatorOpportunityDto } from "@/lib/dto";

const stateChip = (state: string) => {
  switch (state) {
    case "paid":
    case "approved":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "declined":
      return "border-rose-200 bg-rose-50 text-rose-700";
    case "live":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "draft":
      return "border-indigo-200 bg-indigo-50 text-indigo-700";
    default:
      return "border-blue-200 bg-blue-50 text-blue-700";
  }
};

const stateLabel = (state: string) => {
  switch (state) {
    case "draft":
      return "Draft";
    case "live":
      return "Live";
    case "approved":
    case "paid":
      return "Paid";
    case "declined":
      return "Declined";
    default:
      return "New";
  }
};

export default function CreatorHome({
  user,
  opportunities,
}: {
  user: SessionUserDto;
  opportunities: CreatorOpportunityDto[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const act = (op: CreatorOpportunityDto, state: "draft" | "declined" | "live") => {
    startTransition(async () => {
      await updateCampaignCreatorState(op.campaignId, op.id, state);
      router.refresh();
    });
  };

  const earnable = opportunities
    .filter((d) => d.state === "invited" || d.state === "draft" || d.state === "live")
    .reduce((s, d) => s + d.share, 0);
  const paid = opportunities.filter((d) => d.state === "approved").reduce((s, d) => s + d.share, 0);

  return (
    <div>
      <Header
        title={`Hey ${user.name.split(" ")[0]} \u2014 you've got opportunities`}
        subtitle="New briefs and your pipeline in one place."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {[
          [String(opportunities.filter((d) => d.state === "invited").length), "new briefs"],
          [String(opportunities.filter((d) => d.state !== "declined").length), "in progress"],
          [formatEuro(earnable), "pending payouts"],
          [formatEuro(paid), "paid out"],
        ].map(([v, l]) => (
          <div key={l} className="card p-5">
            <p className="font-display text-3xl font-bold text-ink">{v}</p>
            <p className="mt-1 text-xs text-muted">{l}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 mb-4 font-display text-xl font-bold text-ink">Collaboration requests</h2>
      {opportunities.length === 0 && (
        <div className="card p-10 text-center">
          <p className="font-display text-lg font-semibold text-ink">No briefs yet</p>
          <p className="mt-1 text-sm text-muted">
            When a brand invites you to a campaign it shows up here.
            <Link href="/dashboard/media-kit" className="ml-1 font-semibold text-accent hover:underline">
              Polish your media kit
            </Link>
            to get shortlisted.
          </p>
        </div>
      )}
      <div className="space-y-4">
        {opportunities.map((d) => (
          <div key={d.id} className="card p-6">
            <div className="flex flex-wrap items-center gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-slate-600 to-slate-800 font-bold text-white">
                {d.campaignName[0]}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-ink">{d.campaignName}</p>
                  <span className="rounded-full bg-canvas px-2 py-0.5 text-[11px] font-medium text-muted">LinkedIn post</span>
                </div>
                <p className="text-sm text-muted">{d.objective}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-xl font-bold text-ink">{formatEuro(d.share)}</p>
                <p className="text-[11px] text-muted">your fee</p>
              </div>
              <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${stateChip(d.state)}`}>
                {stateLabel(d.state)}
              </span>
            </div>

            <div className="mt-4 rounded-2xl border border-line bg-canvas p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Brief</p>
              <p className="mt-1.5 text-sm text-ink/80">{d.brief ?? "Brand brief attached"}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              {d.state === "invited" && (
                <>
                  <button onClick={() => act(d, "draft")} disabled={pending} className="btn-primary px-5 py-2.5 text-sm font-semibold disabled:opacity-60">
                    Accept & create draft
                  </button>
                  <button onClick={() => act(d, "declined")} disabled={pending} className="btn-light px-5 py-2.5 text-sm font-medium disabled:opacity-60">
                    Decline
                  </button>
                </>
              )}
              {d.state === "draft" && (
                <button onClick={() => act(d, "live")} disabled={pending} className="btn-primary px-5 py-2.5 text-sm font-semibold disabled:opacity-60">
                  Submit draft for review
                </button>
              )}
              {d.state === "live" && (
                <div className="flex items-center gap-2 text-sm text-muted">
                  <span className="size-2 animate-pulse rounded-full bg-accent" />
                  Live — awaiting brand review
                </div>
              )}
              {d.state === "approved" && (
                <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Paid out — SEPA payment received
                </div>
              )}
              {d.state === "declined" && (
                <p className="text-sm text-muted">Request declined. No hard feelings.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}