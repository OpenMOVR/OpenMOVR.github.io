// MOVR Documentation JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeMobileMenu();
});

function initializeNavigation() {
    // Handle sidebar navigation
    const navLinks = document.querySelectorAll('.nav-link:not(.external)');
    const contentSections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.dataset.page;
            
            // Update active nav link
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show target content section
            contentSections.forEach(section => section.classList.remove('active'));
            const targetSection = document.getElementById(`content-${targetPage}`);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Update URL without refresh
            const newUrl = targetPage === 'home' ? '#' : `#${targetPage}`;
            history.pushState({page: targetPage}, '', newUrl);
            
            // Scroll to top of content
            document.querySelector('.docs-content').scrollTop = 0;
        });
    });
    
    // Handle external form link
    const externalFormLink = document.querySelector('.nav-link.external[data-page="form"]');
    if (externalFormLink) {
        externalFormLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('https://mdausa.tfaforms.net/389761', '_blank');
        });
    }
    
    // Handle quick links
    const quickLinks = document.querySelectorAll('.quick-link:not(.external)');
    quickLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.dataset.page;
            
            // Update active nav link
            navLinks.forEach(nav => nav.classList.remove('active'));
            const targetNavLink = document.querySelector(`[data-page="${targetPage}"]`);
            if (targetNavLink) {
                targetNavLink.classList.add('active');
            }
            
            // Show target content section
            contentSections.forEach(section => section.classList.remove('active'));
            const targetSection = document.getElementById(`content-${targetPage}`);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Update URL
            history.pushState({page: targetPage}, '', `#${targetPage}`);
            
            // Scroll to top of content
            document.querySelector('.docs-content').scrollTop = 0;
        });
    });
    
    // Handle browser back/forward
    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.page) {
            loadPage(e.state.page);
        } else {
            loadPage('home');
        }
    });
    
    // Load initial page based on hash
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(`content-${hash}`)) {
        loadPage(hash);
    }
}

