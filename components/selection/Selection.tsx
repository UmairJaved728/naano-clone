"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import { marketplaceCreators, formatEuro } from "@/lib/data";

export default function Selection() {
  const [query, setQuery] = useState("");
  const [network, setNetwork] = useState("All");

  const filtered = useMemo(() => {
    return marketplaceCreators.filter((c) => {
      const q =
        !query ||
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.headline.toLowerCase().includes(query.toLowerCase()) ||
        c.topics.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      const n = network === "All" || c.networks.includes(network as never);
      return q && n;
    });
  }, [query, network]);

  return (
    <div className="mx-auto max-w-6xl px-6 pt-10 pb-24">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Free tool</p>
      <h1 className="mt-4 font-display text-5xl font-bold tracking-tight text-ink">
        Find B2B creators, free.
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted">
        A sample of the Naano marketplace. Search by name, topic or vertical —
        no login required.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="AI, sales, RevOps…"
          className="flex-1 rounded-full border border-line bg-white px-5 py-3 text-sm outline-none focus:border-ink"
        />
        <div className="flex gap-2">
          {["All", "LinkedIn", "X", "YouTube"].map((n) => (
            <button
              key={n}
              onClick={() => setNetwork(n)}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                network === n ? "border-ink bg-ink text-white" : "border-line bg-white text-ink/70"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <div key={c.id} className="card p-5">
            <div className="flex items-center gap-3">
              <Avatar name={c.name} color={c.color} />
              <div className="min-w-0">
                <p className="font-semibold text-ink">{c.name}</p>
                <p className="truncate text-xs text-muted">{c.headline}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {c.topics.slice(0, 3).map((t) => (
                <span key={t} className="rounded-full border border-line px-2 py-0.5 text-[11px] text-muted">{t}</span>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
              <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">Fit {c.fit}%</span>
              <span className="font-display font-bold text-ink">{formatEuro(c.price)} <span className="text-xs font-normal text-muted">/post</span></span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-3xl border border-dashed border-line bg-white p-12 text-center text-muted">
          Nothing matched. Try &quot;AI&quot; or clear the network filter.
        </div>
      )}

      <div className="mt-12 rounded-3xl border border-line bg-white p-8 text-center">
        <p className="font-display text-xl font-semibold text-ink">See the full marketplace</p>
        <p className="mt-2 text-sm text-muted">
          3,000+ vetted creators with fit scores, performance data and one-click booking.
        </p>
        <Link href="/register?role=saas" className="btn-primary mt-6 inline-flex px-7 py-3 font-semibold">
          Create a free account
        </Link>
      </div>
    </div>
  );
}