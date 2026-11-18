/**
 * ============================================================
 *  DATA PROYEK — Edit bagian ini untuk menambah/mengubah karya
 * ============================================================
 *
 *  📌 CARA MENGGANTI KONTEN:
 *  1. Ganti nilai pada setiap objek di bawah ini.
 *  2. Untuk gambar: taruh file di assets/images/, lalu ubah path-nya.
 *  3. Untuk video: taruh file di assets/videos/, lalu ubah path-nya.
 *  4. Semua field bertanda ⚠️ WAJIB diisi.
 *  5. Field bertanda (opsional) bisa dihapus jika tidak diperlukan.
 *
 * ============================================================
 */

// ----------------------------------------------------------------
// INFORMASI PERSONAL — Ganti dengan data Anda
// ----------------------------------------------------------------
const ownerInfo = {
  name: "Antoni Roozaq Pratomo",                       // ⚠️ GANTI
  tagline: "Digital Marketing Specialist", // ⚠️ GANTI
  bio: "Digital Marketing Specialist dengan pengalaman 1 tahun di industri properti. Menghasilkan 300K+ organic views dan berkontribusi pada penjualan 2 unit properti.",  // ⚠️ GANTI
  location: "Malang, Indonesia",           // ⚠️ GANTI
  email: "antonioni721@gmail.com",             // ⚠️ GANTI
  linkedin: "https://linkedin.com/in/antoni-roozaq", // ⚠️ GANTI (opsional)
  github: "https://github.com/AntoniRZ",   // ⚠️ GANTI (opsional)
  tiktok: "https://tiktok.com/@altongaud", // ⚠️ GANTI (opsional)
  instagram: "https://www.instagram.com/antonirzz",  // ⚠️ GANTI (opsional)
  cvLink: "assets/CV/Antoni Roozaq Pratomo-CV 1.pdf",                              // ⚠️ GANTI — link download CV Anda
  avatarImage: "assets/images/personal/pandawa beach.jpg", // ⚠️ GANTI — foto profil Anda
};

