# crypto-brief-live

**Real-time crypto snapshot: BTC, ETH, SOL, ADA and top coins, fetched at the exact moment of the request. Live data, not a cached daily digest.**

- **Route**: `GET https://api.xynaptic.io/v1/crypto-brief-live`
- **Price**: $0.01 per call on Base and Solana, $0.02 on Polygon and Arbitrum (USD only)
- **Parameters**: none
- **Output**: JSON with `generated_at`, `live: true` and a `prices` object

```bash
curl -s https://api.xynaptic.io/v1/crypto-brief-live
# -> 402 Payment Required (x402 v2 challenge, $0.01 on Base)
# -> sign & retry with PAYMENT-SIGNATURE header -> 200
```

**Response shape** (from the catalog example):

```json
{
  "service": "crypto-brief-live",
  "generated_at": "2026-09-21T20:45:00Z",
  "live": true,
  "prices": {
    "BTC": { "usd": 82000, "chg_24h_pct": 1.6 }
  }
}
```

**Limits**: USD only; fixed instrument set (BTC, ETH, SOL, ADA + top coins), no arbitrary token lookup — use `crypto-price` for the 6-asset snapshot or `crypto-market` for the top-100. This endpoint is priced higher than the cached daily digest `crypto-brief` because each call triggers a live fetch. No documented pagination or historical data.

*Verified 2026-11-23: endpoint answers 402 + x402 v2 challenge on Base (eip155:8453) without payment; price and description read from the live catalog and OpenAPI (`/openapi.json`).*
