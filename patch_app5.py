import os

app_js_path = 'app.js'
with open(app_js_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_events = """    const clearCurriculumBtn = document.getElementById('clearCurriculumBtn');

    if (!auditToggleSwitch) return;"""
new_events = """    const clearCurriculumBtn = document.getElementById('clearCurriculumBtn');
    const bigEnableAuditBtn = document.getElementById('bigEnableAuditBtn');

    if (!auditToggleSwitch) return;

    if (bigEnableAuditBtn) {
        bigEnableAuditBtn.addEventListener('click', () => {
            auditToggleSwitch.checked = true;
            state.isAuditEnabled = true;
            saveAuditToggleToStorage();
            updateAuditUI();
        });
    }"""
content = content.replace(old_events, new_events)

with open(app_js_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Patched app.js for big button successfully!")
