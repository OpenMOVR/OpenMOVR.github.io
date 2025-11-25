# 📊 MDA MOVR Data Dictionary Tools

A comprehensive suite of interactive web applications for clinical research data management, vendor analysis, and medical advisory reviews. Built for the MDA MOVR Data Hub project to facilitate systematic review, prioritization, and coverage analysis of clinical data elements.

## 🎯 **Purpose**

This comprehensive platform enables research teams to:

### **Medical Advisory Reviews:**
- Review clinical data dictionary fields in a structured format
- Filter by study type (DMD/SMA), forms, sections, and requirement status
- Set priority levels for field importance during advisory meetings
- Save and resume review sessions with persistent priority tracking
- Export decisions as timestamped JSON files for audit trails

### **Vendor Coverage Analysis:**
- Analyze vendor mapping and coverage for MDA data variables
- Identify implementation gaps and effort requirements
- Track coverage status across different resource categories
- Manage vendor input requirements and procurement decisions
- Support gene therapy and specialized treatment planning

## ✨ **Applications**

### **📋 Data Dictionary Viewer** (`data_dictionary_viewer.html`)

#### **Interactive Filtering & Navigation**
- **Form-based navigation**: Filter by specific case report forms
- **Contextual sections**: Section filter adapts to selected form
- **Study type filtering**: DMD-only, SMA-only, or both
- **Required field detection**: Automatically identifies required fields (marked with *)
- **Full-text search**: Search across all display labels
- **Quick navigation**: Sidebar with form and section jump links

#### **Priority Management System**
- **5-level priority scale**: High, Medium, Low, Irrelevant, Test (White)
- **Enhanced visual indicators**: Color-coded backgrounds AND left borders for maximum visibility
- **Color-coded dropdown options**: Each priority option shows in its respective color
- **Custom filename support**: Save sessions with meaningful names (e.g., "gene_therapy_review")
- **Persistent storage**: Save/load priority decisions as JSON files
- **Session resume**: Pick up exactly where you left off
- **Audit trail**: Timestamped decisions for regulatory compliance

### **🔗 Vendor Mapping Viewer** (`vendor_mapping_viewer.html`)

#### **Coverage Analysis**
- **Coverage status tracking**: Visual indicators for covered/not covered/potential add
- **Resource categorization**: Blood work, labs, medications, devices, procedures
- **Implementation effort analysis**: High/Medium/Low effort level tracking
- **MDA input identification**: Highlights variables requiring additional input
- **Vendor variable mapping**: Links MDA variables to vendor-specific fields

#### **Professional Analysis Interface**
- **Color-coded backgrounds**: Immediate visual feedback on coverage status
- **Resource navigation**: Quick access to specific data categories
- **Comprehensive filtering**: By coverage, effort level, resource type, input needs
- **Statistics dashboard**: Real-time counts and coverage metrics

### **🏠 Navigation Hub** (`index.html`)
- **Professional landing page**: Overview of both applications
- **Live statistics**: Combined metrics from both datasets
- **Direct tool access**: One-click navigation to specific viewers
- **Modern interface**: Clean, medical-appropriate design

## 🚀 **Quick Start**

### **Prerequisites**
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required - runs entirely client-side

### **Setup Options**

#### **Option 1: Navigation Hub (Recommended)**
1. Open `index.html` in your web browser for the professional interface
2. Access both viewers through the navigation dashboard

#### **Option 2: Direct Tool Access**
1. **Data Dictionary**: Open `data_dictionary_viewer.html` directly
2. **Vendor Mapping**: Open `vendor_mapping_viewer.html` directly

### **Usage Workflows**

#### **Data Dictionary Workflow:**
1. **Review Fields**: Browse through forms and sections with enhanced navigation
2. **Apply Filters**: Use contextual dropdown filters (form → section → study type)
3. **Set Priorities**: Select levels using color-coded dropdowns with visual feedback
4. **Custom Sessions**: Enter meaningful filenames (e.g., "gene_therapy_review")
5. **Save Progress**: Download decisions with custom naming and full timestamps
6. **Resume Sessions**: Load previous sessions to continue exactly where you left off

