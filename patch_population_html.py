import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the top header of tab-estimate
top_header_search = open('top_search.txt', 'r', encoding='utf-8').read().strip()
top_header_replace = '''<div class="header-titles">
                    <h2><i class="fa-solid fa-users-gear" style="color: #2563eb;"></i> ₇₯₣₣₇⚪௚₣⮫₣⮯₣₺₯₇⮫௟₣⯙⮪⯝⮫₯₣⮯₣₺₯₣⮫⯞⮪₣₥</h2>
                    <p>₇⮪⯛⮪⯚⮪⮯⮯⯦⯤⯦⯩₇₿₣₣₇⚪௚₣⮫₣⮯₣₺₯₇⮫௟₣⯙⮪⯝⮫₯₣⮯₣₺₯₣⮫⯞⮪₣⯝⮱₣₺₯₣⮯₣⮦</p>
                </div>'''
content = content.replace(top_header_search, top_header_replace)

# Remove the old toggle switch
# Tool: we'll just use regex to find the toggle div and replace it with empty
toggle_search = r'<div class="admin-only hidden no-print" style="display:flex; align-items:center; gap:0\.5rem; background:var\(--bg-muted\); padding:0\.4rem 0\.8rem; border-radius:var\(--radius-full\); border:1px solid var\(--border-color\);">\s^(input type="checkbox" id="estimateToggleSwitch"[^>]*>)\s*(<label for="estimateToggleSwitch"^>']+>).* ?</label>\s+</div>'
local_content = re.sub(toggle_search, '', content)

# Insert the POPULATION section
estimation_start_search = open('est_start_search.txt', 'r', encoding='utf-8').read().strip()
population_html = open('pop.html', 'r', encoding='utf-8').read()
content = local_content.replace(estimation_start_search, population_html + '\n' + estimation_start_search)

# Close div
end_search = open('end_search.txt', 'r', encoding='utf-8').read().strip()
end_replace = "                </div>\n            </div>\n        </section>"
content = content.replace(end_search, end_replace)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Patched index.html")
