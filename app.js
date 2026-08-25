/**
 * FREE BOOK MANAGEMENT SYSTEM - APP LOGIC (V11 WITH TEXT NORMALIZATION & AUTO-MERGING)
 * Vocational Certificate Level (ปวช.) - Udon Thani Technical College
 * Developed by: Educational Technology & Library Services Department
 */

// =========================================================
// 1. INITIAL MASTER DATA & FIREBASE CONFIG
// =========================================================
const INITIAL_ORDERS_DATA = [
    {
        id: "BK-001",
        year: 2569,
        semester: "ภาคเรียนที่ 1",
        dept: "ช่างยนต์",
        grade: "ปวช.1",
        itemNo: 1,
        code: "20101-2011",
        title: "งานจักรยานยนต์",
        author: "สมชาย วณารักษ์",
        publisher: "สำนักพิมพ์เอมพันธ์",
        qty: 180,
        price: 100,
        amount: 18000
    },
    {
        id: "BK-002",
        year: 2569,
        semester: "ภาคเรียนที่ 1",
        dept: "ช่างยนต์",
        grade: "ปวช.1",
        itemNo: 2,
        code: "20101-2009",
        title: "งานวัดละเอียดช่างยนต์",
        author: "ขนบ เพชรซ้อน",
        publisher: "ศูนย์ส่งเสริมอาชีวะ",
        qty: 180,
        price: 119,
        amount: 21420
    },
    {
        id: "BK-003",
        year: 2569,
        semester: "ภาคเรียนที่ 1",
        dept: "ช่างยนต์",
        grade: "ปวช.1",
        itemNo: 3,
        code: "20101-2010",
        title: "งานเครื่องยนต์เล็ก",
        author: "เฉลิม อ่อนอิ่ม",
        publisher: "ศูนย์หนังสือเมืองไทย",
        qty: 180,
        price: 115,
        amount: 20700
    },
    {
        id: "BK-004",
        year: 2569,
        semester: "ภาคเรียนที่ 1",
        dept: "ช่างยนต์",
        grade: "ปวช.1",
        itemNo: 4,
        code: "20000-1301",
        title: "วิทยาศาสตร์พื้นฐานอาชีพ",
        author: "อ.วิวัฒน์ รอดเกิด",
        publisher: "ศูนย์หนังสือเมืองไทย",
        qty: 180,
        price: 110,
        amount: 19800
    },
    {
        id: "BK-005",
        year: 2569,
        semester: "ภาคเรียนที่ 1",
        dept: "ช่างยนต์",
        grade: "ปวช.1",
        itemNo: 5,
        code: "20100-1001",
        title: "เขียนแบบเทคนิคเบื้องต้น",
        author: "ณรงค์ ตีวัน",
        publisher: "ศูนย์หนังสือเมืองไทย",
        qty: 180,
        price: 90,
        amount: 16200
    },
    {
        id: "BK-006",
        year: 2569,
        semester: "ภาคเรียนที่ 1",
        dept: "ช่างยนต์",
        grade: "ปวช.1",
        itemNo: 6,
        code: "20100-1002",
        title: "วัสดุงานช่างอุตสาหกรรม",
        author: "ทวี วงศ์คำหล้า",
        publisher: "ศูนย์หนังสือเมืองไทย",
        qty: 180,
        price: 99,
        amount: 17820
    },
    {
        id: "BK-007",
        year: 2569,
        semester: "ภาคเรียนที่ 1",
        dept: "ช่างยนต์",
        grade: "ปวช.1",
        itemNo: 7,
        code: "20000-1401",
        title: "คณิตศาสตร์พื้นฐานอาชีพ",
        author: "ผศ.พัสนีย์ นันตา",
        publisher: "สำนักพิมพ์เอมพันธ์",
        qty: 180,
        price: 97,
        amount: 17460
    },
    {
        id: "BK-008",
        year: 2569,
        semester: "ภาคเรียนที่ 1",
        dept: "ช่างยนต์",
        grade: "ปวช.1",
        itemNo: 8,
        code: "20000-1201",
        title: "ภาษาอังกฤษเพื่อการสื่อสาร",
        author: "สายพิณ ธรรมประศาสน์",
        publisher: "ศูนย์ส่งเสริมอาชีวะ",
        qty: 180,
        price: 80,
        amount: 14400
    },
    {
        id: "BK-009",
        year: 2569,
        semester: "ภาคเรียนที่ 1",
        dept: "ช่างยนต์",
        grade: "ปวช.1",
        itemNo: 9,
        code: "20100-1006",
        title: "งานเครื่องมือกลเบื้องต้น",
        author: "อำนาจ ทองแสน",
        publisher: "ศูนย์หนังสือเมืองไทย",
        qty: 180,
        price: 90,
        amount: 16200
    },
    {
        id: "BK-010",
        year: 2569,
        semester: "ภาคเรียนที่ 1",
        dept: "ยานยนต์ไฟฟ้า",
        grade: "ปวช.1",
        itemNo: 10,
        code: "20000-1301",
        title: "วิทยาศาสตร์พื้นฐานอาชีพ",
        author: "อ.วิวัฒน์ รอดเกิด",
        publisher: "ศูนย์หนังสือเมืองไทย",
        qty: 35,
        price: 110,
        amount: 3850
    },
    {
        id: "BK-011",
        year: 2569,
        semester: "ภาคเรียนที่ 1",
        dept: "ช่างยนต์",
        grade: "ปวช.1",
        itemNo: 11,
        code: "20000-1601",
        title: "ทักษะการดำรงชีวิตเพื่อพัฒนาสุขภาวะ",
        author: "สุมน คณานิตย์",
        publisher: "สำนักพิมพ์เอมพันธ์",
        qty: 180,
        price: 92,
        amount: 16560
    },
    {
        id: "BK-012",
        year: 2569,
        semester: "ภาคเรียนที่ 1",
        dept: "ช่างเทคนิคคอมพิวเตอร์",
        grade: "ปวช.2",
        itemNo: 12,
        code: "20000-1301",
        title: "วิทยาศาสตร์พื้นฐานอาชีพ",
        author: "อ.วิวัฒน์ รอดเกิด",
        publisher: "ศูนย์หนังสือเมืองไทย",
        qty: 35,
        price: 110,
        amount: 3850
    },
    {
        id: "BK-013",
        year: 2569,
        semester: "ภาคเรียนที่ 1",
        dept: "ช่างยนต์",
        grade: "ปวช.2",
        itemNo: 13,
        code: "20000-1301",
        title: "วิทยาศาสตร์พื้นฐานอาชีพ",
        author: "อ.วิวัฒน์ รอดเกิด",
        publisher: "ศูนย์หนังสือเมืองไทย",
        qty: 35,
        price: 110,
        amount: 3850
    }
];

const DEFAULT_FIREBASE_CONFIG = {
    apiKey: "AIzaSyAHUjcTlxOTGepWj8nRyfR9K8wwLx5EIvM",
    authDomain: "udontc-freebook.firebaseapp.com",
    databaseURL: "https://udontc-freebook-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "udontc-freebook",
    storageBucket: "udontc-freebook.firebasestorage.app",
    messagingSenderId: "410467848837",
    appId: "1:410467848837:web:68a1f9ebe56815cd1acfec",
    measurementId: "G-HK4E3GCKFJ"
};

const DEFAULT_TARGET_SUBJECTS = {
    "ช่างยนต์_ปวช.1": 10,
    "ช่างยนต์_ปวช.2": 1,
    "ช่างยนต์_ปวช.3": 0,
    "ยานยนต์ไฟฟ้า_ปวช.1": 1,
    "ยานยนต์ไฟฟ้า_ปวช.2": 0,
    "ยานยนต์ไฟฟ้า_ปวช.3": 0,
    "ช่างเทคนิคคอมพิวเตอร์_ปวช.1": 0,
    "ช่างเทคนิคคอมพิวเตอร์_ปวช.2": 1,
    "ช่างเทคนิคคอมพิวเตอร์_ปวช.3": 0,
    "ช่างไฟฟ้า_ปวช.1": 0,
    "ช่างไฟฟ้า_ปวช.2": 0,
    "ช่างไฟฟ้า_ปวช.3": 0,
    "อิเล็กทรอนิกส์_ปวช.1": 0,
    "อิเล็กทรอนิกส์_ปวช.2": 0,
    "อิเล็กทรอนิกส์_ปวช.3": 0
};

const DEFAULT_PASS_HASH = "ae5c8040951ce84e4e933d89b556cfd6d0b316acc290a40d389542dba7aabdbc";

const KNOWN_PUBLISHERS = [
    "ศูนย์หนังสือเมืองไทย",
    "สำนักพิมพ์เอมพันธ์",
    "ศูนย์ส่งเสริมอาชีวะ",
    "ศูนย์ส่งเสริมวิชาการ",
    "ซีเอ็ด",
    "วังอักษร",
    "จิตรวัตร",
    "มีเดีย",
    "แสงสว่าง",
    "ซัคเซส",
    "Max"
];

const KNOWN_DEPARTMENTS = [
    "ช่างยนต์",
    "ยานยนต์ไฟฟ้า",
    "ช่างเทคนิคคอมพิวเตอร์",
    "ช่างไฟฟ้า",
    "อิเล็กทรอนิกส์"
];

// =========================================================
// 2. STATE MANAGEMENT & FIREBASE VARIABLES
// =========================================================
let firebaseDb = null;
let isFirebaseConnected = false;

let state = {
    orders: [],
    isAdmin: false,
    theme: 'light',
    currentTab: 'tab-dashboard',
    selectedYear: '2569',
    selectedSemester: 'ภาคเรียนที่ 1',
    customYears: [2569],
    adminPassHash: DEFAULT_PASS_HASH,
    targetSubjects: { ...DEFAULT_TARGET_SUBJECTS },
    showSubjectCheckDashboard: true,
    parsedExcelOrders: [],
    charts: {}
};

// =========================================================
// TEXT NORMALIZATION UTILS (Cleans extra spaces & matches strings)
// =========================================================
function normalizeText(str) {
    if (!str) return '';
    return String(str).replace(/\s+/g, ' ').trim();
}

