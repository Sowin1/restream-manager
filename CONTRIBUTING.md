# Contributing to Restream Manager

Thanks for wanting to help improve the project.

This repository is intentionally small and focused, so the best contributions are the ones that stay easy to review and clearly solve a problem.

## Before You Start

- Read the `README.md` to understand the current installation and usage flow.
- Check whether the change already exists or is being worked on.
- Keep the scope narrow when possible.

## What We Welcome

- Bug fixes
- Small feature improvements
- Documentation updates
- Refactors that make the code easier to understand
- Improvements to Docker, MediaMTX, or FFmpeg integration

## What To Avoid

- Large unrelated refactors mixed into one PR
- Changes that alter the streaming behavior without explaining the impact
- Formatting-only changes unless they improve readability or fix a real issue

## Local Checks

The project uses TypeScript checks as its main validation step.

Run:

```bash
npm run lint
```

If you change application code, it is also a good idea to build the project:

```bash
npm run build
```

## Code Style

- Keep the code straightforward and explicit.
- Prefer small functions with clear responsibilities.
- Match the existing TypeScript style in the repository.
- Use descriptive names for services, handlers, and variables.
- Add comments only when the code would otherwise be hard to understand.

## Commits

- Use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.
- Keep each commit focused on a single logical change when possible.
- Examples: `feat: add auth helper`, `fix: handle empty stream url`, `docs: update installation guide`.

## Documentation Changes

If your change affects setup, environment variables, Docker usage, or API behavior, update the documentation in the same PR.

Good documentation updates usually include:

- `README.md`
- `.env.sample`
- `CONTRIBUTING.md` if the contribution workflow changes

## Pull Requests

A good pull request should:

- Explain what changed
- Explain why it changed
- Mention any behavior impact
- Include the commands you ran locally, if relevant

If the change is user-facing, include a short note about how to verify it.

## Branching And Reviews

- Create feature branches from `dev`, not from `main`.
- Open PRs against the branch used by the project workflow for the area you are changing.
- Keep commits focused and easy to follow.
- If a change touches Docker or streaming behavior, call that out clearly in the PR description.

## Security And Secrets

Never commit real secrets, tokens, or stream keys.

Use `.env` locally and keep `.env.sample` as the reference for required values.

## Need Help?

If something is unclear, open an issue or describe the context directly in the PR. A short explanation of the problem is often enough to get a good review started.
