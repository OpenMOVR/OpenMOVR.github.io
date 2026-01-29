# MOVR 2.0 Pilot - Governance & Ethics Working Group
## First Meeting Presentation

**Duration:** 20 minutes + open discussion
**Audience:** Legal, compliance, IRB, ethics, privacy officers, leadership
**Date:** [TBD]


## Agenda (20 min)

1. Pilot Overview & Scope (3 min)
2. Data Governance Framework (5 min)
3. Privacy & Compliance (5 min)
4. Ethical Considerations (4 min)
5. Decision Rights & Oversight (3 min)
6. Open Discussion


## 1. Pilot Overview & Scope (3 min)

### What This Is

A 6-month pilot testing 3 vendor platforms to select MDA's next-generation patient data platform (MOVR 2.0).

| Element | Details |
|---------|---------|
| Target | 500 participants |
| Populations | DMD, SMA, LGMD patients and caregivers |
| Vendors | Vibrent Health, Citizen Health, Unite Genomics |
| Data Collected | Demographics, health records, patient-reported outcomes |
| Timeline | Pilot through Q1 2026, decision March 2026 |

### What This Is NOT

- Not a clinical trial
- Not a one-time survey
- Not a binding commitment to any vendor
- Not collecting data for immediate research use

### Governance Questions This Raises

- Who owns participant data during and after pilot?
- What happens to data if we don't select a vendor?
- How do we ensure equitable access and representation?
- What are our obligations to participants post-pilot?


## 2. Data Governance Framework (5 min)

### Data Flow & Custody

```
┌─────────────────────────────────────────────────────────────────────┐
│                        DATA CUSTODY CHAIN                           │
└─────────────────────────────────────────────────────────────────────┘

STAGE 1: INTAKE                    CUSTODY: MDA
┌─────────────────────┐
│  Landing Page Form  │  ─── Name, email, disease, demographics
│  (GitHub Pages)     │      Stored in MDA-controlled Excel/OneDrive
└─────────────────────┘

           │
           ▼

STAGE 2: VENDOR ENROLLMENT         CUSTODY: VENDOR (with MDA access)
┌─────────────────────┐
│  Vendor Platform    │  ─── Health records, medical history, PROs
│  (Vibrent/Citizen/  │      Stored in vendor infrastructure
│   Unite)            │      MDA has research access per agreement
└─────────────────────┘

           │
           ▼

STAGE 3: RESEARCH USE              CUSTODY: [TBD - depends on vendor selection]
┌─────────────────────┐
│  Aggregated Data    │  ─── De-identified datasets
│  for Research       │      Governed by participant consent
└─────────────────────┘
```

### Data Ownership Matrix

| Data Type | Created By | Stored By | Owned By | Access |
|-----------|------------|-----------|----------|--------|
| Intake form data | Participant | MDA (OneDrive) | MDA | MDA team |
| Platform account | Participant | Vendor | Participant | Participant + Vendor |
| Health records entered | Participant | Vendor | Participant | Per consent |
| Aggregated research data | Derived | TBD | TBD | Per consent + IRB |

### Data Lifecycle

| Phase | Data Handling | Retention |
|-------|---------------|-----------|
| Active pilot | Live in vendor platforms | Duration of pilot |
| Pilot ends - vendor selected | Migrate to chosen platform | Ongoing |
| Pilot ends - vendor NOT selected | Participant choice: export or delete | 30 days post-notification |
| Participant withdraws | Remove from active use | Retain for audit trail per policy |


## 3. Privacy & Compliance (5 min)

### Regulatory Framework

| Requirement | Applicability | Status |
|-------------|---------------|--------|
| HIPAA | Yes - PHI collected | [Verify vendor BAAs] |
| State privacy laws | Varies by participant location | [Review needed] |
| GDPR | If any EU participants | [Likely N/A] |
| 21 CFR Part 11 | If data used for FDA submissions | [Future consideration] |
| Common Rule | If federally funded research | [IRB determination needed] |

### Vendor Compliance Status

| Requirement | Vibrent | Citizen | Unite |
|-------------|---------|---------|-------|
| HIPAA compliant | [?] | [?] | [?] |
| BAA executed with MDA | [?] | [?] | [?] |
| SOC 2 Type II | [?] | [?] | [?] |
| Data encryption (rest) | [?] | [?] | [?] |
| Data encryption (transit) | [?] | [?] | [?] |
| Access audit logging | [?] | [?] | [?] |
| Breach notification SLA | [?] | [?] | [?] |
| Data residency (US only) | [?] | [?] | [?] |

### Consent Architecture

**Layer 1: Pilot Participation (Landing Page)**
- Attestation checkbox
- Consent to be contacted by MOVR team
- NOT consent to research use

**Layer 2: Platform Enrollment (Vendor)**
- Vendor terms of service
- Platform privacy policy
- Varies by vendor

