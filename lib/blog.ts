export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  topic: string;
  hero: string;
  body: { heading?: string; text: string }[];
}

export const posts: BlogPost[] = [
  {
    slug: "launch-b2b-linkedin-creator-campaign",
    title: "Launch a B2B LinkedIn creator campaign in 7 days (the playbook)",
    excerpt:
      "From brief to first post live: the exact steps we use to launch a creator campaign in a week, with the budget and roles you actually need.",
    author: "Thomas Marcelle",
    date: "2026-09-02",
    readTime: "8 min",
    topic: "Creator-led growth",
    hero: "from-blue-600 to-indigo-600",
    body: [
      { heading: "Why creator campaigns compress to a week", text: "A creator campaign is not an ad campaign. You are not reserving inventory — you are booking a person. Once you stop treating creators as media slots and start treating them as partners, the whole timeline flattens." },
      { heading: "The 7-day launch", text: "Day 1: pick the outcome (trials, signups, pipeline) and the audience. Day 2: write a one-page brief using the AI builder in Naano. Day 3: invite 10–15 creators, sorted by audience fit. Day 4: close the top 5 at a fixed per-post price. Days 5–6: creators submit drafts, you approve. Day 7: first posts go live with tracking links." },
      { heading: "Budget reality", text: "Most B2B campaigns on Naano run between €1,000 and €5,000 with 3–8 creators at €150–€900 per post. You only pay for posts that actually go live." },
      { heading: "What most teams miss", text: "Attribution. If you cannot tie a click back to a post, your creator channel will never survive the next board meeting. Put a tracking link on every post before it goes live." },
    ],
  },
  {
    slug: "b2b-influencer-marketing-cost",
    title: "B2B influencer marketing cost: what creators charge in 2026",
    excerpt:
      "Real price data from 300+ Naano bookings — what micro and mid-size B2B creators charge per LinkedIn post, and how to budget.",
    author: "Alexis Jarre",
    date: "2026-08-20",
    readTime: "6 min",
    topic: "CPL economics",
    hero: "from-violet-500 to-purple-600",
    body: [
      { text: "Across the 300+ creator bookings we tracked this quarter, the median price for a B2B LinkedIn post is €320. The range is wide: niche voices at ~1,000 followers publish for under €50, while established creators in hot verticals (AI, GTM) charge €1,000+. What actually moves price is audience overlap with B2B buyers — not follower count." },
      { heading: "Price bands by following", text: "1K–5K followers: €20–€80. 5K–20K: €80–€250. 20K–50K: €250–€900. 50K+: €900–€1,500+. These are the creator-set prices we see on Naano; they are fixed, published before you book, and only charged when the post goes live." },
      { heading: "The real metric: CPCL", text: "Ignore CPM. Track cost per engaged lead. Micro creators routinely beat bigger accounts on clicks and leads per euro because their audience is niche. A €120 post from a 9K-follower RevOps voice can out-produce a €1,200 post from a generalist with five times the reach." },
    ],
  },
  {
    slug: "how-to-pay-b2b-creators",
    title: "How to pay B2B creators (and keep them posting for you)",
    excerpt:
      "The invisible problem in influencer marketing is a broken payout. Here's the payment process that keeps relationships alive.",
    author: "Justine Namour",
    date: "2026-08-08",
    readTime: "5 min",
    topic: "Operations",
    hero: "from-emerald-500 to-teal-600",
    body: [
      { text: "Creators do not stop working for brands that pay badly — they stop working for brands that pay late. If payment happens automatically when content is approved, and it happens within 24 hours, you have removed the single biggest cause of churn in influencer relations." },
      { heading: "Pay on approval, not on publish", text: "The moment you approve a creator's draft, the payout should trigger. Waiting until the post goes live leaves money hostage to scheduling; paying on approval ties the creator to the brief without making them your accountant." },
      { heading: "One payout rail", text: "Run everything through a single payout provider (Stripe Connect, SEPA). Creators keep one account to look at, and your finance team sees one line per deal instead of chasing invoices from ten individuals." },
      { heading: "Never make the creator invoice you", text: "Invoice-based payment is the fastest way to make creators resent the relationship. Structure it so payment is the easy, automatic part — and keep the conversation on the content." },
    ],
  },
  {
    slug: "creator-led-growth-b2b",
    title: "Creator-led growth for B2B: a real channel, not a trend",
    excerpt:
      "Why the teams winning B2B demand are buying trust at the individual level, and how to structure a creator channel that compounds.",
    author: "Thomas Marcelle",
    date: "2026-07-28",
    readTime: "9 min",
    topic: "Creator-led growth",
    hero: "from-amber-500 to-orange-600",
    body: [
      { heading: "Trust is the acquisition channel", text: "A buyer makes a shortlist based on other people's judgment. Your ads run beside that judgment; creators are part of it. Creator-led growth treats the creators your buyers already follow as the channel — and everything else as the amplifier." },
      { heading: "It compounds like content, not like ads", text: "Every post is a permanent asset: it keeps ranking, keeps being shared, and keeps sending clicks long after a campaign label says 'ended'. Teams that run 10+ campaigns see their cost per lead from the channel fall every quarter as their creator graph matures." },
      { heading: "Structure for compounding", text: "Use the same handful of creators repeatedly rather than buying reach fresh each month. Brief for your category, measure per post, and keep every creator's best-performing briefs as a swipe file for the next campaign." },
    ],
  },
  {
    slug: "nano-vs-macro-creators-b2b-ctr",
    title: "Micro vs macro creators in B2B: the CTR data",
    excerpt:
      "We compared click-through rates across 200 sponsored posts. Micro creators outperformed macro on CTR in every vertical. Here's the data.",
    author: "Justine Namour",
    date: "2026-07-10",
    readTime: "7 min",
    topic: "Data & benchmarks",
    hero: "from-rose-500 to-pink-600",
    body: [
      { text: "In a sample of 200 sponsored B2B posts on LinkedIn, creators under 20,000 followers averaged a 0.85% click-through rate on sponsorship links — against 0.41% for creators above 50,000 followers. The pattern held in every vertical we looked at: sales-tech, DevOps and HR-tech." },
      { heading: "Why micro wins on CTR", text: "Recommendation strength. A 2K follower's post reads as a peer talking to a peer; a 100K account reads as media. Buyers click recommendations more than they click broadcasts. Followers are reach, but CTR is relevance." },
      { heading: "Where macro still wins", text: "Awareness. If the goal is impressions across a broad market, macro creators deliver reach in weeks that micro networks take months to build. The best programs use both: micro for pipeline, macro for category." },
    ],
  },
  {
    slug: "linkedin-ads-vs-creator-led-cpl",
    title: "LinkedIn Ads vs creator-led CPL: what we measured",
    excerpt:
      "Running both channels in parallel for the same ICP, we saw creator-led CPL fall below LinkedIn Ads CPL after 6 weeks — and stay there.",
    author: "Alexis Jarre",
    date: "2026-06-22",
    readTime: "6 min",
    topic: "CPL economics",
    hero: "from-cyan-500 to-sky-600",
    body: [
      { heading: "The benchmark", text: "For a B2B SaaS targeting RevOps buyers, LinkedIn Ads delivered a consistent €45–€60 cost per signup. The same ICP driven by creator posts started around €70, then crossed below ads after the third campaign and settled at €28–€35 by week eight." },
      { heading: "What is really happening", text: "Creator posts earn credibility that makes the click convert better, and they keep working after the campaign — so volume keeps arriving at zero marginal spend. Ads stop the moment you stop paying." },
      { heading: "The practical takeaway", text: "Use ads for predictable always-on volume and scale the creator channel for the compounding part. The winning motion is both running on separate attribution." },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export const topics = [
  "All",
  "Creator-led growth",
  "CPL economics",
  "Data & benchmarks",
  "Operations",
];