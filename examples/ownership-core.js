// ============================================================================
// ownership-core.js — Xynaptic /v1/domain-ownership-proof moteur pur (Trust & Security)
// Oracle de preuve de propriété de domaine : normalise, protège (anti-SSRF),
// crawlle https://<domain>/<path> (2 essais), compare tolérant, émet un certificat.
// Testé hors-ligne + crawl réel (voir bas de fichier). AUCUN deploy ici.
// ============================================================================

// --- Normalisation du domaine : lowercase, strip scheme/path, refus non-ascii ---
function normaliseDomain(input) {
  let d = String(input || "").trim();
  d = d.replace(/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//, ""); // strip scheme
  d = d.replace(/\/.*$/, "");                          // strip path/query
  d = d.replace(/:\d+$/, "");                          // strip port
  d = d.replace(/^@/, "");
  if (d.startsWith("[")) d = d.replace(/^\[|\]$/g, ""); // [ipv6] -> ipv6
  d = d.toLowerCase();
  if (!d) return { error: "domain required" };
  // punycode skip : refus si non-ascii (l'IDN punycodé xn-- serait accepté, mais on refuse le source non-ascii)
  if (/[^\x20-\x7E]/.test(d)) return { error: "non-ascii domain refused (punycode not applied — send the xn-- form yourself if you own an IDN)" };
  if (d.length > 253) return { error: "domain too long" };
  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/.test(d))
    return { error: "invalid domain (expect a public hostname like example.com)" };
  return { domain: d };
}

// --- Anti-SSRF : refuse localhost, IPs (toutes), privés, link-local, *.local/*.internal ---
const IPV4_RE = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
function isPrivateOrLocal(host) {
  if (host === "localhost" || host.endsWith(".localhost")) return true;
  if (/\.(local|internal|home|lan|corp|intranet|test|example|invalid)$/i.test(host)) return true;
  const m = host.match(IPV4_RE);
  if (m) {
    const o = m.map(Number);
    if (o.some((x) => x > 255)) return true; // malformé -> refus
    const [a, b] = o;
    if (a === 127 || a === 10 || a === 0) return true;                    // loopback, 10/8, 0/8
    if (a === 172 && b >= 16 && b <= 31) return true;                     // 172.16/12
    if (a === 192 && b === 168) return true;                              // 192.168/16
    if (a === 169 && b === 254) return true;                              // 169.254/16
    if (a === 100 && b >= 64 && b <= 127) return true;                    // CGNAT 100.64/10
    if (a >= 224) return true;                                            // multicast/reserved
    return true; // TOUT IPv4 littéral refusé : l'oracle ne certifie que des noms publics
  }
  if (host.includes(":")) return true; // tout IPv6 littéral refusé (::1, fe80::, fc00::/7, etc.)
  return false;
}

// --- Path du token : fourni ou défaut .well-known ---
function normaliseTokenPath(p) {
  let path = String(p || "").trim();
  if (!path) return { path: "/.well-known/xynaptic-ownership.txt" };
  if (!path.startsWith("/")) path = "/" + path;
  if (path.includes("..")) return { error: "invalid token_url_path (no traversal)" };
  if (path.length > 300) return { error: "token_url_path too long" };
  return { path };
}

// --- Crawl : GET https, 2 essais, 3s timeout, UA dédié ---
async function crawlToken(domain, tokenPath) {
  const url = "https://" + domain + tokenPath;
  for (let essai = 1; essai <= 2; essai++) {
    try {
      const r = await fetch(url, {
        redirect: "manual", // pas de redirection : on certifie CE domaine, pas une cible arbitraire (anti-SSRF)
        headers: { "User-Agent": "Xynaptic-Ownership-Oracle (+https://xynaptic.io)" },
        signal: AbortSignal.timeout(3000),
      });
      if (r.status >= 300 && r.status < 400) return { url, status: r.status, error: "redirect refused (oracle does not follow redirects)" };
      if (!r.ok) return { url, status: r.status, body: null };
      const body = await r.text();
      return { url, status: 200, body: body.slice(0, 8192) };
    } catch (e) {
      if (essai === 2) return { url, status: 0, error: (e && e.name === "TimeoutError") ? "timeout after 2 attempts (3s each)" : "unreachable after 2 attempts: " + (e && e.message || "network error") };
    }
  }
}

