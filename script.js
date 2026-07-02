/**
 * SENTINEL-X — Smart Home Integrated System Dashboard
 * script.js
 *
 * Frontend-only implementation with dummy data simulation.
 * Designed for easy handoff to backend/IoT integration.
 *
 * REF: 03-DATA-CONTRACT.md | 04-COMPONENT-CHECKLIST.md
 */

// ─── STATE (Data Contract — 03-DATA-CONTRACT.md) ───
const state = {
    serverStatus: 'online',

    node1_door: {
        status: 'locked',
        rfidLog: [
            { time: '16:20:12', cardId: '83A12F9B', name: 'Ahmad Rizky', access: true },
            { time: '15:05:44', cardId: '99B22C1A', name: 'Dina Sari', access: true },
            { time: '11:12:05', cardId: 'UNKNOWN', name: 'Unknown', access: false }
        ]
    },

    node2_safety: {
        gasPPM: 245,
        gasStatus: 'safe',
        motionDetected: false
    },

    node3_control: {
        livingRoomLight: true,
        porchLight: false,
        alarm: {
            active: false,
            muted: false
        }
    },

    activityLog: [
        { time: '14:21:05', node: 'Node 3', message: "Lighting 'Lampu Ruang Tamu' turned ON", type: 'info' },
        { time: '14:18:22', node: 'Node 2', message: 'Motion detected in Kitchen (Cleared)', type: 'warn' },
        { time: '14:15:10', node: 'Node 2', message: 'Gas level elevated (245 PPM)', type: 'warn' },
        { time: '14:02:44', node: 'Node 1', message: 'Door secured manually', type: 'ok' },
        { time: '13:45:12', node: 'System', message: 'Routine diagnostic completed', type: 'ok' }
    ]
};

// =========================================================
// HANDOFF NOTE UNTUK BACKEND/IoT INTEGRATION:
// =========================================================
// Bagian ini menjelaskan cara menyambungkan dashboard ini ke
// backend (Firebase/MQTT/REST API) yang dibangun oleh teman Anda.
//
// LANGKAH 1: Hapus Fungsi Simulasi (Dummy Data)
//   - Hapus setInterval() yang memanggil simulateGasReading()
//   - Hapus setInterval() yang memanggil simulateMotion()
//   - Fungsi simulateGasReading() dan simulateMotion() bisa dihapus
//     atau dikomentari saja.
//
// LANGKAH 2: Pasang Listener ke Database/IoT
//   Untuk Firebase Realtime Database (contoh):
//   import { database } from './firebase-config.js';
//   import { ref, onValue } from 'firebase/database';
//
//   // Listener untuk Node 1 (Pintu)
//   const node1Ref = ref(database, 'node1');
//   onValue(node1Ref, (snapshot) => {
//       const data = snapshot.val();
//       state.node1_door.status = data.status; // "locked" | "unlocked"
//       state.node1_door.rfidLog = data.rfidLog || [];
//       renderNode1();
//       addLogEntry('Node 1', data.lastEvent || 'State updated', 'info');
//   });
//
//   // Listener untuk Node 2 (Gas & Motion)
//   const node2Ref = ref(database, 'node2');
//   onValue(node2Ref, (snapshot) => {
//       const data = snapshot.val();
//       state.node2_safety.gasPPM = data.gasPPM;    // contoh: 245
//       state.node2_safety.motionDetected = data.motionDetected; // true/false
//       renderNode2();
//       if (data.gasPPM >= 300) {
//           addLogEntry('Node 2', `Gas leak: ${data.gasPPM} PPM`, 'danger');
//       }
//   });
//
//   // Listener untuk Node 3 (Lampu & Alarm)
//   const node3Ref = ref(database, 'node3');
//   onValue(node3Ref, (snapshot) => {
//       const data = snapshot.val();
//       state.node3_control.livingRoomLight = data.livingRoomLight; // true | false
//       state.node3_control.porchLight = data.porchLight;             // true | false
//       state.node3_control.alarm.active = data.alarmActive;          // true | false
//       renderNode3();
//   });
//
// LANGKAH 3: Kirim Perintah dari Dashboard ke Hardware
//   Untuk toggle lampu (kirim ke Firebase → trigger ESP32/NodeMCU):
//   function sendCommand(node, command, value) {
//       const commandRef = ref(database, `commands/${node}`);
//       set(commandRef, { action: command, value: value, timestamp: Date.now() });
//   }
//   // Contoh penggunaan:
//   // sendCommand('node3', 'toggleLivingRoom', true);
//
// STRUKTUR FIELD WAJIB (jangan diubah!):
//   state.node1_door.status          -> string: "locked" | "unlocked"
//   state.node1_door.lastScan        -> object: { cardId, name, accessGranted, timestamp }
//   state.node2_safety.gasPPM        -> number: 0-1000
//   state.node2_safety.gasStatus     -> string: "safe" | "danger" (opsional, auto-generated)
//   state.node2_safety.motionDetected -> boolean: true | false
//   state.node3_control.livingRoomLight -> boolean: true | false
//   state.node3_control.porchLight   -> boolean: true | false
//   state.node3_control.alarm.active -> boolean: true | false
//   state.node3_control.alarm.muted  -> boolean: true | false
//
// FORMAT DATA LOG (auto-generated untuk handoff):
//   state.activityLog adalah array yang auto-render ke tampilan log.
//   Format: { time: "HH:MM:SS", node: "Node X", message: "...", type: "ok|warn|danger|info" }
//   Backend tidak perlu menyimpan log di database real-time.
//   Log hanya untuk tampilan frontend/session browser.
//
// FILE YANG PERLU DIEDIT UNTUK INTEGRASI:
//   1. script.js   -> Ganti bagian SIMULATION & Event Listeners
//   2. firebase-config.js (buat baru) -> Inisialisasi Firebase SDK
//   3. index.html  -> Tambahkan <script src="firebase-config.js"></script>
//
// CATATAN PENTING:
//   - Semua fungsi renderNode1(), renderNode2(), renderNode3(), renderLog()
//     sudah siap pakai, TIDAK PERLU DIUBAH.
//   - Jangan hapus state object, hanya update nilainya.
//   - Gunakan addLogEntry() untuk menambahkan event baru ke log tampilan.
// =========================================================

