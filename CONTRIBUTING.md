# Contributing to OpenMOVR

Thank you for your interest in contributing to OpenMOVR! This project is an open science initiative focused on advancing rare disease research through open source tools and community collaboration.

## Quick Start

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone git@github.com:YOUR-USERNAME/OpenMOVR.github.io.git
   cd OpenMOVR.github.io
   ```
3. **Create a feature branch**:
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
7. **Open a Pull Request** on GitHub

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
- Performance optimizations

### For Researchers & Domain Experts
- Documentation improvements
- FAQ content
- Data dictionary enhancements
- User experience feedback
- Use case examples

### For Designers
- UI/UX improvements
- Accessibility audits
- Mobile design enhancements
- Branding consistency

## Branch Strategy

We use a streamlined branch strategy. Please read [BRANCH_STRATEGY.md](./BRANCH_STRATEGY.md) for details.

**Quick summary**:
- `main` - Production website (homepage, docs, pilot)
- `viewer-apps` - MOVR Viewer and research tools
- `feature/*` - Your feature branches

**Where to branch from**:
- Working on website/docs/pilot? → Branch from `main`
- Working on MOVR Viewer tools? → Branch from `viewer-apps`

## Pull Request Guidelines

### Before Submitting

- [ ] Test your changes locally (run `./launch.sh` and check http://localhost:8000)
- [ ] Test on mobile (or use browser dev tools)
- [ ] Update documentation if you changed functionality
- [ ] Keep PRs focused (one feature/fix per PR)
- [ ] Write clear commit messages

### PR Title Format

Use clear, descriptive titles:
- ✅ `pilot: Add age group field to enrollment form`
- ✅ `viewer: Fix session save/load on Safari`
- ✅ `docs: Update FAQ with MOVR 2.0 timeline`
- ❌ `updates`
- ❌ `fix stuff`

### PR Description Template

```markdown
## What does this PR do?
Brief description of the changes.

## Why are we making this change?
Explain the problem you're solving or feature you're adding.

## How to test
1. Step-by-step instructions to verify the changes
2. Include any edge cases to check

## Screenshots (if UI changes)
Before/after screenshots for visual changes.

## Checklist
- [ ] Tested locally
- [ ] Tested on mobile (or responsive view)
- [ ] Documentation updated (if needed)
- [ ] No sensitive data committed (API keys, emails, etc.)
```

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
├── gsoc.html               # Google Summer of Code
├── docs/                   # Documentation system
├── pilot/                  # MOVR 2.0 Pilot enrollment
├── data-dictionary-viewer/ # MOVR Viewer tools (will become movr-viewer/)
├── css/                    # Shared styles
├── js/                     # Shared JavaScript
├── assets/                 # Images, logos
└── components/             # Reusable HTML components
```

## Commit Message Guidelines

Good commit messages help us maintain a clean history and understand changes.

### Format

```
component: Short description (50 chars or less)

Longer explanation if needed (wrap at 72 characters).
Explain WHY you made the change, not WHAT (code shows what).
```

### Examples

```
pilot: Add age group field to enrollment form

Required for demographic analysis and IRB compliance.
Field captures age ranges to support research stratification.
```

```
viewer: Implement session save/load functionality

Researchers can now save their review progress and resume later,
addressing feedback from medical advisory board about long sessions.
```

### Component Prefixes

- `pilot:` - Pilot enrollment system
- `viewer:` - MOVR Viewer applications
- `docs:` - Documentation pages
- `gsoc:` - GSoC program page
- `home:` - Homepage changes
- `config:` - Configuration updates
- `style:` - CSS/styling changes
- `fix:` - Bug fixes
- `chore:` - Maintenance tasks

## Code Review Process

1. **Automated checks**: PR must pass any CI/CD checks (if configured)
2. **Code owner review**: A CODEOWNER will review your PR (see `.github/CODEOWNERS`)
3. **Feedback**: Address any requested changes
4. **Approval**: Once approved, a maintainer will merge

### What Reviewers Look For

- Does the change match the PR description?
- Are there any security concerns (API keys, sensitive data)?
- Is it mobile-responsive (if UI change)?
- Are commit messages clear?
- Is documentation updated?

## Specific Contribution Areas

### Working with MOVR Viewer

The MOVR Viewer (`data-dictionary-viewer/`, soon to be `movr-viewer/`) is a research tool. Changes here should:
- Preserve existing functionality
- Maintain backward compatibility with saved sessions
- Update the README if you change features
- Consider regulatory compliance (audit trails, timestamps)

**Key files**:
- `data_dictionary_viewer.html` - Medical advisory review interface
- `vendor_mapping_viewer.html` - Vendor coverage analysis
- `*.json` - Data files (be careful editing these)

### Working with Pilot Enrollment

The pilot enrollment system handles potential PHI/PII. Please:
- Never commit actual patient data
- Test form validation thoroughly
- Maintain CSRF protection
- Update edge case documentation if needed

**Key files**:
- `pilot/index.html` - Main enrollment page
- `pilot/script.js` - Form validation and submission
- `pilot/EDGE_CASE_ANALYSIS.md` - Document any new edge cases

### Working with Documentation

Documentation is in `docs/`. Keep in mind:
- Audience: Patients, families, researchers, developers
- Tone: Clear, accessible, professional
- Accuracy: Double-check facts and timelines
- Navigation: Update sidebar if adding new pages

## Style Guidelines

### HTML
- Use semantic HTML5 elements
- Include ARIA labels for accessibility
- Keep markup clean and indented (2 spaces)

### CSS
- Use CSS variables (defined in `css/main.css`)
- Mobile-first responsive design
- Follow existing naming conventions
- Add comments for complex styles

### JavaScript
- Use vanilla JavaScript (no frameworks)
- Add comments for complex logic
- Handle errors gracefully
- Test on different browsers if possible

## Questions or Need Help?

- **Technical/Development Questions**: andre.paredes@ymail.com
- **MDA Organization Questions**: mdamovr@mdausa.org
- **GitHub Discussions**: Open a discussion for questions
- **Issues**: Check existing issues or open a new one

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (see LICENSE file).

## Recognition

Contributors will be acknowledged in our documentation. Thank you for helping advance rare disease research!

---

**New to open source?** That's great! We welcome first-time contributors. Don't hesitate to ask questions.
