"use client";

import { useEffect, useState } from "react";
import Overview from "@/components/dashboard/Overview";
import CreatorHome from "@/components/dashboard/CreatorHome";

export default function DashboardHome() {
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("naano_current_user") ?? "null");
      setRole(u?.role ?? null);
    } catch {
      setRole(null);
    }
  }, []);
  return role === "influencer" ? <CreatorHome /> : <Overview />;
}