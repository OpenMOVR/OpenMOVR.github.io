# OpenMOVR Community Initiative

Open science initiative for neuromuscular disease research. Building the future through transparent collaboration and open source software.

## About

OpenMOVR is an independently managed open science initiative established in 2025, leaning on open source methods to advance neuromuscular disease research. 

Designed and built by Andre Daniel Paredes, PhD, OpenMOVR is continuously evolving to better serve researchers and make a lasting impact on neuromuscular disease research.

## Overview

OpenMOVR advances neuromuscular disease research through:
- **Open Source Tools**: MOVR DataHub Analytics Python library for researchers
- **Google Summer of Code**: Mentorship program for open source development
- **Research Data Access**: Official MOVR data request process
- **Community Documentation**: Comprehensive guides and developer resources

## Website Structure

```
OpenMOVR.github.io/
├── index.html              # Homepage
├── progress.html           # MOVR progress (renders data/progress.json)
├── movr2.html              # MOVR 2.0: pilot recap, what's coming
├── front-door.html         # MOVR front door, today and after launch
├── faq.html                # FAQ
├── gsoc.html               # Google Summer of Code program
├── docs/
│   ├── developer.html      # Developer docs
│   ├── movr-datahub-analytics.html  # Python library docs
│   └── index.html          # Redirects to movr2.html
├── pilot/                  # MOVR 2.0 pilot page (closed)
├── movr-viewer/            # Research tools
├── data/                   # progress.json, front-door-*.json
├── css/main.css            # The one design system
├── js/                     # config, main, header-loader, progress, front-door, doc-toc
├── components/             # header.html, footer.html
├── assets/                 # Images and logos
├── README.md
├── CONTRIBUTING.md
└── BRANCH_STRATEGY.md
```

## Quick Start

### Local Development

```bash
# Clone the repository
git clone git@github.com:YOUR-USERNAME/OpenMOVR.github.io.git
cd OpenMOVR.github.io

# Start local server
./launch.sh
# Or: python3 -m http.server 8000

# Visit http://localhost:8000
```

### Key Pages

- **Homepage**: Overview, stats, calls-to-action
- **MOVR 2.0 Docs**: Updates, vision, history, FAQ (tabbed interface)
- **Developer Docs**: Repository info, MOVR Viewer, contribution guides
- **DataHub Analytics**: Python library documentation for researchers
- **GSoC Program**: Google Summer of Code mentorship details
- **Pilot Program**: MOVR 2.0 enrollment for patients/families

## OpenMOVR Repositories

### OpenMOVR.github.io
This repository - the main website with documentation, GSoC program, and pilot enrollment.

- **Tech**: HTML, CSS, JavaScript
- **Hosting**: GitHub Pages

### movr-datahub-analytics
Python package for analyzing MOVR DataHub (2019-2025) registry data.

- **Tech**: Python, pandas, PyArrow
- **Status**: GSoC 2026 Priority Project
- **Repository**: [github.com/OpenMOVR/movr-datahub-analytics](https://github.com/OpenMOVR/movr-datahub-analytics)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines. Key points:

1. Fork the repository
2. Create a feature branch from `main`
3. Make changes and test locally
4. Submit a Pull Request

See [BRANCH_STRATEGY.md](./BRANCH_STRATEGY.md) for branch workflow details.

## Contact

- **MOVR Team**: mdamovr@mdausa.org
- **GitHub**: [github.com/OpenMOVR](https://github.com/OpenMOVR)

## License

Copyright 2025 OpenMOVR Open Science Initiative
