// ============================================================
// repo-audit-core.js — Xynaptic repo-security-audit CORE engine
// Trust & Security family — pure functions, ZERO LLM, node-testable.
// Spec: docs/services/repo-security-audit.md + TRUST-SECURITY-DECISIONS.md
// Pricing tier: <=20 reviewable files = SMALL ($0.50), else LARGE ($2.00)
// Reviewable = code + configs + docs. Excluded: binaries, images,
// lockfiles, vendored dirs, minified bundles, generated dirs.
// ============================================================
"use strict";

// ---------- 1. GitHub URL parsing ----------
// Accepts: https://github.com/owner/repo, .../tree/branch, git@..., trailing .git
function parseGitHubUrl(input) {
  if (!input || typeof input !== "string") return null;
  const s = input.trim();
  const m = s.match(/(?:github\.com[/:])([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+?)(?:\.git)?(?:\/(?:tree|blob)\/([^/?#]+)[^?#]*)?(?:[?#].*)?$/i);
  if (!m) return null;
  return { owner: m[1], repo: m[2], branch: m[3] || null, canonical: "https://github.com/" + m[1] + "/" + m[2] };
}

// ---------- 2. Reviewable-file classification ----------
const BIN_EXT = /\.(png|jpe?g|gif|svg|ico|webp|bmp|pdf|zip|gz|tar|tgz|bz2|7z|rar|jar|war|class|pyc|o|so|dylib|dll|exe|bin|woff2?|ttf|eot|mp3|mp4|mov|avi|wav|wasm|db|sqlite3?|DS_Store|bak|swp)$/i;
const LOCK_FILES = /(^|\/)(package-lock\.json|yarn\.lock|pnpm-lock\.yaml|Gemfile\.lock|poetry\.lock|Pipfile\.lock|composer\.lock|Cargo\.lock|go\.sum|flake\.lock|packages\.lock\.json|podfile\.lock)$/i;
const VENDORED = /(^|\/)(node_modules|vendor|venv|\.venv|third_party|thirdparty|dist|build|out|target|\.next|\.nuxt|coverage|__pycache__|\.git|\.idea|\.vscode|site-packages|bower_components|deps|_site)(\/|$)/i;
const MINIFIED = /\.min\.(js|css)$/i;

function isReviewable(path) {
  const p = String(path || "");
  if (!p || p.length > 300) return false;
  if (BIN_EXT.test(p) || LOCK_FILES.test(p) || VENDORED.test(p) || MINIFIED.test(p)) return false;
  return true;
}

// Fetch priority: CI/CD pipelines first, then code, then configs, then docs.
function filePriority(path) {
  const p = String(path || "");
  if (/(^|\/)\.github\/workflows\/|^Dockerfile|^docker-compose|^Jenkinsfile|(^|\/)\.gitlab-ci/.test(p)) return 0;
  if (/\.(js|jsx|ts|tsx|mjs|cjs|py|rb|go|rs|java|kt|php|cs|c|h|cpp|hpp|swift|sh|bash|ps1|lua|pl|r|scala)$/i.test(p)) return 1;
  if (/(^|\/)(package\.json|requirements[^.]*\.txt|pyproject\.toml|setup\.py|Pipfile|Gemfile|go\.mod|cargo\.toml|composer\.json|pom\.xml|build\.gradle|[Mm]akefile|CMakeLists\.txt|\.env[^.]*|[^\/]*\.ya?ml|[^\/]*\.toml|[^\/]*\.ini|[^\/]*\.conf|config\.[a-z]+)$/i.test(p)) return 2;
  if (/\.(md|mdx|rst|txt|adoc)$/i.test(p)) return 3;
  return 4; // license, dotfiles, unknown textual
}

// ---------- 3. Static detection rules (regex checklist, no LLM) ----------
// severity bands: CRITICAL >= 9, MAJOR >= 7, MINOR < 7 (CVSS-like)
const RULES = [
  { id: "secret-aws-key",        sev: "CRITICAL", cvss: 9.1, re: /AKIA[0-9A-Z]{16}/, why: "hardcoded AWS access key ID committed in source", next: "rotate the key in AWS IAM and move it to environment variables / secrets manager" },
  { id: "secret-private-key",    sev: "CRITICAL", cvss: 9.4, re: /-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY-----/, why: "private key material committed in source", next: "revoke the key everywhere it is trusted and rotate; never commit key files" },
  { id: "secret-openai",         sev: "CRITICAL", cvss: 9.0, re: /sk-[A-Za-z0-9_-]{20,}/, why: "hardcoded sk- token (OpenAI-style) in source", next: "rotate the token at the provider and load it from environment variables" },
  { id: "secret-github-pat",     sev: "CRITICAL", cvss: 9.2, re: /github_pat_[A-Za-z0-9_]{20,}|ghp_[A-Za-z0-9]{30,}/, why: "hardcoded GitHub personal access token", next: "revoke the PAT in GitHub settings and use a runtime secret instead" },
  { id: "secret-gitlab-slack",   sev: "CRITICAL", cvss: 9.0, re: /glpat-[A-Za-z0-9_-]{20,}|xox[baprs]-[A-Za-z0-9-]{10,}/, why: "hardcoded GitLab/Slack token in source", next: "revoke the token and inject it via environment at runtime" },
  { id: "secret-conn-string",    sev: "CRITICAL", cvss: 8.8, re: /(?:mongodb(?:\+srv)?|postgres(?:ql)?|mysql|redis|amqp):\/\/[^\s]*:[^\s@]{4,}@[^\s]*/, why: "database/connection string with embedded credentials", next: "rotate the credentials and read the URL from the environment" },
  { id: "secret-generic-assign", sev: "CRITICAL", cvss: 8.6, re: /\b(?:api_?key|apikey|secret|passwd|password|auth_?token|access_?token)\b\s*[=:]\s*["'][^"'\s]{8,}["']/i, skip: /(process\.env|os\.environ|getenv|example|placeholder|changeme|\bx{3,}\b|\$\{|%\s|\{\{|<[^>]+>|your[-_])/i, why: "credential-like assignment with a literal value", next: "move the value to environment variables or a secrets manager" },

  { id: "rce-eval",              sev: "MAJOR", cvss: 8.1, re: /(^|[^.\w])eval\s*\(/, skip: /safe-?eval|node:eval/i, why: "eval() executes arbitrary strings as code", next: "remove eval; parse data (JSON.parse) or use explicit logic" },
  { id: "rce-exec",              sev: "MAJOR", cvss: 8.8, re: /child_process|\bexecSync\b|\bspawnSync?\b|\.system\s*\(|subprocess\.|\bexec\s*\(|os\.popen|Runtime\.getRuntime/, skip: /executor|execution|execpath|executed|execute/i, why: "command-execution API reachable from repo code", next: "avoid shell string building; use argument-array APIs and validate all inputs" },
  { id: "deser-pickle",          sev: "MAJOR", cvss: 8.5, re: /pickle\.loads?\(|yaml\.load\((?![^)]*Loader\s*=)|marshal\.loads?\(|unserialize\s*\(/, why: "unsafe deserialization can yield remote code execution on crafted input", next: "use json, or pickle only over trusted data; yaml.safe_load or Loader=SafeLoader" },
  { id: "injection-query-concat",sev: "MAJOR", cvss: 8.3, re: /\.(?:query|execute|executemany|raw)\s*\(\s*(?:f["']|[^)]*["']\s*\+)/, why: "SQL built by string concatenation/interpolation - injection risk", next: "use parameterized queries or an ORM" },
  { id: "xss-innerhtml",         sev: "MAJOR", cvss: 6.8, re: /\.innerHTML\s*=|dangerouslySetInnerHTML|document\.write\s*\(/, why: "raw HTML injection sink (XSS risk)", next: "assign via textContent or sanitize with DOMPurify" },

  { id: "net-http-plain",        sev: "MINOR", cvss: 3.7, re: /http:\/\/(?!localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\]|schemas?\.|www\.w3\.org|example\.com|json-schema\.org)[a-z0-9.-]+/i, why: "plain-HTTP network call - traffic can be intercepted or tampered", next: "use https://" },
  { id: "log-secret",            sev: "MINOR", cvss: 4.3, re: /(?:console\.log|print\s*\(|logger?\.\w+\s*\()\s*[^)]*\b(?:password|passwd|secret|token|api_?key|apikey|credential)\w*\b/i, why: "credential variable written to logs", next: "never log secrets; redact or remove the statement" },
  { id: "ci-pull-request-target",sev: "MAJOR", cvss: 7.5, re: /pull_request_target/, path: /\.github\/workflows\//, why: "pull_request_target runs fork code with base secrets - classic exfiltration vector", next: "avoid pull_request_target; if unavoidable never checkout refs/pr head with secrets" },
];

// ---------- 4. Per-file scanner ----------
const MAX_FILE_CHARS = 12000; // spec: each file truncated to 12k chars

function lineOfIndex(text, idx) {
  let line = 1;
  for (let i = 0; i < idx && i < text.length; i++) if (text.charCodeAt(i) === 10) line++;
  return line;
}

function finding(rule, path, line, truncated) {
  return {
    file: path, line: line || 1,
    finding: rule.id, severity: rule.sev, cvss: rule.cvss,
    why: rule.why, next: rule.next,
    ...(truncated ? { note: "file truncated at 12000 chars" } : {}),
  };
}

// Scan one file. meta = { path, content } -> array of findings (max 12/file, 2/rule)
function scanFile(meta) {
  const path = String(meta.path || "");
  const raw = String(meta.content || "");
  const content = raw.slice(0, MAX_FILE_CHARS);
  const truncated = raw.length > MAX_FILE_CHARS;
  const out = [];
  for (const rule of RULES) {
    if (rule.path && !rule.path.test(path)) continue;
    let hits = 0;
    const re = new RegExp(rule.re.source, "g" + (rule.re.flags.includes("i") ? "i" : ""));
    let m;
    while ((m = re.exec(content)) !== null && hits < 2) {
      const ctx = content.slice(Math.max(0, m.index - 80), m.index + m[0].length + 80);
      if (rule.skip && rule.skip.test(ctx)) { if (re.lastIndex === m.index) re.lastIndex++; continue; }
      out.push(finding(rule, path, lineOfIndex(content, m.index), truncated));
      hits++;
      if (m[0].length === 0) re.lastIndex++;
    }
    if (out.length >= 12) break;
  }
  return out.slice(0, 12);
}

// ---------- 5. Repo scoring (pure) ----------
// files = [{ path, content }] already filtered reviewable & capped at 30
function scoreRepo(files, repoUrl) {
  const findings = [];
  let bytesScanned = 0;
  for (const f of files || []) {
    if (!f || typeof f.content !== "string") continue;
    bytesScanned += Math.min(f.content.length, MAX_FILE_CHARS);
    findings.push(...scanFile(f));
  }
  const counts = { CRITICAL: 0, MAJOR: 0, MINOR: 0 };
  for (const x of findings) counts[x.severity] = (counts[x.severity] || 0) + 1;
  const verdict = counts.CRITICAL > 0 ? "FINDINGS-CRITICAL"
    : counts.MAJOR > 0 ? "FINDINGS"
    : counts.MINOR > 0 ? "FINDINGS-MINOR"
    : "CLEAN";
  const maxCvss = findings.reduce((a, x) => Math.max(a, x.cvss), 0);
  return {
    service: "repo-security-audit",
    repo: repoUrl || null,
    files_reviewed: (files || []).length,
    bytes_scanned: bytesScanned,
    findings, counts, verdict, max_cvss: maxCvss,
    disclaimer: "static pattern scan - not a full audit",
  };
}

// ---------- 6. GitHub API helpers (workers + node >= 18) ----------
// Unauthenticated GitHub API = 60 req/h, enough for tests; GH_TOKEN optional.
function ghHeaders(token) {
  const h = { "User-Agent": "xynaptic-repo-audit", Accept: "application/vnd.github+json" };
  if (token) h.Authorization = "Bearer " + token;
  return h;
}

// Fetch recursive tree. branch optional (default HEAD = default branch).
async function fetchTree(owner, repo, branch, token) {
  const u = "https://api.github.com/repos/" + owner + "/" + repo + "/git/trees/" + encodeURIComponent(branch || "HEAD") + "?recursive=1";
  const r = await fetch(u, { headers: ghHeaders(token), signal: AbortSignal.timeout(15000) });
  if (!r.ok) return { error: r.status === 404 ? "repo not found or not public" : "github api error " + r.status };
  const d = await r.json();
  return { tree: d.tree || [], truncated: !!d.truncated };
}

function countReviewable(tree) {
  return (tree || []).filter(function (t) { return t && t.type === "blob" && isReviewable(t.path); }).length;
}

// Select up to maxFiles reviewable files, CI/code first.
function selectFiles(tree, maxFiles) {
  return (tree || [])
    .filter(function (t) { return t && t.type === "blob" && isReviewable(t.path); })
    .map(function (t) { return { path: t.path, pr: filePriority(t.path) }; })
    .sort(function (a, b) { return a.pr - b.pr || (a.path < b.path ? -1 : 1); })
    .slice(0, maxFiles || 30)
    .map(function (x) { return x.path; });
}

async function fetchFileContent(owner, repo, branch, path, token) {
  const u = "https://raw.githubusercontent.com/" + owner + "/" + repo + "/" + encodeURIComponent(branch || "HEAD") + "/" + path.split("/").map(encodeURIComponent).join("/");
  const r = await fetch(u, { headers: ghHeaders(token), signal: AbortSignal.timeout(15000) });
  if (!r.ok) return null;
  return await r.text();
}

// Full pipeline (network). maxFiles default 30 (spec).
async function auditGitHubRepo(githubUrl, opts) {
  const o = opts || {};
  const parsed = parseGitHubUrl(githubUrl);
  if (!parsed) return { error: 400, message: "invalid GitHub URL - expected https://github.com/<owner>/<name>" };
  const tr = await fetchTree(parsed.owner, parsed.repo, parsed.branch, o.token);
  if (tr.error) return { error: 404, message: tr.error };
  const reviewableCount = countReviewable(tr.tree);
  const tier = reviewableCount <= 20 ? "small" : "large";
  const paths = selectFiles(tr.tree, o.maxFiles || 30);
  const files = [];
  for (const p of paths) {
    const c = await fetchFileContent(parsed.owner, parsed.repo, parsed.branch, p, o.token);
    if (typeof c === "string") files.push({ path: p, content: c });
  }
  const res = scoreRepo(files, parsed.canonical);
  res.tier = tier;
  res.reviewable_files_in_repo = reviewableCount;
  res.tree_truncated = tr.truncated;
  return res;
}

// ---------- exports ----------
const RepoAuditCore = { parseGitHubUrl, isReviewable, filePriority, RULES, scanFile, scoreRepo, fetchTree, countReviewable, selectFiles, fetchFileContent, auditGitHubRepo, MAX_FILE_CHARS };
if (typeof module !== "undefined" && module.exports) module.exports = RepoAuditCore;
if (typeof globalThis !== "undefined") globalThis.RepoAuditCore = RepoAuditCore;
