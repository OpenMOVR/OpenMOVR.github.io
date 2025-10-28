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
      `Participant ID | Timestamp | Name | Email | Disease Type | Relationship | Multi-Platform | How Heard | Assigned Vendor | Email Sent | Vendor Link | Enrollment Status | Enrollment Date | Days Since Form | Timeout Date`
    - Additional formula columns:
      - Participant ID: `=ROW()-1` (auto-incrementing)
      - Days Since Form: `=TODAY()-B2`
      - Timeout Date: `=B2+14` (2 weeks from form submission)
      - Enrollment Status: Manual update or "Pending" by default
    - Format as Table: `ParticipantsTable`

3. **Sheet 2: Vendor_Disease_Quotas**
    - Columns:  
      `Vendor Name | Disease | Min Quota | Max Quota | Form Submissions | Actual Enrolled | Min Met | Remaining Slots | Priority | Enrollment URL`
    - Example rows:
      ```
      Unite Genomics | SMA | 20 | 80 | =COUNTIFS(Participants!H:H,"Unite Genomics",Participants!D:D,"SMA") | =COUNTIFS(Participants!H:H,"Unite Genomics",Participants!D:D,"SMA",Participants!L:L,"Enrolled") | =IF(K2>=C2,"YES","NO") | =D2-J2 | 1 | https://unitegenomics.com/enroll/movr
      Unite Genomics | DMD | 10 | 20 | =COUNTIFS(Participants!H:H,"Unite Genomics",Participants!D:D,"DMD") | =COUNTIFS(Participants!H:H,"Unite Genomics",Participants!D:D,"DMD",Participants!L:L,"Enrolled") | =IF(K3>=C3,"YES","NO") | =D3-J3 | 3 | https://unitegenomics.com/enroll/movr
      Unite Genomics | LGMD | 10 | 20 | =COUNTIFS(Participants!H:H,"Unite Genomics",Participants!D:D,"LGMD") | =COUNTIFS(Participants!H:H,"Unite Genomics",Participants!D:D,"LGMD",Participants!L:L,"Enrolled") | =IF(K4>=C4,"YES","NO") | =D4-J4 | 3 | https://unitegenomics.com/enroll/movr
      Citizen Health | SMA | 10 | 20 | =COUNTIFS(Participants!H:H,"Citizen Health",Participants!D:D,"SMA") | =COUNTIFS(Participants!H:H,"Citizen Health",Participants!D:D,"SMA",Participants!L:L,"Enrolled") | =IF(K5>=C5,"YES","NO") | =D5-J5 | 2 | https://citizenhealth.com/join/mda
      Citizen Health | DMD | 10 | 20 | =COUNTIFS(Participants!H:H,"Citizen Health",Participants!D:D,"DMD") | =COUNTIFS(Participants!H:H,"Citizen Health",Participants!D:D,"DMD",Participants!L:L,"Enrolled") | =IF(K6>=C6,"YES","NO") | =D6-J6 | 2 | https://citizenhealth.com/join/mda
      Citizen Health | LGMD | 5 | 10 | =COUNTIFS(Participants!H:H,"Citizen Health",Participants!D:D,"LGMD") | =COUNTIFS(Participants!H:H,"Citizen Health",Participants!D:D,"LGMD",Participants!L:L,"Enrolled") | =IF(K7>=C7,"YES","NO") | =D7-J7 | 3 | https://citizenhealth.com/join/mda
      Vibrent Health | SMA | 15 | 30 | =COUNTIFS(Participants!H:H,"Vibrent Health",Participants!D:D,"SMA") | =COUNTIFS(Participants!H:H,"Vibrent Health",Participants!D:D,"SMA",Participants!L:L,"Enrolled") | =IF(K8>=C8,"YES","NO") | =D8-J8 | 1 | https://vibrenthealth.com/mda/pilot
      Vibrent Health | DMD | 15 | 30 | =COUNTIFS(Participants!H:H,"Vibrent Health",Participants!D:D,"DMD") | =COUNTIFS(Participants!H:H,"Vibrent Health",Participants!D:D,"DMD",Participants!L:L,"Enrolled") | =IF(K9>=C9,"YES","NO") | =D9-J9 | 1 | https://vibrenthealth.com/mda/pilot
      Vibrent Health | LGMD | 15 | 30 | =COUNTIFS(Participants!H:H,"Vibrent Health",Participants!D:D,"LGMD") | =COUNTIFS(Participants!H:H,"Vibrent Health",Participants!D:D,"LGMD",Participants!L:L,"Enrolled") | =IF(K10>=C10,"YES","NO") | =D10-J10 | 1 | https://vibrenthealth.com/mda/pilot
      ```
    - Format as Table: `VendorDiseaseQuotasTable`

