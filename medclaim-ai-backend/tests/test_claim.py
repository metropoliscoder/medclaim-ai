from backend.app.models.patient import Patient
from backend.app.models.hospital import Hospital
from backend.app.models.treatment import Treatment
from backend.app.models.policy import Policy
from backend.app.models.claim import Claim

patient = Patient(
    patient_id="12345",
    full_name="Shorabh Chobey",
    age=29,
    gender="Male"
)

hospital = Hospital(
    hospital_id="H001",
    hospital_name="Fortis Hospital",
    city="Delhi"
)

treatment = Treatment(
    diagnosis="Appendicitis",
    procedure_name="Appendectomy"
)

policy = Policy(
    policy_number="POL001",
    policy_type="Gold",
    coverage_limit=100000
)

claim = Claim(
    claim_id="CLM001",
    patient=patient,
    hospital=hospital,
    treatment=treatment,
    policy=policy
)

print(claim)