# route-watch-register — $0.5

> register a target for continuous monitoring: probed every 2 hours for up to 30 days, history kept so you can query uptime and latency trends. POST body: {"url":"https://api.example.com/health","label":"optional"}. Returns { target_id, url, expires_at }.

**Price:** $0.5 per call, paid in USDC via x402 (Base, Polygon or Solana).
**Route:** `/v1/route-watch-register`

## What it does

Registers a target for continuous probing: the worker probes it every 2 hours for up to 30 days, keeps the history, and lets you query uptime and latency trends with `route-watch-history`.

## How to use

```
POST body: `{ "url": "https://example.com/api", "label": "optional", "expect_status": 200 }`
```

## Payment

Call the route without payment to receive a `402` with the price and the `accepts[]` list, sign the payment (EIP-3009 on EVM, or the Solana equivalent) and replay the request with the payment header. A prepaid ticket (`X-TICKET`) or a monthly plan also works.