// ─── HELPERS ───
function getTimeString() {
    const now = new Date();
    return now.toTimeString().slice(0, 8);
}

function addLogEntry(node, message, type = 'info') {
    const entry = {
        time: getTimeString(),
        node,
        message,
        type
    };
    state.activityLog.unshift(entry);
    renderLog();
}

function evaluateGasStatus(ppm) {
    return ppm >= 300 ? 'danger' : 'safe';
}

// ─── CLOCK ───
function updateClock() {
    const now = new Date();
    const clockEl = document.getElementById('clock');
    if (clockEl) {
        const wib = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Jakarta' });
        clockEl.textContent = wib + ' WIB';
    }
}
setInterval(updateClock, 1000);
updateClock();

// ─── RENDER: Node 1 (Pintu Utama) ───
function renderNode1() {
    const door = state.node1_door;

    // Icon & Text
    const icon = document.getElementById('door-icon');
    const text = document.getElementById('door-status');
    const card = document.getElementById('card-node1');

    if (icon && text) {
        if (door.status === 'unlocked') {
            icon.textContent = 'lock_open';
            icon.style.color = '#a7f3c5';
            text.textContent = 'TERBUKA / ACCESS GRANTED';
            text.style.color = '#a7f3c5';
            card?.classList.remove('gas-danger');
        } else {
            icon.textContent = 'lock';
            icon.style.color = '#ffb4ab';
            text.textContent = 'TERKUNCI / SECURED';
            text.style.color = '#ffb4ab';
            card?.classList.remove('gas-danger');
        }
    }

    // RFID Log
    const logContainer = document.getElementById('rfid-log-list');
    if (logContainer) {
        logContainer.innerHTML = door.rfidLog.map(entry => {
            const access = entry.access;
            const textColor = access ? '#e1e2ec' : '#ffb4ab';
            const status = access ? `ID:${entry.cardId}` : `ID:${entry.cardId} (DENIED)`;
            return `
                <div class="px-2 py-1.5 flex justify-between" style="color:${access ? '#8b919c' : '#ffb4ab'}">
                    <span class="font-mono">[${entry.time}]</span>
                    <span class="font-mono" style="color:${textColor}">${status}</span>
                </div>
            `;
        }).join('');
    }
}

