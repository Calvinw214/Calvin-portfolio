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
    mailto: "cwill214@uic.edu",
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
      "I try to balance strong analytical thinking with an understanding of how people actually work and interact. Whether I'm building training materials, improving front desk operations, or leading a team through ambiguous change, the goal is always the same \u2014 make the complicated feel obvious, and help good people do their best work.",
      "Right now, I’m continuing to grow my skills in data analytics and tools like Python, Tableau, and Power BI. I’m interested in opportunities in healthcare, tech, data analysis, or consulting where I can use data to solve real problems while helping teams work well together."
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
Skills: [
  {
    title: "Data Analysis",
    subtitle: "Tools of the trade",
    icon: "chart",
    items: [
      { name: "Advanced Excel", level: "Expert" },
      { name: "Tableau", level: "Advanced" },
      { name: "Power BI", level: "Proficient" },
      { name: "Data Analysis", level: "Advanced" },
      { name: "Python", level: "Learning" }
    ]
  },
  {
    title: "Leadership & Operations",
    subtitle: "Making things move",
    icon: "leadership",
    highlight: true,
    items: [
      { name: "Project Management", level: "Advanced" },
      { name: "Agile Leadership", level: "Proficient" },
      { name: "Change Management", level: "Advanced" },
      { name: "Problem-Solving", level: "Expert" },
      { name: "Organizational Skills", level: "Expert" }
    ]
  },
  {
    title: "Communication & Systems",
    subtitle: "People & platforms",
    icon: "communication",
    items: [
      { name: "Oral & Written Communication", level: "Advanced" },
      { name: "Collaboration", level: "Expert" },
      { name: "Relationship Building", level: "Expert" },
      { name: "EPIC", level: "Proficient" },
      { name: "MS Office Suite", level: "Expert" }
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
      title: "Intel Data Center",
      year: "2026",
      role: "Data strategy · Visualization",
      summary:
        "Built interactive Tableau dashboards — bar charts, dual-axis plots, tree maps, and time-series views — to evaluate regional energy production, demand, and renewable usage. The analysis supported data-driven recommendations for optimal and sustainable data-center site selection for Intel.",
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
      id: "Grammy",
      number: "02",
      client: "Grammy.com / Recording Academy",
      title: "Analyzing Website Performance",
      year: "2026",
      role: "Digital strategy · Content systems",
      summary:
        "Used advanced Excel analytics — PivotTables, conditional logic (IF, SUMIFS, AVERAGEIFS) and XLOOKUP — to calculate user-engagement KPIs and mobile-visitor rates. Compared performance across Grammy.com and RecordingAcademy.com to quantify the business impact of their 2022 website split.",
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
      year: "2026",
      title: "Chancellor's Student Service Award",
      org: "University of Illinois Chicago",
      detail: "Recognized at UIC’s 54th Annual Chancellor’s Student Service and Leadership Awards Ceremony for outstanding contribution to the university through campus and community service."
    },
    {
      year: "2025",
      title: "NM Kellogg Healthcare Leadership Center Series",
      org: "Northwestern Memorial Hospital",
      detail: "Contributing team member for Grammy.com editorial operations during the 65th awards cycle."
    },
    {
      year: "2025",
      title: "NM Leading with Excellence Certificate Program: Leading Others",
      org: "Northwestern Memorial Hospital",
      detail: "Recognized for academic excellence across multiple semesters."
    }
  ],

  // ------------------------------------------------------------------------
  // CERTIFICATIONS
  // EXAMPLE entries — replace with your real certifications.
  // ------------------------------------------------------------------------
  certifications: [
    {
      title: "Data Visualization",
      issuer: "Global Career Accelerator",
      year: "2026",
      url: "https://www.coursera.org/professional-certificates/google-data-analytics"
    },
    {
      title: "Data Analysis",
      issuer: "Global Career Accelerator",
      year: "2026",
      url: "https://www.credential.net/20600fbc-7450-48ea-b9ea-d361bf0675df"
    },
     {
      title: "AI Professional Skills",
      issuer: "Global Career Accelerator",
      year: "2026",
      url: "https://www.coursera.org/professional-certificates/google-data-analytics"
    },
     {
      title: "Intercultural Skills",
      issuer: "Global Career Accelerator",
      year: "2026",
      url: "https://www.coursera.org/professional-certificates/google-data-analytics"
    }
  ],

  // ------------------------------------------------------------------------
  // SOCIAL LINKS
  // Entries with url "#" are skipped silently until you add real URLs.
  // ------------------------------------------------------------------------
  socials: [
    { label: "LinkedIn", url: "#", handle: "https://www.linkedin.com/in/calvin-williams-iii-318690190" },
    { label: "GitHub",   url: "https://github.com/Calvinw214", handle: "Calvinw214" },
    { label: "Email",    url: "mailto:cwill214@uic.edu", handle: "cwill214@uic.edu" }
  ]
};
