# economy-news-fr

**Live French economy press feed: latest macro and business news from a real web search (title, URL, source domain), optionally LLM-summarized.**

- **Route**: `GET https://api.xynaptic.io/v1/economy-news-fr?topic=marches&summarize=true`
- **Price**: $0.01 per call
- **Optional parameters**: `topic` — `marches` (default), `emploi`, `immobilier`, `energie`; `summarize=true` for LLM summarization

```bash
curl -s "https://api.xynaptic.io/v1/economy-news-fr?topic=marches"
# -> 402 Payment Required (x402 v2 challenge, price: $0.01)
# -> sign & retry with PAYMENT-SIGNATURE header -> 200
```

**Response shape** (from catalog example):

```json
{
  "service": "news-economy-fr",
  "topic": "marches",
  "articles": [ { "title": "La Bourse de Paris…", "url": "https://…", "source_domain": "lesechos.fr" } ]
}
```

**Limits**: press feed with titles, URLs and source domains — not the structured-events format of `news-eu`/`news-tech` (importance, lifecycle, entities). French economy topics only.

*Verified 2026-11-09: endpoint answers 402 + x402 v2 challenge without payment. Price as per live catalog.*
