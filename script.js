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
  const yearArchiveNav = document.getElementById('year-archive-nav');

  const YEAR_BOOK_ICON =
    '<svg class="year-btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
    '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>' +
    '</svg>';

  const ARCHIVE_YEARS = [
    { id: '2019-2020', label: '2019–2020', href: '2019-2020.html' },
    { id: '2020-2021', label: '2020–2021', href: '2020-2021.html' },
    { id: '2021-2022', label: '2021–2022', href: '2021-2022.html' },
    { id: '2022-2023', label: '2022–2023', href: '2022-2023.html' },
    { id: '2023-2024', label: '2023–2024', href: '2023-2024.html' },
    { id: '2024-2025', label: '2024–2025', href: '2024-2025.html' },
    { id: '2025-2026', label: '2025–2026', href: '../index.html#forums' }
  ];

  function renderYearArchiveNav() {
    if (!yearArchiveNav) return;

    const currentYear = document.body.dataset.yearPage || '';
    const buttons = ARCHIVE_YEARS.map(function (year) {
      const isCurrent = year.id === currentYear;
      return (
        '<a href="' + year.href + '" class="year-btn' + (isCurrent ? ' year-btn--current' : '') + '"' +
        (isCurrent ? ' aria-current="page"' : '') + '>' +
        YEAR_BOOK_ICON + year.label +
        '</a>'
      );
    }).join('');

    yearArchiveNav.innerHTML =
      '<div class="container">' +
      '<div class="archive__header">' +
      '<h2 class="section-title section-title--navy">Previous Forums</h2>' +
      '<p class="section-lead section-lead--centered">Access forum information from previous academic years</p>' +
      '</div>' +
      '<div class="archive__grid">' + buttons + '</div>' +
      '</div>';
  }

  /* Footer year */
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* Sticky nav background on scroll */
  function handleScroll() {
    if (!header) return;
    if (!header.classList.contains('site-header--solid')) {
      header.classList.toggle('is-scrolled', window.scrollY > 20);
    }
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
  renderYearArchiveNav();
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
  setCurrentYear();
})();
