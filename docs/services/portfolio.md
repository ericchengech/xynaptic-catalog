# Portfolio — Xynaptic service reference

> 1 pay-per-request services. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Machine-readable catalog: https://api.xynaptic.io

**How x402 works:** `GET` any endpoint → `402 Payment Required` with the price → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

---

## `security-portfolio-analysis` — $0.05

`GET https://api.xynaptic.io/v1/security-portfolio-analysis`

**What it does.** Xynaptic Portfolio Analysis — bring your portfolio [{ticker, weight}]: we fetch prices and compute per-holding risk (volatility), concentration (HHI + top weights), sector exposure via EDGAR SIC, and aggregate risk with its caveats. POST body: { holdings: [{ticker, weight}], currency?: USD }. Informational only.

**How to use.**

```
GET https://api.xynaptic.io/v1/security-portfolio-analysis
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: facts, assessment, summary — agent-ready
```
