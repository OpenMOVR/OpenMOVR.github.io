# MOVR Pilot - Edge Case Analysis

**Last Updated:** 2025-10-31  
**Purpose:** Identify potential failure scenarios and system vulnerabilities in the vendor assignment logic

---

## Phase 1 Edge Cases (Minimums NOT Met)

### 🔴 **Critical Edge Cases (Could Break Flow)**

#### 1. Data Type Errors in Form Submissions
**Scenario:** Form Submissions column contains non-numeric data
- **Example:** Cell shows "N/A", "TBD", or Excel error "#DIV/0!"
- **Impact:** `int(item()?['Form Submissions'])` conversion fails
- **Flow Result:** Power Automate crashes with template language error
- **Likelihood:** Medium (Excel formula dependencies)
- **Mitigation:** Add error handling with `coalesce(int(item()?['Form Submissions']), 0)`

#### 2. Excel Formula Errors in Min Met Column
**Scenario:** Min Met calculation breaks, shows "ERROR" instead of "YES/NO"
- **Example:** COUNTIFS formula references deleted rows
- **Impact:** Filter `equals(item()?['Min Met'], 'NO')` fails to match "ERROR"
- **Flow Result:** Vendor excluded from rotation incorrectly
- **Likelihood:** Low (but high impact)
- **Mitigation:** Excel data validation rules to restrict values to "YES/NO"

### 🟡 **Business Logic Edge Cases (Unexpected Behavior)**

#### 3. Data Inconsistency in Quota Calculations
**Scenario:** Min Met = "NO" but Actual Enrolled ≥ Min Quota (formula bug)
- **Example:** Vibrent SMA shows Min Met = "NO" with 16/15 enrolled
- **Impact:** System continues assigning beyond minimum quota
- **Flow Result:** Disrupts quota balance, defeats minimum protection
- **Likelihood:** Medium (manual data entry errors)
- **Risk Level:** HIGH - Breaks fundamental business logic
- **Mitigation:** Excel conditional formatting to highlight inconsistencies

#### 4. Manual Data Tampering
**Scenario:** User manually edits Form Submissions count incorrectly
- **Example:** Admin changes Unite SMA from 0 to 50 submissions manually
- **Impact:** Rotation becomes unfair, wrong vendor gets priority
- **Flow Result:** Fair rotation defeated
- **Likelihood:** Low (access controls)
- **Risk Level:** MEDIUM - Compromises system integrity

#### 5. All Vendors Tied at Zero Submissions
**Scenario:** Multiple vendors have identical lowest submission counts
- **Example:** Unite=0, Citizen=0, Vibrent=0 form submissions for DMD
- **Impact:** `first()` function always selects same vendor (depends on Excel row order)
- **Flow Result:** Not truly random rotation among tied vendors
- **Likelihood:** High (during system startup)
- **Risk Level:** LOW - Still functionally fair, just predictable

### 🟢 **Graceful Edge Cases (Flow Handles Well)**

#### 6. No Vendors Need Minimums for Disease
**Scenario:** All vendors show Min Met = "YES" for participant's disease type
- **Example:** All DMD vendors have achieved minimums
- **Impact:** Filter returns empty array
- **Flow Result:** ✅ Variables remain empty → triggers waitlist logic
- **Expected Behavior:** Correct - should move to Phase 2

#### 7. All Vendors at Capacity
**Scenario:** All vendors have Remaining Slots = 0 for disease type
- **Example:** DMD capacity full across all vendors
- **Impact:** Filter excludes all vendors (not > 0)
- **Flow Result:** ✅ Empty variables → waitlist
- **Expected Behavior:** Correct

#### 8. Negative Remaining Slots
**Scenario:** Excel calculation error shows negative remaining slots
- **Example:** Calculation shows -5 slots due to over-enrollment
- **Impact:** Filter condition `> 0` excludes vendor
- **Flow Result:** ✅ System safety mechanism works
- **Expected Behavior:** Correct - prevents over-assignment

---

## Phase 2 Edge Cases (Minimums MET)

### 🔴 **Critical Edge Cases (Could Break Flow)**

#### 1. Data Type Errors in Priority Field
**Scenario:** Priority column contains non-numeric data
- **Example:** Cell shows "High", "Medium", "Low" instead of 1, 2, 3
- **Impact:** `int(item()?['Priority'])` conversion fails
- **Flow Result:** Power Automate crashes with template language error
- **Likelihood:** Medium (manual data entry)
- **Mitigation:** Excel data validation to restrict to numbers 1-3

#### 2. Missing Priority Values
**Scenario:** Priority field is empty/null for some vendors
- **Example:** New vendor added without Priority assignment
- **Impact:** `min()` function may fail with null values
- **Flow Result:** Potential crash or unexpected vendor selection
- **Likelihood:** Medium (data maintenance gaps)
- **Mitigation:** Default priority value and data validation

#### 3. Empty Filter Results Leading to min() Failure
**Scenario:** No vendors available, but Steps 3-4 still execute
- **Example:** All vendors full, but availability check fails
- **Impact:** `min(body('Extract_priority_values'))` operates on empty array
- **Flow Result:** Crash - min() function requires non-empty array
- **Likelihood:** Low (availability check should prevent)
- **Mitigation:** Ensure Step 2 condition properly guards subsequent steps

