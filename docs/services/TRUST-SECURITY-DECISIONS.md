# Trust & Security — build decisions (04/11, Koi après fiches Ken)

## Décisions sur les ambiguïtés flaggées par Ken

1. **repo-security-audit file count** : le seuil 20 compte les FICHIERS REVIEWABLES (code + configs + docs), binaires/images/lockfiles/vendored exclus du comptage. Décidé build.
2. **domain-ownership-proof pricing** : $0.25 = le CRAWL (la donnée collectée est le produit). Un verify failed reste un 200 avec status:failed — Ken a documenté correctement. Un re-crawl réussi dans 24h sur le même challenge = gratuit (fairness client).
3. **domain-ownership-proof subscription** : $2/mois = 1 domaine illimité (challenges à volonté). Domains additionnels = +$2/mois chacun. Pas d'illimité multi-domaine au même prix.
4. **security-sim ownership binding** : le champ `ownership_proof` (certificate ID de domain-ownership-proof) accepté. Mécanisme : on vérifie le certificate ID auprès de l'oracle à chaque scan — si le domaine ne matche pas la target, refus. Bonne invention Ken, adoptée.
5. **security-sim cadence** : $5/mois = 1 fuzz-brief par semaine sur 1 target enregistrée. Target additionnelle = +$5/mois. Re-scan à la demande inclus dans la fenêtre hebdo.
6. **wallet-poisoning-watch** : $5/mois = 1 wallet sur 1 réseau (champ network). Multi-réseau = multi-abonnement (simplicité de pricing + séparation des alertes). Alertes : webhook client (l'appelant enregistre une URL de callback) + polling du status endpoint en fallback. Le POST /v1/...register accepte { wallet, network, webhook_url }.
7. **Endpoint naming** : convention /v1/<service> confirmée partout.

## Ordre de build confirmé
mcp-audit (/v1/mcp-audit LIVE 14/11) -> repo-security-audit -> domain-ownership-proof -> wallet-poisoning-watch -> security-sim.

## Statut
- mcp-audit : LIVE (~13:42, premier achat réel via sub QA : 25 unités débitées, verdict NEEDS-FIX correct)
- 4 autres : fiches en place sur GitHub (bannières UPCOMING), builds à venir.
