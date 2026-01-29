================================================================================
                    MOVR 2.0 PILOT - DOCUMENTATION GUIDE
================================================================================

Last Updated: 2026-01-03
Maintained By: Andre D. Paredes, PhD
Contact: mdamovr@mdausa.org

================================================================================
OVERVIEW
================================================================================

This folder contains all documentation for the MOVR 2.0 Pilot program, which
tests three vendor platforms (Vibrent Health, Citizen Health, Unite Genomics)
for families managing neuromuscular diseases (DMD, SMA, LGMD).

Live Site: https://openmovr.github.io/pilot
Excel Data: MOVR_PILOT_PARICIPANTS.xlsx (this OneDrive folder)
Target: 500 participants

================================================================================
DOCUMENT INDEX
================================================================================

FOR LEADERSHIP / C-SUITE
-------------------------
EXECUTIVE_SUMMARY.md
  - 1-page overview of the pilot program
  - Key metrics, risks, timeline, success criteria
  - Use for: Status updates, leadership briefings


FOR CLINICAL OPERATIONS
-----------------------
SOP_TECHNICAL.md
  - Standard Operating Procedures for daily/weekly tasks
  - Enrollment status management
  - Timeout and reminder workflows
  - Troubleshooting guide and escalation matrix
  - Use for: Team training, operational reference

LANDING_PAGE_CONTENT.md
  - Full text/copy from the landing page
  - All FAQ questions and answers
  - Form field specifications
  - Use for: Email campaigns, social posts, consistent messaging


FOR DEVELOPERS / TECHNICAL
--------------------------
feature-doc.md
  - Complete architecture documentation
  - Excel workbook setup and formulas
  - Vendor assignment logic explanation
  - Changelog with version history
  - Use for: System understanding, onboarding, maintenance

power-automate-setup.md
  - Step-by-step Power Automate flow configuration
  - All expressions and action settings
  - JSON schema for form submissions
  - Use for: Rebuilding flow, debugging, modifications

power_automate_logic_flow.md
  - Hierarchical view of entire flow logic
  - Quick visual reference of all conditions and branches
  - Use for: Understanding flow at a glance, debugging

CURRENT_STATE.md
  - Live system status and known issues
  - Issue log with detection dates
  - Priority logic detailed explanation
  - Use for: Active monitoring, issue tracking

EDGE_CASE_ANALYSIS.md
  - Vulnerability analysis of vendor assignment logic
  - Edge cases and potential failure modes
  - Use for: Risk assessment, flow improvements

request_body_schema.json
  - JSON schema defining form data structure
  - Field types, enums, required fields
  - Use for: API reference, validation


================================================================================
QUICK REFERENCE
================================================================================

Excel Tables:
  - ParticipantsTable     (ID: {748BF5EC-CF2A-4B57-B4A4-3EE5BBE903F0})
  - VendorDiseaseQuotasTable (ID: {61B3D0A9-C6A9-4BEC-8D7A-61DE464F3A12})
  - MilestonesTable       (ID: {EC5F379C-7C93-4061-ACD0-DD9294D44AC3})

Vendor Priority Order (Post-Minimum Phase):
  1. Vibrent Health (Priority 1)
  2. Citizen Health (Priority 2)
  3. Unite Genomics (Priority 3)

Key Contacts:
  - Support Email: mdamovr@mdausa.org
  - Technical Lead: Andre D. Paredes
  - Clinical Ops: Jessica Waits


================================================================================
MAINTENANCE NOTES
================================================================================

When updating documentation:
  1. Update the relevant .md file
  2. Add entry to changelog in feature-doc.md
  3. Update "Last Updated" date in affected docs
  4. If Power Automate changes, update BOTH:
     - power-automate-setup.md (detailed steps)
     - power_automate_logic_flow.md (hierarchy view)

Power BI connects to the same Excel file - coordinate changes to avoid
breaking the dashboard.


================================================================================
