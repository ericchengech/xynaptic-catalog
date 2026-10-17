# Crypto & DeFi — Xynaptic service reference

> 26 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works:** `GET` any endpoint → `402 Payment Required` with the price → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `crypto-brief` — $0.015

`GET https://api.xynaptic.io/v1/crypto-brief`

**What it does.** Xynaptic Crypto Brief — daily crypto market digest (BTC, ETH, SOL, ADA prices, 24h moves, major headlines) as structured JSON. Refreshed every morning.

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

**What it does.** Xynaptic Crypto Live — real-time crypto prices (BTC, ETH, SOL, ADA + top coins) fetched at the exact moment of your request. Live data, not a cached digest.

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-brief-live
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-correlation` — $0.02

`GET https://api.xynaptic.io/v1/crypto-correlation — `(coins)``

**What it does.** Xynaptic Crypto Correlation — Pearson correlation matrix of daily returns for 2-5 coins over 90 days: the honest diversification check. GET ?coins=bitcoin,ethereum,solana.

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-correlation (coins)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-deep-trading-analysis` — $0.1

`GET https://api.xynaptic.io/v1/crypto-deep-trading-analysis`

**What it does.** Xynaptic Deep Trading Analysis — the premium multi-dimensional read: multi-timeframes (1h/4h/1d aligned), volatility regime, onchain signals, news sentiment, composite conviction score bull/bear/neutral with confidence. Parameter: ?pair=BTCUSD.

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-deep-trading-analysis
-> 402 Payment Required (price: $0.1)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-defi` — $0.05

`GET https://api.xynaptic.io/v1/crypto-defi`

**What it does.** Xynaptic Crypto DeFi — protocol health in one call: current TVL, 24h change, chain breakdown, category. Parameter: ?protocol=aave. DefiLlama data.

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-defi
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-derivatives` — $0.05

`GET https://api.xynaptic.io/v1/crypto-derivatives`

**What it does.** Xynaptic Crypto Derivatives — perp market vitals: funding rate (hourly + annualized), open interest in USD, futures basis (mark vs oracle), max leverage. Parameter: ?asset=BTC. Hyperliquid perp data.

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-derivatives
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-fear-greed` — $0.02

`GET https://api.xynaptic.io/v1/crypto-fear-greed`

**What it does.** Xynaptic Crypto Fear & Greed — the market sentiment thermometer (alternative.me index, 0-100): current value, yesterday, last week, classification (extreme fear..extreme greed) + interpretation hint for agents. GET no params.

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-fear-greed
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-gas-fees` — $0.02

`GET https://api.xynaptic.io/v1/crypto-gas-fees`

**What it does.** Xynaptic Gas Fees — live gas prices across chains (Ethereum, Base) with slow/average/fast tiers in Gwei + estimated transfer cost. GET no params. Plan your on-chain transaction timing.

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-gas-fees
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-global` — $0.01

`GET https://api.xynaptic.io/v1/crypto-global — `(marche crypto global CMC)``

**What it does.** Xynaptic Crypto Global — global crypto market snapshot (CoinMarketCap Pro): total market cap, BTC/ETH dominance, 24h volume, market trend assessment. GET (no params).

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-global (marche crypto global CMC)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-historical` — $0.02

`GET https://api.xynaptic.io/v1/crypto-historical — `(coin + days?)``

