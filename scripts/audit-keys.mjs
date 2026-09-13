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
  await page.goto("https://naano.com/", { waitUntil: "networkidle2", timeout: 60000 });
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
        font: c.fontFamily.split(",")[0].replace(/"/g, ""),
        size: c.fontSize,
        weight: c.fontWeight,
        lh: c.lineHeight,
        ls: c.letterSpacing,
        ta: c.textAlign,
        radius: c.borderRadius,
        bd: c.borderStyle !== "none" ? `${c.borderWidth} ${hex(c.borderColor)}` : null,
        pad: c.padding,
        mar: c.margin,
        gap: c.gap !== "normal" ? c.gap : null,
        grid: c.gridTemplateColumns !== "none" ? c.gridTemplateColumns : null,
        display: c.display,
        shad: c.boxShadow !== "none" ? c.boxShadow.slice(0, 80) : null,
      };
    };

    const q = (s) => document.querySelector(s);
    const nav = q(".lp-nav-links");
    const out = {
      navBar: key(q("main .naano-lp > div") && qAllTopNav()),
      navLogoImg: key(q('img[src*="naano-logo-nav"]')),
    };

    function qAllTopNav() {
      const fixed = Array.from(document.querySelectorAll("div")).find(
        (d) => getComputedStyle(d).position === "fixed" && getComputedStyle(d).top === "0px" && d.querySelector('img[src*="naano-logo-nav"]')
      );
      return fixed;
    }

    const op = (arr) => arr.filter(Boolean);
    out.nav = op([
      key(qAllTopNav()),
      key(qAllTopNav() && qAllTopNav().querySelector('img[src*="naano-logo-nav"]')),
      ...Array.from(qAllTopNav() ? qAllTopNav().querySelectorAll("a") : []).slice(0, 6).map(key),
    ]);
    out.signIn = key(Array.from(document.querySelectorAll("a")).find((a) => a.textContent.trim() === "Sign in"));
    out.signUp = key(Array.from(document.querySelectorAll("a")).find((a) => a.textContent.trim() === "Sign up"));
    out.locale = key(Array.from(document.querySelectorAll("button")).find((b) => b.textContent.trim() === "EN"));

    const heroWrap = qAllTopNav() ? null : null;
    const hero = Array.from(document.querySelectorAll("div")).find((d) => getComputedStyle(d).backgroundColor === "rgb(197, 235, 253)" && d.children.length > 3);
    out.hero = key(hero);
    out.cloudImg = key(hero && hero.querySelector("img"));
    out.cloudCanvas = key(hero && hero.querySelector("canvas"));
    out.eyebrow = key(op([hero && Array.from(hero.querySelectorAll("div")).find((d) => d.textContent.trim() === "Where B2B brands work with creators" && !d.closest(".lp-marketplace"))]).pop());
    out.eyebrowChilds = hero ? Array.from(hero.children[0] && hero.children[0].querySelectorAll ? hero.children[0].children : []).map(key).filter(Boolean) : [];
    out.h1 = key(hero && hero.querySelector("h1"));
    out.h1br = key(hero && hero.querySelector("h1 span"));
    out.p = key(hero && hero.querySelector("p"));
    out.primary = key(hero && Array.from(hero.querySelectorAll("a")).find((a) => a.textContent.includes("Launch a campaign")));
    out.secondary = key(hero && Array.from(hero.querySelectorAll("a")).find((a) => a.textContent.includes("See how Naano works")));
    out.trustedRow = key(hero && Array.from(hero.querySelectorAll("div")).find((d) => d.textContent.trim() === "Trusted by modern B2B teams"));
    out.trustTrack = key(hero && hero.querySelector(".naano-trust-track"));

    const testi = Array.from(document.querySelectorAll("div")).find((d) => d.textContent.includes("We manage €10M+ of influence budget"));
    out.testi = key(testi && testi.parentElement);
    out.zmirovLogo = key(testi && testi.parentElement && testi.parentElement.querySelector("img"));
    out.blueBar = key(testi && testi.parentElement && Array.from(testi.parentElement.children).find((c) => getComputedStyle(c).backgroundColor === "rgb(37, 99, 235)"));
    out.blockquote = key(testi && testi.querySelector("blockquote"));
    out.zmirovPhoto = key(testi && testi.parentElement && testi.parentElement.querySelector('img[src*="zmirov"]') === null ? testi.parentElement.querySelector('img[src*="photo-david"]') : testi.parentElement.querySelector('img[src*="zmirov"]'));
    out.zmirovName = key(op([testi && testi.parentElement && Array.from(testi.parentElement.children).find((c) => c.textContent.trim() === "David Zmirov")]).pop());
    out.zmirovRole = key(op([testi && testi.parentElement && Array.from(testi.parentElement.children).find((c) => c.textContent.trim() === "CEO, Zmirov Communication")]).pop());

    const mkt = document.querySelector(".lp-marketplace");
    out.mktHeader = key(mkt && mkt.querySelector(".lp-marketplace__header"));
    out.mktEyebrow = key(mkt && mkt.querySelector(".lp-marketplace__eyebrow"));
    out.mktEyebrowSpan = key(mkt && mkt.querySelector(".lp-marketplace__eyebrow span"));
    out.mktTitle = key(mkt && mkt.querySelector(".lp-marketplace__title"));
    out.mktCopy = key(mkt && mkt.querySelector(".lp-marketplace__copy"));
    out.mktStage = key(mkt && mkt.querySelector(".lp-marketplace__stage"));
    out.mktShell = key(mkt && mkt.querySelector(".lp-marketplace__product-shell"));
    out.mktChrome = key(mkt && mkt.querySelector(".lp-marketplace__chrome"));
    out.mktChromeAddress = key(mkt && mkt.querySelector(".lp-marketplace__address"));
    out.mktScreen = key(mkt && mkt.querySelector(".lp-marketplace__screen"));
    out.mktScreenshot = key(mkt && mkt.querySelector(".lp-marketplace__screenshot"));
    out.mktSignals = key(mkt && mkt.querySelector(".lp-marketplace__signals"));
    out.mktSignal1 = key(mkt && mkt.querySelector(".lp-marketplace__signal--creators"));
    out.mktSignal2 = key(mkt && mkt.querySelector(".lp-marketplace__signal--countries"));
    out.mktSignal3 = key(mkt && mkt.querySelector(".lp-marketplace__signal--matching"));
    out.mktSignalCopy = key(mkt && mkt.querySelector(".lp-marketplace__signal-copy"));

    const journey = document.querySelector(".lp-journey");
    out.journey = key(journey);
    out.journeyHeader = key(journey && journey.querySelector(".lp-journey__header"));
    out.journeyEyebrow = key(journey && journey.querySelector(".lp-journey__eyebrow"));
    out.journeyTitle = key(journey && journey.querySelector("h2"));
    out.journeyCopy = key(journey && journey.querySelector(".lp-journey__header p"));
    out.journeyCard = key(journey && journey.querySelector(".lp-journey-card"));
    out.journeyStep = key(journey && journey.querySelector(".lp-journey-card__step"));
    out.journeyCardTitle = key(journey && journey.querySelector(".lp-journey-card h3"));

    const results = document.querySelector(".lp-system-results");
    out.results = key(results);
    out.resultsEyebrow = key(results && results.querySelector(".rv"));
    out.resultsEyebrowSpan = key(results && results.querySelector(".rv span"));
    out.resultsTitle = key(results && results.querySelector("h2 .rv, h2"));
    out.resultsProof = key(results && results.querySelector(".lp-results-proof"));
    out.statPop = key(results && results.querySelector(".stat-pop"));
    out.statPopNum = key(results && results.querySelector(".stat-pop div"));
    out.statPopLabel = key(results && results.querySelector(".stat-pop span"));
    out.resultCard = key(results && results.querySelector(".lp-result-grid > div") || null);
    out.resultCardHeader = key(results && results.querySelector(".lp-result-grid > div > div"));

    const pricing = document.querySelector(".lp-system-pricing");
    out.pricing = key(pricing);
    out.pricingCard = key(pricing && pricing.querySelector(".lp-pricing-shell > div > div"));
    out.pricingLabel = key(pricing && Array.from(pricing.querySelectorAll("div")).find((d) => d.textContent.trim() === "SELF-SERVE"));
    out.pricingCardTitle = key(pricing && pricing.querySelector(".lp-pricing-shell h3"));
    out.pricingRow = key(pricing && Array.from(pricing.querySelectorAll("div")).find((d) => d.textContent.trim() === "Creator marketplace access"));
    out.pricingStartFree = key(pricing && Array.from(pricing.querySelectorAll("a")).find((a) => a.textContent.includes("Start for free")));
    out.pricingBook = key(pricing && Array.from(pricing.querySelectorAll("a")).find((a) => a.textContent.includes("Book a campaign call") && !a.closest(".lp-system-book")));

    const faq = document.querySelector(".lp-system-faq");
    out.faq = key(faq);
    out.faqIntro = key(faq && faq.querySelector(".lp-faq-intro"));
    out.faqTitle = key(faq && faq.querySelector(".lp-faq-intro h2"));
    out.faqCopy = key(faq && faq.querySelector(".lp-faq-intro p"));
    out.faqItem = key(faq && faq.querySelector(".lp-faq-shell > div"));
    out.faqBtn = key(faq && faq.querySelector(".lp-faq-shell button"));

    const book = document.querySelector(".lp-system-book");
    out.book = key(book);
    out.bookTitle = key(book && book.querySelector("h2"));
    out.bookCard = key(book && book.querySelector(".lp-book-card"));
    out.bookRow = key(book && book.querySelector(".lp-book-card > div.lp-book-card"));
    out.bookBtn = key(book && Array.from(book.querySelectorAll("a")).find((a) => a.textContent.includes("Book a campaign call")));

    const foot = document.querySelector(".lp-footer");
    out.footer = key(foot);
    out.footerGrid = key(foot && foot.querySelector(".lp-footer__grid"));

    const allImgs = Array.from(document.querySelectorAll("img[src]")).map((i) => i.getAttribute("src")).filter((s) => s && s.includes("/lp/"));
    const bgUrls = [];
    for (const el of document.querySelectorAll("*")) {
      const bi = getComputedStyle(el).backgroundImage;
      if (bi && bi.includes("/lp/") && !bgUrls.includes(bi)) bgUrls.push(bi);
      if (bgUrls.length > 25) break;
    }
    out.assets = { imgs: allImgs, bgUrls };

    return out;
  });

  fs.writeFileSync(`${OUT}\\REF_KEYS.json`, JSON.stringify(keys, null, 1));
  console.log("REF_KEYS saved");
  await browser.close();
}

main().catch((e) => {
  console.error("FATAL " + e.message);
  process.exit(1);
});