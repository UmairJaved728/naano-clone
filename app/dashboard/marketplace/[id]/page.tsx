import CreatorProfile from "@/components/dashboard/CreatorProfile";

export default function CreatorPage({ params }: { params: Promise<{ id: string }> }) {
  return <CreatorProfile params={params} />;
}