# news-us

**Structured US news events from the last 3 hours: importance, lifecycle, entities, sectors, multi-source verification and agent-ready actions. Refreshed every 2 hours.**

- **Route**: `GET https://api.xynaptic.io/v1/news-us`
- **Price**: $0.01 per call on Base and Solana, $0.02 on Polygon and Arbitrum
- **Parameters**: none
- **Output**: JSON with `generated_at`, `refresh` and an `items[...]` array

```bash
curl -s https://api.xynaptic.io/v1/news-us
# -> 402 Payment Required (x402 v2 challenge, $0.01 on Base)
# -> sign & retry with PAYMENT-SIGNATURE header -> 200
```

**Response shape** (from the catalog example):

```json
{
  "service": "news-us",
  "generated_at": "2026-11-23T08:00:00Z",
  "refresh": "every 2 hours",
  "items": [
    { "topic": "US", "headline": "...", "source": "..." }
  ]
}
```

**Limits**: US coverage only, rolling 3-hour window — it is a v2 structured feed, not a searchable archive. No query parameter to filter by topic, sector or date; no pagination documented. For other regions use `news-eu`, `news-asia`, `news-mideast`, `news-russia`; for a general world feed use `news-world`. Expect the feed to be empty or short during quiet news periods.

*Verified 2026-11-23: endpoint answers 402 + x402 v2 challenge without payment, not 500; price and refresh period read from the live catalog.*
