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