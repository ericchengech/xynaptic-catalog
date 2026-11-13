#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
gen-catalog-docs.py — source unique pour les docs de decouverte du depot catalogue.

Probleme resolu : llms.txt / llms-full.txt / compteurs du README etaient ecrits a la
main, donc ils derivaient a chaque nouveau service (201 annonces contre 220 reels,
aucune section Leisure ni Dev Tools). Ce script les REGENERE depuis les sources qui
ne mentent pas :

  - le catalogue servi   : https://api.xynaptic.io/   (services_count, prix, description)
  - la taxonomie domaine : https://xynaptic.io/docs   (18 domaines, 211 services)
    + https://xynaptic.io/trust                       (Audit & Security, 9 services)

et il aligne les compteurs qui portent le total dans README.md, docs/services/README.md,
llms.txt, llms-full.txt et package.json.

Modes
  (defaut)        regenere les fichiers dans le depot
  --check         n'ecrit rien, exit 1 si un fichier diverge de ce qui serait genere
  --offline       utilise les fichiers de /tmp au lieu du reseau

Ce qui n'est PAS touche : la prose redigee a la main (intro, quick start, notes).
Seules les zones balisees sont reecrites :

  llms.txt        : "## Services by domain" -> jusqu'a la section suivante
  llms-full.txt   : fichier entier (corps genere)

