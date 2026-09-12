import puppeteer from "puppeteer-core";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

async function getStyles(page, url) {
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
  await page.evaluateHandle(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 2500));

  return page.evaluate(() => {
    const cs = (el) => {
      if (!el) return null;
      const s = getComputedStyle(el);
      return {
        bg: s.backgroundColor,
        color: s.color,
        font: s.fontFamily,
        size: s.fontSize,
        weight: s.fontWeight,
        ls: s.letterSpacing,
        radius: s.borderRadius,
        padding: s.padding,
        border: s.borderColor + " " + s.borderWidth,
        text: (el.textContent || "").trim().slice(0, 60),
      };
    };

    const rootVars = {};
    for (const c of getComputedStyle(document.documentElement)) {
      if (c.startsWith("--")) rootVars[c] = getComputedStyle(document.documentElement).getPropertyValue(c).trim();
    }

    const pills = Array.from(document.querySelectorAll("main a, main button, nav a, nav button, header a, header button"))
      .map((el) => {
        const s = getComputedStyle(el);
        const r = s.borderRadius;
        if (r !== "999px" && r !== "1000px" && r !== "50%") return null;
        const bg = s.backgroundColor;
        if (!bg || bg === "rgba(0, 0, 0, 0)" || bg === "transparent") return null;
        return cs(el);
      })
      .filter(Boolean)
      .slice(0, 12);

    const nav = Array.from(document.querySelectorAll("nav a, nav button, header a, header button"))
      .map(cs)
      .slice(0, 8);

    const sections = [];
    for (const el of document.querySelectorAll("main section")) {
      sections.push(cs(el));
    }

    const head1 = cs(document.querySelector("h1"));
    const heads = { h1: head1, h2: cs(document.querySelector("h2")), h3: cs(document.querySelector("h3")), p: cs(document.querySelector("main p")) };

    const darkSections = [];
    for (const el of document.querySelectorAll("main section, main div")) {
      const bg = getComputedStyle(el).backgroundColor;
      const m = bg.match(/\d+/g);
      if (!m) continue;
      const [r, g, b] = m.map(Number);
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      if (lum < 70) {
        const rect = el.getBoundingClientRect();
        if (rect.height > 200) darkSections.push(cs(el));
      }
    }

    return { rootVars, fonts: Array.from(document.fonts).map((f) => `${f.family}/${f.weight}/${f.style}`).slice(0, 12), pills, nav, heads, darkSections: darkSections.slice(0, 5), sections: sections.slice(0, 8) };
  });
}

async function main() {
  const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ["--no-sandbox", "--disable-gpu"] });
  const page = await browser.newPage();

  for (const [label, url] of [
    ["REF_HOME", "https://naano.com/"],
    ["REF_CREATORS", "https://naano.com/creators"],
    ["REF_PRICING", "https://naano.com/pricing"],
    ["CLONE_HOME", "http://localhost:3100/"],
    ["CLONE_CREATORS", "http://localhost:3100/creators"],
  ]) {
    try {
      const s = await getStyles(page, url);
      console.log("====" + label + "====");
      console.log(JSON.stringify(s, null, 0));
    } catch (e) {
      console.log("====" + label + "==== ERROR " + e.message);
    }
  }
  await browser.close();
}

main().catch((e) => {
  console.error("FATAL " + e.message);
  process.exit(1);
});