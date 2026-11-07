# repo-security-audit-large

**Audit the security of a large codebase before an agent depends on it.**

Same scan as `repo-security-audit`, sized for monorepos and multi-package repositories:
deeper file coverage, a larger analysis budget, and a full CVSS-ranked report.

- **Route**: `POST /v1/repo-security-audit` (there is no separate `/v1/repo-security-audit-large` endpoint)
- **Price**: $0.50 per call for repos with **20 reviewable files or fewer**;
  the tier is re-served as a **second 402 at $2.00** when the repo is larger
  (the challenge carries a `size_tier` note explaining why the price changed).
  200 units on a monthly plan.
- **Body**: `{ "github_url": "https://github.com/<owner>/<name>" }` — public GitHub repository.
  `repo` or `url` are also accepted as aliases.
- **Returns**: findings `[{ id, severity, cvss, file, line, why, fix }]`, a ranked summary,
  an overall grade, and the list of files that were effectively reviewed.
- **Included in**: the Audit & Security pack ($19/mo, 9 audit endpoints).

Use `repo-security-audit` ($0.50) for repositories under ~20 reviewable files;
use this tier when the tree is bigger, when several packages ship together, or when
the report has to be defensible (CVSS scores, per-file evidence).

> **Note (2026-11-07)** — this page used to document a dedicated
> `POST /v1/repo-security-audit-large` route. That route never existed in the worker:
> the large tier is a price escalation on the same endpoint. An alias now accepts
> `/v1/repo-security-audit-large` for backwards compatibility, and the machine-readable
> catalog publishes `/v1/repo-security-audit` with a `price_note`.
