# MOVR Pilot Assignment Flow – Step-by-Step Hierarchy

## 1. Trigger: Form Submission
- **Action:** Manual
- *Triggered by HTTP request when participant submits form.*

## 2. Retrieve Data from Excel
- **Action:** List rows present in VendorDiseaseQuotasTable
- **Action:** List rows present in MilestonesTable

## 3. Initialize Variables
- **Action:** Init AllMinimumsAchieved
- **Action:** Init AssignedVendor
- **Action:** Init VendorURL
- **Action:** Init AssignmentReason

## 4. Milestone Evaluation
- **Apply to Each:** MilestonesTable rows (`Apply_to_each`)
  - **Condition:** Milestone = "All Minimums Met"? (`Condition_1`)
    - **If True (`Condition_1`):**
      - **Action:** Set AllMinimumsAchieved
      - *If Status = "ACHIEVED", set to true; else, set to false.*
    - **If False (`Condition_1`):**
      - *No action.*

## 5. Assignment Logic
- **Condition:** AllMinimumsAchieved = true? (`Condition_2_-_Main_Assignment_Logic`)
  - **If True (`Condition_2_-_Main_Assignment_Logic`):**
    - **Apply to Each:** VendorDiseaseQuotasTable rows (`Apply_to_each_2`)
      - **Condition:** Disease matches AND Remaining Slots > 0? (`Condition_4-_disease_and_slot_filter_`)
        - **If True (`Condition_4-_disease_and_slot_filter_`):**
          - **Condition:** Vendor Name = "Vibrent Health"? (`Condition_5_-_Check_for_Vibrent`)
            - **If True (`Condition_5_-_Check_for_Vibrent`):**
              - **Action:** Set AssignedVendor to Vibrent
              - **Action:** Set VendorURL to Vibrent's
              - **Action:** Set AssignmentReason to Vibrent
            - **If False (`Condition_5_-_Check_for_Vibrent`):**
              - **Condition:** Vendor Name = "Citizen Health"? (`Condition_6_-_Check_for_Citizen`)
                - **If True (`Condition_6_-_Check_for_Citizen`):**
                  - **Action:** Set AssignedVendor to Citizen
                  - **Action:** Set VendorURL to Citizen
                  - **Action:** Set AssignmentReason to Citizen
                - **If False (`Condition_6_-_Check_for_Citizen`):**
                  - **Action:** Set AssignedVendor to Unite
                  - **Action:** Set VendorURL to Unite
                  - **Action:** Set AssignmentReason to Unite
        - **If False (`Condition_4-_disease_and_slot_filter_`):**
          - *No action.*
  - **If False (`Condition_2_-_Main_Assignment_Logic`):**
    - **Apply to Each:** VendorDiseaseQuotasTable rows (`Apply_to_each_1`)
      - **Condition:** Disease matches AND Min Met = "NO" AND Remaining Slots > 0? (`Condition_3_-_Check_for_minimum_quota_assignment`)
        - **If True (`Condition_3_-_Check_for_minimum_quota_assignment`):**
          - **Action:** Set AssignedVendor
          - **Action:** Set VendorURL
          - **Action:** Set AssignmentReason
        - **If False (`Condition_3_-_Check_for_minimum_quota_assignment`):**
          - *No action.*

## 6. Final Assignment Check
- **Condition:** length(AssignedVendor) > 0? (`Condition_5_-_Check_if_no_assignment`)
  - **If False (`Condition_5_-_Check_if_no_assignment`):**
    - **Action:** Set AssignedVendor to Waitlist
    - **Action:** Set AssignedReason to Waitlist
  - **If True (`Condition_5_-_Check_if_no_assignment`):**
- **Action:** List rows present in ParticipantsTable
- **Action:** Add row to ParticipantsTable
- **Condition:** AssignedVendor ≠ "WAITLIST"? (`Condition_6_Assignment_Type`)
    - **If True (`Condition_6_Assignment_Type`):**
        - **Action:** Compose Success Email
        - **Action:** Send an email (V2) - Success
    - **If False (`Condition_6_Assignment_Type`):**
        - **Action:** Compose Waitlist Email
        - **Action:** Send an email (V2) - Waitlist
- **Action:** Update a row
- **Condition:** AssignedVendor ≠ "WAITLIST"? (`Condition_7_-_Response`)
    - **If True (`Condition_7_-_Response`):**
        - **Action:** Response Success
    - **If False (`Condition_7_-_Response`):**
        - **Action:** Response Waitlist