# Skills — Xynaptic service reference

> 17 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works**

`GET` any endpoint → `402 Payment Required` → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `ai-chat` — $0.02

`POST https://api.xynaptic.io/v1/ai-chat` — `(body: messages[])`

**What it does.**

Xynaptic AI Chat — LLM inference pay-per-call: OpenAI-compatible messages, model auto-routing (glm-5.3-flash / deepseek-v4.1-flash), JSON response with token usage. POST with body: {"model": "auto", "messages": [{"role": "user", "content": "..."}]}.

**How to use.**

```
POST https://api.xynaptic.io/v1/ai-chat (body: messages[])
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `ai-agent` — $0.05

`POST https://api.xynaptic.io/v1/ai-agent` — `(task + siren?)`

**What it does.**

Xynaptic AI Agent — one payment, full task: orchestrates Xynaptic data services as tools (company registry, financials, officers, KYB) + LLM reasoning, returns a structured report. POST body: {task: ..., siren: 552032534 (optional)}. The premium AI layer.

**How to use.**

```
POST https://api.xynaptic.io/v1/ai-agent (task + siren?)
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `ai-company` — $0.1

`POST https://api.xynaptic.io/v1/ai-company` — `(siren + focus?)`

**What it does.**

Xynaptic AI Company Agent — the vertical deep-dive: full French company dossier (identity, officers, multi-year accounts, establishment footprint, risk signals) + LLM specialist synthesis and verdict. POST body: { siren: 552032534, focus: risk|financial|overview (optional) }. The premium company layer.

**How to use.**

```
POST https://api.xynaptic.io/v1/ai-company (siren + focus?)
-> 402 Payment Required (price: $0.1)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `ai-finance` — $0.05

`POST https://api.xynaptic.io/v1/ai-finance` — `(asset + question?)`

**What it does.**

Xynaptic AI Finance Agent — one payment, full market analysis: crypto price, orderflow, derivatives and risk data collected as tools + LLM analyst synthesis (trend, levels, risk verdict). POST body: { asset: BTC, question: optional }. Crypto markets first.

**How to use.**

```
POST https://api.xynaptic.io/v1/ai-finance (asset + question?)
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `ai-translate` — $0.01

`POST https://api.xynaptic.io/v1/ai-translate` — `(raw value + target_schema?)`

**What it does.**

Xynaptic AI Translate — bring your own data: paste raw text (CSV, table, email, notice, listing, any messy content) and get clean structured JSON back. POST body: { value: <raw text, max 12000 chars>, target_schema?: <short description of desired fields> }. The LLM extracts and structures it — your format translator for agents.

**How to use.**

```
POST https://api.xynaptic.io/v1/ai-translate (raw value + target_schema?)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `ai-brief-me` — $0.05

`POST https://api.xynaptic.io/v1/ai-brief-me` — `(sirens + assets + news_regions)`

**What it does.**

Xynaptic Brief-Me — the shopping basket: ONE payment, a composite morning brief. Pick up to 3 companies (SIREN), 5 crypto assets, and 2 news regions; we collect everything internally (registry, market, headlines) and the LLM synthesizes one structured brief. POST body: { sirens?: [552032534...], assets?: [BTC, ETH...], news_regions?: [eu, world, us, tech...] }. Empty picks = general market brief.

**How to use.**

```
POST https://api.xynaptic.io/v1/ai-brief-me (sirens + assets + news_regions)
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `ai-validate` — $0.1

`POST https://api.xynaptic.io/v1/ai-validate` — `(thesis + subject?)`

**What it does.**

Xynaptic AI Validate — the devil's advocate: submit your thesis (an investment idea, a company assessment, a market call) and we stress-test it against real data (company registry, crypto market, news) and an adversarial LLM review. POST body: { thesis: <your claim, max 4000 chars>, subject?: siren | crypto symbol }. Returns: strengths, weaknesses, factual contradictions with cited figures, counter-thesis, and a verdict: supported | partially_supported | contradicted, with confidence.

**How to use.**

```
POST https://api.xynaptic.io/v1/ai-validate (thesis + subject?)
-> 402 Payment Required (price: $0.1)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `ai-search` — $0.02

`POST https://api.xynaptic.io/v1/ai-search` — `(question)`

**What it does.**

Xynaptic AI Search — the web access your agent is missing: ask any question, we run a REAL web search (DuckDuckGo), then an LLM synthesizes the answer with every claim traceable to its source (title + URL + snippet). POST body: { question, max_results?: 5 }. Freshness is real — this is live web data, not model memory. Nothing stored.

**How to use.**

```
POST https://api.xynaptic.io/v1/ai-search (question)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `ai-property` — $0.1

`POST https://api.xynaptic.io/v1/ai-property` — `(question + city?)`

**What it does.**

Xynaptic AI Property — the vertical real-estate agent: bring a question, it orchestrates the property-* tools (official DVF data) and synthesizes an analyst answer. POST { question, city?, type? }. The premium all-in-one.

