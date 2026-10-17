# Industry & Commodities — Xynaptic service reference

> 11 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works:** `GET` any endpoint → `402 Payment Required` → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `commodity-price` — $0.02

`GET https://api.xynaptic.io/v1/commodity-price` — `(asset ou assets)`

**What it does.** live commodity prices: Brent, WTI, natural gas, copper, aluminum, gold, silver, platinum, palla

**How to use.**

```
GET https://api.xynaptic.io/v1/commodity-price (asset ou assets)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `battery-metals-brief` — $0.03

`GET https://api.xynaptic.io/v1/battery-metals-brief` — `(?assets=filtre — brief metaux batterie/EV : lithium, cuivre, platine, palladium)`

**What it does.** the EV-transition metals reading in one call: lithium, copper, platinum, palladium prices with 

**How to use.**

```
GET https://api.xynaptic.io/v1/battery-metals-brief (?assets=filtre — brief metaux batterie/EV : lithium, cuivre, platine, palladium)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `industrial-raw-materials` — $0.02

`GET https://api.xynaptic.io/v1/industrial-raw-materials`

**What it does.** the raw materials panorama by family: energy (oil, gas, coal), metals (copper, aluminum, gold, 

**How to use.**

```
GET https://api.xynaptic.io/v1/industrial-raw-materials
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `industrial-price` — $0.02

`GET https://api.xynaptic.io/v1/industrial-price` — `(sector?)`

**What it does.** French industrial producer price indices (IPPI) from INSEE official statistics: monthly price e

**How to use.**

```
GET https://api.xynaptic.io/v1/industrial-price (sector?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `industrial-market` — $0.03

`GET https://api.xynaptic.io/v1/industrial-market` — `(sector?)`

**What it does.** industrial sector profile: producer price indices (INSEE), commodity input costs, live sector p

**How to use.**

```
GET https://api.xynaptic.io/v1/industrial-market (sector?)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `industrial-news` — $0.01

`GET https://api.xynaptic.io/v1/industrial-news` — `(summarize?)`

**What it does.** live industrial/manufacturing press feed (Google News RSS): real titled articles + optional LLM

**How to use.**

```
GET https://api.xynaptic.io/v1/industrial-news (summarize?)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `industrial-energy` — $0.02

`GET https://api.xynaptic.io/v1/industrial-energy` — `(region?)`

**What it does.** energy costs for industrial users: spot electricity prices, gas prices, and the energy transiti

**How to use.**

```
GET https://api.xynaptic.io/v1/industrial-energy (region?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `industrial-production-risk` — $0.03

`GET https://api.xynaptic.io/v1/industrial-production-risk`

**What it does.** describe your production chain (suppliers, materials, locations), we analyze fragility points: 

**How to use.**

```
GET https://api.xynaptic.io/v1/industrial-production-risk
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `industrial-supply` — $0.02

`GET https://api.xynaptic.io/v1/industrial-supply` — `(sector)`

**What it does.** supply/demand tension reading for a sector: input price evolution (commodities + IPPI), sector 

**How to use.**

```
GET https://api.xynaptic.io/v1/industrial-supply (sector)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `industrial-logistics-risk` — $0.03

`GET https://api.xynaptic.io/v1/industrial-logistics-risk`

**What it does.** current logistics disruptions affecting French/European flows: rail strikes (SNCF official data

**How to use.**

```
GET https://api.xynaptic.io/v1/industrial-logistics-risk
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `industrial-factory-status` — $0.02

`GET https://api.xynaptic.io/v1/industrial-factory-status`

**What it does.** the publicly known state of an industrial site: press mentions, company registry (active?), rec

**How to use.**

```
GET https://api.xynaptic.io/v1/industrial-factory-status
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
