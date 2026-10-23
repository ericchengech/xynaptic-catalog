# Xynaptic MCP Server

**This repository contains the Xynaptic MCP server implementation** — a zero-dependency Node.js MCP server (`index.js`) that exposes the Xynaptic catalog of 207 pay-per-call data & AI services to MCP clients over stdio, plus its `Dockerfile` for containerized evaluation and deployment.

## What it is

The server is a Model Context Protocol server (JSON-RPC 2.0 over stdio). On startup it responds to MCP introspection (`initialize`, `tools/list`, `tools/call`). Each tool call proxies to the hosted Xynaptic endpoint at `mcp.xynaptic.io/mcp`, which serves the live catalog: crypto markets, French company registry, US/EU securities, banking, real estate, health, energy, rail, FAA NOTAMs, legal, and a Developer Kit (code review, fixes, refactoring, test generation, error explanation, security audits).

Payments are per call in USDC via the x402 protocol (Base/Polygon/Solana) — no API key, no account. Paid tool calls return the x402 challenge (`accepts[]`); set `XYNAPTIC_SUB_KEY` to bill a monthly subscription instead.

## Run it locally

```bash
git clone https://github.com/ericchengech/xynaptic-catalog.git
cd xynaptic-catalog
node index.js   # stdio MCP server, Node 18+, zero dependencies
```

Or with Docker:

```bash
docker build -t xynaptic-mcp .
docker run -i xynaptic-mcp
```

Configure any MCP client (Claude Desktop, Cursor, etc.) with the command `node /path/to/xynaptic-catalog/index.js`.

## Repository structure

- `index.js` — the MCP server implementation (stdio transport, JSON-RPC 2.0, proxy to the live catalog)
- `Dockerfile` — container image for evaluation and deployment
- `package.json` — package metadata (`xynaptic-mcp-server`, zero dependencies)
- `llms.txt`, `llms-full.txt` — machine-readable endpoint documentation
- `docs/` — additional documentation
- `trust-ai.md` — trust and verification notes

## Hosted endpoint

The same catalog is also served live over streamable HTTP at `mcp.xynaptic.io/mcp` for agents that prefer a remote connection. Hosted listing: https://glama.ai/mcp/connectors/io.xynaptic.mcp/mcpxynaptic

## License

MIT