**Layer 3: Research Consent (MDA Study)**
- Separate consent process managed by Jessica
- IRB-approved consent form
- Enables MDA to access aggregated insights

### Consent Questions to Resolve

- [ ] Is pilot participation considered human subjects research?
- [ ] Do we need IRB approval/exemption?
- [ ] How do we document consent across 3 layers?
- [ ] What if participant consents to platform but not research?
- [ ] How do we handle minors (parental consent + assent)?


## 4. Ethical Considerations (4 min)

### Equity & Access

| Consideration | Risk | Mitigation |
|---------------|------|------------|
| Digital divide | Excludes non-tech-savvy families | Phone support, simplified instructions |
| Language barriers | English-only limits participation | [Future: translation?] |
| Disability access | Platforms may not be accessible | Evaluate WCAG compliance |
| Geographic bias | Urban/connected populations overrepresented | Track demographics, adjust outreach |
| Disease representation | One disease may dominate | Quota system balances DMD/SMA/LGMD |

### Burden on Participants

| Concern | Reality Check |
|---------|---------------|
| Time commitment | 30-45 min setup, optional ongoing use |
| Emotional burden | Revisiting medical history can be difficult |
| Expectation management | Pilot ≠ immediate research breakthroughs |
| Tech frustration | New platforms have learning curves |

### Transparency Obligations

**We must be clear about:**
- This is a vendor evaluation, not guaranteed long-term commitment
- Participant data helps us decide, not directly advances research (yet)
- Selected vendor may change terms post-pilot
- MDA's role vs vendor's role

### Community Benefit

| Stakeholder | What They Get |
|-------------|---------------|
| Participants | Early access, voice in selection, data tools |
| MDA | Informed vendor decision, engaged community |
| Vendors | Real-world testing, feedback |
| Researchers | (Future) Better data infrastructure |
| NMD Community | Platform designed by/for them |


## 5. Decision Rights & Oversight (3 min)

### Governance Structure

```
┌─────────────────────────────────────────┐
│         MDA LEADERSHIP                  │
│    (Final vendor selection decision)    │
└─────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
┌───────────────┐      ┌───────────────────┐
│  MOVR Team    │      │  Working Groups   │
│  (Andre,      │      │                   │
│   Jessica)    │      │  - Data Integration│
│               │      │  - Patient/Family  │
│  Day-to-day   │      │  - Governance      │
│  operations   │      │                   │
└───────────────┘      └───────────────────┘
```

### Decision Rights Matrix

| Decision | Who Decides | Who Advises | Who's Informed |
|----------|-------------|-------------|----------------|
| Vendor selection | MDA Leadership | All working groups | Participants |
| Pilot operations | MOVR Team | Governance WG | Leadership |
| Data access requests | MOVR Team + Legal | Governance WG | IRB (if applicable) |
| Participant communications | MOVR Team | Patient/Family WG | Leadership |
| Policy changes | Leadership | Governance WG | All |
| Incident response | MOVR Team + IT + Legal | - | Leadership, affected parties |

### Oversight Mechanisms

| Mechanism | Frequency | Purpose |
|-----------|-----------|---------|
| Working group meetings | Monthly | Input and review |
| Leadership updates | Bi-weekly | Status and escalations |
| Participant feedback review | Ongoing | Course correction |
| Compliance spot-checks | Quarterly | Verify vendor adherence |
| Post-pilot retrospective | End of pilot | Lessons learned |


## 6. Open Discussion

### Questions for This Group

1. What governance gaps do you see in this framework?
2. Do we need IRB review for pilot phase?
3. How should we handle a data breach at a vendor?
4. What's our obligation if a vendor is not selected?
5. How do we balance transparency with not overwhelming participants?

### Decisions Needed

- [ ] Confirm IRB requirements
- [ ] Finalize data retention policy
- [ ] Approve participant communication templates
- [ ] Establish incident response protocol
- [ ] Define escalation paths


## Policy Documents Needed

| Document | Status | Owner |
|----------|--------|-------|
| Pilot Privacy Policy | [Draft/Final/Needed] | [?] |
| Vendor BAAs | [Executed/Pending] | Legal |
| Participant Consent Forms | [Draft/Final/Needed] | IRB/MOVR Team |
| Data Retention Policy | [Draft/Final/Needed] | Governance WG |
| Incident Response Plan | [Draft/Final/Needed] | IT + Legal |
| Participant Bill of Rights | [Draft/Final/Needed] | Patient/Family WG |


## Appendix: Regulatory Reference

### HIPAA Considerations
- Vendors are Business Associates
- BAAs required before PHI sharing
- Minimum necessary standard applies
- Participant right to access their records

### Research Considerations
- Common Rule applies if federally funded
- IRB determines if "human subjects research"
- Consent must cover future research use
- De-identification standards (Safe Harbor vs Expert Determination)


## Notes

[Space for governance discussion notes]

-
-
-


## Action Items

| Action | Owner | Due |
|--------|-------|-----|
| | | |
| | | |
