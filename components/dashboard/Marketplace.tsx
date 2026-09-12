"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import { Header } from "@/components/dashboard/ui";
import { marketplaceCreators, formatEuro } from "@/lib/data";
import type { Creator } from "@/lib/types";

type SortKey = "fit" | "price" | "follows";

export default function Marketplace() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("All");
  const [network, setNetwork] = useState("All");
  const [sort, setSort] = useState<SortKey>("fit");
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());

  const topics = useMemo(() => {
    const set = new Set<string>();
    marketplaceCreators.forEach((c) => c.topics.forEach((t) => set.add(t)));
    return ["All", ...set];
  }, []);

  const filtered = useMemo(() => {
    let list = marketplaceCreators.filter((c) => {
      const matchesQuery =
        !query ||
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.headline.toLowerCase().includes(query.toLowerCase()) ||
        c.bio.toLowerCase().includes(query.toLowerCase());
      const matchesTopic = topic === "All" || c.topics.includes(topic);
      const matchesNetwork = network === "All" || c.networks.includes(network as Creator["networks"][number]);
      return matchesQuery && matchesTopic && matchesNetwork;
    });
    list = [...list].sort((a, b) => {
      if (sort === "price") return a.price - b.price;
      if (sort === "follows") return b.follows - a.follows;
      return b.fit - a.fit;
    });
    return list;
  }, [query, topic, network, sort]);

  const toggleBookmark = (id: string) => {
    setBookmarked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div>
      <Header
        title="Marketplace"
        subtitle="3,000+ vetted B2B creators. Ranked by audience fit, not follower count."
        actions={
          <Link href="/dashboard/campaigns/new" className="btn-primary px-5 py-2.5 text-[15px] font-semibold">
            Build a campaign
          </Link>
        }
      />

      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search creators, topics, verticals…"
            className="w-full rounded-full border border-line bg-white py-2.5 pl-11 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {["All", "LinkedIn", "X", "YouTube"].map((n) => (
            <button
              key={n}
              onClick={() => setNetwork(n)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                network === n ? "border-ink bg-ink text-white" : "border-line bg-white text-ink/70 hover:border-ink/30"
              }`}
            >
              {n}
            </button>
          ))}
          <span className="mx-1 h-6 w-px shrink-0 bg-line" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="shrink-0 rounded-full border border-line bg-white px-4 py-2 text-xs font-medium text-ink outline-none"
          >
            <option value="fit">Sort: best fit</option>
            <option value="price">Sort: price ↑</option>
            <option value="follows">Sort: followers</option>
          </select>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => setTopic(t)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
              topic === t ? "bg-accent text-white" : "border border-line bg-white text-ink/70 hover:border-ink/30"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((c) => (
          <CreatorCard key={c.id} c={c} bookmarked={bookmarked.has(c.id)} onToggle={() => toggleBookmark(c.id)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-3xl border border-dashed border-line bg-white p-12 text-center">
          <p className="font-display text-lg font-semibold text-ink">No creators match those filters</p>
          <p className="mt-1 text-sm text-muted">Try clearing the topic or network filter.</p>
        </div>
      )}
    </div>
  );
}

function CreatorCard({ c, bookmarked, onToggle }: { c: Creator; bookmarked: boolean; onToggle: () => void }) {
  return (
    <div className="card group flex flex-col p-5 transition-all hover:shadow-lg hover:shadow-black/[0.05]">
      <div className="flex items-start gap-3">
        <Avatar name={c.name} color={c.color} />
        <div className="min-w-0 flex-1">
          <button onClick={onToggle} aria-label="Save" className="float-right -mr-1 mt-0.5 text-muted transition-colors hover:text-amber-500">
            <svg width="18" height="18" viewBox="0 0 24 24" fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
              <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7 7-7z" />
            </svg>
          </button>
          <Link href={`/dashboard/marketplace/${c.id}`} className="font-semibold text-ink hover:text-accent transition-colors">
            {c.name}
          </Link>
          <p className="truncate text-xs text-muted">{c.headline}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {c.networks.map((n) => (
          <span key={n} className="rounded-full bg-canvas px-2 py-0.5 text-[11px] font-medium text-ink/70">
            {n}
          </span>
        ))}
        {c.topics.slice(0, 3).map((t) => (
          <span key={t} className="rounded-full border border-line px-2 py-0.5 text-[11px] font-medium text-muted">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
              Fit {c.fit}%
            </span>
            <span className="text-xs text-muted">
              {new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 0 }).format(c.follows)} followers
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="font-display text-lg font-bold text-ink">{formatEuro(c.price)}</p>
          <p className="-mt-0.5 text-[11px] text-muted">per post</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link
          href={`/dashboard/marketplace/${c.id}`}
          className="rounded-full border border-line py-2 text-center text-sm font-medium text-ink transition-colors hover:border-ink/40"
        >
          View profile
        </Link>
        <Link
          href={`/dashboard/marketplace/${c.id}?book=1`}
          className="btn-primary py-2 text-sm"
        >
          Book at {formatEuro(c.price)}
        </Link>
      </div>
    </div>
  );
}