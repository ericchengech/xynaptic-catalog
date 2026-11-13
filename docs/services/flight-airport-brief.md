# flight-airport-brief

**Any airport worldwide by name or IATA code: country, IATA/ICAO codes, coordinates, elevation, runway count, served airlines hint. Open data (Wikidata).**

- **Route**: `GET https://api.xynaptic.io/v1/flight-airport-brief?q=CGK`
- **Price**: $0.02 per call
- **Required parameter**: `q` (name, e.g. `Jakarta`, or IATA code, e.g. `CGK`) — without it: `400 {"error":"param required: ?q="}`

```bash
curl -s "https://api.xynaptic.io/v1/flight-airport-brief?q=CGK"
# -> 402 Payment Required (x402 v2 challenge, price: $0.02)
# -> sign & retry with PAYMENT-SIGNATURE header -> 200
```

**Response shape** (from catalog example):

```json
{
  "service": "flight-airport-brief",
  "q": "CGK",
  "iata": "CGK",
  "icao": "WIII",
  "country": "Indonesia",
  "coord": { "lat": -6.12, "lon": 106.96 },
  "summary": "Soekarno-Hatta International Airport (CGK/WIII), Indonesia."
}
```

**Limits**: static/factual airport data — not live conditions (see `flight-airport-situation` for weather/ops), not departures (see `rail-departures` for FR rail).

*Verified 2026-11-09: with `q=CGK` → 402 + challenge; without param → 400 `param required: ?q=`, no payment taken. Price as per live catalog.*
