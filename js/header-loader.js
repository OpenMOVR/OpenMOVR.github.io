// Component loader
// Injects components/header.html and components/footer.html into
// #header-placeholder and #footer-placeholder. Components use {{root}}
// for links, replaced here with the relative path to the site root.

(function() {
    'use strict';

    const SUBDIRS = ['/docs/', '/pilot/', '/movr-viewer/'];
    const inSubdir = SUBDIRS.some(dir => window.location.pathname.includes(dir));
    const root = inSubdir ? '../' : '';

    function loadComponent(name, placeholderId) {
        const placeholder = document.getElementById(placeholderId);
        if (!placeholder) return Promise.resolve(false);

        return fetch(`${root}components/${name}.html`)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load ${name}: ${response.status}`);
                return response.text();
            })
            .then(html => {
                placeholder.outerHTML = html.replaceAll('{{root}}', root);
                return true;
            })
            .catch(error => {
                console.error(error);
                if (name === 'header') {
                    placeholder.innerHTML = `<header class="header"><div class="container"><div class="header-content">
                        <a class="logo" href="${root}index.html"><div class="logo-main">OpenMOVR</div></a>
                    </div></div></header>`;
                }
                return false;
            });
    }

    function loadAll() {
        loadComponent('header', 'header-placeholder').then(loaded => {
            if (!loaded) return;
            if (typeof loadHeaderNavigation === 'function') loadHeaderNavigation();
            if (typeof setupMobileMenu === 'function') setupMobileMenu();
        });
        loadComponent('footer', 'footer-placeholder');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadAll);
    } else {
        loadAll();
    }
})();
