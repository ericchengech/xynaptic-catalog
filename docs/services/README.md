# Xynaptic — Service reference by domain

> Every service detailed: **What it does** and **How to use** (route, parameters, price, payment flow). No API key. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon.

**201 services across 16 domains** — same taxonomy as the live docs at https://xynaptic.io/docs. Machine-readable catalog: https://api.xynaptic.io — MCP: mcp.xynaptic.io/mcp

| Domain | Services | File |
|---|---|---|
| Xynaptic Core | 7 | [`xynaptic-core-agent-runtime-storage.md`](xynaptic-core-agent-runtime-storage.md) |
| Skills | 17 | [`ai-llm.md`](ai-llm.md) |
| Crypto | 24 | [`crypto-defi.md`](crypto-defi.md) |
| Finance | 20 | [`finance-sec.md`](finance-sec.md) |
| Banking & Payments | 19 | [`banking-payments.md`](banking-payments.md) |
| Business | 18 | [`company-registry-fr.md`](company-registry-fr.md) |
| Jobs & Public | 16 | [`jobs-public-data.md`](jobs-public-data.md) |
| News | 8 | [`news-media.md`](news-media.md) |
| Flight | 9 | [`flight-aviation.md`](flight-aviation.md) |
| Rail | 8 | [`rail-transport-fr.md`](rail-transport-fr.md) |
| Travel & Tourism | 4 | [`travel-navigation.md`](travel-navigation.md) |
| Energy | 11 | [`energy-grid.md`](energy-grid.md) |
| Industry & Commodities | 11 | [`industrial-commodities.md`](industrial-commodities.md) |
| Property | 11 | [`real-estate-fr.md`](real-estate-fr.md) |
| Insurance | 10 | [`insurance.md`](insurance.md) |
| Health | 8 | [`health-medical.md`](health-medical.md) |

Prefer no per-call blockchain payments? `POST /v1/ticket-buy` (0.5–20 USDC, 90 days), then consume any service with the `X-TICKET` header at 20% off. Status check free.