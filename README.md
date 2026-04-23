# Calvin Williams III — Portfolio (v2)

Personal portfolio website. Editorial, minimalist, accessible, production-ready.

## What's in this folder

```
portfolio-v2/
├─ index.html                 ← main page
├─ css/
│  └─ style.css               ← all styles (light + dark themes)
├─ js/
│  ├─ data.js                 ← EDIT THIS to update content + form ID
│  ├─ render.js               ← safely renders data into the page
│  └─ main.js                 ← UI: theme, command palette, form, etc.
├─ assets/
│  ├─ calvin.jpg              ← portrait
│  ├─ logo.jpg                ← gold "III" logo
│  └─ intel-dashboard.jpg     ← Tableau dashboard screenshot
├─ .nojekyll                  ← tells GitHub Pages not to process files
├─ .gitignore
├─ README.md                  ← this file
└─ SETUP.md                   ← step-by-step deploy guide
```

## Quick start

1. Open `SETUP.md` and follow the steps end-to-end.
2. To update content (projects, awards, certifications, socials) — edit only `js/data.js`.
3. Replace photos in `/assets/` keeping the same filenames.

## Features

- Light/dark theme toggle (remembers your choice)
- Command palette — press ⌘K (Mac) or Ctrl+K (Windows)
- Copy-to-clipboard email button
- Secure contact form with honeypot + rate limit + server-side validation
- Print-optimized CV view (Cmd/Ctrl+P)
- Fully responsive, accessible (WCAG AA), respects reduced motion

## License

© Calvin Williams III. All rights reserved.
