from datetime import datetime

from pydantic import BaseModel


class AuditRecord(BaseModel):

    claim_id: str

    medical_status: str

    medical_confidence: float

    policy_status: str

    policy_confidence: float

    final_decision: str

    medical_reasoning: str

    policy_reasoning: str

    final_reasoning: str

    timestamp: datetime