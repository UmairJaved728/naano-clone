import { getPayments } from "@/lib/actions";
import { requireUser } from "@/lib/auth/dal";
import Payments from "@/components/dashboard/Payments";

export default async function PaymentsPage() {
  const user = await requireUser();
  const rows = await getPayments();
  return <Payments role={user.role} rows={rows} />;
}