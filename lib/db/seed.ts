import { db } from "./index";
import { users, creators, campaigns, campaignCreators, posts } from "./schema";
import { creators as seedCreators } from "../data";
import bcrypt from "bcryptjs";

async function main() {
  const passwordHash = await bcrypt.hash("Naano-demo-2026!", 10);

  const demoBrand = await db
    .insert(users)
    .values({
      email: "brand@naano.com",
      name: "Alex Martin",
      passwordHash,
      role: "brand",
      company: "Acme SaaS",
    })
    .onConflictDoNothing()
    .returning();

  const demoCreator = await db
    .insert(users)
    .values({
      email: "creator@naano.com",
      name: "Robin Tempe",
      passwordHash,
      role: "creator",
      headline: seedCreators[1].headline,
      bio: seedCreators[1].bio,
      profileUrl: seedCreators[1].topics.join(", "),
      price: seedCreators[1].price,
    })
    .onConflictDoNothing()
    .returning();

  const insertedCreators = [];
  for (const c of seedCreators) {
    const post = c.posts[0];
    const inserted = await db
      .insert(creators)
      .values({
        slug: c.slug,
        name: c.name,
        firstName: c.firstName,
        headline: c.headline,
        bio: c.bio,
        color: c.color,
        networks: c.networks,
        topics: c.topics,
        follows: c.follows,
        fit: c.fit,
        price: c.price,
        rating: Math.round(c.rating * 10),
        latestPost: {
          title: post.title,
          impressions: post.impressions,
          clicks: post.clicks,
          leads: post.leads,
          brand: post.brand,
        },
      })
      .onConflictDoNothing()
      .returning();
    if (inserted[0]) insertedCreators.push(inserted[0]);
  }

  console.log(`Seeded creators: ${insertedCreators.length}`);
  console.log(`Demo brand: ${demoBrand.length ? "created" : "exists"}`);
  console.log(`Demo creator: ${demoCreator.length ? "created" : "exists"}`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});