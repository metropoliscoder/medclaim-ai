System Overview:

1. Patient Information
2. Hospital Information
3. Medical Information
4. Billing Information
5. Insurance Policy Information
6. Review Decision


1. Patient Information:
patient_id: string
full_name: string
age: integer
gender: string
contact_number: string
insurance_member_id: string

2. Hospital Information:
hospital_id: string
hospital_name: string
hosptial_type: strin
city: string
registration_number: string

3. Medical Treatment
diagnosis: string
diagnosis_code: string
procedure_name: string
procedure_code: string
admission_date: date
discharge_date: date
attending_physician: string

4. Billing Information
total_claim_amount: float
room_charges: float
medicine_charges: float
surgery_charges: float
other_charges: float
invoice_count: integer

5. Insuracne Policy
policy_number: string
policy_type: string
coverage_limit: float
coverage_start_date: date
coverage_end_date: date
covered_procedures: list
excluded_conditions: list
waiting_period_days: integer

6. Claim
claim_id: string
claim_submission_date: date
claim_status: string
patient: patient
hospital: hospital
medical_treatment: medicalTreatment
billing_information: billingInformation
insurance_policy: insurancePolicy

7. Agent Findings
agent_name: string
confidence_score: float
status: string
reasoning: string
evidence: list
timestamp: datetime

8. Final Review Decision
recommendation: string
confidence_score: float
risk_score: integer
reasoning: list
supporting_evidence: list
human_reviewer_action: string