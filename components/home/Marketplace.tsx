const avatars = [
  "/lp/avatar-a.png",
  "/lp/avatar-d.png",
  "/lp/avatar-g.png",
  "/lp/avatar-b.png",
  "/lp/avatar-e.png",
];

const flags = ["🇺🇸", "🇬🇧", "🇩🇪", "🇫🇷", "🇸🇬", "🇳🇱", "🇪🇸", "🇮🇹", "🇺🇦", "🇨🇦", "🇦🇺", "🇧🇷"];

export default function Marketplace() {
  return (
    <section className="bg-canvas px-[72px] pb-[144px] pt-[115.2px]">
      <header className="mx-auto w-[747px] max-w-full text-center">
        <div className="inline-flex items-center gap-[9px] rounded-full border border-[#111318] bg-white px-[14px] py-[7px] shadow-[0_8px_30px_0_rgba(68,111,133,0.07)]">
          <span className="block size-[7px] rounded-full bg-[#76badd] shadow-[0_0_0_4px_rgba(118,186,221,0.13)]" />
          <span className="text-[13px] font-[650] tracking-[0.26px] text-[#555b63]">
            The Naano creator marketplace
          </span>
        </div>

        <h2 className="mx-auto mt-[25px] max-w-[713px] font-display text-[clamp(44px,5.8vw,74.88px)] font-semibold leading-[1.0] tracking-[-0.052em] text-[#111318]">
          Work with all the best creators.
        </h2>

        <p className="mx-auto mt-[18px] max-w-[551px] text-balance text-[20.88px] leading-[31.74px] text-[#525861]">
          Find the right B2B voices, compare their audience fit, and book every
          collaboration from one place.
        </p>
      </header>

      <div className="relative mx-auto mt-[86.4px] max-w-[1171px]">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-[84px] left-1/2 z-0 -translate-x-1/2 opacity-90"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/lp/marketplace-atmosphere-v1.png" alt="" className="w-[880px] max-w-none" />
        </div>

        <div className="relative z-10 rounded-[43.2px] border border-[#8bbdd7] bg-gradient-to-b from-[#dff3fc] via-[#edf9fe] to-white p-[74.88px_54px_20px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_42px_80px_-40px_rgba(69,119,145,0.45)]">
          <div className="overflow-hidden rounded-[25px] border border-[#111318] bg-white shadow-[inset_0_2px_0_0_rgba(255,255,255,0.9),0_30px_60px_-30px_rgba(25,58,76,0.5)]">
            <div className="grid h-[45px] grid-cols-3 items-center border-b border-[#e9edf0] bg-[#fafcfd] px-[23px]">
              <div className="flex items-center gap-[6px]">
                <span className="size-[9px] rounded-full bg-[#f0716c]" />
                <span className="size-[9px] rounded-full bg-[#eab566]" />
                <span className="size-[9px] rounded-full bg-[#5fbf7d]" />
              </div>
              <div className="mx-auto flex h-[25px] w-[355px] max-w-full items-center justify-center gap-[7px] rounded-[9px] border border-[#e6eaed] bg-white px-[14px]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#76808a" strokeWidth="2" aria-hidden>
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="whitespace-nowrap text-[12px] font-[550] leading-none text-[#76808a]">
                  naano.co/marketplace
                </span>
              </div>
              <div />
            </div>
            <div className="bg-[#f5f7fa]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/lp/marketplace-screenshot-clean-v2.png"
                alt="Naano marketplace"
                className="block w-full"
              />
            </div>
          </div>
        </div>

        <div className="relative z-20 mx-auto mt-[28px] grid w-[1086px] max-w-full grid-cols-3 gap-[20px]">
          <article className="rounded-[26px] border border-[#adcdde] bg-white p-[26px_28px_28px] shadow-[0_26px_64px_-48px_rgba(43,84,106,0.42),rgba(255,255,255,0.9)_0_1px_0_0_inset]">
            <div className="flex items-center">
              {avatars.map((a, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={a}
                  src={a}
                  alt=""
                  className={`size-11 rounded-full object-cover ${i > 0 ? "-ml-3" : ""}`}
                  style={{ zIndex: avatars.length - i }}
                />
              ))}
            </div>
            <div className="mt-[30px]">
              <p className="text-[19px] font-bold tracking-[-0.025em] text-[#111318]">
                3,000+ vetted creators
              </p>
              <p className="mt-[3px] text-[13.5px] leading-[19.575px] text-[#69717a]">
                Specialist B2B voices, ready to collaborate.
              </p>
            </div>
          </article>

          <article className="rounded-[26px] border border-[#adcdde] bg-white p-[26px_28px_28px] shadow-[0_26px_64px_-48px_rgba(43,84,106,0.42),rgba(255,255,255,0.9)_0_1px_0_0_inset]">
            <div className="grid grid-cols-6 gap-[10px]">
              {flags.map((f) => (
                <span key={f} className="text-[26px] leading-none grayscale-[0.2]">
                  {f}
                </span>
              ))}
            </div>
            <div className="mt-[30px]">
              <p className="text-[19px] font-bold tracking-[-0.025em] text-[#111318]">
                Across 100 countries
              </p>
              <p className="mt-[3px] text-[13.5px] leading-[19.575px] text-[#69717a]">
                Local expertise with genuinely global reach.
              </p>
            </div>
          </article>

          <article className="rounded-[26px] border border-[#adcdde] bg-white p-[26px_28px_28px] shadow-[0_26px_64px_-48px_rgba(43,84,106,0.42),rgba(255,255,255,0.9)_0_1px_0_0_inset]">
            <div className="grid grid-cols-3 items-start gap-[4px]">
              <div className="flex flex-col items-center gap-[7px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/lp/avatar-a.png" alt="" className="size-[52px] rounded-full object-cover" />
                <span className="text-center text-[9px] font-bold leading-tight text-[#66737c]">
                  AI &amp; SaaS creator
                </span>
              </div>
              <div className="grid size-[46px] place-items-center rounded-full bg-[#e9f7fd] text-[15px] font-extrabold text-[#315b7c]">
                96%
              </div>
              <div className="flex flex-col items-center gap-[5px]">
                {["Founders", "Sales leaders", "GTM teams"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white px-[8px] py-[5px] text-[9px] font-[750] text-[#56666f] shadow-[0_1px_2px_rgba(23,24,28,0.08)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-[30px]">
              <p className="text-[19px] font-bold tracking-[-0.025em] text-[#111318]">
                Matched to your buyers
              </p>
              <p className="mt-[3px] text-[13.5px] leading-[19.575px] text-[#69717a]">
                Audience fit comes before follower count.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}