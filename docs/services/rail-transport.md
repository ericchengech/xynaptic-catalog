# Rail & Transport — Xynaptic service reference

> 8 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Full machine-readable catalog: https://api.xynaptic.io

**How x402 works here:** `GET` any endpoint → `402 Payment Required` with the price → sign EIP-3009 (or use any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `rail-departures` — free

`GET https://api.xynaptic.io/v1/rail-departures`

**What it does.** Xynaptic Station Departures FR — next departures from any French rail station (search by name, e.g. ?station=L

**How to use.**

```
GET https://api.xynaptic.io/v1/rail-departures
-> 402 Payment Required (price: free)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `rail-train-status` — free

`GET https://api.xynaptic.io/v1/rail-train-status`

**What it does.** Xynaptic Train Status FR — real-time status of a French train by number (e.g. ?number=1234): line, direction,

**How to use.**

```
GET https://api.xynaptic.io/v1/rail-train-status
-> 402 Payment Required (price: free)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `rail-news` — free

`GET https://api.xynaptic.io/v1/rail-news`

**What it does.** Xynaptic Train News FR — structured French rail events (SNCF, TGV, TER, Transilien, last 12h): importance, lif

**How to use.**

```
GET https://api.xynaptic.io/v1/rail-news
-> 402 Payment Required (price: free)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `rail-disruptions` — $0.01

`GET https://api.xynaptic.io/v1/rail-disruptions`

**What it does.** Xynaptic Rail Disruptions FR — active French rail disruptions (grèves, travaux, suppressions, incidents, déraillements) with importance scoring and agent-ready actions. France only. Refreshed every 2 hours.

**How to use.**

```
GET https://api.xynaptic.io/v1/rail-disruptions
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `rail-connection-risk` — free

`GET https://api.xynaptic.io/v1/rail-connection-risk`

**What it does.** Xynaptic Connection Risk FR — will you make your connection? Given a transfer station and planned margin (?at=

**How to use.**

```
GET https://api.xynaptic.io/v1/rail-connection-risk
-> 402 Payment Required (price: free)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `rail-train-route-risk` — free

`GET https://api.xynaptic.io/v1/rail-train-route-risk`

**What it does.** Xynaptic Train Route Risk FR — composite risk assessment of a French rail journey (?from=Lyon Part-Dieu&to=Par

**How to use.**

```
GET https://api.xynaptic.io/v1/rail-train-route-risk
-> 402 Payment Required (price: free)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `rail-trip-brief` — $0.03

`GET https://api.xynaptic.io/v1/rail-trip-brief`

**What it does.** Xynaptic Rail Trip Brief FR — complete one-shot synthesis of a French rail journey (?from&to): next departures, journey plan with connections, active disruptions, risk assessment, agent-ready recommendation. The premium all-in-one. France only.

**How to use.**

```
GET https://api.xynaptic.io/v1/rail-trip-brief
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `rail-intermodal-compare` — free

`GET https://api.xynaptic.io/v1/rail-intermodal-compare`

**What it does.** Xynaptic Intermodal Compare — train vs plane between two cities: REAL next train journeys (Navitia/SNCF: times

**How to use.**

```
GET https://api.xynaptic.io/v1/rail-intermodal-compare
-> 402 Payment Required (price: free)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
