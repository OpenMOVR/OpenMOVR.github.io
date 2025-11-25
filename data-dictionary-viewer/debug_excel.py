import pandas as pd
import json

# Read the Excel file
df = pd.read_excel('/home/andre/MDA/MOVR_DATA_HUB_v2/docs/MDA MOVR_Data Dictionary_SMA_DMD_ENHANCED_READ-ONLY.xlsx')

print("All column names with indices:")
for i, col in enumerate(df.columns):
    print(f"Index {i}: '{col}'")

print(f"\nSample data from first 5 rows:")
print("File/Form:", df.iloc[0:5, 0].tolist())
print("Column 1 (index 1):", df.iloc[0:5, 1].tolist())  
print("Column 2 (index 2):", df.iloc[0:5, 2].tolist())
print("Column 3 (index 3):", df.iloc[0:5, 3].tolist())

# Check what's actually in the SECTION column
section_col = df.columns[3]  # Should be SECTION 
print(f"\nSECTION column ('{section_col}') unique values:")
section_values = df[section_col].dropna().unique()
print(f"Found {len(section_values)} unique sections:")
for val in sorted(section_values):
    print(f"  - '{val}'")

# Let's also check column 1 (Repeat Group Name)
repeat_col = df.columns[1]
print(f"\nRepeat Group column ('{repeat_col}') unique values:")
repeat_values = df[repeat_col].dropna().unique()  
print(f"Found {len(repeat_values)} unique repeat groups:")
for val in sorted(repeat_values):
    print(f"  - '{val}'")