function getNormalizedKey(str) {
    return normalizeText(str).toLowerCase();
}

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// =========================================================
// 3. INITIALIZATION
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
    loadStateFromStorage();
    initFirebaseConnection();
    initTheme();
    initDate();
    initGlobalTermSelector();
    initTabNavigation();
    initAdminEvents();
    initFilterEvents();
    initFormEvents();
    initExportEvents();
    initTargetConfigEvents();
    initManageDataEvents();
    initImportExcelEvents();
    initFirebaseConfigEvents();
    
    renderAllViews();
});

function loadStateFromStorage() {
    const savedOrders = localStorage.getItem('freebook_orders');
    if (savedOrders) {
        try {
            state.orders = JSON.parse(savedOrders);
        } catch (e) {
            state.orders = [...INITIAL_ORDERS_DATA];
        }
    } else {
        state.orders = [...INITIAL_ORDERS_DATA];
        saveOrdersToStorage();
    }
    
    const savedAdmin = localStorage.getItem('freebook_is_admin');
    state.isAdmin = savedAdmin === 'true';

    const savedPassHash = localStorage.getItem('freebook_admin_pass_hash');
    if (savedPassHash) state.adminPassHash = savedPassHash;

    const savedTargets = localStorage.getItem('freebook_target_subjects');
    if (savedTargets) {
        try { state.targetSubjects = JSON.parse(savedTargets); } catch(e){}
    }

    const savedYears = localStorage.getItem('freebook_custom_years');
    if (savedYears) {
        try { state.customYears = JSON.parse(savedYears); } catch(e){}
    } else {
        state.customYears = Array.from(new Set(state.orders.map(o => Number(o.year)))).filter(Boolean);
        localStorage.setItem('freebook_custom_years', JSON.stringify(state.customYears));
    }

    const savedShowCheck = localStorage.getItem('freebook_show_check_dashboard');
    if (savedShowCheck !== null) state.showSubjectCheckDashboard = savedShowCheck === 'true';

    updateAdminUI();
}

function saveOrdersToStorage() {
    localStorage.setItem('freebook_orders', JSON.stringify(state.orders));
    if (isFirebaseConnected && firebaseDb) {
        firebaseDb.ref('orders').set(state.orders);
    }
}

function saveCustomYearsToStorage() {
    localStorage.setItem('freebook_custom_years', JSON.stringify(state.customYears));
    if (isFirebaseConnected && firebaseDb) {
        firebaseDb.ref('customYears').set(state.customYears);
    }
}

function saveTargetsToStorage() {
    localStorage.setItem('freebook_target_subjects', JSON.stringify(state.targetSubjects));
    if (isFirebaseConnected && firebaseDb) {
        firebaseDb.ref('targetSubjects').set(state.targetSubjects);
    }
}

function saveShowCheckToStorage() {
    localStorage.setItem('freebook_show_check_dashboard', state.showSubjectCheckDashboard);
    if (isFirebaseConnected && firebaseDb) {
        firebaseDb.ref('showSubjectCheckDashboard').set(state.showSubjectCheckDashboard);
    }
}

function initDate() {
    const today = new Date();
    const thaiMonths = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
    const formatted = `${today.getDate()} ${thaiMonths[today.getMonth()]} พ.ศ. ${today.getFullYear() + 543}`;
    const dateEl = document.getElementById('reportPrintDate');
    if (dateEl) dateEl.innerText = formatted;
}

function getUniqueSubjectKey(o) {
    const code = getNormalizedKey(o.code);
    const title = getNormalizedKey(o.title);
    return `${code}_${title}`;
}

function parseFirebaseConfigInput(input) {
    if (!input) return DEFAULT_FIREBASE_CONFIG;
    let str = String(input).trim();

    const firstBrace = str.indexOf('{');
    const lastBrace = str.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        str = str.substring(firstBrace, lastBrace + 1);
    }

    try {
        return JSON.parse(str);
    } catch (e1) {
        try {
            return eval('(' + str + ')');
        } catch (e2) {
            console.error("Firebase config parse error:", e2);
            return null;
        }
    }
}

// =========================================================
// 4. FIREBASE CLOUD REALTIME SYNC
// =========================================================
function initFirebaseConnection() {
    let savedConfigStr = localStorage.getItem('freebook_firebase_config');
    let configObj = parseFirebaseConfigInput(savedConfigStr) || DEFAULT_FIREBASE_CONFIG;

    if (!configObj || typeof firebase === 'undefined') {
        updateFirebaseStatusUI(false);
        return;
    }

    try {
        if (!firebase.apps.length) {
            firebase.initializeApp(configObj);
        }
        
        firebaseDb = firebase.database();
        isFirebaseConnected = true;
        updateFirebaseStatusUI(true);

        firebaseDb.ref('orders').on('value', (snapshot) => {
            const data = snapshot.val();
            if (data && Array.isArray(data)) {
                state.orders = data;
                localStorage.setItem('freebook_orders', JSON.stringify(data));
                renderAllViews();
            } else if (data === null) {
                firebaseDb.ref('orders').set(state.orders);
            }
        });

        firebaseDb.ref('customYears').on('value', (snapshot) => {
            const years = snapshot.val();
            if (years && Array.isArray(years)) {
                state.customYears = years;
                localStorage.setItem('freebook_custom_years', JSON.stringify(years));
                renderYearDropdownOptions();
            }
        });

        firebaseDb.ref('targetSubjects').on('value', (snapshot) => {
            const targets = snapshot.val();
            if (targets) {
                state.targetSubjects = targets;
                localStorage.setItem('freebook_target_subjects', JSON.stringify(targets));
                renderSubjectCheckWidget();
            }
        });

        firebaseDb.ref('showSubjectCheckDashboard').on('value', (snapshot) => {
            const val = snapshot.val();
            if (val !== null) {
                state.showSubjectCheckDashboard = (val === true || val === 'true');
                localStorage.setItem('freebook_show_check_dashboard', state.showSubjectCheckDashboard);
                renderSubjectCheckWidget();
            }
        });

    } catch (e) {
        console.error("Firebase connection failed:", e);
        isFirebaseConnected = false;
        updateFirebaseStatusUI(false);
    }
}

function updateFirebaseStatusUI(connected) {
    const dot = document.getElementById('firebaseStatusDot');
    const text = document.getElementById('firebaseStatusText');
    const icon = document.getElementById('cloudStatusIcon');

    if (connected) {
        if (dot) dot.style.color = '#10b981';
        if (text) text.innerText = 'เชื่อมต่อฐานข้อมูลคลาวด์สด (Firebase udontc-freebook)';
        if (icon) {
            icon.className = 'fa-solid fa-cloud';
            icon.style.color = '#10b981';
        }
    } else {
        if (dot) dot.style.color = '#ef4444';
        if (text) text.innerText = 'ใช้งานฐานข้อมูลเครื่อง (Local)';
        if (icon) {
            icon.className = 'fa-solid fa-cloud-slash';
            icon.style.color = '#ef4444';
        }
    }
}

function initFirebaseConfigEvents() {
    const cloudStatusBtn = document.getElementById('cloudStatusBtn');
    const firebaseStatusBadge = document.getElementById('firebaseStatusBadge');
    const firebaseConfigModal = document.getElementById('firebaseConfigModal');
    const closeFirebaseModalBtn = document.getElementById('closeFirebaseModalBtn');
    const saveFirebaseConfigBtn = document.getElementById('saveFirebaseConfigBtn');
    const disconnectFirebaseBtn = document.getElementById('disconnectFirebaseBtn');
    const firebaseConfigInput = document.getElementById('firebaseConfigInput');
    const firebaseConfigError = document.getElementById('firebaseConfigError');

    const openModal = () => {
        if (!state.isAdmin) {
            showToast('🔒 เฉพาะผู้ดูแลระบบ (Admin) เท่านั้นที่สามารถตั้งค่าฐานข้อมูลได้', 'info');
            return;
        }
        firebaseConfigInput.value = localStorage.getItem('freebook_firebase_config') || JSON.stringify(DEFAULT_FIREBASE_CONFIG, null, 2);
        firebaseConfigError.classList.add('hidden');
        firebaseConfigModal.classList.remove('hidden');
    };

    cloudStatusBtn.addEventListener('click', openModal);
    if (firebaseStatusBadge) firebaseStatusBadge.addEventListener('click', openModal);

    const closeModal = () => firebaseConfigModal.classList.add('hidden');
    closeFirebaseModalBtn.addEventListener('click', closeModal);

    saveFirebaseConfigBtn.addEventListener('click', () => {
        if (!state.isAdmin) return;

        const rawConfigStr = firebaseConfigInput.value.trim();
        const parsed = parseFirebaseConfigInput(rawConfigStr);

        if (!parsed || !parsed.apiKey) {
            firebaseConfigError.innerText = 'รูปแบบ Config ไม่ถูกต้อง กรุณาก๊อปปี้จาก Firebase Console';
            firebaseConfigError.classList.remove('hidden');
            return;
        }

        try {
            localStorage.setItem('freebook_firebase_config', JSON.stringify(parsed));
            initFirebaseConnection();
            if (isFirebaseConnected) {
                closeModal();
                showToast('เชื่อมต่อฐานข้อมูลคลาวด์ Firebase สำเร็จแล้ว! ข้อมูลจะซิงค์สดอัตโนมัติ', 'success');
            } else {
                firebaseConfigError.innerText = 'ไม่สามารถเชื่อมต่อ Firebase ได้ กรุณาตรวจสอบ Config';
                firebaseConfigError.classList.remove('hidden');
            }
        } catch (err) {
            firebaseConfigError.innerText = 'เกิดข้อผิดพลาดในการตั้งค่า';
            firebaseConfigError.classList.remove('hidden');
        }
    });

    disconnectFirebaseBtn.addEventListener('click', () => {
        if (!state.isAdmin) return;

        if (confirm('ยกเลิกการเชื่อมต่อ Firebase และกลับไปใช้ LocalStorage หรือไม่?')) {
            localStorage.removeItem('freebook_firebase_config');
            isFirebaseConnected = false;
            firebaseDb = null;
            updateFirebaseStatusUI(false);
            closeModal();
            showToast('สลับกลับมาใช้ฐานข้อมูลในเครื่อง (LocalStorage)', 'info');
        }
    });
}

