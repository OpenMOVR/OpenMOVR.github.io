# 📊 MDA MOVR Data Dictionary Viewer

A lightweight, interactive web application for reviewing medical case report form fields during clinical research advisory meetings. Built for the MDA MOVR Data Hub project to facilitate systematic review and prioritization of clinical data elements.

## 🎯 **Purpose**

This tool enables medical advisors to:
- Review clinical data dictionary fields in a structured format
- Filter by study type (DMD/SMA), forms, sections, and requirement status
- Set priority levels for field importance during advisory meetings
- Save and resume review sessions with persistent priority tracking
- Export decisions as timestamped JSON files for audit trails

## ✨ **Features**

### **Interactive Filtering**
- **Form-based navigation**: Filter by specific case report forms
- **Contextual sections**: Section filter adapts to selected form
- **Study type filtering**: DMD-only, SMA-only, or both
- **Required field detection**: Automatically identifies required fields (marked with *)
- **Full-text search**: Search across all display labels

### **Priority Management System**
- **5-level priority scale**: High, Medium, Low, Irrelevant, Test (White)
- **Enhanced visual indicators**: Color-coded backgrounds AND left borders for maximum visibility
- **Color-coded dropdown options**: Each priority option shows in its respective color
- **Persistent storage**: Save/load priority decisions as JSON files
- **Session resume**: Pick up exactly where you left off
- **Audit trail**: Timestamped decisions for regulatory compliance

### **Professional Presentation**
- **Clean medical interface**: Professional styling appropriate for advisory meetings
- **Quick navigation**: Sidebar with form and section jump links
- **Real-time statistics**: Field counts and priority summaries
- **Responsive design**: Works on desktop and tablet devices

## 🚀 **Quick Start**

### **Prerequisites**
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required - runs entirely client-side

### **Setup**
1. Open `data_dictionary_viewer.html` in your web browser
2. The application loads automatically with your data dictionary

### **Basic Usage**
1. **Review Fields**: Browse through forms and sections
2. **Apply Filters**: Use dropdown filters to focus on specific subsets
3. **Set Priorities**: Select priority levels for each field using the color-coded dropdown
4. **Visual Feedback**: Field backgrounds change color to match priority level
5. **Save Progress**: Click "Save Field Priorities" to download your decisions
6. **Resume Later**: Use "Load Existing Priorities" to restore a previous session

## 📁 **File Structure**

```
data-dictionary-viewer/
├── data_dictionary_viewer.html    # Main application (self-contained)
├── data_dictionary.json          # Exported data from Excel dictionary
├── README.md                      # This file
└── [date]_field_priorities.json  # Saved priority decisions (generated)
```

## 🎨 **Enhanced Visual Priority System**

| Priority | Background Color | Border | Dropdown Color | Use Case |
|----------|------------------|---------|----------------|----------|
| **High** | 🔴 Light Red | Red | Bold Red Text | Critical fields, regulatory requirements |
| **Medium** | 🟠 Light Orange | Orange | Bold Orange Text | Important clinical data |
| **Low** | 🟢 Light Green | Green | Bold Green Text | Supplementary information |
| **Irrelevant** | ⚫ Light Gray | Gray | Bold Gray Text | Fields to potentially remove |
| **Test (White)** | ⚪ Pure White | Purple | Bold Purple Text | QC testing and bug identification |

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

## 📋 **Use Cases**

### **Medical Advisory Meetings**
- Systematic review of all clinical data fields
- Group decision-making on field importance
- Real-time priority setting during discussions
- Enhanced visual feedback for immediate recognition
- Exportable decisions for meeting minutes

### **Quality Control Testing**
- Use "Test (White)" priority to identify fields being reviewed
- Clean white background makes it easy to spot rendering issues
- Purple border stands out for QC purposes

### **Clinical Trial Planning**
- Prioritize essential vs. optional data collection
- Focus resources on high-priority fields
- Plan case report form optimization
- Regulatory submission preparation

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

- **v1.0**: Initial release with basic filtering and navigation
- **v1.1**: Added priority system and JSON persistence
- **v1.2**: Enhanced visual indicators and cascading filters
- **v1.3**: Added required field detection and statistics dashboard
- **v1.4**: Enhanced color-coded backgrounds and dropdown options
- **v1.5**: Added "Test (White)" priority level for QC

---

**Built for MDA MOVR Data Hub** | **Medical Research Data Dictionary Management**