// ─── RENDER: Node 2 (Dapur & Keamanan) ───
function renderNode2() {
    const safety = state.node2_safety;

    // Gas PPM
    const ppmEl = document.getElementById('gas-ppm');
    const bar = document.getElementById('gas-bar');
    const label = document.getElementById('gas-label');
    const statusText = document.getElementById('gas-status-text');
    const card = document.getElementById('card-node2');

    if (ppmEl) ppmEl.innerHTML = `${safety.gasPPM} <span class="text-sm text-[#8b919c] font-mono">PPM</span>`;

    if (bar) {
        const percentage = Math.min((safety.gasPPM / 1000) * 100, 100);
        bar.style.width = `${percentage}%`;
        // Hardcoded colors agar tidak tergantung Tailwind runtime
        bar.style.backgroundColor = safety.gasPPM >= 300 ? '#dc2626' : '#589e6e';
        bar.className = 'h-full transition-all duration-500';
    }

    if (label) {
        if (safety.gasPPM >= 300) {
            label.innerHTML = '<span style="font-size:10px">●</span> BAHAYA! KEBOCORAN GAS';
            // Inline style agar terbaca jelas
            label.style.color = '#ffb4ab';
            label.style.backgroundColor = 'rgba(196, 90, 90, 0.25)';
            label.style.borderColor = '#ef4444';
            label.className = 'text-xs font-bold px-2 py-1 border rounded uppercase flex items-center gap-1 pulse-dot';
            card?.classList.add('gas-danger');
        } else {
            label.innerHTML = '<span style="font-size:10px">●</span> AMAN';
            label.style.color = '#a7f3c5';
            label.style.backgroundColor = 'rgba(88, 158, 110, 0.2)';
            label.style.borderColor = '#589e6e';
            label.className = 'text-xs font-bold px-2 py-1 border rounded uppercase flex items-center gap-1';
            card?.classList.remove('gas-danger');
        }
    }

    if (statusText) {
        if (safety.gasPPM >= 300) {
            statusText.innerHTML = '<span style="font-size:10px">●</span> Status: BAHAYA';
            statusText.style.color = '#ffb4ab';
        } else {
            statusText.innerHTML = '<span style="font-size:10px">●</span> Status: Aman';
            statusText.style.color = '#a7f3c5';
        }
    }

    // PIR Motion
    const pirEl = document.getElementById('pir-status');
    if (pirEl) {
        if (safety.motionDetected) {
            pirEl.innerHTML = '<span style="color:#ffb4ab;font-size:10px" class="pulse-dot">●</span> Terdeteksi Pergerakan!';
            pirEl.style.color = '#ffb4ab';
            pirEl.className = 'text-xs font-mono uppercase font-bold';
        } else {
            pirEl.innerHTML = '<span style="color:#a7f3c5;font-size:10px">●</span> Aman / Clear';
            pirEl.style.color = '#a7f3c5';
            pirEl.className = 'text-xs font-mono uppercase';
        }
    }
}

// ─── RENDER: Node 3 (Pusat Kontrol) ───
function renderNode3() {
    const control = state.node3_control;

    // Toggles
    const livingToggle = document.getElementById('toggle-living');
    const porchToggle = document.getElementById('toggle-porch');

    if (livingToggle) livingToggle.checked = control.livingRoomLight;
    if (porchToggle) porchToggle.checked = control.porchLight;

    // Alarm
    const alarmIcon = document.getElementById('alarm-icon');
    const alarmText = document.getElementById('alarm-status');
    const alarmCard = document.getElementById('alarm-card');

    if (alarmIcon && alarmText) {
        if (control.alarm.active && !control.alarm.muted) {
            alarmIcon.textContent = 'notifications_active';
            alarmIcon.style.color = '#ffb4ab';
            alarmText.textContent = 'ALARM BERBUNYI';
            alarmText.style.color = '#ffb4ab';
            alarmText.className = 'text-xs font-mono uppercase font-bold pulse-dot';
            alarmCard?.classList.add('gas-danger');
        } else if (control.alarm.active && control.alarm.muted) {
            alarmIcon.textContent = 'notifications_off';
            alarmIcon.style.color = '#ffb786';
            alarmText.textContent = 'ALARM MUTED';
            alarmText.style.color = '#ffb786';
            alarmText.className = 'text-xs font-mono uppercase font-bold';
            alarmCard?.classList.remove('gas-danger');
        } else {
            alarmIcon.textContent = 'notifications_off';
            alarmIcon.style.color = '#8b919c';
            alarmText.textContent = 'ALARM MATI';
            alarmText.style.color = '#8b919c';
            alarmText.className = 'text-xs font-mono uppercase';
            alarmCard?.classList.remove('gas-danger');
        }
    }
}

