import os

html_path = 'index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_msg = """            <div id="auditDisabledMessage" style="text-align:center; padding: 4rem 1rem;">
                <i class="fa-solid fa-power-off mb-3" style="font-size:3rem; color:var(--text-muted); opacity:0.5;"></i>
                <h3 style="color:var(--text-muted);">โหมดตรวจสอบถูกปิดการใช้งาน</h3>
                <p style="color:var(--text-muted);">หากต้องการเทียบแผนการเรียน ให้เปิดสวิตช์ด้านบน</p>
            </div>"""
new_msg = """            <div id="auditDisabledMessage" style="text-align:center; padding: 4rem 1rem;">
                <i class="fa-solid fa-power-off mb-3" style="font-size:3rem; color:var(--text-muted); opacity:0.5;"></i>
                <h3 style="color:var(--text-muted);">โหมดตรวจสอบถูกปิดการใช้งาน</h3>
                <p style="color:var(--text-muted); margin-bottom: 2rem;">หากต้องการเทียบแผนการเรียน ให้คลิกเปิดใช้งานด้านล่างนี้เลยครับ</p>
                <button id="bigEnableAuditBtn" class="btn btn-primary" style="font-size: 1.2rem; padding: 0.8rem 2rem; border-radius: 8px;">
                    <i class="fa-solid fa-toggle-on"></i> เปิดโหมดตรวจสอบ
                </button>
            </div>"""
content = content.replace(old_msg, new_msg)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Patched index.html for big button successfully!")
