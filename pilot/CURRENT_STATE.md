# MOVR Pilot - Current State Documentation

**Last Updated:** 2025-11-05  
**Status:** LIVE and operational  
**Live URL:** https://openmovr.github.io/pilot

## Issue Log

| Date | Issue | Status | Description |
|------|-------|--------|-------------|
| 2025-11-05 | **CRITICAL: Global Minimum Logic Flaw** | 🔴 DETECTED | Condition 2 main logic uses global "All Minimums Met" check instead of disease-specific minimums. When SMA quotas are met but DMD quotas are not, DMD participants incorrectly enter TRUE branch (post-minimum priority) instead of continuing minimum quota filling for DMD. Requires disease-specific minimum checking logic. |
| 2025-11-05 | **ERROR: No Remaining Slots in FALSE Branch** | 🔴 DETECTED | When disease (e.g., DMD) is forced back into FALSE branch (minimum quota mode) but has no remaining slots available, the system errors instead of gracefully handling the waitlist scenario. |

## Project Overview

The MOVR Pilot is a live research program testing three vendor platforms for families managing neuromuscular diseases (DMD, SMA, LGMD). The system uses Microsoft Power Automate + Excel Online architecture to automatically assign participants to vendors based on quota management and priority rules.

## Current Architecture

### Frontend
- **Static HTML page** hosted on GitHub Pages at `openmovr.github.io/pilot`
- **Main files:**
  - `index.html` - Landing page with enrollment form
  - `script.js` - Form validation, submission logic, and Google Analytics
  - `style.css` - Styling
  - `mda-logo.jpg`, `banner.jpg` - Assets

### Backend (Microsoft 365)
- **Power Automate Flow:** `MOVR Pilot - Form Submission Handler`
- **Active Flow URL:** `https://default69c088185c17449a9790b60a3c7e52.22.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/03bd50749cff45f2bdf7c90d8c070479/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=OwjDRaXYA81v0Agvx7HrlcsyJVF0ar0TNNrcrLaUYHY`
- **Excel Workbook:** `MOVR_PILOT_PARICIPANTS.xlsx` (OneDrive for Business)

### Data Structure (Excel Tables)
1. **ParticipantsTable** - All form submissions and assignments
2. **VendorDiseaseQuotasTable** - Quota tracking by vendor/disease combination  
3. **MilestonesTable** - Progress tracking for minimum quota achievements

## Vendor Assignment Logic (LIVE SYSTEM)

### Phase 1: Minimum Quota Priority
- System checks if all minimum quotas are achieved via `MilestonesTable`
- If minimums NOT met: assigns to vendor/disease with `Min Met = "NO"` and available slots
- Priority given to filling minimum quotas first

### Phase 2: Post-Minimum Priority Order
Once all minimums achieved:
1. **Vibrent Health** (Priority 1)
2. **Citizen Health** (Priority 2)  
3. **Unite Genomics** (Priority 3)

### Assignment Rules
- Must match participant's disease type (DMD/SMA/LGMD)
- Only assign if `Remaining Slots > 0`
- Never exceed `Max Quota` for any vendor/disease combination
- If all vendors full for disease type → WAITLIST

## Vendor Platform Details

### Vibrent Health
- **Priority:** 1 (highest)
- **Enrollment URL:** `https://vibrenthealth.com/mda/pilot`
- **Target:** 30 participants per disease type

### Citizen Health  
- **Priority:** 2 (middle)
- **Enrollment URL:** `https://citizenhealth.com/join/mda`
- **Target:** Variable by disease type

### Unite Genomics
- **Priority:** 3 (lowest)
- **Enrollment URL:** `https://unitegenomics.com/enroll/movr`
- **Target:** Fill remaining slots

## Email Automation

### Success Assignment Email
- Sent to assigned vendor with enrollment link
- Includes assignment reason for transparency
- If `multiPlatform = true`, includes all three vendor links
- Template in `email.txt`

### Waitlist Email
- Sent when all vendors at capacity for participant's disease
- Explains waitlist status and next steps

## Form Data Schema
```json
{
  "name": "string (required)",
  "email": "string (required, validated)",
  "disease": "DMD|SMA|LGMD (required)",
  "relationship": "Patient|Parent/Caregiver|Other (required)",
  "multiPlatform": "true|undefined (optional)",
  "howHeard": "Email|Social|Event|Provider|Friend|Other (optional)",
  "submissionTime": "ISO timestamp",
  "userAgent": "browser string",
  "referrer": "URL"
}
```

## Security & Validation Features

