import LandingLayout from "@/components/LandingLayout";

export const metadata = {
  title: "Help center — Naano",
  description: "Get in touch with the Naano team.",
};

export default function HelpPage() {
  return (
    <LandingLayout navLinks="home">
      <div className="mx-auto max-w-2xl px-6 pt-12 pb-24">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Help center</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink">
          How can we help?
        </h1>
        <p className="mt-3 text-lg text-muted">
          Most answers are in the{" "}
          <a href="/#faq" className="font-semibold text-accent hover:underline">FAQ</a>. For
          anything else, the team replies fast.
        </p>

        <div className="card mt-10 p-8">
          <h2 className="font-display text-lg font-bold text-ink">Contact us</h2>
          <div className="mt-5 space-y-4">
            <a href="mailto:info@naano.com" className="flex items-center gap-3 rounded-2xl border border-line p-4 transition-colors hover:border-ink/30">
              <span className="grid size-10 place-items-center rounded-full bg-accent/10 text-accent">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 6L2 7" />
                </svg>
              </span>
              <div>
                <p className="font-semibold text-ink">Email support</p>
                <p className="text-sm text-muted">info@naano.com — replies within 1 business day</p>
              </div>
            </a>
            <a href="https://www.linkedin.com/company/naanooo/" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-line p-4 transition-colors hover:border-ink/30">
              <span className="grid size-10 place-items-center rounded-full bg-accent/10 text-accent">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45z" />
                </svg>
              </span>
              <div>
                <p className="font-semibold text-ink">Company LinkedIn</p>
                <p className="text-sm text-muted">@naanooo — product updates and case studies</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}