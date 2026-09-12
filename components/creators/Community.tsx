"use client";

import { useState } from "react";
import Avatar from "@/components/Avatar";

const testimonials = [
  {
    name: "Léa Martin",
    role: "GTM consultant · 18K followers",
    quote: "Naano got me three brand deals in the first month. I set one price, approve what fits and never chase an invoice again.",
    color: "from-fuchsia-500 to-pink-600",
  },
  {
    name: "Omar Diallo",
    role: "RevOps creator · 11K followers",
    quote: "The briefs are actually good. Brands come in with a real angle that matches the content my audience already reads.",
    color: "from-cyan-500 to-sky-600",
  },
  {
    name: "Anna Kowalska",
    role: "Sales coach · 26K followers",
    quote: "Payouts arrive in a day. Compared to the agencies I used before, this is the first time sponsorship feels boring in a good way.",
    color: "from-amber-500 to-orange-600",
  },
];

export default function Community() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Community
        </p>
        <h2 className="mt-4 max-w-xl font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Creators building a channel on Naano.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="card flex flex-col justify-between p-8 lg:col-span-2">
            <blockquote className="text-balance font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
              “{t.quote}”
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <Avatar name={t.name} color={t.color} size="lg" />
              <div>
                <p className="font-semibold text-ink">{t.name}</p>
                <p className="text-sm text-muted">{t.role}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {testimonials.map((item, i) => (
              <button
                key={item.name}
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                  active === i
                    ? "border-ink bg-ink text-white shadow-lg"
                    : "border-line bg-canvas text-ink hover:border-ink/30"
                }`}
              >
                <Avatar name={item.name} color={item.color} />
                <div className="min-w-0">
                  <p className={`truncate text-sm font-semibold ${active === i ? "text-white" : "text-ink"}`}>
                    {item.name}
                  </p>
                  <p className={`truncate text-xs ${active === i ? "text-white/60" : "text-muted"}`}>
                    {item.role}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}