import openpyxl
import json
import pandas as pd

excel_path = r"C:\Users\Acer\Desktop\free_book\รายการสั่งหนังสือ วิทยาลัยเทคนิคอุดรธานี2569.xlsx"

# Using pandas to inspect excel sheets
xl = pd.ExcelFile(excel_path)
print("Sheet names from pandas:", xl.sheet_names)

analysis = {}

for sheet_name in xl.sheet_names:
    df = pd.read_excel(excel_path, sheet_name=sheet_name)
    analysis[sheet_name] = {
        "shape": df.shape,
        "columns": [str(c) for c in df.columns.tolist()],
        "head_5": df.head(5).astype(str).to_dict(orient='records')
    }

with open("excel_analysis.json", "w", encoding="utf-8") as f:
    json.dump(analysis, f, ensure_ascii=False, indent=2)

print("\n--- Summary of Sheets ---")
for sheet, info in analysis.items():
    print(f"Sheet: {sheet}")
    print(f"  Shape: {info['shape']} (rows, cols)")
    print(f"  Columns: {info['columns'][:10]}")
    print("-" * 50)
