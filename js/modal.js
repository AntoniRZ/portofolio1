/**
 * modal.js — Lightbox / detail modal untuk proyek
 * ================================================================
 * Menangani:
 *  - Tampilan detail proyek (gambar, video, kode)
 *  - Lightbox multi-gambar dengan thumbnail navigator
 *  - Pemutaran video
 *  - Tombol copy kode
 *  - Keyboard navigation & focus trap
 *  - Scroll lock saat modal terbuka
 * ================================================================
 */

import { workProjects, personalProjects } from './data.js';

/* ── State ───────────────────────────────────────────────── */
let currentImageIndex = 0;
let currentImages = [];

/* ── Selector ────────────────────────────────────────────── */
const overlay = document.getElementById('modal-overlay');
const modalEl  = document.getElementById('modal');

/* ── Focus Trap ──────────────────────────────────────────── */
function getFocusableElements() {
  return Array.from(
    modalEl.querySelectorAll(
      'button:not([disabled]), a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
    )
  );
}

function trapFocus(e) {
  const focusable = getFocusableElements();
  if (!focusable.length) return;
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

/* ── Open / Close ────────────────────────────────────────── */
function openModal(project, section) {
  modalEl.innerHTML = buildModalContent(project, section);
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Setup internal events setelah render
  setupModalEvents(project, section);

  // Focus ke tombol close
  setTimeout(() => {
    const closeBtn = modalEl.querySelector('.modal-close-btn');
    if (closeBtn) closeBtn.focus();
  }, 100);

  // Trap focus
  overlay.addEventListener('keydown', trapFocus);

  // Tutup overlay saat klik di luar modal
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  }, { once: true });

  // ESC menutup modal
  document.addEventListener('keydown', handleEsc);
}

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  overlay.removeEventListener('keydown', trapFocus);
  document.removeEventListener('keydown', handleEsc);

  // Pause video jika ada
  const video = overlay.querySelector('video');
  if (video) video.pause();

  // Kembalikan fokus ke kartu yang tadi diklik
  if (window._lastFocusedCard) {
    window._lastFocusedCard.focus();
    window._lastFocusedCard = null;
  }

  // Reset state
  currentImageIndex = 0;
  currentImages = [];
}

function handleEsc(e) {
  if (e.key === 'Escape') closeModal();
}

/* ── Build Modal Content ─────────────────────────────────── */
function buildModalContent(project, section) {
  const isWork = section === 'work';
  const contentSection = buildContentSection(project);
  const detailsSection = buildDetailsSection(project, isWork);
  const actionsSection = isWork ? '' : buildActionsSection(project);

  return `
    <div class="modal-close">
      <button class="modal-close-btn" aria-label="Tutup modal">✕</button>
    </div>
    <div class="modal-body">
      ${contentSection}
      <div class="modal-info">
        ${detailsSection}
        ${actionsSection}
      </div>
    </div>
  `;
}

/* ── Content Section (gambar / video / kode) ─────────────── */
function buildContentSection(project) {
  const type = project.contentType || 'image';

  if (type === 'video') {
    return buildVideoSection(project);
  }
  if (type === 'code') {
    return buildCodeSection(project);
  }
  // Default: image (untuk Work dan Personal bergambar)
  return buildImageSection(project);
}

function buildImageSection(project) {
  const images = project.images?.length
    ? project.images
    : project.coverImage
      ? [project.coverImage]
      : [];

  currentImages = images;
  currentImageIndex = 0;

  if (!images.length) {
    return `
      <div class="modal-gallery">
        <div class="modal-gallery-main">
          <div class="modal-placeholder">
            <span>${project._placeholderIcon || '🖼️'}</span>
            <p><!-- ⚠️ GANTI: Tambahkan gambar Anda --></p>
          </div>
        </div>
      </div>
    `;
  }

  const thumbsHTML = images.length > 1
    ? `<div class="modal-gallery-thumbs" role="list" aria-label="Thumbnail gambar proyek">
        ${images.map((src, i) => `
          <div
            class="modal-thumb ${i === 0 ? 'active' : ''}"
            data-index="${i}"
            role="listitem"
            tabindex="0"
            aria-label="Gambar ${i + 1} dari ${images.length}"
            aria-selected="${i === 0}"
          >
            <img
              src="${src}"
              alt="Thumbnail gambar ${i + 1}"
              loading="lazy"
              onerror="this.closest('.modal-thumb').style.display='none'"
            >
          </div>
        `).join('')}
      </div>`
    : '';

  return `
    <div class="modal-gallery">
      <div class="modal-gallery-main" id="modal-main-img" role="img" aria-label="Gambar utama proyek">
        <img
          src="${images[0]}"
          alt="Preview proyek"
          id="modal-active-img"
          onerror="this.closest('.modal-gallery-main').innerHTML='<div class=\'modal-placeholder\'><span>${project._placeholderIcon || '🖼️'}</span><p>Gambar belum tersedia</p></div>'"
        >
      </div>
      ${thumbsHTML}
    </div>
  `;
}