#### **Vendor Mapping Workflow:**
1. **Analyze Coverage**: Review vendor variable coverage status with visual indicators
2. **Filter by Resource**: Focus on categories (blood work, labs, medications, devices)
3. **Assess Implementation**: Review effort levels and complexity analysis
4. **Identify Gaps**: Find variables requiring MDA input or lacking coverage
5. **Navigate Resources**: Use sidebar navigation for efficient resource exploration

## 📁 **File Structure**

```
movr-viewer/
├── index.html                          # Navigation hub and landing page
├── data_dictionary_viewer.html         # MDA data dictionary viewer
├── vendor_mapping_viewer.html          # Vendor mapping coverage analyzer
├── data_dictionary.json               # Processed MDA dictionary data (1,024 fields)
├── vendor_mapping.json                # Processed vendor mapping data (557 variables)
├── README.md                           # Complete documentation
└── Generated Files:
    ├── [date]_[time]_[custom]_field_priorities.json     # Priority decisions
    └── [date]_[time]_noname_field_priorities.json      # Default naming
```

## 📊 **Data Sources & Processing**

### **Root Directory Scripts:**
```
├── analyze_excel.py                    # Basic Excel to JSON conversion
├── clean_sections.py                  # Data dictionary section cleanup
├── process_vendor_mapping.py          # Vendor mapping Excel processor
└── docs/
    ├── MDA MOVR_Data Dictionary_SMA_DMD_ENHANCED_READ-ONLY.xlsx
    └── MDA_Mapping_To_Citizen_Health_READ-ONLY.xlsx
```

## 🎨 **Visual Coding Systems**

### **Data Dictionary Priority System**

| Priority | Background Color | Border | Dropdown Color | Use Case |
|----------|------------------|---------|----------------|----------|
| **High** | 🔴 Light Red | Red | Bold Red Text | Critical fields, regulatory requirements |
| **Medium** | 🟠 Light Orange | Orange | Bold Orange Text | Important clinical data |
| **Low** | 🟢 Light Green | Green | Bold Green Text | Supplementary information |
| **Irrelevant** | ⚫ Light Gray | Gray | Bold Gray Text | Fields to potentially remove |
| **Test (White)** | ⚪ Pure White | Purple | Bold Purple Text | QC testing and bug identification |

### **Vendor Mapping Coverage System**

| Coverage Status | Background Color | Badge Color | Description |
|----------------|------------------|-------------|-------------|
| **Covered** | 🟢 Light Green | Green | Vendor has this capability |
| **Not Covered** | 🔴 Light Red | Red | Requires development or alternate solution |
| **Potential Add** | 🟡 Light Yellow | Orange | Could be implemented with effort |

| Effort Level | Badge Style | Meaning |
|-------------|-------------|---------|
| **Low** | Green Badge | Simple implementation |
| **Moderate** | Orange Badge | Moderate development effort |
| **High** | Red Badge | Significant development required |
| **Uncertain/TBD** | Gray Badge | Needs further analysis |

## 📊 **Data Format**

### **Input: Excel Data Dictionary**
References: `../docs/MDA MOVR_Data Dictionary_SMA_DMD_ENHANCED_READ-ONLY.xlsx`

Processes columns:
- `File/Form`: Case report form name
- `SECTION`: Logical grouping within forms
- `Field Name`: Variable name for analytics
- `Display Label`: Label shown on forms (required fields marked with *)
- `DMD`: DMD-specific indicator
- `SMA`: SMA-specific indicator
- `Field Type`: Input type (radio, text, etc.)
- `Description`: Field description

### **Output: Priority Decisions**
```json
{
  "session_date": "2025-08-21",
  "session_timestamp": "2025-08-21T15:30:00.000Z",
  "total_fields_prioritized": 47,
  "priorities": {
    "Demographics_gender": "high",
    "Clinical_assessment_date": "medium",
    "Mobility_walk_distance": "low",
    "Optional_field": "irrelevant",
    "Test_field": "test"
  }
}
```

## 🔧 **Data Updates**

To refresh the data dictionary:

1. Update the Excel file in `../docs/`
2. Run from the root directory:
   ```bash
   python3 clean_sections.py
   ```
