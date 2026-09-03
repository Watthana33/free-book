import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the top header of tab-estimate
top_header_search = r'<div class="header-titles">\s*<h2><i class="fa-solid fa-users-gear"[^>]*></i> ประมาณการผู้เรียน \(รับใหม่ ปวช\.1\)</h2>\s*<p>ระบบคำนวณและเก็บสถิติเพื่อใช้อ้างอิงสัดส่วนยอดจัดสรรหนังสือเทียบกับแผนรับนักศึกษาใหม่ </p>\s*</div>'
top_header_replace = '''<div class="header-titles">
                    <h2><i class="fa-solid fa-users-gear" style="color: #2563eb;"></i> ข้อมูลผู้เรียน และ ประมาณการ</h2>
                    <p>ระบบจัดเก็บสถิติจำนวนนักเรียนและประมาณการผู้เรียน ปวช.1</p>
                </div>'''
content = re.sub(top_header_search, top_header_replace, content)

# Remove the old toggle switch from the top header
toggle_search = r'<div class="admin-only hidden no-print" style="display:flex; align-items:center; gap:0\.5rem; background:var\(--bg-muted\); padding:0\.4rem 0\.8rem; border-radius:var\(--radius-full\); border:1px solid var\(--border-color\);">\s*<input type="checkbox" id="estimateToggleSwitch"[^>]*>\s*<label for="estimateToggleSwitch"[^>]*>เปิดใช้งานแท็บนี้</label>\s*</div>'
content = re.sub(toggle_search, '', content)

# Insert the POPULATION section and wrap ESTIMATION before the table-print-header
estimation_start_search = r'(<div class="printable-area-target" id="estimatePrintArea">\s*<div class="table-print-header">)'

population_html = '''
            <!-- POPULATION SECTION (NEW) -->
            <div class="report-section mb-5" id="populationSection">
                <div class="flex-gap mb-3" style="align-items:center; justify-content:space-between; flex-wrap:wrap;">
                    <h3 style="color:var(--primary-color); border-left:4px solid var(--primary-color); padding-left:10px; margin:0;"><i class="fa-solid fa-users"></i> จำนวนนักเรียนทั้งหมด (ปวช.1 - ปวช.3)</h3>
                    
                    <div class="admin-only hidden no-print flex-gap" style="align-items:center; flex-wrap:wrap;">
                        <span id="populationUpdateLabel" style="font-size:0.85rem; color:var(--text-secondary); background:var(--bg-muted); padding:0.4rem 0.8rem; border-radius:var(--radius-full);">อัปเดตล่าสุด: -</span>
                        <div style="display:flex; align-items:center; gap:0.5rem; background:var(--bg-muted); padding:0.4rem 0.8rem; border-radius:var(--radius-full); border:1px solid var(--border-color);">
                            <input type="checkbox" id="populationToggleSwitch" style="width:1.2rem; height:1.2rem; cursor:pointer;">
                            <label for="populationToggleSwitch" style="margin:0; font-weight:600; cursor:pointer;">แสดงตารางนี้</label>
                        </div>
                        <button class="btn btn-sm btn-outline" id="autoFillPopulationBtn" title="ดึงรายชื่อแผนกทั้งหมดที่มีในระบบมาสร้างตาราง">
                            <i class="fa-solid fa-gears"></i> ดึงแผนกอัตโนมัติ
                        </button>
                    </div>
                </div>

                <!-- Disabled message for Population -->
                <div id="populationDisabledMessage" style="text-align:center; padding: 2rem; display:none; background:var(--bg-main); border-radius:var(--radius-md);" class="no-print">
                    <p style="color:var(--text-muted); margin:0;"><i class="fa-solid fa-eye-slash"></i> ถูกปิดการแสดงผลไว้โดยผู้ดูแลระบบ</p>
                </div>

                <div id="populationContentArea">
                    <!-- Chart -->
                    <div class="chart-card full-width mb-4 no-print" style="display:none;" id="populationChartWrapper">
                        <div class="chart-header">
                            <h3><i class="fa-solid fa-chart-bar"></i> กราฟจำนวนนักเรียน ปวช.1-3 แต่ละแผนก</h3>
                        </div>
                        <div class="chart-body" style="height: 350px;">
                            <canvas id="populationChart"></canvas>
                        </div>
                    </div>

                    <!-- Table -->
                    <div class="table-container">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th width="60" class="text-center">ที่</th>
                                    <th>แผนกวิชา</th>
                                    <th class="text-center" width="120">ปวช.1</th>
                                    <th class="text-center" width="120">ปวช.2</th>
                                    <th class="text-center" width="120">ปวช.3</th>
                                    <th class="text-center" width="120" style="color:var(--primary-color);">รวมทั้งหมด</th>
                                    <th class="text-center admin-only hidden no-print" width="80">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody id="populationTableBody">
                                <!-- JS injected -->
                            </tbody>
                            <tfoot id="populationTableFoot">
                                <!-- JS injected -->
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
            
            <hr style="border-color:var(--border-color); margin: 2rem 0;">

            <!-- ESTIMATION SECTION -->
            <div class="report-section" id="estimateSection">
                <div class="flex-gap mb-3" style="align-items:center; justify-content:space-between; flex-wrap:wrap;">
                    <h3 style="color:var(--secondary-color); border-left:4px solid var(--secondary-color); padding-left:10px; margin:0;"><i class="fa-solid fa-users-gear"></i> ประมาณการผู้เรียนรับใหม่ (ปวช.1)</h3>
                    
                    <div class="admin-only hidden no-print flex-gap" style="align-items:center;">
                        <div style="display:flex; align-items:center; gap:0.5rem; background:var(--bg-muted); padding:0.4rem 0.8rem; border-radius:var(--radius-full); border:1px solid var(--border-color);">
                            <input type="checkbox" id="estimateToggleSwitch" style="width:1.2rem; height:1.2rem; cursor:pointer;">
                            <label for="estimateToggleSwitch" style="margin:0; font-weight:600; cursor:pointer;" id="estimateToggleLabel">แสดงตารางนี้</label>
                        </div>
                    </div>
                </div>
\\1'''
content = re.sub(estimation_start_search, population_html, content)

# Remove the old add/autofill buttons inside the estimation area since we moved the toggle up
old_estimation_buttons_search = r'<div class="admin-only hidden no-print" style="margin-bottom: 1rem; text-align: right;">\s*<button class="btn btn-sm btn-outline" id="addEstimateRowBtn" style="border-style: dashed;">\s*<i class="fa-solid fa-plus"></i> เพิ่มข้อมูลแผนกวิชา\s*</button>\s*<button class="btn btn-sm btn-outline" id="autoFillEstimateBtn"[^>]*>\s*<i class="fa-solid fa-gears"></i> ดึงแผนกอัตโนมัติ\s*</button>\s*</div>'

new_estimation_buttons = '''<div class="admin-only hidden no-print" style="margin-bottom: 1rem; text-align: right;">
                    <button class="btn btn-sm btn-outline" id="addEstimateRowBtn" style="border-style: dashed;">
                        <i class="fa-solid fa-plus"></i> เพิ่มข้อมูลแผนกวิชา
                    </button>
                    <button class="btn btn-sm btn-outline" id="autoFillEstimateBtn" style="margin-left: 0.5rem;" title="ดึงรายชื่อแผนกทั้งหมดที่มีในระบบมาสร้างตารางให้ทันที">
                        <i class="fa-solid fa-gears"></i> ดึงแผนกอัตโนมัติ
                    </button>
                </div>'''
# Wait, actually we can just leave the buttons there, they are fine. I will just delete this regex.

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Patched index.html")