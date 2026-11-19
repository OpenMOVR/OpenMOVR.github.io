// Docs pages: highlight the contents entry for the section being read.
(function() {
    'use strict';
    const links = [...document.querySelectorAll('.doc-toc a[href^="#"]')];
    const targets = links.map(a => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
    if (!targets.length || !('IntersectionObserver' in window)) return;

    const setActive = id => links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + id));
    const observer = new IntersectionObserver(entries => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActive(visible[0].target.id);
    }, { rootMargin: '-80px 0px -65% 0px' });
    targets.forEach(t => observer.observe(t));
})();
