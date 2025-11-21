# OpenMOVR Community Website

Source code for [openmovr.github.io](https://openmovr.github.io) — the community hub for the OpenMOVR open science initiative.

## About OpenMOVR

OpenMOVR is an open science initiative advancing neuromuscular disease research through transparent collaboration and community-driven data analytics. The initiative builds on 12+ years of MOVR registry data (6,021+ participants, 20,883+ clinical visits) to create open source tools for the research community.

**Founder & Architect:** Andre Daniel Paredes, PhD ([@ADPAREDES](https://github.com/ADPAREDES))

## Website Structure

```
openmovr.github.io/
├── index.html              # Main landing page
├── gsoc.html               # Google Summer of Code 2026 program
├── pilot/                  # MOVR 2.0 pilot enrollment
├── docs/
│   ├── faq.html            # Frequently asked questions
│   ├── current-work.html   # Development status
│   ├── platform-vision.html # Future roadmap
│   └── movr-data-hub.html  # Legacy data documentation
├── css/
│   └── main.css            # Site styles
├── js/
│   ├── config.js           # Site configuration
│   └── main.js             # Interactive functionality
└── assets/                 # Images and media
```

## Local Development

```bash
# Clone the repository
git clone https://github.com/OpenMOVR/openmovr.github.io.git
cd openmovr.github.io

# Start local server
python3 -m http.server 8000

# Or use the launch script
./launch.sh
```

Visit `http://localhost:8000` to view the site.

## Data Protection

**No patient data is stored in this repository.**

This website serves as documentation and a community hub only. All MOVR data is:

- Protected under Data Use Agreements (DUA)
- Subject to strict access controls and validation
- Processed through secure, audited pipelines
- Never committed to any public repository

Researchers must request data access through official MDA channels.

## Open Source Dashboards (Planned)

Future releases will include interactive dashboards hosted on this site for exploring anonymized, aggregated insights. These dashboards will:

- Display only pre-processed, de-identified summary data
- Enforce strict data wrangling and validation rules
- Provide research tools without exposing individual records
- Complement (not replace) formal data access requests

## Programs

### Google Summer of Code 2026

OpenMOVR participates in GSoC to mentor students building open source research tools.

**Priority Project:** MOVR Legacy Datahub Python Library (`pip install movr-datahub-analytics`)

- Mentor: Andre Daniel Paredes, PhD
- Administrator: Jessica Waits

See [gsoc.html](https://openmovr.github.io/gsoc.html) for details.

### MOVR 2.0 Pilot

Limited enrollment program for families to help co-create the next generation data platform.

## Related Repositories

| Repository | Description |
|------------|-------------|
| [.github](https://github.com/OpenMOVR/.github) | Organization profile and documentation |
| [movr-datahub-analytics](https://github.com/OpenMOVR/movr-datahub-analytics) | Python library for MOVR data analysis |

## Accessing MOVR Data

MOVR data is available **free** to scientists and academics for **research purposes only**.

- Data Use Agreement (DUA) required
- Not available for commercialization
- Request access: [mda.org/research](https://www.mda.org/research)
- Contact: mdamovr@mdausa.org

## Contact

**Official MOVR inquiries:** mdamovr@mdausa.org

**Open source collaboration:** [@ADPAREDES](https://github.com/ADPAREDES) | [LinkedIn](https://www.linkedin.com/in/adparedes/)

## License

Copyright 2025 OpenMOVR Open Science Initiative

---

*OpenMOVR — Open science for neuromuscular disease research*
