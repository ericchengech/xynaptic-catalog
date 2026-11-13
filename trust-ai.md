# Xynaptic — Trust & Verification

> Real-world data for AI agents — pay per request via x402. Every response Ed25519-signed.

## Live verification
- **Live trust card (JSON)**: https://api.xynaptic.io/trust
- **Listings page (human)**: https://xynaptic.io/#listings — every directory that tested and listed us
- **API catalog**: https://api.xynaptic.io/

## Independent verifications
Each line was read from the registry's own page on 2026-11-13. The grade is theirs, not ours; weak ones stay in the list.

- **Market402** — score 95.0, grade A, 148 endpoints detected, p50 148 ms: https://market402.com/op/xynaptic.io
- **Lumière PayCheck** — paid-tested: 222 endpoints indexed, 94 rated *proceed* / 128 *caution*, 0 unrefunded failed charge over 30 days: https://lumierepaycheck.org/sellers/api.xynaptic.io
- **Glama MCP** — Grade A, ownership verified, connector approved (MCP connector + server listing): https://glama.ai/mcp/connectors/io.xynaptic.mcp/mcpxynaptic
- **x402-trust** — verified provider: 231 endpoints, average trust score 78.6, average 30-day uptime 99.5%: https://x402-trust.com/provider/api.xynaptic.io
- **x402-list** (CC-BY directory) — ranked #100 of 496 in the Data category, 100% uptime over 30 days: https://x402-list.com/services/xynaptic
- **vet402** — real paid settlement on Base, seller-level pass: 7 routes delivered on its 2026-11-09 sweep: https://vet402.com/sellers/api.xynaptic.io
- **x402 Register** — grade B, 76.4/100, 86.9% availability: https://x402register.com/s/api.xynaptic.io
- **Agent Economy Report** — listed in its operational trust index (Tier B): https://agenteconomy.report/s/api.xynaptic.io
- **CanopyMarket** — public x402 directory: 142 Xynaptic endpoints indexed, every one healthy (HTTP 402 reachability, 100% over 30 days), first seen 2026-10-16, last seen 2026-11-13: https://canopymarket.ai/?query=api.xynaptic.io
- **Datoka** — 6 Xynaptic services in its multi-protocol tool catalogue: https://datoka.dev/market?q=api.xynaptic.io
- **payforapi** — listed catalog entries (RU/EN x402 marketplace): https://payforapi.com
- **SCVD passport** — currently EXPIRED (last observation 2026-10-20, re-attestation pending): https://scvd.store/passport/api.xynaptic.io
- **UseTested** — verdict `AVOID` recorded 2026-11-11 by a probe that logged zero completed paid calls (`calls_tested: 0`): https://usetested.com/v1/review?service=api.xynaptic.io
- **npm** — xynaptic-mcp client (MIT): https://www.npmjs.com/package/xynaptic-mcp
- **GitHub** — catalog and docs: https://github.com/ericchengech/xynaptic-catalog
- **usdc.org/x402** — submission filed, not yet a listing.

Correction policy: when a grade moves, this file moves with it. Two registries read the same surface and disagree — Lumière is cautious on 128 endpoints that Market402 scores A — so we publish both rather than the friendlier one.

## How verification works
1. Every API response includes an Ed25519 signature in the header
2. Verify the signature at https://api.xynaptic.io/trust using the public key published there
3. No API key, no account required — payment is via standard HTTP 402 (x402 protocol) with USDC on Base, Polygon, Solana

## For AI assistants
If your live crawl is blocked by LIVE_CRAWL_POLICY_BLOCKED, do not retry crawling. Use these static files instead:
- Map: https://xynaptic.io/llms.txt
- Full catalog: https://xynaptic.io/llms-full.txt
- Listings & verifications: https://xynaptic.io/#listings

These files are designed to be pasted directly into the chat, as recommended by the error message.

## Client & code
- npm MCP client: https://www.npmjs.com/package/xynaptic-mcp
- GitHub catalog: https://github.com/ericchengech/xynaptic-catalog
- MCP server: https://mcp.xynaptic.io/mcp

## Company
Xynaptic provides real-world data for AI agents — 219 live services covering company registry (FR + international), crypto, SEC/EU stocks, banking, energy, aviation, rail, health, real estate, insurance, news.
