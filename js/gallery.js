/**
 * gallery.js — Render kartu proyek & logika filter
 * ================================================================
 * Modul ini membaca data dari data.js dan:
 *  1. Men-generate semua kartu Work dan Personal
 *  2. Mengatur tombol filter kategori
 *  3. Menangani animasi masuk/keluar saat filter berubah
 * ================================================================
 */

import { workProjects, personalProjects } from './data.js';

/* ── Helpers ─────────────────────────────────────────────── */

/**
 * Buat thumbnail untuk kartu.
 * Jika path gambar tidak ada (placeholder), tampilkan emoji + warna.
 */
function buildThumbnail(project) {
  const hasImage = project.coverImage && !project.coverImage.includes('placeholder');

  let overlayHTML = '';

  if (project.contentType === 'video') {
    overlayHTML = `
      <div class="card-video-badge" aria-hidden="true">▶</div>
    `;
  }

  if (project.contentType === 'code') {
    const subtype = project.codeSubtype === 'portfolio' ? 'portfolio' : 'landing';
    const label = project.codeSubtype === 'portfolio' ? '&lt;/portfolio&gt;' : '&lt;/landing&gt;';
    overlayHTML = `<div class="card-code-badge ${subtype}">${label}</div>`;
  }

  // Tombol buka (muncul saat hover)
  overlayHTML += `
    <button class="card-open-btn" aria-label="Lihat detail proyek" data-action="open">
      ↗
    </button>
  `;

  // Gunakan placeholder jika gambar asli belum tersedia
  const thumbnailContent = hasImage
    ? `<img
         src="${project.coverImage}"
         alt="Preview ${project.title}"
         loading="lazy"
         onerror="this.closest('.card-thumbnail').innerHTML = \`<div class='card-placeholder' aria-label='Preview ${project.title}'>${project._placeholderIcon || '🖼️'}</div>${overlayHTML}\`"
       >`
    : `<div class="card-placeholder" aria-label="Preview placeholder untuk ${project.title}">
         ${project._placeholderIcon || '🖼️'}
       </div>`;

  return `
    <div class="card-thumbnail">
      ${thumbnailContent}
      ${overlayHTML}
    </div>
  `;
}

/**
 * Render kartu Work.
 * Work hanya menampilkan: gambar, judul, deskripsi, peran, periode, kategori, tags.
 * TIDAK ada: video, kode, link demo/repo.
 */
function renderWorkCard(project) {
  const tags = (project.tags || [])
    .map(t => `<span class="card-tag">${t}</span>`)
    .join('');

  return `
    <article
      class="project-card"
      data-id="${project.id}"
      data-section="work"
      data-category="${project.category}"
      role="button"
      tabindex="0"
      aria-label="Buka detail: ${project.title}"
    >
      ${buildThumbnail(project)}

      <div class="card-body">
        <div class="card-meta">
          <span class="card-category">${project.category}</span>
          <span class="card-period">${project.period}</span>
        </div>

        <h3 class="card-title">${project.title}</h3>
        <p class="card-desc">${project.description}</p>

        ${tags ? `<div class="card-tags" aria-label="Tools & teknologi">${tags}</div>` : ''}

        <div class="card-footer">
          <span class="card-role">
            <span aria-hidden="true">👤</span>
            ${project.role}
          </span>
        </div>
      </div>
    </article>
  `;
}

/**
 * Render kartu Personal.
 * Personal dapat menampilkan: gambar, video, kode.
 * Menyertakan link demo & repo jika tersedia.
 */
function renderPersonalCard(project) {
  const tech = (project.technologies || [])
    .map(t => `<span class="card-tag">${t}</span>`)
    .join('');

  // Tombol link demo / repo (Personal only)
  let linksHTML = '';
  if (project.demoUrl || project.repoUrl) {
    const demoBtn = project.demoUrl
      ? `<a
           href="${project.demoUrl}"
           target="_blank"
           rel="noopener noreferrer"
           class="card-link-btn"
           aria-label="Lihat demo live"
           data-tooltip="Demo"
           onclick="event.stopPropagation()"
         >↗</a>`
      : '';

    const repoBtn = project.repoUrl
      ? `<a
           href="${project.repoUrl}"
           target="_blank"
           rel="noopener noreferrer"
           class="card-link-btn"
           aria-label="Lihat repositori kode"
           data-tooltip="Repo"
           onclick="event.stopPropagation()"
         >&lt;/&gt;</a>`
      : '';

    linksHTML = `<div class="card-links">${demoBtn}${repoBtn}</div>`;
  }

  return `
    <article
      class="project-card"
      data-id="${project.id}"
      data-section="personal"
      data-category="${project.category}"
      data-content-type="${project.contentType}"
      role="button"
      tabindex="0"
      aria-label="Buka detail: ${project.title}"
    >
      ${buildThumbnail(project)}

      <div class="card-body">
        <div class="card-meta">
          <span class="card-category">${project.category}</span>
          <span class="card-period">${project.contentType === 'video' ? '🎬 Video' : project.contentType === 'code' ? '💻 Code' : '🖼️ Image'}</span>
        </div>

        <h3 class="card-title">${project.title}</h3>
        <p class="card-desc">${project.description}</p>

        ${tech ? `<div class="card-tags" aria-label="Teknologi yang digunakan">${tech}</div>` : ''}

        <div class="card-footer">
          <span class="card-role">
            <span aria-hidden="true">🧑‍💻</span> Personal Project
          </span>
          ${linksHTML}
        </div>
      </div>
    </article>
  `;
}

