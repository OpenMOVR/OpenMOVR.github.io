# Branch Strategy

## Overview

OpenMOVR uses a modular branch strategy designed for community contributions. Each major section of the site has its own branch, allowing focused development and clear ownership.

## Branch Structure

### Protected Branches

#### `main`
- **Purpose**: Production website - homepage, shared assets
- **Protection**: CODEOWNERS can push; others require PR + approval
- **Contents**:
  - Homepage (`index.html`)
  - Shared assets (`css/`, `js/`, `assets/`, `components/`)
  - Configuration files
- **Deployment**: Auto-deploys to GitHub Pages

#### `pilot-landing-page`
- **Purpose**: MOVR 2.0 Pilot enrollment system
- **Protection**: CODEOWNERS can push; others require PR + approval
- **Contents**:
  - `pilot/index.html` - Enrollment landing page
  - `pilot/script.js` - Form handling
  - `pilot/*.txt` - Email templates
- **Merge Pattern**: Merges into `main` when pilot updates are ready

#### `openmovr-docs`
- **Purpose**: Documentation system
- **Protection**: CODEOWNERS can push; others require PR + approval
- **Contents**:
  - `docs/index.html` - MOVR 2.0 (Updates, Vision, History, FAQ)
  - `docs/developer.html` - Developer documentation
  - `docs/movr-datahub-analytics.html` - Python library docs
  - `docs/css/docs.css` - Documentation styles
- **Merge Pattern**: Merges into `main` when docs are production-ready

#### `movr-viewer`
- **Purpose**: MOVR Viewer research tools
- **Protection**: CODEOWNERS can push; others require PR + approval
- **Contents**:
  - `movr-viewer/index.html` - Viewer home page
  - `movr-viewer/data_dictionary_viewer.html` - Dictionary explorer
  - `movr-viewer/*.json` - Data files
- **Merge Pattern**: Merges into `main` when viewer updates are stable

#### `gsoc`
- **Purpose**: Google Summer of Code program page
- **Protection**: CODEOWNERS can push; others require PR + approval
- **Contents**:
  - `gsoc.html` - GSoC program page
  - Related GSoC assets
- **Merge Pattern**: Merges into `main` when GSoC updates are ready

### Development Branches

#### Feature Branches (`feature/*`)
- **Naming**: `feature/short-description`
- **Examples**:
  - `feature/update-faq-content`
  - `feature/add-dictionary-filter`
  - `feature/gsoc-2026-projects`
- **Lifespan**: Created for specific features, deleted after merge
- **Base**: Branch from the appropriate protected branch
- **Merge Target**: Back to the branch you started from

#### Hotfix Branches (`hotfix/*`)
- **Naming**: `hotfix/issue-description`
- **Purpose**: Urgent fixes for production issues
- **Base**: `main`
- **Merge**: Direct to `main` after quick review

## Workflow

### Which Branch Do I Use?

| Working on... | Branch from | PR target |
|---------------|-------------|-----------|
| Homepage, shared CSS/JS | `main` | `main` |
| Pilot enrollment (`pilot/`) | `pilot-landing-page` | `pilot-landing-page` |
| Documentation (`docs/`) | `openmovr-docs` | `openmovr-docs` |
| MOVR Viewer (`movr-viewer/`) | `movr-viewer` | `movr-viewer` |
| GSoC page (`gsoc.html`) | `gsoc` | `gsoc` |

### Contributing to Pilot Enrollment

```bash
git checkout pilot-landing-page
git pull origin pilot-landing-page
git checkout -b feature/update-enrollment-form

# Make changes to pilot/
git add .
git commit -m "pilot: Add new form field"
git push origin feature/update-enrollment-form

# Open PR targeting pilot-landing-page
```

### Contributing to Documentation

```bash
git checkout openmovr-docs
git pull origin openmovr-docs
git checkout -b feature/update-faq

# Make changes to docs/
git add .
git commit -m "docs: Update FAQ with new questions"
git push origin feature/update-faq

# Open PR targeting openmovr-docs
```

### Contributing to MOVR Viewer

```bash
git checkout movr-viewer
git pull origin movr-viewer
git checkout -b feature/add-search-filter

# Make changes to movr-viewer/
git add .
git commit -m "viewer: Add field search filter"
git push origin feature/add-search-filter

# Open PR targeting movr-viewer
```

### Contributing to GSoC Page

```bash
git checkout gsoc
git pull origin gsoc
git checkout -b feature/update-project-list

# Make changes to gsoc.html
git add .
git commit -m "gsoc: Update 2026 project ideas"
git push origin feature/update-project-list

# Open PR targeting gsoc
```

### Syncing Feature Branches to Main

When changes are production-ready, merge the feature branch into `main`:

```bash
# Example: Sync docs to main
git checkout main
git pull origin main
git merge origin/openmovr-docs
git push origin main
```

Or create a PR from `openmovr-docs` → `main` for review.

## Branch Protection Rules

### For All Protected Branches (`main`, `pilot-landing-page`, `openmovr-docs`, `movr-viewer`, `gsoc`):

**CODEOWNERS** (maintainers):
- Can push directly to protected branches
- Can merge PRs without additional approval

**Contributors**:
- Must create feature branches
- Must submit Pull Requests
- Require 1 approval from CODEOWNER before merge

See GitHub setup instructions in README for configuration details.

## Commit Message Guidelines

### Format
```
component: Short description

Longer explanation if needed.
```

### Component Prefixes

- `docs:` - Documentation changes
- `viewer:` - MOVR Viewer changes
- `gsoc:` - GSoC page changes
- `pilot:` - Pilot enrollment changes
- `home:` - Homepage changes
- `style:` - CSS/styling changes
- `fix:` - Bug fixes
- `chore:` - Maintenance tasks

### Examples

```
docs: Add MOVR 2.0 timeline to FAQ

Addresses common question about launch dates.
```

```
viewer: Implement field search functionality

Allows researchers to quickly find specific fields
in the data dictionary.
```

## Code Review Guidelines

### For CODEOWNERS
- Review PRs promptly
- Provide constructive feedback
- Ensure changes align with project goals
- Verify no sensitive data is committed

### For Contributors
- Keep PRs focused (one feature/fix per PR)
- Test locally before submitting
- Respond to feedback promptly
- Update documentation if needed

## Questions?

Contact: mdamovr@mdausa.org or andre.paredes@ymail.com
