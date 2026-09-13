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

async function main() {
  const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ["--no-sandbox", "--disable-gpu"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto("http://localhost:3100/", { waitUntil: "networkidle2", timeout: 60000 });
  await page.evaluateHandle(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 3000));

  const keys = await page.evaluate(() => {
    const hex = (rgb) => {
      const m = rgb.match(/rgba?\(([\d\s.,]+)\)/);
      if (!m) return rgb;
      const p = m[1].split(",").map((s) => s.trim());
      return "#" + [0, 1, 2].map((i) => Math.round(parseFloat(p[i])).toString(16).padStart(2, "0")).join("");
    };
    const key = (el) => {
      if (!el) return null;
      const c = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName.toLowerCase(),
        sel: (el.className && typeof el.className === "string" ? el.className : el.id).slice(0, 60),
        w: Math.round(r.width),
        h: Math.round(r.height),
        bg: c.backgroundColor !== "rgba(0, 0, 0, 0)" ? hex(c.backgroundColor) : null,
        bgImg: c.backgroundImage !== "none" ? c.backgroundImage.slice(0, 160) : null,
        color: hex(c.color),
        size: c.fontSize,
        weight: c.fontWeight,
        lh: c.lineHeight,
        ls: c.letterSpacing,
        radius: c.borderRadius,
        bd: c.borderStyle !== "none" ? `${c.borderWidth} ${hex(c.borderColor)}` : null,
        pad: c.padding,
        gap: c.gap !== "normal" ? c.gap : null,
        grid: c.gridTemplateColumns !== "none" ? c.gridTemplateColumns : null,
        display: c.display,
      };
    };
    const op = (arr) => arr.filter(Boolean).pop();
    const q = (s) => document.querySelector(s);
    const find = (fn) => op(Array.from(document.querySelectorAll("*")).filter(fn));

    const fixedTop = () =>
      find((d) => getComputedStyle(d).position === "fixed" && getComputedStyle(d).top === "0px" && d.querySelector && d.querySelector('img[src*="naano-logo-nav"]'));
    const navTop = fixedTop();
    const navBar = navTop && Array.from(navTop.children).find((c) => getComputedStyle(c).backgroundColor === "rgb(197, 235, 253)");

    const out = {
      nav: op([
        key(navBar),
        key(navTop && navTop.querySelector('img[src*="naano-logo-nav"]')),
        ...Array.from(navBar ? navBar.querySelectorAll("a") : []).slice(0, 6).map(key),
      ]),
      signIn: key(find((a) => a.tagName === "A" && a.textContent.trim() === "Sign in")),
      signUp: key(find((a) => a.tagName === "A" && a.textContent.trim() === "Sign up")),
      locale: key(find((b) => b.tagName === "BUTTON" && b.textContent.trim() === "EN")),
    };
    out.navBar = out.nav[0];

    const hero = find((d) => getComputedStyle(d).backgroundColor === "rgb(197, 235, 253)" && d.children.length > 3);
    out.hero = key(hero);
    out.cloudImg = key(hero && hero.querySelector("img"));
    out.eyebrow = key(find((d) => d.textContent.trim() === "Where B2B brands work with creators"));
    out.h1 = key(hero && hero.querySelector("h1"));
    out.p = key(hero && hero.querySelector("p"));
    out.primary = key(hero && find((a) => a.textContent.includes("Launch a campaign")));
    out.secondary = key(hero && find((a) => a.textContent.includes("See how Naano works")));
    out.trustedRow = key(find((d) => d.textContent.trim() === "Trusted by modern B2B teams"));
    out.marqueeTrack = key(hero && hero.querySelector(".marquee-track"));
    out.marqueeLabel = key(find((d) => d.textContent.trim() === "CASE STUDY"));
    out.marqueeLogo = key(find((i) => i.tagName === "IMG" && i.getAttribute("src") && i.getAttribute("src").includes("logo-blogseo")) && hero);

    const testi = find((d) => d.textContent.includes("We manage €10M+"));
    out.testi = key(testi && (testi.closest("section") || testi.parentElement));
    const testiSec = testi ? testi.closest("section") : null;
    out.zmirovLogo = key(testiSec && testiSec.querySelector('img[src*="logo-zmirov"]'));
    out.blueBar = key(testiSec && Array.from(testiSec.children).find((c) => getComputedStyle(c).backgroundColor === "rgb(37, 99, 235)"));
    out.blockquote = key(testiSec && testiSec.querySelector("blockquote"));
    out.zmirovPhoto = key(testiSec && testiSec.querySelector('img[src*="photo-david"]'));
    out.zmirovName = key(testiSec && find((d) => d.textContent.trim() === "David Zmirov" && testiSec.contains(d)));
    out.zmirovRole = key(testiSec && find((d) => d.textContent.trim() === "CEO, Zmirov Communication" && testiSec.contains(d)));

    const mkt = find((s) => s.tagName === "SECTION" && s.querySelector('h2') && s.querySelector("h2").textContent.includes("Work with all the best creators"));
    out.mktHeader = key(mkt && mkt.querySelector("header"));
    out.mktEyebrow = key(mkt && find((d) => mkt.contains(d) && d.textContent.trim() === "The Naano creator marketplace"));
    out.mktEyebrowSpan = key(mkt && find((d) => mkt.contains(d) && d.textContent.trim() === "The Naano creator marketplace"));
    out.mktTitle = key(mkt && mkt.querySelector("h2"));
    out.mktCopy = key(mkt && mkt.querySelector("header p"));
    out.mktStage = key(mkt && find((d) => mkt.contains(d) && getComputedStyle(d).borderRadius === "43.2px"));
    out.mktShell = key(mkt && find((d) => mkt.contains(d) && getComputedStyle(d).borderRadius === "25px" && d.querySelector("img")));
    out.mktChrome = key(mkt && find((d) => mkt.contains(d) && getComputedStyle(d).height === "45px"));
    out.mktChromeAddress = key(mkt && find((d) => mkt.contains(d) && d.textContent.trim() === "naano.co/marketplace"));
    out.mktScreenshot = key(mkt && find((i) => mkt.contains(i) && i.tagName === "IMG" && i.getAttribute("src") && i.getAttribute("src").includes("marketplace-screenshot")));
    out.mktSignals = key(mkt && find((d) => mkt.contains(d) && d.textContent.includes("3,000+ vetted creators") && d.children.length >= 3));
    out.mktSignal1 = key(mkt && find((d) => mkt.contains(d) && d.textContent.trim().includes("3,000+ vetted creators") && d.tagName === "ARTICLE"));
    out.mktSignalCard = key(mkt && mkt.querySelector("article"));
    out.mktSignalCopy = key(mkt && find((d) => mkt.contains(d) && d.textContent.trim() === "3,000+ vetted creators"));

    const journey = find((s) => s.tagName === "SECTION" && s.id === "how-it-works");
    out.journey = key(journey);
    out.journeyHeader = key(journey && journey.querySelector("header"));
    out.journeyEyebrow = key(journey && find((d) => journey.contains(d) && d.textContent.includes("ONE PLATFORM, FROM BRIEF TO RESULTS")));
    out.journeyTitle = key(journey && journey.querySelector("h2"));
    out.journeyCopy = key(journey && journey.querySelector("header p"));
    out.journeyCard = key(journey && journey.querySelector("article"));
    out.journeyStep = key(journey && find((d) => journey.contains(d) && d.textContent.trim() === "01"));
    out.journeyCardTitle = key(journey && journey.querySelector("article h3"));

    const results = find((s) => s.tagName === "SECTION" && [...s.querySelectorAll("p")].some((p) => p.textContent.trim() === "THE RESULTS"));
    out.results = key(results);
    out.resultsEyebrow = key(results && find((d) => results.contains(d) && d.textContent.trim() === "THE RESULTS"));
    out.resultsTitle = key(results && results.querySelector("h2"));
    out.resultsProof = key(results && find((d) => results.contains(d) && d.querySelector && d.querySelector('img[src*="results-metrics-clouds"]') && getComputedStyle(d).borderRadius === "34px"));
    out.statPop = key(results && find((d) => results.contains(d) && d.textContent.trim().startsWith("5M+") && getComputedStyle(d).display === "flex"));
    out.statPopNum = key(results && find((d) => results.contains(d) && d.textContent.trim() === "5M+" && getComputedStyle(d).fontSize === "54px"));
    out.statPopLabel = key(results && find((d) => results.contains(d) && d.textContent.trim() === "Impressions generated"));
    out.resultCard = key(results && results.querySelector('article[class*="rounded-[26px]"]'));
    out.resultCardHeader = key(results && results.querySelector("article .border-b"));

    const pricing = find((s) => s.tagName === "SECTION" && s.id === "pricing");
    out.pricing = key(pricing);
    out.pricingCard = key(pricing && pricing.querySelector('div[class*="rounded-[28px]"]'));
    out.pricingLabel = key(pricing && find((d) => pricing.contains(d) && d.textContent.trim() === "SELF-SERVE"));
    out.pricingCardTitle = key(pricing && pricing.querySelector("h3"));
    out.pricingRow = key(pricing && find((d) => pricing.contains(d) && d.textContent.trim() === "Creator marketplace access"));
    out.pricingStartFree = key(pricing && find((a) => pricing.contains(a) && a.tagName === "A" && a.textContent.includes("Start for free")));
    out.pricingBook = key(pricing && find((a) => pricing.contains(a) && a.tagName === "A" && a.textContent.trim().startsWith("Book a campaign call")));

    const faq = find((s) => s.tagName === "SECTION" && s.id === "faq");
    out.faq = key(faq);
    out.faqIntro = key(faq && faq.querySelector('div[class*="sticky"]'));
    out.faqTitle = key(faq && faq.querySelector("h2"));
    out.faqCopy = key(faq && find((d) => faq.contains(d) && d.textContent.trim() === "Everything you need to know before getting started."));
    out.faqItem = key(faq && faq.querySelector('div[class*="border-t"]'));
    out.faqBtn = key(faq && find((d) => faq.contains(d) && d.tagName === "BUTTON" && d.textContent.includes("What is Naano?")));

    const book = find((s) => s.tagName === "SECTION" && [...s.querySelectorAll("h2")].some((h) => h.textContent.includes("next creator campaign starts here")));
    out.book = key(book);
    out.bookTitle = key(book && book.querySelector("h2"));
    out.bookCard = key(book && find((d) => book.contains(d) && d.textContent.includes("CAMPAIGN STRATEGY CALL") && d.querySelector("a")));
    out.bookRow = key(book && find((d) => book.contains(d) && d.textContent.trim() === "Creator strategy"));
    out.bookBtn = key(book && find((a) => book.contains(a) && a.tagName === "A" && a.textContent.trim().startsWith("Book a campaign call")));

    const foot = document.querySelector("footer");
    out.footer = key(foot);
    out.footerGrid = key(foot && find((d) => foot.contains(d) && (getComputedStyle(d).gridTemplateColumns || "").split(" ").length >= 5 && [...d.children].every((c) => c.tagName === "DIV")));

    const allImgs = Array.from(document.querySelectorAll("img[src]")).map((i) => i.getAttribute("src")).filter((s) => s && s.includes("/lp/"));
    out.assets = { imgs: allImgs };

    return out;
  });

  fs.writeFileSync(`${OUT}\\CLONE_KEYS.json`, JSON.stringify(keys, null, 1));
  console.log("CLONE_KEYS saved");

  const ref = JSON.parse(fs.readFileSync(`${OUT}\\REF_KEYS.json`, "utf8"));
  try {
    const ck = JSON.parse(fs.readFileSync(`${OUT}\\CLONE_KEYS.json`, "utf8"));
    console.log("\n== DRIFT REPORT (clone vs ref) ==");
    const fields = ["w", "h", "size", "weight", "lh", "ls", "radius", "bg"];
    const compare = (name, refVal, cloneVal) => {
      if (!refVal || !cloneVal) return;
      const d = [];
      for (const f of fields) {
        const a = refVal[f];
        const b = cloneVal[f];
        if (a === undefined || b === undefined || a === null || b === null) continue;
        const na = parseFloat(String(a));
        const nb = parseFloat(String(b));
        let ok;
        if (Number.isNaN(na) || Number.isNaN(nb)) ok = String(a) === String(b);
        else ok = Math.abs(na - nb) <= 3;
        if (!ok) d.push(`${f}: ref=${a} clone=${b}`);
      }
      if (d.length) {
        console.log(`[DIFF] ${name}: ${d.join("  ")}`);
      }
    };
    for (const k of Object.keys(ck)) {
      if (Array.isArray(ck[k])) continue;
      if (ref[k]) compare(k, ref[k], ck[k]);
    }
    const mk = (es) => {
      const m = {};
      for (const e of es || []) for (const f of fields) {
        const v = e && e[f];
        if (v !== undefined && v !== null && f === "size" && parseFloat(v)) m[f] = parseInt(v, 10);
        else if (v !== undefined && v !== null) m[f] = v;
      }
      return m;
    };
    if (Array.isArray(ref.nav) && Array.isArray(ck.nav)) {
      ref.nav.slice(1).forEach((r, i) => {
        const c = ck.nav[i + 1];
        compare(`nav[${i + 1}]`, r, c);
      });
    }
  } catch (e) {
    console.log("compare skipped", e.message);
  }
  await browser.close();
}

main().catch((e) => {
  console.error("FATAL " + e.message);
  process.exit(1);
});