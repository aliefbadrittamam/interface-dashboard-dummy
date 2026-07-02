# README — Paket Dokumen Vibe Coding: Smart Home Dashboard (Frontend)

Folder ini berisi dokumen kebutuhan untuk membangun **tampilan/interface** dashboard Smart Home System (3 node IoT) memakai HTML, CSS, dan JavaScript murni, tanpa backend sungguhan. Dibuat untuk dipakai sebagai acuan/prompt saat melakukan vibe coding dengan AI assistant.

## Urutan Baca

1. **`01-PRD.md`** — Apa yang dibangun, kenapa, fitur apa saja, dan batasan scope (out of scope). Baca ini dulu untuk gambaran besar.
2. **`02-DESIGN-BRIEF.md`** — Arahan visual spesifik supaya hasil tidak terlihat seperti template AI generik (gradient ungu-pink, radius besar, dsb). **Selalu sertakan dokumen ini setiap prompt ke AI saat minta buat/revisi tampilan.**
3. **`03-DATA-CONTRACT.md`** — Struktur data dummy yang dipakai, supaya nanti gampang di-handoff ke teman yang mengerjakan koneksi database/backend.
4. **`04-COMPONENT-CHECKLIST.md`** — Checklist teknis konkret: struktur file, urutan eksekusi build, daftar elemen & fungsi JS yang harus ada, serta kriteria "selesai".
5. **`05-GOOGLE-STITCH-PROMPT.md`** — Prompt siap pakai untuk Google Stitch, supaya bisa generate referensi desain visual (mockup) dalam satu kali prompt sebelum masuk ke tahap coding sungguhan.

## Alur Kerja yang Disarankan

1. (Opsional tapi direkomendasikan) Pakai `05-GOOGLE-STITCH-PROMPT.md` dulu untuk generate referensi visual lewat Google Stitch, supaya punya gambaran konkret sebelum coding.
2. Pakai `01-PRD.md` s.d. `04-COMPONENT-CHECKLIST.md` sebagai acuan saat vibe coding membangun `index.html`, `style.css`, `script.js` yang sebenarnya (di Claude atau AI coding assistant lain).
3. Bandingkan hasil coding dengan referensi visual dari Stitch (langkah 1) dan checklist anti-AI-slop di `02-DESIGN-BRIEF.md` untuk revisi terakhir.

## Cara Pakai untuk Vibe Coding

Saat meminta AI assistant membuat file `index.html`, `style.css`, `script.js`, lampirkan ringkasan dari keempat dokumen ini (atau upload langsung filenya) dalam satu prompt awal, contoh:

> "Buatkan index.html, style.css, dan script.js untuk dashboard Smart Home sesuai PRD, Design Brief, dan Data Contract yang saya lampirkan. Ikuti checklist komponen di dokumen 04."

Untuk revisi tampilan supaya tidak terlihat AI-generik, cukup rujuk balik ke `02-DESIGN-BRIEF.md` bagian checklist.

## Pembagian Tugas Kelompok

- **Frontend (saya)**: index.html, style.css, script.js dengan data dummy — sesuai 4 dokumen ini.
- **Backend/IoT (teman)**: mengganti mekanisme simulasi di script.js dengan koneksi Firebase/MQTT sungguhan, mengikuti struktur field yang sudah didefinisikan di `03-DATA-CONTRACT.md` agar tidak perlu bongkar ulang tampilan.
