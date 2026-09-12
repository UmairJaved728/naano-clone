import { requireUser } from "@/lib/auth/dal";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import type { SessionUserDto } from "@/lib/dto";

export default async function Layout({ children }: { children: React.ReactNode }) {
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
  return <DashboardLayout user={session}>{children}</DashboardLayout>;
}