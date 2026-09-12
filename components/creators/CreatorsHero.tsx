export default function CreatorsHero() {
  return (
    <section className="relative overflow-hidden bg-night text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 55% at 50% 0%, rgba(37,99,235,0.26) 0%, transparent 62%), radial-gradient(35% 32% at 15% 45%, rgba(59,130,246,0.15) 0%, transparent 60%), radial-gradient(40% 36% at 85% 60%, rgba(30,64,175,0.2) 0%, transparent 62%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(to top, rgba(252,252,251,1), transparent)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-20 text-center">
        <p className="mx-auto mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/75">
          <span className="text-amber-400">★★★★★</span> 2,000+ creators paid ·
          4.8/5 on Trustpilot
        </p>

        <h1 className="mx-auto max-w-3xl text-balance font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          Get paid to create
          <br />
          <span className="text-white/45">B2B content.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-white/60 sm:text-lg">
          Brands hire creators through Naano for sponsored posts on LinkedIn
          and X. You set the price, approve the brief, publish, get paid.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/register?role=influencer"
            className="btn-blue px-7 py-3.5 text-[15px] font-semibold"
          >
            Start earning
          </a>
          <a
            href="/#how-it-works"
            className="btn border border-white/20 bg-white/5 px-7 py-3.5 text-[15px] font-medium text-white backdrop-blur transition hover:bg-white/10"
          >
            See how it works
          </a>
        </div>

        <p className="mt-6 text-sm text-white/45">
          Free to join · Paid within 24 hours of approval
        </p>
      </div>
    </section>
  );
}