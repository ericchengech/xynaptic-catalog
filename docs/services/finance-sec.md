# Finance — Xynaptic service reference

> 20 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works:** `GET` any endpoint → `402 Payment Required` → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `security-search` — $0.02

`GET https://api.xynaptic.io/v1/security-search` — `(ticker)`

**What it does.** ticker US (e.g. AAPL) -> company identity from SEC EDGAR: name, CIK, exchanges, SIC sector, plu

**How to use.**

```
GET https://api.xynaptic.io/v1/security-search (ticker)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `security-price` — $0.01

`GET https://api.xynaptic.io/v1/security-price` — `(ticker + history?)`

**What it does.** spot market data for US stocks: price, previous close, day range, 52-week range, currency, exch

**How to use.**

```
GET https://api.xynaptic.io/v1/security-price (ticker + history?)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `security-fundamentals` — $0.03

`GET https://api.xynaptic.io/v1/security-fundamentals` — `(ticker)`

**What it does.** multi-year financial statements from SEC EDGAR XBRL (official regulator data): revenues, net in

**How to use.**

```
GET https://api.xynaptic.io/v1/security-fundamentals (ticker)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `security-technical` — $0.02

`GET https://api.xynaptic.io/v1/security-technical` — `(ticker + days?)`

**What it does.** technical indicators computed on price history: SMA 20/50/200, EMA 12/26, RSI 14, momentum 10d,

**How to use.**

```
GET https://api.xynaptic.io/v1/security-technical (ticker + days?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `security-risk` — $0.02

`GET https://api.xynaptic.io/v1/security-risk` — `(ticker + days?)`

**What it does.** risk profile from price history: annualized volatility, max drawdown, worst day, VaR 95 (parame

**How to use.**

```
GET https://api.xynaptic.io/v1/security-risk (ticker + days?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `security-eu-price` — $0.02

`GET https://api.xynaptic.io/v1/security-eu-price` — `(ticker)`

**What it does.** live European stock price with local currency + EUR conversion: Paris (MC.PA), London (SHEL.L),

**How to use.**

```
GET https://api.xynaptic.io/v1/security-eu-price (ticker)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `security-eu-search` — $0.01

`GET https://api.xynaptic.io/v1/security-eu-search` — `(query)`

**What it does.** European ticker identity: name, exchange, currency, market state. GET ?query=LVMH

**How to use.**

```
GET https://api.xynaptic.io/v1/security-eu-search (query)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `security-eu-technical` — $0.02

`GET https://api.xynaptic.io/v1/security-eu-technical` — `(ticker + days?)`

**What it does.** RSI, momentum, moving averages on 60-day European price history. GET ?ticker=MC.PA&days=60

**How to use.**

```
GET https://api.xynaptic.io/v1/security-eu-technical (ticker + days?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `security-eu-analysis` — $0.03

`GET https://api.xynaptic.io/v1/security-eu-analysis` — `(ticker)`

**What it does.** full European stock profile: live price, trend, volatility, range + agent-ready synthesis. GET 

**How to use.**

```
GET https://api.xynaptic.io/v1/security-eu-analysis (ticker)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `security-eu-compare` — $0.05

`GET https://api.xynaptic.io/v1/security-eu-compare` — `(a + b)`

**What it does.** two European stocks side by side: prices, trends, risk. GET ?a=MC.PA&b=SAP.DE

**How to use.**

```
GET https://api.xynaptic.io/v1/security-eu-compare (a + b)
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `security-eu-risk` — $0.02

`GET https://api.xynaptic.io/v1/security-eu-risk` — `(ticker + days?)`

**What it does.** volatility, drawdown, liquidity profile of a European stock. GET ?ticker=SHEL.L&days=90

**How to use.**

```
GET https://api.xynaptic.io/v1/security-eu-risk (ticker + days?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `security-analysis` — $0.1

`GET https://api.xynaptic.io/v1/security-analysis` — `(ticker)`

**What it does.** premium devil's-advocate-grade report: we collect fundamentals (EDGAR), technicals and risk int

**How to use.**

```
GET https://api.xynaptic.io/v1/security-analysis (ticker)
-> 402 Payment Required (price: $0.1)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `security-watch` — $0.01

`POST https://api.xynaptic.io/v1/security-watch` — `(ticker + type + price|rsi)`

**What it does.** the daycare for stocks: we watch price above/below a threshold or RSI-14 zones, checking hourly

**How to use.**

```
POST https://api.xynaptic.io/v1/security-watch (ticker + type + price|rsi)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `security-validate` — $0.1

`POST https://api.xynaptic.io/v1/security-validate` — `(thesis + ticker)`

**What it does.** the market devil's advocate: submit an investment thesis about a US stock, we stress-test it ag

**How to use.**

```
POST https://api.xynaptic.io/v1/security-validate (thesis + ticker)
-> 402 Payment Required (price: $0.1)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `security-filings` — $0.02

`GET https://api.xynaptic.io/v1/security-filings` — `(q + forms? + days?)`

**What it does.** full-text search across SEC EDGAR filings: find which 10-K/10-Q/8-K mention your terms (supply 

**How to use.**

```
GET https://api.xynaptic.io/v1/security-filings (q + forms? + days?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `security-insider` — $0.02

`GET https://api.xynaptic.io/v1/security-insider` — `(ticker)`

**What it does.** insider transactions (Form 4) of a US listed company: the 15 most recent filings with officers 

**How to use.**

```
GET https://api.xynaptic.io/v1/security-insider (ticker)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `security-dividends` — $0.02

`GET https://api.xynaptic.io/v1/security-dividends` — `(ticker)`

**What it does.** dividend history from SEC XBRL filings (official DPS declared) + current yield computed against

**How to use.**

```
GET https://api.xynaptic.io/v1/security-dividends (ticker)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `security-earnings` — $0.02

`GET https://api.xynaptic.io/v1/security-earnings` — `(ticker)`

**What it does.** quarterly results from EDGAR: EPS and net income per quarter (XBRL, durations 60-100 days), the

**How to use.**

```
GET https://api.xynaptic.io/v1/security-earnings (ticker)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `security-portfolio-analysis` — $0.05

`GET https://api.xynaptic.io/v1/security-portfolio-analysis`

**What it does.** bring your portfolio [{ticker, weight}]: we fetch prices and compute per-holding risk (volatili

**How to use.**

```
GET https://api.xynaptic.io/v1/security-portfolio-analysis
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `fiat-usdc-rate` — $0.02

`GET https://api.xynaptic.io/v1/fiat-usdc-rate` — `(?currency=EUR — meilleur taux fiat↔USDC par rail)`

**What it does.** best fiat↔USDC conversion rate per payment rail (Base, Polygon, Solana): Coinbase spot, spread,

**How to use.**

```
GET https://api.xynaptic.io/v1/fiat-usdc-rate (?currency=EUR — meilleur taux fiat↔USDC par rail)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
