# MOVR 2.0 Pilot - Data Integration Working Group
## First Meeting Presentation

**Duration:** 20 minutes + open discussion
**Audience:** Technical stakeholders, data architects, informaticists
**Date:** [TBD]


## Agenda (20 min)

1. System Architecture (5 min)
2. Vendor Data Capabilities (7 min)
3. Integration & Interoperability (5 min)
4. Technical Evaluation Criteria (3 min)
5. Open Discussion


## 1. System Architecture (5 min)

### Current Data Flow

```
┌──────────────────────────────────────────────────────────────────────┐
│                         PARTICIPANT JOURNEY                          │
└──────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────────┐
│  LANDING PAGE (GitHub Pages)                                         │
│  openmovr.github.io/pilot                                           │
│                                                                      │
│  Captures: name, email, disease, relationship, ageGroup,            │
│            howHeard, multiPlatform, attestation                     │
│  + metadata: submissionTime, userAgent, referrer                    │
└──────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ HTTP POST (JSON)
                                  ▼
┌──────────────────────────────────────────────────────────────────────┐
│  POWER AUTOMATE FLOW                                                 │
│                                                                      │
│  1. Validates submission                                            │
│  2. Queries Excel for quota status                                  │
│  3. Applies disease-specific assignment logic                       │
│  4. Writes participant record                                       │
│  5. Triggers email via Outlook                                      │
│  6. Returns JSON response                                           │
└──────────────────────────────────────────────────────────────────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    ▼             ▼             ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│   EXCEL     │ │   OUTLOOK   │ │  POWER BI   │
│   ONLINE    │ │   (Email)   │ │  (Reports)  │
│             │ │             │ │             │
│ 3 Tables:   │ │ Sends:      │ │ Connects:   │
│ -Participants│ │ -Assignment │ │ -Same Excel │
│ -Quotas     │ │ -Waitlist   │ │  workbook   │
│ -Milestones │ │             │ │             │
└─────────────┘ └─────────────┘ └─────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────────┐
│  VENDOR PLATFORMS (where participant data lives post-enrollment)     │
│                                                                      │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐                    │
│  │  Vibrent   │  │  Citizen   │  │   Unite    │                    │
│  │  Health    │  │  Health    │  │  Genomics  │                    │
│  └────────────┘  └────────────┘  └────────────┘                    │
└──────────────────────────────────────────────────────────────────────┘
```

### Data Schema (Intake Form)

```json
{
  "name": "string",
  "email": "string (validated, no disposable domains)",
  "disease": "enum: DMD | SMA | LGMD",
  "relationship": "enum: Patient | Parent/Caregiver | Other",
  "ageGroup": "enum: 6-younger | 7-13 | 14-17 | 18-older",
  "howHeard": "enum: Email | Social | Call | Provider | Friend | Other",
  "multiPlatform": "boolean (optional)",
  "attestation": "boolean (required)",
  "submissionTime": "ISO 8601 timestamp",
  "userAgent": "string",
  "referrer": "string"
}
```

### Excel Data Model

**ParticipantsTable**
| Column | Type | Source |
|--------|------|--------|
| Participant ID | GUID | @guid() |
| Timestamp | DateTime | Form |
| Name | String | Form |
| Email | String | Form |
| Disease Type | String | Form |
| Relationship | String | Form |
| Age Group | String | Form |
| Attestation | Boolean | Form |
| Multi-Platform Interest | Boolean | Form |
| How Heard | String | Form |
| Assigned Vendor | String | Computed |
| Vendor Link | URL | Lookup |
| Assignment Reason | String | Computed |
| Email Sent | Boolean | Flow |
| Enrollment Status | String | Manual update |
| Days Since Form | Integer | Formula |
| Timeout Date | Date | Formula (submission + 14) |

