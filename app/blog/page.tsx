import Link from "next/link";
import type { Metadata } from "next";
import LandingLayout from "@/components/LandingLayout";
import BlogGrid from "@/components/blog/BlogGrid";

export const metadata: Metadata = {
  title: "Naano Journal — B2B creator marketing playbooks",
  description:
    "Playbooks, benchmarks and cost data for B2B creator-led growth from the Naano team.",
};

export default function BlogPage() {
  return (
    <LandingLayout>
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-24">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Naano Journal
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-5xl font-bold tracking-tight text-ink">
          Playbooks for B2B creator-led growth.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          The mechanics, benchmarks and cost data behind creator campaigns —
          written by the team shipping them.
        </p>
        <BlogGrid />
      </div>
    </LandingLayout>
  );
}