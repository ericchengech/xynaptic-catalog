#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""test-doc-counters.py — garde-fou hors-ligne contre les compteurs en dur.

llms.txt est genere depuis le catalogue live : il sert de reference. Ce test
verifie que TOUS les endroits qui repetent le total (README, reference par
domaine, pont MCP index.js, package.json) disent la meme chose que llms.txt.

Pourquoi : le generateur n'alignait que trois motifs. README.md annoncait
encore "219 services, 19 domaines" et index.js "219 Xynaptic services" alors
que la prod en servait 220. Un test qui compare les fichiers entre eux attrape
la derive sans reseau, donc il peut tourner en CI.

Usage : python3 scripts/test-doc-counters.py   (exit 1 si divergence)
"""
import os
import re
import sys

DEPOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def lire(chemin):
    with open(os.path.join(DEPOT, chemin), encoding="utf8") as f:
        return f.read()


def extraire_reference():
    llms = lire("llms.txt")
    m = re.search(r"overview \((\d+) total\)", llms)
    if not m:
        sys.exit("test-doc-counters: compteur total introuvable dans llms.txt")
    total = int(m.group(1))
    titres = re.findall(r"^### (.+?) — \d+ services$", llms, re.M)
    domaines = len([t for t in titres if not t.startswith("Newly deployed")])
    if domaines == 0:
        sys.exit("test-doc-counters: aucun domaine lisible dans llms.txt")
    return total, domaines


CAS = [
    # (libelle, fichier, motif, quelle valeur : 0=services 1=domaines)
    ("README — APIs", "README.md", r"\*\*(\d+) pay-per-request data & AI APIs", 0),
    ("README — reference", "README.md", r"\*\*(\d+) services, (\d+) domains\*\*", 0),
    ("README — domaines", "README.md", r"\*\*(\d+) services, (\d+) domains\*\*", 1),
    ("docs/services/README — services", "docs/services/README.md", r"\*\*(\d+) services across (\d+) domains\*\*", 0),
    ("docs/services/README — domaines", "docs/services/README.md", r"\*\*(\d+) services across (\d+) domains\*\*", 1),
    ("index.js — catalogue", "index.js", r"access any of the (\d+) Xynaptic services", 0),
    ("index.js — titre", "index.js", r"from a (\d+)-service x402/USDC catalog", 0),
    ("package.json — description", "package.json", r'"description": "Xynaptic MCP — (\d+) pay-per-request', 0),
]

total, domaines = extraire_reference()
attendus = (total, domaines)
erreurs = 0
print(f"reference llms.txt : {total} services, {domaines} domaines")
for libelle, fichier, motif, idx in CAS:
    m = re.search(motif, lire(fichier))
    if not m:
        print(f"  ABSENT  {libelle} ({fichier}) — motif introuvable")
        erreurs += 1
        continue
    trouve = int(m.group(idx + 1))
    attendu = attendus[idx]
    if trouve != attendu:
        print(f"  ECART   {libelle} : {trouve} au lieu de {attendu}")
        erreurs += 1
    else:
        print(f"  OK      {libelle} : {trouve}")

if erreurs:
    print(f"ECHEC : {erreurs} compteur(s) divergent(s) — lancer scripts/gen-catalog-docs.py")
    sys.exit(1)
print("OK : tous les compteurs s'accordent avec llms.txt")
