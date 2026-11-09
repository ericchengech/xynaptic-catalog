# crypto-price

**Real-time snapshot of 6 major crypto assets (BTC, ETH, SOL, ADA, LINK, DOT) with 24h changes, breadth and top movers. USD only, agent-ready.**

- **Route**: `GET https://api.xynaptic.io/v1/crypto-price`
- **Price**: $0.01 per call
- **Parameters**: none

```bash
curl -s https://api.xynaptic.io/v1/crypto-price
# -> 402 Payment Required (x402 v2 challenge, price: $0.01)
# -> sign & retry with PAYMENT-SIGNATURE header -> 200
```

**Response shape** (from catalog example):

```json
{
  "service": "crypto-price",
  "generated_at": "2026-09-23T10:00:00Z",
  "prices": { "BTC": { "usd": 86000, "chg_24h_pct": -0.4 } },
  "market": { "breadth": "3/6 up" },
  "summary": "BTC $86,000 (-0.4% 24h) — neutral tone."
}
```

**Limits**: fixed set of 6 assets (BTC, ETH, SOL, ADA, LINK, DOT), USD only — no other quote currency, no arbitrary token lookups (use `crypto-market` for top-100, `crypto-validate` for a specific token).

*Verified 2026-11-09: endpoint answers 402 + x402 v2 challenge (Base USDC) without payment; price as per live catalog.*
