# rail-intermodal-compare

**Train vs plane between two French cities: real next train journeys (Navitia/SNCF) vs flight estimate — composite verdict on door-to-door time, cost and CO2.**

- **Route**: `GET https://api.xynaptic.io/v1/rail-intermodal-compare?from=Paris&to=Nice`
- **Price**: $0.03 per call
- **Required parameters**: `from`, `to` — without them: `400 {"error":"params required: ?from=...&?to=..."}`

```bash
curl -s "https://api.xynaptic.io/v1/rail-intermodal-compare?from=Paris&to=Nice"
# -> 402 Payment Required (x402 v2 challenge, price: $0.03)
# -> sign & retry with PAYMENT-SIGNATURE header -> 200
```

**Response shape** (from catalog example): `service`, `from`, `to`, `distance_km`, `train` (real next journeys: times, duration, transfers), flight estimate (typical duration + price range, CO2 per passenger) and a composite verdict on when the train wins.

**Limits**: France focus. Flight side is an estimate (great-circle distance, typical duration/price), not live flight schedules. Informational — not a booking product.

*Verified 2026-11-09: with `from`/`to` → 402 + challenge; without params → 400 `params required` listing `from`, `to`, no payment taken. Price as per live catalog.*
