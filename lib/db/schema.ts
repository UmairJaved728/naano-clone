import { pgTable, text, integer, boolean, jsonb, timestamp, pgEnum, uuid, primaryKey } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["brand", "creator"]);
export const creatorStateEnum = pgEnum("creator_state", ["invited", "draft", "scheduled", "live", "approved", "declined"]);
export const paymentStatusEnum = pgEnum("payment_status", ["pending", "paid"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  role: roleEnum("role").notNull(),
  company: text("company"),
  profileUrl: text("profile_url"),
  headline: text("headline"),
  bio: text("bio"),
  price: integer("price").default(200),
  topTopics: jsonb("top_topics").$type<string[]>().default([]),
  color: text("color").default("from-blue-600 to-indigo-700"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const creators = pgTable("creators", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  firstName: text("first_name").notNull(),
  headline: text("headline").notNull(),
  bio: text("bio").notNull(),
  color: text("color").notNull(),
  networks: jsonb("networks").$type<string[]>().notNull(),
  topics: jsonb("topics").$type<string[]>().notNull(),
  follows: integer("follows").notNull(),
  fit: integer("fit").notNull(),
  price: integer("price").notNull(),
  rating: integer("rating").notNull(),
  latestPost: jsonb("latest_post")
    .$type<{ title: string; impressions: number; clicks: number; leads: number; brand: string }>()
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const campaigns = pgTable("campaigns", {
  id: uuid("id").defaultRandom().primaryKey(),
  brandUserId: uuid("brand_user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  objective: text("objective").notNull(),
  audience: text("audience").notNull(),
  budget: integer("budget").notNull(),
  topic: text("topic").notNull(),
  status: text("status").default("draft").notNull(),
  trackingLink: text("tracking_link"),
  brief: text("brief").notNull(),
  keyMessages: jsonb("key_messages").$type<string[]>().notNull(),
  guidelines: text("guidelines").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const campaignCreators = pgTable("campaign_creators", {
  id: uuid("id").defaultRandom().primaryKey(),
  campaignId: uuid("campaign_id").notNull().references(() => campaigns.id, { onDelete: "cascade" }),
  creatorId: uuid("creator_id").notNull().references(() => creators.id),
  state: creatorStateEnum("state").default("invited").notNull(),
  percent: integer("percent").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  liveAt: timestamp("live_at", { withTimezone: true }),
  approvedAt: timestamp("approved_at", { withTimezone: true }),
});

export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  campaignId: uuid("campaign_id").notNull().references(() => campaigns.id, { onDelete: "cascade" }),
  creatorId: uuid("creator_id").notNull().references(() => creators.id),
  title: text("title").notNull(),
  impressions: integer("impressions").notNull(),
  clicks: integer("clicks").notNull(),
  leads: integer("leads").notNull(),
  brand: text("brand").notNull(),
  publishedAt: timestamp("published_at", { withTimezone: true }).defaultNow().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const bookmarks = pgTable(
  "bookmarks",
  {
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    creatorId: uuid("creator_id").notNull().references(() => creators.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.creatorId] })],
);

export const payments = pgTable("payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  campaignId: uuid("campaign_id").notNull().references(() => campaigns.id, { onDelete: "cascade" }),
  creatorId: uuid("creator_id").notNull().references(() => creators.id),
  brandUserId: uuid("brand_user_id").notNull().references(() => users.id),
  amount: integer("amount").notNull(),
  status: paymentStatusEnum("status").default("paid").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull().unique(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type Creator = typeof creators.$inferSelect;
export type Campaign = typeof campaigns.$inferSelect;
export type CampaignCreator = typeof campaignCreators.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type Payment = typeof payments.$inferSelect;
export type Session = typeof sessions.$inferSelect;