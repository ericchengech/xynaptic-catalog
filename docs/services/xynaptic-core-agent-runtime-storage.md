# Xynaptic Core — Xynaptic service reference

> 7 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works:** `GET` any endpoint → `402 Payment Required` → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `store-put` — $0.01

`POST https://api.xynaptic.io/v1/store-put` — `(value + ttl)`

**What it does.** encrypted scratchpad for agents: deposit a JSON payload (64KB max), we store it encrypted on ou

**How to use.**

```
POST https://api.xynaptic.io/v1/store-put (value + ttl)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `store-get` — $0.01

`POST https://api.xynaptic.io/v1/store-get` — `(store_id + claim_secret)`

**What it does.** retrieve a stored object: POST body: { store_id, claim_secret, delete_after_read?: true }. Wron

**How to use.**

```
POST https://api.xynaptic.io/v1/store-get (store_id + claim_secret)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `store-append` — $0.01

`POST https://api.xynaptic.io/v1/store-append` — `(store_id + claim_secret + value + mode?)`

**What it does.** merge new JSON into an existing stored object without re-uploading: POST body: { store_id, clai

**How to use.**

```
POST https://api.xynaptic.io/v1/store-append (store_id + claim_secret + value + mode?)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `watch-put` — $0.01

`POST https://api.xynaptic.io/v1/watch-put` — `(condition + ttl)`

**What it does.** the agent daycare: we watch a condition for you, checked hourly up to 30 days; when triggered t

**How to use.**

```
POST https://api.xynaptic.io/v1/watch-put (condition + ttl)
-> 402 Payment Required (price: $0.01)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `watch-status` — $FREE

`POST https://api.xynaptic.io/v1/watch-status` — `(watch_id + watch_secret)`

**What it does.** check if your watch triggered. POST body: { watch_id, watch_secret }. Returns { status: waiting

**How to use.**

```
POST https://api.xynaptic.io/v1/watch-status (watch_id + watch_secret)
-> 402 Payment Required (price: $FREE)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `ticket-buy` — $0.5

`POST https://api.xynaptic.io/v1/ticket-buy` — `(amount_usd 0.5-20)`

**What it does.** prepaid credit: pay once (0.5-20 USDC), get a ticket_id|ticket_secret, consume any service with

**How to use.**

```
POST https://api.xynaptic.io/v1/ticket-buy (amount_usd 0.5-20)
-> 402 Payment Required (price: $0.5)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```

---

## `ticket-status` — $FREE

`POST https://api.xynaptic.io/v1/ticket-status` — `(ticket_id + ticket_secret, free)`

**What it does.** free: check remaining prepaid credit and validity. POST body: {ticket_id, ticket_secret}. Retur

**How to use.**

```
POST https://api.xynaptic.io/v1/ticket-status (ticket_id + ticket_secret, free)
-> 402 Payment Required (price: $FREE)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
