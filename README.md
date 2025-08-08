# OpenMOVR Community Initiative

Community-driven neuromuscular disease research platform featuring comprehensive documentation, Google Summer of Code 2026 program, and the MOVR Legacy Datahub - a pip-installable Python library providing immediate access to established research datasets.

**Founded by ADPAREDES • Andre • OpenMOVR Founder & Architect**

## 🌟 Overview

OpenMOVR is a comprehensive research community initiative that transforms neuromuscular disease research through:
- **Legacy Data Access**: MOVR Datahub Python library with pip installation for immediate dataset access
- **Google Summer of Code 2026**: Mentorship program developing the MOVR Legacy Datahub Library
- **Interactive Documentation**: Comprehensive FAQ and platform guides with question-based navigation
- **Research Impact**: Advanced pharmacovigilance and real-world evidence applications
- **Community Building**: Open collaboration between researchers, developers, and data scientists

## 🏗️ Website Architecture

The OpenMOVR website features a comprehensive structure designed for community engagement and research collaboration:

### Core Pages
- **Homepage (`index.html`)**: Community landing page with Research Impact showcase and GSoC integration
- **Documentation System (`docs/`)**: Interactive guides and comprehensive FAQ with collapsible navigation
- **GSoC 2026 Program (`gsoc.html`)**: Complete mentorship program page with team profiles and project focus
- **MOVR Legacy Datahub**: Pip-installable Python library for immediate dataset access

### Documentation Structure
- **`docs/faq.html`**: Interactive FAQ with collapsible question-based navigation
- **`docs/current-work.html`**: Development status and active projects
- **`docs/platform-vision.html`**: Future roadmap and technical vision
- **`docs/movr-data-hub.html`**: Comprehensive data access documentation

### Technical Stack
- **Frontend**: Modern HTML5 with responsive CSS3 and interactive JavaScript
- **Configuration**: Centralized `js/config.js` for easy content management
- **Documentation**: Interactive FAQ system with smooth animations
- **Accessibility**: Enhanced button contrast and keyboard navigation
- **Mobile-First**: Responsive design optimized for all devices

## 🎨 Design Philosophy

- **Community-Focused**: Clean, welcoming design that encourages collaboration
- **Research-Forward**: Data-driven aesthetic supporting scientific communication
- **Accessibility-First**: High contrast buttons, clear typography, semantic HTML
- **Interactive Navigation**: Question-based documentation with smooth animations

## 📊 Key Features

### MOVR Legacy Datahub Library
- **Pip Installation**: `pip install movr-datahub` for immediate dataset access
- **Python Integration**: Seamless data loading for research workflows
- **Legacy Datasets**: Access to established neuromuscular disease research data
- **Documentation**: Comprehensive guides for researchers and data scientists

### Google Summer of Code 2026 Program
- **Team Leadership**: Andre Daniel Paredes (GSoC Mentor & Technical Lead) and Jessica Waits (GSoC Administrator & Project Lead)
- **Project Focus**: Priority development of MOVR Legacy Datahub Library
- **Student Capacity**: 1 student for focused, mentored development
- **Community Impact**: Open source contribution to neuromuscular disease research

### Interactive Documentation System
- **FAQ Navigation**: Collapsible question-based interface with smooth animations
- **Comprehensive Guides**: Platform vision, current work status, and data hub documentation
- **Cross-Linking**: Integrated navigation between documentation sections

### Research Impact Showcase
- **Pharmacovigilance Applications**: Advanced signal detection and drug safety monitoring
- **Real-World Evidence**: Post-market surveillance and comparative effectiveness research
- **Clinical Decision Support**: Evidence-based treatment recommendations

### Audience-Specific Content
- **Researchers**: MOVR Datahub Python library access and GSoC mentorship opportunities
- **Data Scientists**: Legacy dataset integration and analysis workflows
- **Students**: Google Summer of Code 2026 program with expert mentorship
- **Community**: Open collaboration and contribution opportunities

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
1. **Configuration File** (`js/config.js`): Site navigation, project priorities, team information
2. **Documentation System**: Interactive FAQ and comprehensive guides in `docs/` folder
3. **GSoC Program**: Team profiles, project focus, and program details in `gsoc.html`
4. **Asset Updates**: Replace images in `assets/` folder for visual content

### MOVR Datahub Configuration
```javascript
// js/config.js - Priority project focus
const siteConfig = {
  projects: [
    {
      title: "MOVR Legacy Datahub Library",
      description: "Pip-installable Python library for legacy dataset access",
      priority: "2025 Development Focus",
      installation: "pip install movr-datahub"
    }
  ],
  gsoc: {
    year: 2026,
    capacity: "1 student",
    mentor: "Andre Daniel Paredes",
    administrator: "Jessica Waits"
  }
}
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
- **Andre Daniel Paredes**: GSoC Mentor & Technical Lead, OpenMOVR Founder & Architect
- **Jessica Waits**: GSoC Administrator & Project Lead

### Program Information
- **Google Summer of Code 2026**: Applications opening soon for 1 student position
- **MOVR Legacy Datahub**: `pip install movr-datahub` for immediate access
- **Documentation**: Comprehensive guides available in `docs/` section
- **Community**: Open collaboration and contribution opportunities

## 🚀 Getting Started

### For Researchers
```bash
# Install MOVR Datahub Library
pip install movr-datahub

# Import and start analyzing
import movr_datahub as movr
data = movr.load_dataset('neuromuscular_registry')
```

### For GSoC 2026 Students
1. Review the comprehensive documentation in `docs/`
2. Explore the MOVR Legacy Datahub Library project focus
3. Connect with mentors Andre and Jessica for program details
4. Prepare for application when program opens

### For Contributors
1. Clone the repository and explore the interactive documentation
2. Review current work status in `docs/current-work.html`
3. Understand platform vision in `docs/platform-vision.html`
4. Engage with the community through collaborative development

## 📄 License

Copyright © 2025 OpenMOVR Community Initiative. 
Founded by ADPAREDES • Andre • OpenMOVR Founder & Architect.

---

**OpenMOVR** - Advancing neuromuscular disease research through community collaboration, legacy data access, and open science initiatives.