function loadPage(page) {
    const navLinks = document.querySelectorAll('.nav-link:not(.external)');
    const contentSections = document.querySelectorAll('.content-section');
    
    // Update active nav link
    navLinks.forEach(nav => nav.classList.remove('active'));
    const targetNavLink = document.querySelector(`[data-page="${page}"]`);
    if (targetNavLink) {
        targetNavLink.classList.add('active');
    }
    
    // Show target content section
    contentSections.forEach(section => section.classList.remove('active'));
    const targetSection = document.getElementById(`content-${page}`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

function initializeMobileMenu() {
    // Create mobile menu toggle if it doesn't exist
    if (!document.querySelector('.mobile-menu-toggle')) {
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.innerHTML = '☰';
        document.body.appendChild(mobileToggle);
        
        mobileToggle.addEventListener('click', function() {
            const sidebar = document.querySelector('.docs-sidebar');
            sidebar.classList.toggle('open');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(e) {
            const sidebar = document.querySelector('.docs-sidebar');
            const toggle = document.querySelector('.mobile-menu-toggle');
            
            if (window.innerWidth <= 768 && 
                !sidebar.contains(e.target) && 
                !toggle.contains(e.target) && 
                sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        });
    }
}

// Content data for different pages
const contentData = {
    legacy: {
        title: 'MOVR Data Hub – Program Legacy',
        content: `
            <div class="content-header">
                <h1>MOVR Data Hub – Program Legacy</h1>
                <div class="badge badge-info">Historical Overview</div>
            </div>
            
            <p>The Neuromuscular Observational Research (MOVR) Data Hub was created as part of MDA's commitment to empowering individuals living with neuromuscular diseases. Launched over a decade ago, MOVR addressed a critical data gap by pioneering strategies to accelerate data collection and accessibility for researchers, clinicians, and drug developers.</p>
            
            <div class="alert alert-info">
                <h3>Legacy Impact</h3>
                <p>MOVR leveraged the strength of the MDA Care Center Network, providing valuable insights into disease progression and serving as a rich source of real-world evidence.</p>
            </div>
            
            <h2>Disease Coverage</h2>
            <p>MOVR focused on seven neuromuscular diseases with high research activity:</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-sm); margin: var(--spacing-lg) 0;">
                <div class="stat-card">
                    <span class="stat-number">7</span>
                    <span class="stat-label">Disease Indications</span>
                </div>
                <div class="stat-card">
                    <span class="stat-number">31</span>
                    <span class="stat-label">Core Data Elements</span>
                </div>
                <div class="stat-card">
                    <span class="stat-number">4</span>
                    <span class="stat-label">Electronic Forms</span>
                </div>
            </div>
            
            <div class="card">
                <h3>Diseases Studied</h3>
                <p><strong>ALS</strong> • <strong>BMD</strong> • <strong>DMD</strong> • <strong>FSHD</strong> • <strong>LGMD</strong> • <strong>Pompe Disease</strong> • <strong>SMA</strong></p>
                <p><em>Selected for multiple investigational therapies, standardized data elements, and established care standards.</em></p>
            </div>
            
            <h2>Data Collection Framework</h2>
            <div class="card">
                <h3>Core eCRFs</h3>
                <p><strong>Demographics</strong> • <strong>Diagnosis</strong> • <strong>Encounter</strong> • <strong>Discontinuation</strong></p>
                <p><em>Data entered by clinical research staff directly from electronic health records at participating MDA Care Centers.</em></p>
            </div>
            
            <h2>Research Impact</h2>
            <p>MOVR has contributed to significant research publications:</p>
            <ul>
                <li>Design, methods, and initial observations study</li>
                <li>Longitudinal clinical data across 7 neuromuscular diseases</li>
                <li>Insights into adoption of approved therapies</li>
                <li>Real-world data source evaluation</li>
            </ul>
            
            <div class="cta-box">
                <h4>MOVR's Legacy</h4>
                <p>Years of successful data collection continue to inform MOVR 2.0 development</p>
            </div>
        `
    },
    
    'next-gen': {
        title: 'MOVR 2.0 – The Next Chapter',
        content: `
            <div class="content-header">
                <h1>Help Shape the Future of Neuromuscular Research</h1>
                <div class="badge badge-info">Join MOVR 2.0</div>
            </div>
            
            <p>Building on the foundation of the original MOVR Data Hub, the Muscular Dystrophy Association (MDA) is now launching the next evolution of its national patient data platform: <strong>MOVR 2.0</strong>.</p>
            
            <div class="card">
                <h3>🚀 A New Generation Platform</h3>
                <p><strong>MOVR 2.0</strong> is a secure, research-driven data platform designed to reflect what matters most to people living with neuromuscular disease. By sharing your medical history, you'll help advance research, improve care, and accelerate the development of new treatments.</p>
            </div>
            
            <h2>Early Testing Phase</h2>
            <p>The Muscular Dystrophy Association (MDA) is launching a <strong>six-month early testing phase</strong> of MOVR 2.0, focused exclusively on individuals living with <strong>spinal muscular atrophy (SMA)</strong>. This thoughtful rollout ensures the platform meets real-world needs and functions seamlessly.</p>
            
            <div class="alert alert-info">
                <h3>Community-Driven Development</h3>
                <p>This pilot was developed with input from individuals living with neuromuscular disease. Your voice makes it stronger, smarter, and more impactful.</p>
            </div>
            
            <h2>Why Join MOVR 2.0?</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--spacing-md); margin: var(--spacing-lg) 0;">
                <div class="card">
                    <h4>📊 Visualize Your Health</h4>
                    <p>Track trends and changes in your condition with easy-to-understand dashboards.</p>
                </div>
                <div class="card">
                    <h4>📢 Stay Informed</h4>
                    <p>Receive updates from MDA's research team, including opportunities to participate in new studies.</p>
                </div>
                <div class="card">
                    <h4>🔬 Drive Progress</h4>
                    <p>Your real-world experience helps researchers understand neuromuscular diseases better.</p>
                </div>
            </div>
            
            <h2>Eligibility</h2>
            <p>During the pilot phase, we're accepting a limited number of families who:</p>
            <ul class="checklist">
                <li>✅ Live in the United States</li>
                <li>✅ Are diagnosed with spinal muscular atrophy (SMA)</li>
                <li>✅ Any age or gender</li>
            </ul>
            
            <div class="cta-box">
                <h4>Ready to participate?</h4>
                <p>MOVR 2.0 aims to launch enrollment towards the end of 2025. Contact us at <a href="mailto:MDAMOVR@mdausa.org">MDAMOVR@mdausa.org</a> to express your interest!</p>
            </div>
        `
    },
    
    faq: {
        title: 'Frequently Asked Questions',
        content: `
            <div class="content-header">
                <h1>Frequently Asked Questions</h1>
                <div class="badge badge-info">Get Answers</div>
            </div>
            
            <div class="card">
                <h3>❓ What was the purpose of MOVR?</h3>
                <p>MDA launched MOVR to address a significant data shortage in neuromuscular disease research. The platform leveraged the MDA Care Center Network to accelerate data collection for researchers, clinicians, and drug developers, ultimately enhancing disease understanding and optimizing health outcomes.</p>
            </div>
            
            <div class="card">
                <h3>🔄 Why did we close the original MOVR?</h3>
                <p>We closed MOVR to take advantage of advancing medical technologies and transition to a more effective platform that better engages the patient community.</p>
            </div>
            
            <div class="card">
                <h3>🗄️ What happens to my data?</h3>
                <p>Your enrollment has been deactivated and data collection has stopped. Previously collected data remains with MDA and your Care Center for research purposes as outlined in your original consent form.</p>
            </div>
            
            <div class="card">
                <h3>📋 Can I request my data?</h3>
                <p><strong>Yes!</strong> Email <a href="mailto:MDAMOVR@mdausa.org">MDAMOVR@mdausa.org</a> to request your MOVR data in an encrypted Excel file.</p>
            </div>
            
            <div class="card">
                <h3>🚀 What makes MOVR 2.0 different?</h3>
                <p>MOVR 2.0 uses AI technologies for automated medical record import, reducing hospital staff burden while providing participants with customized dashboards and greater involvement in research.</p>
            </div>
            
            <div class="card">
                <h3>📅 When will MOVR 2.0 launch?</h3>
                <p>The pilot program aims to launch in <strong>2025</strong>. Contact <a href="mailto:MDAMOVR@mdausa.org">MDAMOVR@mdausa.org</a> for participation information.</p>
            </div>
            
            <div class="card">
                <h3>💡 How will MOVR 2.0 benefit patients?</h3>
                <p>Participants can enroll directly and access a secure dashboard with their medical records, data reports, and various analysis tools. This patient-centered approach provides valuable insights while contributing to research.</p>
            </div>
            
            <div class="cta-box">
                <h4>More Questions?</h4>
                <p>Email us at <a href="mailto:MDAMOVR@mdausa.org">MDAMOVR@mdausa.org</a> - we're happy to help!</p>
            </div>
        `
    }
};



// Load all content when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Create content sections first
    Object.keys(contentData).forEach(page => {
        const existingSection = document.getElementById(`content-${page}`);
        if (!existingSection) {
            const mainContent = document.querySelector('.docs-content');
            const newSection = document.createElement('div');
            newSection.id = `content-${page}`;
            newSection.className = 'content-section';
            newSection.innerHTML = contentData[page].content;
            mainContent.appendChild(newSection);
        } else {
            existingSection.innerHTML = contentData[page].content;
        }
    });
    
    // Initialize navigation after content is loaded
    setTimeout(() => {
        initializeNavigation();
        initializeMobileMenu();
        
        // Load initial page based on hash
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(`content-${hash}`)) {
            loadPage(hash);
        }
    }, 100);
});
