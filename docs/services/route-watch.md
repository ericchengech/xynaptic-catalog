# route-watch / route-watch-register / route-watch-history

**Know whether a third-party API is up — before your agent depends on it.**

- `GET /v1/route-watch?url=https://api.example.com/health&checks=1..3&timeout_ms=1000..10000` — $0.02
  One-shot probe: status code, verdict (`up` / `degraded` / `down`), median latency, TLS and redirect facts.
  HTTPS only, public hosts only, no redirect following, nothing stored.
- `POST /v1/route-watch-register` `{ "url": "https://..." }` — $0.50
  Registers a target for 30 days and **takes the first observation immediately**.
  Returns `target_id` (`rw_…`), an expiry date, and a 2-hour probe interval.
- `GET /v1/route-watch-history?target_id=rw_…&limit=20` — $0.01
  Availability history: probe count, uptime %, last status, p50 latency and the last N observations.
  If the newest observation is older than 2 hours, the call **probes the target again** and appends
  it to the history before answering (no cron dependency).

> **Note (2026-11-07)** — the history used to be read-only: no job ever probed registered targets,
> so it always answered "no observations yet". Registration now performs the first probe and the
> history route refreshes stale targets on demand.
