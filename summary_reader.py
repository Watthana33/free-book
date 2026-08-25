import sys
import io

# Force stdout to utf-8 encoding for Windows console
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('full_dump.txt', encoding='utf-8') as f:
    lines = f.readlines()

current_sheet = ""
sheet_data = {}

for line in lines:
    if line.startswith("SHEET Index"):
        current_sheet = line.strip()
        sheet_data[current_sheet] = []
    elif current_sheet and line.strip():
        # filter out empty trailing rows if needed
        sheet_data[current_sheet].append(line.strip())

print(f"Total Sheets: {len(sheet_data)}\n")
for s_name, rows in sheet_data.items():
    print(f"=== {s_name} ===")
    print(f"Total non-empty printed rows: {len(rows)}")
    print("Top 10 rows:")
    for r in rows[:10]:
        print("  ", r[:120])
    print("-" * 60)