// =========================================================
// 5. GLOBAL YEAR & SEMESTER CONTROLLER (SORTED DESCENDING)
// =========================================================
function getAllYearsSortedDescending() {
    const yearsFromOrders = state.orders.map(o => Number(o.year)).filter(Boolean);
    const combinedYears = Array.from(new Set([...state.customYears, ...yearsFromOrders]));
    return combinedYears.sort((a, b) => b - a);
}

function initGlobalTermSelector() {
    renderYearDropdownOptions();

    const yearSelect = document.getElementById('globalYearSelect');
    const semSelect = document.getElementById('globalSemesterSelect');

    const onTermChange = () => {
        state.selectedYear = yearSelect.value;
        state.selectedSemester = semSelect.value;
        renderAllViews();
    };

    yearSelect.addEventListener('change', onTermChange);
    semSelect.addEventListener('change', onTermChange);
}

function renderYearDropdownOptions() {
    const sortedYears = getAllYearsSortedDescending();
    const yearSelect = document.getElementById('globalYearSelect');

    const currentVal = state.selectedYear;
    yearSelect.innerHTML = '<option value="ALL">-- ทุกปีการศึกษา --</option>' + 
        sortedYears.map(y => `<option value="${y}">ปีการศึกษา ${y}</option>`).join('');

    if (sortedYears.includes(Number(currentVal)) || currentVal === 'ALL') {
        yearSelect.value = currentVal;
    } else {
        yearSelect.value = sortedYears[0] ? String(sortedYears[0]) : '2569';
        state.selectedYear = yearSelect.value;
    }
}

function getFilteredOrdersByTerm() {
    return state.orders.filter(o => {
        const matchesYear = state.selectedYear === 'ALL' || String(o.year) === String(state.selectedYear);
        const matchesSem = state.selectedSemester === 'ALL' || o.semester === state.selectedSemester;
        return matchesYear && matchesSem;
    });
}

function updateActiveTermHeader() {
    const yearText = state.selectedYear === 'ALL' ? 'ทุกปีการศึกษา' : `ปีการศึกษา ${state.selectedYear}`;
    const semText = state.selectedSemester === 'ALL' ? 'ทุกภาคเรียน' : state.selectedSemester;
    const label = `${yearText} (${semText})`;

    const el1 = document.getElementById('activeFilterTermText');
    if (el1) el1.innerText = label;

    const el2 = document.getElementById('reportPrintTermText');
    if (el2) el2.innerText = label;

    const el3 = document.getElementById('tablePrintMeta');
    if (el3) el3.innerText = `รายงานสั่งหนังสือเรียนฟรี ข้อมูลประจำ ${label}`;
}

// =========================================================
// 6. THEME & ADMIN SECURITY (SHA-256 HASH)
// =========================================================
function initTheme() {
    const savedTheme = localStorage.getItem('freebook_theme') || 'light';
    setTheme(savedTheme);
    
    document.getElementById('themeToggleBtn').addEventListener('click', () => {
        const nextTheme = state.theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
    });
}

function setTheme(theme) {
    state.theme = theme;
    localStorage.setItem('freebook_theme', theme);
    document.body.className = `theme-${theme}`;
    const icon = document.querySelector('#themeToggleBtn i');
    if (icon) {
        icon.className = theme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    }
    renderCharts();
}

function initAdminEvents() {
    const adminToggleBtn = document.getElementById('adminToggleBtn');
    const adminLoginModal = document.getElementById('adminLoginModal');
    const closeAdminModalBtn = document.getElementById('closeAdminModalBtn');
    const cancelAdminBtn = document.getElementById('cancelAdminBtn');
    const submitAdminLoginBtn = document.getElementById('submitAdminLoginBtn');
    const adminPasswordInput = document.getElementById('adminPasswordInput');

    adminToggleBtn.addEventListener('click', () => {
        if (state.isAdmin) {
            state.isAdmin = false;
            localStorage.setItem('freebook_is_admin', 'false');
            updateAdminUI();
            showToast('สลับเข้าสู่โหมดทั่วไป (Viewer)', 'info');
        } else {
            adminPasswordInput.value = '';
            document.getElementById('adminLoginError').classList.add('hidden');
            adminLoginModal.classList.remove('hidden');
            adminPasswordInput.focus();
        }
    });

    const closeModal = () => adminLoginModal.classList.add('hidden');
    closeAdminModalBtn.addEventListener('click', closeModal);
    cancelAdminBtn.addEventListener('click', closeModal);

    submitAdminLoginBtn.addEventListener('click', async () => {
        const password = adminPasswordInput.value.trim();
        const inputHash = await sha256(password);

        if (inputHash === state.adminPassHash) {
            state.isAdmin = true;
            localStorage.setItem('freebook_is_admin', 'true');
            updateAdminUI();
            closeModal();
            showToast('เข้าสู่โหมด Admin สำเร็จ! สิทธิ์การแก้ไขข้อมูลทำงานแล้ว', 'success');
        } else {
            document.getElementById('adminLoginError').classList.remove('hidden');
        }
    });

    adminPasswordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') submitAdminLoginBtn.click();
    });

    // Change Password Modal Events
    const changePassBtn = document.getElementById('changePassBtn');
    const changePassModal = document.getElementById('changePassModal');
    const closeChangePassModalBtn = document.getElementById('closeChangePassModalBtn');
    const cancelChangePassBtn = document.getElementById('cancelChangePassBtn');
    const submitChangePassBtn = document.getElementById('submitChangePassBtn');

    changePassBtn.addEventListener('click', () => {
        document.getElementById('oldPassInput').value = '';
        document.getElementById('newPassInput').value = '';
        document.getElementById('confirmPassInput').value = '';
        document.getElementById('changePassError').classList.add('hidden');
        changePassModal.classList.remove('hidden');
    });

    const closePassModal = () => changePassModal.classList.add('hidden');
    closeChangePassModalBtn.addEventListener('click', closePassModal);
    cancelChangePassBtn.addEventListener('click', closePassModal);

    submitChangePassBtn.addEventListener('click', async () => {
        const oldP = document.getElementById('oldPassInput').value.trim();
        const newP = document.getElementById('newPassInput').value.trim();
        const confirmP = document.getElementById('confirmPassInput').value.trim();
        const errEl = document.getElementById('changePassError');

        const oldHash = await sha256(oldP);
        if (oldHash !== state.adminPassHash) {
            errEl.innerText = 'รหัสผ่านเดิมไม่ถูกต้อง';
            errEl.classList.remove('hidden');
            return;
        }

        if (newP.length < 4) {
            errEl.innerText = 'รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 4 ตัวอักษร';
            errEl.classList.remove('hidden');
            return;
        }

        if (newP !== confirmP) {
            errEl.innerText = 'รหัสผ่านใหม่และการยืนยันไม่ตรงกัน';
            errEl.classList.remove('hidden');
            return;
        }

        const newHash = await sha256(newP);
        state.adminPassHash = newHash;
        localStorage.setItem('freebook_admin_pass_hash', newHash);
        closePassModal();
        showToast('เปลี่ยนรหัสผ่าน Admin สำเร็จเรียบร้อยแล้ว!', 'success');
    });
}

function updateAdminUI() {
    const adminBtn = document.getElementById('adminToggleBtn');
    const adminStatusText = document.getElementById('adminStatusText');
    const adminIcon = adminBtn.querySelector('i');

    if (state.isAdmin) {
        adminBtn.className = 'btn-admin-toggle mode-admin';
        adminStatusText.innerText = 'โหมดผู้ดูแล (Admin)';
        adminIcon.className = 'fa-solid fa-user-check';
        
        document.querySelectorAll('.admin-only').forEach(el => el.classList.remove('hidden'));
    } else {
        adminBtn.className = 'btn-admin-toggle mode-viewer';
        adminStatusText.innerText = 'โหมดทั่วไป (Viewer)';
        adminIcon.className = 'fa-solid fa-user-lock';
        
        document.querySelectorAll('.admin-only').forEach(el => el.classList.add('hidden'));
    }
    
    renderMasterTable();
    renderSubjectCheckWidget();
}

