import type { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Join as a creator — Naano",
  description:
    "Create your free creator profile to get paid for B2B LinkedIn and X content.",
};

export default function InfluencerRegisterPage() {
  return (
    <RegisterForm
      role="influencer"
      title="Join as a creator"
      subtitle="Get paid for B2B content you'd publish anyway."
    />
  );
}