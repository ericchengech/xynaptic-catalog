# Leisure & going out — 3 services

> Editorial dining data with the contacts that make a booking possible. Restaurants, bars and cinemas
> are pulled from open sources only (Wikipedia, Wikidata, Overture Maps, official hygiene registries,
> OpenStreetMap) — never scraped from Google, Yelp, Foursquare, Apple or TripAdvisor.

**Prices**: `restaurant-top` $0.10 · `restaurant-detail` $0.05 · `restaurant-search` $0.03 · `restaurant-nearby` $0.05.
Payment: x402 v2 in USDC on Base, Polygon or Solana. No API key, no account.

---

## restaurant-top — $0.10

**What it does.** The editorial ranking for one city: up to 50 records ordered by score.
Each record carries name, city, country, chef, Michelin distinction and stars, a 0–100 score
with its breakdown, address, phone, e-mail, booking link and hygiene signal.

**How to use.**

```
GET https://api.xynaptic.io/v1/restaurant-top?city=paris
GET https://api.xynaptic.io/v1/restaurant-top            # the 88 cities with data
```

| Parameter | Type | Notes |
|---|---|---|
| `city` | string | city slug or name (`paris`, `london`, `new-york`) |
| `limit` | int | 1–50, default 20 |
| `country` | string | optional ISO country filter |

Response: `{ data_as_of, city, count, restaurants[] }` — every record carries its `score_breakdown`
and `citations[]`.

---

## restaurant-detail — $0.05

**What it does.** One full record, by id or by name + city: why it ranks, the score breakdown,
contacts, opening hours when known, the official hygiene check with source and date, and citations.

**How to use.**

```
GET https://api.xynaptic.io/v1/restaurant-detail?id=rest-guy-savoy-paris
GET https://api.xynaptic.io/v1/restaurant-detail?name=Guy%20Savoy&city=paris
```

Returns 404 with `{ "error": "not_found" }` when the id is unknown — the snapshot never invents a record.

---

## restaurant-search — $0.03

**What it does.** Filter and facet the whole snapshot instead of reading one city.

| Parameter | Type | Notes |
|---|---|---|
| `city` | string | city slug or name |
| `country` | string | ISO country |
| `name` | string | restaurant or chef name, partial match |
| `min_stars` | int | 0–3 Michelin stars |
| `min_score` | int | 0–100 |
| `price_band` | string | `€`, `€€`, `€€€`, `€€€€` |
| `has_phone` | bool | records with a reachable phone number |
| `has_booking` | bool | records with a direct booking link |
| `sort` | string | `score` (default), `stars`, `name` |
| `limit` / `offset` | int | paginated |

Response: `{ data_as_of, count, total, results[], facets{} }`.

---

## Snapshot

- Published weekly in Workers KV: `restaurant:<ISO-week>` with a `restaurant:current` pointer.
  Never overwritten in place — rollback is a pointer move.
- `data_as_of` is exposed on every response; the snapshot is rebuilt from sources, not patched by hand.
- Current build: **139 restaurants · 88 cities**, `2026-W46`.

### Coverage (2026-W46)

| Signal | Records |
|---|---|
| with phone | 134 / 139 (96%) |
| with e-mail | 54 / 139 (39%) |
| with booking link | 90 / 139 (65%) |
| with official hygiene check | 8 / 139 |
| with opening hours | measured per build (`with_hours` in the counters) |

**Opening hours are partial by design.** They come from OpenStreetMap only. When OSM has none,
the field is `null`, `hours_source` is `null` and `hours_note` says so explicitly — silence is never
read as "closed". Hours are never guessed, never deduced from a website, and they never weigh in the score.

### Score

0–100, weighted: Michelin distinction and stars, editorial presence, contactability
(phone, e-mail, booking link), city centrality, hygiene signal. The breakdown is returned with
every record so an agent can re-weight it itself. `hours` carries no weight.

### Attribution (required in each payload)

Wikipedia CC BY-SA 4.0 · Wikidata CC0 · Overture Maps CDLA-Permissive-2.0 ·
Alim Confiance Licence Ouverte · FSA OGL v3 · NYC DOHMH public domain · OpenStreetMap ODbL.

### Ids

`rest-<name-slug>-<city-slug>` — e.g. `rest-guy-savoy-paris`, `rest-helene-darroze-at-the-connaught-london`.

## restaurant-nearby — $0.05

The volume layer. Every food place OpenStreetMap knows in a city zone — `restaurant`, `fast_food`, `bar`, `pub`, `cafe` — for people who need the neighbourhood, not the ranking.

```
GET https://api.xynaptic.io/v1/restaurant-nearby?city=lille
GET https://api.xynaptic.io/v1/restaurant-nearby?city=lille&lat=50.6330&lon=3.0700&radius_km=1&limit=50
GET https://api.xynaptic.io/v1/restaurant-nearby?city=lille&open_now=1&amenity=restaurant
```

Parameters: `city` (published zone, currently `lille`), `lat`+`lon` (your point, optional — defaults to the city centre), `radius_km` (0.2-25, default 3), `limit` (max 100), `offset`, `amenity`, `cuisine`, `brand`, `q`, `open_now=1`, `has_hours=1`.

Response: `{ version, data_as_of, city, center, radius_km, total, results[] }`. Each record: `id` (`osm-node-…`), `name`, `brand` (null when independent), `cuisine[]`, `amenity`, `lat`, `lon`, `address`, `postcode`, `phone`, `website`, `hours` (raw OSM), `open_now`, `distance_km`.

**The honesty rule.** `open_now` is `null` whenever the OSM hours are missing or use a syntax we do not parse (months, holidays, sunrise/sunset). It is never inferred, never guessed from the category or the hour of the day. A `null` means "ask them", not "closed". This is deliberate: on our 139 editorial records only 0.7% carry hours, while a dense zone like Lille carries them on 52% of POIs — the absence is the reality of the data, not a pipeline bug.

**No editorial score on this layer.** There is no star rating, no 0-100 quality score: a fast-food chain must never inherit a fine-dining ranking. Ranking lives in `restaurant-top`.

Attribution: OpenStreetMap contributors, ODbL 1.0. Hygiene grades from official sources (Alim Confiance, FSA, NYC DOHMH) are only joined where available — the field is omitted rather than guessed.
