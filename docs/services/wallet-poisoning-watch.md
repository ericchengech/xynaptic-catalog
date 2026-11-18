# Wallet Watch — Xynaptic service reference

> Continuous monitoring of an EVM wallet against address-poisoning attacks. Subscription **$12/month per watched wallet** (USDC via [x402](https://x402.org) on Base or Polygon). Live on the catalog: https://xynaptic.io

**What it does.**

Address poisoning: an attacker generates look-alike addresses (same prefix/suffix, or homoglyph tricks like `0`→`o`, `l`→`1`) and dusts your transaction history, hoping a future copy-paste picks the decoy.

Wallet Watch scans recent on-chain activity around your wallet and flags look-alike counterparties:

- **Multi-wallet references (E1)**: declare up to 5 extra client wallets via `refs` — look-alikes of *any* of them are flagged, with `matched_reference` telling you which wallet was being imitated. A watch on your merchant wallet can therefore catch an attacker imitating your QA wallet.
- **Fake-token campaigns (E2)**: look-alike transfers in *unofficial* tokens (counterfeit "USDC", homoglyph token names) are reported as `suspects_info[]` — informational, not balance alerts, since a fake token cannot drain anything.
- **Webhook alert** (optional, https-only) fired when `suspects` is non-empty.

**How to use.**

```
POST https://api.xynaptic.io/v1/wallet-watch/register
   body: { "wallet": "0x...", "network": "base",
           "webhook_url": "https://yourapp/hook",   // optional
           "refs": ["0xQA-wallet", "0xother"] }     // optional, max 5
-> 402 Payment Required ($12.00/month in micro-USDC: 12000000)
-> sign & retry with PAYMENT-SIGNATURE header (or Authorization: Bearer *** for subscriber plans)
-> 200: { service, action: "register", wallet, network, watch_id, refs, next_step }

POST https://api.xynaptic.io/v1/wallet-watch/status
   body: { "wallet": "0x...", "network": "base", "refs": ["0x..."] }   // refs optional override
-> 200 JSON (free for registered wallets; the payment is the register):
{
  "txs_checked": 24,
  "source": "blockscout",
  "blocks_scanned": 90000,
  "suspects": [ { "counterparty": "0x...", "tx_hash": "0x...", "reason": "near_identical",
                  "distance": 1, "matched_reference": "0x...", "homoglyph_folded": true } ],
  "suspects_info": [ { "hash": "0x...", "from": "0x...", "token": "0x...",
                       "token_symbol": "USDC", "matched_reference": "0x..." } ],
  "refs_watched": ["0xwatched", "0xref1"],
  "last_checked": "2026-11-18T11:44:29Z",
  "webhook_notified": false
}
```

**Real response (live 2026-11-18, merchant wallet watched with its QA wallet as ref — caught the 2026-11-16 poisoning twin):**

```json
{
  "txs_checked": 35, "source": "blockscout", "blocks_scanned": 90000,
  "suspects": [{
    "counterparty": "0x8e812CDC6c95C3ee5d822CA8A63fe6bc7dcC9A3",
    "tx_hash": "0x998520504645e0cd099c7ab9f47a6a400c7498c537c604de9bd1d559d9d8acb0",
    "matched_reference": "0x8e813831d30c47aca0e12e92c35fe341eed0c9a3",
    "reason": "shared_affixes", "distance": 27,
    "shared_prefix": 4, "shared_suffix": 4,
    "homoglyph_only": false, "homoglyph_folded": false
  }],
  "suspects_info": [],
  "refs_watched": ["0x4ff893df9ab8603d5460fbbaee0d9b8c0fa4d5e9", "0x8e813831d30c47aca0e12e92c35fe341eed0c9a3"],
  "last_checked": "2026-11-18T12:09:56Z", "webhook_notified": false,
  "disclaimer": "heuristic look-alike detection on recent USDC transfers of the watched wallet + up to 5 reference wallets; unofficial-token look-alike transfers reported as suspects_info (informational) — always verify addresses character by character before signing."
}
```
The imitated wallet here is the *reference* (QA), not the watched one — exactly the cross-wallet case E1 covers.

**Detection heuristic.** Homoglyph folding (`o→0`, `i/l→1`) then Levenshtein distance ≤ 3 (`near_identical`) or shared prefix+suffix ≥ 4 (`shared_affixes`). Always verify addresses character by character before signing.

**Error cases.**

- `400` — `wallet` missing/invalid, unsupported network, `refs` > 5 or invalid entries, webhook not https or pointing at localhost/private IPs (anti-SSRF)
- `402` — no payment on register (challenge re-served)
- `404` on status — wallet not registered on that network
- `409` on register — wallet already registered (no double billing)

**Try it without paying.**

```
GET https://api.xynaptic.io/v1/wallet-watch
-> 402 with accepts[] (Base / Polygon, USDC) and two-step usage
```

*Update 2026-11-18: refs[] multi-wallet detection (E1) and fake-token suspects_info (E2) shipped; `wallet-poisoning-watch` legacy name kept for this doc slug.*
