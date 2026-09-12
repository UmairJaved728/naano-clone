"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/dashboard/ui";
import { updateSettings } from "@/lib/actions";
import type { SettingsDto } from "@/lib/dto";

export default function Settings({ user }: { user: SettingsDto }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [name, setName] = useState(user.name);
  const [company, setCompany] = useState(user.company ?? "");
  const [saved, setSaved] = useState(false);

  const save = () => {
    startTransition(async () => {
      if (user.role === "brand") {
        await updateSettings({ name: name.trim(), company: company.trim() || null });
      } else {
        await updateSettings({ name: name.trim() });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 1600);
      router.refresh();
    });
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
              <input value={user.email} disabled className="rounded-xl border border-line bg-canvas px-4 py-2.5 text-sm text-muted outline-none" />
            </label>
            {user.role === "brand" ? (
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-ink">Company</span>
                <input value={company} onChange={(e) => setCompany(e.target.value)} className="rounded-xl border border-line bg-canvas px-4 py-2.5 text-sm outline-none focus:border-ink" />
              </label>
            ) : (
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-ink">LinkedIn profile</span>
                <input value={user.profileUrl ?? ""} disabled className="rounded-xl border border-line bg-canvas px-4 py-2.5 text-sm text-muted outline-none" />
              </label>
            )}
          </div>
          <button onClick={save} disabled={pending} className="btn-primary mt-6 px-6 py-3 font-semibold disabled:opacity-60">
            {saved ? "Saved ✓" : pending ? "Saving…" : "Save changes"}
          </button>
        </div>

        <div className="card p-8">
          <h2 className="font-display text-lg font-bold text-ink">Billing</h2>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-canvas p-5">
            <div>
              <p className="text-sm font-semibold text-ink">{user.role === "brand" ? "Self-Serve plan" : "Creator plan"}</p>
              <p className="text-xs text-muted">
                {user.role === "brand" ? "€0/month — pay per published post. No lock-in." : "Free for creators — we charge the brands."}
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}