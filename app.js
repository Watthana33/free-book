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
let firebaseConfigStr = "";
let isFirebaseConnected = false;
let firebaseApp = null;
let firebaseDb = null;

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
    showEstimateTab: true,
    studentPopulations: {},
    showStudentPopulation: true,
    parsedExcelOrders: [],
    charts: {},
    curriculumPlans: [],
    isAuditEnabled: false,
    approvedSubstitutions: {}
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
    try {
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
    initAuditEvents();
    initEstimateEvents();
    initPopulationEvents();
    
    renderAllViews();
    } catch (error) {
        alert("CRITICAL ERROR IN APP.JS: " + error.message + "\n" + error.stack);
        console.error(error);
    }
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
    
    const savedSubs = localStorage.getItem('freebook_approved_subs');
    if (savedSubs) { try { state.approvedSubstitutions = JSON.parse(savedSubs); } catch(e) {} }
    if (!state.approvedSubstitutions) state.approvedSubstitutions = {};
    
    const savedYear = localStorage.getItem('freebook_selected_year');
    if (savedYear) state.selectedYear = savedYear;

    const savedSemester = localStorage.getItem('freebook_selected_semester');
    if (savedSemester) state.selectedSemester = savedSemester;

    const savedAdmin = localStorage.getItem('freebook_is_admin');
    state.isAdmin = savedAdmin === 'true';

    const savedColors = localStorage.getItem('freebook_chart_colors');
    if (savedColors) {
        try { state.chartColors = JSON.parse(savedColors); } catch(e) {}
    }
    if (!state.chartColors) {
        state.chartColors = {
            hist1: '#94a3b8',
            plan: '#64748b',
            rec: '#4ade80',
            alloc: '#3b82f6'
        };
    }

    const savedPassHash = localStorage.getItem('freebook_admin_pass_hash');
    if (savedPassHash) state.adminPassHash = savedPassHash;

    const savedEstimates = localStorage.getItem('freebook_student_estimates');
    if (savedEstimates) {
        try { state.studentEstimates = JSON.parse(savedEstimates); } catch(e){}
    }
    if (!state.studentEstimates) state.studentEstimates = {};
    
    const savedPopulations = localStorage.getItem('freebook_student_populations');
    if (savedPopulations) {
        try { state.studentPopulations = JSON.parse(savedPopulations); } catch(e){}
    }
    if (!state.studentPopulations) state.studentPopulations = {};

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
    
    const savedEstimateTab = localStorage.getItem('freebook_show_estimate_tab');
    if (savedEstimateTab !== null) state.showEstimateTab = savedEstimateTab === 'true';

    const savedPopTab = localStorage.getItem('freebook_show_student_population');
    if (savedPopTab !== null) state.showStudentPopulation = savedPopTab === 'true';

    const savedAuditEnabled = localStorage.getItem('freebook_audit_enabled');
    if (savedAuditEnabled !== null) state.isAuditEnabled = savedAuditEnabled === 'true';

    const savedCurriculum = localStorage.getItem('freebook_curriculum_plans');
    if (savedCurriculum) {
        try { 
            const parsed = JSON.parse(savedCurriculum); 
            state.curriculumPlans = Array.isArray(parsed) ? parsed : [];
        } catch(e){
            state.curriculumPlans = [];
        }
    }

    updateAdminUI();
}


async function syncToFirebase(type, data) {
    if (isFirebaseConnected && firebaseDb) {
        try {
            await firebaseDb.ref('state/' + type).set(data);
        } catch (e) {
            console.error("Firebase SET error:", e);
        }
    }
}


function saveSelectedTermToStorage() {
    localStorage.setItem('freebook_selected_year', state.selectedYear);
    localStorage.setItem('freebook_selected_semester', state.selectedSemester);
}

function saveOrdersToStorage() {
    localStorage.setItem('freebook_orders', JSON.stringify(state.orders));
    syncToFirebase('orders', state.orders);
}

function saveCustomYearsToStorage() {
    localStorage.setItem('freebook_custom_years', JSON.stringify(state.customYears));
    syncToFirebase('customYears', state.customYears);
}

function saveTargetsToStorage() {
    localStorage.setItem('freebook_target_subjects', JSON.stringify(state.targetSubjects));
    syncToFirebase('targetSubjects', state.targetSubjects);
                syncToFirebase('studentEstimates', state.studentEstimates || {});
}

function saveShowCheckToStorage() {
    localStorage.setItem('freebook_show_check_dashboard', state.showSubjectCheckDashboard);
    syncToFirebase('showSubjectCheckDashboard', state.showSubjectCheckDashboard);
}

function savePopulationsToStorage() {
    localStorage.setItem('freebook_student_populations', JSON.stringify(state.studentPopulations));
    syncToFirebase('studentPopulations', state.studentPopulations);
}

function saveShowPopulationToStorage() {
    localStorage.setItem('freebook_show_student_population', state.showStudentPopulation);
    syncToFirebase('showStudentPopulation', state.showStudentPopulation);
}

function saveCurriculumToStorage() {
    localStorage.setItem('freebook_curriculum_plans', JSON.stringify(state.curriculumPlans));
    syncToFirebase('curriculumPlans', state.curriculumPlans);
}

function saveAuditToggleToStorage() {
    localStorage.setItem('freebook_audit_enabled', state.isAuditEnabled);
    syncToFirebase('isAuditEnabled', state.isAuditEnabled);
}

function initDate() {
    const today = new Date();
    const thaiMonths = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
    const formatted = `${today.getDate()} ${thaiMonths[today.getMonth()]} พ.ศ. ${today.getFullYear() + 543}`;
    const dateEl = document.getElementById('reportPrintDate');
    if (dateEl) dateEl.innerText = formatted;
}

function normalizeCode(str) {
    if (!str) return '';
    // Remove all spaces and dashes, convert to uppercase for robust matching
    return String(str).replace(/[\s\-]/g, '').trim().toUpperCase();
}

function getUniqueSubjectKey(o) {
    // Only use normalized code to determine uniqueness, preventing issues with varying titles
    return normalizeCode(o.code);
}

// =========================================================
// 4. GOOGLE SHEETS SYNC
// =========================================================

async function initFirebaseConnection() {
    // Default config to ensure all devices/incognito modes can connect automatically
    const DEFAULT_CONFIG = {
        "apiKey": "AIzaSyAHUjcTlxOTGepWj8nRyfR9K8wwLx5EIvM",
        "authDomain": "udontc-freebook.firebaseapp.com",
        "databaseURL": "https://udontc-freebook-default-rtdb.asia-southeast1.firebasedatabase.app",
        "projectId": "udontc-freebook",
        "storageBucket": "udontc-freebook.firebasestorage.app",
        "messagingSenderId": "410467848837",
        "appId": "1:410467848837:web:68a1f9ebe56815cd1acfec",
        "measurementId": "G-HK4E3GCKFJ"
    };

    firebaseConfigStr = localStorage.getItem('freebook_firebase_config') || "";
    let config;

    const isDisabled = localStorage.getItem('freebook_firebase_disabled') === 'true';
    if (isDisabled) {
        updateFirebaseStatusUI(false);
        isFirebaseConnected = false;
        return;
    }

    if (!firebaseConfigStr) {
        config = DEFAULT_CONFIG;
        firebaseConfigStr = JSON.stringify(config);
        localStorage.setItem('freebook_firebase_config', firebaseConfigStr);
    } else {
        try {
            config = JSON.parse(firebaseConfigStr);
        } catch(e) {
            config = DEFAULT_CONFIG;
        }
    }

    try {
        if (!firebase.apps.length) {
            firebaseApp = firebase.initializeApp(config);
        } else {
            firebaseApp = firebase.app();
        }
        firebaseDb = firebase.database();
        
        updateFirebaseStatusUI(true, "กำลังซิงค์...");
        
        // Setup Realtime Listener
        firebaseDb.ref('state').on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                let dataUpdated = false;
                if (data.orders && Array.isArray(data.orders) && data.orders.length > 0) {
                    state.orders = data.orders;
                    localStorage.setItem('freebook_orders', JSON.stringify(data.orders));
                    dataUpdated = true;
                }
                if (data.customYears && Array.isArray(data.customYears) && data.customYears.length > 0) {
                    state.customYears = data.customYears;
                    localStorage.setItem('freebook_custom_years', JSON.stringify(data.customYears));
                }
                if (data.targetSubjects && Object.keys(data.targetSubjects).length > 0) {
                    state.targetSubjects = data.targetSubjects;
                    localStorage.setItem('freebook_target_subjects', JSON.stringify(data.targetSubjects));
                }
                if (data.showSubjectCheckDashboard !== undefined) {
                    state.showSubjectCheckDashboard = data.showSubjectCheckDashboard;
                    localStorage.setItem('freebook_show_check_dashboard', state.showSubjectCheckDashboard);
                }
                if (data.showEstimateTab !== undefined) {
                    state.showEstimateTab = data.showEstimateTab;
                    localStorage.setItem('freebook_show_estimate_tab', state.showEstimateTab);
                }
                if (data.showStudentPopulation !== undefined) {
                    state.showStudentPopulation = data.showStudentPopulation;
                    localStorage.setItem('freebook_show_student_population', state.showStudentPopulation);
                }
                if (data.studentPopulations) {
                    state.studentPopulations = data.studentPopulations;
                    localStorage.setItem('freebook_student_populations', JSON.stringify(state.studentPopulations));
                }
                if (data.curriculumPlans !== undefined) {
                    let plans = data.curriculumPlans || [];
                    if (typeof plans === 'object' && !Array.isArray(plans)) {
                        plans = Object.values(plans).filter(Boolean);
                    }
                    state.curriculumPlans = Array.isArray(plans) ? plans : [];
                    localStorage.setItem('freebook_curriculum_plans', JSON.stringify(state.curriculumPlans));
                    dataUpdated = true;
                }
                if (data.approvedSubstitutions) {
                    state.approvedSubstitutions = data.approvedSubstitutions;
                    localStorage.setItem('freebook_approved_subs', JSON.stringify(state.approvedSubstitutions));
                }
                if (data.isAuditEnabled !== undefined) {
                    state.isAuditEnabled = data.isAuditEnabled;
                    localStorage.setItem('freebook_audit_enabled', state.isAuditEnabled);
                    dataUpdated = true;
                }
                
                if (dataUpdated) renderAllViews();
                renderYearDropdownOptions();
                renderSubjectCheckWidget();
                
                isFirebaseConnected = true;
                updateFirebaseStatusUI(true, 'เชื่อมต่อ Firebase แบบ Realtime แล้ว');
            } else {
                // Firebase is empty, initialize it with local state
                isFirebaseConnected = true;
                syncToFirebase('orders', state.orders);
                syncToFirebase('customYears', state.customYears);
                syncToFirebase('targetSubjects', state.targetSubjects);
                syncToFirebase('studentEstimates', state.studentEstimates || {});
                syncToFirebase('showSubjectCheckDashboard', state.showSubjectCheckDashboard);
                syncToFirebase('studentPopulations', state.studentPopulations || {});
                syncToFirebase('showStudentPopulation', state.showStudentPopulation);
                syncToFirebase('showEstimateTab', state.showEstimateTab);
                syncToFirebase('curriculumPlans', state.curriculumPlans);
                syncToFirebase('isAuditEnabled', state.isAuditEnabled);
                updateFirebaseStatusUI(true, 'เชื่อมต่อ Firebase และอัปโหลดข้อมูลเริ่มต้นแล้ว');
            }
        });
        
    } catch (e) {
        console.error("Firebase connection failed:", e);
        isFirebaseConnected = false;
        updateFirebaseStatusUI(false, 'เชื่อมต่อล้มเหลว');
    }
}

