# restaurant-search

**Filter and facet search inside one restaurant zone: free text on name and brand, cuisine, place type, open-now, with pagination and facet counts over the matching set.**

- **Route**: `GET https://api.xynaptic.io/v1/restaurant-search`
- **Price**: $0.03 per call (same on Base, Polygon, Arbitrum, Solana)
- **Parameters**: `city` (zone slug) is the anchor; optional `q`, `cuisine`, `amenity` (`restaurant|cafe|bar`), `open_now=1`, `limit`, and pagination
- **Output**: JSON with `query`, `total`, `offset`, `returned`, the matching records and facet counts

```bash
curl -s "https://api.xynaptic.io/v1/restaurant-search?city=paris&cuisine=italien&open_now=1&limit=25"
# -> 402 Payment Required (x402 v2 challenge, $0.03)
# -> sign & retry with PAYMENT-SIGNATURE header -> 200
```

**Response shape** (envelope from the catalog example):

```json
{
  "service": "restaurant-search",
  "version": "2026-W46",
  "data_as_of": "2026-11-12",
  "attribution": "Classement éditorial d'après Wikipédia (fr), CC BY-SA 4.0 ; contrôles sanitaires ...",
  "hours_note": "Horaires fournis quand OpenStreetMap les contient (couverture partielle) ...",
  "query": { "city": "paris" },
  "total": 4,
  "offset": 0,
  "returned": 4
}
```

**Limits**: searches inside a single zone — call `GET /v1/restaurant-nearby/zones` first (free) to get valid `city` slugs. Same merged layer as `restaurant-nearby` (OSM ODbL + Overture CDLA, addresses from BAN/SIRENE); weekly snapshots, not live. `open_now` is honest against OpenStreetMap hours, whose coverage is partial: a missing or unreadable schedule yields no verdict rather than a guess. The `limit` and pagination parameter names are documented only by example (`limit=25`, `offset`); confirm the exact offset name before relying on deep paging.

*Verified 2026-11-23: endpoint answers 402 + x402 v2 challenge without payment; free `/v1/restaurant-nearby/zones` confirms the zone list the `city` parameter draws from.*
