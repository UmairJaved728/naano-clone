import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Privacy Policy — Naano",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p className="text-muted">
        This Privacy Policy explains what data Naano (the B2B LinkedIn creator marketplace)
        collects when you use our product and website, and how we use it.
      </p>
      <h2 className="mt-8 font-display text-xl font-bold text-ink">1. What we collect</h2>
      <p>
        Account data (name, email, company or LinkedIn profile), the content you approve and
        publish through campaigns, attribution events (clicks, leads, signups) tied to your
        tracking links, and standard technical data such as IP address and device type.
      </p>
      <h2 className="mt-8 font-display text-xl font-bold text-ink">2. How we use it</h2>
      <p>
        To operate the marketplace: match creators to briefs, run campaigns, attribute results,
        facilitate payments (via Stripe Connect), prevent abuse and comply with our legal
        obligations. We do not sell your personal data.
      </p>
      <h2 className="mt-8 font-display text-xl font-bold text-ink">3. Payments</h2>
      <p>
        Payment processing is handled by Stripe. We never store full card numbers. Payout data
        (bank account or payment details) is held by Stripe under their policies, linked to your
        Creator or Company account only as needed.
      </p>
      <h2 className="mt-8 font-display text-xl font-bold text-ink">4. Third parties</h2>
      <p>
        We use hosting (Vercel), analytics and email providers. Each provider processes data
        under its own privacy policy. Attribution requires placing a tracking pixel on your
        landing pages; that pixel is first-party to Naano.
      </p>
      <h2 className="mt-8 font-display text-xl font-bold text-ink">5. Your rights</h2>
      <p>
        You can access, correct or delete your data, export it, or object to processing by
        contacting info@naano.com. EU residents have rights under the GDPR.
      </p>
      <h2 className="mt-8 font-display text-xl font-bold text-ink">6. Retention & security</h2>
      <p>
        We retain data while your account is active and delete it within 90 days of closure
        unless required otherwise by law. Transmission is encrypted in transit and at rest.
      </p>
      <p className="text-muted">Last updated: 2026-09-12</p>
    </LegalPage>
  );
}