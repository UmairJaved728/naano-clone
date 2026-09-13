import Link from "next/link";

const planItems = ["Creator strategy", "Campaign format", "Budget recommendation"];

export default function FinalCTA() {
  return (
    <section className="bg-gradient-to-b from-white via-[#e5f5fc] to-[#d8effa] px-[84px] pb-[170px] pt-[128px]">
      <div className="mx-auto w-[808px] max-w-full text-center">
        <p className="text-[12px] font-[750] tracking-[1.8px] text-[#60727c]">
          READY TO LAUNCH?
        </p>
        <h2 className="mt-[20px] text-balance font-display text-[57.6px] font-semibold leading-[59.33px] tracking-[-2.59px] text-[#111318]">
          Your next creator campaign starts here.
        </h2>
        <p className="mx-auto mt-[22px] max-w-[640px] text-[19px] leading-[28.5px] text-[#55575e]">
          Get a clear creator strategy, campaign format and estimated budget
          for your next launch.
        </p>
      </div>

      <div className="mx-auto mt-[52px] flex w-[534px] max-w-full flex-col rounded-[30px] border border-white bg-white p-[48px_48px_44px] shadow-[0_38px_90px_-56px_rgba(45,87,110,0.5),inset_0_1px_0_0_rgba(255,255,255,0.9)]">
        <p className="text-[12px] font-bold tracking-[1.68px] text-[#9b9da3]">
          CAMPAIGN STRATEGY CALL
        </p>
        <h3 className="mt-[18px] text-[26px] font-semibold tracking-[-0.5px] text-[#17181c]">
          30-minute working session
        </h3>
        <p className="mt-[10px] text-[15.5px] text-[#55575e]">
          Leave with a concrete plan for your next creator campaign.
        </p>
        <div className="mt-[22px] flex flex-col">
          {planItems.map((f) => (
            <div
              key={f}
              className="flex items-center gap-[10px] border-t border-[#eceae6] py-[16px] text-[15.5px] text-[#26272c]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1652f0" strokeWidth="2.4" className="shrink-0" aria-hidden>
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {f}
            </div>
          ))}
        </div>
        <Link
          href="/book"
          className="mt-[32px] inline-flex items-center justify-center gap-[10px] rounded-[12px] bg-ink px-[28px] py-[17px] text-[16px] font-semibold leading-none tracking-[-0.16px] text-white transition-colors hover:bg-black"
        >
          Book a campaign call
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </Link>
        <p className="mt-[16px] text-[13px] text-[#9b9da3]">
          Pick a time on the next page.
        </p>
        <p className="mt-[6px] text-[13px] text-[#9b9da3]">
          Prefer to start yourself?{" "}
          <Link href="/register" className="font-semibold text-[#111318] transition-colors hover:text-black">
            Start for free →
          </Link>
        </p>
      </div>

      <p className="mt-[40px] text-center text-[14px] tracking-[-0.07px] text-[#9b9da3]">
        Trusted by B2B teams building creator-led acquisition.
      </p>
    </section>
  );
}