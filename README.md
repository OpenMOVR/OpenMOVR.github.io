# OpenMOVR

The open source program of the Muscular Dystrophy Association's MOVR registry.

**Site:** [openmovr.github.io](https://openmovr.github.io) · **MDA MOVR:** [mda.org/science/movr2](https://www.mda.org/science/movr2)

## About

OpenMOVR publishes MOVR registry figures anyone can cite, the open source tools and code behind them, and progress on MOVR 2.0 as it happens. It is also a place for volunteers, including Google Summer of Code contributors, technologists, data scientists and graduate students, to make MOVR data more useful.

MOVR is MDA's registry. MDA MOVR publishes the official findings and documents, and OpenMOVR links to them.

Founded and led by [Andre Paredes, PhD](https://github.com/ADParedes), founder & technical lead, with the MDA MOVR team.

## What is here

- **[MOVR progress](https://openmovr.github.io/progress.html):** milestones, pilot highlights and MOVR Data Hub figures, each with its population and source
- **[MOVR 2.0](https://openmovr.github.io/movr2.html):** pilot highlights, health records and what's coming
- **[The MOVR front door](https://openmovr.github.io/front-door.html):** the public page MOVR 2.0 will launch with, built in the open
- **[Why contribute](https://openmovr.github.io/contribute.html)** and the **[developer docs](https://openmovr.github.io/docs/developer.html)**
- **[OpenMOVR App](https://openmovr-gen1.streamlit.app/Community_Snapshot):** the live analytics app and its citable Community Snapshot

## To-do

Open items for the site are tracked in [TODO.md](TODO.md).

## Website Structure

```
OpenMOVR.github.io/
├── index.html              # Homepage
├── progress.html           # MOVR progress (renders data/progress.json)
├── movr2.html              # MOVR 2.0: pilot recap, what's coming
├── front-door.html         # MOVR front door, today and after launch
├── faq.html                # FAQ
├── contribute.html         # Why contribute
├── gsoc.html               # Google Summer of Code program
├── TODO.md                 # Open items for the site
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
git clone git@github.com:OpenMOVR/OpenMOVR.github.io.git
cd OpenMOVR.github.io

# Start local server
./launch.sh
# Or: python3 -m http.server 8000

# Visit http://localhost:8000
```

## OpenMOVR Repositories

### OpenMOVR.github.io
This repository, the OpenMOVR website.

- **Tech**: HTML, CSS, JavaScript
- **Hosting**: GitHub Pages

### movr-datahub-analytics
Python package for analyzing MOVR DataHub (2019-2025) registry data.

- **Tech**: Python, pandas, PyArrow
- **Repository**: [github.com/OpenMOVR/movr-datahub-analytics](https://github.com/OpenMOVR/movr-datahub-analytics)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines. Key points:

1. Fork the repository
2. Create a feature branch from `main`
3. Make changes and test locally
4. Submit a Pull Request

See [BRANCH_STRATEGY.md](./BRANCH_STRATEGY.md) for branch workflow details.

## Contact

- **MDA MOVR team:** mdamovr@mdausa.org (the registry, data requests, MOVR 2.0)
- **OpenMOVR:** andre.paredes@ymail.com ([Andre Paredes](https://github.com/ADParedes), founder & technical lead)
- **GitHub**: [github.com/OpenMOVR](https://github.com/OpenMOVR)

## License

MIT. See [LICENSE](LICENSE).
