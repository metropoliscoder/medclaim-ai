from pydantic import BaseModel


class FinalDecision(BaseModel):

    decision: str
    medical_status: str
    policy_status: str
    medical_confidence: float
    policy_confidence: float
    reasoning: str