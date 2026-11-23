# company-news

**Press radar for due diligence: bring a company name or a French SIREN, get its latest news from a live web search — title, URL, snippet, source domain — optionally LLM-summarized.**

- **Route**: `GET https://api.xynaptic.io/v1/company-news`
- **Price**: $0.02 per call (same on Base, Polygon, Arbitrum, Solana)
- **Required parameter**: `name` **or** `siren`
- **Optional parameter**: `summarize=true` adds an LLM summary
- **Output**: JSON with `name`, `articles[]`, `summary`

```bash
curl -s "https://api.xynaptic.io/v1/company-news?name=Danone&summarize=true"
# or: ?siren=552032534
# -> 402 Payment Required (x402 v2 challenge, $0.02)
# -> sign & retry with PAYMENT-SIGNATURE header -> 200
```

**Response shape** (from the catalog example):

```json
{
  "service": "company-news",
  "name": "Danone",
  "articles": [
    {
      "title": "Danone va acquérir MADE Group",
      "url": "https://www.danone.com/...",
      "source_domain": "danone.com"
    }
  ],
  "summary": "5 live articles found for Danone."
}
```

**Limits**: live web search, so results reflect what is indexed at call time — not an exhaustive archive and no date-range parameter documented. Name ambiguity is possible when `siren` is not supplied. `summarize=true` costs the same per call but makes the response LLM-generated; treat the summary as a convenience, and cite the `url` fields. Closes the KYB loop with `company-profile`, `company-financial` and `company-network`.

*Verified 2026-11-23: endpoint answers 402 + x402 v2 challenge without payment; price and parameters read from the live catalog.*
