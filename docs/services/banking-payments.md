# Banking & Payments — Xynaptic service reference

> 19 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works:** `GET` any endpoint → `402 Payment Required` → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `bank-transaction-categorize` — $0.02

`POST https://api.xynaptic.io/v1/bank-transaction-categorize` — `(transactions)`

**What it does.**

Xynaptic Bank Transaction Categorize — categorize raw bank transactions (CSV or objects) into standard categories with merchant and income/expense detection. POST { transactions: [{date, label, amount}] } or { csv }.

**How to use.**

```
POST https://api.xynaptic.io/v1/bank-transaction-categorize (transactions)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `bank-cashflow` — $0.03

`POST https://api.xynaptic.io/v1/bank-cashflow` — `(transactions)`

**What it does.**

Xynaptic Bank Cashflow — bring transactions, get the treasury picture: inflows, outflows, net, burn rate, recurring revenue/expenses detected, and a simple 30-day projection. POST body: { transactions: [...], currency?: EUR }. Computed from YOUR data — informational, not accounting advice.

**How to use.**

```
POST https://api.xynaptic.io/v1/bank-cashflow (transactions)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `bank-payment-risk` — $0.03

`POST https://api.xynaptic.io/v1/bank-payment-risk` — `(payment)`

**What it does.**

Xynaptic Bank Payment Risk — bring one payment instruction (beneficiary, IBAN or country, amount, label, date): we return risk signals — country risk, amount anomalies, label/beneficiary mismatch signals — each with a severity, and an overall risk level. Informational screening, not a sanctions list. POST body: { payment: { beneficiary, iban?, country?, amount, currency, label, date } }. Nothing stored.

**How to use.**

```
POST https://api.xynaptic.io/v1/bank-payment-risk (payment)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `bank-financial-health` — $0.05

`POST https://api.xynaptic.io/v1/bank-financial-health` — `(transactions)`

**What it does.**

Xynaptic Bank Financial Health — bring the transactions of an account, get the full synthesis: liquidity trend, income and expense concentration, recurring patterns, anomalies (duplicates, unusual amounts), and a health score with its components explained. POST body: { transactions: [...], currency?: EUR }. Informational only.

**How to use.**

```
POST https://api.xynaptic.io/v1/bank-financial-health (transactions)
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `bank-reconciliation` — $0.03

`POST https://api.xynaptic.io/v1/bank-reconciliation` — `(bank + internal)`

**What it does.**

Xynaptic Bank Reconciliation — bring TWO lists (bank_statement + internal/invoices): we match them (exact, fuzzy amount/date, label similarity), and return matched pairs, bank-only, internal-only, duplicates and suggested adjustments. POST body: { bank: [{date, label, amount}], internal: [{date, label, amount}] }. Nothing stored.

**How to use.**

```
POST https://api.xynaptic.io/v1/bank-reconciliation (bank + internal)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `bank-statement-parse` — $0.01

`POST https://api.xynaptic.io/v1/bank-statement-parse` — `(statement)`

**What it does.**

Xynaptic Bank Statement Parse — paste a raw bank statement (text, any bank layout) and get clean structured transactions: date (ISO), label, amount (signed), running balance when present. The extraction entry point of the banking pipeline: parse then categorize/cashflow/health. POST body: { statement: <raw text, max 20000 chars>, currency?: EUR }. Nothing stored.

**How to use.**

```
POST https://api.xynaptic.io/v1/bank-statement-parse (statement)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `bank-spending-goals` — $0.02

`POST https://api.xynaptic.io/v1/bank-spending-goals` — `(transactions + goal)`

**What it does.**

Xynaptic Bank Spending Goals — bring transactions + a goal (e.g. save 500/month): we compute the gap, category-level cuts with exact amounts, and a 3-step action plan. POST body: { transactions: [...], goal: { type: save, amount_monthly: 500 }, currency?: EUR }. Informational only.

**How to use.**

```
POST https://api.xynaptic.io/v1/bank-spending-goals (transactions + goal)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `bank-counterparty-profile` — $0.05

`POST https://api.xynaptic.io/v1/bank-counterparty-profile` — `(siren)`

**What it does.**

Xynaptic Bank Counterparty Profile — about to pay a French company? Get its full registry profile before paying: identity, status, officers, latest accounts, establishments + payment-relevant signals. The KYB of banking — cross-references our company domain internally. POST body: { siren: 552032534 }.

**How to use.**

```
POST https://api.xynaptic.io/v1/bank-counterparty-profile (siren)
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `bank-beneficiary-watch` — $0.01

`POST https://api.xynaptic.io/v1/bank-beneficiary-watch` — `(siren)`

**What it does.**

Xynaptic Bank Beneficiary Watch — the daycare for banking: we watch a French counterparty in the registry and deliver an encrypted alert when it changes (status, officers, filings) — up to 30 days. POST body: { siren, ttl_days?: 30 }. Returns { watch_id, watch_secret } — check via /v1/watch-status.

**How to use.**

```
POST https://api.xynaptic.io/v1/bank-beneficiary-watch (siren)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `bank-sanctions-screen` — $0.03

`POST https://api.xynaptic.io/v1/bank-sanctions-screen` — `(payments)`

**What it does.**

