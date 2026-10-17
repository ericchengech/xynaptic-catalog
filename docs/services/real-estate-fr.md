# Property — Xynaptic service reference

> 11 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works:** `GET` any endpoint → `402 Payment Required` → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `property-search` — $0.01

`GET https://api.xynaptic.io/v1/property-search` — `(q)`

**What it does.** find French communes and their official transaction stats (DVF 2024, DGFiP): median price per s

**How to use.**

```
GET https://api.xynaptic.io/v1/property-search (q)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `property-transactions` — $0.02

`GET https://api.xynaptic.io/v1/property-transactions` — `(city + type?)`

**What it does.** real estate sales from the official DVF registry (915k+ clean 2024 transactions): date, price, 

**How to use.**

```
GET https://api.xynaptic.io/v1/property-transactions (city + type?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `property-price` — $0.02

`GET https://api.xynaptic.io/v1/property-price` — `(city + type?)`

**What it does.** official median price per sqm for a French commune and property type, computed from real transa

**How to use.**

```
GET https://api.xynaptic.io/v1/property-price (city + type?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `property-valuation` — $0.05

`POST https://api.xynaptic.io/v1/property-valuation` — `(city + surface)`

**What it does.** bring a property (city, surface, rooms, type), get an honest valuation range computed from REAL

**How to use.**

```
POST https://api.xynaptic.io/v1/property-valuation (city + surface)
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `property-market` — $0.03

`GET https://api.xynaptic.io/v1/property-market` — `(city)`

**What it does.** full market profile of a commune: all property types, median prices, volumes, price ranges, lat

**How to use.**

```
GET https://api.xynaptic.io/v1/property-market (city)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `property-rent` — $0.02

`GET https://api.xynaptic.io/v1/property-rent` — `(city + type? + surface?)`

**What it does.** indicative monthly rent estimate for a city and surface, derived from the local price-to-yield 

**How to use.**

```
GET https://api.xynaptic.io/v1/property-rent (city + type? + surface?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `property-yield` — $0.03

`POST https://api.xynaptic.io/v1/property-yield` — `(city + type + rent?)`

**What it does.** gross rental yield computed honestly: bring city, type, monthly rent (or use market estimate), 

**How to use.**

```
POST https://api.xynaptic.io/v1/property-yield (city + type + rent?)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `property-risk` — $0.03

`GET https://api.xynaptic.io/v1/property-risk` — `(city + type?)`

**What it does.** local market risk profile: price volatility (DVF dispersion), liquidity (sales volume), extreme

**How to use.**

```
GET https://api.xynaptic.io/v1/property-risk (city + type?)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `property-mortgage` — $0.02

`GET https://api.xynaptic.io/v1/property-mortgage` — `(amount + rate? + years?)`

**What it does.** clean mortgage calculator: monthly payment, total cost, amortization overview for any rate/dura

**How to use.**

```
GET https://api.xynaptic.io/v1/property-mortgage (amount + rate? + years?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `property-location` — $0.01

`GET https://api.xynaptic.io/v1/property-location` — `(city)`

**What it does.** commune profile from official transactions: sales volume by type, median prices, market depth. 

**How to use.**

```
GET https://api.xynaptic.io/v1/property-location (city)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `property-compare` — $0.05

`GET https://api.xynaptic.io/v1/property-compare` — `(a + b + type?)`

**What it does.** two communes side by side from official DVF data: median prices per sqm, volumes, dynamics

**How to use.**

```
GET https://api.xynaptic.io/v1/property-compare (a + b + type?)
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
