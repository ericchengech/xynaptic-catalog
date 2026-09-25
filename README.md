# Xynaptic — Real-world data for AI agents

**54 pay-per-request data APIs. No API key. No subscription. Pay in USDC via [x402](https://x402.org).**

```
GET https://api.xynaptic.io/v1/energy-price
→ 402 Payment Required (price: $0.005)
→ sign EIP-3009 (or your x402 client)
→ retry with PAYMENT-SIGNATURE
→ 200 JSON: facts, assessment, summary, agent-ready actions
```

**Machine-readable catalog (free):** https://api.xynaptic.io
**Live activity counter (free):** https://api.xynaptic.io/v1/popularity

## Verticals

| Vertical | Routes | Highlights |
|---|---|---|
| 📈 Crypto | 14 | `crypto-orderflow` — CVD, whale trades, book imbalance · `crypto-derivatives` — funding, OI, basis · `crypto-validate` — full pre-purchase token security audit · `crypto-trading-analysis` — RSI/MACD/EMA · `crypto-deep-trading-analysis` — multi-TF conviction · `crypto-defi` — TVL by chain · `crypto-tokenomics` — FDV, dilution · briefs, news, market, onchain, risk |
| ⚡ Energy | 8 | `ev-charge-window` — cheapest EV charging (50 kWh ~€0.19, save 71%) · `battery-arbitrage` — buy/sell spread · `energy-opportunity` — load-shift windows · solar/wind forecasts, grid status |
| 🚆 French rail | 7 | `connection-risk` — "will I make my 15-min transfer?" scored 0-1 · live departures, train status, trip brief (SNCF real-time) |
| ✈️ Aviation | 5 | `flight-route-risk` — composite risk · `flight-alternatives` — nearest airports with live METAR |
| 🏢 Companies (FR) | 13 | `company-kyb` — full due-diligence dossier with agent verdict ($0.10): identity, officers, financials, risk signals, VAT · `company-relationship` — links between two companies (shared officers) · `company-monitor` — watch a company, detect changes over time (recurring checks) · `company-brief-live` — the daily decisional read · `company-compare` — A vs B · `company-changes` — what changed recently · `company-financial` — annual accounts (Danone: revenue $27.4B, margin 7.7%) · search, profile, people, network. French state registry (RNE) |
| 📰 News (v2) | 9 | Structured events: importance, lifecycle, entities, verification |
| 🧠 Orchestrator | 1 | `ao` — free-form question → picks the right services, synthesizes |

## The company funnel

```
SEARCH → PROFILE → PEOPLE / NETWORK / FINANCIAL
                        │
                    RELATIONSHIP (two companies)
                        │
              RELATIONSHIP / COMPARE (two companies)
                        │
              KYB — the $0.10 dossier
          (identity, officers, accounts, risk,
           VAT, verified sources, agent verdict)
                        │
                AI AGENT DECISION
```

Built on the French state registry (RNE) — open data, no key required. Danone example: "minimal risk (0) — active, 13 officers, 2025 accounts, VAT present. Action: proceed."

## The crypto funnel

```
MARKET / NEWS / ONCHAIN
        │
   ORDERFLOW ──── DERIVATIVES ──── DEFI / TOKENOMICS
        │
   TRADING ANALYSIS
        │
DEEP TRADING ANALYSIS
        │
   CRYPTO VALIDATE ──→ AI AGENT
```

**New — the deep read is now fully wired:** `crypto-deep-trading-analysis` synthesizes 5 dimensions in one conviction score — multi-timeframe trend, volatility regime, news sentiment, orderflow (CVD from the live tape) and derivatives (funding, OI, basis). Example: "BTCUSD: neutral (-0.2) — 4h bearish but flow 0.96, funding 0.11%/yr".

Every response chains to the next API you might need (`agent.related_xynaptic_apis`): buy one, discover the rest.

## Quick start

```bash
# Discover the full catalog (free, machine-readable)
curl https://api.xynaptic.io/

# See live activity
curl https://api.xynaptic.io/v1/popularity

# Company due diligence (the premium dossier):
curl https://api.xynaptic.io/v1/company-kyb?siren=552032534

# Any x402 SDK pays automatically, e.g. TypeScript:
# const data = await client.fetch("https://api.xynaptic.io/v1/crypto-validate?address=0x...")
```

Or search us on the **x402 Bazaar**: `searchX402Resources({ query: "orderflow" })`

## Response schema (same across all services)

```json
{
  "service": "crypto-orderflow",
  "facts": { "cvd": 5.05, "buy_sell_ratio": 0.81, "whale_trades": [] },
  "assessment": { "bias": "bullish_flow" },
  "summary": "BTCUSD tape: buy pressure (ratio 0.81), CVD +5.05.",
  "agent": { "actionability": "high", "recommended_actions": ["consider_long"],
             "related_xynaptic_apis": [{ "endpoint": "/v1/crypto-derivatives" }] },
  "data": { "source": "Kraken live tape", "freshness": "real-time" }
}
```

## Networks

- Base (eip155:8453) — USDC
- Polygon (eip155:137) — USDC
- Solana — USDC

*Real-time sources: Kraken, Hyperliquid, DefiLlama, CoinGecko, SNCF/Navitia, aviationweather, EPEX/awattar, Open-Meteo, honeypot.is, DexScreener. Curated 2h digests for news. Built by an independent builder.*