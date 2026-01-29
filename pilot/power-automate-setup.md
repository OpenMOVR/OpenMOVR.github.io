# Power Automate Flow Setup: MOVR Pilot Disease-Specific Vendor Assignment

**Flow Name:** `MOVR Pilot - Form Submission Handler`


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
        "ageGroup": {
            "type": "string",
            "enum": ["6-younger", "7-13", "14-17", "18-older"],
            "description": "Participant's age group"
        },
        "attestation": {
            "type": "string",
            "description": "Consent checkbox value (true when checked)"
        },
        "multiPlatform": {
            "type": "string",
            "description": "Interest in exploring multiple platforms (optional)"
        },
        "howHeard": {
            "type": "string",
            "enum": ["Email", "Social", "Call", "Provider", "Friend", "Other"],
            "description": "How participant heard about pilot"
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
    "required": ["name", "email", "disease", "relationship", "ageGroup", "howHeard", "attestation"]
}
```


## Step 2: Get Vendor Disease Quotas

**Action:** "List rows present in a table" (Excel Online)

**Settings:**
- **Location:** OneDrive for Business
- **Document Library:** OneDrive
- **File:** `MOVR_PILOT_PARICIPANTS.xlsx`
- **Table:** `VendorDiseaseQuotasTable`
- **Table ID:** `{61B3D0A9-C6A9-4BEC-8D7A-61DE464F3A12}`

**Purpose:** Gets current quota status for all vendor/disease combinations


## Step 3: Get Milestones Status

**Action:** "List rows present in a table" (Excel Online)

**Settings:**
- **Location:** OneDrive for Business
- **Document Library:** OneDrive
- **File:** `MOVR_PILOT_PARICIPANTS.xlsx`
- **Table:** `MilestonesTable`
- **Table ID:** `{EC5F379C-7C93-4061-ACD0-DD9294D44AC3}`

**Purpose:** Checks if minimum quotas have been achieved (disease-specific)


## Step 4: Initialize Variables

Create the following variables:

### Variable 1: ParticipantDiseaseMinimumAchieved
- **Name:** `ParticipantDiseaseMinimumAchieved`
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


## Step 5: Check Minimums Status (Disease-Specific)

**Action:** "Apply to each" (loop through milestones)

**Input:**
```
@outputs('List_rows_present_in_MilestonesTable')?['body/value']
```

**Inside the loop:**

### Condition: Check if Milestone contains participant's disease
**Expression:**
```
contains(items('Apply_to_each')?['Milestone'], triggerBody()?['disease'])
```

**If Yes:**
- **Action:** Set variable `ParticipantDiseaseMinimumAchieved`
- **Value:**
```
equals(items('Apply_to_each')?['Status'], 'ACHIEVED')
```

**How it works:**
- DMD participant → looks for milestone containing "DMD" → finds "DMD Minimums Met"
- SMA participant → looks for milestone containing "SMA" → finds "SMA Minimums Met"
- LGMD participant → looks for milestone containing "LGMD" → finds "LGMD Minimums Met"

> **Note:** This disease-specific check replaces the previous global "All Minimums Met" check, ensuring each disease type independently determines its phase transition.


## Step 6: Disease-Specific Assignment Logic

**Action:** "Condition"

**Condition:** Check if disease-specific minimums are achieved
```
@equals(variables('ParticipantDiseaseMinimumAchieved'), true)
```


### If Yes (Minimums Met) - POST-MINIMUM PHASE

**Action:** "Apply to each" (loop through vendor quotas)

**Input:**
```
@outputs('List_rows_present_in_VendorDiseaseQuotasTable')?['body/value']
```

**Inside loop - Condition:** Check disease match AND available slots
```
Disease matches:
@equals(items('Apply_to_each_2')?['Disease'], triggerBody()?['disease'])

