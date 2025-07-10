name: "Portfolio Website Redesign - Modern Project Cards & Enhanced UX"
description: |
  Complete redesign of personal portfolio website to showcase AI-first full-stack engineering capabilities
  with modern project cards, improved accessibility, and enhanced mobile responsiveness.

---

## Core Principles
1. **Context is King**: Include ALL necessary documentation, examples, and caveats
2. **Validation Loops**: Provide executable tests/lints the AI can run and fix
3. **Information Dense**: Use keywords and patterns from the codebase
4. **Progressive Success**: Start simple, validate, then enhance
5. **Global rules**: Be sure to follow all rules in CLAUDE.md

---

## Goal
Redesign and upgrade personal portfolio website to reflect advanced capabilities in AI-first full-stack engineering. Replace tab-based project layout with modern project cards, improve mobile responsiveness, enhance accessibility, and create stronger narrative branding.

## Why
- **Business value**: Better showcase of technical capabilities to potential employers/clients
- **User experience**: Modern, accessible interface that works across all devices
- **Professional branding**: Align visual identity with AI/ML expertise and full-stack capabilities
- **Integration**: Seamless experience that maintains existing animations while modernizing layout

## What
### User-visible behavior and technical requirements
- Replace tab-based project section with responsive project cards
- Add 4 featured projects: DissertAI, Leafwise, Publishing Strategist, Master's Thesis
- Improve mobile responsiveness (≤400px screen widths)
- Enhanced accessibility with proper alt attributes and keyboard navigation
- Updated meta tags for SEO and social sharing
- Prominent GitHub/LinkedIn links in header and footer
- Animated hover effects on project cards
- Brief, compelling "About" summary aligned with AI/dev brand

### Success Criteria
- [ ] All 4 project cards display correctly with proper styling
- [ ] Mobile responsiveness works on screens ≤400px
- [ ] All images have proper alt attributes
- [ ] Meta tags include title, description, and OG tags
- [ ] GitHub/LinkedIn links prominently displayed
- [ ] Hover animations work smoothly
- [ ] No JavaScript errors in console
- [ ] Site loads and functions without tab-based JavaScript

---

## All Needed Context
### Documentation & References

```yaml
# MUST READ - Include these in your context window
- url: https://getbootstrap.com/docs/4.6/components/card/
  why: Bootstrap card component patterns for responsive design
  
- url: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA
  why: ARIA attributes for accessibility compliance
  
- url: https://web.dev/responsive-web-design-basics/
  why: Mobile-first responsive design principles

- file: index.html
  why: Current structure, existing sections, and animation patterns to preserve
  
- file: css/style.css
  why: Existing styling patterns, color scheme, and animation classes
  
- file: js/custom.js
  why: Current tab functionality to remove and WOW.js patterns to preserve

- docfile: portfolio_request.md
  why: Specific project details, GitHub links, and design requirements
```

### Current Codebase tree
```bash
├── index.html                 # Main portfolio page with tab-based projects
├── css/
│   ├── style.css             # Custom styles with existing project tab styling
│   ├── bootstrap.min.css     # Bootstrap 4.6 framework
│   ├── animate.min.css       # CSS animations
│   └── font-awesome.min.css  # Icon fonts
├── js/
│   ├── custom.js             # Tab functionality and WOW.js initialization
│   ├── wow.min.js           # Animation library
│   ├── smoothscroll.js      # Smooth scrolling navigation
│   └── jquery.js            # jQuery library
├── images/                   # Project images and logos
└── portfolio_request.md      # Feature requirements and project details
```

### Known Gotchas of our codebase & Library Quirks
```python
# CRITICAL: Bootstrap 4.6 is used - ensure card classes are compatible
# CRITICAL: WOW.js animations use data-wow-delay attributes - preserve these
# CRITICAL: Existing smooth scroll navigation must continue working
# CRITICAL: Font Awesome icons are v4 - use fa-* classes not fas-*
# CRITICAL: Current CSS uses flexbox and specific padding/margin patterns
# CRITICAL: Mobile navigation collapse functionality must be preserved
```

---

## Implementation Blueprint
### Per task pseudocode
```html
<!-- Task 1: Replace Projects Section Structure -->
<section id="Projects">
  <div class="container text-center">
    <h2>Projects</h2>
    <div class="projects-grid">  <!-- New: CSS Grid layout -->
      <!-- PATTERN: Each card follows Bootstrap card structure -->
      <div class="project-card wow fadeInUp" data-wow-delay="0.2s">
        <div class="card-header">
          <h4>Project Title</h4>
        </div>
        <div class="card-body">
          <p>Project description...</p>
          <p><strong>Tech Stack:</strong> Technologies used</p>
        </div>
        <div class="card-footer">
          <!-- PATTERN: External links with target="_blank" and proper ARIA -->
          <a href="github-url" target="_blank" rel="noopener" aria-label="View source code">
            <i class="fa fa-github"></i> View Code
          </a>
          <a href="demo-url" target="_blank" rel="noopener" aria-label="View live demo">
            <i class="fa fa-external-link"></i> Live Demo
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Task 2: Enhanced Meta Tags -->
<head>
  <!-- PATTERN: SEO and social sharing optimization -->
  <title>Tanner Eischen - AI/ML Engineer & Full-Stack Developer</title>
  <meta name="description" content="AI-first full-stack engineer specializing in machine learning, data analysis, and modern web development. View my portfolio of AI-powered applications.">
  <meta property="og:title" content="Tanner Eischen - AI/ML Engineer">
  <meta property="og:description" content="Portfolio showcasing AI-powered applications and full-stack development projects">
  <meta property="og:type" content="website">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- CRITICAL: Add favicon -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
</head>

<!-- Task 3: Enhanced Navigation with Social Links -->
<nav class="navbar navbar-fixed-top custom-navbar">
  <!-- PATTERN: Add social links to navbar-right -->
  <ul class="nav navbar-nav navbar-right">
    <li><a href="#home" class="smoothScroll">HOME</a></li>
    <!-- ... existing nav items ... -->
    <li><a href="https://github.com/tanner-eischen" target="_blank" aria-label="GitHub Profile">
      <i class="fa fa-github"></i>
    </a></li>
    <li><a href="https://www.linkedin.com/in/tanner-eischen" target="_blank" aria-label="LinkedIn Profile">
      <i class="fa fa-linkedin"></i>
    </a></li>
  </ul>
</nav>
```

