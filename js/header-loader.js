// Header Loader Utility
// Dynamically loads the header component from components/header.html

(function() {
    'use strict';

    // Load header component
    function loadHeader() {
        const headerPlaceholder = document.getElementById('header-placeholder');

        if (!headerPlaceholder) {
            console.warn('Header placeholder not found. Skipping header load.');
            return;
        }

        // Determine the correct path to components based on current location
        const currentPath = window.location.pathname;
        let componentsPath = 'components/header.html';

        // Adjust path for subdirectories
        if (currentPath.includes('/docs/') ||
            currentPath.includes('/pilot/') ||
            currentPath.includes('/movr-viewer/')) {
            componentsPath = '../components/header.html';
        }

        // Fetch and inject the header
        fetch(componentsPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load header: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                headerPlaceholder.innerHTML = html;

                // Fix asset paths for subdirectories
                const isSubdirectory = currentPath.includes('/docs/') ||
                                     currentPath.includes('/pilot/') ||
                                     currentPath.includes('/movr-viewer/');

                if (isSubdirectory) {
                    // Update image src to use correct relative path
                    const headerImg = headerPlaceholder.querySelector('.logo img');
                    if (headerImg) {
                        headerImg.src = '../assets/movr_logo_clean.jpg';
                    }
                }

                // After header is loaded, initialize navigation and mobile menu
                if (typeof loadHeaderNavigation === 'function') {
                    loadHeaderNavigation();
                }
                if (typeof setupMobileMenu === 'function') {
                    setupMobileMenu();
                }
            })
            .catch(error => {
                console.error('Error loading header:', error);
                // Fallback: show minimal header
                headerPlaceholder.innerHTML = `
                    <header class="header">
                        <div class="container">
                            <div class="header-content">
                                <div class="logo">
                                    <a href="/" style="text-decoration: none; color: inherit;">
                                        <div class="logo-main">OpenMOVR</div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </header>
                `;
            });
    }

    // Load header when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadHeader);
    } else {
        loadHeader();
    }
})();
