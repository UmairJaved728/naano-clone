"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { createSession, getSessionUser, destroySession } from "@/lib/auth/session";

const CredentialsSchema = z.object({
  email: z.email({ error: "Enter a valid email address." }).trim(),
  password: z.string().min(8, { error: "Password must be at least 8 characters." }),
});

const SignupSchema = CredentialsSchema.extend({
  name: z.string().min(2, { error: "Name must be at least 2 characters." }).trim(),
  role: z.enum(["brand", "creator"]),
  company: z.string().trim().optional(),
});

export type AuthState =
  | { errors?: { name?: string[]; email?: string[]; password?: string[]; role?: string[] }; message?: string }
  | undefined;

export async function login(state: AuthState, formData: FormData) {
  const parsed = CredentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { email, password } = parsed.data;
  const [user] = await db.select().from(users).where(eq(users.email, email.toLowerCase())).limit(1);

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return { message: "Invalid email or password." };
  }

  await createSession(user.id);
  redirect("/dashboard");
}

export async function signup(state: AuthState, formData: FormData) {
  const parsed = SignupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
    company: formData.get("company") || undefined,
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { name, email, password, role, company } = parsed.data;
  const existing = await db.select({ id: users.id }).from(users).where(eq(users.email, email.toLowerCase())).limit(1);
  if (existing.length > 0) {
    return { message: "An account with this email already exists." };
  }

  const passwordHash = await hashPassword(password);
  const [user] = await db
    .insert(users)
    .values({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role,
      company: role === "brand" ? company || null : null,
      profileUrl: role === "creator" ? company || null : null,
      headline: role === "creator" ? "Your creator headline" : null,
    })
    .returning();

  await createSession(user.id);
  redirect("/dashboard");
}

export async function logout() {
  await destroySession();
  redirect("/login");
}