3. This generates a new `data_dictionary.json` in this directory

## 📋 **Comprehensive Use Cases**

### **Medical Advisory Meetings**
- **Data Dictionary Review**: Systematic evaluation of 1,024+ clinical data fields
- **Priority Consensus**: Group decision-making with real-time visual feedback
- **Session Management**: Custom naming (e.g., "gene_therapy_advisory_march2025")
- **Audit Trail**: Timestamped decisions for regulatory compliance and meeting minutes

### **Vendor Analysis & Procurement**
- **Coverage Assessment**: Identify 326 covered vs. 149 uncovered variables
- **Implementation Planning**: Analyze effort levels for 112 potential additions
- **Resource Allocation**: Focus on high-impact, low-effort implementations
- **Gap Analysis**: Prioritize 103 variables requiring MDA input

### **Specialized Research Applications**

#### **Gene Therapy Studies**
- Filter vendor mapping for "genetic and genomic findings" resources
- Identify specialized coverage gaps for advanced therapeutic procedures
- Assess implementation complexity for regulatory submissions
- Custom priority sessions for FDA interactions

#### **Clinical Trial Optimization**
- **Data Collection Focus**: Prioritize essential vs. supplementary fields
- **Resource Planning**: Balance coverage requirements with implementation effort
- **Form Optimization**: Streamline case report forms based on vendor capabilities
- **Regulatory Preparation**: Ensure critical fields have appropriate vendor support

### **Quality Control & Testing**
- **Test Priority Level**: White background for QC field identification
- **Visual Validation**: Immediate feedback on rendering and functionality
- **Session Resume Testing**: Validate save/load functionality across platforms

## 🔒 **Privacy & Security**

- **Client-side only**: No data transmitted to servers
- **Local storage**: All decisions stored locally as files
- **No tracking**: No analytics or external connections
- **Audit compliant**: Timestamped decisions with clear provenance

## 🐛 **Troubleshooting**

### **Common Issues**

**Data not loading:**
- Ensure `data_dictionary.json` is in the same directory as the HTML file
- Check browser console for JavaScript errors
- Verify JSON file is valid format

**Priorities not saving:**
- Modern browser required (IE not supported)
- Check download permissions in browser
- Ensure pop-up blocker allows downloads

**Colors not showing:**
- Refresh browser page
- Clear browser cache if needed
- Ensure modern browser (Chrome 60+, Firefox 55+, Safari 12+)

## 📈 **Technical Specifications**

- **Technology**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Dependencies**: None (self-contained)
- **Browser Support**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Performance**: Optimized for datasets up to 10,000 fields
- **File Size**: ~60KB HTML file + data JSON

## 📝 **Version History**

### **Data Dictionary Viewer Evolution**
- **v1.0**: Initial release with basic filtering and navigation
- **v1.1**: Added priority system and JSON persistence
- **v1.2**: Enhanced visual indicators and cascading filters
- **v1.3**: Added required field detection and statistics dashboard
- **v1.4**: Enhanced color-coded backgrounds and dropdown options
- **v1.5**: Added "Test (White)" priority level for QC
- **v1.6**: Custom filename support with timestamp preservation

### **Vendor Mapping System**
- **v2.0**: Complete vendor mapping viewer with coverage analysis
- **v2.1**: Resource categorization and effort level tracking
- **v2.2**: MDA input identification and gap analysis

### **Platform Integration**
- **v3.0**: Unified navigation hub with cross-platform links
- **v3.1**: Comprehensive documentation and use case guidance

## 🎯 **Current Statistics**

| Metric | Data Dictionary | Vendor Mapping | Combined Platform |
|--------|----------------|----------------|-------------------|
| **Total Records** | 1,024 fields | 557 variables | 1,581 data points |
| **Coverage Analysis** | N/A | 58.5% covered | Comprehensive gaps identified |
| **Priority Levels** | 5 levels | 4 effort levels | Multi-dimensional analysis |
| **Use Cases** | Medical advisory | Vendor procurement | End-to-end research support |

---

**Built for MDA MOVR Data Hub** | **Medical Research Data Dictionary Management**