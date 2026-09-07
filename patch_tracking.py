import re

with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add renderTrackingTab to renderAllViews
content = content.replace("function renderAllViews() {", "function renderAllViews() {\n    renderTrackingTab();")

# 2. Add Tracking Events in initTabNavigation or create a separate initTrackingEvents
init_tracking_events_code = """
function initTrackingEvents() {
    // Filters
    const searchInput = document.getElementById('trackingSearchInput');
    const deptFilter = document.getElementById('trackingDeptFilter');
    const statusFilter = document.getElementById('trackingStatusFilter');
    
    if (searchInput) searchInput.addEventListener('input', renderTrackingTab);
    if (deptFilter) deptFilter.addEventListener('change', renderTrackingTab);
    if (statusFilter) statusFilter.addEventListener('change', renderTrackingTab);

    // Modals
    const updateModal = document.getElementById('trackingUpdateModal');
    if (updateModal) {
        document.getElementById('closeTrackingUpdateModalBtn').addEventListener('click', () => updateModal.classList.add('hidden'));
        document.getElementById('cancelTrackingUpdateBtn').addEventListener('click', () => updateModal.classList.add('hidden'));
        document.getElementById('saveTrackingUpdateBtn').addEventListener('click', saveTrackingUpdate);
    }

    const replaceModal = document.getElementById('trackingReplaceModal');
    if (replaceModal) {
        document.getElementById('closeTrackingReplaceModalBtn').addEventListener('click', () => replaceModal.classList.add('hidden'));
        document.getElementById('cancelTrackingReplaceBtn').addEventListener('click', () => replaceModal.classList.add('hidden'));
        document.getElementById('saveTrackingReplaceBtn').addEventListener('click', saveTrackingReplace);
        document.getElementById('revertReplaceBtn').addEventListener('click', revertTrackingReplace);
    }
}
"""

content = content.replace("function initTabNavigation() {", init_tracking_events_code + "\nfunction initTabNavigation() {")
content = content.replace("initTabNavigation();", "initTabNavigation();\n    initTrackingEvents();")

