# MOVR Pilot: Microsoft Power Automate + Excel Online Architecture

**PAGE URL:** [openmovr.github.io/pilot](https://openmovr.github.io/pilot)  
**Backend:** Microsoft Power Automate + Excel Online + Outlook  
**Target:** 500 participants  
**Cost:** $0 (included with Microsoft 365)

---

## Architecture Overview

### Frontend

- Static HTML page hosted on GitHub Pages (`openmovr.github.io/pilot`)
- HTML form with JavaScript
- Form submits to Power Automate HTTP trigger endpoint

### Backend

- Excel Online workbook in OneDrive/SharePoint
- Power Automate flow handles form submissions
- Vendor assignment based on quota logic
- Emails sent via Outlook

---

## Excel Online Workbook Setup

1. **Create a new Excel workbook** in OneDrive for Business  
    Name: `MOVR_Pilot_Participants.xlsx`

2. **Sheet 1: Participants**
    - Columns:  
      `Timestamp | Name | Email | Disease Type | Relationship | Multi-Platform | How Heard | Assigned Vendor | Email Sent | Vendor Link`
    - Format as Table: `ParticipantsTable`

3. **Sheet 2: Vendor_Quotas**
    - Columns:  
      `Vendor Name | Target Quota | Current Enrolled | Remaining Slots | Enrollment URL`
    - Example rows:
      ```
      Unite Genomics | 200 | =COUNTIF(Participants!H:H,"Unite Genomics") | =B2-C2 | https://unitegenomics.com/enroll/movr
      Citizen Health | 150 | =COUNTIF(Participants!H:H,"Citizen Health") | =B3-C3 | https://citizenhealth.com/join/mda
      Vibrent Health | 150 | =COUNTIF(Participants!H:H,"Vibrent Health") | =B4-C4 | https://vibrenthealth.com/mda/pilot
      ```
    - Format as Table: `VendorQuotasTable`

4. **Share settings:**  
    - Only you need edit access  
    - Store in OneDrive for Business or SharePoint

---

## Power Automate Flow Setup

**Flow Name:** `MOVR Pilot - Form Submission Handler`

### Steps

1. **Trigger:** When HTTP request is received  
    - Generates webhook URL for form submission  
    - Request Body JSON Schema:
      ```json
      {
         "type": "object",
         "properties": {
            "name": {"type": "string"},
            "email": {"type": "string"},
            "disease": {"type": "string"},
            "relationship": {"type": "string"},
            "multiPlatform": {"type": "string"},
            "howHeard": {"type": "string"}
         }
      }
      ```

2. **Get Current Vendor Counts**  
    - Action: List rows present in `VendorQuotasTable` (Excel Online)

3. **Initialize Variables**  
    - `UniteRemaining`, `CitizenRemaining`, `VibrentRemaining` (integers from Vendor_Quotas)

4. **Assign Vendor Logic**  
    - Assign to vendor with most remaining slots  
    - Set `AssignedVendor` and `VendorURL` accordingly

5. **Add Row to Participants Table**  
    - Action: Add a row into `ParticipantsTable`  
    - Map fields from trigger body and variables

6. **Compose Email Body**  
    - Personalized email with assigned vendor and enrollment link

7. **Condition:** Multi-Platform Interest  
    - If checked, append all vendor links to email body

8. **Send Email**  
    - Action: Send an email (V2) via Outlook  
    - To: participant's email  
    - Subject: Welcome to the MOVR Pilot

9. **Update Excel Row**  
    - Mark "Email Sent" as TRUE

10. **Response**  
     - Return JSON: `{"status": "success", "message": "Thank you for joining!"}`

---

## HTML Form Example

```html
<form id="pilot-form" onsubmit="submitForm(event)">
  <input type="text" name="name" required placeholder="Full Name">
  <input type="email" name="email" required placeholder="Email Address">
  <select name="disease" required>
     <option value="">Select Disease Type</option>
     <option value="DMD">Duchenne Muscular Dystrophy (DMD)</option>
     <option value="SMA">Spinal Muscular Atrophy (SMA)</option>
     <option value="LGMD">Limb-Girdle Muscular Dystrophy (LGMD)</option>
  </select>
  <select name="relationship" required>
     <option value="">Your Relationship</option>
     <option value="Patient">I am the patient</option>
     <option value="Parent/Caregiver">I am a parent/caregiver</option>
     <option value="Other">Other family member</option>
  </select>
  <select name="howHeard">
     <option value="">How did you hear about this?</option>
     <option value="Email">MDA Email</option>
     <option value="Social">Social Media</option>
     <option value="Event">MDA Event</option>
     <option value="Provider">Healthcare Provider</option>
     <option value="Friend">Friend/Family</option>
     <option value="Other">Other</option>
  </select>
  <label>
     <input type="checkbox" name="multiPlatform" value="true">
     I'm interested in exploring all three platforms
  </label>
  <label>
     <input type="checkbox" required name="attestation">
     I consent to participate and understand data will be used for research
  </label>
  <button type="submit">Submit My Information</button>
</form>
<div id="confirmation" style="display:none;">
  <h2>Thank you!</h2>
  <p>Check your email for next steps. You should receive an email within the next few minutes with your enrollment link.</p>
</div>
<div id="error" style="display:none;">
  <p>There was an error submitting your information. Please try again or email pilothelp@mda.org</p>
</div>
<script>
function submitForm(e) {
  e.preventDefault();
  var form = document.getElementById('pilot-form');
  var formData = new FormData(form);
  var data = {};
  formData.forEach((value, key) => {
     if (key === 'multiPlatform') {
        data[key] = value;
     } else if (key !== 'attestation') {
        data[key] = value;
     }
  });
  var flowURL = 'YOUR_POWER_AUTOMATE_HTTP_TRIGGER_URL_HERE';
  fetch(flowURL, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
     form.style.display = 'none';
     document.getElementById('confirmation').style.display = 'block';
  })
  .catch(error => {
     document.getElementById('error').style.display = 'block';
  });
}
</script>
```

---

## Getting Your Power Automate URL

- After saving your flow, copy the generated HTTP trigger URL
- Paste it into your HTML form JavaScript

---

## Vendor Assignment Logic Options

1. **Most Remaining Slots (Recommended):** Assign to vendor with most availability.
2. **Weighted Random:** Assign based on proportional remaining slots.
3. **Round Robin:** Assign in rotation.

---

## Advantages of Power Automate vs Google Apps Script

- Sends from your Outlook account (no "via" warnings)
- Microsoft ecosystem: easier IT support and compliance
- Visual flow builder, built-in error handling
- Automatic logging and run history

---

## Testing & Monitoring

- Test with dummy data in Power Automate
- Check Excel for updates, email receipt, and vendor assignment
- Monitor submissions and email delivery via Excel and Outlook

---

## Limits & Capacity

- Power Automate: ~5,000 actions/day (sufficient for 500+ submissions)
- Excel Online: 5MB file size, 1M+ rows
- Outlook: 10,000 recipients/day

---

## Advanced Features (Optional)

- Reminder emails for incomplete enrollments
- Admin notifications on milestones
- Approval workflows
- Multi-language support
- Vendor completion tracking

---

## Security & Privacy

- Data stored in OneDrive for Business (encrypted)
- Power Automate runs under your account
- HTTPS for all form submissions
- Keep URLs and Excel file private

---

## Development Checklist

- [ ] Create Excel workbook and format as tables
- [ ] Add vendor URLs and formulas
- [ ] Build Power Automate flow
- [ ] Test with sample data
- [ ] Build and test HTML landing page
- [ ] Launch to pilot group

---

## Estimated Build Time

- **New to Power Automate:** ~4-5 hours
- **Experienced:** ~3-4 hours

---

## Why Use Microsoft 365 for This?

- IT-friendly, secure, and auditable
- Professional email delivery
- Easy collaboration and support

---

## Next Steps

1. Create Excel workbook
2. Build Power Automate flow
3. Test with your email
4. Build HTML page
5. Launch

---

*Questions? Want a walkthrough of any step? Let us know!*
