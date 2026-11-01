# PF-05 browser QA inventory

The owner now authorizes browser/UI testing, completion of Wave 2, commits and
public repositories. Resume/credential questions and revisions are out of this
work's scope; existing wording is retained without treating it as newly verified.

Test the built artifact, then repeat the critical paths on the published site.
Use a fresh signed-out Chromium context. Do functional checks through visible
links, buttons and keyboard input, followed by a separate screenshot inspection.

| Claim/control | Functional check | Visual state/evidence |
| --- | --- | --- |
| Introduction and primary action | Load built home; activate View projects | Initial desktop/half/mobile viewport; readable introduction and CTA |
| Navigation | Work/experience/background/contact anchors; mobile toggle open/closed/open; Escape; link selection | Menu expanded/collapsed, visible focus, no hidden or overlapping controls |
| Scientific case studies | Open all three and supporting pages; breadcrumbs and return links | Titles, results, tables/figures and download region at desktop/mobile |
| Evidence and downloads | Download current JSON/ZIP/CSV/PDF; confirm bytes against built artifact | Readable download labels and adjacent scientific limitations |
| Source links | Open published repositories signed out | No private-only primary source link after visibility update |
| JavaScript disabled | Read/navigate home and case studies at narrow width | Core content/navigation still visible |
| Reduced motion | Inspect reading/navigation with reduced-motion context | No required animation or hidden content |
| Keyboard | Tab to skip link/navigation/project/download actions; focus returns after Escape | Focus visible on light and dark sections |
| Viewport/performance | 1440px, 800px, 390px and 320px; inspect all important regions | No body overflow/clipping; readable contained tables; record transfer bytes |

Exploratory checks: resize while a mobile menu is open, repeat open/close/Escape
cycles, navigate directly to a nested case-study URL, and load a missing route.
Inspect initial view, every scientific figure/table and dense result/download
states. Use normal browser inputs for signoff; DOM metrics supplement screenshots.

Historical API-key exposure found in already-public portfolio history is recorded
privately without key values. The current tree and published build must contain
no secret or restricted new artifact. This does not authorize history rewriting.

## Build review lesson

Cache-versioned HTML entrypoints must be selected through the existing HTML parser, with replacements applied only to actual attribute source locations. Escape the complete replacement URL, including fragments, and compile pages before replacing the last successful build. Regression cases cover comments, inline script text, single-quoted attributes and entity-encoded quotes/ampersands. This narrowly scoped lesson is recorded here; no additional AGENTS.md rule or approval gate is required.