// =========================================================
// 7. EXCEL IMPORT MODULE (WITH SMART NORMALIZATION & AUTO-MERGING)
// =========================================================
function initImportExcelEvents() {
    const importExcelBtn = document.getElementById('importExcelBtn');
    const importExcelModal = document.getElementById('importExcelModal');
    const closeImportModalBtn = document.getElementById('closeImportModalBtn');
    const cancelImportBtn = document.getElementById('cancelImportBtn');
    const confirmImportBtn = document.getElementById('confirmImportBtn');
    const excelFileInput = document.getElementById('excelFileInput');
    const downloadExcelTemplateBtn = document.getElementById('downloadExcelTemplateBtn');

    importExcelBtn.addEventListener('click', () => {
        excelFileInput.value = '';
        document.getElementById('excelPreviewSection').classList.add('hidden');
        confirmImportBtn.disabled = true;
        state.parsedExcelOrders = [];
        importExcelModal.classList.remove('hidden');
    });

    const closeModal = () => importExcelModal.classList.add('hidden');
    closeImportModalBtn.addEventListener('click', closeModal);
    cancelImportBtn.addEventListener('click', closeModal);

    downloadExcelTemplateBtn.addEventListener('click', () => {
        const templateData = [
            {
                "ปีการศึกษา": 2569,
                "ภาคเรียน": "ภาคเรียนที่ 1",
                "แผนกวิชา": "ช่างยนต์",
                "ระดับชั้น": "ปวช.1",
                "รหัสวิชา": "20101-2011",
                "ชื่อหนังสือ": "งานจักรยานยนต์",
                "ผู้แต่ง": "สมชาย วณารักษ์",
                "สำนักพิมพ์": "สำนักพิมพ์เอมพันธ์",
                "จำนวน": 180,
                "ราคาต่อเล่ม": 100
            },
            {
                "ปีการศึกษา": 2569,
                "ภาคเรียน": "ภาคเรียนที่ 1",
                "แผนกวิชา": "ช่างยนต์",
                "ระดับชั้น": "ปวช.1",
                "รหัสวิชา": "20101-2009",
                "ชื่อหนังสือ": "งานวัดละเอียดช่างยนต์",
                "ผู้แต่ง": "ขนบ เพชรซ้อน",
                "สำนักพิมพ์": "ศูนย์ส่งเสริมอาชีวะ",
                "จำนวน": 180,
                "ราคาต่อเล่ม": 119
            }
        ];

        const ws = XLSX.utils.json_to_sheet(templateData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "รายการสั่งหนังสือ");
        XLSX.writeFile(wb, "Template_FreeBook_Upload.xlsx");
        showToast('ดาวน์โหลดไฟล์แม่แบบ Excel เรียบร้อยแล้ว', 'success');
    });

    excelFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const data = new Uint8Array(evt.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

                if (!jsonData || jsonData.length === 0) {
                    showToast('ไม่พบข้อมูลในไฟล์ Excel ที่เลือก', 'danger');
                    return;
                }

                const parsedRows = [];
                jsonData.forEach((row, index) => {
                    const findVal = (keys) => {
                        for (let k of keys) {
                            for (let rowKey in row) {
                                if (rowKey.trim().toLowerCase().includes(k.toLowerCase())) {
                                    return row[rowKey];
                                }
                            }
                        }
                        return "";
                    };

                    const year = Number(findVal(["ปีการศึกษา", "ปี"])) || 2569;
                    const semester = String(findVal(["ภาคเรียน", "เทอม"]) || "ภาคเรียนที่ 1");
                    const dept = normalizeText(findVal(["แผนกวิชา", "สาขาวิชา", "แผนก", "สาขา"]) || "ช่างยนต์");
                    const grade = normalizeText(findVal(["ระดับชั้น", "ระดับ"]) || "ปวช.1");
                    const code = normalizeText(findVal(["รหัสวิชา", "รหัส"]) || "");
                    const title = normalizeText(findVal(["ชื่อหนังสือ", "ชื่อวิชา", "รายการ"]) || "");
                    const author = normalizeText(findVal(["ผู้แต่ง", "ผู้เรียบเรียง"]) || "");
                    const publisher = normalizeText(findVal(["สำนักพิมพ์", "ค่าย"]) || "ศูนย์หนังสือเมืองไทย");
                    const qty = Number(findVal(["จำนวน", "จำนวนเล่ม"])) || 180;
                    const price = Number(findVal(["ราคาต่อเล่ม", "ราคา/คน/เล่ม", "ราคา"])) || 100;

                    if (title || code) {
                        parsedRows.push({
                            id: `BK-IMP-${Date.now()}-${index}`,
                            year,
                            semester: semester.includes('2') ? 'ภาคเรียนที่ 2' : 'ภาคเรียนที่ 1',
                            dept: dept || 'ช่างยนต์',
                            grade: grade || 'ปวช.1',
                            itemNo: index + 1,
                            code: code || 'N/A',
                            title: title || 'วิชาไม่มีชื่อ',
                            author,
                            publisher: publisher || 'สำนักพิมพ์เอมพันธ์',
                            qty,
                            price,
                            amount: qty * price
                        });
                    }
                });

                if (parsedRows.length === 0) {
                    showToast('ไม่สามารถจับคู่หัวตารางไฟล์ Excel ได้ กรุณาใช้ไฟล์แม่แบบ', 'danger');
                    return;
                }

                state.parsedExcelOrders = parsedRows;
                renderExcelPreview(parsedRows);
                confirmImportBtn.disabled = false;
                showToast(`อ่านไฟล์ Excel สำเร็จ พบ ${parsedRows.length} รายการ`, 'success');

            } catch (err) {
                console.error(err);
                showToast('เกิดข้อผิดพลาดในการอ่านไฟล์ Excel', 'danger');
            }
        };
        reader.readAsArrayBuffer(file);
    });

    confirmImportBtn.addEventListener('click', () => {
        if (!state.parsedExcelOrders || state.parsedExcelOrders.length === 0) return;

        const importMode = document.querySelector('input[name="importMode"]:checked').value;

        if (importMode === 'replace') {
            state.orders = [];
        }

        // Process imported rows with AUTO-MERGING for identical (dept, grade, code, title, publisher, year, semester)
        let mergedCount = 0;
        let insertedCount = 0;

        state.parsedExcelOrders.forEach(newRow => {
            const existingIndex = state.orders.findIndex(o => 
                o.year === newRow.year &&
                o.semester === newRow.semester &&
                getNormalizedKey(o.dept) === getNormalizedKey(newRow.dept) &&
                getNormalizedKey(o.grade) === getNormalizedKey(newRow.grade) &&
                getNormalizedKey(o.code) === getNormalizedKey(newRow.code) &&
                getNormalizedKey(o.title) === getNormalizedKey(newRow.title) &&
                getNormalizedKey(o.publisher) === getNormalizedKey(newRow.publisher)
            );

            if (existingIndex !== -1) {
                // Auto-merge quantity
                state.orders[existingIndex].qty += newRow.qty;
                state.orders[existingIndex].price = newRow.price;
                state.orders[existingIndex].amount = state.orders[existingIndex].qty * newRow.price;
                mergedCount++;
            } else {
                state.orders.push(newRow);
                insertedCount++;
            }
        });

        const importedYears = state.parsedExcelOrders.map(o => Number(o.year)).filter(Boolean);
        state.customYears = Array.from(new Set([...state.customYears, ...importedYears]));
        saveCustomYearsToStorage();

        saveOrdersToStorage();
        renderAllViews();
        closeModal();

        if (mergedCount > 0) {
            showToast(`นำเข้าสำเร็จ! (เพิ่มใหม่ ${insertedCount} รายการ, รวมยอดวิชาซ้ำ ${mergedCount} รายการ)`, 'success');
        } else {
            showToast(`นำเข้าข้อมูลเรียบร้อยแล้วทั้งหมด ${insertedCount} รายการ`, 'success');
        }
    });
}

function renderExcelPreview(rows) {
    const tbody = document.getElementById('excelPreviewTbody');
    document.getElementById('parsedRowCount').innerText = rows.length;
    tbody.innerHTML = '';

    rows.slice(0, 10).forEach(r => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${r.year}/${r.semester === 'ภาคเรียนที่ 1' ? 'T1' : 'T2'}</td>
            <td>${escapeHtml(r.dept)}</td>
            <td>${escapeHtml(r.grade)}</td>
            <td><code>${escapeHtml(r.code)}</code></td>
            <td>${escapeHtml(r.title)}</td>
            <td>${escapeHtml(r.publisher)}</td>
            <td class="text-right">${r.qty}</td>
            <td class="text-right">${formatCurrency(r.price)}</td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('excelPreviewSection').classList.remove('hidden');
}

// =========================================================
// 8. TAB NAVIGATION & RENDER ENGINE
// =========================================================
function initTabNavigation() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetTab = btn.getAttribute('data-tab');
            state.currentTab = targetTab;
            document.getElementById(targetTab).classList.add('active');

            if (targetTab === 'tab-dashboard') {
                setTimeout(renderCharts, 100);
            }
        });
    });
}

function initFilterEvents() {
    const searchInput = document.getElementById('searchInput');
    const deptFilter = document.getElementById('deptFilter');
    const gradeFilter = document.getElementById('gradeFilter');
    const pubFilter = document.getElementById('pubFilter');

    [searchInput, deptFilter, gradeFilter, pubFilter].forEach(el => {
        el.addEventListener('input', renderMasterTable);
    });

    populateFilterDropdowns();
}

function populateFilterDropdowns() {
    const depts = Array.from(new Set([...KNOWN_DEPARTMENTS, ...state.orders.map(o => normalizeText(o.dept))])).filter(Boolean);
    const pubs = Array.from(new Set([...KNOWN_PUBLISHERS, ...state.orders.map(o => normalizeText(o.publisher))])).filter(Boolean);

    // Dept Filter
    const deptFilter = document.getElementById('deptFilter');
    const currentDeptVal = deptFilter.value;
    deptFilter.innerHTML = '<option value="">-- ทุกแผนกวิชา --</option>' + 
        depts.map(d => `<option value="${d}">${d}</option>`).join('');
    deptFilter.value = currentDeptVal;

    // Pub Filter
    const pubFilter = document.getElementById('pubFilter');
    const currentPubVal = pubFilter.value;
    pubFilter.innerHTML = '<option value="">-- ทุกสำนักพิมพ์ --</option>' + 
        pubs.map(p => `<option value="${p}">${p}</option>`).join('');
    pubFilter.value = currentPubVal;

    // Datalists for Modal Form
    document.getElementById('deptDatalist').innerHTML = depts.map(d => `<option value="${d}">`).join('');
    document.getElementById('pubDatalist').innerHTML = pubs.map(p => `<option value="${p}">`).join('');

    // Tab 3 Dual Selectors (Dept + Grade)
    const deptSelectTab = document.getElementById('deptSelectTab');
    const curDeptTabVal = deptSelectTab.value;
    deptSelectTab.innerHTML = '<option value="ALL">-- แสดงสรุปทุกแผนกวิชา --</option>' + 
        depts.map(d => `<option value="${d}">แผนก ${d}</option>`).join('');
    deptSelectTab.value = curDeptTabVal || 'ALL';
    deptSelectTab.onchange = renderDepartmentTab;

    const deptGradeSelectTab = document.getElementById('deptGradeSelectTab');
    deptGradeSelectTab.onchange = renderDepartmentTab;

    // Tab 4 Selector
    const pubSelectTab = document.getElementById('pubSelectTab');
    const curPubTabVal = pubSelectTab.value;
    pubSelectTab.innerHTML = '<option value="ALL">-- แสดงสรุปทุกสำนักพิมพ์ --</option>' + 
        pubs.map(p => `<option value="${p}">${p}</option>`).join('');
    pubSelectTab.value = curPubTabVal || 'ALL';
    pubSelectTab.onchange = renderPublisherTab;
}

function renderAllViews() {
    renderYearDropdownOptions();
    updateActiveTermHeader();
    populateFilterDropdowns();
    renderKPIs();
    renderSubjectCheckWidget();
    renderCharts();
    renderMasterTable();
    renderDepartmentTab();
    renderPublisherTab();
    renderSummaryReports();
}