// ----------------------------------------------------------------
// DATA WORK — Konten pekerjaan profesional (hanya gambar)
// ----------------------------------------------------------------
const workProjects = [
  {
    id: "w1",
    title: "Dashboard Analytics Rebranding",           // ⚠️ GANTI
    description: "Redesain menyeluruh dashboard internal perusahaan untuk meningkatkan keterbacaan data dan efisiensi workflow tim operasional.", // ⚠️ GANTI
    role: "Lead UI/UX Designer",                       // ⚠️ GANTI
    period: "Jan 2024 – Apr 2024",                     // ⚠️ GANTI
    category: "UI/UX Design",                          // ⚠️ GANTI — digunakan untuk filter
    tags: ["Figma", "Design System", "Data Viz"],      // ⚠️ GANTI
    coverImage: "assets/images/work/w1-cover.jpg",     // ⚠️ GANTI
    images: [                                           // ⚠️ GANTI — gambar detail
      "assets/images/work/w1-detail-1.jpg",
      "assets/images/work/w1-detail-2.jpg",
    ],
    // Placeholder warna untuk preview (hapus setelah ada gambar asli)
    _placeholderColor: "#1a1a3e",
    _placeholderIcon: "📊",
  },
  {
    id: "w2",
    title: "E-Commerce Mobile App",                    // ⚠️ GANTI
    description: "Desain pengalaman belanja mobile-first untuk platform e-commerce B2C dengan fokus pada conversion rate dan retensi pengguna.", // ⚠️ GANTI
    role: "UI Designer & Prototyper",                  // ⚠️ GANTI
    period: "Jun 2023 – Oct 2023",                     // ⚠️ GANTI
    category: "Mobile Design",                         // ⚠️ GANTI
    tags: ["Figma", "Prototyping", "User Testing"],    // ⚠️ GANTI
    coverImage: "assets/images/work/w2-cover.jpg",     // ⚠️ GANTI
    images: [
      "assets/images/work/w2-detail-1.jpg",
    ],
    _placeholderColor: "#1e3a1e",
    _placeholderIcon: "🛒",
  },
  {
    id: "w3",
    title: "Brand Identity System",                    // ⚠️ GANTI
    description: "Pembangunan sistem identitas visual dari nol untuk startup fintech, mencakup logo, tipografi, palet warna, dan panduan brand.", // ⚠️ GANTI
    role: "Brand Designer",                            // ⚠️ GANTI
    period: "Mar 2023 – May 2023",                     // ⚠️ GANTI
    category: "Branding",                              // ⚠️ GANTI
    tags: ["Illustrator", "Brand Strategy", "Logo Design"], // ⚠️ GANTI
    coverImage: "assets/images/work/w3-cover.jpg",     // ⚠️ GANTI
    images: [
      "assets/images/work/w3-detail-1.jpg",
      "assets/images/work/w3-detail-2.jpg",
    ],
    _placeholderColor: "#3a1e1e",
    _placeholderIcon: "🎨",
  },
  {
    id: "w4",
    title: "SaaS Landing Page Redesign",               // ⚠️ GANTI
    description: "Redesain halaman pemasaran produk SaaS dengan pendekatan storytelling visual untuk meningkatkan trial sign-up sebesar 40%.", // ⚠️ GANTI
    role: "Frontend Developer & UI Designer",          // ⚠️ GANTI
    period: "Nov 2022 – Jan 2023",                     // ⚠️ GANTI
    category: "Web Design",                            // ⚠️ GANTI
    tags: ["React", "Tailwind", "Framer Motion"],      // ⚠️ GANTI
    coverImage: "assets/images/work/w4-cover.jpg",     // ⚠️ GANTI
    images: [
      "assets/images/work/w4-detail-1.jpg",
    ],
    _placeholderColor: "#1e2a3a",
    _placeholderIcon: "🚀",
  },
  {
    id: "w5",
    title: "Design System Component Library",          // ⚠️ GANTI
    description: "Pembangunan design system end-to-end untuk produk enterprise, mencakup 80+ komponen UI yang terdokumentasi dan teruji.", // ⚠️ GANTI
    role: "Design System Lead",                        // ⚠️ GANTI
    period: "Aug 2022 – Nov 2022",                     // ⚠️ GANTI
    category: "Design System",                         // ⚠️ GANTI
    tags: ["Figma", "Storybook", "React"],             // ⚠️ GANTI
    coverImage: "assets/images/work/w5-cover.jpg",     // ⚠️ GANTI
    images: [
      "assets/images/work/w5-detail-1.jpg",
    ],
    _placeholderColor: "#2a1e3a",
    _placeholderIcon: "🧩",
  },
  {
    id: "w6",
    title: "Healthcare Dashboard",                     // ⚠️ GANTI
    description: "Antarmuka manajemen pasien untuk klinik, dirancang dengan prioritas aksesibilitas dan kecepatan akses informasi kritis.", // ⚠️ GANTI
    role: "UI/UX Designer",                            // ⚠️ GANTI
    period: "Apr 2022 – Jul 2022",                     // ⚠️ GANTI
    category: "UI/UX Design",                          // ⚠️ GANTI
    tags: ["Figma", "Accessibility", "Healthcare UX"], // ⚠️ GANTI
    coverImage: "assets/images/work/w6-cover.jpg",     // ⚠️ GANTI
    images: [
      "assets/images/work/w6-detail-1.jpg",
    ],
    _placeholderColor: "#1a3a2e",
    _placeholderIcon: "🏥",
  },
];

