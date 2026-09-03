import re

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. State
state_search = r"showEstimateTab: true,"
state_replace = r"showEstimateTab: true,\n    studentPopulations: {},\n    showStudentPopulation: true,"
content = re.sub(state_search, state_replace, content)

# Load initial from localStorage in app.js init (usually top of file after state decl)
# Wait, let's just add it where state is initialized. Actually there is logic to load from localStorage.
# I will find where state.studentEstimates is loaded.
load_search = r"(if \(localStorage\.getItem\('freebook_student_estimates'\)\) \{\s*state\.studentEstimates = JSON\.parse\(localStorage\.getItem\('freebook_student_estimates'\)\);\s*\})"
load_replace = r"\1\nif (localStorage.getItem('freebook_student_populations')) {\n    state.studentPopulations = JSON.parse(localStorage.getItem('freebook_student_populations'));\n}\nif (localStorage.getItem('freebook_show_student_population') !== null) {\n    state.showStudentPopulation = localStorage.getItem('freebook_show_student_population') === 'true';\n}"
content = re.sub(load_search, load_replace, content)

# 2. Sync functions
sync_search = r"(function saveShowCheckToStorage\(\) \{[\s\S]*?\})"
sync_replace = r"\1\n\nfunction savePopulationsToStorage() {\n    localStorage.setItem('freebook_student_populations', JSON.stringify(state.studentPopulations));\n    syncToFirebase('studentPopulations', state.studentPopulations);\n}\n\nfunction saveShowPopulationToStorage() {\n    localStorage.setItem('freebook_show_student_population', state.showStudentPopulation);\n    syncToFirebase('showStudentPopulation', state.showStudentPopulation);\n}"
content = re.sub(sync_search, sync_replace, content)

# 3. Firebase listener update (on 'value')
fb_listen_search = r"(if \(data\.studentEstimates\) \{\s*state\.studentEstimates = data\.studentEstimates;\s*localStorage\.setItem\('freebook_student_estimates', JSON\.stringify\(state\.studentEstimates\)\);\s*\})"
fb_listen_replace = r"\1\n                if (data.studentPopulations) {\n                    state.studentPopulations = data.studentPopulations;\n                    localStorage.setItem('freebook_student_populations', JSON.stringify(state.studentPopulations));\n                }\n                if (data.showStudentPopulation !== undefined) {\n                    state.showStudentPopulation = data.showStudentPopulation;\n                    localStorage.setItem('freebook_show_student_population', state.showStudentPopulation);\n                    dataUpdated = true;\n                }"
content = re.sub(fb_listen_search, fb_listen_replace, content)

# 4. Firebase init update (on empty)
fb_init_search = r"(syncToFirebase\('studentEstimates', state\.studentEstimates \|\| \{\}\);\s*syncToFirebase\('showSubjectCheckDashboard', state\.showSubjectCheckDashboard\);)"
fb_init_replace = r"\1\n                syncToFirebase('studentPopulations', state.studentPopulations || {});\n                syncToFirebase('showStudentPopulation', state.showStudentPopulation);"
content = re.sub(fb_init_search, fb_init_replace, content)

# 5. Initialization call
init_call_search = r"initEstimateEvents\(\);"
init_call_replace = r"initEstimateEvents();\n    initPopulationEvents();"
content = re.sub(init_call_search, init_call_replace, content)

# 6. Render call
render_call_search = r"renderEstimateTab\(\);"
render_call_replace = r"renderEstimateTab();\n    renderPopulationSection();"
content = re.sub(render_call_search, render_call_replace, content)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Patched app.js part 1")