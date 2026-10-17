# Finance — Xynaptic service reference

> 20 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works**

`GET` any endpoint → `402 Payment Required` → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `security-search` — $0.02

`GET https://api.xynaptic.io/v1/security-search` — `(ticker)`

**What it does.**

Xynaptic Security Search — ticker US (e.g. AAPL) -> company identity from SEC EDGAR: name, CIK, exchanges, SIC sector, plus the 10 most recent filings (forms, dates). GET ?ticker=AAPL. Free official source, no key.

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

**What it does.**

Xynaptic Security Price — spot market data for US stocks: price, previous close, day range, 52-week range, currency, exchange + up to 30d history (OHLCV). GET ?ticker=AAPL&history=30. Refreshed intraday.

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

**What it does.**

Xynaptic Security Fundamentals — multi-year financial statements from SEC EDGAR XBRL (official regulator data): revenues, net income, EPS, total assets, equity, cash — latest fiscal years with YoY deltas. GET ?ticker=AAPL.

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

**What it does.**

Xynaptic Security Technical — technical indicators computed on price history: SMA 20/50/200, EMA 12/26, RSI 14, momentum 10d, volatility 20d, trend classification. GET ?ticker=AAPL&days=90 (30-365). Signals: price vs MAs, RSI zones (overbought >70 / oversold <30).

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

**What it does.**

Xynaptic Security Risk — risk profile from price history: annualized volatility, max drawdown, worst day, VaR 95 (parametric), Sharpe proxy, beta vs SPY (when available). GET ?ticker=AAPL&days=180. Output: risk_level (low/medium/high/extreme) + each metric with its window.

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

**What it does.**

Xynaptic Security EU Price — live European stock price with local currency + EUR conversion: Paris (MC.PA), London (SHEL.L), XETRA (SAP.DE), Amsterdam (ASML.AS), Milan, Madrid... GET ?ticker=MC.PA

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

**What it does.**

Xynaptic Security EU Search — European ticker identity: name, exchange, currency, market state. GET ?query=LVMH

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

**What it does.**

Xynaptic Security EU Technical — RSI, momentum, moving averages on 60-day European price history. GET ?ticker=MC.PA&days=60

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

**What it does.**

Xynaptic Security EU Analysis — full European stock profile: live price, trend, volatility, range + agent-ready synthesis. GET ?ticker=SAP.DE

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

**What it does.**

Xynaptic Security EU Compare — two European stocks side by side: prices, trends, risk. GET ?a=MC.PA&b=SAP.DE

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

**What it does.**

Xynaptic Security EU Risk — volatility, drawdown, liquidity profile of a European stock. GET ?ticker=SHEL.L&days=90

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

**What it does.**

Xynaptic Security Analysis — premium devil's-advocate-grade report: we collect fundamentals (EDGAR), technicals and risk internally, then an LLM analyst writes a structured analysis with verdict and confidence, citing exact figures. GET ?ticker=AAPL. No financial advice — informational.

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

**What it does.**

Xynaptic Security Watch — the daycare for stocks: we watch price above/below a threshold or RSI-14 zones, checking hourly for up to 30 days; the encrypted result is delivered via /v1/watch-status. POST body: { ticker, type: stock_price_above|stock_price_below|stock_rsi_below|stock_rsi_above, price?|rsi?, ttl_days?: 30 }. Returns { watch_id, watch_secret }.

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

**What it does.**

Xynaptic Security Validate — the market devil's advocate: submit an investment thesis about a US stock, we stress-test it against real EDGAR fundamentals + technicals — strengths, weaknesses, factual contradictions with cited figures, counter-thesis, verdict + confidence. POST body: { thesis, ticker }. Informational only — not financial advice.

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

**What it does.**

Xynaptic Security Filings — full-text search across SEC EDGAR filings: find which 10-K/10-Q/8-K mention your terms (supply chain risk, AI, litigation...). GET ?q=supply+chain+risk&forms=10-K&days=365. Returns matches with company, form, date, excerpt link.

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

**What it does.**

Xynaptic Security Insider — insider transactions (Form 4) of a US listed company: the 15 most recent filings with officers who filed, dates and accession links. The classic insider-activity signal from official regulator data. GET ?ticker=AAPL.

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

**What it does.**

Xynaptic Security Dividends — dividend history from SEC XBRL filings (official DPS declared) + current yield computed against the live price, plus payout proxy when net income is available. GET ?ticker=KO. Regulator-grade dividend data.

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

**What it does.**

Xynaptic Security Earnings — quarterly results from EDGAR: EPS and net income per quarter (XBRL, durations 60-100 days), the 10-Q/10-K filing dates, and the revenue trend across the last 4 quarters. GET ?ticker=AAPL.

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

**What it does.**

Xynaptic Portfolio Analysis — bring your portfolio [{ticker, weight}]: we fetch prices and compute per-holding risk (volatility), concentration (HHI + top weights), sector exposure via EDGAR SIC, and aggregate risk with its caveats. POST body: { holdings: [{ticker, weight}], currency?: USD }. Informational only.

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

**What it does.**

Xynaptic Fiat-USDC Rate — best fiat↔USDC conversion rate per payment rail (Base, Polygon, Solana): Coinbase spot, spread, network fees, best-rail verdict. GET ?currency=EUR.

**How to use.**

```
GET https://api.xynaptic.io/v1/fiat-usdc-rate (?currency=EUR — meilleur taux fiat↔USDC par rail)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
