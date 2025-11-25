# Power Automate Flow Setup: MOVR Pilot Disease-Specific Vendor Assignment

**Flow Name:** `MOVR Pilot - Form Submission Handler`

---

## Step 1: Trigger - When HTTP Request is Received

**Action:** "When a HTTP request is received"

**Settings:**
- **Who can trigger the flow:** Anyone
- **Request Body JSON Schema:** (Copy from pilot.json)

```json
{
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "description": "Participant's full name"
        },
        "email": {
            "type": "string",
            "format": "email",
            "description": "Participant's email address"
        },
        "disease": {
            "type": "string",
            "enum": ["DMD", "SMA", "LGMD"],
            "description": "Disease type: DMD, SMA, or LGMD"
        },
        "relationship": {
            "type": "string",
            "enum": ["Patient", "Parent/Caregiver", "Other"],
            "description": "Participant's relationship to patient"
        },
        "multiPlatform": {
            "type": "string",
            "description": "Interest in exploring multiple platforms (optional)"
        },
        "howHeard": {
            "type": "string",
            "enum": ["Email", "Social", "Event", "Provider", "Friend", "Other"],
            "description": "How participant heard about pilot (optional)"
        },
        "submissionTime": {
            "type": "string",
            "format": "date-time",
            "description": "ISO timestamp of form submission"
        },
        "userAgent": {
            "type": "string",
            "description": "Browser user agent string"
        },
        "referrer": {
            "type": "string",
            "description": "Page referrer URL"
        }
    },
    "required": ["name", "email", "disease", "relationship"]
}
```

---

## Step 2: Get Vendor Disease Quotas

**Action:** "List rows present in a table" (Excel Online)

**Settings:**
- **Location:** OneDrive for Business
- **Document Library:** OneDrive
- **File:** `MOVR_Pilot_Participants.xlsx`
- **Table:** `VendorDiseaseQuotasTable`

**Purpose:** Gets current quota status for all vendor/disease combinations

---

## Step 3: Get Milestones Status

**Action:** "List rows present in a table" (Excel Online)

**Settings:**
- **Location:** OneDrive for Business
- **Document Library:** OneDrive  
- **File:** `MOVR_Pilot_Participants.xlsx`
- **Table:** `MilestonesTable`

**Purpose:** Checks if minimum quotas have been achieved

---

## Step 4: Initialize Variables

Create the following variables:

### Variable 1: AllMinimumsAchieved
- **Name:** `AllMinimumsAchieved`
- **Type:** Boolean
- **Value:** `false`

### Variable 2: AssignedVendor
- **Name:** `AssignedVendor`
- **Type:** String
- **Value:** (leave empty)

### Variable 3: VendorURL
- **Name:** `VendorURL`
- **Type:** String
- **Value:** (leave empty)

### Variable 4: AssignmentReason
- **Name:** `AssignmentReason`
- **Type:** String
- **Value:** (leave empty)

---

## Step 5: Check Minimums Status

**Action:** "Apply to each" (loop through milestones)

**Input:** `body('Get_Milestones_Status')?['value']`

**Inside the loop:**

### Condition: Check if "All Minimums Met"
- **Left side:** `items('Apply_to_each')?['Milestone']`
- **Operator:** is equal to
- **Right side:** `All Minimums Met`

**If Yes:**
- **Action:** Set variable `AllMinimumsAchieved`
- **Value:** 
```
if(equals(items('Apply_to_each')?['Status'], 'ACHIEVED'), true, false)
```

---

## Step 6: Disease-Specific Assignment Logic

**Action:** "Condition" 

**Condition:** Check if minimums are achieved
- **Left side:** `variables('AllMinimumsAchieved')`
- **Operator:** is equal to
- **Right side:** `false`

### If No (Minimums Not Met) - PRIORITY PHASE

**Action:** "Apply to each" (loop through vendor quotas)
**Input:** `body('Get_Vendor_Disease_Quotas')?['value']`

**Inside loop - Condition:** Check for minimum quota assignment
- **Left side:** `items('Apply_to_each_2')?['Disease']`
- **Operator:** is equal to  
- **Right side:** `triggerBody()?['disease']`

