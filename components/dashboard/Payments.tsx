"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/dashboard/ui";
import { formatEuro } from "@/lib/data";
import type { User } from "@/lib/auth";

interface Row {
  id: string;
  ref: string;
  date: string;
  to: string;
  amount: number;
  status: "paid" | "scheduled" | "pending";
}

const brandRows: Row[] = [
  { id: "p1", ref: "INV-2026-041", date: "2026-09-10", to: "Lucas Weber", amount: 900, status: "paid" },
  { id: "p2", ref: "INV-2026-038", date: "2026-09-09", to: "Marina Panova", amount: 700, status: "paid" },
  { id: "p3", ref: "INV-2026-036", date: "2026-09-08", to: "Thomas Higadère", amount: 850, status: "scheduled" },
  { id: "p4", ref: "INV-2026-033", date: "2026-09-05", to: "Robin Tempe", amount: 500, status: "scheduled" },
  { id: "p5", ref: "INV-2026-031", date: "2026-09-02", to: "Raphaël Dubois", amount: 600, status: "paid" },
];

const creatorRows: Row[] = [
  { id: "p1", ref: "PAY-2026-1088", date: "2026-09-10", to: "Folk", amount: 700, status: "paid" },
  { id: "p2", ref: "PAY-2026-1061", date: "2026-09-02", to: "Abyssale", amount: 900, status: "paid" },
];

export default function Payments() {
  const [role, setRole] = useState<string | null>(null);
  const [session, setSession] = useState<User | null>(null);

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("naano_current_user") ?? "null");
      setSession(u);
      setRole(u?.role ?? null);
    } catch {
      setRole(null);
    }
  }, []);

  const isCreator = role === "influencer";
  const rows = isCreator ? creatorRows : brandRows;
  const totalPaid = rows.filter((r) => r.status === "paid").reduce((s, r) => s + r.amount, 0);
  const totalScheduled = rows.filter((r) => r.status === "scheduled").reduce((s, r) => s + r.amount, 0);

  return (
    <div className="max-w-4xl">
      <Header
        title={isCreator ? "Payments" : "Payouts"}
        subtitle={
          isCreator
            ? "Every euro you've earned, paid within 24h via SEPA."
            : "Automatic creator payouts via Stripe Connect — approve content, we handle the rest."
        }
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="card p-5">
          <p className="text-xs text-muted">{isCreator ? "Total paid out to you" : "Total paid to creators"}</p>
          <p className="mt-2 font-display text-3xl font-bold text-ink">{formatEuro(totalPaid)}</p>
        </div>
        <div className="card p-5">
          <p className="text-xs text-muted">{isCreator ? "Pending" : "Scheduled"}</p>
          <p className="mt-2 font-display text-3xl font-bold text-ink">{formatEuro(totalScheduled)}</p>
        </div>
      </div>

      <div className="card mt-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <div>
            <h2 className="font-display text-lg font-bold text-ink">Payment history</h2>
            <p className="text-xs text-muted">All handled by Naano — no invoicing, no chasing.</p>
          </div>
          <span className="chip text-emerald-700">Stripe Connect</span>
        </div>
        <div className="divide-y divide-line">
          {rows.map((r) => (
            <div key={r.id} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <span className={`grid size-9 place-items-center rounded-full ${
                  r.status === "paid" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                }`}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{r.ref}</p>
                  <p className="text-xs text-muted">
                    {isCreator ? `From ${r.to}` : `To ${r.to}`} · {r.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-ink">{formatEuro(r.amount)}</span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  r.status === "paid" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                }`}>
                  {r.status === "paid" ? (isCreator ? "Received" : "Sent") : "Scheduled"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}