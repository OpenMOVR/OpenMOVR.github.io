// OpenMOVR site configuration
// Navigation shown in the shared header. Paths are relative to the site root.
// The logo links home, so Home is not listed. pill: true renders a highlighted item.

const movrConfig = {
    navigation: [
        { label: "Progress", href: "progress.html" },
        {
            label: "MOVR 2.0",
            href: "movr2.html",
            dropdown: [
                { label: "Pilot highlights", href: "movr2.html#pilot", description: "First principles from the pilot" },
                { label: "Health records", href: "movr2.html#records", description: "What data standards can and can't do" },
                { label: "What's coming", href: "movr2.html#coming", description: "The 2027 launch" },
                { label: "The MOVR front door", href: "front-door.html", description: "What's in MOVR today" }
            ]
        },
        {
            label: "Contribute",
            href: "contribute.html",
            dropdown: [
                { label: "Why contribute", href: "contribute.html", description: "How volunteers help MOVR" },
                { label: "Developer docs", href: "docs/developer.html", description: "Repositories, setup and architecture" },
                { label: "DataHub Analytics", href: "docs/movr-datahub-analytics.html", description: "Python library for MOVR data" },
                { label: "Google Summer of Code", href: "gsoc.html", description: "Project ideas and mentorship" },
                { label: "MOVR Viewer", href: "movr-viewer/", description: "Data dictionary tools" }
            ]
        },
        { label: "FAQ", href: "faq.html", pill: true }
    ]
};

window.movrConfig = movrConfig;
