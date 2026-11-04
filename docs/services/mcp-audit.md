# MCP Audit — Xynaptic service reference

> Static security review of MCP client configs. No API key. No subscription needed. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Live on the catalog: https://xynaptic.io — price **$0.25** per audit.

**What it does.**

You want to install an MCP server (or approve a teammate's `mcp.json`) — but its config references packages that can silently resolve to **different code after approval** (`@latest`, ranges, unpinned Docker images). Paste the config, get a per-server verdict:

| Selector example | Result | Why |
| --- | --- | --- |
| `xynaptic-mcp@1.1.8` | **SAFE** | exact pin (direct selector; transitive tree not proven) |
| `@scope/pkg` (bare) | **HIGH** | future resolution can select different code |
| `pkg@latest` / `@beta` / `@next` | **HIGH** | npm distribution tag is mutable |
| `pkg@^1.2.0` / `pkg@~1.2.0` | **MEDIUM** | range permits drift |
| `image@sha256:<digest>` | **SAFE** | full digest fixes content |
| `image:1.2` (or no tag) | **HIGH** | any docker tag can move |
| `git+https://…`, local path | **REVIEW** | separate integrity review required |
| ambiguous syntax | **REVIEW** | we never guess, never execute |

Global verdict: `OK` / `NEEDS-REVIEW` (any REVIEW) / `NEEDS-FIX` (any HIGH).

**Boundaries (always included in the response).**

Static review only — **no server is executed, no package is resolved**. Mutable references are reproducibility/review signals, **not** breach claims. A clean result here is not a complete security assessment.

**How to use.**

```
POST https://api.xynaptic.io/v1/mcp-audit
   body: { "config": { "mcpServers": { ... } } }     // or JSON string, or array
-> 402 Payment Required (price: $0.25 in micro-USDC: 250000)
-> sign & retry with PAYMENT-SIGNATURE header (or Authorization: Bearer sub_… for subscriber plans)
-> 200 JSON:
{
  "service": "mcp-audit",
  "verdict": "NEEDS-FIX",
  "servers": 2,
  "findings": [
    { "server": "browser", "reference": "example-browser-mcp@latest",
      "result": "HIGH", "why": "npm distribution tag is mutable",
      "next": "pin the exact version the team reviewed" },
    { "server": "pinned", "reference": "xynaptic-mcp@1.1.8",
      "result": "SAFE", "why": "exact pin (direct selector; transitive tree not proven)" }
  ],
  "disclaimer": "Static review only — no server executed, no package resolved."
}
```

Also included in subscriber plans (`Authorization: Bearer sub_…` header): balance is returned in `x-ticket-balance` (25 units deducted for starter).

**Error cases.**

- `400` — `config` missing / config string invalid JSON / no `mcpServers` mapping
- `402` — no payment / payment rejected (challenge re-served)
- GET returns the 402 terms (price visible for probes and agents)

**Try it without paying.**

The challenge itself (GET) returns the full price schema, ready for any x402 client:

```
GET https://api.xynaptic.io/v1/mcp-audit
-> 402 with accepts[] (Base / Solana / Polygon, USDC)
```