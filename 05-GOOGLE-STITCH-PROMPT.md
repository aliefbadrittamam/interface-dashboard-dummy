# Google Stitch Prompt — Smart Home Integrated System Dashboard

Dokumen ini berisi prompt siap pakai untuk **Google Stitch** (tool generate UI design dari Google) supaya bisa menghasilkan seluruh tampilan dashboard dalam satu kali generate. Tinggal copy-paste isi di bagian "PROMPT UTAMA" ke Stitch.

---

## Cara Pakai

1. Buka Google Stitch, pilih mode **Web App** (bukan mobile), pilih ukuran/orientasi desktop.
2. Copy seluruh isi blok **PROMPT UTAMA** di bawah, paste ke kolom prompt Stitch.
3. Kalau Stitch menyediakan opsi jumlah variasi/screen, pilih untuk generate sebagai **1 single page** (karena ini single-page dashboard, bukan multi-page app) — atau lihat bagian "Jika Stitch Memecah Jadi Beberapa Page" di bawah.
4. Setelah hasil keluar, gunakan bagian **PROMPT LANJUTAN (Refinement)** di bawah untuk iterasi kalau hasil pertama masih terasa generik/AI slop.

---

## PROMPT UTAMA (copy-paste ini)

```
Design a single-page web dashboard called "SMART HOME INTEGRATED SYSTEM" for an IoT home monitoring system with 3 hardware nodes. This is for a university IoT trainer-kit project demo, styled like an industrial control-room monitoring panel — NOT a playful consumer smart-home app.

STYLE DIRECTION (strict):
- Dark mode UI. Base background should be a deep charcoal-blue, not pure black (#14171c style), with card surfaces one step lighter (#1c2028 style).
- Avoid purple-to-pink or purple-to-blue gradients entirely. Avoid neon green/red. Use a muted, slightly desaturated status palette: soft green for "safe/ok", soft red for "danger/alert", amber for "warning".
- Small consistent border-radius (6-8px), not large rounded corners everywhere. Use thin 1px borders to separate sections instead of heavy drop shadows.
- Typography: a clean technical sans-serif for labels/titles (Space Grotesk or IBM Plex Sans style), and a monospace font (JetBrains Mono or IBM Plex Mono style) for all numeric data, timestamps, and IDs to give a technical/data-driven feel.
- Use small colored status dots (●) next to status text labels, like real monitoring dashboards.
- Use simple line-art / stroke-based icons (not flat filled icons, not emoji) for lock, gas/smoke, motion, lightbulb, alarm bell.
- Status badges and danger states should look calm but clear — subtle pulse glow only on active danger indicators, not flashing the whole card.

LAYOUT — single page, 3-column grid on desktop, stacking to 1 column on mobile:

HEADER (top bar, full width):
- Left: title "SMART HOME INTEGRATED SYSTEM" with small subtitle "KELOMPOK X" below it
- Right: a server connection status badge showing "ONLINE" with green dot, and a live clock + date display in monospace font

MAIN CONTENT — 3 cards side by side:

CARD 1 — "Node 1 — Pintu Utama" (Smart Door Lock):
- Large lock icon and large status text, two states to show: "TERKUNCI / SECURED" (red) and "TERBUKA / ACCESS GRANTED" (green)
- A small mini activity log list inside the card showing last 3 RFID scans, each line with monospace timestamp, card ID, and access granted/denied label
- A secondary button at the bottom labeled "Bypass / Buka Manual"

CARD 2 — "Node 2 — Dapur & Keamanan" (Safety & Security):
- A large monospace number showing gas level in PPM (example: 245 PPM) with a horizontal bar gauge below it showing the level visually, colored green when safe and red when above threshold
- A status label "AMAN" in green below the gauge
- Below that, a separate motion sensor (PIR) status row with icon and label "Aman (Tidak Ada Pergerakan)" in green, and an alternate red state "Terdeteksi Pergerakan" to also depict
- Make this card slightly larger or visually emphasized compared to the other two, since safety is the priority focus

CARD 3 — "Node 3 — Pusat Kontrol" (Control Center):
- Two toggle switches in classic pill-with-knob style, labeled "Lampu Ruang Tamu" and "Lampu Teras", one ON one OFF to show both states
- An alarm/buzzer status section with bell icon, showing "ALARM MATI" (calm gray/green state) 
- A button labeled "Mute / Reset Alarm"

FOOTER — full width section below the 3 cards:
- Title "Log Aktivitas Global" or "System Activity Log"
- A scrollable log panel showing 5-6 log lines, each with monospace timestamp on the left, a small "Node X" tag, and a description, e.g. "[16:28:44] Node 1: RFID ID 83A12F9B - Akses Diterima. Servo membuka pintu." — vary the content across normal events and one warning-colored line (e.g. a gas warning line shown in amber/red text)

Overall feel: technical, trustworthy, calm-but-alert monitoring panel — like something a security engineer would actually use, not a glossy marketing app screenshot.
```

---

## Jika Stitch Memecah Jadi Beberapa Page

Stitch kadang otomatis memecah hasil jadi beberapa screen/page meskipun diminta single page. Kalau itu terjadi, gunakan strategi ini supaya tetap "satu prompt, semua kebutuhan tercakup":

Tambahkan baris berikut di **akhir** prompt utama sebelum generate:

```
Generate this as ONE single scrollable page only. Do not split into multiple separate screens/pages. All 3 node cards and the header and footer log must exist within the same single page layout, arranged as described above.
```

Jika Stitch tetap menghasilkan beberapa varian/page secara otomatis (ini kadang terjadi karena tool-nya memang dirancang multi-screen), pilih saja hasil yang paling mendekati deskripsi "single page dashboard" di atas sebagai acuan utama, lalu gunakan elemen-elemen dari page lain (kalau ada bagian bagus) sebagai referensi tambahan saat coding manual nanti — bukan untuk dipakai apa adanya.

---

## PROMPT LANJUTAN (Refinement) — pakai kalau hasil pertama masih terasa generik

Jika hasil generate masih terasa seperti template AI biasa (gradient ungu-pink, radius besar semua, dsb), masukkan prompt revisi ini:

```
Revise this design: remove any purple/pink gradients completely. Make corner radius smaller and more consistent (6-8px max), not large rounded corners. Replace any bright neon green/red with muted, slightly desaturated tones. Reduce drop shadows — use thin 1px borders between sections instead. Make the gas PPM number and all timestamps use a monospace font. Make Card 2 (Dapur & Keamanan) slightly more visually prominent than Card 1 and Card 3 to reflect its safety priority.
```

---

## Catatan Penting

- Hasil dari Google Stitch adalah **referensi visual/desain**, bukan kode final yang langsung dipakai. Untuk implementasi sungguhan (HTML/CSS/JS murni sesuai pembagian tugas kelompok), tetap gunakan dokumen `01-PRD.md`, `02-DESIGN-BRIEF.md`, `03-DATA-CONTRACT.md`, dan `04-COMPONENT-CHECKLIST.md` sebagai acuan saat vibe coding ke Claude/AI assistant lain.
- Kalau Stitch menyediakan ekspor ke kode (HTML/CSS) langsung, boleh dipakai sebagai starting point, tapi tetap perlu disesuaikan strukturnya (id/class elemen) supaya cocok dengan struktur di `03-DATA-CONTRACT.md`, supaya gampang di-handoff ke teman backend.
