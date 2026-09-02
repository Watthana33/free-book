import os

app_js_path = 'app.js'
with open(app_js_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add saveSelectedTermToStorage
new_func = """function saveOrdersToStorage() {"""
replacement_func = """function saveSelectedTermToStorage() {
    localStorage.setItem('freebook_selected_year', state.selectedYear);
    localStorage.setItem('freebook_selected_semester', state.selectedSemester);
}

function saveOrdersToStorage() {"""
content = content.replace(new_func, replacement_func)

# 2. Modify onTermChange
old_onterm = """    const onTermChange = () => {
        state.selectedYear = yearSelect.value;
        state.selectedSemester = semSelect.value;
        renderAllViews();
    };"""
new_onterm = """    const onTermChange = () => {
        state.selectedYear = yearSelect.value;
        state.selectedSemester = semSelect.value;
        saveSelectedTermToStorage();
        renderAllViews();
    };"""
content = content.replace(old_onterm, new_onterm)

# 3. Modify loadStateFromStorage
old_load = """    const savedAdmin = localStorage.getItem('freebook_is_admin');
    state.isAdmin = savedAdmin === 'true';"""
new_load = """    const savedYear = localStorage.getItem('freebook_selected_year');
    if (savedYear) state.selectedYear = savedYear;

    const savedSemester = localStorage.getItem('freebook_selected_semester');
    if (savedSemester) state.selectedSemester = savedSemester;

    const savedAdmin = localStorage.getItem('freebook_is_admin');
    state.isAdmin = savedAdmin === 'true';"""
content = content.replace(old_load, new_load)

with open(app_js_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Patched app.js successfully for persistence!")
