# PRD — Smart Home Integrated System Dashboard (Frontend Only)

## 1. Latar Belakang & Konteks Tugas

Proyek ini adalah tugas akhir (UAS) berbasis IoT trainer kit dengan 3 node:

- **Node 1** — Pintu Utama (Smart Door Lock, RFID + Servo)
- **Node 2** — Area Dapur & Ruang Tengah (Sensor Gas MQ-2 + PIR Motion)
- **Node 3** — Pusat Kontrol (Relay lampu + Buzzer alarm)

Pembagian kerja kelompok:

- **Saya (frontend)** → bertanggung jawab membuat **tampilan/interface dashboard** (HTML, CSS, JS) lengkap dengan data dummy/statis agar tampilan bisa didemokan tanpa backend.
- **Teman satu kelompok (backend/IoT)** → akan menyambungkan interface ini ke database realtime (kemungkinan Firebase Realtime Database / MQTT) dan logic hardware.

**Scope dokumen ini HANYA untuk bagian frontend/interface.** Tidak ada koneksi database, tidak ada server, tidak ada autentikasi sungguhan. Semua data di tahap ini adalah dummy/simulasi agar interaksi terlihat hidup saat demo, tapi terstruktur rapi supaya gampang di-hook ke data asli nantinya.

## 2. Tujuan Produk

1. Menyediakan satu halaman dashboard (*single page*) yang menampilkan status real-time (simulasi) dari 3 node IoT.
2. Tampilan harus mudah dibaca dalam satu layar monitor saat demo (tidak perlu scroll berlebihan di layar besar).
3. Desain terlihat seperti dashboard monitoring sungguhan yang dipakai di industri kecil/rumah pintar — bukan template AI generik yang terlalu "rapi sempurna" dan mengkilap.
4. Struktur kode (HTML/CSS/JS) rapi dan modular, supaya teman saya tinggal mengganti sumber data dummy dengan data dari Firebase/MQTT tanpa bongkar ulang seluruh tampilan.

## 3. Target Pengguna Dashboard

- **Pemilik rumah** (user awam) — perlu tahu sekilas: pintu aman?, ada bahaya gas/asap?, lampu nyala?
- **Dosen penguji saat demo UAS** — perlu melihat alur data & log berjalan dengan jelas dan meyakinkan.

## 4. Fitur (Functional Requirements)

### 4.1 Header
- Judul sistem: `SMART HOME INTEGRATED SYSTEM`
- Sub-label kelompok (placeholder, bisa diganti nama kelompok asli)
- Indikator status koneksi server: `ONLINE` (hijau) / `OFFLINE` (merah) — untuk tahap ini, statusnya bisa di-toggle manual lewat variabel JS (simulasi), karena belum ada server sungguhan
- Jam & tanggal real-time (pakai `Date()` JS asli, bukan dummy — ini satu-satunya bagian yang valid real-time tanpa backend)

### 4.2 Card Node 1 — Pintu Utama (Smart Door Lock)
- Indikator status pintu: `TERBUKA / ACCESS GRANTED` (hijau) atau `TERKUNCI / SECURED` (merah)
- Log RFID terakhir (list pendek, 3-5 entri terbaru): waktu, Card ID, status diterima/ditolak
- Tombol "Bypass / Buka Manual" — saat diklik, tampilan status berubah ke TERBUKA dan menambahkan entri baru ke log (simulasi lokal, belum kirim ke server)

### 4.3 Card Node 2 — Dapur & Keamanan
- Gauge/angka level gas LPG (PPM atau %) dengan ambang batas:
  - < 300 PPM → `AMAN` (hijau)
  - ≥ 300 PPM → `BAHAYA! KEBOCORAN GAS` (merah, berkedip/pulse)
