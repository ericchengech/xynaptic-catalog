# Banking & Payments — Xynaptic service reference

> 19 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works:** `GET` any endpoint → `402 Payment Required` → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `bank-transaction-categorize` — $0.02

`POST https://api.xynaptic.io/v1/bank-transaction-categorize` — `(transactions)`

**What it does.**

categorize raw bank transactions (CSV or objects) into standard categories with merchant and in

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

bring transactions, get the treasury picture: inflows, outflows, net, burn rate, recurring reve

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

bring one payment instruction (beneficiary, IBAN or country, amount, label, date): we return ri

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

bring the transactions of an account, get the full synthesis: liquidity trend, income and expen

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

bring TWO lists (bank_statement + internal/invoices): we match them (exact, fuzzy amount/date, 

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

paste a raw bank statement (text, any bank layout) and get clean structured transactions: date 

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

bring transactions + a goal (e.g. save 500/month): we compute the gap, category-level cuts with

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

about to pay a French company? Get its full registry profile before paying: identity, status, o

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

the daycare for banking: we watch a French counterparty in the registry and deliver an encrypte

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

bring a LIST of beneficiaries (up to 100): we screen each (jurisdiction risk, keyword signals, 

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

the first 6-8 digits of a card number identify the issuer: we return scheme (Visa/Mastercard...

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

full structural validation: mod-97 checksum, country-specific length and format, embedded bank 

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

structural validation of the business identifier code: 8/11 chars, institution code, country, l

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

bring the card transactions (with merchant + country when available): we detect fraud patterns

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

bring one disputed transaction + its context (delay, cardholder history): we classify the dispu

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

one payment instruction, compared across rails: SEPA transfer, card, SWIFT wire, instant SEPA

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

pre-transaction risk screening of any Bitcoin or EVM address: on-chain profile (balance, tx cou

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

pre-advance credit assessment of an invoice debtor (French company): registry status, financial

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

upload a set of invoices, get the portfolio risk profile: sector concentration, top risky debto

**How to use.**

```
GET https://api.xynaptic.io/v1/factoring-portfolio-risk
-> 402 Payment Required (price: $0.1)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
