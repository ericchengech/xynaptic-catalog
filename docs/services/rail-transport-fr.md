# Rail & Transport (FR) — Xynaptic service reference

> 10 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works:** `GET` any endpoint → `402 Payment Required` with the price → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `rail-connection-risk` — $0.02

`GET https://api.xynaptic.io/v1/rail-connection-risk`

**What it does.** Xynaptic Connection Risk FR — will you make your connection? Given a transfer station and planned margin (?at=Lyon Part-Dieu&minutes=15), scores the risk of missing it: active disruptions, historical reliability, recommended minimum margin. France only.

**How to use.**

```
GET https://api.xynaptic.io/v1/rail-connection-risk
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `rail-departures` — $0.02

`GET https://api.xynaptic.io/v1/rail-departures`

**What it does.** Xynaptic Station Departures FR — next departures from any French rail station (search by name, e.g. ?station=Lyon Part-Dieu): line, direction, platform, scheduled time, real-time info. France only, real-time via SNCF/Navitia.

**How to use.**

```
GET https://api.xynaptic.io/v1/rail-departures
-> 402 Payment Required (price: $0.02)
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

## `rail-intermodal-compare` — $0.03

`GET https://api.xynaptic.io/v1/rail-intermodal-compare`

**What it does.** Xynaptic Intermodal Compare — train vs plane between two cities: REAL next train journeys (Navitia/SNCF: times, duration, transfers) vs flight estimate (great-circle distance, typical duration+price range, CO2 per passenger). Composite verdict: when the train wins on total door-to-door time or cost. GET ?from=Paris&to=Nice. France focus. Informational.

**How to use.**

```
GET https://api.xynaptic.io/v1/rail-intermodal-compare
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `rail-news` — $0.01

`GET https://api.xynaptic.io/v1/rail-news`

**What it does.** Xynaptic Train News FR — structured French rail events (SNCF, TGV, TER, Transilien, last 12h): importance, lifecycle, disruption detection, agent-ready assessment. France only. Refreshed every 2 hours.

**How to use.**

```
GET https://api.xynaptic.io/v1/rail-news
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `rail-train-route-risk` — $0.03

`GET https://api.xynaptic.io/v1/rail-train-route-risk`

**What it does.** Xynaptic Train Route Risk FR — composite risk assessment of a French rail journey (?from=Lyon Part-Dieu&to=Paris): next connections, active disruptions on the route (grèves, travaux, incidents), transfer count, agent-ready verdict with score. France only.

**How to use.**

```
GET https://api.xynaptic.io/v1/rail-train-route-risk
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `rail-train-status` — $0.02

`GET https://api.xynaptic.io/v1/rail-train-status`

**What it does.** Xynaptic Train Status FR — real-time status of a French train by number (e.g. ?number=1234): line, direction, stops with times and delays, current position in journey. France only, real-time via SNCF/Navitia.

**How to use.**

```
GET https://api.xynaptic.io/v1/rail-train-status
-> 402 Payment Required (price: $0.02)
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

## `route-brief` — $0.02

`GET https://api.xynaptic.io/v1/route-brief — `(from + to + mode?)``

**What it does.** Xynaptic Route Brief — road itinerary between two points (OSRM): distance, duration, step-by-step directions and cross-border hint. Driving, walking or cycling. GET ?from=48.85,2.35&to=45.76,4.83 (&mode=driving|walking|cycling).

**How to use.**

```
GET https://api.xynaptic.io/v1/route-brief (from + to + mode?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `trip-planner` — $0.03

`GET https://api.xynaptic.io/v1/trip-planner — `(from + to + date? + time?)``

**What it does.** Xynaptic Trip Planner FR — full train itinerary between two French stations or cities (SNCF): times, duration, transfers, best pick. GET ?from=Paris&to=Lyon (&date=&time=).

**How to use.**

```
GET https://api.xynaptic.io/v1/trip-planner (from + to + date? + time?)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
