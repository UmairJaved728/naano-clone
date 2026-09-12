import type { Metadata } from "next";
import LandingLayout from "@/components/LandingLayout";
import CreatorsHero from "@/components/creators/CreatorsHero";
import Monetize from "@/components/creators/Monetize";
import Deals from "@/components/creators/Deals";
import CreatorsResults from "@/components/creators/CreatorsResults";
import Community from "@/components/creators/Community";
import CreatorsFAQ from "@/components/creators/CreatorsFAQ";
import CreatorsCTA from "@/components/creators/CreatorsCTA";

export const metadata: Metadata = {
  title: "Naano for creators: get paid to create B2B content",
  description:
    "Join 2,000+ B2B creators getting paid for sponsored LinkedIn and X posts. Set your price, review briefs, publish and get paid within 24 hours.",
};

export default function CreatorsPage() {
  return (
    <LandingLayout>
      <CreatorsHero />
      <Monetize />
      <Deals />
      <CreatorsResults />
      <Community />
      <CreatorsFAQ />
      <CreatorsCTA />
    </LandingLayout>
  );
}