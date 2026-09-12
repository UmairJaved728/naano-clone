import { requireUser } from "@/lib/auth/dal";
import { getOverviewData, getCreatorOpportunities } from "@/lib/actions";
import Overview from "@/components/dashboard/Overview";
import CreatorHome from "@/components/dashboard/CreatorHome";
import type { SessionUserDto } from "@/lib/dto";

export default async function DashboardHome() {
  const user = await requireUser();
  const session: SessionUserDto = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    company: user.company,
    profileUrl: user.profileUrl,
    headline: user.headline,
    bio: user.bio,
    price: user.price,
    topTopics: user.topTopics ?? [],
    color: user.color,
  };

  if (user.role === "creator") {
    const opportunities = await getCreatorOpportunities();
    return <CreatorHome user={session} opportunities={opportunities} />;
  }

  const data = await getOverviewData();
  return <Overview {...data} />;
}