// ----------------------------------------------------------------
// DATA PERSONAL — Proyek pribadi (gambar, video, kode)
// ----------------------------------------------------------------
// Tipe konten yang tersedia:
//   "image"   → Menampilkan satu atau lebih gambar
//   "video"   → Menampilkan video dengan thumbnail & kontrol
//   "code"    → Menampilkan cuplikan kode (landing page / portofolio)
// ----------------------------------------------------------------
const personalProjects = [
  {
    id: "p1",
    title: "NightOwl — Productivity App",              // ⚠️ GANTI
    description: "Aplikasi manajemen tugas dengan tema dark mode yang menggabungkan Pomodoro timer dan sesi fokus mendalam. Dibangun sepenuhnya sebagai proyek sampingan.", // ⚠️ GANTI
    contentType: "image",                              // "image" | "video" | "code"
    category: "App Design",                           // ⚠️ GANTI
    technologies: ["React", "TypeScript", "Supabase", "Tailwind CSS"], // ⚠️ GANTI
    coverImage: "assets/images/personal/p1-cover.jpg", // ⚠️ GANTI
    images: [
      "assets/images/personal/p1-detail-1.jpg",
      "assets/images/personal/p1-detail-2.jpg",
    ],
    demoUrl: "https://nightowl-app.vercel.app",       // ⚠️ GANTI (opsional)
    repoUrl: "https://github.com/username/nightowl",  // ⚠️ GANTI (opsional)
    _placeholderColor: "#0d1117",
    _placeholderIcon: "🦉",
  },
  {
    id: "p2",
    title: "CSS Animation Showcase",                  // ⚠️ GANTI
    description: "Koleksi eksperimen animasi CSS murni—tanpa JavaScript—yang mencakup particle effects, morphing shapes, dan generative art.", // ⚠️ GANTI
    contentType: "video",                             // ⚠️ Tipe: video
    category: "Creative Coding",                      // ⚠️ GANTI
    technologies: ["CSS", "HTML", "SVG"],             // ⚠️ GANTI
    coverImage: "assets/images/personal/p2-cover.jpg", // ⚠️ GANTI (thumbnail video)
    videoSrc: "assets/videos/p2-demo.mp4",            // ⚠️ GANTI — path video
    videoPoster: "assets/images/personal/p2-cover.jpg", // ⚠️ GANTI — poster frame
    demoUrl: "https://css-experiments.netlify.app",   // ⚠️ GANTI (opsional)
    repoUrl: "https://github.com/username/css-experiments", // ⚠️ GANTI (opsional)
    _placeholderColor: "#1a0d2e",
    _placeholderIcon: "✨",
  },
  {
    id: "p3",
    title: "SolarFlare Landing Page",                 // ⚠️ GANTI
    description: "Landing page untuk produk fiksi dengan desain bold dan ekspresif. Dibuat sebagai studi kasus teknik scroll-driven animation.", // ⚠️ GANTI
    contentType: "code",                              // ⚠️ Tipe: cuplikan kode landing page
    codeSubtype: "landing-page",                      // "landing-page" atau "portfolio"
    category: "Web Development",                      // ⚠️ GANTI
    technologies: ["HTML", "CSS", "JavaScript", "GSAP"], // ⚠️ GANTI
    coverImage: "assets/images/personal/p3-cover.jpg", // ⚠️ GANTI
    codeSnippet: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>SolarFlare — Power Your World</title>
  <style>
    /* ⚠️ GANTI dengan kode CSS halaman Anda */
    :root {
      --primary: #ff6b35;
      --bg: #0a0a0a;
      --text: #f5f5f5;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
    }
    .hero {
      height: 100vh;
      display: grid;
      place-items: center;
      background: radial-gradient(ellipse at center,
        rgba(255,107,53,0.15) 0%, transparent 70%);
    }
    .hero h1 {
      font-size: clamp(3rem, 10vw, 8rem);
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, #ff6b35, #ffd700);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: fadeUp 1s ease both;
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(40px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  </style>
</head>
<body>
  <section class="hero">
    <h1>Solar<br>Flare</h1>
  </section>
</body>
</html>`,                                             // ⚠️ GANTI dengan kode asli Anda
    demoUrl: "https://solarflare.netlify.app",        // ⚠️ GANTI (opsional)
    repoUrl: "https://github.com/username/solarflare", // ⚠️ GANTI (opsional)
    _placeholderColor: "#1a0a00",
    _placeholderIcon: "☀️",
  },
  {
    id: "p4",
    title: "Portfolio v1 — Minimal",                  // ⚠️ GANTI
    description: "Versi pertama website portofolio saya. Dibangun dengan filosofi 'less is more' — tipografi besar, animasi minimal, performa maksimal.", // ⚠️ GANTI
    contentType: "code",                              // ⚠️ Tipe: cuplikan kode portofolio
    codeSubtype: "portfolio",                         // "landing-page" atau "portfolio"
    category: "Web Development",                      // ⚠️ GANTI
    technologies: ["Next.js", "CSS Modules", "Framer Motion"], // ⚠️ GANTI
    coverImage: "assets/images/personal/p4-cover.jpg", // ⚠️ GANTI
    codeSnippet: `// ⚠️ GANTI dengan cuplikan kode portofolio Anda
// Contoh: komponen Hero dari Next.js portfolio

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <motion.section
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
      >
        Hello, I'm{' '}
        <span className="highlight">Your Name</span>
      </motion.h1>

      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        Frontend Developer & Visual Designer
      </motion.p>
    </motion.section>
  );
}`,
    demoUrl: "#",                                     // ⚠️ GANTI (opsional)
    repoUrl: "https://github.com/username/portfolio-v1", // ⚠️ GANTI (opsional)
    _placeholderColor: "#0d1a2e",
    _placeholderIcon: "💼",
  },
  {
    id: "p5",
    title: "Generative Poster Art",                   // ⚠️ GANTI
    description: "Seri poster digital yang dibuat secara generatif menggunakan algoritma noise dan sistem partikel. Setiap render menghasilkan komposisi yang unik.", // ⚠️ GANTI
    contentType: "image",                             // ⚠️ Tipe: gambar
    category: "Creative Coding",                      // ⚠️ GANTI
    technologies: ["p5.js", "Canvas API", "JavaScript"], // ⚠️ GANTI
    coverImage: "assets/images/personal/p5-cover.jpg", // ⚠️ GANTI
    images: [
      "assets/images/personal/p5-detail-1.jpg",
      "assets/images/personal/p5-detail-2.jpg",
      "assets/images/personal/p5-detail-3.jpg",
    ],
    demoUrl: "https://generative-posters.vercel.app", // ⚠️ GANTI (opsional)
    repoUrl: "https://github.com/username/gen-art",   // ⚠️ GANTI (opsional)
    _placeholderColor: "#0d2e1a",
    _placeholderIcon: "🖼️",
  },
  {
    id: "p6",
    title: "Motion Design Reel 2024",                 // ⚠️ GANTI
    description: "Kompilasi proyek motion graphic dan animasi UI selama tahun 2024. Mencakup micro-interaction, explainer video, dan transisi UI.", // ⚠️ GANTI
    contentType: "video",                             // ⚠️ Tipe: video
    category: "Motion Design",                        // ⚠️ GANTI
    technologies: ["After Effects", "Lottie", "Principle"], // ⚠️ GANTI
    coverImage: "assets/images/personal/p6-cover.jpg", // ⚠️ GANTI (thumbnail)
    videoSrc: "assets/videos/p6-reel.mp4",            // ⚠️ GANTI — path video
    videoPoster: "assets/images/personal/p6-cover.jpg", // ⚠️ GANTI
    demoUrl: "",                                      // kosongkan jika tidak ada
    repoUrl: "",                                      // kosongkan jika tidak ada
    _placeholderColor: "#2e1a0d",
    _placeholderIcon: "🎬",
  },
];

// ----------------------------------------------------------------
// EXPORT — Jangan ubah bagian ini
// ----------------------------------------------------------------
export { ownerInfo, workProjects, personalProjects };

