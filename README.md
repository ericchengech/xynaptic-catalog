# Xynaptic — Real-world data for AI agents

**36 pay-per-request data APIs. No API key. No subscription. Pay in USDC via [x402](https://x402.org).**

```
GET https://api.xynaptic.io/v1/energy-price
→ 402 Payment Required (price: $0.005)
→ sign EIP-3009 (or your x402 client)
→ retry with PAYMENT-SIGNATURE
→ 200 JSON: facts, assessment, summary, agent-ready actions
```

**Machine-readable catalog (free):** https://api.xynaptic.io

## Verticals

| Vertical | Routes | Example |
|---|---|---|
| ⚡ Energy | 8 | `ev-charge-window` — cheapest EV charging: 50 kWh for ~€0.19, save 71% |
| 🚆 French rail | 7 | `connection-risk` — "will I miss my connection at Lyon Part-Dieu?" scored 0-1 with recommended margin |
| ✈️ Aviation | 5 | `flight-route-risk` — weather + events + traffic composite risk per route |
| 📰 News (v2) | 9 | structured events: importance, lifecycle, entities, verification |
| 📈 Crypto | 7 | briefs, onchain, market regime, risk |

## Quick start (any x402 client)

```bash
# 1. Discover the catalog (free)
curl https://api.xynaptic.io/

# 2. Any x402 SDK pays automatically, e.g. TypeScript:
# const client = new X402Client(...)
# const data = await client.fetch("https://api.xynaptic.io/v1/energy-price")
```

Or search us on the **x402 Bazaar**: `searchX402Resources({ query: "energy price" })`

## Response schema (same across all services)

```json
{
  "service": "ev-charge-window",
  "generated_at": "2026-09-24T05:12:00Z",
  "facts": { "...raw verified data..." },
  "assessment": { "confidence": "..." },
  "summary": "Charge 09:00-14:00: ~0.19 EUR for 50 kWh, save 71.6%.",
  "agent": {
    "actionability": "high",
    "recommended_actions": ["schedule_charging_window"],
    "related_xynaptic_apis": [{ "endpoint": "/v1/energy-opportunity" }]
  },
  "data": { "source": "...", "freshness": "real-time", "schema_doc": "..." }
}
```

The `agent` block chains services: buy one, know what to buy next.

## Networks

- Base (eip155:8453) — USDC, settle ~$0.0005
- Polygon (eip155:137) — USDC
- Solana — USDC

## Contact

- Catalog: https://api.xynaptic.io
- Protocol: https://x402.org

*Data freshness: real-time sources (SNCF/Navitia, aviationweather, OpenSky, EPEX/awattar, Open-Meteo) + curated 2h digests (KV-cached). Built by an independent builder.*