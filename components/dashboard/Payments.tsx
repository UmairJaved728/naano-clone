import { Header } from "@/components/dashboard/ui";
import { formatEuro } from "@/lib/data";
import type { PaymentDto } from "@/lib/dto";

export default function Payments({ role, rows }: { role: "brand" | "creator"; rows: PaymentDto[] }) {
  const isCreator = role === "creator";
  const totalPaid = rows.filter((r) => r.status === "paid").reduce((s, r) => s + r.amount, 0);
  const totalPending = rows.filter((r) => r.status === "pending").reduce((s, r) => s + r.amount, 0);

  const ref = (r: PaymentDto) =>
    `${r.direction === "in" ? "PAY" : "INV"}-${r.id.slice(0, 7).toUpperCase()}`;

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
          <p className="mt-2 font-display text-3xl font-bold text-ink">{formatEuro(totalPending)}</p>
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
        {rows.length === 0 && (
          <p className="px-6 py-10 text-center text-sm text-muted">No payments yet.</p>
        )}
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
                  <p className="text-sm font-semibold text-ink">{ref(r)}</p>
                  <p className="text-xs text-muted">
                    {r.direction === "in" ? `From ${r.campaignName}` : `To ${r.creatorName ?? r.campaignName}`} · {r.createdAt.slice(0, 10)}
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