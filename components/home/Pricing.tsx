import Link from "next/link";

const selfServeFeatures = [
  "Creator marketplace access",
  "AI-powered brief creation",
  "Track clicks, companies and pipeline",
  "Automatic creator payouts",
];

const managedFeatures = [
  "Campaign strategy and positioning",
  "Creator sourcing and coordination",
  "Brief creation and campaign launch",
  "Reporting and optimisation",
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-[#fcfcfb] px-[84px] pb-[160px] pt-[72px]">
      <h2 className="text-center font-display text-[51.84px] font-semibold leading-[53.4px] tracking-[-2.33px] text-[#111318]">
        Pricing.
      </h2>
      <p className="mt-[26px] text-center text-[21px] font-semibold tracking-[-0.315px] text-[#17181c]">
        Start free. Upgrade when you want your time back.
      </p>

      <div className="mx-auto mt-[54px] grid max-w-[1162px] grid-cols-2 justify-center gap-[42px]">
        <div className="flex flex-col rounded-[28px] border border-[#b2ccd9] bg-white p-[46px_48px_42px] shadow-[0_30px_72px_-50px_rgba(45,87,110,0.42)]">
          <p className="text-[12px] font-bold tracking-[1.68px] text-[#9b9da3]">SELF-SERVE</p>
          <h3 className="mt-[20px] text-[34px] font-extrabold leading-[39.1px] tracking-[-0.85px] text-[#17181c]">
            Run it yourself.
          </h3>
          <p className="mt-[12px] text-[15.5px] text-[#55575e]">
            For teams that want the infrastructure to run creator campaigns
            in-house.
          </p>
          <div className="mt-[34px] flex items-baseline gap-[8px]">
            <span className="font-display text-[44px] font-bold tracking-[-1px] text-[#111318]">€0</span>
            <span className="text-[15.5px] text-[#55575e]">/ month</span>
          </div>
          <div className="mt-[12px] flex flex-col">
            {selfServeFeatures.map((f) => (
              <div
                key={f}
                className="flex items-center gap-[10px] border-t border-[#eceae6] py-[18px] text-[15.5px] leading-[21.7px] text-[#26272c]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1652f0" strokeWidth="2.4" className="shrink-0" aria-hidden>
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {f}
              </div>
            ))}
          </div>
          <Link
            href="/register"
            className="mt-[44px] inline-flex items-center gap-[9px] self-start pb-[3px] text-[16px] font-bold leading-none tracking-[-0.16px] text-[#17181c] transition-colors hover:text-black"
            style={{ boxShadow: "0 1px 0 0 #17181c" }}
          >
            Start for free
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="flex flex-col rounded-[28px] border border-[#b2ccd9] bg-white p-[46px_48px_42px] shadow-[0_30px_72px_-50px_rgba(45,87,110,0.42)]">
          <p className="text-[12px] font-bold tracking-[1.68px] text-[#9b9da3]">
            MANAGED CAMPAIGNS
          </p>
          <h3 className="mt-[20px] text-[34px] font-extrabold leading-[39.1px] tracking-[-0.85px] text-[#17181c]">
            Get your time back.
          </h3>
          <p className="mt-[12px] text-[15.5px] text-[#55575e]">
            For teams that want Naano to operate their creator channel end to
            end.
          </p>
          <div className="mt-[34px] flex items-baseline gap-[8px]">
            <span className="font-display text-[36px] font-bold tracking-[-1px] text-[#111318]">
              Custom
            </span>
            <span className="text-[15.5px] text-[#55575e]">quote</span>
          </div>
          <div className="mt-[12px] flex flex-col">
            {managedFeatures.map((f) => (
              <div
                key={f}
                className="flex items-center gap-[10px] border-t border-[#eceae6] py-[18px] text-[15.5px] leading-[21.7px] text-[#26272c]"
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
            className="mt-[44px] inline-flex items-center justify-center gap-[10px] self-start rounded-[12px] bg-ink px-[28px] py-[17px] text-[16px] font-semibold leading-none tracking-[-0.16px] text-white transition-colors hover:bg-black"
          >
            Book a campaign call
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </Link>
        </div>
      </div>

      <p className="mt-[40px] text-center text-[14px] text-[#9b9da3]">
        Campaign spend is separate. No lock-in. Cancel anytime.
      </p>
    </section>
  );
}