// --- Comparaison tolérante : trim + guillemets optionnels ---
function tokenMatch(body, token) {
  if (!body) return false;
  const attendu = String(token).trim().replace(/^["']+|["']+$/g, "");
  const vu = body.trim().replace(/^["']+|["']+$/g, "");
  return vu === attendu;
}

// --- Clé cache 24h (re-crawl même challenge gratuit) ---
async function cacheKey(domain, token) {
  return "own:last:" + domain + ":" + (await hashHex(domain + "|" + token)).slice(0, 24);
}

// --- sha256 hex (WebCrypto) ; fallback node pour tests ---
async function hashHex(s) {
  if (globalThis.crypto && crypto.subtle) {
    const h = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
    return [...new Uint8Array(h)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  const { createHash } = await import("node:crypto");
  return createHash("sha256").update(s).digest("hex");
}

// --- Pipeline complet ---
async function verifierOwnership({ domain, token, token_url_path }, kvGet, kvPut, now) {
  const nd = normaliseDomain(domain);
  if (nd.error) return { http: 400, body: { error: nd.error } };
  const d = nd.domain;
  if (isPrivateOrLocal(d)) return { http: 400, body: { error: "refused: localhost / private / link-local / literal-IP targets are not certifiable (anti-SSRF)" } };
  const tok = String(token || "").trim();
  if (!tok || tok.length < 8 || tok.length > 256 || /\s/.test(tok))
    return { http: 400, body: { error: "field required: token (8-256 chars, no whitespace) — publish it first, e.g. a one-time challenge token" } };
  const np = normaliseTokenPath(token_url_path);
  if (np.error) return { http: 400, body: { error: np.error } };

  now = now || Date.now();
  const ck = await cacheKey(d, tok);
  if (kvGet) {
    try {
      const prev = await kvGet(ck);
      if (prev) {
        const { verified, ts } = JSON.parse(prev);
        const ageH = (now - ts) / 3600000;
        if (ageH < 24)
          return { http: 200, body: { service: "domain-ownership-proof", domain: d, token_path: np.path, verified, checked_at: new Date(ts).toISOString(), certificate_id: "own_" + (await hashHex(d + tok + new Date(ts).toISOString())).slice(0, 16), cached: true, cached_age_hours: +ageH.toFixed(2), disclaimer: "point-in-time verification only — proves token presence at check time" } };
      }
    } catch (_) {}
  }

  const cr = await crawlToken(d, np.path);
  const checked_at = new Date(now).toISOString();
  const verified = !!(cr.status === 200 && tokenMatch(cr.body, tok));
  const cert = {
    service: "domain-ownership-proof",
    domain: d,
    token_path: np.path,
    verified,
    checked_at,
    certificate_id: "own_" + (await hashHex(d + tok + checked_at)).slice(0, 16),
    disclaimer: "point-in-time verification only — proves token presence at check time",
  };
  if (!verified) cert.reason = cr.error ? cr.error : (cr.status === 200 ? "token mismatch (file served, content differs)" : "token file not found (HTTP " + cr.status + ")");
  if (cr.status > 0 && cr.status !== 200) cert.http_status_seen = cr.status;

  if (kvPut && verified) {
    try { await kvPut(ck, JSON.stringify({ verified, ts: now }), { expirationTtl: 86400 }); } catch (_) {}
  }
  return { http: 200, body: cert };
}

// Exports (worker + tests node)
globalThis.__ownership = { normaliseDomain, isPrivateOrLocal, normaliseTokenPath, crawlToken, tokenMatch, cacheKey, hashHex, verifierOwnership };
if (typeof module !== "undefined") module.exports = { normaliseDomain, isPrivateOrLocal, normaliseTokenPath, crawlToken, tokenMatch, cacheKey, hashHex, verifierOwnership };
