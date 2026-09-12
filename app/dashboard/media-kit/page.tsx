import { getSettings } from "@/lib/actions";
import { requireCreator } from "@/lib/auth/dal";
import MediaKit from "@/components/dashboard/MediaKit";

export default async function MediaKitPage() {
  await requireCreator();
  const user = await getSettings();
  return <MediaKit user={user} />;
}