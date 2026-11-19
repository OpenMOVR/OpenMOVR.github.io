// OpenMOVR site configuration
// Navigation shown in the shared header. Paths are relative to the site root.

const movrConfig = {
    navigation: [
        { label: "Home", href: "index.html" },
        {
            label: "MOVR 2.0",
            href: "movr2.html",
            dropdown: [
                { label: "What the pilot taught us", href: "movr2.html#pilot", description: "Findings from families who tested MOVR 2.0" },
                { label: "What's coming", href: "movr2.html#coming", description: "The 2027 launch, diseases and data" },
                { label: "The MOVR front door", href: "front-door.html", description: "What's in MOVR today, built in the open" },
                { label: "FAQ", href: "faq.html", description: "MOVR 2.0, data access and open source" }
            ]
        },
        { label: "Progress", href: "progress.html" },
        {
            label: "Developers",
            href: "docs/developer.html",
            dropdown: [
                { label: "Developer docs", href: "docs/developer.html", description: "Repositories, setup and architecture" },
                { label: "DataHub Analytics", href: "docs/movr-datahub-analytics.html", description: "Python library for MOVR data" },
                { label: "Google Summer of Code", href: "gsoc.html", description: "Project ideas and mentorship" }
            ]
        }
    ]
};

window.movrConfig = movrConfig;
