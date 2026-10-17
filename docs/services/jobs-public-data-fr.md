# Jobs & Public Data (FR) — Xynaptic service reference

> 3 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works:** `GET` any endpoint → `402 Payment Required` with the price → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `job-market-brief` — $0.02

`GET https://api.xynaptic.io/v1/job-market-brief — `(dept + metier? — tensions recrutement BMO France Travail/Dares)``

**What it does.** Xynaptic Job Market Brief — recruitment tensions for any French department, from the official BMO survey (France Travail / Dares, 2026): top-10 hardest-to-fill jobs, or one job's hiring projects and difficulty share. GET ?dept=45 (&metier=infirmier).

**How to use.**

```
GET https://api.xynaptic.io/v1/job-market-brief (dept + metier? — tensions recrutement BMO France Travail/Dares)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `job-search` — $0.02

`GET https://api.xynaptic.io/v1/job-search — `(q + dept? + contrat? — offres d'emploi live France Travail)``

**What it does.** Xynaptic Job Search — live French job offers from the official France Travail API v2: keyword + department + contract type filters, up to 10 offers with title, employer, location, contract, salary when published, and the France Travail application URL. GET ?q=infirmier&dept=45 (&contrat=CDI).

**How to use.**

```
GET https://api.xynaptic.io/v1/job-search (q + dept? + contrat? — offres d'emploi live France Travail)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `tender-search` — $0.02

`GET https://api.xynaptic.io/v1/tender-search — `(q + buyer? + dept? + days?)``

**What it does.** Xynaptic Tender Search — French public procurement notices (BOAMP): search tenders by keyword, buyer, department, last N days. GET ?q=informatique (&buyer=&dept=&days=&limit=).

**How to use.**

```
GET https://api.xynaptic.io/v1/tender-search (q + buyer? + dept? + days?)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