/* ── Filter Logic ────────────────────────────────────────── */

/**
 * Ambil semua kategori unik dari array proyek.
 */
function getCategories(projects) {
  const cats = [...new Set(projects.map(p => p.category))].sort();
  return ['All', ...cats];
}

/**
 * Render tombol filter.
 */
function renderFilterButtons(container, categories, activeFilter) {
  container.innerHTML = `
    <span class="filter-label" aria-hidden="true">Filter:</span>
    ${categories
      .map(cat => `
        <button
          class="filter-btn ${cat === activeFilter ? 'active' : ''}"
          data-filter="${cat}"
          aria-pressed="${cat === activeFilter}"
          aria-label="Filter: ${cat}"
        >${cat}</button>
      `)
      .join('')}
  `;
}

/**
 * Terapkan filter: sembunyikan/tampilkan kartu + animasi.
 */
function applyFilter(grid, filter, section) {
  const cards = grid.querySelectorAll('.project-card');
  let visibleCount = 0;

  cards.forEach((card, index) => {
    const cat = card.dataset.category;
    const matches = filter === 'All' || cat === filter;

    if (matches) {
      card.classList.remove('hidden');
      card.classList.add('entering');
      card.style.animationDelay = `${index * 0.05}s`;
      card.addEventListener('animationend', () => {
        card.classList.remove('entering');
        card.style.animationDelay = '';
      }, { once: true });
      visibleCount++;
    } else {
      card.classList.add('hidden');
      card.classList.remove('entering');
    }
  });

  // Tampilkan empty state jika tidak ada yang cocok
  let emptyState = grid.querySelector('.empty-state');
  if (visibleCount === 0) {
    if (!emptyState) {
      emptyState = document.createElement('div');
      emptyState.className = 'empty-state';
      emptyState.innerHTML = `
        <span class="empty-state-icon">🔍</span>
        <h3>Tidak ada proyek ditemukan</h3>
        <p style="color:var(--clr-text-muted);font-size:0.875rem;">
          Coba pilih kategori lain.
        </p>
      `;
      grid.appendChild(emptyState);
    }
  } else if (emptyState) {
    emptyState.remove();
  }
}

/* ── Mount Gallery ───────────────────────────────────────── */

/**
 * Setup galeri Work atau Personal.
 * @param {string} section - 'work' atau 'personal'
 * @param {Object} options - { gridEl, filterEl }
 */
export function mountGallery(section, { gridEl, filterEl }) {
  const projects = section === 'work' ? workProjects : personalProjects;
  const renderFn = section === 'work' ? renderWorkCard : renderPersonalCard;

  // Render semua kartu
  gridEl.innerHTML = projects.map(renderFn).join('');

  // Setup filter
  const categories = getCategories(projects);
  let activeFilter = 'All';

  renderFilterButtons(filterEl, categories, activeFilter);

  // Event delegasi filter
  filterEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    activeFilter = btn.dataset.filter;

    // Update visual state filter buttons
    filterEl.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.filter === activeFilter);
      b.setAttribute('aria-pressed', b.dataset.filter === activeFilter);
    });

    applyFilter(gridEl, activeFilter, section);
  });

  // Event delegasi kartu (klik untuk buka modal)
  gridEl.addEventListener('click', (e) => {
    const card = e.target.closest('.project-card');
    if (!card) return;

    // Jangan buka modal jika klik pada link demo/repo
    if (e.target.closest('a')) return;

    const id = card.dataset.id;
    const projectSection = card.dataset.section;
    const project = projectSection === 'work'
      ? workProjects.find(p => p.id === id)
      : personalProjects.find(p => p.id === id);

    if (project) {
      // Dispatch event ke modal.js
      document.dispatchEvent(new CustomEvent('openProjectModal', {
        detail: { project, section: projectSection }
      }));
    }
  });

  // Keyboard accessibility: Enter/Space membuka modal
  gridEl.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.project-card');
    if (!card) return;
    e.preventDefault();

    const id = card.dataset.id;
    const projectSection = card.dataset.section;
    const project = projectSection === 'work'
      ? workProjects.find(p => p.id === id)
      : personalProjects.find(p => p.id === id);

    if (project) {
      document.dispatchEvent(new CustomEvent('openProjectModal', {
        detail: { project, section: projectSection }
      }));
    }
  });

  // Mouse tracking untuk efek glow pada kartu
  gridEl.addEventListener('mousemove', (e) => {
    const card = e.target.closest('.project-card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  });

  return { projects, categories };
}

/**
 * Perbarui jumlah proyek di tab.
 */
export function getProjectCounts() {
  return {
    work: workProjects.length,
    personal: personalProjects.length,
  };
}

