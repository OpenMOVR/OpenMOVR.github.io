import pandas as pd
import json

# Read the vendor mapping Excel file
df = pd.read_excel('/home/andre/MDA/MOVR_DATA_HUB_v2/docs/MDA_Mapping_To_Citizen_Health_READ_ONLY.xlsx')

# Clean up column names
df.columns = df.columns.str.strip()

print("Processing Vendor Mapping Data...")
print("=" * 50)

# Skip the header row (appears to be descriptions)
df_clean = df[1:].copy()

print(f"Data shape after removing header: {df_clean.shape}")
print(f"Total records: {len(df_clean)}")

# Clean and standardize the data
df_clean['mda_variable'] = df_clean['mda_variable'].fillna('')
df_clean['citizen_resource'] = df_clean['citizen_resource'].fillna('')
df_clean['citizen_coverage_status'] = df_clean['citizen_coverage_status'].fillna('')
df_clean['citizen_level_of_effort'] = df_clean['citizen_level_of_effort'].fillna('')
df_clean['Comments'] = df_clean['Comments'].fillna('')
df_clean['MDA Input Requested'] = df_clean['MDA Input Requested'].fillna('')

# Clean up resource categories (remove extra spaces, normalize)
df_clean['citizen_resource'] = df_clean['citizen_resource'].str.strip()
df_clean['citizen_coverage_status'] = df_clean['citizen_coverage_status'].str.strip()
df_clean['citizen_level_of_effort'] = df_clean['citizen_level_of_effort'].str.strip()

# Show statistics
print(f"\nCoverage Status Distribution:")
coverage_stats = df_clean['citizen_coverage_status'].value_counts()
print(coverage_stats)

print(f"\nEffort Level Distribution:")
effort_stats = df_clean['citizen_level_of_effort'].value_counts()
print(effort_stats)

print(f"\nTop Resource Categories:")
resource_stats = df_clean['citizen_resource'].value_counts().head(15)
print(resource_stats)

# Filter out completely empty rows
df_final = df_clean[df_clean['mda_variable'].str.len() > 0].copy()

print(f"\nFinal data shape: {df_final.shape}")
print(f"Records with MDA variables: {len(df_final)}")

# Add some computed fields for better filtering
df_final['has_comments'] = df_final['Comments'].str.len() > 0
df_final['mda_input_needed'] = df_final['MDA Input Requested'].str.len() > 0

# Convert to JSON for the webapp - handle NaN values properly
data = df_final.to_dict('records')

# Clean NaN values from the data (pandas exports NaN as literal "NaN" which breaks JSON)
def clean_nan_values(obj):
    if isinstance(obj, dict):
        return {k: clean_nan_values(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [clean_nan_values(item) for item in obj]
    elif pd.isna(obj):
        return ""  # Convert NaN to empty string
    else:
        return obj

# Apply NaN cleaning to all data
print("Cleaning NaN values from data...")
data_cleaned = [clean_nan_values(record) for record in data]

# Create summary statistics
summary_stats = {
    'total_variables': len(data_cleaned),
    'coverage_breakdown': coverage_stats.to_dict(),
    'effort_breakdown': effort_stats.to_dict(),
    'resource_breakdown': resource_stats.to_dict(),
    'variables_with_comments': int(df_final['has_comments'].sum()),
    'variables_needing_mda_input': int(df_final['mda_input_needed'].sum())
}

# Save the data
output_data = {
    'metadata': {
        'source_file': 'MDA_Mapping_To_Citizen_Health_READ_ONLY.xlsx',
        'processed_date': pd.Timestamp.now().isoformat(),
        'description': 'Vendor mapping data showing MDA variables to vendor resource coverage'
    },
    'summary': summary_stats,
    'data': data_cleaned
}

output_path = '/home/andre/MDA/MOVR_DATA_HUB_v2/data-dictionary-viewer/vendor_mapping.json'
print(f"Saving cleaned data to {output_path}")
with open(output_path, 'w') as f:
    json.dump(output_data, f, indent=2)

print(f"\nVendor mapping data exported to vendor_mapping.json")
print(f"Total variables exported: {len(data)}")
print(f"Variables with coverage info: {len([d for d in data if d['citizen_coverage_status']])}")
print(f"Variables with effort estimates: {len([d for d in data if d['citizen_level_of_effort']])}")
print(f"Variables with comments: {summary_stats['variables_with_comments']}")
print(f"Variables needing MDA input: {summary_stats['variables_needing_mda_input']}")

# Show sample records
print(f"\nSample records:")
for i, record in enumerate(data[:3]):
    print(f"\nRecord {i+1}:")
    print(f"  MDA Variable: {record['mda_variable'][:100]}...")
    print(f"  Resource: {record['citizen_resource']}")
    print(f"  Coverage: {record['citizen_coverage_status']}")
    print(f"  Effort: {record['citizen_level_of_effort']}")
    if record['Comments']:
        print(f"  Comments: {record['Comments'][:100]}...")