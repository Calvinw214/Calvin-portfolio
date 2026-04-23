/* =========================================================================
   data.js — Single source of truth for editable content.
   Edit this file to update projects, awards, certifications, socials, etc.
   No HTML changes required.
   ========================================================================= */

window.PORTFOLIO_DATA = {

  // Contact endpoint. Leave as-is for Netlify deployment.
  // Set to null (without quotes) to force the mailto: fallback on every submit.
  contact: {
    endpoint: "/.netlify/functions/contact",
    mailto: "calvinwilliams772@gmail.com",
    minRenderSeconds: 3
  },

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
