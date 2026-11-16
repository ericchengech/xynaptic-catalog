# crypto-whales

**Live large Bitcoin transfers straight from the network: biggest mempool transactions and recent block flows, sorted by value (BTC + USD). Spot accumulation/distribution in real-time.**

- **Route**: `GET https://api.xynaptic.io/v1/crypto-whales?min_btc=10&limit=10`
- **Price**: $0.02 per call
- **Optional parameters**: `min_btc` (default 10), `limit` (default 10)

```bash
curl -s "https://api.xynaptic.io/v1/crypto-whales?min_btc=10"
# -> 402 Payment Required (x402 v2 challenge, price: $0.02)
# -> sign & retry with PAYMENT-SIGNATURE header -> 200
```

**Response shape** (from catalog example):

```json
{
  "service": "crypto-whales",
  "min_btc": 10,
  "whales": [ { "txid": "a1b2…", "value_btc": 134.2, "fee_sat": 4100 } ],
  "count": 3,
  "summary": "3 whale transfers >= 10 BTC in the current mempool."
}
```

**Limits**: Bitcoin only. Raw on-chain transfers — no attribution to named entities or exchanges, no EVM chains.

*Verified 2026-11-09: endpoint answers 402 + x402 v2 challenge without payment. Price as per live catalog.*
