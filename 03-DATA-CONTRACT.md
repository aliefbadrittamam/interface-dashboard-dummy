# Data Contract — Struktur Data Dummy untuk Handoff ke Backend

Tujuan dokumen ini: supaya teman yang mengerjakan Firebase/MQTT/backend tahu persis **bentuk data** yang dipakai dashboard, sehingga dia tinggal mengganti "sumber data" tanpa perlu mengubah struktur HTML/JS tampilan.

Aturan utama saat vibe coding: **semua nilai dummy di-generate dan diakses lewat satu objek state terpusat di `script.js`** (misal `let state = {...}`), bukan ditulis tersebar langsung di HTML. Fungsi render terpisah dari fungsi pengubah data. Dengan begini, teman backend tinggal mengganti bagian "pengubah data" (yang asalnya `setInterval` simulasi) dengan listener Firebase/MQTT, lalu memanggil fungsi render yang sama.

## 1. Struktur State (acuan, boleh disesuaikan minor saat coding)

```js
const state = {
  serverStatus: "online", // "online" | "offline"

  node1_door: {
    status: "locked", // "locked" | "unlocked"
    lastScan: {
      cardId: "83A12F9B",
      name: "Suka Astawa",
      accessGranted: true,
      timestamp: "16:28:44"
    }
  },

  node2_safety: {
    gasPPM: 245,            // angka, ambang bahaya >= 300
    gasStatus: "safe",      // "safe" | "danger" — diturunkan dari gasPPM
    motionDetected: false   // true saat PIR mendeteksi gerak
  },

  node3_control: {
    livingRoomLight: false, // true = ON
    porchLight: false,
    alarm: {
      active: false,        // true saat alarm berbunyi
      muted: false
    }
  },

  activityLog: [
    // entri terbaru ditambahkan ke depan (unshift), index 0 = paling baru
    { time: "16:30:15", node: "Node 2", message: "PERINGATAN! Kadar gas meningkat (350 PPM). Alarm Aktif!" },
    { time: "16:28:49", node: "Node 1", message: "Pintu otomatis terkunci kembali." },
    { time: "16:28:44", node: "Node 1", message: "RFID ID 83A12F9B - Akses Diterima. Servo membuka pintu." }
  ]
};
```

## 2. Pemetaan ke Elemen Tampilan

| Field state | Elemen UI |
|---|---|
| `state.serverStatus` | Badge ONLINE/OFFLINE di header |
| `state.node1_door.status` | Indikator gembok terkunci/terbuka di Card 1 |
| `state.node1_door.lastScan.*` | Baris terbaru di mini-log RFID Card 1 |
| `state.node2_safety.gasPPM` | Angka besar + bar gauge di Card 2 |
| `state.node2_safety.gasStatus` | Warna & label status (AMAN/BAHAYA) Card 2 |
| `state.node2_safety.motionDetected` | Indikator status PIR Card 2 |
| `state.node3_control.livingRoomLight` | Posisi toggle switch lampu ruang tamu |
| `state.node3_control.porchLight` | Posisi toggle switch lampu teras |
| `state.node3_control.alarm.active` | Status `ALARM BERBUNYI` / `ALARM MATI` |
| `state.activityLog` | Daftar baris di kotak Log Aktivitas Global |

## 3. Mekanisme Simulasi (Hanya untuk Tahap Frontend Ini)

- `setInterval` setiap 6-8 detik: `gasPPM` berubah acak ringan dalam rentang 200–450, lalu fungsi `evaluateGasStatus()` menentukan ulang `gasStatus` dan menambah entri log bila status berubah (dari aman → bahaya atau sebaliknya)
- `setInterval` terpisah, lebih jarang (misal tiap 15-20 detik): `motionDetected` punya kemungkinan kecil berubah true sebentar lalu kembali false, sambil menambah entri log
- Tombol "Bypass" Node 1: mengubah `node1_door.status` jadi `"unlocked"`, tambah entri log, lalu setelah beberapa detik otomatis kembali `"locked"` (meniru servo menutup lagi)
- Toggle lampu & tombol mute alarm: murni mengubah field terkait di state + tambah entri log, tanpa efek otomatis lain

## 4. Catatan Penting untuk Teman Backend (ditulis sebagai komentar di kode juga)

```js
// =========================================================
// HANDOFF NOTE UNTUK BACKEND:
// Semua data di atas saat ini di-generate oleh fungsi simulasi
// (lihat fungsi simulateGasReading(), simulateMotion(), dst).
// Untuk menyambungkan ke Firebase/MQTT sungguhan:
// 1. Hapus/nonaktifkan setInterval simulasi terkait
// 2. Pasang listener (misal onValue() dari Firebase SDK) yang
//    meng-update field state yang sesuai dengan tabel di atas
// 3. Setelah update state, panggil ulang fungsi render terkait
//    (renderNode1(), renderNode2(), renderNode3(), renderLog())
// Struktur field JANGAN diubah namanya tanpa koordinasi,
// karena tampilan bergantung pada nama field ini.
// =========================================================
```

## 5. Yang TIDAK Perlu Dipikirkan Backend dari Sisi Tampilan
- Styling/CSS — sudah final dari sisi frontend, backend tidak perlu sentuh `style.css`
- Animasi pulse/transisi warna — sudah otomatis mengikuti perubahan field status, asal field `gasStatus`/`alarm.active`/dll di-update dengan benar
