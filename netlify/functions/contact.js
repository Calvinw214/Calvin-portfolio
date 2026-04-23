/* =========================================================================
   netlify/functions/contact.js
   Production serverless endpoint for the contact form.
   Uses Resend (https://resend.com) — free tier available.

   Required environment variables (set in Netlify dashboard):
     RESEND_API_KEY  — your Resend API key (server-side only; never commit)
     CONTACT_TO      — where messages are delivered (e.g. calvinwilliams772@gmail.com)
     CONTACT_FROM    — verified sender (e.g. "Calvin Portfolio <contact@yourdomain.com>")
     ALLOWED_ORIGIN  — your site origin (e.g. https://calvinw214.github.io) for CORS
   ========================================================================= */

// In-memory rate limit (per warm container). Resets on cold start — fine for low volume.
const RATE_LIMIT = new Map(); // ip -> [timestamps]
const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_MAX = 5;

function getClientIP(event) {
  const headers = event.headers || {};
  const xff = headers['x-forwarded-for'] || headers['X-Forwarded-For'];
  if (xff) return String(xff).split(',')[0].trim();
  return headers['client-ip'] || headers['x-nf-client-connection-ip'] || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const arr = (RATE_LIMIT.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (arr.length >= RATE_MAX) {
    RATE_LIMIT.set(ip, arr);
    return true;
  }
  arr.push(now);
  RATE_LIMIT.set(ip, arr);
  return false;
}

function escapeHTML(v) {
  return String(v == null ? '' : v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function corsHeaders() {
  const origin = process.env.ALLOWED_ORIGIN || '*';
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
    'Content-Type': 'application/json'
  };
}

function json(status, body) {
  return { statusCode: status, headers: corsHeaders(), body: JSON.stringify(body) };
}

exports.handler = async (event) => {
  // Preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders(), body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return json(405, { ok: false, error: 'Method not allowed.' });
  }

  // Origin check — reject cross-site form posts if ALLOWED_ORIGIN is set
  const allowed = process.env.ALLOWED_ORIGIN;
  if (allowed) {
    const origin = (event.headers && (event.headers.origin || event.headers.Origin)) || '';
    if (origin && origin !== allowed) {
      return json(403, { ok: false, error: 'Origin not allowed.' });
    }
  }

  // Rate limit
  const ip = getClientIP(event);
  if (isRateLimited(ip)) {
    return json(429, { ok: false, error: 'Too many messages — please try again in a few minutes.' });
  }

  // Parse body
  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (e) {
    return json(400, { ok: false, error: 'Invalid JSON.' });
  }

  const name    = String(payload.name || '').trim();
  const email   = String(payload.email || '').trim();
  const subject = String(payload.subject || '').trim();
  const message = String(payload.message || '').trim();
  const hp      = String(payload.company_website || '').trim();
  const elapsed = Number(payload.elapsed_ms || 0);

  // Honeypot — quietly succeed to avoid giving bots feedback
  if (hp) {
    return json(200, { ok: true });
  }

  // Timing — must have taken at least 2s on client
  if (elapsed < 2000) {
    return json(400, { ok: false, error: 'Submission flagged. Please try again.' });
  }

  // Server-side validation (mirror client)
  if (!name || name.length > 100) return json(400, { ok: false, error: 'Invalid name.' });
  if (!email || email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(400, { ok: false, error: 'Invalid email.' });
  }
  if (subject.length > 200) return json(400, { ok: false, error: 'Subject too long.' });
  if (!message || message.length < 10 || message.length > 5000) {
    return json(400, { ok: false, error: 'Invalid message length.' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const CONTACT_TO     = process.env.CONTACT_TO   || 'calvinwilliams772@gmail.com';
  const CONTACT_FROM   = process.env.CONTACT_FROM || 'Portfolio <onboarding@resend.dev>';

  if (!RESEND_API_KEY) {
    return json(500, { ok: false, error: 'Email service not configured.' });
  }

  const subjectLine = subject ? `Portfolio: ${subject}` : `Portfolio inquiry from ${name}`;
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#111;line-height:1.55;">
      <h2 style="margin:0 0 12px;font-family:Georgia,serif;">New portfolio message</h2>
      <p style="margin:0 0 8px;"><strong>From:</strong> ${escapeHTML(name)} &lt;${escapeHTML(email)}&gt;</p>
      ${subject ? `<p style="margin:0 0 8px;"><strong>Subject:</strong> ${escapeHTML(subject)}</p>` : ''}
      <hr style="border:none;border-top:1px solid #eee;margin:16px 0;" />
      <div style="white-space:pre-wrap;">${escapeHTML(message)}</div>
      <hr style="border:none;border-top:1px solid #eee;margin:16px 0;" />
      <p style="font-size:12px;color:#666;margin:0;">Sent from your portfolio contact form.</p>
    </div>
  `;
  const text =
    `New portfolio message\n\n` +
    `From: ${name} <${email}>\n` +
    (subject ? `Subject: ${subject}\n` : '') +
    `\n${message}\n`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: [CONTACT_TO],
        reply_to: email,
        subject: subjectLine,
        html,
        text
      })
    });

    if (!res.ok) {
      let detail = '';
      try { detail = await res.text(); } catch (e) { /* ignore */ }
      // eslint-disable-next-line no-console
      console.error('Resend error:', res.status, detail);
      return json(502, { ok: false, error: 'Email provider rejected the message.' });
    }

    return json(200, { ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Contact function error:', err && err.message);
    return json(500, { ok: false, error: 'Unexpected server error.' });
  }
};
