import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LandingLayout from "@/components/LandingLayout";
import { getPost, posts } from "@/lib/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <LandingLayout>
      <article className="mx-auto max-w-3xl px-6 pt-10 pb-24">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
          ← All articles
        </Link>

        <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-accent">{post.topic}</p>
        <h1 className="mt-3 text-balance font-display text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
          {post.title}
        </h1>
        <div className="mt-6 flex items-center gap-3 text-sm text-muted">
          <span className="font-semibold text-ink">{post.author}</span>
          <span>·</span>
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime} read</span>
        </div>

        <div className="mt-10 h-2 w-24 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600" />

        <div className="mt-8 space-y-8">
          {post.body.map((b, i) => (
            <div key={i}>
              {b.heading && (
                <h2 className="mb-3 font-display text-2xl font-bold text-ink">{b.heading}</h2>
              )}
              <p className="text-[17px] leading-relaxed text-ink/80">{b.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-line bg-white p-8 text-center">
          <p className="font-display text-xl font-semibold text-ink">Run your own B2B creator campaign</p>
          <p className="mt-2 text-sm text-muted">Find creators your buyers already trust, launch in days, track every lead.</p>
          <Link href="/register" className="btn-primary mt-6 px-7 py-3 font-semibold">
            Launch a campaign free
          </Link>
        </div>
      </article>
    </LandingLayout>
  );
}