function updateFirebaseStatusUI(connected, customText) {
    const dot = document.getElementById('firebaseStatusDot');
    const text = document.getElementById('firebaseStatusText');
    const icon = document.getElementById('cloudStatusIcon');

    if (connected) {
        if (dot) dot.style.color = '#10b981';
        if (text) text.innerText = customText || 'เชื่อมต่อ Firebase แล้ว';
        if (icon) {
            icon.className = 'fa-solid fa-cloud';
            icon.style.color = '#10b981';
        }
    } else {
        if (dot) dot.style.color = '#ef4444';
        if (text) text.innerText = customText || 'ใช้งานฐานข้อมูลเครื่อง (Local)';
        if (icon) {
            icon.className = 'fa-solid fa-cloud'; // Changed from fa-cloud-slash to fix rendering
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
        firebaseConfigInput.value = localStorage.getItem('freebook_firebase_config') || "";
        firebaseConfigError.classList.add('hidden');
        firebaseConfigModal.classList.remove('hidden');
    };

    cloudStatusBtn.addEventListener('click', openModal);
    if (firebaseStatusBadge) firebaseStatusBadge.addEventListener('click', openModal);

    const closeModal = () => firebaseConfigModal.classList.add('hidden');
    if (closeFirebaseModalBtn) closeFirebaseModalBtn.addEventListener('click', closeModal);

    if (saveFirebaseConfigBtn) {
        saveFirebaseConfigBtn.addEventListener('click', async () => {
            if (!state.isAdmin) return;

            const rawConfig = firebaseConfigInput.value.trim();
            let parsedConfig = null;

            try {
                // Try strict JSON first
                parsedConfig = JSON.parse(rawConfig);
            } catch(e) {
                // If it fails, try to extract it from JS object format (const firebaseConfig = {...})
                try {
                    const match = rawConfig.match(/\{[\s\S]*\}/);
                    if (match) {
                        parsedConfig = new Function('return ' + match[0])();
                    } else {
                        throw new Error();
                    }
                } catch (err) {
                    firebaseConfigError.innerText = 'รูปแบบไม่ถูกต้อง โปรดคัดลอกโค้ดมาให้ครบถ้วน';
                    firebaseConfigError.classList.remove('hidden');
                    return;
                }
            }

            if (!parsedConfig || !parsedConfig.databaseURL) {
                firebaseConfigError.innerText = 'ไม่พบ databaseURL ใน Config กรุณาตรวจสอบให้แน่ใจว่าคัดลอกมาครบ';
                firebaseConfigError.classList.remove('hidden');
                return;
            }

            firebaseConfigError.classList.add('hidden');
            saveFirebaseConfigBtn.disabled = true;
            saveFirebaseConfigBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังตรวจสอบ...';

            localStorage.setItem('freebook_firebase_config', JSON.stringify(parsedConfig));
            localStorage.removeItem('freebook_firebase_disabled');
            
            // Simple reload to initialize Firebase cleanly
            window.location.reload();
        });
    }

    if (disconnectFirebaseBtn) {
        disconnectFirebaseBtn.addEventListener('click', () => {
            if (!state.isAdmin) return;

            if (confirm('ยกเลิกการเชื่อมต่อ Firebase และกลับไปใช้ LocalStorage หรือไม่?')) {
                localStorage.removeItem('freebook_firebase_config');
                localStorage.setItem('freebook_firebase_disabled', 'true');
                isFirebaseConnected = false;
                firebaseConfigStr = "";
                updateFirebaseStatusUI(false);
                closeModal();
                showToast('สลับกลับมาใช้ฐานข้อมูลในเครื่อง (LocalStorage)', 'info');
                setTimeout(() => window.location.reload(), 1000);
            }
        });
    }
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
        saveSelectedTermToStorage();
        renderAllViews();
    };

    yearSelect.addEventListener('change', onTermChange);
    semSelect.addEventListener('change', onTermChange);

    // Sync UI with state
    if (state.selectedSemester) {
        semSelect.value = state.selectedSemester;
        Array.from(semSelect.options).forEach(opt => {
            if (opt.value === state.selectedSemester) {
                opt.selected = true;
            }
        });
    }
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

        if (importMode === 'replace_all') {
            state.orders = [];
        } else if (importMode === 'replace_term') {
            // ล้างข้อมูลเฉพาะภาคเรียนและปีการศึกษาที่มีในไฟล์ Excel นี้ทิ้งไปก่อน
            const termsInExcel = new Set(state.parsedExcelOrders.map(o => `${o.year}__${o.semester}`));
            state.orders = state.orders.filter(o => !termsInExcel.has(`${o.year}__${o.semester}`));
        }

        let mergedCount = 0;
        let insertedCount = 0;
        let updatedCount = 0;

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
                if (importMode === 'update') {
                    // Update quantity (แทนที่จำนวนเดิมด้วยจำนวนใหม่)
                    state.orders[existingIndex].qty = newRow.qty;
                    state.orders[existingIndex].price = newRow.price;
                    state.orders[existingIndex].amount = newRow.qty * newRow.price;
                    updatedCount++;
                } else {
                    // Append logic (บวกจำนวนเพิ่ม) เผื่อมีรายการซ้ำกันในไฟล์ Excel เอง
                    state.orders[existingIndex].qty += newRow.qty;
                    state.orders[existingIndex].price = newRow.price;
                    state.orders[existingIndex].amount = state.orders[existingIndex].qty * newRow.price;
                    mergedCount++;
                }
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
    renderEstimateTab();
    renderPopulationSection();
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
    if (state.isAdmin && state.isAuditEnabled) renderAuditTable();
}

