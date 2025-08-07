# MOVR 2.0 Website

Next-generation EMR-integrated neuromuscular disease data ecosystem website. Built on MDA's 75-year legacy of patient advocacy and research excellence.

## 🌟 Overview

This website showcases MOVR 2.0, a revolutionary platform that transforms neuromuscular disease research through:
- **Proven Track Record**: 5,895+ participants across 73 sites with 20,152+ encounters
- **EMR Integration**: FHIR-based automation reducing manual data entry by 70%
- **Co-Development Partnerships**: Strategic collaborations with technology and industry partners
- **Open Science**: Democratizing research through open source tools and APIs

## 🏗️ Website Architecture

The website follows the strategic architecture outlined in the MOVR 2.0 Website Strategy document:

### Pages Structure
- **Homepage (`index.html`)**: Credibility + value proposition with impact dashboard
- **Our Impact (`impact.html`)**: Proven track record and data visualizations  
- **The Platform (`platform.html`)**: Technical architecture and co-development model
- **Partner With Us (`partners.html`)**: Business development and partnership tiers
- **For Patients (`patients.html`)**: Patient-friendly participation information
- **Open Science (`open-science.html`)**: Developer community and research collaboration
- **About (`about.html`)**: Organizational credibility and team information

### Technical Stack
- **Frontend**: Static HTML5 with modern CSS3 and vanilla JavaScript
- **Styling**: Modular CSS with professional medical design
- **Charts**: Chart.js for interactive data visualizations
- **Configuration**: JavaScript-based configuration for easy content updates
- **Responsive**: Mobile-first responsive design

## 🎨 Design Philosophy

- **Professional Medical**: Clean, trustworthy, data-forward aesthetic
- **Innovation-Forward**: Modern without being flashy
- **Accessibility-First**: High contrast, clear typography, semantic HTML
- **Mobile-Responsive**: Optimized for tablets and phones used by hospital directors

## 📊 Key Features

### Interactive Impact Dashboard
- Animated statistics showing 5,895+ participants, 73 sites, 34 states
- Configurable charts for disease breakdown and growth metrics
- Real-time number animations on scroll

### Three-Pillar Value Proposition
1. **Proven Track Record**: 10+ years of clinical excellence
2. **Current Innovation**: EMR integration & automation  
3. **Future Vision**: Open science ecosystem

### Audience-Specific Content
- **Hospital Directors**: Evidence of scale, regulatory compliance, ease of adoption
- **Industry Partners**: Data quality, commercial value, partnership opportunities
- **Patients**: Transparency, trust, clear benefits
- **Developers**: Technical depth, open source roadmap, contribution opportunities

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
├── assets/                 # Images and media files
│   ├── movr_logo_clean.jpg    # Main logo
│   ├── movr_hero_banner_*.jpg # Rotating hero banners
│   └── ...
├── css/
│   └── main.css           # Main stylesheet with all components
├── js/
│   ├── config.js          # Site configuration
│   └── main.js            # Interactive functionality
├── index.html             # Homepage
├── impact.html            # Our Impact page
├── platform.html          # Platform technical details
├── partners.html          # Partnership opportunities
├── patients.html          # Patient information
├── open-science.html      # Developer community
├── about.html             # About MDA and team
├── launch.sh              # Local development server script
└── README.md              # This file
```

## 🎯 Target Audiences & Messaging

### Hospital Directors & Clinical Partners
- **Message**: "Proven partner with a decade of clinical excellence, now offering cutting-edge EMR integration"
- **Content Focus**: Evidence of scale, regulatory compliance, clinical impact

### Industry Partners (Pharma/Biotech)  
- **Message**: "Strategic co-development opportunity with unprecedented real-world data access"
- **Content Focus**: Data quality, commercial value, partnership opportunities

### Patients & Families
- **Message**: "Your trusted advocate advancing research while protecting your interests"
- **Content Focus**: Transparency, trust, benefit understanding

### Developers & Data Scientists
- **Message**: "Open science initiative seeking collaborators to democratize research"
- **Content Focus**: Technical depth, open source roadmap, contribution opportunities

## 📈 Content Management

### Easy Updates
Non-technical team members can update most content through:
1. **Configuration File** (`js/config.js`): Statistics, participant counts, disease data
2. **Asset Updates**: Replace images in `assets/` folder
3. **Text Content**: Direct HTML editing for messaging updates

### Adding New Data
```javascript
// To add a new disease to the breakdown:
diseases: [
  // ... existing diseases
  {name: 'New Disease', participants: 123, encounters: 456, color: '#hexcolor'}
]

// To update impact numbers:
impact: {
  totalParticipants: 6000,  // New total
  totalSites: 75,           // New site count
  // ...
}
```

## 🔧 Development Notes

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Progressive enhancement for older browsers
- Responsive design for mobile devices

### Performance Optimizations
- Optimized images and assets
- Minimal JavaScript dependencies (only Chart.js)
- CSS Grid and Flexbox for efficient layouts
- Lazy loading for charts and animations

### Accessibility Features
- Semantic HTML structure
- ARIA labels for screen readers
- High contrast color scheme
- Keyboard navigation support
- Print-friendly styles

## 📞 Contact & Support

- **General Inquiries**: info@movr.org
- **Partnerships**: partnerships@movr.org  
- **Patient Support**: patients@movr.org
- **Technical**: developers@movr.org

## 📄 License

Copyright © 2025 Muscular Dystrophy Association. All rights reserved.

---

**MOVR 2.0** - Advancing neuromuscular disease research through innovative data partnerships.
