import CampaignDetail from "@/components/dashboard/CampaignDetail";

export default function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <CampaignDetail params={params} />;
}