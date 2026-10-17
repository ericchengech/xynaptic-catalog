# Rail — Xynaptic service reference

> 8 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works:** `GET` any endpoint → `402 Payment Required` → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `rail-news` — $0.01

`GET https://api.xynaptic.io/v1/rail-news`

**What it does.** structured French rail events (SNCF, TGV, TER, Transilien, last 12h): importance, lifecycle, di

**How to use.**

```
GET https://api.xynaptic.io/v1/rail-news
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `rail-disruptions` — $0.01

`GET https://api.xynaptic.io/v1/rail-disruptions`

**What it does.** active French rail disruptions (grèves, travaux, suppressions, incidents, déraillements) with i

**How to use.**

```
GET https://api.xynaptic.io/v1/rail-disruptions
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `rail-departures` — $0.02

`GET https://api.xynaptic.io/v1/rail-departures`

**What it does.** next departures from any French rail station (search by name, e.g. ?station=Lyon Part-Dieu): li

**How to use.**

```
GET https://api.xynaptic.io/v1/rail-departures
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `rail-train-status` — $0.02

`GET https://api.xynaptic.io/v1/rail-train-status`

**What it does.** real-time status of a French train by number (e.g. ?number=1234): line, direction, stops with t

**How to use.**

```
GET https://api.xynaptic.io/v1/rail-train-status
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `rail-train-route-risk` — $0.03

`GET https://api.xynaptic.io/v1/rail-train-route-risk`

**What it does.** composite risk assessment of a French rail journey (?from=Lyon Part-Dieu&to=Paris): next connec

**How to use.**

```
GET https://api.xynaptic.io/v1/rail-train-route-risk
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `rail-connection-risk` — $0.02

`GET https://api.xynaptic.io/v1/rail-connection-risk`

**What it does.** will you make your connection? Given a transfer station and planned margin (?at=Lyon Part-Dieu&

**How to use.**

```
GET https://api.xynaptic.io/v1/rail-connection-risk
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `rail-trip-brief` — $0.03

`GET https://api.xynaptic.io/v1/rail-trip-brief`

**What it does.** complete one-shot synthesis of a French rail journey (?from&to): next departures, journey plan 

**How to use.**

```
GET https://api.xynaptic.io/v1/rail-trip-brief
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `rail-intermodal-compare` — $0.03

`GET https://api.xynaptic.io/v1/rail-intermodal-compare`

**What it does.** train vs plane between two cities: REAL next train journeys (Navitia/SNCF: times, duration, tra

**How to use.**

```
GET https://api.xynaptic.io/v1/rail-intermodal-compare
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
