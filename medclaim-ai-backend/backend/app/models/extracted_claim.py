from pydantic import BaseModel

class ExtractedClaim(BaseModel):
    patient_name: str

    patient_id: str

    age: int

    gender: str

    hospital_name: str

    city: str

    diagnosis: str

    procedure: str

    policy_number: str

    policy_type: str

    claim_amount: float