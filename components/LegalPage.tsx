import LandingLayout from "@/components/LandingLayout";

export default function LegalPage({
  title,
  eyebrow = "Legal",
  children,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <LandingLayout navLinks="home">
      <div className="mx-auto max-w-3xl px-6 pt-12 pb-24">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">{eyebrow}</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink">{title}</h1>
        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-ink/80">
          {children}
        </div>
      </div>
    </LandingLayout>
  );
}