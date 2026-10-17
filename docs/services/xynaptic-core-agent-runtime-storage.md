# Xynaptic Core (Agent Runtime & Storage) — Xynaptic service reference

> 7 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works:** `GET` any endpoint → `402 Payment Required` with the price → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `ao` — $0.05

`GET https://api.xynaptic.io/v1/ao`

**What it does.** Xynaptic AO Digest — filtered French public procurement calls (trade + department, France).

**How to use.**

```
GET https://api.xynaptic.io/v1/ao
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `store-append` — $0.01

`POST https://api.xynaptic.io/v1/store-append — `(store_id + claim_secret + value + mode?)``

**What it does.** Xynaptic Ephemeral Store append — merge new JSON into an existing stored object without re-uploading: POST body: { store_id, claim_secret, value: <JSON>, mode?: auto|list|dict|counter|string|wrap, new_claim_secret?: optional key rotation }. Returns the applied mode and new size. Accumulate research results in one object.

**How to use.**

```
POST https://api.xynaptic.io/v1/store-append (store_id + claim_secret + value + mode?)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `store-get` — $0.01

`POST https://api.xynaptic.io/v1/store-get — `(store_id + claim_secret)``

**What it does.** Xynaptic Ephemeral Store — retrieve a stored object: POST body: { store_id, claim_secret, delete_after_read?: true }. Wrong secret = 403, expired = 410 gone. Handoff friendly: share the pair to let another agent read it.

**How to use.**

```
POST https://api.xynaptic.io/v1/store-get (store_id + claim_secret)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `store-put` — $0.01

`POST https://api.xynaptic.io/v1/store-put — `(value + ttl)``

**What it does.** Xynaptic Ephemeral Store — encrypted scratchpad for agents: deposit a JSON payload (64KB max), we store it encrypted on our infra and return {store_id, claim_secret, expires_at}. TTL 1-30 days, then cryptographically destroyed. POST body: { value: <any JSON>, ttl_days: 30, claim_secret?: <optional own secret> }. The claim_secret is the only key — keep it, lose the data.

**How to use.**

```
POST https://api.xynaptic.io/v1/store-put (value + ttl)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `ticket-buy` — $0.5

`POST https://api.xynaptic.io/v1/ticket-buy — `(amount_usd 0.5-20)``

**What it does.** Xynaptic Ticket — prepaid credit: pay once (0.5-20 USDC), get a ticket_id|ticket_secret, consume any service with header X-TICKET at 20% off. Valid 90 days. POST { amount_usd }.

**How to use.**

```
POST https://api.xynaptic.io/v1/ticket-buy (amount_usd 0.5-20)
-> 402 Payment Required (price: $0.5)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `ticket-status` — free

`POST https://api.xynaptic.io/v1/ticket-status — `(ticket_id + ticket_secret, free)``

**What it does.** Xynaptic Ticket Status — free: check remaining prepaid credit and validity. POST body: {ticket_id, ticket_secret}. Returns {remaining_usd, expires}. Free endpoint.

**How to use.**

```
POST https://api.xynaptic.io/v1/ticket-status (ticket_id + ticket_secret, free)
-> 402 Payment Required (price: free)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `watch-put` — $0.01

`POST https://api.xynaptic.io/v1/watch-put — `(condition + ttl)``

**What it does.** Xynaptic Watch — the agent daycare: we watch a condition for you, checked hourly up to 30 days; when triggered the result is encrypted with your watch_secret. Types: crypto_price_above|below, crypto_change_pct, company_officer_change, stock_price_above|below, stock_rsi_below|above, energy_price_above|below, news_keyword. POST body: { type, symbol|ticker|siren|keyword, price|pct|rsi, ttl_days?: 30, watch_secret?: optional }. Returns { watch_id, watch_secret, expires_at }.

**How to use.**

```
POST https://api.xynaptic.io/v1/watch-put (condition + ttl)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
