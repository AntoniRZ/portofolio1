# 📁 Portfolio Website — Panduan Penggunaan

Website portofolio profesional dengan dark theme, galeri interaktif, filter kategori, modal detail, dan dukungan konten Work & Personal.

---

## 🚀 Cara Menjalankan

### Opsi 1: Live Server (Direkomendasikan)
```bash
# Jika ada VS Code + ekstensi Live Server:
# Klik kanan index.html → "Open with Live Server"

# Atau gunakan Node.js http-server:
npx http-server . -p 3000
# Lalu buka: http://localhost:3000
```

### Opsi 2: Python (tanpa instalasi tambahan)
```bash
# Python 3
python -m http.server 3000
# Buka: http://localhost:3000
```

> **⚠️ Penting:** Website menggunakan ES Modules (`import`/`export`).  
> File **TIDAK** bisa dibuka langsung dengan double-click `index.html` karena browser memblokir ES Modules dari `file://`.  
> Gunakan salah satu server di atas.

---

## 📂 Struktur File

```
Project porto/
├── index.html              ← Halaman utama
├── css/
│   ├── style.css           ← Gaya global, variabel, komponen
│   ├── animations.css      ← Animasi dan transisi
│   └── responsive.css      ← Breakpoint responsif
├── js/
│   ├── data.js             ← ⭐ DATA PROYEK — Edit di sini!
│   ├── gallery.js          ← Render kartu + logika filter
│   ├── modal.js            ← Lightbox / detail modal
│   └── main.js             ← Init, navigasi, animasi
└── assets/
    ├── images/
    │   ├── avatar.jpg      ← Foto profil Anda
    │   ├── work/           ← Gambar proyek Work
    │   └── personal/       ← Gambar proyek Personal
    └── videos/             ← Video proyek Personal
```

---

## ✏️ Cara Mengganti Konten

### 1. Informasi Pribadi
Buka `js/data.js` dan edit bagian `ownerInfo`:

```js
const ownerInfo = {
  name: "Nama Lengkap Anda",
  tagline: "Jabatan / Deskripsi Singkat",
  bio: "Cerita singkat tentang Anda...",
  location: "Kota, Negara",
  email: "email@anda.com",
  linkedin: "https://linkedin.com/in/username-anda",
  github: "https://github.com/username-anda",
  dribbble: "https://dribbble.com/username-anda",   // kosongkan jika tidak ada
  behance: "https://behance.net/username-anda",     // kosongkan jika tidak ada
  cvLink: "assets/cv-nama-anda.pdf",
  avatarImage: "assets/images/avatar.jpg",
};
```

### 2. Foto Profil
1. Taruh foto Anda di `assets/images/avatar.jpg`
2. Buka `index.html`, cari komentar `⚠️ GANTI: Jika sudah ada foto profil`
3. Hapus `<div class="avatar-placeholder">` dan uncomment tag `<img>`

### 3. Proyek Work (Hanya Gambar)
Edit array `workProjects` di `js/data.js`:

```js
{
  id: "w1",                                    // ID unik, jangan duplikat
  title: "Judul Proyek",
  description: "Deskripsi singkat proyek ini.",
  role: "Peran Anda (mis. UI Designer)",
  period: "Jan 2024 – Apr 2024",
  category: "UI/UX Design",                   // digunakan untuk filter
  tags: ["Figma", "Prototype", "Design System"],
  coverImage: "assets/images/work/nama-file.jpg",
  images: [                                    // gambar detail di modal
    "assets/images/work/nama-file-detail-1.jpg",
    "assets/images/work/nama-file-detail-2.jpg",
  ],
},
```

> **Catatan:** Work HANYA menampilkan gambar. Jangan tambahkan `videoSrc` atau `codeSnippet`.

### 4. Proyek Personal

#### Tipe: Gambar
```js
{
  id: "p1",
  contentType: "image",
  title: "Nama Proyek",
  category: "App Design",
  technologies: ["React", "TypeScript"],
  coverImage: "assets/images/personal/p1-cover.jpg",
  images: ["assets/images/personal/p1-1.jpg"],
  demoUrl: "https://demo.com",    // opsional
  repoUrl: "https://github.com/", // opsional
}
```

