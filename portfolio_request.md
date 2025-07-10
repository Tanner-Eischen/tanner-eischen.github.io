## FEATURE:

Redesign and upgrade my personal portfolio website to reflect my advanced capabilities in AI-first full-stack engineering and project development. The site should retain its minimalist, modern aesthetic while incorporating clearer branding, updated project showcases, and a stronger narrative across the homepage.

Key features to implement:

- Replace the tab-based project layout with individual modern project cards.
- Add the following four featured projects:
  - DissertAI – Academic AI Writing Assistant
  - Leafwise – AI-powered Plant Disease Detector
  - Amazon KDP Niche Hunter (renamed Publishing Strategist)
  - Master's Thesis – Sawtooth Ridge Igneous Intrusion Study
- Add links to GitHub repositories and live demos (if available).
- Improve responsiveness on smaller screen widths (≤ 400px).
- Update meta tags (`<title>`, `<meta name="description">`, OG tags).
- Improve accessibility (add `alt` attributes, keyboard navigation support).
- Add animated hover effects or subtle transitions to project cards.
- Include prominent GitHub and LinkedIn links in header and footer.
- Create a brief, compelling “About” summary that aligns with my data/AI/dev brand.

## EXAMPLES:

Use the following example code pattern for project cards:

```html
<div class="project-card">
  <h4>DissertAI – Academic AI Writing Assistant</h4>
  <p>Modular web app leveraging OpenAI and Supabase to assist with academic writing. Features semantic citation search, grammar feedback, abstract generator, and logical flow mapping.</p>
  <p><strong>Tech Stack:</strong> React, Zustand, Supabase Edge, OpenAI API</p>
  <a href="https://github.com/Tanner-Eischen/DissertAI" target="_blank">View Code</a>
  <a href="https://dissertai.example.com" target="_blank">Live Demo</a>
</div>
```

Repeat this pattern for:

- **Leafwise**  
  GitHub: https://github.com/Tanner-Eischen/LeafWise

- **Publishing Strategist (KDP Niche Hunter)**  
  GitHub: https://github.com/Tanner-Eischen/PublishingStrategist

- **DissertAI**  
  GitHub: https://github.com/Tanner-Eischen/DissertAI

The current project section exists in `<section id="Projects">` within `index.html`. Replace the `tablinks/tabcontent` interaction model with a clean, responsive, static layout using modern cards. Bootstrap or TailwindCSS cards may serve as visual references.

## DOCUMENTATION:

- Your website uses `css/style.css` and `bootstrap.min.css`, and includes `wow.min.js` animations.
- Section IDs in use: `#Projects`, `#about`, `#skills`, `#Edu`, `#Exp`, `#contact`
- Scripts: `smoothscroll.js`, `wow.min.js`, `custom.js`

Preserve animation functionality or substitute with CSS transitions. Ensure consistency with existing layout while enhancing functionality.

## OTHER CONSIDERATIONS:

- Retain a minimalist visual identity (smart, clean, modern, text-forward).
- Avoid looking amateurish — remove clutter, ensure visual consistency, and avoid outdated styles.
- Improve mobile rendering and wrapping for small screen widths.
- Add a favicon and SEO-friendly `<head>` metadata (e.g., social previews).
- Include a link to downloadable resume PDF.
- Preserve academic credibility (e.g., Master’s thesis) while emphasizing your AI/software capabilities.
