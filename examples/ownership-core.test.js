// Tests du moteur examples/ownership-core.js (node) — crawl réel inclus.
// Le token du crawl réel est récupéré en live (IP egress servie par api.ipify.org/).
// NB : https://xynaptic.io/.well-known/agent-hub-verify.txt n'existe PAS (404 HTML) — utilisé comme cas négatif réel.
// Exécuté et PASSING le 2026-11-04.

const { normaliseDomain, isPrivateOrLocal, verifierOwnership, tokenMatch } = require("/home/koch/xynaptic/CURRENT/xynaptic-catalog/examples/ownership-core.js");
const assert = require("assert");
assert.strictEqual(normaliseDomain("HTTPS://Api.Ipify.org/?x=1").domain, "api.ipify.org");
assert(normaliseDomain("café.fr").error);
for (const h of ["localhost","127.0.0.1","10.0.0.5","172.16.1.1","172.31.255.1","192.168.1.1","169.254.169.254","::1","fe80::1","box.local","db.internal","8.8.8.8","[2606:4700::1]","0.0.0.0"]) assert(isPrivateOrLocal(h), h);
assert(!isPrivateOrLocal("api.ipify.org"));
assert(tokenMatch('  "' + "tok12345" + '"\n', "tok12345"));
assert(tokenMatch(" tok12345 ", "tok12345"));
assert(!tokenMatch("autre", "tok12345"));
console.log("unit normalisation/anti-SSRF/tolerant-match: OK");
(async () => {
  let r = await verifierOwnership({ domain: "localhost", token: "abcdefgh" }); assert.strictEqual(r.http, 400);
  r = await verifierOwnership({ domain: "10.0.0.1", token: "abcdefgh" }); assert.strictEqual(r.http, 400);
  r = await verifierOwnership({ domain: "169.254.169.254", token: "abcdefgh" }); assert.strictEqual(r.http, 400);
  r = await verifierOwnership({ domain: "metadata.google.internal", token: "abcdefgh" }); assert.strictEqual(r.http, 400);
  console.log("unit SSRF 400 refus: OK");
  // CRAWL RÉEL 1 : contenu publié réellement par le domaine au moment du test -> verified true
  const TOKEN = (await (await fetch("https://api.ipify.org")).text()).trim();
  const ok = await verifierOwnership({ domain: "api.ipify.org", token: TOKEN, token_url_path: "/" });
  console.log("VERIFIED RUN:", JSON.stringify(ok.body, null, 2));
  assert.strictEqual(ok.http, 200); assert.strictEqual(ok.body.verified, true); assert(ok.body.certificate_id.startsWith("own_"));
  // CRAWL RÉEL 2 : xynaptic.io path inexistant -> 404 HTML servi -> verified false (pas de faux positif sur page d'erreur)
  const ko = await verifierOwnership({ domain: "xynaptic.io", token: "wrongtoken123", token_url_path: ".well-known/agent-hub-verify.txt" });
  console.log("XYNAPTIC 404 RUN:", JSON.stringify(ko.body));
  assert.strictEqual(ko.body.verified, false); assert(/not found/i.test(ko.body.reason));
  // domaine inexistant -> unreachable
  const ko2 = await verifierOwnership({ domain: "doesnotexist-xynaptic-test-9931.com", token: "abcdefgh" });
  console.log("unreachable reason:", ko2.body.reason.slice(0, 70));
  assert.strictEqual(ko2.body.verified, false);
  // cache 24h : 2e appel même challenge -> cached:true sans re-facturation
  const kv = new Map();
  const get = (k) => Promise.resolve(kv.get(k));
  const put = (k, v) => { kv.set(k, v); return Promise.resolve(); };
  const a1 = await verifierOwnership({ domain: "api.ipify.org", token: TOKEN, token_url_path: "/" }, get, put, Date.now());
  assert.strictEqual(a1.body.cached, undefined);
  const a2 = await verifierOwnership({ domain: "api.ipify.org", token: TOKEN, token_url_path: "/" }, get, put, Date.now() + 3600000);
  console.log("CACHED RUN:", JSON.stringify(a2.body));
  assert.strictEqual(a2.body.cached, true);
  console.log("ALL TESTS PASSED");
})().catch((e) => { console.error("FAIL:", e.message); process.exit(1); });
