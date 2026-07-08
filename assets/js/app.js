(() => {
  'use strict';

  const isStandalone = () =>
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;

  document.documentElement.classList.toggle('is-standalone', isStandalone());

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js?v=19').catch(() => {});
    });
  }

  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  let activeLink = null;

  document.querySelectorAll('#appBottomNav a, .app-bottom-nav a, .app-nav a, .nav a').forEach(link => {
    const href = (link.getAttribute('href') || '').split('/').pop().toLowerCase() || 'index.html';

    if (href === current) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
      activeLink = link;
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });

  if (activeLink && activeLink.closest('#appBottomNav')) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        try {
          activeLink.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        } catch (error) {}
      }, 120);
    });
  }
})();
