# MOVR 2.0 Pilot Landing Page
## Executive Summary

**Prepared by:** Andre D. Paredes, PhD | Sr. Director of Strategy & Informatics
**Date:** January 2026
**Status:** Live & Operational


## What This Is

A self-service enrollment landing page for the MOVR 2.0 Pilot that automatically captures participant information, assigns them to a vendor platform, and sends personalized onboarding emails - all without manual intervention.

**Live URL:** https://openmovr.github.io/pilot


## Why It Matters

Before this system, enrollment would require:
- Manual intake of each participant's information
- Manual vendor assignment decisions
- Manual email composition and sending
- Manual tracking in spreadsheets
- Risk of inconsistent messaging and human error

This landing page automates the entire intake-to-assignment workflow, enabling us to scale to 500 participants without adding operational burden to the clinical team.


## How It Works

```
Participant visits landing page
         ↓
Fills out enrollment form (name, email, disease, age, etc.)
         ↓
Form submits to Microsoft Power Automate (cloud automation)
         ↓
System checks vendor quotas in Excel Online
         ↓
Assigns participant to appropriate vendor based on:
   • Disease type (DMD, SMA, LGMD)
   • Quota availability
   • Priority rules
         ↓
Adds participant record to Excel tracking sheet
         ↓
Sends personalized email with vendor assignment + enrollment link
         ↓
Returns confirmation to participant on screen
```

**Vendor Platforms (where participants are routed):**
| Vendor | Priority | Enrollment URL |
|--------|----------|----------------|
| Vibrent Health | 1 | vibrenthealth.com/mda/pilot |
| Citizen Health | 2 | citizenhealth.com/join/mda |
| Unite Genomics | 3 | unitegenomics.com/enroll/movr |


## Form Intake Fields

| Field | Required | Purpose |
|-------|----------|---------|
| Participant Name | Yes | Personalization, tracking |
| Email | Yes | Assignment delivery, follow-up |
| Disease Type | Yes | Vendor matching (DMD/SMA/LGMD) |
| Relationship | Yes | Patient vs caregiver context |
| Age Group | Yes | Demographics |
| How Heard | Yes | Marketing attribution |
| Multi-Platform Interest | No | Option to test all 3 vendors |
| Attestation | Yes | Consent to contact |


## Technical Resources

| Component | Location | Purpose |
|-----------|----------|---------|
| Landing Page | GitHub Pages (openmovr.github.io/pilot) | Public-facing form |
| Automation | Microsoft Power Automate | Processes submissions |
| Data Storage | Excel Online (OneDrive) | Participant records, quotas |
| Email Delivery | Outlook (via Power Automate) | Assignment notifications |
| Reporting | Power BI | Dashboard metrics |

**Excel File:** `MOVR_PILOT_PARICIPANTS.xlsx`
**Location:** OneDrive > Power_automate > movr-pilot-landing-page


## Maintenance Requirements

**Daily (5 min):**
- Monitor Power Automate for failed runs
- Check support inbox for participant questions

**Weekly (30 min):**
- Update enrollment statuses in Excel
- Process 14-day timeouts
- Send reminder emails to pending participants

**As Needed:**
- Adjust vendor quotas in Excel
- Update landing page content (GitHub)
- Troubleshoot flow issues


## Cost

$0 operational - uses existing Microsoft 365 infrastructure (Power Automate, Excel Online, Outlook, OneDrive)


## Key Contacts

| Role | Name | Responsibility |
|------|------|----------------|
| Technical Owner | Andre D. Paredes | System design, maintenance, troubleshooting |
| Clinical Operations | Jessica Waits | Participant follow-up, enrollment verification |
| Support Inbox | mdamovr@mdausa.org | Participant questions |


## Documentation

Full technical documentation available in the pilot folder:
- `SOP_TECHNICAL.md` - Operational procedures
- `power-automate-setup.md` - Flow configuration details
- `LANDING_PAGE_CONTENT.md` - Page copy for communications