### Frontend Security
- CSRF token generation
- Rate limiting (5-second intervals)
- Email domain validation (blocks disposable emails)
- Input sanitization and validation
- Form field length limits

### Privacy & Compliance
- Data stored in HIPAA-compliant OneDrive for Business
- Google Analytics tracking (ID: G-85RSP2VHG6)
- No PII shared without consent
- Participant controls data sharing

## Current Documentation Files

### Implementation Docs
- `power-automate-setup.md` - Setup guide (noted as "slightly outdated")
- `power_automate_logic_flow.md` - Detailed flow hierarchy
- `feature-doc.md` - Architecture overview
- `request_body_schema.json` - API schema
- `email.txt` - Email templates

### Reference Files
- `power-automate.html` - Standalone form for testing
- `MOVR_PILOT_PARICIPANTS.xlsx` - Live participant data (copied from production)

## Test Status
- Multiple test runs completed
- Excel file updated with live pilot data
- Power Automate flow operational and processing submissions
- Form validation and submission working correctly

## Known Status Items
1. Setup documentation marked as "slightly outdated" 
2. Multiple test runs have been conducted
3. Live Excel file has been copied with current participant data
4. System is actively processing real participant submissions

## Critical Issues Identified

### 🔴 CRITICAL: Global Minimum Logic Flaw (Detected 2025-11-05)

**Problem:** The current Power Automate Condition 2 logic uses a global "All Minimums Met" check from the MilestonesTable instead of disease-specific minimum validation.

**Impact:** 
- When SMA minimum quotas are achieved but DMD quotas are not met
- DMD participants incorrectly trigger the TRUE branch (post-minimum priority logic)
- This bypasses the minimum quota filling rotation for DMD
- DMD vendors may not receive their guaranteed minimum participants
- Violates the two-phase assignment system design

**Current Flawed Logic:**
```
IF MilestonesTable "All Minimums Met" = "ACHIEVED"
  THEN: Use priority-based assignment (TRUE branch)
  ELSE: Use minimum quota rotation (FALSE branch)
```

**Required Fix:**
```
IF Disease-specific minimums are met for [participant's disease]
  THEN: Use priority-based assignment (TRUE branch)
  ELSE: Use minimum quota rotation (FALSE branch)
```

**Technical Solution Needed:**
1. Replace global milestone check with disease-specific logic
2. Check if ALL vendors for the participant's disease have "Min Met" = "YES"
3. Only enter TRUE branch when the specific disease has completed minimum quotas
4. Each disease type (DMD/SMA/LGMD) should independently determine phase transition

**SIMPLEST POWER AUTOMATE FIX:**

**Step 1: Add New Action Before Condition 2**
- **Action:** "Get a row" (Excel Online)
- **Name:** "Get disease milestone status" 
- **Table:** MilestonesTable
- **Key Column:** Milestone
- **Key Value:** `concat(triggerBody()?['disease'], ' Minimums Met')`

**Step 2: Add New Variable Setting Action**
- **Action:** "Set variable"
- **Name:** "Set disease minimums achieved"
- **Variable:** AllMinimumsAchieved
- **Value:** `equals(outputs('Get_disease_milestone_status')?['Status'], 'ACHIEVED')`

**Step 3: Add Error Handling in FALSE Branch**
After `Filter_eligible_vendors_for_minimum_quota`, add:
- **Action:** "Condition" 
- **Name:** "Check if vendors available for minimum"
- **Expression:** `length(body('Filter_eligible_vendors_for_minimum_quota')) equals 0`
- **IF TRUE:** Set AssignedVendor to empty (triggers waitlist)
- **IF FALSE:** Continue with existing logic

**BETTER APPROACH: Disease-Specific Variables**

**Why this is cleaner:**
- No complex branch modifications needed
- Clear separation of disease logic
- Condition 2 stays simple
- Easy to debug and maintain

**EVEN BETTER: Single Variable with String Detection**

**Step 1: Initialize One Variable**
- **ParticipantDiseaseMinimumAchieved** (Boolean, default: false)

**Step 2: Single Smart Condition in Apply to each Loop**
Replace all conditions with one condition using `contains()`:
```
contains(items('Apply_to_each')?['Milestone'], triggerBody()?['disease'])
```

**Step 3: Keep Condition 2 Simple**
Use the single variable: `variables('ParticipantDiseaseMinimumAchieved')`

**How it works:**
- DMD participant → looks for milestone containing "DMD" → finds "DMD Minimums Met"
- SMA participant → looks for milestone containing "SMA" → finds "SMA Minimums Met"  
- LGMD participant → looks for milestone containing "LGMD" → finds "LGMD Minimums Met"