**AND**

- **Left side:** `items('Apply_to_each_2')?['Min Met']`
- **Operator:** is equal to
- **Right side:** `NO`

**AND**

- **Left side:** `int(items('Apply_to_each_2')?['Remaining Slots'])`
- **Operator:** is greater than
- **Right side:** `0`

**If Yes (Found minimum quota slot):**
1. **Set variable:** `AssignedVendor` = `items('Apply_to_each_2')?['Vendor Name']`
2. **Set variable:** `VendorURL` = `items('Apply_to_each_2')?['Enrollment URL']`
3. **Set variable:** `AssignmentReason` = `Minimum quota priority`

### If Yes (Minimums Met) - POST-MINIMUM PHASE

**Action:** "Apply to each" (loop through vendor quotas)
**Input:** `body('Get_Vendor_Disease_Quotas')?['value']`

**Filter for disease type first:**

**Condition:** Match disease type
- **Left side:** `items('Apply_to_each_3')?['Disease']`
- **Operator:** is equal to
- **Right side:** `triggerBody()?['disease']`

**AND**

- **Left side:** `int(items('Apply_to_each_3')?['Remaining Slots'])`
- **Operator:** is greater than
- **Right side:** `0`

**If Yes, check priority order:**

**Condition 1:** Check for Vibrent (Priority 1)
- **Left side:** `items('Apply_to_each_3')?['Vendor Name']`
- **Operator:** is equal to
- **Right side:** `Vibrent Health`

**If Yes:**
1. **Set variable:** `AssignedVendor` = `Vibrent Health`
2. **Set variable:** `VendorURL` = `items('Apply_to_each_3')?['Enrollment URL']`
3. **Set variable:** `AssignmentReason` = `Post-minimum priority: Vibrent Health`

**Else, Condition 2:** Check for Citizen (Priority 2)
- **Left side:** `items('Apply_to_each_3')?['Vendor Name']`
- **Operator:** is equal to
- **Right side:** `Citizen Health`

**If Yes:**
1. **Set variable:** `AssignedVendor` = `Citizen Health`
2. **Set variable:** `VendorURL` = `items('Apply_to_each_3')?['Enrollment URL']`
3. **Set variable:** `AssignmentReason` = `Post-minimum priority: Citizen Health`

**Else, Condition 3:** Check for Unite (Priority 3)
- **Left side:** `items('Apply_to_each_3')?['Vendor Name']`
- **Operator:** is equal to
- **Right side:** `Unite Genomics`

**If Yes:**
1. **Set variable:** `AssignedVendor` = `Unite Genomics`
2. **Set variable:** `VendorURL` = `items('Apply_to_each_3')?['Enrollment URL']`
3. **Set variable:** `AssignmentReason` = `Post-minimum priority: Unite Genomics`

---

## Step 7: Final Assignment Check

**Action:** "Condition"

**Check if assignment was made:**
- **Left side:** `length(variables('AssignedVendor'))`
- **Operator:** is greater than
- **Right side:** `0`

### If No Assignment Made (All Vendors Full)
1. **Set variable:** `AssignedVendor` = `WAITLIST`
2. **Set variable:** `AssignmentReason` = `All vendors at capacity for this disease`

---

## Step 8: Add Participant to Excel

**Action:** "Add a row into a table" (Excel Online)

**Settings:**
- **Location:** OneDrive for Business
- **Document Library:** OneDrive
- **File:** `MOVR_Pilot_Participants.xlsx`
- **Table:** `ParticipantsTable`

**Column Mappings:**
- **Participant ID:** `add(outputs('Get_rows')?['body/value']?[0]?['Participant_x0020_ID'], 1)`
- **Timestamp:** `triggerBody()?['submissionTime']`
- **Name:** `triggerBody()?['name']`
- **Email:** `triggerBody()?['email']`
- **Disease Type:** `triggerBody()?['disease']`
- **Relationship:** `triggerBody()?['relationship']`
- **Multi-Platform:** `triggerBody()?['multiPlatform']`
- **How Heard:** `triggerBody()?['howHeard']`
- **Assigned Vendor:** `variables('AssignedVendor')`
- **Email Sent:** `FALSE`
- **Vendor Link:** `variables('VendorURL')`
- **Enrollment Status:** `if(equals(variables('AssignedVendor'), 'WAITLIST'), 'Waitlisted', 'Pending')`
- **Enrollment Date:** (leave empty)
- **Days Since Form:** `0`
- **Timeout Date:** `addDays(utcNow(), 14)`

