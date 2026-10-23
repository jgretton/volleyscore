# SEO

Where VolleyScore stands, what to change, and why. Written 22 October 2026.

**Goal:** reach an early page of Google for the terms people use to find a
volleyball scoreboard, and be visible as a live product as well as a portfolio
piece.

**Constraint:** no appetite for writing articles. Everything below respects
that, with one clarification in "The one thing that is unavoidable".

Everything in "Where we are" was measured against the running site, not
assumed.

---

## Where we are

**The technical foundations are already good.** Title template, meta description,
canonical URLs, Open Graph with a real image, Twitter card, `WebApplication`
JSON-LD, a generated sitemap and robots.txt, and a permanent redirect from the
old `/basic-match` route. This is better than most small sites and is not where
the problem is.

**Two measured problems:**

| What | Measured |
| --- | --- |
| Visible text on `/` | 171 characters |
| Visible text on `/match` | 7 characters, the word "Loading" |

`/match` renders a loading spinner during server rendering because of the
`isClient` guard, so its HTML contains nothing else. It is currently indexable
and in the sitemap.

**The `h1` on the homepage is "Volleyscore"**, the brand name, rather than
anything describing what the page offers.

---

## What the competition looks like

Searching "volleyball scoreboard online free" returns ScoreLeader, JudgeMate,
ScoreKeeper, The Volleyball Scoreboard, VolleyScorer and others. VolleyScore
does not appear.

Every one of those is a **tool landing page with real descriptive content**.
JudgeMate's page alone spells out "auto set-end at 25 (15 in set 5), 2-point
advantage enforced, serve indicator, set history, best-of-5 match support".

This matters because it rules out a tempting shortcut. Ahrefs' free-tools
strategy says a thin tool page can win when the whole result set is thin. Here
it is not thin. The pages beating us describe themselves properly, and we do
not.

**VolleyScore already does almost everything those pages advertise.** Rally
scoring, sets to 25 with the fifth to 15, two-point advantage, timeouts, serve
indicator, set history, undo, dark mode, works offline on a phone. None of it
is stated anywhere a crawler can read.

Features competitors advertise that we genuinely lack: live sync across
devices, sharing a view link or QR code to spectators, TV display mode.

---

## What the data actually said

Search Console export, 22 October 2026, last 3 months, all countries.
Totals: 1,322 impressions and 36 clicks across the site.

**The audience is international.** The UK is the largest single country but
only 18% of impressions, and it converts worst of the major sources.

| Country | Impressions | CTR |
| --- | --- | --- |
| United Kingdom | 240 | 1.67% |
| United States | 131 | 6.87% |
| Belgium | 82 | 0% |
| Turkey | 74 | 0% |
| Germany | 59 | 0% |
| Brazil | 42 | 14.29% |

There are also non-English queries with real impressions and decent positions:
`volleyball zähler online` at position 8.6, plus Spanish, Portuguese, Turkish
and Russian equivalents. Translating is out of scope, but it confirms the
audience is not British.

**The head terms are page two, not page five.** This is better than the
earlier estimate in "What to expect", which called page one a stretch.

| Query | Impressions | Position | Clicks |
| --- | --- | --- | --- |
| volleyball scoreboard online | 110 | 11.2 | 10 |
| volleyball scoreboard | 95 | 18.0 | 0 |
| volleyball scoreboards | 67 | 28.3 | 0 |
| online volleyball scoreboard | 41 | 13.8 | 2 |
| volleyball score online | 38 | 24.9 | 0 |
| scoreboard volleyball | 36 | 19.4 | 0 |

The homepage averages position 13.27. Page one is a handful of places away,
and that is where the clicks are.

**Other findings:**

- **Brand is 23% of impressions.** `volleyscore` alone is 178. Non-brand is
  649 impressions and 15 clicks, so the real CTR problem is worse than the
  topline suggests.
- **Mobile ranks at 9.65, desktop at 22.88.** The mobile experience is
  carrying the site.
- **`/basic-match` still shows 143 impressions** at position 35 with 0 clicks.
  It 301s to `/match`, which is now noindexed, so these will disappear.
- **Ignore the livescore queries.** `volleyball livescore`, `live score
  volleyball` and similar, roughly 36 impressions, are people looking for
  scores of real matches. Wrong intent.

**Target terms for the homepage copy**, in priority order: volleyball
scoreboard, volleyball scoreboard online, online volleyball scoreboard,
volleyball scoreboards, volleyball score online, scoreboard volleyball.

