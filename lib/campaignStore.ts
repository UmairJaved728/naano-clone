"use client";

export interface StoredCampaign {
  id: string;
  name: string;
  status: string;
  objective: string;
  budget: number;
  startDate: string;
  endDate: string;
  keywords: string[];
  trackingLink: string;
  creators: { creatorId: string; state: string }[];
  metrics?: {
    impressions: number;
    clicks: number;
    leads: number;
    pipeline: number;
    cost: number;
  };
  createdAt: string;
}

const KEY = "naano_campaigns";

export function getStoredCampaigns(): StoredCampaign[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function storeCampaign(c: StoredCampaign) {
  const all = getStoredCampaigns();
  all.unshift(c);
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function updateStoredCampaign(id: string, patch: Partial<StoredCampaign>) {
  const all = getStoredCampaigns().map((c) => (c.id === id ? { ...c, ...patch } : c));
  localStorage.setItem(KEY, JSON.stringify(all));
}