# News & Media — Xynaptic service reference

> 9 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Full machine-readable catalog: https://api.xynaptic.io

**How x402 works here:** `GET` any endpoint → `402 Payment Required` with the price → sign EIP-3009 (or use any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `news-eu` — $0.01

`GET https://api.xynaptic.io/v1/news-eu`

**What it does.** Xynaptic EU News v2 — structured events from Europe (last 3h): importance, lifecycle, entities, geography, sectors, multi-source verification, agent-ready actions. Refreshed every 2 hours.

**How to use.**

```
GET https://api.xynaptic.io/v1/news-eu
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `news-tech` — $0.01

`GET https://api.xynaptic.io/v1/news-tech`

**What it does.** Xynaptic Tech News v2 — structured events (AI/LLM, GPU, quantum computing, last 3h): importance, lifecycle, entities, sectors, multi-source verification, agent-ready actions. Refreshed every 2 hours.

**How to use.**

```
GET https://api.xynaptic.io/v1/news-tech
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `economy-news-fr` — free

`GET https://api.xynaptic.io/v1/economy-news-fr`

**What it does.** Xynaptic News Economy FR — the live French economy press feed: latest macro and business news from a real web

**How to use.**

```
GET https://api.xynaptic.io/v1/economy-news-fr
-> 402 Payment Required (price: free)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `news-us` — $0.01

`GET https://api.xynaptic.io/v1/news-us`

**What it does.** Xynaptic US News v2 — structured events from the United States (last 3h): importance, lifecycle, entities, sectors, multi-source verification, agent-ready actions. Refreshed every 2 hours.

**How to use.**

```
GET https://api.xynaptic.io/v1/news-us
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `news-asia` — $0.01

`GET https://api.xynaptic.io/v1/news-asia`

**What it does.** Xynaptic Asia News v2 — structured events across Asia (China, Japan, India, Korea, ASEAN, last 3h): importance, lifecycle, entities, sectors, multi-source verification, agent-ready actions. Refreshed every 2 hours.

**How to use.**

```
GET https://api.xynaptic.io/v1/news-asia
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `news-mideast` — $0.01

`GET https://api.xynaptic.io/v1/news-mideast`

**What it does.** Xynaptic Middle East News v2 — structured events (geopolitics, energy, conflicts, last 3h): importance, lifecycle, entities, sectors, multi-source verification, agent-ready actions. Refreshed every 2 hours.

**How to use.**

```
GET https://api.xynaptic.io/v1/news-mideast
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `news-russia` — $0.01

`GET https://api.xynaptic.io/v1/news-russia`

**What it does.** Xynaptic Russia News v2 — structured events (politics, economy, Ukraine war, last 3h): importance, lifecycle, entities, sectors, multi-source verification, agent-ready actions. Refreshed every 2 hours.

**How to use.**

```
GET https://api.xynaptic.io/v1/news-russia
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `news-stars` — $0.01

`GET https://api.xynaptic.io/v1/news-stars`

**What it does.** Xynaptic Stars & Awards v2 — structured events (celebrities, cinema, awards, Nobel Prize, last 3h): importance, lifecycle, entities, multi-source verification, agent-ready actions. Refreshed every 2 hours.

**How to use.**

```
GET https://api.xynaptic.io/v1/news-stars
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `news-world` — $0.02

`GET https://api.xynaptic.io/v1/news-world`

**What it does.** Xynaptic World News Briefing v2 — curated global events (importance >= medium) aggregated from all 7 Xynaptic news feeds, cross-feed deduplicated with reinforced verification. The executive briefing for busy agents. Refreshed every 2 hours.

**How to use.**

```
GET https://api.xynaptic.io/v1/news-world
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
