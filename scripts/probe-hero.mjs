import puppeteer from "puppeteer-core";

const target = process.argv[2] || "http://localhost:3100/";

(async () => {
  const b = await puppeteer.launch({
    executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"],
  });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 1000 });
  await p.goto(target, { waitUntil: "networkidle2", timeout: 90000 });
  await p.evaluateHandle(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 2000));
  const out = await p.evaluate(() => {
    const hero = Array.from(document.querySelectorAll("section")).find(
      (s) => getComputedStyle(s).backgroundColor === "rgb(197, 235, 253)"
    );
    const links = Array.from(hero.querySelectorAll("a"));
    const primary = links.find((a) => a.textContent.trim().startsWith("Launch a campaign"));
    const secondary = links.find((a) => a.textContent.trim().startsWith("See how Naano works"));
    const r1 = primary && primary.getBoundingClientRect();
    const r2 = secondary && secondary.getBoundingClientRect();
    return {
      primary: r1 && { w: r1.width, h: r1.height, fs: getComputedStyle(primary).fontSize, fw: getComputedStyle(primary).fontWeight, f: getComputedStyle(primary).fontFamily },
      secondary: r2 && { w: r2.width, h: r2.height, fs: getComputedStyle(secondary).fontSize, fw: getComputedStyle(secondary).fontWeight },
    };
  });
  console.log(JSON.stringify(out, null, 1));
  await b.close();
})().catch((e) => {
  console.error("FATAL " + e.message);
  process.exit(1);
});