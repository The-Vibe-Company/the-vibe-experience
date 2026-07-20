<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Deployment workflow

`main` is the public production branch. Merging or pushing to `main` can deploy the site through Vercel.

Do not push to `main`, open a PR targeting `main`, or merge into `main` unless Victor explicitly says the work is ready to go public in production.

Default workflow for this project:

1. Do all work on feature/workspace branches.
2. Keep each feature isolated on its own branch and Supabase preview branch.
3. After Victor explicitly approves a public release, open the feature PR directly against `main`.
4. Merge that PR only after its checks and production approval succeed.

Before any `git push`, `gh pr create`, or `gh pr merge`, state the target branch. If the target is `main`, stop and ask for explicit production approval.
