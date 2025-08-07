// MOVR Next Gen Platform - Main JavaScript
// Handles site interactivity, configuration loading, and dynamic content

document.addEventListener('DOMContentLoaded', function() {
    initializeSite();
});

function initializeSite() {
    loadHeaderNavigation();
    setupMobileMenu();
    initializeHeroBanners();
    setupSmoothScrolling();
    setupScrollAnimations();
    updateConfigurableContent();
    
    // Initialize page-specific functionality
    if (typeof Chart !== 'undefined') {
        initializeCharts();
    }
}

// Load header navigation from config
function loadHeaderNavigation() {
    const navElement = document.querySelector('.nav');
    if (!navElement || !window.movrConfig) {
        setTimeout(loadHeaderNavigation, 100);
        return;
    }
    
    let navHTML = '';
    
    // Check if we're on the index page
    const isIndexPage = window.location.pathname === '/' || 
                       window.location.pathname.endsWith('index.html') ||
                       window.location.pathname === '';
    
    if (isIndexPage) {
        // For index page, ONLY show the other pages (skip Home, no anchor links)
        window.movrConfig.navigation.slice(1).forEach(item => {
            navHTML += `<a href="${item.href}" class="nav-link">${item.label}</a>`;
        });
    } else {
        // For other pages, show all navigation including Home
        window.movrConfig.navigation.forEach(item => {
            const isActive = window.location.pathname.includes(item.href) || 
                           (item.href === 'index.html' && window.location.pathname === '/');
            navHTML += `<a href="${item.href}" class="nav-link ${isActive ? 'nav-active' : ''}">${item.label}</a>`;
        });
    }
    
    navElement.innerHTML = navHTML;
}

// Mobile menu functionality
function setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('nav-mobile-open');
            mobileToggle.textContent = nav.classList.contains('nav-mobile-open') ? '✕' : '☰';
        });
        
        // Close menu when clicking on nav links
        nav.addEventListener('click', function(e) {
            if (e.target.classList.contains('nav-link')) {
                nav.classList.remove('nav-mobile-open');
                mobileToggle.textContent = '☰';
            }
        });
    }
}

// Hero banner rotation
function initializeHeroBanners() {
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground && window.movrConfig && movrConfig.assets.heroBanners.length > 0) {
        let currentBanner = 0;
        
        function rotateBanner() {
            heroBackground.style.backgroundImage = `url('${movrConfig.assets.heroBanners[currentBanner]}')`;
            currentBanner = (currentBanner + 1) % movrConfig.assets.heroBanners.length;
        }
        
        // Set initial banner
        rotateBanner();
        
        // Rotate every 8 seconds
        setInterval(rotateBanner, 8000);
    }
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('.section, .card, .hero-content').forEach(el => {
        observer.observe(el);
    });
}

// Chart initialization for data visualization pages
function initializeCharts() {
    initializeLegacyImpactChart();
    initializeDiseaseDistributionChart();
    initializeTimelineChart();
}

// Legacy impact overview chart
function initializeLegacyImpactChart() {
    const ctx = document.getElementById('legacyImpactChart');
    if (ctx && window.movrConfig) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Participants', 'Clinical Sites', 'Encounters', 'Years Active'],
                datasets: [{
                    label: 'MOVR Legacy Impact',
                    data: [
                        movrConfig.legacy.participantsTrusted,
                        movrConfig.legacy.sitesCollaborating,
                        movrConfig.legacy.encountersLogged / 100, // Scale for visibility
                        movrConfig.legacy.yearsLearning
                    ],
                    backgroundColor: ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd'],
                    borderColor: ['#1e3a8a', '#2563eb', '#3b82f6', '#60a5fa'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'MOVR Legacy: Building the Foundation'
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Count'
                        }
                    }
                }
            }
        });
    }
}

