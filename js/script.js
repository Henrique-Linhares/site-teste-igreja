document.addEventListener('DOMContentLoaded', () => {

  if (typeof lucide !== 'undefined') lucide.createIcons();

  const heroVideo = document.querySelector('.hero__video');
  if (heroVideo) {
    const heroSection = document.querySelector('.hero');

    const hasSource = heroVideo.querySelector('source[src]:not([src=""])');

    if (hasSource) {
      heroVideo.play().catch(() => {
      });

      const videoObserver = new IntersectionObserver(([entry]) => {
        entry.isIntersecting ? heroVideo.play().catch(() => {}) : heroVideo.pause();
      }, { threshold: 0.1 });

      if (heroSection) videoObserver.observe(heroSection);
    }
  }

  const header = document.querySelector('.site-header');
  if (header) {
    const sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:1px;left:0;width:1px;height:1px;pointer-events:none;';
    document.body.prepend(sentinel);
    new IntersectionObserver(([e]) => header.classList.toggle('scrolled', !e.isIntersecting)).observe(sentinel);
  }

  const toggleBtn  = document.querySelector('.nav__toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (toggleBtn && mobileMenu) {
    const open = () => {
      mobileMenu.hidden = false;
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      mobileMenu.querySelector('a,button')?.focus();
    };
    const close = () => {
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      setTimeout(() => { mobileMenu.hidden = true; }, 260);
    };

    toggleBtn.addEventListener('click', () =>
      toggleBtn.getAttribute('aria-expanded') === 'true' ? close() : open()
    );

    mobileMenu.querySelectorAll('a, button').forEach(el => el.addEventListener('click', close));

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') { close(); toggleBtn.focus(); }
    });

    document.addEventListener('click', e => {
      if (toggleBtn.getAttribute('aria-expanded') === 'true' && !mobileMenu.contains(e.target) && !toggleBtn.contains(e.target)) close();
    });
  }

  document.querySelectorAll('.accordion__item').forEach(item => {
    const trigger = item.querySelector('.accordion__trigger');
    const body    = item.querySelector('.accordion__body');
    if (!trigger || !body) return;

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.accordion__item').forEach(other => {
        if (other === item) return;
        const t = other.querySelector('.accordion__trigger');
        const b = other.querySelector('.accordion__body');
        if (t && b) {
          t.setAttribute('aria-expanded', 'false');
          b.classList.remove('open');
          setTimeout(() => { b.hidden = true; }, 260);
        }
      });

      if (isOpen) {
        trigger.setAttribute('aria-expanded', 'false');
        body.classList.remove('open');
        setTimeout(() => { body.hidden = true; }, 260);
      } else {
        body.hidden = false;
        body.getBoundingClientRect();
        body.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  const targets = document.querySelectorAll(
    '.culto-card, .ministerio-card, .testemunho-card, .accordion__item, .stat-item, .info-block'
  );

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -32px 0px' });

    targets.forEach((el, i) => {
      el.classList.add('reveal');
      const siblings = Array.from(el.parentElement.children);
      el.style.transitionDelay = `${siblings.indexOf(el) * 70}ms`;
      obs.observe(el);
    });
  } else {
    targets.forEach(el => el.classList.add('visible'));
  }

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = (document.querySelector('.site-header')?.offsetHeight ?? 72) + 16;
      window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - offset, behavior: 'smooth' });
    });
  });

  const bar = document.createElement('div');
  bar.setAttribute('aria-hidden', 'true');
  bar.style.cssText = `
    position:fixed; top:0; left:0; height:2px;
    background:linear-gradient(90deg,#D4A843,#E0BB6A);
    z-index:9999; width:0%; transition:width 80ms linear; pointer-events:none;
  `;
  document.body.prepend(bar);
  window.addEventListener('scroll', () => {
    const p = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = p > 0 ? `${(scrollY / p) * 100}%` : '0%';
  }, { passive: true });

});