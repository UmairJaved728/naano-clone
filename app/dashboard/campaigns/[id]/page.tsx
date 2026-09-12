import { getCampaign, getCampaignForCreator } from "@/lib/actions";
import { requireUser } from "@/lib/auth/dal";
import CampaignDetail from "@/components/dashboard/CampaignDetail";

export default async function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser();
  if (user.role === "creator") {
    const deal = await getCampaignForCreator(id);
    return <CampaignDetail view="creator" deal={deal} />;
  }
  const campaign = await getCampaign(id);
  return <CampaignDetail view="brand" campaign={campaign} />;
}