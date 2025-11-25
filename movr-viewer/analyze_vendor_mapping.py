import pandas as pd
import json

# Read the vendor mapping Excel file
df = pd.read_excel('/home/andre/MDA/MOVR_DATA_HUB_v2/docs/MDA_Mapping_To_Citizen_Health_READ_ONLY.xlsx')

# Clean up column names
df.columns = df.columns.str.strip()

print("Vendor Mapping File Analysis:")
print("=" * 50)
print(f"Shape: {df.shape}")
print("\nColumn names:")
for i, col in enumerate(df.columns):
    print(f"Column {i+1}: '{col}'")

print(f"\nFirst 5 rows:")
print(df.head())

print(f"\nData types:")
print(df.dtypes)

# Check for the columns you mentioned
target_columns = ['mda_variable', 'citizen_resource', 'citizen_coverage_status', 
                 'citizen_level_of_effort', 'comments']

print(f"\nLooking for target columns:")
for col in target_columns:
    matching_cols = [c for c in df.columns if col.lower() in c.lower()]
    if matching_cols:
        print(f"✓ Found matches for '{col}': {matching_cols}")
    else:
        print(f"✗ No matches for '{col}'")

print(f"\nSample unique values from potential key columns:")
for col in df.columns[:6]:  # Check first 6 columns
    unique_vals = df[col].dropna().unique()[:10]  # First 10 unique values
    print(f"\n{col}: {len(df[col].dropna())} non-null values")
    print(f"Sample values: {list(unique_vals)}")

# Check for resource/section-like data
if 'citizen_resource' in [c.lower() for c in df.columns]:
    resource_col = next(c for c in df.columns if 'citizen_resource' in c.lower())
    print(f"\nUnique resource categories:")
    print(df[resource_col].value_counts().head(20))

print(f"\nColumns containing 'citizen' or 'resource' or 'coverage' or 'effort':")
relevant_cols = [c for c in df.columns if any(word in c.lower() 
                for word in ['citizen', 'resource', 'coverage', 'effort', 'mda', 'comment'])]
for col in relevant_cols:
    print(f"- {col}")