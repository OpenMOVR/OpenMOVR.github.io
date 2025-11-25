# Branch Strategy

## Overview

OpenMOVR uses a simplified branch strategy designed for a community-driven website with modular web applications. Our approach balances collaboration with stability.

## Branch Structure

### Protected Branches

#### `main`
- **Purpose**: Production website (homepage, documentation, pilot program, GSoC)
- **Protection**: Requires PR + 1 approval
- **Contents**:
  - Homepage (`index.html`)
  - Documentation system (`docs/`)
  - Pilot enrollment (`pilot/`)
  - GSoC program page (`gsoc.html`)
  - Shared assets (`css/`, `js/`, `assets/`, `components/`)
  - Configuration (`config.js`, `README.md`)
- **Deployment**: Auto-deploys to GitHub Pages
- **Updates**: Content changes, documentation updates, design improvements

#### `viewer-apps`
- **Purpose**: Modular data analysis and research web applications
- **Protection**: Requires PR + 1 approval
- **Contents**:
  - MOVR Viewer (Data Dictionary Viewer)
  - Vendor Mapping Viewer
  - Future analytical tools
- **Independence**: Does not need to pull all homepage/marketing changes
- **Merge Pattern**: Merges into `main` when viewer updates are production-ready

### Development Branches

#### Feature Branches (`feature/*`)
- **Naming**: `feature/short-description` (e.g., `feature/update-pilot-form`, `feature/add-faq-section`)
- **Lifespan**: Created for specific features, deleted after merge
- **Base**: Branch from `main` or `viewer-apps` depending on what you're working on
- **Merge Target**: Back to the branch you started from

#### Hotfix Branches (`hotfix/*`)
- **Naming**: `hotfix/issue-description` (e.g., `hotfix/mobile-navigation`)
- **Purpose**: Urgent fixes for production issues
- **Base**: `main`
- **Merge**: Direct to `main` after quick review

## Workflow

### Contributing to Website (Main Branch)

1. **Create feature branch**:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and commit**:
   ```bash
   git add .
   git commit -m "Clear description of changes"
   ```

3. **Push and create PR**:
   ```bash
   git push origin feature/your-feature-name
   ```
   Then open a Pull Request on GitHub targeting `main`

4. **Code review**: Wait for approval from a CODEOWNER

5. **Merge**: Once approved, merge using "Squash and merge" to keep history clean

### Contributing to Viewer Apps

1. **Create feature branch**:
   ```bash
   git checkout viewer-apps
   git pull origin viewer-apps
   git checkout -b feature/viewer-enhancement
   ```

2. **Follow same process as above**, but target `viewer-apps` in your PR

3. **When ready for production**: Create a PR from `viewer-apps` → `main`

### Syncing Viewer Apps to Main

Viewer apps should merge into main periodically when updates are stable:

```bash
git checkout main
git pull origin main
git checkout -b feature/sync-viewer-updates
git merge origin/viewer-apps
# Resolve any conflicts
git push origin feature/sync-viewer-updates
# Create PR: feature/sync-viewer-updates → main
```

## Branch Protection Rules

Configure these settings in GitHub:

### For `main` and `viewer-apps`:
- ✅ Require pull request before merging
- ✅ Require 1 approval
- ✅ Require status checks to pass (if CI/CD is added later)
- ✅ Require conversation resolution before merging
- ✅ Do not allow bypassing the above settings
- ❌ Allow force pushes (disabled)
- ❌ Allow deletions (disabled)

## Commit Message Guidelines

Use clear, descriptive commit messages:

**Good**:
- `Add FAQ section to pilot enrollment page`
- `Fix mobile navigation overflow on iOS`
- `Update vendor mapping viewer with new data`

**Bad**:
- `updates`
- `fix stuff`
- `wip`

### Format
```
[Component] Short description

Longer explanation if needed.
Explain WHY, not WHAT (code shows what).
```

**Examples**:
```
pilot: Add age group field to enrollment form

Required for demographic analysis and IRB compliance.
```

```
viewer: Implement session save/load functionality

Researchers can now save their review progress and resume later,
addressing feedback from medical advisory board.
```

## Code Review Guidelines

### For Reviewers
- Check that changes match the PR description
- Verify no sensitive data (API keys, emails, etc.) is committed
- Ensure mobile responsiveness if UI changes
- Test locally if possible
- Approve if looks good, or request changes with specific feedback

### For Contributors
- Keep PRs focused (one feature/fix per PR)
- Update README or docs if you change functionality
- Test on mobile and desktop before submitting
- Respond to review feedback promptly
- Don't force-push after review starts (makes tracking changes hard)

## Release Process

Since this is a static site on GitHub Pages:
- **Merging to `main`** = immediate deployment
- Tag releases for significant milestones:
  ```bash
  git tag -a v1.0.0 -m "Initial clean baseline"
  git push origin v1.0.0
  ```

## Questions?

Contact: mdamovr@mdausa.org or open a discussion on GitHub.
