import { getMarketplace } from "@/lib/actions";
import { requireBrand } from "@/lib/auth/dal";
import NewCampaign from "@/components/dashboard/NewCampaign";

export default async function NewCampaignPage() {
  await requireBrand();
  const { creators } = await getMarketplace();
  return <NewCampaign creators={creators} />;
}