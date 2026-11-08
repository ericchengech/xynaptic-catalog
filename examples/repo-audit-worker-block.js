// ============================================================================
// repo-audit-worker-block.js — Xynaptic /v1/repo-security-audit (Trust & Security)
// READY-TO-INSERT handler block + table entries. Pattern = MCP-AUDIT + bkPaiement.
// NO DEPLOY here — parent agent reviews/merges/tests/deploys.
// ============================================================================
//
// ─── PARTIE 1 : ENTRÉES DE TABLES (à insérer dans les 6 tables du worker) ───
//
// PRIX (ligne ~104, après "mcp-audit": 250000n) :
//   "repo-security-audit": 500000n,        // 0,50 USDC — Trust & Security : audit statique repo GitHub (<= 20 fichiers reviewables)
//   "repo-security-audit-large": 2000000n, // 2,00 USDC — tier > 20 fichiers reviewables (402 re-servi avec note size-tier)
//
// DESCRIPTIONS (ligne ~324, après l'entrée mcp-audit) :
//   "repo-security-audit": "Xynaptic Repo Security Audit — give us the URL of a public GitHub repo before you integrate, fork or list it: we pull the tree, review up to 30 relevant files (CI/CD first, then code, configs, docs; binaries/lockfiles/vendored excluded) and return a per-finding CVSS-like report — hardcoded secrets (AWS/OpenAI/GitHub/Slack keys, private keys, connection strings), eval/exec/child_process, unsafe deserialization (pickle/yaml.load), SQL built by concatenation, innerHTML/dangerouslySetInnerHTML sinks, plain-HTTP calls, secrets in logs, pull_request_target workflows. Tier pricing: $0.50 for repos with 20 reviewable files or fewer, $2.00 above (a new 402 is served with a size-tier note). Static pattern scan only — no code executed, no dependency installed. POST body: { github_url }. Boundaries: review signals, not breach claims.",
//   "repo-security-audit-large": "Xynaptic Repo Security Audit — large-repo tier (> 20 reviewable files): same static review, $2.00. Do not call directly; /v1/repo-security-audit re-serves this challenge when the repo exceeds the small tier.",
//
// EXAMPLES (ligne ~574, après l'entrée mcp-audit) :
//   "repo-security-audit": { service: "repo-security-audit", repo: "https://github.com/octocat/Spoon-Knife", files_reviewed: 3, bytes_scanned: 1391, verdict: "FINDINGS-MINOR", findings: [ { file: "README.md", line: 9, finding: "net-http-plain", severity: "MINOR", cvss: 3.7, why: "plain-HTTP network call - traffic can be intercepted or tampered", next: "use https://" } ], disclaimer: "static pattern scan - not a full audit" },
//
// TAGS_PAR_DOMAINE (ligne ~914, après l'entrée mcp-audit) :
//   "repo-security-audit": ["security", "github", "static-analysis", "secrets", "supply-chain"],
//   "repo-security-audit-large": ["security", "github", "static-analysis", "secrets", "supply-chain"],
//
// FICHE_DOC (ligne ~1120, après l'entrée mcp-audit) :
//   "repo-security-audit": "repo-security-audit.md",
//   "repo-security-audit-large": "repo-security-audit.md",
//
// QUERY_EXEMPLES (ligne ~1149, section) :
//   "repo-security-audit": { github_url: "https://github.com/owner/name" },
//
// ─── PARTIE 2 : BLOC ROUTE (à coller APRÈS la définition de bkPaiement, ~ligne 8541,
//     idéalement juste après le bloc ===== MCP-AUDIT ~ligne 9660) ───
//
//    // ===== REPO-SECURITY-AUDIT (Trust & Security - audit statique repo GitHub, $0.50/$2 dynamique, zero LLM) =====
    if (url.pathname === "/v1/repo-security-audit") {
      if (request.method !== "POST") {
        const svcGRA = url.pathname.replace(/^\/v1\//, "");
        const termsGRA = json402(svcGRA, url.href);
        const utfGRA = new TextEncoder().encode(JSON.stringify(termsGRA));
        let binGRA = "";
        for (const b of utfGRA) binGRA += String.fromCharCode(b);
        const b64GRA = btoa(binGRA);
        return new Response(JSON.stringify({ ...termsGRA, note: "POST body required: { github_url: 'https://github.com/<owner>/<name>' }. Tier pricing: 500000 micro-USDC ($0.50) if the repo has 20 reviewable files or fewer, 2000000 ($2.00) otherwise — a new 402 is served with a size_tier note when the repo is larger. Static pattern scan only - no code executed, no dependency installed." }), { status: 402, headers: { "Content-Type": "application/json", "PAYMENT-REQUIRED": b64GRA, "X-PAYMENT-CHALLENGE": b64GRA, "Access-Control-Expose-Headers": "PAYMENT-REQUIRED, X-PAYMENT-CHALLENGE, X-PAYMENT-RESPONSE" } });
      }
      let corpsRA = null;
      try { corpsRA = await request.json(); } catch (_) { corpsRA = {}; }
      const ghUrlRA = String(corpsRA.github_url || corpsRA.repo || corpsRA.url || "");
      const mRA = ghUrlRA.trim().match(/(?:github\.com[/:])([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+?)(?:\.git)?(?:\/(?:tree|blob)\/([^/?#]+)[^?#]*)?(?:[?#].*)?$/i);
      if (!mRA) {
        return new Response(JSON.stringify({ error: "field required: github_url (https://github.com/<owner>/<name>, public repo)" }), { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
      }
      const ownerRA = mRA[1], repoRA = mRA[2], branchRA = mRA[3] || null;
      // Flux spec : sans credential on sert d'abord le 402 small-tier SANS consommer le quota GitHub
      const sigRA = request.headers.get("PAYMENT-SIGNATURE") || request.headers.get("X-PAYMENT");
      const tktRA = request.headers.get("X-TICKET");
      const aboRA = (request.headers.get("Authorization") || "").startsWith("Bearer sub_");
      if (!sigRA && !tktRA && !aboRA) {
        const termsRA0 = json402("repo-security-audit", url.href);
        const utfRA0 = new TextEncoder().encode(JSON.stringify(termsRA0));
        let binRA0 = "";
        for (const b of utfRA0) binRA0 += String.fromCharCode(b);
        const b64RA0 = btoa(binRA0);
        return new Response(JSON.stringify({ ...termsRA0, note: "first 402 served at the small tier (500000 micro-USDC, $0.50). If the repo has more than 20 reviewable files, a new 402 at 2000000 ($2.00) will be served with a size_tier note — re-sign for that amount." }), { status: 402, headers: { "Content-Type": "application/json", "PAYMENT-REQUIRED": b64RA0, "X-PAYMENT-CHALLENGE": b64RA0, "Access-Control-Expose-Headers": "PAYMENT-REQUIRED, X-PAYMENT-CHALLENGE, X-PAYMENT-RESPONSE" } });
      }
      // Credential present -> on peut sonder le repo (1 req tree, API GitHub anonyme 60/h)
      const treeURA = "https://api.github.com/repos/" + ownerRA + "/" + repoRA + "/git/trees/" + encodeURIComponent(branchRA || "HEAD") + "?recursive=1";
      let treeRA = null;
      try {
        const rRA = await fetch(treeURA, { headers: { "User-Agent": "xynaptic-repo-audit", Accept: "application/vnd.github+json" }, signal: AbortSignal.timeout(15000) });
        if (rRA.status === 404) return new Response(JSON.stringify({ error: "repository not found or not public" }), { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
        if (!rRA.ok) return new Response(JSON.stringify({ error: "github api error " + rRA.status }), { status: 502, headers: { "Content-Type": "application/json" } });
        const dRA = await rRA.json();
        treeRA = dRA.tree || [];
      } catch (eRA) {
        return new Response(JSON.stringify({ error: "github api unreachable" }), { status: 502, headers: { "Content-Type": "application/json" } });
      }
      // Comptage reviewables (decision T&S #1 : code+configs+docs, hors binaires/lockfiles/vendored)
      const binExtRA = /\.(png|jpe?g|gif|svg|ico|webp|bmp|pdf|zip|gz|tar|tgz|bz2|7z|rar|jar|war|class|pyc|o|so|dylib|dll|exe|bin|woff2?|ttf|eot|mp3|mp4|mov|avi|wav|wasm|db|sqlite3?|DS_Store|bak|swp)$/i;
      const lockRA = /(^|\/)(package-lock\.json|yarn\.lock|pnpm-lock\.yaml|Gemfile\.lock|poetry\.lock|Pipfile\.lock|composer\.lock|Cargo\.lock|go\.sum|flake\.lock|packages\.lock\.json|podfile\.lock)$/i;
      const vendRA = /(^|\/)(node_modules|vendor|venv|\.venv|third_party|thirdparty|dist|build|out|target|\.next|\.nuxt|coverage|__pycache__|\.git|\.idea|\.vscode|site-packages|bower_components|deps|_site)(\/|$)/i;
      const miniRA = /\.min\.(js|css)$/i;
      const revRA = (p) => !!p && p.length <= 300 && !binExtRA.test(p) && !lockRA.test(p) && !vendRA.test(p) && !miniRA.test(p);
      const blobsRA = treeRA.filter((t) => t && t.type === "blob" && revRA(t.path));
      const nbRevRA = blobsRA.length;
      const tierRA = nbRevRA <= 20 ? "small" : "large";
      const svcRA = tierRA === "large" ? "repo-security-audit-large" : "repo-security-audit";
      const prioRA = (p) => /(^|\/)\.github\/workflows\/|^Dockerfile|^docker-compose|^Jenkinsfile|(^|\/)\.gitlab-ci/.test(p) ? 0 : /\.(js|jsx|ts|tsx|mjs|cjs|py|rb|go|rs|java|kt|php|cs|c|h|cpp|hpp|swift|sh|bash|ps1|lua|pl|r|scala)$/i.test(p) ? 1 : /(^|\/)(package\.json|requirements[^.]*\.txt|pyproject\.toml|setup\.py|Pipfile|Gemfile|go\.mod|cargo\.toml|composer\.json|pom\.xml|build\.gradle|[Mm]akefile|CMakeLists\.txt|\.env[^.]*|[^\/]*\.ya?ml|[^\/]*\.toml|[^\/]*\.ini|[^\/]*\.conf|config\.[a-z]+)$/i.test(p) ? 2 : /\.(md|mdx|rst|txt|adoc)$/i.test(p) ? 3 : 4;
      const selRA = blobsRA.map((t) => ({ path: t.path, pr: prioRA(t.path) })).sort((a, b) => a.pr - b.pr || (a.path < b.path ? -1 : 1)).slice(0, 30).map((x) => x.path);
      const repRA = await bkPaiement(env, request, url, svcRA, corpsRA, async () => {
        const filesRA = [];
        for (const pRA of selRA) {
          try {
            const uRA = "https://raw.githubusercontent.com/" + ownerRA + "/" + repoRA + "/" + encodeURIComponent(branchRA || "HEAD") + "/" + pRA.split("/").map(encodeURIComponent).join("/");
            const rFRA = await fetch(uRA, { headers: { "User-Agent": "xynaptic-repo-audit" }, signal: AbortSignal.timeout(15000) });
            if (rFRA.ok) filesRA.push({ path: pRA, content: await rFRA.text() });
          } catch (_) {}
        }
        // ---- moteur statique (identique a examples/repo-audit-core.js) ----
        const RULES_RA = [
          { id: "secret-aws-key", sev: "CRITICAL", cvss: 9.1, re: /AKIA[0-9A-Z]{16}/, why: "hardcoded AWS access key ID committed in source", next: "rotate the key in AWS IAM and move it to environment variables / secrets manager" },
          { id: "secret-private-key", sev: "CRITICAL", cvss: 9.4, re: /-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY-----/, why: "private key material committed in source", next: "revoke the key everywhere it is trusted and rotate; never commit key files" },
          { id: "secret-openai", sev: "CRITICAL", cvss: 9.0, re: /sk-[A-Za-z0-9_-]{20,}/, why: "hardcoded sk- token (OpenAI-style) in source", next: "rotate the token at the provider and load it from environment variables" },
          { id: "secret-github-pat", sev: "CRITICAL", cvss: 9.2, re: /github_pat_[A-Za-z0-9_]{20,}|ghp_[A-Za-z0-9]{30,}/, why: "hardcoded GitHub personal access token", next: "revoke the PAT in GitHub settings and use a runtime secret instead" },
          { id: "secret-gitlab-slack", sev: "CRITICAL", cvss: 9.0, re: /glpat-[A-Za-z0-9_-]{20,}|xox[baprs]-[A-Za-z0-9-]{10,}/, why: "hardcoded GitLab/Slack token in source", next: "revoke the token and inject it via environment at runtime" },
          { id: "secret-conn-string", sev: "CRITICAL", cvss: 8.8, re: /(?:mongodb(?:\+srv)?|postgres(?:ql)?|mysql|redis|amqp):\/\/[^\s]*:[^\s@]{4,}@[^\s]*/, why: "database/connection string with embedded credentials", next: "rotate the credentials and read the URL from the environment" },
          { id: "secret-generic-assign", sev: "CRITICAL", cvss: 8.6, re: /\b(?:api_?key|apikey|secret|passwd|password|auth_?token|access_?token)\b\s*[=:]\s*["'][^"'\s]{8,}["']/i, skip: /(process\.env|os\.environ|getenv|example|placeholder|changeme|\bx{3,}\b|\$\{|%\s|\{\{|<[^>]+>|your[-_])/i, why: "credential-like assignment with a literal value", next: "move the value to environment variables or a secrets manager" },
          { id: "rce-eval", sev: "MAJOR", cvss: 8.1, re: /(^|[^.\w])eval\s*\(/, skip: /safe-?eval|node:eval/i, why: "eval() executes arbitrary strings as code", next: "remove eval; parse data (JSON.parse) or use explicit logic" },
          { id: "rce-exec", sev: "MAJOR", cvss: 8.8, re: /child_process|\bexecSync\b|\bspawnSync?\b|\.system\s*\(|subprocess\.|\bexec\s*\(|os\.popen|Runtime\.getRuntime/, skip: /executor|execution|execpath|executed|execute/i, why: "command-execution API reachable from repo code", next: "avoid shell string building; use argument-array APIs and validate all inputs" },
          { id: "deser-pickle", sev: "MAJOR", cvss: 8.5, re: /pickle\.loads?\(|yaml\.load\((?![^)]*Loader\s*=)|marshal\.loads?\(|unserialize\s*\(/, why: "unsafe deserialization can yield remote code execution on crafted input", next: "use json, or pickle only over trusted data; yaml.safe_load or Loader=SafeLoader" },
          { id: "injection-query-concat", sev: "MAJOR", cvss: 8.3, re: /\.(?:query|execute|executemany|raw)\s*\(\s*(?:f["']|[^)]*["']\s*\+)/, why: "SQL built by string concatenation/interpolation - injection risk", next: "use parameterized queries or an ORM" },
          { id: "xss-innerhtml", sev: "MAJOR", cvss: 6.8, re: /\.innerHTML\s*=|dangerouslySetInnerHTML|document\.write\s*\(/, why: "raw HTML injection sink (XSS risk)", next: "assign via textContent or sanitize with DOMPurify" },
          { id: "net-http-plain", sev: "MINOR", cvss: 3.7, re: /http:\/\/(?!localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\]|schemas?\.|www\.w3\.org|example\.com|json-schema\.org)[a-z0-9.-]+/i, why: "plain-HTTP network call - traffic can be intercepted or tampered", next: "use https://" },
          { id: "log-secret", sev: "MINOR", cvss: 4.3, re: /(?:console\.log|print\s*\(|logger?\.\w+\s*\()\s*[^)]*\b(?:password|passwd|secret|token|api_?key|apikey|credential)\w*\b/i, why: "credential variable written to logs", next: "never log secrets; redact or remove the statement" },
          { id: "ci-pull-request-target", sev: "MAJOR", cvss: 7.5, re: /pull_request_target/, path: /\.github\/workflows\//, why: "pull_request_target runs fork code with base secrets - classic exfiltration vector", next: "avoid pull_request_target; if unavoidable never checkout refs/pr head with secrets" },
        ];
        const MAXC_RA = 12000;
        const lineRA = (txt, idx) => { let l = 1; for (let i = 0; i < idx && i < txt.length; i++) if (txt.charCodeAt(i) === 10) l++; return l; };
        const findingsRA = [];
        let bytesRA = 0;
        for (const fRA of filesRA) {
          const contentRA = fRA.content.slice(0, MAXC_RA);
          bytesRA += contentRA.length;
          const truncRA = fRA.content.length > MAXC_RA;
          let perFileRA = 0;
          for (const ruleRA of RULES_RA) {
            if (ruleRA.path && !ruleRA.path.test(fRA.path)) continue;
            let hitsRA = 0;
            const reRA = new RegExp(ruleRA.re.source, "g" + (ruleRA.re.flags.includes("i") ? "i" : ""));
            let mRA;
            while ((mRA = reRA.exec(contentRA)) !== null && hitsRA < 2) {
              const ctxRA = contentRA.slice(Math.max(0, mRA.index - 80), mRA.index + mRA[0].length + 80);
              if (ruleRA.skip && ruleRA.skip.test(ctxRA)) { if (reRA.lastIndex === mRA.index) reRA.lastIndex++; continue; }
              findingsRA.push({ file: fRA.path, line: lineRA(contentRA, mRA.index), finding: ruleRA.id, severity: ruleRA.sev, cvss: ruleRA.cvss, why: ruleRA.why, next: ruleRA.next, ...(truncRA ? { note: "file truncated at 12000 chars" } : {}) });
              hitsRA++; perFileRA++;
              if (mRA[0].length === 0) reRA.lastIndex++;
              if (perFileRA >= 12) break;
            }
            if (perFileRA >= 12) break;
          }
        }
        const countsRA = { CRITICAL: 0, MAJOR: 0, MINOR: 0 };
        for (const xRA of findingsRA) countsRA[xRA.severity] = (countsRA[xRA.severity] || 0) + 1;
        const verdictRA = countsRA.CRITICAL > 0 ? "FINDINGS-CRITICAL" : countsRA.MAJOR > 0 ? "FINDINGS" : countsRA.MINOR > 0 ? "FINDINGS-MINOR" : "CLEAN";
        const outRA = {
          service: "repo-security-audit", schema_version: 1, generated_at: new Date().toISOString(),
          repo: "https://github.com/" + ownerRA + "/" + repoRA, tier: tierRA,
          reviewable_files_in_repo: nbRevRA, files_reviewed: filesRA.length, bytes_scanned: bytesRA,
          verdict: verdictRA, counts: countsRA, max_cvss: findingsRA.reduce((a, x) => Math.max(a, x.cvss), 0),
          findings: findingsRA, price_usd: tierRA === "large" ? 2 : 0.5,
          disclaimer: "static pattern scan - not a full audit",
        };
        return new Response(JSON.stringify(outRA), { status: 200, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
      });
      // Size-tier dynamique : si le client avait signé le 402 small ($0.50) mais le repo est large,
      // le verify x402 echoue (montant insuffisant) -> on RE-SERT le challenge a $2 avec la note size_tier.
      if (repRA.status === 402 && tierRA === "large") {
        let rejRA = false;
        try { const jRA = await repRA.clone().json(); rejRA = !!jRA.error; } catch (_) { rejRA = true; }
        if (rejRA) {
          const termsRA2 = json402("repo-security-audit-large", url.href);
          const utfRA2 = new TextEncoder().encode(JSON.stringify(termsRA2));
          let binRA2 = "";
          for (const b of utfRA2) binRA2 += String.fromCharCode(b);
          const b64RA2 = btoa(binRA2);
          return new Response(JSON.stringify({ ...termsRA2, size_tier: { reviewable_files: nbRevRA, threshold: 20, price_usd: 2, amount_micro: "2000000", note: "repo exceeds the 20 reviewable-files small tier - re-sign this challenge for 2000000 micro-USDC ($2.00)" } }), { status: 402, headers: { "Content-Type": "application/json", "PAYMENT-REQUIRED": b64RA2, "X-PAYMENT-CHALLENGE": b64RA2, "Access-Control-Expose-Headers": "PAYMENT-REQUIRED, X-PAYMENT-CHALLENGE, X-PAYMENT-RESPONSE" } });
        }
      }
      return repRA;
    }

// ============================================================================
// ─── PARTIE 3 : NOTES D'INTÉGRATION ───
//
// ANCRES (worker-api-prod.js) :
//   1. PRIX ............ ligne ~104  : coller les 2 entrées juste après "mcp-audit": 250000n
//   2. DESCRIPTIONS .... ligne ~324  : après l'entrée "mcp-audit"
//   3. EXAMPLES ........ ligne ~574  : après l'entrée "mcp-audit"
//   4. TAGS_PAR_DOMAINE  ligne ~914  : après l'entrée "mcp-audit" (2 clés, dont -large)
//   5. FICHE_DOC ....... ligne ~1120 : "repo-security-audit" et "repo-security-audit-large" -> "repo-security-audit.md"
//   6. QUERY_EXEMPLES .. ligne ~1149 : { github_url: "https://github.com/owner/name" }
//   7. BLOC ROUTE ...... APRÈS la définition de bkPaiement (const bkPaiement = ... finit ~ligne 8600)
//                        et idéalement juste après le bloc ===== MCP-AUDIT (~ligne 9660).
//                        PIÈGE TDZ : le bloc appelle bkPaiement/json402/facilitator qui sont des
//                        const/arrow définis AVANT ; coller le bloc AVANT ces définitions =
//                        ReferenceError (temporal dead zone) au premier appel.
//                        PIÈGE RETURN : le handler de fetch attend un "return new Response(...)" —
//                        le bloc retourne toujours une Response (402 / 400 / 502 / 200) ; ne jamais
//                        laisser un chemin retomber sur le chainage suivant sans return.
//
// PRIX — ATTENTION : la consigne mentionnait "50000n et 200000n" mais la fiche verrouillée
// (repo-security-audit.md) et la contrainte $0.50/$2 imposent 500000n / 2000000n micro-USDC
// (mcp-audit 250000n = $0.25 confirme l'échelle micro). J'ai suivi la fiche : 500000n / 2000000n.
// À confirmer au merge si le parent voulait vraiment $0.05/$0.20.
//
// TIER DYNAMIQUE (flux verrouillé) :
//   - POST sans credential -> 402 small-tier $0.50 sans toucher l'API GitHub (quota 60 req/h préservé).
//   - POST avec credential (X-TICKET / Bearer sub_ / PAYMENT-SIGNATURE) -> fetch tree (1 req) ->
//     comptage reviewables -> bkPaiement sur "repo-security-audit" OU "repo-security-audit-large".
//     Deux clés PRIX distinctes => tickets (essaieTicket lit PRIX[service]) et abonnements
//     (essaieAbonnement lit PRIX[service]) débiteront le bon montant automatiquement.
//   - Client qui avait signé $0.50 sur un repo large : le verify x402 échoue (underpaid),
//     bkPaiement renvoie 402 -> le handler RE-SERT le challenge $2 avec size_tier (note, compte,
//     threshold, amount_micro). Le client re-signe. Pas de settle partiel (verify avant settle).
//
// TESTS EFFECTUÉS (node, /tmp) :
//   - fixture dirty : 10 règles déclenchées, lignes exactes, verdict FINDINGS-CRITICAL (3C/5M/2m).
//   - clone https://github.com/octocat/Spoon-Knife : 3 fichiers, tier small, FINDINGS-MINOR (http:// README:9).
//   - pipeline réseau auditGitHubRepo : is-odd (12 rev., tier small, FINDINGS-MINOR),
//     expressjs/express (216 rev. -> tier large, 30 fichiers, 41.8 kB, FINDINGS, CI workflows en tête),
//     404 repo inexistant -> error, URL non-GitHub -> 400.
//
// LIMITES CONNUES (v1 sans LLM, assumé par la spec) :
//   - heuristique regex -> faux positifs/négatifs possibles (ex: rce-exec matche exec( dans un workflow),
//     disclaimer "static pattern scan - not a full audit" toujours inclus dans la 200.
//   - tree GitHub "truncated: true" possible sur les très gros repos : tree_truncated remonté par le core
//     (non exposé dans la réponse worker v1 — à ajouter si besoin).
//   - raw.githubusercontent sans token : OK public ; branch HEAD = branche par défaut.
