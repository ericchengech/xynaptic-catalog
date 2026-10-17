# Industrial & Commodities — Xynaptic service reference

> 10 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works:** `GET` any endpoint → `402 Payment Required` with the price → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `commodity-price` — $0.02

`GET https://api.xynaptic.io/v1/commodity-price — `(asset ou assets)``

**What it does.** Xynaptic Commodity Price — live commodity prices: Brent, WTI, natural gas, copper, aluminum, gold, silver, platinum, palladium, lithium, coal, wheat and 20+ more, with daily change. GET ?asset=copper (or ?assets=copper,gold). Live futures data.

**How to use.**

```
GET https://api.xynaptic.io/v1/commodity-price (asset ou assets)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `industrial-energy` — $0.02

`GET https://api.xynaptic.io/v1/industrial-energy — `(region?)``

**What it does.** Xynaptic Industrial Energy — energy costs for industrial users: spot electricity prices, gas prices, and the energy transition context — what energy costs mean for production. GET ?region=fr.

**How to use.**

```
GET https://api.xynaptic.io/v1/industrial-energy (region?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `industrial-factory-status` — $0.02

`GET https://api.xynaptic.io/v1/industrial-factory-status`

**What it does.** Xynaptic Factory Status — the publicly known state of an industrial site: press mentions, company registry (active?), recent announcements. GET ?site=Nom+d+usine. Public information composite — not internal telemetry.

**How to use.**

```
GET https://api.xynaptic.io/v1/industrial-factory-status
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `industrial-logistics-risk` — $0.03

`GET https://api.xynaptic.io/v1/industrial-logistics-risk`

**What it does.** Xynaptic Logistics Risk — current logistics disruptions affecting French/European flows: rail strikes (SNCF official data), sector press, + your specific route analysis. GET ?mode=rail (or POST a route description).

**How to use.**

```
GET https://api.xynaptic.io/v1/industrial-logistics-risk
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `industrial-market` — $0.03

`GET https://api.xynaptic.io/v1/industrial-market — `(sector?)``

**What it does.** Xynaptic Industrial Market — industrial sector profile: producer price indices (INSEE), commodity input costs, live sector press — a one-call market synthesis. GET ?sector=manufacturing.

**How to use.**

```
GET https://api.xynaptic.io/v1/industrial-market (sector?)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `industrial-news` — $0.01

`GET https://api.xynaptic.io/v1/industrial-news — `(summarize?)``

**What it does.** Xynaptic Industrial News — live industrial/manufacturing press feed (Google News RSS): real titled articles + optional LLM synthesis. GET (&summarize=true).

**How to use.**

```
GET https://api.xynaptic.io/v1/industrial-news (summarize?)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `industrial-price` — $0.02

`GET https://api.xynaptic.io/v1/industrial-price — `(sector?)``

**What it does.** Xynaptic Industrial Price — French industrial producer price indices (IPPI) from INSEE official statistics: monthly price evolution by industrial sector. GET ?sector=all. Official French data.

**How to use.**

```
GET https://api.xynaptic.io/v1/industrial-price (sector?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `industrial-production-risk` — $0.03

`GET https://api.xynaptic.io/v1/industrial-production-risk`

**What it does.** Xynaptic Production Risk — describe your production chain (suppliers, materials, locations), we analyze fragility points: single-sourcing, volatile input prices, geographic concentration. POST { description, materials?, suppliers? }. LLM composite.

**How to use.**

```
GET https://api.xynaptic.io/v1/industrial-production-risk
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `industrial-raw-materials` — $0.02

`GET https://api.xynaptic.io/v1/industrial-raw-materials`

**What it does.** Xynaptic Raw Materials — the raw materials panorama by family: energy (oil, gas, coal), metals (copper, aluminum, gold, zinc), agriculture (wheat, corn, soy, coffee, sugar) — current prices and daily moves in one call. GET (?family=metals).

**How to use.**

```
GET https://api.xynaptic.io/v1/industrial-raw-materials
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `industrial-supply` — $0.02

`GET https://api.xynaptic.io/v1/industrial-supply — `(sector)``

**What it does.** Xynaptic Industrial Supply — supply/demand tension reading for a sector: input price evolution (commodities + IPPI), sector press signals — a transparent tension indicator. GET ?sector=metallurgy. Composite, honest method.

**How to use.**

```
GET https://api.xynaptic.io/v1/industrial-supply (sector)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
