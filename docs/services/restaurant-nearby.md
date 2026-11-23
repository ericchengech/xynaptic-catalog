# restaurant-nearby

**Places to eat and drink around a point or across a city zone, merged from OpenStreetMap and Overture Maps Places. Each record states which bases know it; places Overture declares closed are removed.**

- **Route**: `GET https://api.xynaptic.io/v1/restaurant-nearby`
- **Price**: $0.05 per call (same on Base, Polygon, Arbitrum, Solana)
- **Parameters**: either `city` (a zone slug from the free list) or a `lat`/`lon` point, plus an optional `radius_km`
- **Free companion route**: `GET https://api.xynaptic.io/v1/restaurant-nearby/zones` — no payment, lists every covered city with its center, count and `data_as_of`

```bash
# Free: which cities are covered, and how fresh the snapshot is
curl -s https://api.xynaptic.io/v1/restaurant-nearby/zones

# Paid: restaurants around Lille
curl -s "https://api.xynaptic.io/v1/restaurant-nearby?city=lille&radius_km=3"
# -> 402 Payment Required (x402 v2 challenge, $0.05)
# -> sign & retry with PAYMENT-SIGNATURE header -> 200
```

**Response shape** (from the catalog example):

```json
{
  "service": "restaurant-nearby",
  "version": "2026-W46-lille-v6",
  "data_as_of": "2026-11-14T10:00:10Z",
  "city": "Lille",
  "city_slug": "lille",
  "center": { "lat": 50.6292, "lon": 3.0573 },
  "radius_km": 3,
  "radius_requested_km": 3,
  "zone_coverage_km": 5,
  "radius_clamped": false
}
```

Records additionally carry the source bases, `address_source` (BAN / SIRENE completion), and `open_now` — `null` when hours are missing or unreadable, never guessed.

**Limits**: weekly dated snapshots (not real-time), France first then other regions wave by wave — check `/zones` before paying. A radius bigger than the zone is clamped, and `radius_clamped` tells you so. Hours come from OpenStreetMap and have partial coverage. Use `restaurant-search` to filter inside a zone and `restaurant-detail` for a single place.

*Verified 2026-11-23: paid route answers 402 + x402 v2 challenge (no 500); `/v1/restaurant-nearby/zones` answers 200 without payment (`free: true`, 2283 entries).*
