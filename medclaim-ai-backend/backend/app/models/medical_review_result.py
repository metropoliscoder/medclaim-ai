from pydantic import BaseModel

class MedicalReviewResult(BaseModel):
    status: str
    confidence: float
    diagnosis: str
    procedure: str
    knowledge_match: bool
    reasoning: str