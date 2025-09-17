// Password config for protected viewers
// Three-tier access system: admin, dictionary, hub
const PASSWORD_CONFIG = {
    // Admin level - access to everything
    admin: {
        passwords: [
            { password: "Andreisthebest", expires: "2030-09-16", description: "Andre's admin access", level: "admin" },
            { password: "openmovr_admin", expires: "2025-12-31", description: "Admin access", level: "admin" }
        ]
    },
    // Dictionary level - only dictionary viewer
    dictionary: {
        passwords: [
            { password: "dict_guest", expires: "2025-12-31", description: "Dictionary viewer access", level: "dictionary" },
            { password: "dict_reviewer", expires: "2025-10-31", description: "Dictionary reviewer", level: "dictionary" }
        ]
    },
    // Hub level - only movr data hub viewer  
    hub: {
        passwords: [
            { password: "hub_guest", expires: "2025-12-31", description: "Hub viewer access", level: "hub" },
            { password: "hub_demo", expires: "2025-10-15", description: "Hub demo access", level: "hub" }
        ]
    }
};

export default PASSWORD_CONFIG;