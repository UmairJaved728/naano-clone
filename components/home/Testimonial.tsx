export default function Testimonial() {
  return (
    <section className="flex w-full flex-col items-center justify-start bg-canvas px-[84px] py-[96px] text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/lp/logo-zmirov.png" alt="Zmirov Communication" width={141} height={40} className="block" />
      <div className="mt-[20px] h-[2px] w-10 rounded-[2px] bg-[#2563eb]" />
      <blockquote className="mx-auto mt-[44px] max-w-[999px] text-balance font-display text-[52px] font-medium leading-[62.4px] tracking-[-1.144px] text-ink">
        “We manage €10M+ of influence budget every year. For B2B, Naano simply
        makes our life easier”
      </blockquote>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/lp/photo-david-zmirov.png"
        alt="David Zmirov"
        width={90}
        height={90}
        className="mt-[52px] block rounded-full"
      />
      <p className="mt-[20px] text-[16.5px] font-semibold text-ink">David Zmirov</p>
      <p className="mt-[6px] text-[13px] text-[#55575e]">CEO, Zmirov Communication</p>
      <p className="mt-[4px] text-[11px] text-[#55575e]">Influence agency</p>
    </section>
  );
}