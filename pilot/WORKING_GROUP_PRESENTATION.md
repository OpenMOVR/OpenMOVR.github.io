# MOVR 2.0 Pilot Working Group
## First Meeting Presentation Outline

**Duration:** 20 minutes + open discussion
**Format:** Walkthrough of what we've built, vendor landscape, evaluation framework
**Date:** [TBD]


## Agenda (20 min)

1. What We Built (5 min)
2. The Vendors (5 min)
3. Evaluation Framework (5 min)
4. Governance & Next Steps (5 min)
5. Open Discussion


## 1. What We Built (5 min)

### The Problem We Solved
- Needed to test 3 vendor platforms simultaneously
- Needed fair distribution across vendors and disease types
- Needed to track enrollment without manual overhead
- Needed consistent participant experience

### What We Created

**Landing Page** (openmovr.github.io/pilot)
- Public enrollment form
- FAQ addressing common questions
- Mobile-responsive design
- Clear 6-step journey explanation

**Automated Backend**
- Power Automate flow processes submissions
- Excel Online tracks participants + quotas
- Automated email with vendor assignment
- Disease-specific quota management

**Documentation**
- Technical SOPs for clinical ops
- Power Automate configuration docs
- Landing page content reference

### Current Status
- [X] Landing page live
- [X] Power Automate flow operational
- [X] Email automation working
- [X] Quota tracking functional
- [ ] Power BI dashboard [in progress]
- [ ] First enrollments [date?]


## 2. The Vendors (5 min)

### Overview

| Vendor | Focus | Differentiator (Their Claim) |
|--------|-------|------------------------------|
| Vibrent Health | [TODO] | [TODO] |
| Citizen Health | [TODO] | [TODO] |
| Unite Genomics | [TODO] | [TODO] |

### What They Say vs What We See

#### Vibrent Health
**They say:**
- [TODO - their pitch/claims]

**We see:**
- [TODO - our observations]

**Platform strengths:**
- [TODO]

**Platform gaps:**
- [TODO]


#### Citizen Health
**They say:**
- [TODO - their pitch/claims]

**We see:**
- [TODO - our observations]

**Platform strengths:**
- [TODO]

**Platform gaps:**
- [TODO]


#### Unite Genomics
**They say:**
- [TODO - their pitch/claims]

**We see:**
- [TODO - our observations]

**Platform strengths:**
- [TODO]

**Platform gaps:**
- [TODO]


### Key Differentiators Across Vendors

| Capability | Vibrent | Citizen | Unite |
|------------|---------|---------|-------|
| EHR Integration | [?] | [?] | [?] |
| Patient Portal | [?] | [?] | [?] |
| Data Visualization | [?] | [?] | [?] |
| Research Export | [?] | [?] | [?] |
| Mobile App | [?] | [?] | [?] |
| Caregiver Access | [?] | [?] | [?] |


## 3. Evaluation Framework (5 min)

### Dual Value Proposition

We're evaluating on two axes:

```
                    HIGH
                      │
   VALUE TO           │   Ideal
   PARTICIPANTS       │   Partner
   (Current)          │
                      │
                      ├───────────────────►
                    LOW              HIGH
                         VALUE TO RESEARCH
                         (Future Scale)
```

### Value to Participants (Current)
*What does the platform do for families today?*

- [ ] Easy to set up and use
- [ ] Visualizes their health data meaningfully
- [ ] Helps coordinate care across providers
- [ ] Gives them control over their information
- [ ] Reduces burden of managing records
- [ ] Provides actionable insights

**Metrics we'll capture:**
- Time to complete enrollment
- Platform engagement (logins, data entry)
- Participant satisfaction (survey)
- Drop-off rate
- Support requests


### Value to Research (Future Scale)
*Can we actually use this data to accelerate discovery?*

- [ ] Data is structured and queryable
- [ ] Can export de-identified datasets
- [ ] Supports longitudinal tracking
- [ ] Integrates with research workflows
- [ ] Scales beyond 500 participants
- [ ] API access for researchers

**Metrics we'll capture:**
- Data completeness
- Data quality/consistency
- Export capabilities
- Integration options
- Cost to scale


### The Gap to Bridge
*Getting from participant value to research value*

| Challenge | Considerations |
|-----------|----------------|
| Consent management | How does platform handle research consent vs platform consent? |
| Data standardization | Is data in usable formats (FHIR, OMOP, etc.)? |
| De-identification | How robust is PHI stripping? |
| Governance | Who owns the data? Access controls? |


## 4. Governance, Security, Ethics (5 min)

### Security Baseline

| Requirement | Vibrent | Citizen | Unite |
|-------------|---------|---------|-------|
| HIPAA Compliant | [?] | [?] | [?] |
| SOC 2 Certified | [?] | [?] | [?] |
| Data Encryption | [?] | [?] | [?] |
| Access Logging | [?] | [?] | [?] |


### Governance Questions

**Data Ownership**
- Who owns participant data?
- What happens if we switch vendors?
- Can participants delete their data?
- What are data retention policies?

**Access Control**
- Who at MDA can access what?
- How are vendor employees restricted?
- Audit trail for data access?

**Research Use**
- IRB requirements for data use?
- How is consent managed for future studies?
- Can participants opt in/out of specific research?


### Ethical Considerations

- Equity of access (digital divide)
- Burden on already-burdened families
- Transparency about data use
- Community benefit vs commercial benefit
- Participant voice in platform selection


## 5. Open Discussion

### Questions for the Group

1. What are we missing in the evaluation framework?
2. What do participants care most about?
3. What does "research-ready" mean to our stakeholders?
4. How do we weight participant value vs research value?
5. What's our timeline to decision?


### Decisions Needed

- [ ] Finalize evaluation criteria
- [ ] Assign owners to vendor assessments
- [ ] Schedule participant feedback sessions
- [ ] Define go/no-go criteria


## Appendix: Resources

**Landing Page:** https://openmovr.github.io/pilot
**Support Email:** mdamovr@mdausa.org
**Excel Data:** OneDrive > Power_automate > movr-pilot-landing-page
**Documentation:** GitHub > OpenMOVR.github.io > pilot folder


## Notes / Parking Lot

[Space for notes during discussion]

-
-
-


## Action Items

| Action | Owner | Due |
|--------|-------|-----|
| | | |
| | | |
| | | |
