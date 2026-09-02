import os

app_js_path = 'app.js'
with open(app_js_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_load = """    const savedCurriculum = localStorage.getItem('freebook_curriculum_plans');
    if (savedCurriculum) {
        try { state.curriculumPlans = JSON.parse(savedCurriculum); } catch(e){}
    }"""
new_load = """    const savedCurriculum = localStorage.getItem('freebook_curriculum_plans');
    if (savedCurriculum) {
        try { 
            const parsed = JSON.parse(savedCurriculum); 
            state.curriculumPlans = Array.isArray(parsed) ? parsed : [];
        } catch(e){
            state.curriculumPlans = [];
        }
    }"""
content = content.replace(old_load, new_load)

with open(app_js_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Patched app.js successfully!")
