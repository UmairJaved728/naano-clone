"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

type NavLink = { label: string; href: string };

const companyLinks: NavLink[] = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQs", href: "/#faq" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

const marketingLinks: NavLink[] = [
  { label: "For companies", href: "/" },
  { label: "For creators", href: "/creators" },
  { label: "For agencies", href: "/agencies" },
  { label: "How it works", href: "/#how-it-works" },
];

export default function Nav({
  onLight = false,
  links = "home",
  signInHref = "/login",
  registerHref = "/register",
  registerLabel = "Get started",
}: {
  onLight?: boolean;
  links?: "home" | "marketing";
  signInHref?: string;
  registerHref?: string;
  registerLabel?: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || onLight;
  const items = links === "home" ? companyLinks : marketingLinks;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border border-line/80 bg-white/90 px-4 py-2.5 transition-all duration-300 backdrop-blur-xl ${
          solid ? "shadow-lg shadow-black/[0.04]" : ""
        }`}
      >
        <div>
          <Logo />
        </div>

        <div className="hidden items-center gap-7 text-[14px] font-medium text-ink-soft lg:flex">
          {items.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-opacity hover:opacity-70"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-1.5 lg:flex">
          {links === "marketing" && (
            <Link
              href="/login"
              className="rounded-full px-3 py-2 text-[15px] font-medium text-ink transition-colors hover:bg-black/5"
            >
              Sign in
            </Link>
          )}
          <Link
            href={links === "home" ? signInHref : registerHref}
            className="rounded-full bg-white px-[18px] py-[10px] text-[15px] font-semibold text-ink ring-1 ring-inset ring-line transition-colors hover:ring-ink/30"
          >
            {links === "home" ? "Sign in" : registerLabel === "Start earning" ? "Sign in" : "Sign in"}
          </Link>
          <Link
            href={links === "home" ? registerHref : registerHref}
            className="rounded-full bg-ink px-5 py-[11px] text-[15px] font-semibold text-white transition-all hover:bg-black hover:shadow-md active:scale-[0.98]"
          >
            {registerLabel === "Get started" ? "Get started" : "Start earning"}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            aria-label="Menu"
            onClick={() => setOpen(!open)}
            className="grid size-9 place-items-center rounded-full border border-line bg-white text-ink"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-line bg-white p-4 shadow-xl lg:hidden">
          <div className="flex flex-col">
            {items.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-ink hover:bg-black/5"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-line pt-3">
              <Link href={links === "home" ? signInHref : registerHref} onClick={() => setOpen(false)} className="btn-light w-full">
                {links === "home" ? "Sign in" : "Sign in"}
              </Link>
              <Link href={registerHref} onClick={() => setOpen(false)} className="btn-primary w-full">
                {links === "home" ? "Get started" : "Start earning"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}