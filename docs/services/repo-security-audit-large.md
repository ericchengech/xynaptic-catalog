# repo-security-audit-large

**Audit the security of a large codebase before an agent depends on it.**

Same scan as `repo-security-audit`, sized for monorepos and multi-package repositories:
deeper file coverage, a larger analysis budget, and a full CVSS-ranked report.

- **Route**: `POST /v1/repo-security-audit-large`
- **Price**: $2.00 per call (200 units on a monthly plan)
- **Body**: `{ "repo": "owner/name", "ref": "main" }` — public GitHub repository
- **Returns**: findings `[{ id, severity, cvss, file, line, why, fix }]`, a ranked summary,
  an overall grade, and the list of files that were effectively reviewed.
- **Included in**: the Audit & Security pack ($19/mo, 9 audit endpoints).

Use `repo-security-audit` ($0.50) for repositories under ~20 reviewable files;
use this tier when the tree is bigger, when several packages ship together, or when
the report has to be defensible (CVSS scores, per-file evidence).