**VendorDiseaseQuotasTable**
| Column | Type | Notes |
|--------|------|-------|
| Vendor Name | String | |
| Disease | String | DMD/SMA/LGMD |
| Min Quota | Integer | Guaranteed minimum |
| Max Quota | Integer | Hard cap |
| Form Submissions | Integer | COUNTIFS formula |
| Actual Enrolled | Integer | COUNTIFS formula |
| Min Met | Boolean | Calculated |
| Remaining Slots | Integer | Max - Submissions |
| Priority | Integer | 1=Vibrent, 2=Citizen, 3=Unite |
| Enrollment URL | URL | Vendor-specific |

**MilestonesTable**
| Column | Type | Notes |
|--------|------|-------|
| Milestone | String | e.g., "DMD Minimums Met" |
| Target | Integer | |
| Current | Integer | Formula |
| Status | String | ACHIEVED / IN PROGRESS |
| Date Achieved | Date | |


## 2. Vendor Data Capabilities (7 min)

### Data Ingestion Methods

| Method | Vibrent | Citizen | Unite |
|--------|---------|---------|-------|
| Manual entry | [?] | [?] | [?] |
| EHR integration (Epic, Cerner) | [?] | [?] | [?] |
| FHIR API | [?] | [?] | [?] |
| CCD/CCDA import | [?] | [?] | [?] |
| PDF upload + OCR | [?] | [?] | [?] |
| Apple Health / Google Fit | [?] | [?] | [?] |
| Patient portal sync | [?] | [?] | [?] |
| Claims data | [?] | [?] | [?] |

### Data Standards Support

| Standard | Vibrent | Citizen | Unite | Why It Matters |
|----------|---------|---------|-------|----------------|
| FHIR R4 | [?] | [?] | [?] | Modern interoperability |
| HL7 v2 | [?] | [?] | [?] | Legacy system compat |
| OMOP CDM | [?] | [?] | [?] | Research analytics |
| CDISC | [?] | [?] | [?] | Clinical trials |
| ICD-10 | [?] | [?] | [?] | Diagnosis coding |
| SNOMED CT | [?] | [?] | [?] | Clinical terminology |
| LOINC | [?] | [?] | [?] | Lab results |
| RxNorm | [?] | [?] | [?] | Medications |

### Data Export Capabilities

| Capability | Vibrent | Citizen | Unite |
|------------|---------|---------|-------|
| CSV/Excel export | [?] | [?] | [?] |
| JSON export | [?] | [?] | [?] |
| FHIR Bulk Export | [?] | [?] | [?] |
| API access | [?] | [?] | [?] |
| Direct database query | [?] | [?] | [?] |
| Scheduled exports | [?] | [?] | [?] |
| De-identification built-in | [?] | [?] | [?] |

### Data Model Comparison

| Data Domain | Vibrent | Citizen | Unite |
|-------------|---------|---------|-------|
| Demographics | [?] | [?] | [?] |
| Conditions/Diagnoses | [?] | [?] | [?] |
| Medications | [?] | [?] | [?] |
| Labs/Vitals | [?] | [?] | [?] |
| Procedures | [?] | [?] | [?] |
| Encounters | [?] | [?] | [?] |
| Genomics | [?] | [?] | [?] |
| PROs/Surveys | [?] | [?] | [?] |
| Documents/Notes | [?] | [?] | [?] |
| Care Plans | [?] | [?] | [?] |


## 3. Integration & Interoperability (5 min)

### Current Integration Points

```
                    ┌─────────────────────────┐
                    │    MDA ECOSYSTEM        │
                    │                         │
                    │  ┌─────────────────┐   │
                    │  │ Pilot Landing   │   │
                    │  │ Page + Excel    │   │
                    │  └────────┬────────┘   │
                    │           │             │
                    └───────────┼─────────────┘
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
              ▼                 ▼                 ▼
     ┌────────────────┐ ┌────────────────┐ ┌────────────────┐
     │    Vibrent     │ │    Citizen     │ │     Unite      │
     │                │ │                │ │                │
     │  [Data Model]  │ │  [Data Model]  │ │  [Data Model]  │
     │  [APIs?]       │ │  [APIs?]       │ │  [APIs?]       │
     └────────────────┘ └────────────────┘ └────────────────┘
              │                 │                 │
              └─────────────────┼─────────────────┘
                                │
                                ▼
                    ┌─────────────────────────┐
                    │   FUTURE: RESEARCH      │
                    │   DATA PLATFORM         │
                    │                         │
                    │   - Aggregated data     │
                    │   - De-identified       │
                    │   - Query interface     │
                    │   - Cohort building     │
                    └─────────────────────────┘
```

