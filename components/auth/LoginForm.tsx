"use client";

import { useActionState } from "react";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import { login } from "@/app/actions/auth";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <AuthShell
      title="Welcome back"
      subtitle={<>New to Naano?{" "}<Link href="/register" className="font-semibold text-accent hover:underline">Create an account</Link></>}
    >
      <div className="mb-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-line" />
        <span className="text-xs text-muted">sign in with email</span>
        <div className="h-px flex-1 bg-line" />
      </div>

      <form action={formAction} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink">Work email</span>
          <input
            type="email"
            name="email"
            required
            placeholder="you@company.com"
            className="rounded-full border border-line bg-canvas px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink"
          />
          {state?.errors?.email?.map((e) => (
            <span key={e} className="text-xs text-rose-600">{e}</span>
          ))}
        </label>
        <label className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-ink">Password</span>
            <Link href="/login/forgot-password" className="text-xs font-medium text-accent hover:underline">
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            name="password"
            required
            placeholder="Enter your password"
            className="rounded-full border border-line bg-canvas px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink"
          />
          {state?.errors?.password?.map((e) => (
            <span key={e} className="text-xs text-rose-600">{e}</span>
          ))}
        </label>

        {state?.message && (
          <p className="rounded-xl bg-rose-50 px-4 py-2.5 text-sm text-rose-700">{state.message}</p>
        )}

        <button type="submit" disabled={pending} className="btn-primary mt-1 w-full py-3 text-[15px] font-semibold disabled:opacity-60">
          {pending ? "Signing in\u2026" : "Sign in"}
        </button>
      </form>
    </AuthShell>
  );
}