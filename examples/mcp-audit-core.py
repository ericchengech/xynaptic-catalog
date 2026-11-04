#!/usr/bin/env python3
"""mcp-audit V1 — classification statique de config MCP (portage du skill mcp-dependency-review).
Input : JSON brut de config (mcpServers ou liste). Output : rapport JSON {verdict, findings[]}.
Logique pure, zéro LLM, zéro exécution. Testé localement avant intégration worker."""

import json, re, sys

# --- classification des sélecteurs de paquets npm/py/docker ---
def classify_pkg(name, version=None, docker_digest=False):
    if docker_digest:
        if version and re.match(r"sha256:[0-9a-f]{64}", version):
            return "SAFE", "image pinned by full digest"
        return "HIGH", "docker tag mutable (including latest default)"
    if not version:
        if name.startswith(("git+", "git@", "http://", "https://", "file:", "link:", "/")):
            return "REVIEW", "VCS/URL/local source: separate integrity review required"
        return "HIGH", "bare package name: future resolution can select different code"
    v = version.strip()
    if v == "latest" or v in ("beta", "next", "canary", "alpha"):
        return "HIGH", "npm distribution tag is mutable"
    if v.startswith("^") or v.startswith("~") or re.match(r"^[\dXx.*]+\s*<", v) or "*" in v or "x" in re.sub(r"[\d.]", "", v):
        return "MEDIUM", "version range permits drift"
    if re.match(r"^\d+\.\d+\.\d+([-+.\w]*)$", v):  # exact semver
        return "SAFE", "exact pin (direct selector; transitive tree not proven)"
    if v.startswith(("=", "==")):
        eq = v.lstrip("= ")
        if re.match(r"^\d+\.\d+\.\d+$", eq):
            return "SAFE", "exact pin"
        if re.search(r"[*x]", eq):
            return "MEDIUM", "wildcard equality not exact"
        return "MEDIUM", "non-exact equality"
    if v.startswith(("file:", "git+", "http", "link:")) or v.startswith("/"):
        return "REVIEW", "local/URL/VCS source needs separate integrity review"
    return "REVIEW", "ambiguous selector: do not guess"

def extract_npm_selectors(args):
    """Retrouve les sélecteurs de paquets dans une commande npx/uvx/pipx-like."""
    sel = []
    runners = {"npx": "npm", "npm": "npm", "bunx": "npm", "pnpm": "npm",
               "uvx": "pypi", "uv": "pypi", "pipx": "pypi", "pip": "pypi",
               "docker": "docker"}
    i = 0
    run = None
    while i < len(args):
        a = args[i]
        if a in runners:
            run = runners[a]
            i += 1
            continue
        if a in ("--from", "--spec", "--package"):
            if i + 1 < len(args):
                sel.append((a.lstrip("-"), args[i + 1]))
                i += 2
                continue
        if a in ("-y", "--yes", "run", "exec", "dlx", "tool", "install", "add", "global", "i"):
            i += 1
            continue
        if a.startswith("--") and "=" in a:
            k, v = a.split("=", 1)
            if k.lstrip("-") in ("from", "spec", "package"):
                sel.append((k.lstrip("-"), v))
            i += 1
            continue
        if a.startswith("-"):  # tout flag (simple ou double dash) n est jamais un selecteur
            i += 1
            continue
        if run and not sel and (":" not in a.split(" ")[0] or "@" in a or "=" in a or "/" in a.split(" ")[0]):
            # premier argument non-flag du runner = sélecteur principal (ou image docker)
            if run == "docker":
                sel.append(("image", a))
                run = None
            else:
                sel.append(("pkg", a))
                run = None
            i += 1
            continue
        # exécutable/args du paquet : ignorer
        if run:
            run = None
        i += 1
    return sel

def parse_selector(selkind, s):
    """Découpe un sélecteur en (nom, spec) selon le type."""
    if selkind == "image":
        # docker: name[:tag][@sha256:...]
        m = re.match(r"^(?:(?:[^/]+\.)?[^/]+/)?([^:@]+)(?::([^@]*))?(@sha256:[0-9a-f]{64})?$", s)
        if not m:
            return s, None, False
        name, tag, digest = m.group(1), m.group(2), m.group(3)
        return name, (digest.lstrip("@") if digest else (tag or "")), bool(digest)
    if selkind in ("pkg", "from", "spec", "package"):
        m = re.match(r"^(@?[^@]+)@(.+)$", s)
        if m:
            return m.group(1), m.group(2), False
        # uvx: pkg==1.2.3
        m = re.match(r"^([^=]+)==(.+)$", s)
        if m:
            return m.group(1), m.group(2), False
        return s, None, False
    return s, None, False

def audit_config(cfg):
    findings = []
    servers = cfg.get("mcpServers") if isinstance(cfg, dict) else None
    if servers is None and isinstance(cfg, dict) and "servers" in cfg:
        servers = cfg["servers"]
    if servers is None and isinstance(cfg, list):
        servers = {str(i): s for i, s in enumerate(cfg)}
    if not isinstance(servers, dict):
        return {"error": "no mcpServers/servers mapping found in config"}
    for name, srv in servers.items():
        if not isinstance(srv, dict):
            findings.append({"server": name, "reference": "?", "result": "REVIEW", "why": "server entry is not an object"})
            continue
        cmd = srv.get("command")
        args = srv.get("args") or []
        url = srv.get("url")
        if url and not cmd:
            t = srv.get("transport") or "http"
            findings.append({"server": name, "reference": url if isinstance(url, str) else "?",
                             "result": "REVIEW" if isinstance(url, str) and not url.startswith("https://") else "INFO",
                             "why": f"remote server, transport {t}" + ("" if isinstance(url, str) and url.startswith("https://") else " — non-https URL")})
            continue
        if not cmd:
            findings.append({"server": name, "reference": "?", "result": "REVIEW", "why": "no command and no url: unknown invocation"})
            continue
        sel = extract_npm_selectors([cmd] + [str(a) for a in args])
        if not sel:
            findings.append({"server": name, "reference": str(cmd), "result": "REVIEW",
                             "why": "runner not recognized or no package selector isolated; do not guess"})
            continue
        for kind, raw in sel:
            nm, spec, is_docker = parse_selector(kind, raw)
            res, why = classify_pkg(nm, spec, docker_digest=(kind == "image"))
            findings.append({
                "server": name, "reference": raw, "package": nm, "selector": spec or "(none)",
                "result": res, "why": why,
                "next": "pin the exact version the team reviewed" if res in ("HIGH", "MEDIUM") else ("review source integrity separately" if res == "REVIEW" else "clean direct selector"),
            })
    # verdict global
    levels = [f["result"] for f in findings]
    if any(l in ("HIGH",) for l in levels):
        verdict = "NEEDS-FIX"
    elif any(l == "REVIEW" for l in levels):
        verdict = "NEEDS-REVIEW"
    else:
        verdict = "OK"
    return {
        "service": "mcp-audit", "schema_version": 1,
        "verdict": verdict,
        "servers": len(servers),
        "findings": findings,
        "disclaimer": "Static review only — no server executed, no package resolved. Mutable refs are reproducibility signals, not breach claims.",
    }

if __name__ == "__main__":
    cfg = json.load(sys.stdin)
    print(json.dumps(audit_config(cfg), indent=1))