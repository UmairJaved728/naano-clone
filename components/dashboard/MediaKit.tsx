"use client";

import { useState } from "react";
import Avatar from "@/components/Avatar";
import { Header } from "@/components/dashboard/ui";

export default function MediaKit() {
  const [name, setName] = useState("Sofia Nguyen");
  const [handle, setHandle] = useState("linkedin.com/in/sofia-nguyen");
  const [followers, setFollowers] = useState("9,000");
  const [price, setPrice] = useState(350);
  const [topics, setTopics] = useState(["HR tech", "People ops", "Future of work"]);
  const [visible, setVisible] = useState(true);

  const [saved, setSaved] = useState(false);

  const toggleTopic = (t: string) => {
    setTopics((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };

  const allTopics = ["HR tech", "People ops", "Future of work", "AI", "Sales", "GTM", "DevTools", "RevOps", "Marketing", "Fintech"];

  return (
    <div className="max-w-3xl">
      <Header
        title="My media kit"
        subtitle="This is what brands see when they shortlist you."
        actions={
          <button
            onClick={() => setVisible(!visible)}
            className={`btn-light px-4 py-2 text-sm ${visible ? "text-emerald-700" : ""}`}
          >
            {visible ? "Public ✓" : "Hidden"}
          </button>
        }
      />

      <div className="card p-8">
        <div className="flex items-center gap-4 border-b border-line pb-6">
          <Avatar name={name} color="from-emerald-400 to-teal-600" size="lg" />
          <div>
            <h2 className="font-display text-xl font-bold text-ink">{name}</h2>
            <p className="text-sm text-muted">{handle}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink">Public name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl border border-line bg-canvas px-4 py-2.5 text-sm outline-none focus:border-ink" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink">LinkedIn URL</span>
            <input value={handle} onChange={(e) => setHandle(e.target.value)} className="rounded-xl border border-line bg-canvas px-4 py-2.5 text-sm outline-none focus:border-ink" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink">Followers</span>
            <input value={followers} onChange={(e) => setFollowers(e.target.value)} className="rounded-xl border border-line bg-canvas px-4 py-2.5 text-sm outline-none focus:border-ink" />
          </label>
        </div>

        <label className="mt-5 flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink">
            Price per post — <span className="text-muted">set by you, shown before booking</span>
          </span>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="rounded-xl border border-line bg-canvas px-4 py-2.5 text-sm font-bold text-ink outline-none focus:border-ink"
          />
        </label>

        <div className="mt-6">
          <p className="text-sm font-medium text-ink">Topics you cover</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {allTopics.map((t) => (
              <button
                key={t}
                onClick={() => toggleTopic(t)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                  topics.includes(t)
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-canvas text-ink/70 hover:border-ink/30"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-line bg-canvas p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Preview — what brands see</p>
          <div className="mt-4 flex items-center gap-4">
            <Avatar name={name} color="from-emerald-400 to-teal-600" />
            <div>
              <p className="font-semibold text-ink">{name} · {followers} followers</p>
              <p className="text-sm text-muted">{topics.join(" · ")}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="font-display text-xl font-bold text-ink">€{price}</p>
              <p className="text-[11px] text-muted">per post</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setSaved(true);
            setTimeout(() => setSaved(false), 1600);
          }}
          className="btn-primary mt-6 w-full py-3 font-semibold"
        >
          {saved ? "Saved ✓" : "Save media kit"}
        </button>
      </div>
    </div>
  );
}