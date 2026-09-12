export interface User {
  role: "saas" | "influencer";
  name: string;
  email: string;
  company?: string;
  linkedin?: string;
}

const KEY = "naano_current_user";
const USERS_KEY = "naano_users";

export function getUsers(): Record<string, { password: string; user: User }> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function getSession(): User | null {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "null");
  } catch {
    return null;
  }
}

export function setSession(user: User) {
  localStorage.setItem(KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(KEY);
}

export function registerUser(
  email: string,
  password: string,
  user: User
): { ok: true } | { ok: false; error: string } {
  const users = getUsers();
  if (users[email.toLowerCase()]) {
    return { ok: false, error: "An account with this email already exists. Try signing in." };
  }
  users[email.toLowerCase()] = { password, user };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  setSession(user);
  return { ok: true };
}

export function loginUser(
  email: string,
  password: string
): { ok: true; user: User } | { ok: false; error: string } {
  const users = getUsers();
  const entry = users[email.toLowerCase()];
  if (!entry || entry.password !== password) {
    return { ok: false, error: "Invalid email or password." };
  }
  setSession(entry.user);
  return { ok: true, user: entry.user };
}

export const demoUser: User = {
  role: "saas",
  name: "You",
  email: "you@naano.demo",
  company: "BlogSEO",
};