4. **Sheet 3: Milestones**
    - Columns:  
      `Milestone | Target | Current | Status | Date Achieved`
    - Example rows:
      ```
      All Minimums Met | 40 | =COUNTIF(Vendor_Disease_Quotas!G:G,"YES") | =IF(C2>=B2,"ACHIEVED","IN PROGRESS") | =IF(D2="ACHIEVED",TODAY(),"")
      Vibrent 30 Each | 90 | =SUMIFS(Vendor_Disease_Quotas!K:K,Vendor_Disease_Quotas!A:A,"Vibrent Health") | =IF(C3>=B3,"ACHIEVED","IN PROGRESS") | =IF(D3="ACHIEVED",TODAY(),"")
      Citizen 30 Total | 50 | =SUMIFS(Vendor_Disease_Quotas!K:K,Vendor_Disease_Quotas!A:A,"Citizen Health") | =IF(C4>=B4,"ACHIEVED","IN PROGRESS") | =IF(D4="ACHIEVED",TODAY(),"")
      Unite 30 Total | 50 | =SUMIFS(Vendor_Disease_Quotas!K:K,Vendor_Disease_Quotas!A:A,"Unite Genomics") | =IF(C5>=B5,"ACHIEVED","IN PROGRESS") | =IF(D5="ACHIEVED",TODAY(),"")
      ```
    - Format as Table: `MilestonesTable`

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

2. **Get Vendor Disease Quotas**  
    - Action: List rows present in `VendorDiseaseQuotasTable` (Excel Online)

3. **Get Milestones Status**  
    - Action: List rows present in `MilestonesTable` (Excel Online)

4. **Initialize Variables**  
    - `AllMinimumsAchieved` (boolean)
    - `AssignedVendor` (string)
    - `VendorURL` (string)
    - `AssignmentReason` (string)

5. **Check Minimums Status**
    - Filter milestones for "All Minimums Met"
    - Set `AllMinimumsAchieved` = TRUE if status is "ACHIEVED"

6. **Disease-Specific Assignment Logic**
    - **Condition: All Minimums Not Met**
      - Filter vendor quotas for participant's disease type
      - Filter where Min Met = "NO" AND Remaining Slots > 0
      - Select vendor with lowest current Form Submissions count
      - Set AssignmentReason = "Minimum quota priority"
    
    - **Condition: All Minimums Met** 
      - Filter vendor quotas for participant's disease type
      - Priority order: Vibrent → Citizen → Unite
      - Select first vendor with Remaining Slots > 0
      - Set AssignmentReason = "Post-minimum priority order"
    
    - **Condition: No Available Slots**
      - Set AssignedVendor = "FULL"
      - Set AssignmentReason = "All vendors at capacity for this disease"

7. **Condition: Valid Assignment**
    - **IF AssignedVendor ≠ "FULL":**
      
      **7a. Add Row to Participants Table**  
        - Action: Add a row into `ParticipantsTable`  
        - Include: Participant ID, all form data, AssignedVendor, VendorURL, AssignmentReason
        - Set Enrollment Status = "Pending"
      
      **7b. Compose Success Email Body**  
        - Personalized email with assigned vendor and enrollment link
        - Include assignment reason for transparency
      
      **7c. Condition: Multi-Platform Interest**  
        - If checked, append all vendor links to email body
      
      **7d. Send Success Email**  
        - Action: Send an email (V2) via Outlook  
        - To: participant's email  
        - Subject: "Welcome to the MOVR Pilot - Next Steps"
      
      **7e. Update Participants Row**  
        - Mark "Email Sent" = TRUE
      
      **7f. Success Response**  
        - Return JSON: `{"status": "success", "message": "Thank you for joining! Check your email for next steps."}`

    - **ELSE (AssignedVendor = "FULL"):**
      
      **7g. Add Row to Waitlist**  
        - Action: Add a row into `ParticipantsTable`  
        - Set Assigned Vendor = "WAITLIST"
        - Set Enrollment Status = "Waitlisted"
      
      **7h. Send Waitlist Email**  
        - Action: Send an email (V2) via Outlook  
        - Subject: "MOVR Pilot - Currently at Capacity"
        - Body: Explain waitlist status and timeline
      
      **7i. Waitlist Response**  
        - Return JSON: `{"status": "waitlist", "message": "Thank you for your interest. You've been added to our waitlist."}`