// =========================================================
// 9. SUBJECT COUNT RE-CHECK WIDGET
// =========================================================
function getDetectedDeptGradePairs() {
    const allDepts = Array.from(new Set([...KNOWN_DEPARTMENTS, ...state.orders.map(o => normalizeText(o.dept))])).filter(Boolean);
    const grades = ['ปวช.1', 'ปวช.2', 'ปวช.3'];

    const pairs = [];
    allDepts.forEach(d => {
        grades.forEach(g => {
            pairs.push({ dept: d, grade: g, key: `${d}_${g}` });
        });
    });
    return pairs;
}

function renderSubjectCheckWidget() {
    const widgetCard = document.getElementById('subjectCheckWidget');
    const placeholder = document.getElementById('hiddenWidgetAdminPlaceholder');

    if (!state.showSubjectCheckDashboard) {
        widgetCard.classList.add('hidden');
        if (state.isAdmin) {
            placeholder.classList.remove('hidden');
        } else {
            placeholder.classList.add('hidden');
        }
        return;
    }

    widgetCard.classList.remove('hidden');
    placeholder.classList.add('hidden');

    const activeOrders = getFilteredOrdersByTerm();
    const grid = document.getElementById('subjectCheckGrid');
    grid.innerHTML = '';

    const pairs = getDetectedDeptGradePairs();

    pairs.forEach(p => {
        const targetCount = state.targetSubjects[p.key] !== undefined ? state.targetSubjects[p.key] : 0;
        
        const deptGradeOrders = activeOrders.filter(o => getNormalizedKey(o.dept) === getNormalizedKey(p.dept) && getNormalizedKey(o.grade) === getNormalizedKey(p.grade));
        const uniqueSubjectKeys = new Set(deptGradeOrders.map(o => getUniqueSubjectKey(o)));
        const actualCount = uniqueSubjectKeys.size;

        if (targetCount === 0 && actualCount === 0) return;

        const diff = actualCount - targetCount;
        let statusClass = 'status-ok';
        let statusBadgeText = `🟢 ครบถ้วน (${actualCount}/${targetCount})`;

        if (diff < 0) {
            statusClass = 'status-missing';
            statusBadgeText = `🟠 ขาดไป ${Math.abs(diff)} วิชา (${actualCount}/${targetCount})`;
        } else if (diff > 0) {
            statusClass = 'status-exceed';
            statusBadgeText = `🟣 สั่งเกิน ${diff} วิชา (${actualCount}/${targetCount})`;
        }

        const item = document.createElement('div');
        item.className = `check-item-card ${statusClass}`;
        item.innerHTML = `
            <div>
                <div class="check-title">${escapeHtml(p.dept)} - ${p.grade}</div>
                <div class="check-subtitle">เป้าหมายหลักสูตร: ${targetCount} วิชา | สั่งซื้อจริง: ${actualCount} วิชา (${deptGradeOrders.length} รายการคำสั่ง)</div>
            </div>
            <div class="check-status-badge">${statusBadgeText}</div>
        `;
        grid.appendChild(item);
    });

    if (grid.children.length === 0) {
        grid.innerHTML = `<p class="text-muted" style="grid-column: span 3;">- ยังไม่มีการกำหนดวิชาหรือสั่งซื้อสำหรับช่วงเทอมนี้ -</p>`;
    }
}

function initTargetConfigEvents() {
    const openTargetConfigBtn = document.getElementById('openTargetConfigBtn');
    const dashboardWidgetToggleBtn = document.getElementById('dashboardWidgetToggleBtn');
    const unhideWidgetDirectBtn = document.getElementById('unhideWidgetDirectBtn');
    const targetConfigModal = document.getElementById('targetConfigModal');
    const closeTargetConfigModalBtn = document.getElementById('closeTargetConfigModalBtn');
    const cancelTargetConfigBtn = document.getElementById('cancelTargetConfigBtn');
    const saveTargetConfigBtn = document.getElementById('saveTargetConfigBtn');

    const openConfigModal = () => {
        document.getElementById('showSubjectCheckDashboardToggle').checked = state.showSubjectCheckDashboard;
        
        const list = document.getElementById('targetConfigList');
        list.innerHTML = '';

        const pairs = getDetectedDeptGradePairs();

        pairs.forEach(p => {
            const val = state.targetSubjects[p.key] !== undefined ? state.targetSubjects[p.key] : 0;

            const div = document.createElement('div');
            div.className = 'target-config-item';
            div.innerHTML = `
                <label class="form-label" style="font-weight:600; font-size:0.85rem;">${p.dept} (${p.grade}):</label>
                <input type="number" min="0" value="${val}" data-key="${p.key}" class="form-input target-input-field" style="width:100%; margin-top:0.3rem;">
            `;
            list.appendChild(div);
        });

        targetConfigModal.classList.remove('hidden');
    };

    openTargetConfigBtn.addEventListener('click', openConfigModal);
    dashboardWidgetToggleBtn.addEventListener('click', openConfigModal);

    unhideWidgetDirectBtn.addEventListener('click', () => {
        state.showSubjectCheckDashboard = true;
        saveShowCheckToStorage();
        renderSubjectCheckWidget();
        showToast('แสดงกล่องรีเช็คจำนวนวิชาบน Dashboard แล้ว', 'success');
    });

    const closeModal = () => targetConfigModal.classList.add('hidden');
    closeTargetConfigModalBtn.addEventListener('click', closeModal);
    cancelTargetConfigBtn.addEventListener('click', closeModal);

    saveTargetConfigBtn.addEventListener('click', () => {
        state.showSubjectCheckDashboard = document.getElementById('showSubjectCheckDashboardToggle').checked;
        saveShowCheckToStorage();

        document.querySelectorAll('.target-input-field').forEach(input => {
            const key = input.getAttribute('data-key');
            state.targetSubjects[key] = Number(input.value) || 0;
        });

        saveTargetsToStorage();
        renderAllViews();
        closeModal();
        showToast('บันทึกการตั้งค่ารีเช็คจำนวนวิชาเรียบร้อยแล้ว', 'success');
    });
}

// =========================================================
// 10. DATABASE MAINTENANCE & YEAR PURGING
// =========================================================
function initManageDataEvents() {
    const manageDataBtn = document.getElementById('manageDataBtn');
    const manageDataModal = document.getElementById('manageDataModal');
    const closeManageDataModalBtn = document.getElementById('closeManageDataModalBtn');
    const closeManageDataFooterBtn = document.getElementById('closeManageDataFooterBtn');
    const addNewYearBtn = document.getElementById('addNewYearBtn');
    const purgeYearSelect = document.getElementById('purgeYearSelect');
    const backupYearBtn = document.getElementById('backupYearBtn');
    const purgeYearBtn = document.getElementById('purgeYearBtn');

    const updatePurgeDropdown = () => {
        const sortedYears = getAllYearsSortedDescending();
        purgeYearSelect.innerHTML = sortedYears.map(y => `<option value="${y}">ปีการศึกษา ${y}</option>`).join('');
    };

    manageDataBtn.addEventListener('click', () => {
        updatePurgeDropdown();
        manageDataModal.classList.remove('hidden');
    });

    const closeModal = () => manageDataModal.classList.add('hidden');
    closeManageDataModalBtn.addEventListener('click', closeModal);
    closeManageDataFooterBtn.addEventListener('click', closeModal);

    addNewYearBtn.addEventListener('click', () => {
        const yearVal = Number(document.getElementById('newYearInput').value);
        if (!yearVal || yearVal < 2550 || yearVal > 2650) {
            showToast('กรุณาป้อนปีการศึกษาให้ถูกต้อง (เช่น 2571)', 'danger');
            return;
        }

        if (!state.customYears.includes(yearVal)) {
            state.customYears.push(yearVal);
            saveCustomYearsToStorage();
            state.selectedYear = String(yearVal);
            renderAllViews();
            updatePurgeDropdown();
            document.getElementById('newYearInput').value = '';
            showToast(`เพิ่มปีการศึกษา ${yearVal} เข้าสู่ระบบสำเร็จ!`, 'success');
        } else {
            showToast(`ปีการศึกษา ${yearVal} มีอยู่ในระบบแล้ว`, 'info');
        }
    });

    backupYearBtn.addEventListener('click', () => {
        const yearToBackup = purgeYearSelect.value;
        const yearOrders = state.orders.filter(o => String(o.year) === String(yearToBackup));
        
        if (yearOrders.length === 0) {
            showToast(`ไม่พบรายการข้อมูลของปีการศึกษา ${yearToBackup} สำหรับสำรอง`, 'info');
            return;
        }

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(yearOrders, null, 2));
        const dlAnchor = document.createElement('a');
        dlAnchor.setAttribute("href", dataStr);
        dlAnchor.setAttribute("download", `Backup_FreeBook_${yearToBackup}.json`);
        document.body.appendChild(dlAnchor);
        dlAnchor.click();
        dlAnchor.remove();
        showToast(`สำรองข้อมูลปีการศึกษา ${yearToBackup} สำเร็จ!`, 'success');
    });

    purgeYearBtn.addEventListener('click', () => {
        const yearToPurge = purgeYearSelect.value;
        if (!yearToPurge) return;

        const count = state.orders.filter(o => String(o.year) === String(yearToPurge)).length;

        if (confirm(`⚠️ ยืนยันการลบข้อมูลและลบปีการศึกษา ${yearToPurge} ออกจากระบบเด็ดขาด?\n(รวมทั้งหมด ${count} รายการ ข้อมูลปีนี้และรายการปีการศึกษา ${yearToPurge} จะถูกลบออกเรียบร้อย)`)) {
            state.orders = state.orders.filter(o => String(o.year) !== String(yearToPurge));
            saveOrdersToStorage();

            state.customYears = state.customYears.filter(y => String(y) !== String(yearToPurge));
            saveCustomYearsToStorage();

            const remainingYears = getAllYearsSortedDescending();
            if (state.selectedYear === String(yearToPurge)) {
                state.selectedYear = remainingYears[0] ? String(remainingYears[0]) : 'ALL';
            }

            renderYearDropdownOptions();
            renderAllViews();
            updatePurgeDropdown();

            showToast(`ลบข้อมูลและลบปีการศึกษา ${yearToPurge} ออกจากระบบเรียบร้อยแล้ว`, 'danger');
        }
    });
}

