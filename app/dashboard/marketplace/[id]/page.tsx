import { requireBrand } from "@/lib/auth/dal";
import { getCreatorById, getCampaigns } from "@/lib/actions";
import CreatorProfile from "@/components/dashboard/CreatorProfile";

export default async function CreatorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await requireBrand();
  const creator = await getCreatorById(id);
  const campaigns = await getCampaigns();
  return <CreatorProfile creator={creator} availableCampaigns={campaigns} />;
}