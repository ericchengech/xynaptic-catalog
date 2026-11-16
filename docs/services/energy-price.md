# energy-price

**Current electricity spot price (EUR/MWh) with 24h trend and hourly profile. Europe (awattar market data). Lightweight, real-time.**

- **Route**: `GET https://api.xynaptic.io/v1/energy-price`
- **Price**: $0.02 per call
- **Parameters**: none

```bash
curl -s https://api.xynaptic.io/v1/energy-price
# -> 402 Payment Required (x402 v2 challenge, price: $0.02)
# -> sign & retry with PAYMENT-SIGNATURE header -> 200
```

**Response shape** (from catalog example):

```json
{
  "service": "energy-price",
  "region": "de",
  "price_eur_mwh": 18.8,
  "change_24h_pct": -12.5,
  "summary": "Spot 18.8 EUR/MWh, falling."
}
```

**Limits**: European wholesale spot only (EUR/MWh) — not household retail tariffs (see `gas-tariff-zone`), not the full 24h cheap-window analysis (see `energy-opportunity`, `energy-battery-arbitrage`).

*Verified 2026-11-09: endpoint answers 402 + x402 v2 challenge without payment. Price as per live catalog.*
