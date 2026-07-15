<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Deployment workflow

`main` is the public production branch. Merging or pushing to `main` can deploy the site through Vercel.

Do not push to `main`, open a PR targeting `main`, or merge into `main` unless Victor explicitly says the work is ready to go public in production.

Default workflow for this project:

1. Do all work on feature/workspace branches.
2. Open draft PRs against `preview/all-current-work`, not `main`.
3. Merge or combine feature branches into `preview/all-current-work` to review all current work together.
4. Only after Victor explicitly approves a public release, open or merge a final PR from `preview/all-current-work` into `main`.

Before any `git push`, `gh pr create`, or `gh pr merge`, state the target branch. If the target is `main`, stop and ask for explicit production approval.
