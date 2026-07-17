# The Vibe Experience

Site Next.js de The Vibe Experience.

## Developpement local

```bash
npm ci
npm run dev
```

### Conductor : environnement complet en un clic

Dans Conductor, le Run `dev` prepare automatiquement un environnement isole pour le worktree :

- Docker Desktop est lance s'il est arrete ;
- Supabase demarre sur les ports voisins de `$CONDUCTOR_PORT` ;
- les migrations et les comptes locaux sont prepares ;
- `.env.local` est genere avec l'URL et la cle publique de cette stack ;
- Next.js demarre sur `$CONDUCTOR_PORT`.

Deux comptes sont disponibles :

| Etat | E-mail | Mot de passe |
| --- | --- | --- |
| Nouveau, sans progression | `nouveau@local.test` | `vibe-local-123` |
| Demo avec un parcours commence | `demo@local.test` | `vibe-local-123` |

Les donnees persistent entre les Runs. Le menu Run propose aussi `reset-db` pour revenir au seed
initial et `stop-db` pour liberer les ressources Docker sans supprimer les donnees. L'archivage du
workspace supprime sa stack et ses volumes, sans toucher aux autres worktrees.

Les memes actions sont accessibles depuis le terminal du workspace Conductor. Utiliser le
`$CONDUCTOR_PORT` deja attribue au workspace ; ne pas le remplacer manuellement :

```bash
npm run conductor:dev
npm run conductor:db:reset
npm run conductor:db:stop
```

Pour utiliser la CLI Supabase hors Conductor (migrations, `status`, `link`, `db push`), passer par
le wrapper qui fournit les ports locaux historiques attendus par `supabase/config.toml` :

```bash
npm run supabase -- status
npm run supabase -- db reset --local
```

Les commandes liees ou distantes gardent leurs garde-fous Supabase habituels ; ne jamais ajouter le
seed local a une base de production.

## Workflow branches et deploiement

`main` est la branche publique de production. Sur ce projet, merger ou pousser sur `main` peut mettre le site en ligne via Vercel.

Regle par defaut : ne jamais pousser, ouvrir une PR, ou merger vers `main` sans validation explicite de Victor pour une mise en production.

Workflow attendu :

1. Chaque agent travaille sur sa branche de workspace.
2. Les PRs de travail se font en draft vers `preview/all-current-work`, pas vers `main`.
3. Les branches de travail sont combinees dans `preview/all-current-work` pour tester une version complete sans deployer en production.
4. Quand Victor valide une mise en ligne publique, une seule PR finale part de `preview/all-current-work` vers `main`.

Avant toute commande `git push`, `gh pr create` ou `gh pr merge`, verifier et annoncer la branche cible. Si la cible est `main`, demander une validation explicite de mise en production.

## Mode public temporaire

Tant que le site n'est pas pret a etre public, `main` sert une page d'attente et le proxy renvoie les routes publiques vers l'accueil.

## Verification

```bash
npm run lint
npm run build
```