They are all the same idea in different word orders, so they do not need
stuffing. They need to appear naturally in text that currently does not exist.

---

## What matters in 2026

- **AI Overviews are now a primary surface.** Pages cited there get a stronger
  signal than a blue link. Citations favour content with clear definitions,
  numbers, comparisons and step-by-step structure that extracts cleanly, and
  strongly favour pages updated in the last three to six months.
- **Client-rendered content is indexed late.** Googlebot crawls HTML first and
  queues JavaScript rendering separately. One study measured a median 313 hours
  to index JavaScript-dependent pages against 36 hours for server-rendered
  ones. This is exactly what `/match` is doing.
- **Core Web Vitals targets** are LCP under 2.5s, INP under 200ms, CLS under
  0.1, each at the 75th percentile of real users. INP is the most commonly
  failed metric, with 43% of sites over the threshold.
- **The foundations have not changed.** Crawlability, indexing, helpful content
  and internal links still decide eligibility for everything above.

---

## Changes, in priority order

### 1. Give the homepage real content
**Problem.** 171 characters cannot rank for a term where every competitor
writes a proper landing page.

**Change.** Describe what the app does and for whom. A features list covering
what is already built. A short explanation of how volleyball scoring works,
since that is what people actually search for. Keep the two match cards as the
primary action, with content below them.

**Expected effect.** The largest single improvement available. It moves the
homepage from having nothing to rank with to competing on the same basis as
the pages currently winning. It also creates text for AI Overviews to cite,
which the current page cannot offer at all.

**Cost.** Writing. Mostly a description of what already exists.

### 2. Decide what `/match` is for
**Problem.** It is indexable, in the sitemap, and serves the word "Loading". It
cannot rank on content because fully rendered it is two numbers and two team
names.

**Two options.**
- **Noindex it** and concentrate everything on the homepage as the landing
  page. Cleanest. The app stays fully usable and linkable.
- **Server-render a real shell**, so the HTML carries a heading and a
  description even before hydration. Keeps it indexable and removes the
  two-wave delay.

**Recommendation.** Noindex. It is an app surface, not a document, and the
homepage is the page we want to rank.

### 3. Make the `h1` descriptive
**Change.** "Volleyscore" becomes something like "Online Volleyball
Scoreboard", with the brand still present in the title tag and logo.

**Expected effect.** Small but free. The `h1` is a strong on-page signal and
currently spends it on a word nobody searches.

### 4. Question-and-answer structure on the page itself
**Correction to an earlier draft of this document.** It recommended `FAQPage`
structured data as "the cheapest route to being cited". That was wrong. Google
stopped showing FAQ rich results on 7 May 2026, and Search Console drops the
FAQ report in June 2026. The markup still validates and Google still uses it to
understand a page, but it produces no search result of its own any more.

**What still holds.** The *visible* question-and-answer structure is what AI
Overviews extract from, not the schema. Clear question headings with short
direct answers underneath are the format that gets cited.

**Change.** Write the scoring section as real questions with real answers in
the HTML. How many points win a set. What happens at 24-24. Why the fifth set
is different. Add `FAQPage` markup only if it is free to do so; it is a
marginal gain, not a reason to do the work.

### 5. Measure Core Web Vitals, particularly INP
**Why this app specifically.** Every point tapped triggers a store update, a
re-render and a localStorage write. INP measures exactly that kind of
interaction, it is the most failed metric on the web, and nobody has measured
ours.

**Change.** Run PageSpeed Insights on `/` and `/match` and record the field
data. Fix only what fails.

### 6. Use Search Console to aim the above
Search Console is already set up, which is the most useful input available and
better than anything that can be inferred from the outside.

**What to pull.** Performance report, last three months, and look at:
- **Queries with impressions but no clicks.** Terms Google already thinks we
  are relevant for. These are the cheapest wins, because the only gap is
  position, not eligibility.
- **Average position by query.** Anything sitting between 11 and 25 is on page
  two and worth targeting directly, since small gains there produce real
  traffic.
- **Pages report.** Confirms whether `/match` is being indexed, and what Google
  makes of a page whose content is "Loading".

**Why it matters.** It converts this document from informed guesswork into a
short list of specific terms to write the homepage around.

---

## The one thing that is unavoidable

