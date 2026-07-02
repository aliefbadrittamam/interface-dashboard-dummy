# Component Checklist & Struktur File — Panduan Eksekusi Vibe Coding

Dokumen ini adalah daftar tugas konkret + struktur file, dipakai sebagai "prompt checklist" saat meminta AI coding assistant membangun file sungguhan, atau sebagai checklist self-review setelah AI selesai generate.

## 1. Struktur File Final

```
smart-home-dashboard/
├── index.html
├── style.css
├── script.js
└── README.md          (opsional, catatan singkat cara pakai & handoff)
```

Aturan:
- HTML, CSS, JS terpisah (tidak inline `<style>`/`<script>` besar di HTML, kecuali memang perlu link `<script defer>` di akhir `<body>`)
- Tidak ada folder `assets/` rumit dulu — kalau perlu ikon SVG, taruh inline langsung di HTML/JS, bukan file terpisah, supaya tetap simpel untuk handoff

## 2. Urutan Eksekusi yang Disarankan Saat Vibe Coding

1. **Skeleton HTML dulu** — struktur header, 3 card kosong, footer log, tanpa styling. Pastikan urutan elemen & class/id sudah sesuai data contract (lihat dokumen 03).
2. **CSS layout dasar** — grid 3 kolom, responsive breakpoint, baru warna & detail visual sesuai design brief (dokumen 02).
3. **CSS detail status & komponen kecil** — badge, toggle switch, gauge bar, animasi pulse.
4. **JS: render functions** — fungsi yang membaca `state` lalu update DOM (sesuai data contract dokumen 03).
5. **JS: simulasi data + interval** — baru tambahkan logic acak gas/motion, dan event handler tombol.
6. **JS: jam real-time di header** — `setInterval` 1 detik update elemen waktu.
7. **Review akhir pakai checklist desain (dokumen 02 bagian 4)** — supaya tidak kelolosan jadi AI slop.

## 3. Checklist Elemen HTML (per bagian)

### Header
- [ ] `<h1>` judul sistem
- [ ] Sub-teks nama kelompok (placeholder jelas, mudah diganti)
- [ ] Badge status server (`id="server-status"`)
- [ ] Elemen jam (`id="clock"`) dan tanggal (`id="date"`)

### Card Node 1 — Pintu
- [ ] Container dengan `id="node1"` atau class jelas `card--door`
- [ ] Ikon gembok (SVG inline, berubah sesuai status)
- [ ] Teks status besar (`id="door-status"`)
- [ ] Mini-list log RFID (3-5 entri, `id="rfid-log-list"`)
- [ ] Tombol bypass (`id="btn-bypass"`)

### Card Node 2 — Dapur & Keamanan
- [ ] Container `class="card--safety"`
- [ ] Angka PPM besar + bar horizontal (`id="gas-value"`, `id="gas-bar"`)
- [ ] Label status gas (`id="gas-status-label"`)
- [ ] Indikator PIR (`id="pir-status"`)

### Card Node 3 — Pusat Kontrol
- [ ] Toggle switch lampu ruang tamu (`id="toggle-living"`)
- [ ] Toggle switch lampu teras (`id="toggle-porch"`)
- [ ] Indikator status alarm (`id="alarm-status"`)
- [ ] Tombol mute/reset alarm (`id="btn-mute-alarm"`)

### Footer — Log Aktivitas Global
- [ ] Container scrollable (`id="activity-log"`)
- [ ] Setiap entri log render sebagai elemen baris terpisah (bukan satu blok teks panjang), supaya mudah di-style per baris (misal baris warning dikasih warna beda)

## 4. Checklist JS Functions Minimal

- [ ] `state` object (sesuai dokumen 03)
- [ ] `renderHeader()`
- [ ] `renderNode1()`
- [ ] `renderNode2()`
- [ ] `renderNode3()`
- [ ] `renderLog()`
- [ ] `addLogEntry(node, message)` — helper, otomatis ambil timestamp jam saat ini
- [ ] `evaluateGasStatus(ppm)` — return `"safe"` atau `"danger"`
- [ ] `simulateGasReading()` — dipanggil via `setInterval`
- [ ] `simulateMotion()` — dipanggil via `setInterval` terpisah
- [ ] Event listener tombol bypass, toggle lampu (x2), tombol mute alarm
- [ ] `updateClock()` — `setInterval` 1 detik

## 5. Definition of Done

Tampilan dianggap selesai untuk tahap frontend bila:

1. Bisa dibuka langsung di browser tanpa server (`file://` atau Live Server sederhana), tanpa error console
2. Semua 3 card menampilkan data dummy yang masuk akal dan berubah secara berkala (terlihat "hidup")
3. Tombol-tombol interaktif (bypass, toggle lampu, mute alarm) berfungsi dan tercatat di log aktivitas
4. Responsive: dicoba resize browser ke lebar HP, layout tidak rusak/overflow
5. Lolos checklist desain anti-AI-slop di dokumen 02
6. Kode punya komentar handoff yang jelas sesuai dokumen 03, siap diberikan ke teman backend
