# crypto-validate

**Full pre-purchase security audit of an ERC-20 token.**

- **Route**: `GET /v1/crypto-validate?address=0x…&chain=1|56|137|8453|42161|10|43114`
- **Price**: $0.10 per call
- **Returns**: contract facts (open source, proxy), honeypot detection,
  buy/sell taxes, liquidity depth and exit liquidity (DEX pairs), market conditions,
  news flags, a recommended maximum trade size and a composite risk verdict.

## Providers

Primary source: `honeypot.is`. Since their API change (November 2026) the endpoint
`/v2/IsHoneypot` answers **404 for tokens it does not know**, which used to make the
service return a hard **503**.

Fixed on 2026-11-07: when the primary source has no data, the service falls back to
**GoPlus** (`api.gopluslabs.io/api/v1/token_security/<chain>`, free, no key) and maps it
onto the same response shape, with `token_security.provider` telling you which source
answered (`"honeypot.is"` or `"gopluslabs (repli …)"`).

If **both** sources fail, the call still returns **503 and is not charged**
(the service is executed before settlement).