**Result:** Much cleaner! One variable, one condition, automatic disease detection!

**Business Risk:** Medium-High - Could result in vendor quota imbalances and contractual issues if DMD vendors don't receive minimum guaranteed participants.

## Monitoring & Management

### Weekly Tasks
- Review participant enrollment status in Excel
- Update enrollment completion status manually
- Monitor vendor capacity and quota progress  
- Track milestone achievements
- Handle timeout management (2-week rule)

### Key Metrics Tracked
- Form submissions by disease type
- Vendor assignment distribution
- Email delivery success rates
- Enrollment completion rates
- Quota progress toward minimums

## Technical Specifications

### Limits & Capacity
- Power Automate: ~5,000 actions/day
- Excel Online: 5MB file size, 1M+ rows
- Outlook: 10,000 recipients/day
- Target: 500 total participants

### Browser Compatibility
- Modern browsers with JavaScript enabled
- Mobile responsive design
- Google Analytics integration

## Contact Information
- **Support Email:** mdamovr@mdausa.org
- **Technical Issues:** Contact Power Automate flow owner
- **Participant Questions:** Handled via support email

---

**Note for Future AI Agents:** This system is LIVE and processing real participant data. Any changes should be carefully tested and documented. The Power Automate flow URL and Excel file contain actual participant information and should be handled with appropriate privacy considerations.

## Priority Logic Detailed Explanation

### Phase 1: When Minimum Quotas ARE NOT MET (Priority Phase)

**Logic:** Rotate among vendors needing minimums based on form submission count

**How it works:**
1. System checks `MilestonesTable` for "All Minimums Met" status
2. If status ≠ "ACHIEVED", enters minimum quota priority mode
3. **Filter** vendors where:
   - Disease matches participant's disease (DMD/SMA/LGMD)
   - `Min Met = "NO"` (minimum not yet achieved)
   - `Remaining Slots > 0`
4. **Extract** Form Submissions counts from filtered vendors
5. **Find minimum** submission count among eligible vendors
6. **Filter** for vendors with that minimum count
7. **Select first** vendor from the tied group
8. Assignment reason: "Minimum quota priority - rotation based on form submissions"

**Example scenario:**
- Participant submits with SMA
- Eligible vendors: Unite (0 submissions), Citizen (0 submissions), Vibrent (11 submissions)
- Minimum submission count: 0
- Vendors with minimum count: Unite, Citizen (both have 0)
- **Result:** Assigns to first vendor with 0 submissions (rotation between Unite/Citizen)

### Phase 2: When Minimum Quotas ARE MET (Post-Minimum Phase)

**Logic:** Use Excel-driven priority order from Priority field

**How it works:**
1. System confirms `MilestonesTable` shows "All Minimums Met" = "ACHIEVED"
2. Enters post-minimum priority mode
3. **Filter** vendors where:
   - Disease matches participant's disease (DMD/SMA/LGMD)
   - `Remaining Slots > 0`
4. **Extract** Priority values from filtered vendors
5. **Find minimum** priority number (1 is highest priority)
6. **Filter** for vendors with that minimum priority number
7. **Select first** vendor from the highest priority group

#### Priority Order (Excel-Driven):
- **Priority 1:** Vibrent Health (highest)
- **Priority 2:** Citizen Health (middle)  
- **Priority 3:** Unite Genomics (lowest)

**Assignment process:**
- Automatically assigns to vendor with lowest Priority number (highest priority) that has available slots
- If Priority 1 vendor full → assigns to Priority 2 vendor
- If Priority 2 vendor full → assigns to Priority 3 vendor
- If all vendors full → WAITLIST

**Example scenario:**
- All minimums achieved
- Participant submits with SMA
- Available vendors: Vibrent (Priority 1, 28 slots), Citizen (Priority 2, 20 slots), Unite (Priority 3, 80 slots)
- Minimum priority number: 1
- Vendors with Priority 1: Vibrent Health
- **Result:** Assigns to Vibrent Health (Excel Priority 1) despite other vendors having more capacity

### Key Differences

| Aspect | Minimum NOT Met | Minimum MET |
|--------|----------------|-------------|
| **Priority Factor** | Form submission count (lowest first) | Excel Priority field (lowest number first) |
| **Goal** | Fill minimum quotas efficiently | Maintain vendor preference hierarchy |
| **Assignment Logic** | Rotation (lowest form submissions) | Excel-driven (Priority field) |
| **Flexibility** | Dynamic based on current data | Configurable via Excel Priority field |

### Critical Understanding: Priority Field Usage

**Important:** The `Priority` field in `VendorDiseaseQuotasTable` is **ONLY used after all minimum quotas are met**.

