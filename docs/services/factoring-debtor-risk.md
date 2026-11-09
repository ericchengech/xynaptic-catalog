# factoring-debtor-risk

**Pre-advance credit assessment of an invoice debtor (French company): registry status, financial strength, payment-risk verdict (advance/caution/refuse) and recommended max exposure.**

- **Route**: `GET https://api.xynaptic.io/v1/factoring-debtor-risk?siren=552100554`
- **Price**: $0.05 per call
- **Required parameter**: `siren` — without it: `400 {"error":"param required: ?siren="}`

```bash
curl -s "https://api.xynaptic.io/v1/factoring-debtor-risk?siren=552100554"
# -> 402 Payment Required (x402 v2 challenge, price: $0.05)
# -> sign & retry with PAYMENT-SIGNATURE header -> 200
```

**Response shape** (from catalog example):

```json
{
  "service": "factoring-debtor-risk",
  "siren": "552100554",
  "verdict": "advance",
  "score": 78,
  "max_exposure_eur": 50000,
  "summary": "Debtor healthy (score 78/100): advance recommended up to 50k EUR."
}
```

**⚠ Paramètre à noter**: the catalog description says `GET ?siren=... or ?name=...`, but the live endpoint only accepts `siren` — `?name=Danone` returns `400 param required: ?siren=` (verified 2026-11-09). Resolve a name to a SIREN first with `company-search`.

**Limits**: French companies only (SIREN). Informational, not financial advice — single-debtor product (portfolio-level: `factoring-portfolio-risk`).

*Verified 2026-11-09: with `siren` → 402 + challenge; without param and with `name=` → 400 `param required: ?siren=`, no payment taken. Price as per live catalog.*
