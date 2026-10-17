# Travel & Tourism — Xynaptic service reference

> 4 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works:** `GET` any endpoint → `402 Payment Required` → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `destination-brief` — $0.02

`GET https://api.xynaptic.io/v1/destination-brief` — `(q + lang?)`

**What it does.** travel context for any city: Wikipedia summary, coordinates, population, country, timezone and 

**How to use.**

```
GET https://api.xynaptic.io/v1/destination-brief (q + lang?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `travel-weather` — $0.01

`GET https://api.xynaptic.io/v1/travel-weather` — `(lat+lon ou q)`

**What it does.** 7-day daily forecast for any destination (open-meteo): min/max temperature, precipitation, wind

**How to use.**

```
GET https://api.xynaptic.io/v1/travel-weather (lat+lon ou q)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `route-brief` — $0.02

`GET https://api.xynaptic.io/v1/route-brief` — `(from + to + mode?)`

**What it does.** road itinerary between two points (OSRM): distance, duration, step-by-step directions and cross

**How to use.**

```
GET https://api.xynaptic.io/v1/route-brief (from + to + mode?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `trip-planner` — $0.03

`GET https://api.xynaptic.io/v1/trip-planner` — `(from + to + date? + time?)`

**What it does.** full train itinerary between two French stations or cities (SNCF): times, duration, transfers, 

**How to use.**

```
GET https://api.xynaptic.io/v1/trip-planner (from + to + date? + time?)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
