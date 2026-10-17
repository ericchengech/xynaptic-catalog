# Energy — Xynaptic service reference

> 11 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works:** `GET` any endpoint → `402 Payment Required` → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `energy-solar-forecast` — $0.02

`GET https://api.xynaptic.io/v1/energy-solar-forecast`

**What it does.** 48h solar production forecast for a European region (radiation, cloud cover, peak hours, estima

**How to use.**

```
GET https://api.xynaptic.io/v1/energy-solar-forecast
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `energy-wind-forecast` — $0.02

`GET https://api.xynaptic.io/v1/energy-wind-forecast`

**What it does.** 48h wind power forecast for a European region (wind speed at 100m, capacity factor estimate, gu

**How to use.**

```
GET https://api.xynaptic.io/v1/energy-wind-forecast
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `energy-price` — $0.02

`GET https://api.xynaptic.io/v1/energy-price`

**What it does.** current electricity spot price (EUR/MWh) with 24h trend and hourly profile. Europe (awattar mar

**How to use.**

```
GET https://api.xynaptic.io/v1/energy-price
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `energy-brief` — $0.02

`GET https://api.xynaptic.io/v1/energy-brief`

**What it does.** one-shot energy synthesis: spot price + trend, solar and wind forecast, renewable signals, agen

**How to use.**

```
GET https://api.xynaptic.io/v1/energy-brief
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `energy-opportunity` — $0.05

`GET https://api.xynaptic.io/v1/energy-opportunity`

**What it does.** the premium signal: cheapest consumption windows in the next 24h, renewable surplus detection, 

**How to use.**

```
GET https://api.xynaptic.io/v1/energy-opportunity
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `energy-grid-status` — $0.02

`GET https://api.xynaptic.io/v1/energy-grid-status`

**What it does.** current European grid health proxy: price volatility, renewable stress signals, load-shift reco

**How to use.**

```
GET https://api.xynaptic.io/v1/energy-grid-status
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `energy-charge-window` — $0.03

`GET https://api.xynaptic.io/v1/energy-charge-window`

**What it does.** the optimal charging window for an electric vehicle: cheapest contiguous hours fitting the requ

**How to use.**

```
GET https://api.xynaptic.io/v1/energy-charge-window
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `energy-battery-arbitrage` — $0.05

`GET https://api.xynaptic.io/v1/energy-battery-arbitrage`

**What it does.** when to charge and when to discharge a battery/home storage in the next 24h: buy window (lowest

**How to use.**

```
GET https://api.xynaptic.io/v1/energy-battery-arbitrage
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `energy-demand` — $0.02

`GET https://api.xynaptic.io/v1/energy-demand` — `(?date= — demande électrique France live éCO2mix)`

**What it does.** live French electricity demand (RTE éCO2mix official): consumption MW, day-ahead forecast, CO2 

**How to use.**

```
GET https://api.xynaptic.io/v1/energy-demand (?date= — demande électrique France live éCO2mix)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `energy-interconnections` — $0.02

`GET https://api.xynaptic.io/v1/energy-interconnections` — `(?date= — échanges transfrontaliers France live)`

**What it does.** live French cross-border power flows (RTE official): England, Italy, Germany-Belgium, Switzerla

**How to use.**

```
GET https://api.xynaptic.io/v1/energy-interconnections (?date= — échanges transfrontaliers France live)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `gas-tariff-zone` — $0.02

`GET https://api.xynaptic.io/v1/gas-tariff-zone` — `(cp)`

**What it does.** the official regulated gas price zone (1-6) for any French postcode, from CRE open data (9,700+

**How to use.**

```
GET https://api.xynaptic.io/v1/gas-tariff-zone (cp)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
