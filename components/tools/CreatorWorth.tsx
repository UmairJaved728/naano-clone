"use client";

import { useState } from "react";
import LandingLayout from "@/components/LandingLayout";

export default function CreatorWorthCalculator() {
  const [followers, setFollowers] = useState(20000);
  const [ctr, setCtr] = useState(0.85);
  const [conv, setConv] = useState(2);
  const [acl, setAcl] = useState(400);

  const clicks = Math.round(followers * (ctr / 100));
  const leads = Math.round(clicks * (conv / 100));
  const pipeline = Math.round(leads * acl);
  const bucket = followers < 5000 ? "Niche voice" : followers < 50000 ? "Micro creator" : "Mid creator";

  return (
    <LandingLayout navLinks="marketing">
      <div className="mx-auto max-w-4xl px-6 pt-12 pb-24">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Free tool</p>
        <h1 className="mt-4 font-display text-4xl font-bold text-ink sm:text-5xl">
          Creator worth calculator
        </h1>
        <p className="mt-3 text-lg text-muted">
          Estimate the pipeline a B2B creator is likely to drive for one post,
          using Naano benchmark rates.
        </p>

        <div className="card mt-10 p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="space-y-7">
              <label className="block">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-ink">Follower count</span>
                  <span className="font-bold text-ink">{followers.toLocaleString()}</span>
                </div>
                <input type="range" min={1000} max={250000} step={1000} value={followers} onChange={(e) => setFollowers(Number(e.target.value))} className="mt-2 w-full accent-blue-600" />
                <p className="text-xs text-muted">{bucket}</p>
              </label>

              <label className="block">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-ink">Click-through rate (%)</span>
                  <span className="font-bold text-ink">{ctr.toFixed(2)}</span>
                </div>
                <input type="range" min={0.2} max={3} step={0.05} value={ctr} onChange={(e) => setCtr(Number(e.target.value))} className="mt-2 w-full accent-blue-600" />
                <p className="text-xs text-muted">B2B sponsored post average: 0.85%</p>
              </label>

              <label className="block">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-ink">Click → lead conversion (%)</span>
                  <span className="font-bold text-ink">{conv}</span>
                </div>
                <input type="range" min={0.5} max={8} step={0.5} value={conv} onChange={(e) => setConv(Number(e.target.value))} className="mt-2 w-full accent-blue-600" />
              </label>

              <label className="block">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-ink">Avg contract value (€)</span>
                  <span className="font-bold text-ink">€{acl.toLocaleString()}</span>
                </div>
                <input type="range" min={100} max={2000} step={50} value={acl} onChange={(e) => setAcl(Number(e.target.value))} className="mt-2 w-full accent-blue-600" />
              </label>
            </div>

            <div className="flex flex-col justify-center rounded-2xl bg-night p-8 text-white">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Estimated per post</p>
              <div className="mt-6 space-y-5">
                {[
                  [clicks.toLocaleString(), "clicks", "bg-blue-500"],
                  [leads.toLocaleString(), "leads", "bg-emerald-500"],
                  [`€${pipeline.toLocaleString()}`, "pipeline", "bg-amber-500"],
                ].map(([v, l, c]) => (
                  <div key={l as string}>
                    <p className="font-display text-3xl font-bold">{v}</p>
                    <p className="text-sm text-white/50">{l}</p>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div className={`h-full rounded-full ${c}`} style={{ width: "100%" }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs leading-relaxed text-white/40">
                Based on Naano's own attribution data. Every campaign varies —
                treat this as a planning estimate, not a guarantee.
              </p>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}