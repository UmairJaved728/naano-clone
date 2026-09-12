"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How do I get paid?",
    a: "Once you publish an approved post, we trigger the payout automatically via SEPA or Stripe Connect. Most creators receive their payment within 24 hours of the post going live.",
  },
  {
    q: "Do I have to work with a specific brand?",
    a: "Never. Every collaboration comes to you as a request with the price, brief and timeline up front. Accept what fits your audience, decline what does not — there is no obligation.",
  },
  {
    q: "Is it free to join as a creator?",
    a: "Yes. Joining Naano is free — we charge the brands, never the creators. The price on every request is the price you receive.",
  },
  {
    q: "What kind of posts are asked for?",
    a: "Most briefs are sponsored LinkedIn posts or X threads for B2B SaaS brands — product stories, founder journeys, workflow breakdowns and hot takes your audience already engages with.",
  },
  {
    q: "Do I need a minimum follower count?",
    a: "No. We work with creators from around 1,000 followers up to several hundred thousand. It's the fit between your audience and the brand's buyers that matters, not the raw number.",
  },
  {
    q: "Can I bring my own brand deals into Naano?",
    a: "Yes — a lot of creators negotiate directly with brands and run the paid post through Naano for a clean contract, tracking and guaranteed payout.",
  },
  {
    q: "How soon will I see collaboration requests?",
    a: "Creators with a completed media kit typically start receiving requests within the first few weeks. Active, topic-focused creators get matched more often.",
  },
];

export default function CreatorsFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-canvas py-24">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Creator questions
        </p>
        <h2 className="mt-4 text-balance text-center font-display text-4xl font-bold tracking-tight text-ink">
          From first brief to first payout.
        </h2>

        <div className="mt-12 divide-y divide-line rounded-3xl border border-line bg-white">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-base font-semibold text-ink">{f.q}</span>
                  <span
                    className={`grid size-7 shrink-0 place-items-center rounded-full border border-line text-ink transition-transform duration-200 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-sm leading-relaxed text-muted">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}