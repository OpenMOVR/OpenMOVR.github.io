// MOVR Documentation JavaScript
document.addEventListener('DOMContentLoaded', function() {
    loadAllContent();
    initializeNavigation();
    initializeMobileMenu();
});

function loadAllContent() {
    // Load content for legacy, next-gen, and faq sections
    Object.keys(contentData).forEach(page => {
        const existingSection = document.getElementById(`content-${page}`);
        if (existingSection) {
            existingSection.innerHTML = contentData[page].content;
        }
    });
}

function initializeNavigation() {
    // Handle sidebar navigation
    const navLinks = document.querySelectorAll('.nav-link:not(.external)');
    const contentSections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.dataset.page;
            loadPage(targetPage);
            
            // Update URL without refresh
            const newUrl = targetPage === 'home' ? '#' : `#${targetPage}`;
            history.pushState({page: targetPage}, '', newUrl);
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
            loadPage(targetPage);
            
            // Update URL without refresh
            const newUrl = targetPage === 'home' ? '#' : `#${targetPage}`;
            history.pushState({page: targetPage}, '', newUrl);
        });
    });
    
    // Handle browser navigation
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
    
    // Scroll to top of content
    document.querySelector('.docs-content').scrollTop = 0;
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
                <h3>🏆 Legacy Impact</h3>
                <p>MOVR leveraged the strength of the MDA Care Center Network, providing valuable insights into disease progression and serving as a rich source of real-world evidence.</p>
            </div>
            
            <h2>Disease Coverage</h2>
            <p>MOVR focused on seven neuromuscular diseases with high research activity:</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-md); margin: var(--spacing-lg) 0;">
                <div class="card text-center">
                    <div class="card-content">
                        <div style="font-size: 2rem; font-weight: bold; color: var(--primary-blue);">7</div>
                        <div>Disease Indications</div>
                    </div>
                </div>
                <div class="card text-center">
                    <div class="card-content">
                        <div style="font-size: 2rem; font-weight: bold; color: var(--success-green);">31</div>
                        <div>Core Data Elements</div>
                    </div>
                </div>
                <div class="card text-center">
                    <div class="card-content">
                        <div style="font-size: 2rem; font-weight: bold; color: var(--warning-orange);">4</div>
                        <div>Electronic Forms</div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3>Diseases Studied</h3>
                </div>
                <div class="card-content">
                    <p><strong>ALS</strong> • <strong>BMD</strong> • <strong>DMD</strong> • <strong>FSHD</strong> • <strong>LGMD</strong> • <strong>Pompe Disease</strong> • <strong>SMA</strong></p>
                    <p><em>Selected for multiple investigational therapies, standardized data elements, and established care standards.</em></p>
                </div>
            </div>
            
            <h2>Data Collection Framework</h2>
            <div class="card">
                <div class="card-header">
                    <h3>Core eCRFs</h3>
                </div>
                <div class="card-content">
                    <p><strong>Demographics</strong> • <strong>Diagnosis</strong> • <strong>Encounter</strong> • <strong>Discontinuation</strong></p>
                    <p><em>Data entered by clinical research staff directly from electronic health records at participating MDA Care Centers.</em></p>
                </div>
            </div>
            
            <h2>Research Impact</h2>
            <p>MOVR has contributed to significant research publications:</p>
            <ul>
                <li>Design, methods, and initial observations study</li>
                <li>Longitudinal clinical data across 7 neuromuscular diseases</li>
                <li>Insights into adoption of approved therapies</li>
                <li>Real-world data source evaluation</li>
            </ul>
            
            <div class="message-box">
                <h4>🏆 MOVR's Legacy</h4>
                <p>Years of successful data collection continue to inform MOVR 2.0 development</p>
            </div>
        `
    },
    'next-gen': {
        title: 'What is MOVR Currently Working on?',
        content: `
            <div class="content-header">
                <h1>What is MOVR Currently Working on?</h1>
                <div class="badge badge-success">Active Development</div>
            </div>
            
            <div class="alert alert-success">
                <h3>� The Quick Answer</h3>
                <p><strong>We're running a small precursor pilot program leading to a Q2 2026 go-live decision.</strong> This is about operationally validating the safest and most effective approach to registry modernization. Technology is rapidly evolving, and we're at the right place at the right time to explore and stand up new processes that will have great impact.</p>
            </div>

            <h2>Current Phase: Operational Validation</h2>
            <p>We're not rushing into full deployment. Instead, we're taking a careful, methodical approach to ensure MOVR 2.0 is both sustainable and transformational.</p>

            <div class="grid-2" style="margin-top: var(--spacing-lg);">
                <div class="card">
                    <div class="card-content">
                        <h3>🔬 What We're Testing</h3>
                        <ul>
                            <li><strong>Technology feasibility:</strong> Can automated EMR integration work reliably?</li>
                            <li><strong>Data quality validation:</strong> Does automated collection maintain gold standards?</li>
                            <li><strong>Site adoption:</strong> How do clinical sites respond to the new approach?</li>
                            <li><strong>Sustainability models:</strong> What makes this financially viable long-term?</li>
                        </ul>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-content">
                        <h3>⚖️ Why This Approach</h3>
                        <ul>
                            <li><strong>Registries are expensive:</strong> We need sustainable funding models</li>
                            <li><strong>Technology evolves rapidly:</strong> We must validate before scaling</li>
                            <li><strong>Research continuity:</strong> Can't afford to get this wrong</li>
                            <li><strong>Community impact:</strong> This affects the entire research ecosystem</li>
                        </ul>
                    </div>
                </div>
            </div>

            <h2>Capped Enrollment Program</h2>
            <p>Yes, we are actively enrolling participants! But we're being strategic about it.</p>

            <div class="card" style="margin-top: var(--spacing-lg);">
                <div class="card-content">
                    <h3>🎯 Pilot Enrollment Details</h3>
                    <ul>
                        <li><strong>Limited capacity:</strong> Capped enrollment to ensure quality validation</li>
                        <li><strong>Active recruitment:</strong> Working with select MDA Care Centers</li>
                        <li><strong>Real participants:</strong> Contributing to both validation and real research</li>
                        <li><strong>Full engagement:</strong> Participants get the complete MOVR experience</li>
                    </ul>
                    
                    <div style="margin-top: var(--spacing-md); padding: var(--spacing-md); background: #f0f9ff; border-radius: 0.5rem;">
                        <h4>💬 Want to Participate?</h4>
                        <p>Email us at <a href="mailto:MDAMOVR@mdausa.org"><strong>MDAMOVR@mdausa.org</strong></a> to express interest. We'll let you know if there's availability in your area.</p>
                    </div>
                </div>
            </div>

            <h2>The Q2 2026 Decision Point</h2>
            <p>Everything we're doing now leads to a critical go/no-go decision in Q2 2026:</p>

            <div class="grid-2" style="margin-top: var(--spacing-lg);">
                <div class="card">
                    <div class="card-content">
                        <h3>✅ Success Criteria</h3>
                        <ul>
                            <li><strong>Technical validation:</strong> Automated systems work reliably</li>
                            <li><strong>Data quality maintained:</strong> Meets research standards</li>
                            <li><strong>Site satisfaction:</strong> Clinics find value in participation</li>
                            <li><strong>Financial sustainability:</strong> Long-term funding model proven</li>
                        </ul>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-content">
                        <h3>🚀 If We Say "Go"</h3>
                        <ul>
                            <li><strong>Full platform launch:</strong> National rollout begins</li>
                            <li><strong>Open enrollment:</strong> Broad patient participation</li>
                            <li><strong>Community tools:</strong> Open source developer ecosystem</li>
                            <li><strong>Global expansion:</strong> International registry network</li>
                        </ul>
                    </div>
                </div>
            </div>

            <h2>Building Sustainable Innovation</h2>
            <p>This isn't just about technology—it's about creating a model that can evolve and grow for decades:</p>

            <div class="grid-3" style="margin-top: var(--spacing-lg);">
                <div class="card">
                    <div class="card-content text-center">
                        <div style="font-size: 3rem; margin-bottom: var(--spacing-md);">💡</div>
                        <h3>Smart Technology</h3>
                        <p>Leveraging AI and automation where it adds real value, not just because we can</p>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-content text-center">
                        <div style="font-size: 3rem; margin-bottom: var(--spacing-md);">🤝</div>
                        <h3>Community Collaboration</h3>
                        <p>Building with patient advocacy groups, researchers, and clinics from day one</p>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-content text-center">
                        <div style="font-size: 3rem; margin-bottom: var(--spacing-md);">📈</div>
                        <h3>Sustainable Growth</h3>
                        <p>Creating funding models that support long-term research impact</p>
                    </div>
                </div>
            </div>

            <div class="message-box" style="margin-top: var(--spacing-2xl);">
                <h3>What MOVR is Currently Working on</h3>
                <p>We're in an exciting validation phase that will determine the future of neuromuscular disease research infrastructure. We're being methodical, responsible, and ambitious—exactly what the research community deserves.</p>
                <p><strong>Questions about our current work?</strong> Contact us at <a href="mailto:mdamovr@mdausa.org"><strong>mdamovr@mdausa.org</strong></a></p>
            </div>
        `
    },
    faq: {
        title: 'Frequently Asked Questions',
        content: `
            <div class="content-header">
                <h1>Frequently Asked Questions</h1>
                <div class="badge badge-secondary">Common Questions</div>
            </div>
            
            <div class="alert alert-info">
                <h3>❓ Common Questions About MOVR Transition</h3>
                <p>Find answers to the most frequently asked questions about MOVR's evolution from the legacy platform to MOVR 2.0.</p>
            </div>
            
            <h2>About MOVR 2.0</h2>
            
            <div class="card">
                <div class="card-header">
                    <h3>What is MOVR 2.0?</h3>
                </div>
                <div class="card-content">
                    <p>MOVR 2.0 is the next generation neuromuscular disease registry platform that moves from manual data entry to automated EMR integration while maintaining gold standard data quality and building open source tools for the entire research community.</p>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3>How is MOVR 2.0 different from the original MOVR?</h3>
                </div>
                <div class="card-content">
                    <p>While the original MOVR required manual data entry from clinical staff, MOVR 2.0 features:</p>
                    <ul>
                        <li><strong>Automated data collection</strong> through EMR integration</li>
                        <li><strong>Real-time processing</strong> and validation</li>
                        <li><strong>Open source tools</strong> for the research community</li>
                        <li><strong>Reduced site burden</strong> while maintaining data quality</li>
                    </ul>
                </div>
            </div>
            
            <h2>For Previous MOVR Participants</h2>
            
            <div class="card">
                <div class="card-header">
                    <h3>I was enrolled in the original MOVR. What happened to my data?</h3>
                </div>
                <div class="card-content">
                    <p>Your participation in the original MOVR has concluded, and your consent has been withdrawn as planned. However, the data you contributed continues to support important neuromuscular disease research through approved studies and publications.</p>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3>Can I get a copy of my MOVR data?</h3>
                </div>
                <div class="card-content">
                    <p>Yes! You can request your historical MOVR data through our <a href="https://mdausa.tfaforms.net/389761" target="_blank">Legacy Data Request Form</a>. We'll provide you with a summary of the data you contributed to the registry.</p>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3>Can I participate in MOVR 2.0?</h3>
                </div>
                <div class="card-content">
                    <p>Absolutely! We'd love to have you join us in the next chapter. MOVR 2.0 enrollment will be opening soon. Send us an email at <a href="mailto:MDAMOVR@mdausa.org">MDAMOVR@mdausa.org</a> to express your interest, and we'll keep you posted as soon as registration opens.</p>
                </div>
            </div>
            
            <h2>For Researchers</h2>
            
            <div class="card">
                <div class="card-header">
                    <h3>Can I still access original MOVR data for research?</h3>
                </div>
                <div class="card-content">
                    <p>Legacy MOVR data (USNDR 2013-2018 and MOVR 2019-2025) remains available for approved research studies. Contact us at <a href="mailto:MDAMOVR@mdausa.org">MDAMOVR@mdausa.org</a> to discuss data access for your research project.</p>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3>How can I get involved with MOVR 2.0 development?</h3>
                </div>
                <div class="card-content">
                    <p>We're building MOVR 2.0 with the research community. You can:</p>
                    <ul>
                        <li><strong>Join our beta program</strong> to test new tools</li>
                        <li><strong>Contribute to open source development</strong></li>
                        <li><strong>Partner with us</strong> for EMR integration pilots</li>
                        <li><strong>Provide feedback</strong> on platform features</li>
                    </ul>
                    <p>Contact us at <a href="mailto:MDAMOVR@mdausa.org">MDAMOVR@mdausa.org</a> to learn more.</p>
                </div>
            </div>
            
            <h2>Technical Questions</h2>
            
            <div class="card">
                <div class="card-header">
                    <h3>What EMR systems will MOVR 2.0 support?</h3>
                </div>
                <div class="card-content">
                    <p>MOVR 2.0 is being built with FHIR (Fast Healthcare Interoperability Resources) standards to support integration with major EMR systems including Epic, Cerner, and others. We're starting with pilot programs at select sites and expanding based on demand.</p>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3>How will data privacy and security be maintained?</h3>
                </div>
                <div class="card-content">
                    <p>MOVR 2.0 maintains the highest standards of data protection:</p>
                    <ul>
                        <li><strong>HIPAA compliance</strong> with enhanced security measures</li>
                        <li><strong>Data encryption</strong> at rest and in transit</li>
                        <li><strong>Role-based access controls</strong> for research data</li>
                        <li><strong>Regular security audits</strong> and monitoring</li>
                    </ul>
                </div>
            </div>
            
            <h2>Still Have Questions?</h2>
            
            <div class="cta-box">
                <h4>Contact the MOVR Team</h4>
                <p>If you don't see your question answered here, please reach out to us directly at <a href="mailto:MDAMOVR@mdausa.org"><strong>MDAMOVR@mdausa.org</strong></a>. We're here to help!</p>
            </div>
        `
    }
};
