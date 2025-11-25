import pandas as pd
import json

# Read the Excel file
df = pd.read_excel('/home/andre/MDA/MOVR_DATA_HUB_v2/docs/MDA MOVR_Data Dictionary_SMA_DMD_ENHANCED_READ-ONLY.xlsx')

# Clean up column names
df.columns = df.columns.str.strip()

# Print current section issues
print("Current section values that need cleaning:")
sections = df['SECTION'].dropna().value_counts()
print(sections)

# Create a mapping to standardize section names
section_mapping = {
    'Pulmonary  ': 'Pulmonary',  # Extra spaces
    'HospitalizationS': 'Hospitalizations',
    'Hospitalization': 'Hospitalizations', 
    'Assitive Devices': 'Assistive Devices',  # Fix typo
    'Assistive Device': 'Assistive Devices',  # Standardize to plural
    'omg ur the best': '',  # Remove this test entry
}

# Apply the mapping
df['SECTION'] = df['SECTION'].replace(section_mapping)

# Show cleaned results
print("\nCleaned section values:")
cleaned_sections = df['SECTION'].dropna().value_counts()
print(cleaned_sections)

# Convert to JSON for the webapp
data = df.fillna('').to_dict('records')
with open('/home/andre/MDA/MOVR_DATA_HUB_v2/data-dictionary-viewer/data_dictionary.json', 'w') as f:
    json.dump(data, f, indent=2)

print(f"\nCleaned data exported to data_dictionary.json with {len(data)} records")
print(f"Sections reduced from {len(sections)} to {len(cleaned_sections)} unique values")