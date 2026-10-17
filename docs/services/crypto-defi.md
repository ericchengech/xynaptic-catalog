# Crypto — Xynaptic service reference

> 24 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works:** `GET` any endpoint → `402 Payment Required` → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `crypto-brief` — $0.015

`GET https://api.xynaptic.io/v1/crypto-brief`

**What it does.**

daily crypto market digest (BTC, ETH, SOL, ADA prices, 24h moves, major headlines) as structure

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-brief
-> 402 Payment Required (price: $0.015)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-brief-live` — $0.01

`GET https://api.xynaptic.io/v1/crypto-brief-live`

**What it does.**

real-time crypto prices (BTC, ETH, SOL, ADA + top coins) fetched at the exact moment of your re

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-brief-live
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-price` — $0.01

`GET https://api.xynaptic.io/v1/crypto-price`

**What it does.**

real-time snapshot of 6 major crypto assets (BTC, ETH, SOL, ADA, LINK, DOT) with 24h changes, b

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-price
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-market` — $0.02

`GET https://api.xynaptic.io/v1/crypto-market`

**What it does.**

real-time market regime analysis: top 100 assets by market cap, gainers/losers, breadth, volati

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-market
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-news` — $0.02

`GET https://api.xynaptic.io/v1/crypto-news`

**What it does.**

top crypto headlines (BTC, ETH, regulation, macro) with importance scoring, timestamp and sourc

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-news
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-trading-analysis` — $0.05

`GET https://api.xynaptic.io/v1/crypto-trading-analysis`

**What it does.**

technical analysis of any Kraken pair: RSI(14), MACD, EMA 20/50/200, recent support/resistance,

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-trading-analysis
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-deep-trading-analysis` — $0.1

`GET https://api.xynaptic.io/v1/crypto-deep-trading-analysis`

**What it does.**

the premium multi-dimensional read: multi-timeframes (1h/4h/1d aligned), volatility regime, onc

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-deep-trading-analysis
-> 402 Payment Required (price: $0.1)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-validate` — $0.1

`GET https://api.xynaptic.io/v1/crypto-validate`

**What it does.**

full pre-purchase security audit of any token: contract checks (open source, proxy), honeypot d

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-validate
-> 402 Payment Required (price: $0.1)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-orderflow` — $0.05

`GET https://api.xynaptic.io/v1/crypto-orderflow`

**What it does.**

real-time market microstructure: CVD (cumulative volume delta), buy/sell pressure ratio, aggres

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-orderflow
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-derivatives` — $0.05

`GET https://api.xynaptic.io/v1/crypto-derivatives`

**What it does.**

perp market vitals: funding rate (hourly + annualized), open interest in USD, futures basis (ma

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-derivatives
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-defi` — $0.05

`GET https://api.xynaptic.io/v1/crypto-defi`

**What it does.**

protocol health in one call: current TVL, 24h change, chain breakdown, category. Parameter: ?pr

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-defi
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-tokenomics` — $0.03

`GET https://api.xynaptic.io/v1/crypto-tokenomics`

**What it does.**

supply structure: circulating, total, max supply, FDV, market cap, ATH distance, price. Paramet

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-tokenomics
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-portfolio` — $0.05

`POST https://api.xynaptic.io/v1/crypto-portfolio` — `(holdings)`

**What it does.**

bring your holdings [{coin, weight or amount}]: we fetch live prices and compute per-position v

**How to use.**

```
POST https://api.xynaptic.io/v1/crypto-portfolio (holdings)
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-historical` — $0.02

`GET https://api.xynaptic.io/v1/crypto-historical` — `(coin + days?)`

**What it does.**

OHLCV history for backtests: 30, 90 or 365 days, daily candles from CoinGecko. GET ?coin=bitcoi

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-historical (coin + days?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-correlation` — $0.02

`GET https://api.xynaptic.io/v1/crypto-correlation` — `(coins)`

**What it does.**

Pearson correlation matrix of daily returns for 2-5 coins over 90 days: the honest diversificat

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-correlation (coins)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-screener` — $0.02

`GET https://api.xynaptic.io/v1/crypto-screener` — `(limit?)`

**What it does.**

the market pulse: top gainers and losers 24h, highest volumes, most extreme moves from the top 

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-screener (limit?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-gas-fees` — $0.02

`GET https://api.xynaptic.io/v1/crypto-gas-fees`

**What it does.**

live gas prices across chains (Ethereum, Base) with slow/average/fast tiers in Gwei + estimated

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-gas-fees
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-fear-greed` — $0.02

`GET https://api.xynaptic.io/v1/crypto-fear-greed`

**What it does.**

the market sentiment thermometer (alternative.me index, 0-100): current value, yesterday, last 

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-fear-greed
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-whales` — $0.02

`GET https://api.xynaptic.io/v1/crypto-whales` — `(min_btc? + limit?)`

**What it does.**

live large Bitcoin transfers straight from the network: biggest mempool transactions and recent

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-whales (min_btc? + limit?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-wallet-health` — $0.02

`GET https://api.xynaptic.io/v1/crypto-wallet-health` — `(address + chain)`

**What it does.**

score any Bitcoin or EVM address: balance, tx count, first/last activity (age), activity patter

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-wallet-health (address + chain)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-global` — $0.01

`GET https://api.xynaptic.io/v1/crypto-global` — `(marche crypto global CMC)`

**What it does.**

global crypto market snapshot (CoinMarketCap Pro): total market cap, BTC/ETH dominance, 24h vol

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-global (marche crypto global CMC)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-movers` — $0.02

`GET https://api.xynaptic.io/v1/crypto-movers` — `(?limit=5 — top gainers/losers 24h filtres)`

**What it does.**

top gainers and losers 24h with volume filter (CoinMarketCap Pro): clean lists of real movers, 

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-movers (?limit=5 — top gainers/losers 24h filtres)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-risk` — $0.05

`GET https://api.xynaptic.io/v1/crypto-risk`

**What it does.**

drawdowns from ATH, 7d/30d momentum and risk grade for major crypto assets. Refreshed every 2 h

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-risk
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-onchain` — $0.1

`GET https://api.xynaptic.io/v1/crypto-onchain`

**What it does.**

live Bitcoin network data: recommended fees, mempool congestion, difficulty adjustment and hash

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-onchain
-> 402 Payment Required (price: $0.1)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
