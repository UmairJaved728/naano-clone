"use server";

import { and, desc, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { users, creators, campaigns, campaignCreators, bookmarks, payments, posts } from "@/lib/db/schema";
import { requireBrand, requireUser } from "@/lib/auth/dal";
import type { MarketplaceCreatorDto } from "@/lib/dto";

function fmtPrice(price: number | null) {
  return Math.round((price ?? 0) * 100) / 100;
}

export async function getMarketplace() {
  const user = await requireUser();
  const rows = await db.select().from(creators).orderBy(desc(creators.fit));
  const myBookmarks = await db
    .select({ creatorId: bookmarks.creatorId })
    .from(bookmarks)
    .where(eq(bookmarks.userId, user.id));

  const bookmarked = new Set(myBookmarks.map((b) => b.creatorId));
  return {
    creators: rows.map((c) =>
      toMarketplaceDto(c, bookmarked),
    ),
    bookmarked,
  };
}

function toMarketplaceDto(c: typeof creators.$inferSelect, bookmarked = new Set<string>()): MarketplaceCreatorDto {
  return {
    id: c.id,
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
    price: fmtPrice(c.price),
    rating: c.rating / 10,
    latestPost: c.latestPost,
  };
}

export async function getCreatorById(id: string) {
  const user = await requireUser();
  const [row] = await db.select().from(creators).where(eq(creators.id, id));
  if (!row) return null;
  return toMarketplaceDto(row);
}

export async function toggleBookmark(creatorId: string) {
  const user = await requireUser();
  const existing = await db
    .select({ userId: bookmarks.userId })
    .from(bookmarks)
    .where(and(eq(bookmarks.userId, user.id), eq(bookmarks.creatorId, creatorId)))
    .limit(1);

  if (existing.length > 0) {
    await db
      .delete(bookmarks)
      .where(and(eq(bookmarks.userId, user.id), eq(bookmarks.creatorId, creatorId)));
    return false;
  }
  await db.insert(bookmarks).values({ userId: user.id, creatorId });
  return true;
}

export async function getCampaigns() {
  const user = await requireBrand();
  const list = await db
    .select()
    .from(campaigns)
    .where(eq(campaigns.brandUserId, user.id))
    .orderBy(desc(campaigns.createdAt));

  return await Promise.all(list.map((c) => hydrateCampaign(c.id)));
}

async function hydrateCampaign(campaignId: string) {
  const [c] = await db.select().from(campaigns).where(eq(campaigns.id, campaignId));
  const ccRows = await db
    .select()
    .from(campaignCreators)
    .where(eq(campaignCreators.campaignId, campaignId))
    .innerJoin(creators, eq(campaignCreators.creatorId, creators.id));

  const postRows = await db.select().from(posts).where(eq(posts.campaignId, campaignId));

  const cc = ccRows.map(({ campaign_creators: row, creators: cr }) => ({
    id: row.id,
    creatorId: cr.id,
    creatorName: cr.name,
    slug: cr.slug,
    color: cr.color,
    state: row.state,
    percent: row.percent,
    price: fmtPrice(cr.price),
  }));

  return {
    id: c.id,
    name: c.name,
    status: c.status,
    objective: c.objective,
    audience: c.audience,
    budget: c.budget,
    topic: c.topic,
    trackingLink: c.trackingLink,
    brief: c.brief,
    keyMessages: c.keyMessages,
    guidelines: c.guidelines,
    createdAt: c.createdAt.toISOString(),
    creators: cc,
    posts: postRows.map((p) => ({
      id: p.id,
      creatorId: p.creatorId,
      title: p.title,
      impressions: p.impressions,
      clicks: p.clicks,
      leads: p.leads,
      brand: p.brand,
    })),
  };
}

export async function getCampaign(id: string) {
  const user = await requireUser();
  const [c] = await db.select().from(campaigns).where(eq(campaigns.id, id));
  if (!c) throw new Error("Campaign not found");
  if (user.role === "brand" && c.brandUserId !== user.id) throw new Error("Not allowed");
  return hydrateCampaign(id);
}

export async function getOverviewData() {
  const user = await requireUser();
  if (user.role !== "brand") throw new Error("Not allowed");
  const list = await db
    .select()
    .from(campaigns)
    .where(eq(campaigns.brandUserId, user.id))
    .orderBy(desc(campaigns.createdAt));

  const hydrated = await Promise.all(list.map((c) => hydrateCampaign(c.id)));

  const pipeline: { creatorName: string; slug: string; color: string; state: string }[] = [];
  const posts: { impressions: number; clicks: number; leads: number }[] = [];
  for (const c of hydrated) {
    for (const cc of c.creators) {
      if (cc.state !== "declined" && cc.state !== "invited") {
        pipeline.push({ creatorName: cc.creatorName, slug: cc.slug, color: cc.color, state: cc.state });
      }
    }
    posts.push(...c.posts.map((p) => ({ impressions: p.impressions, clicks: p.clicks, leads: p.leads })));
  }

  const impressions = posts.reduce((s, p) => s + p.impressions, 0);
  const clicks = posts.reduce((s, p) => s + p.clicks, 0);
  const leads = posts.reduce((s, p) => s + p.leads, 0);
  const stats = {
    campaigns: list.length,
    activeCampaigns: list.filter((c) => c.status !== "draft").length,
    impressions,
    clicks,
    leads,
    pipeline: impressionLeadsToPipeline(impressions, leads),
  };

  return { campaigns: hydrated, pipeline, stats };
}

function impressionLeadsToPipeline(impressions: number, leads: number) {
  if (leads > 0) return leads * 94;
  return Math.round(impressions * 0.004);
}

export async function getCampaignForCreator(campaignId: string) {
  const user = await requireUser();
  const [linked] = await db
    .select({ id: creators.id })
    .from(creators)
    .where(eq(creators.name, user.name))
    .limit(1);
  if (!linked) throw new Error("Not allowed");
  const [c] = await db.select().from(campaigns).where(eq(campaigns.id, campaignId));
  if (!c) throw new Error("Campaign not found");
  const [cc] = await db
    .select()
    .from(campaignCreators)
    .where(and(eq(campaignCreators.campaignId, campaignId), eq(campaignCreators.creatorId, linked.id)));
  if (!cc) throw new Error("Not allowed");
  return {
    id: c.id,
    campaignCreatorId: cc.id,
    name: c.name,
    objective: c.objective,
    brief: c.brief,
    keyMessages: c.keyMessages,
    guidelines: c.guidelines,
    trackingLink: c.trackingLink,
    myState: cc.state,
    myPercent: cc.percent,
    myShare: Math.round((c.budget * (cc.percent ?? 0)) / 100),
    budget: c.budget,
    status: c.status,
    createdAt: c.createdAt.toISOString(),
  };
}

export async function createCampaign(input: {
  name: string;
  objective: string;
  audience: string;
  budget: number;
  topic: string;
  trackingLink: string;
  brief: string;
  keyMessages: string[];
  guidelines: string;
  creators: { creatorId: string; percent: number }[];
}) {
  const user = await requireUser();
  const [campaign] = await db
    .insert(campaigns)
    .values({
      brandUserId: user.id,
      name: input.name,
      objective: input.objective,
      audience: input.audience,
      budget: input.budget,
      topic: input.topic,
      status: "live",
      trackingLink: input.trackingLink,
      brief: input.brief,
      keyMessages: input.keyMessages,
      guidelines: input.guidelines,
    })
    .returning();

  const budget = input.budget ?? 0;
  const count = input.creators.length;
  if (count > 0) {
    const equalPercent = Math.floor(100 / count);
    await Promise.all(
      input.creators.map((cc, i) =>
        db.insert(campaignCreators).values({
          campaignId: campaign.id,
          creatorId: cc.creatorId,
          state: "invited",
          percent: i < count - 1 ? equalPercent : 100 - equalPercent * (count - 1),
        }),
      ),
    );
  }
  return campaign.id;
}

export async function updateCampaignCreatorState(campaignId: string, campaignCreatorId: string, state: "invited" | "draft" | "scheduled" | "live" | "approved" | "declined") {
  const user = await requireUser();
  const [cc] = await db
    .select()
    .from(campaignCreators)
    .where(eq(campaignCreators.id, campaignCreatorId));
  if (!cc) throw new Error("Not found");
  const [c] = await db.select().from(campaigns).where(eq(campaigns.id, campaignId));
  if (user.role === "brand") {
    if (c.brandUserId !== user.id) throw new Error("Not allowed");
    if (state === "approved") {
      await db
        .update(campaignCreators)
        .set({ state, approvedAt: sql`now()` })
        .where(eq(campaignCreators.id, campaignCreatorId));
      const [cr] = await db.select().from(creators).where(eq(creators.id, cc.creatorId));
      const amount = Math.round((c.budget * cc.percent) / 100);
      await db.insert(payments).values({
        campaignId,
        creatorId: cc.creatorId,
        brandUserId: c.brandUserId,
        amount,
        status: "paid",
      });
      await db.insert(posts).values({
        campaignId,
        creatorId: cc.creatorId,
        title: `${cr.name}'s post for ${c.name}`,
        impressions: Math.round(cr.follows * 2.4),
        clicks: Math.round(cr.follows * 0.08),
        leads: Math.round(cr.follows * 0.015),
        brand: c.name,
      });
      return { approved: true };
    }
    await db
      .update(campaignCreators)
      .set({ state })
      .where(eq(campaignCreators.id, campaignCreatorId));
  } else {
    if (user.role !== "creator") throw new Error("Not allowed");
    if (state === "live" || state === "draft" || state === "declined") {
      await db
        .update(campaignCreators)
        .set(state === "live" ? { state, liveAt: sql`now()` } : { state })
        .where(eq(campaignCreators.id, campaignCreatorId));
    } else {
      throw new Error("Not allowed");
    }
  }
  return { approved: false };
}

export async function getPayments() {
  const user = await requireUser();
  if (user.role === "creator") {
    const [linked] = await db
      .select({ id: creators.id })
      .from(creators)
      .where(eq(creators.name, user.name))
      .limit(1);
    if (!linked) return [];
    const rows = await db
      .select()
      .from(payments)
      .where(eq(payments.creatorId, linked.id))
      .innerJoin(campaigns, eq(payments.campaignId, campaigns.id));
    return rows.map(({ payments: p, campaigns: c }) => ({
      id: p.id,
      campaignName: c.name,
      amount: p.amount,
      status: p.status,
      createdAt: p.createdAt.toISOString(),
      direction: "in" as const,
    }));
  }
  const rows = await db
    .select()
    .from(payments)
    .where(eq(payments.brandUserId, user.id))
    .innerJoin(campaigns, eq(payments.campaignId, campaigns.id))
    .innerJoin(creators, eq(payments.creatorId, creators.id));
  return rows.map(({ payments: p, campaigns: c, creators: cr }) => ({
    id: p.id,
    campaignName: c.name,
    amount: p.amount,
    status: p.status,
    createdAt: p.createdAt.toISOString(),
    creatorName: cr.name,
    direction: "out" as const,
  }));
}

export async function getSettings() {
  const user = await requireUser();
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    company: user.company,
    profileUrl: user.profileUrl,
    headline: user.headline,
    bio: user.bio,
    price: user.price,
    topTopics: user.topTopics ?? [],
    color: user.color,
  };
}