// =========================================================
// 11. DASHBOARD KPIs & CHARTS
// =========================================================
function renderKPIs() {
    const activeOrders = getFilteredOrdersByTerm();

    const totalBudget = activeOrders.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);
    const totalCopies = activeOrders.reduce((sum, o) => sum + (Number(o.qty) || 0), 0);
    
    const uniqueSubjectsSet = new Set(activeOrders.map(o => getUniqueSubjectKey(o)));
    const totalUniqueSubjects = uniqueSubjectsSet.size;
    
    const activeDepts = new Set(activeOrders.map(o => normalizeText(o.dept))).size;
    const activePubs = new Set(activeOrders.map(o => normalizeText(o.publisher))).size;

    document.getElementById('kpiTotalBudget').innerText = formatCurrency(totalBudget) + ' ฿';
    document.getElementById('kpiTotalCopies').innerText = totalCopies.toLocaleString('th-TH') + ' เล่ม';
    document.getElementById('kpiTotalSubjects').innerText = totalUniqueSubjects.toLocaleString('th-TH') + ' รายวิชา';
    document.getElementById('kpiTotalDeptsPubs').innerText = `${activeDepts} แผนก / ${activePubs} ค่าย`;
}

function renderCharts() {
    const activeOrders = getFilteredOrdersByTerm();
    const isDark = state.theme === 'dark';
    const textColor = isDark ? '#cbd5e1' : '#334155';
    const gridColor = isDark ? '#334155' : '#e2e8f0';

    // 1. Department Budget Donut Chart
    const deptTotals = {};
    activeOrders.forEach(o => {
        const d = normalizeText(o.dept);
        deptTotals[d] = (deptTotals[d] || 0) + (Number(o.amount) || 0);
    });

    const deptLabels = Object.keys(deptTotals);
    const deptValues = Object.values(deptTotals);
    const deptColors = ['#2563eb', '#059669', '#d97706', '#7c3aed', '#ec4899', '#06b6d4'];

    const ctx1 = document.getElementById('deptBudgetChart').getContext('2d');
    if (state.charts.deptChart) state.charts.deptChart.destroy();
    state.charts.deptChart = new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: deptLabels.length ? deptLabels : ['ไม่มีข้อมูล'],
            datasets: [{
                data: deptValues.length ? deptValues : [0],
                backgroundColor: deptColors,
                borderWidth: 2,
                borderColor: isDark ? '#1e293b' : '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { color: textColor, font: { family: 'Prompt' } } },
                tooltip: {
                    callbacks: {
                        label: (ctx) => ` ${ctx.label}: ${formatCurrency(ctx.raw)} บาท`
                    }
                }
            }
        }
    });

    // 2. Publisher Budget Bar Chart
    const pubTotals = {};
    activeOrders.forEach(o => {
        const p = normalizeText(o.publisher);
        pubTotals[p] = (pubTotals[p] || 0) + (Number(o.amount) || 0);
    });

    const pubLabels = Object.keys(pubTotals);
    const pubValues = Object.values(pubTotals);

    const ctx2 = document.getElementById('pubBudgetChart').getContext('2d');
    if (state.charts.pubChart) state.charts.pubChart.destroy();
    state.charts.pubChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: pubLabels,
            datasets: [{
                label: 'งบประมาณ (บาท)',
                data: pubValues,
                backgroundColor: '#3b82f6',
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { ticks: { color: textColor, font: { family: 'Prompt' } }, grid: { display: false } },
                y: { ticks: { color: textColor, font: { family: 'Prompt' } }, grid: { color: gridColor } }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (ctx) => ` ${formatCurrency(ctx.raw)} บาท`
                    }
                }
            }
        }
    });

    // 3. Grade Level Comparison Chart
    const gradeDepts = Array.from(new Set(activeOrders.map(o => normalizeText(o.dept))));
    const grade1Data = gradeDepts.map(d => activeOrders.filter(o => getNormalizedKey(o.dept) === getNormalizedKey(d) && getNormalizedKey(o.grade) === 'ปวช.1').reduce((s, o) => s + o.amount, 0));
    const grade2Data = gradeDepts.map(d => activeOrders.filter(o => getNormalizedKey(o.dept) === getNormalizedKey(d) && getNormalizedKey(o.grade) === 'ปวช.2').reduce((s, o) => s + o.amount, 0));
    const grade3Data = gradeDepts.map(d => activeOrders.filter(o => getNormalizedKey(o.dept) === getNormalizedKey(d) && getNormalizedKey(o.grade) === 'ปวช.3').reduce((s, o) => s + o.amount, 0));

    const ctx3 = document.getElementById('gradeBudgetChart').getContext('2d');
    if (state.charts.gradeChart) state.charts.gradeChart.destroy();
    state.charts.gradeChart = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: gradeDepts,
            datasets: [
                { label: 'ปวช.1', data: grade1Data, backgroundColor: '#2563eb', borderRadius: 4 },
                { label: 'ปวช.2', data: grade2Data, backgroundColor: '#059669', borderRadius: 4 },
                { label: 'ปวช.3', data: grade3Data, backgroundColor: '#d97706', borderRadius: 4 }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { ticks: { color: textColor, font: { family: 'Prompt' } }, grid: { display: false } },
                y: { ticks: { color: textColor, font: { family: 'Prompt' } }, grid: { color: gridColor } }
            },
            plugins: {
                legend: { position: 'top', labels: { color: textColor, font: { family: 'Prompt' } } }
            }
        }
    });
}