---

## HTML Form Example

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>

<div id="form-container">
  <form id="pilot-form" onsubmit="submitForm(event)">
    <!-- CSRF Protection -->
    <input type="hidden" name="csrf_token" id="csrf_token">
    
    <!-- Enhanced form fields with validation -->
    <div class="form-group">
      <label for="name">Full Name *</label>
      <input type="text" id="name" name="name" required 
             placeholder="Enter your full name"
             pattern="[A-Za-z\s\-']+" 
             title="Please enter a valid name (letters, spaces, hyphens, apostrophes only)"
             maxlength="100">
      <div class="error-message" id="name-error"></div>
    </div>

    <div class="form-group">
      <label for="email">Email Address *</label>
      <input type="email" id="email" name="email" required 
             placeholder="your.email@example.com"
             maxlength="100">
      <div class="error-message" id="email-error"></div>
    </div>

    <div class="form-group">
      <label for="disease">Disease Type *</label>
      <select id="disease" name="disease" required>
         <option value="">Select Disease Type</option>
         <option value="DMD">Duchenne Muscular Dystrophy (DMD)</option>
         <option value="SMA">Spinal Muscular Atrophy (SMA)</option>
         <option value="LGMD">Limb-Girdle Muscular Dystrophy (LGMD)</option>
      </select>
      <div class="error-message" id="disease-error"></div>
    </div>

    <div class="form-group">
      <label for="relationship">Your Relationship *</label>
      <select id="relationship" name="relationship" required>
         <option value="">Select Your Relationship</option>
         <option value="Patient">I am the patient</option>
         <option value="Parent/Caregiver">I am a parent/caregiver</option>
         <option value="Other">Other family member</option>
      </select>
      <div class="error-message" id="relationship-error"></div>
    </div>

    <div class="form-group">
      <label for="howHeard">How did you hear about this?</label>
      <select id="howHeard" name="howHeard">
         <option value="">Select an option</option>
         <option value="Email">MDA Email</option>
         <option value="Social">Social Media</option>
         <option value="Event">MDA Event</option>
         <option value="Provider">Healthcare Provider</option>
         <option value="Friend">Friend/Family</option>
         <option value="Other">Other</option>
      </select>
    </div>

    <div class="form-group checkbox-group">
      <label>
         <input type="checkbox" name="multiPlatform" value="true">
         <span class="checkmark"></span>
         I'm interested in exploring all three platforms (optional)
      </label>
    </div>

    <div class="form-group checkbox-group">
      <label>
         <input type="checkbox" required name="attestation">
         <span class="checkmark"></span>
         I consent to participate and understand my data will be used for research purposes *
      </label>
      <div class="error-message" id="attestation-error"></div>
    </div>

    <button type="submit" id="submit-btn" class="submit-button">
      <span id="submit-text">Submit My Information</span>
      <span id="submit-spinner" class="spinner" style="display:none;">⏳ Submitting...</span>
    </button>
  </form>

  <!-- Success Message -->
  <div id="confirmation" class="message success-message" style="display:none;">
    <h2>✅ Thank you!</h2>
    <p>Check your email for next steps. You should receive an email within the next few minutes with your enrollment link.</p>
  </div>

  <!-- Waitlist Message -->
  <div id="waitlist" class="message waitlist-message" style="display:none;">
    <h2>📋 Added to Waitlist</h2>
    <p>Thank you for your interest! We're currently at capacity for your disease type, but you've been added to our waitlist. We'll contact you if a spot opens up.</p>
  </div>

  <!-- Error Message -->
  <div id="error" class="message error-message" style="display:none;">
    <h2>❌ Submission Error</h2>
    <p>There was an error submitting your information. Please check your connection and try again, or email <a href="mailto:pilothelp@mda.org">pilothelp@mda.org</a> for assistance.</p>
    <button onclick="resetForm()" class="retry-button">Try Again</button>
  </div>