function buildVideoSection(project) {
  const videoSrc = project.videoSrc || '';
  const poster   = project.videoPoster || project.coverImage || '';

  if (!videoSrc) {
    return `
      <div class="modal-video">
        <div class="modal-placeholder" style="min-height:300px">
          <span>🎬</span>
          <p><!-- ⚠️ GANTI: Tambahkan path video Anda (videoSrc) di data.js --></p>
        </div>
      </div>
    `;
  }

  return `
    <div class="modal-video">
      <video
        controls
        preload="metadata"
        poster="${poster}"
        aria-label="Video demo proyek: ${project.title}"
        style="width:100%;height:100%;object-fit:contain;"
      >
        <source src="${videoSrc}" type="video/mp4">
        Browser Anda tidak mendukung elemen video.
        <a href="${videoSrc}" download>Unduh video</a>
      </video>
    </div>
  `;
}

function buildCodeSection(project) {
  if (!project.codeSnippet) {
    return `
      <div class="modal-code">
        <div class="modal-placeholder" style="min-height:200px">
          <span>💻</span>
          <p><!-- ⚠️ GANTI: Tambahkan codeSnippet Anda di data.js --></p>
        </div>
      </div>
    `;
  }

  const isPortfolio = project.codeSubtype === 'portfolio';
  const lang = isPortfolio ? 'jsx' : 'html';
  const title = isPortfolio ? 'portfolio.jsx' : 'index.html';
  const badgeClass = isPortfolio ? 'portfolio' : 'landing';
  const badgeLabel = isPortfolio ? 'Portfolio Code' : 'Landing Page Code';

  // Escape HTML untuk tampilkan di <pre>
  const escaped = project.codeSnippet
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return `
    <div class="modal-code">
      <div class="modal-code-header">
        <div class="modal-code-title">
          <div class="modal-code-dots" aria-hidden="true">
            <span></span><span></span><span></span>
          </div>
          <span class="card-code-badge ${badgeClass}" style="position:static;margin-left:0.5rem;">
            ${badgeLabel}
          </span>
          &nbsp;${title}
        </div>
        <button class="copy-btn" id="copy-code-btn" aria-label="Salin kode ke clipboard">
          📋 Salin
        </button>
      </div>
      <pre aria-label="Cuplikan kode ${title}" tabindex="0"><code class="lang-${lang}">${escaped}</code></pre>
    </div>
  `;
}

/* ── Details Section ─────────────────────────────────────── */
function buildDetailsSection(project, isWork) {
  const tags = isWork
    ? project.tags || []
    : project.technologies || [];

  const tagsHTML = tags.length
    ? `<div class="modal-tech-tags" aria-label="${isWork ? 'Tools' : 'Teknologi'}">
        ${tags.map(t => `<span class="modal-tech-tag">${t}</span>`).join('')}
      </div>`
    : '';

  // Detail grid
  const detailItems = isWork
    ? [
        { label: 'Peran', value: project.role },
        { label: 'Periode', value: project.period },
        { label: 'Kategori', value: project.category },
      ]
    : [
        { label: 'Kategori', value: project.category },
        { label: 'Jenis Konten', value: { image:'🖼️ Gambar', video:'🎬 Video', code:'💻 Kode' }[project.contentType] || '-' },
      ];

  const detailsHTML = detailItems
    .filter(d => d.value)
    .map(d => `
      <div class="modal-detail-item">
        <span class="modal-detail-label">${d.label}</span>
        <span class="modal-detail-value">${d.value}</span>
      </div>
    `)
    .join('');

  return `
    <div class="modal-info-header">
      <div>
        <span class="modal-category-badge">${project.category}</span>
        <h2 class="modal-title" style="margin-top:0.75rem">${project.title}</h2>
      </div>
    </div>
    <p class="modal-desc">${project.description}</p>
    ${detailsHTML ? `<div class="modal-details" aria-label="Detail proyek">${detailsHTML}</div>` : ''}
    ${tagsHTML}
  `;
}

