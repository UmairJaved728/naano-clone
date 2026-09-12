import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  const cols: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/#how-it-works" },
        { label: "Pricing", href: "/#pricing" },
        { label: "FAQs", href: "/#faq" },
        { label: "Blog", href: "/blog" },
        { label: "Reports & benchmarks", href: "/reports" },
        { label: "About", href: "/about" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Privacy", href: "/privacy" },
        { label: "Terms of Sale & Use", href: "/terms" },
      ],
    },
    {
      title: "For AI agents",
      links: [
        { label: "llms.txt", href: "/llms.txt" },
        { label: "pricing.md", href: "/pricing.md" },
        { label: "Reports & data", href: "/reports" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "LinkedIn creator marketplace", href: "/linkedin-creator-marketplace" },
        { label: "B2B influencer marketing cost", href: "/blog/b2b-influencer-marketing-cost" },
        { label: "Launch a LinkedIn creator campaign", href: "/blog/launch-b2b-linkedin-creator-campaign" },
        { label: "How to pay B2B creators", href: "/blog/how-to-pay-b2b-creators" },
        { label: "Creator-led growth for B2B", href: "/blog/creator-led-growth-b2b" },
      ],
    },
  ];

  return (
    <footer className="border-t border-line bg-canvas">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-20">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Turn LinkedIn creators into your best acquisition channel.
            </p>
            <a
              href="https://www.linkedin.com/company/naanooo/"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-grid size-9 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-black/5"
              aria-label="Naano on LinkedIn"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45z" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-4">
            {cols.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-ink/40">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-ink/70 transition-colors hover:text-ink"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center">
          <p>© 2026 naano. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a
              href="https://fr.trustpilot.com/review/www.naano.xyz"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-ink"
            >
              <span className="text-amber-500">★★★★★</span>
              Trustpilot reviews
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}