**What it does.** Xynaptic Crypto Historical — OHLCV history for backtests: 30, 90 or 365 days, daily candles from CoinGecko. GET ?coin=bitcoin&days=365. Returns timestamped [open, high, low, close] arrays.

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-historical (coin + days?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-market` — $0.02

`GET https://api.xynaptic.io/v1/crypto-market`

**What it does.** Xynaptic Crypto Market — real-time market regime analysis: top 100 assets by market cap, gainers/losers, breadth, volatility, sentiment and regime (risk-on/risk-off). USD only, agent-ready.

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-market
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-movers` — $0.02

`GET https://api.xynaptic.io/v1/crypto-movers — `(?limit=5 — top gainers/losers 24h filtres)``

**What it does.** Xynaptic Crypto Movers — top gainers and losers 24h with volume filter (CoinMarketCap Pro): clean lists of real movers, not low-liquidity scams, with prices and % changes. GET (?limit=5).

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-movers (?limit=5 — top gainers/losers 24h filtres)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-news` — $0.02

`GET https://api.xynaptic.io/v1/crypto-news`

**What it does.** Xynaptic Crypto News — top crypto headlines (BTC, ETH, regulation, macro) with importance scoring, timestamp and source. Refreshed every 2 hours.

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-news
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-onchain` — $0.1

`GET https://api.xynaptic.io/v1/crypto-onchain`

**What it does.** Xynaptic Crypto Onchain — live Bitcoin network data: recommended fees, mempool congestion, difficulty adjustment and hashrate context. Real-time from mempool.space.

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-onchain
-> 402 Payment Required (price: $0.1)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-orderflow` — $0.05

`GET https://api.xynaptic.io/v1/crypto-orderflow`

**What it does.** Xynaptic Crypto Orderflow — real-time market microstructure: CVD (cumulative volume delta), buy/sell pressure ratio, aggressive market orders, whale trades (>$100k), order book imbalance. Parameter: ?pair=BTCUSD. Kraken live tape + book.

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-orderflow
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-portfolio` — $0.05

`POST https://api.xynaptic.io/v1/crypto-portfolio — `(holdings)``

**What it does.** Xynaptic Crypto Portfolio — bring your holdings [{coin, weight or amount}]: we fetch live prices and compute per-position value, 90d volatility, concentration (HHI), BTC correlation per asset, and aggregate risk. POST body: { holdings: [{coin: bitcoin, amount?: 0.5, weight?: 30}], currency?: usd }. Informational only.

**How to use.**

```
POST https://api.xynaptic.io/v1/crypto-portfolio (holdings)
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-price` — $0.01

`GET https://api.xynaptic.io/v1/crypto-price`

**What it does.** Xynaptic Crypto Price — real-time snapshot of 6 major crypto assets (BTC, ETH, SOL, ADA, LINK, DOT) with 24h changes, breadth and top movers. USD only, agent-ready.

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-price
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-risk` — $0.05

`GET https://api.xynaptic.io/v1/crypto-risk`

**What it does.** Xynaptic Crypto Risk — drawdowns from ATH, 7d/30d momentum and risk grade for major crypto assets. Refreshed every 2 hours.

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-risk
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-screener` — $0.02

`GET https://api.xynaptic.io/v1/crypto-screener — `(limit?)``

**What it does.** Xynaptic Crypto Screener — the market pulse: top gainers and losers 24h, highest volumes, most extreme moves from the top 250. GET ?limit=5. Fresh attention feed for trading agents.

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-screener (limit?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-tokenomics` — $0.03

`GET https://api.xynaptic.io/v1/crypto-tokenomics`

**What it does.** Xynaptic Crypto Tokenomics — supply structure: circulating, total, max supply, FDV, market cap, ATH distance, price. Parameter: ?symbol=btc (CoinGecko id). Vesting/unlocks in v2.

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-tokenomics
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-trading-analysis` — $0.05

`GET https://api.xynaptic.io/v1/crypto-trading-analysis`

**What it does.** Xynaptic Crypto Trading Analysis — technical analysis of any Kraken pair: RSI(14), MACD, EMA 20/50/200, recent support/resistance, trend and momentum verdict. Parameters: ?pair=BTCUSD&timeframe=4h|1h|1d. Real-time OHLC.

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-trading-analysis
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-validate` — $0.1

`GET https://api.xynaptic.io/v1/crypto-validate`

**What it does.** Xynaptic Token Validate — full pre-purchase security audit of any token: contract checks (open source, proxy), honeypot detection, buy/sell taxes and slippage simulation, liquidity depth, exit liquidity (sell simulation), market conditions, news flags, recommended max trade size, composite risk verdict. Parameters: ?address=0x...&chain=1.

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-validate
-> 402 Payment Required (price: $0.1)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-wallet-health` — $0.02

`GET https://api.xynaptic.io/v1/crypto-wallet-health — `(address + chain)``

**What it does.** Xynaptic Crypto Wallet Health — score any Bitcoin or EVM address: balance, tx count, first/last activity (age), activity pattern and a composite health verdict (dormant/active/empty/high-risk). GET ?address=...&chain=btc|eth.

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-wallet-health (address + chain)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `crypto-whales` — $0.02

`GET https://api.xynaptic.io/v1/crypto-whales — `(min_btc? + limit?)``

**What it does.** Xynaptic Crypto Whales — live large Bitcoin transfers straight from the network: biggest mempool transactions and recent block flows, sorted by value (BTC + USD). Spot accumulation/distribution in real-time. GET ?min_btc=10 (&limit=10).

**How to use.**

```
GET https://api.xynaptic.io/v1/crypto-whales (min_btc? + limit?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `fiat-usdc-rate` — $0.02

`GET https://api.xynaptic.io/v1/fiat-usdc-rate — `(?currency=EUR — meilleur taux fiat↔USDC par rail)``

**What it does.** Xynaptic Fiat-USDC Rate — best fiat↔USDC conversion rate per payment rail (Base, Polygon, Solana): Coinbase spot, spread, network fees, best-rail verdict. GET ?currency=EUR.

**How to use.**

```
GET https://api.xynaptic.io/v1/fiat-usdc-rate (?currency=EUR — meilleur taux fiat↔USDC par rail)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `wallet-screen` — $0.03

`GET https://api.xynaptic.io/v1/wallet-screen — `(address + chain — screening d'un wallet avant transaction)``

**What it does.** Xynaptic Wallet Screen — pre-transaction risk screening of any Bitcoin or EVM address: on-chain profile (balance, tx count) plus risk signals (empty/drained wallet, contract address, low activity, high exposure) each with a severity, and an overall risk level. Informational screening, not a compliance decision. GET ?address=...&chain=btc|eth.

**How to use.**

```
GET https://api.xynaptic.io/v1/wallet-screen (address + chain — screening d'un wallet avant transaction)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
