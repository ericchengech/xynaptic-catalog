# Company Registry (FR) — Xynaptic service reference

> 31 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Full machine-readable catalog: https://api.xynaptic.io

**How x402 works here:** `GET` any endpoint → `402 Payment Required` with the price → sign EIP-3009 (or use any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `company-search` — $0.02

`GET https://api.xynaptic.io/v1/company-search`

**What it does.** Xynaptic Company Search — find French companies by name or SIREN: identity, activity, status. The entry point to the company funnel. Parameter: ?q=name.

**How to use.**

```
GET https://api.xynaptic.io/v1/company-search
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `card-bin-check` — $0.02

`POST https://api.xynaptic.io/v1/card-bin-check `(bin)``

**What it does.** Xynaptic Card BIN Check — the first 6-8 digits of a card number identify the issuer: we return scheme (Visa/Mastercard...), issuer bank, card type (debit/credit/prepaid), country. POST body: { bin: 424242 } or { card_number: <first digits> }. Completing the banking suite end-to-end.

**How to use.**

```
POST https://api.xynaptic.io/v1/card-bin-check (bin)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `company-international-search` — $0.01

`GET https://api.xynaptic.io/v1/company-international-search `(name)``

**What it does.** Xynaptic International Company Search — worldwide company search by name (GLEIF LEI registry, 200+ jurisdictions: EU, US, UK, Asia, Canada, Australia...). Returns legal name, LEI, status, headquarters, jurisdiction for up to 10 matches. GET ?name=DANONE. The LEI registry covers entities active in financial transactions — the global identity layer.

**How to use.**

```
GET https://api.xynaptic.io/v1/company-international-search (name)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `company-profile` — $0.02

`GET https://api.xynaptic.io/v1/company-profile`

**What it does.** Xynaptic Company Profile — consolidated identity from the French state registry: SIREN, legal form, NAF, headcount, HQ, VAT, creation, status. Parameter: ?siren=.

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

**What it does.** Xynaptic Company People — officers and directors from the RNE: names, roles, birth year. Parameter: ?siren=.

**How to use.**

```
GET https://api.xynaptic.io/v1/company-people
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `card-transaction-intelligence` — $0.02

`POST https://api.xynaptic.io/v1/card-transaction-intelligence `(transactions)``

**What it does.** Xynaptic Card Transaction Intelligence — bring the card transactions (with merchant + country when available): we detect fraud patterns — impossible geo-velocity, small-amount card testing, amount vs history outliers, CNP patterns. POST body: { transactions: [{date, amount, merchant?, country?, channel?}], cardholder_country?: FR }. Each flag has a severity; informational only.

**How to use.**

```
POST https://api.xynaptic.io/v1/card-transaction-intelligence (transactions)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `company-news` — $0.02

`GET https://api.xynaptic.io/v1/company-news `(name ou siren + summarize?)``

**What it does.** Xynaptic Company News — the press radar for due diligence: bring a company name or French SIREN, get its latest news from a live web search (title, URL, snippet, source domain), optionally LLM-summarized. Closes the KYB loop: identity, accounts, network AND press. GET ?name=Danone or ?siren=552032534 (&summarize=true).

**How to use.**

```
GET https://api.xynaptic.io/v1/company-news (name ou siren + summarize?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `supplier-search` — $0.02

`GET https://api.xynaptic.io/v1/supplier-search `(activity + city?)``

**What it does.** Xynaptic Supplier Search — find French suppliers by activity: search the official companies registry (NAF activity codes) for businesses matching an industrial activity, with location and size. GET ?activity=fabrication+metallique (&city=). Official French data.

**How to use.**

```
GET https://api.xynaptic.io/v1/supplier-search (activity + city?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `artisan-plombier` — $0.02

`GET https://api.xynaptic.io/v1/artisan-plombier `(dept + city?)``

**What it does.** Xynaptic Plombier Search — find plombiers in any French department: official companies registry (active businesses only). GET ?dept=69 (&city= optional). Returns name, city, SIREN. Official French open data.

**How to use.**

```
GET https://api.xynaptic.io/v1/artisan-plombier (dept + city?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `artisan-electricien` — $0.02

`GET https://api.xynaptic.io/v1/artisan-electricien `(dept + city?)``

**What it does.** Xynaptic Electricien Search — find electriciens in any French department: official companies registry (active businesses only). GET ?dept=69 (&city= optional). Returns name, city, SIREN. Official French open data.

**How to use.**

```
GET https://api.xynaptic.io/v1/artisan-electricien (dept + city?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `artisan-menuisier` — $0.02

`GET https://api.xynaptic.io/v1/artisan-menuisier `(dept + city?)``

**What it does.** Xynaptic Menuisier Search — find menuisiers in any French department: official companies registry (active businesses only). GET ?dept=69 (&city= optional). Returns name, city, SIREN. Official French open data.

**How to use.**

```
GET https://api.xynaptic.io/v1/artisan-menuisier (dept + city?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `artisan-chauffagiste` — $0.02

`GET https://api.xynaptic.io/v1/artisan-chauffagiste `(dept + city?)``

**What it does.** Xynaptic Chauffagiste Search — find chauffagistes in any French department: official companies registry (active businesses only). GET ?dept=69 (&city= optional). Returns name, city, SIREN. Official French open data.

**How to use.**

```
GET https://api.xynaptic.io/v1/artisan-chauffagiste (dept + city?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `artisan-carreleur` — $0.02

`GET https://api.xynaptic.io/v1/artisan-carreleur `(dept + city?)``

**What it does.** Xynaptic Carreleur Search — find carreleurs in any French department: official companies registry (active businesses only). GET ?dept=69 (&city= optional). Returns name, city, SIREN. Official French open data.

**How to use.**

```
GET https://api.xynaptic.io/v1/artisan-carreleur (dept + city?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `artisan-peintre` — $0.02

`GET https://api.xynaptic.io/v1/artisan-peintre `(dept + city?)``

**What it does.** Xynaptic Peintre en batiment Search — find peintre en batiments in any French department: official companies registry (active businesses only). GET ?dept=69 (&city= optional). Returns name, city, SIREN. Official French open data.

**How to use.**

```
GET https://api.xynaptic.io/v1/artisan-peintre (dept + city?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `artisan-jardinier` — $0.02

`GET https://api.xynaptic.io/v1/artisan-jardinier `(dept + city?)``

**What it does.** Xynaptic Paysagiste jardinier Search — find paysagiste jardiniers in any French department: official companies registry (active businesses only). GET ?dept=69 (&city= optional). Returns name, city, SIREN. Official French open data.

**How to use.**

```
GET https://api.xynaptic.io/v1/artisan-jardinier (dept + city?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `artisan-couvreur` — $0.02

`GET https://api.xynaptic.io/v1/artisan-couvreur `(dept + city?)``

**What it does.** Xynaptic Couvreur Search — find couvreurs in any French department: official companies registry (active businesses only). GET ?dept=69 (&city= optional). Returns name, city, SIREN. Official French open data.

**How to use.**

```
GET https://api.xynaptic.io/v1/artisan-couvreur (dept + city?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `artisan-macon` — $0.02

`GET https://api.xynaptic.io/v1/artisan-macon `(dept + city?)``

**What it does.** Xynaptic Macon Search — find macons in any French department: official companies registry (active businesses only). GET ?dept=69 (&city= optional). Returns name, city, SIREN. Official French open data.

**How to use.**

```
GET https://api.xynaptic.io/v1/artisan-macon (dept + city?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `artisan-serrurier` — $0.02

`GET https://api.xynaptic.io/v1/artisan-serrurier `(dept + city?)``

**What it does.** Xynaptic Serrurier Search — find serruriers in any French department: official companies registry (active businesses only). GET ?dept=69 (&city= optional). Returns name, city, SIREN. Official French open data.

**How to use.**

```
GET https://api.xynaptic.io/v1/artisan-serrurier (dept + city?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `company-network` — $0.03

`GET https://api.xynaptic.io/v1/company-network`

**What it does.** Xynaptic Company Network — HQ and establishment footprint: locations, activities, open/closed count. Parameter: ?siren=.

**How to use.**

```
GET https://api.xynaptic.io/v1/company-network
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `company-changes` — $0.03

`GET https://api.xynaptic.io/v1/company-changes`

**What it does.** Xynaptic Company Changes — what recently changed in a French company: officers, status, HQ, activity, accounts — detected against the last snapshot (shared with company-monitor). Parameter: ?siren=.

**How to use.**

```
GET https://api.xynaptic.io/v1/company-changes
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `card-chargeback-analysis` — $0.03

`POST https://api.xynaptic.io/v1/card-chargeback-analysis `(dispute)``

**What it does.** Xynaptic Card Chargeback Analysis — bring one disputed transaction + its context (delay, cardholder history): we classify the dispute — likely genuine fraud vs likely friendly fraud vs service issue — with signals and a recommendation (accept/contest with evidence). POST body: { dispute: { transaction, reason_code?, days_since_purchase?, cardholder_history? } }. Informational, not a scheme decision.

**How to use.**

```
POST https://api.xynaptic.io/v1/card-chargeback-analysis (dispute)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `supplier-compliance` — $0.03

`GET https://api.xynaptic.io/v1/supplier-compliance `(siren ou name — screening conformité fournisseur)``

**What it does.** Xynaptic Supplier Compliance — compliance screening of a French supplier before contracting: registry status (active/closed), collective proceedings signals, high-risk keyword and jurisdiction screening on the legal name, VAT number presence. Each signal carries a severity; overall level clear/medium/high. Informational screening, not a compliance decision. GET ?siren=123456789 or ?name=ACME.

**How to use.**

```
GET https://api.xynaptic.io/v1/supplier-compliance (siren ou name — screening conformité fournisseur)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `car-dealer-check` — $0.03

`GET https://api.xynaptic.io/v1/car-dealer-check `(siren ou name — screening vendeur auto avant achat)``

**What it does.** Xynaptic Car Dealer Check — screen a used-car seller (French dealer or individual) before you buy: official registry identity (company, SIREN), compliance screening (status, VAT, risk keywords), plus press coverage. Buyer-side anti-fraud one-call. Informational, not a compliance decision. GET ?siren=123456789 or ?name=Garage+Auto.

**How to use.**

```
GET https://api.xynaptic.io/v1/car-dealer-check (siren ou name — screening vendeur auto avant achat)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `company-international-profile` — $0.03

`GET https://api.xynaptic.io/v1/company-international-profile `(lei)``

**What it does.** Xynaptic International Company Profile — full global identity by LEI: legal name, legal address, country, legal jurisdiction, legal form, registration authority + LEI status (ISSUED/LAPSED/RETIRED) with dates. GET ?lei=969500KMUQ2B6CBAF162. GLEIF is the global gold standard for legal entity identification.

**How to use.**

```
GET https://api.xynaptic.io/v1/company-international-profile (lei)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `company-financial` — $0.05

`GET https://api.xynaptic.io/v1/company-financial`

**What it does.** Xynaptic Company Financial — annual accounts from the registry: revenue, net income, per year available. Parameter: ?siren=.

**How to use.**

```
GET https://api.xynaptic.io/v1/company-financial
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `company-relationship` — $0.05

`GET https://api.xynaptic.io/v1/company-relationship`

**What it does.** Xynaptic Company Relationship — the link between two French companies: shared officers, same activity, same city, size comparison. Parameters: ?siren=A&siren=B.

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

**What it does.** Xynaptic Company Monitor — watch a French company over time: first call sets the baseline, next calls detect what changed (officers, status, HQ, activity, establishments, accounts). Parameters: ?siren=.

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

**What it does.** Xynaptic Company Brief Live — the real-time decisional brief: identity, officers, accounts, risk signals, growth signals, agent priority with recommended actions. The daily read on any French company. Parameter: ?siren=.

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

**What it does.** Xynaptic Company Compare — two French companies side by side: size, activity, financials, geography, officers, risk signals, differences. The due-diligence A/B. Parameters: ?siren=A&siren=B.

**How to use.**

```
GET https://api.xynaptic.io/v1/company-compare
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `supplier-risk` — $0.05

`GET https://api.xynaptic.io/v1/supplier-risk `(siren ou name)``

**What it does.** Xynaptic Supplier Risk — bring a supplier (SIREN or name): we compile the official registry profile, financial accounts, recent changes and press into a supplier risk assessment. GET ?siren= or ?name=. The due-diligence one-call.

**How to use.**

```
GET https://api.xynaptic.io/v1/supplier-risk (siren ou name)
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `company-kyb` — $0.1

`GET https://api.xynaptic.io/v1/company-kyb`

**What it does.** Xynaptic Company KYB — the full due-diligence dossier in one call: identity, officers, financials, risk signals, VAT compliance, verification sources, agent verdict with confidence. The premium synthesis of the company funnel. Parameter: ?siren=.

**How to use.**

```
GET https://api.xynaptic.io/v1/company-kyb
-> 402 Payment Required (price: $0.1)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
