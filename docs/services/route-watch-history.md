# route-watch-history — $0.01

> availability history of a registered target: uptime %, probe counts, last status, p50 latency, and the last N observations. GET ?target_id=rw_... (&limit=20).

**Price:** $0.01 per call, paid in USDC via x402 (Base, Polygon or Solana).
**Route:** `/v1/route-watch-history`

## What it does

Returns uptime percentage, probe counts, current status, p50 latency and the last N observations for a registered target id.

## How to use

```
GET `?target_id=rw_...` (and optional `?limit=` for the number of observations)
```

## Payment

Call the route without payment to receive a `402` with the price and the `accepts[]` list, sign the payment (EIP-3009 on EVM, or the Solana equivalent) and replay the request with the payment header. A prepaid ticket (`X-TICKET`) or a monthly plan also works.
