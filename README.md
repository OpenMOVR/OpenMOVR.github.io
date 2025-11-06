# OpenMOVR Community Initiative

Open science initiative for neuromuscular disease research featuring streamlined design, Google Summer of Code 2026 program, and comprehensive documentation. Building the future through transparent collaboration.

**Founded by Andre Daniel Paredes, PhD • OpenMOVR Founder & Architect**

## 🌟 Overview

OpenMOVR is an open science initiative that advances neuromuscular disease research through:
- **Simplified Experience**: Clean, focused landing page with key information and clear calls-to-action
- **Google Summer of Code 2026**: Mentorship program developing the MOVR Legacy Datahub Library (priority project)
- **Real Research Impact**: 6,021+ participants, 20,883+ clinical visits, 12 years of neuromuscular disease data
- **Comprehensive Documentation**: Interactive FAQ and platform guides with question-based navigation
- **Community Building**: Open collaboration between researchers, developers, and data scientists

## 🏗️ Website Architecture

The OpenMOVR website features a comprehensive structure designed for community engagement and research collaboration:

### Core Pages
- **Homepage (`index.html`)**: Clean, streamlined landing page with configurable stats and clear messaging
- **Documentation System (`docs/`)**: Interactive guides and comprehensive FAQ with collapsible navigation
- **GSoC 2026 Program (`gsoc.html`)**: Complete mentorship program page with colorful design and team profiles
- **Pilot Program (`pilot/`)**: MOVR 2.0 enrollment landing page with email automation

### Documentation Structure
- **`docs/faq.html`**: Interactive FAQ with collapsible question-based navigation
- **`docs/current-work.html`**: Development status and active projects
- **`docs/platform-vision.html`**: Future roadmap and technical vision
- **`docs/movr-data-hub.html`**: MOVR Legacy data documentation

### Technical Stack
- **Frontend**: Modern HTML5 with responsive CSS3 and interactive JavaScript
- **Configuration**: Centralized `js/config.js` for easy content management
- **Documentation**: Interactive FAQ system with smooth animations
- **Accessibility**: Enhanced button contrast and keyboard navigation
- **Mobile-First**: Responsive design optimized for all devices

## 🎨 Design Philosophy

- **Simplified & Focused**: Clean design with clear messaging and reduced information density
- **Research-Forward**: Data-driven aesthetic supporting scientific communication with configurable stats
- **Accessibility-First**: High contrast, clear typography, semantic HTML, MDA brand colors
- **Interactive Navigation**: Question-based documentation with smooth animations and user-friendly FAQ

## 📊 Key Features

### Streamlined Homepage (index.html)
- **Configurable Stats**: JavaScript object for easy updates (participants: 6,021, visits: 20,883, years: 12)
- **Three Core Sections**: What We're Building, Vision & Impact, Get Involved
- **Hero Banner Cycling**: Rotating background images every 5 seconds
- **MDA Brand Colors**: Professional palette aligned with official MDA design

### Google Summer of Code 2026 Program (gsoc.html)
- **Team Leadership**: Andre Daniel Paredes, PhD (GSoC Mentor & Technical Lead) and Jessica Waits (GSoC Administrator)
- **Priority Project**: MOVR Legacy Datahub Python Library (pip-installable for researchers)
- **Student Capacity**: 1 student for focused, mentored development
- **Colorful Design**: Google gradient styling with enhanced CTA sections
- **Compact Fonts**: Smaller base font (0.9rem) for scannable content

### Interactive Documentation System
- **FAQ Navigation**: Collapsible question-based interface with smooth animations
- **Comprehensive Guides**: Platform vision, current work status, and data hub documentation
- **Cross-Linking**: Integrated navigation between documentation sections
- **Question-First Approach**: User-friendly FAQ with expandable answers

### Pilot Program (pilot/)
- **Email Automation**: Power Automate integration for success/waitlist emails
- **Form Integration**: "Call" field (formerly Event) for meeting scheduling
- **FAQ Integration**: Links to comprehensive FAQ with anchor navigation
- **Disease-Specific URLs**: Conditional logic for vendor platform assignments

## 🚀 Quick Start

### Local Development
```bash
# Clone or navigate to the repository
cd /home/andre/openmovr.github.io

# Start local development server
./launch.sh

# Or manually with Python
python3 -m http.server 8000
```

Visit `http://localhost:8000` to view the website.

### Configuration Updates

Most content can be updated through the configuration file:

```javascript
// js/config.js
const siteConfig = {
  impact: {
    totalParticipants: 5895,    // Update participant count
    totalSites: 73,             // Update site count
    // ... other configurable values
  },
  diseases: [
    // Update disease-specific data
  ],
  // ... other sections
}
```

## 📁 File Structure

