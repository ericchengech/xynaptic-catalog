// Xynaptic MCP Server (stdio) — proxy vers le serveur hébergé mcp.xynaptic.io
// Pour l'évaluation Glama : démarre et répond à l'introspection (initialize, tools/list, tools/call).
// Paiements : chaque appel d'outil payant renvoie le challenge x402 (accepts[]) —
// payez-le et rejouez avec PAYMENT-SIGNATURE, ou définissez XYNAPTIC_SUB_KEY (abonnement).
// Zero-dependency, Node 18+.

"use strict";
const readline = require("readline");
const ENDPOINT = "https://mcp.xynaptic.io/mcp";

const rl = readline.createInterface({ input: process.stdin, terminal: false });
let pending = 0;          // requêtes en vol
let stdinClosed = false;

async function post(body) {
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json, text/event-stream",
  };
  if (process.env.XYNAPTIC_SUB_KEY) headers["X-SUB-KEY"] = process.env.XYNAPTIC_SUB_KEY;
  const res = await fetch(ENDPOINT, { method: "POST", headers, body: JSON.stringify(body) });
  const text = await res.text();
  // SSE frames : prendre la première ligne data: avec JSON
  const m = text.match(/data: ?(\{.*\})/);
  return m ? JSON.parse(m[1]) : JSON.parse(text);
}

function maybeExit() {
  // ne sortir que quand stdin est fermé ET qu'aucune réponse n'est en vol
  if (stdinClosed && pending === 0) process.exit(0);
}

rl.on("line", async (line) => {
  const t = line.trim();
  if (!t) return;
  let msg;
  try { msg = JSON.parse(t); } catch { return; }
  pending++;
  try {
    const out = await post(msg);
    process.stdout.write(JSON.stringify(out) + "\n");
  } catch (e) {
    process.stdout.write(JSON.stringify({
      jsonrpc: "2.0", id: msg.id || null,
      error: { code: -32603, message: "xynaptic-mcp bridge error: " + String(e && e.message || e) },
    }) + "\n");
  }
  pending--;
  maybeExit();
});
rl.on("close", () => { stdinClosed = true; maybeExit(); });