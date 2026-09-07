import re

def recover_index():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Add tracking tab button
    btn_target = '            <button class="tab-btn" id="estimateTabBtn" data-tab="tab-estimate">\n                <i class="fa-solid fa-users-gear"></i> ข้อมูลผู้เรียน\n            </button>'
    btn_replace = btn_target + '\n            <button class="tab-btn hidden" id="trackingTabBtn" data-tab="tab-tracking">\n                <i class="fa-solid fa-truck-ramp-box"></i> ตรวจรับ & แจกจ่ายหนังสือ\n            </button>'
    if 'id="trackingTabBtn"' not in html:
        html = html.replace(btn_target, btn_replace)

    # 2. Add tracking section
    section_target = '        </section>\n\n    </main>'
    section_content = """        </section>

        <!-- ==================================================== -->
        <!-- TAB 8: TRACKING & DISTRIBUTION -->
        <!-- ==================================================== -->
        <section id="tab-tracking" class="tab-content">
            <div class="content-header">
                <div class="header-titles">
                    <h2><i class="fa-solid fa-truck-ramp-box"></i> ระบบติดตามการรับ-แจกจ่ายหนังสือ (Tracking)</h2>
                    <p>ตรวจสอบยอดหนังสือที่จัดส่งจากสำนักพิมพ์ และยอดที่จ่ายให้แผนกวิชา พร้อมระบบจัดการหนังสือทดแทน</p>
                </div>
                <div class="header-actions no-print">
                    <button class="btn btn-outline" onclick="window.print()">
                        <i class="fa-solid fa-print"></i> พิมพ์รายงาน
                    </button>
                </div>
            </div>

            <div class="filter-card no-print">
                <div class="filter-grid">
                    <div class="filter-group">
                        <label><i class="fa-solid fa-magnifying-glass"></i> ค้นหาชื่อ/รหัส:</label>
                        <input type="text" id="trackingSearchInput" placeholder="พิมพ์คำค้นหา..." class="form-input">
                    </div>
                    <div class="filter-group">
                        <label><i class="fa-solid fa-filter"></i> แผนกวิชา:</label>
                        <select id="trackingDeptFilter" class="form-select">
                            <option value="ALL">-- ทั้งหมด --</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label><i class="fa-solid fa-filter"></i> สถานะการรับ/แจก:</label>
                        <select id="trackingStatusFilter" class="form-select">
                            <option value="ALL">-- ทั้งหมด --</option>
                            <option value="INCOMPLETE">ยังรับไม่ครบ / ยังไม่รับ</option>
                            <option value="COMPLETE">รับครบแล้ว</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="table-container printable-area-target">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th style="width: 40px;">ที่</th>
                            <th>แผนก</th>
                            <th>รหัสวิชา</th>
                            <th>ชื่อหนังสือ (หมายเหตุทดแทน)</th>
                            <th class="text-right">สั่งซื้อ</th>
                            <th class="text-right">รับแล้ว</th>
                            <th class="text-right">แจกแล้ว</th>
                            <th class="text-center" style="width: 100px;">สถานะ</th>
                            <th class="text-center no-print admin-only hidden" style="width: 150px;">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody id="trackingTableBody">
                        <!-- Dynamic Rows -->
                    </tbody>
                </table>
            </div>
        </section>
"""
    if 'id="tab-tracking"' not in html:
        html = html.replace(section_target, section_content + '\n    </main>')

    # 3. Add modals
    modal_target = '    <!-- Modal 3: Admin Change Password -->'
    modal_content = """    <!-- Modal: Update Tracking Qty -->
    <div id="trackingUpdateModal" class="modal-backdrop hidden">
        <div class="modal-box modal-sm">
            <div class="modal-header">
                <h3><i class="fa-solid fa-boxes-packing"></i> อัปเดตยอดรับ-แจกหนังสือ</h3>
                <button class="modal-close-btn" id="closeTrackingUpdateModalBtn">&times;</button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="trackingUpdateBookId">
                <p class="mb-3" id="trackingUpdateTitleText" style="font-weight:600; color:var(--text-primary);"></p>
                <div class="form-group mb-3">
                    <label for="trackingOrderedQty">ยอดสั่งซื้อ (อ้างอิง):</label>
                    <input type="number" id="trackingOrderedQty" class="form-input" disabled>
                </div>
                <div class="form-group mb-3">
                    <label for="trackingReceivedQty">ยอดรับจากสำนักพิมพ์ (Received):</label>
                    <div style="display: flex; gap: 0.5rem;">
                        <input type="number" id="trackingReceivedQty" class="form-input" min="0" placeholder="จำนวนเล่ม" style="flex: 1;">
                        <input type="date" id="trackingReceiveDate" class="form-input" style="flex: 1;" title="วันที่รับของ">
                    </div>
                </div>
                <div class="form-group mb-3">
                    <label for="trackingDistributedQty">ยอดแจกให้แผนก (Distributed):</label>
                    <div style="display: flex; gap: 0.5rem;">
                        <input type="number" id="trackingDistributedQty" class="form-input" min="0" placeholder="จำนวนเล่ม" style="flex: 1;">
                        <input type="date" id="trackingDistributeDate" class="form-input" style="flex: 1;" title="วันที่แจกของ">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline" id="cancelTrackingUpdateBtn">ยกเลิก</button>
                <button type="button" class="btn btn-primary" id="saveTrackingUpdateBtn">
                    <i class="fa-solid fa-floppy-disk"></i> บันทึกยอด
                </button>
            </div>
        </div>
    </div>

    <!-- Modal: Substitute Book -->
    <div id="trackingReplaceModal" class="modal-backdrop hidden">
        <div class="modal-box">
            <div class="modal-header">
                <h3><i class="fa-solid fa-right-left"></i> สับเปลี่ยนหนังสือทดแทน</h3>
                <button class="modal-close-btn" id="closeTrackingReplaceModalBtn">&times;</button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="trackingReplaceBookId">
                <div style="background:var(--bg-main); padding:0.8rem; border-radius:var(--radius-md); border:1px solid var(--border-color);" class="mb-4">
                    <p style="font-size:0.85rem; color:var(--text-secondary);">หนังสือเดิมที่ต้องการเปลี่ยน:</p>
                    <p id="trackingReplaceOriginalText" style="font-weight:600;"></p>
                </div>

                <div class="form-grid">
                    <div class="form-group full-width">
                        <label for="replaceTitle" class="required-label">ชื่อหนังสือเล่มใหม่:</label>
                        <input type="text" id="replaceTitle" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label for="replacePrice" class="required-label">ราคาเล่มใหม่ (บาท):</label>
                        <input type="number" id="replacePrice" class="form-input" min="0" required>
                    </div>
                    <div class="form-group">
                        <label for="replacePublisher" class="required-label">สำนักพิมพ์ใหม่:</label>
                        <input type="text" id="replacePublisher" class="form-input" required>
                    </div>
                    <div class="form-group full-width">
                        <label for="replaceRemark" class="required-label">หมายเหตุการเปลี่ยน:</label>
                        <input type="text" id="replaceRemark" class="form-input" placeholder="เช่น แทนวิชาเดิมเนื่องจากของขาด" required>
                    </div>
                </div>
                <div class="error-msg hidden" id="replaceErrorMsg"></div>
            </div>
            <div class="modal-footer" style="justify-content: space-between;">
                <button type="button" class="btn btn-danger-soft" id="revertReplaceBtn" style="display:none;">
                    <i class="fa-solid fa-rotate-left"></i> ยกเลิกการแทนที่ (กลับไปใช้เล่มเดิม)
                </button>
                <div style="display:flex; gap:0.5rem;">
                    <button type="button" class="btn btn-outline" id="cancelTrackingReplaceBtn">ยกเลิก</button>
                    <button type="button" class="btn btn-primary" id="saveTrackingReplaceBtn">
                        <i class="fa-solid fa-floppy-disk"></i> บันทึกการแทนที่
                    </button>
                </div>
            </div>
        </div>
    </div>
"""
    if 'id="trackingUpdateModal"' not in html:
        html = html.replace(modal_target, modal_content + '\n' + modal_target)

    # 4. Add admin setting toggle
    setting_target = '<span class="setting-label-text"><strong>แสดงกล่องรีเช็คจำนวนวิชาบน Dashboard</strong></span>\n                </div>'
    setting_content = """                <div class="admin-setting-row mb-4" style="background:var(--primary-light); padding:0.8rem 1rem; border-radius:var(--radius-md); border:1px solid var(--primary-color);">
                    <label class="switch-container">
                        <input type="checkbox" id="showTrackingTabToggle">
                        <span class="switch-slider"></span>
                    </label>
                    <span class="setting-label-text"><strong>เปิดให้ผู้ใช้ทั่วไปเห็นแท็บ "ตรวจรับ & แจกจ่าย"</strong></span>
                </div>"""
    if 'id="showTrackingTabToggle"' not in html:
        html = html.replace(setting_target, setting_target + '\n\n' + setting_content)

    # 5. Firebase Auth Script + Email Field
    if 'firebase-auth-compat.js' not in html:
        html = html.replace(
            '<script src="https://www.gstatic.com/firebasejs/10.1.0/firebase-database-compat.js"></script>',
            '<script src="https://www.gstatic.com/firebasejs/10.1.0/firebase-database-compat.js"></script>\n    <script src="https://www.gstatic.com/firebasejs/10.1.0/firebase-auth-compat.js"></script>'
        )

    email_field = """                <div class="form-group mb-3">
                    <label for="adminEmailInput">อีเมลผู้ดูแลระบบ (Admin Email):</label>
                    <input type="email" id="adminEmailInput" class="form-input" placeholder="admin@freebook.com">
                </div>
"""
    if 'id="adminEmailInput"' not in html:
        html = html.replace(
            '                    <label for="adminPasswordInput">รหัสผ่าน Admin:</label>',
            email_field + '                    <label for="adminPasswordInput">รหัสผ่าน Admin:</label>'
        )

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)

recover_index()
