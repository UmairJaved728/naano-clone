import puppeteer from "puppeteer-core";
import fs from "node:fs";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const OUT = "C:\\Users\\umair\\AppData\\Local\\Temp\\opencode\\naano-audit";

const hex = (rgb) => {
  const m = rgb.match(/rgba?\(([\d\s.,]+)\)/);
  if (!m) return rgb;
  const p = m[1].split(",").map((s) => s.trim());
  return "#" + [0, 1, 2].map((i) => Math.round(parseFloat(p[i])).toString(16).padStart(2, "0")).join("");
};

async function main() {
  const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ["--no-sandbox", "--disable-gpu"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto("https://naano.com/", { waitUntil: "networkidle2", timeout: 60000 });
  await page.evaluateHandle(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 3000));

  const out = await page.evaluate(() => {
    const hex = (rgb) => {
      const m = rgb.match(/rgba?\(([\d\s.,]+)\)/);
      if (!m) return rgb;
      const p = m[1].split(",").map((s) => s.trim());
      return "#" + [0, 1, 2].map((i) => Math.round(parseFloat(p[i])).toString(16).padStart(2, "0")).join("");
    };
    const pick = (sel, root = document) => {
      const el = root.querySelector(sel);
      return style(el);
    };
    const style = (el) => {
      if (!el) return null;
      const c = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      const txt = (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 90);
      return {
        sel: (typeof el.className === "string" ? el.className : "").slice(0, 50),
        txt,
        w: Math.round(r.width), h: Math.round(r.height),
        bg: c.backgroundColor !== "rgba(0, 0, 0, 0)" ? hex(c.backgroundColor) : null,
        color: hex(c.color),
        font: c.fontFamily.split(",")[0].replace(/["']/g, ""),
        size: c.fontSize, weight: c.fontWeight, lh: c.lineHeight, ls: c.letterSpacing,
        radius: c.borderRadius,
        pad: c.padding, mar: c.margin, gap: c.gap, display: c.display,
        dir: c.flexDirection, grid: c.gridTemplateColumns,
      };
    };

    const all = (sels) => {
      const o = {};
      for (const [k, s] of Object.entries(sels)) o[k] = style(document.querySelector(s));
      return o;
    };

    const res = {};
    // hero marquee items
    const track = document.querySelector(".naano-trust-track");
    res.heroTrustItems = track
      ? Array.from(track.children).map((ch) => ({
          txt: (ch.textContent || "").replace(/\s+/g, " ").trim().slice(0, 40),
          tag: ch.tagName,
          img: ch.querySelector("img") ? ch.querySelector("img").getAttribute("src") : null,
        })).slice(0, 6)
      : null;

    // testimonial
    const t = Array.from(document.querySelectorAll("div")).find((d) => d.textContent.includes("We manage €10M+"));
    const tRoot = t && Array.from(t.parentElement.children).includes(t) ? t.parentElement : t;
    res.testi = [];
    for (const ch of tRoot.children) res.testi.push(style(ch));

    // marketplace signals inner
    const sig = document.querySelector(".lp-marketplace__signal--creators");
    res.signalCreators = {
      card: style(sig),
      imgs: sig ? Array.from(sig.querySelectorAll("img")).map((i) => i.getAttribute("src")) : [],
      copyEls: sig ? Array.from(sig.querySelectorAll(".lp-marketplace__signal-copy *")).map(style) : [],
    };
    res.signalCountries = {
      card: style(document.querySelector(".lp-marketplace__signal--countries")),
      txt: document.querySelector(".lp-marketplace__signal--countries")?.textContent.replace(/\s+/g, " ").trim(),
    };
    const sigM = document.querySelector(".lp-marketplace__signal--matching");
    res.signalMatching = {
      txt: sigM?.textContent.replace(/\s+/g, " ").trim(),
      els: sigM ? Array.from(sigM.querySelectorAll("img, span, div, p")).map(style).filter((s) => s && (s.txt || s.img)) : [],
    };

    // journey cards
    res.journey = [];
    for (const cardEl of document.querySelectorAll(".lp-journey-card")) {
      const o = { card: style(cardEl), els: [] };
      for (const el of cardEl.querySelectorAll("span, h3, p")) o.els.push(style(el));
      res.journey.push(o);
    }

    // testimonials section (Real teams)
    const real = document.querySelector(".lp-system-testimonials");
    res.testimonials = {
      block: style(real),
      h2: style(real && real.querySelector("h2")),
      intro: style(real && real.querySelector(".rv") && Array.from(real.querySelectorAll(".rv")).find((e) => e.textContent.includes("See how B2B teams"))),
      videoCard: style(real && real.querySelector(".lp-proof-card--video") || real.querySelector(".lp-proof-card")),
      caseCard: style(real && real.querySelector(".lp-proof-card--case")),
      videoTitle: style(real && Array.from(real.querySelectorAll("div")).find((d) => d.textContent.trim() === "VIDEO TESTIMONIAL")),
      caseTitle: style(real && Array.from(real.querySelectorAll("div")).find((d) => d.textContent.trim() === "CASE STUDY")),
    };

    // results
    const r = document.querySelector(".lp-system-results");
    const statEls = r ? Array.from(r.querySelectorAll(".stat-pop")) : [];
    res.statPops = statEls.map((p) => ({
      num: p.querySelector("div")?.textContent.trim(),
      label: p.querySelector("span")?.textContent.trim(),
      style: p.querySelector("div") ? style(p.querySelector("div")) : null,
    }));
    res.resultHead = style(r && r.querySelector(".rv") && Array.from(r.querySelectorAll(".rv")).find((e) => e.textContent.includes("THE RESULTS")));
    res.resultTitle = style(r && r.querySelector("h2"));
    const rg = r && r.querySelector(".lp-result-grid");
    res.resultGrid = {
      block: style(rg),
      first: rg ? style(rg.firstElementChild) : null,
      profileNames: rg ? Array.from(rg.querySelectorAll("b, span")).slice(0, 6).map(style) : [],
    };
    res.resultsTxt = r ? (r.textContent || "").replace(/\s+/g, " ").trim().slice(0, 600) : "";

    // pricing
    const p2 = document.querySelector(".lp-system-pricing");
    res.pricing = {
      block: style(p2),
      h1: style(p2 && p2.querySelector("h2")),
      copy: style(p2 && Array.from(p2.querySelectorAll(".rv")).find((e) => e.textContent.includes("pricing model")) || (p2 && p2.querySelector("p"))),
      shell: style(p2 && p2.querySelector(".lp-pricing-shell")),
      card1: style(p2 && p2.querySelector(".lp-pricing-shell > div > div:first-child")),
      card2: style(p2 && p2.querySelector(".lp-pricing-shell > div > div:last-child")),
      card1Txt: p2?.querySelector(".lp-pricing-shell > div > div:first-child")?.textContent.replace(/\s+/g, " ").trim().slice(0, 300),
      card2Txt: p2?.querySelector(".lp-pricing-shell > div > div:last-child")?.textContent.replace(/\s+/g, " ").trim().slice(0, 300),
    };

    // faq
    const fq = document.querySelector(".lp-system-faq");
    res.faq = {
      block: style(fq),
      h2: style(fq && fq.querySelector(".lp-faq-intro h2")),
      introP: style(fq && fq.querySelector(".lp-faq-intro p")),
      questions: fq ? Array.from(fq.querySelectorAll("button")).map((b) => (b.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80)) : [],
      answers: fq ? Array.from(fq.querySelectorAll("button")).map((b) => {
        const inner = style(b);
        return { q: inner.txt, h: inner.h };
      }) : [],
    };

    // book
    const bk = document.querySelector(".lp-system-book");
    res.book = {
      block: style(bk),
      h2: style(bk && bk.querySelector("h2")),
      headerTxt: bk ? bk.querySelector(".rv")?.textContent.replace(/\s+/g, " ").trim().slice(0, 200) : null,
      card: style(bk && bk.querySelector(".lp-book-card")),
      cardTxt: bk?.querySelector(".lp-book-card")?.textContent.replace(/\s+/g, " ").trim().slice(0, 400),
      footerLine: style(bk && Array.from(bk.querySelectorAll(".rv")).find((e) => e.textContent.includes("Trusted by B2B teams"))),
    };

    // footer
    const ft = document.querySelector(".lp-footer");
    res.footer = {
      block: style(ft),
      txt: ft ? (ft.textContent || "").replace(/\s+/g, " ").trim().slice(0, 600) : "",
      links: ft ? Array.from(ft.querySelectorAll("a")).map((a) => (a.textContent || "").trim().slice(0, 40)) : [],
    };

    return res;
  });

  fs.writeFileSync(`${OUT}\\REF_COPY.json`, JSON.stringify(out, null, 1));
  console.log("REF_COPY saved");
  await browser.close();
}

main().catch((e) => {
  console.error("FATAL " + e.message);
  process.exit(1);
});