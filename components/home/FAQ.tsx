"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is Naano?",
    a: "Naano is a B2B LinkedIn creator marketplace: companies discover and book vetted creators for sponsored LinkedIn campaigns, each at a fixed price per post set by the creator. The marketplace spans creators from niche voices with around 1,000 followers to established B2B creators with audiences of several hundred thousand.",
  },
  {
    q: "How does Naano find the right creators?",
    a: "Our matching engine scores every creator on audience fit, category relevance and engagement quality across LinkedIn, X and YouTube, so you rank creators by who actually reaches your buyers, not by follower count.",
  },
  {
    q: "Which networks do you support?",
    a: "LinkedIn, X and YouTube today, with more on the way. You can compare creators and track performance across every network in one place.",
  },
  {
    q: "How does per-post pricing work?",
    a: "Campaigns start from €20 per published post — you only pay for posts that go live, with no retainer. Prefer a hands-off setup? Managed campaigns adds our team executing everything end to end.",
  },
  {
    q: "How does attribution work?",
    a: "Naano places a tracking pixel at every stage of the funnel, so each click, lead, pipeline and revenue is tied back to the exact creator and post that drove it.",
  },
  {
    q: "Do you handle creator payouts?",
    a: "Yes. Approve content and pay every creator in one click, securely via Stripe Connect; invoices and approvals are handled for you.",
  },
  {
    q: "What's the difference between Free and Managed?",
    a: "Free gives your team the platform to source creators and run simple campaigns yourselves. Managed adds hands-on execution by the Naano team — sourcing, briefs, reporting and optimisation.",
  },
  {
    q: "Can I upgrade or cancel anytime?",
    a: "Absolutely. Plans are month-to-month, you can upgrade, downgrade or cancel whenever you like.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Frequently asked questions
        </p>
        <h2 className="mx-auto mt-4 text-balance text-center font-display text-[clamp(32px,5vw,60px)] font-semibold leading-[1.05] tracking-[-0.05em] text-ink">
          Everything you need to know before getting started.
        </h2>

        <div className="mt-12 divide-y divide-line rounded-3xl border border-line bg-canvas">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-base font-semibold text-ink">
                    {f.q}
                  </span>
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
                    <p className="px-6 pb-6 text-sm leading-relaxed text-muted">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          Still have questions?{" "}
          <a href="/book" className="font-semibold text-accent hover:underline">
            Talk to our team
          </a>
        </p>
      </div>
    </section>
  );
}