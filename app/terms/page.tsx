import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Terms of Sale & Use — Naano",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Sale & Use">
      <p className="text-muted">
        These terms govern your use of naano.com and the Naano marketplace. By creating an
        account you agree to them.
      </p>
      <h2 className="mt-8 font-display text-xl font-bold text-ink">1. The marketplace</h2>
      <p>
        Naano connects brands with creators for sponsored content on LinkedIn, X and YouTube.
        Brands book creators at the fixed price each creator sets. A booking is a commitment to
        pay for a published post that meets the agreed brief.
      </p>
      <h2 className="mt-8 font-display text-xl font-bold text-ink">2. Roles & responsibilities</h2>
      <p>
        Brands are responsible for approving content and for the accuracy of their briefs.
        Creators are responsible for the content they publish and for complying with platform
        rules (including disclosure of paid partnerships). Naano acts as facilitator and payment
        intermediary, not as either party's agent in the content itself.
      </p>
      <h2 className="mt-8 font-display text-xl font-bold text-ink">3. Pricing & payments</h2>
      <p>
        Creator prices are set by creators and shown before booking. Brands pay only for posts
        that go live. Naano facilitates collection via Stripe Connect and distributes creator
        payouts. Fees: Self-Serve is €0/month; Managed Campaigns is €700/month. Plans are
        month-to-month. No lock-in, cancel anytime.
      </p>
      <h2 className="mt-8 font-display text-xl font-bold text-ink">4. Attribution</h2>
      <p>
        Campaigns may include a Naano tracking pixel or link. You agree to keep tracking links
        intact on sponsored posts so results can be attributed accurately.
      </p>
      <h2 className="mt-8 font-display text-xl font-bold text-ink">5. Acceptable use</h2>
      <p>
        You may not scrape the marketplace, create false reviews, use fraudulent payment
        instruments, publish misleading disclosures, or use the platform for illegal activity.
        We may suspend accounts that violate these rules.
      </p>
      <h2 className="mt-8 font-display text-xl font-bold text-ink">6. Liability</h2>
      <p>
        Naano is provided "as is". To the maximum extent permitted by law, Naano's liability is
        limited to the amounts paid by the brand in the prior twelve months. Nothing in these
        terms limits liability that cannot be limited by law.
      </p>
      <h2 className="mt-8 font-display text-xl font-bold text-ink">7. Changes</h2>
      <p>
        We may update these terms with notice. Continued use after changes constitutes
        acceptance. Contact terms@naano.com with questions.
      </p>
      <p className="text-muted">Last updated: 2026-09-12</p>
    </LegalPage>
  );
}