Remaining slots > 0:
@greater(int(items('Apply_to_each_2')?['Remaining Slots']), 0)
```

**If Yes, check priority order (nested conditions):**

#### Priority 1: Vibrent Health
**Condition:** Vendor name equals "Vibrent Health"

**If Yes:**
1. **Set variable:** `AssignedVendor` = `Vibrent Health`
2. **Set variable:** `VendorURL` = `items('Apply_to_each_2')?['Enrollment URL']`
3. **Set variable:** `AssignmentReason` = `Post-minimum priority: Vibrent Health`

#### Priority 2: Citizen Health
**Condition:** Vendor name equals "Citizen Health"

**If Yes:**
1. **Set variable:** `AssignedVendor` = `Citizen Health`
2. **Set variable:** `VendorURL` = `items('Apply_to_each_2')?['Enrollment URL']`
3. **Set variable:** `AssignmentReason` = `Post-minimum priority: Citizen Health`

#### Priority 3: Unite Genomics
**Condition:** Vendor name equals "Unite Genomics"

**If Yes:**
1. **Set variable:** `AssignedVendor` = `Unite Genomics`
2. **Set variable:** `VendorURL` = `items('Apply_to_each_2')?['Enrollment URL']`
3. **Set variable:** `AssignmentReason` = `Post-minimum priority: Unite Genomics`


### If No (Minimums Not Met) - MINIMUM QUOTA PRIORITY PHASE

**Action:** Filter and assign to vendor needing minimum quota

**Filter criteria:**
- Disease matches participant's disease
- `Min Met` = `NO`
- `Remaining Slots` > 0

**Assignment logic:**
- Select vendor with lowest current Form Submissions count (rotation)

**Set variables:**
1. **Set variable:** `AssignedVendor` = Selected vendor name
2. **Set variable:** `VendorURL` = Selected vendor's Enrollment URL
3. **Set variable:** `AssignmentReason` = `Minimum quota priority - rotation based on form submissions`

> **Note:** The variable is `ParticipantDiseaseMinimumAchieved` (disease-specific), not the previous global `AllMinimumsAchieved`.


## Step 7: Final Assignment Check

**Action:** "Condition"

**Check if assignment was made:**
```
@equals(length(variables('AssignedVendor')), 0)
```

### If Yes (No Assignment Made - All Vendors Full)
1. **Set variable:** `AssignedVendor` = `WAITLIST`
2. **Set variable:** `AssignmentReason` = `All vendors at capacity for this disease`


## Step 8: Add Participant to Excel

**Action:** "Add a row into a table" (Excel Online)

**Settings:**
- **Location:** OneDrive for Business
- **Document Library:** OneDrive
- **File:** `MOVR_PILOT_PARICIPANTS.xlsx`
- **Table:** `ParticipantsTable`
- **Table ID:** `{748BF5EC-CF2A-4B57-B4A4-3EE5BBE903F0}`

**Column Mappings:**

| Column | Value |
|--------|-------|
| Participant ID | `@guid()` |
| Timestamp | `@triggerBody()?['submissionTime']` |
| Name | `@triggerBody()?['name']` |
| Email | `@triggerBody()?['email']` |
| Disease Type | `@triggerBody()?['disease']` |
| Relationship | `@triggerBody()?['relationship']` |
| Multi-Platform Interest | `@triggerBody()?['multiPlatform']` |
| How Heard | `@triggerBody()?['howHeard']` |
| Assigned Vendor | `@variables('AssignedVendor')` |
| Email Sent | `FALSE` |
| Vendor Link | `@variables('VendorURL')` |
| Enrollment Status | `@if(equals(variables('AssignedVendor'), 'WAITLIST'), 'Waitlisted', 'Pending')` |
| Days Since Form | `0` |
| Age Group | `@triggerBody()?['ageGroup']` |
| Attestation | `@triggerBody()?['attestation']` |
| Assignment Reason | `@variables('AssignmentReason')` |
| Timeout Date | `@addDays(utcNow(), 14)` |


## Step 9: Email Composition and Sending

**Action:** "Condition"

**Check assignment type:**
```
@not(equals(variables('AssignedVendor'), 'WAITLIST'))
```


### If Yes (Success Assignment):

**Action:** "Compose" - Name: `Compose_Success_Email`

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

| Setting | Value |
|---------|-------|
| To | `@outputs('Add_row_to_ParticipantsTable')?['body/Email']` |
| Subject | `Welcome to the MOVR 2.0 Pilot for @{triggerBody()?['disease']} - Next Steps` |
| Body | `@outputs('Compose_Success_Email')` |
| Cc | `MDAMOVR@mdausa.org` |
| Importance | `High` |


### If No (Waitlist):

**Action:** "Compose" - Name: `Compose_Waitlist_Email`

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

| Setting | Value |
|---------|-------|
| To | `@outputs('Add_row_to_ParticipantsTable')?['body/Email']` |
| Subject | `MOVR 2.0 Pilot - Currently at Capacity for @{triggerBody()?['disease']}` |
| Body | `@outputs('Compose_Waitlist_Email')` |
| Bcc | `MDAMOVR@mdausa.org` |
| Importance | `High` |


## Step 10: Update Email Status

**Action:** "Update a row" (Excel Online)

**Settings:**
- **Location:** OneDrive for Business
- **Document Library:** OneDrive
- **File:** `MOVR_PILOT_PARICIPANTS.xlsx`
- **Table:** `ParticipantsTable`
- **Table ID:** `{748BF5EC-CF2A-4B57-B4A4-3EE5BBE903F0}`
- **Key Column:** `Participant ID`
- **Key Value:** `@outputs('Add_row_to_ParticipantsTable')?['body/Participant ID']`

**Update:**

| Column | Value |
|--------|-------|
| Email Sent | `TRUE` |


## Step 11: Response

**Action:** "Response"

**Condition:** Check if assigned vendor is not WAITLIST

### If Success (Not Waitlist):
```json
{
  "status": "success",
  "message": "Thank you for joining! Check your email for next steps.",
  "vendor": "@{variables('AssignedVendor')}",
  "enrollmentUrl": "@{variables('VendorURL')}"
}
```

### If Waitlist:
```json
{
  "status": "waitlist",
  "message": "Thank you for your interest. You've been added to our waitlist."
}
```


## Testing Checklist

- [ ] Test with each disease type (DMD, SMA, LGMD)
- [ ] Verify quota calculations update correctly
- [ ] Test when minimums not met vs. met
- [ ] Test vendor priority order
- [ ] Test waitlist functionality when at capacity
- [ ] Verify email delivery
- [ ] Check Excel data accuracy
- [ ] Test milestone achievement detection


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