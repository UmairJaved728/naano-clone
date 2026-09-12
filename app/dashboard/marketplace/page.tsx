import { requireBrand } from "@/lib/auth/dal";
import { getMarketplace } from "@/lib/actions";
import Marketplace from "@/components/dashboard/Marketplace";

export default async function MarketplacePage() {
  await requireBrand();
  const { creators, bookmarked } = await getMarketplace();
  return <Marketplace creators={creators} initialBookmarked={[...bookmarked]} />;
}