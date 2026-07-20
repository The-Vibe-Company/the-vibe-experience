<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Workspace startup

At the beginning of every new Conductor workspace:

1. Confirm the workspace is on its feature branch, never on `main`.
2. Let the Conductor setup script run `npm ci`. If dependencies are missing, run `npm ci` before any project command.
3. Before testing the app or using the database, start the default Conductor Run `dev`. From a workspace terminal, use `npm run conductor:dev` with the `CONDUCTOR_PORT` already assigned by Conductor. Do not use bare `npm run dev` for the first start.
4. The `dev` command creates or wakes the Supabase branch associated with the Git branch, applies local migrations, creates the workspace test accounts, writes the branch's public credentials to `.env.local`, and starts Next.js on `CONDUCTOR_PORT`.
5. If the Supabase CLI is not authenticated, stop and ask the user to run `npm run supabase -- login`. Never substitute production credentials or connect the workspace to the production database.

Workspace database rules:

- Keep schema changes in new timestamped files under `supabase/migrations/`. Running `conductor:dev` applies pending migrations to this workspace branch.
- If an already-applied migration was edited or the workspace needs a clean dataset, use the Conductor Run `reset-db` or `npm run conductor:db:reset`. This deletes and recreates only the current workspace's Supabase branch.
- Use `pause-db` or `npm run conductor:db:pause` to stop compute while preserving workspace data.
- Archiving the workspace deletes its Supabase branch and removes the generated Supabase entries from `.env.local`.
- Never run a linked database push, reset, seed, or destructive command against the parent project `qzqtbaepzdmsvgfupsdm` during normal workspace development.

# Deployment workflow

`main` is the public production branch. Merging or pushing to `main` can deploy the site through Vercel.

Do not push to `main`, open a PR targeting `main`, or merge into `main` unless Victor explicitly says the work is ready to go public in production.

Default workflow for this project:

1. Do all work on feature/workspace branches.
2. Keep each feature isolated on its own branch and Supabase preview branch.
3. After Victor explicitly approves a public release, open the feature PR directly against `main`.
4. Merge that PR only after its checks and production approval succeed.

Before any `git push`, `gh pr create`, or `gh pr merge`, state the target branch. If the target is `main`, stop and ask for explicit production approval.
