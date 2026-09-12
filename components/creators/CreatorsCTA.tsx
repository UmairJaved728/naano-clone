export default function CreatorsCTA() {
  return (
    <section className="bg-canvas pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-night px-10 py-14 text-center text-white sm:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(55% 60% at 50% 0%, rgba(22,82,240,0.4) 0%, transparent 62%)",
            }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-balance font-display text-[clamp(30px,4vw,44px)] font-semibold leading-[1.1] tracking-[-0.03em]">
              Your next paid post is one brief away.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/60">
              Set your price, review brand briefs, publish and get paid within
              24 hours.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="/register?role=influencer" className="btn-blue px-8 py-3.5 text-[15px] font-semibold">
                Create your creator profile
              </a>
              <a href="/#how-it-works" className="btn border border-white/20 bg-white/5 px-8 py-3.5 text-[15px] font-medium text-white backdrop-blur transition hover:bg-white/10">
                See a sample media kit
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}