// =========================================================
// 12. MASTER TABLE RENDER & CRUD
// =========================================================
function renderMasterTable() {
    const activeOrders = getFilteredOrdersByTerm();

    const search = normalizeText(document.getElementById('searchInput').value).toLowerCase();
    const dept = document.getElementById('deptFilter').value;
    const grade = document.getElementById('gradeFilter').value;
    const pub = document.getElementById('pubFilter').value;

    const filtered = activeOrders.filter(item => {
        const matchesSearch = !search || 
            item.title.toLowerCase().includes(search) || 
            item.code.toLowerCase().includes(search) || 
            (item.author && item.author.toLowerCase().includes(search));
        const matchesDept = !dept || getNormalizedKey(item.dept) === getNormalizedKey(dept);
        const matchesGrade = !grade || getNormalizedKey(item.grade) === getNormalizedKey(grade);
        const matchesPub = !pub || getNormalizedKey(item.publisher) === getNormalizedKey(pub);

        return matchesSearch && matchesDept && matchesGrade && matchesPub;
    });

    const tbody = document.getElementById('masterTableBody');
    tbody.innerHTML = '';

    let totalQty = 0;
    let totalAmount = 0;

    filtered.forEach((item, index) => {
        totalQty += Number(item.qty) || 0;
        totalAmount += Number(item.amount) || 0;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="text-center">${index + 1}</td>
            <td><span class="badge badge-term">${item.year}/${item.semester === 'ภาคเรียนที่ 1' ? 'T1' : 'T2'}</span></td>
            <td><span class="badge badge-dept">${escapeHtml(item.dept)}</span></td>
            <td><span class="badge badge-grade">${escapeHtml(item.grade)}</span></td>
            <td><code>${escapeHtml(item.code)}</code></td>
            <td><strong>${escapeHtml(item.title)}</strong></td>
            <td>${escapeHtml(item.author || '-')}</td>
            <td>${escapeHtml(item.publisher)}</td>
            <td class="text-right">${Number(item.qty).toLocaleString()}</td>
            <td class="text-right">${formatCurrency(item.price)}</td>
            <td class="text-right highlight-price">${formatCurrency(item.amount)} ฿</td>
            <td class="text-center admin-only ${state.isAdmin ? '' : 'hidden'}">
                <button class="btn-table-action edit" onclick="editBook('${item.id}')" title="แก้ไข">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn-table-action delete" onclick="deleteBook('${item.id}')" title="ลบ">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('filteredCount').innerText = filtered.length;
    document.getElementById('totalFilteredQty').innerText = totalQty.toLocaleString() + ' เล่ม';
    document.getElementById('totalFilteredAmount').innerText = formatCurrency(totalAmount) + ' ฿';
}

// =========================================================
// 13. DEPARTMENT VIEW WITH DUAL FILTER & GRADE SUB-GROUPS (TAB 3)
// =========================================================
function renderDepartmentTab() {
    const activeOrders = getFilteredOrdersByTerm();
    const selectedDept = document.getElementById('deptSelectTab').value;
    const selectedGrade = document.getElementById('deptGradeSelectTab').value;

    const container = document.getElementById('departmentDetailsView');
    container.innerHTML = '';

    const deptsToRender = selectedDept === 'ALL' 
        ? Array.from(new Set(activeOrders.map(o => normalizeText(o.dept))))
        : [selectedDept];

    if (deptsToRender.length === 0) {
        container.innerHTML = `<div class="filter-card text-center"><p class="text-muted">ไม่พบข้อมูลสั่งซื้อในเทอมนี้</p></div>`;
        return;
    }

    deptsToRender.forEach(deptName => {
        let deptOrders = activeOrders.filter(o => getNormalizedKey(o.dept) === getNormalizedKey(deptName));
        if (selectedGrade !== 'ALL') {
            deptOrders = deptOrders.filter(o => getNormalizedKey(o.grade) === getNormalizedKey(selectedGrade));
        }

        if (deptOrders.length === 0) {
            if (selectedDept !== 'ALL') {
                container.innerHTML = `<div class="filter-card text-center"><p class="text-muted">ไม่พบรายการสั่งซื้อสำหรับแผนก ${deptName} ${selectedGrade !== 'ALL' ? '('+selectedGrade+')' : ''} ในช่วงเทอมนี้</p></div>`;
            }
            return;
        }

        const deptQty = deptOrders.reduce((sum, o) => sum + o.qty, 0);
        const deptAmount = deptOrders.reduce((sum, o) => sum + o.amount, 0);
        const uniqueDeptSubjects = new Set(deptOrders.map(o => getUniqueSubjectKey(o))).size;

        const card = document.createElement('div');
        card.className = 'section-card mb-4';

        const availableGrades = selectedGrade === 'ALL' ? ['ปวช.1', 'ปวช.2', 'ปวช.3'] : [selectedGrade];
        let gradeSectionsHtml = '';

        availableGrades.forEach(gradeLevel => {
            const gradeOrders = deptOrders.filter(o => getNormalizedKey(o.grade) === getNormalizedKey(gradeLevel));
            if (gradeOrders.length === 0) return;

            const gQty = gradeOrders.reduce((s, o) => s + o.qty, 0);
            const gAmt = gradeOrders.reduce((s, o) => s + o.amount, 0);
            const gPrice = gradeOrders.reduce((s, o) => s + Number(o.price), 0);
            const gUniqueSubj = new Set(gradeOrders.map(o => getUniqueSubjectKey(o))).size;

            gradeSectionsHtml += `
                <div class="grade-sub-group mb-3" style="background:var(--bg-main); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
                    <div class="flex-between mb-2" style="border-bottom:1px solid var(--border-color); padding-bottom:0.4rem;">
                        <h4 style="color:var(--primary-color); font-size:0.95rem; font-weight:700;">
                            <i class="fa-solid fa-graduation-cap"></i> ระดับชั้น ${escapeHtml(gradeLevel)}
                        </h4>
                        <div class="section-summary-badges">
                            <span class="summary-pill" style="font-size:0.78rem;">วิชาเรียน: <strong>${gUniqueSubj}</strong> วิชา</span>
                            <span class="summary-pill" style="font-size:0.78rem;">จำนวนสั่ง: <strong>${gQty.toLocaleString()}</strong> เล่ม</span>
                            <span class="summary-pill" style="font-size:0.78rem;">รวมเงิน: <strong>${formatCurrency(gAmt)} ฿</strong></span>
                        </div>
                    </div>

                    <div class="table-container">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th style="width: 45px;">ลำดับ</th>
                                    <th>รหัสวิชา</th>
                                    <th>ชื่อหนังสือ / ชื่อวิชา</th>
                                    <th>ผู้แต่ง</th>
                                    <th>สำนักพิมพ์</th>
                                    <th class="text-right">จำนวน (เล่ม)</th>
                                    <th class="text-right">ราคา/เล่ม</th>
                                    <th class="text-right">รวมเงิน (บาท)</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${gradeOrders.map((item, idx) => `
                                    <tr>
                                        <td class="text-center">${idx + 1}</td>
                                        <td><code>${escapeHtml(item.code)}</code></td>
                                        <td><strong>${escapeHtml(item.title)}</strong></td>
                                        <td>${escapeHtml(item.author || '-')}</td>
                                        <td>${escapeHtml(item.publisher)}</td>
                                        <td class="text-right">${item.qty.toLocaleString()}</td>
                                        <td class="text-right">${formatCurrency(item.price)}</td>
                                        <td class="text-right highlight-price">${formatCurrency(item.amount)} ฿</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                            <tfoot>
                                <tr style="background-color: var(--bg-card); font-weight: 600;">
                                    <td colspan="6" class="text-right">รวมยอดทั้งหมด (เช็คยอด 1,000 บาท/คน):</td>
                                    <td class="text-right" style="color: ${gPrice > 1000 ? '#ef4444' : 'inherit'};">${formatCurrency(gPrice)}</td>
                                    <td class="text-right highlight-price">${formatCurrency(gAmt)} ฿</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            `;
        });

        card.innerHTML = `
            <div class="section-card-header">
                <h3 class="section-card-title">
                    <i class="fa-solid fa-layer-group"></i> แผนกวิชา${escapeHtml(deptName)}
                </h3>
                <div class="section-summary-badges">
                    <span class="summary-pill">วิชาเรียนรวม: <strong>${uniqueDeptSubjects}</strong> รายวิชา</span>
                    <span class="summary-pill">จำนวนเล่มรวม: <strong>${deptQty.toLocaleString()}</strong> เล่ม</span>
                    <span class="summary-pill" style="background:var(--primary-light);">งบประมาณรวมแผนก: <strong>${formatCurrency(deptAmount)} ฿</strong></span>
                </div>
            </div>
            ${gradeSectionsHtml}
        `;
        container.appendChild(card);
    });
}

function renderPublisherTab() {
    const activeOrders = getFilteredOrdersByTerm();
    const selectedPub = document.getElementById('pubSelectTab').value;
    const container = document.getElementById('publisherDetailsView');
    container.innerHTML = '';

    const pubsToRender = selectedPub === 'ALL' 
        ? Array.from(new Set([...KNOWN_PUBLISHERS, ...activeOrders.map(o => normalizeText(o.publisher))]))
        : [selectedPub];

    pubsToRender.forEach(pubName => {
        const pubOrders = activeOrders.filter(o => getNormalizedKey(o.publisher) === getNormalizedKey(pubName));
        const pubQty = pubOrders.reduce((sum, o) => sum + o.qty, 0);
        const pubAmount = pubOrders.reduce((sum, o) => sum + o.amount, 0);
        
        const uniquePubSubjects = new Set(pubOrders.map(o => getUniqueSubjectKey(o))).size;

        const card = document.createElement('div');
        card.className = 'section-card';
        card.innerHTML = `
            <div class="section-card-header">
                <h3 class="section-card-title">
                    <i class="fa-solid fa-print"></i> ${escapeHtml(pubName)}
                </h3>
                <div class="section-summary-badges">
                    <span class="summary-pill">จำนวนวิชา: <strong>${uniquePubSubjects}</strong> รายวิชา (${pubOrders.length} รายการคำสั่ง)</span>
                    <span class="summary-pill">ยอดสั่งรวม: <strong>${pubQty.toLocaleString()}</strong> เล่ม</span>
                    <span class="summary-pill">รวมเป็นเงิน: <strong>${formatCurrency(pubAmount)} ฿</strong></span>
                </div>
            </div>
            ${pubOrders.length > 0 ? `
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th style="width: 50px;">ลำดับ</th>
                                <th>แผนกวิชา</th>
                                <th>ระดับชั้น</th>
                                <th>รหัสวิชา</th>
                                <th>ชื่อหนังสือ</th>
                                <th>ผู้แต่ง</th>
                                <th class="text-right">จำนวน</th>
                                <th class="text-right">ราคา/เล่ม</th>
                                <th class="text-right">รวมเงิน</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${pubOrders.map((item, idx) => `
                                <tr>
                                    <td class="text-center">${idx + 1}</td>
                                    <td><span class="badge badge-dept">${escapeHtml(item.dept)}</span></td>
                                    <td><span class="badge badge-grade">${escapeHtml(item.grade)}</span></td>
                                    <td><code>${escapeHtml(item.code)}</code></td>
                                    <td><strong>${escapeHtml(item.title)}</strong></td>
                                    <td>${escapeHtml(item.author || '-')}</td>
                                    <td class="text-right">${item.qty.toLocaleString()}</td>
                                    <td class="text-right">${formatCurrency(item.price)}</td>
                                    <td class="text-right highlight-price">${formatCurrency(item.amount)} ฿</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            ` : `
                <p class="text-muted" style="padding: 0.5rem 0;">- ไม่มีรายการสั่งซื้อกับสำนักพิมพ์นี้ในเทอมนี้ -</p>
            `}
        `;
        container.appendChild(card);
    });
}

// =========================================================
// 14. SUMMARY REPORTS & OFFICIAL สอศ. FORM (TAB 5)
// =========================================================
function renderSummaryReports() {
    const activeOrders = getFilteredOrdersByTerm();

    // 1. Department & Grade Summary Table
    const depts = Array.from(new Set([...KNOWN_DEPARTMENTS, ...activeOrders.map(o => normalizeText(o.dept))]));
    const tbody1 = document.getElementById('summaryDeptGradeTableBody');
    tbody1.innerHTML = '';

    let grandG1 = 0, grandG2 = 0, grandG3 = 0, grandTotal = 0;

    depts.forEach((dept, idx) => {
        const g1 = activeOrders.filter(o => getNormalizedKey(o.dept) === getNormalizedKey(dept) && getNormalizedKey(o.grade) === 'ปวช.1').reduce((s, o) => s + o.amount, 0);
        const g2 = activeOrders.filter(o => getNormalizedKey(o.dept) === getNormalizedKey(dept) && getNormalizedKey(o.grade) === 'ปวช.2').reduce((s, o) => s + o.amount, 0);
        const g3 = activeOrders.filter(o => getNormalizedKey(o.dept) === getNormalizedKey(dept) && getNormalizedKey(o.grade) === 'ปวช.3').reduce((s, o) => s + o.amount, 0);
        const rowSum = g1 + g2 + g3;

        grandG1 += g1;
        grandG2 += g2;
        grandG3 += g3;
        grandTotal += rowSum;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="text-center">${idx + 1}</td>
            <td><strong>${escapeHtml(dept)}</strong></td>
            <td class="text-right">${g1 > 0 ? formatCurrency(g1) : '-'}</td>
            <td class="text-right">${g2 > 0 ? formatCurrency(g2) : '-'}</td>
            <td class="text-right">${g3 > 0 ? formatCurrency(g3) : '-'}</td>
            <td class="text-right"><strong>${rowSum > 0 ? formatCurrency(rowSum) + ' ฿' : '-'}</strong></td>
            <td></td>
        `;
        tbody1.appendChild(tr);
    });

    document.getElementById('sumGrade1').innerText = formatCurrency(grandG1);
    document.getElementById('sumGrade2').innerText = formatCurrency(grandG2);
    document.getElementById('sumGrade3').innerText = formatCurrency(grandG3);
    document.getElementById('sumGradeTotal').innerText = formatCurrency(grandTotal) + ' ฿';

    // 2. Publisher Summary Table
    const tbody2 = document.getElementById('summaryPublisherTableBody');
    tbody2.innerHTML = '';

    let grandCopies = 0, grandPubAmount = 0;
    const globalUniquePubSubjects = new Set();
    const allPubs = Array.from(new Set([...KNOWN_PUBLISHERS, ...activeOrders.map(o => normalizeText(o.publisher))]));

    allPubs.forEach((pub, idx) => {
        const pubOrders = activeOrders.filter(o => getNormalizedKey(o.publisher) === getNormalizedKey(pub));
        
        const pubUniqueSet = new Set(pubOrders.map(o => getUniqueSubjectKey(o)));
        const itemCount = pubUniqueSet.size;

        pubUniqueSet.forEach(key => globalUniquePubSubjects.add(key));

        const copyCount = pubOrders.reduce((s, o) => s + o.qty, 0);
        const pubAmt = pubOrders.reduce((s, o) => s + o.amount, 0);

        if (itemCount === 0 && copyCount === 0) return; // Hide empty rows for dynamically added publishers with 0 orders

        grandCopies += copyCount;
        grandPubAmount += pubAmt;

        const pct = grandTotal > 0 ? ((pubAmt / grandTotal) * 100).toFixed(1) : '0.0';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="text-center">${idx + 1}</td>
            <td><strong>${escapeHtml(pub)}</strong></td>
            <td class="text-center">${itemCount > 0 ? itemCount : '-'}</td>
            <td class="text-right">${copyCount > 0 ? copyCount.toLocaleString() : '-'}</td>
            <td class="text-right"><strong>${pubAmt > 0 ? formatCurrency(pubAmt) : '-'}</strong></td>
            <td class="text-center">${pubAmt > 0 ? pct + '%' : '-'}</td>
        `;
        tbody2.appendChild(tr);
    });

    document.getElementById('sumPubItems').innerText = globalUniquePubSubjects.size;
    document.getElementById('sumPubCopies').innerText = grandCopies.toLocaleString();
    document.getElementById('sumPubAmount').innerText = formatCurrency(grandPubAmount) + ' ฿';
}

// =========================================================
// 15. FORM & MODAL ACTIONS (ADD / EDIT / DELETE WITH AUTO-MERGE)
// =========================================================
function initFormEvents() {
    const bookModal = document.getElementById('bookModal');
    const addBookBtn = document.getElementById('addBookBtn');
    const closeBookModalBtn = document.getElementById('closeBookModalBtn');
    const cancelBookBtn = document.getElementById('cancelBookBtn');
    const bookForm = document.getElementById('bookForm');

    const bookQty = document.getElementById('bookQty');
    const bookPrice = document.getElementById('bookPrice');
    const calcTotalAmount = document.getElementById('calcTotalAmount');

    const updateCalculatedPrice = () => {
        const q = Number(bookQty.value) || 0;
        const p = Number(bookPrice.value) || 0;
        calcTotalAmount.innerText = formatCurrency(q * p) + ' บาท';
    };

    bookQty.addEventListener('input', updateCalculatedPrice);
    bookPrice.addEventListener('input', updateCalculatedPrice);

    addBookBtn.addEventListener('click', () => {
        document.getElementById('modalTitle').innerText = 'เพิ่มรายการหนังสือใหม่';
        document.getElementById('editBookId').value = '';
        bookForm.reset();
        document.getElementById('bookYear').value = state.selectedYear === 'ALL' ? '2569' : state.selectedYear;
        document.getElementById('bookSemester').value = state.selectedSemester === 'ALL' ? 'ภาคเรียนที่ 1' : state.selectedSemester;
        bookQty.value = 180;
        bookPrice.value = 100;
        updateCalculatedPrice();
        bookModal.classList.remove('hidden');
    });

    const closeModal = () => bookModal.classList.add('hidden');
    closeBookModalBtn.addEventListener('click', closeModal);
    cancelBookBtn.addEventListener('click', closeModal);

    bookForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const editId = document.getElementById('editBookId').value;
        const year = Number(document.getElementById('bookYear').value) || 2569;
        const semester = document.getElementById('bookSemester').value;
        
        // Clean & Normalize Text Input Fields
        const dept = normalizeText(document.getElementById('bookDept').value);
        const grade = normalizeText(document.getElementById('bookGrade').value);
        const code = normalizeText(document.getElementById('bookCode').value);
        const title = normalizeText(document.getElementById('bookTitle').value);
        const author = normalizeText(document.getElementById('bookAuthor').value);
        const publisher = normalizeText(document.getElementById('bookPublisher').value);
        
        const qty = Number(bookQty.value) || 0;
        const price = Number(bookPrice.value) || 0;
        const amount = qty * price;

        if (editId) {
            const index = state.orders.findIndex(o => o.id === editId);
            if (index !== -1) {
                state.orders[index] = {
                    ...state.orders[index],
                    year, semester, dept, grade, code, title, author, publisher, qty, price, amount
                };
                showToast('อัปเดตข้อมูลหนังสือเรียบร้อยแล้ว', 'success');
            }
        } else {
            // FIX: AUTO-MERGING if exact same (year, semester, dept, grade, code, title, publisher) exists!
            const existingIndex = state.orders.findIndex(o => 
                o.year === year &&
                o.semester === semester &&
                getNormalizedKey(o.dept) === getNormalizedKey(dept) &&
                getNormalizedKey(o.grade) === getNormalizedKey(grade) &&
                getNormalizedKey(o.code) === getNormalizedKey(code) &&
                getNormalizedKey(o.title) === getNormalizedKey(title) &&
                getNormalizedKey(o.publisher) === getNormalizedKey(publisher)
            );

            if (existingIndex !== -1) {
                state.orders[existingIndex].qty += qty;
                state.orders[existingIndex].price = price;
                state.orders[existingIndex].amount = state.orders[existingIndex].qty * price;
                showToast(`🔄 พบวิชาเดียวกันสำหรับ ${dept} (${grade}) ระบบได้รวมจำนวนเป็น ${state.orders[existingIndex].qty} เล่มเรียบร้อยแล้ว`, 'success');
            } else {
                const newId = 'BK-' + String(state.orders.length + 1).padStart(3, '0');
                state.orders.push({
                    id: newId,
                    year, semester, itemNo: state.orders.length + 1,
                    dept, grade, code, title, author, publisher, qty, price, amount
                });
                showToast('เพิ่มรายการหนังสือใหม่สำเร็จ', 'success');
            }

            if (!state.customYears.includes(year)) {
                state.customYears.push(year);
                saveCustomYearsToStorage();
            }
        }

        saveOrdersToStorage();
        renderAllViews();
        closeModal();
    });

    document.getElementById('resetDataBtn').addEventListener('click', () => {
        if (confirm('คุณต้องการรีเซ็ตข้อมูลทั้งหมดกลับเป็นไฟล์ต้นแบบของวิทยาลัยเทคนิคอุดรธานีหรือไม่?')) {
            state.orders = [...INITIAL_ORDERS_DATA];
            state.customYears = [2569];
            saveCustomYearsToStorage();
            saveOrdersToStorage();
            renderAllViews();
            showToast('รีเซ็ตข้อมูลกลับเป็นต้นแบบเรียบร้อย', 'info');
        }
    });
}

function editBook(id) {
    const item = state.orders.find(o => o.id === id);
    if (!item) return;

    document.getElementById('modalTitle').innerText = 'แก้ไขรายการหนังสือ';
    document.getElementById('editBookId').value = item.id;
    document.getElementById('bookYear').value = item.year || 2569;
    document.getElementById('bookSemester').value = item.semester || 'ภาคเรียนที่ 1';
    document.getElementById('bookDept').value = item.dept;
    document.getElementById('bookGrade').value = item.grade;
    document.getElementById('bookCode').value = item.code;
    document.getElementById('bookTitle').value = item.title;
    document.getElementById('bookAuthor').value = item.author || '';
    document.getElementById('bookPublisher').value = item.publisher;
    document.getElementById('bookQty').value = item.qty;
    document.getElementById('bookPrice').value = item.price;
    document.getElementById('calcTotalAmount').innerText = formatCurrency(item.amount) + ' บาท';

    document.getElementById('bookModal').classList.remove('hidden');
}

function deleteBook(id) {
    const item = state.orders.find(o => o.id === id);
    if (!item) return;

    if (confirm(`คุณต้องการลบรายการ "${item.title}" (${item.dept}) ใช่หรือไม่?`)) {
        state.orders = state.orders.filter(o => o.id !== id);
        saveOrdersToStorage();
        renderAllViews();
        showToast(`ลบรายการ "${item.title}" สำเร็จ`, 'danger');
    }
}

// =========================================================
// 16. EXPORT CSV & MULTI-TAB PDF PRINT FIX
// =========================================================
function initExportEvents() {
    document.getElementById('exportExcelBtn').addEventListener('click', () => {
        const activeOrders = getFilteredOrdersByTerm();
        let csvContent = "\uFEFF";
        csvContent += "ปีการศึกษา,ภาคเรียน,ลำดับ,แผนกวิชา,ระดับชั้น,รหัสวิชา,ชื่อหนังสือ,ผู้แต่ง,สำนักพิมพ์,จำนวน,ราคาต่อเล่ม,รวมเงิน\n";

        activeOrders.forEach((o, i) => {
            csvContent += `"${o.year}","${o.semester}","${i+1}","${o.dept}","${o.grade}","${o.code}","${o.title}","${o.author || ''}","${o.publisher}","${o.qty}","${o.price}","${o.amount}"\n`;
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", `รายการสั่งหนังสือฟรี_ปวช_${state.selectedYear}_${state.selectedSemester}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('ส่งออกไฟล์ CSV/Excel สำเร็จ!', 'success');
    });

    document.getElementById('globalPrintBtn').addEventListener('click', () => {
        window.print();
    });

    document.getElementById('exportPdfBtn').addEventListener('click', () => {
        const activeTabEl = document.querySelector('.tab-content.active');
        let targetEl = activeTabEl.querySelector('.printable-area-target') || activeTabEl;

        showToast('กำลังสร้างไฟล์ PDF จากหน้าที่แสดงผล...', 'info');

        const opt = {
            margin: 10,
            filename: `รายการหนังสือเรียนฟรี_${state.selectedYear}_${state.selectedSemester}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(targetEl).save().then(() => {
            showToast('บันทึก PDF สำเร็จ!', 'success');
        });
    });
}

// =========================================================
// 17. UTILS & TOASTS
// =========================================================
function formatCurrency(val) {
    return Number(val || 0).toLocaleString('th-TH', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let iconClass = 'fa-info-circle';
    if (type === 'success') iconClass = 'fa-check-circle';
    if (type === 'danger') iconClass = 'fa-exclamation-circle';

    toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}