// ─── RENDER: Activity Log ───
function renderLog() {
    const logContainer = document.getElementById('activity-log');
    if (!logContainer) return;

    const typeColors = {
        'ok': '#589e6e',
        'warn': '#cda434',
        'danger': '#ffb4ab',
        'info': '#8b919c'
    };

    logContainer.innerHTML = state.activityLog.map(entry => {
        const color = typeColors[entry.type] || typeColors['info'];
        return `
            <div class="flex gap-4" style="color:${color}">
                <span class="w-20 shrink-0 font-mono opacity-60">[${entry.time}]</span>
                <span>${entry.node}: ${entry.message}</span>
            </div>
        `;
    }).join('');
}

// ─── EVENT LISTENERS ───
function setupEventListeners() {
    // Bypass Button
    const btnBypass = document.getElementById('btn-bypass');
    if (btnBypass) {
        btnBypass.addEventListener('click', () => {
            if (state.node1_door.status === 'locked') {
                state.node1_door.status = 'unlocked';
                addLogEntry('Node 1', 'Door bypassed / opened manually', 'warn');
                renderNode1();

                // Auto-lock after 5 seconds
                setTimeout(() => {
                    state.node1_door.status = 'locked';
                    addLogEntry('Node 1', 'Door auto-locked (servo timeout)', 'ok');
                    renderNode1();
                }, 5000);
            }
        });
    }

    // Light Toggles
    const livingToggle = document.getElementById('toggle-living');
    const porchToggle = document.getElementById('toggle-porch');

    if (livingToggle) {
        livingToggle.addEventListener('change', (e) => {
            state.node3_control.livingRoomLight = e.target.checked;
            addLogEntry('Node 3', `Lighting 'Lampu Ruang Tamu' turned ${e.target.checked ? 'ON' : 'OFF'}`, 'info');
            renderNode3();
        });
    }

    if (porchToggle) {
        porchToggle.addEventListener('change', (e) => {
            state.node3_control.porchLight = e.target.checked;
            addLogEntry('Node 3', `Lighting 'Lampu Teras' turned ${e.target.checked ? 'ON' : 'OFF'}`, 'info');
            renderNode3();
        });
    }

    // Mute / Reset Alarm
    const btnMute = document.getElementById('btn-mute');
    if (btnMute) {
        btnMute.addEventListener('click', () => {
            const alarm = state.node3_control.alarm;
            if (alarm.active && !alarm.muted) {
                alarm.muted = true;
                addLogEntry('Node 3', 'Alarm muted / reset', 'ok');
                renderNode3();
            } else if (alarm.muted) {
                alarm.muted = false;
                addLogEntry('Node 3', 'Alarm unmuted', 'info');
                renderNode3();
            }
        });
    }
}

// ─── SIMULATION LOGIC (For Demo Only) ───
function simulateGasReading() {
    const prevPPM = state.node2_safety.gasPPM;
    const newPPM = Math.floor(Math.random() * (450 - 200) + 200);
    state.node2_safety.gasPPM = newPPM;

    if ((prevPPM < 300 && newPPM >= 300) || (prevPPM >= 300 && newPPM < 300)) {
        const msg = newPPM >= 300
            ? `WARNING! Gas leak detected (${newPPM} PPM)`
            : `Gas level normalized (${newPPM} PPM)`;
        addLogEntry('Node 2', msg, newPPM >= 300 ? 'danger' : 'ok');
    }

    renderNode2();
}

function simulateMotion() {
    const detected = Math.random() < 0.4;
    state.node2_safety.motionDetected = detected;

    if (detected) {
        addLogEntry('Node 2', 'Motion detected in Kitchen', 'warn');
        // Auto-clear after 3s
        setTimeout(() => {
            state.node2_safety.motionDetected = false;
            renderNode2();
        }, 3000);
    }

    renderNode2();
}

// ─── INITIALIZATION ───
function init() {
    renderNode1();
    renderNode2();
    renderNode3();
    renderLog();
    setupEventListeners();

    // Start simulations
    setInterval(simulateGasReading, 7000);
    setInterval(simulateMotion, 18000);

    console.log('SENTINEL-X Dashboard initialized');
    console.log('State object for handoff:', state);
}

// Run when DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
