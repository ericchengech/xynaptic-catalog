# Agent Runtime & Storage — Xynaptic service reference

> 10 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Full machine-readable catalog: https://api.xynaptic.io

**How x402 works here:** `GET` any endpoint → `402 Payment Required` with the price → sign EIP-3009 (or use any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `store-put` — $0.01

`POST https://api.xynaptic.io/v1/store-put `(value + ttl)``

**What it does.** Xynaptic Ephemeral Store — encrypted scratchpad for agents: deposit a JSON payload (64KB max), we store it encrypted on our infra and return {store_id, claim_secret, expires_at}. TTL 1-30 days, then cryptographically destroyed. POST body: { value: <any JSON>, ttl_days: 30, claim_secret?: <optional own secret> }. The claim_secret is the only key — keep it, lose the data.

**How to use.**

```
POST https://api.xynaptic.io/v1/store-put (value + ttl)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `store-get` — $0.01

`POST https://api.xynaptic.io/v1/store-get `(store_id + claim_secret)``

**What it does.** Xynaptic Ephemeral Store — retrieve a stored object: POST body: { store_id, claim_secret, delete_after_read?: true }. Wrong secret = 403, expired = 410 gone. Handoff friendly: share the pair to let another agent read it.

**How to use.**

```
POST https://api.xynaptic.io/v1/store-get (store_id + claim_secret)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `store-append` — $0.01

`POST https://api.xynaptic.io/v1/store-append `(store_id + claim_secret + value + mode?)``

**What it does.** Xynaptic Ephemeral Store append — merge new JSON into an existing stored object without re-uploading: POST body: { store_id, claim_secret, value: <JSON>, mode?: auto|list|dict|counter|string|wrap, new_claim_secret?: optional key rotation }. Returns the applied mode and new size. Accumulate research results in one object.

**How to use.**

```
POST https://api.xynaptic.io/v1/store-append (store_id + claim_secret + value + mode?)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `watch-status` — free

`POST https://api.xynaptic.io/v1/watch-status `(watch_id + watch_secret)``

**What it does.** Xynaptic Watch status — check if your watch triggered. POST body: { watch_id, watch_secret }. Returns { status: waiting|triggered|expired, checks, result } — the result is decrypted with your watch_secret server-side and delivered. delete_after_read?: true destroys it after this read.

**How to use.**

```
POST https://api.xynaptic.io/v1/watch-status (watch_id + watch_secret)
-> 402 Payment Required (price: free)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `watch-put` — $0.01

`POST https://api.xynaptic.io/v1/watch-put `(condition + ttl)``

**What it does.** Xynaptic Watch — the agent daycare: we watch a condition for you, checked hourly up to 30 days; when triggered the result is encrypted with your watch_secret. Types: crypto_price_above|below, crypto_change_pct, company_officer_change, stock_price_above|below, stock_rsi_below|above, energy_price_above|below, news_keyword. POST body: { type, symbol|ticker|siren|keyword, price|pct|rsi, ttl_days?: 30, watch_secret?: optional }. Returns { watch_id, watch_secret, expires_at }.

**How to use.**

```
POST https://api.xynaptic.io/v1/watch-put (condition + ttl)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `ao` — $0.05

`GET https://api.xynaptic.io/v1/ao`

**What it does.** Xynaptic AO Digest — filtered French public procurement calls (trade + department, France).

**How to use.**

```
GET https://api.xynaptic.io/v1/ao
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `skill-supplier-due-diligence` — $0.25

`GET https://api.xynaptic.io/v1/skill-supplier-due-diligence `(SKILL.md — méthode due diligence fournisseur FR)``

**What it does.** Xynaptic Skill — Supplier Due Diligence (France): the complete step-by-step method to vet a French supplier before contracting, as an agent-executable SKILL.md. Covers the 5-call chain (identity, KYB, compliance screening, financials, press) with a decision grid, thresholds, and red-flag abort rules. The skill text is returned in skill_md; underlying data calls are paid separately via x402. GET no params.

**How to use.**

```
GET https://api.xynaptic.io/v1/skill-supplier-due-diligence (SKILL.md — méthode due diligence fournisseur FR)
-> 402 Payment Required (price: $0.25)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `skill-payment-fraud-screening` — $0.25

`GET https://api.xynaptic.io/v1/skill-payment-fraud-screening `(SKILL.md — méthode screening paiement fiat+crypto)``

**What it does.** Xynaptic Skill — Payment Fraud Screening: the method to screen any outgoing payment (fiat or crypto) before sending — beneficiary risk, sanctions signals, wallet screening — with SEND/SEND-WITH-CHECKS/BLOCK abort rules. The skill text is returned in skill_md; underlying data calls are paid separately via x402. GET no params.

**How to use.**

```
GET https://api.xynaptic.io/v1/skill-payment-fraud-screening (SKILL.md — méthode screening paiement fiat+crypto)
-> 402 Payment Required (price: $0.25)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `skill-crypto-token-audit` — $0.25

`GET https://api.xynaptic.io/v1/skill-crypto-token-audit `(SKILL.md — méthode audit token avant achat)``

**What it does.** Xynaptic Skill — Crypto Token Audit: the complete pre-purchase method to audit a token — contract security, tokenomics, market state, risk metrics, order flow — with a BUY/CAUTION/AVOID decision grid. The skill text is returned in skill_md; underlying data calls are paid separately via x402. GET no params.

**How to use.**

```
GET https://api.xynaptic.io/v1/skill-crypto-token-audit (SKILL.md — méthode audit token avant achat)
-> 402 Payment Required (price: $0.25)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `ticket-buy` — $0.5

`POST https://api.xynaptic.io/v1/ticket-buy `(amount_usd 0.5-20)``

**What it does.** Xynaptic Ticket — prepaid credit: pay once (0.5-20 USDC), get a ticket_id|ticket_secret, consume any service with header X-TICKET at 20% off. Valid 90 days. POST { amount_usd }.

**How to use.**

```
POST https://api.xynaptic.io/v1/ticket-buy (amount_usd 0.5-20)
-> 402 Payment Required (price: $0.5)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