// =========================================================
// 9. SUBJECT COUNT RE-CHECK WIDGET
// =========================================================
function getDetectedDeptGradePairs() {
    const pairsMap = new Map();
    
    // 1. From active orders and KNOWN_DEPARTMENTS
    const allDepts = Array.from(new Set([...KNOWN_DEPARTMENTS, ...state.orders.map(o => normalizeText(o.dept))])).filter(Boolean);
    const grades = ['ปวช.1', 'ปวช.2', 'ปวช.3'];
    
    allDepts.forEach(d => {
        grades.forEach(g => {
            // Support backward compatible single underscore key
            const oldKey = `${d}_${g}`;
            const newKey = `${d}__${g}`;
            
            // If they have old format in state, use it so it maps correctly, else use new
            const keyToUse = (state.targetSubjects && state.targetSubjects[oldKey] !== undefined) ? oldKey : newKey;
            
            pairsMap.set(keyToUse, { dept: d, grade: g, key: keyToUse });
        });
    });
    
    // 2. From manually added configs (which might use double underscores and arbitrary grades like ปวช.4)
    if (state.targetSubjects) {
        Object.keys(state.targetSubjects).forEach(key => {
            let parts = key.split('__');
            if (parts.length === 1) parts = key.split('_'); // fallback for old keys
            
            if (parts.length >= 2) {
                // If it's not already in pairsMap, add it!
                if (!pairsMap.has(key)) {
                    pairsMap.set(key, { dept: parts[0], grade: parts[1], key: key });
                }
            }
        });
    }

    return Array.from(pairsMap.values());
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

    const currentYearPlans = state.curriculumPlans.filter(plan => plan.year == state.selectedYear && plan.semester == state.selectedSemester);

    // Group pairs by department
    const deptGroups = {};
    pairs.forEach(p => {
        if(!deptGroups[p.dept]) deptGroups[p.dept] = [];
        deptGroups[p.dept].push(p);
    });

    Object.keys(deptGroups).sort().forEach(dept => {
        const card = document.createElement('div');
        card.style.border = '1px solid var(--border-color)';
        card.style.borderRadius = 'var(--radius-md)';
        card.style.marginBottom = '1rem';
        card.style.overflow = 'hidden';
        card.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
        
        const header = document.createElement('div');
        header.style.padding = '0.8rem 1rem';
        header.style.background = 'var(--bg-muted)';
        header.style.cursor = 'pointer';
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';
        header.style.fontWeight = 'bold';
        header.innerHTML = `<span><i class="fa-solid fa-layer-group text-primary"></i> แผนกวิชา ${escapeHtml(dept)}</span> <i class="fa-solid fa-chevron-down toggle-icon text-muted"></i>`;
        
        const body = document.createElement('div');
        body.style.padding = '1rem';
        body.style.display = 'none'; // hidden by default for cleaner UI
        body.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
        body.style.gap = '1rem';
        
        header.addEventListener('click', () => {
             if (body.style.display === 'none') {
                 body.style.display = 'grid';
                 header.querySelector('.toggle-icon').className = 'fa-solid fa-chevron-up toggle-icon text-muted';
                 header.style.background = 'var(--primary-light)';
             } else {
                 body.style.display = 'none';
                 header.querySelector('.toggle-icon').className = 'fa-solid fa-chevron-down toggle-icon text-muted';
                 header.style.background = 'var(--bg-muted)';
             }
        });

        let hasData = false;
        let totalExceed = 0;
        let totalMissing = 0;

        deptGroups[dept].forEach(p => {
            const planForGroup = currentYearPlans.filter(plan => normalizeText(plan.dept) === normalizeText(p.dept) && normalizeText(plan.grade) === normalizeText(p.grade));
            
            let manualCount = 0;
            let manualCurr = '';
            const targetObj = state.targetSubjects[p.key];
            if (targetObj !== undefined) {
                if (typeof targetObj === 'object') {
                    manualCount = targetObj.count || 0;
                    manualCurr = targetObj.curr || '';
                } else {
                    manualCount = Number(targetObj) || 0;
                }
            }

            let targetCount = 0;
            if (planForGroup.length > 0) {
                targetCount = planForGroup.length;
            } else {
                targetCount = manualCount;
            }
            
            const deptGradeOrders = activeOrders.filter(o => getNormalizedKey(o.dept) === getNormalizedKey(p.dept) && getNormalizedKey(o.grade) === getNormalizedKey(p.grade));
            const uniqueSubjectKeys = new Set(deptGradeOrders.map(o => getUniqueSubjectKey(o)));
            const actualCount = uniqueSubjectKeys.size;
            if (targetCount === 0 && actualCount === 0) return;
            hasData = true;

            const diff = actualCount - targetCount;
            let statusClass = 'status-ok';
            let statusBadgeText = `✅ ครบถ้วน (${actualCount}/${targetCount})`;

            if (diff < 0) {
                statusClass = 'status-missing';
                statusBadgeText = `⚠️ ขาดอีก ${Math.abs(diff)} วิชา (${actualCount}/${targetCount})`;
                totalMissing += Math.abs(diff);
            } else if (diff > 0) {
                statusClass = 'status-exceed';
                statusBadgeText = `❌ เกิน ${diff} วิชา (${actualCount}/${targetCount})`;
                totalExceed += diff;
            }

            const item = document.createElement('div');
            item.className = `check-item-card ${statusClass}`;
            item.style.padding = '0.8rem';
            item.style.border = '1px solid var(--border-color)';
            item.style.borderRadius = 'var(--radius-sm)';
            item.innerHTML = `
                <div style="margin-bottom:0.5rem;">
                    <div class="check-title" style="font-size:1.05rem;"><i class="fa-solid fa-graduation-cap"></i> ${p.grade}${manualCurr ? ` <span style="font-size:0.8rem; color:var(--text-muted); font-weight:normal;">(หลักสูตร ${manualCurr})</span>` : ''}</div>
                    <div class="check-subtitle" style="font-size:0.8rem; margin-top:0.25rem;">เป้าหมาย: ${targetCount} วิชา | สั่งจริง: ${actualCount} วิชา</div>
                </div>
                <div class="check-status-badge">${statusBadgeText}</div>
            `;
            body.appendChild(item);
        });

        if (hasData) {
            // Add summary pills to header
            const summarySpan = document.createElement('span');
            summarySpan.style.marginLeft = 'auto';
            summarySpan.style.marginRight = '1rem';
            summarySpan.style.fontSize = '0.8rem';
            summarySpan.style.fontWeight = 'normal';
            
            let summaryHtml = '';
            if (totalExceed > 0) summaryHtml += `<span class="badge" style="background:#fef2f2; color:#ef4444; border:1px solid #fca5a5; margin-right:0.5rem;">เกิน ${totalExceed} จุด</span>`;
            if (totalMissing > 0) summaryHtml += `<span class="badge" style="background:#fffbeb; color:#f59e0b; border:1px solid #fcd34d;">ขาด ${totalMissing} จุด</span>`;
            if (totalExceed === 0 && totalMissing === 0) summaryHtml = `<span class="badge" style="background:#ecfdf5; color:#10b981; border:1px solid #6ee7b7;">✅ ปกติทั้งหมด</span>`;
            
            summarySpan.innerHTML = summaryHtml;
            header.insertBefore(summarySpan, header.querySelector('.toggle-icon'));

            card.appendChild(header);
            card.appendChild(body);
            grid.appendChild(card);
        }
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
        if (document.getElementById('showSubjectCheckDashboardToggle')) document.getElementById('showSubjectCheckDashboardToggle').checked = state.showSubjectCheckDashboard;
        if (document.getElementById('showEstimateTabToggle')) document.getElementById('showEstimateTabToggle').checked = state.showEstimateTab;
        
        const list = document.getElementById('targetConfigList');
        list.innerHTML = '';

        const pairs = getDetectedDeptGradePairs();

        pairs.forEach(p => {
            let valCount = 0;
            let valCurr = '';
            const targetObj = state.targetSubjects[p.key];
            if (targetObj !== undefined) {
                if (typeof targetObj === 'object') {
                    valCount = targetObj.count || 0;
                    valCurr = targetObj.curr || '';
                } else {
                    valCount = Number(targetObj) || 0;
                }
            }

            const div = document.createElement('div');
            div.className = 'target-config-item';
            div.style.position = 'relative';
            div.style.marginBottom = '1rem';
            div.style.padding = '0.5rem';
            div.style.border = '1px solid var(--border-color)';
            div.style.borderRadius = 'var(--radius-sm)';
            div.style.display = 'flex';
            div.style.alignItems = 'center';
            div.style.gap = '0.5rem';
            div.style.flexWrap = 'wrap';
            
            div.innerHTML = `
                <div style="flex:1; min-width: 150px;">
                    <label class="form-label" style="font-weight:600; font-size:0.85rem; margin:0;">${escapeHtml(p.dept)} (${escapeHtml(p.grade)}):</label>
                    <div style="display: flex; gap: 0.5rem; margin-top: 0.3rem;">
                        <input type="number" min="0" value="${valCount}" data-key="${p.key}" class="form-input target-input-field" placeholder="จำนวนวิชา" style="width: 50%;">
                        <input type="text" value="${escapeHtml(valCurr)}" data-key-curr="${p.key}" class="form-input target-curr-field" placeholder="ปีหลักสูตร (เช่น 67)" style="width: 50%;">
                    </div>
                </div>
                <button type="button" class="btn btn-sm btn-outline-danger" title="ลบรายการนี้" onclick="deleteTargetPair('${p.key}')" style="height: 38px; align-self: flex-end;">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            list.appendChild(div);
        });

        targetConfigModal.classList.remove('hidden');
    };

    window.deleteTargetPair = function(key) {
        if(confirm('ต้องการลบแผนก/ระดับชั้นนี้ออกจากการตั้งค่าใช่หรือไม่?')) {
            if (state.targetSubjects && state.targetSubjects[key] !== undefined) {
                delete state.targetSubjects[key];
                localStorage.setItem('freebook_target_subjects', JSON.stringify(state.targetSubjects));
                syncToFirebase('targetSubjects', state.targetSubjects);
                syncToFirebase('studentEstimates', state.studentEstimates || {});
            }
            // re-render the modal instantly
            openConfigModal();
            renderSubjectCheckWidget();
        }
    };

    const addNewTargetPairBtn = document.getElementById('addNewTargetPairBtn');
    if (addNewTargetPairBtn) {
        addNewTargetPairBtn.addEventListener('click', () => {
            const dept = prompt('กรอกชื่อ "แผนกวิชา" ที่ต้องการเพิ่ม: (เช่น ช่างยนต์)');
            if (!dept || dept.trim() === '') return;
            const grade = prompt('กรอกชื่อ "ระดับชั้น": (เช่น ปวช.1)');
            if (!grade || grade.trim() === '') return;
            
            const key = `${normalizeText(dept)}__${normalizeText(grade)}`;
            if (!state.targetSubjects) state.targetSubjects = {};
            
            if (state.targetSubjects[key] !== undefined) {
                alert('แผนกและระดับชั้นนี้มีอยู่แล้วในระบบ');
                return;
            }
            
            state.targetSubjects[key] = { count: 0, curr: '' };
            localStorage.setItem('freebook_target_subjects', JSON.stringify(state.targetSubjects));
            syncToFirebase('targetSubjects', state.targetSubjects);
            openConfigModal();
            renderSubjectCheckWidget();
        });
    }

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
            const currInput = document.querySelector(`.target-curr-field[data-key-curr="${key}"]`);
            const currVal = currInput ? currInput.value.trim() : '';
            
            state.targetSubjects[key] = {
                count: Number(input.value) || 0,
                curr: currVal
            };
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
        const purgeSemesterSelect = document.getElementById('purgeSemesterSelect');
        const semesterToBackup = purgeSemesterSelect ? purgeSemesterSelect.value : 'ALL';
        
        let targetOrders;
        let fileName;
        let successMsg;

        if (semesterToBackup === 'ALL') {
            targetOrders = state.orders.filter(o => String(o.year) === String(yearToBackup));
            fileName = `Backup_FreeBook_${yearToBackup}.json`;
            successMsg = `สำรองข้อมูลปีการศึกษา ${yearToBackup} สำเร็จ!`;
        } else {
            targetOrders = state.orders.filter(o => String(o.year) === String(yearToBackup) && o.semester === semesterToBackup);
            const semStr = semesterToBackup === 'ภาคเรียนที่ 1' ? 'Sem1' : 'Sem2';
            fileName = `Backup_FreeBook_${yearToBackup}_${semStr}.json`;
            successMsg = `สำรองข้อมูล ${semesterToBackup} ของปีการศึกษา ${yearToBackup} สำเร็จ!`;
        }
        
        if (targetOrders.length === 0) {
            showToast(`ไม่พบรายการข้อมูลตามเงื่อนไขที่เลือก สำหรับสำรอง`, 'info');
            return;
        }

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(targetOrders, null, 2));
        const dlAnchor = document.createElement('a');
        dlAnchor.setAttribute("href", dataStr);
        dlAnchor.setAttribute("download", fileName);
        document.body.appendChild(dlAnchor);
        dlAnchor.click();
        dlAnchor.remove();
        showToast(successMsg, 'success');
    });

    purgeYearBtn.addEventListener('click', () => {
        const yearToPurge = purgeYearSelect.value;
        const purgeSemesterSelect = document.getElementById('purgeSemesterSelect');
        const semesterToPurge = purgeSemesterSelect ? purgeSemesterSelect.value : 'ALL';
        
        if (!yearToPurge) return;

        let targetOrders;
        let confirmMsg;
        let successMsg;

        if (semesterToPurge === 'ALL') {
            targetOrders = state.orders.filter(o => String(o.year) === String(yearToPurge));
            confirmMsg = `⚠️ ยืนยันการลบข้อมูล "ทั้งปีการศึกษา ${yearToPurge}" เด็ดขาด?\n(รวมทั้งหมด ${targetOrders.length} รายการ ข้อมูลปีนี้จะถูกลบออกทั้งหมด)`;
            successMsg = `ลบข้อมูลปีการศึกษา ${yearToPurge} ออกจากระบบเรียบร้อยแล้ว`;
        } else {
            targetOrders = state.orders.filter(o => String(o.year) === String(yearToPurge) && o.semester === semesterToPurge);
            confirmMsg = `⚠️ ยืนยันการลบข้อมูลของ "ปีการศึกษา ${yearToPurge} ${semesterToPurge}" เด็ดขาด?\n(รวมทั้งหมด ${targetOrders.length} รายการ)`;
            successMsg = `ลบข้อมูล ${semesterToPurge} ของปีการศึกษา ${yearToPurge} ออกจากระบบเรียบร้อยแล้ว`;
        }

        if (confirm(confirmMsg)) {
            if (semesterToPurge === 'ALL') {
                state.orders = state.orders.filter(o => String(o.year) !== String(yearToPurge));
                state.customYears = state.customYears.filter(y => String(y) !== String(yearToPurge));
                saveCustomYearsToStorage();
                
                const remainingYears = getAllYearsSortedDescending();
                if (state.selectedYear === String(yearToPurge)) {
                    state.selectedYear = remainingYears[0] ? String(remainingYears[0]) : 'ALL';
                }
            } else {
                state.orders = state.orders.filter(o => !(String(o.year) === String(yearToPurge) && o.semester === semesterToPurge));
                // Only remove year if no orders left for that year at all
                const remainingInYear = state.orders.some(o => String(o.year) === String(yearToPurge));
                if (!remainingInYear) {
                    state.customYears = state.customYears.filter(y => String(y) !== String(yearToPurge));
                    saveCustomYearsToStorage();
                    const remainingYears = getAllYearsSortedDescending();
                    if (state.selectedYear === String(yearToPurge)) {
                        state.selectedYear = remainingYears[0] ? String(remainingYears[0]) : 'ALL';
                    }
                }
            }

            saveOrdersToStorage();
            renderYearDropdownOptions();
            renderAllViews();
            updatePurgeDropdown();

            showToast(successMsg, 'danger');
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


// =========================================================
// AUDIT CURRICULUM LOGIC
// =========================================================

function initAuditEvents() {
    const auditToggleSwitch = document.getElementById('auditToggleSwitch');
    const importCurriculumBtn = document.getElementById('importCurriculumBtn');
    const curriculumFileInput = document.getElementById('curriculumFileInput');
    const clearCurriculumBtn = document.getElementById('clearCurriculumBtn');
    const bigEnableAuditBtn = document.getElementById('bigEnableAuditBtn');

    if (!auditToggleSwitch) return;

    if (bigEnableAuditBtn) {
        bigEnableAuditBtn.addEventListener('click', () => {
            auditToggleSwitch.checked = true;
            state.isAuditEnabled = true;
            saveAuditToggleToStorage();
            updateAuditUI();
        });
    }

    // Set initial toggle state
    auditToggleSwitch.checked = state.isAuditEnabled;
    updateAuditUI();

    auditToggleSwitch.addEventListener('change', (e) => {
        state.isAuditEnabled = e.target.checked;
        saveAuditToggleToStorage();
        updateAuditUI();
    });

    if (importCurriculumBtn) {
        importCurriculumBtn.addEventListener('click', () => {
            curriculumFileInput.click();
        });
    }

    if (curriculumFileInput) {
        curriculumFileInput.addEventListener('change', handleCurriculumUpload);
    }

    if (clearCurriculumBtn) {
        clearCurriculumBtn.addEventListener('click', () => {
            if (confirm(`คุณแน่ใจหรือไม่ว่าต้องการล้างข้อมูลแผนการเรียนของ ${state.selectedYear} (${state.selectedSemester})?`)) {
                state.curriculumPlans = state.curriculumPlans.filter(p => p.year != state.selectedYear || p.semester != state.selectedSemester);
                saveCurriculumToStorage();
                updateAuditUI();
                showToast('ล้างข้อมูลแผนการเรียนเรียบร้อย', 'success');
            }
        });
    }
}

function updateAuditUI() {
    const auditToggleLabel = document.getElementById('auditToggleLabel');
    const importCurriculumBtn = document.getElementById('importCurriculumBtn');
    const auditContentContainer = document.getElementById('auditContentContainer');
    const auditDisabledMessage = document.getElementById('auditDisabledMessage');

    if (!auditToggleLabel) return;

    if (state.isAuditEnabled) {
        auditToggleLabel.textContent = 'เปิดใช้งานโหมดตรวจสอบ';
        auditToggleLabel.style.color = 'var(--primary-color)';
        importCurriculumBtn.style.display = 'inline-flex';
        auditContentContainer.style.display = 'block';
        auditDisabledMessage.style.display = 'none';
        renderAuditTable();
    } else {
        auditToggleLabel.textContent = 'ปิดใช้งานโหมดตรวจสอบ';
        auditToggleLabel.style.color = 'var(--text-muted)';
        importCurriculumBtn.style.display = 'none';
        auditContentContainer.style.display = 'none';
        auditDisabledMessage.style.display = 'block';
    }
}

function handleCurriculumUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
        try {
            const data = evt.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const firstSheet = workbook.SheetNames[0];
            const excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);
            
            if (excelRows.length === 0) {
                showToast('ไม่พบข้อมูลในไฟล์ Excel', 'danger');
                return;
            }

            // Remove old curriculum for THIS year/semester
            state.curriculumPlans = state.curriculumPlans.filter(p => p.year != state.selectedYear || p.semester != state.selectedSemester);

            let addedCount = 0;
            excelRows.forEach(row => {
                const dept = row['แผนกวิชา'] || row['แผนก'] || row['สาขาวิชา'];
                const grade = row['ระดับชั้น'] || row['ชั้น'] || row['ระดับ'];
                const code = row['รหัสวิชา'] || row['รหัส'];

                if (dept && grade && code) {
                    state.curriculumPlans.push({
                        year: state.selectedYear.toString(),
                        semester: state.selectedSemester,
                        dept: normalizeText(dept),
                        grade: normalizeText(grade),
                        code: normalizeText(code)
                    });
                    addedCount++;
                }
            });

            if (addedCount > 0) {
                saveCurriculumToStorage();
                updateAuditUI();
                showToast(`นำเข้าแผนการเรียนสำเร็จ ${addedCount} วิชา`, 'success');
            } else {
                showToast('ไม่พบข้อมูลรูปแบบที่ถูกต้อง (ต้องมีคอลัมน์: แผนกวิชา, ระดับชั้น, รหัสวิชา)', 'danger');
            }
        } catch (error) {
            console.error(error);
            showToast('เกิดข้อผิดพลาดในการอ่านไฟล์', 'danger');
        }
        e.target.value = ''; // Reset input
    };
    reader.readAsBinaryString(file);
}

function renderAuditTable() {
    const tbody = document.getElementById('auditTableBody');
    const statusText = document.getElementById('curriculumStatusText');
    const clearBtn = document.getElementById('clearCurriculumBtn');
    if (!tbody) return;

    const currentYearPlans = state.curriculumPlans.filter(p => p.year == state.selectedYear && p.semester == state.selectedSemester);
    const currentOrders = state.orders.filter(o => o.year == state.selectedYear && o.semester == state.selectedSemester);

    if (currentYearPlans.length === 0) {
        statusText.textContent = `ยังไม่มีข้อมูลแผนการเรียนสำหรับ ${state.selectedYear} (${state.selectedSemester})`;
        statusText.style.color = 'var(--danger)';
        clearBtn.style.display = 'none';
        tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted" style="padding: 2rem;"><i class="fa-solid fa-folder-open mb-2" style="font-size:2rem; opacity:0.5;"></i><br>ไม่มีข้อมูลแผนการเรียนสำหรับตรวจสอบ</td></tr>`;
        return;
    }

    statusText.textContent = `มีข้อมูลแผนการเรียนในระบบแล้ว (${currentYearPlans.length} รายวิชา)`;
    statusText.style.color = 'var(--accent-color)';
    clearBtn.style.display = 'inline-flex';

    let planGroups = {};
    currentYearPlans.forEach(p => {
        const key = `${p.dept}__${p.grade}`;
        if (!planGroups[key]) planGroups[key] = { expectedCount: 0, validCodes: new Set() };
        planGroups[key].expectedCount++;
        planGroups[key].validCodes.add(normalizeCode(p.code));
    });

    let orderGroups = {};
    currentOrders.forEach(o => {
        const d = normalizeText(o.dept);
        const g = normalizeText(o.grade);
        const key = `${d}__${g}`;
        if (!orderGroups[key]) orderGroups[key] = { orderedCount: 0, orderedCodes: new Set(), outOfPlanCodes: new Set() };
        
        const normCode = normalizeCode(o.code);
        if (!orderGroups[key].orderedCodes.has(normCode)) {
            orderGroups[key].orderedCount++;
            orderGroups[key].orderedCodes.add(normCode);
            
            const planForGroup = planGroups[key];
            if (!planForGroup || !planForGroup.validCodes.has(normCode)) {
                // Keep the original formatted code for display in outOfPlanCodes
                orderGroups[key].outOfPlanCodes.add(normalizeText(o.code));
            }
        }
    });

    const allKeys = new Set([...Object.keys(planGroups), ...Object.keys(orderGroups)]);
    
    tbody.innerHTML = '';
    if (allKeys.size === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted" style="padding: 2rem;">ไม่พบข้อมูลสั่งซื้อในเทอมนี้</td></tr>`;
        return;
    }

    Array.from(allKeys).sort().forEach(key => {
        const parts = key.split('__');
        const dept = parts[0];
        const grade = parts[1];
        const plan = planGroups[key] || { expectedCount: 0, validCodes: new Set() };
        const order = orderGroups[key] || { orderedCount: 0, outOfPlanCodes: new Set() };

        const expected = plan.expectedCount;
        const actual = order.orderedCount;
        const diff = actual - expected;

        let statusHtml = '';
        let rowStyle = '';
        if (expected === 0 && actual > 0) {
             statusHtml = `<span class="badge" style="background:#ef4444; color:white; padding:0.3rem 0.6rem; border-radius:4px; font-size:0.8rem;">ไม่มีแผน (${actual} วิชา)</span>`;
             rowStyle = 'background-color: #fef2f2;';
        } else if (diff > 0) {
            statusHtml = `<span class="badge" style="background:#ef4444; color:white; padding:0.3rem 0.6rem; border-radius:4px; font-size:0.8rem;">เกินแผนมา ${diff} วิชา</span>`;
            rowStyle = 'background-color: #fef2f2;';
        } else if (diff === 0) {
            statusHtml = `<span class="badge" style="background:#10b981; color:white; padding:0.3rem 0.6rem; border-radius:4px; font-size:0.8rem;">ครบถ้วนตามแผน</span>`;
        } else {
            statusHtml = `<span class="badge" style="background:#f59e0b; color:white; padding:0.3rem 0.6rem; border-radius:4px; font-size:0.8rem;">ขาด ${Math.abs(diff)} วิชา</span>`;
        }

                const outOfPlanArr = Array.from(order.outOfPlanCodes);
        let outHtml = '-';
        let unapprovedCount = 0;
        
        if (outOfPlanArr.length > 0) {
            outHtml = outOfPlanArr.map(c => {
                const subKey = `${dept}__${grade}__${c}`;
                const isApproved = state.approvedSubstitutions && state.approvedSubstitutions[subKey];
                
                if (isApproved) {
                    return `<span class="badge" style="background:#ecfdf5; color:#10b981; border:1px solid #6ee7b7; margin-right:4px; padding:0.2rem 0.4rem; border-radius:4px; font-size:0.8rem; cursor:pointer;" onclick="revokeSubstitution('${dept}', '${grade}', '${c}')" title="คลิกเพื่อยกเลิกการอนุมัติ">${c} (อนุมัติแล้ว)</span>`;
                } else {
                    unapprovedCount++;
                    return `<span class="badge" style="background:#fee2e2; color:#ef4444; border:1px solid #fca5a5; margin-right:4px; padding:0.2rem 0.4rem; border-radius:4px; font-size:0.8rem; cursor:pointer;" onclick="approveSubstitution('${dept}', '${grade}', '${c}')" title="คลิกเพื่ออนุมัติให้ใช้แทนรายวิชาในหลักสูตร">${c} <i class="fa-solid fa-wrench"></i></span>`;
                }
            }).join(' ');
        }
        
        // Recalculate status based on unapproved mismatching codes only
        if (expected === 0 && actual > 0) {
             statusHtml = `<span class="badge" style="background:#ef4444; color:white; padding:0.3rem 0.6rem; border-radius:4px; font-size:0.8rem;">ไม่มีแผน (${actual} วิชา)</span>`;
             rowStyle = 'background-color: #fef2f2;';
        } else if (unapprovedCount > 0) {
            // Warn if there are unapproved mismatched codes, regardless of total count
            statusHtml = `<span class="badge" style="background:#ef4444; color:white; padding:0.3rem 0.6rem; border-radius:4px; font-size:0.8rem;">รหัสไม่ตรง ${unapprovedCount} วิชา</span>`;
            rowStyle = 'background-color: #fef2f2;';
        } else if (diff > 0) {
            statusHtml = `<span class="badge" style="background:#ef4444; color:white; padding:0.3rem 0.6rem; border-radius:4px; font-size:0.8rem;">เกินแผนมา ${diff} วิชา</span>`;
            rowStyle = 'background-color: #fef2f2;';
        } else if (diff === 0) {
            statusHtml = `<span class="badge" style="background:#10b981; color:white; padding:0.3rem 0.6rem; border-radius:4px; font-size:0.8rem;">ครบถ้วน</span>`;
        } else {
            statusHtml = `<span class="badge" style="background:#f59e0b; color:white; padding:0.3rem 0.6rem; border-radius:4px; font-size:0.8rem;">ขาด ${Math.abs(diff)} วิชา</span>`;
        }

        const tr = document.createElement('tr');
        if (rowStyle) tr.style.cssText = rowStyle;
        tr.innerHTML = `
            <td><strong>${dept}</strong></td>
            <td>${grade}</td>
            <td class="text-center"><strong>${expected}</strong></td>
            <td class="text-center"><strong>${actual}</strong></td>
            <td class="text-center">${statusHtml}</td>
            <td>${outHtml}</td>
        `;
        tbody.appendChild(tr);
    });
}


window.approveSubstitution = function(dept, grade, code) {
    if (!state.isAdmin) return;
    if (confirm(`คุณต้องการอนุมัติให้ใช้รหัสวิชา ${code} เป็นวิชาทดแทน/เพิ่มเติม สำหรับ ${dept} ${grade} ใช่หรือไม่?

(การแจ้งเตือนรหัสไม่ตรงจะหายไป)`)) {
        const key = `${dept}__${grade}__${code}`;
        if (!state.approvedSubstitutions) state.approvedSubstitutions = {};
        state.approvedSubstitutions[key] = true;
        localStorage.setItem('freebook_approved_subs', JSON.stringify(state.approvedSubstitutions));
        syncToFirebase('approvedSubstitutions', state.approvedSubstitutions);
        renderAuditTable();
    }
};

window.revokeSubstitution = function(dept, grade, code) {
    if (!state.isAdmin) return;
    if (confirm(`ยกเลิกการอนุมัติวิชา ${code} สำหรับ ${dept} ${grade} หรือไม่?`)) {
        const key = `${dept}__${grade}__${code}`;
        if (state.approvedSubstitutions) {
            delete state.approvedSubstitutions[key];
            localStorage.setItem('freebook_approved_subs', JSON.stringify(state.approvedSubstitutions));
            syncToFirebase('approvedSubstitutions', state.approvedSubstitutions);
            renderAuditTable();
        }
    }
};


// =========================================================
// 9. STUDENT ESTIMATION MODULE
// =========================================================

function saveEstimatesToStorage() {
    localStorage.setItem('freebook_student_estimates', JSON.stringify(state.studentEstimates));
    syncToFirebase('studentEstimates', state.studentEstimates);
}

function updateEstimateToggleUI() {
    const toggleSwitch = document.getElementById('estimateToggleSwitch');
    const toggleLabel = document.getElementById('estimateToggleLabel');
    const disabledMsg = document.getElementById('estimateDisabledMessage');
    const tableContainer = document.getElementById('estimateTableContainer');
    const chartWrapper = document.getElementById('estimateChartWrapper');
    
    if (toggleSwitch) toggleSwitch.checked = state.showEstimateTab;
    if (toggleLabel) {
        toggleLabel.textContent = state.showEstimateTab ? 'เปิดใช้งานอยู่ (ทุกคนมองเห็น)' : 'กำลังปิดซ่อน (เทอม 2)';
        toggleLabel.style.color = state.showEstimateTab ? 'var(--primary-color)' : 'var(--text-muted)';
    }
    
    if (!state.showEstimateTab) {
        if (disabledMsg) disabledMsg.style.display = 'block';
        if (tableContainer) tableContainer.style.display = 'none';
        if (chartWrapper) chartWrapper.style.display = 'none';
    } else {
        if (disabledMsg) disabledMsg.style.display = 'none';
        if (tableContainer) tableContainer.style.display = 'block';
        // chartWrapper visibility is handled by renderEstimateTab based on data
    }
    updateAdminUI();
}

function initEstimateEvents() {
    const toggleSwitch = document.getElementById('estimateToggleSwitch');
    const bigEnableBtn = document.getElementById('bigEnableEstimateBtn');
    
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', (e) => {
            state.showEstimateTab = e.target.checked;
            localStorage.setItem('freebook_show_estimate_tab', state.showEstimateTab);
            syncToFirebase('showEstimateTab', state.showEstimateTab);
            updateEstimateToggleUI();
            if (state.showEstimateTab) renderEstimateTab();
    renderPopulationSection();
        });
    }
    
    if (bigEnableBtn) {
        bigEnableBtn.addEventListener('click', () => {
            if (toggleSwitch) {
                toggleSwitch.checked = true;
                toggleSwitch.dispatchEvent(new Event('change'));
            }
        });
    }
    
    const yearSelect = document.getElementById('estimateYearSelect');
    if (yearSelect) {
        yearSelect.addEventListener('change', (e) => {
            renderEstimateTab(e.target.value);
            renderPopulationSection();
        });
    }

    const addBtn = document.getElementById('addEstimateRowBtn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            if (!state.isAdmin) return;
            const year = document.getElementById('estimateYearSelect').value;
            if (!year) {
                alert('กรุณาเลือกปีการศึกษาก่อน');
                return;
            }
            const dept = prompt('กรอกชื่อ "แผนกวิชา" ที่ต้องการเพิ่ม:');
            if (!dept || dept.trim() === '') return;
            
            const deptNorm = normalizeText(dept);
            if (!state.studentEstimates[year]) state.studentEstimates[year] = {};
            if (state.studentEstimates[year][deptNorm]) {
                alert('แผนกนี้มีอยู่แล้วในปีการศึกษานี้');
                return;
            }
            
            state.studentEstimates[year][deptNorm] = { 
                hist2: 0, hist1: 0, plan: 0, alloc: 0, note: '' 
            };
            saveEstimatesToStorage();
            renderEstimateTab(year);
        });
    }

    const autoFillBtn = document.getElementById('autoFillEstimateBtn');
    if (autoFillBtn) {
        autoFillBtn.addEventListener('click', () => {
            if (!state.isAdmin) return;
            if (!confirm('ระบบจะดึงรายชื่อแผนกทั้งหมดมาสร้างในตารางให้ทันที ยืนยันหรือไม่?')) return;
            
            const year = document.getElementById('estimateYearSelect').value;
            if (!year) return;
            if (!state.studentEstimates[year]) state.studentEstimates[year] = {};
            
            // Get unique depts from orders
            const depts = new Set(state.orders.map(o => normalizeText(o.dept)).filter(Boolean));
            depts.forEach(d => {
                if (!state.studentEstimates[year][d]) {
                    state.studentEstimates[year][d] = { hist2: 0, hist1: 0, plan: 0, alloc: 0, note: '' };
                }
            });
            saveEstimatesToStorage();
            renderEstimateTab(year);
            showToast('ดึงข้อมูลแผนกวิชาเรียบร้อย', 'success');
        });
    }
}

