# MOVR 2.0 Pilot - Standard Operating Procedures
## Technical Operations Guide for Clinical Ops & Development Team

**Document Owner:** Andre D. Paredes, PhD
**Last Updated:** 2026-01-03
**Review Cycle:** Monthly or after significant system changes
**Location:** Team OneDrive > MOVR Pilot > Documentation


## Table of Contents

1. [System Overview](#1-system-overview)
2. [Daily Operations](#2-daily-operations)
3. [Weekly Operations](#3-weekly-operations)
4. [Enrollment Status Management](#4-enrollment-status-management)
5. [Timeout & Waitlist Management](#5-timeout--waitlist-management)
6. [Power BI Dashboard Maintenance](#6-power-bi-dashboard-maintenance)
7. [Troubleshooting Guide](#7-troubleshooting-guide)
8. [Issue Escalation](#8-issue-escalation)
9. [Data Security & Privacy](#9-data-security--privacy)
10. [Contact & Support](#10-contact--support)


## 1. System Overview

### Architecture Summary

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Landing Page   │────▶│  Power Automate  │────▶│  Excel Online   │
│  (GitHub Pages) │     │  (Webhook Flow)  │     │  (Data Store)   │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                                │                        │
                                ▼                        ▼
                        ┌──────────────┐         ┌─────────────┐
                        │   Outlook    │         │  Power BI   │
                        │  (Emails)    │         │ (Reporting) │
                        └──────────────┘         └─────────────┘
```

### Key Components

| Component | Location | Purpose |
|-----------|----------|---------|
| Landing Page | https://openmovr.github.io/pilot | Public enrollment form |
| Power Automate | Power Platform > Flows | Processes submissions, assigns vendors |
| Excel Workbook | OneDrive > Power_automate > movr-pilot-landing-page | Participant data storage |
| Power BI | Power BI Service | Reporting dashboard |
| Email Templates | Outlook / Power Automate | Automated communications |

### Vendor Platforms

| Vendor | Priority | Enrollment URL | Contact |
|--------|----------|----------------|---------|
| Vibrent Health | 1 (Highest) | vibrenthealth.com/mda/pilot | [Vendor Contact] |
| Citizen Health | 2 | citizenhealth.com/join/mda | [Vendor Contact] |
| Unite Genomics | 3 | unitegenomics.com/enroll/movr | [Vendor Contact] |


## 2. Daily Operations

### Morning Check (5 minutes)

**Responsible:** Clinical Ops Team

1. **Check Power Automate Flow Status**
   - Navigate to: Power Platform > Flows > "MOVR Pilot - Form Submission Handler"
   - Verify status shows "On"
   - Check "Run history" for any failed runs in last 24 hours
   - **If failures found:** See [Section 7: Troubleshooting](#7-troubleshooting-guide)

2. **Review New Submissions**
   - Open Excel workbook: `MOVR_PILOT_PARTICIPANTS.xlsx`
   - Filter ParticipantsTable by today's date
   - Verify new submissions have:
     - Assigned Vendor populated
     - Email Sent = TRUE
     - Enrollment Status = "Pending"

3. **Monitor Support Inbox**
   - Check mdamovr@mdausa.org for:
     - Participant questions
     - Enrollment issues
     - Multi-platform requests

### Response SLAs

| Request Type | Response Time | Resolution Time |
|--------------|---------------|-----------------|
| Enrollment questions | 4 business hours | 1 business day |
| Technical issues | 2 business hours | 4 business hours |
| Multi-platform requests | 1 business day | 2 business days |
| Urgent/escalations | 1 hour | Same day |


## 3. Weekly Operations

### Weekly Review Meeting (30 minutes)

**Schedule:** Every Monday
**Attendees:** Andre, Jessica, [Clinical Ops Team]
**Agenda:**
1. Review enrollment numbers by vendor/disease
2. Discuss any participant issues
3. Review timeout queue
4. Quota progress check
5. Action items for week

### Weekly Tasks Checklist

#### Task 1: Update Enrollment Status (Jessica)
**Frequency:** Monday & Thursday
**Time Required:** 15-30 minutes

```
Steps:
1. Open Excel workbook
2. Filter ParticipantsTable: Enrollment Status = "Pending"
3. For each pending participant:
   a. Check vendor platform for enrollment completion
   b. Update Enrollment Status:
      - "Enrolled" = Completed vendor enrollment + research consent
      - "Platform Only" = Completed vendor enrollment, no research consent
      - "Pending" = Still within 14-day window, no action yet
      - "Discontinued" = 14+ days with no enrollment
4. Update Enrollment Date for completed enrollments
5. Save workbook
```

#### Task 2: Process Timeouts (Jessica)
**Frequency:** Weekly (Wednesday recommended)
**Time Required:** 15 minutes

```
Steps:
1. Filter ParticipantsTable where:
   - Days Since Form >= 12 AND Enrollment Status = "Pending"
2. Send reminder email to participants approaching timeout
3. Filter where Days Since Form >= 14:
   - Update Enrollment Status to "Discontinued"
   - This automatically opens vendor slots
4. Document any special cases
```

#### Task 3: Quota & Milestone Review (Andre)
**Frequency:** Weekly (Friday)
**Time Required:** 10 minutes

```
Steps:
1. Review VendorDiseaseQuotasTable
2. Check each vendor/disease combination:
   - Current Form Submissions
   - Actual Enrolled count
   - Remaining Slots
   - Min Met status
3. Review MilestonesTable for progress
4. Flag any concerns for Monday meeting
```

#### Task 4: Power BI Refresh (Andre)
**Frequency:** Weekly or as needed
**Time Required:** 5 minutes

```
Steps:
1. Open Power BI report
2. Click "Refresh" to pull latest Excel data
3. Verify visualizations show current data
4. Export weekly summary if needed
```


## 4. Enrollment Status Management

### Status Definitions

| Status | Definition | Action Required |
|--------|------------|-----------------|
| **Pending** | Form submitted, awaiting vendor enrollment | Monitor; send reminders at Day 7, Day 12 |
| **Enrolled** | Completed vendor enrollment AND research consent | None - success state |
| **Platform Only** | Completed vendor enrollment, NO research consent | Follow up for consent |
| **Discontinued** | 14+ days without enrollment | Slot reopened; can re-enroll if interested |
| **Waitlisted** | All vendors at capacity for disease type | Notify when slots open |

### Status Update Workflow

```
Day 0: Form Submitted → Status: "Pending"
        │
Day 7:  ├── Still Pending? → Send Reminder Email #1
        │
Day 12: ├── Still Pending? → Send Reminder Email #2 (urgent)
        │
Day 14: └── Still Pending? → Status: "Discontinued"
                             Vendor slot reopened
```

### Reminder Email Templates

**Day 7 Reminder:**
```
Subject: MOVR 2.0 Pilot - Complete Your Enrollment

Hi [Name],

Thank you for signing up for the MOVR 2.0 Pilot! We noticed you haven't
completed your enrollment on [Vendor Name] yet.

Your enrollment link: [URL]

Need help? Reply to this email or reach us at mdamovr@mdausa.org.

— The MOVR Team
```

**Day 12 Reminder (Urgent):**
```
Subject: Action Required: MOVR 2.0 Pilot Enrollment Expiring Soon

Hi [Name],

Your MOVR 2.0 Pilot enrollment window closes in 2 days. Please complete
your enrollment on [Vendor Name] to secure your spot.

Your enrollment link: [URL]

If you're no longer interested, no action is needed.

— The MOVR Team
```


## 5. Timeout & Waitlist Management

### Timeout Process (14-Day Rule)

**Purpose:** Ensure active participants get slots; prevent indefinite holds

**Process:**
1. Participant submits form → 14-day enrollment window starts
2. Day 7: First reminder email
3. Day 12: Urgent reminder email
4. Day 14+: If still "Pending":
   - Change status to "Discontinued"
   - Remaining Slots formula automatically increases
   - Slot becomes available for new participants

### Waitlist Management

**When participants are waitlisted:**
1. All vendors at capacity for their disease type
2. Status set to "Waitlisted" automatically
3. Waitlist email sent with explanation

**When slots open (discontinued participant or quota increase):**
1. Check for waitlisted participants for that disease type
2. Re-process oldest waitlisted submission
3. Assign to available vendor
4. Send new enrollment email
5. Update status to "Pending"

### Re-enrollment Process

If a discontinued participant wants to re-enroll:
1. Confirm interest via email
2. Have them submit new form OR
3. Manually update their row:
   - Reset Enrollment Status to "Pending"
   - Update Timestamp to current date
   - Trigger new assignment email


## 6. Power BI Dashboard Maintenance

### Dashboard Components

| Report Page | Metrics | Refresh Frequency |
|-------------|---------|-------------------|
| Overview | Total submissions, enrolled, by disease | Real-time with Excel |
| Vendor Distribution | Submissions/enrollments by vendor | Real-time |
| Conversion Funnel | Form → Enrolled conversion rates | Real-time |
| Quota Progress | Min/Max quota tracking | Real-time |
| Timeline | Enrollments over time | Real-time |

### Data Source Configuration

**Excel Source Path:**
```
C:\Users\AndreParedes\OneDrive - Muscular Dystrophy Association\Power_automate\movr-pilot-landing-page\MOVR_PILOT_PARTICIPANTS.xlsx
```

**Tables Connected:**
- ParticipantsTable
- VendorDiseaseQuotasTable
- MilestonesTable

### Refresh Process

1. Open Power BI Desktop or Service
2. Click "Refresh" button
3. If prompted, authenticate with MDA Microsoft 365 credentials
4. Verify data timestamp updated

### Troubleshooting Power BI

| Issue | Solution |
|-------|----------|
| Refresh fails | Check Excel file is not open exclusively; verify OneDrive sync |
| Data missing | Ensure Excel tables are properly formatted; check column names match |
| Credentials expired | Re-authenticate with Microsoft 365 |
| Metrics incorrect | Verify Excel formulas calculating correctly |


## 7. Troubleshooting Guide

### Common Issues & Solutions

#### Issue: Power Automate Flow Failed

**Symptoms:** No assignment email sent; participant reports no email

**Diagnosis:**
1. Go to Power Platform > Flows
2. Open "MOVR Pilot - Form Submission Handler"
3. Click "Run history"
4. Find failed run and click to expand
5. Identify which action failed

**Common Causes & Fixes:**

| Error | Cause | Fix |
|-------|-------|-----|
| "Table not found" | Excel table renamed/deleted | Restore table or update flow reference |
| "Authentication failed" | Credentials expired | Re-authenticate connections in flow |
| "Timeout" | Excel file locked | Ensure file not open exclusively |
| "Invalid data" | Malformed form submission | Check form validation; reject bad data |

#### Issue: Participant Didn't Receive Email

**Troubleshooting Steps:**
1. Check ParticipantsTable for "Email Sent" column
2. If FALSE: Flow may have failed - check run history
3. If TRUE: Email was sent
   - Ask participant to check spam/junk folder
   - Verify email address is correct
   - Resend manually if needed

**Manual Email Resend:**
1. Copy participant's assigned vendor and URL from Excel
2. Send email manually from mdamovr@mdausa.org
3. Update "Email Sent" to TRUE

#### Issue: Wrong Vendor Assigned

**This should not happen normally. If it does:**
1. Document the case with timestamp and participant ID
2. Check Power Automate run history for that submission
3. Verify VendorDiseaseQuotasTable data is correct
4. If legitimate error:
   - Contact participant to explain
   - Offer correct vendor link
   - Update Excel row with correct assignment
   - Log in CURRENT_STATE.md issue log

#### Issue: Quotas Not Updating

**Check Excel Formulas:**
1. Open VendorDiseaseQuotasTable
2. Verify "Form Submissions" formula: `=COUNTIFS(...)`
3. Verify "Remaining Slots" formula: `=Max Quota - Form Submissions`
4. Check that ParticipantsTable has correct vendor assignments


## 8. Issue Escalation

### Escalation Matrix

| Severity | Examples | Response | Escalate To |
|----------|----------|----------|-------------|
| **Low** | Single participant question | 4 hours | Clinical Ops |
| **Medium** | Multiple similar issues; slow flow | 2 hours | Andre |
| **High** | Flow completely down; no emails sending | 1 hour | Andre + IT |
| **Critical** | Data breach; security incident | Immediate | Andre + IT + Leadership |

### Escalation Process

1. **Identify Severity** using matrix above
2. **Document Issue:**
   - What happened
   - When it started
   - Who is affected
   - What you've tried
3. **Escalate via:**
   - Slack/Teams for Medium+
   - Email for Low
   - Phone for Critical
4. **Track Resolution** in CURRENT_STATE.md issue log

### Critical Incident Response

**If you suspect a security incident or data breach:**
1. DO NOT attempt to fix alone
2. Immediately contact Andre (phone)
3. Document what you observed
4. Do not delete or modify anything
5. Follow MDA incident response procedures


## 9. Data Security & Privacy

### Access Control

| Role | Access Level |
|------|--------------|
| Andre | Full (Excel, Power Automate, Power BI, GitHub) |
| Jessica | Excel (read/write), Power BI (view) |
| Clinical Ops | Excel (limited), Power BI (view) |

### Data Handling Rules

1. **Never share Excel file externally**
2. **Never email participant lists**
3. **Use secure channels (Teams/OneDrive) for internal sharing**
4. **Delete local copies after use**
5. **Report any suspected unauthorized access immediately**

### Participant Data Requests

If a participant requests:
- **Access to their data:** Export their row from Excel; send via secure method
- **Deletion of their data:** Mark status as "Withdrawn"; retain for audit trail
- **Correction of their data:** Update in Excel; document change


## 10. Contact & Support

### Internal Contacts

| Role | Name | Contact | Availability |
|------|------|---------|--------------|
| Technical Lead | Andre D. Paredes | andre.paredes@ymail.com | Business hours |
| Clinical Ops Lead | Jessica Waits | [email] | Business hours |
| IT Support | MDA IT | [helpdesk] | Business hours |

### External Contacts

| Vendor | Support Contact |
|--------|-----------------|
| Vibrent Health | [contact info] |
| Citizen Health | [contact info] |
| Unite Genomics | [contact info] |

### Support Email
**mdamovr@mdausa.org** - Primary support inbox for participants


## Appendix A: Quick Reference

### Daily Checklist
- [ ] Check Power Automate flow status
- [ ] Review new submissions
- [ ] Monitor support inbox
- [ ] Respond to participant questions

### Weekly Checklist
- [ ] Update enrollment statuses (Mon/Thu)
- [ ] Process timeouts (Wed)
- [ ] Send reminder emails as needed
- [ ] Review quota progress (Fri)
- [ ] Refresh Power BI dashboard

### Monthly Checklist
- [ ] Review this SOP for updates
- [ ] Audit access permissions
- [ ] Review quota utilization trends
- [ ] Update documentation as needed


## Document Revision History

| Date | Version | Author | Changes |
|------|---------|--------|---------|
| 2026-01-03 | 1.0 | A. Paredes | Initial SOP creation |


*This document should be stored in the team OneDrive and reviewed during onboarding for any team member supporting the MOVR 2.0 Pilot.*
