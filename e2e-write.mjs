import puppeteer from "puppeteer-core";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const BASE = "http://localhost:3100";

const step = (m) => console.log("[STEP] " + m);

async function login(page, email) {
  await page.waitForSelector("input[placeholder*='you@company.com']", { timeout: 20000 });
  await new Promise((r) => setTimeout(r, 500));
  await page.click("input[placeholder*='you@company.com']", { clickCount: 3 });
  await page.type("input[placeholder*='you@company.com']", email);
  await page.click("input[placeholder*='Enter your password']", { clickCount: 3 });
  await page.type("input[placeholder*='Enter your password']", "Naano-demo-2026!");
  await page.waitForFunction(
    () => Array.from(document.querySelectorAll("button")).some((b) => b.textContent.trim().startsWith("Sign in")),
    { timeout: 10000 },
  );
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll("button")).find((x) => x.textContent.trim().startsWith("Sign in"));
    b.click();
  });
  await page.waitForFunction(() => location.pathname === "/dashboard", { timeout: 25000 });
}

async function main() {
  const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ["--no-sandbox", "--disable-gpu"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 1000 });

  const waitText = async (text, timeout = 20000) => {
    await page.waitForFunction((t) => document.body.innerText.includes(t), { timeout }, text);
  };
  const clickBtn = async (label, timeout = 20000) => {
    await page.waitForFunction(
      (t) => Array.from(document.querySelectorAll("button")).some((b) => b.textContent.replace(/\s+/g, " ").trim().startsWith(t)),
      { timeout },
      label,
    );
    await page.evaluate((t) => {
      const btn = Array.from(document.querySelectorAll("button")).find((b) => b.textContent.replace(/\s+/g, " ").trim().startsWith(t));
      btn.click();
    }, label);
    await new Promise((r) => setTimeout(r, 400));
  };

  step("brand login");
  await page.goto(`${BASE}/login`);
  await login(page, "brand@naano.com");

  step("open new campaign wizard");
  await page.goto(`${BASE}/dashboard/campaigns/new`);
  await page.waitForSelector("input[placeholder*='Q4 SEO']", { timeout: 20000 });
  await new Promise((r) => setTimeout(r, 900));
  await page.type("input[placeholder*='Q4 SEO']", "E2E Test Campaign");
  await page.type("textarea[placeholder*='Drive 300']", "Drive 50 signups from a B2B SaaS audience");

  step("continue to brief");
  await clickBtn("Continue to AI brief");
  await waitText("Generate brief with AI");
  await clickBtn("Generate brief with AI");
  await waitText("Generated ✓", 25000);

  step("choose creators");
  await clickBtn("Choose creators");
  await page.waitForFunction(
    () => Array.from(document.querySelectorAll("button")).some((b) => b.textContent.includes("Fit ")),
    { timeout: 15000 },
  );
  await page.evaluate(() => {
    const card = Array.from(document.querySelectorAll("button")).find((b) => b.textContent.includes("Robin Tempe"));
    card.click();
  });
  await waitText("1 creator selected");

  step("launch campaign");
  await clickBtn("Launch campaign");
  await page.waitForFunction(() => location.pathname.startsWith("/dashboard/campaigns/"), { timeout: 30000 });
  const detailUrl = page.url();
  step("launched: " + detailUrl);

  step("advance through states");
  for (const s of ["Send brief", "Approve draft", "Mark live", "Pay & approve"]) {
    step("  click " + s);
    await clickBtn(s, 25000);
    await new Promise((r) => setTimeout(r, 1200));
  }
  await waitText("Paid ✓", 25000);
  step("creator is Paid");

  step("payments page");
  await page.goto(`${BASE}/dashboard/payments`);
  await waitText("Payment history");
  const payText = await page.evaluate(() => document.body.innerText);
  const hasSent = /(Sent|€\d+)/.test(payText);

  step("creator login + opportunities");
  const p2 = await browser.newPage();
  await p2.goto(`${BASE}/login`);
  await login(p2, "creator@naano.com");
  await p2.waitForFunction(() => document.body.innerText.includes("E2E Test Campaign"), { timeout: 20000 });

  console.log("\nRESULTS");
  console.log("launch_uri=" + detailUrl);
  console.log("paid_ok=yes");
  console.log("payments_row=" + hasSent);
  console.log("creator_opportunity=yes");
  console.log("ALL_OK");
  await browser.close();
  process.exit(0);
}

main().catch((e) => {
  console.error("E2E ERROR: " + (e && e.message ? e.message : String(e)));
  process.exit(1);
});