- Status sensor gerak (PIR): `Aman` (hijau) / `Terdeteksi Pergerakan` (merah)
- Nilai-nilai ini di tahap dummy bisa diacak ringan secara berkala (misal tiap 5-8 detik) agar terlihat "hidup" saat demo, dengan batas wajar (200–450 PPM) — bukan random ekstrem yang tidak masuk akal

### 4.4 Card Node 3 — Pusat Kontrol
- Toggle switch lampu Ruang Tamu (ON/OFF)
- Toggle switch lampu Teras (ON/OFF)
- Status alarm buzzer: `ALARM MATI` / `ALARM BERBUNYI`
- Tombol `MUTE / RESET ALARM`

### 4.5 Log Aktivitas Global (Footer)
- Kotak log scrollable, urut dari terbaru di atas (atau terbawah — lihat keputusan desain di bagian 6)
- Setiap aksi user (klik tombol bypass, toggle lampu, mute alarm) maupun event simulasi (gas naik, PIR mendeteksi) otomatis menambahkan baris baru ke log
- Format: `[HH:MM:SS] Node X: <deskripsi event>`

## 5. Non-Functional Requirements

- **Responsif**: layout 3-kolom di desktop, menjadi 1 kolom (stack) di mobile/tablet kecil
- **Tanpa dependency backend**: murni HTML + CSS + Vanilla JS (tidak perlu framework, tidak perlu build step, supaya gampang di-pass ke teman)
- **Tidak ada library eksternal berat** — kalau perlu ikon, pakai SVG inline atau emoji/unicode sederhana, hindari font icon CDN yang bisa gagal load saat offline demo
- **File terpisah rapi**: `index.html`, `style.css`, `script.js` (jangan inline semua jadi satu file, supaya gampang dibagi tugas/dipahami teman)
- **Komentar kode jelas** di bagian-bagian yang nantinya akan diganti teman dengan data real (lihat dokumen `03-DATA-CONTRACT.md`)
- **Desain tidak boleh terlihat "AI generik"**: hindari gradient ungu-biru pasaran, hindari card dengan shadow berlebihan & rounded-corner ekstrem di semua elemen, hindari font generik (Poppins/Inter doang tanpa karakter). Lihat detail lengkap di `02-DESIGN-BRIEF.md`.

## 6. Keputusan Desain yang Perlu Difinalkan Sebelum Coding

- Urutan log: terbaru di **atas** (lebih umum untuk dashboard monitoring) atau di **bawah** (seperti terminal log)?
- Tema warna: Dark mode (sesuai rekomendasi awal — cocok untuk dashboard monitoring) atau Light clean?
- Apakah gauge gas LPG ditampilkan sebagai angka besar + bar horizontal, atau sebagai gauge melingkar (circular gauge)? Circular gauge lebih "wow" tapi butuh sedikit lebih banyak SVG/JS.

> Default rekomendasi: **Dark mode**, log terbaru di atas, gas pakai bar horizontal + angka besar (lebih simpel, tetap meyakinkan, tidak butuh SVG rumit).

## 7. Out of Scope (Tegas, untuk Hindari Scope Creep)

- Tidak ada login/autentikasi
- Tidak ada koneksi Firebase/MQTT/WebSocket sungguhan (itu bagian teman)
- Tidak ada penyimpanan data permanen (localStorage TIDAK dipakai karena akan hilang konteksnya saat di-handoff ke sistem database asli — semua state cukup di variabel JS in-memory)
- Tidak ada multi-halaman/multi-room kompleks — fokus 3 node sesuai trainer kit
- Tidak ada PWA, tidak ada notifikasi push browser

## 8. Deliverable

1. `index.html` — struktur halaman
2. `style.css` — seluruh styling
3. `script.js` — logic interaksi & simulasi data dummy
4. Dokumen ini + `02-DESIGN-BRIEF.md` + `03-DATA-CONTRACT.md` + `04-COMPONENT-CHECKLIST.md` sebagai panduan saat vibe coding & saat handoff ke teman backend