# 3. Generate Tracking Tab Rendering Logic
render_tracking_tab_code = """
function renderTrackingTab() {
    const tbody = document.getElementById('trackingTableBody');
    const deptFilter = document.getElementById('trackingDeptFilter');
    if (!tbody || !deptFilter) return;

    // Populate Dept filter if empty
    if (deptFilter.options.length <= 1) {
        const depts = [...new Set(state.orders.map(o => o.dept))].sort();
        depts.forEach(d => {
            const opt = document.createElement('option');
            opt.value = d; opt.textContent = d;
            deptFilter.appendChild(opt);
        });
    }

    const searchStr = (document.getElementById('trackingSearchInput').value || '').toLowerCase();
    const selectedDept = deptFilter.value;
    const selectedStatus = document.getElementById('trackingStatusFilter').value;

    let filtered = getFilteredOrders(); // uses selected year/term

    filtered = filtered.filter(o => {
        if (selectedDept !== 'ALL' && o.dept !== selectedDept) return false;
        
        const titleMatch = o.title.toLowerCase().includes(searchStr);
        const codeMatch = (o.code || '').toLowerCase().includes(searchStr);
        const repMatch = (o.remark || '').toLowerCase().includes(searchStr);
        if (searchStr && !titleMatch && !codeMatch && !repMatch) return false;

        const reqQty = o.qty || 0;
        const recQty = o.receivedQty || 0;
        const distQty = o.distributedQty || 0;
        
        if (selectedStatus === 'INCOMPLETE') {
            if (recQty >= reqQty && distQty >= reqQty) return false;
        } else if (selectedStatus === 'COMPLETE') {
            if (recQty < reqQty || distQty < reqQty) return false;
        }

        return true;
    });

    tbody.innerHTML = '';
    filtered.forEach((o, index) => {
        const reqQty = o.qty || 0;
        const recQty = o.receivedQty || 0;
        const distQty = o.distributedQty || 0;
        
        let statusHtml = '';
        if (recQty === 0 && distQty === 0) {
            statusHtml = '<span class="badge" style="background:#fee2e2; color:#dc2626;">ยังไม่รับ</span>';
        } else if (recQty >= reqQty && distQty >= reqQty) {
            statusHtml = '<span class="badge" style="background:#d1fae5; color:#047857;">ครบถ้วน</span>';
        } else {
            statusHtml = '<span class="badge" style="background:#fef3c7; color:#d97706;">มาบางส่วน</span>';
        }

        let titleHtml = o.title;
        if (o.isReplaced) {
            titleHtml = `<div style="color:var(--primary-color); font-weight:600;">${o.title}</div>
                         <div style="font-size:0.75rem; color:var(--text-muted);">มาแทน: ${o.originalTitle}</div>
                         <div style="font-size:0.75rem; color:var(--text-secondary);"><i class="fa-solid fa-note-sticky"></i> ${o.remark}</div>`;
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="text-center">${index + 1}</td>
            <td><span class="badge badge-dept">${o.dept}</span></td>
            <td>${o.code || '-'}</td>
            <td>${titleHtml}</td>
            <td class="text-right"><strong>${reqQty.toLocaleString()}</strong></td>
            <td class="text-right" style="color:${recQty < reqQty ? '#d97706' : '#047857'};">${recQty.toLocaleString()}</td>
            <td class="text-right" style="color:${distQty < reqQty ? '#d97706' : '#047857'};">${distQty.toLocaleString()}</td>
            <td class="text-center">${statusHtml}</td>
            <td class="text-center admin-only ${state.isAdmin ? '' : 'hidden'}">
                <button class="btn-table-action edit" title="อัปเดตยอดรับ/แจก" onclick="openTrackingUpdateModal('${o.id}')">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn-table-action" style="color:#8b5cf6; border-color:#c4b5fd;" title="เปลี่ยนหนังสือทดแทน" onclick="openTrackingReplaceModal('${o.id}')">
                    <i class="fa-solid fa-right-left"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.openTrackingUpdateModal = function(id) {
    const order = state.orders.find(o => o.id === id);
    if (!order) return;
    
    document.getElementById('trackingUpdateBookId').value = id;
    document.getElementById('trackingUpdateTitleText').textContent = order.title;
    document.getElementById('trackingOrderedQty').value = order.qty || 0;
    document.getElementById('trackingReceivedQty').value = order.receivedQty || 0;
    document.getElementById('trackingDistributedQty').value = order.distributedQty || 0;
    
    document.getElementById('trackingUpdateModal').classList.remove('hidden');
};

window.saveTrackingUpdate = function() {
    const id = document.getElementById('trackingUpdateBookId').value;
    const order = state.orders.find(o => o.id === id);
    if (!order) return;

    order.receivedQty = parseInt(document.getElementById('trackingReceivedQty').value) || 0;
    order.distributedQty = parseInt(document.getElementById('trackingDistributedQty').value) || 0;

    saveOrdersToStorage();
    renderTrackingTab();
    showToast('อัปเดตยอดรับ-แจกเรียบร้อยแล้ว', 'success');
    document.getElementById('trackingUpdateModal').classList.add('hidden');
};

window.openTrackingReplaceModal = function(id) {
    const order = state.orders.find(o => o.id === id);
    if (!order) return;
    
    document.getElementById('trackingReplaceBookId').value = id;
    
    const origTitle = order.isReplaced ? order.originalTitle : order.title;
    document.getElementById('trackingReplaceOriginalText').textContent = origTitle;
    
    if (order.isReplaced) {
        document.getElementById('replaceTitle').value = order.title;
        document.getElementById('replacePrice').value = order.price;
        document.getElementById('replacePublisher').value = order.publisher;
        document.getElementById('replaceRemark').value = order.remark || '';
        document.getElementById('revertReplaceBtn').style.display = 'block';
    } else {
        document.getElementById('replaceTitle').value = '';
        document.getElementById('replacePrice').value = '';
        document.getElementById('replacePublisher').value = '';
        document.getElementById('replaceRemark').value = '';
        document.getElementById('revertReplaceBtn').style.display = 'none';
    }
    
    document.getElementById('trackingReplaceModal').classList.remove('hidden');
};

window.saveTrackingReplace = function() {
    const id = document.getElementById('trackingReplaceBookId').value;
    const order = state.orders.find(o => o.id === id);
    if (!order) return;

    const newTitle = document.getElementById('replaceTitle').value.trim();
    const newPrice = parseFloat(document.getElementById('replacePrice').value);
    const newPub = document.getElementById('replacePublisher').value.trim();
    const remark = document.getElementById('replaceRemark').value.trim();

    if (!newTitle || isNaN(newPrice) || !newPub || !remark) {
        const err = document.getElementById('replaceErrorMsg');
        err.textContent = 'กรุณากรอกข้อมูลให้ครบทุกช่อง';
        err.classList.remove('hidden');
        return;
    }

    if (!order.isReplaced) {
        order.originalTitle = order.title;
        order.originalPrice = order.price;
        order.originalPublisher = order.publisher;
        order.isReplaced = true;
    }

    order.title = newTitle;
    order.price = newPrice;
    order.publisher = newPub;
    order.remark = remark;
    order.amount = order.price * order.qty;

    saveOrdersToStorage();
    renderAllViews();
    showToast('บันทึกการแทนที่หนังสือเรียบร้อยแล้ว', 'success');
    document.getElementById('trackingReplaceModal').classList.add('hidden');
};

window.revertTrackingReplace = function() {
    const id = document.getElementById('trackingReplaceBookId').value;
    const order = state.orders.find(o => o.id === id);
    if (!order || !order.isReplaced) return;

    if (confirm('คุณต้องการยกเลิกการแทนที่ และกลับไปใช้ข้อมูลหนังสือเดิมใช่หรือไม่?')) {
        order.title = order.originalTitle;
        order.price = order.originalPrice;
        order.publisher = order.originalPublisher;
        order.amount = order.price * order.qty;
        
        delete order.isReplaced;
        delete order.originalTitle;
        delete order.originalPrice;
        delete order.originalPublisher;
        delete order.remark;

        saveOrdersToStorage();
        renderAllViews();
        showToast('ยกเลิกการแทนที่เรียบร้อย', 'info');
        document.getElementById('trackingReplaceModal').classList.add('hidden');
    }
};
"""

content = content.replace("function renderAllViews() {", render_tracking_tab_code + "\nfunction renderAllViews() {")

with open("app.js", "w", encoding="utf-8") as f:
    f.write(content)
