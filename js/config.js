// MOVR Next Gen Platform Configuration
// Updated by team members to reflect current status and progress

const movrConfig = {
    // Site Information
    siteName: "OpenMOVR",
    tagline: "Building the future of neuromuscular disease research",
    
    // Current Development Status
    currentPhase: "Vendor Selection & Proof of Concept",
    timeline: {
        phase1End: "Q1 2026",
        goNoGoDecision: "March 2026",
        fullLaunch: "TBD based on learning"
    },

    // Our Story So Far (Legacy MOVR Impact)
    legacy: {
        participantsTrusted: 5895,
        encountersLogged: 20152,
        sitesCollaborating: 63,
        yearsLearning: 12,
        studiesEnabled: 25,
        publicationsSupported: 18,
        diseases: [
            {name: 'ALS', participants: 3031, color: '#1e40af'},
            {name: 'DMD', participants: 1372, color: '#3b82f6'},
            {name: 'SMA', participants: 782, color: '#60a5fa'}
        ]
    },

    // Current Work In Progress
    currentWork: [
        "Evaluating EMR integration vendors",
        "Testing FHIR data transformation", 
        "Designing patient consent 2.0",
        "Building research community",
        "Developing open source tools"
    ],

    // What We're Building Toward
    vision: {
        title: "Automated EMR Integration for Neuromuscular Disease Research",
        description: "Moving from manual data entry to automated EMR integration while maintaining gold standard data quality",
        goals: [
            "Replace manual data entry with automated EMR integration",
            "Maintain gold standard data quality",
            "Expand research access and collaboration",
            "Build open source tools for the community"
        ]
    },

    // Team Information
    team: {
        coreTeam: [
            {
                name: "Andre Daniel Paredes, PhD",
                role: "Technical Lead & GSoC Mentor",
                motivation: "Building tools that accelerate research for diseases that need champions",
                contact: "mdamovr@mdausa.org"
            },
            {
                name: "Jessica Waits", 
                role: "Project Lead & GSoC Admin",
                motivation: "Ensuring research serves patients and families first",
                contact: "mdamovr@mdausa.org"
            }
        ],
        contactEmail: "mdamovr@mdausa.org",
        missionStatement: "This is an open source, mission-driven project that goes above and beyond our day jobs to make research more accessible. Views expressed are driven by the registry team and separate from organizational positions."
    },

    // Site Navigation (strategic tab organization)
    navigation: [
        { label: "Home", href: "index.html" },
        { 
            label: "About", 
            href: "about/index.html",
            dropdown: [
                { label: "Overview", href: "about/index.html", description: "Mission, values & key achievements" },
                { label: "Our Story", href: "about/our-story.html", description: "12-year journey from startup to global registry" },
                { label: "Platform Vision", href: "about/platform-vision.html", description: "Next generation EMR integration & tools" },
                { label: "Current Status", href: "about/current-status.html", description: "Real-time development progress" },
                { label: "Team & Leadership", href: "about/team-leadership.html", description: "Registry experts building the future" },
                { label: "For Participants", href: "about/for-participants.html", description: "Information & updates for participants" }
            ]
        },
        { label: "Building Next Gen", href: "building.html" },
        { label: "Data Governance", href: "open-science.html" },
        { label: "GSoC", href: "team.html" },
        { label: "MOVR Updates", href: "docs/index.html", external: true, description: "Official MOVR documentation & updates" }
    ],

    // Key Messages
    messaging: {
        hero: "Meet OpenMOVR - the open source extension of MDA's MOVR platform",
        mission: "Building next-generation tools to accelerate neuromuscular disease research through collaborative development",
        approach: "Mission-driven project that goes above and beyond to make research more accessible",
        invitation: "Every decision starts with: will this help patients?"
    },

    // Partnership Philosophy
    partnership: {
        lookingFor: "Co-development and co-founding partners",
        approach: "Building MOVR 2.0 together through collaborative development",
        currentStatus: "Open source mission-driven project",
        values: [
            "Mission alignment and shared commitment to open science",
            "Transparent, work-in-progress collaboration", 
            "Patient-first decision making",
            "Open source principles and community development"
        ],
        industryMessage: "If you're in industry and found this project, or want to contribute/donate to the cause, message us. We have many ways we can connect and work together."
    },

    // Open Source Development Plans
    openSource: {
        timeline: "Starting pip installable library in 2026",
        dataFields: "300+ fields across 7 indications",
        plannedProjects: [
            {
                name: "Python Library 1.0",
                status: "Timeline TBD",
                description: "Pip installable library for MOVR data access and analysis"
            },
            {
                name: "Research APIs & SDK",
                status: "Timeline TBD", 
                description: "Developer tools for integrating with MOVR platform"
            },
            {
                name: "ML/AI Toolkit",
                status: "Timeline TBD",
                description: "Machine learning tools for neuromuscular disease research"
            }
        ],
        gsoc: {
            organization: "Planning GSoC application",
            mentor: "Andre Daniel Paredes, PhD",
            admin: "Jessica Waits",
            focus: "Open source development for neuromuscular disease research"
        }
    },

    // Development Timeline
    developmentTimeline: [
        {
            phase: "MOVR Legacy",
            period: "2013-2024",
            description: "Manual registry data collection across 63 clinical sites",
            achievements: "5,895+ participants, 20,152+ encounters, 25+ studies enabled",
            status: "proven"
        },
        {
            phase: "Vendor Selection",
            period: "2024-2025", 
            description: "Evaluating EMR integration partners and proof-of-concept development",
            achievements: "Partner evaluation in progress",
            status: "current"
        },
        {
            phase: "Pilot Development",
            period: "2025-2026",
            description: "Building and testing automated EMR integration with founding partners", 
            achievements: "TBD based on vendor selection",
            status: "planned"
        },
        {
            phase: "Community Platform",
            period: "2026+",
            description: "Open source tools and expanded research community access",
            achievements: "Dependent on pilot success",
            status: "vision"
        }
    ],

    // Assets
    assets: {
        logo: 'assets/movr_logo_clean.jpg',
        logoSquare: 'assets/movr_square_img.jpg',
        heroBanners: [
            'assets/movr_hero_banner_1.jpg',
            'assets/movr_hero_banner_2.jpg',
            'assets/movr_hero_banner_3.jpg',
            'assets/movr_hero_banner_4.jpg',
            'assets/movr_hero_banner_5.jpg',
            'assets/movr_hero_banner_6.jpg'
        ]
    }
};

// Make config available globally
window.movrConfig = movrConfig;
