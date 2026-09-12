import { sql } from "drizzle-orm";
import { db } from "../lib/db";

async function main() {
  const ids = await db.execute<{ id: string }>(sql`select id from campaigns where name = 'E2E Test Campaign'`);
  const rows = ids.rows ?? [];
  if (rows.length === 0) {
    console.log("no E2E campaigns");
    process.exit(0);
  }
  const idList = rows.map((r) => `'${r.id}'`).join(",");
  await db.execute(sql.raw(`delete from posts where campaign_id in (${idList})`));
  await db.execute(sql.raw(`delete from payments where campaign_id in (${idList})`));
  await db.execute(sql.raw(`delete from campaign_creators where campaign_id in (${idList})`));
  await db.execute(sql.raw(`delete from campaigns where id in (${idList})`));
  console.log("deleted campaigns=" + rows.length);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});