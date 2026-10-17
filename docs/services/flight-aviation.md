# Flight — Xynaptic service reference

> 9 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works:** `GET` any endpoint → `402 Payment Required` → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `flight-news` — $0.02

`GET https://api.xynaptic.io/v1/flight-news`

**What it does.** structured aviation events (airlines, airports, airspace, regulation, incidents, last 12h): imp

**How to use.**

```
GET https://api.xynaptic.io/v1/flight-news
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `flight-airport-situation` — $0.05

`GET https://api.xynaptic.io/v1/flight-airport-situation`

**What it does.** real-time weather and operating conditions of any airport by ICAO code (METAR + TAF): wind, vis

**How to use.**

```
GET https://api.xynaptic.io/v1/flight-airport-situation
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `flight-status` — $0.05

`GET https://api.xynaptic.io/v1/flight-status`

**What it does.** real-time status of any flight by callsign (e.g. AFR7TE): airborne/ground phase, altitude, spee

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

**What it does.** real-time risk assessment of an air route (departure/arrival ICAO): weather at both airports, r

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

**What it does.** when a destination is disrupted, find the 3 nearest major alternative airports with their real-

**How to use.**

```
GET https://api.xynaptic.io/v1/flight-alternatives
-> 402 Payment Required (price: $0.15)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `flight-airport-brief` — $0.02

`GET https://api.xynaptic.io/v1/flight-airport-brief` — `(q)`

**What it does.** any airport worldwide by name or IATA code: country, IATA/ICAO codes, coordinates, elevation, r

**How to use.**

```
GET https://api.xynaptic.io/v1/flight-airport-brief (q)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `flight-asia-brief` — $0.03

`GET https://api.xynaptic.io/v1/flight-asia-brief` — `(country)`

**What it does.** aviation panorama of any Asian (or world) country: major airports with IATA codes and coordinat

**How to use.**

```
GET https://api.xynaptic.io/v1/flight-asia-brief (country)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `notam-brief` — $0.02

`GET https://api.xynaptic.io/v1/notam-brief` — `(location — FAA NOTAMs officiels par aeroport)`

**What it does.** official FAA NOTAMs for any US airport: active notices with effective dates, plain text and ICA

**How to use.**

```
GET https://api.xynaptic.io/v1/notam-brief (location — FAA NOTAMs officiels par aeroport)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `notam-area` — $0.02

`GET https://api.xynaptic.io/v1/notam-area` — `(latitude+longitude+radius — FAA NOTAMs geospatiaux)`

**What it does.** official FAA NOTAMs within a radius around any point (latitude/decimal degrees, radius in nauti

**How to use.**

```
GET https://api.xynaptic.io/v1/notam-area (latitude+longitude+radius — FAA NOTAMs geospatiaux)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