#### Tipe: Video
```js
{
  id: "p2",
  contentType: "video",
  title: "Nama Video",
  category: "Motion Design",
  technologies: ["After Effects"],
  coverImage: "assets/images/personal/p2-thumbnail.jpg",
  videoSrc: "assets/videos/p2-video.mp4",
  videoPoster: "assets/images/personal/p2-thumbnail.jpg",
}
```

#### Tipe: Kode Landing Page
```js
{
  id: "p3",
  contentType: "code",
  codeSubtype: "landing-page",
  title: "Nama Landing Page",
  category: "Web Development",
  technologies: ["HTML", "CSS", "JavaScript"],
  coverImage: "assets/images/personal/p3-cover.jpg",
  codeSnippet: `<!DOCTYPE html>
<html>...kode HTML Anda...</html>`,
  demoUrl: "https://demo.com",
}
```

#### Tipe: Kode Portofolio
```js
{
  id: "p4",
  contentType: "code",
  codeSubtype: "portfolio",
  title: "Portfolio v1",
  category: "Web Development",
  technologies: ["Next.js", "Tailwind"],
  codeSnippet: `// Kode React/JS portofolio Anda`,
}
```

### 5. Skill Bars
Buka `index.html`, cari bagian `<!-- ⚠️ GANTI nama skill dan persentase -->` dan edit nilai `width` pada `.skill-fill`.

### 6. Statistik Hero
Cari komentar `<!-- ⚠️ GANTI angka -->` di `index.html` dan ganti angka statistik.

---

## 🎨 Kustomisasi Desain

### Ganti Warna Aksen
Buka `css/style.css`, edit variabel di `:root`:

```css
:root {
  --clr-accent:  #6366f1;  /* Ganti ke warna pilihan Anda */
  --clr-accent2: #06b6d4;  /* Warna aksen kedua */
}
```

### Ganti Font
Ganti URL import di atas `css/style.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=FONT+PILIHAN&display=swap');
```
Lalu update `--font-sans` di `:root`.

---

## ✅ Checklist Sebelum Publish

- [ ] Ganti semua `data-owner` di `js/data.js` (name, email, links)
- [ ] Tambahkan foto profil di `assets/images/avatar.jpg`
- [ ] Upload gambar Work ke `assets/images/work/`
- [ ] Upload gambar Personal ke `assets/images/personal/`
- [ ] Upload video Personal ke `assets/videos/` (jika ada)
- [ ] Ganti placeholder `codeSnippet` dengan kode asli Anda
- [ ] Update skill bars di `index.html`
- [ ] Update statistik di hero section
- [ ] Ganti URL social links (LinkedIn, GitHub, dll.)
- [ ] Tambahkan CV di `assets/` dan update `cvLink`
- [ ] Test di mobile, tablet, dan desktop
- [ ] Test navigasi keyboard (Tab, Enter, Escape)
- [ ] Periksa semua link tidak 404

---

## 📱 Responsivitas

| Breakpoint | Perangkat          |
|------------|--------------------|
| > 1200px   | Desktop besar      |
| 1024–1200px| Desktop standar    |
| 640–1024px | Tablet             |
| < 640px    | Mobile             |
| < 480px    | Mobile kecil       |

---

## ♿ Aksesibilitas

- Skip link ke konten utama
- Semua gambar memiliki `alt` text
- Navigasi keyboard penuh (Tab, Enter, Space, Escape, Arrow Keys)
- Focus trap di dalam modal
- Support `prefers-reduced-motion`
- ARIA roles, labels, dan live regions
- Kontras warna WCAG AA

---

## 🌐 Deploy

### Vercel (Gratis, Direkomendasikan)
```bash
npm i -g vercel
vercel deploy
```

### Netlify
Drag & drop folder `Project porto` ke [netlify.com/drop](https://app.netlify.com/drop)

### GitHub Pages
1. Push ke GitHub repo
2. Settings → Pages → Source: main branch
3. Akses di `username.github.io/nama-repo`

---

Dibuat dengan ❤️ — Vanilla HTML + CSS + JavaScript (ES Modules)

