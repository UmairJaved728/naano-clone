"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import { marketplaceCreators, formatEuro } from "@/lib/data";
import { storeCampaign } from "@/lib/campaignStore";

type Step = 1 | 2 | 3;

export default function NewCampaign() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [prefill, setPrefill] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [objective, setObjective] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [keywords, setKeywords] = useState("");
  const [budget, setBudget] = useState(3000);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [generating, setGenerating] = useState(false);
  const [briefGenerated, setBriefGenerated] = useState(false);
  const [briefKeyMessages, setBriefKeyMessages] = useState([
    "Show the problem buyers already feel, then the product as the clean fix.",
    "Lead with a measurable outcome (trials, signups, saved hours).",
    "Keep it personal — the creator's own workflow in the first person.",
  ]);
  const [briefGuidelines, setBriefGuidelines] = useState([
    "Native LinkedIn tone, open with a hook, no corporate-speak.",
    "One clear CTA with the tracking link. No other links in the post.",
    "0–2 hashtags only. Tag @[Company] once.",
  ]);

  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    const id = sessionStorage.getItem("naano_prefill_creator");
    if (id) {
      sessionStorage.removeItem("naano_prefill_creator");
      setPrefill(id);
      setSelected(new Set([id]));
    }
  }, []);

  const selectedCreators = marketplaceCreators.filter((c) => selected.has(c.id));
  const totalCost = selectedCreators.reduce((sum, c) => sum + c.price, 0);

  const generateBrief = () => {
    setGenerating(true);
    setTimeout(() => {
      const kw = keywords || "B2B SaaS, creator-led growth";
      setBriefGenerated(true);
      setBriefKeyMessages([
        `Speak to the "${kw.split(",")[0].trim()}" pain point your ICP hits first.`,
        "Position the product as the shortest fix, with one number as proof.",
        "End with a specific call-to-action and the tracking link in the body.",
      ]);
      setBriefGuidelines([
        "Native LinkedIn tone, open with a hook, no corporate-speak.",
        "One clear CTA with the tracking link. No other links in the post.",
        "0–2 hashtags only. Tag @[Company] once.",
        `Mention the keyword "${kw.split(",")[0].trim()}" naturally in the first 3 lines.`,
      ]);
      setGenerating(false);
    }, 1400);
  };

  const canContinue =
    (step === 1 && name.trim() && objective.trim()) ||
    (step === 2 && briefGenerated) ||
    (step === 3 && selected.size > 0);

  const trackLink = `https://${(name || "campaign").toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 20)}.demo?utm_source=naano&utm_campaign=${encodeURIComponent(name || "campaign")}`;

  const launch = () => {
    storeCampaign({
      id: `cmp-${Date.now()}`,
      name,
      status: "briefing",
      objective,
      budget,
      startDate: startDate || new Date().toISOString().slice(0, 10),
      endDate: endDate || new Date(Date.now() + 30 * 864e5).toISOString().slice(0, 10),
      keywords: keywords.split(",").map((k) => k.trim()).filter(Boolean),
      trackingLink: trackLink,
      creators: [...selected].map((id) => ({ creatorId: id, state: "invited" })),
      createdAt: new Date().toISOString(),
    });
    router.push("/dashboard/campaigns");
  };

  return (
    <div className="mx-auto max-w-5xl">
      <Link href="/dashboard/campaigns" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
        ← Campaigns
      </Link>

      {/* Stepper */}
      <div className="mt-4 flex items-center gap-3">
        {[1, 2, 3].map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span
                className={`grid size-8 place-items-center rounded-full text-sm font-semibold ${
                  step >= s ? "bg-ink text-white" : "bg-canvas text-muted"
                }`}
              >
                {step > s ? "✓" : s}
              </span>
              <span className={`hidden text-sm font-medium sm:inline ${step >= s ? "text-ink" : "text-muted"}`}>
                {s === 1 ? "Brief" : s === 2 ? "AI draft" : "Creators"}
              </span>
            </div>
            {i < 2 && <div className={`h-px w-8 sm:w-16 ${step > s ? "bg-ink" : "bg-line"}`} />}
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="card mt-8 p-8">
          <h2 className="font-display text-2xl font-bold text-ink">Start with the outcome</h2>
          <p className="mt-1 text-sm text-muted">The AI brief builder takes it from here.</p>

          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ink">Campaign name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Q4 SEO & SaaS campaign"
                className="rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ink">Product / offer URL (optional)</span>
              <input
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                placeholder="https://yourproduct.com"
                className="rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink"
              />
            </label>
          </div>

          <label className="mt-5 flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink">Campaign objective</span>
            <textarea
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              rows={3}
              placeholder="e.g. Drive 300 qualified trials of our SEO tool from B2B SaaS audiences."
              className="resize-none rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink"
            />
          </label>

          <label className="mt-5 flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink">Target keyword / themes</span>
            <input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="SEO, content marketing, workflow AI"
              className="rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink"
            />
          </label>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ink">Budget (€)</span>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none focus:border-ink"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ink">Start date</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none focus:border-ink"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ink">End date</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none focus:border-ink"
              />
            </label>
          </div>

          <div className="mt-8 flex justify-end">
            <button disabled={!canContinue} onClick={() => setStep(2)} className="btn-primary px-7 py-3 font-semibold disabled:opacity-40">
              Continue to AI brief →
            </button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="mt-8 space-y-6">
          <div className="card flex items-start gap-4 p-6">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 3l1.9 5.6L19 10l-5.1 1.4L12 17l-1.9-5.6L5 10l5.1-1.4L12 3z" />
                <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
              </svg>
            </span>
            <div className="flex-1">
              <h2 className="font-display text-xl font-bold text-ink">Generate the brief</h2>
              <p className="mt-1 text-sm text-muted">
                We draft creative direction and creator guidelines from your objective + {productUrl || "your positioning"}.
              </p>
              {!briefGenerated && (
                <button onClick={generateBrief} disabled={generating} className="btn-blue mt-4 px-5 py-2.5 text-sm font-semibold disabled:opacity-60">
                  {generating ? "Writing the brief…" : "Generate brief with AI"}
                </button>
              )}
            </div>
          </div>

          {generating && (
            <div className="card p-8">
              <div className="space-y-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-4 animate-pulse rounded-full bg-black/5" style={{ width: `${100 - i * 22}%` }} />
                ))}
              </div>
            </div>
          )}

          {briefGenerated && (
            <>
              <div className="card p-8">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-ink">Key messages</h3>
                  <span className="chip text-emerald-700">Generated ✓</span>
                </div>
                <ul className="mt-4 space-y-3">
                  {briefKeyMessages.map((m, i) => (
                    <li key={i} className="flex items-start gap-3 rounded-xl bg-canvas px-4 py-3 text-sm text-ink/80">
                      <span className="mt-0.5 font-semibold text-accent">{i + 1}</span>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-8">
                <h3 className="font-display text-lg font-bold text-ink">Creator guidelines</h3>
                <ul className="mt-4 space-y-3">
                  {briefGuidelines.map((g, i) => (
                    <li key={i} className="flex items-start gap-3 rounded-xl bg-canvas px-4 py-3 text-sm text-ink/80">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b6d74" strokeWidth="2" className="mt-0.5 shrink-0">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 12l2.5 2.5L16 9" />
                      </svg>
                      {g}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-8">
                <h3 className="font-display text-lg font-bold text-ink">Tracking link (auto-generated)</h3>
                <p className="mt-1 text-sm text-muted">Attached to every campaign post. Each click is attributed.</p>
                <code className="mt-4 block rounded-xl bg-night px-4 py-3 text-xs text-emerald-300">
                  {trackLink}
                </code>
              </div>
            </>
          )}

          <div className="flex justify-between">
            <button onClick={() => setStep(1)} className="btn-light px-6 py-3 font-medium">
              ← Back
            </button>
            <button disabled={!canContinue} onClick={() => setStep(3)} className="btn-primary px-7 py-3 font-semibold disabled:opacity-40">
              Choose creators →
            </button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="mt-8 space-y-6">
          <div className="sticky top-4 z-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-white/90 px-5 py-3 shadow-sm backdrop-blur">
            <div>
              <p className="text-sm font-semibold text-ink">
                {selected.size} creator{selected.size === 1 ? "" : "s"} selected
              </p>
              <p className="text-xs text-muted">
                {formatEuro(totalCost)} estimated · within {formatEuro(budget)} budget
              </p>
            </div>
            <button disabled={!canContinue} onClick={launch} className="btn-primary px-7 py-3 font-semibold disabled:opacity-40">
              Launch campaign →
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {marketplaceCreators
              .filter((c) => c.status === "active")
              .map((c) => {
                const isOn = selected.has(c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() =>
                      setSelected((prev) => {
                        const next = new Set(prev);
                        if (next.has(c.id)) next.delete(c.id);
                        else next.add(c.id);
                        return next;
                      })
                    }
                    className={`card flex items-center gap-4 p-4 text-left transition-all ${
                      isOn ? "border-ink ring-1 ring-ink" : "hover:border-ink/30"
                    } ${prefill === c.id && isOn ? "ring-2 ring-accent" : ""}`}
                  >
                    <Avatar name={c.name} color={c.color} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-ink">{c.name}</p>
                      <p className="truncate text-xs text-muted">{c.headline}</p>
                      <div className="mt-1.5 flex gap-1.5">
                        <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[11px] font-bold text-emerald-700">Fit {c.fit}%</span>
                        <span className="rounded-md bg-canvas px-1.5 py-0.5 text-[11px] font-medium text-muted">
                          {c.networks.join(" · ")}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-base font-bold text-ink">{formatEuro(c.price)}</p>
                      <p className="text-[11px] text-muted">/ post</p>
                      <span
                        className={`mt-1 inline-grid size-6 place-items-center rounded-full border text-xs font-bold ${
                          isOn ? "border-ink bg-ink text-white" : "border-line text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                    </div>
                  </button>
                );
              })}
          </div>

          <div className="flex justify-between">
            <button onClick={() => setStep(2)} className="btn-light px-6 py-3 font-medium">
              ← Back to brief
            </button>
          </div>
        </div>
      )}
    </div>
  );
}