</div>
<script>
// Rate limiting
let lastSubmission = 0;
const RATE_LIMIT_MS = 5000; // 5 seconds between submissions

// Generate CSRF token on page load
document.addEventListener('DOMContentLoaded', function() {
  generateCSRFToken();
  trackPageView();
});

function generateCSRFToken() {
  const token = Math.random().toString(36).substr(2) + Date.now().toString(36);
  document.getElementById('csrf_token').value = token;
}

function trackPageView() {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'page_view', {
      page_title: 'MOVR Pilot Registration',
      page_location: window.location.href
    });
  }
}

function validateEmail(email) {
  // Enhanced email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const disposableEmailDomains = ['tempmail.org', '10minutemail.com', 'guerrillamail.com'];
  
  if (!emailRegex.test(email)) return false;
  
  const domain = email.split('@')[1].toLowerCase();
  return !disposableEmailDomains.includes(domain);
}

function validateForm() {
  clearErrors();
  let isValid = true;

  // Name validation
  const name = document.getElementById('name').value.trim();
  if (name.length < 2) {
    showError('name-error', 'Name must be at least 2 characters long');
    isValid = false;
  }

  // Email validation
  const email = document.getElementById('email').value.trim();
  if (!validateEmail(email)) {
    showError('email-error', 'Please enter a valid email address');
    isValid = false;
  }

  // Required field validation
  const requiredFields = ['disease', 'relationship'];
  requiredFields.forEach(field => {
    if (!document.getElementById(field).value) {
      showError(field + '-error', 'This field is required');
      isValid = false;
    }
  });

  // Attestation validation
  if (!document.querySelector('input[name="attestation"]').checked) {
    showError('attestation-error', 'You must consent to participate');
    isValid = false;
  }

  return isValid;
}

function showError(elementId, message) {
  document.getElementById(elementId).textContent = message;
  document.getElementById(elementId).style.display = 'block';
}

function clearErrors() {
  const errorElements = document.querySelectorAll('.error-message');
  errorElements.forEach(el => {
    el.textContent = '';
    el.style.display = 'none';
  });
}

function submitForm(e) {
  e.preventDefault();
  
  // Rate limiting check
  const now = Date.now();
  if (now - lastSubmission < RATE_LIMIT_MS) {
    showError('email-error', 'Please wait before submitting again');
    return;
  }

  // Validate form
  if (!validateForm()) {
    trackEvent('form_validation_failed');
    return;
  }

  // Update UI to show loading state
  const submitBtn = document.getElementById('submit-btn');
  const submitText = document.getElementById('submit-text');
  const submitSpinner = document.getElementById('submit-spinner');
  
  submitBtn.disabled = true;
  submitText.style.display = 'none';
  submitSpinner.style.display = 'inline';

  // Prepare form data
  const form = document.getElementById('pilot-form');
  const formData = new FormData(form);
  const data = {};
  
  formData.forEach((value, key) => {
     if (key === 'multiPlatform') {
        data[key] = value;
     } else if (key !== 'attestation' && key !== 'csrf_token') {
        data[key] = value.trim();
     }
  });

  // Add submission metadata
  data.submissionTime = new Date().toISOString();
  data.userAgent = navigator.userAgent;
  data.referrer = document.referrer;

  const flowURL = 'YOUR_POWER_AUTOMATE_HTTP_TRIGGER_URL_HERE';
  
  // Submit with retry logic
  submitWithRetry(flowURL, data, 3)
    .then(response => response.json())
    .then(data => {
      lastSubmission = now;
      form.style.display = 'none';
      
      if (data.status === 'success') {
        document.getElementById('confirmation').style.display = 'block';
        trackEvent('form_submitted_success');
      } else if (data.status === 'waitlist') {
        document.getElementById('waitlist').style.display = 'block';
        trackEvent('form_submitted_waitlist');
      } else {
        throw new Error('Unknown response status');
      }
    })
    .catch(error => {
      console.error('Submission error:', error);
      document.getElementById('error').style.display = 'block';
      trackEvent('form_submission_failed');
      resetSubmitButton();
    });
}

