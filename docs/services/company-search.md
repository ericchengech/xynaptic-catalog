# company-search

**Find French companies by name or SIREN: identity, activity and status. The entry point to the company funnel (`company-profile`, `company-people`, `company-financial`...).**

- **Route**: `GET https://api.xynaptic.io/v1/company-search`
- **Price**: $0.02 per call (same on Base, Polygon, Arbitrum, Solana)
- **Required parameter**: `q` — company name or SIREN
- **Output**: JSON with `query`, `facts.companies[]`, a `summary` and suggested next actions

```bash
curl -s "https://api.xynaptic.io/v1/company-search?q=carrefour"
# -> 402 Payment Required (x402 v2 challenge, $0.02)
# -> sign & retry with PAYMENT-SIGNATURE header -> 200
```

**Response shape** (from the catalog example):

```json
{
  "service": "company-search",
  "query": "carrefour",
  "facts": {
    "total_results": 10000,
    "returned": 10,
    "companies": [
      { "siren": "652014051", "name": "CARREFOUR", "activity": "...", "status": "...", "hq": "..." }
    ]
  },
  "summary": "10 matches for \"carrefour\" — top: CARREFOUR (652014051).",
  "agent": {
    "actionability": "high",
    "recommended_actions": ["get_company_profile", "check_officers"],
    "related_xynaptic_apis": []
  },
  "data": {
    "source": "recherche-entreprises.api.gouv.fr (État, open data)",
    "freshness": "real-time"
  }
}
```

**Limits**: French companies only (SIRENE/INSEE open data), real-time registry data. `facts.returned` is 10 in the example; a page-size or offset parameter is not documented in the catalog, so plan on the first page only until confirmed. No full-text search over activity or address — use `company-international-search` for non-French entities. An empty `q` returns a payment challenge first; the 400 `param required` branch is only observable with a paid request.

*Verified 2026-11-23: endpoint answers 402 + x402 v2 challenge without payment; price, source and example read from the live catalog.*