- **Phase 1 (Minimums NOT Met):** Priority field is **IGNORED** - assignment based purely on lowest enrollment count
- **Phase 2 (Minimums MET):** Priority field becomes **ACTIVE** - strict priority order enforced

### Why This Two-Phase System?

**Phase 1 Benefits:**
- Ensures all vendors get their minimum guaranteed participants
- Prevents any vendor from being completely excluded
- Balances initial distribution fairly

**Phase 2 Benefits:**
- Implements MDA's preferred vendor hierarchy
- Gives priority vendors (like Vibrent) preferential treatment
- Maintains predictable assignment patterns for vendor relationships

This system ensures **fairness during startup** (everyone gets minimums) while **respecting business priorities** once minimums are secured.

## Implementation Status

### ✅ Currently Implemented:
- **Phase 1 (FALSE branch):** Rotation based on form submissions ✅
- **Milestone checking:** All minimums met detection ✅
- **Form validation and submission:** Working ✅
- **Email automation:** Success/waitlist emails ✅

### ⚠️ Future Enhancement Available:
- **Phase 2 (TRUE branch):** Currently uses hard-coded vendor checks
- **Excel-driven priorities:** Instructions provided above to implement Priority field usage
- **Benefits:** More flexible, maintainable, and Excel-configurable vendor priorities

**To implement Excel-driven priorities:** Follow the 6-step visual instructions above to replace the TRUE branch logic.

## Future Enhancement Instructions

### Phase 2 Excel-Driven Priority Implementation

**Current Issue:** TRUE branch uses hard-coded vendor name checks instead of Excel Priority field.

**To Replace TRUE Branch with Excel-Driven Logic:**

1. **Delete existing TRUE branch actions:**
   - Remove "Apply_to_each_2" loop
   - Remove all nested vendor name conditions
   - Remove all hard-coded set variable actions

2. **Add new TRUE branch actions in this order:**

   **Step 1:** Filter array - "Filter available vendors for post-minimum"
   - From: `outputs('List_rows_present_in_VendorDiseaseQuotasTable')?['body/value']`
   - Conditions: Disease matches AND Remaining Slots > 0

   **Step 2:** Condition - "Check if any vendors available"
   - Left: `length(body('Filter_available_vendors_for_post-minimum'))`
   - Operator: is greater than
   - Right: `0`

   **IF TRUE (vendors available):**

   **Step 3:** Select - "Extract priority values"
   - From: Step 1 output
   - Map: `int(item()?['Priority'])`

   **Step 4:** Compose - "Find minimum priority"
   - Inputs: `min(body('Extract_priority_values'))`

   **Step 5:** Filter array - "Filter vendors with minimum priority"
   - From: Step 1 output
   - Condition: Priority equals Step 4 output

   **Step 6:** Compose - "Select vendor with highest priority"
   - Inputs: `first(body('Filter_vendors_with_minimum_priority'))`

   **Step 7:** Set variables (AssignedVendor, VendorURL, AssignmentReason)
   - Use Step 6 output for all values

   **IF FALSE (no vendors available):**
   - Leave empty (variables remain unset → triggers downstream waitlist logic)

**Benefits:** Change priorities by updating Excel Priority column instead of modifying Power Automate flow.

### Age Field Addition Requirements

**Overview:** Add age demographics collection to participant data.

**Excel Updates Required:**

1. **Add new column to ParticipantsTable:** "Age Group"
2. **Column position:** Before "Timeout Date" column (minimal formula disruption)
3. **Data type:** Text (dropdown values)
4. **Possible values:** "6-younger", "7-13", "14-17", "18-older"

**Attestation Field Addition:**

1. **Add new column to ParticipantsTable:** "Attestation"
2. **Column position:** Before "Timeout Date" column (after Age Group)
3. **Data type:** Boolean (TRUE/FALSE)
4. **Purpose:** Compliance and consent documentation

**Power Automate Updates Required:**

1. **Update HTTP trigger schema:** Add "ageGroup" and "attestation" fields to request_body_schema.json
2. **Update "Add a row" action:** Include both new field mappings
   - Column: "Age Group" - Value: `triggerBody()?['ageGroup']`
   - Column: "Attestation" - Value: `triggerBody()?['attestation']`

**HTML Updates Required (Completed):**

- Age group dropdown field already in enrollment form ✅
- Attestation checkbox already in enrollment form ✅
- Form validation for required fields already implemented ✅
- Form submission JavaScript already includes both fields ✅

**Data Collection Purpose:** Demographic analysis and age-appropriate vendor assignment (if needed in future).

