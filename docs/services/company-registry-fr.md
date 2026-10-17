# Business — Xynaptic service reference

> 18 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works**

`GET` any endpoint → `402 Payment Required` → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `company-search` — $0.02

`GET https://api.xynaptic.io/v1/company-search`

**What it does.**

Xynaptic Company Search — find French companies by name or SIREN: identity, activity, status. The entry point to the company funnel. Parameter: ?q=name.

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

**What it does.**

Xynaptic Company Profile — consolidated identity from the French state registry: SIREN, legal form, NAF, headcount, HQ, VAT, creation, status. Parameter: ?siren=.

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

**What it does.**

Xynaptic Company People — officers and directors from the RNE: names, roles, birth year. Parameter: ?siren=.

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

**What it does.**

Xynaptic Company Network — HQ and establishment footprint: locations, activities, open/closed count. Parameter: ?siren=.

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

**What it does.**

Xynaptic Company Financial — annual accounts from the registry: revenue, net income, per year available. Parameter: ?siren=.

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

**What it does.**

Xynaptic Company KYB — the full due-diligence dossier in one call: identity, officers, financials, risk signals, VAT compliance, verification sources, agent verdict with confidence. The premium synthesis of the company funnel. Parameter: ?siren=.

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

**What it does.**

Xynaptic Company Relationship — the link between two French companies: shared officers, same activity, same city, size comparison. Parameters: ?siren=A&siren=B.

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

**What it does.**

Xynaptic Company Monitor — watch a French company over time: first call sets the baseline, next calls detect what changed (officers, status, HQ, activity, establishments, accounts). Parameters: ?siren=.

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

**What it does.**

Xynaptic Company Brief Live — the real-time decisional brief: identity, officers, accounts, risk signals, growth signals, agent priority with recommended actions. The daily read on any French company. Parameter: ?siren=.

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

**What it does.**

Xynaptic Company Compare — two French companies side by side: size, activity, financials, geography, officers, risk signals, differences. The due-diligence A/B. Parameters: ?siren=A&siren=B.

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

**What it does.**

Xynaptic Company Changes — what recently changed in a French company: officers, status, HQ, activity, accounts — detected against the last snapshot (shared with company-monitor). Parameter: ?siren=.

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

**What it does.**

Xynaptic International Company Search — worldwide company search by name (GLEIF LEI registry, 200+ jurisdictions: EU, US, UK, Asia, Canada, Australia...). Returns legal name, LEI, status, headquarters, jurisdiction for up to 10 matches. GET ?name=DANONE. The LEI registry covers entities active in financial transactions — the global identity layer.

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

**What it does.**

Xynaptic Company News — the press radar for due diligence: bring a company name or French SIREN, get its latest news from a live web search (title, URL, snippet, source domain), optionally LLM-summarized. Closes the KYB loop: identity, accounts, network AND press. GET ?name=Danone or ?siren=552032534 (&summarize=true).

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

**What it does.**

Xynaptic Supplier Search — find French suppliers by activity: search the official companies registry (NAF activity codes) for businesses matching an industrial activity, with location and size. GET ?activity=fabrication+metallique (&city=). Official French data.

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

**What it does.**

Xynaptic Supplier Risk — bring a supplier (SIREN or name): we compile the official registry profile, financial accounts, recent changes and press into a supplier risk assessment. GET ?siren= or ?name=. The due-diligence one-call.

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

**What it does.**

Xynaptic Supplier Compliance — compliance screening of a French supplier before contracting: registry status (active/closed), collective proceedings signals, high-risk keyword and jurisdiction screening on the legal name, VAT number presence. Each signal carries a severity; overall level clear/medium/high. Informational screening, not a compliance decision. GET ?siren=123456789 or ?name=ACME.

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

**What it does.**

Xynaptic Car Dealer Check — screen a used-car seller (French dealer or individual) before you buy: official registry identity (company, SIREN), compliance screening (status, VAT, risk keywords), plus press coverage. Buyer-side anti-fraud one-call. Informational, not a compliance decision. GET ?siren=123456789 or ?name=Garage+Auto.

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

**What it does.**

Xynaptic International Company Profile — full global identity by LEI: legal name, legal address, country, legal jurisdiction, legal form, registration authority + LEI status (ISSUED/LAPSED/RETIRED) with dates. GET ?lei=969500KMUQ2B6CBAF162. GLEIF is the global gold standard for legal entity identification.

**How to use.**

```
GET https://api.xynaptic.io/v1/company-international-profile (lei)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
