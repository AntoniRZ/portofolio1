/**
 * main.js — Entry point & orchestrator
 * ================================================================
 * Tanggung jawab:
 *  - Inject data owner ke DOM (nama, bio, link sosial)
 *  - Setup navigasi (scroll behavior, hamburger, tab portofolio)
 *  - Init gallery Work dan Personal
 *  - Init modal
 *  - Scroll reveal (Intersection Observer)
 *  - Skill bar animation
 *  - Scroll-to-top button
 *  - Mouse glow effect di hero
 * ================================================================
 */

import { ownerInfo } from './data.js';
import { mountGallery, getProjectCounts } from './gallery.js';
import { initModal } from './modal.js';

/* ── DOMContentLoaded ────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  injectOwnerInfo();
  setupNavigation();
  setupPortfolioTabs();
  initGalleries();
  initModal();
  setupScrollReveal();
  setupSkillBars();
  setupScrollToTop();
  setupHeroGlow();
});

/* ── Inject Owner Info ───────────────────────────────────── */
function injectOwnerInfo() {
  const o = ownerInfo;

  // Nama & metadata
  setTextAll('[data-owner="name"]', o.name);
  setTextAll('[data-owner="tagline"]', o.tagline);
  setTextAll('[data-owner="bio"]', o.bio);
  setTextAll('[data-owner="location"]', o.location);
  setTextAll('[data-owner="email"]', o.email);

  // Mailto links
  document.querySelectorAll('[data-owner="email-link"]').forEach(el => {
    el.href = `mailto:${o.email}`;
    el.textContent = o.email;
  });

  // Document title
  document.title = `${o.name} — Portfolio`;

  // Avatar
  const avatarImg = document.querySelector('[data-owner="avatar"]');
  if (avatarImg) {
    avatarImg.src = o.avatarImage;
    avatarImg.alt = `Foto profil ${o.name}`;
  }

  // Social links — tampilkan hanya yang diisi
  const socialMap = {
    linkedin:  { el: '[data-social="linkedin"]',  url: o.linkedin  },
    github:    { el: '[data-social="github"]',    url: o.github    },
    dribbble:  { el: '[data-social="dribbble"]',  url: o.dribbble  },
    behance:   { el: '[data-social="behance"]',   url: o.behance   },
  };

  Object.values(socialMap).forEach(({ el, url }) => {
    document.querySelectorAll(el).forEach(link => {
      if (url && url !== '#') {
        link.href = url;
        link.closest('.social-wrap')?.classList.remove('hidden');
      } else {
        link.closest('.social-wrap')?.classList.add('hidden');
      }
    });
  });

  // CV link
  document.querySelectorAll('[data-owner="cv-link"]').forEach(el => {
    el.href = o.cvLink || '#';
  });

  // Nav logo initials (ambil 2 karakter pertama tiap kata)
  const initials = o.name.split(' ').slice(0, 2).map(w => w[0]).join('');
  document.querySelectorAll('[data-owner="initials"]').forEach(el => {
    el.textContent = initials;
  });
}

function setTextAll(selector, value) {
  document.querySelectorAll(selector).forEach(el => {
    el.textContent = value;
  });
}

/* ── Navigation ──────────────────────────────────────────── */
function setupNavigation() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  // Navbar scrolled state
  const updateNavbar = () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // Hamburger toggle
  hamburger?.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileNav?.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
  });

  // Tutup mobile nav saat link diklik
  mobileNav?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      mobileNav.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  const observerNav = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px' }
  );

  sections.forEach(s => observerNav.observe(s));

  // Smooth scroll untuk semua anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ── Portfolio Tabs (Work / Personal) ───────────────────── */
function setupPortfolioTabs() {
  const tabBtns   = document.querySelectorAll('.tab-btn');
  const workPanel = document.getElementById('work-panel');
  const persPanel = document.getElementById('personal-panel');

  if (!tabBtns.length || !workPanel || !persPanel) return;

  const counts = getProjectCounts();

  // Set jumlah proyek di tab
  document.querySelector('[data-tab-count="work"]')?.textContent && null;
  document.querySelectorAll('[data-tab-count="work"]').forEach(el => el.textContent = counts.work);
  document.querySelectorAll('[data-tab-count="personal"]').forEach(el => el.textContent = counts.personal);

  function switchTab(tabName) {
    const isWork = tabName === 'work';
    workPanel.hidden = !isWork;
    persPanel.hidden = isWork;

    tabBtns.forEach(btn => {
      const isActive = btn.dataset.tab === tabName;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive);
      btn.setAttribute('aria-expanded', isActive);
    });

    // Smooth scroll ke section jika diperlukan
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Default: tampilkan Work
  switchTab('work');
}

/* ── Init Galleries ──────────────────────────────────────── */
function initGalleries() {
  const workGrid    = document.getElementById('work-grid');
  const workFilter  = document.getElementById('work-filter');
  const persGrid    = document.getElementById('personal-grid');
  const persFilter  = document.getElementById('personal-filter');

  if (workGrid && workFilter) {
    mountGallery('work', {
      gridEl:   workGrid,
      filterEl: workFilter,
    });
  }

  if (persGrid && persFilter) {
    mountGallery('personal', {
      gridEl:   persGrid,
      filterEl: persFilter,
    });
  }
}

/* ── Scroll Reveal ───────────────────────────────────────── */
function setupScrollReveal() {
  // Hormati preferensi reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const revealEls = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-stagger'
  );

  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => observer.observe(el));
}

/* ── Skill Bars Animation ────────────────────────────────── */
function setupSkillBars() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.skill-fill').forEach(bar => {
      bar.classList.add('animated');
    });
    return;
  }

  const skillSection = document.querySelector('.about-skills');
  if (!skillSection) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.skill-fill').forEach((bar, i) => {
            setTimeout(() => bar.classList.add('animated'), i * 120);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(skillSection);
}

/* ── Scroll To Top ───────────────────────────────────────── */
function setupScrollToTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── Hero Glow Mouse Effect ──────────────────────────────── */
function setupHeroGlow() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    hero.style.setProperty('--hero-mouse-x', `${x}%`);
    hero.style.setProperty('--hero-mouse-y', `${y}%`);
  });
}

