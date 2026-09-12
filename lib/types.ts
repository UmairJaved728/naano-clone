export type Network = "LinkedIn" | "X" | "YouTube";

export type CreatorStatus = "active" | "invite-only";

export interface CreatorPost {
  title: string;
  image?: string;
  impressions: number;
  clicks: number;
  leads: number;
  brand: string;
  url: string;
}

export interface Creator {
  id: string;
  slug: string;
  name: string;
  firstName: string;
  headline: string;
  bio: string;
  role: string;
  follows: number;
  networks: Network[];
  price: number;
  fit: number;
  countries: string[];
  topics: string[];
  status: CreatorStatus;
  rating: number;
  posts: CreatorPost[];
  color: string;
}

export type CampaignStatus =
  | "draft"
  | "briefing"
  | "review"
  | "live"
  | "completed";

export interface CampaignCreatorState {
  creatorId: string;
  state: "invited" | "draft" | "scheduled" | "live" | "approved" | "declined";
}

export interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  objective: string;
  budget: number;
  startDate: string;
  endDate: string;
  keywords: string[];
  trackingLink: string;
  creators: CampaignCreatorState[];
  metrics?: {
    impressions: number;
    clicks: number;
    leads: number;
    pipeline: number;
    cost: number;
  };
}

export const CAMPAIGN_STATE_META: Record<
  CampaignCreatorState["state"],
  { label: string; className: string }
> = {
  invited: { label: "Invited", className: "bg-blue-50 text-blue-700 border-blue-200" },
  draft: { label: "Draft ready", className: "bg-amber-50 text-amber-700 border-amber-200" },
  scheduled: { label: "Scheduled", className: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  live: { label: "Live", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  approved: { label: "Paid", className: "bg-slate-100 text-slate-700 border-slate-200" },
  declined: { label: "Declined", className: "bg-rose-50 text-rose-700 border-rose-200" },
};