// Disease distribution chart
function initializeDiseaseDistributionChart() {
    const ctx = document.getElementById('diseaseChart');
    if (ctx && window.movrConfig) {
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: movrConfig.legacy.diseases.map(d => d.name),
                datasets: [{
                    data: movrConfig.legacy.diseases.map(d => d.participants),
                    backgroundColor: movrConfig.legacy.diseases.map(d => d.color),
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Participant Distribution by Disease'
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

// Development timeline chart
function initializeTimelineChart() {
    const ctx = document.getElementById('timelineChart');
    if (ctx && window.movrConfig) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: movrConfig.developmentTimeline.map(phase => phase.period),
                datasets: [{
                    label: 'Development Progress',
                    data: movrConfig.developmentTimeline.map((phase, index) => {
                        switch(phase.status) {
                            case 'proven': return 100;
                            case 'current': return 50;
                            case 'planned': return 25;
                            case 'vision': return 10;
                            default: return 0;
                        }
                    }),
                    borderColor: '#1e40af',
                    backgroundColor: 'rgba(30, 64, 175, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'MOVR Development Timeline'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Progress %'
                        }
                    }
                }
            }
        });
    }
}

// Utility function to update content from config
function updateConfigurableContent() {
    if (!window.movrConfig) {
        setTimeout(updateConfigurableContent, 100);
        return;
    }
    
    // Update hero section stats from config
    updateHeroStats();
    
    // Update footer stats from config
    updateFooterStats();
    
    // Update hero text
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        heroTitle.textContent = movrConfig.messaging.hero;
    }
    
    // Update site title
    const logoText = document.querySelector('.logo-text');
    if (logoText) {
        logoText.textContent = movrConfig.siteName;
    }
    
    // Update contact emails
    document.querySelectorAll('a[href*="mailto"]').forEach(link => {
        if (link.href.includes('mdamovr@mdausa.org')) {
            link.href = `mailto:${movrConfig.team.contactEmail}`;
            if (link.textContent.includes('@')) {
                link.textContent = movrConfig.team.contactEmail;
            }
        }
    });
}

// Update hero section impact stats from config
function updateHeroStats() {
    if (!window.movrConfig || !window.movrConfig.legacy) return;
    
    const stats = [
        { selector: '.stat:nth-child(1) .stat-number', value: movrConfig.legacy.participantsTrusted.toLocaleString() + '+' },
        { selector: '.stat:nth-child(2) .stat-number', value: Math.floor(movrConfig.legacy.encountersLogged / 1000) + 'K+' },
        { selector: '.stat:nth-child(3) .stat-number', value: movrConfig.legacy.sitesCollaborating },
        { selector: '.stat:nth-child(4) .stat-number', value: movrConfig.legacy.yearsLearning },
        { selector: '.stat:nth-child(5) .stat-number', value: '7' } // Disease indications
    ];
    
    stats.forEach(stat => {
        const element = document.querySelector(stat.selector);
        if (element) {
            element.textContent = stat.value;
        }
    });
}

// Update footer section research impact stats from config
function updateFooterStats() {
    if (!window.movrConfig || !window.movrConfig.legacy) return;
    
    const footerSections = document.querySelectorAll('.footer-content > div');
    footerSections.forEach(section => {
        const heading = section.querySelector('h4');
        if (heading && heading.textContent === 'Research Impact') {
            const list = section.querySelector('ul');
            if (list) {
                const items = list.querySelectorAll('li');
                if (items.length >= 4) {
                    items[0].textContent = `${movrConfig.legacy.participantsTrusted.toLocaleString()}+ Participants`;
                    items[1].textContent = `${movrConfig.legacy.encountersLogged.toLocaleString()}+ Clinical Visits`;
                    items[2].textContent = `${movrConfig.legacy.sitesCollaborating} Active Sites`;
                    items[3].textContent = `7 Disease Indications`;
                }
            }
        }
    });
}

// Call configuration update when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateConfigurableContent();
});
