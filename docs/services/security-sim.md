# Security Sim — Xynaptic service reference

> **STATUS: UPCOMING — NOT YET LIVE.** Endpoint and pricing below are the committed specification; the service is under construction and not yet accepting payments.

> Authorized attacker-view fuzz brief for your own endpoints. No API key. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Live on the catalog: https://xynaptic.io — price **$1.00** per scan or **$5/month** with weekly re-scans.

**What it does.**

A light, rate-limited simulation of what an attacker would try against one of your endpoints — the "fuzz-brief". We probe your target and return a findings report with **CVSS scores**:

- fuzzed inputs: unexpected `500` vs clean `400`, stack traces leaking in error bodies
- payment-style abuse replay: missing payment, insufficient amount, cross-network tricks
- headers and CORS misconfiguration
- obvious injection-shaped error signatures

**Authorization is mandatory.** We only scan what you can prove you own: before any scan, you must hold a verified certificate from `domain-ownership-proof` for the target's domain. The two services reinforce each other — proving your domain once unlocks the fuzz-brief.

**Non-negotiable guardrails (built into the service).**

- **Authorization required** — no valid domain-ownership certificate, no scan, no exceptions
- **Light, rate-limited scan** — a bounded probe set, never a load test, never destructive payloads
- **Anti-SSRF** — `localhost`, private, and link-local ranges are refused outright, on our side, before any request leaves

**How to use.**

```
POST https://api.xynaptic.io/v1/security-sim
   body: { "target": "https://api.example.com/v1/endpoint", "ownership_proof": "<certificate id from domain-ownership-proof>" }
-> 402 Payment Required (price: $1.00 in micro-USDC: 1000000)
-> sign & retry with PAYMENT-SIGNATURE header (or Authorization: Bearer *** for subscriber plans)
-> 200 JSON:
{
  "service": "security-sim",
  "target": "https://api.example.com/v1/endpoint",
  "probes_sent": 87,
  "verdict": "NEEDS-REVIEW",
  "findings": [
    { "probe": "malformed-json-body", "response": 500,
      "finding": "Stack trace leaked in error body",
      "cvss": 5.3, "severity": "MEDIUM",
      "next": "return generic errors; log details server-side only" }
  ],
  "disclaimer": "Light authorized scan — light probe set, not a full penetration test."
}
```

Weekly re-scans for continuous coverage: **$5/month** subscription (`Authorization: Bearer ***`), one fuzz-brief per week on your registered target.

**Error cases.**

- `400` — `target` missing / invalid URL / private or localhost target refused (anti-SSRF)
- `403` — no valid domain-ownership certificate for the target domain
- `402` — no payment / payment rejected (challenge re-served)
- GET returns the 402 terms (price schema visible for probes and agents)

**Try it without paying.**

```
GET https://api.xynaptic.io/v1/security-sim
-> 402 with accepts[] (Base / Solana / Polygon, USDC)
```