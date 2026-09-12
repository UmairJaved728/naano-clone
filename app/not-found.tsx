import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-canvas px-6 text-center">
      <div>
        <p className="font-display text-7xl font-bold text-ink">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-ink">This page wandered off.</h1>
        <p className="mt-2 text-muted">The creators are great, but this URL doesn't exist.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="btn-primary px-6 py-3 font-semibold">Back to home</Link>
          <Link href="/creators" className="btn-light px-6 py-3 font-semibold">Browse creators</Link>
        </div>
      </div>
    </main>
  );
}