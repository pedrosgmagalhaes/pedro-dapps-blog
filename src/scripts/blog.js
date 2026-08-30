/* ============================================================
   Pedro dApps — Blog · Animações
   Preloader cinematográfico (VU-meter) · Cursor customizado ·
   Tagline rotativa · Reveals on-scroll · Header
   ============================================================ */
(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = typeof window.gsap !== 'undefined';
  const body = document.body;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- 1. Preloader (VU-meter, igual ao site oficial) ---------- */
  const preloader = document.querySelector('.preloader');
  const preloaderGlass = document.querySelector('.preloader-glass');
  const percentage = document.getElementById('load-percentage');
  const vuTrack = document.getElementById('vu-track');
  const vuNeedle = document.getElementById('vu-needle');
  const wipeEdge = document.querySelector('.wipe-edge');

  if (preloader && vuTrack && vuNeedle && percentage) {
    const segmentCount = 20;
    const segments = [];
    for (let i = 0; i < segmentCount; i += 1) {
      const segment = document.createElement('span');
      segment.className = 'vu-segment';
      if (((i + 1) / segmentCount) * 100 >= 85) segment.classList.add('is-danger');
      vuTrack.appendChild(segment);
      segments.push(segment);
    }

    const setLoadProgress = (value) => {
      const clamped = Math.max(0, Math.min(100, value));
      const activeCount = Math.round((clamped / 100) * segmentCount);
      percentage.textContent = `${Math.round(clamped)}%`;
      segments.forEach((segment, index) =>
        segment.classList.toggle('is-active', index < activeCount),
      );
      const trackWidth = vuTrack.getBoundingClientRect().width || 240;
      vuNeedle.style.transform = `translateX(${Math.max(0, Math.min(trackWidth - 2, (trackWidth * clamped) / 100))}px)`;
      const danger = clamped >= 85;
      vuNeedle.style.background = danger ? 'var(--accent)' : '#fff';
      percentage.style.color = danger ? 'var(--accent)' : '#fff';
    };

    const revealHero = () => {
      preloader.hidden = true;
      const items = Array.from(document.querySelectorAll('.hero-reveal'));
      items.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(36px)';
        if (hasGsap) {
          window.gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: reducedMotion ? 0.01 : 0.9,
            delay: reducedMotion ? 0 : index * 0.11,
            ease: 'power3.out',
          });
        } else {
          el.style.transition = `opacity .8s ease ${index * 0.11}s, transform .8s cubic-bezier(.2,.75,.2,1) ${index * 0.11}s`;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    };

    const finishPreloader = () => {
      body.classList.remove('is-loading');
      if (hasGsap && !reducedMotion) {
        window.gsap.set(wipeEdge, { left: '0%', opacity: 0 });
        window.gsap
          .timeline({ onComplete: revealHero })
          .to(preloaderGlass, { scale: 0.94, opacity: 0, y: -20, duration: 0.5, ease: 'power3.in' })
          .to(preloader, { clipPath: 'inset(50% 0% 50% 0%)', duration: 0.7, ease: 'expo.inOut' }, '-=0.12')
          .to(wipeEdge, { opacity: 0.72, duration: 0.16 }, '-=0.18')
          .to(wipeEdge, { left: '100%', duration: 0.95, ease: 'expo.inOut' }, '<')
          .to(wipeEdge, { opacity: 0, duration: 0.22 }, '+=0.1');
      } else {
        setTimeout(revealHero, reducedMotion ? 20 : 650);
      }
    };

    let mediaReady = !document.querySelector('.hero-bg');
    let pageReady = document.readyState === 'complete';
    let fontsReady = !document.fonts;
    let progress = 0;
    let previousTime = performance.now();
    const startTime = previousTime;

    const heroBg = document.querySelector('.hero-bg');
    const markMediaReady = () => { mediaReady = true; };
    if (heroBg && heroBg.complete && heroBg.naturalWidth > 0) mediaReady = true;
    if (heroBg) {
      heroBg.addEventListener('load', markMediaReady, { once: true });
      heroBg.addEventListener('error', markMediaReady, { once: true });
    }
    window.addEventListener('load', () => { pageReady = true; }, { once: true });
    if (document.fonts) {
      document.fonts.ready.then(() => { fontsReady = true; }).catch(() => { fontsReady = true; });
    }

    const minimumDuration = reducedMotion ? 100 : 1600;
    const maximumDuration = reducedMotion ? 250 : 10000;

    const tick = (now) => {
      const delta = Math.min(50, now - previousTime);
      previousTime = now;
      const elapsed = now - startTime;
      const allReady = mediaReady && pageReady && fontsReady;
      const target = allReady ? 99.6 : Math.min(86, 18 + elapsed * 0.034);
      const pace = allReady ? 0.105 : 0.042;
      progress += (target - progress) * pace * (delta / 16.67);
      const jitter = progress < 98.5 ? Math.sin(now / 88) * Math.min(1.25, progress * 0.014) : 0.18;
      setLoadProgress(Math.min(99.8, Math.max(0, progress + jitter)));

      const readyToFinish = allReady && elapsed >= minimumDuration && progress >= 98.8;
      if (readyToFinish || elapsed >= maximumDuration) {
        setLoadProgress(100);
        setTimeout(finishPreloader, reducedMotion ? 20 : 140);
        return;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  } else {
    body.classList.remove('is-loading');
  }

  /* ---------- 2. Cursor customizado ---------- */
  const scrollCursor = document.querySelector('.scroll-cursor');
  if (scrollCursor && finePointer) {
    const cursorPosition = { currentX: -120, currentY: -120, targetX: -120, targetY: -120 };
    const interactiveSelector = 'a, button, [role="button"], input, select, textarea, label, summary';

    const renderCursor = () => {
      const ease = reducedMotion ? 1 : 0.2;
      cursorPosition.currentX += (cursorPosition.targetX - cursorPosition.currentX) * ease;
      cursorPosition.currentY += (cursorPosition.targetY - cursorPosition.currentY) * ease;
      scrollCursor.style.setProperty('--cursor-x', `${cursorPosition.currentX}px`);
      scrollCursor.style.setProperty('--cursor-y', `${cursorPosition.currentY}px`);
      requestAnimationFrame(renderCursor);
    };

    window.addEventListener('pointermove', (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      cursorPosition.targetX = event.clientX;
      cursorPosition.targetY = event.clientY;
      if (reducedMotion) {
        cursorPosition.currentX = event.clientX;
        cursorPosition.currentY = event.clientY;
      }
      body.classList.add('cursor-ready');
    }, { passive: true });

    document.documentElement.addEventListener('mouseleave', () => {
      body.classList.remove('cursor-ready', 'cursor-link');
    });

    document.addEventListener('pointerover', (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      body.classList.toggle('cursor-link', Boolean(event.target.closest(interactiveSelector)));
    }, { passive: true });
    document.addEventListener('pointerout', (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      const nextTarget = event.relatedTarget;
      body.classList.toggle(
        'cursor-link',
        nextTarget instanceof Element && Boolean(nextTarget.closest(interactiveSelector)),
      );
    }, { passive: true });

    requestAnimationFrame(renderCursor);
  }

  /* ---------- 3. Tagline rotativa (estilo "Breathing") ---------- */
  const taglineWord = document.querySelector('.tagline-word');
  if (taglineWord && typeof window.BLOG_TAGLINE_WORDS !== 'undefined') {
    const words = window.BLOG_TAGLINE_WORDS;
    let index = 0;
    const swap = () => {
      index = (index + 1) % words.length;
      taglineWord.textContent = words[index];
      taglineWord.classList.remove('is-fading');
    };
    if (reducedMotion) {
      setInterval(swap, 3200);
    } else {
      setInterval(() => {
        taglineWord.classList.add('is-fading');
        setTimeout(swap, 420);
      }, 2900);
    }
  }

  /* ---------- 4. Reveals on-scroll ---------- */
  const revealElements = Array.from(document.querySelectorAll('[data-reveal]'));
  if (revealElements.length) {
    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      revealElements.forEach((el) => el.classList.add('is-in'));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
      );
      revealElements.forEach((el) => observer.observe(el));
    }
  }

  /* ---------- 5. Header: vidro ao rolar ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- 6. Ano dinâmico no rodapé ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
