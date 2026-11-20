# Branch Strategy

OpenMOVR keeps one long-lived branch, `main`. Everything else is a short-lived branch that merges into it and is then deleted.

## `main`

- The live site. Every push to `main` deploys to [openmovr.github.io](https://openmovr.github.io) through GitHub Pages.
- CODEOWNERS can push directly. Everyone else opens a pull request and gets an approval.
- Two checks run on every push and pull request. `attribution-check` fails on AI attribution in commit messages or pull request descriptions, and `link-check` fails on broken internal links or anchors.

## Working branches

| Prefix | Use for | Example |
|---|---|---|
| `feature/` | New pages, sections or tools | `feature/front-door-translations` |
| `fix/` | Corrections to copy, figures or links | `fix/progress-population-note` |
| `docs/` | Developer docs and README changes | `docs/analytics-quickstart` |

1. Branch from an up-to-date `main`.
2. Keep each branch to one change, and preview it locally with `python3 -m http.server 8000`.
3. Open a pull request into `main`. Say what changed and, for any figure, its population and source.
4. Delete the branch after it merges.

## Commit messages

Write a short, plain summary of what changed, for example `Progress: show pilot counts as ranges`. Do not add `Co-Authored-By` lines or "Generated with" footers for Claude, Copilot or any other AI assistant.
