# Insurance — Xynaptic service reference

> 10 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works:** `GET` any endpoint → `402 Payment Required` → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `insurance-search` — $0.01

`GET https://api.xynaptic.io/v1/insurance-search` — `(type?)`

**What it does.**

Xynaptic Insurance Search — the insurance type panorama: standard coverage families for auto/home/health/pro, current regulatory news. GET ?type=auto. Market knowledge, agent-ready.

**How to use.**

```
GET https://api.xynaptic.io/v1/insurance-search (type?)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `insurance-profile` — $0.03

`GET https://api.xynaptic.io/v1/insurance-profile` — `(name ou orias)`

**What it does.**

Xynaptic Insurance Profile — the insurance KYB: is this broker/agent officially registered? We find the ORIAS record (French official registry of insurance intermediaries) + linked company. GET ?name=Courtier+X or ?orias=12345678. Official French registry.

**How to use.**

```
GET https://api.xynaptic.io/v1/insurance-profile (name ou orias)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `insurance-policy` — $0.03

`POST https://api.xynaptic.io/v1/insurance-policy` — `(policy_text)`

**What it does.**

Xynaptic Insurance Policy — bring a policy text, get its structured reading: coverages, exclusions, deductibles, caps, obligations. POST { policy_text }. AI parsing, your documents never stored.

**How to use.**

```
POST https://api.xynaptic.io/v1/insurance-policy (policy_text)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `insurance-coverage` — $0.03

`POST https://api.xynaptic.io/v1/insurance-coverage` — `(policy_text + incident)`

**What it does.**

Xynaptic Insurance Coverage — bring a policy and describe an incident: are you covered? Honest analysis of coverage vs exclusions with reasoning. POST { policy_text, incident }. Informational analysis.

**How to use.**

```
POST https://api.xynaptic.io/v1/insurance-coverage (policy_text + incident)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `insurance-claim` — $0.05

`POST https://api.xynaptic.io/v1/insurance-claim` — `(incident_narrative)`

**What it does.**

Xynaptic Insurance Claim — describe your incident in free language, get a structured claim form: date, place, goods, circumstances, pre-estimated damages, suggested documents, timeline. POST { incident_narrative }. The claim assistant.

**How to use.**

```
POST https://api.xynaptic.io/v1/insurance-claim (incident_narrative)
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `insurance-quote` — $0.05

`POST https://api.xynaptic.io/v1/insurance-quote` — `(type + profil)`

**What it does.**

Xynaptic Insurance Quote — honest parametric auto insurance estimator: legal bonus/malus coefficient, public rating factors (usage, zone, vehicle class) — a transparent market-range estimate. POST { type:auto, age, bonus, usage, zone }. Indicative — not a binding quote.

**How to use.**

```
POST https://api.xynaptic.io/v1/insurance-quote (type + profil)
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `insurance-premium` — $0.02

`GET https://api.xynaptic.io/v1/insurance-premium` — `(type + annual_premium)`

**What it does.**

Xynaptic Insurance Premium — the pedagogical price decomposition: taxes, legal contributions, pure premium vs commercial load — understand what you pay. GET ?type=auto&annual_premium=650. Transparent calculation.

**How to use.**

```
GET https://api.xynaptic.io/v1/insurance-premium (type + annual_premium)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `insurance-risk` — $0.03

`POST https://api.xynaptic.io/v1/insurance-risk` — `(type + situation)`

**What it does.**

Xynaptic Insurance Risk — bring your profile/situation, get a readable risk scoring: aggravating/mitigating factors and concrete reduction advice. POST { type, situation }. Informational.

**How to use.**

```
POST https://api.xynaptic.io/v1/insurance-risk (type + situation)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `insurance-compare` — $0.05

`POST https://api.xynaptic.io/v1/insurance-compare` — `(policy_a + policy_b)`

**What it does.**

Xynaptic Insurance Compare — bring two policy texts, get the side-by-side: coverage differences, caps, deductibles, coverage gaps — where policy B beats A and vice versa. POST { policy_a, policy_b }. AI comparison.

**How to use.**

```
POST https://api.xynaptic.io/v1/insurance-compare (policy_a + policy_b)
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `insurance-eligibility` — $0.02

`POST https://api.xynaptic.io/v1/insurance-eligibility` — `(question + situation?)`

**What it does.**

Xynaptic Insurance Eligibility — general eligibility check + your legal rights: borrower insurance substitution, resiliation infra-annuelle, Hamon law, LDDI — what the law guarantees you. POST { question, situation }. Legal information (France).

**How to use.**

```
POST https://api.xynaptic.io/v1/insurance-eligibility (question + situation?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
