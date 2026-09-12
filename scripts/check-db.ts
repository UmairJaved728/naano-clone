import { sql } from "drizzle-orm";
import { db } from "../lib/db";

async function main() {
  const e = await db.execute<{ typname: string; labels: string }>(
    sql`select t.typname, string_agg(e.enumlabel, ',' order by e.enumsortorder) as labels from pg_type t join pg_enum e on e.enumtypid = t.oid group by t.typname`,
  );
  console.log("ENUMS=" + JSON.stringify((e.rows ?? []).map((r) => r.typname + ":" + r.labels)));
  process.exit(0);
}

main().catch((e) => {
  console.error("ERR " + (e as any).message);
  process.exit(1);
});