export async function updateSettings(input: Partial<{
  name: string;
  company: string | null;
  headline: string;
  bio: string;
  price: number;
  topTopics: string[];
  profileUrl: string | null;
  color: string;
}>) {
  const user = await requireUser();
  const patch: Partial<typeof users.$inferInsert> = {};
  if (input.name !== undefined) patch.name = input.name;
  if (input.company !== undefined) patch.company = input.company;
  if (input.headline !== undefined) patch.headline = input.headline;
  if (input.bio !== undefined) patch.bio = input.bio;
  if (input.price !== undefined) patch.price = input.price;
  if (input.topTopics !== undefined) patch.topTopics = input.topTopics;
  if (input.profileUrl !== undefined) patch.profileUrl = input.profileUrl;
  if (input.color !== undefined) patch.color = input.color;
  await db.update(users).set(patch).where(eq(users.id, user.id));
}

export async function getCreatorOpportunities() {
  const user = await requireUser();
  const [linked] = await db
    .select({ id: creators.id })
    .from(creators)
    .where(eq(creators.name, user.name))
    .limit(1);
  if (!linked) return [];
  const rows = await db
    .select()
    .from(campaignCreators)
    .where(eq(campaignCreators.creatorId, linked.id))
    .innerJoin(campaigns, eq(campaignCreators.campaignId, campaigns.id))
    .orderBy(desc(campaignCreators.createdAt));
  return rows.map(({ campaign_creators: cc, campaigns: c }) => ({
    id: cc.id,
    campaignId: c.id,
    campaignName: c.name,
    objective: c.objective,
    budget: c.budget,
    state: cc.state,
    percent: cc.percent,
    brief: c.brief,
    share: Math.round((c.budget * cc.percent) / 100),
    createdAt: cc.createdAt.toISOString(),
  }));
}

export async function updateMediaKit(input: { price: number; topTopics: string[]; headline: string; bio: string; color: string }) {
  const user = await requireUser();
  await db
    .update(users)
    .set({
      price: input.price,
      topTopics: input.topTopics,
      headline: input.headline,
      bio: input.bio,
      color: input.color,
    })
    .where(eq(users.id, user.id));
}