**How to use.**

```
POST https://api.xynaptic.io/v1/ai-property (question + city?)
-> 402 Payment Required (price: $0.1)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `skill-supplier-due-diligence` — $0.25

`GET https://api.xynaptic.io/v1/skill-supplier-due-diligence` — `(SKILL.md — méthode due diligence fournisseur FR)`

**What it does.**

Xynaptic Skill — Supplier Due Diligence (France): the complete step-by-step method to vet a French supplier before contracting, as an agent-executable SKILL.md. Covers the 5-call chain (identity, KYB, compliance screening, financials, press) with a decision grid, thresholds, and red-flag abort rules. The skill text is returned in skill_md; underlying data calls are paid separately via x402. GET no params.

**How to use.**

```
GET https://api.xynaptic.io/v1/skill-supplier-due-diligence (SKILL.md — méthode due diligence fournisseur FR)
-> 402 Payment Required (price: $0.25)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `skill-payment-fraud-screening` — $0.25

`GET https://api.xynaptic.io/v1/skill-payment-fraud-screening` — `(SKILL.md — méthode screening paiement fiat+crypto)`

**What it does.**

Xynaptic Skill — Payment Fraud Screening: the method to screen any outgoing payment (fiat or crypto) before sending — beneficiary risk, sanctions signals, wallet screening — with SEND/SEND-WITH-CHECKS/BLOCK abort rules. The skill text is returned in skill_md; underlying data calls are paid separately via x402. GET no params.

**How to use.**

```
GET https://api.xynaptic.io/v1/skill-payment-fraud-screening (SKILL.md — méthode screening paiement fiat+crypto)
-> 402 Payment Required (price: $0.25)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `skill-crypto-token-audit` — $0.25

`GET https://api.xynaptic.io/v1/skill-crypto-token-audit` — `(SKILL.md — méthode audit token avant achat)`

**What it does.**

Xynaptic Skill — Crypto Token Audit: the complete pre-purchase method to audit a token — contract security, tokenomics, market state, risk metrics, order flow — with a BUY/CAUTION/AVOID decision grid. The skill text is returned in skill_md; underlying data calls are paid separately via x402. GET no params.

**How to use.**

```
GET https://api.xynaptic.io/v1/skill-crypto-token-audit (SKILL.md — méthode audit token avant achat)
-> 402 Payment Required (price: $0.25)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `ai-bank` — $0.08

`POST https://api.xynaptic.io/v1/ai-bank` — `(question + iban?/bic?/bin?/name?)`

**What it does.**

Xynaptic AI Bank — the banking/card vertical agent: bring a question + IBAN/BIC/BIN/name, we run the official validation tools (IBAN structure check, BIC lookup, BIN card identification, sanctions screening) and deliver an LLM synthesis. POST { question, iban?, bic?, bin?, counterparty_name? }. Composite, honest.

**How to use.**

```
POST https://api.xynaptic.io/v1/ai-bank (question + iban?/bic?/bin?/name?)
-> 402 Payment Required (price: $0.08)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `ai-insurance` — $0.08

`POST https://api.xynaptic.io/v1/ai-insurance` — `(question + type?/broker?)`

**What it does.**

Xynaptic AI Insurance — the insurance vertical agent: coverage families, ORIAS broker registry, premium decomposition + an LLM synthesis of your question. POST { question, type?, broker_name?, orias? }. Legal information (France).

**How to use.**

```
POST https://api.xynaptic.io/v1/ai-insurance (question + type?/broker?)
-> 402 Payment Required (price: $0.08)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `ai-energy` — $0.06

`POST https://api.xynaptic.io/v1/ai-energy` — `(question + region?)`

**What it does.**

Xynaptic AI Energy — the energy vertical agent: live spot prices, industrial energy costs + an LLM synthesis. POST { question, region? }. Real-time.

**How to use.**

```
POST https://api.xynaptic.io/v1/ai-energy (question + region?)
-> 402 Payment Required (price: $0.06)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `ai-health` — $0.06

`POST https://api.xynaptic.io/v1/ai-health` — `(question + drug?)`

**What it does.**

Xynaptic AI Health — the health vertical agent: official drug labels (openFDA), live health press + an LLM synthesis. POST { question, drug? }. Informational only — not medical advice.

**How to use.**

```
POST https://api.xynaptic.io/v1/ai-health (question + drug?)
-> 402 Payment Required (price: $0.06)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `ai-industry` — $0.06

`POST https://api.xynaptic.io/v1/ai-industry` — `(question + sector?/siren?)`

**What it does.**

Xynaptic AI Industry — the industry vertical agent: live commodities, industrial market profile, supplier risk + an LLM synthesis. POST { question, sector?, siren? }. Real-time.

**How to use.**

```
POST https://api.xynaptic.io/v1/ai-industry (question + sector?/siren?)
-> 402 Payment Required (price: $0.06)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