window.editEstimateCell = function(year, dept, field) {
    if (!state.isAdmin) return;
    
    if (!state.studentEstimates[year] || !state.studentEstimates[year][dept]) return;
    const currentVal = state.studentEstimates[year][dept][field];
    
    let promptMsg = '';
    let isNumber = true;
    
    switch(field) {
        case 'hist1': promptMsg = 'กรอกสถิติรับจริง (ปีที่แล้ว):'; break;
        case 'plan': promptMsg = 'กรอกแผนรับสมัครปีปัจจุบัน:'; break;
        case 'alloc': promptMsg = 'กรอกยอดจัดสรรสั่งซื้อหนังสือ:'; break;
    }
    
    const newVal = prompt(promptMsg, currentVal);
    if (newVal === null) return;
    
    state.studentEstimates[year][dept][field] = isNumber ? (Number(newVal) || 0) : newVal.trim();
    saveEstimatesToStorage();
    renderEstimateTab(year);
};

window.deleteEstimateRow = function(year, dept) {
    if (!state.isAdmin) return;
    if (confirm(`ต้องการลบข้อมูลประมาณการของแผนก ${dept} ใช่หรือไม่?`)) {
        if (state.studentEstimates[year] && state.studentEstimates[year][dept]) {
            delete state.studentEstimates[year][dept];
            saveEstimatesToStorage();
            renderEstimateTab(year);
        }
    }
};