async function submitWithRetry(url, data, maxRetries) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        return response;
      }
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
    }
  }
}

function resetSubmitButton() {
  const submitBtn = document.getElementById('submit-btn');
  const submitText = document.getElementById('submit-text');
  const submitSpinner = document.getElementById('submit-spinner');
  
  submitBtn.disabled = false;
  submitText.style.display = 'inline';
  submitSpinner.style.display = 'none';
}

function resetForm() {
  document.getElementById('pilot-form').style.display = 'block';
  document.getElementById('error').style.display = 'none';
  resetSubmitButton();
  clearErrors();
}

function trackEvent(eventName, parameters = {}) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, {
      custom_parameter: 'movr_pilot',
      ...parameters
    });
  }
}
</script>
```

---

## Getting Your Power Automate URL

- After saving your flow, copy the generated HTTP trigger URL
- Paste it into your HTML form JavaScript

---

## Vendor Assignment Logic (Priority System)

**Phase 1: Minimum Quotas First (Priority)**
1. Check if all minimums are met in Milestones sheet
2. If not, assign to vendor/disease combination with:
   - Minimum not yet met (Min Met = "NO")
   - Has remaining slots (Remaining Slots > 0)
   - Lowest current enrollment count

**Phase 2: Post-Minimum Priority Order**
Once all minimums are achieved:
1. **Vibrent Health** (Priority 1) - Fill to 30 each disease
2. **Citizen Health** (Priority 2) - Fill to max totals  
3. **Unite Genomics** (Priority 3) - Fill remaining slots

**Assignment Algorithm:**
```
FOR each form submission:
  IF all minimums not met:
    ASSIGN to vendor/disease with lowest current count where min not met
  ELSE:
    IF Vibrent has available slots for this disease:
      ASSIGN to Vibrent
    ELSE IF Citizen has available slots for this disease:
      ASSIGN to Citizen  
    ELSE IF Unite has available slots for this disease:
      ASSIGN to Unite
    ELSE:
      REJECT - all vendors full for this disease
```

**Hard Rules:**
- Never exceed Max Quota for any vendor/disease combination
- Must respect disease-specific quotas (not just vendor totals)
- Assignment stops when vendor reaches max for that disease

---

## Advantages of Power Automate vs Google Apps Script

- Sends from your Outlook account (no "via" warnings)
- Microsoft ecosystem: easier IT support and compliance
- Visual flow builder, built-in error handling
- Automatic logging and run history

---

## Enrollment Tracking & Monitoring

### Weekly Enrollment Status Updates
1. **Manual Status Updates** (Weekly Process):
   - Review each "Pending" participant in Excel
   - Check vendor enrollment systems for completion
   - Update Enrollment Status column:
     - "Enrolled" = Successfully completed vendor enrollment
     - "Discontinued" = 2+ weeks with no enrollment (opens slot)
     - "Pending" = Still within 2-week window

2. **Automated Milestone Tracking**:
   - **Milestones Sheet** automatically calculates:
     - Minimum quota achievement per vendor/disease
     - Overall progress toward 30-person targets
     - Date when milestones are reached
   - **Alerts** when milestones achieved (via Excel conditional formatting)

3. **Dashboard Views in Excel**:
   - **Pivot Table 1**: Enrollments by Vendor × Disease Type
   - **Pivot Table 2**: Weekly enrollment trends
   - **Pivot Table 3**: Conversion rates (Form → Actual Enrollment)
   - **Charts**: Visual progress toward quotas

### Timeout Management (2-Week Rule)
1. **Identification**: 
   - Filter participants where Days Since Form ≥ 14 AND Enrollment Status = "Pending"
   
2. **Weekly Action**:
   - Send reminder email to participants approaching timeout
   - After 2 weeks: Change status to "Discontinued"
   - This automatically opens slots for new participants (via Excel formulas)

3. **Slot Reallocation**:
   - When participant marked "Discontinued", Remaining Slots automatically increases
   - New form submissions can now be assigned to that vendor/disease combo

### Testing & Monitoring

- Test assignment logic with dummy data in Power Automate
- Verify Excel formulas update correctly with new submissions
- Monitor email delivery success rates via Outlook
- Weekly review of milestone progress and quota balance

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
