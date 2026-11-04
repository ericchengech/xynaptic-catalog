# Domain Ownership Proof — Xynaptic service reference

> **STATUS: UPCOMING — NOT YET LIVE.** Endpoint and pricing below are the committed specification; the service is under construction and not yet accepting payments.

> Verification oracle for domain ownership claims. No API key. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Live on the catalog: https://xynaptic.io — price **$0.25** per verified challenge or **$2/month** unlimited (agencies).

**What it does.**

Directories, marketplaces and agent platforms keep asking you to prove that a domain is really yours. Instead of each of them inventing their own check, Xynaptic acts as a neutral **oracle**: the claimant publishes a one-time token under the `.well-known/` path of the domain they claim, we crawl the real domain and certify what we actually saw.

1. You request a challenge: we issue a unique token.
2. You (or your deploy pipeline) publish the token at `https://<your-domain>/.well-known/xynaptic-challenge.txt`.
3. We fetch that URL **from the claimed domain itself** and verify the token matches.
4. You get a signed certificate: "token present and verified on <date>" — machine-readable proof any directory or counterparty can re-check.

**Design boundary — oracle, not hosting.** We deliberately do **not** host the challenge file for you: hosting it on our infrastructure would let anyone "prove" ownership of a third-party domain. The token must live on the claimant's real domain; we only observe and certify. Pair it with wallet-screen for a full subject + domain check.

**How to use.**

```
POST https://api.xynaptic.io/v1/domain-ownership-proof
   body: { "domain": "example.com" }              // step 1: get challenge
-> 402 Payment Required (price: $0.25 in micro-USDC: 250000)
-> sign & retry with PAYMENT-SIGNATURE header (or Authorization: Bearer *** for subscriber plans)
-> 200 JSON: { "service": "domain-ownership-proof", "challenge_token": "...", "path": "/.well-known/xynaptic-challenge.txt", "status": "pending" }

POST https://api.xynaptic.io/v1/domain-ownership-proof
   body: { "domain": "example.com", "verify": true }   // step 2: verify
-> 402 Payment Required (price: $0.25)
-> 200 JSON:
{
  "service": "domain-ownership-proof",
  "domain": "example.com",
  "status": "verified",
  "verified_at": "2026-11-04T14:00:00Z",
  "certificate": "token present and verified at /.well-known/xynaptic-challenge.txt"
}
```

Unlimited monthly verification for agencies: **$2/month** subscription (`Authorization: Bearer ***`).

**Error cases.**

- `400` — `domain` missing / invalid domain / malformed token
- `404`-style verify failure returned as `200` with `"status": "failed"` (token absent or mismatched — the crawl itself is the paid answer)
- `402` — no payment / payment rejected (challenge re-served)
- GET returns the 402 terms (price schema visible for probes and agents)

**Try it without paying.**

```
GET https://api.xynaptic.io/v1/domain-ownership-proof
-> 402 with accepts[] (Base / Solana / Polygon, USDC)
```