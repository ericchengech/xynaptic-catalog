# crypto-wallet-health

**Score any Bitcoin or EVM address: balance, tx count, first/last activity (age), activity pattern and a composite health verdict (dormant/active/empty/high-risk).**

- **Route**: `GET https://api.xynaptic.io/v1/crypto-wallet-health?address=bc1q…&chain=btc`
- **Price**: $0.02 per call
- **Required parameters**: `address`, `chain` (`btc` or `eth`) — without them: `400 {"error":"params required: ?address=...&?chain=..."}`

```bash
curl -s "https://api.xynaptic.io/v1/crypto-wallet-health?address=bc1q…&chain=btc"
# -> 402 Payment Required (x402 v2 challenge, price: $0.02)
# -> sign & retry with PAYMENT-SIGNATURE header -> 200
```

**Response shape** (from catalog example):

```json
{
  "service": "crypto-wallet-health",
  "address": "bc1q…",
  "chain": "btc",
  "balance_btc": 42.1,
  "tx_count": 128,
  "first_seen": "2017-03-14",
  "verdict": "active",
  "score": 78,
  "summary": "Active 8-year-old wallet, 42 BTC, healthy."
}
```

**Limits**: Bitcoin and EVM (eth) addresses only. Health verdict is heuristic (activity pattern, age) — not a sanctions/AML screening (see `wallet-poisoning-watch`, `wallet-screen`).

*Verified 2026-11-09: with `address`+`chain` → 402 + challenge; without params → 400 `params required` listing `address`, `chain`, no payment taken. Price as per live catalog.*
