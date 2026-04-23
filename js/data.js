/* =========================================================================
   data.js — Single source of truth for editable content.
   Edit this file to update projects, awards, certifications, socials, etc.
   No HTML changes required.
   ========================================================================= */

window.PORTFOLIO_DATA = {

  // ------------------------------------------------------------------------
  // CONTACT FORM
  // -------------------------------------------------------------------------
  // Using Formspree (free, no backend needed, works on GitHub Pages):
  //   1. Go to https://formspree.io and sign up (free).
  //   2. Create a new form and point it at calvinwilliams772@gmail.com.
  //   3. Copy your form ID (looks like "xyzabcde" — NOT the full URL).
  //   4. Paste it below as `formspreeId`.
  // Until you add a real ID, the form will gracefully open the visitor's
  // email app with their message pre-filled (mailto fallback).
  contact: {
    formspreeId: "YOUR_FORMSPREE_ID",   // <-- REPLACE THIS
    mailto: "calvinwilliams772@gmail.com",
    minRenderSeconds: 3
  },

  // ------------------------------------------------------------------------
  // ABOUT — body copy under the title row.
  // `lede` renders next to the gold vertical rule. `paragraphs` are regular text.
  // Limited inline markup allowed: <strong>, <em>.
  // ------------------------------------------------------------------------
  about: {
    lede: "Hello world\uD83C\uDF0D, I'm Calvin \u2014 someone people rely on when things need to get figured out.",
    paragraphs: [
      "Currently, I serve as a healthcare leader with experience in <strong>patient access, process improvement, and data analysis</strong>. I work with large datasets using tools like Excel and Tableau to spot trends in performance, then turn those insights into clear, practical recommendations for stakeholders.",
      "I try to balance strong analytical thinking with an understanding of how people actually work and interact. Whether I'm building training materials, improving front desk operations, or leading a team through ambiguous change, the goal is always the same \u2014 make the complicated feel obvious, and help good people do their best work."
    ]
  },

  // ------------------------------------------------------------------------
  // SNAPSHOT — the card on the left of the About section.
  // Each row: { label, value }. Keep values short — they sit on one line.
  // ------------------------------------------------------------------------
  snapshot: [
    { label: "Role",      value: "Access Team Lead" },
    { label: "Industry",  value: "Healthcare" },
    { label: "Tools",     value: "Tableau \u00b7 Excel \u00b7 SQL" },
    { label: "Learning",  value: "Python \u00b7 Power BI" },
    { label: "Strengths", value: "Analytics \u00b7 Leadership \u00b7 Problem-solving" }
  ],

  // ------------------------------------------------------------------------
  // CAPABILITIES — three cards. Middle card gets `highlight: true`.
  // Each item has `name` + `level` (Expert, Advanced, Proficient, Learning).
  // Icon choices: "chart", "leadership", "communication", or a custom SVG string.
  // ------------------------------------------------------------------------
  capabilities: [
    {
      title: "Data Analysis",
      subtitle: "Tools of the trade",
      icon: "chart",
      items: [
        { name: "Advanced Excel", level: "Expert" },
        { name: "Tableau",        level: "Advanced" },
        { name: "Power BI",       level: "Proficient" },
        { name: "Data Analysis",  level: "Advanced" },
        { name: "Python",         level: "Learning" }
      ]
    },
    {
      title: "Leadership & Operations",
      subtitle: "Making things move",
      icon: "leadership",
      highlight: true,
      items: [
        { name: "Project Management",   level: "Advanced" },
        { name: "Agile Leadership",     level: "Proficient" },
        { name: "Change Management",    level: "Advanced" },
        { name: "Problem-Solving",      level: "Expert" },
        { name: "Organizational Skills",level: "Expert" }
      ]
    },
    {
      title: "Communication & Systems",
      subtitle: "People & platforms",
      icon: "communication",
      items: [
        { name: "Oral & Written Communication", level: "Advanced" },
        { name: "Collaboration",                level: "Expert" },
        { name: "Relationship Building",        level: "Expert" },
        { name: "EPIC",                         level: "Proficient" },
        { name: "MS Office Suite",              level: "Expert" }
      ]
    }
  ],

  // ------------------------------------------------------------------------
  // PROJECTS
  // ------------------------------------------------------------------------
  projects: [
    {
      id: "intel",
      number: "01",
      client: "Intel",
      title: "Sustainability analytics & storytelling",
      year: "2024",
      role: "Data strategy · Visualization",
      summary:
        "Partnered with Intel's sustainability organization to translate complex environmental data into clear, executive-ready narratives — connecting metrics, goals, and stakeholder value.",
      contributions: [
        "Designed dashboards turning multi-year emissions data into decision-ready visuals.",
        "Authored narrative frameworks bridging technical metrics with brand voice.",
        "Facilitated cross-functional reviews to align strategy, data, and communications."
      ],
      image: "assets/intel-dashboard.jpg",
      imageAlt: "Tableau dashboard visualizing Intel sustainability analytics",
      tags: ["Sustainability", "Data viz", "Executive narrative"]
    },
    {
      id: "grammy",
      number: "02",
      client: "Grammy.com / Recording Academy",
      title: "Editorial & digital experience",
      year: "2023",
      role: "Digital strategy · Content systems",
      summary:
        "Contributed to Grammy.com's digital surface during a pivotal awards cycle — working on editorial structure, content operations, and the connective tissue between storytelling and systems.",
      contributions: [
        "Shaped editorial templates and modular content patterns.",
        "Supported live coverage operations across high-traffic moments.",
        "Collaborated with design, editorial, and engineering on handoffs and QA."
      ],
      tags: ["Editorial", "Content ops", "Live events"]
    }
  ],

  // ------------------------------------------------------------------------
  // AWARDS & ACHIEVEMENTS
  // EXAMPLE entries — Calvin, replace with your actual awards.
  // ------------------------------------------------------------------------
  awards: [
    {
      year: "2024",
      title: "Intel Sustainability Storytelling Recognition",
      org: "Intel Corporation",
      detail: "Recognized for data-driven narrative work supporting corporate sustainability reporting."
    },
    {
      year: "2023",
      title: "Contributor — 65th Annual Grammy Awards Digital Coverage",
      org: "Recording Academy / Grammy.com",
      detail: "Contributing team member for Grammy.com editorial operations during the 65th awards cycle."
    },
    {
      year: "2022",
      title: "Dean's List — Academic Distinction",
      org: "University",
      detail: "Recognized for academic excellence across multiple semesters."
    }
  ],

  // ------------------------------------------------------------------------
  // CERTIFICATIONS
  // EXAMPLE entries — replace with your real certifications.
  // ------------------------------------------------------------------------
  certifications: [
    {
      title: "Google Data Analytics Professional Certificate",
      issuer: "Google / Coursera",
      year: "2024",
      url: "https://www.coursera.org/professional-certificates/google-data-analytics"
    },
    {
      title: "Tableau Desktop Specialist",
      issuer: "Tableau",
      year: "2024",
      url: "https://www.tableau.com/learn/certification/desktop-specialist"
    },
    {
      title: "IBM Data Science Professional Certificate",
      issuer: "IBM / Coursera",
      year: "2023",
      url: "https://www.coursera.org/professional-certificates/ibm-data-science"
    },
    {
      title: "Meta Front-End Developer Certificate",
      issuer: "Meta / Coursera",
      year: "2023",
      url: "https://www.coursera.org/professional-certificates/meta-front-end-developer"
    }
  ],

  // ------------------------------------------------------------------------
  // SOCIAL LINKS
  // Entries with url "#" are skipped silently until you add real URLs.
  // ------------------------------------------------------------------------
  socials: [
    { label: "LinkedIn", url: "#", handle: "in/calvinwilliamsiii" },
    { label: "GitHub",   url: "https://github.com/Calvinw214", handle: "Calvinw214" },
    { label: "Email",    url: "mailto:calvinwilliams772@gmail.com", handle: "calvinwilliams772@gmail.com" }
  ]
};
