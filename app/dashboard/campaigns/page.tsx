import { getCampaigns } from "@/lib/actions";
import { requireBrand } from "@/lib/auth/dal";
import Campaigns from "@/components/dashboard/Campaigns";

export default async function CampaignsPage() {
  await requireBrand();
  const campaigns = await getCampaigns();
  return <Campaigns campaigns={campaigns} />;
}