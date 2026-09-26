# Xynaptic — Real-world data for AI agents

**98 pay-per-request data & AI APIs — full agent ecosystem: data, AI, banking, securities, worldwide companies, ephemeral storage, watches, prepaid tickets. No API key. No subscription. Pay in USDC via [x402](https://x402.org).**

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
| 📈 Crypto | 19 | `crypto-orderflow` — CVD, whale trades, book imbalance · `crypto-derivatives` — funding, OI, basis · `crypto-validate` — full pre-purchase token security audit · `crypto-trading-analysis` — RSI/MACD/EMA · `crypto-deep-trading-analysis` — multi-TF conviction · `crypto-defi` — TVL by chain · `crypto-tokenomics` — FDV, dilution · briefs, news, market, onchain, risk · `crypto-portfolio` ($0.05) · `crypto-historical` ($0.02) · `crypto-correlation` ($0.02) · `crypto-screener` ($0.02) · `crypto-gas-fees` ($0.005) |
| ⚡ Energy | 8 | `ev-charge-window` — cheapest EV charging (50 kWh ~€0.19, save 71%) · `battery-arbitrage` — buy/sell spread · `energy-opportunity` — load-shift windows · solar/wind forecasts, grid status | · `gas-tariff-zone` — official CRE gas price zone by postcode ($0.005)
| 🚆 French rail | 7 | `connection-risk` — "will I make my 15-min transfer?" scored 0-1 · live departures, train status, trip brief (SNCF real-time) | · `intermodal-compare` — real SNCF train vs estimated plane, verdict ($0.03)
| ✈️ Aviation | 5 | `flight-route-risk` — composite risk · `flight-alternatives` — nearest airports with live METAR |
| 🧺 Ecosystem | 11 | `store-put`/`store-get` — encrypted ephemeral storage, claim_secret is the only key, TTL 1-30 days, then cryptographically destroyed ($0.001) · `watch-put`/`watch-status` — the agent daycare: we watch your conditions hourly (crypto price/change, company registry), result delivered encrypted ($0.01 / $0.001) · `ai-translate` — bring your own data: raw text/CSV → clean structured JSON ($0.01) · `ai-brief-me` — the shopping basket: ONE payment = companies + assets + news composite brief with LLM synthesis ($0.05) · `ai-validate` — devil's advocate premium: your thesis stress-tested against real data, verdict + confidence ($0.10) · `ticket-buy`/`ticket-status` — prepaid credit 0.5-20 USDC, then consume ANY service via `X-TICKET` header at 20% off, no per-call blockchain payment, 90 days (status check free) |
| 📈 Securities | 13 | `security-search` — ticker → SEC EDGAR identity: CIK, exchanges, SIC, 10 latest filings ($0.005) · `security-price` — spot + 52w range + up to 30d OHLCV history ($0.01) · `security-fundamentals` — multi-year EDGAR XBRL: revenues, net income, assets, equity + YoY ($0.03) · `security-technical` — SMA 20/50/200, EMA, RSI-14, momentum, trend ($0.02) · `security-risk` — annualized vol, max drawdown, VaR95, Sharpe proxy, risk level ($0.02) · `security-analysis` — premium LLM analyst report with verdict ($0.10) · `security-filings` — EDGAR full-text search ($0.02) · `security-insider` — Form 4 insider transactions ($0.02) · `security-dividends` — XBRL DPS history + live yield ($0.02) · `security-earnings` — quarterly EPS/net income/revenue from XBRL ($0.02) · `security-watch` — daycare for stocks: price/RSI watched hourly ($0.01) · `security-validate` — market devil's advocate: thesis stress-tested against real data ($0.10) · `portfolio-analysis` — bring your holdings: concentration HHI, weighted vol, risk ($0.05) |
| 🏦 Banking | 16 | `bank-statement-parse` — raw statement text → clean transactions ($0.01) · `bank-transaction-categorize` — hybrid rules+LLM categories, merchants, recurrence ($0.02) · `bank-cashflow` — inflows/outflows, burn rate, recurring detection, 30d projection ($0.03) · `bank-financial-health` — liquidity trend, concentration, anomalies, health score ($0.05) · `bank-spending-goals` — goal vs capacity, category cuts, action plan ($0.02) · `bank-reconciliation` — bank vs internal matching, adjustments ($0.03) · `bank-payment-risk` — payment instruction screening: jurisdictions, urgency, amount signals ($0.03) · `bank-counterparty-profile` — full registry profile + payment signals before paying ($0.05) · `bank-beneficiary-watch` — daycare: registry changes on a counterparty ($0.01) · `bank-sanctions-screen` — batch screening up to 100 beneficiaries ($0.03) · `card-bin-check` — BIN → scheme/issuer/type/country ($0.005) · `bank-iban-validate` — mod-97 + country format + FR parts parsing ($0.005) · `bank-bic-check` — ISO 9362 structural + SEPA zone ($0.005) · `card-transaction-intelligence` — fraud patterns: card testing, impossible geo-velocity, outliers ($0.02) · `card-chargeback-analysis` — genuine vs friendly fraud classification + recommendation ($0.03) · `payment-routing-advice` — SEPA/instant/card/SWIFT compared, best rail recommended ($0.02) |
| 🌍 International | 2 | `company-international-search` — worldwide company search by name (GLEIF LEI, 200+ jurisdictions: EU, US, UK, Asia, Canada, Australia) ($0.01) · `company-international-profile` — full global identity by LEI: legal name, address, jurisdiction, legal form, status dates ($0.03) |
| 📜 Public Tenders | 1 | `tender-search` — French procurement notices (BOAMP official open data): keyword, buyer, department, deadline, direct links ($0.02) |
| 🤖 AI Layer | 4 | `ai-company` — VERTICAL AGENT: deep French company dossier (5 registry tools: identity, officers, multi-year accounts, footprint, KYB risk signals) + LLM KYB specialist report with verdict and confidence ($0.10) · `ai-finance` — VERTICAL AGENT: full market analysis (5 crypto tools: price, market, orderflow, derivatives, risk) + LLM analyst synthesis, sources cited, no financial advice ($0.05) · `ai-agent` — general orchestrator: task + tools + LLM, one payment ($0.05) · `ai-chat` — LLM inference pay-per-call, OpenAI-compatible, model auto glm-5.3-flash/deepseek-4.1-flash ($0.005) | `ai-agent` — ONE payment, full task: orchestrates Xynaptic data services as tools (registry, financials, officers, KYB signals) + LLM synthesis → structured report ($0.10... $0.05) · `ai-chat` — LLM inference pay-per-call, OpenAI-compatible, model auto (glm-5.3-flash / deepseek-4.1-flash), token usage ($0.005) |
| 🏢 Companies (FR) | 13 | `company-kyb` — full due-diligence dossier with agent verdict ($0.10): identity, officers, financials, risk signals, VAT · `company-relationship` — links between two companies (shared officers) · `company-monitor` — watch a company, detect changes over time (recurring checks) · `company-brief-live` — the daily decisional read · `company-compare` — A vs B · `company-changes` — what changed recently · `company-financial` — annual accounts (Danone: revenue $27.4B, margin 7.7%) · search, profile, people, network. French state registry (RNE) | · `company-news` — live press radar by name or SIREN ($0.02)
| 📰 News (v2) | 9 | Structured events: importance, lifecycle, entities, verification |
| 🇫🇷 News FR Éco | 1 | `news-economy-fr` — live French economy press (Google News RSS, sourced LLM synthesis) ($0.01) |
| 🧠 Orchestrator | 1 | `ao` — free-form question → picks the right services, synthesizes |

## The AI layer (new)

```
INFERENCE
  POST /v1/ai/chat — $0.005
  OpenAI-compatible {model, messages[]}
  → x402 → glm-5.3-flash (fallback: deepseek)
  → JSON answer + token usage

ORCHESTRATION
  POST /v1/ai/agent — $0.05
  {task, siren?} → ONE payment
  → internal tools (registry data — free)
  → LLM synthesis → structured report

VERTICAL AGENTS
  POST /v1/ai/company — $0.10
  {siren, focus?: risk|financial|overview}
  → 5 registry tools (deep dossier)
  → LLM KYB specialist: identity,
    management, financials, risk signals,
    VERDICT (proceed/review/stop) + confidence

  POST /v1/ai/finance — $0.05
  {asset, question?}
  → 5 market tools (price, orderflow,
    derivatives, risk)
  → LLM analyst: sourced report
    (Kraken, Hyperliquid), no financial advice
```

The client agent pays once; Xynaptic monetizes data + orchestration + inference. The LLM uses ONLY tool data — empty context = honest "no data" instead of invention (verified in QA twice).

```
POST /v1/ai/chat — $0.005 per call
  OpenAI-compatible {model, messages[]}
  → x402 payment → glm-5.3-flash
    (fallback: deepseek-4.1-flash)
  → JSON answer + token usage

POST /v1/ai/agent — $0.05 per task
  {task, siren?}
  → ONE x402 payment
  → internal tools (company registry,
    financials, officers, KYB signals)
    — free for us, data-true
  → LLM synthesis (cites the numbers)
  → structured report
```

The agent client pays once; Xynaptic monetizes data + orchestration + inference. The LLM is instructed to use ONLY the tool data — if the context is empty, it says so instead of inventing (verified in QA).

## The agent ecosystem (new)

Six bricks that make an agent **live** in Xynaptic — not just query it:

```
STORE       deposit any JSON, encrypted at rest, claim_secret = the only key
            TTL 1-30 days, then cryptographically destroyed. Handoff-friendly:
            share {store_id, claim_secret} to pass an object to another agent.

WATCH       the daycare: "tell me when BTC < 80000" or "alert if company
            552032534 changes" — our evaluator checks hourly (cron), result
            is encrypted with your watch_secret, delivered via watch-status.

TRANSLATE   bring your own data: paste raw text (CSV, email, notice, listing)
            → clean structured JSON matching your target_schema.

BRIEF-ME    the shopping basket: ONE payment → up to 3 companies + 5 assets +
            2 news regions, collected internally + LLM morning brief synthesis.

VALIDATE    the devil's advocate: submit a thesis, we stress-test it against
            real data (registry, market) — strengths, weaknesses, factual
            contradictions with cited figures, counter-thesis, verdict + confidence.

TICKETS     prepaid credit, no account: pay once (0.5-20 USDC), then send
            header `X-TICKET: ticket_id|ticket_secret` on ANY service —
            20% off, no per-call blockchain payment, valid 90 days.
            Balance check: POST /v1/ticket-status (free).
```

Each brick is QA-proven with real on-chain settlement, encrypted at rest
where it stores anything, and expires honestly (TTL destroys, no dark patterns).

## The resident domains (new)

Full verticals so an agent never has to leave Xynaptic:

- **BANKING/MONETICS (16 services)** — from raw statement parsing to fraud detection,
  chargeback classification, counterparty KYB and payment routing: the complete
  journey of a banking agent. Bring-your-own-data, nothing stored, disclaimers on
  every decision-adjacent route.
- **SECURITIES (13 services)** — the full funnel on official US regulator data
  (SEC EDGAR) + live prices: identity, fundamentals, technicals, risk, filings
  full-text, insider transactions, dividends, earnings, daycare watches,
  devil's-advocate validation and portfolio analysis.
- **WEB + QUANT + FRENCH PUBLIC DATA (11 services)** — `ai-search` gives agents real web access
  with sourced answers; the crypto quant pack (portfolio, historical, correlation, screener, gas fees)
  completes the trading stack; `company-news` closes the KYB loop with press; `intermodal-compare`
  crosses real SNCF data with flight estimates; `tender-search` opens official public procurement;
  `gas-tariff-zone` and `news-economy-fr` add CRE-regulated data and live economy press.
- **INTERNATIONAL COMPANIES (2 services)** — GLEIF LEI registry, 200+ jurisdictions
  worldwide: search by name, full identity by LEI. French registry (11 services)
  remains the deep end; LEI is the global layer.

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