function buildActionsSection(project) {
  const demoBtn = project.demoUrl
    ? `<a
         href="${project.demoUrl}"
         target="_blank"
         rel="noopener noreferrer"
         class="btn btn-primary"
         aria-label="Buka demo live"
       >↗ Lihat Demo</a>`
    : '';

  const repoBtn = project.repoUrl
    ? `<a
         href="${project.repoUrl}"
         target="_blank"
         rel="noopener noreferrer"
         class="btn btn-outline"
         aria-label="Lihat repositori kode"
       >&lt;/&gt; Source Code</a>`
    : '';

  if (!demoBtn && !repoBtn) return '';

  return `
    <div class="modal-actions">
      ${demoBtn}
      ${repoBtn}
    </div>
  `;
}

/* ── Setup Internal Events ───────────────────────────────── */
function setupModalEvents(project, section) {
  // Tombol close
  modalEl.querySelector('.modal-close-btn')?.addEventListener('click', closeModal);

  // Thumbnail image switcher
  const thumbContainer = modalEl.querySelector('.modal-gallery-thumbs');
  if (thumbContainer) {
    thumbContainer.addEventListener('click', (e) => {
      const thumb = e.target.closest('.modal-thumb');
      if (!thumb) return;

      const idx = parseInt(thumb.dataset.index, 10);
      switchImage(idx);
    });

    thumbContainer.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const thumb = e.target.closest('.modal-thumb');
      if (!thumb) return;
      e.preventDefault();
      const idx = parseInt(thumb.dataset.index, 10);
      switchImage(idx);
    });
  }

  // Arrow keys untuk navigasi gambar
  if (project.contentType !== 'video' && project.contentType !== 'code') {
    overlay.addEventListener('keydown', handleImageKeys);
  }

  // Copy button untuk kode
  const copyBtn = document.getElementById('copy-code-btn');
  if (copyBtn && project.codeSnippet) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(project.codeSnippet).then(() => {
        copyBtn.textContent = '✓ Disalin!';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.textContent = '📋 Salin';
          copyBtn.classList.remove('copied');
        }, 2000);
      }).catch(() => {
        // Fallback untuk browser yang tidak mendukung clipboard API
        const textarea = document.createElement('textarea');
        textarea.value = project.codeSnippet;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        copyBtn.textContent = '✓ Disalin!';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.textContent = '📋 Salin';
          copyBtn.classList.remove('copied');
        }, 2000);
      });
    });
  }
}

function switchImage(idx) {
  if (!currentImages[idx]) return;
  currentImageIndex = idx;

  const mainImg = document.getElementById('modal-active-img');
  const thumbs  = document.querySelectorAll('.modal-thumb');

  if (mainImg) {
    mainImg.style.opacity = '0';
    mainImg.style.transform = 'scale(0.98)';
    setTimeout(() => {
      mainImg.src = currentImages[idx];
      mainImg.style.opacity = '1';
      mainImg.style.transform = 'scale(1)';
    }, 150);
    mainImg.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
  }

  thumbs.forEach((t, i) => {
    t.classList.toggle('active', i === idx);
    t.setAttribute('aria-selected', i === idx);
  });
}

function handleImageKeys(e) {
  if (e.key === 'ArrowRight') {
    const next = (currentImageIndex + 1) % currentImages.length;
    switchImage(next);
  }
  if (e.key === 'ArrowLeft') {
    const prev = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    switchImage(prev);
  }
}

/* ── Init ────────────────────────────────────────────────── */
export function initModal() {
  if (!overlay || !modalEl) {
    console.warn('Modal elements not found in DOM');
    return;
  }

  // Dengarkan event dari gallery.js
  document.addEventListener('openProjectModal', (e) => {
    const { project, section } = e.detail;

    // Simpan fokus untuk dikembalikan setelah tutup
    window._lastFocusedCard = document.activeElement;

    openModal(project, section);
  });
}

