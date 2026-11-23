# energy-wind-forecast

**48-hour wind power forecast for a European region: wind speed at 100 m, estimated capacity factor and gusts.**

- **Route**: `GET https://api.xynaptic.io/v1/energy-wind-forecast`
- **Price**: $0.02 per call (same on Base, Polygon, Arbitrum, Solana)
- **Required parameter**: `region` (e.g. `fr`), or a `lat`/`lon` pair
- **Output**: JSON with `region`, an hourly `forecast[]` and a `summary`

```bash
curl -s "https://api.xynaptic.io/v1/energy-wind-forecast?region=fr"
# -> 402 Payment Required (x402 v2 challenge, $0.02)
# -> sign & retry with PAYMENT-SIGNATURE header -> 200
```

**Response shape** (from the catalog example):

```json
{
  "service": "wind-forecast",
  "region": "fr",
  "forecast": [
    { "hour": "06:00", "wind_ms": 7.2, "capacity_factor": 0.42 }
  ],
  "summary": "Steady wind, capacity factor ~0.42."
}
```

**Limits**: 48-hour horizon only — no seasonal or multi-week outlook. `capacity_factor` is an estimate derived from wind speed, not a metered production figure; do not treat it as a contractual yield. The catalog does not document the full list of accepted `region` codes, so `fr` is the safe choice until confirmed. Companion routes: `energy-wind-forecast` pairs with `energy-solar-forecast`, `energy-grid-status` and `energy-price` for a full generation/market picture.

*Verified 2026-11-23: endpoint answers 402 + x402 v2 challenge without payment, not 500; price and parameter read from the live catalog and OpenAPI.*
