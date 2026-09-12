"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { logout } from "@/app/actions/auth";
import type { SessionUserDto } from "@/lib/dto";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  exact?: boolean;
}

const icons = {
  grid: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
    </svg>
  ),
  store: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 9l1.5-5h15L21 9" />
      <path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
      <path d="M5 12v8h14v-8M9 20v-5h6v5" />
    </svg>
  ),
  megaphone: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 11l18-6v14L3 13v-2z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  ),
  card: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </svg>
  ),
  sparkle: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3l1.9 5.6L19 10l-5.1 1.4L12 17l-1.9-5.6L5 10l5.1-1.4L12 3z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
    </svg>
  ),
  inbox: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.5 5h13l3.5 8v6h-20v-6l3.5-8z" />
    </svg>
  ),
  settings: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5h0a1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.5 1z" />
    </svg>
  ),
};

export default function DashboardLayout({ user, children }: { user: SessionUserDto; children: React.ReactNode }) {
  const pathname = usePathname();
  const isCreator = user.role === "creator";

  const nav: NavItem[] = isCreator
    ? [
        { label: "Opportunities", href: "/dashboard", icon: icons.inbox, exact: true },
        { label: "My media kit", href: "/dashboard/media-kit", icon: icons.sparkle },
        { label: "Payments", href: "/dashboard/payments", icon: icons.card },
        { label: "Settings", href: "/dashboard/settings", icon: icons.settings },
      ]
    : [
        { label: "Overview", href: "/dashboard", icon: icons.grid, exact: true },
        { label: "Marketplace", href: "/dashboard/marketplace", icon: icons.store },
        { label: "Campaigns", href: "/dashboard/campaigns", icon: icons.megaphone },
        { label: "Payments", href: "/dashboard/payments", icon: icons.card },
        { label: "Settings", href: "/dashboard/settings", icon: icons.settings },
      ];

  const isActive = (item: NavItem) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <div className="flex min-h-screen bg-canvas">
      <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r border-line bg-white">
        <div className="flex items-center gap-2 px-6 py-5">
          <span className="grid size-8 place-items-center rounded-xl bg-ink font-display text-base font-bold text-white">
            n
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-ink">naano</span>
        </div>

        <div className="px-4">
          <div className="rounded-2xl bg-canvas px-4 py-3">
            <p className="text-xs font-medium text-muted">
              {isCreator ? "Creator workspace" : user.company ?? "Company workspace"}
            </p>
            <p className="mt-0.5 truncate text-sm font-semibold text-ink">{user.name}</p>
          </div>
        </div>

        <nav className="mt-5 flex flex-1 flex-col gap-1 px-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                isActive(item)
                  ? "bg-ink text-white shadow-sm"
                  : "text-ink/70 hover:bg-black/5 hover:text-ink"
              }`}
            >
              <span className={isActive(item) ? "text-white" : "text-ink/50"}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-line p-4">
          <button
            onClick={() => void logout()}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:bg-black/5 hover:text-ink"
          >
            <span className="text-ink/50">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
            </span>
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1 px-6 py-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}