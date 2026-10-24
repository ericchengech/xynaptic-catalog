# Xynaptic — Real-world data for AI agents

[![mcp.xynaptic MCP connector – tool definition quality and endpoint health on Glama](https://glama.ai/mcp/connectors/io.xynaptic.mcp/mcpxynaptic/badges/score.svg)](https://glama.ai/mcp/connectors/io.xynaptic.mcp/mcpxynaptic) [![Xynaptic MCP MCP server – quality and maintenance score on Glama](https://glama.ai/mcp/servers/ericchengech/xynaptic-catalog/badges/score.svg)](https://glama.ai/mcp/servers/ericchengech/xynaptic-catalog)

**This repository also contains the Xynaptic MCP server implementation** — a zero-dependency Node.js MCP server (`index.js`, JSON-RPC 2.0 over stdio) that exposes this catalog to MCP clients, plus its `Dockerfile`. Run locally: `node index.js` (Node 18+). Hosted endpoint: mcp.xynaptic.io/mcp.



**200+ pay-per-request data & AI APIs — full agent ecosystem: 14 data domains + 3 agent skills, 10 AI vertical agents (OpenAI-compatible /v1/chat/completions with streaming), MCP server at mcp.xynaptic.io/mcp, travel & tourism (destination briefs, weather, routes, train trip planner), worldwide airport briefs, official FAA NOTAMs (airport & geospatial), invoice factoring risk (debtor & portfolio scoring), fiat↔USDC best-rail rates, pre-transaction wallet screening, crypto global metrics & movers (CMC), French legal watch, live French jobs (France Travail API) & recruitment tensions (BMO Dares), supplier compliance screening, used-car dealer check (anti-fraud before buying), the first x402-paid agent SKILLS (supplier due-diligence, payment fraud screening, crypto token audit — method + bundled data calls), battery-metals EV brief (lithium, copper, platinum, palladium), live French electricity demand & cross-border flows (RTE éCO2mix), ephemeral storage, watches, prepaid tickets. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon.**

```
GET https://api.xynaptic.io/v1/energy-price
- **Trust Layer**: machine-readable trust card at https://api.xynaptic.io/trust (free) — identity, x402 compliance, external probes (Market402 A 100/100, vet402 paid PASS), delivery evidence, and a live BTC cross-check CEX (Coinbase) vs DEX (DexScreener on-chain), refreshed on every call.
→ 402 Payment Required (price: $0.005)
→ sign EIP-3009 (or your x402 client)
→ retry with PAYMENT-SIGNATURE
→ 200 JSON: facts, assessment, summary, agent-ready actions
```

**Machine-readable catalog (free):** https://api.xynaptic.io
**Live activity counter (free):** https://api.xynaptic.io/v1/popularity

## Full service reference (new)

Every service, detailed per domain — **What it does** (description, sources) and **How to use** (route, parameters, price, payment flow): **[docs/services/](docs/services/README.md)** — 200+ services, 16+ domains, same taxonomy as the live docs at https://xynaptic.io/docs.

## Domains

| Domain | Services | Highlights |
|---|---|---|
| ⚙️ Xynaptic Core | 7 | `ao` orchestrator · `store-put` · `ticket-buy` |
| 🤖 Skills | 17 | `ai-chat` OpenAI-compatible · `ai-agent` · 3 x402-paid SKILL.md |
| 📈 Crypto | 24 | `crypto-price` · `crypto-orderflow` · `crypto-validate` |
| 💵 Finance | 20 | `security-price` · `security-eu-price` · `security-analysis` |
| 🏦 Banking & Payments | 19 | `bank-statement-parse` · `wallet-screen` · `bank-sanctions-screen` |
| 🏢 Business | 18 | `company-kyb` · `company-financial` · `supplier-risk` |
| 💼 Jobs & Public | 16 | `job-search` · `tender-search` · `legal-brief` |
| 📰 News | 8 | `news-world` · `news-tech` · `news-eu` |
| ✈️ Flight | 9 | `flight-status` · `notam-brief` · `flight-route-risk` |
| 🚆 Rail | 8 | `rail-departures` · `rail-train-status` · `rail-disruptions` |
| 🗺 Travel & Tourism | 4 | `destination-brief` · `travel-weather` · `trip-planner` |
| ⚡ Energy | 11 | `energy-price` · `energy-charge-window` · `energy-demand` |
| 🏭 Industry & Commodities | 11 | `commodity-price` · `industrial-supply` · `supplier-compliance` |
| 🏠 Property | 11 | `property-valuation` · `property-price` · `property-risk` |
| 🛡️ Insurance | 10 | `insurance-policy` · `insurance-profile` · `insurance-eligibility` |
| 🏥 Health | 8 | `health-drug-info` · `health-clinical-trials` · `health-news` |
| 🛠️ Dev Kit | 6 | `code-review` · `code-fix` · `code-refactor` · `test-generate` · `error-explain` · `security-review` |

## Dev Kit — LLM-powered developer tools

Six developer tools that run on Xynaptic's LLM layer (glm-5.3-flash / deepseek routing, JSON-strict output). Paste code or a stacktrace, get expert-grade analysis back. Pay per call in USDC, like every catalog service.

| Tool | What it does | Input | Price |
|---|---|---|---|
| `code-review` | Severity-ranked code review with quality score; optional `include_fix` for suggested fixes | `code` (10–12000 chars, any language) | $0.05 |
| `code-fix` | Buggy code in, corrected version out — with the bug explained line by line | `code` | $0.05 |
| `code-refactor` | Behavior-preserving refactor: cleaner structure, readability wins, recommended tests | `code` | $0.05 |
| `test-generate` | Functional test cases, code skeletons and security checks for any snippet | `code` | $0.05 |
| `error-explain` | Paste a stacktrace, get the root cause explained with a concrete fix | `error` (stacktrace or error text) | $0.03 |
| `security-review` | Security audit of code or config: vulnerabilities, secrets exposure, injection risks, hardening advice | `content` (code or config, multi-format) | $0.05 |

**Dev Kit subscription — $15/mo for coding agents.** 1,000 units/month (100/hour cap) covering all 6 dev endpoints. Everything else stays pay-per-call.
```
POST https://api.xynaptic.io/v1/sub-buy
{ "plan": "devkit" }
-> 402 x402 $15 USDC -> sign -> sub_key
Authorization: Bearer *** on the 6 dev endpoints
```
```
POST https://api.xynaptic.io/v1/code-review
-> 402 Payment Required (price: $0.05)
-> pay via x402, retry with PAYMENT-SIGNATURE
-> 200 JSON: { findings: [...], quality_score, ... }
```

All six are live and QA-settled on Base, Solana and Polygon. Also exposed through the MCP server (mcp.xynaptic.io/mcp).

## Agent Skills — the first x402-paid skills

A skill is a complete method (SKILL.md, Claude/OpenClaw-compatible) that chains several catalog services with decision grids, thresholds and abort rules. Buy the method once ($0.25), then execute it: each data call is paid per-use via x402 as usual.

| Skill | What it does | Chains | Price |
|---|---|---|---|
| `skill-supplier-due-diligence` | Vet a French supplier before contracting: 5-step method (identity, KYB, compliance, financials, press) with GO / GO-WITH-CONDITIONS / NO-GO grid | company-search, company-kyb, supplier-compliance, company-financial, company-news | $0.25 |
| `skill-payment-fraud-screening` | Screen any outgoing payment (fiat or crypto) before sending: sanctions signals, wallet screening, structure risk, with SEND / SEND-WITH-CHECKS / BLOCK rules | bank-payment-risk, bank-sanctions-screen, wallet-screen | $0.25 |
| `skill-crypto-token-audit` | Audit a token before buying: contract security, tokenomics, market state, flow — BUY / CAUTION / AVOID grid | crypto-validate, crypto-tokenomics, crypto-price, crypto-risk, crypto-orderflow | $0.25 |

```
GET https://api.xynaptic.io/v1/skill-supplier-due-diligence
-> 402 Payment Required (price: $0.25)
-> pay via x402, retry with PAYMENT-SIGNATURE
-> 200 JSON: { skill_md: "<full SKILL.md — method, grids, exact endpoint calls>" }
```

The returned `skill_md` is a standard SKILL.md (YAML frontmatter + step-by-step method): an agent can execute it directly, calling the chained services as it goes.

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

Full domains so an agent never has to leave Xynaptic:

- **BANKING/MONETICS (16 services)** — from raw statement parsing to fraud detection,
  chargeback classification, counterparty KYB and payment routing: the complete
  journey of a banking agent. Bring-your-own-data, nothing stored, disclaimers on
  every decision-adjacent route.
- **SECURITIES (19 services)** — the full services on official US regulator data (EDGAR filings, XBRL fundamentals, insider, earnings, dividends) + 6 EU routes (Yahoo Finance EU markets): live prices Paris/XETRA/LSE/Amsterdam, technicals RSI/momentum, analysis, compare, risk — local currency + EUR
  (SEC EDGAR) + live prices: identity, fundamentals, technicals, risk, filings
  full-text, insider transactions, dividends, earnings, daycare watches,
  devil's-advocate validation and portfolio analysis.
- **HEALTH + REAL ESTATE + INDUSTRY + INSURANCE (42 services)** — four new domains, all QA-settled: official health sources (openFDA, ClinicalTrials.gov, PubMed, ScopeSanté, RPPS 2.3M pros), official French real-estate transactions (DGFiP DVF, 915k+ sales, median €/m²), live commodities + INSEE producer prices + supplier intelligence, and the AI insurance suite (policy parsing, claim structuring, coverage verdicts, legal-basis quotes).
- **WEB + QUANT + FRENCH PUBLIC DATA (11 services)** — `ai-search` gives agents real web access
  with sourced answers; the crypto quant pack (portfolio, historical, correlation, screener, gas fees)
  completes the trading stack; `company-news` closes the KYB loop with press; `intermodal-compare`
  crosses real SNCF data with flight estimates; `tender-search` opens official public procurement;
  `gas-tariff-zone` and `news-economy-fr` add CRE-regulated data and live economy press.
- **INTERNATIONAL COMPANIES (2 services)** — GLEIF LEI registry, 200+ jurisdictions
  worldwide: search by name, full identity by LEI. French registry (11 services)
  remains the deep end; LEI is the global layer.

## The company services

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

## The crypto services

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