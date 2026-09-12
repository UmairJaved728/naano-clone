import { Metadata } from "next";
import LandingLayout from "@/components/LandingLayout";
import Selection from "@/components/selection/Selection";

export const metadata: Metadata = {
  title: "Free B2B creator search — Naano",
  description:
    "Search a sample of the Naano B2B creator marketplace: 3,000+ vetted LinkedIn, X and YouTube creators ranked by audience fit.",
};

export default function SelectionPage() {
  return (
    <LandingLayout navLinks="marketing">
      <Selection />
    </LandingLayout>
  );
}