# Health — Xynaptic service reference

> 8 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works**

`GET` any endpoint → `402 Payment Required` → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `health-drug-info` — $0.02

`GET https://api.xynaptic.io/v1/health-drug-info` — `(drug)`

**What it does.**

Xynaptic Health Drug Info — official drug fact sheet: active ingredient, brand/generic names, form, route, dosage label highlights, warnings and boxed warnings from openFDA (US) — official public data, not advice. GET ?drug=aspirin (or ?code=NDC). Informational only — not medical advice.

**How to use.**

```
GET https://api.xynaptic.io/v1/health-drug-info (drug)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `health-drug-interaction` — $0.05

`POST https://api.xynaptic.io/v1/health-drug-interaction` — `(drugs)`

**What it does.**

Xynaptic Health Drug Interaction — bring 2-6 drug names: we fetch their official labels (openFDA), extract documented contraindications and interaction factors, and synthesize a severity-graded interaction report with mechanisms. POST body: { drugs: [aspirin, warfarin] }. Informational only — not medical advice.

**How to use.**

```
POST https://api.xynaptic.io/v1/health-drug-interaction (drugs)
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `health-clinical-trials` — $0.02

`GET https://api.xynaptic.io/v1/health-clinical-trials` — `(condition)`

**What it does.**

Xynaptic Health Clinical Trials — search worldwide clinical trials (ClinicalTrials.gov): status, phase, eligibility, contacts. GET ?condition=diabetes (&drug=&status=&limit=).

**How to use.**

```
GET https://api.xynaptic.io/v1/health-clinical-trials (condition)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `health-medical-literature` — $0.02

`GET https://api.xynaptic.io/v1/health-medical-literature` — `(query)`

**What it does.**

Xynaptic Health Medical Literature — PubMed search for medical research: articles, abstracts, journals, dates, PMIDs. GET ?query=aspirin cardiovascular (&limit=5). Evidence-based medicine research.

**How to use.**

```
GET https://api.xynaptic.io/v1/health-medical-literature (query)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `health-hospital-info` — $0.02

`GET https://api.xynaptic.io/v1/health-hospital-info` — `(name ou city)`

**What it does.**

Xynaptic Health Hospital Info — French healthcare establishments from official ScopeSanté (HAS): name, city, contact, certifications and activity. GET ?name=CHU or ?city=Lyon. Official French data.

**How to use.**

```
GET https://api.xynaptic.io/v1/health-hospital-info (name ou city)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `health-medical-guidelines` — $0.03

`GET https://api.xynaptic.io/v1/health-medical-guidelines` — `(condition)`

**What it does.**

Xynaptic Health Medical Guidelines — official recommendations for a condition: HAS (Haute Autorité de Santé) French guidelines via live search + PubMed Central systematic reviews. GET ?condition=diabetes. Informational only.

**How to use.**

```
GET https://api.xynaptic.io/v1/health-medical-guidelines (condition)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `health-healthcare-provider` — $0.03

`GET https://api.xynaptic.io/v1/health-healthcare-provider` — `(name ou specialty + city)`

**What it does.**

Xynaptic Health Healthcare Provider — French health professionals from the official RPPS directory (Annuaire Santé): doctors by name or specialty in a city, with registration. GET ?name=Martin&city=Paris or ?specialty=cardiologue. Official data.

**How to use.**

```
GET https://api.xynaptic.io/v1/health-healthcare-provider (name ou specialty + city)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `health-news` — $0.01

`GET https://api.xynaptic.io/v1/health-news` — `(summarize?)`

**What it does.**

Xynaptic Health News — live health/medicine press feed (Google News RSS): real titled articles from medical media + optional LLM synthesis. GET (&summarize=true). Informational only.

**How to use.**

```
GET https://api.xynaptic.io/v1/health-news (summarize?)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
