"use client";

import { useState } from "react";
import Link from "next/link";
import { posts, topics } from "@/lib/blog";

export default function BlogGrid() {
  const [topic, setTopic] = useState("All");
  const filtered = topic === "All" ? posts : posts.filter((p) => p.topic === topic);
  const [featured, ...rest] = filtered;

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-2">
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => setTopic(t)}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
              topic === t
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-ink/70 hover:border-ink/30"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group mt-10 block overflow-hidden rounded-3xl border border-line bg-white transition-all hover:shadow-xl hover:shadow-black/[0.05]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div
              className={`relative flex min-h-64 items-center justify-center bg-gradient-to-br ${featured.hero} p-10`}
            >
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                Featured
              </span>
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                {featured.topic}
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-ink group-hover:text-accent transition-colors sm:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{featured.excerpt}</p>
              <div className="mt-6 flex items-center gap-3 text-xs text-muted">
                <span className="font-semibold text-ink">{featured.author}</span>
                <span>·</span>
                <span>{featured.date}</span>
                <span>·</span>
                <span>{featured.readTime} read</span>
              </div>
            </div>
          </div>
        </Link>
      )}

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group card flex flex-col p-6 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-black/[0.05]"
          >
            <div className={`h-2 w-12 rounded-full bg-gradient-to-r ${p.hero}`} />
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-accent">{p.topic}</p>
            <h3 className="mt-2 font-display text-lg font-bold leading-snug text-ink group-hover:text-accent transition-colors">
              {p.title}
            </h3>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{p.excerpt}</p>
            <div className="mt-6 flex items-center gap-3 border-t border-line pt-4 text-xs text-muted">
              <span className="font-semibold text-ink">{p.author}</span>
              <span>·</span>
              <span>{p.readTime} read</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}