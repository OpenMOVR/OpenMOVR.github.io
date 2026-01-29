# MOVR Pilot Assignment Flow – Step-by-Step Hierarchy

**Flow Name:** `MOVR Pilot - Form Submission Handler`
**Excel File:** `MOVR_PILOT_PARICIPANTS.xlsx`
**Last Updated:** 2026-01-03


## 1. Trigger: Form Submission
- **Action:** When a HTTP request is received
- *Triggered by HTTP request when participant submits form.*
- *Schema includes: name, email, disease, relationship, ageGroup, attestation, multiPlatform, howHeard, submissionTime, userAgent, referrer*

## 2. Retrieve Data from Excel
- **Action:** List rows present in VendorDiseaseQuotasTable
  - *Table ID: `{61B3D0A9-C6A9-4BEC-8D7A-61DE464F3A12}`*
- **Action:** List rows present in MilestonesTable
  - *Table ID: `{EC5F379C-7C93-4061-ACD0-DD9294D44AC3}`*

## 3. Initialize Variables
- **Action:** Init ParticipantDiseaseMinimumAchieved (Boolean, default: false)
- **Action:** Init AssignedVendor (String, default: empty)
- **Action:** Init VendorURL (String, default: empty)
- **Action:** Init AssignmentReason (String, default: empty)

## 4. Milestone Evaluation (Disease-Specific)
- **Apply to Each:** MilestonesTable rows (`Apply_to_each`)
  - **Condition:** Milestone contains participant's disease? (`Condition_1`)
    - *Expression: `contains(items('Apply_to_each')?['Milestone'], triggerBody()?['disease'])`*
    - **If True (`Condition_1`):**
      - **Action:** Set ParticipantDiseaseMinimumAchieved
      - *Value: `equals(items('Apply_to_each')?['Status'], 'ACHIEVED')`*
      - *DMD participant → finds "DMD Minimums Met"*
      - *SMA participant → finds "SMA Minimums Met"*
      - *LGMD participant → finds "LGMD Minimums Met"*
    - **If False (`Condition_1`):**
      - *No action.*

## 5. Assignment Logic
- **Condition:** ParticipantDiseaseMinimumAchieved = true? (`Condition_2_-_Main_Assignment_Logic`)
  - **If True (`Condition_2_-_Main_Assignment_Logic`):** *POST-MINIMUM PHASE*
    - **Apply to Each:** VendorDiseaseQuotasTable rows (`Apply_to_each_2`)
      - **Condition:** Disease matches AND Remaining Slots > 0? (`Condition_4-_disease_and_slot_filter_`)
        - **If True (`Condition_4-_disease_and_slot_filter_`):**
          - **Condition:** Vendor Name = "Vibrent Health"? (`Condition_5_-_Check_for_Vibrent`)
            - **If True (`Condition_5_-_Check_for_Vibrent`):**
              - **Action:** Set AssignedVendor = "Vibrent Health"
              - **Action:** Set VendorURL = Enrollment URL
              - **Action:** Set AssignmentReason = "Post-minimum priority: Vibrent Health"
            - **If False (`Condition_5_-_Check_for_Vibrent`):**
              - **Condition:** Vendor Name = "Citizen Health"? (`Condition_6_-_Check_for_Citizen`)
                - **If True (`Condition_6_-_Check_for_Citizen`):**
                  - **Action:** Set AssignedVendor = "Citizen Health"
                  - **Action:** Set VendorURL = Enrollment URL
                  - **Action:** Set AssignmentReason = "Post-minimum priority: Citizen Health"
                - **If False (`Condition_6_-_Check_for_Citizen`):**
                  - **Action:** Set AssignedVendor = "Unite Genomics"
                  - **Action:** Set VendorURL = Enrollment URL
                  - **Action:** Set AssignmentReason = "Post-minimum priority: Unite Genomics"
        - **If False (`Condition_4-_disease_and_slot_filter_`):**
          - *No action.*
  - **If False (`Condition_2_-_Main_Assignment_Logic`):** *MINIMUM QUOTA PRIORITY PHASE*
    - **Apply to Each:** VendorDiseaseQuotasTable rows (`Apply_to_each_1`)
      - **Condition:** Disease matches AND Min Met = "NO" AND Remaining Slots > 0? (`Condition_3_-_Check_for_minimum_quota_assignment`)
        - **If True (`Condition_3_-_Check_for_minimum_quota_assignment`):**
          - **Action:** Set AssignedVendor (vendor with lowest form submissions)
          - **Action:** Set VendorURL
          - **Action:** Set AssignmentReason = "Minimum quota priority - rotation based on form submissions"
        - **If False (`Condition_3_-_Check_for_minimum_quota_assignment`):**
          - *No action.*

## 6. Final Assignment Check
- **Condition:** length(AssignedVendor) = 0? (`Condition_5_-_Check_if_no_assignment`)
  - **If True (`Condition_5_-_Check_if_no_assignment`):** *No vendor available*
    - **Action:** Set AssignedVendor = "WAITLIST"
    - **Action:** Set AssignmentReason = "All vendors at capacity for this disease"
  - **If False (`Condition_5_-_Check_if_no_assignment`):**
    - *Assignment was made, continue.*

## 7. Add Participant to Excel
- **Action:** Add row to ParticipantsTable
  - *Table ID: `{748BF5EC-CF2A-4B57-B4A4-3EE5BBE903F0}`*
  - *Participant ID: `@guid()`*
  - *Includes: Name, Email, Disease, Relationship, Age Group, Attestation, How Heard, Multi-Platform Interest*
  - *Includes: Assigned Vendor, Vendor Link, Assignment Reason, Enrollment Status, Timeout Date*

## 8. Email Composition and Sending
- **Condition:** AssignedVendor ≠ "WAITLIST"? (`Condition_6_Assignment_Type`)
  - **If True (`Condition_6_Assignment_Type`):** *Success Assignment*
    - **Action:** Compose_Success_Email
    - **Action:** Send an email (V2)
      - *To: Participant email (from Excel row)*
      - *Subject: "Welcome to the MOVR 2.0 Pilot for [disease] - Next Steps"*
      - *Cc: MDAMOVR@mdausa.org*
      - *Importance: High*
  - **If False (`Condition_6_Assignment_Type`):** *Waitlisted*
    - **Action:** Compose_Waitlist_Email
    - **Action:** Send an email (V2)
      - *To: Participant email (from Excel row)*
      - *Subject: "MOVR 2.0 Pilot - Currently at Capacity for [disease]"*
      - *Bcc: MDAMOVR@mdausa.org*
      - *Importance: High*

## 9. Update Email Status
- **Action:** Update a row in ParticipantsTable
  - *Key: Participant ID*
  - *Update: Email Sent = TRUE*

## 10. Response
- **Condition:** AssignedVendor ≠ "WAITLIST"? (`Condition_7_-_Response`)
  - **If True (`Condition_7_-_Response`):**
    - **Action:** Response Success
      - *Returns: status, message, vendor, enrollmentUrl*
  - **If False (`Condition_7_-_Response`):**
    - **Action:** Response Waitlist
      - *Returns: status, message*