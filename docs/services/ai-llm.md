# Skills — Xynaptic service reference

> 17 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Polygon or Solana. Machine-readable catalog: https://api.xynaptic.io — prices and routes re-verified against the live catalogue on 2026-11-16.

**How x402 works**

`GET`/`POST` any endpoint → `402 Payment Required` (x402 **v2** challenge, CAIP-2 networks) → sign with any x402 client on Base, Polygon or Solana → retry the same request with the `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready. The 402 is free to trigger: no USDC leaves your wallet until you sign.

**Read this before you trust the 402 body.** The `402` also carries a discovery block (`extensions.bazaar.info.input.body`) with an example request body. For five of the six AI services below that example uses a field name the catalogue does not document, so an agent that copies it will send the wrong body:

| service | field the docs use | field shown in the 402 example |
|---|---|---|
| `ai-chat` | `messages` | `prompt` |
| `ai-search` | `question` | `query` |
| `ai-translate` | `value` | `text` (+ `target`) |
| `ai-brief-me` | `sirens` / `assets` / `news_regions` | `topic` |
| `ai-validate` | `thesis` | `value` |
| `ai-agent` | `task` | `task` (correct) |

The parameter tables below follow the catalogue and the service descriptions, which is what the endpoints themselves document. The mismatch is reported upstream (2026-11-16); until it is fixed, treat the 402 example bodies as decoration, not as a contract.

---

## `ai-chat` — $0.02

`POST https://api.xynaptic.io/v1/ai-chat` — OpenAI-compatible chat completion.

**What it does.**

One LLM completion per call, no API key. You send an OpenAI-style `messages` array; the service routes it server-side across its model pool (the catalogue names `deepseek-flash` / `deepseek-v4-pro`) and returns a completion with token usage. `"model": "auto"` lets the router choose.

**Parameters.**

| field | required | notes |
|---|---|---|
| `messages` | yes | array of `{role, content}`; OpenAI roles (`system`, `user`, `assistant`) |
| `model` | no | `"auto"` for server-side routing; naming a specific model is not documented as supported |

Nothing else is documented (no `max_tokens`, `temperature`, `stream`, tools or function-calling contract). Treat unlisted fields as unverified.

**Verify without paying.** Unpaid call, observed on 2026-11-16 (this is the expected result — it proves the route is live and shows the price):

```bash
curl -s -i -X POST https://api.xynaptic.io/v1/ai-chat \
  -H 'content-type: application/json' \
  -d '{"model":"auto","messages":[{"role":"user","content":"Reply with OK."}]}'
```

```
HTTP/2 402
PAYMENT-REQUIRED: <base64 JSON>
```

The 402 body is an x402 **v2** challenge (`"x402Version":2`) with three `accepts` entries — Base (`eip155:8453`), Polygon (`eip155:137`) and Solana (`solana:5eykt4...`) — each `"scheme":"exact"`, `"amount":"20000"` atomic USDC (6 decimals) = **$0.02**. Sign with any x402 client, retry the same request with the `PAYMENT-SIGNATURE` header, and the `200` body follows the shape below.

**Response shape.**

```json
{
  "id": "xyn-chat-8f3c1a9b2e",
  "object": "chat.completion",
  "created": 1762725600,
  "model": "deepseek-flash",
  "system_fingerprint": "xynaptic-v2.1",
  "choices": [{"index": 0, "message": {"role": "assistant", "content": "..."}, "finish_reason": "stop"}],
  "usage": {"prompt_tokens": 812, "completion_tokens": 96, "total_tokens": 908},
  "service": "ai-chat",
  "xynaptic": {"model_requested": "auto", "model_used": "deepseek-flash", "routing": "direct", "fallback_used": false}
}
```

