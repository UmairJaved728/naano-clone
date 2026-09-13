import Link from "next/link";
import Avatar from "@/components/Avatar";
import { creators } from "@/lib/data";

const stats = [
  ["5M+", "Impressions generated"],
  ["30K+", "Leads generated"],
  ["2,000+", "Creators on Naano"],
  ["5K+", "Posts published"],
];

export default function Results() {
  const showcase = [creators[0], creators[1], creators[2], creators[3]];

  return (
    <section className="bg-gradient-to-b from-white via-[#f3faff] to-white px-[84px] pb-[72px] pt-[118px]">
      <div className="flex items-center justify-center gap-[10px]">
        <span className="block size-[9px] rounded-full bg-[#315b7c]" />
        <p className="text-[16px] text-[#111318]">THE RESULTS</p>
      </div>
      <h2 className="mx-auto mt-[24px] max-w-[926px] text-center font-display text-[51.84px] font-semibold leading-[53.4px] tracking-[-2.33px] text-[#111318]">
        Proven across thousands of campaigns.
      </h2>

      <div className="relative mx-auto mt-[42px] w-[1162px] max-w-full">
        <div className="overflow-hidden rounded-[34px] shadow-[0_54px_96px_-74px_rgba(46,86,108,0.6)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/lp/results-metrics-clouds-v2.png"
            alt=""
            aria-hidden
            className="h-[305px] w-full object-cover"
          />
        </div>
        <div className="relative z-10 mx-auto -mt-[100px] grid w-[1132px] max-w-full grid-cols-4 gap-[20px]">
          {stats.map(([num, label]) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-[22px] bg-white px-[14px] pb-[24px] pt-[26px] text-center shadow-[0_30px_60px_-42px_rgba(46,86,108,0.5),rgba(255,255,255,0.9)_0_1px_0_0_inset]"
            >
              <span className="font-display text-[54px] font-[660] leading-[54px] tracking-[-2.7px] text-[#111318]">
                {num}
              </span>
              <span className="mt-[11px] text-[13.5px] leading-[18.225px] text-[#697b86]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-[58px] grid max-w-[1253px] grid-cols-4 gap-[18px] px-[6px] pb-[28px] pt-[10px]">
        {showcase.map((c) => {
          const post = c.posts[0];
          return (
            <div
              key={c.id}
              className="flex min-h-[540px] flex-col overflow-hidden rounded-[26px] border border-[#aaccdd] bg-gradient-to-b from-[rgba(237,248,253,0.92)] to-white shadow-[0_28px_66px_-46px_rgba(44,83,106,0.42),rgba(255,255,255,0.9)_0_1px_0_0_inset]"
            >
              <div className="flex items-center gap-[12px] border-b border-[#aecfde] bg-gradient-to-b from-white/80 to-white/30 px-[20px] py-[20px_20px_16px_20px]">
                <Avatar name={c.name} color={c.color} className="size-[43px] rounded-full" />
                <div className="min-w-0">
                  <p className="truncate text-[15.5px] font-bold text-[#17181c]">{c.name}</p>
                  <p className="truncate text-[12.5px] text-[#9b9da3]">Creator · {c.headline}</p>
                </div>
              </div>
              <div className="flex flex-1 flex-col px-[20px] pt-[20px]">
                <p className="line-clamp-4 min-h-[96px] text-[15px] leading-[21px] text-[#17181c]/85">
                  {post.title}
                </p>
                <div className="mt-[14px]">
                  {[
                    [new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(post.impressions), "Impressions"],
                    [String(post.clicks), "Clicks"],
                    [String(post.leads), "Leads"],
                  ].map(([v, l]) => (
                    <div key={l as string} className="flex items-baseline gap-[10px] border-t border-[#e9f2f7] py-[9px]">
                      <span className="w-[56px] text-[17px] font-bold text-[#17181c]">{v}</span>
                      <span className="text-[12.5px] text-[#9b9da3]">{l}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-auto flex items-center justify-between border-t border-[#e9f2f7] px-[20px] pb-[24px] pt-[18px]">
                <span className="text-[12px] text-[#17181c]/60">
                  For <b className="font-semibold text-[#17181c]">{post.brand}</b>
                </span>
                <Link
                  href={post.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-[4px] text-[12.5px] font-semibold text-[#1652f0] hover:underline"
                >
                  View post →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-[8px] text-center">
        <Link
          href="/register"
          className="inline-flex items-center gap-[11px] rounded-[12px] bg-ink px-[28px] py-[16px] text-[16px] font-semibold leading-none text-white transition-colors hover:bg-black"
        >
          Get started
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </Link>
        <p className="mt-[12px] text-[13.5px] text-[#697b86]">
          Start free. Pay per post. No monthly minimum.
        </p>
      </div>
    </section>
  );
}