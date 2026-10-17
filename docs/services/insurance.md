# Insurance — Xynaptic service reference

> 10 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works:** `GET` any endpoint → `402 Payment Required` → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `insurance-search` — $0.01

`GET https://api.xynaptic.io/v1/insurance-search` — `(type?)`

**What it does.**

the insurance type panorama: standard coverage families for auto/home/health/pro, current regul

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

the insurance KYB: is this broker/agent officially registered? We find the ORIAS record (French

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

bring a policy text, get its structured reading: coverages, exclusions, deductibles, caps, obli

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

bring a policy and describe an incident: are you covered? Honest analysis of coverage vs exclus

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

describe your incident in free language, get a structured claim form: date, place, goods, circu

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

honest parametric auto insurance estimator: legal bonus/malus coefficient, public rating factor

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

the pedagogical price decomposition: taxes, legal contributions, pure premium vs commercial loa

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

bring your profile/situation, get a readable risk scoring: aggravating/mitigating factors and c

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

bring two policy texts, get the side-by-side: coverage differences, caps, deductibles, coverage

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

general eligibility check + your legal rights: borrower insurance substitution, resiliation inf

**How to use.**

```
POST https://api.xynaptic.io/v1/insurance-eligibility (question + situation?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
