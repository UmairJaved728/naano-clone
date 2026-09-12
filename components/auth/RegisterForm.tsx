"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import { registerUser } from "@/lib/auth";

export default function RegisterForm({
  role,
  title,
  subtitle,
}: {
  role: "saas" | "influencer";
  title: string;
  subtitle?: string;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [work, setWork] = useState(role === "saas" ? "" : "linkedin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const res = registerUser(email, password, {
        role,
        name,
        email,
        company: role === "saas" ? work || undefined : undefined,
        linkedin: role === "influencer" ? work : undefined,
      });
      if (!res.ok) {
        setError(res.error);
        setLoading(false);
        return;
      }
      router.push("/dashboard");
    }, 500);
  };

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
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink">
            {role === "saas" ? "Full name" : "Public name"}
          </span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={role === "saas" ? "Jane Cooper" : "Jane Cooper"}
            className="rounded-full border border-line bg-canvas px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink"
          />
        </label>

        {role === "saas" ? (
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink">Company</span>
            <input
              required
              value={work}
              onChange={(e) => setWork(e.target.value)}
              placeholder="Acme Inc."
              className="rounded-full border border-line bg-canvas px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink"
            />
          </label>
        ) : (
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink">LinkedIn profile URL</span>
            <input
              required
              value={work}
              onChange={(e) => setWork(e.target.value)}
              placeholder="linkedin.com/in/your-handle"
              className="rounded-full border border-line bg-canvas px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink"
            />
          </label>
        )}

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
          <span className="text-sm font-medium text-ink">Password</span>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            className="rounded-full border border-line bg-canvas px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink"
          />
        </label>

        {error && <p className="rounded-xl bg-rose-50 px-4 py-2.5 text-sm text-rose-700">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary mt-1 w-full py-3 text-[15px] font-semibold disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Create account"}
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