Not wanting to write articles is a reasonable position and most of this plan
works without them. But **item 1 is not an article.** It is three or four
hundred words describing software that already exists, written once, listing
features already built.

That distinction matters because item 1 is the whole plan. Every competitor on
page one does exactly this and nothing more clever. A scoreboard with 171
characters of text cannot rank against pages that explain themselves, no matter
how good the meta tags are.

If writing that is genuinely unappealing, the honest answer is that the ceiling
drops a long way, and the realistic target becomes long, specific queries
rather than anything near "volleyball scoreboard".

---

## What to expect

Revised after seeing the Search Console data, which was more encouraging than
the original estimate.

**Realistic.** Moving the money terms from page two to page one. We are at
11.2 for "volleyball scoreboard online" and 18.0 for "volleyball scoreboard",
with impressions already coming in. The gap to page one is places, not pages,
and the thing standing in the way is that the page says nothing.

**A stretch.** Top five for "volleyball scoreboard". The sites there are
established and several are commercial, with both content and links behind
them. On-page work alone will not get there.

**The honest bottleneck.** 649 non-brand impressions produced 15 clicks.
Ranking better is most of the job, but a page that describes itself also earns
a better click-through at the same position.

**Timeframe.** Changes take weeks to show in Search Console, not days.
Indexing alone is measured in days, and position movement lags behind it.

---

## Not worth doing

- **`llms.txt`.** A 300,000-domain study found no statistically significant
  relationship with AI citation rates, Google confirmed no search system reads
  it, and the major AI crawlers fetch HTML directly instead. Costs nothing to
  add but does nothing.
- **The `keywords` meta tag.** Already present in the root layout. Google has
  ignored it since 2009. Harmless, but do not add more.
- **More meta tag polishing generally.** This is already done well. Further
  effort here has no return.

---

## Decisions taken

- **Search Console is set up.** Item 6 covers what to pull from it, and it runs
  first so it can aim everything else.
- **No articles.** An earlier draft proposed explainer content and it has been
  dropped. See "The one thing that is unavoidable" for the part that cannot be.
- **Goal is visibility as a live product**, not a content business, so the work
  concentrates on one page rather than a growing library.
- **International, not UK.** An earlier draft recommended leaning into the
  `.co.uk`. That was reasoning from the domain name with no data behind it, and
  the Search Console export on 22 October 2026 contradicted it. See "What the
  data actually said". Write neutral international English, no UK framing.
- **Copy is written by Josh.** The page structure, headings and markup get
  built with placeholders; the words get filled in afterwards.
- **Feature gaps are out of scope.** Live sync, QR share links and a TV display
  mode are real competitive gaps but they are product work, not SEO. Recorded
  at the end of `seo.todo` so they are not forgotten.

## Still open

Nothing blocking. The plan of attack lives in `seo.todo`.

## What shipped

The homepage keeps the structure it had. The description sits at the foot of
the page behind a closed disclosure: one muted line visible, the full text in
the HTML. Google's spam policy, updated May 2026, lists accordion content as a
legitimate pattern and gives collapsed text full ranking weight, so this costs
nothing in search and almost nothing on screen.

The scoring rules section was cut. It targets a different topic from
"volleyball scoreboard", which is the only thing the data shows demand for.

One correction to an earlier argument in this document: cutting the rules
because zero of 847 impressions were rules queries was partly circular, since
a page earns no impressions for content it does not have. The real reason is
that it is a second thing to rank for rather than help with the first.

---

## Sources

- [Google AI Overviews ranking factors](https://www.seo.com/blog/ai-overview-ranking-factors/)
- [How to rank in AI Overviews](https://wellows.com/blog/ai-overviews-optimization/)
- [Ahrefs: the free tools SEO strategy](https://ahrefs.com/blog/the-free-tools-seo-strategy/)
- [JavaScript SEO in 2026](https://seolinkscan.com/blog/javascript-seo-guide-2026)
- [React apps and indexing delays](https://ccbd.dev/blog/react-app-not-indexing-google-the-real-reason-and-how-i-fixed-it)
- [Core Web Vitals thresholds 2026](https://prooflytics.io/blog/core-web-vitals-thresholds-2026-lcp-inp-cls)
- [llms.txt: what the evidence shows](https://llmpulse.ai/blog/llms-txt-guide/)
- [FAQ schema after 7 May 2026](https://www.seostrategy.co.uk/learn/faq-schema-deprecation-2026-rich-result-vs-schema/)
