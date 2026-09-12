import type { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create a company account — Naano",
  description:
    "Create your free company account to run LinkedIn creator campaigns on Naano.",
};

export default function SaasRegisterPage() {
  return (
    <RegisterForm
      role="saas"
      title="Create a company account"
      subtitle="Run creator campaigns, track pipeline, pay per post."
    />
  );
}