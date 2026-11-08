# Audit & Security — 9 services

> Static and live security checks for agents and builders: MCP configuration review, GitHub repository
> audit, domain ownership proof, authorised attack simulation, wallet monitoring and endpoint availability
> watching. No API key — pay per call in USDC via [x402](https://x402.org) on Base, Polygon or Solana.
>
> Machine-readable catalog: https://api.xynaptic.io — live docs: https://xynaptic.io/docs

| Service | Price | Route | What it does |
|---|---|---|---|
| `mcp-audit` | $0.5 | `/v1/mcp-audit` | static security review of an MCP client config before you approve it: paste any mcpServers config (mcp.json, Cursor, VS Code…), we classify every pack |
| `repo-security-audit` | $0.5 | `/v1/repo-security-audit` | static security review of a public GitHub repository: scans the most actionable files for committed secrets (AWS/GitHub/Slack/OpenAI keys, private key |
| `repo-security-audit-large` | $2 | `/v1/repo-security-audit` | same route as repo-security-audit (POST /v1/repo-security-audit): when the repository has more than 20 reviewable files, a second 402 is served at 2.0 |
| `domain-ownership-proof` | $0.25 | `/v1/domain-ownership-proof` | prove you control a domain (or a GitHub repo) without exposing an email address: we generate a challenge token to publish as a DNS TXT record or at /. |
| `security-sim` | $1 | `/v1/security-sim` | an authorised, non-destructive attack simulation against a target YOU own: probes TLS configuration, security headers, exposed admin paths, cookie fla |
| `wallet-watch` | $12 | `/v1/wallet-watch` | continuous monitoring of an EVM or Solana wallet: balance and value, inbound/outbound transfers, token approvals granted, and alerts on suspicious pat |
| `route-watch` | $0.02 | `/v1/route-watch` | one-shot availability probe of any third-party HTTPS API (the service behind the route-watch idea). Returns status code, verdict (up/degraded/down), l |
| `route-watch-register` | $0.5 | `/v1/route-watch-register` | register a target for continuous monitoring: probed every 2 hours for up to 30 days, history kept so you can query uptime and latency trends. POST bod |
| `route-watch-history` | $0.01 | `/v1/route-watch-history` | availability history of a registered target: uptime %, probe counts, last status, p50 latency, and the last N observations. GET ?target_id=rw_... (&li |

## How to use

Every route follows the same flow: call it without payment, receive a `402` with the price and the
`accepts[]` list, sign the payment (EIP-3009 on EVM, or the Solana equivalent) and replay the request with
the payment header. A prepaid ticket (`X-TICKET`) or a monthly plan works too and removes the per-call
wallet step.

## Notes

- `repo-security-audit-large` is **not** a separate route: it is the second price tier served by
  `/v1/repo-security-audit` when the repository has more than 20 reviewable files.
- `security-sim` is authorised, non-destructive testing: you must own or be allowed to test the target.
- `wallet-watch` is a subscription (12 USD / 30 days) monitored hourly, with webhook alerts.

## Detailed pages

Some services have a dedicated page in this folder:

- [mcp-audit](mcp-audit.md)
- [repo-security-audit](repo-security-audit.md)
- [repo-security-audit-large](repo-security-audit-large.md)
- [domain-ownership-proof](domain-ownership-proof.md)
- [security-sim](security-sim.md)
- [route-watch](route-watch.md)
- [route-watch-register](route-watch-register.md)
- [route-watch-history](route-watch-history.md)
