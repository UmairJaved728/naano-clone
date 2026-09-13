import puppeteer from "puppeteer-core";
import fs from "node:fs";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const OUT = "C:\\Users\\umair\\AppData\\Local\\Temp\\opencode\\naano-audit";

const hex = (rgb) => {
  if (!rgb) return rgb;
  const m = rgb.match(/rgba?\(([\d\s.,%]+)\)/);
  if (!m) return rgb;
  const parts = m[1].split(",").map((s) => s.trim());
  if (parts.length >= 3 && parts[0].includes("%")) {
    const to8 = (v) => Math.round((parseFloat(v) / 100) * 255);
    return `#${[to8(parts[0]), to8(parts[1]), to8(parts[2])].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
  }
  const to8 = (v) => Math.round(parseFloat(v));
  return `#${[to8(parts[0]), to8(parts[1]), to8(parts[2])].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
};

async function profile(page, url, label) {
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
  await page.evaluateHandle(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 3000));
  await page.screenshot({ path: `${OUT}\\${label}_top.png` });

  const data = await page.evaluate(() => {
    const hex = (rgb) => {
      if (!rgb) return rgb;
      const m = rgb.match(/rgba?\(([\d\s.,]+)\)/);
      if (!m) return rgb;
      const p = m[1].split(",").map((s) => s.trim());
      if (p.length >= 3 && p[0].includes("%")) {
        const q = [0, 1, 2].map((i) => Math.round((parseFloat(p[i]) / 100) * 255));
        return "#" + q.map((n) => n.toString(16).padStart(2, "0")).join("");
      }
      return "#" + [0, 1, 2].map((i) => Math.round(parseFloat(p[i])).toString(16).padStart(2, "0")).join("");
    };
    const s = (el) => {
      const c = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName.toLowerCase(),
        cls: (el.className && typeof el.className === "string" ? el.className : "").slice(0, 80),
        id: el.id || "",
        txt: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40),
        disp: c.display,
        pos: c.position,
        flo: c.float,
        w: Math.round(r.width),
        h: Math.round(r.height),
        maxw: c.maxWidth,
        bg: c.backgroundColor !== "rgba(0, 0, 0, 0)" ? hex(c.backgroundColor) : null,
        bgImg: c.backgroundImage && c.backgroundImage !== "none" ? c.backgroundImage.slice(0, 120) : null,
        radius: c.borderRadius !== "0px" ? c.borderRadius : null,
        border: c.borderStyle !== "none" ? `${c.borderWidth} ${c.borderStyle} ${hex(c.borderColor)}` : null,
        pad: c.padding !== "0px" ? c.padding : null,
        mar: c.margin !== "0px" ? c.margin : null,
        flex: c.flexDirection !== "row" || c.flexWrap !== "nowrap" ? `${c.flexDirection}${c.flexWrap !== "nowrap" ? "/" + c.flexWrap : ""}` : null,
        gap: c.gap !== "normal" && c.gap !== "0px" ? c.gap : null,
        justify: c.justifyContent !== "normal" ? c.justifyContent : null,
        align: c.alignItems !== "normal" ? c.alignItems : null,
        grid: c.gridTemplateColumns !== "none" ? c.gridTemplateColumns : null,
        lines: c.lineHeight !== "normal" ? c.lineHeight : null,
        color: hex(c.color),
        font: c.fontFamily.split(",")[0].replace(/"/g, ""),
        size: c.fontSize,
        weight: c.fontWeight,
        lh: c.lineHeight,
        ls: c.letterSpacing,
        ta: c.textAlign !== "start" ? c.textAlign : null,
        shad: c.boxShadow && c.boxShadow !== "none" ? c.boxShadow.slice(0, 90) : null,
        op: c.opacity && c.opacity !== "1" ? c.opacity : null,
        blur: c.backdropFilter && c.backdropFilter !== "none" ? c.backdropFilter : null,
        z: c.zIndex && c.zIndex !== "auto" ? c.zIndex : null,
        trans: c.transform && c.transform !== "none" ? c.transform.slice(0, 60) : null,
        anim: c.animationName && c.animationName !== "none" ? c.animationName : null,
      };
    };

    const root = {};
    for (const c of getComputedStyle(document.documentElement)) {
      if (c.startsWith("--")) root[c] = getComputedStyle(document.documentElement).getPropertyValue(c).trim();
    }

    const header = document.querySelector("header");
    const hero = document.querySelector("main section") || document.querySelector("main");
    const els = [];
    const walk = (el, depth) => {
      if (depth > 12 || els.length > 2200) return;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0 && !el.children.length) return;
      els.push(s(el));
      for (const ch of el.children) walk(ch, depth + 1);
    };
    if (header) walk(header, 0);
    if (hero && hero !== header) walk(hero, 0);

    const images = Array.from(document.querySelectorAll("img, [style*='background-image'], [class*='bg-']"))
      .map((el) => ({
        src: el.getAttribute("src") || null,
        bg: el.style.backgroundImage || null,
        cls: (el.className && typeof el.className === "string" ? el.className : "").slice(0, 60),
        w: Math.round(el.getBoundingClientRect().width),
        h: Math.round(el.getBoundingClientRect().height),
      }))
      .filter((i) => i.src || i.bg)
      .slice(0, 30);

    const sections = Array.from(document.querySelectorAll("main section")).map((el) => {
      const c = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        w: Math.round(r.width),
        h: Math.round(r.height),
        bg: c.backgroundColor !== "rgba(0, 0, 0, 0)" ? hex(c.backgroundColor) : null,
        pad: c.padding,
        color: hex(c.color),
        grid: c.gridTemplateColumns !== "none" ? c.gridTemplateColumns : null,
        txt: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 60),
      };
    });

    return { root, els, images, sections, bodyText: document.body.innerText.slice(0, 2000) };
  });

  fs.writeFileSync(`${OUT}\\${label}.json`, JSON.stringify(data, null, 1));
  console.log(`=== ${label} === els:${data.els.length} images:${data.images.length} sections:${data.sections.length}`);
}

async function main() {
  const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ["--no-sandbox", "--disable-gpu"] });
  const page = await browser.newPage();
  await profile(page, "https://naano.com/", "REF_DEEP");
  await profile(page, "http://localhost:3100/", "CLONE_DEEP");
  await browser.close();
}

main().catch((e) => {
  console.error("FATAL " + e.message);
  process.exit(1);
});