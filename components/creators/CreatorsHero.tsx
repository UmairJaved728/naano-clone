export default function CreatorsHero() {
  return (
    <section className="relative overflow-hidden bg-canvas">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 46% at 62% 4%, rgba(22,82,240,0.07) 0%, transparent 60%), radial-gradient(30% 28% at 10% 50%, rgba(22,82,240,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-20 text-center">
        <p className="mx-auto mb-7 inline-flex items-center gap-3 rounded-full border border-line bg-white px-4 py-1.5 text-xs font-medium text-ink/70">
          <span className="text-amber-500">★★★★★</span> 2,000+ creators paid ·
          4.8/5 on Trustpilot
        </p>

        <h1 className="mx-auto max-w-4xl text-balance font-display text-[clamp(44px,6vw,80px)] font-semibold leading-[1.04] tracking-[-0.04em] text-ink">
          Get paid to create
          <br />
          <span className="text-ink/45">B2B content.</span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-balance text-[19px] leading-relaxed text-[#43454c] sm:text-[21px] sm:leading-[1.55]">
          Brands hire creators through Naano for sponsored posts on LinkedIn
          and X. You set the price, approve the brief, publish, get paid.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/register?role=influencer"
            className="btn-primary px-7 py-3 text-[15px] font-semibold"
          >
            Start earning
          </a>
          <a
            href="/#how-it-works"
            className="btn-light px-7 py-3 text-[15px] font-semibold"
          >
            See how it works
          </a>
        </div>

        <p className="mt-6 text-sm text-ink-soft">
          Free to join · Paid within 24 hours of approval
        </p>
      </div>
    </section>
  );
}