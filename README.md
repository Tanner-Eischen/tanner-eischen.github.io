# Tanner Eischen — Portfolio

[![Portfolio checks and deployment](https://github.com/Tanner-Eischen/tanner-eischen.github.io/actions/workflows/pages.yml/badge.svg)](https://github.com/Tanner-Eischen/tanner-eischen.github.io/actions/workflows/pages.yml)

The source for [tanner-eischen.github.io](https://tanner-eischen.github.io), a compact portfolio focused on AI/ML engineering, full-stack product development, and applied data work.

## What’s here

- A responsive, single-page portfolio built with semantic HTML, modern CSS, and plain JavaScript
- Six selected project case studies with direct source links
- Accessible navigation, keyboard focus states, reduced-motion support, and structured headings
- Automated HTML, formatting, and local-link checks
- GitHub Pages deployment on every successful push to `main`

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:8080`.

## Verify

```bash
npm run check
```

The check suite validates formatting, HTML structure, in-page anchors, local asset references, and JavaScript syntax.

## Structure

```text
.
├── assets/             # Portrait, résumé, and retained media
├── css/style.css       # Layout, visual system, and responsive behavior
├── js/custom.js        # Navigation and progressive reveal behavior
├── scripts/            # Lightweight repository checks
├── index.html          # Portfolio content and metadata
└── .github/workflows/  # Quality gate and GitHub Pages deployment
```

## License

Portfolio content and personal assets are © Tanner Eischen. Source code may be reused with attribution.
