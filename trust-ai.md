# Xynaptic — Trust & Verification

> Real-world data for AI agents — pay per request via x402. Every response Ed25519-signed.

## Live verification
- **Live trust card (JSON)**: https://api.xynaptic.io/trust
- **Human trust page**: https://xynaptic.io/trust (human page)
- **API catalog**: https://api.xynaptic.io/
- **SCVD Passport**: https://scvd.store/passport/api.xynaptic.io

## Independent verifications
- **Glama MCP**: Grade A — https://glama.ai/mcp/connectors/io.xynaptic.mcp/mcpxynaptic
- **x402-trust**: verified
- **Market402**: 100/100
- **vet402**: PASS
- **SCVD census**: READY

## How verification works
1. Every API response includes an Ed25519 signature in the header
2. Verify the signature at https://api.xynaptic.io/trust using the public key published there
3. No API key, no account required — payment is via standard HTTP 402 (x402 protocol) with USDC on Base, Polygon, Solana

## For AI assistants
If your live crawl is blocked by LIVE_CRAWL_POLICY_BLOCKED, do not retry crawling. Use these static files instead:
- Map: https://xynaptic.io/llms.txt
- Full catalog: https://xynaptic.io/llms-full.txt
- Trust: https://xynaptic.io/trust

These files are designed to be pasted directly into the chat, as recommended by the error message.

## Client & code
- npm MCP client: https://www.npmjs.com/package/xynaptic-mcp
- GitHub catalog: https://github.com/ericchengech/xynaptic-catalog
- MCP server: https://mcp.xynaptic.io/mcp

## Company
Xynaptic provides real-world data for AI agents — 200+ live services covering company registry (FR + international), crypto, SEC/EU stocks, banking, energy, aviation, rail, health, real estate, insurance, news.
