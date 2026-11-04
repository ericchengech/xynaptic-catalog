# Wallet Poisoning Watch — Xynaptic service reference

> **STATUS: UPCOMING — NOT YET LIVE.** Endpoint and pricing below are the committed specification; the service is under construction and not yet accepting payments.

> Continuous monitoring of a payment wallet against address-poisoning attacks. Subscription **$5/month per wallet** (USDC via [x402](https://x402.org) on Base, Solana or Polygon). Live on the catalog: https://xynaptic.io

**What it does.**

Address poisoning: an attacker generates lookalike addresses (same prefix and suffix as your real `payTo` wallet) and dusts your transaction history, hoping a future copy-paste from a wallet UI picks the decoy. If a payment lands on the decoy, funds are gone.

Wallet Poisoning Watch watches your declared `payTo` wallet around the clock:

- detects lookalike/impersonator addresses transacting near yours (prefix/suffix match heuristics)
- flags dusting and transfer patterns typical of poisoning campaigns
- alerts you when a payment you expected may have been routed to a decoy address
- delivers a monitoring report you can share with counterparties as a trust signal

**How it works.**

Register the wallet you accept payments on. We watch on-chain activity (Base, Polygon, Solana) involving lookalikes of that address and report anything suspicious. Monitoring is continuous; alerts and a status endpoint are part of the subscription.

**How to use.**

```
POST https://api.xynaptic.io/v1/wallet-poisoning-watch
   body: { "wallet": "0x<your payTo address>", "network": "base" }
-> 402 Payment Required (subscription: $5.00/month in micro-USDC: 5000000)
-> sign & retry with PAYMENT-SIGNATURE header (or Authorization: Bearer *** for subscriber plans)
-> 200 JSON:
{
  "service": "wallet-poisoning-watch",
  "wallet": "0x...",
  "network": "base",
  "status": "watching",
  "subscription": { "plan": "monthly", "renews_at": "2026-12-04" },
  "lookalikes_detected": 0
}

GET https://api.xynaptic.io/v1/wallet-poisoning-watch?wallet=0x...      // status check (Bearer)
-> 200 JSON: { "status": "watching", "lookalikes_detected": 2, "alerts": [...] }
```

**Error cases.**

- `400` — `wallet` missing / invalid address / unsupported network
- `402` — no active subscription (challenge re-served)
- GET returns the 402 terms (price schema visible for probes and agents)

**Try it without paying.**

```
GET https://api.xynaptic.io/v1/wallet-poisoning-watch
-> 402 with accepts[] (Base / Solana / Polygon, USDC)
```