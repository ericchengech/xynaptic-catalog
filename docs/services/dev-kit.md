# Dev Kit — Xynaptic service reference

> 6 LLM-powered developer tools. No API key. No subscription. Pay in USDC via [x402](https://x402.org) on Base, Solana or Polygon. Live on the catalog: https://xynaptic.io

**How x402 works**

`POST` any endpoint → `402 Payment Required` → sign EIP-3009 (or any x402 client / Solana / Polygon) → retry with `PAYMENT-SIGNATURE` header → `200` JSON, agent-ready.

All six tools run on Xynaptic's LLM layer (glm-5.3-flash / deepseek routing, JSON-strict output). Paste code or a stacktrace, get expert-grade analysis back.

---

## `code-review` — $0.05

`POST https://api.xynaptic.io/v1/code-review`

**What it does.**

LLM code review: severity-ranked findings, quality score, and optional fix suggestions.

**How to use.**

```
POST https://api.xynaptic.io/v1/code-review
   body: { "code": "<your code, 10-12000 chars>", "include_fix": true }
-> 402 Payment Required (price: $0.05)
-> sign & retry with PAYMENT-SIGNATURE header
-> 200 JSON: { findings: [...], quality_score, ... }
```

---

## `code-fix` — $0.05

`POST https://api.xynaptic.io/v1/code-fix`

**What it does.**

Buggy code in, corrected version out — with the bug explained line by line.

**How to use.**

```
POST https://api.xynaptic.io/v1/code-fix
   body: { "code": "<buggy code, min 10 chars>" }
-> 402 Payment Required (price: $0.05)
-> 200 JSON: { fixed_code, explanation: [...], ... }
```

---

## `code-refactor` — $0.05

`POST https://api.xynaptic.io/v1/code-refactor`

**What it does.**

Behavior-preserving refactor: cleaner structure, readability wins, recommended tests.

**How to use.**

```
POST https://api.xynaptic.io/v1/code-refactor
   body: { "code": "<code, min 10 chars>" }
-> 402 Payment Required (price: $0.05)
-> 200 JSON: { refactored_code, changes: [...], recommended_tests }
```

---

## `test-generate` — $0.05

`POST https://api.xynaptic.io/v1/test-generate`

**What it does.**

Generate functional test cases, code skeletons and security checks for any code snippet.

**How to use.**

```
POST https://api.xynaptic.io/v1/test-generate
   body: { "code": "<code, min 10 chars>" }
-> 402 Payment Required (price: $0.05)
-> 200 JSON: { test_cases: [...], skeletons: [...], security_checks: [...] }
```

---

## `error-explain` — $0.03

`POST https://api.xynaptic.io/v1/error-explain`

**What it does.**

Paste a stacktrace or error text, get the root cause explained with a concrete fix.

**How to use.**

```
POST https://api.xynaptic.io/v1/error-explain
   body: { "error": "<stacktrace or error text, min 10 chars>" }
-> 402 Payment Required (price: $0.03)
-> 200 JSON: { root_cause, explanation, fix: [...] }
```

---

## `security-review` — $0.05

`POST https://api.xynaptic.io/v1/security-review`

**What it does.**

Security audit of code or config: vulnerabilities, secrets exposure, injection risks, hardening advice.

**How to use.**

```
POST https://api.xynaptic.io/v1/security-review
   body: { "content": "<code or config, min 10 chars>" }
-> 402 Payment Required (price: $0.05)
-> 200 JSON: { vulnerabilities: [...], secrets_exposure, injection_risks, hardening: [...] }
```

---

All six tools are also exposed through the MCP server (mcp.xynaptic.io/mcp) and QA-settled on Base, Solana and Polygon.