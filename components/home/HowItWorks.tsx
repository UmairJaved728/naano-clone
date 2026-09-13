export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-gradient-to-b from-[#f2faff] via-white to-white px-[84px] pb-[126px] pt-[110px]"
    >
      <header className="grid grid-cols-[1fr_340px] gap-[80px]">
        <div>
          <div className="flex items-center gap-[10px]">
            <span className="block size-[9px] rounded-full bg-[#315b7c]" />
            <p className="text-[12px] font-[750] tracking-[1.8px] text-[#60727c]">
              ONE PLATFORM, FROM BRIEF TO RESULTS
            </p>
          </div>
          <h2 className="mt-[18px] max-w-[640px] font-display text-[51.84px] font-semibold leading-[53.4px] tracking-[-2.33px] text-[#111318]">
            Run creator campaigns from one place.
          </h2>
        </div>
        <p className="mt-[20px] self-start text-[19px] leading-[28.5px] text-[#55575e]">
          Find the right voices, launch faster, and connect every post to
          measurable business results.
        </p>
      </header>

      <div className="mt-[60px] grid grid-cols-5 gap-[24px]">
        {/* 01 */}
        <article className="flex flex-col rounded-[24px] bg-white p-[18px_18px_22px] shadow-[0_22px_58px_-44px_rgba(56,96,128,0.38)]">
          <span className="grid h-[24px] w-[31px] place-items-center self-start rounded-full border border-[#8fbbd1] bg-[#f4fbfe] text-[10px] font-extrabold tracking-[0.8px] text-[#54778a]">
            01
          </span>
          <div className="mt-[18px] space-y-[6px] rounded-[20px] border border-[#e9f3f8] bg-[#f6fbfd] p-[16px]">
            {[["Eric", "92%"], ["Robin", "88%"], ["Aya", "84%"]].map(([n, f]) => (
              <div key={n} className="flex items-center justify-between px-[4px] py-[3px]">
                <div className="flex items-center gap-[7px]">
                  <span className="grid size-[22px] place-items-center rounded-full bg-[#d7e7f0] text-[8px] font-bold text-[#42617a]">
                    {n[0]}
                  </span>
                  <span className="text-[11.5px] font-bold text-[#17181c]">{n}</span>
                </div>
                <span className="text-[9px] text-[#8390a2]">
                  <b className="font-bold text-[#315b7c]">{f}</b> Fit
                </span>
              </div>
            ))}
          </div>
          <h3 className="mt-[16px] px-[4px] text-[17px] font-[650] leading-[19px] tracking-[-0.34px] text-[#111318]">
            Find creators your buyers trust
          </h3>
        </article>

        {/* 02 */}
        <article className="flex flex-col rounded-[24px] bg-white p-[18px_18px_22px] shadow-[0_22px_58px_-44px_rgba(56,96,128,0.38)]">
          <div className="flex items-center justify-between self-stretch">
            <span className="grid w-[31px] place-items-center rounded-full border border-[#8fbbd1] bg-[#f4fbfe] text-[10px] font-extrabold tracking-[0.8px] text-[#54778a]">
              02
            </span>
            <span className="flex items-center gap-[4px] self-start">
              <span className="text-[12px] font-bold text-[#17181c]">Campaign brief</span>
              <span className="rounded-full bg-[#dceffa] px-[8px] py-[4px] text-[9.5px] font-bold text-[#315b7c]">
                AI
              </span>
            </span>
          </div>
          <div className="mt-[18px] space-y-[10px] rounded-[20px] border border-[#e9f3f8] bg-[#f6fbfd] p-[16px]">
            {["Objectives and key messages", "Creator guidelines", "Tracking links ready"].map((t) => (
              <div key={t} className="flex items-center gap-[8px]">
                <span className="grid size-[15px] place-items-center rounded-full bg-[#dceffa] text-[9px] text-[#315b7c]">
                  ✓
                </span>
                <span className="text-[16px] text-[#111318]">{t}</span>
              </div>
            ))}
          </div>
          <h3 className="mt-[16px] px-[4px] text-[17px] font-[650] leading-[19px] tracking-[-0.34px] text-[#111318]">
            Build a campaign brief in minutes
          </h3>
        </article>

        {/* 03 */}
        <article className="flex flex-col rounded-[24px] bg-white p-[18px_18px_22px] shadow-[0_22px_58px_-44px_rgba(56,96,128,0.38)]">
          <span className="grid h-[24px] w-[31px] place-items-center self-start rounded-full border border-[#8fbbd1] bg-[#f4fbfe] text-[10px] font-extrabold tracking-[0.8px] text-[#54778a]">
            03
          </span>
          <div className="mt-[18px] space-y-[6px] rounded-[20px] border border-[#e9f3f8] bg-[#f6fbfd] p-[16px]">
            {[
              ["Raphael", "Draft ready"],
              ["Thomas", "Scheduled"],
              ["Nada", "Live"],
            ].map(([n, s]) => (
              <div key={n} className="flex items-center justify-between px-[4px] py-[3px]">
                <span className="text-[11.5px] font-bold text-[#17181c]">{n}</span>
                <span className="rounded-[6px] bg-[#dceffa] px-[7px] py-[4px] text-[9.5px] font-bold text-[#315b7c]">
                  {s}
                </span>
              </div>
            ))}
          </div>
          <h3 className="mt-[16px] px-[4px] text-[17px] font-[650] leading-[19px] tracking-[-0.34px] text-[#111318]">
            Manage every collaboration
          </h3>
        </article>

        {/* 04 */}
        <article className="flex flex-col rounded-[24px] bg-white p-[18px_18px_22px] shadow-[0_22px_58px_-44px_rgba(56,96,128,0.38)]">
          <div className="flex items-center justify-between self-stretch">
            <span className="grid w-[31px] place-items-center rounded-full border border-[#8fbbd1] bg-[#f4fbfe] text-[10px] font-extrabold tracking-[0.8px] text-[#54778a]">
              04
            </span>
            <span className="rounded-[6px] bg-[#dceffa] px-[7px] py-[5px] text-[10px] font-bold text-[#315b7c]">
              +24%
            </span>
          </div>
          <div className="mt-[18px] flex flex-col rounded-[20px] border border-[#e9f3f8] bg-[#f6fbfd] p-[16px]">
            <div className="flex items-end gap-[4px] px-[4px]">
              {[7, 16, 10, 22, 28].map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}px` }}
                  className={`w-[5px] rounded-[3px] ${i >= 3 ? "bg-[#315b7c]" : "bg-[#dceffa]"}`}
                />
              ))}
              <span className="mb-[-16px] ml-[8px] text-[10px] text-[#8a8c92]">124K views</span>
              <span className="ml-[6px] text-[10px] text-[#8a8c92]">418 leads</span>
            </div>
          </div>
          <h3 className="mt-[16px] px-[4px] text-[17px] font-[650] leading-[19px] tracking-[-0.34px] text-[#111318]">
            Track reach, clicks, and leads
          </h3>
        </article>

        {/* 05 */}
        <article className="flex flex-col rounded-[24px] bg-white p-[18px_18px_22px] shadow-[0_22px_58px_-44px_rgba(56,96,128,0.38)]">
          <span className="grid h-[24px] w-[31px] place-items-center self-start rounded-full border border-[#8fbbd1] bg-[#f4fbfe] text-[10px] font-extrabold tracking-[0.8px] text-[#54778a]">
            05
          </span>
          <div className="mt-[18px] rounded-[20px] border border-[#e9f3f8] bg-[#f6fbfd] p-[16px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[8px]">
                <span className="grid size-[23px] place-items-center rounded-full bg-[#dceffa] text-[10px] text-[#315b7c]">
                  €
                </span>
                <div>
                  <p className="text-[9.5px] text-[#8a8c92]">Payment scheduled</p>
                  <p className="text-[12px] font-bold text-[#111318]">Creator payout · €1,240</p>
                </div>
              </div>
              <span className="rounded-[6px] bg-[#e0f4eb] px-[7px] py-[4px] text-[8.5px] font-bold text-[#2a7a54]">
                Handled by Naano
              </span>
            </div>
            <div className="mt-[12px] flex gap-[6px]">
              {["Contract", "Invoice", "Payout"].map((t) => (
                <span
                  key={t}
                  className="rounded-[6px] bg-[#f4f2ee] px-[7px] py-[5px] text-[9.5px] text-[#8a8c92]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <h3 className="mt-[16px] px-[4px] text-[17px] font-[650] leading-[19px] tracking-[-0.34px] text-[#111318]">
            Pay creators without the admin
          </h3>
        </article>
      </div>
    </section>
  );
}