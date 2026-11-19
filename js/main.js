// OpenMOVR site interactivity: header navigation, mobile menu, reveal-on-scroll.
// The header itself is injected by header-loader.js, which calls
// loadHeaderNavigation() and setupMobileMenu() once it is in the page.

document.addEventListener('DOMContentLoaded', function() {
    setupReveal();
});

function loadHeaderNavigation() {
    const navElement = document.querySelector('.nav');
    if (!navElement || !window.movrConfig) return;

    const pathname = window.location.pathname;
    const inSubdir = ['/docs/', '/pilot/', '/movr-viewer/'].some(dir => pathname.includes(dir));
    const prefix = inSubdir ? '../' : '';
    const isHome = !inSubdir && (pathname === '/' || pathname.endsWith('/') || pathname.endsWith('/index.html'));

    navElement.innerHTML = window.movrConfig.navigation
        .filter(item => !(isHome && item.href === 'index.html'))
        .map(item => {
            if (item.dropdown) return createDropdownNavigation(item, prefix, pathname);
            const isActive = !isHome && !inSubdir && pathname.endsWith('/' + item.href);
            return `<a href="${prefix}${item.href}" class="nav-link${isActive ? ' nav-active' : ''}">${item.label}</a>`;
        })
        .join('');

    setupDropdownNavigation();
}

function createDropdownNavigation(item, prefix, pathname) {
    const isActive = item.dropdown.some(sub => pathname.includes(sub.href));
    const links = item.dropdown.map(sub => `
        <a href="${prefix}${sub.href}" class="nav-dropdown-link${pathname.includes(sub.href) ? ' active' : ''}">
            <strong>${sub.label}</strong>
            ${sub.description ? `<small>${sub.description}</small>` : ''}
        </a>`).join('');

    return `
        <div class="nav-dropdown${isActive ? ' nav-active' : ''}">
            <a href="${prefix}${item.href}" class="nav-link nav-dropdown-toggle" aria-haspopup="true">${item.label} <span class="dropdown-arrow">▼</span></a>
            <div class="nav-dropdown-content">${links}</div>
        </div>`;
}

function setupDropdownNavigation() {
    document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
        const toggle = dropdown.querySelector('.nav-dropdown-toggle');
        const content = dropdown.querySelector('.nav-dropdown-content');
        const isMobile = () => window.innerWidth <= 860;
        let hideTimer;

        const show = () => {
            clearTimeout(hideTimer);
            content.style.display = 'block';
            requestAnimationFrame(() => content.classList.add('show'));
        };
        const hide = () => {
            content.classList.remove('show');
            hideTimer = setTimeout(() => { content.style.display = 'none'; }, 150);
        };

        dropdown.addEventListener('mouseenter', () => { if (!isMobile()) show(); });
        dropdown.addEventListener('mouseleave', () => { if (!isMobile()) hide(); });
        dropdown.addEventListener('focusin', show);
        dropdown.addEventListener('focusout', e => { if (!dropdown.contains(e.relatedTarget)) hide(); });

        toggle.addEventListener('click', e => {
            if (!isMobile()) return;
            e.preventDefault();
            content.classList.contains('show') ? hide() : show();
        });
    });
}

function setupMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    if (!toggle || !nav || toggle.dataset.bound) return;
    toggle.dataset.bound = 'true';

    const setOpen = open => {
        nav.classList.toggle('nav-mobile-open', open);
        toggle.textContent = open ? '✕' : '☰';
        toggle.setAttribute('aria-expanded', String(open));
    };

    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('nav-mobile-open')));
    nav.addEventListener('click', e => {
        if (e.target.closest('a') && !e.target.closest('.nav-dropdown-toggle')) setOpen(false);
    });
}

function setupReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
        items.forEach(el => el.classList.add('is-visible'));
        return;
    }
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(el => observer.observe(el));
}
