// ============================================================================
// ownership-worker-block.js — Xynaptic /v1/domain-ownership-proof (Trust & Security)
// READY-TO-INSERT handler block + table entries. Pattern = MCP-AUDIT + bkPaiement.
// Moteur identique à examples/ownership-core.js (testé : crawl réel, cache 24h, anti-SSRF).
// NO DEPLOY here — parent agent reviews/merges/tests/deploys.
// ============================================================================
//
// ─── PARTIE 1 : ENTRÉES DE TABLES (à insérer dans les 6 tables du worker) ───
//
// PRIX (ligne ~104, après "mcp-audit": 250000n) :
//   "domain-ownership-proof": 250000n,   // 0,25 USDC — Trust & Security : crawl oracle de preuve de propriété de domaine
//
// DESCRIPTIONS (ligne ~324, après l'entrée mcp-audit) :
//   "domain-ownership-proof": "Xynaptic Domain Ownership Proof — neutral oracle for domain-ownership claims. Publish a one-time token on your domain (default /.well-known/xynaptic-ownership.txt, or any token_url_path you choose), then POST { domain, token, token_url_path? }: we crawl https://<your-domain>/<path> (2 attempts, 3s timeout, no redirects) and certify what we actually saw — machine-readable certificate_id, point-in-time disclaimer. Tolerant match (trim, optional quotes). A failed verify (token absent/mismatched) is still a 200 with verified:false — the crawl itself is the paid answer. Free re-crawl of the same domain+token challenge within 24h (cached result). $0.25 per verification or $2/month unlimited (agencies). Boundaries: oracle, not hosting — we never host the challenge file; localhost/private/link-local/literal-IP targets refused (anti-SSRF).",
//
// EXAMPLES (ligne ~574, après l'entrée mcp-audit) :
//   "domain-ownership-proof": { service: "domain-ownership-proof", domain: "example.com", token_path: "/.well-known/xynaptic-ownership.txt", verified: true, checked_at: "2026-11-04T14:00:00Z", certificate_id: "own_9f7795c12d827b50", disclaimer: "point-in-time verification only — proves token presence at check time" },
//
// TAGS_PAR_DOMAINE (ligne ~914, après l'entrée mcp-audit) :
//   "domain-ownership-proof": ["security", "domain", "verification", "oracle", "trust"],
//
// FICHE_DOC (ligne ~1120, après l'entrée mcp-audit) :
//   "domain-ownership-proof": "domain-ownership-proof.md",
//
// QUERY_EXEMPLES (ligne ~1149, section) :
//   "domain-ownership-proof": { domain: "example.com", token: "xnps_9f2c1a7e4b8d63f5", token_url_path: "/.well-known/xynaptic-ownership.txt" },
//
// ─── PARTIE 2 : BLOC ROUTE (à coller APRÈS la définition de bkPaiement, ~ligne 8541,
//     idéalement juste après le bloc ===== MCP-AUDIT / REPO-SECURITY-AUDIT) ───
//
//    // ===== DOMAIN-OWNERSHIP-PROOF (Trust & Security - oracle de preuve de propriété, $0.25, zero LLM) =====
    if (url.pathname === "/v1/domain-ownership-proof") {
      if (request.method !== "POST") {
        const svcDOP = url.pathname.replace(/^\/v1\//, "");
        const termsDOP = json402(svcDOP, url.href);
        const utfDOP = new TextEncoder().encode(JSON.stringify(termsDOP));
        let binDOP = "";
        for (const b of utfDOP) binDOP += String.fromCharCode(b);
        const b64DOP = btoa(binDOP);
        return new Response(JSON.stringify({ ...termsDOP, note: "POST body required: { domain, token, token_url_path? }. Publish the token on the real domain first (default path /.well-known/xynaptic-ownership.txt), we crawl https://<domain>/<path> and certify presence. 250000 micro-USDC ($0.25) per verification; same domain+token challenge re-checked free within 24h; $2/month unlimited (agencies, Bearer sub_). Point-in-time verification only." }), { status: 402, headers: { "Content-Type": "application/json", "PAYMENT-REQUIRED": b64DOP, "X-PAYMENT-CHALLENGE": b64DOP, "Access-Control-Expose-Headers": "PAYMENT-REQUIRED, X-PAYMENT-CHALLENGE, X-PAYMENT-RESPONSE" } });
      }
      let corpsDOP = null;
      try { corpsDOP = await request.json(); } catch (_) { corpsDOP = {}; }
      // ---- normalisation + anti-SSRF (identique a examples/ownership-core.js) ----
      let dDOP = String(corpsDOP.domain || corpsDOP.url || "").trim();
      dDOP = dDOP.replace(/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//, "").replace(/\/.*$/, "").replace(/:\d+$/, "").replace(/^@/, "").toLowerCase();
      if (dDOP.startsWith("[")) dDOP = dDOP.replace(/^\[|\]$/g, "");
      const errDOP = (m) => new Response(JSON.stringify({ error: m }), { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
      if (!dDOP) return errDOP("field required: domain");
      if (/[^\x20-\x7E]/.test(dDOP)) return errDOP("non-ascii domain refused (punycode not applied — send the xn-- form yourself if you own an IDN)");
      if (dDOP.length > 253 || !/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/.test(dDOP)) return errDOP("invalid domain (expect a public hostname like example.com)");
      if (dDOP === "localhost" || dDOP.endsWith(".localhost") || /\.(local|internal|home|lan|corp|intranet|test|example|invalid)$/i.test(dDOP)) return errDOP("refused: localhost / private / link-local / literal-IP targets are not certifiable (anti-SSRF)");
      const m4DOP = dDOP.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
      if (m4DOP || dDOP.includes(":")) return errDOP("refused: localhost / private / link-local / literal-IP targets are not certifiable (anti-SSRF)");
      const tokDOP = String(corpsDOP.token || "").trim();
      if (!tokDOP || tokDOP.length < 8 || tokDOP.length > 256 || /\s/.test(tokDOP)) return errDOP("field required: token (8-256 chars, no whitespace) — publish it on the domain first");
      let pathDOP = String(corpsDOP.token_url_path || corpsDOP.path || "").trim();
      if (!pathDOP) pathDOP = "/.well-known/xynaptic-ownership.txt";
      else {
        if (!pathDOP.startsWith("/")) pathDOP = "/" + pathDOP;
        if (pathDOP.includes("..") || pathDOP.length > 300) return errDOP("invalid token_url_path");
      }
      // ---- cache 24h : re-crawl du MEME challenge (domain+token) gratuit, AVANT bkPaiement ----
      const hDOP = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(dDOP + "|" + tokDOP));
      const hkDOP = [...new Uint8Array(hDOP)].map((b) => b.toString(16).padStart(2, "0")).join("");
      const ckDOP = "own:last:" + dDOP + ":" + hkDOP.slice(0, 24);
      let prevDOP = null;
      try { prevDOP = await env.TX.get(ckDOP); } catch (_) {}
      if (prevDOP) {
        try {
          const cDOP = JSON.parse(prevDOP);
          if (Date.now() - cDOP.ts < 86400000) {
            const catDOP = new Date(cDOP.ts).toISOString();
            const chDOP = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(dDOP + tokDOP + catDOP));
            const cidDOP = [...new Uint8Array(chDOP)].map((b) => b.toString(16).padStart(2, "0")).join("");
            return new Response(JSON.stringify({ service: "domain-ownership-proof", domain: dDOP, token_path: pathDOP, verified: cDOP.verified, checked_at: catDOP, certificate_id: "own_" + cidDOP.slice(0, 16), cached: true, cached_age_hours: +(((Date.now() - cDOP.ts) / 3600000).toFixed(2)), disclaimer: "point-in-time verification only — proves token presence at check time" }), { status: 200, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
          }
        } catch (_) {}
      }
      // ---- paiement standard (402 si sans credential ; X-TICKET / Bearer sub_ / PAYMENT-SIGNATURE) ----
      const repDOP = await bkPaiement(env, request, url, "domain-ownership-proof", corpsDOP, async () => {
        // ---- crawl : GET https, 2 essais, 3s timeout, UA dedie, PAS de redirection (anti-SSRF) ----
        const uDOP = "https://" + dDOP + pathDOP;
        let stDOP = 0, bodyDOP = null, erDOP = null;
        for (let essaiDOP = 1; essaiDOP <= 2; essaiDOP++) {
          try {
            const rDOP = await fetch(uDOP, { redirect: "manual", headers: { "User-Agent": "Xynaptic-Ownership-Oracle (+https://xynaptic.io)" }, signal: AbortSignal.timeout(3000) });
            if (rDOP.status >= 300 && rDOP.status < 400) { stDOP = rDOP.status; erDOP = "redirect refused (oracle does not follow redirects)"; break; }
            stDOP = rDOP.status;
            if (rDOP.ok) bodyDOP = (await rDOP.text()).slice(0, 8192);
            break;
          } catch (eDOP) {
            if (essaiDOP === 2) { stDOP = 0; erDOP = (eDOP && eDOP.name === "TimeoutError") ? "timeout after 2 attempts (3s each)" : "unreachable after 2 attempts: " + (eDOP && eDOP.message || "network error"); }
          }
        }
        // ---- comparaison tolerante : trim + guillemets optionnels ----
        const attenduDOP = tokDOP.replace(/^["']+|["']+$/g, "");
        const vuDOP = bodyDOP ? bodyDOP.trim().replace(/^["']+|["']+$/g, "") : "";
        const verifiedDOP = !!(bodyDOP && vuDOP === attenduDOP);
        const checked_atDOP = new Date().toISOString();
        const chDOP = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(dDOP + tokDOP + checked_atDOP));
        const cidDOP = [...new Uint8Array(chDOP)].map((b) => b.toString(16).padStart(2, "0")).join("");
        const outDOP = {
          service: "domain-ownership-proof",
          domain: dDOP,
          token_path: pathDOP,
          verified: verifiedDOP,
          checked_at: checked_atDOP,
          certificate_id: "own_" + cidDOP.slice(0, 16),
          disclaimer: "point-in-time verification only — proves token presence at check time",
        };
        if (!verifiedDOP) {
          outDOP.reason = erDOP ? erDOP : (bodyDOP ? "token mismatch (file served, content differs)" : stDOP > 0 ? "token file not found (HTTP " + stDOP + ")" : "unreachable");
          if (stDOP > 0) outDOP.http_status_seen = stDOP;
        }
        // cache 24h uniquement sur challenge reussi (fairness : on ne fige pas un echec)
        if (verifiedDOP) { try { await env.TX.put(ckDOP, JSON.stringify({ verified: true, ts: Date.now() }), { expirationTtl: 86400 }); } catch (_) {} }
        return new Response(JSON.stringify(outDOP), { status: 200, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
      });
      return repDOP;
    }

// ============================================================================
// ─── PARTIE 3 : NOTES D'INTÉGRATION ───
//
// ANCRES (worker-api-prod.js) :
//   1. PRIX ............ ligne ~104  : "domain-ownership-proof": 250000n juste après "mcp-audit": 250000n
//   2. DESCRIPTIONS .... ligne ~324  : après l'entrée "mcp-audit"
//   3. EXAMPLES ........ ligne ~574  : après l'entrée "mcp-audit"
//   4. TAGS_PAR_DOMAINE  ligne ~914  : après l'entrée "mcp-audit"
//   5. FICHE_DOC ....... ligne ~1120 : "domain-ownership-proof" -> "domain-ownership-proof.md"
//   6. QUERY_EXEMPLES .. ligne ~1149 : { domain, token, token_url_path? }
//   7. BLOC ROUTE ...... APRÈS la définition de bkPaiement (const bkPaiement = ... finit ~ligne 8600),
//                        idéalement juste après le bloc ===== REPO-SECURITY-AUDIT (après MCP-AUDIT ~9660).
//
// PIÈGE TDZ : le bloc appelle bkPaiement et json402 qui sont des const définies AVANT ;
//   coller le bloc AVANT ces définitions = ReferenceError (temporal dead zone) au premier appel.
// PIÈGE RETURN : le handler attend un "return new Response(...)" — chaque chemin du bloc retourne
//   toujours une Response (402 / 400 / 200) ; ne jamais retomber sur le chaînage suivant sans return.
//   Le "return repDOP;" final est OBLIGATOIRE : bkPaiement renvoie la 402 ou la 200 du moteur.
//
// ANTI-SSRF — IMPÉRATIF, ne pas alléger :
//   - refus localhost / *.local / *.internal (+ home/lan/corp/intranet/test/example/invalid) ;
//   - refus de TOUT IPv4 littéral (127/8, 10/8, 172.16/12, 192.168/16, 169.254/16, 0/8, CGNAT,
//     multicast — on refuse tout littéral IP, l'oracle ne certifie que des noms publics) ;
//   - refus de TOUT IPv6 littéral (contient ':') ;
//   - redirect: "manual" sur le fetch : le domaine revendiqué peut rediriger vers 169.254.169.254
//     ou une IP privée — l'oracle refuse toute 3xx au lieu de suivre ;
//   - https:// uniquement (pas de http:// arbitraire).
//
// CACHE 24h (décision T&S #2) : clé KV TX "own:last:<domain>:<sha256(domain|token).slice(24)>"
//   = { verified, ts }, TTL 86400. Le early-return AVANT bkPaiement répond 200 {cached:true}
//   sans re-facturer le même challenge (domain+token identiques). Cache posé uniquement sur
//   verify réussi ; token différent ou >24h => nouveau crawl facturé. À noter : la clé cache est
//   posée par le moteur APRÈS paiement réussi uniquement (dans le callback bkPaiement).
//
// TESTS EFFECTUÉS (node, /tmp/test-ownership.js, moteur examples/ownership-core.js identique) :
//   - unitaires : normalisation (scheme/path/port/case, refus non-ascii café.fr), anti-SSRF
//     (localhost, 127.0.0.1, 10/8, 172.16/12, 172.31.x, 192.168/16, 169.254.169.254, ::1, fe80::1,
//     *.local, *.internal, 8.8.8.8, IPv6 littéral => tous refusés), match tolérant (trim, guillemets).
//   - CRAWL RÉEL verified:true — https://api.ipify.org/ sert notre IP egress "82.66.203.52",
//     passée comme token : { verified: true, certificate_id: "own_3d58d5a13e0f073c", ... }.
//     NB : https://xynaptic.io/.well-known/agent-hub-verify.txt N'EXISTE PAS (404 HTML servi) —
//     info de la consigne obsolète ; le cas sert de test négatif réel :
//     { verified: false, reason: "token file not found (HTTP 404)", http_status_seen: 404 }
//     (une page 404 HTML ne produit PAS de faux positif).
//   - domaine inexistant : verified:false, "unreachable after 2 attempts: fetch failed".
//   - cache : 2e appel même challenge à +1h => 200 { cached: true, cached_age_hours: 1 } sans re-crawl.
//
// LIMITES CONNUES :
//   - comparaison = égalité stricte (après trim/dé-quotage) du CORPS ENTIER, pas un substring :
//     le fichier ne doit contenir QUE le token (sinon mismatch). Format XML/JSON => mismatch,
//     assume par la spec (fichier texte nu).
//   - redirect refusée : un domaine qui 301 vers www. échouera — le claimant doit servir le
//     fichier sur le nom exact revendiqué (assumé : on certifie CE domaine).
//   - sous-domaines d'un domaine public résolvant vers du privé (ex nip.io) : la résolution DNS
//     sort du périmètre statique du worker — Cloudflare Workers résout côté edge et bloque déjà
//     les IP privées internes ; garder le refus des littéraux + no-redirect comme barrière principale.
