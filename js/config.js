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
                { label: "Front door preview", href: "movr2.html#front-door-preview", description: "The progress page, built in the open" },
                { label: "FAQ", href: "movr2.html#faq", description: "For participants and researchers" }
            ]
        },
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
