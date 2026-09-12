import { getSettings } from "@/lib/actions";
import { requireUser } from "@/lib/auth/dal";
import Settings from "@/components/dashboard/Settings";

export default async function SettingsPage() {
  await requireUser();
  const user = await getSettings();
  return <Settings user={user} />;
}