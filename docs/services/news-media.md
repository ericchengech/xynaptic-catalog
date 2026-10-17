# News — Xynaptic service reference

> 8 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works:** `GET` any endpoint → `402 Payment Required` → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `news-eu` — $0.01

`GET https://api.xynaptic.io/v1/news-eu`

**What it does.**

structured events from Europe (last 3h): importance, lifecycle, entities, geography, sectors, m

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

**What it does.**

structured events (AI/LLM, GPU, quantum computing, last 3h): importance, lifecycle, entities, s

**How to use.**

```
GET https://api.xynaptic.io/v1/news-tech
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `news-us` — $0.01

`GET https://api.xynaptic.io/v1/news-us`

**What it does.**

structured events from the United States (last 3h): importance, lifecycle, entities, sectors, m

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

**What it does.**

structured events across Asia (China, Japan, India, Korea, ASEAN, last 3h): importance, lifecyc

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

**What it does.**

structured events (geopolitics, energy, conflicts, last 3h): importance, lifecycle, entities, s

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

**What it does.**

structured events (politics, economy, Ukraine war, last 3h): importance, lifecycle, entities, s

**How to use.**

```
GET https://api.xynaptic.io/v1/news-russia
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `news-world` — $0.02

`GET https://api.xynaptic.io/v1/news-world`

**What it does.**

curated global events (importance >= medium) aggregated from all 7 Xynaptic news feeds, cross-f

**How to use.**

```
GET https://api.xynaptic.io/v1/news-world
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `news-stars` — $0.01

`GET https://api.xynaptic.io/v1/news-stars`

**What it does.**

structured events (celebrities, cinema, awards, Nobel Prize, last 3h): importance, lifecycle, e

**How to use.**

```
GET https://api.xynaptic.io/v1/news-stars
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
