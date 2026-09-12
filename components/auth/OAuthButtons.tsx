"use client";

import { useRouter } from "next/navigation";
import { demoUser, setSession } from "@/lib/auth";

export default function OAuthButtons({ onDone }: { onDone?: () => void }) {
  const router = useRouter();

  const signInWith = (provider: "linkedin" | "google") => {
    setSession({ ...demoUser, name: provider === "linkedin" ? "Alex Morgan" : "Sam Carter", email: `demo.${provider}@naano.demo` });
    onDone?.();
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => signInWith("linkedin")}
        className="flex w-full items-center justify-center gap-2.5 rounded-full border border-line bg-white py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink/30"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="#0a66c2">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45z" />
        </svg>
        Continue with LinkedIn
      </button>

      <button
        onClick={() => signInWith("google")}
        className="flex w-full items-center justify-center gap-2.5 rounded-full border border-line bg-white py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink/30"
      >
        <svg width="17" height="17" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.5 6.1 29.6 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.5 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
          <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
          <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
        </svg>
        Continue with Google
      </button>
    </div>
  );
}