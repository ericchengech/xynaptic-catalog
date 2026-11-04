# Repo Security Audit — Xynaptic service reference

> **STATUS: UPCOMING — NOT YET LIVE.** Endpoint and pricing below are the committed specification; the service is under construction and not yet accepting payments.

> Static security review of a public GitHub repository. No API key. No subscription needed. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Live on the catalog: https://xynaptic.io — price **$0.50** per repo (≤ 20 files) / **$2.00** (larger repos).

**What it does.**

You are about to integrate, fork or list a third-party repository — but nobody has actually read the whole tree. Give us the GitHub URL of a **public** repo; we pull the tree, review every relevant file, and return an audit report with per-finding **CVSS scores**:

- hardcoded secrets, API keys, tokens, connection strings
- injection risks, unsafe deserialization, command execution paths
- broken authentication/authorization logic
- mutable dependency references (ranges, `@latest`, unpinned Docker images)
- suspicious network calls, obfuscated payloads, backdoor patterns
- misconfigured CI/CD workflows and secrets exposure in pipelines

Pricing tiers by repository size: **$0.50** for repos with **20 files or fewer**, **$2.00** for anything larger.

**Boundaries (always included in the response).**

Static review only — **no code is executed, no dependency is installed, no network call from the repo is replayed**. Findings are review signals with CVSS severity, not breach claims. A clean report is not a complete security assessment.

**How to use.**

```
POST https://api.xynaptic.io/v1/repo-security-audit
   body: { "repo": "https://github.com/<owner>/<name>" }
-> 402 Payment Required (price: $0.50 in micro-USDC: 500000 if <=20 files, else 2000000)
-> sign & retry with PAYMENT-SIGNATURE header (or Authorization: Bearer *** for subscriber plans)
-> 200 JSON:
{
  "service": "repo-security-audit",
  "repo": "https://github.com/<owner>/<name>",
  "files_reviewed": 14,
  "verdict": "NEEDS-REVIEW",
  "findings": [
    { "file": "src/auth.ts", "line": 42,
      "finding": "Hardcoded API key",
      "cvss": 7.5, "severity": "HIGH",
      "why": "secret committed in source control",
      "next": "rotate the key and move it to environment variables" }
  ],
  "disclaimer": "Static review only — no code executed, no dependency installed."
}
```

Also included in subscriber plans (`Authorization: Bearer ***` header): price tier charged in plan units.

**Error cases.**

- `400` — `repo` missing / not a GitHub URL / repository not public or not found
- `402` — no payment / payment rejected (challenge re-served)
- GET returns the 402 terms (price schema visible for probes and agents)

**Try it without paying.**

```
GET https://api.xynaptic.io/v1/repo-security-audit
-> 402 with accepts[] (Base / Solana / Polygon, USDC)
```