Un service present en prod mais absent des deux pages n'est pas perdu : il atterrit
dans une section "Newly deployed — not yet categorised", ce qui rend l'ecart visible
au lieu de le cacher.
"""
import json, os, re, sys, time, urllib.request, html

DEPOT = os.path.expanduser("~/xynaptic/CURRENT/xynaptic-catalog")
CATALOGUE = "https://api.xynaptic.io/"
DOCS = "https://xynaptic.io/docs"
TRUST = "https://xynaptic.io/trust"
OFF_CAT = "/tmp/xynaptic-catalog.json"
OFF_DOC = "/tmp/xynaptic-docs.html"
OFF_TRUST = "/tmp/xynaptic-trust.html"

MODE_CHECK = "--check" in sys.argv
OFFLINE = "--offline" in sys.argv


def lire(url, cache):
    if OFFLINE:
        return open(cache, encoding="utf8", errors="replace").read()
    # cache-buster obligatoire : le site est servi en public, max-age=300, et sans ca
    # le generateur relit la version d'avant le deploiement (209 services au lieu de 220).
    sep = "&" if "?" in url else "?"
    url = f"{url}{sep}cb={int(time.time())}"
    req = urllib.request.Request(url, headers={"User-Agent": "xynaptic-docgen/1.1"})
    with urllib.request.urlopen(req, timeout=45) as r:
        return r.read().decode("utf8", "replace")


def _eps(bloc, cat):
    """[(service, prix)] d'une section, dans l'ordre de la page.

    Certaines fiches n'ont pas de <span class="ep-price"> : les gratuits (ticket-status,
    watch-status). On prend alors le prix du catalogue, a 0 s'il n'y en a pas. Une fiche
    sans prix n'est donc jamais perdue — c'est ce qui faisait dire "2 services absents".
    """
    paires = dict(re.findall(r'>([a-z0-9-]+)</a><span class="ep-price mono">\$([0-9.]+)', bloc))
    out = []
    for n in re.findall(r'class="ep-name"[^>]*>([a-z0-9-]+)</a>', bloc):
        if n in paires:
            out.append((n, paires[n]))
        else:
            s_ = cat.get(n) or {}
            p_ = s_.get("price_usd", 0)
            out.append((n, ("%g" % float(p_)) if p_ else "0"))
    return out


def taxonomie(page_docs, page_trust="", cat=None):
    """[(titre, [(service, prix)])] depuis /docs (+ la section Audit, desormais sur /docs)."""
    cat = cat or {}
    out = []
    for bloc in re.findall(r'<section id="dom-[^"]*" class="sec">(.*?)</section>', page_docs, re.S):
        m = re.search(r"<h2>(.*?)</h2>", bloc)
        if not m:
            continue
        titre = html.unescape(re.sub("<[^>]+>", "", m.group(1))).strip()
        out.append((titre, _eps(bloc, cat)))
    # Audit & Security vit sur /docs depuis le 13/11, et sur /trust sinon : on regarde
    # les deux pages, sans jamais dedoubler.
    for page in (page_docs, page_trust):
        if not page:
            continue
        for bloc in re.findall(r'<section id="trust-services".*?</section>', page, re.S):
            m = re.search(r"<h2>(.*?)</h2>", bloc)
            if not m:
                continue
            titre = html.unescape(re.sub("<[^>]+>", "", m.group(1))).strip()
            out.append((titre, _eps(bloc, cat)))
    return out


def nom_propre(titre):
    n = re.sub(r"^[^\w]+", "", titre)                     # retire l'emoji
    n = re.sub(r"\s+—\s+[0-9]+ services?$", "", n)       # retire le compte du titre
    return n.strip()


def ancre(nom):
    return re.sub(r"[^a-z0-9]+", "-", nom.lower()).strip("-")


def section_llms_txt(catalogue, taxo):
    total = catalogue["services_count"]
    cat = {s["service"]: s for s in catalogue["services"]}
    lignes = [f"## Services by domain — overview ({total} total)", ""]
    vus = set()
    for titre, eps in taxo:
        if not eps:
            continue
        nom = nom_propre(titre)
        ex = ", ".join(f"{n} (${p})" for n, p in eps[:4])
        lignes += [f"### {nom} — {len(eps)} services",
                   f"Examples: {ex}",
                   f"Details: https://xynaptic.io/llms-full.txt#{ancre(nom)}",
                   ""]
        vus.update(n for n, _ in eps)
    orphelins = [s for s in cat if s not in vus]
    if orphelins:
        lignes += [f"### Newly deployed — not yet categorised — {len(orphelins)} services",
                   "Live and paid, but not yet placed in a domain on https://xynaptic.io/docs. "
                   "Discovery must never hide a working endpoint: this block existing means a "
                   "surface is behind the catalogue.", ""]
        for s in orphelins:
            lignes.append(f"- {s} (${cat[s]['price_usd']}) — {cat[s]['endpoint']}")
        lignes.append("")
    return "\n".join(lignes).rstrip() + "\n"


def corps_llms_full(catalogue, taxo):
    total = catalogue["services_count"]
    cat = {s["service"]: s for s in catalogue["services"]}
    lignes = [f"> Complete reference for AI agents. {total} live services. "
              "Prices $0.001-$0.50, USDC via x402 (HTTP 402). No API key. "
              "Every response Ed25519-signed. Verify at https://xynaptic.io/trust",
              "",
              "Generated from the live catalogue by scripts/xynaptic/gen-catalog-docs.py — "
              "do not edit by hand, run the generator.",
              "",
              "## Quick index", ""]
    vus = set()
    for titre, eps in taxo:
        if not eps:
            continue
        nom = nom_propre(titre)
        lignes.append(f"- [{nom}](#{ancre(nom)}) — {len(eps)} services")
        vus.update(n for n, _ in eps)
    orphelins = [s for s in cat if s not in vus]
    if orphelins:
        lignes.append(f"- [Newly deployed](#newly-deployed) — {len(orphelins)} services")
    lignes.append("")
    for titre, eps in taxo:
        if not eps:
            continue
        nom = nom_propre(titre)
        lignes += [f'<a id="{ancre(nom)}"></a>', f"## {nom} ({len(eps)})", ""]
        for n, p in eps:
            s = cat.get(n)
            if not s:
                lignes += [f"### {n} — ${p}", "",
                           "Live on a docs page but missing from the machine catalogue: "
                           "the two surfaces disagree, fix it before it costs a buyer.", ""]
                continue
            lignes += [f"### {n} — ${p}", "", s["description"], "",
                       "```", f"GET https://api.xynaptic.io{s['endpoint']}", "```", ""]
    if orphelins:
        lignes += ['<a id="newly-deployed"></a>', f"## Newly deployed ({len(orphelins)})", "",
                   "Live and paid, but not yet placed in a domain on the docs page.", ""]
        for s in orphelins:
            lignes += [f"### {s} — ${cat[s]['price_usd']}", "",
                       cat[s]["description"], "",
                       "```", f"GET https://api.xynaptic.io{cat[s]['endpoint']}", "```", ""]
    return "\n".join(lignes).rstrip() + "\n"


def remplacer_fichier(chemin, nouveau, rapports):
    ancien = open(chemin, encoding="utf8").read() if os.path.exists(chemin) else ""
    if ancien == nouveau:
        rapports.append(("=", chemin))
        return False
    rapports.append(("~" if ancien else "+", chemin))
    if not MODE_CHECK:
        open(chemin, "w", encoding="utf8").write(nouveau)
    return True


def compter(chemin, motif, valeur, rapports):
    """Aligne un compteur porte par une phrase du depot (jamais une reecriture)."""
    chemin = os.path.join(DEPOT, chemin)
    s = open(chemin, encoding="utf8").read() if os.path.exists(chemin) else ""
    neuf, n = re.subn(motif, lambda m: m.group(1) + str(valeur) + m.group(3), s)
    if n == 0:
        rapports.append(("?", f"{chemin} — motif de compteur absent ({motif})"))
        return False
    if neuf == s:
        rapports.append(("=", f"{chemin} (compteur {valeur} deja juste)"))
        return False
    rapports.append(("~", f"{chemin} (compteur -> {valeur}, {n} endroit(s))"))
    if not MODE_CHECK:
        open(chemin, "w", encoding="utf8").write(neuf)
    return True


def main():
    catalogue = json.loads(lire(CATALOGUE, OFF_CAT))
    taxo = taxonomie(lire(DOCS, OFF_DOC), lire(TRUST, OFF_TRUST), cat=
                     {s["service"]: s for s in catalogue["services"]})
    if not taxo:
        print("ERREUR : aucun domaine lu sur /docs — rien n'est ecrit.", file=sys.stderr)
        return 2
    total = catalogue["services_count"]
    couverts = sum(len(e) for _, e in taxo)
    print(f"catalogue {total} services | pages {len(taxo)} domaines, {couverts} services")
    if couverts > total:
        print(f"ERREUR : les pages listent {couverts} services pour {total} au catalogue "
              "(une page annonce un service qui n'existe pas).", file=sys.stderr)
        return 2
    if couverts < total:
        print(f"ATTENTION : {total - couverts} service(s) du catalogue absents des pages "
              "— ils iront dans la section \"Newly deployed\".")

    rapports = []
    change = False

    p = os.path.join(DEPOT, "llms.txt")
    s = open(p, encoding="utf8").read()
    bloc = section_llms_txt(catalogue, taxo)
    m = re.search(r"^## Services by domain.*?(?=^## )", s, re.S | re.M)
    if not m:
        print("ERREUR : zone '## Services by domain' introuvable dans llms.txt", file=sys.stderr)
        return 2
    change |= remplacer_fichier(p, s[:m.start()] + bloc + s[m.end():], rapports)

    p = os.path.join(DEPOT, "llms-full.txt")
    change |= remplacer_fichier(p, corps_llms_full(catalogue, taxo), rapports)

    change |= compter("README.md", r"(\*\*)([0-9]+)( pay-per-request data & AI APIs)", total, rapports)
    change |= compter("docs/services/README.md", r"(\*\*)([0-9]+)( services across [0-9]+ domains\*\*)", total, rapports)
    change |= compter("package.json", r'("description": "Xynaptic MCP — )([0-9]+)( pay-per-request)', total, rapports)

    for tag, f in rapports:
        print(f"  {tag} {f}")
    if MODE_CHECK:
        if change:
            print("DIVERGENCE : le depot est en retard sur le catalogue (relancer sans --check).")
            return 1
        print("OK : depot aligne sur le catalogue live.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
