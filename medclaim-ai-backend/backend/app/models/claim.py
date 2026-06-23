from pydantic import BaseModel

from backend.app.models.patient import Patient
from backend.app.models.hospital import Hospital
from backend.app.models.treatment import Treatment
from backend.app.models.policy import Policy
from backend.app.models.billing import Billing

class Claim(BaseModel):
    claim_id: str
    patient: Patient
    hospital: Hospital
    treatment: Treatment
    policy: Policy
    billing: Billing