import "server-only";
import { redirect } from "next/navigation";
import { getSessionUser } from "./session";
import type { User } from "@/lib/db/schema";

export async function getCurrentUser(): Promise<User | null> {
  return getSessionUser();
}

export async function requireUser(): Promise<User> {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireBrand(): Promise<User> {
  const user = await requireUser();
  if (user.role !== "brand") redirect("/dashboard");
  return user;
}

export async function requireCreator(): Promise<User> {
  const user = await requireUser();
  if (user.role !== "creator") redirect("/dashboard");
  return user;
}