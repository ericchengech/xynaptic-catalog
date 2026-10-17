# Securities EU — Xynaptic service reference

> 6 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works:** `GET` any endpoint → `402 Payment Required` with the price → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `security-eu-analysis` — $0.03

`GET https://api.xynaptic.io/v1/security-eu-analysis — `(ticker)``

**What it does.** Xynaptic Security EU Analysis — full European stock profile: live price, trend, volatility, range + agent-ready synthesis. GET ?ticker=SAP.DE

**How to use.**

```
GET https://api.xynaptic.io/v1/security-eu-analysis (ticker)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `security-eu-compare` — $0.05

`GET https://api.xynaptic.io/v1/security-eu-compare — `(a + b)``

**What it does.** Xynaptic Security EU Compare — two European stocks side by side: prices, trends, risk. GET ?a=MC.PA&b=SAP.DE

**How to use.**

```
GET https://api.xynaptic.io/v1/security-eu-compare (a + b)
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `security-eu-price` — $0.02

`GET https://api.xynaptic.io/v1/security-eu-price — `(ticker)``

**What it does.** Xynaptic Security EU Price — live European stock price with local currency + EUR conversion: Paris (MC.PA), London (SHEL.L), XETRA (SAP.DE), Amsterdam (ASML.AS), Milan, Madrid... GET ?ticker=MC.PA

**How to use.**

```
GET https://api.xynaptic.io/v1/security-eu-price (ticker)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `security-eu-risk` — $0.02

`GET https://api.xynaptic.io/v1/security-eu-risk — `(ticker + days?)``

**What it does.** Xynaptic Security EU Risk — volatility, drawdown, liquidity profile of a European stock. GET ?ticker=SHEL.L&days=90

**How to use.**

```
GET https://api.xynaptic.io/v1/security-eu-risk (ticker + days?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `security-eu-search` — $0.01

`GET https://api.xynaptic.io/v1/security-eu-search — `(query)``

**What it does.** Xynaptic Security EU Search — European ticker identity: name, exchange, currency, market state. GET ?query=LVMH

**How to use.**

```
GET https://api.xynaptic.io/v1/security-eu-search (query)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `security-eu-technical` — $0.02

`GET https://api.xynaptic.io/v1/security-eu-technical — `(ticker + days?)``

**What it does.** Xynaptic Security EU Technical — RSI, momentum, moving averages on 60-day European price history. GET ?ticker=MC.PA&days=60

**How to use.**

```
GET https://api.xynaptic.io/v1/security-eu-technical (ticker + days?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
