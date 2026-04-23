/* =========================================================
   PORTFOLIO — Calvin Williams III
   Progressive-enhancement JavaScript
   ========================================================= */

// ---------------------------------------------------------
// 1. Current year in footer
// ---------------------------------------------------------
document.getElementById('year').textContent = new Date().getFullYear();


// ---------------------------------------------------------
// 2. Navigation: scroll state + mobile toggle
// ---------------------------------------------------------
const nav = document.getElementById('nav');
const navToggle = nav.querySelector('.nav-toggle');

const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu when a link is clicked
nav.querySelectorAll('.nav-links a').forEach((a) => {
    a.addEventListener('click', () => {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});


// ---------------------------------------------------------
// 3. Scroll-reveal via IntersectionObserver
// ---------------------------------------------------------
const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .skill-group').forEach((el) => io.observe(el));


// ---------------------------------------------------------
// 4. Contact form — graceful success state (no backend required)
// ---------------------------------------------------------
const form = document.getElementById('contact-form');
const success = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
        success.textContent = 'Please fill in your name, email, and message.';
        success.classList.add('show');
        success.style.background = 'rgba(220, 120, 100, 0.12)';
        success.style.borderColor = 'rgba(220, 120, 100, 0.3)';
        success.style.color = '#e8a89a';
        return;
    }

    success.textContent =
        "Thanks, " + name.split(' ')[0] +
        " — your message is on its way. I'll reply within 24 hours.";
    success.classList.add('show');
    success.style.background = '';
    success.style.borderColor = '';
    success.style.color = '';
    form.reset();
    setTimeout(() => success.classList.remove('show'), 6000);
});
