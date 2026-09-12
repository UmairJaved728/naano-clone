import { Metadata } from "next";
import CreatorWorth from "@/components/tools/CreatorWorth";

export const metadata: Metadata = {
  title: "Creator worth calculator — Naano",
  description:
    "Estimate clicks, leads and pipeline a B2B creator will drive per post, using Naano benchmark rates.",
};

export default function CreatorWorthPage() {
  return <CreatorWorth />;
}