/* =========================================================
   Nobuhiro Tanno — Personal Homepage
   Language toggle (EN / JA) + small enhancements
   ========================================================= */

(function () {
  'use strict';

  const STORAGE_KEY = 'nt-lang';
  const SUPPORTED = ['en', 'ja'];
  const DEFAULT_LANG = 'en';

  // Read stored preference, fall back to browser language, then default
  function detectInitialLang() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.includes(stored)) return stored;
    } catch (_) { /* localStorage may be blocked */ }

    const nav = (navigator.language || '').toLowerCase();
    if (nav.startsWith('ja')) return 'ja';
    return DEFAULT_LANG;
  }

  function applyLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;

    document.documentElement.lang = lang;
    document.body.classList.toggle('lang-ja', lang === 'ja');
    document.body.classList.toggle('lang-en', lang === 'en');

    // Swap text content for any element with data-en / data-ja
    const nodes = document.querySelectorAll('[data-en], [data-ja]');
    nodes.forEach((node) => {
      const text = node.getAttribute('data-' + lang);
      if (text != null) {
        // innerHTML so &amp; etc. render correctly
        node.innerHTML = text;
      }
    });

    // Update toggle button label
    const toggle = document.getElementById('lang-toggle');
    if (toggle) {
      const current = toggle.querySelector('.lang-current');
      const other = toggle.querySelector('.lang-other');
      if (current && other) {
        current.textContent = lang.toUpperCase();
        other.textContent = (lang === 'en' ? 'JA' : 'EN');
      }
      toggle.setAttribute('aria-label',
        lang === 'en' ? 'Switch to Japanese' : 'Switch to English');
    }

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}
  }

  function setupToggle() {
    const toggle = document.getElementById('lang-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      const next = (document.documentElement.lang === 'en') ? 'ja' : 'en';
      applyLang(next);
    });
  }

  // Year in footer
  function setupYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  // Reveal-on-scroll for timeline + project cards
  function setupReveal() {
    if (!('IntersectionObserver' in window)) return;
    const targets = document.querySelectorAll(
      '.timeline-item, .project-card, .meta-list li, .pub-list li, .contact-list li'
    );
    targets.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
      el.style.transition = 'opacity 500ms ease, transform 500ms ease';
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    targets.forEach((el) => io.observe(el));
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyLang(detectInitialLang());
    setupToggle();
    setupYear();
    setupReveal();
  });
})();
