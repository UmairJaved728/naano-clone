import Link from "next/link";
import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";

export const metadata: Metadata = {
  title: "Join Naano — brands or creators",
  description:
    "Create a free Naano account. Brands run creator campaigns, creators get paid for B2B content.",
};

function options(active?: string) {
  return [
    { label: "Brand / Company", desc: "We want to run creator campaigns", href: "/register/saas", active: active === "saas" },
    { label: "Creator", desc: "We want to get paid for content", href: "/register/influencer", active: active === "influencer" },
  ];
}

async function RoleSelect({ role }: { role?: string }) {
  const opts = options(role);
  return (
    <AuthShell
      title="Join Naano"
      subtitle={
        <>
          Start free. No credit card required.{" "}
          <Link href="/login" className="font-semibold text-accent hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted">
        What describes you best?
      </p>
      <div className="mt-4 flex flex-col gap-3">
        {opts.map((o) => (
          <Link
            key={o.href}
            href={o.href}
            className={`flex items-center justify-between rounded-2xl border px-5 py-4 transition-all ${
              o.active ? "border-accent bg-blue-50/40" : "border-line bg-canvas hover:border-ink/30"
            }`}
          >
            <div>
              <p className="font-semibold text-ink">{o.label}</p>
              <p className="text-sm text-muted">{o.desc}</p>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Link>
        ))}
      </div>
    </AuthShell>
  );
}

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const params = await searchParams;
  return <RoleSelect role={params.role} />;
}