function renderEstimateTab(forceYear = null) {
    updateEstimateToggleUI();
    if (!state.showEstimateTab) return; // Skip rendering table/chart if disabled
    
    const yearSelect = document.getElementById('estimateYearSelect');
    if (!yearSelect) return;
    
    // Populate year dropdown
    const years = Array.from(new Set([...state.customYears, state.selectedYear].map(y => Number(y)))).filter(y => !isNaN(y)).sort((a,b)=>b-a);
    yearSelect.innerHTML = years.map(y => `<option value="${y}">ปีการศึกษา ${y}</option>`).join('');
    
    const targetYear = forceYear || state.selectedYear;
    yearSelect.value = targetYear;
    
    document.getElementById('estimatePrintMeta').innerText = `ประจำปีการศึกษา ${targetYear}`;
    
    const tbody = document.getElementById('estimateTableBody');
    const tfoot = document.getElementById('estimateTableFoot');
    tbody.innerHTML = '';
    tfoot.innerHTML = '';
    
    const yearData = state.studentEstimates[targetYear] || {};
    let depts = Object.keys(yearData).filter(k => k !== '_order');
    if (yearData._order) {
        const savedOrder = yearData._order.split(',');
        const missing = depts.filter(d => !savedOrder.includes(d)).sort();
        depts = savedOrder.filter(d => depts.includes(d)).concat(missing);
    } else {
        depts = depts.sort();
    }
    yearData._order = depts.join(',');

    
    if (depts.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" class="text-center text-muted" style="padding: 2rem;">ยังไม่มีข้อมูลประมาณการสำหรับปีการศึกษานี้</td></tr>`;
        return;
    }
    
    let sumH1 = 0, sumPlan = 0, sumRec = 0, sumAlloc = 0;
    
    depts.forEach((dept, idx) => {
        const d = yearData[dept];
        sumH1 += d.hist1 || 0;
        sumPlan += d.plan || 0;
        sumAlloc += d.alloc || 0;
        
        // Calculate recommended: Average of hist1 and plan
        let rec = 0;
        if (d.hist1 > 0 && d.plan > 0) {
            rec = Math.ceil((d.hist1 + d.plan) / 2); // Round up just in case of decimals
        } else if (d.hist1 > 0) {
            rec = d.hist1;
        } else if (d.plan > 0) {
            rec = d.plan;
        }
        sumRec += rec;
        
        let pct = 0;
        if (d.plan > 0) {
            pct = ((d.alloc / d.plan) * 100).toFixed(1);
        }
        
        let pctColor = '#334155';
        if (pct > 100) pctColor = '#ef4444'; // over
        else if (pct >= 90) pctColor = '#10b981'; // ok
        else if (pct > 0) pctColor = '#f59e0b'; // under
        
        const tr = document.createElement('tr');
        
        const cellClass = state.isAdmin ? 'cursor:pointer;' : '';
        const adminClass = state.isAdmin ? '' : 'admin-only hidden no-print';
        
        tr.innerHTML = `
            <td class="text-center">${idx + 1}</td>
            <td><strong>${escapeHtml(dept)}</strong></td>
            <td class="text-center" style="${cellClass}" onclick="editEstimateCell('${targetYear}', '${dept}', 'hist1')">${d.hist1 || '-'}</td>
            <td class="text-center" style="${cellClass} font-weight:bold; color:var(--secondary);" onclick="editEstimateCell('${targetYear}', '${dept}', 'plan')">${d.plan || '-'}</td>
            <td class="text-center" style="font-weight:bold; color:#166534; background:#f0fdf4;" title="คำนวณจากค่าเฉลี่ยของแผนรับและสถิติรับจริง">${rec > 0 ? rec : '-'}</td>
            <td class="text-center" style="${cellClass} font-weight:bold; color:#1e3a8a; background:#eff6ff;" onclick="editEstimateCell('${targetYear}', '${dept}', 'alloc')">${d.alloc || '-'}</td>
            <td class="text-center" style="font-weight:bold; color:${pctColor};">${pct > 0 ? pct + '%' : '-'}</td>
            <td class="text-center ${adminClass}">
                <div class="flex-gap" style="justify-content:center;">
                    <button class="btn btn-sm btn-outline" style="padding:0.2rem 0.4rem;" onclick="moveEstimateRow('${targetYear}', '${dept}', -1)" ${idx === 0 ? 'disabled' : ''} title="เลื่อนขึ้น"><i class="fa-solid fa-arrow-up"></i></button>
                    <button class="btn btn-sm btn-outline" style="padding:0.2rem 0.4rem;" onclick="moveEstimateRow('${targetYear}', '${dept}', 1)" ${idx === depts.length - 1 ? 'disabled' : ''} title="เลื่อนลง"><i class="fa-solid fa-arrow-down"></i></button>
                    <button class="btn btn-sm btn-outline-danger" style="padding:0.2rem 0.4rem;" onclick="deleteEstimateRow('${targetYear}', '${dept}')" title="ลบ"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    let totalPct = 0;
    if (sumPlan > 0) totalPct = ((sumAlloc / sumPlan) * 100).toFixed(1);
    
    tfoot.innerHTML = `
        <tr>
            <td colspan="2" class="text-right"><strong>รวมทั้งสิ้น:</strong></td>
            <td class="text-center"><strong>${sumH1 > 0 ? sumH1 : '-'}</strong></td>
            <td class="text-center" style="color:var(--secondary);"><strong>${sumPlan > 0 ? sumPlan : '-'}</strong></td>
            <td class="text-center" style="color:#166534; background:#dcfce7;"><strong>${sumRec > 0 ? sumRec : '-'}</strong></td>
            <td class="text-center" style="color:#1e3a8a; background:#e0e7ff;"><strong>${sumAlloc > 0 ? sumAlloc : '-'}</strong></td>
            <td class="text-center" style="color:${totalPct > 100 ? '#ef4444' : '#10b981'};"><strong>${totalPct > 0 ? totalPct + '%' : '-'}</strong></td>
            <td class="no-print admin-only hidden"></td>
        </tr>
    `;
    
    // Need to re-trigger UI update for the newly added admin classes if admin is logged in
    if (state.isAdmin) {
        document.querySelectorAll('#tab-estimate .admin-only').forEach(el => el.classList.remove('hidden'));
    }
    
    // Render Chart
    if (window.estimateChartInstance) {
        window.estimateChartInstance.destroy();
    }
    const chartCtx = document.getElementById('estimateChart');
    const chartWrapper = document.getElementById('estimateChartWrapper');
    if (chartCtx && chartWrapper) {
        if (depts.length > 0) {
            chartWrapper.style.display = 'block';
            window.estimateChartInstance = new Chart(chartCtx, {
                type: 'bar',
                data: {
                    labels: depts,
                    datasets: [
                        {
                            label: 'สถิติรับจริง (ปีที่แล้ว)',
                            data: depts.map(d => yearData[d].hist1 || 0),
                            backgroundColor: '#94a3b8'
                        },
                        {
                            label: 'แผนรับ (ปีปัจจุบัน)',
                            data: depts.map(d => yearData[d].plan || 0),
                            backgroundColor: '#64748b'
                        },
                        {
                            label: 'ยอดแนะนำ',
                            data: depts.map(d => {
                                let rec = 0;
                                if (yearData[d].hist1 > 0 && yearData[d].plan > 0) rec = Math.ceil((yearData[d].hist1 + yearData[d].plan) / 2);
                                else if (yearData[d].hist1 > 0) rec = yearData[d].hist1;
                                else if (yearData[d].plan > 0) rec = yearData[d].plan;
                                return rec;
                            }),
                            backgroundColor: '#4ade80'
                        },
                        {
                            label: 'ยอดจัดสรร',
                            data: depts.map(d => yearData[d].alloc || 0),
                            backgroundColor: '#3b82f6'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { 
                            position: 'top',
                            labels: {
                                font: { size: 14, family: "'Sarabun', sans-serif" },
                                padding: 20
                            }
                        },
                        title: { display: false }
                    },
                    scales: {
                        y: { 
                            beginAtZero: true,
                            ticks: { font: { size: 14, family: "'Sarabun', sans-serif" } }
                        },
                        x: {
                            ticks: { font: { size: 14, family: "'Sarabun', sans-serif" } }
                        }
                    }
                }
            });
        } else {
            chartWrapper.style.display = 'none';
        }
    }
}

window.updateChartColor = function(key, color) {
    if (!state.chartColors) state.chartColors = {};
    state.chartColors[key] = color;
    localStorage.setItem('freebook_chart_colors', JSON.stringify(state.chartColors));
    renderEstimateTab();
};

//

// =========================================================
window.moveEstimateRow = function(year, dept, dir) {
    if (!state.isAdmin) return;
    const yearData = state.studentEstimates[year];
    if (!yearData || !yearData._order) return;
    
    let currentOrder = yearData._order.split(',');
    const idx = currentOrder.indexOf(dept);
    if (idx === -1) return;
    
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= currentOrder.length) return;
    
    const temp = currentOrder[idx];
    currentOrder[idx] = currentOrder[newIdx];
    currentOrder[newIdx] = temp;
    
    yearData._order = currentOrder.join(',');
    saveEstimatesToStorage();
    renderEstimateTab(year);
};

// =========================================================
// POPULATION SECTION LOGIC (Voc 1, 2, 3)
// =========================================================

function initPopulationEvents() {
    const toggle = document.getElementById('populationToggleSwitch');
    if (toggle) {
        toggle.checked = state.showStudentPopulation;
        toggle.addEventListener('change', (e) => {
            state.showStudentPopulation = e.target.checked;
            saveShowPopulationToStorage();
            renderPopulationSection();
        });
    }

    const autoFillBtn = document.getElementById('autoFillPopulationBtn');
    if (autoFillBtn) {
        autoFillBtn.addEventListener('click', () => {
            const year = document.getElementById('estimateYearSelect').value;
            if (!year) return;
            
            if (confirm('ต้องการดึงรายชื่อแผนกวิชาทั้งหมดที่มีในปีการศึกษา ' + year + ' มาสร้างในตารางให้ทันที ยืนยันหรือไม่? (หมายเหตุ: ระบบจะไม่ลบแผนกวิชาเดิมที่มีอยู่แล้ว)')) {
                const yearOrders = state.orders.filter(o => o.year == year);
                const depts = [...new Set(yearOrders.map(o => o.dept))];
                
                if (!state.studentPopulations[year]) {
                    state.studentPopulations[year] = { _order: [], updateDate: new Date().toISOString() };
                }
                
                let currentOrder = Array.isArray(state.studentPopulations[year]._order) ? state.studentPopulations[year]._order : (state.studentPopulations[year]._order ? state.studentPopulations[year]._order.split(',') : []);
                
                let added = 0;
                depts.forEach(d => {
                    if (!state.studentPopulations[year][d] && d !== '_order' && d !== 'updateDate') {
                        state.studentPopulations[year][d] = { v1: 0, v2: 0, v3: 0 };
                        if (!currentOrder.includes(d)) currentOrder.push(d);
                        added++;
                    }
                });
                
                state.studentPopulations[year]._order = currentOrder.join(',');
                state.studentPopulations[year].updateDate = new Date().toISOString();
                savePopulationsToStorage();
                renderPopulationSection();
                
                if (added > 0) {
                    alert('ดึงรายชื่อสำเร็จ เพิ่มไปทั้งหมด ' + added + ' แผนก');
                } else {
                    alert('ไม่มีแผนกใหม่ให้ดึง (แผนกทั้งหมดมีในตารางแล้ว)');
                }
            }
        });
    }

    const addBtn = document.getElementById('addPopulationRowBtn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            if (!state.isAdmin) return;
            const year = document.getElementById('estimateYearSelect').value;
            if (!year) {
                alert('กรุณาเลือกปีการศึกษาก่อน');
                return;
            }
            const dept = prompt('กรอก "แผนกวิชา" ที่ต้องการเพิ่ม:');
            if (!dept || dept.trim() === '') return;
            
            const deptNorm = normalizeText(dept);
            if (!state.studentPopulations[year]) state.studentPopulations[year] = { _order: [], updateDate: new Date().toISOString() };
            
            let currentOrder = Array.isArray(state.studentPopulations[year]._order) ? state.studentPopulations[year]._order : (state.studentPopulations[year]._order ? state.studentPopulations[year]._order.split(',') : []);

            if (state.studentPopulations[year][deptNorm]) {
                alert('แผนกนี้มีอยู่แล้วในปีการศึกษานี้');
                return;
            }
            
            state.studentPopulations[year][deptNorm] = { v1: 0, v2: 0, v3: 0 };
            currentOrder.push(deptNorm);
            state.studentPopulations[year]._order = currentOrder.join(',');
            state.studentPopulations[year].updateDate = new Date().toISOString();
            
            savePopulationsToStorage();
            renderPopulationSection();
        });
    }
}

function savePopulationsToStorage() {
    localStorage.setItem('freebook_student_populations', JSON.stringify(state.studentPopulations));
    syncToFirebase('studentPopulations', state.studentPopulations);
}

function saveShowPopulationToStorage() {
    localStorage.setItem('freebook_show_student_population', state.showStudentPopulation);
    syncToFirebase('showStudentPopulation', state.showStudentPopulation);
}

function deletePopulationRow(year, dept) {
    if (!state.isAdmin) return;
    if (confirm('ต้องการลบแผนก ' + dept + ' ออกจากตารางจำนวนนักเรียนใช่หรือไม่?')) {
        delete state.studentPopulations[year][dept];
        
        let currentOrder = Array.isArray(state.studentPopulations[year]._order) ? state.studentPopulations[year]._order : (state.studentPopulations[year]._order ? state.studentPopulations[year]._order.split(',') : []);
        currentOrder = currentOrder.filter(d => d !== dept);
        
        state.studentPopulations[year]._order = currentOrder.join(',');
        state.studentPopulations[year].updateDate = new Date().toISOString();
        
        savePopulationsToStorage();
        renderPopulationSection();
    }
}

function updatePopulationField(year, dept, field, value) {
    if (!state.isAdmin) return;
    const num = parseInt(value) || 0;
    if (!state.studentPopulations[year]) return;
    if (!state.studentPopulations[year][dept]) return;
    
    state.studentPopulations[year][dept][field] = num;
    state.studentPopulations[year].updateDate = new Date().toISOString();
    savePopulationsToStorage();
    renderPopulationSection(); // Re-render to update chart and totals
}

function renderPopulationSection() {
    const targetYear = document.getElementById('estimateYearSelect')?.value || state.selectedYear;
    const section = document.getElementById('populationContentArea');
    const msg = document.getElementById('populationDisabledMessage');
    const toggle = document.getElementById('populationToggleSwitch');
    const updateLabel = document.getElementById('populationUpdateLabel');
    
    if (toggle) toggle.checked = state.showStudentPopulation;
    
    if (!state.showStudentPopulation && !state.isAdmin) {
        if(section) section.style.display = 'none';
        if(msg) msg.style.display = 'block';
        return;
    } else {
        if(section) section.style.display = 'block';
        if(msg) msg.style.display = 'none';
    }

    if (!state.studentPopulations[targetYear]) {
        state.studentPopulations[targetYear] = { _order: [], updateDate: new Date().toISOString() };
    }
    
    const yearData = state.studentPopulations[targetYear];
    
    // Format date
    if (updateLabel) {
        if (yearData.updateDate) {
            const d = new Date(yearData.updateDate);
            const months = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
            updateLabel.innerText = `อัปเดตล่าสุด: ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()+543} ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')} น.`;
        } else {
            updateLabel.innerText = 'อัปเดตล่าสุด: -';
        }
    }

    const tbody = document.getElementById('populationTableBody');
    const tfoot = document.getElementById('populationTableFoot');
    if (!tbody || !tfoot) return;
    
    tbody.innerHTML = '';
    tfoot.innerHTML = '';
    
    let currentOrder = Array.isArray(yearData._order) ? yearData._order : (yearData._order ? yearData._order.split(',') : []);
    
    // Auto-sync missing keys
    Object.keys(yearData).forEach(k => {
        if (k !== '_order' && k !== 'updateDate' && !currentOrder.includes(k)) {
            currentOrder.push(k);
        }
    });

    let sumV1 = 0, sumV2 = 0, sumV3 = 0, sumTotal = 0;
    
    if (currentOrder.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted" style="padding:2rem;">ไม่มีข้อมูล โปรดเพิ่มแผนกวิชา</td></tr>`;
        
        // Hide chart if no data
        const chartW = document.getElementById('populationChartWrapper');
        if (chartW) chartW.style.display = 'none';
        
        return;
    }

    const labels = [];
    const dsV1 = [];
    const dsV2 = [];
    const dsV3 = [];

    currentOrder.forEach((dept, idx) => {
        const dData = yearData[dept] || {v1:0, v2:0, v3:0};
        const total = (parseInt(dData.v1)||0) + (parseInt(dData.v2)||0) + (parseInt(dData.v3)||0);
        
        sumV1 += (parseInt(dData.v1)||0);
        sumV2 += (parseInt(dData.v2)||0);
        sumV3 += (parseInt(dData.v3)||0);
        sumTotal += total;

        labels.push(dept);
        dsV1.push(parseInt(dData.v1)||0);
        dsV2.push(parseInt(dData.v2)||0);
        dsV3.push(parseInt(dData.v3)||0);

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="text-center">${idx + 1}</td>
            <td><strong>${dept}</strong></td>
            <td class="text-center">
                ${state.isAdmin ? `<input type="number" class="form-control" style="text-align:center; max-width:100px; margin:0 auto;" value="${dData.v1||0}" onchange="updatePopulationField('${targetYear}', '${dept}', 'v1', this.value)">` : (dData.v1||0)}
            </td>
            <td class="text-center">
                ${state.isAdmin ? `<input type="number" class="form-control" style="text-align:center; max-width:100px; margin:0 auto;" value="${dData.v2||0}" onchange="updatePopulationField('${targetYear}', '${dept}', 'v2', this.value)">` : (dData.v2||0)}
            </td>
            <td class="text-center">
                ${state.isAdmin ? `<input type="number" class="form-control" style="text-align:center; max-width:100px; margin:0 auto;" value="${dData.v3||0}" onchange="updatePopulationField('${targetYear}', '${dept}', 'v3', this.value)">` : (dData.v3||0)}
            </td>
            <td class="text-center" style="color:var(--primary-color); font-weight:bold;">${total}</td>
            <td class="text-center admin-only hidden no-print">
                <div class="flex-gap" style="justify-content:center;">
                    <button class="btn btn-sm btn-outline" style="padding:0.2rem 0.4rem;" onclick="movePopulationRow('${targetYear}', '${dept}', -1)" ${idx === 0 ? 'disabled' : ''} title="เลื่อนขึ้น"><i class="fa-solid fa-arrow-up"></i></button>
                    <button class="btn btn-sm btn-outline" style="padding:0.2rem 0.4rem;" onclick="movePopulationRow('${targetYear}', '${dept}', 1)" ${idx === currentOrder.length - 1 ? 'disabled' : ''} title="เลื่อนลง"><i class="fa-solid fa-arrow-down"></i></button>
                    <button class="btn btn-sm btn-outline-danger" style="padding:0.2rem 0.4rem;" onclick="deletePopulationRow('${targetYear}', '${dept}')" title="ลบ"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });

    tfoot.innerHTML = `
        <tr style="background:var(--bg-muted); font-weight:bold;">
            <td colspan="2" class="text-right">รวมทั้งหมด</td>
            <td class="text-center">${sumV1}</td>
            <td class="text-center">${sumV2}</td>
            <td class="text-center">${sumV3}</td>
            <td class="text-center" style="color:var(--primary-color); font-size:1.1rem;">${sumTotal}</td>
            <td class="admin-only hidden no-print"></td>
        </tr>
    `;

    // Initialize/Update Chart
    const chartW = document.getElementById('populationChartWrapper');
    if (chartW) chartW.style.display = 'block';
    
    const ctx = document.getElementById('populationChart');
    if (ctx) {
        if (state.charts.population) {
            state.charts.population.destroy();
        }
        
        const chartColors = [
            '#3b82f6', // blue (V1)
            '#10b981', // green (V2)
            '#f59e0b'  // yellow/orange (V3)
        ];

        state.charts.population = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'ปวช.1',
                        data: dsV1,
                        backgroundColor: chartColors[0],
                        borderWidth: 0
                    },
                    {
                        label: 'ปวช.2',
                        data: dsV2,
                        backgroundColor: chartColors[1],
                        borderWidth: 0
                    },
                    {
                        label: 'ปวช.3',
                        data: dsV3,
                        backgroundColor: chartColors[2],
                        borderWidth: 0
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        stacked: false,
                        grid: { display: false }
                    },
                    y: {
                        stacked: false,
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                }
            }
        });
    }

    if (state.isAdmin) {
        document.querySelectorAll('#populationSection .admin-only').forEach(el => el.classList.remove('hidden'));
    }
}

window.movePopulationRow = function(year, dept, dir) {
    if (!state.isAdmin) return;
    const yearData = state.studentPopulations[year];
    if (!yearData || !yearData['_order']) return;
    
    let currentOrder = Array.isArray(yearData['_order']) ? yearData['_order'] : (yearData['_order'] ? yearData['_order'].split(',') : []);
    const idx = currentOrder.indexOf(dept);
    if (idx === -1) return;
    
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= currentOrder.length) return;
    
    // Swap
    const temp = currentOrder[idx];
    currentOrder[idx] = currentOrder[newIdx];
    currentOrder[newIdx] = temp;
    
    yearData['_order'] = currentOrder.join(',');
    yearData.updateDate = new Date().toISOString();
    savePopulationsToStorage();
    renderPopulationSection();
};