"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@/components/Avatar";
import { Header } from "@/components/dashboard/ui";
import { formatEuro } from "@/lib/data";
import { updateMediaKit } from "@/lib/actions";
import type { SettingsDto } from "@/lib/dto";

const ALL_TOPICS = ["AI", "Sales", "GTM", "DevTools", "RevOps", "Marketing", "Fintech", "HR tech", "Future of work", "Creator workflows"];

export default function MediaKit({ user }: { user: SettingsDto }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [name, setName] = useState(user.name);
  const [headline, setHeadline] = useState(user.headline ?? "Your creator headline");
  const [bio, setBio] = useState(user.bio ?? "");
  const [price, setPrice] = useState(user.price ?? 200);
  const [topics, setTopics] = useState<string[]>(user.topTopics);
  const [saved, setSaved] = useState(false);

  const toggleTopic = (t: string) => {
    setTopics((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };

  const save = () => {
    startTransition(async () => {
      await updateMediaKit({
        price: Number(price) || 0,
        topTopics: topics,
        headline: headline.trim(),
        bio: bio.trim(),
        color: user.color ?? "from-blue-600 to-indigo-700",
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 1600);
      router.refresh();
    });
  };

  return (
    <div className="max-w-3xl">
      <Header
        title="My media kit"
        subtitle="This is what brands see when they shortlist you."
        actions={<span className="chip text-emerald-700">Public ✓</span>}
      />

      <div className="card p-8">
        <div className="flex items-center gap-4 border-b border-line pb-6">
          <Avatar name={name} color={user.color ?? "from-blue-600 to-indigo-700"} size="lg" />
          <div>
            <h2 className="font-display text-xl font-bold text-ink">{name}</h2>
            <p className="text-sm text-muted">{user.profileUrl ?? "linkedin.com/in/your-handle"}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink">Public name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl border border-line bg-canvas px-4 py-2.5 text-sm outline-none focus:border-ink" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink">Headline</span>
            <input value={headline} onChange={(e) => setHeadline(e.target.value)} className="rounded-xl border border-line bg-canvas px-4 py-2.5 text-sm outline-none focus:border-ink" />
          </label>
        </div>

        <label className="mt-5 flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink">Bio</span>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="What your audience trusts you on…"
            className="resize-none rounded-xl border border-line bg-canvas px-4 py-2.5 text-sm outline-none focus:border-ink"
          />
        </label>

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
            {ALL_TOPICS.map((t) => (
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
            <Avatar name={name} color={user.color ?? "from-blue-600 to-indigo-700"} />
            <div>
              <p className="font-semibold text-ink">{name}</p>
              <p className="text-sm text-muted">{headline}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="font-display text-xl font-bold text-ink">{formatEuro(price)}</p>
              <p className="text-[11px] text-muted">per post</p>
            </div>
          </div>
        </div>

        <button
          onClick={save}
          disabled={pending}
          className="btn-primary mt-6 w-full py-3 font-semibold disabled:opacity-60"
        >
          {saved ? "Saved ✓" : pending ? "Saving…" : "Save media kit"}
        </button>
      </div>
    </div>
  );
}