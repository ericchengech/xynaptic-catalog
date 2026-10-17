# Aviation — Xynaptic service reference

> 9 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Full machine-readable catalog: https://api.xynaptic.io

**How x402 works here:** `GET` any endpoint → `402 Payment Required` with the price → sign EIP-3009 (or use any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `flight-news` — free

`GET https://api.xynaptic.io/v1/flight-news`

**What it does.** Xynaptic Aviation News v2 — structured aviation events (airlines, airports, airspace, regulation, incidents, l

**How to use.**

```
GET https://api.xynaptic.io/v1/flight-news
-> 402 Payment Required (price: free)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `flight-airport-brief` — $0.02

`GET https://api.xynaptic.io/v1/flight-airport-brief `(q)``

**What it does.** Xynaptic Flight Airport Brief — any airport worldwide by name or IATA code: country, IATA/ICAO codes, coordinates, elevation, runway count, served airlines hint. Open data (Wikidata). GET ?q=Jakarta or ?q=CGK.

**How to use.**

```
GET https://api.xynaptic.io/v1/flight-airport-brief (q)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `notam-brief` — $0.02

`GET https://api.xynaptic.io/v1/notam-brief `(location — FAA NOTAMs officiels par aeroport)``

**What it does.** Xynaptic NOTAM Brief — official FAA NOTAMs for any US airport: active notices with effective dates, plain text and ICAO format. GET ?location=KDFW.

**How to use.**

```
GET https://api.xynaptic.io/v1/notam-brief (location — FAA NOTAMs officiels par aeroport)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `notam-area` — $0.02

`GET https://api.xynaptic.io/v1/notam-area `(latitude+longitude+radius — FAA NOTAMs geospatiaux)``

**What it does.** Xynaptic NOTAM Area — official FAA NOTAMs within a radius around any point (latitude/decimal degrees, radius in nautical miles, max 100): airspace closures, obstacles, works. Official FAA NMS-API source. GET ?latitude=49.01&longitude=2.55&radius=50.

**How to use.**

```
GET https://api.xynaptic.io/v1/notam-area (latitude+longitude+radius — FAA NOTAMs geospatiaux)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `flight-asia-brief` — $0.03

`GET https://api.xynaptic.io/v1/flight-asia-brief `(country)``

**What it does.** Xynaptic Flight Asia Brief — aviation panorama of any Asian (or world) country: major airports with IATA codes and coordinates, local airlines with hubs. Open data (Wikidata). GET ?country=Indonesia.

**How to use.**

```
GET https://api.xynaptic.io/v1/flight-asia-brief (country)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `flight-airport-situation` — free

`GET https://api.xynaptic.io/v1/flight-airport-situation`

**What it does.** Xynaptic Airport Situation — real-time weather and operating conditions of any airport by ICAO code (METAR + T

**How to use.**

```
GET https://api.xynaptic.io/v1/flight-airport-situation
-> 402 Payment Required (price: free)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `flight-status` — $0.05

`GET https://api.xynaptic.io/v1/flight-status`

**What it does.** Xynaptic Flight Status — real-time status of any flight by callsign (e.g. AFR7TE): airborne/ground phase, altitude, speed, position, vertical trend, and an agent-ready assessment. On-demand, parameter: ?callsign=AFR7TE.

**How to use.**

```
GET https://api.xynaptic.io/v1/flight-status
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `flight-route-risk` — $0.1

`GET https://api.xynaptic.io/v1/flight-route-risk`

**What it does.** Xynaptic Flight Route Risk — real-time risk assessment of an air route (departure/arrival ICAO): weather at both airports, recent aviation events, regional traffic density, composite risk score with agent-ready verdict. On-demand, parameters: ?from=LFPG&to=EGLL

**How to use.**

```
GET https://api.xynaptic.io/v1/flight-route-risk
-> 402 Payment Required (price: $0.1)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `flight-alternatives` — $0.15

`GET https://api.xynaptic.io/v1/flight-alternatives`

**What it does.** Xynaptic Flight Alternatives — when a destination is disrupted, find the 3 nearest major alternative airports with their real-time weather and operating conditions, ranked with an agent-ready recommendation. On-demand, parameter: ?to=LFPG

**How to use.**

```
GET https://api.xynaptic.io/v1/flight-alternatives
-> 402 Payment Required (price: $0.15)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
