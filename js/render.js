/* =========================================================================
   render.js — Safely renders content from PORTFOLIO_DATA into the DOM.
   All user-derived strings are passed through escapeHTML().
   All URLs are validated via safeUrl() to block javascript:, data:, vbscript:.
   ========================================================================= */

(function () {
  'use strict';

  const DATA = window.PORTFOLIO_DATA || {};

  // ---------- Security helpers ----------
  function escapeHTML(value) {
    if (value === null || value === undefined) return '';
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function safeUrl(url) {
    if (!url || typeof url !== 'string') return '#';
    const trimmed = url.trim();
    if (!trimmed) return '#';
    // Block dangerous schemes
    const lower = trimmed.toLowerCase();
    // eslint-disable-next-line no-script-url
    if (lower.startsWith('javascript:') || lower.startsWith('data:') || lower.startsWith('vbscript:')) {
      return '#';
    }
    // Allow: http(s):, mailto:, tel:, same-origin relative, fragments
    if (
      /^https?:\/\//i.test(trimmed) ||
      /^mailto:/i.test(trimmed) ||
      /^tel:/i.test(trimmed) ||
      trimmed.startsWith('/') ||
      trimmed.startsWith('#') ||
      trimmed.startsWith('./') ||
      trimmed.startsWith('../') ||
      /^[a-z0-9_\-./]+$/i.test(trimmed)
    ) {
      return trimmed;
    }
    return '#';
  }

  function isExternal(url) {
    return /^https?:\/\//i.test(url);
  }

  // ---------- Renderers ----------
  function renderProjects() {
    const mount = document.getElementById('projectsList');
    if (!mount || !Array.isArray(DATA.projects)) return;

    const html = DATA.projects.map((p, idx) => {
      const number    = escapeHTML(p.number || String(idx + 1).padStart(2, '0'));
      const client    = escapeHTML(p.client || '');
      const title     = escapeHTML(p.title || '');
      const year      = escapeHTML(p.year || '');
      const role      = escapeHTML(p.role || '');
      const summary   = escapeHTML(p.summary || '');
      const imgSrc    = p.image ? safeUrl(p.image) : '';
      const imgAlt    = escapeHTML(p.imageAlt || title);
      const contribs  = Array.isArray(p.contributions) ? p.contributions : [];
      const tags      = Array.isArray(p.tags) ? p.tags : [];

      const contribsHTML = contribs
        .map((c) => `<li>${escapeHTML(c)}</li>`)
        .join('');

      const tagsHTML = tags
        .map((t) => `<li>${escapeHTML(t)}</li>`)
        .join('');

      const imageHTML = imgSrc
        ? `<figure class="project-media">
             <img src="${escapeHTML(imgSrc)}" alt="${imgAlt}" loading="lazy" decoding="async" />
           </figure>`
        : '';

      return `
        <article class="project reveal" data-project-id="${escapeHTML(p.id || idx)}">
          <div class="project-meta">
            <span class="project-number">${number}</span>
            <span class="project-client">${client}</span>
          </div>
          <div class="project-body">
            <h3 class="project-title">${title}</h3>
            <p class="project-tagline">
              <span class="project-year">${year}</span>
              <span class="project-sep" aria-hidden="true">·</span>
              <span class="project-role">${role}</span>
            </p>
            <p class="project-summary">${summary}</p>
            ${contribsHTML ? `<ul class="project-contribs" role="list">${contribsHTML}</ul>` : ''}
            ${tagsHTML ? `<ul class="project-tags" role="list">${tagsHTML}</ul>` : ''}
            ${imageHTML}
          </div>
        </article>
      `;
    }).join('');

    mount.innerHTML = html;
  }

  function renderAwards() {
    const mount = document.getElementById('awardsList');
    if (!mount || !Array.isArray(DATA.awards)) return;

    mount.innerHTML = DATA.awards.map((a) => {
      const year   = escapeHTML(a.year || '');
      const title  = escapeHTML(a.title || '');
      const org    = escapeHTML(a.org || '');
      const detail = escapeHTML(a.detail || '');
      return `
        <li class="award reveal">
          <span class="award-year">${year}</span>
          <div class="award-body">
            <h3 class="award-title">${title}</h3>
            ${org ? `<p class="award-org">${org}</p>` : ''}
            ${detail ? `<p class="award-detail">${detail}</p>` : ''}
          </div>
        </li>
      `;
    }).join('');
  }

  function renderCertifications() {
    const mount = document.getElementById('certsList');
    if (!mount || !Array.isArray(DATA.certifications)) return;

    mount.innerHTML = DATA.certifications.map((c) => {
      const title  = escapeHTML(c.title || '');
      const issuer = escapeHTML(c.issuer || '');
      const year   = escapeHTML(c.year || '');
      const url    = c.url ? safeUrl(c.url) : '';
      const external = isExternal(url);

      const linkOpen = url && url !== '#'
        ? `<a class="cert-link" href="${escapeHTML(url)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>`
        : '';
      const linkClose = linkOpen ? '</a>' : '';

      return `
        <li class="cert reveal">
          ${linkOpen}
            <div class="cert-head">
              <h3 class="cert-title">${title}</h3>
              ${year ? `<span class="cert-year">${year}</span>` : ''}
            </div>
            ${issuer ? `<p class="cert-issuer">${issuer}</p>` : ''}
            ${url && url !== '#' ? `<span class="cert-view" aria-hidden="true">View credential →</span>` : ''}
          ${linkClose}
        </li>
      `;
    }).join('');
  }

  function renderSocials() {
    const mount = document.getElementById('socialsList');
    if (!mount || !Array.isArray(DATA.socials)) return;

    const items = DATA.socials
      .filter((s) => s && s.url && s.url !== '#')
      .map((s) => {
        const url    = safeUrl(s.url);
        const label  = escapeHTML(s.label || '');
        const handle = escapeHTML(s.handle || '');
        const external = isExternal(url);
        return `
          <li class="social">
            <a href="${escapeHTML(url)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>
              <span class="social-label">${label}</span>
              ${handle ? `<span class="social-handle">${handle}</span>` : ''}
            </a>
          </li>
        `;
      });

    mount.innerHTML = items.join('');
  }

  // ---------- Run on DOM ready ----------
  function init() {
    renderProjects();
    renderAwards();
    renderCertifications();
    renderSocials();

    // Notify main.js that content is mounted (so IntersectionObserver can attach)
    document.dispatchEvent(new CustomEvent('portfolio:rendered'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose helpers for potential reuse
  window.PortfolioRender = { escapeHTML, safeUrl };
})();
