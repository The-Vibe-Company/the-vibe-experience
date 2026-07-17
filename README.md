# The Vibe Experience

Site Next.js de The Vibe Experience.

## Developpement local

```bash
npm ci
npm run dev
```

Dans Conductor, le script `dev` utilise automatiquement `$CONDUCTOR_PORT`.

## Workflow branches et deploiement

`main` est la branche publique de production. Sur ce projet, merger ou pousser sur `main` peut mettre le site en ligne via Vercel.

Regle par defaut : ne jamais pousser, ouvrir une PR, ou merger vers `main` sans validation explicite de Victor pour une mise en production.

Workflow attendu :

1. Chaque agent travaille sur sa branche de workspace.
2. Les PRs de travail se font en draft vers `preview/all-current-work`, pas vers `main`.
3. Les branches de travail sont combinees dans `preview/all-current-work` pour tester une version complete sans deployer en production.
4. Quand Victor valide une mise en ligne publique, une seule PR finale part de `preview/all-current-work` vers `main`.

Avant toute commande `git push`, `gh pr create` ou `gh pr merge`, verifier et annoncer la branche cible. Si la cible est `main`, demander une validation explicite de mise en production.

## Verification

```bash
npm run lint
npm run build
```
