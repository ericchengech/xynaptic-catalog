# Business — Xynaptic service reference

> 18 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works:** `GET` any endpoint → `402 Payment Required` → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `company-search` — $0.02

`GET https://api.xynaptic.io/v1/company-search`

**What it does.** find French companies by name or SIREN: identity, activity, status. The entry point to the comp

**How to use.**

```
GET https://api.xynaptic.io/v1/company-search
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `company-profile` — $0.02

`GET https://api.xynaptic.io/v1/company-profile`

**What it does.** consolidated identity from the French state registry: SIREN, legal form, NAF, headcount, HQ, VA

**How to use.**

```
GET https://api.xynaptic.io/v1/company-profile
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `company-people` — $0.02

`GET https://api.xynaptic.io/v1/company-people`

**What it does.** officers and directors from the RNE: names, roles, birth year. Parameter: ?siren=.

**How to use.**

```
GET https://api.xynaptic.io/v1/company-people
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `company-network` — $0.03

`GET https://api.xynaptic.io/v1/company-network`

**What it does.** HQ and establishment footprint: locations, activities, open/closed count. Parameter: ?siren=.

**How to use.**

```
GET https://api.xynaptic.io/v1/company-network
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `company-financial` — $0.05

`GET https://api.xynaptic.io/v1/company-financial`

**What it does.** annual accounts from the registry: revenue, net income, per year available. Parameter: ?siren=.

**How to use.**

```
GET https://api.xynaptic.io/v1/company-financial
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `company-kyb` — $0.1

`GET https://api.xynaptic.io/v1/company-kyb`

**What it does.** the full due-diligence dossier in one call: identity, officers, financials, risk signals, VAT c

**How to use.**

```
GET https://api.xynaptic.io/v1/company-kyb
-> 402 Payment Required (price: $0.1)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `company-relationship` — $0.05

`GET https://api.xynaptic.io/v1/company-relationship`

**What it does.** the link between two French companies: shared officers, same activity, same city, size comparis

**How to use.**

```
GET https://api.xynaptic.io/v1/company-relationship
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `company-monitor` — $0.05

`GET https://api.xynaptic.io/v1/company-monitor`

**What it does.** watch a French company over time: first call sets the baseline, next calls detect what changed 

**How to use.**

```
GET https://api.xynaptic.io/v1/company-monitor
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `company-brief-live` — $0.05

`GET https://api.xynaptic.io/v1/company-brief-live`

**What it does.** the real-time decisional brief: identity, officers, accounts, risk signals, growth signals, age

**How to use.**

```
GET https://api.xynaptic.io/v1/company-brief-live
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `company-compare` — $0.05

`GET https://api.xynaptic.io/v1/company-compare`

**What it does.** two French companies side by side: size, activity, financials, geography, officers, risk signal

**How to use.**

```
GET https://api.xynaptic.io/v1/company-compare
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `company-changes` — $0.03

`GET https://api.xynaptic.io/v1/company-changes`

**What it does.** what recently changed in a French company: officers, status, HQ, activity, accounts

**How to use.**

```
GET https://api.xynaptic.io/v1/company-changes
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `company-international-search` — $0.01

`GET https://api.xynaptic.io/v1/company-international-search` — `(name)`

**What it does.** worldwide company search by name (GLEIF LEI registry, 200+ jurisdictions: EU, US, UK, Asia, Can

**How to use.**

```
GET https://api.xynaptic.io/v1/company-international-search (name)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `company-news` — $0.02

`GET https://api.xynaptic.io/v1/company-news` — `(name ou siren + summarize?)`

**What it does.** the press radar for due diligence: bring a company name or French SIREN, get its latest news fr

**How to use.**

```
GET https://api.xynaptic.io/v1/company-news (name ou siren + summarize?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `supplier-search` — $0.02

`GET https://api.xynaptic.io/v1/supplier-search` — `(activity + city?)`

**What it does.** find French suppliers by activity: search the official companies registry (NAF activity codes) 

**How to use.**

```
GET https://api.xynaptic.io/v1/supplier-search (activity + city?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `supplier-risk` — $0.05

`GET https://api.xynaptic.io/v1/supplier-risk` — `(siren ou name)`

**What it does.** bring a supplier (SIREN or name): we compile the official registry profile, financial accounts,

**How to use.**

```
GET https://api.xynaptic.io/v1/supplier-risk (siren ou name)
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `supplier-compliance` — $0.03

`GET https://api.xynaptic.io/v1/supplier-compliance` — `(siren ou name — screening conformité fournisseur)`

**What it does.** compliance screening of a French supplier before contracting: registry status (active/closed), 

**How to use.**

```
GET https://api.xynaptic.io/v1/supplier-compliance (siren ou name — screening conformité fournisseur)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `car-dealer-check` — $0.03

`GET https://api.xynaptic.io/v1/car-dealer-check` — `(siren ou name — screening vendeur auto avant achat)`

**What it does.** screen a used-car seller (French dealer or individual) before you buy: official registry identi

**How to use.**

```
GET https://api.xynaptic.io/v1/car-dealer-check (siren ou name — screening vendeur auto avant achat)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `company-international-profile` — $0.03

`GET https://api.xynaptic.io/v1/company-international-profile` — `(lei)`

**What it does.** full global identity by LEI: legal name, legal address, country, legal jurisdiction, legal form

**How to use.**

```
GET https://api.xynaptic.io/v1/company-international-profile (lei)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
