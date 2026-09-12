export type MarketplaceCreatorDto = {
  id: string;
  slug: string;
  name: string;
  firstName: string;
  headline: string;
  bio: string;
  color: string;
  networks: string[];
  topics: string[];
  follows: number;
  fit: number;
  price: number;
  rating: number;
  latestPost: {
    title: string;
    impressions: number;
    clicks: number;
    leads: number;
    brand: string;
  };
};

export type CampaignCreatorDto = {
  id: string;
  creatorId: string;
  creatorName: string;
  slug: string;
  color: string;
  state: string;
  percent: number;
  price: number;
};

export type CampaignPostDto = {
  id: string;
  creatorId: string;
  title: string;
  impressions: number;
  clicks: number;
  leads: number;
  brand: string;
};

export type CampaignDto = {
  id: string;
  name: string;
  status: string;
  objective: string;
  audience: string;
  budget: number;
  topic: string;
  trackingLink: string | null;
  brief: string;
  keyMessages: string[];
  guidelines: string;
  createdAt: string;
  creators: CampaignCreatorDto[];
  posts: CampaignPostDto[];
};

export type CreatorOpportunityDto = {
  id: string;
  campaignId: string;
  campaignName: string;
  objective: string;
  budget: number;
  state: string;
  percent: number;
  brief: string;
  share: number;
  createdAt: string;
};

export type PaymentDto = {
  id: string;
  campaignName: string;
  amount: number;
  status: "paid" | "pending";
  createdAt: string;
  direction: "in" | "out";
  creatorName?: string;
};

export type SettingsDto = {
  id: string;
  email: string;
  name: string;
  role: "brand" | "creator";
  company: string | null;
  profileUrl: string | null;
  headline: string | null;
  bio: string | null;
  price: number | null;
  topTopics: string[];
  color: string | null;
};

export type SessionUserDto = {
  id: string;
  email: string;
  name: string;
  role: "brand" | "creator";
  company: string | null;
  profileUrl: string | null;
  headline: string | null;
  bio: string | null;
  price: number | null;
  topTopics: string[];
  color: string | null;
};