### Integration Questions to Answer

**Data Flow**
- How does participant data get INTO each platform?
- How do we get aggregate/de-identified data OUT?
- Is there real-time sync or batch?
- What triggers data refresh?

**Identity & Matching**
- How do platforms handle patient matching?
- Can we link same participant across platforms (multi-platform testers)?
- What identifiers are used?

**Consent & Access**
- How is consent tracked technically?
- Can we query consent status via API?
- How granular is consent (study-level, data-type-level)?

### Technical Debt / Gaps

| Gap | Impact | Mitigation |
|-----|--------|------------|
| No direct API between landing page and vendors | Manual enrollment step for participants | Vendors send enrollment confirmation; Jessica tracks |
| Excel as data store | Not scalable long-term | Sufficient for 500 pilot; migrate post-pilot |
| No unified participant ID | Can't easily track across vendors | Use email as pseudo-identifier |
| [TODO] | | |


## 4. Technical Evaluation Criteria (3 min)

### Scoring Framework

| Criterion | Weight | Description |
|-----------|--------|-------------|
| **Data Ingestion** | 20% | How easily can participants get their data in? |
| **Data Quality** | 20% | Structured, coded, complete? |
| **Interoperability** | 20% | Standards support, API access |
| **Export/Research** | 20% | Can we get usable data out? |
| **Scalability** | 10% | Can this grow beyond 500? |
| **Security/Compliance** | 10% | HIPAA, SOC2, encryption |

### Data Quality Metrics

| Metric | How to Measure |
|--------|----------------|
| Completeness | % of expected fields populated |
| Accuracy | Spot-check against source records |
| Consistency | Same data coded same way across patients |
| Timeliness | Lag between real-world event and platform |
| Validity | Values within expected ranges/formats |

### Technical Due Diligence Checklist

**APIs**
- [ ] API documentation available?
- [ ] Authentication method (OAuth, API key)?
- [ ] Rate limits?
- [ ] Sandbox/test environment?

**Data Model**
- [ ] ERD or data dictionary available?
- [ ] Custom fields supported?
- [ ] Versioning/change tracking?

**Security**
- [ ] Encryption at rest and in transit?
- [ ] Access logging/audit trail?
- [ ] Penetration test results?
- [ ] BAA in place?


## 5. Open Discussion

### Questions for This Group

1. What data standards are non-negotiable for research use?
2. What's the minimum viable integration for pilot phase?
3. How do we handle data reconciliation across platforms?
4. What does "research-ready" data look like technically?
5. Who owns the data integration roadmap post-pilot?

### Technical Decisions Needed

- [ ] Define target data model for aggregated research dataset
- [ ] Agree on minimum API requirements
- [ ] Establish data quality thresholds
- [ ] Assign technical POCs per vendor


## Appendix: Technical Resources

**GitHub Repo:** github.com/OpenMOVR/OpenMOVR.github.io
**Landing Page:** openmovr.github.io/pilot
**Power Automate Flow:** MOVR Pilot - Form Submission Handler
**Excel Location:** OneDrive > Power_automate > movr-pilot-landing-page

**Documentation:**
- `power-automate-setup.md` - Flow configuration
- `power_automate_logic_flow.md` - Logic hierarchy
- `request_body_schema.json` - Form schema


## Notes

[Space for technical discussion notes]

-
-
-


## Action Items

| Action | Owner | Due |
|--------|-------|-----|
| | | |
| | | |
