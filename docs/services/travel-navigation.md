# Travel & Tourism — Xynaptic service reference

> 4 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works**

`GET` any endpoint → `402 Payment Required` → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `destination-brief` — $0.02

`GET https://api.xynaptic.io/v1/destination-brief` — `(q + lang?)`

**What it does.**

Xynaptic Destination Brief — travel context for any city: Wikipedia summary, coordinates, population, country, timezone and what the place is known for. One call to ground an agent planning a trip. GET ?q=Jakarta (&lang=en|fr).

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

**What it does.**

Xynaptic Travel Weather — 7-day daily forecast for any destination (open-meteo): min/max temperature, precipitation, wind, weather code, best-day hint for agents planning a trip. GET ?lat=-6.21&lon=106.85 or ?q=Jakarta.

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

**What it does.**

Xynaptic Route Brief — road itinerary between two points (OSRM): distance, duration, step-by-step directions and cross-border hint. Driving, walking or cycling. GET ?from=48.85,2.35&to=45.76,4.83 (&mode=driving|walking|cycling).

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

**What it does.**

Xynaptic Trip Planner FR — full train itinerary between two French stations or cities (SNCF): times, duration, transfers, best pick. GET ?from=Paris&to=Lyon (&date=&time=).

**How to use.**

```
GET https://api.xynaptic.io/v1/trip-planner (from + to + date? + time?)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
