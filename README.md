# The Vibe Experience

Site Next.js de The Vibe Experience.

## Developpement local

```bash
npm ci
npm run dev
```

### Conductor : environnement complet en un clic

Dans Conductor, le Run `dev` prepare automatiquement une branche Supabase hebergee et isolee pour
la branche Git du worktree :

- la branche distante est creee ou reveillee sans copier les donnees de production ;
- les migrations locales et les comptes de test sont prepares ;
- `.env.local` est genere avec l'URL et la cle publique de cette branche ;
- Next.js demarre sur `$CONDUCTOR_PORT`.

La CLI doit etre connectee a un compte ayant acces au projet Supabase :

```bash
npm run supabase -- login
```

Deux comptes sont disponibles :

| Etat | E-mail | Mot de passe |
| --- | --- | --- |
| Nouveau, sans progression | `nouveau@local.test` | `vibe-local-123` |
| Demo avec un parcours commence | `demo@local.test` | `vibe-local-123` |

Les donnees persistent entre les Runs. Le menu Run propose aussi `reset-db` pour supprimer puis
recreer la branche depuis les migrations, et `pause-db` pour suspendre son compute sans supprimer
les donnees. L'archivage du workspace supprime uniquement sa branche Supabase.

Les memes actions sont accessibles depuis le terminal du workspace Conductor. Utiliser le
`$CONDUCTOR_PORT` deja attribue au workspace ; ne pas le remplacer manuellement :

```bash
npm run conductor:dev
npm run conductor:db:reset
npm run conductor:db:pause
```

Supabase local reste disponible hors Conductor pour travailler hors ligne ou generer des
migrations. Le wrapper utilise les ports historiques de `supabase/config.toml` :

```bash
npm run supabase -- status
npm run supabase -- db reset --local
```

Les commandes liees ou distantes gardent leurs garde-fous Supabase habituels. Ne jamais executer le
seed de workspace sur la base de production.

## Workflow branches et deploiement

`main` est la branche publique de production. Sur ce projet, merger ou pousser sur `main` peut mettre le site en ligne via Vercel.

Regle par defaut : ne jamais pousser, ouvrir une PR, ou merger vers `main` sans validation explicite de Victor pour une mise en production.

Workflow attendu :

1. Chaque agent travaille sur sa branche de workspace.
2. Chaque branche Git utilise sa propre branche Supabase de preview.
3. Quand Victor valide une mise en ligne publique, la branche ouvre sa PR directement vers `main`.
4. La PR est mergee uniquement apres validation de ses checks et de la mise en production.

Avant toute commande `git push`, `gh pr create` ou `gh pr merge`, verifier et annoncer la branche cible. Si la cible est `main`, demander une validation explicite de mise en production.

## Mode public temporaire

Tant que le site n'est pas pret a etre public, `main` sert une page d'attente et le proxy renvoie les routes publiques vers l'accueil.

## Verification

```bash
npm run lint
npm run build
```