---

## Step 9: Email Composition and Sending

**Action:** "Condition"

**Check assignment type:**
- **Left side:** `variables('AssignedVendor')`
- **Operator:** is not equal to
- **Right side:** `WAITLIST`

### If Success Assignment:

**Action:** "Compose" (Create email body)

**Email Body:**
```
Hi @{triggerBody()?['name']},

Thank you for joining the MOVR pilot! You're helping shape how we support families managing neuromuscular diseases.

Your next step: Get started with @{variables('AssignedVendor')}

Click here to begin: @{variables('VendorURL')}

Assignment Reason: @{variables('AssignmentReason')}

What to expect:
- Create your account (5 minutes)
- Explore the platform and add information at your own pace (30-45 minutes)
- We'll send a brief feedback survey in 1-2 weeks

@{if(equals(triggerBody()?['multiPlatform'], 'true'), 
'You indicated interest in exploring all platforms. Here are the other enrollment links:
- Unite Genomics: https://unitegenomics.com/enroll/movr
- Citizen Health: https://citizenhealth.com/join/mda  
- Vibrent Health: https://vibrenthealth.com/mda/pilot', 
'')}

Questions? Reply to this email or contact mdamovr@mdausa.org

Thanks for being part of this!
The MDA MOVR Team
```

**Action:** "Send an email (V2)" (Office 365 Outlook)

**Settings:**
- **To:** `triggerBody()?['email']`
- **Subject:** `Welcome to the MOVR Pilot - Next Steps`
- **Body:** `outputs('Compose')`

### If Waitlist:

**Action:** "Compose" (Create waitlist email)

**Waitlist Email Body:**
```
Hi @{triggerBody()?['name']},

Thank you for your interest in the MOVR pilot!

We're currently at capacity for @{triggerBody()?['disease']} participants, but you've been added to our waitlist. We'll contact you immediately if a spot opens up.

In the meantime, feel free to reach out with any questions at mdamovr@mdausa.org

Thanks for your interest in helping improve MOVR!
The MDA MOVR Team
```

**Action:** "Send an email (V2)" (Office 365 Outlook)

**Settings:**
- **To:** `triggerBody()?['email']`
- **Subject:** `MOVR Pilot - Currently at Capacity`
- **Body:** `outputs('Compose_2')`

---

## Step 10: Update Email Status

**Action:** "Update a row" (Excel Online)

**Settings:**
- **Location:** OneDrive for Business
- **Document Library:** OneDrive
- **File:** `MOVR_Pilot_Participants.xlsx`
- **Table:** `ParticipantsTable`
- **Key Column:** `Participant ID`
- **Key Value:** (ID from Step 8)

**Update:**
- **Email Sent:** `TRUE`

---

## Step 11: Response

**Action:** "Response"

**Condition:** Check assignment result

### If Success:
```json
{
  "status": "success",
  "message": "Thank you for joining! Check your email for next steps."
}
```

### If Waitlist:
```json
{
  "status": "waitlist", 
  "message": "Thank you for your interest. You've been added to our waitlist."
}
```

---

## Testing Checklist

- [ ] Test with each disease type (DMD, SMA, LGMD)
- [ ] Verify quota calculations update correctly
- [ ] Test when minimums not met vs. met
- [ ] Test vendor priority order
- [ ] Test waitlist functionality when at capacity
- [ ] Verify email delivery
- [ ] Check Excel data accuracy
- [ ] Test milestone achievement detection

---

## Monitoring

**Run History:** Check Power Automate run history for:
- Successful executions
- Failed runs and error messages
- Processing time per submission

**Excel Monitoring:** Weekly review of:
- Participant enrollment status
- Quota progress
- Milestone achievements
- Email delivery confirmations