"use client";

import { useState } from "react";
import Link from "next/link";
import LandingLayout from "@/components/LandingLayout";

const slots = ["Tue 15 · 10:30", "Tue 15 · 14:00", "Wed 16 · 11:30", "Wed 16 · 16:00", "Thu 17 · 09:30", "Thu 17 · 15:30"];

export default function BookPage() {
  const [slot, setSlot] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [done, setDone] = useState(false);

  return (
    <LandingLayout navLinks="home">
      <div className="mx-auto max-w-3xl px-6 pt-10 pb-24">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Campaign strategy call
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Book a 30-minute working session.
        </h1>
        <p className="mt-4 text-lg text-muted">
          Leave with a concrete plan for your next creator campaign — creator
          strategy, campaign format and a budget recommendation.
        </p>

        {done ? (
          <div className="card mt-10 p-10 text-center">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-600">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold text-ink">You're booked!</h2>
            <p className="mt-2 text-sm text-muted">
              {slot} — a calendar invite is on its way to {email}.
            </p>
            <Link href="/" className="btn-light mt-6 inline-flex px-6 py-2.5 text-sm">
              Back to home
            </Link>
          </div>
        ) : (
          <div className="card mt-10 p-8">
            <p className="font-display text-lg font-bold text-ink">Pick a time</p>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {slots.map((s) => (
                <button
                  key={s}
                  onClick={() => setSlot(s)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-medium transition-all ${
                    slot === s ? "border-ink bg-ink text-white" : "border-line bg-canvas text-ink hover:border-ink/30"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="rounded-xl border border-line bg-canvas px-4 py-3 text-sm outline-none focus:border-ink" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Work email" className="rounded-xl border border-line bg-canvas px-4 py-3 text-sm outline-none focus:border-ink" />
            </div>

            <button
              disabled={!slot || !name || !email}
              onClick={() => setDone(true)}
              className="btn-primary mt-6 w-full py-3 font-semibold disabled:opacity-40"
            >
              Confirm booking
            </button>
            <p className="mt-3 text-center text-xs text-muted">
              Prefer to start yourself?{" "}
              <Link href="/register" className="font-semibold text-accent hover:underline">Start for free →</Link>
            </p>
          </div>
        )}
      </div>
    </LandingLayout>
  );
}