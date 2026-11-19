// OpenMOVR site configuration
// Navigation shown in the shared header. Paths are relative to the site root.

const movrConfig = {
    navigation: [
        { label: "Home", href: "index.html" },
        {
            label: "MOVR 2.0",
            href: "docs/index.html",
            dropdown: [
                { label: "Updates & roadmap", href: "docs/index.html", description: "Where MOVR is now and what comes next" },
                { label: "MOVR 2.0 pilot", href: "pilot/", description: "Enrollment closed. Thank you, participants" }
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
