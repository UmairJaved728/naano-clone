import Link from "next/link";
import Avatar from "@/components/Avatar";

export default function Testimonial() {
  return (
    <section className="border-b border-line bg-canvas">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-16 text-center sm:flex-row sm:gap-10 sm:text-left">
        <div className="flex items-center gap-4 sm:flex-col sm:items-start">
          <Avatar name="David Zmirov" color="from-zinc-700 to-zinc-900" size="lg" />
          <div>
            <p className="font-display text-sm font-semibold text-ink">David Zmirov</p>
            <p className="text-xs text-muted">CEO, Zmirov Communication</p>
            <p className="text-xs text-muted">Influence agency</p>
          </div>
        </div>
        <div className="h-px w-full bg-line sm:h-16 sm:w-px" />
        <blockquote className="text-balance font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">
          “We manage €10M+ of influence budget every year. For B2B, Naano
          simply makes our life easier”
        </blockquote>
      </div>
    </section>
  );
}