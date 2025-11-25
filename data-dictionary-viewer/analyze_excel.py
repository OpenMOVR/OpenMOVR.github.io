import pandas as pd
import json

# Read the Excel file
df = pd.read_excel('/home/andre/MDA/MOVR_DATA_HUB_v2/docs/MDA MOVR_Data Dictionary_SMA_DMD_ENHANCED_READ-ONLY.xlsx')

# Clean up column names by removing trailing whitespace
df.columns = df.columns.str.strip()

print("Column names:")
for i, col in enumerate(df.columns):
    print(f"Column {i+1}: {col}")

print(f"\nDataFrame shape: {df.shape}")
print("\nFirst few rows:")
print(df.head())

print("\nUnique values in SECTION column:")
if 'SECTION' in df.columns:
    section_values = df['SECTION'].dropna()
    print(f"Non-null sections: {len(section_values)} out of {len(df)}")
    print(df['SECTION'].value_counts())

# Convert to JSON for the webapp
data = df.fillna('').to_dict('records')
with open('/home/andre/MDA/MOVR_DATA_HUB_v2/data-dictionary-viewer/data_dictionary.json', 'w') as f:
    json.dump(data, f, indent=2)

print(f"\nData exported to data_dictionary.json with {len(data)} records")