### 🟡 **Business Logic Edge Cases (Unexpected Behavior)**

#### 4. Duplicate Priority Values
**Scenario:** Multiple vendors assigned same priority number
- **Example:** Vibrent=1, Citizen=1, Unite=3 (two vendors with Priority 1)
- **Impact:** `first()` selects based on Excel row order, not business intent
- **Flow Result:** Inconsistent vendor selection among same-priority vendors
- **Likelihood:** Medium (human error)
- **Risk Level:** MEDIUM - May not reflect intended business priorities

#### 5. Non-Sequential Priority Numbers
**Scenario:** Priority values skip numbers or use unexpected ranges
- **Example:** Vibrent=1, Citizen=5, Unite=10 instead of 1,2,3
- **Impact:** Logic still works but may be confusing for maintenance
- **Flow Result:** ✅ Functional but unclear priority relationships
- **Risk Level:** LOW - System works but harder to understand

#### 6. Priority Order Conflicts with Business Intent
**Scenario:** Excel Priority field doesn't match actual business preferences
- **Example:** Unite accidentally set to Priority 1 instead of Priority 3
- **Impact:** Wrong vendor gets preferential treatment
- **Flow Result:** Business logic violated
- **Likelihood:** Medium (data entry errors)
- **Risk Level:** HIGH - Defeats business objectives

### 🟢 **Graceful Edge Cases (Flow Handles Well)**

#### 7. All Vendors at Capacity (Post-Minimum)
**Scenario:** All vendors have Remaining Slots = 0 after minimums met
- **Example:** High enrollment pushes all vendors to capacity
- **Impact:** Step 1 filter returns empty array
- **Flow Result:** ✅ Step 2 condition catches empty → waitlist
- **Expected Behavior:** Correct

#### 8. Single Vendor Available
**Scenario:** Only one vendor has remaining capacity for disease
- **Example:** Vibrent and Citizen full, only Unite has DMD slots
- **Impact:** Filter returns single vendor, priority logic still works
- **Flow Result:** ✅ Assigns to available vendor regardless of priority
- **Expected Behavior:** Correct - capacity trumps priority

#### 9. Milestone Status Flip During Operation
**Scenario:** AllMinimumsAchieved changes from false to true mid-flow
- **Example:** Another submission completes final minimum during processing
- **Impact:** Current submission still uses Phase 1 logic (snapshot in time)
- **Flow Result:** ✅ Consistent within single execution
- **Expected Behavior:** Acceptable - next submission will use Phase 2

---

## Cross-Phase Edge Cases

### 🔴 **System-Level Critical Issues**

#### 1. Milestone Detection Failure
**Scenario:** MilestonesTable "All Minimums Met" calculation breaks
- **Example:** Formula error causes status to show "ERROR" instead of "ACHIEVED"
- **Impact:** AllMinimumsAchieved variable incorrectly set
- **Flow Result:** Wrong phase selection (Phase 1 vs Phase 2)
- **Likelihood:** Low (but catastrophic impact)
- **Risk Level:** CRITICAL - Entire system logic compromised

#### 2. Excel Table Corruption
**Scenario:** VendorDiseaseQuotasTable becomes corrupted or deleted
- **Example:** Accidental deletion of table during Excel maintenance
- **Impact:** Both phases fail to retrieve vendor data
- **Flow Result:** Complete system failure
- **Likelihood:** Very Low (but total failure)
- **Mitigation:** Excel file backups and access controls

### 🟡 **Data Consistency Issues**

#### 3. Race Conditions in High-Volume Scenarios
**Scenario:** Multiple form submissions processed simultaneously
- **Example:** Two DMD submissions arrive within seconds
- **Impact:** Both read same Excel state, may over-assign slots
- **Flow Result:** Potential quota violations
- **Likelihood:** Low (current volume)
- **Risk Level:** MEDIUM - Could increase with pilot growth

#### 4. Excel Formula Dependency Breaks
**Scenario:** Remaining Slots calculation depends on external references
- **Example:** Formula references moved or renamed ranges
- **Impact:** Remaining Slots shows incorrect values
- **Flow Result:** Wrong capacity assessments
- **Likelihood:** Medium (Excel maintenance risks)

---

## Recommendations

### **High Priority Fixes**
1. **Add error handling** for data type conversions (Form Submissions, Priority)
2. **Implement data validation** in Excel for critical fields
3. **Add consistency checks** for Min Met vs Actual Enrolled logic
4. **Create monitoring** for milestone calculation accuracy

### **Medium Priority Improvements**
1. **Standardize priority numbering** (enforce 1,2,3 sequence)
2. **Add duplicate priority detection** and warnings
3. **Implement Excel backup automation**
4. **Create data integrity dashboard**

### **Low Priority Enhancements**
1. **Add random selection** for tied vendors in Phase 1
2. **Create admin tools** for priority management
3. **Implement audit logging** for manual data changes
4. **Add capacity planning projections**