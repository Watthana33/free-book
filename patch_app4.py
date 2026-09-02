import os
import re

app_js_path = 'app.js'
with open(app_js_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace DOMContentLoaded with a try-catch block that alerts
old_dom_start = "document.addEventListener('DOMContentLoaded', () => {"
new_dom_start = """document.addEventListener('DOMContentLoaded', () => {
    try {"""

old_dom_end = """    renderAllViews();
});"""
new_dom_end = """    renderAllViews();
    } catch (error) {
        alert("CRITICAL ERROR IN APP.JS: " + error.message + "\\n" + error.stack);
        console.error(error);
    }
});"""

content = content.replace(old_dom_start, new_dom_start)
content = content.replace(old_dom_end, new_dom_end)

with open(app_js_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Patched app.js with try-catch alert successfully!")
