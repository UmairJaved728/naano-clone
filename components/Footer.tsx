import Link from "next/link";

const productLinks = [
  { label: "Features", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQs", href: "/#faq" },
  { label: "Blog", href: "/blog" },
  { label: "Reports & benchmarks", href: "/reports" },
  { label: "About", href: "/about" },
];

const companyLinks = [
  { label: "Help Center", href: "/help" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms of Sale & Use", href: "/terms" },
  { label: "llms.txt", href: "/llms.txt" },
  { label: "pricing.md", href: "/pricing.md" },
  { label: "Reports & data", href: "/reports" },
];

const pressLinks = [
  { label: "Interview Thomas Marcelle, Xymag.tv", href: "/blog/xymag-tv" },
  { label: "Naano on FounderTrace", href: "/blog/foundertrace" },
  { label: "Naano on TechnicalBeep", href: "/blog/technicalbeep" },
];

const resourcesLinks = [
  { label: "LinkedIn creator marketplace", href: "/linkedin-creator-marketplace" },
  { label: "Best B2B influencer platforms 2026", href: "/blog/best-b2b-influencer-platforms" },
  { label: "B2B influencer marketing cost", href: "/blog/b2b-influencer-marketing-cost" },
  { label: "Launch a LinkedIn creator campaign", href: "/blog/launch-b2b-linkedin-creator-campaign" },
  { label: "LinkedIn Creator Marketplace in Europe", href: "/blog/linkedin-creator-marketplace-europe" },
  { label: "How to pay B2B creators", href: "/blog/how-to-pay-b2b-creators" },
  { label: "Creator Marketplace explained", href: "/blog/creator-marketplace-explained" },
  { label: "What is a B2B creator marketplace?", href: "/blog/what-is-b2b-creator-marketplace" },
  { label: "Creator-led growth for B2B", href: "/blog/creator-led-growth-b2b" },
  { label: "LinkedIn Ads vs creator-led CPL", href: "/blog/linkedin-ads-vs-creator-cpl" },
  { label: "Nano vs macro creators in B2B", href: "/blog/nano-vs-macro-creators" },
  { label: "B2B influence on LinkedIn", href: "/blog/b2b-influence-linkedin" },
  { label: "Founder-led distribution for SaaS", href: "/blog/founder-led-distribution" },
  { label: "Naano vs alternatives", href: "/blog/naano-vs-alternatives" },
  { label: "Trustpilot reviews", href: "https://fr.trustpilot.com/review/www.naano.xyz" },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#e9f7fc] via-[#edf9fd] to-white px-[72px] pt-[290px] shadow-[0_-54px_96px_44px_rgba(233,247,252,0.96)]">
      <div className="grid grid-cols-[223px_126px_146px_166px_1fr] gap-[43.2px] pb-[46px] pt-[34px]">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/lp/naano-logo-nav.png" alt="Naano" width={123} height={26} className="block" />
          <p className="mt-[16px] text-[13.5px] leading-[20px] text-[#55575e]">
            Turn LinkedIn creators into your best acquisition channel.
          </p>
          <a
            href="https://www.linkedin.com/company/naanooo/"
            target="_blank"
            rel="noreferrer"
            aria-label="Naano on LinkedIn"
            className="mt-[18px] inline-grid size-[34px] place-items-center rounded-full border border-[#b2ccd9] text-[#111318] transition-colors hover:bg-white"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45z" />
            </svg>
          </a>
        </div>

        <div>
          <h4 className="text-[11px] font-bold tracking-[1.2px] text-[#111318]/60">PRODUCT</h4>
          <ul className="mt-[14px] space-y-[10px]">
            {productLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-[13.5px] text-[#111318]/75 transition-colors hover:text-[#111318]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] font-bold tracking-[1.2px] text-[#111318]/60">COMPANY</h4>
          <ul className="mt-[14px] space-y-[10px]">
            {companyLinks.slice(0, 3).map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-[13.5px] text-[#111318]/75 transition-colors hover:text-[#111318]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <h4 className="mt-[18px] text-[11px] font-bold tracking-[1.2px] text-[#111318]/60">FOR AI AGENTS</h4>
          <ul className="mt-[14px] space-y-[10px]">
            {companyLinks.slice(3).map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-[13.5px] text-[#111318]/75 transition-colors hover:text-[#111318]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] font-bold tracking-[1.2px] text-[#111318]/60">PRESS</h4>
          <ul className="mt-[14px] space-y-[10px]">
            {pressLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-[13.5px] text-[#111318]/75 transition-colors hover:text-[#111318]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] font-bold tracking-[1.2px] text-[#111318]/60">RESOURCES</h4>
          <ul className="mt-[14px] grid grid-cols-2 gap-x-[28px] gap-y-[10px]">
            {resourcesLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-[13.5px] text-[#111318]/75 transition-colors hover:text-[#111318]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[#bbd3df] py-[22px] text-[12.5px] text-[#111318]/60">
        <p>© 2026 naano. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <a
            href="https://fr.trustpilot.com/review/www.naano.xyz"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-[#111318]"
          >
            <span className="text-amber-500">★★★★★</span>
            Trustpilot reviews
          </a>
          <a href="/en" className="flex items-center gap-1.5 transition-colors hover:text-[#111318]">
            EN
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}