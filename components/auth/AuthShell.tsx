import Link from "next/link";
import Logo from "@/components/Logo";

export default function AuthShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen flex-col bg-canvas">
      <div className="bg-noise" aria-hidden />
      <header className="relative flex items-center justify-between px-6 py-6">
        <Logo />
        <div className="flex items-center gap-2 text-sm text-muted">
          <button className="flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors hover:bg-black/5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
            </svg>
            EN
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </header>

      <div className="relative flex flex-1 items-start justify-center px-6 pb-20 pt-6">
        <div className="w-full max-w-md">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold tracking-tight text-ink">{title}</h1>
            <div className="mt-2 text-sm text-muted">{subtitle}</div>
          </div>
          <div className="mt-8 rounded-3xl border border-line bg-white p-8 shadow-sm">{children}</div>
        </div>
      </div>

      <footer className="relative border-t border-line px-6 py-5 text-center text-xs text-muted">
        <p>
          © 2026 naano.{" "}
          <Link href="/privacy" className="hover:underline">Privacy</Link> ·{" "}
          <Link href="/terms" className="hover:underline">Terms of Sale & Use</Link>
        </p>
      </footer>
    </main>
  );
}