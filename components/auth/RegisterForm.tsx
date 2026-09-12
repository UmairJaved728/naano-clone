"use client";

import { useActionState } from "react";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import { signup } from "@/app/actions/auth";

export default function RegisterForm({
  role,
  title,
  subtitle,
}: {
  role: "saas" | "influencer";
  title: string;
  subtitle?: string;
}) {
  const dbRole = role === "saas" ? "brand" : "creator";
  const [state, formAction, pending] = useActionState(signup, undefined);

  return (
    <AuthShell
      title={title}
      subtitle={
        <>
          {subtitle}{" "}
          <Link
            href={`/register${role === "saas" ? "?role=influencer" : "?role=saas"}`}
            className="font-semibold text-accent hover:underline"
          >
            {role === "saas" ? "I'm a creator" : "I'm a company"}
          </Link>
        </>
      }
    >
      <form action={formAction} className="flex flex-col gap-4">
        <input type="hidden" name="role" value={dbRole} />

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink">{role === "saas" ? "Full name" : "Public name"}</span>
          <input
            required
            name="name"
            placeholder="Jane Cooper"
            className="rounded-full border border-line bg-canvas px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink"
          />
          {state?.errors?.name?.map((e) => (
            <span key={e} className="text-xs text-rose-600">{e}</span>
          ))}
        </label>

        {role === "saas" ? (
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink">Company</span>
            <input
              name="company"
              placeholder="Acme Inc."
              className="rounded-full border border-line bg-canvas px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink"
            />
          </label>
        ) : (
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink">LinkedIn profile URL</span>
            <input
              name="company"
              value="linkedin.com/in/your-handle"
              readOnly
              className="rounded-full border border-line bg-canvas px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-ink"
            />
          </label>
        )}

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink">Work email</span>
          <input
            type="email"
            required
            name="email"
            placeholder="you@company.com"
            className="rounded-full border border-line bg-canvas px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink"
          />
          {state?.errors?.email?.map((e) => (
            <span key={e} className="text-xs text-rose-600">{e}</span>
          ))}
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink">Password</span>
          <input
            type="password"
            required
            minLength={8}
            name="password"
            placeholder="At least 8 characters"
            className="rounded-full border border-line bg-canvas px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink"
          />
          {state?.errors?.password?.map((e) => (
            <span key={e} className="text-xs text-rose-600">{e}</span>
          ))}
        </label>

        {state?.message && <p className="rounded-xl bg-rose-50 px-4 py-2.5 text-sm text-rose-700">{state.message}</p>}

        <button type="submit" disabled={pending} className="btn-primary mt-1 w-full py-3 text-[15px] font-semibold disabled:opacity-60">
          {pending ? "Creating account\u2026" : "Create account"}
        </button>

        <p className="text-center text-xs text-muted">
          By creating an account you accept our{" "}
          <Link href="/terms" className="underline">Terms of Sale & Use</Link> and{" "}
          <Link href="/privacy" className="underline">Privacy Policy</Link>.
        </p>
      </form>
    </AuthShell>
  );
}