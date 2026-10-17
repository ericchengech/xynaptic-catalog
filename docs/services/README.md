# Xynaptic — Service reference by domain

> Every service, detailed: **What it does** (description, data sources) and **How to use** (route, parameters, price, payment flow). No API key. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon.

**200 paid services across 16 domains.** Machine-readable catalog: https://api.xynaptic.io — MCP: mcp.xynaptic.io/mcp

| Domain | Services | File |
|---|---|---|
| Company Registry (FR) | 31 | [`company-registry-fr.md`](company-registry-fr.md) |
| Crypto & DeFi | 26 | [`crypto-defi.md`](crypto-defi.md) |
| Finance & SEC | 19 | [`finance-sec.md`](finance-sec.md) |
| Banking & Payments | 15 | [`banking-payments.md`](banking-payments.md) |
| AI & LLM | 14 | [`ai-llm.md`](ai-llm.md) |
| Energy & Grid | 12 | [`energy-grid.md`](energy-grid.md) |
| Real Estate (FR) | 11 | [`real-estate-fr.md`](real-estate-fr.md) |
| Agent Runtime & Storage | 10 | [`agent-runtime-storage.md`](agent-runtime-storage.md) |
| Industrial & Commodities | 10 | [`industrial-commodities.md`](industrial-commodities.md) |
| Insurance | 10 | [`insurance.md`](insurance.md) |
| News & Media | 9 | [`news-media.md`](news-media.md) |
| Aviation | 9 | [`aviation.md`](aviation.md) |
| Rail & Transport | 8 | [`rail-transport.md`](rail-transport.md) |
| Health & Medical | 8 | [`health-medical.md`](health-medical.md) |
| Travel & Navigation | 4 | [`travel-navigation.md`](travel-navigation.md) |
| Jobs & Public Data | 4 | [`jobs-public-data.md`](jobs-public-data.md) |

**Payment flow (same for every endpoint):**
```
GET https://api.xynaptic.io/v1/<service>
→ 402 Payment Required (price in the response)
→ sign EIP-3009 / use any x402 client (Base, Solana, Polygon)
→ retry with PAYMENT-SIGNATURE header
→ 200 JSON — agent-ready: facts, assessment, summary
```

Prefer no per-call blockchain payments? Buy a **prepaid ticket** (`POST /v1/ticket-buy`, 0.5-20 USDC, 90 days) and consume any service with the `X-TICKET` header at 20% off. Status check is free (`POST /v1/ticket-status`).