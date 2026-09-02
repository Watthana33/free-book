import os

app_js_path = 'app.js'
with open(app_js_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_sync = """            if (data.curriculumPlans !== undefined) {
                state.curriculumPlans = data.curriculumPlans || [];
                localStorage.setItem('freebook_curriculum_plans', JSON.stringify(state.curriculumPlans));
                dataUpdated = true;
            }"""
new_sync = """            if (data.curriculumPlans !== undefined) {
                let plans = data.curriculumPlans || [];
                // Firebase sometimes converts arrays to objects if indices are non-sequential
                if (typeof plans === 'object' && !Array.isArray(plans)) {
                    plans = Object.values(plans).filter(Boolean);
                }
                state.curriculumPlans = Array.isArray(plans) ? plans : [];
                localStorage.setItem('freebook_curriculum_plans', JSON.stringify(state.curriculumPlans));
                dataUpdated = true;
            }"""
content = content.replace(old_sync, new_sync)

with open(app_js_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Patched app.js sync logic successfully!")
