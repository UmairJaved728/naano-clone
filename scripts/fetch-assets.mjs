import fs from "node:fs";
import path from "node:path";

const BASE = "https://naano.com";
const ROOT = "C:\\Users\\umair\\Desktop\\naano-clone\\public\\lp";

const files = [
  "naano-logo-nav.png",
  "hero-clouds-cotton-blue-v7.png",
  "marketplace-atmosphere-v1.png",
  "marketplace-screenshot-clean-v2.png",
  "journey-cloud-current-v1.png",
  "results-metrics-clouds-v2.png",
  "logo-zmirov.png",
  "photo-david-zmirov.png",
  "logo-blogseo.png",
  "logo-lemlist.png",
  "logo-folk.png",
  "logo-leadbay.png",
  "logo-ringover.png",
  "logo-attio.jpg",
  "logo-lagrowthmachine.png",
  "logo-gojiberry.png",
  "logo-chatseo.png",
  "logo-abyssale.png",
  "cloud-layer-bottom-v1.png",
  "avatar-a.png",
  "avatar-b.png",
  "avatar-c.png",
  "avatar-d.png",
  "avatar-e.png",
  "avatar-f.png",
  "avatar-g.png",
  "avatar-h.png",
];

fs.mkdirSync(ROOT, { recursive: true });

const seen404 = [];
let ok = 0;
let fail = 0;

for (const f of files) {
  const out = path.join(ROOT, f);
  try {
    const res = await fetch(`${BASE}/lp/${f}`);
    if (!res.ok) {
      seen404.push(f);
      fail++;
      console.log(`404 ${f}`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(out, buf);
    console.log(`OK ${f} ${buf.length} bytes`);
    ok++;
  } catch (e) {
    fail++;
    console.log(`ERR ${f} ${e.message}`);
  }
}

console.log(`\ndone ok=${ok} fail=${fail}`);
if (seen404.length) console.log("404s: " + seen404.join(", "));