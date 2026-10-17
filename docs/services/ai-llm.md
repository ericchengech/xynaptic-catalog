# Skills — Xynaptic service reference

> 17 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works:** `GET` any endpoint → `402 Payment Required` → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `ai-chat` — $0.02

`POST https://api.xynaptic.io/v1/ai-chat` — `(body: messages[])`

**What it does.**

LLM inference pay-per-call: OpenAI-compatible messages, model auto-routing (glm-5.3-flash / dee

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

one payment, full task: orchestrates Xynaptic data services as tools (company registry, financi

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

the vertical deep-dive: full French company dossier (identity, officers, multi-year accounts, e

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

one payment, full market analysis: crypto price, orderflow, derivatives and risk data collected

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

bring your own data: paste raw text (CSV, table, email, notice, listing, any messy content) and

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

the shopping basket: ONE payment, a composite morning brief. Pick up to 3 companies (SIREN), 5 

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

the devil's advocate: submit your thesis (an investment idea, a company assessment, a market ca

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

the web access your agent is missing: ask any question, we run a REAL web search (DuckDuckGo), 

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

the vertical real-estate agent: bring a question, it orchestrates the property-* tools (officia

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

Supplier Due Diligence (France): the complete step-by-step method to vet a French supplier befo

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

Payment Fraud Screening: the method to screen any outgoing payment (fiat or crypto) before send

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

Crypto Token Audit: the complete pre-purchase method to audit a token

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

the banking/card vertical agent: bring a question + IBAN/BIC/BIN/name, we run the official vali

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

the insurance vertical agent: coverage families, ORIAS broker registry, premium decomposition +

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

the energy vertical agent: live spot prices, industrial energy costs + an LLM synthesis. POST {

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

the health vertical agent: official drug labels (openFDA), live health press + an LLM synthesis

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

the industry vertical agent: live commodities, industrial market profile, supplier risk + an LL

**How to use.**

```
POST https://api.xynaptic.io/v1/ai-industry (question + sector?/siren?)
-> 402 Payment Required (price: $0.06)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
