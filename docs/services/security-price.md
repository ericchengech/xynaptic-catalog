# security-price

**Spot market data for US stocks: price, previous close, day range, 52-week range, currency, exchange + up to 30d history (OHLCV). Refreshed intraday.**

- **Route**: `GET https://api.xynaptic.io/v1/security-price?ticker=AAPL&history=30`
- **Price**: $0.01 per call
- **Required parameter**: `ticker` (US ticker, e.g. `AAPL`) — without it: `400 {"error":"param required: ?ticker="}`
- **Optional parameter**: `history` (up to 30 days of OHLCV)

```bash
curl -s "https://api.xynaptic.io/v1/security-price?ticker=AAPL"
# -> 402 Payment Required (x402 v2 challenge, price: $0.01)
# -> sign & retry with PAYMENT-SIGNATURE header -> 200
```

**Response shape** (from catalog example):

```json
{
  "service": "security-price",
  "ticker": "AAPL",
  "price": 341.07,
  "previous_close": 336.13,
  "week52_high": 345.34,
  "week52_low": 169.21,
  "summary": "AAPL at $341.07, near 52w high."
}
```

**Limits**: US stocks only. Spot data + up to 30 days history — not a fundamentals product (see `security-fundamentals`, `security-analysis`).

*Verified 2026-11-09: with `ticker=AAPL` → 402 + challenge; without param → 400 `param required: ?ticker=` with `accepted_params: ["ticker"]`, no payment taken. Price as per live catalog.*