### Integration Points
```yaml
CSS:
  - add to: css/style.css
  - pattern: ".projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }"
  - pattern: ".project-card { background: #fff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.3s ease; }"
  - pattern: "@media (max-width: 400px) { .projects-grid { grid-template-columns: 1fr; gap: 1rem; } }"
  
JAVASCRIPT:
  - remove from: js/custom.js
  - functions: "openTab(), openInnerTab(), tab-related event listeners"
  - preserve: "WOW.js initialization, smooth scroll, skill hover effects"
  
HTML:
  - replace in: index.html
  - section: "#Projects .tab and .tabcontent elements"
  - preserve: "section structure, container classes, h2 heading"
```

---

## Validation Loop
### Level 1: Syntax & Style

```bash
# Run these FIRST - fix any errors before proceeding
# Validate HTML structure
echo "Checking HTML validation..."
# Check for proper semantic HTML and accessibility

# Validate CSS syntax
echo "Checking CSS syntax..."
# Ensure no CSS syntax errors

# Expected: No errors. If errors, READ the error and fix.
```

### Level 2: Functionality Test
```bash
# Test responsive design
echo "Testing responsive breakpoints..."
# Check mobile layout at 400px, 768px, 1024px widths

# Test accessibility
echo "Testing accessibility..."
# Verify all images have alt attributes
# Check keyboard navigation works
# Validate ARIA labels on links

# Test animations
echo "Testing WOW.js animations..."
# Verify project cards animate on scroll
# Check hover effects work smoothly
```

### Level 3: Integration Test
```bash
# Start local server
python -m http.server 8000
# OR
npx serve .

# Test the website
open http://localhost:8000

# Manual testing checklist:
# - All 4 project cards display correctly
# - Mobile responsiveness works (resize browser to 400px)
# - GitHub/LinkedIn links work and open in new tabs
# - Hover effects on project cards work
# - Smooth scrolling navigation still works
# - WOW.js animations trigger on scroll
# - No JavaScript console errors

# Expected: All functionality works, no console errors
# If error: Check browser console for JavaScript errors
```

## Final validation Checklist
- [ ] All 4 project cards render with correct content and styling
- [ ] Mobile layout works properly on screens ≤400px width
- [ ] All images have descriptive alt attributes
- [ ] Meta tags include proper title, description, and OG tags
- [ ] GitHub and LinkedIn links prominently displayed and functional
- [ ] Hover animations work smoothly on project cards
- [ ] WOW.js animations still trigger correctly
- [ ] Smooth scroll navigation preserved
- [ ] No JavaScript console errors
- [ ] Site loads quickly and all assets found
- [ ] Accessibility: keyboard navigation works
- [ ] Social links open in new tabs with proper security attributes

---

## Project Data for Implementation

### DissertAI - Academic AI Writing Assistant
- **Description**: Modular web app leveraging OpenAI and Supabase to assist with academic writing. Features semantic citation search, grammar feedback, abstract generator, and logical flow mapping.
- **Tech Stack**: React, Zustand, Supabase Edge Functions, OpenAI API
- **GitHub**: https://github.com/Tanner-Eischen/DissertAI
- **Demo**: TBD (no live demo mentioned)

### Leafwise - AI-powered Plant Disease Detector  
- **Description**: Computer vision application using machine learning to identify plant diseases from leaf images. Provides treatment recommendations and disease prevention tips.
- **Tech Stack**: Python, TensorFlow/PyTorch, Flask, OpenCV
- **GitHub**: https://github.com/Tanner-Eischen/LeafWise
- **Demo**: TBD (no live demo mentioned)

### Publishing Strategist (formerly Amazon KDP Niche Hunter)
- **Description**: Python-based MCP agent for Amazon KDP market analysis. Uses Keepa API and Google Trends to identify low-competition publishing niches and keyword opportunities.
- **Tech Stack**: Python, MCP (Model Context Protocol), Keepa API, Google Trends (pytrends), Redis caching
- **GitHub**: https://github.com/Tanner-Eischen/PublishingStrategist
- **Demo**: TBD (no live demo mentioned)

### Master's Thesis - Sawtooth Ridge Igneous Intrusion Study
- **Description**: M.S. thesis published through East Carolina University analyzing the geometry and construction of upper crustal igneous intrusions using spatial data analysis.
- **Tech Stack**: ArcGIS, MATLAB, Spatial Analysis, Field Research
- **Link**: https://thescholarship.ecu.edu/items/f0b974ae-e010-47bc-9ffc-33e8929f1269/full
- **Demo**: Academic publication with field photos and GIS analysis

---

**Quality Score: 9/10** - Comprehensive context provided with existing codebase patterns, specific project details, validation loops, and clear implementation path. High confidence for one-pass implementation success.