(Shape from the catalogue's documented example, not from a paid call.)

**Limits — what you cannot expect.**

- One completion per call, flat $0.02 whatever the token count; `usage` is informational.
- No streaming, no tool/function-calling contract, no conversation memory: send the full history each time.
- `xynaptic.model_used` is the only reliable statement about which model answered — the pool can change without notice.

---

## `ai-agent` — $0.05

`POST https://api.xynaptic.io/v1/ai-agent` — one payment, a whole task.

**What it does.**

The orchestrator: it calls Xynaptic data services as tools (company registry, financials, officers, KYB) plus LLM reasoning, and returns a structured report for the task you describe. It is the premium layer over `ai-chat` — you buy the tool calls and the synthesis in one go.

**Parameters.**

| field | required | notes |
|---|---|---|
| `task` | yes | the task, in natural language |
| `siren` | no | French company identifier to bind the tools to, e.g. `552032534` |

**Verify without paying.** Unpaid call, observed on 2026-11-16 (this is the expected result — it proves the route is live and shows the price):

```bash
curl -s -i -X POST https://api.xynaptic.io/v1/ai-agent \
  -H 'content-type: application/json' \
  -d '{"task":"assess the financial health of this company","siren":"552032534"}'
```

```
HTTP/2 402
PAYMENT-REQUIRED: <base64 JSON>
```

The 402 body is an x402 **v2** challenge (`"x402Version":2`) with three `accepts` entries — Base (`eip155:8453`), Polygon (`eip155:137`) and Solana (`solana:5eykt4...`) — each `"scheme":"exact"`, `"amount":"50000"` atomic USDC (6 decimals) = **$0.05**. Sign with any x402 client, retry the same request with the `PAYMENT-SIGNATURE` header, and the `200` body follows the shape below.

**Response shape.**

`id`, `object` (`agent.task`), `created`, `model`, `choices[0].message.content` (the report), `usage`, `service`, a `tools` array (`name`, `status`) showing which services ran, and `xynaptic` (`model_used`, `routing`, `fallback_used`).

**Limits — what you cannot expect.**

- No determinism: the orchestrator picks the tool chain, so two identical calls can use different tools.
- No step budget is documented beyond the 60 s payment window — plan for a synchronous call.
- Company-centric today (registry, financials, officers, KYB); it is not a general-purpose agent with arbitrary tool access.

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

`POST https://api.xynaptic.io/v1/ai-translate` — messy text in, structured JSON out.

**What it does.**

Despite the name it is not a language translator: you paste raw content (CSV, table, email, notice, listing, anything unstructured) and an LLM extracts it into clean JSON, optionally following a short description of the fields you want. The format adapter for agents.

**Parameters.**

| field | required | notes |
|---|---|---|
| `value` | yes | the raw text, **max 12,000 characters** |
| `target_schema` | no | short natural-language description of the desired fields (not a JSON Schema document) |

**Verify without paying.** Unpaid call, observed on 2026-11-16 (this is the expected result — it proves the route is live and shows the price):

```bash
curl -s -i -X POST https://api.xynaptic.io/v1/ai-translate \
  -H 'content-type: application/json' \
  -d '{"value":"ACME SARL;12 rue de Rivoli;75001 Paris","target_schema":"name, street, postcode, city"}'
```

```
HTTP/2 402
PAYMENT-REQUIRED: <base64 JSON>
```

The 402 body is an x402 **v2** challenge (`"x402Version":2`) with three `accepts` entries — Base (`eip155:8453`), Polygon (`eip155:137`) and Solana (`solana:5eykt4...`) — each `"scheme":"exact"`, `"amount":"10000"` atomic USDC (6 decimals) = **$0.01**. Sign with any x402 client, retry the same request with the `PAYMENT-SIGNATURE` header, and the `200` body follows the shape below.

**Response shape.**

Same envelope as `ai-chat`: `id`, `object` (`translate.result`), `created`, `model`, `choices[0].message.content`, `usage`, `service`, `xynaptic`. The structured result arrives **inside `choices[0].message.content`** — per the catalogue example, as JSON text ("one object per row"), so parse that string rather than expecting a top-level object.

**Limits — what you cannot expect.**

- 12,000 characters per call; longer documents must be split.
- `target_schema` is a hint, not a contract: fields can be missing, renamed or inferred. Validate before writing to a database.
- One call = one extraction; no pagination, no file upload, no OCR (text only).

---

## `ai-brief-me` — $0.05

`POST https://api.xynaptic.io/v1/ai-brief-me` — one payment, a composite brief.

**What it does.**

The shopping basket: pick companies, crypto assets and news regions, and the service collects everything internally (company registry, market data, headlines) and has an LLM synthesise a single structured brief. Empty picks give a general market brief.

**Parameters.** All optional, all capped.

| field | limits | notes |
|---|---|---|
| `sirens` | up to **3** | French company identifiers (SIREN), e.g. `552032534` |
| `assets` | up to **5** | crypto symbols, e.g. `BTC`, `ETH` |
| `news_regions` | up to **2** | e.g. `eu`, `world`, `us`, `tech` |

**Verify without paying.** Unpaid call, observed on 2026-11-16 (this is the expected result — it proves the route is live and shows the price):

```bash
curl -s -i -X POST https://api.xynaptic.io/v1/ai-brief-me \
  -H 'content-type: application/json' \
  -d '{"sirens":["552032534"],"assets":["BTC","ETH"],"news_regions":["eu"]}'
```

```
HTTP/2 402
PAYMENT-REQUIRED: <base64 JSON>
```

The 402 body is an x402 **v2** challenge (`"x402Version":2`) with three `accepts` entries — Base (`eip155:8453`), Polygon (`eip155:137`) and Solana (`solana:5eykt4...`) — each `"scheme":"exact"`, `"amount":"50000"` atomic USDC (6 decimals) = **$0.05**. Sign with any x402 client, retry the same request with the `PAYMENT-SIGNATURE` header, and the `200` body follows the shape below.

**Response shape.**

`id`, `object` (`brief.composite`), `created`, `model`, `choices[0].message.content` (the brief), `usage`, `service`, plus a `tools` array listing what was actually collected (e.g. `company-profile`, `crypto-price`, `news-eu`, each with a `status`) and the `xynaptic` block.

**Limits — what you cannot expect.**

- The caps above are per call; exceeding them is not documented as an error, but do not rely on the extra picks being processed.
- The brief is narrative (`message.content`), not a fixed schema; downstream parsing must be tolerant.
- $0.05 whether you pass one asset or fill every slot.

---

## `ai-validate` — $0.10

`POST https://api.xynaptic.io/v1/ai-validate` — the devil's advocate for a thesis.

**What it does.**

Submit a claim (investment idea, company assessment, market call); the service stress-tests it against real data (company registry, crypto market, news) and an adversarial LLM review. It returns strengths, weaknesses, factual contradictions with cited figures, a counter-thesis and a verdict.

**Parameters.**

| field | required | notes |
|---|---|---|
| `thesis` | yes | your claim, **max 4,000 characters** |
| `subject` | no | a SIREN or a crypto symbol to anchor the data lookup |

Verdict values: `supported`, `partially_supported`, `contradicted`, each with a confidence.

**Verify without paying.** Unpaid call, observed on 2026-11-16 (this is the expected result — it proves the route is live and shows the price):

```bash
curl -s -i -X POST https://api.xynaptic.io/v1/ai-validate \
  -H 'content-type: application/json' \
  -d '{"thesis":"ACME will grow revenue 20% in 2027","subject":"552032534"}'
```

```
HTTP/2 402
PAYMENT-REQUIRED: <base64 JSON>
```

The 402 body is an x402 **v2** challenge (`"x402Version":2`) with three `accepts` entries — Base (`eip155:8453`), Polygon (`eip155:137`) and Solana (`solana:5eykt4...`) — each `"scheme":"exact"`, `"amount":"100000"` atomic USDC (6 decimals) = **$0.10**. Sign with any x402 client, retry the same request with the `PAYMENT-SIGNATURE` header, and the `200` body follows the shape below.

**Response shape.**

`id`, `object` (`validate.verdict`), `created`, `model`, `choices[0].message.content` (the review text — the catalogue example reads "Verdict: partially supported. Two strengths, three weaknesses, one factual contradiction."), `usage`, `service`, `xynaptic`.

**Limits — what you cannot expect.**

- It is a cited opinion, not an audit: contradictions are only as good as the underlying registry/market/news data.
- The verdict lives in prose inside `message.content`; there is no documented top-level `verdict` field.
- 4,000 characters of thesis, one shot per call, no follow-up questions.

---

## `ai-search` — $0.02

`POST https://api.xynaptic.io/v1/ai-search` — live web search plus a sourced answer.

**What it does.**

You ask a question; the service runs a real DuckDuckGo search, then an LLM synthesises the answer and keeps every claim traceable to a source (title + URL + snippet). Freshness is real — this is live web data, not model memory. Nothing is stored.

**Parameters.**

| field | required | notes |
|---|---|---|
| `question` | yes | the question, in natural language |
| `max_results` | no | number of web results used, default `5` |

**Verify without paying.** Unpaid call, observed on 2026-11-16 (this is the expected result — it proves the route is live and shows the price):

```bash
curl -s -i -X POST https://api.xynaptic.io/v1/ai-search \
  -H 'content-type: application/json' \
  -d '{"question":"which x402 facilitators accept USDC on Base?","max_results":5}'
```

```
HTTP/2 402
PAYMENT-REQUIRED: <base64 JSON>
```

The 402 body is an x402 **v2** challenge (`"x402Version":2`) with three `accepts` entries — Base (`eip155:8453`), Polygon (`eip155:137`) and Solana (`solana:5eykt4...`) — each `"scheme":"exact"`, `"amount":"20000"` atomic USDC (6 decimals) = **$0.02**. Sign with any x402 client, retry the same request with the `PAYMENT-SIGNATURE` header, and the `200` body follows the shape below.

**Response shape.**

An OpenAI-style envelope — `id`, `object` (`search.answer`), `created`, `model`, `choices[0].message.content` (the synthesised answer), `usage` — plus `service`, `question`, and a `xynaptic` block (`model_used`, `routing`, `fallback_used`). The catalogue description promises the sources (title + URL + snippet) alongside the answer; the exact field name for that array is not shown in the catalogue example, so read the response keys instead of assuming one (to confirm on the first paid call).

**Limits — what you cannot expect.**

- It is a search-then-summarise pipeline, not a crawler: pages behind a login, JS-only pages and paywalled content may be unavailable.
- Answers are only as good as DuckDuckGo's top `max_results`; no depth or recency parameter is documented.
- No caching, and no citation guarantee beyond the snippets actually returned.

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
