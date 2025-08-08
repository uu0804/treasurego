(function initSite() {
  const navToggleButton = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (navToggleButton && navMenu) {
    navToggleButton.addEventListener('click', () => {
      const willShow = !navMenu.classList.contains('show');
      navMenu.classList.toggle('show', willShow);
      navToggleButton.setAttribute('aria-expanded', String(willShow));
    });
  }

  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }

  const revealTargets = document.querySelectorAll('[data-reveal]');
  if (revealTargets.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }
})();