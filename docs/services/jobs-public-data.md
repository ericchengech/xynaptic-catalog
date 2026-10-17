# Jobs & Public — Xynaptic service reference

> 16 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works:** `GET` any endpoint → `402 Payment Required` → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `ao` — $0.05

`GET https://api.xynaptic.io/v1/ao`

**What it does.**

filtered French public procurement calls (trade + department, France).

**How to use.**

```
GET https://api.xynaptic.io/v1/ao
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `legal-brief` — $0.02

`GET https://api.xynaptic.io/v1/legal-brief` — `(?q= — veille juridique FR officielle)`

**What it does.**

French legal watch by keyword: official sources (Légifrance, service-public.gouv.fr, ministères

**How to use.**

```
GET https://api.xynaptic.io/v1/legal-brief (?q= — veille juridique FR officielle)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `tender-search` — $0.02

`GET https://api.xynaptic.io/v1/tender-search` — `(q + buyer? + dept? + days?)`

**What it does.**

French public procurement notices (BOAMP): search tenders by keyword, buyer, department, last N

**How to use.**

```
GET https://api.xynaptic.io/v1/tender-search (q + buyer? + dept? + days?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `job-market-brief` — $0.02

`GET https://api.xynaptic.io/v1/job-market-brief` — `(dept + metier? — tensions recrutement BMO France Travail/Dares)`

**What it does.**

recruitment tensions for any French department, from the official BMO survey (France Travail / 

**How to use.**

```
GET https://api.xynaptic.io/v1/job-market-brief (dept + metier? — tensions recrutement BMO France Travail/Dares)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `job-search` — $0.02

`GET https://api.xynaptic.io/v1/job-search` — `(q + dept? + contrat? — offres d'emploi live France Travail)`

**What it does.**

live French job offers from the official France Travail API v2: keyword + department + contract

**How to use.**

```
GET https://api.xynaptic.io/v1/job-search (q + dept? + contrat? — offres d'emploi live France Travail)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `economy-news-fr` — $0.01

`GET https://api.xynaptic.io/v1/economy-news-fr`

**What it does.**

the live French economy press feed: latest macro and business news from a real web search (titl

**How to use.**

```
GET https://api.xynaptic.io/v1/economy-news-fr
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `artisan-plombier` — $0.02

`GET https://api.xynaptic.io/v1/artisan-plombier` — `(dept + city?)`

**What it does.**

find plombiers in any French department: official companies registry (active businesses only). 

**How to use.**

```
GET https://api.xynaptic.io/v1/artisan-plombier (dept + city?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `artisan-electricien` — $0.02

`GET https://api.xynaptic.io/v1/artisan-electricien` — `(dept + city?)`

**What it does.**

find electriciens in any French department: official companies registry (active businesses only

**How to use.**

```
GET https://api.xynaptic.io/v1/artisan-electricien (dept + city?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `artisan-menuisier` — $0.02

`GET https://api.xynaptic.io/v1/artisan-menuisier` — `(dept + city?)`

**What it does.**

find menuisiers in any French department: official companies registry (active businesses only).

**How to use.**

```
GET https://api.xynaptic.io/v1/artisan-menuisier (dept + city?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `artisan-chauffagiste` — $0.02

`GET https://api.xynaptic.io/v1/artisan-chauffagiste` — `(dept + city?)`

**What it does.**

find chauffagistes in any French department: official companies registry (active businesses onl

**How to use.**

```
GET https://api.xynaptic.io/v1/artisan-chauffagiste (dept + city?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `artisan-carreleur` — $0.02

`GET https://api.xynaptic.io/v1/artisan-carreleur` — `(dept + city?)`

**What it does.**

find carreleurs in any French department: official companies registry (active businesses only).

**How to use.**

```
GET https://api.xynaptic.io/v1/artisan-carreleur (dept + city?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `artisan-peintre` — $0.02

`GET https://api.xynaptic.io/v1/artisan-peintre` — `(dept + city?)`

**What it does.**

find peintre en batiments in any French department: official companies registry (active busines

**How to use.**

```
GET https://api.xynaptic.io/v1/artisan-peintre (dept + city?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `artisan-jardinier` — $0.02

`GET https://api.xynaptic.io/v1/artisan-jardinier` — `(dept + city?)`

**What it does.**

find paysagiste jardiniers in any French department: official companies registry (active busine

**How to use.**

```
GET https://api.xynaptic.io/v1/artisan-jardinier (dept + city?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `artisan-couvreur` — $0.02

`GET https://api.xynaptic.io/v1/artisan-couvreur` — `(dept + city?)`

**What it does.**

find couvreurs in any French department: official companies registry (active businesses only). 

**How to use.**

```
GET https://api.xynaptic.io/v1/artisan-couvreur (dept + city?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `artisan-macon` — $0.02

`GET https://api.xynaptic.io/v1/artisan-macon` — `(dept + city?)`

**What it does.**

find macons in any French department: official companies registry (active businesses only). GET

**How to use.**

```
GET https://api.xynaptic.io/v1/artisan-macon (dept + city?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `artisan-serrurier` — $0.02

`GET https://api.xynaptic.io/v1/artisan-serrurier` — `(dept + city?)`

**What it does.**

find serruriers in any French department: official companies registry (active businesses only).

**How to use.**

```
GET https://api.xynaptic.io/v1/artisan-serrurier (dept + city?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
