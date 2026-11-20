# Contributing to OpenMOVR

Thank you for your interest in contributing to OpenMOVR! OpenMOVR is the open source program of the Muscular Dystrophy Association's MOVR registry. Start with [Why contribute](https://openmovr.github.io/contribute.html) for the bigger picture.

## Quick Start

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone git@github.com:YOUR-USERNAME/OpenMOVR.github.io.git
   cd OpenMOVR.github.io
   ```
3. **Create a feature branch from `main`**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes** and test locally
5. **Commit with clear messages**:
   ```bash
   git commit -m "component: Description of what you changed"
   ```
6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a Pull Request** into `main`

## Branches

Everything branches from `main` and merges back into it. See [BRANCH_STRATEGY.md](./BRANCH_STRATEGY.md). Do not add AI attribution (Claude, Copilot or similar) to commit messages or pull requests. A check on every push enforces this.

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
├── index.html              # Homepage
├── gsoc.html               # GSoC program
├── docs/                   # Developer docs
│   ├── index.html          # Redirects to movr2.html
│   ├── developer.html      # Developer docs
│   └── movr-datahub-analytics.html
├── pilot/                  # MOVR 2.0 pilot page (closed)
│   ├── index.html
│   └── script.js
├── movr-viewer/            # MOVR Viewer
│   ├── index.html
│   └── data_dictionary_viewer.html
├── css/                    # Shared styles
├── js/                     # Shared JavaScript
├── assets/                 # Images, logos
└── components/             # Reusable components
```

## Pull Request Guidelines

### Before Submitting

- [ ] Test your changes locally (`./launch.sh`)
- [ ] Test on mobile (or use browser dev tools)
- [ ] Update documentation if you changed functionality
- [ ] Keep PRs focused (one feature/fix per PR)
- [ ] Branch from and target `main`

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
- [ ] Targeting `main`
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

### Documentation (`docs/`)

Long-form docs with a section menu, in the site design:
- `docs/developer.html` - Developer docs
- `docs/movr-datahub-analytics.html` - Python library docs

### MOVR Viewer (`movr-viewer/`)

Research tools for data exploration:
- `movr-viewer/index.html` - Viewer home page
- `movr-viewer/data_dictionary_viewer.html` - Dictionary explorer
- `*.json` - Data files (be careful editing)

### GSoC Page (`gsoc.html`)

Google Summer of Code program:
- `gsoc.html` - Program details, projects, mentors

### Pilot page (`pilot/`, closed)

The closed MOVR 2.0 pilot page, kept as a record:
- `pilot/index.html` and `pilot/index-es.html` - English and Spanish pages
- Never commit participant data

### Homepage (`index.html`)

- `index.html` - Homepage
- `progress.html`, `movr2.html`, `front-door.html`, `faq.html`, `contribute.html`
- `data/*.json` - Figures for the progress page and front door. Every figure needs its population and source.
- `css/`, `js/`, `assets/`, `components/` - Shared resources

## Style Guidelines

### HTML
- Use semantic HTML5 elements
- Include ARIA labels for accessibility
- 2-space indentation

### CSS
- Use the CSS variables and classes in `css/main.css`; avoid inline styles
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
