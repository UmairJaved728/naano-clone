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
    q: "What's the difference between Free and Done for you?",
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
    <section id="faq" className="bg-white px-[84px] pb-[144px] pt-[130px]">
      <div className="mx-auto grid max-w-[1176px] grid-cols-[355px_1fr] gap-[80px]">
        <div className="sticky top-[120px] self-start">
          <h2 className="font-display text-[51.84px] font-semibold leading-[53.4px] tracking-[-2.33px] text-[#111318]">
            Frequently asked questions.
          </h2>
          <p className="mt-[16px] text-[19px] leading-[28.5px] text-[#55575e]">
            Everything you need to know before getting started.
          </p>
          <p className="mt-[28px] text-[16px] text-[#55575e]">
            Still have questions?{" "}
            <a href="/book" className="font-semibold text-[#111318] underline decoration-[#111318]/40 underline-offset-4 hover:decoration-[#111318]">
              Talk to our team
            </a>
          </p>
        </div>

        <div>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-t border-[#dfe7eb] last:border-b last:border-[#dfe7eb]">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-[28px] text-left"
                >
                  <span className="text-[18px] font-semibold tracking-[-0.02em] text-[#111318]">
                    {f.q}
                  </span>
                  <span
                    className={`grid size-[26px] shrink-0 place-items-center rounded-full border border-[#dfe7eb] text-[#111318] transition-transform duration-200 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
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
                    <p className="max-w-[640px] pb-[28px] text-[15px] leading-relaxed text-[#55575e]">
                      {f.a}
                    </p>
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