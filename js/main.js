/* =========================================================================
   main.js — UI behavior: nav, theme, command palette, copy-to-clipboard,
   scroll progress, scroll reveal, contact form submission.
   ========================================================================= */

(function () {
  'use strict';

  const DATA = window.PORTFOLIO_DATA || {};
  const RENDER_TS = Date.now();

  // ---------------- Utilities ----------------
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function showToast(message, opts = {}) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.toggle('toast-error', !!opts.error);
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('show'), opts.duration || 2400);
  }

  // ---------------- Year ----------------
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ---------------- Mobile menu ----------------
  const menuBtn = $('#menuBtn');
  const mobileMenu = $('#mobileMenu');
  function setMenu(open) {
    if (!menuBtn || !mobileMenu) return;
    menuBtn.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
    mobileMenu.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
  }
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      setMenu(!(menuBtn.getAttribute('aria-expanded') === 'true'));
    });
    $$('.mobile-menu a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') setMenu(false);
    });
  }

  // ---------------- Theme toggle ----------------
  const themeBtn = $('#themeToggle');
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeBtn) themeBtn.setAttribute('aria-pressed', String(theme === 'dark'));
    try { localStorage.setItem('theme', theme); } catch (e) { /* ignore */ }
  }
  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }
  if (themeBtn) {
    themeBtn.setAttribute('aria-pressed', String(currentTheme() === 'dark'));
    themeBtn.addEventListener('click', () => {
      applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    });
  }
  // Respond to system changes only if user hasn't set an explicit preference
  try {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener && mq.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) applyTheme(e.matches ? 'dark' : 'light');
    });
  } catch (e) { /* ignore */ }

  // ---------------- Scroll progress ----------------
  const bar = $('#scrollBar');
  let rafId = 0;
  function updateScroll() {
    rafId = 0;
    if (!bar) return;
    const h = document.documentElement;
    const scrolled = h.scrollTop || document.body.scrollTop;
    const height = (h.scrollHeight - h.clientHeight) || 1;
    const pct = Math.max(0, Math.min(1, scrolled / height));
    bar.style.transform = `scaleX(${pct})`;
  }
  function onScroll() {
    if (!rafId) rafId = requestAnimationFrame(updateScroll);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateScroll();

  // ---------------- Scroll reveal ----------------
  function attachReveal() {
    const items = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('in-view'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach((el) => io.observe(el));
  }
  document.addEventListener('portfolio:rendered', attachReveal);
  // Also run once for static elements present before data renders
  if (document.readyState !== 'loading') attachReveal();
  else document.addEventListener('DOMContentLoaded', attachReveal);

  // ---------------- Copy email ----------------
  const copyBtn = $('#copyEmailBtn');
  const emailLink = $('#emailLink');
  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try { await navigator.clipboard.writeText(text); return true; } catch (e) { /* fall through */ }
    }
    // Fallback: hidden textarea + execCommand
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (e) { return false; }
  }
  if (copyBtn && emailLink) {
    copyBtn.addEventListener('click', async () => {
      const email = (emailLink.textContent || '').trim();
      const ok = await copyText(email);
      showToast(ok ? 'Email copied to clipboard' : 'Could not copy — please select and copy manually', { error: !ok });
    });
  }

  // ---------------- Command palette ----------------
  const cmdk = $('#cmdk');
  const cmdkInput = $('#cmdkInput');
  const cmdkList = $('#cmdkList');
  const cmdkEmpty = $('#cmdkEmpty');
  const cmdkTrigger = $('#cmdkTrigger');
  let cmdkActiveIndex = 0;
  let lastFocus = null;

  const COMMANDS = [
    { id: 'nav-about',   label: 'Go to About',          hint: 'Section', action: () => scrollToId('about') },
    { id: 'nav-work',    label: 'Go to Selected Work',  hint: 'Section', action: () => scrollToId('projects') },
    { id: 'nav-awards',  label: 'Go to Awards',         hint: 'Section', action: () => scrollToId('awards') },
    { id: 'nav-certs',   label: 'Go to Certifications', hint: 'Section', action: () => scrollToId('certifications') },
    { id: 'nav-capabilities',  label: 'Go to Capabilities', hint: 'Section', action: () => scrollToId('capabilities') },
    { id: 'nav-contact', label: 'Go to Contact',        hint: 'Section', action: () => scrollToId('contact') },
    { id: 'copy-email',  label: 'Copy email address',   hint: 'Action',  action: async () => {
        const ok = await copyText(DATA.contact?.mailto || 'calvinwilliams772@gmail.com');
        showToast(ok ? 'Email copied to clipboard' : 'Could not copy email', { error: !ok });
    }},
    { id: 'toggle-theme', label: 'Toggle light / dark theme', hint: 'Action', action: () => {
        applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    }},
    { id: 'print',        label: 'Print / save as PDF',        hint: 'Action', action: () => window.print() }
  ];

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function openCmdk() {
    if (!cmdk) return;
    lastFocus = document.activeElement;
    cmdk.classList.add('open');
    cmdk.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cmdk-open');
    renderCmdkList('');
    setTimeout(() => cmdkInput && cmdkInput.focus(), 10);
  }
  function closeCmdk() {
    if (!cmdk) return;
    cmdk.classList.remove('open');
    cmdk.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('cmdk-open');
    if (cmdkInput) cmdkInput.value = '';
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }
  function filterCommands(query) {
    const q = (query || '').trim().toLowerCase();
    if (!q) return COMMANDS.slice();
    return COMMANDS.filter((c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q));
  }
  function renderCmdkList(query) {
    if (!cmdkList) return;
    const items = filterCommands(query);
    cmdkActiveIndex = 0;
    if (items.length === 0) {
      cmdkList.innerHTML = '';
      cmdkEmpty && (cmdkEmpty.hidden = false);
      return;
    }
    cmdkEmpty && (cmdkEmpty.hidden = true);
    cmdkList.innerHTML = items.map((c, i) => `
      <li class="cmdk-item ${i === 0 ? 'active' : ''}" role="option" data-id="${c.id}" aria-selected="${i === 0}">
        <span class="cmdk-item-label">${c.label}</span>
        <span class="cmdk-hint">${c.hint}</span>
      </li>
    `).join('');
    $$('.cmdk-item', cmdkList).forEach((li) => {
      li.addEventListener('mouseenter', () => setCmdkActive(Array.from(cmdkList.children).indexOf(li)));
      li.addEventListener('click', () => runActiveCommand());
    });
  }
  function setCmdkActive(i) {
    const children = cmdkList ? Array.from(cmdkList.children) : [];
    if (!children.length) return;
    cmdkActiveIndex = Math.max(0, Math.min(children.length - 1, i));
    children.forEach((el, idx) => {
      const active = idx === cmdkActiveIndex;
      el.classList.toggle('active', active);
      el.setAttribute('aria-selected', String(active));
      if (active) el.scrollIntoView({ block: 'nearest' });
    });
  }
  function runActiveCommand() {
    if (!cmdkList) return;
    const active = cmdkList.children[cmdkActiveIndex];
    if (!active) return;
    const id = active.getAttribute('data-id');
    const cmd = COMMANDS.find((c) => c.id === id);
    closeCmdk();
    if (cmd) setTimeout(cmd.action, 60);
  }

  if (cmdkTrigger) cmdkTrigger.addEventListener('click', openCmdk);
  if (cmdk) {
    $$('[data-cmdk-close]', cmdk).forEach((el) => el.addEventListener('click', closeCmdk));
  }
  if (cmdkInput) {
    cmdkInput.addEventListener('input', (e) => renderCmdkList(e.target.value));
    cmdkInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setCmdkActive(cmdkActiveIndex + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setCmdkActive(cmdkActiveIndex - 1); }
      else if (e.key === 'Enter') { e.preventDefault(); runActiveCommand(); }
      else if (e.key === 'Escape') { e.preventDefault(); closeCmdk(); }
    });
  }
  document.addEventListener('keydown', (e) => {
    const isMac = navigator.platform.toUpperCase().includes('MAC');
    const mod = isMac ? e.metaKey : e.ctrlKey;
    if (mod && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      if (cmdk && cmdk.classList.contains('open')) closeCmdk(); else openCmdk();
    } else if (e.key === 'Escape' && cmdk && cmdk.classList.contains('open')) {
      closeCmdk();
    }
  });

  // ---------------- Contact form ----------------
  const form = $('#contactForm');
  const statusEl = $('#formStatus');
  const submitBtn = $('#submitBtn');
  const messageField = $('#message');
  const counterEl = $('#messageCounter');

  // Live character counter
  if (messageField && counterEl) {
    const update = () => {
      const n = messageField.value.length;
      counterEl.textContent = `${n} / ${messageField.getAttribute('maxlength') || 5000}`;
    };
    messageField.addEventListener('input', update);
    update();
  }

  function setFieldError(id, message) {
    const field = document.getElementById(id);
    const err = document.getElementById(id + 'Error');
    if (field) field.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (err) err.textContent = message || '';
  }

  function clearErrors() {
    ['name', 'email', 'subject', 'message'].forEach((id) => setFieldError(id, ''));
  }

  function setStatus(msg, kind) {
    if (!statusEl) return;
    statusEl.className = 'form-status' + (kind ? ' form-status-' + kind : '');
    statusEl.textContent = '';
    if (!msg) return;
    if (kind === 'success') {
      statusEl.innerHTML = (window.PortfolioRender?.escapeHTML(msg) || msg);
    } else {
      statusEl.textContent = msg;
    }
  }

  function validate(values) {
    const errors = {};
    if (!values.name || values.name.length < 1) errors.name = 'Please enter your name.';
    else if (values.name.length > 100) errors.name = 'Name is too long (max 100).';

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email || '');
    if (!values.email) errors.email = 'Please enter your email.';
    else if (values.email.length > 200) errors.email = 'Email is too long (max 200).';
    else if (!emailOk) errors.email = 'Please enter a valid email address.';

    if (values.subject && values.subject.length > 200) errors.subject = 'Subject is too long (max 200).';

    if (!values.message) errors.message = 'Please enter a message.';
    else if (values.message.length < 10) errors.message = 'Message is too short (min 10 characters).';
    else if (values.message.length > 5000) errors.message = 'Message is too long (max 5000).';

    return errors;
  }

  function buildMailtoFallback(values) {
    const to = DATA.contact?.mailto || 'calvinwilliams772@gmail.com';
    const subject = encodeURIComponent(values.subject || `Portfolio inquiry from ${values.name}`);
    const body = encodeURIComponent(
      `${values.message}\n\n—\nFrom: ${values.name}\nEmail: ${values.email}`
    );
    return `mailto:${to}?subject=${subject}&body=${body}`;
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearErrors();
      setStatus('', '');

      const values = {
        name:    ($('#name').value || '').trim(),
        email:   ($('#email').value || '').trim(),
        subject: ($('#subject').value || '').trim(),
        message: ($('#message').value || '').trim(),
        company_website: ($('#company_website').value || '').trim(),
        elapsed_ms: Date.now() - RENDER_TS
      };

      // Honeypot — silently ignore bots
      if (values.company_website) {
        setStatus('Thanks — your message has been sent.', 'success');
        form.reset();
        return;
      }

      // Timing check — too fast to be human
      const minMs = (DATA.contact?.minRenderSeconds || 3) * 1000;
      if (values.elapsed_ms < minMs) {
        setStatus('Please take a moment to review your message, then try again.', 'error');
        return;
      }

      const errors = validate(values);
      const errKeys = Object.keys(errors);
      if (errKeys.length) {
        errKeys.forEach((k) => setFieldError(k, errors[k]));
        const firstEl = document.getElementById(errKeys[0]);
        if (firstEl) firstEl.focus();
        setStatus('Please correct the highlighted fields.', 'error');
        return;
      }

      // Resolve Formspree endpoint. If placeholder/empty, use mailto fallback.
      const id = (DATA.contact?.formspreeId || '').trim();
      const hasRealId = id && id !== 'YOUR_FORMSPREE_ID' && /^[a-zA-Z0-9_-]+$/.test(id);
      const endpoint = hasRealId ? ('https://formspree.io/f/' + id) : null;

      if (!endpoint) {
        const url = buildMailtoFallback(values);
        setStatus('Opening your email app with your message pre-filled…', 'info');
        setTimeout(() => { window.location.href = url; }, 300);
        return;
      }

      submitBtn?.classList.add('loading');
      submitBtn?.setAttribute('disabled', 'true');
      setStatus('Sending your message…', 'info');

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        // Formspree accepts JSON when Accept: application/json is set.
        // Response shape: { ok: true } on success, { errors: [...] } on failure.
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            subject: values.subject,
            message: values.message,
            _subject: values.subject || ('Portfolio inquiry from ' + values.name),
            _replyto: values.email
          }),
          signal: controller.signal,
          credentials: 'omit'
        });
        clearTimeout(timeoutId);

        let payload = null;
        try { payload = await res.json(); } catch (e) { payload = null; }

        if (res.ok) {
          setStatus('Thanks — your message has been sent. I\'ll reply soon.', 'success');
          form.reset();
          if (counterEl) counterEl.textContent = `0 / ${messageField?.getAttribute('maxlength') || 5000}`;
        } else {
          let reason = 'Server responded with ' + res.status + '.';
          if (payload) {
            if (Array.isArray(payload.errors) && payload.errors.length) {
              reason = payload.errors.map((e) => e.message || e).join(' ');
            } else if (payload.error) {
              reason = String(payload.error);
            }
          }
          throw new Error(reason);
        }
      } catch (err) {
        const fallback = buildMailtoFallback(values);
        const escapedFallback = (window.PortfolioRender?.safeUrl ? window.PortfolioRender.safeUrl(fallback) : fallback);
        if (statusEl) {
          statusEl.className = 'form-status form-status-error';
          statusEl.innerHTML =
            'Couldn\'t send through the form right now. ' +
            `<a class="form-status-link" href="${escapedFallback}">Email me directly instead</a>.`;
        }
      } finally {
        submitBtn?.classList.remove('loading');
        submitBtn?.removeAttribute('disabled');
      }
    });
  }
})();
