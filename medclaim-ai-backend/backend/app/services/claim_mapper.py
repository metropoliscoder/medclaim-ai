from backend.app.models.claim import Claim
from backend.app.models.patient import Patient
from backend.app.models.hospital import Hospital
from backend.app.models.treatment import Treatment
from backend.app.models.policy import Policy
from backend.app.models.billing import Billing

from backend.app.models.extracted_claim import ExtractedClaim


class ClaimMapper:

    @staticmethod
    def to_claim(
        extracted: ExtractedClaim
    ) -> Claim:

        patient = Patient(
            patient_id=extracted.patient_id,
            full_name=extracted.patient_name,
            age=extracted.age,
            gender=extracted.gender
        )

        hospital = Hospital(
            hospital_id="H001",
            hospital_name=extracted.hospital_name,
            city=extracted.city
        )

        treatment = Treatment(
            diagnosis=extracted.diagnosis,
            procedure_name=extracted.procedure
        )

        policy = Policy(
            policy_number=extracted.policy_number,
            policy_type=extracted.policy_type,
            coverage_limit=100000
        )

        billing = Billing(
            claim_amount=extracted.claim_amount
        )

        return Claim(
            claim_id="CLM001",
            patient=patient,
            hospital=hospital,
            treatment=treatment,
            policy=policy,
            billing=billing
        )