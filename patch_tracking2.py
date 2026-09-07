import re

with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

# 1. State changes
if "showTrackingTab:" not in content:
    content = content.replace("showSubjectCheckDashboard: true,", "showSubjectCheckDashboard: true,\n    showTrackingTab: false,")

if "freebook_show_tracking_tab" not in content:
    content = content.replace("const savedShowCheck = localStorage.getItem('freebook_show_check_dashboard');", "const savedShowTracking = localStorage.getItem('freebook_show_tracking_tab');\n    if (savedShowTracking !== null) state.showTrackingTab = savedShowTracking === 'true';\n    const savedShowCheck = localStorage.getItem('freebook_show_check_dashboard');")

# 2. Add visibility toggle in renderAllViews
toggle_code = """
    const trackingBtn = document.getElementById('trackingTabBtn');
    if (trackingBtn) {
        if (state.isAdmin || state.showTrackingTab) {
            trackingBtn.classList.remove('hidden');
        } else {
            trackingBtn.classList.add('hidden');
        }
    }
"""
if "trackingBtn.classList.remove('hidden');" not in content:
    content = content.replace("function renderAllViews() {", "function renderAllViews() {\n" + toggle_code)

# 3. Update initTargetConfigEvents
if "showTrackingTabToggle" not in content:
    content = content.replace("document.getElementById('showSubjectCheckDashboardToggle').checked = state.showSubjectCheckDashboard;", "document.getElementById('showSubjectCheckDashboardToggle').checked = state.showSubjectCheckDashboard;\n    const trackingToggle = document.getElementById('showTrackingTabToggle');\n    if (trackingToggle) trackingToggle.checked = state.showTrackingTab;")
    
    content = content.replace("state.showSubjectCheckDashboard = document.getElementById('showSubjectCheckDashboardToggle').checked;", "state.showSubjectCheckDashboard = document.getElementById('showSubjectCheckDashboardToggle').checked;\n    const trackingToggle = document.getElementById('showTrackingTabToggle');\n    if (trackingToggle) {\n        state.showTrackingTab = trackingToggle.checked;\n        localStorage.setItem('freebook_show_tracking_tab', state.showTrackingTab);\n    }")

# 4. Dates formatting helper
date_helper = """
function formatShortDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const months = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()+543}`;
}
"""
if "formatShortDate" not in content:
    content = content + "\n" + date_helper

# 5. Modify renderTrackingTab to show dates
content = content.replace(
    "${recQty.toLocaleString()}",
    "${recQty.toLocaleString()}${o.receiveDate ? `<br><small style=\"font-size:0.7rem; color:var(--text-muted);\">${formatShortDate(o.receiveDate)}</small>` : ''}"
)
content = content.replace(
    "${distQty.toLocaleString()}",
    "${distQty.toLocaleString()}${o.distributeDate ? `<br><small style=\"font-size:0.7rem; color:var(--text-muted);\">${formatShortDate(o.distributeDate)}</small>` : ''}"
)

# 6. Modify openTrackingUpdateModal
content = content.replace(
    "document.getElementById('trackingDistributedQty').value = order.distributedQty || 0;",
    "document.getElementById('trackingDistributedQty').value = order.distributedQty || 0;\n    document.getElementById('trackingReceiveDate').value = order.receiveDate || '';\n    document.getElementById('trackingDistributeDate').value = order.distributeDate || '';"
)

# 7. Modify saveTrackingUpdate
content = content.replace(
    "order.distributedQty = parseInt(document.getElementById('trackingDistributedQty').value) || 0;",
    "order.distributedQty = parseInt(document.getElementById('trackingDistributedQty').value) || 0;\n    order.receiveDate = document.getElementById('trackingReceiveDate').value;\n    order.distributeDate = document.getElementById('trackingDistributeDate').value;"
)

with open("app.js", "w", encoding="utf-8") as f:
    f.write(content)
