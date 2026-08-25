import pandas as pd
import json

excel_path = r"C:\Users\Acer\Desktop\free_book\รายการสั่งหนังสือ วิทยาลัยเทคนิคอุดรธานี2569.xlsx"
xl = pd.ExcelFile(excel_path)

with open("sheets_detail.txt", "w", encoding="utf-8") as out:
    out.write(f"Sheet names: {xl.sheet_names}\n\n")
    for sname in xl.sheet_names:
        df = pd.read_excel(excel_path, sheet_name=sname)
        df_clean = df.dropna(how='all').dropna(how='all', axis=1)
        out.write(f"=========================================\n")
        out.write(f"Sheet: {repr(sname)} (shape: {df_clean.shape})\n")
        out.write(f"=========================================\n")
        out.write("Columns:\n" + str(df_clean.columns.tolist()) + "\n\n")
        out.write("Head 20 rows:\n")
        out.write(df_clean.head(20).to_string() + "\n\n")

print("Exported sheets_detail.txt successfully!")
