# Contributing to OpenMOVR

Thank you for your interest in contributing to OpenMOVR! This project is an open science initiative focused on advancing rare disease research through open source tools and community collaboration.

## Quick Start

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone git@github.com:YOUR-USERNAME/OpenMOVR.github.io.git
   cd OpenMOVR.github.io
   ```
3. **Choose the right branch** (see table below)
4. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. **Make your changes** and test locally
6. **Commit with clear messages**:
   ```bash
   git commit -m "component: Description of what you changed"
   ```
7. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Open a Pull Request** targeting the correct branch

## Which Branch Do I Use?

| Working on... | Branch from | PR target |
|---------------|-------------|-----------|
| Homepage, shared CSS/JS | `main` | `main` |
| Pilot enrollment (`pilot/`) | `pilot-landing-page` | `pilot-landing-page` |
| Documentation (`docs/`) | `openmovr-docs` | `openmovr-docs` |
| MOVR Viewer (`movr-viewer/`) | `movr-viewer` | `movr-viewer` |
| GSoC page (`gsoc.html`) | `gsoc` | `gsoc` |

See [BRANCH_STRATEGY.md](./BRANCH_STRATEGY.md) for complete details.

## Code of Conduct

This is a community-driven project serving patients, families, and researchers. Please be:
- **Respectful**: Value diverse perspectives
- **Collaborative**: Help others learn and grow
- **Patient-focused**: Remember this impacts real people with rare diseases
- **Professional**: Maintain high standards in code and communication

## What Can I Contribute?

### For Developers
- Bug fixes
- New features for the MOVR Viewer applications
- Improvements to documentation
- Accessibility enhancements
- Mobile responsiveness fixes

### For Researchers & Domain Experts
- Documentation improvements
- Data dictionary enhancements
- User experience feedback

### For Designers
- UI/UX improvements
- Accessibility audits
- Mobile design enhancements

## Development Setup

### Local Testing

```bash
# Launch local development server
./launch.sh

# Or manually
python3 -m http.server 8000

# Visit http://localhost:8000
```

### File Structure

```
OpenMOVR.github.io/
├── index.html              # Homepage (main branch)
├── gsoc.html               # GSoC program (gsoc branch)
├── docs/                   # Documentation (openmovr-docs branch)
│   ├── index.html          # MOVR 2.0 page
│   ├── developer.html      # Developer docs
│   └── movr-datahub-analytics.html
├── pilot/                  # Pilot enrollment (pilot-landing-page branch)
│   ├── index.html
│   └── script.js
├── movr-viewer/            # MOVR Viewer (movr-viewer branch)
│   ├── index.html
│   └── data_dictionary_viewer.html
├── css/                    # Shared styles (main branch)
├── js/                     # Shared JavaScript (main branch)
├── assets/                 # Images, logos (main branch)
└── components/             # Reusable components (main branch)
```

## Pull Request Guidelines

### Before Submitting

- [ ] Test your changes locally (`./launch.sh`)
- [ ] Test on mobile (or use browser dev tools)
- [ ] Update documentation if you changed functionality
- [ ] Keep PRs focused (one feature/fix per PR)
- [ ] Target the correct branch (see table above)

### PR Title Format

Use clear, descriptive titles:
- `docs: Add FAQ section for MOVR 2.0 timeline`
- `viewer: Fix search filter on mobile`
- `gsoc: Update 2026 project descriptions`

### PR Description Template

```markdown
## What does this PR do?
Brief description of the changes.

## Why are we making this change?
Explain the problem or feature.

## How to test
1. Step-by-step instructions
2. Include edge cases

## Screenshots (if UI changes)
Before/after screenshots.

## Checklist
- [ ] Tested locally
- [ ] Tested on mobile
- [ ] Documentation updated (if needed)
- [ ] Targeting correct branch
```

## Commit Message Guidelines

### Format

```
component: Short description (50 chars or less)

Longer explanation if needed.
```

### Component Prefixes

- `docs:` - Documentation pages
- `viewer:` - MOVR Viewer tools
- `gsoc:` - GSoC program page
- `pilot:` - Pilot enrollment
- `home:` - Homepage changes
- `style:` - CSS/styling
- `fix:` - Bug fixes
- `chore:` - Maintenance

## Contribution Areas

### Documentation (`openmovr-docs` branch)

The docs use a tabbed interface:
- `docs/index.html` - MOVR 2.0 (Updates, Vision, History, FAQ tabs)
- `docs/developer.html` - Developer Docs (repos, MOVR Viewer tabs)
- `docs/movr-datahub-analytics.html` - Python library docs

### MOVR Viewer (`movr-viewer` branch)

Research tools for data exploration:
- `movr-viewer/index.html` - Viewer home page
- `movr-viewer/data_dictionary_viewer.html` - Dictionary explorer
- `*.json` - Data files (be careful editing)

### GSoC Page (`gsoc` branch)

Google Summer of Code program:
- `gsoc.html` - Program details, projects, mentors

### Pilot Enrollment (`pilot-landing-page` branch)

MOVR 2.0 enrollment system:
- `pilot/index.html` - Enrollment landing page
- `pilot/script.js` - Form handling
- Handles PII - never commit real patient data

### Homepage (`main` branch)

- `index.html` - Homepage
- `css/`, `js/`, `assets/`, `components/` - Shared resources

## Style Guidelines

### HTML
- Use semantic HTML5 elements
- Include ARIA labels for accessibility
- 2-space indentation

### CSS
- Use CSS variables (see `css/main.css`, `docs/css/docs.css`)
- Mobile-first responsive design

### JavaScript
- Vanilla JavaScript (no frameworks)
- Add comments for complex logic

## Questions?

- **Technical**: andre.paredes@ymail.com
- **MDA/General**: mdamovr@mdausa.org
- **GitHub Issues**: Open an issue for bugs or questions

---

**New to open source?** Welcome! Don't hesitate to ask questions.
