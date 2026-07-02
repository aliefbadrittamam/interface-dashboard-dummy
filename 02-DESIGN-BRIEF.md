# Design Brief — Anti "AI Slop" untuk Dashboard Smart Home

Dokumen ini khusus untuk mengarahkan AI coding assistant (Claude/dkk) saat proses vibe coding, supaya hasil desain tidak terlihat seperti template generik AI yang itu-itu saja. Tempel/lampirkan dokumen ini setiap kali meminta AI membuat atau merevisi tampilan.

## 1. Masalah Umum "AI Slop" yang Harus Dihindari

- Gradient ungu-ke-biru atau ungu-ke-pink di background/tombol (`#667eea` → `#764ba2` dan variannya) — ini ciri khas paling gampang dikenali sebagai output AI generik
- Card dengan `border-radius` besar di semua sisi (20-24px) + `box-shadow` lembut besar di SEMUA elemen tanpa kecuali
- Font default `Inter`/`Poppins` tanpa pertimbangan, dipakai polos tanpa hierarki ukuran yang jelas
- Emoji dipakai berlebihan sebagai pengganti ikon di hampir semua label (🔥🚀✨)
- Layout yang terlalu simetris & "aman" — semua card ukuran sama persis, spacing seragam tanpa ada elemen yang jadi fokus utama
- Warna status yang terlalu "cerah mentah" (`#00ff00` hijau neon, `#ff0000` merah neon) tanpa nuansa

## 2. Arahan Desain yang Dipakai

### 2.1 Mood & Referensi
Dashboard ini meniru nuansa **panel monitoring industrial/control room** — bukan aplikasi consumer app yang playful. Bayangkan tampilan seperti dashboard monitoring server (mis. Grafana, panel kontrol pabrik, atau sistem alarm gedung), bukan aplikasi smart-home consumer yang imut.

### 2.2 Palet Warna (Dark Mode)
Gunakan warna dasar gelap yang punya sedikit temperatur (jangan hitam pekat `#000000` polos, jangan abu-abu netral generik):

- Background utama: `#14171c` (charcoal kebiruan gelap, bukan hitam pekat)
- Background card: `#1c2028` atau `#1d2127` (sedikit lebih terang dari base, beda 1-2 step saja)
- Border halus antar elemen: `#2a2f38` (jangan pakai box-shadow besar untuk pemisah, pakai border tipis 1px)
- Teks utama: `#e8e9ec` (bukan putih murni `#ffffff`)
- Teks sekunder/label: `#8b919c`
- Hijau status aman: `#3ecf6a` atau `#4ade80` dengan sedikit redup, jangan neon
- Merah status bahaya: `#ef4444` dengan varian redup `#dc2626` untuk teks, neon-pulse hanya untuk elemen yang benar-benar kondisi bahaya aktif
- Kuning/amber untuk status warning/transisi: `#f59e0b`
- Aksen non-status (misal untuk elemen interaktif netral seperti toggle): satu warna aksen saja, sarankan **teal/cyan redup** `#22d3c7` atau **amber** — pilih satu, jangan campur banyak warna aksen sekaligus

### 2.3 Tipografi
- Gunakan font monospace untuk angka/data teknis (PPM gas, jam, Card ID, log) — kesan "data sungguhan", contoh: `'JetBrains Mono'`, `'IBM Plex Mono'`, atau fallback sistem `ui-monospace, 'SF Mono', Consolas, monospace`
- Gunakan font sans-serif yang punya karakter (bukan default Inter/Poppins polos) untuk judul & label, contoh: `'IBM Plex Sans'`, `'Space Grotesk'`, atau kalau ingin aman tanpa load Google Fonts saat demo offline, pakai system font stack: `-apple-system, 'Segoe UI', Roboto, sans-serif`
- Buat hierarki ukuran tegas: Judul header (20-24px bold), Label card (12-13px uppercase letter-spacing, warna sekunder), Angka besar/status utama (28-36px, font monospace bold)

### 2.4 Bentuk & Spacing
- `border-radius` kecil dan konsisten: 6-8px untuk card, 4px untuk badge/tombol kecil — JANGAN pakai radius besar (20px+) di semua tempat
- Border 1px solid sebagai pemisah utama antar section, bukan shadow tebal
- Boleh ada SATU elemen yang sengaja dibuat sedikit asimetris atau jadi fokus (misal Card Node 2 dengan gauge gas sedikit lebih besar dari card lain), supaya layout tidak terasa terlalu "rapi sempurna ala template"
- Spacing antar card: gunakan grid dengan gap konsisten (16-20px), tapi padding internal card boleh sedikit lebih lega di bagian yang berisi data utama

### 2.5 Ikon
- Hindari emoji berlebihan sebagai ikon utama UI (boleh dipakai sangat minim, misal 1 simbol gembok untuk status pintu)
- Lebih disarankan pakai SVG inline simpel (garis/stroke, bukan filled flat icon generik) untuk: gembok, gas/asap, gerak/motion, lampu, alarm/bell
- Style ikon: stroke-based, line-art sederhana, konsisten stroke-width (1.5-2px), warna mengikuti status (hijau/merah/abu netral)

### 2.6 Interaksi & Micro-detail
- Transisi state (warna berubah dari hijau ke merah saat bahaya) pakai `transition` CSS halus (200-300ms), bukan instan kasar
- Untuk status bahaya aktif (gas bocor, alarm), beri animasi pulse halus di border atau dot indikator — bukan seluruh card berkedip terang menyilaukan
- Tombol toggle (lampu) pakai bentuk switch klasik (pill shape kecil dengan knob bulat), bukan tombol kotak generik
- Hover state pada tombol: perubahan warna border/background tipis, bukan efek scale/lift dramatis ala marketing landing page

## 3. Hal yang Tetap Boleh/Perlu Ada
- Status indicator dengan dot kecil berwarna (●) di samping teks status — ini pattern umum dashboard monitoring sungguhan, bukan AI slop
- Monospace timestamp di log — wajar dan menambah kesan teknis
- Grid layout 3 kolom yang rapi untuk 3 node — ini sesuai kebutuhan fungsional, bukan masalah, asal detail visual di dalamnya mengikuti arahan di atas

## 4. Checklist Cepat Sebelum Final
- [ ] Tidak ada gradient ungu-pink di mana pun
- [ ] Warna hijau/merah tidak neon mentah
- [ ] Border-radius kecil & konsisten, tidak semua 20px+
- [ ] Ada penggunaan font monospace untuk data teknis
- [ ] Tidak ada emoji bertebaran sebagai pengganti ikon
- [ ] Ada minimal satu detail visual yang membuat layout tidak terasa "template seragam"
- [ ] Status bahaya pakai animasi pulse halus, bukan kedip kasar
