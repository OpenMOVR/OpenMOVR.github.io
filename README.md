# OpenMOVR Community Initiative

Open science initiative for neuromuscular disease research. Building the future through transparent collaboration and open source software.

**Founded by Andre Daniel Paredes, PhD**

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
├── gsoc.html               # Google Summer of Code program
├── docs/                   # Documentation system
│   ├── index.html          # MOVR 2.0 (tabbed: Updates, Vision, History, FAQ)
│   ├── developer.html      # Developer Docs (repos, MOVR Viewer)
│   └── movr-datahub-analytics.html  # Python library documentation
├── pilot/                  # MOVR 2.0 Pilot enrollment
├── movr-viewer/            # Research tools
│   ├── index.html          # MOVR Viewer home
│   └── data_dictionary_viewer.html  # Dictionary exploration
├── css/
│   ├── main.css            # Site-wide styles
│   └── docs.css            # Documentation styles
├── js/
│   ├── config.js           # Site configuration
│   ├── main.js             # Main functionality
│   └── header-loader.js    # Header component loader
├── components/
│   └── header.html         # Shared header
├── assets/                 # Images and logos
├── .gitignore
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

- **General**: mdamovr@mdausa.org
- **Technical**: andre.paredes@ymail.com
- **GitHub**: [github.com/OpenMOVR](https://github.com/OpenMOVR)

## License

Copyright 2025 OpenMOVR Open Science Initiative
Founded by Andre Daniel Paredes, PhD
