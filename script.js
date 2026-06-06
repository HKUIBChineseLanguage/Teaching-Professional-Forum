/**
 * HKU IB Chinese Language Teaching Professional Forum
 */

(function () {
  'use strict';

  const header = document.querySelector('.site-header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link, .footer__nav a');
  const revealElements = document.querySelectorAll('.reveal');
  const yearButtons = document.querySelectorAll('.year-btn');
  const yearEl = document.getElementById('year');

  /* Footer year */
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* Sticky nav background on scroll */
  function handleScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 20);
    updateActiveNavLink();
  }

  /* Mobile menu toggle */
  function toggleMenu() {
    if (!navToggle || !navMenu) return;
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    if (!navToggle || !navMenu) return;
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', toggleMenu);
  }

  /* Smooth scroll for anchor links */
  function smoothScrollTo(target) {
    const el = document.querySelector(target);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();
      closeMenu();
      smoothScrollTo(href);
      history.pushState(null, '', href);
    });
  });

  /* Active nav link based on scroll position */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(function (section) {
      const id = section.getAttribute('id');
      const top = section.offsetTop;
      const height = section.offsetHeight;

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          const href = link.getAttribute('href');
          link.classList.toggle('is-active', href === '#' + id);
        });
      }
    });
  }

  /* Scroll reveal animation */
  if ('IntersectionObserver' in window && revealElements.length) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* Year button active state */
  function setCurrentYear() {
    yearButtons.forEach(function (btn) {
      const isCurrent = btn.classList.contains('year-btn--current');
      if (isCurrent) {
        btn.setAttribute('aria-current', 'page');
      }
    });
  }

  /* Image error fallback — show gradient placeholder */
  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () {
      img.style.objectFit = 'cover';
      img.alt = img.alt || 'Image placeholder';
    });
  });

  /* Close mobile menu on resize */
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });

  /* Init */
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
  setCurrentYear();
})();
