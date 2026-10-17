# Xynaptic — Service reference by domain

> Every service detailed: **What it does** and **How to use** (route, parameters, price, payment flow). No API key. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon.

**200 services across 19 domains** — names and prices match the live machine-readable catalog at https://api.xynaptic.io. MCP: mcp.xynaptic.io/mcp

| Domain | Services | File |
|---|---|---|
| Xynaptic Core (Agent Runtime & Storage) | 7 | [`xynaptic-core-agent-runtime-storage.md`](xynaptic-core-agent-runtime-storage.md) |
| AI Layer | 14 | [`ai-layer.md`](ai-layer.md) |
| Crypto & DeFi | 26 | [`crypto-defi.md`](crypto-defi.md) |
| Securities (US) | 12 | [`securities-us.md`](securities-us.md) |
| Securities EU | 6 | [`securities-eu.md`](securities-eu.md) |
| Portfolio | 1 | [`portfolio.md`](portfolio.md) |
| Banking & Payments | 16 | [`banking-payments.md`](banking-payments.md) |
| Company Registry (FR) | 30 | [`company-registry-fr.md`](company-registry-fr.md) |
| Energy & Grid | 12 | [`energy-grid.md`](energy-grid.md) |
| Flight & Aviation | 9 | [`flight-aviation.md`](flight-aviation.md) |
| Rail & Transport (FR) | 10 | [`rail-transport-fr.md`](rail-transport-fr.md) |
| Travel & Navigation | 2 | [`travel-navigation.md`](travel-navigation.md) |
| News & Media | 10 | [`news-media.md`](news-media.md) |
| Real Estate (FR) | 11 | [`real-estate-fr.md`](real-estate-fr.md) |
| Industrial & Commodities | 10 | [`industrial-commodities.md`](industrial-commodities.md) |
| Insurance | 10 | [`insurance.md`](insurance.md) |
| Health & Medical | 8 | [`health-medical.md`](health-medical.md) |
| Jobs & Public Data (FR) | 3 | [`jobs-public-data-fr.md`](jobs-public-data-fr.md) |
| Agent Skills | 3 | [`agent-skills.md`](agent-skills.md) |

Prefer no per-call blockchain payments? `POST /v1/ticket-buy` (0.5–20 USDC, 90 days), then consume any service with the `X-TICKET` header at 20% off. Status check free.