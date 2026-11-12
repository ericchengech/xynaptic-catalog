#!/usr/bin/env node
// Xynaptic MCP Server (stdio) — proxy vers le serveur hébergé mcp.xynaptic.io
// L'introspection (initialize, ping, tools/list) est servie EN LOCAL : le serveur
// démarre et répond même dans un bac à sable sans accès réseau (tests d'annuaires).
// Seul tools/call passe par le réseau (l'appel renvoie le challenge x402 à payer).
// Zero-dependency, Node 18+.

"use strict";
const readline = require("readline");
const ENDPOINT = process.env.XYNAPTIC_MCP_ENDPOINT || "https://mcp.xynaptic.io/mcp";
const VERSION = "1.3.13";

const rl = readline.createInterface({ input: process.stdin, terminal: false });
let pending = 0;
let stdinClosed = false;

// --- liste de secours (utilisée seulement si le réseau est indisponible) ---
const OUTILS_SECOURS = [
  {
    name: "xynaptic-status",
    description: "Xynaptic Status - FREE, no payment required. Live catalog summary: number of services, domains, networks, x402 protocol, monthly plans, docs and health. [FREE - no payment, no API key]",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "xynaptic-catalog",
    description: "Xynaptic Catalog - access any of the 219 Xynaptic services by name (crypto, French company registry, US/EU securities, banking, energy, rail, flights, health, insurance, property, jobs). Pass {service, params} for GET services or {service, body} for POST ones; the x402 challenge is surfaced for payment. [price: $0.010 per call, x402/USDC]",
    inputSchema: {
      type: "object", required: ["service"],
      properties: {
        service: { type: "string", description: "required. Xynaptic service name, e.g. bank-cashflow, news-eu, security-eu-price" },
        params: { type: "object", description: "query parameters for GET services" },
        body: { type: "object", description: "JSON body for POST services" },
      },
    },
  },
  {
    name: "crypto-price",
    description: "Xynaptic Crypto Price - real-time snapshot of 6 major crypto assets (BTC, ETH, SOL, ADA, LINK, DOT) with 24h changes. [price: $0.010 per call, x402/USDC]",
    inputSchema: { type: "object", properties: { params: { type: "object", description: "optional query parameters" } } },
  },
];

function repondre(msg, result) {
  process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id: msg.id !== undefined ? msg.id : null, result }) + "\n");
}

function repondreErreur(msg, code, message) {
  process.stdout.write(JSON.stringify({
    jsonrpc: "2.0", id: msg.id !== undefined ? msg.id : null, error: { code, message },
  }) + "\n");
}

async function poster(body, timeoutMs) {
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json, text/event-stream",
  };
  if (process.env.XYNAPTIC_SUB_KEY) headers["X-SUB-KEY"] = process.env.XYNAPTIC_SUB_KEY;
  const res = await fetch(ENDPOINT, {
    method: "POST", headers, body: JSON.stringify(body),
    signal: AbortSignal.timeout(timeoutMs || 60000),
  });
  const text = await res.text();
  const m = text.match(/data: ?(\{.*\})/);
  return m ? JSON.parse(m[1]) : JSON.parse(text);
}

function maybeExit() {
  if (stdinClosed && pending === 0) process.exit(0);
}

async function traiter(msg) {
  const methode = msg.method || "";

  // ---- introspection servie localement ----
  if (methode === "initialize") {
    return repondre(msg, {
      protocolVersion: (msg.params && msg.params.protocolVersion) || "2025-06-18",
      capabilities: { tools: { listChanged: false } },
      serverInfo: { name: "xynaptic", version: VERSION,
        title: "Xynaptic - curated flagship tools from a 219-service x402/USDC catalog (api.xynaptic.io)" },
      instructions: "Xynaptic: real-world official data for AI agents (crypto, French companies, US/EU securities, energy, FAA NOTAMs, legal, travel). Start with xynaptic-status (FREE). Paid tools return an x402 402 challenge; pay it and retry with PAYMENT-SIGNATURE.",
    });
  }
  if (methode === "ping") return repondre(msg, {});
  if (methode === "tools/list") {
    try {
      const rep = await poster(msg, 4000);
      if (rep && rep.result && Array.isArray(rep.result.tools)) return process.stdout.write(JSON.stringify(rep) + "\n");
    } catch (_) { /* réseau indisponible -> liste de secours */ }
    return repondre(msg, { tools: OUTILS_SECOURS });
  }

  // ---- tout le reste (tools/call...) passe par le serveur hébergé ----
  try {
    const out = await poster(msg, 60000);
    process.stdout.write(JSON.stringify(out) + "\n");
  } catch (e) {
    repondreErreur(msg, -32603, "xynaptic-mcp bridge error: " + String((e && e.message) || e));
  }
}

rl.on("line", async (line) => {
  const t = line.trim();
  if (!t) return;
  let msg;
  try { msg = JSON.parse(t); } catch { return; }
  pending++;
  try { await traiter(msg); } finally { pending--; maybeExit(); }
});
rl.on("close", () => { stdinClosed = true; maybeExit(); });
