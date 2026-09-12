"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/dashboard/ui";
import type { User } from "@/lib/auth";

export default function Settings() {
  const [session, setSession] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("naano_current_user") ?? "null");
      setSession(u);
      setName(u?.name ?? "");
      setCompany(u?.company ?? "");
    } catch {
      /* ignore */
    }
  }, []);

  const save = () => {
    if (!session) return;
    const next = { ...session, name, company: company || session.company };
    localStorage.setItem("naano_current_user", JSON.stringify(next));
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  };

  return (
    <div className="max-w-3xl">
      <Header title="Settings" subtitle="Your account, billing and team preferences." />

      <div className="space-y-6">
        <div className="card p-8">
          <h2 className="font-display text-lg font-bold text-ink">Profile</h2>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ink">Name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl border border-line bg-canvas px-4 py-2.5 text-sm outline-none focus:border-ink" />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ink">Email</span>
              <input value={session?.email ?? ""} disabled className="rounded-xl border border-line bg-canvas px-4 py-2.5 text-sm text-muted outline-none" />
            </label>
            {session?.role === "saas" ? (
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-ink">Company</span>
                <input value={company} onChange={(e) => setCompany(e.target.value)} className="rounded-xl border border-line bg-canvas px-4 py-2.5 text-sm outline-none focus:border-ink" />
              </label>
            ) : (
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-ink">LinkedIn profile</span>
                <input value={session?.linkedin ?? ""} disabled className="rounded-xl border border-line bg-canvas px-4 py-2.5 text-sm text-muted outline-none" />
              </label>
            )}
          </div>
          <button onClick={save} className="btn-primary mt-6 px-6 py-3 font-semibold">
            {saved ? "Saved ✓" : "Save changes"}
          </button>
        </div>

        <div className="card p-8">
          <h2 className="font-display text-lg font-bold text-ink">Billing</h2>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-canvas p-5">
            <div>
              <p className="text-sm font-semibold text-ink">{session?.role === "saas" ? "Self-Serve plan" : "Creator plan"}</p>
              <p className="text-xs text-muted">
                {session?.role === "saas" ? "€0/month — pay per published post. No lock-in." : "Free for creators — we charge the brands."}
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}