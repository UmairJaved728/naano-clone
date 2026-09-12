"use client";

import { useEffect, useState } from "react";
import Avatar from "@/components/Avatar";
import { Header } from "@/components/dashboard/ui";
import { getCreator, formatEuro } from "@/lib/data";
import type { User } from "@/lib/auth";

interface Deal {
  id: string;
  brand: string;
  topic: string;
  price: number;
  state: "new" | "draft" | "approved" | "paid" | "declined";
  brief: string;
  postKind: string;
}

const initialDeals: Deal[] = [
  {
    id: "d1",
    brand: "Leadbay",
    topic: "AI prospecting workflows",
    price: 650,
    state: "new",
    brief: "Show our AI prospecting workflow in action. Focus on how you removed manual research from your pipeline.",
    postKind: "LinkedIn post",
  },
  {
    id: "d2",
    brand: "BlogSEO",
    topic: "SEO & content marketing",
    price: 500,
    state: "draft",
    brief: "Break down how technical SEO changed for programmatic content teams. One hard number in the post.",
    postKind: "LinkedIn post",
  },
  {
    id: "d3",
    brand: "Folk",
    topic: "CRM for creators",
    price: 700,
    state: "approved",
    brief: "A personal CRM thread: how you stopped losing follow-ups and started living in your CRM.",
    postKind: "X thread",
  },
  {
    id: "d4",
    brand: "Abyssale",
    topic: "Creator workflows",
    price: 900,
    state: "paid",
    brief: "Your 30-day LinkedIn content system, the exact playbook.",
    postKind: "LinkedIn carousel",
  },
];

export default function CreatorHome() {
  const [session, setSession] = useState<User | null>(null);
  const [deals, setDeals] = useState<Deal[]>(initialDeals);

  useEffect(() => {
    setSession(JSON.parse(localStorage.getItem("naano_current_user") ?? "null"));
  }, []);

  const earnable = deals.filter((d) => d.state === "new" || d.state === "draft" || d.state === "approved").reduce((s, d) => s + d.price, 0);
  const paid = deals.filter((d) => d.state === "paid").reduce((s, d) => s + d.price, 0);

  const act = (id: string, state: Deal["state"]) => {
    setDeals((prev) => prev.map((d) => (d.id === id ? { ...d, state } : d)));
  };

  return (
    <div>
      <Header
        title={`Hey ${session?.name?.split(" ")[0] ?? "creator"} 👋`}
        subtitle="New briefs and your pipeline in one place."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {[
          [String(deals.filter((d) => d.state === "new").length), "new briefs"],
          [String(deals.filter((d) => d.state !== "paid" && d.state !== "declined").length), "in progress"],
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
      <div className="space-y-4">
        {deals.map((d) => {
          const c = getCreator("c9")!;
          return (
            <div key={d.id} className="card p-6">
              <div className="flex flex-wrap items-center gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-slate-600 to-slate-800 font-bold text-white">
                  {d.brand[0]}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-ink">{d.brand}</p>
                    <span className="rounded-full bg-canvas px-2 py-0.5 text-[11px] font-medium text-muted">{d.postKind}</span>
                  </div>
                  <p className="text-sm text-muted">{d.topic}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-xl font-bold text-ink">{formatEuro(d.price)}</p>
                  <p className="text-[11px] text-muted">per post</p>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                    d.state === "paid"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : d.state === "declined"
                        ? "border-rose-200 bg-rose-50 text-rose-700"
                        : d.state === "approved"
                          ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                          : d.state === "draft"
                            ? "border-amber-200 bg-amber-50 text-amber-700"
                            : "border-blue-200 bg-blue-50 text-blue-700"
                  }`}
                >
                  {d.state === "new" ? "New" : d.state[0].toUpperCase() + d.state.slice(1)}
                </span>
              </div>

              <div className="mt-4 rounded-2xl border border-line bg-canvas p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Brief</p>
                <p className="mt-1.5 text-sm text-ink/80">{d.brief}</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {d.state === "new" && (
                  <>
                    <button onClick={() => act(d.id, "draft")} className="btn-primary px-5 py-2.5 text-sm font-semibold">
                      Accept & create draft
                    </button>
                    <button onClick={() => act(d.id, "declined")} className="btn-light px-5 py-2.5 text-sm font-medium">
                      Decline
                    </button>
                  </>
                )}
                {d.state === "draft" && (
                  <button onClick={() => act(d.id, "approved")} className="btn-primary px-5 py-2.5 text-sm font-semibold">
                    Submit draft for review
                  </button>
                )}
                {d.state === "approved" && (
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <span className="size-2 animate-pulse rounded-full bg-accent" />
                    Draft under review by {d.brand}
                  </div>
                )}
                {d.state === "paid" && (
                  <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    Paid out · SEPA payment received
                  </div>
                )}
                {d.state === "declined" && (
                  <p className="text-sm text-muted">Request declined. No hard feelings.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}