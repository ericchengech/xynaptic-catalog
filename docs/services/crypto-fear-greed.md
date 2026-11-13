# crypto-fear-greed

**The market sentiment thermometer (alternative.me index, 0-100): current value, yesterday, last week, classification (extreme fear…extreme greed) + interpretation hint for agents.**

- **Route**: `GET https://api.xynaptic.io/v1/crypto-fear-greed`
- **Price**: $0.02 per call
- **Parameters**: none

```bash
curl -s https://api.xynaptic.io/v1/crypto-fear-greed
# -> 402 Payment Required (x402 v2 challenge, price: $0.02)
# -> sign & retry with PAYMENT-SIGNATURE header -> 200
```

**Response shape** (from catalog example):

```json
{
  "service": "crypto-fear-greed",
  "value": 34,
  "classification": "fear",
  "yesterday": 41,
  "last_week": 55,
  "summary": "Market in fear (34/100), down from 41 yesterday."
}
```

**Limits**: a single aggregated sentiment index from alternative.me — not per-asset sentiment, not price data (see `crypto-price`, `crypto-market`).

*Verified 2026-11-09: endpoint answers 402 + x402 v2 challenge without payment. Price as per live catalog.*
