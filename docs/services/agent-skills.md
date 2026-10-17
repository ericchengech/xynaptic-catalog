# Agent Skills — Xynaptic service reference

> 3 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works:** `GET` any endpoint → `402 Payment Required` with the price → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `skill-crypto-token-audit` — $0.25

`GET https://api.xynaptic.io/v1/skill-crypto-token-audit — `(SKILL.md — méthode audit token avant achat)``

**What it does.** Xynaptic Skill — Crypto Token Audit: the complete pre-purchase method to audit a token — contract security, tokenomics, market state, risk metrics, order flow — with a BUY/CAUTION/AVOID decision grid. The skill text is returned in skill_md; underlying data calls are paid separately via x402. GET no params.

**How to use.**

```
GET https://api.xynaptic.io/v1/skill-crypto-token-audit (SKILL.md — méthode audit token avant achat)
-> 402 Payment Required (price: $0.25)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `skill-payment-fraud-screening` — $0.25

`GET https://api.xynaptic.io/v1/skill-payment-fraud-screening — `(SKILL.md — méthode screening paiement fiat+crypto)``

**What it does.** Xynaptic Skill — Payment Fraud Screening: the method to screen any outgoing payment (fiat or crypto) before sending — beneficiary risk, sanctions signals, wallet screening — with SEND/SEND-WITH-CHECKS/BLOCK abort rules. The skill text is returned in skill_md; underlying data calls are paid separately via x402. GET no params.

**How to use.**

```
GET https://api.xynaptic.io/v1/skill-payment-fraud-screening (SKILL.md — méthode screening paiement fiat+crypto)
-> 402 Payment Required (price: $0.25)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `skill-supplier-due-diligence` — $0.25

`GET https://api.xynaptic.io/v1/skill-supplier-due-diligence — `(SKILL.md — méthode due diligence fournisseur FR)``

**What it does.** Xynaptic Skill — Supplier Due Diligence (France): the complete step-by-step method to vet a French supplier before contracting, as an agent-executable SKILL.md. Covers the 5-call chain (identity, KYB, compliance screening, financials, press) with a decision grid, thresholds, and red-flag abort rules. The skill text is returned in skill_md; underlying data calls are paid separately via x402. GET no params.

**How to use.**

```
GET https://api.xynaptic.io/v1/skill-supplier-due-diligence (SKILL.md — méthode due diligence fournisseur FR)
-> 402 Payment Required (price: $0.25)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
