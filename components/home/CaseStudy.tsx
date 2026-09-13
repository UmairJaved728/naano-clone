import Avatar from "@/components/Avatar";

const brandLogos = [
  "/lp/logo-blogseo.png",
  "/lp/logo-lemlist.png",
  "/lp/logo-folk.png",
  "/lp/logo-leadbay.png",
  "/lp/logo-ringover.png",
  "/lp/logo-attio.jpg",
  "/lp/logo-lagrowthmachine.png",
  "/lp/logo-gojiberry.png",
  "/lp/logo-chatseo.png",
  "/lp/logo-abyssale.png",
];

export default function CaseStudy() {
  return (
    <section className="bg-[#fbfdfe] px-[84px] pb-[150px] pt-[118px]">
      <h2 className="mx-auto w-[1241px] max-w-full text-center font-display text-[51.84px] font-semibold leading-[53.4px] tracking-[-2.33px] text-[#111318]">
        Real teams. Measurable pipeline.
      </h2>
      <p className="mx-auto mt-[16px] w-[1241px] max-w-full text-center text-[19px] text-[#55575e]">
        See how B2B teams turn creator trust into attributable demand with
        Naano.
      </p>

      <div className="mx-auto mt-[56px] flex w-[1256px] max-w-full justify-center">
        <div className="flex flex-col rounded-[28px] border border-[#bed3dd] bg-white p-[30px] shadow-[0_28px_70px_-55px_rgba(45,87,110,0.45)]">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-[#1652f0] px-[12px] py-[5px] text-[11px] font-bold tracking-[0.05em] text-white">
              VIDEO TESTIMONIAL
            </span>
            <span className="rounded-full border border-[#dfe7eb] bg-white px-[10px] py-[4px] text-[12px] font-semibold text-[#55575e]">
              2:40
            </span>
          </div>
          <p className="mt-[34px] w-[440px] text-balance font-display text-[26px] font-semibold leading-[1.35] tracking-[-0.02em] text-[#111318]">
            “Naano became one of our fastest acquisition channels. We know
            exactly what every creator brings.”
          </p>
          <div className="mt-auto flex items-center gap-[12px] pt-[28px]">
            <Avatar name="Vincent Josse" color="from-blue-600 to-indigo-700" className="size-[44px] rounded-full" />
            <div>
              <p className="text-[15.5px] font-bold text-[#17181c]">Vincent Josse</p>
              <p className="text-[13px] text-[#69717a]">CEO &amp; Founder, BlogSEO</p>
            </div>
          </div>
        </div>

        <div className="ml-[-16px] flex w-[620px] flex-col rounded-[28px] border border-[#bed3dd] bg-white p-[36px_40px_36px_68px] shadow-[0_28px_70px_-55px_rgba(45,87,110,0.45)]">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-bold tracking-[0.12em] text-[#111318]">CASE STUDY</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/lp/logo-blogseo.png" alt="BlogSEO" className="h-[24px] object-contain" />
          </div>
          <h3 className="mt-[26px] text-balance font-display text-[34px] font-semibold leading-[1.1] tracking-[-1px] text-[#111318]">
            How BlogSEO turned creator content into product signups
          </h3>
          <p className="mt-[14px] text-[16px] leading-[24px] text-[#55575e]">
            BlogSEO briefed SEO &amp; SaaS creators on LinkedIn and X, then traced
            every trial back to the post that drove it — all in Naano.
          </p>
          <div className="mt-auto grid grid-cols-3 gap-[24px] border-t border-[#eceae6] pt-[22px]">
            {[
              ["9", "creators activated"],
              ["2,940", "qualified clicks"],
              ["512", "trials started"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="font-display text-[32px] font-bold tracking-[-1px] text-[#111318]">{v}</p>
                <p className="mt-[4px] text-[12.5px] text-[#69717a]">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-[56px] flex items-center justify-center gap-10">
        {brandLogos.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={src} alt="" className={`h-[26px] w-auto object-contain ${i > 0 ? "opacity-45" : ""}`} />
        ))}
        <span className="whitespace-nowrap text-[16px] font-bold text-[#111318]">+30</span>
      </div>
    </section>
  );
}