Xynaptic Bank Sanctions Screen — bring a LIST of beneficiaries (up to 100): we screen each (jurisdiction risk, keyword signals, structure) and return per-entry signals + overall level. Batch version of payment-risk. POST body: { payments: [{beneficiary, country?, amount?}] }. Informational screening, not a compliance decision.

**How to use.**

```
POST https://api.xynaptic.io/v1/bank-sanctions-screen (payments)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `card-bin-check` — $0.02

`POST https://api.xynaptic.io/v1/card-bin-check` — `(bin)`

**What it does.**

Xynaptic Card BIN Check — the first 6-8 digits of a card number identify the issuer: we return scheme (Visa/Mastercard...), issuer bank, card type (debit/credit/prepaid), country. POST body: { bin: 424242 } or { card_number: <first digits> }. Completing the banking suite end-to-end.

**How to use.**

```
POST https://api.xynaptic.io/v1/card-bin-check (bin)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `bank-iban-validate` — $0.02

`POST https://api.xynaptic.io/v1/bank-iban-validate` — `(iban)`

**What it does.**

Xynaptic IBAN Validate — full structural validation: mod-97 checksum, country-specific length and format, embedded bank code and account. POST body: { iban: FR7630006000011234567890189 }. Returns valid/invalid with the reason when invalid, plus parsed country, check digits, BBAN parts.

**How to use.**

```
POST https://api.xynaptic.io/v1/bank-iban-validate (iban)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `bank-bic-check` — $0.02

`POST https://api.xynaptic.io/v1/bank-bic-check` — `(bic)`

**What it does.**

Xynaptic BIC/SWIFT Check — structural validation of the business identifier code: 8/11 chars, institution code, country, location, optional branch + SEPA zone membership of the country. POST body: { bic: BNPAFRPP }.

**How to use.**

```
POST https://api.xynaptic.io/v1/bank-bic-check (bic)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `card-transaction-intelligence` — $0.02

`POST https://api.xynaptic.io/v1/card-transaction-intelligence` — `(transactions)`

**What it does.**

Xynaptic Card Transaction Intelligence — bring the card transactions (with merchant + country when available): we detect fraud patterns — impossible geo-velocity, small-amount card testing, amount vs history outliers, CNP patterns. POST body: { transactions: [{date, amount, merchant?, country?, channel?}], cardholder_country?: FR }. Each flag has a severity; informational only.

**How to use.**

```
POST https://api.xynaptic.io/v1/card-transaction-intelligence (transactions)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `card-chargeback-analysis` — $0.03

`POST https://api.xynaptic.io/v1/card-chargeback-analysis` — `(dispute)`

**What it does.**

Xynaptic Card Chargeback Analysis — bring one disputed transaction + its context (delay, cardholder history): we classify the dispute — likely genuine fraud vs likely friendly fraud vs service issue — with signals and a recommendation (accept/contest with evidence). POST body: { dispute: { transaction, reason_code?, days_since_purchase?, cardholder_history? } }. Informational, not a scheme decision.

**How to use.**

```
POST https://api.xynaptic.io/v1/card-chargeback-analysis (dispute)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `payment-routing-advice` — $0.02

`POST https://api.xynaptic.io/v1/payment-routing-advice` — `(payment)`

**What it does.**

Xynaptic Payment Routing Advice — one payment instruction, compared across rails: SEPA transfer, card, SWIFT wire, instant SEPA — cost, delay, traceability, reach. Returns the recommended rail with the tradeoffs. POST body: { payment: { amount, currency, beneficiary_country, urgent?: true, recurring?: false } }. Informational.

**How to use.**

```
POST https://api.xynaptic.io/v1/payment-routing-advice (payment)
-> 402 Payment Required (price: $0.02)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `wallet-screen` — $0.03

`GET https://api.xynaptic.io/v1/wallet-screen` — `(address + chain — screening d'un wallet avant transaction)`

**What it does.**

Xynaptic Wallet Screen — pre-transaction risk screening of any Bitcoin or EVM address: on-chain profile (balance, tx count) plus risk signals (empty/drained wallet, contract address, low activity, high exposure) each with a severity, and an overall risk level. Informational screening, not a compliance decision. GET ?address=...&chain=btc|eth.

**How to use.**

```
GET https://api.xynaptic.io/v1/wallet-screen (address + chain — screening d'un wallet avant transaction)
-> 402 Payment Required (price: $0.03)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `factoring-debtor-risk` — $0.05

`GET https://api.xynaptic.io/v1/factoring-debtor-risk` — `(siren|name)`

**What it does.**

Xynaptic Factoring Debtor Risk — pre-advance credit assessment of an invoice debtor (French company): registry status, financial strength, payment-risk verdict (advance/caution/refuse) and recommended max exposure. Informational, not financial advice. GET ?siren=... or ?name=...

**How to use.**

```
GET https://api.xynaptic.io/v1/factoring-debtor-risk (siren|name)
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `factoring-portfolio-risk` — $0.1

`GET https://api.xynaptic.io/v1/factoring-portfolio-risk`

**What it does.**

Xynaptic Factoring Portfolio Risk — upload a set of invoices, get the portfolio risk profile: sector concentration, top risky debtors, total exposure, DSO hint and diversification verdict. Informational. POST {invoices:[{debtor_siren, amount, days}]} or GET ?sirens=...

**How to use.**

```
GET https://api.xynaptic.io/v1/factoring-portfolio-risk
-> 402 Payment Required (price: $0.1)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