```
openmovr.github.io/
├── assets/                    # Images and media files
│   ├── movr_logo_clean.jpg       # Main OpenMOVR logo
│   ├── movr_hero_banner_*.jpg    # Rotating hero banners
│   └── ...
├── docs/                      # Documentation system
│   ├── faq.html                  # Interactive FAQ with collapsible navigation
│   ├── current-work.html         # Development status and active projects
│   ├── platform-vision.html     # Future roadmap and technical vision
│   └── movr-data-hub.html        # MOVR Datahub library documentation
├── css/
│   └── main.css              # Main stylesheet with enhanced button contrast
├── js/
│   ├── config.js             # Site configuration with GSoC focus
│   └── main.js               # Interactive functionality
├── index.html                # Community landing page
├── gsoc.html                 # Google Summer of Code 2026 program page
├── launch.sh                 # Local development server script
└── README.md                 # This documentation
```

## 🎯 Target Audiences & Messaging

### Researchers & Data Scientists
- **Message**: "Access legacy neuromuscular disease datasets immediately with pip install movr-datahub"
- **Content Focus**: Python library integration, data analysis workflows, research impact

### Google Summer of Code Students
- **Message**: "Join our 2026 mentorship program developing the MOVR Legacy Datahub Library"
- **Content Focus**: Open source contribution, expert mentorship, community impact

### Academic Community
- **Message**: "Comprehensive documentation and research collaboration platform"
- **Content Focus**: Interactive FAQ, platform vision, current development status

### Open Source Contributors
- **Message**: "Community-driven initiative advancing neuromuscular disease research"
- **Content Focus**: Technical depth, contribution opportunities, collaborative development

## 📈 Content Management

### Easy Updates
Content can be updated through:
1. **Configuration Script** (`index.html` head): Update STATS object for participant/visit counts
2. **Documentation System**: Interactive FAQ and comprehensive guides in `docs/` folder
3. **GSoC Program**: Team profiles, project focus, and program details in `gsoc.html`
4. **Asset Updates**: Replace images in `assets/` folder for visual content

### Stats Configuration (index.html)
```javascript
// Configurable stats at top of index.html
const STATS = {
    participants: 6021,
    clinicalVisits: 20883,
    yearsExperience: 12
};
```

### Documentation Updates
```html
<!-- docs/faq.html - Adding new FAQ items -->
<div class="faq-item">
  <button class="faq-question" onclick="toggleFaq('new-question')">
    <span>New Question?</span>
    <span class="faq-icon">+</span>
  </button>
  <div class="faq-answer" id="new-question">
    <p>New answer content here...</p>
  </div>
</div>
```

## 🔧 Development Notes

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Progressive enhancement for interactive documentation
- Mobile-responsive design for research workflows

### Performance Optimizations
- Optimized images and hero banners
- Smooth CSS animations for FAQ interactions
- Efficient JavaScript for documentation navigation
- Fast loading times for research access

### Accessibility Features
- Enhanced button contrast throughout the site
- Semantic HTML structure for screen readers
- ARIA labels for interactive documentation
- Keyboard navigation for FAQ system
- High contrast design for research environments

### UI/UX Improvements
- Fixed button contrast issues across all sections
- Smooth animations for FAQ collapsible interfaces
- Consistent navigation between documentation pages
- Mobile-optimized layout for on-the-go research access

## 📞 Contact & Support

### Team Leadership
- **Andre Daniel Paredes, PhD**: GSoC Mentor & Technical Lead, OpenMOVR Founder & Architect
- **Jessica Waits**: GSoC Administrator & Project Lead, Director of Clinical Operations

### Program Information
- **Google Summer of Code 2026**: Applications through official GSoC website for 1 student position
- **Priority Project**: MOVR Legacy Datahub Library - pip-installable Python library for researchers
- **Documentation**: Comprehensive guides available in `docs/` section
- **Community**: Open collaboration and contribution opportunities

### Contact
- **Email**: mdamovr@mdausa.org
- **GSoC Inquiries**: mdamovr@mdausa.org?subject=GSoC%202026%20Interest
- **GitHub**: https://github.com/openmovr

## 🚀 Getting Started

### For Researchers & Data Scientists
1. Visit the homepage to see research impact (6,021+ participants, 20,883+ visits)
2. Review comprehensive documentation in `docs/`
3. Learn about MOVR Legacy Datahub Library (priority GSoC 2026 project)
4. Explore pilot program for MOVR 2.0 participation

### For GSoC 2026 Students
1. Read the Google Summer of Code program page at `gsoc.html`
2. Review the priority project: MOVR Legacy Datahub Python Library
3. Connect with mentors Andre Daniel Paredes, PhD and Jessica Waits
4. Prepare project proposal when GSoC applications open

### For Contributors
1. Clone the repository and explore the streamlined homepage
2. Review current work status in `docs/current-work.html`
3. Understand platform vision in `docs/platform-vision.html`
4. Engage with the community through collaborative development

## 📄 License

Copyright © 2025 OpenMOVR Open Science Initiative  
Founded by Andre Daniel Paredes, PhD • OpenMOVR Founder & Architect

---

**OpenMOVR** - Building the future of neuromuscular disease research through open science, community collaboration, and transparent data sharing.
