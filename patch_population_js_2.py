import os

funcs = '''
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
            
            if (confirm('ต้องการดึงรายชื่อแผนกวิชาทั้งหมดที่มีในปีการศึกษา ' + year + ' มาสร้างตารางจำนวนนักเรียนหรือไม่? (ข้อมูลเดิมในตารางนี้จะถูกคงไว้ แผนกใหม่จะถูกเพิ่ม)')) {
                const yearOrders = state.orders.filter(o => o.year == year);
                const depts = [...new Set(yearOrders.map(o => o.dept))];
                
                if (!state.studentPopulations[year]) {
                    state.studentPopulations[year] = { _order: [], updateDate: new Date().toISOString() };
                }
                
                let currentOrder = Array.isArray(state.studentPopulations[year]._order) ? state.studentPopulations[year]._order : (state.studentPopulations[year]._order ? state.studentPopulations[year]._order.split(',') : []);
                
                let added = 0;
                depts.forEach(d => {
                    if (!state.studentPopulations[year][d]) {
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
                    showToast('เพิ่ม ' + added + ' แผนกวิชาเรียบร้อยแล้ว', 'success');
                } else {
                    showToast('แผนกวิชาทั้งหมดมีอยู่ในตารางแล้ว', 'info');
                }
            }
        });
    }
}

function editPopulationCell(year, dept, field) {
    if (!state.isAdmin) return;
    
    const yearData = state.studentPopulations[year];
    if (!yearData || !yearData[dept]) return;
    
    let label = field === 'v1' ? 'ปวช.1' : (field === 'v2' ? 'ปวช.2' : 'ปวช.3');
    
    const currentVal = yearData[dept][field] || 0;
    const input = prompt(ระบุจำนวนนักเรียน  แผนกวิชา :, currentVal);
    
    if (input !== null) {
        const val = parseInt(input, 10);
        if (!isNaN(val) && val >= 0) {
            yearData[dept][field] = val;
            yearData.updateDate = new Date().toISOString();
            savePopulationsToStorage();
            renderPopulationSection();
        } else if (input.trim() === '') {
            yearData[dept][field] = 0;
            yearData.updateDate = new Date().toISOString();
            savePopulationsToStorage();
            renderPopulationSection();
        } else {
            alert("กรุณากรอกตัวเลขที่ถูกต้อง");
        }
    }
}

function removePopulationRow(year, dept) {
    if (!state.isAdmin) return;
    
    if (confirm('ต้องการลบข้อมูลแผนก ' + dept + ' ออกจากตารางจำนวนนักเรียนหรือไม่?')) {
        delete state.studentPopulations[year][dept];
        
        let currentOrder = state.studentPopulations[year]._order.split(',');
        currentOrder = currentOrder.filter(d => d !== dept);
        state.studentPopulations[year]._order = currentOrder.join(',');
        
        state.studentPopulations[year].updateDate = new Date().toISOString();
        savePopulationsToStorage();
        renderPopulationSection();
    }
}

function formatThaiDate(isoString) {
    if (!isoString) return '-';
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return '-';
    
    const day = d.getDate();
    const months = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    const month = months[d.getMonth()];
    const year = d.getFullYear() + 543;
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    
    return ${day}   เวลา : น.;
}

function renderPopulationSection() {
    const section = document.getElementById('populationContentArea');
    const msg = document.getElementById('populationDisabledMessage');
    const toggle = document.getElementById('populationToggleSwitch');
    const updateLabel = document.getElementById('populationUpdateLabel');
    
    if (toggle) toggle.checked = state.showStudentPopulation;
    
    if (!state.showStudentPopulation && !state.isAdmin) {
        section.style.display = 'none';
        msg.style.display = 'block';
        return;
    }
    
    section.style.display = 'block';
    msg.style.display = 'none';
    
    const targetYear = document.getElementById('estimateYearSelect')?.value || state.selectedYear;
    if (!targetYear) return;
    
    const tbody = document.getElementById('populationTableBody');
    const tfoot = document.getElementById('populationTableFoot');
    if (!tbody || !tfoot) return;
    
    tbody.innerHTML = '';
    tfoot.innerHTML = '';
    
    if (!state.studentPopulations[targetYear]) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted py-4">ไม่มีข้อมูลจำนวนนักเรียนสำหรับปีการศึกษานี้ (เฉพาะ Admin ที่เพิ่มข้อมูลได้)</td></tr>';
        if (window.populationChartInstance) {
            window.populationChartInstance.destroy();
        }
        document.getElementById('populationChartWrapper').style.display = 'none';
        if(updateLabel) updateLabel.innerText = 'อัปเดตล่าสุด: -';
        return;
    }
    
    const yearData = state.studentPopulations[targetYear];
    let depts = [];
    if (yearData._order) {
        depts = yearData._order.split(',').filter(d => yearData[d]);
    } else {
        depts = Object.keys(yearData).filter(k => k !== '_order' && k !== 'updateDate').sort();
    }
    
    if (updateLabel) {
        updateLabel.innerText = 'อัปเดตล่าสุด: ' + formatThaiDate(yearData.updateDate);
    }
    
    if (depts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted py-4">ไม่มีข้อมูลแผนกวิชา กรุณากดปุ่ม "ดึงแผนกอัตโนมัติ"</td></tr>';
        if (window.populationChartInstance) {
            window.populationChartInstance.destroy();
        }
        document.getElementById('populationChartWrapper').style.display = 'none';
        return;
    }
    
    let sum1 = 0, sum2 = 0, sum3 = 0;
    
    depts.forEach((dept, idx) => {
        const d = yearData[dept];
        const v1 = d.v1 || 0;
        const v2 = d.v2 || 0;
        const v3 = d.v3 || 0;
        const total = v1 + v2 + v3;
        
        sum1 += v1;
        sum2 += v2;
        sum3 += v3;
        
        const tr = document.createElement('tr');
        const cellClass = state.isAdmin ? 'cursor:pointer; transition: background 0.2s;' : '';
        const hoverAttr = state.isAdmin ? 'onmouseover="this.style.backgroundColor=\\'#f1f5f9\\'" onmouseout="this.style.backgroundColor=\\'transparent\\'"' : '';
        
        tr.innerHTML = 
            <td class="text-center"></td>
            <td><strong></strong></td>
            <td class="text-center" style=""  onclick="editPopulationCell('', '', 'v1')"></td>
            <td class="text-center" style=""  onclick="editPopulationCell('', '', 'v2')"></td>
            <td class="text-center" style=""  onclick="editPopulationCell('', '', 'v3')"></td>
            <td class="text-center" style="font-weight:bold; color:var(--primary-color); background:#eff6ff;"></td>
            <td class="text-center admin-only hidden no-print">
                <button class="btn btn-sm btn-outline-danger" style="padding:0.2rem 0.4rem;" onclick="removePopulationRow('', '')" title="ลบ"><i class="fa-solid fa-trash"></i></button>
            </td>
        ;
        tbody.appendChild(tr);
    });
    
    const sumTotal = sum1 + sum2 + sum3;
    
    tfoot.innerHTML = 
        <tr style="background:var(--bg-muted);">
            <td colspan="2" class="text-right"><strong>รวมทั้งสิ้น:</strong></td>
            <td class="text-center"><strong></strong></td>
            <td class="text-center"><strong></strong></td>
            <td class="text-center"><strong></strong></td>
            <td class="text-center" style="color:var(--primary-color); background:#dbeafe;"><strong></strong></td>
            <td class="admin-only hidden no-print"></td>
        </tr>
    ;
    
    if (state.isAdmin) {
        document.querySelectorAll('#populationSection .admin-only').forEach(el => el.classList.remove('hidden'));
    }
    
    // Chart
    if (window.populationChartInstance) {
        window.populationChartInstance.destroy();
    }
    
    const chartCtx = document.getElementById('populationChart');
    const chartWrapper = document.getElementById('populationChartWrapper');
    if (chartCtx && chartWrapper) {
        chartWrapper.style.display = 'block';
        window.populationChartInstance = new Chart(chartCtx, {
            type: 'bar',
            data: {
                labels: depts,
                datasets: [
                    {
                        label: 'ปวช.1',
                        data: depts.map(d => yearData[d].v1 || 0),
                        backgroundColor: '#3b82f6'
                    },
                    {
                        label: 'ปวช.2',
                        data: depts.map(d => yearData[d].v2 || 0),
                        backgroundColor: '#10b981'
                    },
                    {
                        label: 'ปวช.3',
                        data: depts.map(d => yearData[d].v3 || 0),
                        backgroundColor: '#f59e0b'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top', labels: { font: { family: "'Sarabun', sans-serif" } } }
                },
                scales: {
                    y: { beginAtZero: true, stacked: true },
                    x: { stacked: true }
                }
            }
        });
    }
}
'''
with open('app.js', 'a', encoding='utf-8') as f:
    f.write(funcs)
print("Appended population logic to app.js")