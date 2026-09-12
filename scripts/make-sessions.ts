import { createHash, randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
import { db } from "../lib/db";
import { users, sessions } from "../lib/db/schema";

async function main() {
  for (const email of ["brand@naano.com", "creator@naano.com"]) {
    const [u] = await db.select().from(users).where(eq(users.email, email));
    if (!u) throw new Error("no user " + email);
    const token = randomBytes(32).toString("base64url");
    const expiresAt = new Date(Date.now() + 60 * 60 * 24 * 7 * 1000);
    await db
      .insert(sessions)
      .values({ userId: u.id, tokenHash: createHash("sha256").update(token).digest("hex"), expiresAt })
      .onConflictDoNothing();
    console.log(`${email}=${token}`);
  }
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});