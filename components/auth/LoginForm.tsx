"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import OAuthButtons from "@/components/auth/OAuthButtons";
import { loginUser } from "@/lib/auth";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const res = loginUser(email, password);
      if (!res.ok) {
        setError(res.error);
        setLoading(false);
        return;
      }
      router.push("/dashboard");
    }, 400);
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle={<>New to Naano?{" "}<Link href="/register" className="font-semibold text-accent hover:underline">Create an account</Link></>}
    >
      <OAuthButtons />
      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-line" />
        <span className="text-xs text-muted">or continue with email</span>
        <div className="h-px flex-1 bg-line" />
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink">Work email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="rounded-full border border-line bg-canvas px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink"
          />
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
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="rounded-full border border-line bg-canvas px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink"
          />
        </label>

        {error && (
          <p className="rounded-xl bg-rose-50 px-4 py-2.5 text-sm text-rose-700">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary mt-1 w-full py-3 text-[15px] font-semibold disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </AuthShell>
  );
}