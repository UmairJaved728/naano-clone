import Link from "next/link";

export default function Logo({ className = "text-ink" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 ${className}`}>
      <span className="grid size-8 place-items-center rounded-xl bg-ink font-display text-base font-bold text-white">
        n
      </span>
      <span className="font-display text-2xl font-bold tracking-tight">naano</span>
    </Link>
  );
}