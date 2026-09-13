import puppeteer from "puppeteer-core";
import fs from "node:fs";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const OUT = "C:\\Users\\umair\\AppData\\Local\\Temp\\opencode\\naano-audit";

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

async function profile(page, url, label) {
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
  await page.evaluateHandle(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 3000));

  const out = await page.evaluate(() => {
    const hex = (rgb) => {
      if (!rgb) return rgb;
      const m = rgb.match(/rgba?\(([\d\s.,]+)\)/);
      if (!m) return rgb;
      const p = m[1].split(",").map((s) => s.trim());
      return "#" + [0, 1, 2].map((i) => Math.round(parseFloat(p[i])).toString(16).padStart(2, "0")).join("");
    };
    const line = (el, depth) => {
      const c = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      const pad = "  ".repeat(depth);
      const clsRaw = el.className && typeof el.className === "string" ? el.className : "";
      const cls = clsRaw.slice(0, 90);
      const txt = (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 38);
      const bits = [
        el.tagName.toLowerCase(),
        cls ? `.${cls}` : "",
        `w${Math.round(r.width)}`,
        r.height ? `h${Math.round(r.height)}` : "",
        c.display,
        c.position === "absolute" || c.position === "fixed" ? c.position : "",
        c.backgroundImage && c.backgroundImage !== "none" ? "bgimg" : "",
        c.backgroundColor !== "rgba(0, 0, 0, 0)" ? `bg${hex(c.backgroundColor)}` : "",
        c.borderStyle !== "none" ? `bd${c.borderWidth}|${hex(c.borderColor)}` : "",
        c.borderRadius !== "0px" ? `br${c.borderRadius}` : "",
        c.padding !== "0px" ? `p${c.padding}` : "",
        c.margin !== "0px" ? `m${c.margin}` : "",
        c.gap !== "normal" ? `g${c.gap}` : "",
        c.gridTemplateColumns !== "none" ? `gr${c.gridTemplateColumns}` : "",
        c.justifyContent !== "normal" ? `jc${c.justifyContent}` : "",
        c.alignItems !== "normal" ? `ai${c.alignItems}` : "",
        txt ? `"${txt}"` : "",
      ].filter(Boolean).join(" ");
      return `${pad}- ${bits}`;
    };
    const dump = (el, depth, max, acc) => {
      if (depth > max || acc.length > 1400) return;
      acc.push(line(el, depth));
      if (el.tagName === "svg" || el.tagName === "path" || el.tagName === "svg") return;
      for (const ch of el.children) {
        if (ch && ch.tagName) dump(ch, depth + 1, max, acc);
      }
    };
    const acc = [];
    const header = document.querySelector("header");
    dump(document.body, 0, 8, acc);
    if (header) acc.push("- —HEADER (last in DOM)—");
    return acc.join("\n");
  });

  fs.writeFileSync(`${OUT}\\${label}_tree.txt`, out);
  console.log(`=== ${label} tree saved (${out.length} chars)`);
}

async function main() {
  const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ["--no-sandbox", "--disable-gpu"] });
  const page = await browser.newPage();
  await profile(page, "https://naano.com/", "REF");
  await profile(page, "http://localhost:3100/", "CLONE");
  await browser.close();
}

main().catch((e) => {
  console.error("FATAL " + e.message);
  process.exit(1);
});