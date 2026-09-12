import type { MetadataRoute } from "next";
import { creators } from "@/lib/data";
import { posts } from "@/lib/blog";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://naano-clone-green.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/creators",
    "/agencies",
    "/agency",
    "/talent-agency",
    "/pricing",
    "/about",
    "/blog",
    "/reports",
    "/book",
    "/help",
    "/selection",
    "/free-tools",
    "/linkedin-creator-marketplace",
    "/case-studies/blogseo",
  ].map((p) => ({ url: `${base}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 }));

  const creatorPages = creators.map((c) => ({
    url: `${base}/creators/${c.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const blogPages = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...creatorPages, ...blogPages];
}